const { ethers } = require("hardhat");

async function main() {
  // TEMPORARY URI. ipfs://... with metadata
  const initialTokenURI = "https://example.com/visit-card.json";

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const Soulbound = await ethers.getContractFactory("SoulboundVisitCardERC721");
  const soulbound = await Soulbound.deploy(initialTokenURI);

  await soulbound.waitForDeployment();

  const address = await soulbound.getAddress();
  console.log("SoulboundVisitCardERC721 deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
