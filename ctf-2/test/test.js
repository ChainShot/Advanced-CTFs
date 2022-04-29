const { assert } = require("chai");

describe("SafeToken", function () {
  let signer0, signer1;
  let token, supply;
  beforeEach(async () => {
    supply = await ethers.utils.parseEther("10000");
    [signer0, signer1] = await ethers.getSigners();

    const SafeToken = await ethers.getContractFactory("SafeToken");
    token = await SafeToken.deploy(supply);
    await token.deployed();
  });

  it("should have minted", async function () {
    const balance = await token.balanceOf(await signer0.getAddress());
    assert.equal(balance.toString(), supply.toString());
  });

  describe("allowance of 10", () => {
    const ten = ethers.utils.parseEther("10");
    beforeEach(async () => {
      await token.approve(await signer1.getAddress(), ten);
    });

    it("should be exploitable", async () => {
      const Exploit = await ethers.getContractFactory("Exploit");
      const exploit = await Exploit.deploy();
      await exploit.deployed();
      await exploit.connect(signer1).run(token.address, await signer0.getAddress());

      const balance = await token.balanceOf(await signer1.getAddress());
      assert.equal(balance.toString(), ethers.utils.parseEther("100"));
    });
  });
});
