require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.4",
  networks: {
    gorli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.FUNDER_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN
  }
};
