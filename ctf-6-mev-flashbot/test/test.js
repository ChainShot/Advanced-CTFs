const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("Flag", function () {
  let flag;
  let addr0, signer0, signer1;
  beforeEach(async () => {
    [addr0] = await ethers.provider.listAccounts();
    [signer0, signer1] = await ethers.getSigners();

    const Flag = await hre.ethers.getContractFactory("Flag");
    flag = await Flag.deploy();
    await flag.deployed();
  });

  it("should allow the owner to mint a new token", async () => {
    await flag.mint(addr0);
    const isOwner = await flag.ownerOf(0);
    assert(isOwner);
  });

  it("should revert if a non-owner to mint a new token", async () => {
    const tx = flag.connect(signer1).mint(addr0);
    expect(tx).to.be.reverted;
  });
});