// SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.16;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../src/CatFactory.sol";
import "../src/Cat.sol";
import "../src/interfaces/ICat.sol";
import "../src/mocks/mockERC20.sol";
import "forge-std/console.sol";

contract CatInvest is Test {
    Cat singleton; // dont know if needed
    Cat catContract;
    Mock mockErc20;

    function setUp() public {
        catContract = new Cat();
        mockErc20 = new Mock();
    }

    function test_Invest(
        address owner,
        address receiver,
        uint[3] calldata amounts
    ) public {
        vm.assume(amounts[0] < mockErc20.totalSupply() / 3);
        vm.assume(amounts[1] < mockErc20.totalSupply() / 3);
        vm.assume(amounts[2] < mockErc20.totalSupply() / 3);
        catContract.invest(owner, receiver, amounts);
    }
}
