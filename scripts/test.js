const { ethers } = require("hardhat");
const { expect } = require("chai");

async function main() {
    [owner, account1, account2, account3] = await ethers.getSigners();

    console.log("Deploying contract MultipleTransfer . . .");
    const MultipleTransfer = await ethers.getContractFactory("MultipleTransfer", owner);
    let multipleTransfer = await MultipleTransfer.deploy();
    console.log("Contract MultipleTransfer deployed to ", multipleTransfer.address);

    console.log("Deploying ERC20 token for test . . .");
    const ERC20 = await ethers.getContractFactory("ERC20", owner);
    let erc20 = await ERC20.deploy("Test Token", "TT");
    console.log("ERC20 token deployed to ", erc20.address);

    await erc20.mint(owner.address, ethers.utils.parseEther("1000"));
    await erc20.mint(account1.address, ethers.utils.parseEther("100"));
    await erc20.mint(account2.address, ethers.utils.parseEther("100"));
    await erc20.mint(account3.address, ethers.utils.parseEther("100"));

    const getBalance = async (address) => {
        let balance = await erc20.balanceOf(address);
        return balance/ 1e18;
    }

    console.log("=============== Before ===============");
    console.log("Owner balance ", await getBalance(owner.address));
    console.log("Account1 balance ", await getBalance(account1.address)  );
    console.log("Account2 balance ", await getBalance(account2.address));
    console.log("Account3 balance ", await getBalance(account3.address));

    let listAddresses = [account1.address, account2.address, account3.address];
    let listAmounts = [ethers.utils.parseEther("10"), ethers.utils.parseEther("20"), ethers.utils.parseEther("30")];
    let totalAmount = 0;
    for(let i = 0; i < listAmounts.length; i++){
        totalAmount += Number(listAmounts[i]);
    }
    totalAmount /= 1e18;
    
    await erc20.approve(multipleTransfer.address, ethers.utils.parseEther(totalAmount.toString()));
    await multipleTransfer.multipleTransfer(erc20.address, listAddresses, listAmounts);

    console.log("=============== After ===============");
    console.log("Owner balance ", await getBalance(owner.address));
    console.log("Account1 balance ", await getBalance(account1.address)  );
    console.log("Account2 balance ", await getBalance(account2.address));
    console.log("Account3 balance ", await getBalance(account3.address));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });