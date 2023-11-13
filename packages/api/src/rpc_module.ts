import { Metadata } from '@delightfuldot/codecs';

abstract class RpcModule {
  protected constructor(readonly prefix: string) {}
}

function rpc() {}

abstract class RpcState extends RpcModule {
  constructor() {
    super('state');
  }

  abstract getMetadata(): Promise<Metadata>;
}
