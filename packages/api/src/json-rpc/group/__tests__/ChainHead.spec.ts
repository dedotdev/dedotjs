import {
  ChainHeadRuntimeVersion,
  MethodResponse,
  NewBlock,
  OperationCallDone,
  OperationInaccessible,
  OperationStorageDone,
  OperationStorageItems,
  StorageQuery,
} from '@dedot/specs';
import { MockInstance } from '@vitest/spy';
import { JsonRpcClient } from 'dedot';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import MockProvider from '../../../client/__tests__/MockProvider.js';
import { IJsonRpcClient } from '../../../types.js';
import { ChainHead } from '../ChainHead/index.js';
import { newChainHeadSimulator } from './simulator.js';

const MSG_CALL_FOLLOW_FIRST = 'Please call the .follow() method before invoking any other methods in this group.';

describe('ChainHead', () => {
  let chainHead: ChainHead;
  let provider: MockProvider;
  let client: IJsonRpcClient;
  let providerSend: MockInstance;
  let providerSubscribe: MockInstance;
  let simulator: ReturnType<typeof newChainHeadSimulator>;
  let initialRuntime: ChainHeadRuntimeVersion;

  const notify = (subscriptionId: string, data: Error | any, timeout = 0) => {
    setTimeout(() => {
      provider.notify(subscriptionId, data);
    }, timeout);

    return data;
  };

  beforeEach(() => {
    provider = new MockProvider();
    client = new JsonRpcClient({ provider });
    chainHead = new ChainHead(client);
    simulator = newChainHeadSimulator({ provider });
    initialRuntime = simulator.runtime;

    providerSend = vi.spyOn(provider, 'send');
    providerSubscribe = vi.spyOn(provider, 'subscribe');
  });

  describe('follow', () => {
    it('follows chain head successfully', async () => {
      notify(simulator.subscriptionId, simulator.initializedEvent);

      await chainHead.follow();

      expect(providerSend).toHaveBeenCalledWith('rpc_methods', []);
      expect(providerSubscribe).toHaveBeenCalledWith(
        {
          subname: 'chainHead_v1_followEvent',
          subscribe: 'chainHead_v1_follow',
          params: [true],
          unsubscribe: 'chainHead_v1_unfollow',
        },
        expect.any(Function),
      );

      expect(chainHead.runtimeVersion).toEqual(initialRuntime);
      expect(chainHead.bestRuntimeVersion).toEqual(initialRuntime);
      expect(chainHead.bestHash).toEqual('0x0e');
      expect(chainHead.finalizedHash).toEqual('0x0e');
    });

    it('throws error when trying to follow chain head twice', async () => {
      notify(simulator.subscriptionId, simulator.initializedEvent);

      await chainHead.follow();

      await expect(chainHead.follow()).rejects.toThrow('Already followed chain head. Please unfollow first.');
    });
  });

  describe('unfollow', () => {
    it('unfollows chain head successfully', async () => {
      notify(simulator.subscriptionId, simulator.initializedEvent);

      await chainHead.follow();
      await chainHead.unfollow();

      expect(providerSend).toHaveBeenCalledWith('rpc_methods', []);
      expect(providerSend).toHaveBeenCalledWith('chainHead_v1_unfollow', [simulator.subscriptionId]);

      expect(() => chainHead.runtimeVersion).toThrow(MSG_CALL_FOLLOW_FIRST);
      expect(() => chainHead.bestRuntimeVersion).toThrow(MSG_CALL_FOLLOW_FIRST);
      expect(() => chainHead.bestHash).toThrow(MSG_CALL_FOLLOW_FIRST);
      expect(() => chainHead.finalizedHash).toThrow(MSG_CALL_FOLLOW_FIRST);
      await expect(chainHead.body()).rejects.toThrow(MSG_CALL_FOLLOW_FIRST);
      await expect(chainHead.header()).rejects.toThrow(MSG_CALL_FOLLOW_FIRST);
      await expect(chainHead.storage([])).rejects.toThrow(MSG_CALL_FOLLOW_FIRST);
      await expect(chainHead.unpin('0x01')).rejects.toThrow(MSG_CALL_FOLLOW_FIRST);
    });
  });

  describe('chainHead operations', () => {
    beforeEach(async () => {
      notify(simulator.subscriptionId, simulator.initializedEvent);

      await chainHead.follow();
    });

    describe('newBlock', () => {
      it('handle newBlock without runtime', async () => {
        const newBlock: NewBlock = notify(simulator.subscriptionId, simulator.nextNewBlock());

        await new Promise<void>((resolve) => {
          chainHead.on('newBlock', (blockHash, runtime) => {
            expect(blockHash).toEqual(newBlock.blockHash);
            expect(runtime).toBeUndefined();
            resolve();
          });
        });
      });

      it('handle newBlock with runtime', async () => {
        const newBlock: NewBlock = notify(simulator.subscriptionId, simulator.nextNewBlock({ withRuntime: true }));

        await new Promise<void>((resolve) => {
          chainHead.on('newBlock', (blockHash, runtime) => {
            expect(blockHash).toEqual(newBlock.blockHash);
            // @ts-ignore
            expect(runtime).toEqual(newBlock.newRuntime.spec);
            resolve();
          });
        });
      });
    });

    describe('bestBlockChanged', () => {
      it('handle bestBlockChanged', async () => {
        notify(simulator.subscriptionId, simulator.nextNewBlock());
        const newBlock2 = notify(simulator.subscriptionId, simulator.nextNewBlock({ withRuntime: true }));
        notify(simulator.subscriptionId, simulator.nextNewBlock());

        const bestBlock1 = notify(simulator.subscriptionId, simulator.nextBestBlock());

        await new Promise<void>((resolve) => {
          const unsub = chainHead.on('bestBlock', (blockHash, runtime) => {
            expect(blockHash).toEqual(bestBlock1.bestBlockHash);
            expect(chainHead.bestHash).toEqual(blockHash);
            expect(runtime).toBeUndefined();

            unsub();
            resolve();
          });
        });

        const bestBlock2 = notify(simulator.subscriptionId, simulator.nextBestBlock(), 10);

        await new Promise<void>((resolve) => {
          const unsub = chainHead.on('bestBlock', (blockHash, runtime) => {
            expect(blockHash).toEqual(bestBlock2.bestBlockHash);
            expect(chainHead.bestHash).toEqual(blockHash);
            // @ts-ignore
            expect(newBlock2.newRuntime.spec).toEqual(runtime);
            expect(chainHead.bestRuntimeVersion).toEqual(runtime);

            unsub();
            resolve();
          });
        });
      });
    });

    describe('finalized', () => {
      it('handle finalized', async () => {
        const newBlock1 = notify(simulator.subscriptionId, simulator.nextNewBlock());
        notify(simulator.subscriptionId, simulator.nextNewBlock({ fork: true }));
        const newBlock2 = notify(simulator.subscriptionId, simulator.nextNewBlock({ withRuntime: true }));
        notify(simulator.subscriptionId, simulator.nextNewBlock());
        notify(simulator.subscriptionId, simulator.nextNewBlock());

        notify(simulator.subscriptionId, simulator.nextBestBlock());
        const finalized1 = notify(simulator.subscriptionId, simulator.nextFinalized());

        await new Promise<void>((resolve) => {
          const unsub = chainHead.on('finalizedBlock', (finalizedHash, runtime) => {
            expect(finalizedHash).toEqual(newBlock1.blockHash);
            expect(finalizedHash).toEqual(finalized1.finalizedBlockHashes.at(-1));
            expect(chainHead.finalizedHash).toEqual(finalizedHash);

            unsub();
            resolve();
          });
        });

        // 4 new blocks on top of 15 initial blocks,  1 pruned block 0x0f-1, unpin 4 blocks to maintain the queue size
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            expect(providerSend).toHaveBeenCalledWith('chainHead_v1_unpin', [
              simulator.subscriptionId,
              ['0x0f-1', '0x00', '0x01', '0x02', '0x03'],
            ]);
            resolve();
          }, 10);
        });

        notify(simulator.subscriptionId, simulator.nextNewBlock());
        notify(simulator.subscriptionId, simulator.nextNewBlock());

        const bestBlock2 = simulator.nextBestBlock();
        notify(simulator.subscriptionId, bestBlock2);

        const finalized2 = simulator.nextFinalized();
        notify(simulator.subscriptionId, finalized2);

        await new Promise<void>((resolve) => {
          const unsub = chainHead.on('finalizedBlock', (finalizedHash, runtime) => {
            expect(finalizedHash).toEqual(finalized2.finalizedBlockHashes.at(-1));
            expect(chainHead.finalizedHash).toEqual(finalizedHash);
            // @ts-ignore
            expect(runtime).toEqual(newBlock2.newRuntime.spec);

            unsub();
            resolve();
          });
        });

        // 2 new blocks comes in, unpin 2 blocks at the back to the queue to maintain the queue size
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            expect(providerSend).toHaveBeenCalledWith('chainHead_v1_unpin', [
              simulator.subscriptionId,
              ['0x04', '0x05'],
            ]);
            resolve();
          }, 10);
        });
      });

      it('should finalize in favor of a fork chain', async () => {
        notify(simulator.subscriptionId, simulator.nextNewBlock());
        const newForkedBlock = notify(simulator.subscriptionId, simulator.nextNewBlock({ fork: true }));
        notify(simulator.subscriptionId, simulator.nextNewBlock({ fromWhichParentFork: 1, withRuntime: true }));
        notify(simulator.subscriptionId, simulator.nextNewBlock());
        notify(simulator.subscriptionId, simulator.nextNewBlock());

        notify(simulator.subscriptionId, simulator.nextBestBlock(1));
        const finalized1 = notify(simulator.subscriptionId, simulator.nextFinalized(1));

        await new Promise<void>((resolve) => {
          const unsub = chainHead.on('finalizedBlock', (finalizedHash, runtime) => {
            expect(finalizedHash).toEqual(newForkedBlock.blockHash);
            expect(finalizedHash).toEqual(finalized1.finalizedBlockHashes.at(-1));
            expect(chainHead.finalizedHash).toEqual(finalizedHash);

            unsub();
            resolve();
          });
        });

        // 4 new blocks on top of 15 initial blocks, 1 pruned block 0x0f, unpin 5 blocks to maintain the queue size
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            expect(providerSend).toHaveBeenCalledWith('chainHead_v1_unpin', [
              simulator.subscriptionId,
              ['0x0f', '0x00', '0x01', '0x02', '0x03'],
            ]);
            resolve();
          }, 10);
        });
      });
    });

    describe('chainHead_body', () => {
      it('calls body successfully', async () => {
        provider.setRpcRequest(
          'chainHead_v1_body',
          () => ({ result: 'started', operationId: 'body01' }) as MethodResponse,
        );

        notify(simulator.subscriptionId, {
          operationId: 'body01',
          event: 'operationCallDone',
          output: '0x1111',
        } as OperationCallDone);

        const result = await chainHead.body();
        expect(result).toEqual('0x1111');

        expect(providerSend).toHaveBeenNthCalledWith(3, 'chainHead_v1_body', [
          simulator.subscriptionId,
          chainHead.bestHash,
        ]);
        expect(providerSend).toHaveBeenNthCalledWith(4, 'chainHead_v1_stopOperation', [
          simulator.subscriptionId,
          'body01',
        ]);
      });

      it('should retry on OperationInaccessible', async () => {
        provider.setRpcRequest(
          'chainHead_v1_body',
          () => ({ result: 'started', operationId: 'body02' }) as MethodResponse,
        );

        notify(simulator.subscriptionId, {
          operationId: 'body02',
          event: 'operationInaccessible',
        } as OperationInaccessible);

        notify(
          simulator.subscriptionId,
          {
            operationId: 'body02',
            event: 'operationCallDone',
            output: '0x1111',
          } as OperationCallDone,
          10,
        );

        const result = await chainHead.body();
        expect(result).toEqual('0x1111');

        expect(providerSend).toHaveBeenNthCalledWith(3, 'chainHead_v1_body', [
          simulator.subscriptionId,
          chainHead.bestHash,
        ]);
        expect(providerSend).toHaveBeenNthCalledWith(4, 'chainHead_v1_stopOperation', [
          simulator.subscriptionId,
          'body02',
        ]);

        expect(providerSend).toHaveBeenNthCalledWith(5, 'chainHead_v1_body', [
          simulator.subscriptionId,
          chainHead.bestHash,
        ]);
        expect(providerSend).toHaveBeenNthCalledWith(6, 'chainHead_v1_stopOperation', [
          simulator.subscriptionId,
          'body02',
        ]);
      });
    });

    describe('chainHead_call', () => {
      it('calls call successfully', async () => {
        provider.setRpcRequest(
          'chainHead_v1_call',
          () => ({ result: 'started', operationId: 'call01' }) as MethodResponse,
        );

        notify(simulator.subscriptionId, {
          operationId: 'call01',
          event: 'operationCallDone',
          output: '0x1111',
        } as OperationCallDone);

        const result = await chainHead.call('func', '0x');
        expect(result).toEqual('0x1111');

        expect(providerSend).toHaveBeenNthCalledWith(3, 'chainHead_v1_call', [
          simulator.subscriptionId,
          chainHead.bestHash,
          'func',
          '0x',
        ]);
        expect(providerSend).toHaveBeenNthCalledWith(4, 'chainHead_v1_stopOperation', [
          simulator.subscriptionId,
          'call01',
        ]);
      });

      it('should retry on OperationInaccessible', async () => {
        provider.setRpcRequest(
          'chainHead_v1_call',
          () => ({ result: 'started', operationId: 'call02' }) as MethodResponse,
        );

        notify(simulator.subscriptionId, {
          operationId: 'call02',
          event: 'operationInaccessible',
        } as OperationInaccessible);

        notify(
          simulator.subscriptionId,
          {
            operationId: 'call02',
            event: 'operationCallDone',
            output: '0x1111',
          } as OperationCallDone,
          10,
        );

        const result = await chainHead.call('func', '0x');
        expect(result).toEqual('0x1111');

        expect(providerSend).toHaveBeenNthCalledWith(3, 'chainHead_v1_call', [
          simulator.subscriptionId,
          chainHead.bestHash,
          'func',
          '0x',
        ]);
        expect(providerSend).toHaveBeenNthCalledWith(4, 'chainHead_v1_stopOperation', [
          simulator.subscriptionId,
          'call02',
        ]);

        expect(providerSend).toHaveBeenNthCalledWith(5, 'chainHead_v1_call', [
          simulator.subscriptionId,
          chainHead.bestHash,
          'func',
          '0x',
        ]);
        expect(providerSend).toHaveBeenNthCalledWith(6, 'chainHead_v1_stopOperation', [
          simulator.subscriptionId,
          'call02',
        ]);
      });
    });

    describe('chainHead_storage', () => {
      it('calls storage successfully', async () => {
        const storageItems = [
          { key: '0xkey01', value: '0xvalue01' },
          { key: '0xkey02', value: '0xvalue02' },
        ];

        provider.setRpcRequest(
          'chainHead_v1_storage',
          () => ({ result: 'started', operationId: 'storage01' }) as MethodResponse,
        );

        notify(simulator.subscriptionId, {
          operationId: 'storage01',
          event: 'operationStorageItems',
          items: storageItems,
        } as OperationStorageItems);

        notify(simulator.subscriptionId, {
          operationId: 'storage01',
          event: 'operationStorageDone',
        } as OperationStorageDone);

        const queries: StorageQuery[] = [
          { key: '0xkey01', type: 'value' },
          { key: '0xkey02', type: 'value' },
        ];

        const result = await chainHead.storage(queries);
        expect(result).toEqual(storageItems);

        expect(providerSend).toHaveBeenNthCalledWith(3, 'chainHead_v1_storage', [
          simulator.subscriptionId,
          chainHead.bestHash,
          queries,
          undefined,
        ]);
        expect(providerSend).toHaveBeenNthCalledWith(4, 'chainHead_v1_stopOperation', [
          simulator.subscriptionId,
          'storage01',
        ]);
      });

      it('should retry on OperationInaccessible', async () => {
        const storageItems = [
          { key: '0xkey01', value: '0xvalue01' },
          { key: '0xkey02', value: '0xvalue02' },
        ];

        provider.setRpcRequest(
          'chainHead_v1_storage',
          () => ({ result: 'started', operationId: 'storage01' }) as MethodResponse,
        );

        notify(simulator.subscriptionId, {
          operationId: 'storage01',
          event: 'operationInaccessible',
        } as OperationInaccessible);

        notify(simulator.subscriptionId, {
          operationId: 'storage01',
          event: 'operationStorageItems',
          items: storageItems,
        } as OperationStorageItems);

        notify(simulator.subscriptionId, {
          operationId: 'storage01',
          event: 'operationStorageDone',
        } as OperationStorageDone);

        const queries: StorageQuery[] = [
          { key: '0xkey01', type: 'value' },
          { key: '0xkey02', type: 'value' },
        ];

        const result = await chainHead.storage(queries);
        expect(result).toEqual(storageItems);

        expect(providerSend).toHaveBeenNthCalledWith(3, 'chainHead_v1_storage', [
          simulator.subscriptionId,
          chainHead.bestHash,
          queries,
          undefined,
        ]);
        expect(providerSend).toHaveBeenNthCalledWith(4, 'chainHead_v1_stopOperation', [
          simulator.subscriptionId,
          'storage01',
        ]);

        expect(providerSend).toHaveBeenNthCalledWith(5, 'chainHead_v1_storage', [
          simulator.subscriptionId,
          chainHead.bestHash,
          queries,
          undefined,
        ]);

        expect(providerSend).toHaveBeenNthCalledWith(6, 'chainHead_v1_stopOperation', [
          simulator.subscriptionId,
          'storage01',
        ]);
      });

      it('should handle discardedItems', async () => {
        const storageItemsBatch1 = [
          { key: '0xkey01', value: '0xvalue01' },
          { key: '0xkey02', value: '0xvalue02' },
        ];
        const storageItemsBatch2 = [
          { key: '0xkey03', value: '0xvalue03' },
          { key: '0xkey04', value: '0xvalue04' },
        ];

        let callCounter = 0;
        provider.setRpcRequest('chainHead_v1_storage', () => {
          callCounter += 1;
          if (callCounter === 1) {
            return { result: 'started', operationId: 'storage01', discardedItems: 2 } as MethodResponse;
          } else {
            return { result: 'started', operationId: 'storage02' } as MethodResponse;
          }
        });

        notify(simulator.subscriptionId, {
          operationId: 'storage01',
          event: 'operationStorageItems',
          items: storageItemsBatch1,
        } as OperationStorageItems);

        notify(simulator.subscriptionId, {
          operationId: 'storage01',
          event: 'operationStorageDone',
        } as OperationStorageDone);

        notify(simulator.subscriptionId, {
          operationId: 'storage02',
          event: 'operationStorageItems',
          items: storageItemsBatch2,
        } as OperationStorageItems);

        notify(simulator.subscriptionId, {
          operationId: 'storage02',
          event: 'operationStorageDone',
        } as OperationStorageDone);

        const queries: StorageQuery[] = [
          { key: '0xkey01', type: 'value' },
          { key: '0xkey02', type: 'value' },
          { key: '0xkey03', type: 'value' },
          { key: '0xkey04', type: 'value' },
        ];

        const result = await chainHead.storage(queries);
        expect(result).toEqual([...storageItemsBatch1, ...storageItemsBatch2]);

        expect(providerSend).toHaveBeenNthCalledWith(3, 'chainHead_v1_storage', [
          simulator.subscriptionId,
          chainHead.bestHash,
          queries,
          undefined,
        ]);

        expect(providerSend).toHaveBeenNthCalledWith(4, 'chainHead_v1_stopOperation', [
          simulator.subscriptionId,
          'storage01',
        ]);

        expect(providerSend).toHaveBeenNthCalledWith(5, 'chainHead_v1_storage', [
          simulator.subscriptionId,
          chainHead.bestHash,
          queries.slice(2),
          undefined,
        ]);

        expect(providerSend).toHaveBeenNthCalledWith(6, 'chainHead_v1_stopOperation', [
          simulator.subscriptionId,
          'storage02',
        ]);
      });
    });

    describe('verify non-operational methods', () => {
      it('calls header', async () => {
        await chainHead.header();

        expect(providerSend).toHaveBeenCalledWith('chainHead_v1_header', [
          simulator.subscriptionId,
          chainHead.bestHash,
        ]);
      });

      it('calls unpin', async () => {
        await chainHead.unpin('0x01');
        await chainHead.unpin(['0x01', '0x02']);

        expect(providerSend).toHaveBeenCalledWith('chainHead_v1_unpin', [simulator.subscriptionId, '0x01']);
        expect(providerSend).toHaveBeenCalledWith('chainHead_v1_unpin', [simulator.subscriptionId, ['0x01', '0x02']]);
      });
    });
  });
});