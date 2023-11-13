export const author = {
  hasKey: {
    docs: 'Returns true if the keystore has private keys for the given public key and key type.',
    isUnsafe: true,
    params: [
      {
        name: 'publicKey',
        type: 'Bytes',
      },
      {
        name: 'keyType',
        type: 'string',
      },
    ],
    type: 'boolean',
    isSubscription: false,
    jsonrpc: 'author_hasKey',
    method: 'hasKey',
    section: 'author',
  },
  hasSessionKeys: {
    docs: 'Returns true if the keystore has private keys for the given session public keys.',
    isUnsafe: true,
    params: [
      {
        name: 'sessionKeys',
        type: 'Bytes',
      },
    ],
    type: 'boolean',
    isSubscription: false,
    jsonrpc: 'author_hasSessionKeys',
    method: 'hasSessionKeys',
    section: 'author',
  },
  insertKey: {
    docs: 'Insert a key into the keystore.',
    isUnsafe: true,
    params: [
      {
        name: 'keyType',
        type: 'string',
      },
      {
        name: 'suri',
        type: 'string',
      },
      {
        name: 'publicKey',
        type: 'Bytes',
      },
    ],
    type: 'Bytes',
    isSubscription: false,
    jsonrpc: 'author_insertKey',
    method: 'insertKey',
    section: 'author',
  },
  pendingExtrinsics: {
    docs: 'Returns all pending extrinsics, potentially grouped by sender',
    params: [],
    type: 'Array<Extrinsic>',
    isSubscription: false,
    jsonrpc: 'author_pendingExtrinsics',
    method: 'pendingExtrinsics',
    section: 'author',
  },
  removeExtrinsic: {
    docs: 'Remove given extrinsic from the pool and temporarily ban it to prevent reimporting',
    isUnsafe: true,
    params: [
      {
        name: 'bytesOrHash',
        type: 'Array<ExtrinsicOrHash>',
      },
    ],
    type: 'Array<Hash>',
    isSubscription: false,
    jsonrpc: 'author_removeExtrinsic',
    method: 'removeExtrinsic',
    section: 'author',
  },
  rotateKeys: {
    docs: 'Generate new session keys and returns the corresponding public keys',
    isUnsafe: true,
    params: [],
    type: 'Bytes',
    isSubscription: false,
    jsonrpc: 'author_rotateKeys',
    method: 'rotateKeys',
    section: 'author',
  },
  submitAndWatchExtrinsic: {
    docs: 'Submit and subscribe to watch an extrinsic until unsubscribed',
    isSigned: true,
    params: [
      {
        name: 'extrinsic',
        type: 'Extrinsic',
      },
    ],
    pubsub: ['extrinsicUpdate', 'submitAndWatchExtrinsic', 'unwatchExtrinsic'],
    type: 'ExtrinsicStatus',
    isSubscription: true,
    jsonrpc: 'author_submitAndWatchExtrinsic',
    method: 'submitAndWatchExtrinsic',
    section: 'author',
  },
  submitExtrinsic: {
    docs: 'Submit a fully formatted extrinsic for block inclusion',
    isSigned: true,
    params: [
      {
        name: 'extrinsic',
        type: 'Extrinsic',
      },
    ],
    type: 'Hash',
    isSubscription: false,
    jsonrpc: 'author_submitExtrinsic',
    method: 'submitExtrinsic',
    section: 'author',
  },
};
