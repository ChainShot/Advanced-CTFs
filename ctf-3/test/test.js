const { assert } = require("chai");
const { abi: routerAbi } = require("@uniswap/v2-periphery/build/IUniswapV2Router02.json");
const { abi: factoryAbi } = require("@uniswap/v2-core/build/IUniswapV2Factory.json");
const { abi: pairAbi } = require("@uniswap/v2-core/build/IUniswapV2Pair.json");

const uniswapRouterAddr = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const uniswapFactoryAddr = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

describe("Buffalol", function () {
  const supply = ethers.utils.parseEther("10000");
  let signer0, signer1;
  let token;
  beforeEach(async () => {
    [signer0, signer1] = await ethers.getSigners();

    const Buffalol = await ethers.getContractFactory("Buffalol");
    token = await Buffalol.deploy(supply);
    await token.deployed();
  });

  it("should have minted", async function () {
    const balance = await token.balanceOf(await signer0.getAddress());
    assert.equal(balance.toString(), supply.toString());
  });

  describe("creating a pool", () => {
    let pair;
    const tokenDeposit = ethers.utils.parseEther("1200");
    const etherDeposit = ethers.utils.parseEther("10");
    beforeEach(async () => {
      await token.approve(uniswapRouterAddr, tokenDeposit);
      const router = await ethers.getContractAt(routerAbi, uniswapRouterAddr);
      const tx = await router.addLiquidityETH(token.address, tokenDeposit, 0, 0, await signer0.getAddress(), Date.now(), {
        value: etherDeposit
      });
      const receipt = await tx.wait();
      const factoryInterface = new ethers.utils.Interface(factoryAbi);
      const factoryEvents = receipt.logs.filter(x => x.address === uniswapFactoryAddr).map(x => factoryInterface.parseLog(x));
      const pairCreatedEvent = factoryEvents.find(x => x.name === "PairCreated");
      const pairAddress = pairCreatedEvent.args.pair;
      pair = await ethers.getContractAt(pairAbi, pairAddress);
    });

    it("should have liquidity", async () => {
      const { reserve0, reserve1 } = await pair.getReserves();
      assert(reserve0.eq(tokenDeposit));
      assert(reserve1.eq(etherDeposit));
    });

    describe("attempting to pass a governance vote", () => {
      let governor, flashloan, challenge;
      beforeEach(async () => {
        const Governor = await ethers.getContractFactory("Governor");
        governor = await Governor.deploy(token.address);
        await governor.deployed();

        const Challenge = await ethers.getContractFactory("Challenge");
        challenge = await Challenge.deploy();
        await challenge.deployed();

        const FlashLoan = await ethers.getContractFactory("FlashLoan");
        flashloan = await FlashLoan.deploy(pair.address, token.address, governor.address, challenge.address);
        await flashloan.deployed();

        await token.transfer(flashloan.address, ethers.utils.parseEther("4"));
        await flashloan.execute();
      });

      it("should", async () => {

      });
    });
  });
});

