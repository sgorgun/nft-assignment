const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x02C6A937d681F71ef65A92f3a54A9D958f4c3575";
  const newURI = "ipfs://bafkreibhtcbcd5pknqcewvrbaqqy3dddb734yhbunyfsag7e4kaix5zc3q";

  const [owner] = await ethers.getSigners();
  console.log("Owner:", owner.address);

  const soulbound = await ethers.getContractAt(
    "SoulboundVisitCardERC721",
    contractAddress
  );

  const tx = await soulbound.setTokenURI(newURI);
  console.log("setTokenURI tx sent:", tx.hash);

  await tx.wait();
  console.log("setTokenURI confirmed!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
