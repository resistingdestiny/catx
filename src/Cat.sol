// SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.16;

// ========== Interfaces ==========
import {ICat} from "./interfaces/ICat.sol";
import {OptimisticOracleV3Interface} from "./interfaces/OptimisticOracleV3Interface.sol";

// ========== Libraries ==========
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {AncillaryData as ClaimData} from "./libraries/AncillaryData.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

// ========== Contracts ==========
import {ERC1155Supply, ERC1155, IERC1155, IERC1155MetadataURI} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import {ERC1155Holder, IERC1155Receiver, ERC1155Receiver} from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Cat is ICat, ERC1155Supply, ERC1155Holder, ReentrancyGuard {
    // ========== Constants ==========
    uint public constant BPS = 10000;
    uint public constant year = 365 days;
    uint public constant CLASS_A = 0;
    uint public constant CLASS_B = 1;
    uint public constant CLASS_C = 2;

    address public immutable factory;

    // ========== State variables ==========

    /**
     * @notice whether policy has been settled, initialized as false
     * @notice one bool, ie single use policy
     */
    bool public settled;

    bool public initialized;

    bool public catInitialized;

    uint[3] public reserves;

    uint public premiumDecay; // decay of premium account balance

    uint public premiumAccountBalance;

    uint public lastPremiumPaymentTime;

    uint public rateSum; // Sum of the rates

    // ========== Functions ==========

    // ========== Constructor ==========
    constructor()
        ERC1155("") // Also set to nil, override with metadata
    {
        factory = msg.sender;
    }

    // ========== External ==========

    function initializePolicy() external returns (bool) {
        require(!initialized, "Policy already initialized"); // Ensures this function can only be called once
        initialized = true;
        require(msg.sender == factory, "Policy must be initialized by factory");
        Policy memory policy = POLICY(); // Loading policy to memory
        // Mint bond tokens according to metadata
        uint bucketPartition = (policy.size * 10 ** 18) /
            policy.category.length;
        uint[] memory classList = new uint[](3);
        uint[] memory classBuckets = new uint[](3);
        for (uint i = 0; i < 3; i++) {
            classList[i] = i;
            classBuckets[i] = bucketPartition;
        }
        _mintBatch(address(this), classList, classBuckets, "");
        // Calculate rateSum
        for (uint i = 0; i < policy.category.length; i++) {
            rateSum += policy.premiums[i];
        }
        premiumDecay =
            ((rateSum / policy.category.length) * policy.size * 10**18) /
            (BPS * year); //underlying tokens/second
        return true;
    }

    function invest(address receiver, uint[3] calldata amounts) external {
        // Require that Cat has not be initialized
        require(!catInitialized, "Cat already initialized");
        // Load balances of bonds on contract
        uint[] memory classList = new uint[](3);
        uint[] memory amountsList = new uint[](3);
        address[] memory addressThisList = new address[](3);
        for (uint i = 0; i < 3; i++) {
            classList[i] = i;
            addressThisList[i] = address(this);
        }
        uint[] memory bondsAvailable = balanceOfBatch(addressThisList, classList);
        uint totalAmount;
        // Check that amounts are less than or equal to the bonds available, populating amounts sum as we go,
        // and loading amounts into memory
        for (uint i = 0; i < 3; i++) {
            require(bondsAvailable[i] >= amounts[i], "Insufficient bonds available");
            totalAmount += amounts[i];
            amountsList[i] = amounts[i];
        }
        // Load policy to memory
        Policy memory policy = POLICY();
        // Transfer amounts to contract
        SafeERC20.safeTransferFrom(IERC20(policy.underlying), msg.sender, address(this), totalAmount);
        // Transfer bond tokens to receiver
        _safeBatchTransferFrom(address(this), receiver, classList, amountsList, "");
        // I think we populate reserves later since we are essentially issuing bonds 1 to 1 with collateral until then
        emit Invest(msg.sender, receiver, amounts);
    }

    function refund(address receiver, uint[3] calldata amounts) external {
        require(!catInitialized, "Cannot obtain a refund if policy has started");
        // Load class and amounts list to memory, also populating totalAmount as we go
        uint[] memory classList = new uint[](3);
        uint[] memory amountsList = new uint[](3);
        uint totalAmount;
        for (uint i = 0; i < 3; i++) {
            classList[i] = i;
            amountsList[i] = amounts[i];
            totalAmount += amounts[i];
        }
        // Transfer bond tokens back to contract
        safeBatchTransferFrom(msg.sender, address(this), classList, amountsList, "");
        // Load policy to memory
        Policy memory policy = POLICY();
        // Transfer amounts back to receiver
        SafeERC20.safeTransferFrom(IERC20(policy.underlying), address(this), receiver, totalAmount);
        emit Refund(msg.sender, receiver, amounts);
    }

    function initializeCat(uint amount) external {
        // Can only be called once
        require(!catInitialized, "Cat already initialized");
        catInitialized = true;
        // Load class and addressThis list to memory
        uint[] memory classList = new uint[](3);
        address[] memory addressThisList = new address[](3);
        for (uint i = 0; i < 3; i++) {
            classList[i] = i;
            addressThisList[i] = address(this);
        }
        // Require that contract has no further bonds on hand, loading total supply of bonds as we go
        uint[] memory bondsAvailable = balanceOfBatch(addressThisList, classList);
        uint totalBonds;
        for (uint i = 0; i < 3; i++) {
            require(bondsAvailable[i] == 0, "Bond still available");
            totalBonds += totalSupply(i);
        }
        // Load policy into memory
        Policy memory policy = POLICY();
        // Load underlying and require that underlying >= bonds 
        require(IERC20(policy.underlying).balanceOf(address(this)) >= totalBonds, "Insufficient collateral");
        // Emit cat initialized event
        // Make premium payment
        payPremium(amount);
    }

    function totalReserves() external view override returns (uint) {
        Policy memory policy = POLICY();
        return IERC20(policy.underlying).balanceOf(address(this));
    }

    function reservesPerShare(
        uint category
    ) external view override returns (uint rps) {
        rps = reserves[category] / totalSupply(category); // beware rounding to zero
    }

    // create view function which gives current amount of collateral in pool.

    function requestPayout() external override returns (bytes32) {}

    function assertionResolvedCallback(bytes32, bool) external override {}

    // ========== Public ==========

    function payPremium(uint amount) public {
        require(!settled, "Bond already settled!");
        require(catInitialized, "Cat not initialized");
        Policy memory policy = POLICY();
        // get premium payment tokens on contract
        IERC20(policy.underlying).transferFrom(
            msg.sender,
            address(this),
            amount
        );
        uint premiumUnit = (amount * BPS) / rateSum;
        // assign tokens to respective categories
        for (uint i = 0; i < policy.category.length; i++) {
            reserves[i] =
                reserves[i] +
                ((premiumUnit * policy.premiums[i]) / BPS);
        }
        // increase premium account balance
        premiumAccountBalance = getPremiumAccountBalance() + amount;
        lastPremiumPaymentTime = block.timestamp;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC1155, ERC1155Receiver) returns (bool) {
        return
            interfaceId == type(IERC1155).interfaceId ||
            interfaceId == type(IERC1155MetadataURI).interfaceId ||
            interfaceId == type(IERC1155Receiver).interfaceId ||
            super.supportsInterface(interfaceId);
    }

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

    function getPremiumAccountBalance() public view override returns (uint) {
        return
            premiumAccountBalance -
            (premiumDecay * (block.timestamp - lastPremiumPaymentTime));
    }
}
