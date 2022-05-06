async function message() {
    const signer0 = await ethers.provider.getSigner(0);
    const message = ethers.utils.hexlify(ethers.utils.toUtf8Bytes("Its Alvaro's Birthday 🎉"));

    const tx = await signer0.sendTransaction({
        data: message,
        to: await signer0.getAddress()
    });

    console.log(tx);
}

message();