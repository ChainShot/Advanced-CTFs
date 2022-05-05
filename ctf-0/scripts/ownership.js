const FLAG_ADDRESS = "0x68CD31401aCada85d8d526bb348F88c5C988bB43";
const CONTRACT_ADDRESS = "0xd40d55F7B57E59ef5fD8B32559e0C3cbeaaD5cfa";

async function main() {
    const flag = await ethers.getContractAt("YellowFlag", FLAG_ADDRESS);

    await flag.transferOwnership(CONTRACT_ADDRESS);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
