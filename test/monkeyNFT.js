const { expect } = require("chai");

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
});
