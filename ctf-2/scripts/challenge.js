async function main() {
  const Challenge = await ethers.getContractFactory("Challenge");
  const challenge = await Challenge.deploy();
  await challenge.deployed();

  console.log("Challenge deployed to:", challenge.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
