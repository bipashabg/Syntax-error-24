// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; // Ensure this matches your other contracts

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AssetTokenization is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    // Constructor that sets the name, symbol, and initial owner
    constructor() ERC721("AssetTokenization", "ATKN") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    // Function to mint a new NFT
    function mintNFT(string memory _tokenURI) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId); // Mint the NFT
        _setTokenURI(newTokenId, _tokenURI); // Set token URI for metadata
        tokenCounter += 1;
        return newTokenId;
    }
}
