const FLAG_ADDRESS = "0xC95a07eADdEc282bFdF15e9422E88BE43f07D0b0";
const CONTRACT_ADDRESS = "0xf46C51fD4034855ec5dFE1cc22A78FE0A8820efc";

async function main() {
    const flag = await ethers.getContractAt("IndigoFlag", FLAG_ADDRESS);

    await flag.transferOwnership(CONTRACT_ADDRESS);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
