const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("Capture The Flag", function () {
  let contract, flag, proxy;
  beforeEach(async () => {
    flag = await ethers.getContractAt("YellowFlag", "0x68CD31401aCada85d8d526bb348F88c5C988bB43");

    const Proxy = await ethers.getContractFactory("Proxy");
    proxy = await Proxy.deploy();
    await proxy.deployed();
    
    contract = await ethers.getContractAt("Contract", "0xd40d55F7B57E59ef5fD8B32559e0C3cbeaaD5cfa");
  });

  it("should capture", async function () {
    await proxy.capture(contract.address);
    const signer0 = await ethers.provider.getSigner(0);
    const balance = await flag.balanceOf(await signer0.getAddress());
    assert.isAbove(balance.toNumber(), 0);
  });
});
