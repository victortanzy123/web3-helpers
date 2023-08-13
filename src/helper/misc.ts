import { ChainId } from '../types/general.types';

// Constants
import { BLOCKCHAIN_EXPLORER_PREFIX_BY_CHAIN_ID } from '../const';

export function getTxLink(chainId: ChainId, txHash: string): string {
  return `${BLOCKCHAIN_EXPLORER_PREFIX_BY_CHAIN_ID[chainId]}/tx/${txHash}`;
}

/* ==================================================
             Time-Related Helper Functions 
=====================================================*/

// @Desc: Sleep timeout function using promises to delay
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
