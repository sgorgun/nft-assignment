const { ethers } = require("hardhat");

async function main() {
  // Address of the already deployed ERC-721 contract
  const contractAddress = "0x02C6A937d681F71ef65A92f3a54A9D958f4c3575";

  // Your wallet (the same one you deployed from, judging by the log)
  const studentAddress = "0x56Bad36e34667201069243978eFe48C9fC5dcf01";

  const soulbound = await ethers.getContractAt(
    "SoulboundVisitCardERC721",
    contractAddress
  );

  const tx = await soulbound.mintVisitCard(studentAddress);
  console.log("Mint tx sent:", tx.hash);

  await tx.wait();
  console.log("Mint confirmed!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
