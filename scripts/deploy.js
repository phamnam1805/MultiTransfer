const { ethers } = require("hardhat");

async function main(){
    owner = await ethers.getSigner();
    console.log("Deploying contract MultiTransfer . . .");
    const MultiTransfer = await ethers.getContractFactory("MultiTransfer", owner);
    let multiTransfer = await MultiTransfer.deploy();
    console.log("Contract MultiTransfer deployed to ", multiTransfer.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });