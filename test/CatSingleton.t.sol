// SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.16;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../src/CatFactory.sol";

contract FundDeployment is Test {
    CatFactory factory;
    Cat singleton;

    function setUp() public {
        factory = new CatFactory();
        singleton = Cat(factory.CAT_SINGLETON());
    }

    function testSingleton() public view {
        // Check singleton is not the zero address
        assert(address(singleton) != address(0));
    }
}