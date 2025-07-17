import { BlockfrostProvider, MeshWallet, Transaction } from "@meshsdk/core";
import fs from "fs";
import { config } from "dotenv";
import * as bip39 from "bip39";
import * as CardanoWasm from "@emurgo/cardano-serialization-lib-nodejs";

config();

async function deployContract() {
  try {
    if (!process.env.BLOCKFROST_API_KEY || !process.env.WALLET_SEED) {
      throw new Error("BLOCKFROST_API_KEY or WALLET_SEED missing in .env");
    }

    if (!bip39.validateMnemonic(process.env.WALLET_SEED)) {
      throw new Error("Invalid mnemonic phrase.");
    }

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

    const provider = new BlockfrostProvider(process.env.BLOCKFROST_API_KEY, {
      network: "preview",
    });

    const protocolParams = await provider.fetchProtocolParameters();

    const wallet = new MeshWallet({
      networkId: 0,
      fetcher: provider,
      key: {
        type: "root",
        bech32: privateKeyBech32,
      },
    });

    // ✅ Ensure this path is correct and matches your compiled Aiken contract
    const validator = JSON.parse(fs.readFileSync("../verisafe/plutus.json", "utf8"));

    // ✅ Adjust if the module or validator function name has changed
    const spendValidator = validator.validators.find(
      (v) => v.title === "verisafe.verisafe.spend"
    );

    if (!spendValidator || !spendValidator.compiledCode) {
      throw new Error("Spend validator not found or compiledCode is undefined.");
    }

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

    const walletAddress = await wallet.getChangeAddress();
    const utxos = await wallet.getUtxos();
    const totalLovelace = utxos.reduce((sum, utxo) => {
      const lovelace = utxo.output.amount.find(a => a.unit === "lovelace")?.quantity || "0";
      return sum + parseInt(lovelace, 10);
    }, 0);

    if (totalLovelace < 150000) {
      throw new Error(`Insufficient funds: ${totalLovelace} lovelace available, need at least 150,000`);
    }

    const tx = new Transaction({ initiator: wallet, fetcher: provider }).sendLovelace(
      contractAddress,
      "100000"
    );

    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await provider.submitTx(signedTx);

    console.log("Transaction Hash:", txHash);
    console.log("Contract deployed at:", contractAddress);

    fs.writeFileSync(
      "contract-address.json",
      JSON.stringify({ contractAddress, txHash }, null, 2)
    );

    console.log("✅ Contract address saved to contract-address.json");

    return contractAddress;
  } catch (error) {
    console.error("Deployment failed:", error.message);
    throw error;
  }
}

deployContract();
