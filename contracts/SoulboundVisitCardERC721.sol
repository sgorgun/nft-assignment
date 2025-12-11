// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Soulbound Student Visit Card NFT (ERC-721)
/// @notice A non-transferable (soulbound) NFT issued once per student.
contract SoulboundVisitCardERC721 is ERC721, Ownable {
    uint256 public constant TOKEN_ID = 1; // Only 1 token exists
    string private _tokenURI;
    bool private _minted;

    constructor(string memory initialTokenURI)
        ERC721("StudentVisitCard", "SVC")
        Ownable(msg.sender)
    {
        _tokenURI = initialTokenURI;
    }

    /// @notice Mint exactly one soulbound NFT to a student's wallet
    function mintVisitCard(address student) external onlyOwner {
        require(!_minted, "Visit card already minted");
        _mint(student, TOKEN_ID);
        _minted = true;
    }

    /// --- SOULBOUND LOGIC (OpenZeppelin v5 style) -----------------

    /// @dev In OZ v5 transfers проходят через _update, а не _beforeTokenTransfer
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        // from — текущий владелец токена (до операции)
        address from = _ownerOf(tokenId);

        // Разрешаем:
        // - mint: from == address(0), to != address(0)
        // - burn (если когда-нибудь понадобится): to == address(0)
        // Запрещаем любые обычные переводы: from != 0 и to != 0
        if (from != address(0) && to != address(0)) {
            revert("Soulbound: transfers disabled");
        }

        return super._update(to, tokenId, auth);
    }

    /// @dev Disable approvals (token is soulbound)
    function approve(address, uint256) public pure override {
        revert("Soulbound: approvals disabled");
    }

    function setApprovalForAll(address, bool) public pure override {
        revert("Soulbound: approvals disabled");
    }

    /// --- METADATA -------------------------------------------------

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(tokenId == TOKEN_ID, "Invalid tokenId");
        return _tokenURI;
    }

    function setTokenURI(string memory newURI) external onlyOwner {
        _tokenURI = newURI;
    }
}
