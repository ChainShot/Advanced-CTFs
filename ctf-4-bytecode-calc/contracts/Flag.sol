// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RedFlag is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter public tokenIdCounter;

    // keccak256 hash of the answer
    bytes32 correctHashAnswer;
    // keccak256 of the minimum value needed
    bytes32 correctHashValue;

    constructor(bytes32 _correctHashAnswer, bytes32 _correctHashValue) ERC721("RedFlag", "REDSLED") {
        correctHashAnswer = _correctHashAnswer;
        correctHashValue = _correctHashValue;
    }

    function mint(uint256 answer, uint256 value) isCorrect(answer, value) public returns(uint256) {
        uint256 tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        _mint(tx.origin, tokenId);

        return tokenId;
    }

    modifier isCorrect(uint256 answer, uint256 value) {
        require(keccak256(abi.encode(answer)) == correctHashAnswer, "Wrong answer!");
        require(keccak256(abi.encode(value)) == correctHashValue, "Wrong value! (Use the minimum value needed!)");
        _;
    }
}