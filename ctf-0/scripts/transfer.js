const addrs = [
    "0x9E1d37eC716358455ef1720A86a29d99e2F1dA1A",
    "0xfDE8e76691A1188C45381383cBCF7b9F69E5c518",
    "0x71118031234C7C2e23Ec705B84Ff00299f743c07",
    "0xD82ef41242E341069BD9235f2aB54379741DaA1c",
    "0x6b3Fb403Cf68e32C80EA41D57748dA365702a5D2",
    "0x80535E27B2BA7dd0bF991ACCEAb624CA935ffEBd",
    "0xF619e53758000dbB0a1c6C3E18Ea2C05CaC75482",
    "0x82b45F5BE98f63f434674F56167dE33170CC6174",
    "0x84925bE4302209FD626cB0D6e34C989302B259D1",
    "0xD6895b0Bd85F895B13CD5323caFaf35dbdbd1346"
];

(async () => {
    for(let i = 0; i < addrs.length; i++) {
        const signer = await ethers.provider.getSigner(0);
        await signer.sendTransaction({
            to: addrs[i],
            value: ethers.utils.parseEther("2")
        });
    }
})();
