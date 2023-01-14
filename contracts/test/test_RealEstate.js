const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("RealEstate deploy", function () {
  it("should ", async () => {
    const [owner] = await ethers.getSigners();
    const REFactory = await ethers.getContractFactory("RealEstate");
    await REFactory.deploy();
  });
});

describe("RealState Functions", () => {
  let contract;
  let owner;
  let user1;
  beforeEach(async () => {
    [owner, user1] = await ethers.getSigners();
    const REFactory = await ethers.getContractFactory("RealEstate");
    contract = await REFactory.deploy();
  });

  describe("", () => {
    const testToken1URI =
      "https://ipfs.io/ipfs/QmQUozrHLAusXDxrvsESJ3PYB3rUeUuBAvVWw6nop2uu7c/1.png";
    const testToken2URI =
      "https://ipfs.io/ipfs/QmQUozrHLAusXDxrvsESJ3PYB3rUeUuBAvVWw6nop2uu7c/1.png";
    const testToken3URI =
      "https://ipfs.io/ipfs/QmQUozrHLAusXDxrvsESJ3PYB3rUeUuBAvVWw6nop2uu7c/1.png";

    describe("safeMint Function", () => {
      it("mint 3 Tokens", async () => {
        const tx1 = await contract.safeMint(user1.address, testToken1URI);
        await tx1.wait();
        const tx2 = await contract.safeMint(user1.address, testToken2URI);
        await tx2.wait();
        const tx3 = await contract.safeMint(user1.address, testToken3URI);
        await tx3.wait();
        const balanceUser1 = await contract.balanceOf(user1.address);
        expect(balanceUser1.toNumber()).to.be.equal(3);
      });
    });

    describe("tokenURI function", () => {
      beforeEach(async () => {
        const tx1 = await contract.safeMint(user1.address, testToken1URI);
        await tx1.wait();
        const tx2 = await contract.safeMint(user1.address, testToken2URI);
        await tx2.wait();
        const tx3 = await contract.safeMint(user1.address, testToken3URI);
        await tx3.wait();
      });

      it("get token Uri", async () => {
        const tokenURItoken1 = await contract.tokenURI(0);
        expect(tokenURItoken1).to.be.equal(testToken1URI);

        const tokenURItoken2 = await contract.tokenURI(1);
        expect(tokenURItoken2).to.be.equal(testToken1URI);

        const tokenURItoken3 = await contract.tokenURI(2);
        expect(tokenURItoken3).to.be.equal(testToken1URI);
      });
    });
  });
});
