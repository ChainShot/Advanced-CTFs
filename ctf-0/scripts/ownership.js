const FLAG_ADDRESS = "0x16aAA5361F3E29F8e3BbCA64472d39399E303d1F";
const CONTRACT_ADDRESS = "0x93A520FDb31704837Da757235A60CbD18b381b8E";

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
