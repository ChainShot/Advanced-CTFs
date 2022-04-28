//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface Flag {
    function mint(address) external;
}

contract Caller {
    address constant calleeAddr = 0x76E0923B735Cbf86B69e7B8fE558886f3840Ff1d;
    address constant flag = 0x80C96D73e71798bD074899DaA7Ba8F710feA3579;

    uint256 x;
    bytes32 y;
    mapping(address => bool) switches;

    fallback() external {
        (bool success, ) = calleeAddr.delegatecall(msg.data);
        require(success);

        require(switches[msg.sender], "msg.sender's switch is false");
        Flag(flag).mint(msg.sender);
    }
}