const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xE7e13eB942EF932A18f35717891b25520cAC9Cdf"; // ERC-1155 contract

  const [owner] = await ethers.getSigners();
  console.log("Owner (will receive initial batch):", owner.address);

  const gameChars = await ethers.getContractAt(
    "GameCharacterCollectionERC1155",
    contractAddress
  );

  // 10 different tokenIds: 1..10
  const ids = [1,2,3,4,5,6,7,8,9,10];
  // 1 of each
  const amounts = [1,1,1,1,1,1,1,1,1,1];

  const tx = await gameChars.mintInitialBatch(owner.address, ids, amounts);
  console.log("Batch mint tx sent:", tx.hash);

  await tx.wait();
  console.log("Batch mint confirmed!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
