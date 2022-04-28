async function main() {
  const Caller = await ethers.getContractFactory("Caller");
  const caller = await Caller.deploy();
  await caller.deployed();

  console.log("Caller deployed to:", caller.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
