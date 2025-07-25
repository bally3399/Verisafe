import { KoiosProvider, MeshWallet, Transaction } from "@meshsdk/core";
import fs from "fs";
import { config } from "dotenv";
import * as bip39 from "bip39";
import * as CardanoWasm from "@emurgo/cardano-serialization-lib-nodejs";

config();

async function deployContract() {
  try {
    // Validate environment variables
    if (!process.env.WALLET_SEED) {
      throw new Error("WALLET_SEED missing in .env");
    }

    // Validate mnemonic
    if (!bip39.validateMnemonic(process.env.WALLET_SEED)) {
      throw new Error("Invalid mnemonic phrase.");
    }

    // Derive private key from mnemonic
    const entropy = bip39.mnemonicToEntropy(process.env.WALLET_SEED);
    const rootKey = CardanoWasm.Bip32PrivateKey.from_bip39_entropy(
      Buffer.from(entropy, "hex"),
      Buffer.from("")
    );
    const accountKey = rootKey
      .derive(1852 | 0x80000000)
      .derive(1815 | 0x80000000)
      .derive(0 | 0x80000000);
    const privateKeyBech32 = accountKey.to_bech32();

    // Initialize Koios provider
    const provider = new KoiosProvider("preview");

    // Initialize MeshWallet
    const wallet = new MeshWallet({
      networkId: 0, // Preview testnet
      fetcher: provider,
      key: { type: "root", bech32: privateKeyBech32 },
    });

    const walletAddress = await wallet.getChangeAddress();
    console.log("Wallet Address:", walletAddress);

    // Load and validate Plutus script
    const validator = JSON.parse(fs.readFileSync("../verisafe/plutus.json", "utf8"));
    const spendValidator = validator.validators.find(
      (v) => v.title === "verisafe.verisafe.spend"
    );

    if (!spendValidator || !spendValidator.compiledCode) {
      throw new Error("Spend validator not found or compiledCode is undefined.");
    }

    // Create script address
    const scriptCbor = spendValidator.compiledCode;
    const plutusScript = CardanoWasm.PlutusScript.from_bytes(
      Buffer.from(scriptCbor, "hex")
    );
    const scriptHash = plutusScript.hash();
    const contractAddress = CardanoWasm.EnterpriseAddress.new(
      0,
      CardanoWasm.Credential.from_scripthash(scriptHash)
    )
      .to_address()
      .to_bech32();

    console.log("Contract Address:", contractAddress);

    // Check wallet balance with flexible UTxO processing and conversion
    let utxos;
    console.log("Fetching UTxOs from Koios...");
    try {
      utxos = await wallet.getUtxos();
      console.log("Raw UTxOs from MeshWallet:", JSON.stringify(utxos, null, 2));
    } catch (error) {
      console.error("Error fetching UTxOs with MeshWallet:", error.message, error.stack || error.info || error);
    }

    if (!utxos || utxos.length === 0) {
      console.log("Falling back to direct Koios API call...");
      const response = await fetch(
        `https://preview.koios.rest/api/v1/utxos?address=${encodeURIComponent(walletAddress)}`
      );
      if (!response.ok) throw new Error(`Direct API call failed: HTTP ${response.status}`);
      const apiUtxos = await response.json();
      console.log("Raw UTxOs from direct API call:", JSON.stringify(apiUtxos, null, 2));
      utxos = apiUtxos.map(utxo => ({
        input: {
          txHash: utxo.tx_hash,
          outputIndex: utxo.tx_index,
        },
        output: {
          address: utxo.address,
          amount: utxo.value.map(v => ({ unit: v.unit, quantity: v.quantity })),
          dataHash: null,
        },
      }));
      console.log("Converted UTxOs for MeshSDK:", JSON.stringify(utxos, null, 2));
    }

    console.log("Available UTxOs:", JSON.stringify(utxos, null, 2));
    const totalLovelace = utxos.reduce((sum, utxo) => {
      const amountArray = utxo.output.amount || [];
      const lovelace = amountArray.find((a) => a.unit === "lovelace")?.quantity || "0";
      return sum + parseInt(lovelace, 10);
    }, 0);

    console.log("Total Lovelace:", totalLovelace);
    const minRequiredLovelace = 2000000 + 200000; // 2,000,000 for contract + 200,000 estimated fee
    if (totalLovelace < minRequiredLovelace) {
      throw new Error(`Insufficient funds: ${totalLovelace} lovelace available, need at least ${minRequiredLovelace} (including ~200,000 fee)`);
    }

    // Build transaction with explicit UTxOs
    const tx = new Transaction({ initiator: wallet, fetcher: provider })
      .sendLovelace(contractAddress, "2000000")
      .setTxInputs(utxos);

    console.log("Building transaction...");
    const unsignedTx = await tx.build();
    console.log("Signing transaction...");
    const signedTx = await wallet.signTx(unsignedTx);
    console.log("Signed Transaction (CBOR Hex):", Buffer.from(signedTx).toString("hex"));
    console.log("Submitting transaction...");
    let txHash;
    try {
      const response = await provider.submitTx(signedTx);
      txHash = response;
      console.log("Transaction Hash:", txHash);
    } catch (error) {
      console.error("Transaction submission failed:", {
        message: error.message,
        stack: error.stack,
        response: error.response ? { status: error.response.status, data: error.response.data } : "No response object",
      });
      throw new Error("Transaction submission failed: " + error.message);
    }

    console.log("Contract deployed at:", contractAddress);

    // Save contract details only if txHash is valid
    if (txHash && typeof txHash === "string" && txHash.length === 64) {
      fs.writeFileSync(
        "contract-address.json",
        JSON.stringify({ contractAddress, txHash }, null, 2)
      );
      console.log("✅ Contract address and tx hash saved to contract-address.json");
    } else {
      throw new Error("Invalid transaction hash: Deployment not confirmed");
    }

    return { contractAddress, txHash };
  } catch (error) {
    console.error("Deployment failed:", error.message);
    if (error.info) console.error("Additional error info:", error.info);
    throw error;
  }
}

deployContract().catch((error) => {
  console.error("Script execution failed:", error);
  process.exit(1);
});