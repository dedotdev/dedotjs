import { deferred, Deferred, EventEmitter, isHex, shortenAddress } from '@dedot/utils';
import type { Chain } from 'smoldot';
import { JsonRpcError } from '../error.js';
import {
  ConnectionStatus,
  JsonRpcProvider,
  JsonRpcRequest,
  JsonRpcRequestId,
  JsonRpcResponse,
  JsonRpcResponseNotification,
  ProviderEvent,
  Subscription,
  SubscriptionCallback,
  SubscriptionInput,
} from '../types.js';

type SmRequestState<T = any> = {
  defer: Deferred<T>;
  request: JsonRpcRequest;
};

type SmSubscriptionState<T = any> = {
  input: SubscriptionInput;
  callback: SubscriptionCallback;
  subscription: Subscription;
};

export class SmProvider extends EventEmitter<ProviderEvent> implements JsonRpcProvider {
  #status: ConnectionStatus;
  #chain: Chain;
  #handlers: Record<JsonRpcRequestId, SmRequestState>;
  #subscriptions: Record<string, SmSubscriptionState>;
  #pendingNotifications: Record<string, JsonRpcResponseNotification>;

  constructor(chain: Chain) {
    super();
    this.#status = 'disconnected';
    this.#chain = chain;
    this.#handlers = {};
    this.#subscriptions = {};
    this.#pendingNotifications = {};

    this._handleResponses();
  }

  #setStatus(status: ConnectionStatus) {
    if (this.#status === status) return;

    this.#status = status;
    this.emit(status);
  }

  _handleResponses() {
    (async () => {
      // TODO handle disconnection & clean up properly
      while (true) {
        const rawResponse = await this.#chain.nextJsonRpcResponse();
        const data = JSON.parse(rawResponse);

        const isNotification = !data.id && data.method;
        if (isNotification) {
          this._handleNotification(data);
        } else {
          this._handleResponse(data);
        }
      }
    })();
  }

  _handleResponse(response: JsonRpcResponse) {
    const { id, error, result } = response;
    const handler = this.#handlers[id];
    if (!handler) {
      console.error(`Received response with unknown id: ${id}`);
      return;
    }

    const { defer } = handler;

    if (error) {
      defer.reject(new JsonRpcError(error));
    } else {
      defer.resolve(result);
    }

    delete this.#handlers[id];
  }

  _handleNotification(response: JsonRpcResponseNotification) {
    const { method: subname, params } = response;
    const { subscription: subscriptionId, result, error } = params;

    const subkey = `${subname}::${subscriptionId}`;
    const substate = this.#subscriptions[subkey];

    // TODO check if there is an handler exists for the subscription
    if (!substate) {
      this.#pendingNotifications[subkey] = response;
      return;
    }

    const { callback } = substate;

    if (error) {
      callback(new JsonRpcError(error), null, substate.subscription);
    } else {
      callback(null, result, substate.subscription);
    }
  }

  get status(): ConnectionStatus {
    // TODO emit events
    return this.#status;
  }

  send<T = any>(method: string, params: any[]): Promise<T> {
    const defer = deferred<T>();

    try {
      const request = this.#prepareRequest(method, params);
      this.#handlers[request.id] = { defer, request };

      console.log(
        '>> RPC(sm):',
        method,
        params
          .map((p) => (isHex(p) ? shortenAddress(p) : p))
          .map((p) => JSON.stringify(p))
          .join(', '),
      );

      // TODO handle smoldot errors
      this.#chain.sendJsonRpc(JSON.stringify(request));
    } catch (e: any) {
      defer.reject(e);
    }

    return defer.promise;
  }

  async subscribe<T = any>(input: SubscriptionInput, callback: SubscriptionCallback<T>): Promise<Subscription> {
    const { subname, subscribe, params, unsubscribe } = input;
    const subscriptionId = await this.send<string>(subscribe, params);

    const subkey = `${subname}::${subscriptionId}`;

    const subscription: Subscription = {
      unsubscribe: async () => {
        delete this.#subscriptions[subkey];
        await this.send(unsubscribe, [subscriptionId]);
      },
      subscriptionId,
    };

    this.#subscriptions[subkey] = {
      input,
      callback,
      subscription,
    };

    // Handle pending notifications
    if (this.#pendingNotifications[subkey]) {
      this._handleNotification(this.#pendingNotifications[subkey]);
      delete this.#pendingNotifications[subkey];
    }

    return subscription;
  }

  async connect(): Promise<this> {
    this.#setStatus('connected');

    return this;
  }

  async disconnect(): Promise<void> {
    this.#chain.remove();
  }

  #id: JsonRpcRequestId = 0;
  #prepareRequest(method: string, params: any[]): JsonRpcRequest {
    const id = ++this.#id;

    return {
      id,
      jsonrpc: '2.0',
      method,
      params,
    };
  }
}
