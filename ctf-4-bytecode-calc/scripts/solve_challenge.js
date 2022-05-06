// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy
    const challenge = await hre.ethers.getContractAt("Challenge2", "0x0833Aeb9eE31CAedBB0842b9422d2Df5d926169a")


    const abi = ["event Winner(address winnerAddr)"];
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
    // Listen for the Winner event
    let iface = new ethers.utils.Interface(abi);
    let log;
    if (rec.logs.length != 0) {
        log = iface.parseLog(rec.logs[0]); // here you can add your own logic to find the correct log
        console.log('Beat the challenge, Winner event emitted!')
        console.log(log)
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
