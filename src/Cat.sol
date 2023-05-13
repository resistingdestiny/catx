// SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.16;

// ========== Interfaces ==========
import {ICat} from "./interfaces/ICat.sol";
import {OptimisticOracleV3Interface} from "./interfaces/OptimisticOracleV3Interface.sol";

// ========== Libraries ==========
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {AncillaryData as ClaimData} from "./libraries/AncillaryData.sol";

// ========== Contracts ==========
import {ERC4626, ERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {ERC1155Supply} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract Cat is ICat, ERC4626, ERC1155Supply, ReentrancyGuard {
    // ========== State variables ==========

    /**
     * @notice whether policy has been settled, initialised as false
     * @notice one bool, ie single use policy
     */
    bool public settled;

    bool public catInitialized;

    uint[] public reserves;

    uint premiumDecay; // decay of premium account balance

    uint public premiumAccountBalance;

    uint public lastPremiumPaymentTime;

    uint rateSum;

    // ========== Functions ==========

    // ========== Constructor ==========
    constructor()
        ERC4626(IERC20(address(0))) // Set to nil, override with metadata
        ERC1155("") // Also set to nil, override with metadata
        ERC20("", "") // Also set to nil, override with metadata
    {}

    // ========== External ==========

    function initializeCat() external nonReentrant {
        // Can only be called once
        require(!catInitialized, "Cat already initialized");
        // Set proxyInit true
        catInitialized = true;
        Policy memory policy = POLICY();
        // Initialize reserves, reservesPerShare, excess, and last rebalance time
        for (uint i = 0; i < policy.category.length(); i++) {
            reserves.push(0);
            rateSum = rateSum + policy.premiums[i];
        }
        premiumDecay =
            ((rateSum / policy.category.length()) * policy.size) /
            BPS; //underlying tokens/year
        // Set lastRebalanceTime
        lastPremiumPaymentTime = block.timestamp;
    }

    function totalReserves() external view override returns (uint) {
        Policy memory policy = POLICY();
        return IERC20(policy.underlying).balanceOf(address(this));
    }

    function reservesPerShare(
        uint category
    ) external view override returns (uint rps) {
        rps = categoryReserves(category) / totalSupply(category); // beware rounding to zero
    }

    // create view function which gives current amount of collateral in pool.

    function payPremium(uint amount) external override {
        require(!settled, "bond already settled!");
        Policy memory policy = POLICY();
        // get premium payment tokens on contract
        IERC20(policy.underlying).transferFrom(
            msg.sender,
            address(this),
            amount
        );
        uint premiumUnit = (amount * BPS) / rateSum;
        // assign tokens to respective categories
        for (uint i = 0; i < policy.category.length(); i++) {
            reserves[i] =
                reserves[i] +
                ((premiumUnit * policy.premiums[i]) / BPS);
        }
        // increase premium account balance
        premiumAccountBalance = getPremiumAccountBalance() + amount;
        lastPremiumPaymentTime = block.timestamp();
    }

    function requestPayout() external override returns (bytes32) {}

    function assertionResolvedCallback(bytes32, bool) external override {}

    // ========== Public ==========

    /**
     * @dev can be called to access the policy struct
     * @dev assumed to be immutable
     */
    function POLICY() public pure returns (Policy memory policy) {
        bytes memory data;
        assembly {
            let posOfMetadataSize := sub(calldatasize(), 32)
            let size := calldataload(posOfMetadataSize)
            let location := sub(posOfMetadataSize, size)
            data := mload(64)
            // increment free memory pointer by metadata size + 32 bytes (length)
            mstore(64, add(data, add(size, 32)))
            mstore(data, size)
            let memPtr := add(data, 32)
            calldatacopy(memPtr, location, size)
        }
        policy = abi.decode(data, (Policy));
    }

    function categoryReserves(
        uint _category
    ) public view override returns (uint _categoryReserves) {
        _categoryReserves = reserves[_category];
    }

    function getPremiumAccountBalance() public view override returns (uint) {
        return
            premiumAccountBalance -
            ((premiumDecay * (block.timestamp - lastPremiumPaymentTime)) /
                secondsPerYear);
    }
}
