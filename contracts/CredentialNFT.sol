// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CredentialNFT is ERC721, Ownable {
    uint256 public tokenCounter;

    struct Credential {
        uint256 influenceScore;
        uint256 trustScore;
        uint256 issuedAt;
    }

    mapping(uint256 => Credential) public credentials;

    constructor(address admin)
        ERC721("Hexora Credential", "HXC")
        Ownable(admin)
    {
        tokenCounter = 0;
    }

    function mintCredential(
        address creator,
        uint256 influenceScore,
        uint256 trustScore
    ) external onlyOwner {
        uint256 tokenId = tokenCounter;

        _mint(creator, tokenId);

        credentials[tokenId] = Credential({
            influenceScore: influenceScore,
            trustScore: trustScore,
            issuedAt: block.timestamp
        });

        tokenCounter++;
    }
}
