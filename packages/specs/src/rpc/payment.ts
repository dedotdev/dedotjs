export const payment = {
  queryFeeDetails: {
    deprecated: 'Use `api.call.transactionPaymentApi.queryFeeDetails` instead',
    docs: 'Query the detailed fee of a given encoded extrinsic',
    params: [
      {
        name: 'extrinsic',
        type: 'Bytes',
      },
      {
        isHistoric: true,
        isOptional: true,
        name: 'at',
        type: 'BlockHash',
      },
    ],
    type: 'FeeDetails',
    isSubscription: false,
    jsonrpc: 'payment_queryFeeDetails',
    method: 'queryFeeDetails',
    section: 'payment',
  },
  queryInfo: {
    deprecated: 'Use `api.call.transactionPaymentApi.queryInfo` instead',
    docs: 'Retrieves the fee information for an encoded extrinsic',
    params: [
      {
        name: 'extrinsic',
        type: 'Bytes',
      },
      {
        isHistoric: true,
        isOptional: true,
        name: 'at',
        type: 'BlockHash',
      },
    ],
    type: 'RuntimeDispatchInfoV1',
    isSubscription: false,
    jsonrpc: 'payment_queryInfo',
    method: 'queryInfo',
    section: 'payment',
  },
};
