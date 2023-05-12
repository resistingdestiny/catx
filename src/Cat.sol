// SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.16;

// ========== Interfaces ==========
import {ICat} from "./interfaces/ICat.sol";
import {OptimisticOracleV3Interface} from "./interfaces/OptimisticOracleV3Interface.sol";

// ========== Libraries ==========
import {AncillaryData as ClaimData} from "./libraries/AncillaryData.sol";

// ========== Contracts ==========
import {ERC4626, IERC20} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";


abstract contract Cat is ICat, ERC4626, ERC1155 {

    // ========== Functions ==========

    // ========== Constructor ==========
    constructor(
        address asset_) ERC4626(IERC20(asset_))  {}

    // ========== External ==========

    
}