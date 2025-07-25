import { BlockfrostProvider, MeshWallet } from "@meshsdk/core";
import { config } from "dotenv";
import * as bip39 from "bip39";
import * as CardanoWasm from "@emurgo/cardano-serialization-lib-nodejs";

config();

async function checkBalance() {
  try {
    // Validate environment variables
    if (!process.env.BLOCKFROST_API_KEY || !process.env.WALLET_SEED) {
      throw new Error("BLOCKFROST_API_KEY or WALLET_SEED missing in .env");
    }

    // Log and validate API key
    console.log("Loaded BLOCKFROST_API_KEY:", process.env.BLOCKFROST_API_KEY);
    if (process.env.BLOCKFROST_API_KEY !== "previewjovNyP4UBQEOxsNDUPFqXzSf14ZP3tGO") {
      console.warn("API key mismatch: Expected previewjovNyP4UBQEOxsNDUPFqXzSf14ZP3tGO");
    }

    // Validate mnemonic
    if (!bip39.validateMnemonic(process.env.WALLET_SEED)) {
      throw new Error("Invalid mnemonic phrase.");
    }

    // Derive private key from mnemonic
    console.log("Deriving private key from mnemonic...");
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

    // Initialize Blockfrost provider with timeout and retry
    console.log("Initializing Blockfrost provider...");
    const provider = new BlockfrostProvider(process.env.BLOCKFROST_API_KEY, {
      network: "preview",
      timeout: 10000, // 10-second timeout
    });

    // Test provider connectivity
    try {
      await provider.fetchProtocolParameters();
      console.log("Blockfrost provider initialized successfully.");
    } catch (error) {
      console.error("Blockfrost provider initialization failed:", error.message, error.stack || error.info || error);
      throw new Error("Failed to initialize Blockfrost provider");
    }

    // Initialize MeshWallet
    console.log("Initializing MeshWallet...");
    const wallet = new MeshWallet({
      networkId: 0, // Preview testnet
      fetcher: provider,
      key: { type: "root", bech32: privateKeyBech32 },
    });

    // Get wallet address
    const walletAddress = await wallet.getChangeAddress();
    console.log("Wallet Address:", walletAddress);

    // Fetch UTxOs with retry and direct API fallback
    console.log("Fetching UTxOs from Blockfrost...");
    let utxos;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        utxos = await wallet.getUtxos();
        console.log(`Raw UTxOs from MeshWallet (Attempt ${attempt}):`, JSON.stringify(utxos, null, 2));
        if (utxos.length > 0) break; // Exit loop if UTxOs are found
      } catch (error) {
        console.error(`Error fetching UTxOs with MeshWallet (Attempt ${attempt}):`, error.message, error.stack || error.info || error);
      }

      // Manual Blockfrost API call as fallback
      console.log(`Attempting direct Blockfrost API call (Attempt ${attempt})...`);
      const response = await fetch(
        `https://cardano-preview.blockfrost.io/api/v0/addresses/${walletAddress}/utxos`,
        {
          headers: { project_id: process.env.BLOCKFROST_API_KEY },
        }
      );
      if (!response.ok) {
        console.error(`Direct API call failed (Attempt ${attempt}): HTTP status ${response.status}`);
        if (attempt === 3) throw new Error(`Direct API call failed after 3 attempts: HTTP ${response.status}`);
      } else {
        const data = await response.json();
        console.log(`Raw UTxOs from direct API call (Attempt ${attempt}):`, JSON.stringify(data, null, 2));
        utxos = data; // Use the direct API result
        if (data.length > 0) break; // Exit loop if UTxOs are found
      }

      if (attempt < 3) {
        console.log(`Retrying (${attempt + 1}/3) in 5 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      }
    }
    console.log("Available UTxOs:", JSON.stringify(utxos, null, 2));

    // Calculate total Lovelace with support for both response formats
    console.log("Processing UTxOs...");
    const totalLovelace = utxos.reduce((sum, utxo) => {
      // Handle both MeshWallet (utxo.output.amount) and direct API (utxo.amount) formats
      const amountArray = utxo.output?.amount || utxo.amount || [];
      const lovelace = amountArray.find((a) => a.unit === "lovelace")?.quantity || "0";
      return sum + parseInt(lovelace, 10);
    }, 0);
    console.log("Total Lovelace:", totalLovelace);

    // Additional validation
    if (totalLovelace === 0 && utxos.length > 0) {
      console.warn("Warning: UTxOs detected but no Lovelace found. Check UTxO structure.");
      console.log("UTxO Details:", JSON.stringify(utxos, null, 2));
    } else if (totalLovelace < 2000000) {
      console.warn(`Insufficient funds: ${totalLovelace} lovelace available, need at least 2,000,000`);
    } else {
      console.log("Sufficient funds detected for deployment.");
    }
  } catch (error) {
    console.error("Script execution failed:", error.message, error.stack || error.info || error);
    throw error;
  }
}

checkBalance().catch((error) => {
  console.error("Final error:", error.message, error.stack || error.info || error);
  process.exit(1);
});