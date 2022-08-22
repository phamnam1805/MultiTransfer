const { ethers } = require("hardhat");

let tokenAddress = "0x524aFD46bab01a007b56897AeC5306042ae88b3c";
let amount = ethers.utils.parseEther("10000");

async function main() {
    owner = await ethers.getSigner();

    let erc20 = await ethers.getContractAt("ERC20", tokenAddress, owner);
    console.log("Minting . . .");
    await erc20.mint(owner.address, amount);
    console.log("Done");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });