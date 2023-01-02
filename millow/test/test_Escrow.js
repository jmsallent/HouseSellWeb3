const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Escrow", function () {
  it("Deploy", async () => {
    const [_owner, _seller, _inspector, _lender] = await ethers.getSigners();
    let _nftAddress = "";

    const RealEstateFactory = await ethers.getContractFactory("RealEstate");
    const realEstate = await RealEstateFactory.deploy();
    _nftAddress = realEstate.address;

    const EscrowFactory = await ethers.getContractFactory("Escrow");
    await EscrowFactory.deploy(
      _nftAddress,
      _seller.address,
      _inspector.address,
      _lender.address
    );
  });
});
const testToken1URI =
  "https://ipfs.io/ipfs/QmQUozrHLAusXDxrvsESJ3PYB3rUeUuBAvVWw6nop2uu7c/1.png";
const testToken2URI =
  "https://ipfs.io/ipfs/QmQUozrHLAusXDxrvsESJ3PYB3rUeUuBAvVWw6nop2uu7c/1.png";
const testToken3URI =
  "https://ipfs.io/ipfs/QmQUozrHLAusXDxrvsESJ3PYB3rUeUuBAvVWw6nop2uu7c/1.png";
describe("Escrow Functions", () => {
  let _owner, _seller, _inspector, _lender;
  let contractEscrow;
  let contractRealEstate;
  beforeEach(async () => {
    [_owner, _seller, _inspector, _lender, _buyer, _randomUser] =
      await ethers.getSigners();
    let _nftAddress = "";

    const RealEstateFactory = await ethers.getContractFactory("RealEstate");
    contractRealEstate = await RealEstateFactory.connect(_owner).deploy();
    _nftAddress = contractRealEstate.address;

    const EscrowFactory = await ethers.getContractFactory("Escrow");
    contractEscrow = await EscrowFactory.connect(_owner).deploy(
      _nftAddress,
      _seller.address,
      _inspector.address,
      _lender.address
    );
    expect(await contractEscrow.seller()).to.be.equal(_seller.address);
    expect(await contractEscrow.inspector()).to.be.equal(_inspector.address);
    expect(await contractEscrow.lender()).to.be.equal(_lender.address);
  });

  describe("list Function", () => {
    const _nftID = 0;
    const _purchasePrice = 555;
    const _escrowAmount = 111;
    const testTokenID = 0;

    beforeEach(async () => {
      const tx = await contractRealEstate
        .connect(_owner)
        .safeMint(_seller.address, testToken1URI);
      await tx.wait();
    });

    it("Seller Role test", async () => {
      try {
        const tx = await contractEscrow
          .connect(_lender)
          .list(testTokenID, _buyer.address, _purchasePrice, _escrowAmount);
        await tx.wait();
        expect.fail("Invalid USER");
      } catch (error) {}

      try {
        const tx = await contractEscrow
          .connect(_seller)
          .list(testTokenID, _buyer.address, _purchasePrice, _escrowAmount);
        await tx.wait();
      } catch (error) {
        expect.fail("Correct USER, throwing undesired exception");
      }
    });

    it("State variables setted", async () => {
      const tx = await contractEscrow
        .connect(_seller)
        .list(testTokenID, _buyer.address, _purchasePrice, _escrowAmount);
      await tx.wait();

      const buyerGetted = await contractEscrow.buyer(testTokenID);
      const purchasePriceGetted = await contractEscrow.purchasePrice(
        testTokenID
      );
      const escrowAmountGetted = await contractEscrow.escrowAmount(testTokenID);

      expect(buyerGetted).to.be.equal(_buyer.address);
      expect(purchasePriceGetted.toNumber()).to.be.equal(_purchasePrice);
      expect(escrowAmountGetted.toNumber()).to.be.equal(_escrowAmount);
    });
  });

  describe("depositEarnest function", () => {
    const _nftID = 0;
    const _purchasePrice = 555;
    const _escrowAmount = 111;
    const testTokenID = 0;
    beforeEach(async () => {
      const tx = await contractEscrow
        .connect(_seller)
        .list(testTokenID, _buyer.address, _purchasePrice, _escrowAmount);
      await tx.wait();
    });

    it("ROLE test", async () => {
      try {
        const tx = await contractEscrow
          .connect(_randomUser)
          .depositEarnest(_nftID);
        expect().fail();
      } catch (error) {}
    });

    it("Send escrow Amount", async () => {
      const tx = await contractEscrow
        .connect(_buyer)
        .depositEarnest(_nftID, { value: _escrowAmount });
    });

    it("Send escrow insufficient Amount", async () => {
      const insufficientEscrowAmount = 10;
      try {
        const tx = await contractEscrow
          .connect(_buyer)
          .depositEarnest(_nftID, { value: insufficientEscrowAmount });
        expect.fail();
      } catch (error) {}
    });
  });

  describe("updateInspectionStatus function", () => {
    const _nftID = 0;
    const _purchasePrice = 555;
    const _escrowAmount = 111;
    const testTokenID = 0;
    beforeEach(async () => {
      const tx = await contractEscrow
        .connect(_seller)
        .list(testTokenID, _buyer.address, _purchasePrice, _escrowAmount);
      await tx.wait();
    });

    it("Test Role", async () => {
      try {
        const tx = await contractEscrow
          .connect(_randomUser)
          .updateInspectionStatus(testTokenID, true);
        await tx.wait();
        expect.fail();
      } catch (error) {}
    });
    it("Should set inspection true", async () => {
      const tx = await contractEscrow
        .connect(_inspector)
        .updateInspectionStatus(testTokenID, true);
      await tx.wait();

      const result = await contractEscrow.inspectionPassed(testTokenID);
      expect(result).to.be.true;
    });
  });
  describe("approveSale function", () => {
    const _nftID = 0;
    const _purchasePrice = 555;
    const _escrowAmount = 111;
    const testTokenID = 0;
    beforeEach(async () => {
      const tx = await contractEscrow
        .connect(_seller)
        .list(testTokenID, _buyer.address, _purchasePrice, _escrowAmount);
      await tx.wait();
    });
    it("default value is false ", async () => {
      const result = await contractEscrow.approval(_nftID, _buyer.address);
      expect(result).to.be.false;
    });
  });
  describe("finalizeSale function", () => {
    const _nftID = 0;
    const _purchasePrice = 555;
    const _escrowAmount = 111;
    const testTokenID = 0;
    beforeEach(async () => {
      const tx = await contractEscrow
        .connect(_seller)
        .list(testTokenID, _buyer.address, _purchasePrice, _escrowAmount);
      await tx.wait();
    });

    describe("Test Requires", () => {
      describe("Require inspection", () => {
        it("Inspection is false / default value", async () => {
          const result = await contractEscrow.inspectionPassed(testTokenID);
          expect(result).to.be.false;
          try {
            const tx = await contractEscrow.finalizeSale(testTokenID);
            await tx.wait();
            expect.fail();
          } catch (error) {}
        });
      });
    });
  });

  describe("cancelSale function", () => {
    const _nftID = 0;
    const _purchasePrice = 555;
    const _escrowAmount = 111;
    const testTokenID = 0;
    beforeEach(async () => {
      const tx = await contractEscrow
        .connect(_seller)
        .list(testTokenID, _buyer.address, _purchasePrice, _escrowAmount);
      await tx.wait();
    });
    it("Default value", async () => {
      const result = await contractEscrow.inspectionPassed(testTokenID);
      expect(result).to.be.false;
    });

    describe("", () => {
      const testEscrowAmou = 10;
      beforeEach(async () => {
        const tx = await contractEscrow.depositEarnest();
      });
    });
  });
});
