// SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.16;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../src/CatFactory.sol";
import "../src/interfaces/ICat.sol";

contract FundMetadata is Test {
    CatFactory factory;
    ICat policy;

    function setUp() public {
        factory = new CatFactory();
    }

    function testMetadata(ICat.Policy memory policyStruct) public { 
        vm.assume(policyStruct.size <= 2^128);   
        address newPolicy = factory.createPolicy(policyStruct);
        assert(keccak256(abi.encode(policyStruct)) == keccak256(abi.encode(ICat(newPolicy).POLICY())));
    }
}