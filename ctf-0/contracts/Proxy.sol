//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface CaptureContract {
    function capture() external;
}

contract Proxy {
    function capture(address captureContract) external {
        CaptureContract(captureContract).capture();
    }
}
