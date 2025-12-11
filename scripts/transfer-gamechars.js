const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xE7e13eB942EF932A18f35717891b25520cAC9Cdf"; // ERC-1155 contract

  // the same address or a second account from MetaMask here.
  const studentAddress = "0x56Bad36e34667201069243978eFe48C9fC5dcf01";

  const [owner] = await ethers.getSigners();
  console.log("Owner (from):", owner.address);
  console.log("Student (to):", studentAddress);

  const gameChars = await ethers.getContractAt(
    "GameCharacterCollectionERC1155",
    contractAddress
  );

  // Transferring tokenId 1 and 2, one each
  const ids = [1, 2];
  const amounts = [1, 1];

  const tx = await gameChars.ownerBatchTransferToStudent(studentAddress, ids, amounts);
  console.log("Batch transfer tx sent:", tx.hash);

  await tx.wait();
  console.log("Batch transfer confirmed!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
