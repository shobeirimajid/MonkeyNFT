// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MonkeyNFT is ERC721, ERC721Enumerable, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint public MAX_SUPPLY = 4;
    uint public PUBLIC_MINT_PRICE = 0.01 ether;
    uint public WHITELIST_MINT_PRICE = 0.001 ether;
    uint public MAX_WHITELIST_ADDRESS = 2;
    uint public TOTAL_WHITELIST_ADDRESS;

    mapping(address => uint256) public mintedWallet;
    mapping(address => bool) public whiteListAddress;

    event MintedNFT(address indexed buyer, uint tokenId);
    event Withdraw(address indexed to, uint amount);

    constructor() ERC721("Monkey", "MKY") {}

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://ipfs.io/ipfs/QmeSJjVtBUQxYXo6CCAGVk8j2DsUVgEvF1sFXMGzeVCcft/";
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function getWhiteList() public {
        require(TOTAL_WHITELIST_ADDRESS < MAX_WHITELIST_ADDRESS, "Max out");
        TOTAL_WHITELIST_ADDRESS++;
        whiteListAddress[msg.sender] = true;
    }

    function publicMint(uint quantity) public payable {
        require(totalSupply() + quantity <= MAX_SUPPLY, "Sold out!");
        require(
            msg.value == PUBLIC_MINT_PRICE * quantity,
            "Please pay the exact amount!"
        );
        require(mintedWallet[msg.sender] < 3, "Max per wallet reached!");

        for (uint i = 0; i < quantity; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            mintedWallet[msg.sender]++;
            _safeMint(msg.sender, tokenId);
            emit MintedNFT(msg.sender, tokenId);
        }
    }

    function whiteListMint(uint quantity) public payable {
        require(totalSupply() + quantity <= MAX_SUPPLY, "Sold out!");
        require(whiteListAddress[msg.sender], "You are not in the whitelist!");
        require(
            msg.value == WHITELIST_MINT_PRICE * quantity,
            "Please pay the exact amount!"
        );
        require(mintedWallet[msg.sender] < 3, "Max per wallet reached!");

        for (uint i = 0; i < quantity; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            mintedWallet[msg.sender]++;
            _safeMint(msg.sender, tokenId);
            emit MintedNFT(msg.sender, tokenId);
        }
    }

    function withdrawFunds(address to) public onlyOwner {
        uint balance = address(this).balance;
        payable(to).transfer(balance);
        emit Withdraw(to, balance);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
