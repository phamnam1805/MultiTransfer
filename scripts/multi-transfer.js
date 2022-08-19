const { ethers } = require("hardhat");
require("dotenv").config();

const MultiTransferAddress = process.env.MULTI_TRANSFER;
const decimals = 1e18;
let tokenAddress = "0x524aFD46bab01a007b56897AeC5306042ae88b3c";
let listAddresses = ["0x1B63c70716e0211fC5F95AB9c3F2AFdebcd1869E", "0x82b5d1638B84637C30e9Dc7b19CCB196fc3cA622"];
let listAmounts = [100, 200];

async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function main() {
    owner = await ethers.getSigner();

    let multiTransfer = await ethers.getContractAt("MultiTransfer", MultiTransferAddress);
    let token = await ethers.getContractAt("IERC20", tokenAddress);

    let totalAmount = 0;
    for (let i = 0; i < listAmounts.length; i++) {
        totalAmount += listAmounts[i];
        listAmounts[i] = ethers.utils.parseEther(listAmounts[i].toString());
    }
    totalAmount = ethers.utils.parseEther(totalAmount.toString());

    const getBalance = async (address) => {
        let balance = await token.balanceOf(address);
        return balance / decimals;
    }

    const printBalance = async (address) => {
        console.log("Address ", address, " balance: ", await getBalance(address));
    }

    console.log("Approving ", totalAmount, " to contract MultiTransfer");
    await token.connect(owner).approve(multiTransfer.address, totalAmount);
    await sleep(10000);

    console.log("=============== Before ===============");
    console.log("Owner balance: ", await getBalance(owner.address));
    for (let i = 0; i < listAddresses.length; i++) {
        await printBalance(listAddresses[i]);
    }

    console.log("Multi transfering . . .");
    await multiTransfer.connect(owner).multiTransfer(tokenAddress, listAddresses, listAmounts);
    await sleep(10000);

    console.log("=============== After ===============");
    console.log("Owner balance: ", await getBalance(owner.address));
    for (let i = 0; i < listAddresses.length; i++) {
        await printBalance(listAddresses[i]);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });