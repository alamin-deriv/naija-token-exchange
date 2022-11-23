// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");

async function main() {
  const Token = await ethers.getContractFactory('Token')
 const Exchange = await ethers.getContractFactory("Exchange");

 // Fetch accounts
 const accounts = await ethers.getSigners();

 console.log(
   `Accounts fetched:\n${accounts[0].address}\n${accounts[1].address}\n`
 );

 // Deploy contracts
 const eNAIRA = await Token.deploy("e-Naira", "eNAIRA", "1000000");
 await eNAIRA.deployed();
 console.log(`E-NAIRA Deployed to: ${eNAIRA.address}`);

 const AREWA = await Token.deploy("Arewa Token", "AREWA", "1000000");
 await AREWA.deployed();
 console.log(`AREWA Deployed to: ${AREWA.address}`);

 const HAUSA = await Token.deploy("Hausa Token", "HAUSA", "1000000");
 await HAUSA.deployed();
 console.log(`HAUSA Deployed to: ${HAUSA.address}`);

 const exchange = await Exchange.deploy(accounts[1].address, 10);
 await exchange.deployed();
 console.log(`Exchange Deployed to: ${exchange.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
