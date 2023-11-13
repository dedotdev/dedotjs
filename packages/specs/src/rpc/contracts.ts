export const contracts = {
  call: {
    deprecated: 'Use the runtime interface `api.call.contractsApi.call` instead',
    docs: 'Executes a call to a contract',
    params: [
      {
        name: 'callRequest',
        type: 'ContractCallRequest',
      },
      {
        isHistoric: true,
        isOptional: true,
        name: 'at',
        type: 'BlockHash',
      },
    ],
    type: 'ContractExecResult',
    isSubscription: false,
    jsonrpc: 'contracts_call',
    method: 'call',
    section: 'contracts',
  },
  getStorage: {
    deprecated: 'Use the runtime interface `api.call.contractsApi.getStorage` instead',
    docs: 'Returns the value under a specified storage key in a contract',
    params: [
      {
        name: 'address',
        type: 'AccountId',
      },
      {
        name: 'key',
        type: 'H256',
      },
      {
        isHistoric: true,
        isOptional: true,
        name: 'at',
        type: 'BlockHash',
      },
    ],
    type: 'Option<Bytes>',
    isSubscription: false,
    jsonrpc: 'contracts_getStorage',
    method: 'getStorage',
    section: 'contracts',
  },
  instantiate: {
    deprecated: 'Use the runtime interface `api.call.contractsApi.instantiate` instead',
    docs: 'Instantiate a new contract',
    params: [
      {
        name: 'request',
        type: 'InstantiateRequestV1',
      },
      {
        isHistoric: true,
        isOptional: true,
        name: 'at',
        type: 'BlockHash',
      },
    ],
    type: 'ContractInstantiateResult',
    isSubscription: false,
    jsonrpc: 'contracts_instantiate',
    method: 'instantiate',
    section: 'contracts',
  },
  rentProjection: {
    deprecated: 'Not available in newer versions of the contracts interfaces',
    docs: 'Returns the projected time a given contract will be able to sustain paying its rent',
    params: [
      {
        name: 'address',
        type: 'AccountId',
      },
      {
        isHistoric: true,
        isOptional: true,
        name: 'at',
        type: 'BlockHash',
      },
    ],
    type: 'Option<BlockNumber>',
    isSubscription: false,
    jsonrpc: 'contracts_rentProjection',
    method: 'rentProjection',
    section: 'contracts',
  },
  uploadCode: {
    deprecated: 'Use the runtime interface `api.call.contractsApi.uploadCode` instead',
    docs: 'Upload new code without instantiating a contract from it',
    endpoint: 'contracts_upload_code',
    params: [
      {
        name: 'uploadRequest',
        type: 'CodeUploadRequest',
      },
      {
        isHistoric: true,
        isOptional: true,
        name: 'at',
        type: 'BlockHash',
      },
    ],
    type: 'CodeUploadResult',
    isSubscription: false,
    jsonrpc: 'contracts_uploadCode',
    method: 'uploadCode',
    section: 'contracts',
  },
};
