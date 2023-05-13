// SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.16;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../src/CatFactory.sol";
import "../src/Cat.sol";
import "forge-std/console.sol";

contract CatFlow is Test {
    CatFactory factory;
    Cat singleton;
    Cat catContract;

    // deploy factory
    function setUp() public {
        factory = new CatFactory();
        singleton = Cat(factory.CAT_SINGLETON());
    }

    // deploy cat contract
    function test_deployCat() public {
        catContract = new Cat();
        console.log(address(this));
        console.log("deployed");
        assert(address(this) != address(0));
    }

    // users deposit underlying tokens to cat contract, receiving bond tokens of chosen category
    function test_deposit() public {}

    // cat

    // users deposit underlying tokens to cat contract, receiving bond tokens of chosen category
    // continue until each category is filled with underlying tokens
    // // investors can withdraw while filling (ie '!full')

    // switch new state variable ('full'?) to 'true'
    // policy holder pays first premium payment, calls initializeCat() and policy begins
    // investor's funds depoisted to aave to earn yield
    // policy holder 'credits/account' decays at mean premium rate
    // policy holder 'credits/account' is topped up by calling payPremium()

    // policy cancelled ('settled' set to true) when:
    // - policy holder credits reach zero
    // -> all investor funds (+premium payments) available to be redeemed by bond token holders
    // - successful claim is made ( need to look into)
    // -> investor funds within affceted policies available for withdraw by policy holder
}
