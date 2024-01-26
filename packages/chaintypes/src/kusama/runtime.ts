// Generated by @delightfuldot/codegen

import type { GenericRuntimeCalls, GenericRuntimeCall } from '@delightfuldot/types';
import type {
  RuntimeVersion,
  Block,
  Header,
  Option,
  OpaqueMetadata,
  ApplyExtrinsicResult,
  Bytes,
  CheckInherentsResult,
  InherentData,
  Extrinsic,
  Null,
  BackingState,
  ParaId,
  AsyncBackingParams,
  ValidatorId,
  ParaValidatorIndex,
  GroupRotationInfo,
  CoreState,
  PersistedValidationData,
  OccupiedCoreAssumption,
  ValidationCodeHash,
  Hash,
  CandidateCommitments,
  SessionIndex,
  ValidationCode,
  CommittedCandidateReceipt,
  CandidateEvent,
  InboundDownwardMessage,
  InboundHrmpMessage,
  ScrapedOnChainVotes,
  SessionInfo,
  PvfCheckStatement,
  ValidatorSignature,
  CandidateHash,
  DisputeState,
  ExecutorParams,
  PendingSlashes,
  OpaqueKeyOwnershipProof,
  DisputeProof,
  ResultPayload,
  MmrError,
  LeafIndex,
  BlockNumberLike,
  MmrEncodableOpaqueLeaf,
  MmrBatchProof,
  SetId,
  AccountId32Like,
  AuthorityList,
  GrandpaEquivocationProof,
  BabeConfiguration,
  Epoch,
  Slot,
  AccountId32,
  KeyTypeId,
  Nonce,
  RuntimeDispatchInfo,
  FeeDetails,
  Balance,
  Weight,
  NpPoolId,
} from '@delightfuldot/codecs';

export interface RuntimeCalls extends GenericRuntimeCalls {
  /**
   * @runtimeapi: Core - 0xdf6acb689907609b
   * @version: 4
   **/
  core: {
    /**
     * Returns the version of the runtime.
     *
     * @callname: Core_version
     **/
    version: GenericRuntimeCall<() => Promise<RuntimeVersion>>;

    /**
     * Execute the given block.
     *
     * @callname: Core_execute_block
     **/
    executeBlock: GenericRuntimeCall<(block: Block) => Promise<null>>;

    /**
     * Initialize a block with the given header.
     *
     * @callname: Core_initialize_block
     **/
    initializeBlock: GenericRuntimeCall<(header: Header) => Promise<null>>;

    /**
     * Generic runtime call
     **/
    [method: string]: GenericRuntimeCall;
  };
  /**
   * @runtimeapi: Metadata - 0x37e397fc7c91f5e4
   * @version: 2
   **/
  metadata: {
    /**
     * Returns the metadata at a given version.
     *
     * @callname: Metadata_metadata_at_version
     **/
    metadataAtVersion: GenericRuntimeCall<(version: number) => Promise<Option<OpaqueMetadata>>>;

    /**
     * Returns the supported metadata versions.
     *
     * @callname: Metadata_metadata_versions
     **/
    metadataVersions: GenericRuntimeCall<() => Promise<Array<number>>>;

    /**
     * Returns the metadata of a runtime.
     *
     * @callname: Metadata_metadata
     **/
    metadata: GenericRuntimeCall<() => Promise<OpaqueMetadata>>;

    /**
     * Generic runtime call
     **/
    [method: string]: GenericRuntimeCall;
  };
  /**
   * @runtimeapi: BlockBuilder - 0x40fe3ad401f8959a
   * @version: 6
   **/
  blockBuilder: {
    /**
     *
     * @callname: BlockBuilder_apply_extrinsic
     **/
    applyExtrinsic: GenericRuntimeCall<(extrinsic: Bytes) => Promise<ApplyExtrinsicResult>>;

    /**
     *
     * @callname: BlockBuilder_check_inherents
     **/
    checkInherents: GenericRuntimeCall<(block: Block, data: InherentData) => Promise<CheckInherentsResult>>;

    /**
     *
     * @callname: BlockBuilder_inherent_extrinsics
     **/
    inherentExtrinsics: GenericRuntimeCall<(inherent: InherentData) => Promise<Array<Extrinsic>>>;

    /**
     *
     * @callname: BlockBuilder_finalize_block
     **/
    finalizeBlock: GenericRuntimeCall<() => Promise<Header>>;

    /**
     * Generic runtime call
     **/
    [method: string]: GenericRuntimeCall;
  };
  /**
   * @runtimeapi: OffchainWorkerApi - 0xf78b278be53f454c
   * @version: 2
   **/
  offchainWorkerApi: {
    /**
     * Starts the off-chain task for given block header.
     *
     * @callname: OffchainWorkerApi_offchain_worker
     **/
    offchainWorker: GenericRuntimeCall<(header: Header) => Promise<Null>>;

    /**
     * Generic runtime call
     **/
    [method: string]: GenericRuntimeCall;
  };
  /**
   * @runtimeapi: ParachainHost - 0xaf2c0297a23e6d3d
   * @version: 7
   **/
  parachainHost: {
    /**
     * Returns the state of parachain backing for a given para.
     *
     * @callname: ParachainHost_para_backing_state
     **/
    paraBackingState: GenericRuntimeCall<(paraId: ParaId) => Promise<Option<BackingState>>>;

    /**
     * Returns candidate's acceptance limitations for asynchronous backing for a relay parent.
     *
     * @callname: ParachainHost_async_backing_params
     **/
    asyncBackingParams: GenericRuntimeCall<() => Promise<AsyncBackingParams>>;

    /**
     * Get the minimum number of backing votes for a parachain candidate.
     * This is a staging method! Do not use on production runtimes!
     *
     * @callname: ParachainHost_minimum_backing_votes
     **/
    minimumBackingVotes: GenericRuntimeCall<() => Promise<number>>;

    /**
     * Get the current validators.
     *
     * @callname: ParachainHost_validators
     **/
    validators: GenericRuntimeCall<() => Promise<Array<ValidatorId>>>;

    /**
     * Returns the validator groups and rotation info localized based on the hypothetical child
     * of a block whose state this is invoked on. Note that `now` in the `GroupRotationInfo`
     * should be the successor of the number of the block.
     *
     * @callname: ParachainHost_validator_groups
     **/
    validatorGroups: GenericRuntimeCall<() => Promise<[Array<Array<ParaValidatorIndex>>, GroupRotationInfo]>>;

    /**
     * Yields information on all availability cores as relevant to the child block.
     * Cores are either free or occupied. Free cores can have paras assigned to them.
     *
     * @callname: ParachainHost_availability_cores
     **/
    availabilityCores: GenericRuntimeCall<() => Promise<Array<CoreState>>>;

    /**
     * Yields the persisted validation data for the given `ParaId` along with an assumption that
     * should be used if the para currently occupies a core.
     *
     * Returns `None` if either the para is not registered or the assumption is `Freed`
     * and the para already occupies a core.
     *
     * @callname: ParachainHost_persisted_validation_data
     **/
    persistedValidationData: GenericRuntimeCall<
      (paraId: ParaId, assumption: OccupiedCoreAssumption) => Promise<Option<PersistedValidationData>>
    >;

    /**
     * Returns the persisted validation data for the given `ParaId` along with the corresponding
     * validation code hash. Instead of accepting assumption about the para, matches the validation
     * data hash against an expected one and yields `None` if they're not equal.
     *
     * @callname: ParachainHost_assumed_validation_data
     **/
    assumedValidationData: GenericRuntimeCall<
      (
        paraId: ParaId,
        expectedPersistedValidationDataHash: Hash,
      ) => Promise<Option<[PersistedValidationData, ValidationCodeHash]>>
    >;

    /**
     * Checks if the given validation outputs pass the acceptance criteria.
     *
     * @callname: ParachainHost_check_validation_outputs
     **/
    checkValidationOutputs: GenericRuntimeCall<(paraId: ParaId, outputs: CandidateCommitments) => Promise<boolean>>;

    /**
     * Returns the session index expected at a child of the block.
     *
     * This can be used to instantiate a `SigningContext`.
     *
     * @callname: ParachainHost_session_index_for_child
     **/
    sessionIndexForChild: GenericRuntimeCall<() => Promise<SessionIndex>>;

    /**
     * Fetch the validation code used by a para, making the given `OccupiedCoreAssumption`.
     *
     * Returns `None` if either the para is not registered or the assumption is `Freed`
     * and the para already occupies a core.
     *
     * @callname: ParachainHost_validation_code
     **/
    validationCode: GenericRuntimeCall<(paraId: ParaId, assumption: OccupiedCoreAssumption) => Promise<ValidationCode>>;

    /**
     * Get the receipt of a candidate pending availability. This returns `Some` for any paras
     * assigned to occupied cores in `availability_cores` and `None` otherwise.
     *
     * @callname: ParachainHost_candidate_pending_availability
     **/
    candidatePendingAvailability: GenericRuntimeCall<(paraId: ParaId) => Promise<Option<CommittedCandidateReceipt>>>;

    /**
     * Get a vector of events concerning candidates that occurred within a block.
     *
     * @callname: ParachainHost_candidate_events
     **/
    candidateEvents: GenericRuntimeCall<() => Promise<Array<CandidateEvent>>>;

    /**
     * Get all the pending inbound messages in the downward message queue for a para.
     *
     * @callname: ParachainHost_dmq_contents
     **/
    dmqContents: GenericRuntimeCall<(recipient: ParaId) => Promise<Array<InboundDownwardMessage>>>;

    /**
     * Get the contents of all channels addressed to the given recipient. Channels that have no
     * messages in them are also included.
     *
     * @callname: ParachainHost_inbound_hrmp_channels_contents
     **/
    inboundHrmpChannelsContents: GenericRuntimeCall<(recipient: ParaId) => Promise<Array<InboundHrmpMessage>>>;

    /**
     * Get the validation code from its hash.
     *
     * @callname: ParachainHost_validation_code_by_hash
     **/
    validationCodeByHash: GenericRuntimeCall<(hash: ValidationCodeHash) => Promise<Option<ValidationCode>>>;

    /**
     * Scrape dispute relevant from on-chain, backing votes and resolved disputes.
     *
     * @callname: ParachainHost_on_chain_votes
     **/
    onChainVotes: GenericRuntimeCall<() => Promise<Option<ScrapedOnChainVotes>>>;

    /**
     * Get the session info for the given session, if stored.
     *
     * @callname: ParachainHost_session_info
     **/
    sessionInfo: GenericRuntimeCall<(index: SessionIndex) => Promise<Option<SessionInfo>>>;

    /**
     * Submits a PVF pre-checking statement into the transaction pool.
     *
     * @callname: ParachainHost_submit_pvf_check_statement
     **/
    submitPvfCheckStatement: GenericRuntimeCall<
      (stmt: PvfCheckStatement, signature: ValidatorSignature) => Promise<Null>
    >;

    /**
     * Returns code hashes of PVFs that require pre-checking by validators in the active set.
     *
     * @callname: ParachainHost_pvfs_require_precheck
     **/
    pvfsRequirePrecheck: GenericRuntimeCall<() => Promise<Array<ValidationCodeHash>>>;

    /**
     * Fetch the hash of the validation code used by a para, making the given `OccupiedCoreAssumption`.
     *
     * @callname: ParachainHost_validation_code_hash
     **/
    validationCodeHash: GenericRuntimeCall<
      (paraId: ParaId, assumption: OccupiedCoreAssumption) => Promise<Option<ValidationCodeHash>>
    >;

    /**
     * Returns all onchain disputes.
     *
     * @callname: ParachainHost_disputes
     **/
    disputes: GenericRuntimeCall<() => Promise<Array<[SessionIndex, CandidateHash, DisputeState]>>>;

    /**
     * Returns execution parameters for the session.
     *
     * @callname: ParachainHost_session_executor_params
     **/
    sessionExecutorParams: GenericRuntimeCall<(sessionIndex: SessionIndex) => Promise<Option<ExecutorParams>>>;

    /**
     * Returns a list of validators that lost a past session dispute and need to be slashed
     *
     * @callname: ParachainHost_unapplied_slashes
     **/
    unappliedSlashes: GenericRuntimeCall<() => Promise<Array<[SessionIndex, CandidateHash, PendingSlashes]>>>;

    /**
     * Returns a merkle proof of a validator session key
     *
     * @callname: ParachainHost_key_ownership_proof
     **/
    keyOwnershipProof: GenericRuntimeCall<(validatorId: ValidatorId) => Promise<Option<OpaqueKeyOwnershipProof>>>;

    /**
     * Submit an unsigned extrinsic to slash validators who lost a dispute about a candidate of a past session
     *
     * @callname: ParachainHost_submit_report_dispute_lost
     **/
    submitReportDisputeLost: GenericRuntimeCall<
      (disputeProof: DisputeProof, keyOwnershipProof: OpaqueKeyOwnershipProof) => Promise<Option<Null>>
    >;

    /**
     * Generic runtime call
     **/
    [method: string]: GenericRuntimeCall;
  };
  /**
   * @runtimeapi: MmrApi - 0x91d5df18b0d2cf58
   * @version: 2
   **/
  mmrApi: {
    /**
     * Return the on-chain MMR root hash.
     *
     * @callname: MmrApi_mmr_root
     **/
    mmrRoot: GenericRuntimeCall<() => Promise<ResultPayload<Hash, MmrError>>>;

    /**
     * Return the number of MMR blocks in the chain.
     *
     * @callname: MmrApi_mmr_leaf_count
     **/
    mmrLeafCount: GenericRuntimeCall<() => Promise<ResultPayload<LeafIndex, MmrError>>>;

    /**
     * Generate MMR proof for a series of block numbers. If `best_known_block_number = Some(n)`,
     * use historical MMR state at given block height `n`. Else, use current MMR state.
     *
     * @callname: MmrApi_generate_proof
     **/
    generateProof: GenericRuntimeCall<
      (
        blockNumbers: Array<BlockNumberLike>,
        bestKnownBlockNumber: Option<BlockNumberLike>,
      ) => Promise<ResultPayload<[Array<MmrEncodableOpaqueLeaf>, MmrBatchProof], MmrError>>
    >;

    /**
     * Verify MMR proof against on-chain MMR for a batch of leaves.
     *
     * Note this function will use on-chain MMR root hash and check if the proof matches the hash.
     * Note, the leaves should be sorted such that corresponding leaves and leaf indices have the
     * same position in both the `leaves` vector and the `leaf_indices` vector contained in the [Proof]
     *
     * @callname: MmrApi_verify_proof
     **/
    verifyProof: GenericRuntimeCall<
      (leaves: Array<MmrEncodableOpaqueLeaf>, proof: MmrBatchProof) => Promise<ResultPayload<Null, MmrError>>
    >;

    /**
     * Verify MMR proof against given root hash for a batch of leaves.
     *
     * Note this function does not require any on-chain storage - the
     * proof is verified against given MMR root hash.
     *
     * Note, the leaves should be sorted such that corresponding leaves and leaf indices have the
     * same position in both the `leaves` vector and the `leaf_indices` vector contained in the [Proof]
     *
     * @callname: MmrApi_verify_proof_stateless
     **/
    verifyProofStateless: GenericRuntimeCall<
      (
        root: Hash,
        leaves: Array<MmrEncodableOpaqueLeaf>,
        proof: MmrBatchProof,
      ) => Promise<ResultPayload<Null, MmrError>>
    >;

    /**
     * Generic runtime call
     **/
    [method: string]: GenericRuntimeCall;
  };
  /**
   * @runtimeapi: GrandpaApi - 0xed99c5acb25eedf5
   * @version: 3
   **/
  grandpaApi: {
    /**
     * Get current GRANDPA authority set id.
     *
     * @callname: GrandpaApi_current_set_id
     **/
    currentSetId: GenericRuntimeCall<() => Promise<SetId>>;

    /**
     * Get the current GRANDPA authorities and weights. This should not change except
     * for when changes are scheduled and the corresponding delay has passed.
     *
     * When called at block B, it will return the set of authorities that should be
     * used to finalize descendants of this block (B+1, B+2, ...). The block B itself
     * is finalized by the authorities from block B-1.
     *
     * @callname: GrandpaApi_generate_key_ownership_proof
     **/
    generateKeyOwnershipProof: GenericRuntimeCall<
      (setId: SetId, authorityId: AccountId32Like) => Promise<Option<OpaqueKeyOwnershipProof>>
    >;

    /**
     * Generates a proof of key ownership for the given authority in the
     * given set. An example usage of this module is coupled with the
     * session historical module to prove that a given authority key is
     * tied to a given staking identity during a specific session. Proofs
     * of key ownership are necessary for submitting equivocation reports.
     * NOTE: even though the API takes a `set_id` as parameter the current
     * implementations ignore this parameter and instead rely on this
     * method being called at the correct block height, i.e. any point at
     * which the given set id is live on-chain. Future implementations will
     * instead use indexed data through an offchain worker, not requiring
     * older states to be available.
     *
     * @callname: GrandpaApi_grandpa_authorities
     **/
    grandpaAuthorities: GenericRuntimeCall<() => Promise<AuthorityList>>;

    /**
     * Submits an unsigned extrinsic to report an equivocation. The caller
     * must provide the equivocation proof and a key ownership proof
     * (should be obtained using `generate_key_ownership_proof`). The
     * extrinsic will be unsigned and should only be accepted for local
     * authorship (not to be broadcast to the network). This method returns
     * `None` when creation of the extrinsic fails, e.g. if equivocation
     * reporting is disabled for the given runtime (i.e. this method is
     * hardcoded to return `None`). Only useful in an offchain context.
     *
     * @callname: GrandpaApi_submit_report_equivocation_unsigned_extrinsic
     **/
    submitReportEquivocationUnsignedExtrinsic: GenericRuntimeCall<
      (equivocationProof: GrandpaEquivocationProof, keyOwnerProof: OpaqueKeyOwnershipProof) => Promise<Option<Null>>
    >;

    /**
     * Generic runtime call
     **/
    [method: string]: GenericRuntimeCall;
  };
  /**
   * @runtimeapi: BabeApi - 0xcbca25e39f142387
   * @version: 2
   **/
  babeApi: {
    /**
     * Return the configuration for BABE.
     *
     * @callname: BabeApi_configuration
     **/
    configuration: GenericRuntimeCall<() => Promise<BabeConfiguration>>;

    /**
     * Returns information regarding the current epoch.
     *
     * @callname: BabeApi_current_epoch
     **/
    currentEpoch: GenericRuntimeCall<() => Promise<Epoch>>;

    /**
     * Returns the slot that started the current epoch.
     *
     * @callname: BabeApi_current_epoch_start
     **/
    currentEpochStart: GenericRuntimeCall<() => Promise<Slot>>;

    /**
     * Returns information regarding the next epoch (which was already previously announced).
     *
     * @callname: BabeApi_next_epoch
     **/
    nextEpoch: GenericRuntimeCall<() => Promise<Epoch>>;

    /**
     * Generates a proof of key ownership for the given authority in the
     * current epoch. An example usage of this module is coupled with the
     * session historical module to prove that a given authority key is
     * tied to a given staking identity during a specific session. Proofs
     * of key ownership are necessary for submitting equivocation reports.
     * NOTE: even though the API takes a `slot` as parameter the current
     * implementations ignores this parameter and instead relies on this
     * method being called at the correct block height, i.e. any point at
     * which the epoch for the given slot is live on-chain. Future
     * implementations will instead use indexed data through an offchain
     * worker, not requiring older states to be available.
     *
     * @callname: BabeApi_generate_key_ownership_proof
     **/
    generateKeyOwnershipProof: GenericRuntimeCall<
      (slot: Slot, authorityId: AccountId32Like) => Promise<Option<OpaqueKeyOwnershipProof>>
    >;

    /**
     * Submits an unsigned extrinsic to report an equivocation. The caller
     * must provide the equivocation proof and a key ownership proof
     * (should be obtained using `generate_key_ownership_proof`). The
     * extrinsic will be unsigned and should only be accepted for local
     * authorship (not to be broadcast to the network). This method returns
     * `None` when creation of the extrinsic fails, e.g. if equivocation
     * reporting is disabled for the given runtime (i.e. this method is
     * hardcoded to return `None`). Only useful in an offchain context.
     *
     * @callname: BabeApi_submit_report_equivocation_unsigned_extrinsic
     **/
    submitReportEquivocationUnsignedExtrinsic: GenericRuntimeCall<
      (equivocationProof: BabeConfiguration, keyOwnerProof: OpaqueKeyOwnershipProof) => Promise<Option<Null>>
    >;

    /**
     * Generic runtime call
     **/
    [method: string]: GenericRuntimeCall;
  };
  /**
   * @runtimeapi: AuthorityDiscoveryApi - 0x687ad44ad37f03c2
   * @version: 1
   **/
  authorityDiscoveryApi: {
    /**
     * Retrieve authority identifiers of the current and next authority set.
     *
     * @callname: AuthorityDiscoveryApi_authorities
     **/
    authorities: GenericRuntimeCall<() => Promise<Array<AccountId32>>>;

    /**
     * Generic runtime call
     **/
    [method: string]: GenericRuntimeCall;
  };
  /**
   * @runtimeapi: SessionKeys - 0xab3c0572291feb8b
   * @version: 1
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
    generateSessionKeys: GenericRuntimeCall<(seed: Option<Array<number>>) => Promise<Array<number>>>;

    /**
     * Decode the given public session key
     *
     * Returns the list of public raw public keys + key typ
     *
     * @callname: SessionKeys_decode_session_keys
     **/
    decodeSessionKeys: GenericRuntimeCall<(encoded: Bytes) => Promise<Option<Array<[Array<number>, KeyTypeId]>>>>;

    /**
     * Generic runtime call
     **/
    [method: string]: GenericRuntimeCall;
  };
  /**
   * @runtimeapi: AccountNonceApi - 0xbc9d89904f5b923f
   * @version: 1
   **/
  accountNonceApi: {
    /**
     * The API to query account nonce (aka transaction index)
     *
     * @callname: AccountNonceApi_account_nonce
     **/
    accountNonce: GenericRuntimeCall<(accountId: AccountId32Like) => Promise<Nonce>>;

    /**
     * Generic runtime call
     **/
    [method: string]: GenericRuntimeCall;
  };
  /**
   * @runtimeapi: TransactionPaymentApi - 0x37c8bb1350a9a2a8
   * @version: 4
   **/
  transactionPaymentApi: {
    /**
     * The transaction info
     *
     * @callname: TransactionPaymentApi_query_info
     **/
    queryInfo: GenericRuntimeCall<(uxt: Bytes, len: number) => Promise<RuntimeDispatchInfo>>;

    /**
     * The transaction fee details
     *
     * @callname: TransactionPaymentApi_query_fee_details
     **/
    queryFeeDetails: GenericRuntimeCall<(uxt: Bytes, len: number) => Promise<FeeDetails>>;

    /**
     * Query the output of the current LengthToFee given some input
     *
     * @callname: TransactionPaymentApi_query_length_to_fee
     **/
    queryLengthToFee: GenericRuntimeCall<(length: number) => Promise<Balance>>;

    /**
     * Query the output of the current WeightToFee given some input
     *
     * @callname: TransactionPaymentApi_query_weight_to_fee
     **/
    queryWeightToFee: GenericRuntimeCall<(weight: Weight) => Promise<Balance>>;

    /**
     * Generic runtime call
     **/
    [method: string]: GenericRuntimeCall;
  };
  /**
   * @runtimeapi: NominationPoolsApi - 0x17a6bc0d0062aeb3
   * @version: 1
   **/
  nominationPoolsApi: {
    /**
     * Returns the pending rewards for the member that the AccountId was given for.
     *
     * @callname: NominationPoolsApi_pending_rewards
     **/
    pendingRewards: GenericRuntimeCall<(who: AccountId32Like) => Promise<Balance>>;

    /**
     * Returns the equivalent balance of `points` for a given pool.
     *
     * @callname: NominationPoolsApi_points_to_balance
     **/
    pointsToBalance: GenericRuntimeCall<(poolId: NpPoolId, points: Balance) => Promise<Balance>>;

    /**
     * Returns the equivalent points of `new_funds` for a given pool.
     *
     * @callname: NominationPoolsApi_balance_to_points
     **/
    balanceToPoints: GenericRuntimeCall<(poolId: NpPoolId, newFunds: Balance) => Promise<Balance>>;

    /**
     * Generic runtime call
     **/
    [method: string]: GenericRuntimeCall;
  };
}
