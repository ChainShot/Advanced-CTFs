async function main() {
  const Callee = await ethers.getContractFactory("Callee");
  const callee = await Callee.deploy();
  await callee.deployed();

  console.log("Callee deployed to:", callee.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
