const FLAG_ADDRESS = "0x3C60519F734E0Bc7dba0e2ad30D372D0a9E8aE03";
const CONTRACT_ADDRESS = "0xFb9AF15E418DDcF1B4653b334090332dE6917E28";

async function main() {
    const flag = await ethers.getContractAt("BlueFlag", FLAG_ADDRESS);

    await flag.transferOwnership(CONTRACT_ADDRESS);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
