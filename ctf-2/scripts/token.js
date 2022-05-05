async function main() {
  const Token = await ethers.getContractFactory("SafeToken");
  const token = await Token.deploy(ethers.utils.parseEther("10000000000000000000"));
  await token.deployed();

  console.log("Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
