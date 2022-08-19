const { ethers } = require("hardhat");

async function main(){
    owner = await ethers.getSigner();
    console.log("Deploying contract MultipleTransfer . . .");
    const MultipleTransfer = await ethers.getContractFactory("MultipleTransfer", owner);
    let multipleTransfer = await MultipleTransfer.deploy();
    console.log("Contract MultipleTransfer deployed to ", multipleTransfer.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });