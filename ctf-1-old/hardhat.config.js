require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.4",
  networks: {
    okovan: {
      url: process.env.RPC,
      accounts: [process.env.PRIVATE_KEY]
    },
    hardhat: {
      forking: {
        url: process.env.RPC,
        blockNumber: 6795661
      }
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN
  }
};
