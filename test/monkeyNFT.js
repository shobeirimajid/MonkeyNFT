const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MonkeyNFT", function () {
  let monkeyNFT;
  let owner, user1, user2, user3;

  beforeEach(async function () {
    [owner, user1, user2, user3] = await ethers.getSigners();
    let MonkeyNFT = await ethers.getContractFactory("MonkeyNFT");
    monkeyNFT = await MonkeyNFT.deploy();
    await monkeyNFT.deployed();
  });

  describe("WhiteListing", function () {
    it("should revert if user is already whitelisted", async function () {
      await monkeyNFT.connect(user1).getWhiteList();
      await expect(monkeyNFT.connect(user1).getWhiteList()).to.be.revertedWith(
        "Already added"
      );
    });
    it("should add users to whitelist", async function () {
      await monkeyNFT.connect(user1).getWhiteList();
      expect(await monkeyNFT.whiteListAddress(user1.address)).to.equal(true);
      expect(await monkeyNFT.TOTAL_WHITELIST_ADDRESS()).to.equal(1);
    });

    it("should revert if whitelisting is full", async function () {
      // I have done maxwhitelisting = 2 for testing
      await monkeyNFT.connect(user1).getWhiteList();
      await monkeyNFT.connect(user2).getWhiteList();
      await expect(monkeyNFT.connect(user3).getWhiteList()).to.be.revertedWith(
        "Max out"
      );
    });
  });

  describe("PublicMinting", function () {
    //For this test we are taking maxSupply = 4;
    it("should revert if supply max out", async function () {
      //below we are minting 3 NFT and after that it will fail;
      await monkeyNFT
        .connect(user1)
        .publicMint(3, { value: ethers.utils.parseEther("0.03") });
      //It will revert because we are minting 2,so it will max out;
      await expect(
        monkeyNFT
          .connect(user2)
          .publicMint(2, { value: ethers.utils.parseEther("0.02") })
      ).to.be.revertedWith("Sold out!");
    });

    it("should revert if paid price is not exact", async function () {
      //buying 2 nft and paying for 1, so it will fail;
      await expect(
        monkeyNFT
          .connect(user1)
          .publicMint(2, { value: ethers.utils.parseEther("0.01") })
      ).to.be.revertedWith("Please pay the exact amount!");
    });

    it("should revert if max per wallet is reached", async function () {
      //first we are minting 3 from user1;
      await monkeyNFT
        .connect(user1)
        .publicMint(3, { value: ethers.utils.parseEther("0.03") });

      //now it will fail because we have maxed per wallet;
      await expect(
        monkeyNFT
          .connect(user1)
          .publicMint(1, { value: ethers.utils.parseEther("0.01") })
      ).to.be.revertedWith("Max per wallet reached!");
    });

    it("should mint NFT", async function () {
      //minting 2 nft from user1;
      await monkeyNFT
        .connect(user1)
        .publicMint(2, { value: ethers.utils.parseEther("0.02") });

      //checking totalSupply and mintedWallet mapping;
      const mintedWallet = await monkeyNFT.mintedWallet(user1.address);
      const totalSupply = await monkeyNFT.totalSupply();
      await expect(mintedWallet.toString()).to.equal("2");
      await expect(totalSupply.toString()).to.equal("2");
    });
  });
});
