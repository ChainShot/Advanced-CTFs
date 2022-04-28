const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("Capture The Flag", function () {
  let contract, flag, proxy;
  beforeEach(async () => {
    flag = await ethers.getContractAt("YellowFlag", "0x16aAA5361F3E29F8e3BbCA64472d39399E303d1F");

    const Proxy = await ethers.getContractFactory("Proxy");
    proxy = await Proxy.deploy();
    await proxy.deployed();
    
    contract = await ethers.getContractAt("Contract", "0x93A520FDb31704837Da757235A60CbD18b381b8E");
  });

  it("should capture", async function () {
    await proxy.capture(contract.address);
    const signer0 = await ethers.provider.getSigner(0);
    const balance = await flag.balanceOf(await signer0.getAddress());
    assert.isAbove(balance.toNumber(), 0);
  });
});
