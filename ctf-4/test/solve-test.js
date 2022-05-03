const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should allow minting of flag", async function () {
    const Flag = await hre.ethers.getContractFactory("RedFlag");
    const flag = await Flag.deploy("0xc65a7bb8d6351c1cf70c95a316cc6a92839c986682d98bc35f958f4883f9d2a8", "0x26700e13983fefbd9cf16da2ed70fa5c6798ac55062a4803121a869731e308d2");
  
    await flag.deployed();
  
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
  
    // Get the current token index
    var tokenIdx = await flag.tokenIdCounter();

    // XXX: Set the correct answer here!
    var answer = 10;
    var value = 10;

    // Mint the NFT!
    var tx = flag.mint(answer, value);

    expect(tx).to.be.revertedWith("Wrong value! (Use the minimum value needed!)");
  });
  it("Should solve the challenge", async function () {
    const Challenge = await hre.ethers.getContractFactory("Challenge2");
    const challenge = await Challenge.deploy();
  
    await challenge.deployed();
  
    const [wallet] = await ethers.getSigners();

    // keccak256("doCalc()")
    var func_selector = "0xe6581e4c"
    var answer = 10;
    var packed_data = ethers.utils.solidityPack(["bytes4", "uint"], [func_selector, answer]);
  
    // XXX: One additional override must be set here
    var tx = await wallet.sendTransaction({
      value: ethers.utils.parseUnits("100", "wei"),
      to: challenge.address,
      data: packed_data,
    });

    var rec = await tx.wait();
    expect(rec.logs.length).to.not.equal(0);
  });
  it("Should not solve the challenge (wrong answer)", async function () {

    const Challenge = await hre.ethers.getContractFactory("Challenge2");
    const challenge = await Challenge.deploy();
  
    await challenge.deployed();
  
    const [wallet] = await ethers.getSigners();

    // keccak256("doCalc()")
    var func_selector = "0xe6581e4c"
    var answer = 42;
    var packed_data = ethers.utils.solidityPack(["bytes4", "uint"], [func_selector, answer]);
  
    // XXX: One additional override must be set here
    var tx = wallet.sendTransaction({
      value: ethers.utils.parseUnits("100", "wei"),
      to: challenge.address,
      data: packed_data,
    });

    expect(tx).to.be.revertedWith("");

  });
  it("Should not solve the challenge (wrong value)", async function () {

    const Challenge = await hre.ethers.getContractFactory("Challenge2");
    const challenge = await Challenge.deploy();
  
    await challenge.deployed();
  
    const abi = ["event Winner(address winnerAddr)"];
    const [wallet] = await ethers.getSigners();

    // keccak256("doCalc()")
    var func_selector = "0xe6581e4c"
    var answer = 10;
    var packed_data = ethers.utils.solidityPack(["bytes4", "uint"], [func_selector, answer]);
  
    // XXX: One additional override must be set here
    var tx = wallet.sendTransaction({
      value: ethers.utils.parseUnits("50", "wei"),
      to: challenge.address,
      data: packed_data,
    });

    expect(tx).to.be.revertedWith("");
  });
});
