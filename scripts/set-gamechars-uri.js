const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xE7e13eB942EF932A18f35717891b25520cAC9Cdf";
  const newURI = "ipfs://bafybeignpf3egffkl4mxvvjikkq6pcnsdlohayi7fqgb75amko5t46jkiy"; // <-- baseURI

  const [owner] = await ethers.getSigners();
  console.log("Owner:", owner.address);

  const gameChars = await ethers.getContractAt(
    "GameCharacterCollectionERC1155",
    contractAddress
  );

  const tx = await gameChars.setURI(newURI);
  console.log("setURI tx sent:", tx.hash);

  await tx.wait();
  console.log("setURI confirmed!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
