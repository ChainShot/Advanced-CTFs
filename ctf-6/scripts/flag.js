async function main() {
  const Flag = await ethers.getContractFactory("Flag");
  const flag = await Flag.deploy();
  await flag.deployed();

  console.log("Flag deployed to:", flag.address);

  // transfer ownership to the compromised account
  await flag.transferOwnership("0xa25256073cB38b8CAF83b208949E7f746f3BEBDc");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
