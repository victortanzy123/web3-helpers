import { FunctionFragment, Interface } from 'ethers/lib/utils';
import { HexAddress, ChainDetails } from '../types/general.types';
import { Contract } from 'ethers';

import { getContract } from '../ethers';

import MULTICALL3_ABI from '../../contracts/Multicall3.json';
import { MULTICALL3_ADDRESS } from '../const';

type Call = {
  target: HexAddress;
  fragment: FunctionFragment;
  params: any[];
};

type CallData = {
  target: HexAddress;
  callData: string;
};

export class Multicall3Helper {
  multicall!: Contract;
  ethersInterface: Interface = new Interface([]);
  batch: Call[] = [];
  executionPromise: Promise<any> | null = null;

  constructor(networkConfig: ChainDetails) {
    this.initialiseMulticall(networkConfig);
  }

  private async initialiseMulticall(networkConfig: ChainDetails): Promise<void> {
    this.multicall = await getContract(MULTICALL3_ADDRESS, networkConfig, MULTICALL3_ABI);
  }

  async name(contract: Contract): Promise<string> {
    const nameFxFragment = new Interface(contract.interface.format()).getFunction(
      'name()'
    );
    return this.addCallData(contract.address, nameFxFragment, []);
  }

  async symbol(contract: Contract): Promise<string> {
    const symbolFxFragment = new Interface(contract.interface.format()).getFunction(
      'symbol()'
    );
    return this.addCallData(contract.address, symbolFxFragment, []);
  }

  async uri(contract: Contract, tokenId: number): Promise<string> {
    const tokenUriFxFragment = new Interface(contract.interface.format()).getFunction(
      'uri(uint256)'
    );
    return this.addCallData(contract.address, tokenUriFxFragment, [tokenId]);
  }

  addCallData<T>(address: string, fragment: FunctionFragment, params: any[]): Promise<T> {
    const id = this.batch.push({ target: address, fragment, params }) - 1;
    if (!this.executionPromise) {
      this.executionPromise = this.execute();
    }
    return this.executionPromise?.then((results) => results[id] as T);
  }

  async execute(): Promise<any[]> {
    const resolver = Promise.resolve().then(async () => {
      const callDatas: CallData[] = this.batch.map((call) => {
        return {
          target: call.target,
          callData: this.ethersInterface.encodeFunctionData(call.fragment, call.params),
        };
      });
      const currentBatch = this.batch;
      this.batch = [];
      this.executionPromise = null;

      const result = await this.multicall.callStatic.tryAggregate(true, callDatas);
      const decoded = result.map((data: any, i: number) => {
        const call = currentBatch[i];
        const output = this.ethersInterface.decodeFunctionResult(call.fragment, data);
        if (call.fragment.outputs!.length === 1) {
          return output[0];
        } else {
          return output;
        }
      });
      return decoded;
    });

    return resolver;
  }
}
