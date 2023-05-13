// SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.16;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../src/CatFactory.sol";
import "../src/Cat.sol";
import "../src/interfaces/ICat.sol";
import "../src/mocks/mockERC20.sol";
import "forge-std/console.sol";

import "@openzeppelin/contracts/utils/math/Math.sol";
import {ERC1155Holder} from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract CatInvest is Test, ERC1155Holder {
    CatFactory factory;
    Cat policy;
    Mock mockErc20;

    function setUp() public {
        factory = new CatFactory();
        mockErc20 = new Mock();
    }

    function test_Invest(
        uint[3] calldata amounts

    ) public {
        ICat.Policy memory policyStruct = ICat.Policy({
            name: "Twiser",
            filecoinCID: "448jngf10248ut14tgj10g1gt41",
            expiry: block.timestamp + 52 weeks,
            holder: address(this),
            catType: "0x",
            paymentFrequency: 4 weeks,
            size: 10000*10**18,
            underlying: address(mockErc20),
            statement: "hello",
            whatThreeWords: "helloCatLion",
            radius: "fifty",
            category: ["easy", "medium", "bad"],
            premiums: [uint(100), uint(200), uint(300)]
        });
        policy = Cat(factory.createPolicy(policyStruct));
        uint[] memory classList = new uint[](3);
        address[] memory addressThisList = new address[](3);
        for (uint i = 0; i < 3; i++) {
            classList[i] = i;
            addressThisList[i] = address(this);
        }
        uint[] memory bondsAvailable = policy.balanceOfBatch(addressThisList, classList);
        uint thirdSupply = mockErc20.totalSupply() / 3 ;
        for (uint i; i < 3; i++) {
            vm.assume(amounts[i] <= Math.min(thirdSupply, bondsAvailable[i]));
        }
        uint totalAmounts = amounts[0] + amounts[1] + amounts[2];
        // Approve tokens
        mockErc20.approve(address(policy), totalAmounts);
        policy.invest(address(this), [amounts[0], amounts[1], amounts[2]]);
        assert(
            mockErc20.balanceOf(address(policy)) == totalAmounts
        );
    }
}
