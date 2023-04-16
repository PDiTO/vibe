require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    arbitrumGoerli: {
      url: process.env.ARBIGO,
      accounts: [
        process.env.PRIVATE_KEY,
        process.env.PRIVATE_KEY_2,
        process.env.PRIVATE_KEY_3,
        process.env.PRIVATE_KEY_4,
        process.env.PRIVATE_KEY_5,
        process.env.PRIVATE_KEY_6,
        process.env.PRIVATE_KEY_7,
        process.env.PRIVATE_KEY_8,
        process.env.PRIVATE_KEY_9,
      ],
      gasPrice: 1700000000,
    },
    avalanche: {
      url: process.env.AVAX,
      accounts: [
        process.env.PRIVATE_KEY,
        process.env.PRIVATE_KEY_2,
        process.env.PRIVATE_KEY_3,
        process.env.PRIVATE_KEY_4,
        process.env.PRIVATE_KEY_5,
        process.env.PRIVATE_KEY_6,
        process.env.PRIVATE_KEY_7,
        process.env.PRIVATE_KEY_8,
        process.env.PRIVATE_KEY_9,
      ],
    },
    avalancheFuji: {
      url: process.env.AVAXFUJI,
      accounts: [
        process.env.PRIVATE_KEY,
        process.env.PRIVATE_KEY_2,
        process.env.PRIVATE_KEY_3,
        process.env.PRIVATE_KEY_4,
        process.env.PRIVATE_KEY_5,
        process.env.PRIVATE_KEY_6,
        process.env.PRIVATE_KEY_7,
        process.env.PRIVATE_KEY_8,
        process.env.PRIVATE_KEY_9,
      ],
    },
    polygonMumbai: {
      url: process.env.MUMBAI,
      accounts: [
        process.env.PRIVATE_KEY,
        process.env.PRIVATE_KEY_2,
        process.env.PRIVATE_KEY_3,
        process.env.PRIVATE_KEY_4,
        process.env.PRIVATE_KEY_5,
        process.env.PRIVATE_KEY_6,
        process.env.PRIVATE_KEY_7,
        process.env.PRIVATE_KEY_8,
        process.env.PRIVATE_KEY_9,
      ],
      gasPrice: 10863273232,
    },
    arbitrumNova: {
      url: process.env.ARBINOVA,
      accounts: [
        process.env.PRIVATE_KEY,
        process.env.PRIVATE_KEY_2,
        process.env.PRIVATE_KEY_3,
        process.env.PRIVATE_KEY_4,
        process.env.PRIVATE_KEY_5,
        process.env.PRIVATE_KEY_6,
        process.env.PRIVATE_KEY_7,
        process.env.PRIVATE_KEY_8,
        process.env.PRIVATE_KEY_9,
      ],
    },
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },
};
