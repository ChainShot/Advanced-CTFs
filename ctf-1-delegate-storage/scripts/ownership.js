const FLAG_ADDRESS = "0x04c8D7f49f6A7D59AF4Eea4a9E875Ef850e7b490";
const CONTRACT_ADDRESS = "0x97d5B3DbD047Cc1E75593f0Dcc75B7fa4efd4116";

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
