import { Dedot, SubstrateApi } from 'dedot';
import { AccountId32 } from '@dedot/codecs';
import { ContractMetadata, GenericContractApi } from '../types';
import { QueryExecutor } from './QueryExecutor';
import Executor from './Executor';
import { TxExecutor } from './TxExecutor';
import { GenericSubstrateApi } from '@dedot/types';

export class Contract<ContractApi extends GenericContractApi, ChainApi extends GenericSubstrateApi = SubstrateApi> {
  api: Dedot<ChainApi>;
  address: AccountId32;
  metadata: ContractMetadata;

  constructor(api: Dedot<ChainApi>, address: AccountId32 | string, metadata: ContractMetadata | string) {
    this.api = api;
    this.address = new AccountId32(address);

    if (typeof metadata === 'string') {
      this.metadata = JSON.parse(metadata) as ContractMetadata;
    } else {
      this.metadata = metadata;
    }
  }

  get query(): ContractApi['query'] {
    return newProxyChain<ChainApi>(new QueryExecutor(this.api, this.metadata, this.address)) as ContractApi['query'];
  }

  get tx(): ContractApi['tx'] {
    return newProxyChain<ChainApi>(new TxExecutor(this.api, this.metadata, this.address)) as ContractApi['query'];
  }
}

function newProxyChain<ChainApi extends GenericSubstrateApi>(carrier: Executor<ChainApi>): unknown {
  return new Proxy(carrier, {
    get(target: Executor<ChainApi>, property: string | symbol): any {
      return target.doExecute(property.toString());
    },
  });
}
