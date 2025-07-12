import { BlockfrostProvider, MeshWallet, Transaction } from "@meshsdk/core";
import fs from "fs";
import { config } from "dotenv";

config(); 

async function deployContract() {
  try {

    const provider = new BlockfrostProvider(process.env.BLOCKFROST_API_KEY, {
      network: "preview",
    });


    const wallet = new MeshWallet({
      networkId: 0, // 0 for testnet (Preview)
      key: {
        type: "mnemonic",
        mnemonic: process.env.WALLET_SEED,
      },
    });

    const validator = JSON.parse(fs.readFileSync("../verisafe/build/plutus.json"));
    const script = {
      type: "PlutusV3",
      cbor: validator.cborHex,
    };

    // Derive contract address
    const contractAddress = wallet.scriptToAddress(script);

    // Create transaction
    const tx = new Transaction({ initiator: wallet })
      .sendLovelace(contractAddress, "100000"); // 5 tADA

    // Build and sign transaction
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await provider.submitTx(signedTx);

    // Output results
    console.log("Contract deployed at:", contractAddress);
    console.log("Transaction Hash:", txHash);

    // Save to file
    fs.writeFileSync("contract-address.json", JSON.stringify({ contractAddress, txHash }, null, 2));
    console.log("Contract address saved to contract-address.json");

    return contractAddress;
  } catch (error) {
    console.error("Deployment failed:", error);
    throw error;
  }
}

deployContract();