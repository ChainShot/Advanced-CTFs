// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Flag {
    function mint(address) external;
}

contract Challenge {
    address owner = 0x894c963d57D46793ea0d710C816a1804f5A2e272;
    address flag;
    
    function capture() external {
        require(msg.sender == owner);
        Flag(flag).mint(tx.origin);
    }
}