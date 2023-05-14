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
        factory = new CatFactory(address(0));
    }

    function testMetadata(ICat.Policy memory policyStruct) public { 
        vm.assume(policyStruct.size <= 2**128);
        vm.assume(policyStruct.premiums[0] <= factory.maxPremium());
        vm.assume(policyStruct.premiums[1] <= factory.maxPremium());
        vm.assume(policyStruct.premiums[2] <= factory.maxPremium());
        address newPolicy = factory.createPolicy(policyStruct);
        assert(keccak256(abi.encode(policyStruct)) == keccak256(abi.encode(ICat(newPolicy).POLICY())));
    }
}