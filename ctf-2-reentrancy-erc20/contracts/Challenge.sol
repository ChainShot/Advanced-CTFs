// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface Flag {
    function mint(address) external;
}

contract Challenge {
    address flag = 0x4d367Fd650Afb5024287493B0ac7a1a04730eC79;
    address token = 0xbAcc21137F1B0CA03d7e796CCc1E1d47DD9fe839;
    
    function capture() external {
        require(IERC20(token).balanceOf(msg.sender) > 100 * 10 ** 18);
        Flag(flag).mint(tx.origin);
    }
}