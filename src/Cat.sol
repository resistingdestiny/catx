// SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.16;

// ========== Interfaces ==========
import {ICat} from "./interfaces/ICat.sol";
import {OptimisticOracleV3Interface} from "./interfaces/OptimisticOracleV3Interface.sol";

// ========== Libraries ==========
import {AncillaryData as ClaimData} from "./libraries/AncillaryData.sol";

// ========== Contracts ==========
import {ERC4626, ERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";


contract Cat is ICat, ERC4626, ERC1155 {
    // ========== Functions ==========

    // ========== Constructor ==========
    constructor() 
        ERC4626(IERC20(address(0))) // Set to nil, override with metadata
        ERC1155("") // Also set to nil, override with metadata
        ERC20("", "") // Also set to nil, override with metadata
        {} 

    // ========== External ==========

    function settled() external view returns (bool) {}

    function reserves(uint) external view override returns (uint) {}

    function reservesPerShare(uint) external view override returns (uint) {}

    function getPolicy() external view override returns (Policy memory) {}

    function payPremium(uint) external override {}

    function getPremiumAccountBalance() external view override returns (uint) {}

    function requestPayout() external override returns (bytes32) {}

    function assertionResolvedCallback(bytes32, bool) external override {}

    // ========== Public ==========

    /**
     * @dev can be called to access the policy struct
     * @dev assumed to be immutable
     */
    function POLICY() external pure returns (Policy memory policy) {
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

}