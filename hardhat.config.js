require("@nomiclabs/hardhat-waffle");
require("hardhat-contract-sizer");
require("hardhat-gas-reporter");
require('hardhat-storage-layout');
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {},
        rinkeby: {
            url: "https://rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY,
            accounts: [process.env.PRIVATE_KEY]
        },
        bsctestnet: {
            url: "https://data-seed-prebsc-2-s2.binance.org:8545/",
            accounts: [process.env.PRIVATE_KEY]
        },
        bscmainnet: {
            url: "https://bsc-dataseed3.binance.org",
            accounts: [process.env.PRIVATE_KEY]
        }
    },
    solidity: {
        version: "0.8.9",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    mocha: {
        timeout: 1000000
    },
    contractSizer: {
        alphaSort: true,
        disambiguatePaths: false,
        runOnCompile: true,
        strict: true
    }
};
