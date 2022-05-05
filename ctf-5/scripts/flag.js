async function main() {
  const Flag = await ethers.getContractFactory("IndigoFlag");
  const flag = await Flag.deploy();
  await flag.deployed();

  console.log("Flag deployed to:", flag.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
