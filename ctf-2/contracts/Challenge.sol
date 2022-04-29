// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface Flag {
    function mint(address) external;
}

contract Challenge {
    address flag;
    address token;
    
    function capture() external {
        require(IERC20(token).balanceOf(msg.sender) > 100 * 10 ** 18);
        Flag(flag).mint(tx.origin);
    }
}