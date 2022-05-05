const addrs = [
    // "0xEC1511889D1cB111A0D4ADEEe848426b15461A7F", // gabriel
    // "0x0F7494eE0831529fD676ADbc234f858e280AeAF0", // ed
    // "0x6F234Fa20558743970ccEBD6AF259fCB49eeA73c", // jordan
    // "0xBD2A971bd3E22D5805D7D5DBa4212FA04E3e9fB5", // david
    // "0x6660bb5e750213c94704351364605bf016002d3D", // nomad
    // "0x081551eB0B927e16FbF9Df108EDD7Ab265aca8c1", // rocky
    // "0xdb9B01B0A3dB8bF7Ec84F5e3cA30EA838bC26b16", // russell
    // "0x847Fc5F44f1cFEeB4e8B9f1368dD4d6295db4972", // angel
    // "0x1A4B691738C9c8Db8f2EDf0b9207f6acb24ADF07", // hunter
    // "0x3e6a2B9D58314D81234465eE778CF2794dA4E430", // wgmi
    "0x8670fE61d64DC60B9e99167E14E69676f3AD3707", // isaiah
    // "0xae90d6C1360d095a03c4AAf378Bf20cEcdB27630", // joey
    // "0xEC15cfC62588c53F7265880956b700f227Ca5A5E", // robert
    // "0xA6e6031B4AB3Ae42d30a661E24545403A26Aba83", // titus
    // "0xD50864C283D4751469BE05274C69Ab3829317aF5", // wanaks
];

const ten = ethers.utils.parseEther("10");

async function approve() {
    const token = await ethers.getContractAt("SafeToken", "0xbAcc21137F1B0CA03d7e796CCc1E1d47DD9fe839");

    for(let i = 0; i < addrs.length; i++) {
        const tx = await token.approve(addrs[i], ten);
        await tx.wait();
        console.log(i);
    }
}

approve();