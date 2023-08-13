import {
  BLOCKCHAIN_EXPLORER_PREFIX_BY_CHAIN_ID,
  BSC_RPC_PROVIDER,
  GOERLI_RPC_PROVIDER,
} from './const';
import { NetworkConfig } from './types/general.types';

export const NETWORK_CONFIG: Record<number, NetworkConfig> = {
  5: {
    chainId: 5,
    rpcProvider: GOERLI_RPC_PROVIDER,
    explorerLinkPrefix: BLOCKCHAIN_EXPLORER_PREFIX_BY_CHAIN_ID[5],
    formatTransactionUrl: (hash) => `https://goerli.etherscan.io/tx/${hash}`,
  },
  56: {
    chainId: 56,
    rpcProvider: BSC_RPC_PROVIDER,
    explorerLinkPrefix: BLOCKCHAIN_EXPLORER_PREFIX_BY_CHAIN_ID[56],
    formatTransactionUrl: (hash) => `https://bscscan.com/tx/${hash}`,
  },
} as const;
