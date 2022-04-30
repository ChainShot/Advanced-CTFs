const ethers = require("ethers");
const flashbot = require("@flashbots/ethers-provider-bundle");
require("dotenv").config();

const FLAG_ADDRESS = "0x442c8ce43362c096c7e4870f095192c7649489b6";
// NOTE: this is a compromised key, never use this for anything! 
const COMPROMISED_KEY = "ae44b534caed76e8c37d0d832209963a3380261fc0098203322296d9f1e65ea3";

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_URL);

    const funderEOA = new ethers.Wallet(process.env.FUNDER_KEY, provider);
    const compromisedEOA = new ethers.Wallet(COMPROMISED_KEY, provider);
    
    const gasPrice = ethers.utils.parseUnits("5", "gwei");

    const flashbotProvider = await flashbot.FlashbotsBundleProvider.create(
        provider,
        compromisedEOA,
        "https://relay-goerli.flashbots.net",
        "goerli"
    );

    // the transaction to fund the compromised address
    const fundTransaction = await funderEOA.signTransaction({
        nonce: await funderEOA.getTransactionCount(),
        to: compromisedEOA.address,
        gasPrice,
        gasLimit: 21000,
        value: ethers.utils.parseEther("0.01"),
    });
    
    // the transaction to mint the NFT
    const abi = ["function mint(address) external"];
    const walletContract = new ethers.Contract(FLAG_ADDRESS, abi, compromisedEOA);
    const nonce = await compromisedEOA.getTransactionCount();
    const mintTX = await walletContract.populateTransaction.mint(funderEOA.address, {
        nonce,
        gasLimit: await walletContract.estimateGas.mint(funderEOA.address),
        gasPrice,
        value: 0
    });

    const signedTxBundle = await flashbotProvider.signBundle([
        { 
            signedTransaction: fundTransaction
        },
        {
            signer: compromisedEOA,
            transaction: mintTX
        }
    ]);

    const blockNumber = (await provider.getBlock()).number;
    const simulation = await flashbotProvider.simulate(signedTxBundle, blockNumber - 1, blockNumber);
    if(simulation.error) {
        console.log("Error!", JSON.stringify(simulation.error, null, 2));
        return;
    }

    provider.on("block", async (blockNumber) => {
        console.log("Current Block: ", blockNumber);        
        const signedBundle = await flashbotProvider.sendRawBundle(signedTxBundle, blockNumber + 1);
        const waitResponse = await signedBundle.wait();
        if(waitResponse == 0) {
            console.log("Success!");
            process.exit();
        }
    });
}

main();