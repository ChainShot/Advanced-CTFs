const { abi: routerAbi } = require("@uniswap/v2-periphery/build/IUniswapV2Router02.json");
const { abi: factoryAbi } = require("@uniswap/v2-core/build/IUniswapV2Factory.json");
const { abi: pairAbi } = require("@uniswap/v2-core/build/IUniswapV2Pair.json");

const uniswapRouterAddr = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const uniswapFactoryAddr = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

const tokenDeposit = ethers.utils.parseEther("1200");
const etherDeposit = ethers.utils.parseEther("5");

async function createPool() {
    const signer0 = await ethers.provider.getSigner(0);
    const token = await ethers.getContractAt("Buffalol", "0x2c9090cEFC236040D87CFFE8292d90e4c92f5728")
    const tx1 = await token.approve(uniswapRouterAddr, tokenDeposit);
    await tx1.wait();
    const router = await ethers.getContractAt(routerAbi, uniswapRouterAddr);
    const tx2 = await router.addLiquidityETH(token.address, tokenDeposit, 0, 0, await signer0.getAddress(), Date.now(), {
      value: etherDeposit
    });
    const receipt = await tx2.wait();
    const factoryInterface = new ethers.utils.Interface(factoryAbi);
    const factoryEvents = receipt.logs.filter(x => x.address === uniswapFactoryAddr).map(x => factoryInterface.parseLog(x));
    const pairCreatedEvent = factoryEvents.find(x => x.name === "PairCreated");
    const pairAddress = pairCreatedEvent.args.pair;
    const pair = await ethers.getContractAt(pairAbi, pairAddress);

    console.log(pair);
}

createPool();