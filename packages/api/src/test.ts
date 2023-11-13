import { WsProvider } from '@polkadot/rpc-provider';
import { PolkadotApi } from '@delightfuldot/chaintypes/polkadot';
import { DelightfulApi } from './index';
import { $AccountId32, $Metadata } from '@delightfuldot/codecs';
import { hexFixLength, hexToU8a, isHex, u8aToHex } from '@polkadot/util';
import * as $ from '@delightfuldot/shape';

const NETWORKS = [
  {
    chain: 'polkadot',
    endpoint: 'wss://rpc.polkadot.io',
  },
  {
    chain: 'kusama',
    endpoint: 'wss://kusama-rpc.polkadot.io',
  },
  {
    chain: 'astar',
    endpoint: 'wss://rpc.astar.network',
  },
  {
    chain: 'moonbeam',
    endpoint: 'wss://1rpc.io/glmr',
  },
];
type A = {};

const a: A = {};

// const a: A = {
//   value: null
// }

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

async function run() {
  const api = await DelightfulApi.create<PolkadotApi>({
    provider: new WsProvider('wss://rpc.astar.network', 2500),
    // provider: new WsProvider('wss://rpc.polkadot.io', 2500),
    // provider: new WsProvider('ws://127.0.0.1:9944', 2500),
  });

  // const unsub = await api.rpc.chain.subscribeAllHeads((result) => {
  //   console.dir(result, { depth: null });
  // });

  const key =
    '0x1126aa394eea5630e07c48ae0c9558cef7b99d880ec681799c0cf30e8886371da9b4c17dafb17acab35d37f752f12d7a96e49ad2f6a7346dca526a39aeea90aa0231717c77eaf257b0733faed3e1953f19';
  // const result = await api.rpc.state.getStorage(key);
  // console.log(result);

  // await api.rpc.state.subscribeStorage([key], (resp) => {
  //   console.log(resp);
  // });

  const accountId = $AccountId32.tryEncode('16AjunUasoBZKWkDnHvNEALGUgGuzC92j7LJoLu9qBSUJB2e');
  console.log(u8aToHex(new Uint8Array()));

  const metadata = await api.rpc.state.call('Metadata_metadata_versions', u8aToHex(new Uint8Array()));
  // const x = await api.rpc.state.call('AccountNonceApi_account_nonce', u8aToHex(new Uint8Array()));
  // const x = await api.rpc.state.call('TimestampApi_timestamp', u8aToHex(new Uint8Array()));
  // const nonce = await api.rpc.system.accountNextIndex('16AjunUasoBZKWkDnHvNEALGUgGuzC92j7LJoLu9qBSUJB2e');
  // console.log(nonce);
  console.log($.Vec($.u32).tryDecode(metadata));

  // console.log(x, $.u32.decode(hexToU8a(x)), $.u32.tryDecode(x));
  //
  // if (isHex(x, -1, true)) {
  //   console.log('fix lnegh', x, hexToU8a(hexFixLength(x)), $.u32.decode(hexToU8a(hexFixLength(x))));
  // }

  // const r = await api.rpc.chain.getBlock(n);
  // console.log(n);
  // console.dir(r, { depth: null });

  // await unsub();
  // const astar = await DelightfulApi.create<MoonbeamApi>({ provider: new WsProvider('wss://1rpc.io/glmr', 2500) });

  // const result = await api.rpc.account.nextIndex('0xC2fF1C8910Ab5B8e9e9ef0ac081Ce6A69d56Af2E');
  // const result = await api.rpc.account.nextIndex('16AjunUasoBZKWkDnHvNEALGUgGuzC92j7LJoLu9qBSUJB2e');

  // const result = await api.query.eVM.accountCodes()
  // const result = await api.rpc.system.accountNextIndex('0xC2fF1C8910Ab5B8e9e9ef0ac081Ce6A69d56Af2E');
  // const result = await api.query.system.account('16AjunUasoBZKWkDnHvNEALGUgGuzC92j7LJoLu9qBSUJB2e');
  // const result = await api.query.auctions.auctionInfo();
  // const result = await api.rpc.state;
  // const result = await api.query.auctions.winning(18055800);
  // const result = await api.query.system.account('5D7XrCKKm8ZpWyvJrapM76QPgBW1Lu7dbRpcY9sdNJqQqBqQ');

  // console.log(JSON.stringify(result));
  // console.dir(result, { depth: null });

  //
  // // console.dir(api.consts.system.version, { depth: null });
  // const tracks = api.consts.referenda.tracks.map(([id, { name }]) => [name, id]);
  // for (const track of tracks) {
  //   const [name, id] = track;
  //   const queue = await api.query.referenda.decidingCount(id as number);
  //   console.log(name, queue);
  // }
  // // console.dir(await api.query.democracy.publicPropCount(), { depth: null });
  // // console.dir(await api.query.referenda.trackQueue(31), { depth: null });
  // // console.dir(await api.query.identity.identityOf('16AjunUasoBZKWkDnHvNEALGUgGuzC92j7LJoLu9qBSUJB2e'), { depth: null });
  // // console.dir(await api.query.identity.identityOf('12K7AbU3KTXYznR4HQicxuBK2Fz584bFXHUFj5vQwGoyXEjo'), { depth: null });
  // // const data = (await api.query.identity.identityOf('1C42oGF3s8ztCsc22MA4LKd8BogMJNdVmCgtTXGfxqwjrSb'))!;
  // // const data = (await api.query.identity.identityOf('16AjunUasoBZKWkDnHvNEALGUgGuzC92j7LJoLu9qBSUJB2e'))!;
  // // // @ts-ignore
  // // console.dir(data.info.display.value, { depth: null });
  //
  // // console.dir(api.registry.findPortableCodec(18), { depth: null });
  // // fs.writeFileSync('./dot-events.json', JSON.stringify(await api.rpc.chain.getHeader(), null, 2))
  // //
  // await api.disconnect();
}

run().catch(console.log);
