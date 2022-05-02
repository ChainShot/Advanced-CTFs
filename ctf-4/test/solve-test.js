const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should allow minting of flag", async function () {
    const Flag = await hre.ethers.getContractFactory("RedFlag");
    const flag = await Flag.deploy("0xc65a7bb8d6351c1cf70c95a316cc6a92839c986682d98bc35f958f4883f9d2a8", "0x26700e13983fefbd9cf16da2ed70fa5c6798ac55062a4803121a869731e308d2");
  
    await flag.deployed();
  
    console.log("Red Flag deployed to:", flag.address);

    // Get the current token index
    var tokenIdx = await flag.tokenIdCounter();

    // XXX: Set the correct answer here!
    var answer = 10;
    var value = 100;

    // Mint the NFT!
    var tx = await flag.mint(answer, value);
    await tx.wait();

    // Ensure our token was minted
    expect(tx.value).to.equal(tokenIdx);
  });
  it("Should not allow minting of flag (wrong answer)", async function () {
    const Flag = await hre.ethers.getContractFactory("RedFlag");
    const flag = await Flag.deploy("0xc65a7bb8d6351c1cf70c95a316cc6a92839c986682d98bc35f958f4883f9d2a8", "0x26700e13983fefbd9cf16da2ed70fa5c6798ac55062a4803121a869731e308d2");
  
    await flag.deployed();
  
    console.log("Red Flag deployed to:", flag.address);

    // Get the current token index
    var tokenIdx = await flag.tokenIdCounter();

    // XXX: Set the correct answer here!
    var answer = 99;
    var value = 100;

    // Mint the NFT!
    var tx = flag.mint(answer, value);

    expect(tx).to.be.revertedWith("Wrong answer!");
  });
  it("Should not allow minting of flag (wrong value)", async function () {
    const Flag = await hre.ethers.getContractFactory("RedFlag");
    const flag = await Flag.deploy("0xc65a7bb8d6351c1cf70c95a316cc6a92839c986682d98bc35f958f4883f9d2a8", "0x26700e13983fefbd9cf16da2ed70fa5c6798ac55062a4803121a869731e308d2");
  
    await flag.deployed();
  
    console.log("Red Flag deployed to:", flag.address);

    // Get the current token index
    var tokenIdx = await flag.tokenIdCounter();

    // XXX: Set the correct answer here!
    var answer = 10;
    var value = 10;

    // Mint the NFT!
    var tx = flag.mint(answer, value);

    expect(tx).to.be.revertedWith("Wrong value! (Use the minimum value needed!)");
  });
});
