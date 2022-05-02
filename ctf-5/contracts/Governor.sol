//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Governor {
    ERC20 votingToken;

    struct Proposal {
        uint votesFor;
        uint votesAgainst;

        bytes payload;
        address to;
        
        bool executed;

        mapping(address => bool) hasVoted;
    }

    Proposal[] proposals;

    constructor(ERC20 votingToken_) {
        votingToken = votingToken_;
    }

    function addProposal(bytes calldata payload, address to) external returns(uint proposalId) {
        proposalId = proposals.length;
        Proposal storage p = proposals.push();
        p.payload = payload;
        p.to = to;
    }

    function executeProposal(uint proposalIndex) external {
        require(!proposals[proposalIndex].executed, "Proposal already executed!");
        require(proposals[proposalIndex].votesFor >= 1000 * 10 ** 18, "Not enough votes for!");

        Proposal storage p = proposals[proposalIndex];

        p.executed = true;

        (bool success, ) = p.to.call(p.payload);

        require(success);
    }

    function vote(uint proposalIndex, bool support) external {
        require(!proposals[proposalIndex].hasVoted[msg.sender]);

        if(support) {
            proposals[proposalIndex].votesFor += votingToken.balanceOf(msg.sender);
        }
        else {
            proposals[proposalIndex].votesAgainst += votingToken.balanceOf(msg.sender);
        }
    }
}