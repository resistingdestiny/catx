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
        uint[] memory classList = new uint[](3);
        // uint[] memory amountsList = new uint[](3);
        address[] memory addressThisList = new address[](3);
        for (uint i = 0; i < 3; i++) {
            classList[i] = i;
            addressThisList[i] = address(this);
        }
        // address[] memory addressThisList = [
        //     address(this),
        //     address(this),
        //     address(this)
        // ];
        // uint256[] memory classList = [0, 1, 2];
        vm.assume(amounts[0] < mockErc20.totalSupply() / 3);
        vm.assume(amounts[1] < mockErc20.totalSupply() / 3);
        vm.assume(amounts[2] < mockErc20.totalSupply() / 3);
        vm.assume(
            amounts[0] <
                catContract.balanceOfBatch(addressThisList, classList)[0]
        );
        vm.assume(
            amounts[1] <
                catContract.balanceOfBatch(addressThisList, classList)[1]
        );
        vm.assume(
            amounts[2] <
                catContract.balanceOfBatch(addressThisList, classList)[2]
        );
        catContract.invest(owner, receiver, amounts);
        assert(
            mockErc20.balanceOf(address(this)) ==
                amounts[0] + amounts[1] + amounts[2]
        );
    }
}
