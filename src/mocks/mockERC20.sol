// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Mock is ERC20 {
    constructor() ERC20("Mock", "MCK") {
        _mint(msg.sender, 50000 * 10 ** decimals());
    }
}
