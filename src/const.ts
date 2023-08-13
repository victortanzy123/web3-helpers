import { ethers } from 'ethers';

// Types
import { ChainId, HexAddress } from './types/general.types';

require('dotenv').config();

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
export const DEFAULT_NULL_VALUE = 0;

export const ONE_MINUTE = 60000;
export const ONE_HOUR: number = ONE_MINUTE * 60;
export const ONE_DAY: number = ONE_HOUR * 24;

export const POLLING_INTERVAL: number = ONE_MINUTE / 2;

// RPC Related
export const GOERLI_RPC_PROVIDER = new ethers.providers.JsonRpcProvider(
  process.env.GOERLI_RPC_URL
);
export const BSC_RPC_PROVIDER = new ethers.providers.JsonRpcProvider(
  process.env.BSC_RPC_URL
);

// Blockchain Explorer:
export const BLOCKCHAIN_EXPLORER_PREFIX_BY_CHAIN_ID: Record<ChainId, string> = {
  56: 'https://bscscan.com',
  5: 'https://goerli.etherscan.io',
  1: 'https://etherscan.io',
  42161: 'https://arbiscan.io',
};

// Addresses
export const BSC_TESTNET_MULTICALL2_ADDRESS: HexAddress =
  '0x6e5BB1a5Ad6F68A8D7D6A5e47750eC15773d6042'; // To fill for BSC_TESTNET
export const MULTICALL3_ADDRESS: HexAddress =
  '0xca11bde05977b3631167028862be2a173976ca11';
