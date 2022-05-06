const FLAG_ADDRESS = "0x4d367Fd650Afb5024287493B0ac7a1a04730eC79";
const CONTRACT_ADDRESS = "0xa5112380909A2f4aC88bEBC99933dFC65DC65CaB";

async function main() {
    const flag = await ethers.getContractAt("OrangeFlag", FLAG_ADDRESS);

    await flag.transferOwnership(CONTRACT_ADDRESS);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
