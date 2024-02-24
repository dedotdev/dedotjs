// Generated by @delightfuldot/codegen

import type { GenericRuntimeApis, GenericRuntimeApiMethod } from '@delightfuldot/types';
import type {
  RuntimeVersion,
  Header,
  DispatchError,
  Result,
  UncheckedExtrinsicLike,
  UncheckedExtrinsic,
  H256,
  Bytes,
  BytesLike,
  AccountId32Like,
} from '@delightfuldot/codecs';
import type {
  SpConsensusSlotsSlotDuration,
  SpConsensusAuraEd25519AppEd25519Public,
  SpRuntimeBlock,
  SpCoreOpaqueMetadata,
  SpRuntimeTransactionValidityTransactionValidityError,
  SpInherentsInherentData,
  SpInherentsCheckInherentsResult,
  SpRuntimeTransactionValidityValidTransaction,
  SpRuntimeTransactionValidityTransactionSource,
  SpCoreCryptoKeyTypeId,
  PalletTransactionPaymentRuntimeDispatchInfo,
  PalletTransactionPaymentFeeDetails,
  SpWeightsWeightV2Weight,
  AssetHubPolkadotRuntimeRuntimeCallLike,
  XcmVersionedMultiAssets,
  AssetsCommonRuntimeApiFungiblesAccessError,
  CumulusPrimitivesCoreCollationInfo,
} from './types';

export interface RuntimeApis extends GenericRuntimeApis {
  /**
   * @runtimeapi: AuraApi - 0xdd718d5cc53262d4
   **/
  auraApi: {
    /**
     * Returns the slot duration for Aura.
     *
     * Currently, only the value provided by this type at genesis will be used.
     *
     * @callname: AuraApi_slot_duration
     **/
    slotDuration: GenericRuntimeApiMethod<() => Promise<SpConsensusSlotsSlotDuration>>;

    /**
     * Return the current set of authorities.
     *
     * @callname: AuraApi_authorities
     **/
    authorities: GenericRuntimeApiMethod<() => Promise<Array<SpConsensusAuraEd25519AppEd25519Public>>>;

    /**
     * Generic runtime api call
     **/
    [method: string]: GenericRuntimeApiMethod;
  };
  /**
   * @runtimeapi: Core - 0xdf6acb689907609b
   **/
  core: {
    /**
     * Returns the version of the runtime.
     *
     * @callname: Core_version
     **/
    version: GenericRuntimeApiMethod<() => Promise<RuntimeVersion>>;

    /**
     * Execute the given block.
     *
     * @callname: Core_execute_block
     **/
    executeBlock: GenericRuntimeApiMethod<(block: SpRuntimeBlock) => Promise<[]>>;

    /**
     * Initialize a block with the given header.
     *
     * @callname: Core_initialize_block
     **/
    initializeBlock: GenericRuntimeApiMethod<(header: Header) => Promise<[]>>;

    /**
     * Generic runtime api call
     **/
    [method: string]: GenericRuntimeApiMethod;
  };
  /**
   * @runtimeapi: Metadata - 0x37e397fc7c91f5e4
   **/
  metadata: {
    /**
     * Returns the metadata of a runtime.
     *
     * @callname: Metadata_metadata
     **/
    metadata: GenericRuntimeApiMethod<() => Promise<SpCoreOpaqueMetadata>>;

    /**
     * Returns the metadata at a given version.
     *
     * If the given `version` isn't supported, this will return `None`.
     * Use [`Self::metadata_versions`] to find out about supported metadata version of the runtime.
     *
     * @callname: Metadata_metadata_at_version
     **/
    metadataAtVersion: GenericRuntimeApiMethod<(version: number) => Promise<SpCoreOpaqueMetadata | undefined>>;

    /**
     * Returns the supported metadata versions.
     *
     * This can be used to call `metadata_at_version`.
     *
     * @callname: Metadata_metadata_versions
     **/
    metadataVersions: GenericRuntimeApiMethod<() => Promise<Array<number>>>;

    /**
     * Generic runtime api call
     **/
    [method: string]: GenericRuntimeApiMethod;
  };
  /**
   * @runtimeapi: BlockBuilder - 0x40fe3ad401f8959a
   **/
  blockBuilder: {
    /**
     * Apply the given extrinsic.
     *
     * Returns an inclusion outcome which specifies if this extrinsic is included in
     * this block or not.
     *
     * @callname: BlockBuilder_apply_extrinsic
     **/
    applyExtrinsic: GenericRuntimeApiMethod<
      (
        extrinsic: UncheckedExtrinsicLike,
      ) => Promise<Result<Result<[], DispatchError>, SpRuntimeTransactionValidityTransactionValidityError>>
    >;

    /**
     * Finish the current block.
     *
     * @callname: BlockBuilder_finalize_block
     **/
    finalizeBlock: GenericRuntimeApiMethod<() => Promise<Header>>;

    /**
     * Generate inherent extrinsics. The inherent data will vary from chain to chain.
     *
     * @callname: BlockBuilder_inherent_extrinsics
     **/
    inherentExtrinsics: GenericRuntimeApiMethod<
      (inherent: SpInherentsInherentData) => Promise<Array<UncheckedExtrinsic>>
    >;

    /**
     * Check that the inherents are valid. The inherent data will vary from chain to chain.
     *
     * @callname: BlockBuilder_check_inherents
     **/
    checkInherents: GenericRuntimeApiMethod<
      (block: SpRuntimeBlock, data: SpInherentsInherentData) => Promise<SpInherentsCheckInherentsResult>
    >;

    /**
     * Generic runtime api call
     **/
    [method: string]: GenericRuntimeApiMethod;
  };
  /**
   * @runtimeapi: TaggedTransactionQueue - 0xd2bc9897eed08f15
   **/
  taggedTransactionQueue: {
    /**
     * Validate the transaction.
     *
     * This method is invoked by the transaction pool to learn details about given transaction.
     * The implementation should make sure to verify the correctness of the transaction
     * against current state. The given `block_hash` corresponds to the hash of the block
     * that is used as current state.
     *
     * Note that this call may be performed by the pool multiple times and transactions
     * might be verified in any possible order.
     *
     * @callname: TaggedTransactionQueue_validate_transaction
     **/
    validateTransaction: GenericRuntimeApiMethod<
      (
        source: SpRuntimeTransactionValidityTransactionSource,
        tx: UncheckedExtrinsicLike,
        blockHash: H256,
      ) => Promise<
        Result<SpRuntimeTransactionValidityValidTransaction, SpRuntimeTransactionValidityTransactionValidityError>
      >
    >;

    /**
     * Generic runtime api call
     **/
    [method: string]: GenericRuntimeApiMethod;
  };
  /**
   * @runtimeapi: OffchainWorkerApi - 0xf78b278be53f454c
   **/
  offchainWorkerApi: {
    /**
     * Starts the off-chain task for given block header.
     *
     * @callname: OffchainWorkerApi_offchain_worker
     **/
    offchainWorker: GenericRuntimeApiMethod<(header: Header) => Promise<[]>>;

    /**
     * Generic runtime api call
     **/
    [method: string]: GenericRuntimeApiMethod;
  };
  /**
   * @runtimeapi: SessionKeys - 0xab3c0572291feb8b
   **/
  sessionKeys: {
    /**
     * Generate a set of session keys with optionally using the given seed.
     * The keys should be stored within the keystore exposed via runtime
     * externalities.
     *
     * The seed needs to be a valid `utf8` string.
     *
     * Returns the concatenated SCALE encoded public keys.
     *
     * @callname: SessionKeys_generate_session_keys
     **/
    generateSessionKeys: GenericRuntimeApiMethod<(seed?: BytesLike | undefined) => Promise<Bytes>>;

    /**
     * Decode the given public session keys.
     *
     * Returns the list of public raw public keys + key type.
     *
     * @callname: SessionKeys_decode_session_keys
     **/
    decodeSessionKeys: GenericRuntimeApiMethod<
      (encoded: BytesLike) => Promise<Array<[Bytes, SpCoreCryptoKeyTypeId]> | undefined>
    >;

    /**
     * Generic runtime api call
     **/
    [method: string]: GenericRuntimeApiMethod;
  };
  /**
   * @runtimeapi: AccountNonceApi - 0xbc9d89904f5b923f
   **/
  accountNonceApi: {
    /**
     * Get current account nonce of given `AccountId`.
     *
     * @callname: AccountNonceApi_account_nonce
     **/
    accountNonce: GenericRuntimeApiMethod<(account: AccountId32Like) => Promise<number>>;

    /**
     * Generic runtime api call
     **/
    [method: string]: GenericRuntimeApiMethod;
  };
  /**
   * @runtimeapi: TransactionPaymentApi - 0x37c8bb1350a9a2a8
   **/
  transactionPaymentApi: {
    /**
     *
     * @callname: TransactionPaymentApi_query_info
     **/
    queryInfo: GenericRuntimeApiMethod<
      (uxt: UncheckedExtrinsicLike, len: number) => Promise<PalletTransactionPaymentRuntimeDispatchInfo>
    >;

    /**
     *
     * @callname: TransactionPaymentApi_query_fee_details
     **/
    queryFeeDetails: GenericRuntimeApiMethod<
      (uxt: UncheckedExtrinsicLike, len: number) => Promise<PalletTransactionPaymentFeeDetails>
    >;

    /**
     *
     * @callname: TransactionPaymentApi_query_weight_to_fee
     **/
    queryWeightToFee: GenericRuntimeApiMethod<(weight: SpWeightsWeightV2Weight) => Promise<bigint>>;

    /**
     *
     * @callname: TransactionPaymentApi_query_length_to_fee
     **/
    queryLengthToFee: GenericRuntimeApiMethod<(length: number) => Promise<bigint>>;

    /**
     * Generic runtime api call
     **/
    [method: string]: GenericRuntimeApiMethod;
  };
  /**
   * @runtimeapi: TransactionPaymentCallApi - 0xf3ff14d5ab527059
   **/
  transactionPaymentCallApi: {
    /**
     * Query information of a dispatch class, weight, and fee of a given encoded `Call`.
     *
     * @callname: TransactionPaymentCallApi_query_call_info
     **/
    queryCallInfo: GenericRuntimeApiMethod<
      (
        call: AssetHubPolkadotRuntimeRuntimeCallLike,
        len: number,
      ) => Promise<PalletTransactionPaymentRuntimeDispatchInfo>
    >;

    /**
     * Query fee details of a given encoded `Call`.
     *
     * @callname: TransactionPaymentCallApi_query_call_fee_details
     **/
    queryCallFeeDetails: GenericRuntimeApiMethod<
      (call: AssetHubPolkadotRuntimeRuntimeCallLike, len: number) => Promise<PalletTransactionPaymentFeeDetails>
    >;

    /**
     * Query the output of the current `WeightToFee` given some input.
     *
     * @callname: TransactionPaymentCallApi_query_weight_to_fee
     **/
    queryWeightToFee: GenericRuntimeApiMethod<(weight: SpWeightsWeightV2Weight) => Promise<bigint>>;

    /**
     * Query the output of the current `LengthToFee` given some input.
     *
     * @callname: TransactionPaymentCallApi_query_length_to_fee
     **/
    queryLengthToFee: GenericRuntimeApiMethod<(length: number) => Promise<bigint>>;

    /**
     * Generic runtime api call
     **/
    [method: string]: GenericRuntimeApiMethod;
  };
  /**
   * @runtimeapi: FungiblesApi - 0xde92b8a0426b9bf6
   **/
  fungiblesApi: {
    /**
     * Returns the list of all [`MultiAsset`] that an `AccountId` has.
     *
     * @callname: FungiblesApi_query_account_balances
     **/
    queryAccountBalances: GenericRuntimeApiMethod<
      (account: AccountId32Like) => Promise<Result<XcmVersionedMultiAssets, AssetsCommonRuntimeApiFungiblesAccessError>>
    >;

    /**
     * Generic runtime api call
     **/
    [method: string]: GenericRuntimeApiMethod;
  };
  /**
   * @runtimeapi: CollectCollationInfo - 0xea93e3f16f3d6962
   **/
  collectCollationInfo: {
    /**
     * Collect information about a collation.
     *
     * The given `header` is the header of the built block for that
     * we are collecting the collation info for.
     *
     * @callname: CollectCollationInfo_collect_collation_info
     **/
    collectCollationInfo: GenericRuntimeApiMethod<(header: Header) => Promise<CumulusPrimitivesCoreCollationInfo>>;

    /**
     * Generic runtime api call
     **/
    [method: string]: GenericRuntimeApiMethod;
  };
  /**
   * @runtimeapi: GenesisBuilder - 0xfbc577b9d747efd6
   **/
  genesisBuilder: {
    /**
     * Creates the default `GenesisConfig` and returns it as a JSON blob.
     *
     * This function instantiates the default `GenesisConfig` struct for the runtime and serializes it into a JSON
     * blob. It returns a `Vec<u8>` containing the JSON representation of the default `GenesisConfig`.
     *
     * @callname: GenesisBuilder_create_default_config
     **/
    createDefaultConfig: GenericRuntimeApiMethod<() => Promise<Bytes>>;

    /**
     * Build `GenesisConfig` from a JSON blob not using any defaults and store it in the storage.
     *
     * This function deserializes the full `GenesisConfig` from the given JSON blob and puts it into the storage.
     * If the provided JSON blob is incorrect or incomplete or the deserialization fails, an error is returned.
     * It is recommended to log any errors encountered during the process.
     *
     * Please note that provided json blob must contain all `GenesisConfig` fields, no defaults will be used.
     *
     * @callname: GenesisBuilder_build_config
     **/
    buildConfig: GenericRuntimeApiMethod<(json: BytesLike) => Promise<Result<[], string>>>;

    /**
     * Generic runtime api call
     **/
    [method: string]: GenericRuntimeApiMethod;
  };
}
