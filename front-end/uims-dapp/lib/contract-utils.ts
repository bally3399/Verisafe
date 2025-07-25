import contractData from "../../../deployment-script/contract-address.json";

export async function readContractAddress(): Promise<{ contractAddress: string, txHash: string }> {
  return contractData
}
