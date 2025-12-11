# 📄 **Blockchain & NFT Assignment Report**

### *ERC-721 Soulbound Visit Card & ERC-1155 Game Character Collection*

**Author:** Sergey Gorgun
**Course:** Cryptocurrency and Blockchain
**Network:** Ethereum Sepolia Testnet
**Date:** 2025

---

# 1. **Assignment Objective**

The goal of this assignment was to design, implement, deploy, and test two NFT smart contracts using Solidity and Hardhat:

---

### **1. ERC-721 Soulbound Student Visit Card**

A unique, non-transferable (soulbound) NFT representing the student's identity.

### **2. ERC-1155 Game Character NFT Collection**

A multi-token contract representing 10 different game characters with metadata and batch operations.

---

These contracts were developed using:

* Solidity **0.8.x**
* OpenZeppelin **ERC-721**, **ERC-1155**, **Ownable**
* Hardhat (**v2**) for development and deployment
* IPFS (Pinata) for metadata storage

Both contracts were deployed to the **Sepolia Test Network**.

---

# 2. **ERC-721 Soulbound Visit Card NFT**

### **Contract Address**

`0x02C6A937d681F71ef65A92f3a54A9D958f4c3575`

### **Purpose**

Represents a unique student identity card that cannot be transferred once minted.

### **Key Features**

* Based on OpenZeppelin **ERC-721**.
* Only the **contract owner** can mint.
* Exactly **one** token is minted per student (`tokenId = 1`).
* Metadata stored on **IPFS**.
* At least **two attributes** included in metadata.
* **Soulbound behavior** implemented by overriding:

  * `_update()` → blocks all transfers except minting
  * `approve()` → disabled
  * `setApprovalForAll()` → disabled

### **Metadata Example**

```json
{
  "name": "Sergey Gorgun - Student Visit Card",
  "description": "Soulbound student visit card NFT for the Cryptocurrency & Blockchain course.",
  "attributes": [
    { "trait_type": "studentName", "value": "Sergey Gorgun" },
    { "trait_type": "studentID", "value": "EHU-12345" },
    { "trait_type": "course", "value": "Cryptocurrency & Blockchain" },
    { "trait_type": "year", "value": "2025" }
  ]
}
```

### **Important Transactions**

| Action       | Tx Hash                                                              |
| ------------ | -------------------------------------------------------------------- |
| ERC-721 Mint | `0x7a2d43ee4a79624ad8722b82dbf1937093583d13bcb5b87b1f22577baffb18cc` |
| Set tokenURI | `0x4024e10b412de73fa3222a8adb34850e10eb8f4598e80d29cd18d138ec2bb7a1` |

---

# 3. **ERC-1155 Game Character Collection**

### **Contract Address**

`0xE7e13eB942EF932A18f35717891b25520cAC9Cdf`

### **Purpose**

Represents a game asset collection using the ERC-1155 multi-token standard.

### **Key Features**

* 10 distinct token IDs (`1` to `10`), each representing a character.
* Each token has **attributes** (type, color, speed, strength, rarity).
* Metadata stored off-chain on **IPFS**, using ERC-1155 `{id}.json` pattern.
* Supports:

  * **Batch minting**
  * **Batch transfers**
* Only **owner** can mint or batch-transfer tokens.

### **Metadata Folder Structure**

```
characters/
  1.json
  2.json
  ...
  10.json
```

### **Example Metadata (1.json)**

```json
{
  "name": "Kitty #1",
  "description": "A playful kitty character.",
  "attributes": [
    { "trait_type": "type", "value": "kitty" },
    { "trait_type": "color", "value": "white" },
    { "trait_type": "speed", "value": 7 },
    { "trait_type": "strength", "value": 3 },
    { "trait_type": "rarity", "value": "common" }
  ]
}
```

### **Important Transactions**

| Action                     | Tx Hash                                                              |
| -------------------------- | -------------------------------------------------------------------- |
| Batch Mint 10 Characters   | `0x6d5e25e3526acf54511624b2c7521291ef98d2ff45c586a78f931c9e71e7bde2` |
| Batch Transfer (IDs 1 & 2) | `0x8a7327b9f8aeef62a32fdd6824906a9e5f469cf1d845c89f6e0865d5ef990e7e` |
| Set Base URI               | `0x927696bdc0e13affc6da3d7ba64468dfd298f85eb967db2009034333f729e026` |

---

# 4. **Deployment & Testing Process**

### **Tools Used**

* Hardhat v2
* Ethers.js
* OpenZeppelin contracts
* Sepolia testnet
* Pinata / IPFS

### **Deployment Steps**

1. Initialize Hardhat project.
2. Install OpenZeppelin contracts.
3. Write and compile ERC-721 and ERC-1155 contracts.
4. Deploy both contracts using Hardhat.
5. Upload metadata to IPFS.
6. Update tokenURI and baseURI using contract functions.
7. Mint:

   * 1 ERC-721 soulbound token
   * 10 ERC-1155 game tokens
8. Demonstrate:

   * ERC-721 transfer blocking
   * ERC-1155 batch mint and batch transfer

---

# 5. **Checklist of Assignment Requirements**

### ✅ **ERC-721 Soulbound Visit Card**

| Requirement                             | Completed |
| --------------------------------------- | --------- |
| ERC-721 standard                        | ✔         |
| Unique token per student                | ✔         |
| Soulbound (no transfers allowed)        | ✔         |
| Approvals disabled                      | ✔         |
| Metadata includes image & ≥2 attributes | ✔         |
| Minted to student's wallet              | ✔         |
| Only owner can mint                     | ✔         |
| TokenURI stored on IPFS                 | ✔         |

---

### ✅ **ERC-1155 Game Character Collection**

| Requirement                              | Completed |
| ---------------------------------------- | --------- |
| Uses ERC-1155 standard                   | ✔         |
| 10 distinct token IDs                    | ✔         |
| Metadata for each token                  | ✔         |
| Metadata includes ≥2 attributes          | ✔         |
| Batch minting implemented                | ✔         |
| Batch transfers implemented              | ✔         |
| 1–2 NFTs transferred to student's wallet | ✔         |
| Base URI uses `{id}.json`                | ✔         |
| Metadata hosted on IPFS                  | ✔         |
| Only owner can mint                      | ✔         |

---

# 6. **ERC-721 vs ERC-1155 – Explanation**

### **ERC-721**

* Represents a **unique**, **non-fungible**, **single-instance** token.
* Perfect for identity, certificates, visit cards.
* Soulbound restrictions ensure it cannot be transferred.

### **ERC-1155**

* Multi-token standard: one contract → many token types.
* Efficient batch operations (mint/transfer).
* Suitable for games, collections, and fungible/non-fungible hybrids.

### **Why both standards were used**

The assignment illustrates real-world architecture:

* **Identity / credentials → ERC-721**
* **Game assets / collections → ERC-1155**

---

# 7. **Conclusion**

All assignment tasks have been successfully completed:

* Both smart contracts were implemented securely using OpenZeppelin.
* Metadata conforms to NFT standards and is stored on IPFS.
* Soulbound logic prevents unauthorized transfers for ERC-721.
* Batch minting and transfers work correctly in ERC-1155.
* All required transactions were executed and documented.

This project demonstrates practical understanding of:

* Smart contract development
* NFT standards (ERC-721 & ERC-1155)
* Metadata design
* IPFS decentralized storage
* Hardhat deployment workflows

---

# 8. **Github Repository**

https://github.com/sgorgun/nft-assignment
