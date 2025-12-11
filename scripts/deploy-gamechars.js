const { ethers } = require("hardhat");

async function main() {
  // IPFS-URI: ipfs://CID_OF_FOLDER/{id}.json
  const baseURI = "https://example.com/metadata/{id}.json";

  const [deployer] = await ethers.getSigners();
  console.log("Deploying GameCharacterCollectionERC1155 with account:", deployer.address);

  const GameChars = await ethers.getContractFactory("GameCharacterCollectionERC1155");
  const gameChars = await GameChars.deploy(baseURI);

  await gameChars.waitForDeployment();

  const address = await gameChars.getAddress();
  console.log("GameCharacterCollectionERC1155 deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
