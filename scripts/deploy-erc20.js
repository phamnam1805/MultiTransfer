const { ethers } = require("hardhat");

async function main() {
    owner = await ethers.getSigner();
    console.log("Deploying contract ERC20 . . .");
    const ERC20 = await ethers.getContractFactory("ERC20", owner);
    let erc20 = await ERC20.deploy("Ryuu Token", "RT");
    console.log("Contract ERC20 deployed to ", erc20.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });