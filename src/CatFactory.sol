// SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.16;

// ========== Contracts ==========

import {Cat, ICat} from "./Cat.sol";

contract CatFactory {
    // ========== Constants ==========

    address immutable CAT_SINGLETON; // Stores the address of the abstract cat contract deployed in the constructor

    // ========== Constructor ==========
    constructor() {
        // Deploy cat singleton
        CAT_SINGLETON = address(new Cat());
        require(CAT_SINGLETON != address(0), "Unable to deploy CAT_SINGLETON");
    }

    // ========== Functions ==========

    // ========== External ==========

    function createPolicy(ICat.Policy calldata) external returns (address policy) {
        // Deploy policy as metaproxy
        policy = _metaProxyFromCalldata(CAT_SINGLETON);
        require(policy != address(0), "Unable to deploy policy");
    }

    // ========== Private ==========

    // Forked from https://github.com/ethereum/EIPs/blob/master/assets/eip-3448/MetaProxyFactory.sol
    function _metaProxyFromCalldata (address targetContract) internal returns (address addr) {
    // the following assembly code (init code + contract code) constructs a metaproxy.
    assembly {
      // load free memory pointer as per solidity convention
      let start := mload(64)
      // copy
      let ptr := start
      // deploy code (11 bytes) + first part of the proxy (21 bytes)
      mstore(ptr, 0x600b380380600b3d393df3363d3d373d3d3d3d60368038038091363936013d73)
      ptr := add(ptr, 32)

      // store the address of the contract to be called
      mstore(ptr, shl(96, targetContract))
      // 20 bytes
      ptr := add(ptr, 20)

      // the remaining proxy code...
      mstore(ptr, 0x5af43d3d93803e603457fd5bf300000000000000000000000000000000000000)
      // ...13 bytes
      ptr := add(ptr, 13)

      // now calculate the size and copy the metadata
      // - 4 bytes function signature
      let size := sub(calldatasize(), 4)
      // copy
      calldatacopy(ptr, 4, size)
      ptr := add(ptr, size)
      // store the size of the metadata at the end of the bytecode
      mstore(ptr, size)
      ptr := add(ptr, 32)

      // The size is deploy code + contract code + calldatasize - 4 + 32.
      addr := create(0, start, sub(ptr, start))
    }
  }
}