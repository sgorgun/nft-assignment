// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Game Character NFT Collection (ERC-1155)
/// @notice 10 different game characters (token IDs 1..10), with batch minting and transfers.
contract GameCharacterCollectionERC1155 is ERC1155, Ownable {
    // Token IDs 1..10 are reserved for game characters
    uint256 public constant MAX_TOKEN_ID = 10;

    /// @param baseURI Example: ipfs://CID_OF_FOLDER/{id}.json
    constructor(string memory baseURI)
        ERC1155(baseURI)
        Ownable(msg.sender)
    {}

    /// @notice Owner can update base URI for metadata (e.g. after uploading to IPFS)
    function setURI(string memory newuri) external onlyOwner {
        _setURI(newuri);
    }

    /// @notice Batch mint multiple token IDs to a single address (for initial distribution)
    /// @dev Example: ids = [1,2,3,...,10], amounts = [1,1,1,...,1]
    function mintInitialBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts
    ) external onlyOwner {
        require(ids.length == amounts.length, "Length mismatch");
        for (uint256 i = 0; i < ids.length; i++) {
            require(ids[i] >= 1 && ids[i] <= MAX_TOKEN_ID, "Invalid token id");
        }

        _mintBatch(to, ids, amounts, "");
    }

    /// @notice Mint a single token ID
    function mintSingle(
        address to,
        uint256 id,
        uint256 amount
    ) external onlyOwner {
        require(id >= 1 && id <= MAX_TOKEN_ID, "Invalid token id");
        _mint(to, id, amount, "");
    }

    /// @notice Batch transfer from contract owner to a student wallet (for demo)
    /// @dev Uses standard ERC-1155 safeBatchTransferFrom
    function ownerBatchTransferToStudent(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts
    ) external onlyOwner {
        _safeBatchTransferFrom(owner(), to, ids, amounts, "");
    }
}
