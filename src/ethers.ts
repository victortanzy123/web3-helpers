import { BigNumber, Contract, Signer, ethers } from 'ethers';
import { ChainDetails, Gas, HexAddress } from './types/general.types';
import { EIP712Domain, EIP712TypeDefinition } from './types/eip712.types';

export async function getGasData(signer: ethers.Signer, estimatedLimit: BigNumber) {
  if (!signer) {
    return {};
  }
  const gasPrice = await signer.getGasPrice();
  const gasOptions: Gas = {
    gasPrice: gasPrice.toNumber() * 1.2,
    gasLimit: estimatedLimit.toNumber(),
  };

  return gasOptions;
}

export async function getContract(
  address: HexAddress,
  currentChain: ChainDetails,
  abi: any
): Promise<Contract> {
  const provider = new ethers.providers.JsonRpcProvider(currentChain.rpcNode);
  const contract = new ethers.Contract(address, abi, provider);
  return contract;
}

export async function signTypedData(
  domain: EIP712Domain,
  types: EIP712TypeDefinition,
  values: Object,
  signer: Signer
): Promise<string> {
  try {
    const hash = ethers.utils._TypedDataEncoder.hash(domain, types, values);
    const signature = await signer.signMessage(ethers.utils.arrayify(hash));
    return signature;
  } catch (error) {
    console.log('[SignTypeData ERROR]', error);
    return '';
  }
}
