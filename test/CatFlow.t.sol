// SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.16;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../src/CatFactory.sol";
import "../src/Cat.sol";
import "../src/interfaces/ICat.sol";
import "forge-std/console.sol";

contract CatFlow is Test {
    CatFactory factory;
    Cat singleton;
    Cat catContract;

    // deploy factory
    function setUp() public {
        factory = new CatFactory(address(0));
        singleton = Cat(factory.CAT_SINGLETON());
    }

    // deploy cat contract
    function test_deployCat(ICat.Policy memory policyStruct) public {
        vm.assume(policyStruct.size <= 2**128);
        vm.assume(policyStruct.premiums[0] <= factory.maxPremium());
        vm.assume(policyStruct.premiums[1] <= factory.maxPremium());
        vm.assume(policyStruct.premiums[2] <= factory.maxPremium());
        factory.createPolicy(policyStruct);
        assert(address(this) != address(0));
    }

    // users deposit underlying tokens to cat contract, receiving bond tokens of chosen category
    function test_deposit() public {}

    // continue until each category is filled with underlying tokens

    // // investors can withdraw while filling (ie '!filled')

    // switch new state variable ('filled'?) to 'true'

    // policy holder pays first premium payment, calls initializeCat() and policy begins
    // **investor's funds deposited to aave to earn yield**

    // policy holder 'credits/account' decays at mean premium rate
    function test_policyDecay() public {}

    // policy holder 'credits/account' is topped up by calling payPremium()

    // policy cancelled ('settled' set to true) when:
    // - policy holder credits reach zero
    // -> all investor funds (+premium payments) available to be redeemed by bond token holders
    // - successful claim is made ( need to look into)
    // -> investor funds within affected policies available for withdraw by policy holder
}
