//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Buffalol is ERC20 {
    constructor(uint supply) ERC20("Buffalol", "BLL") {
        _mint(msg.sender, supply);
    }
}