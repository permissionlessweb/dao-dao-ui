//@ts-nocheck
import { Misbehaviour, MisbehaviourAmino, MisbehaviourSDKType, Header, HeaderAmino, HeaderSDKType } from "../../../../ibc/lightclients/tendermint/v1/tendermint";
import { DuplicateVoteEvidence, DuplicateVoteEvidenceAmino, DuplicateVoteEvidenceSDKType } from "../../../../tendermint/types/evidence";
import { ConsumerMetadata, ConsumerMetadataAmino, ConsumerMetadataSDKType, ConsumerInitializationParameters, ConsumerInitializationParametersAmino, ConsumerInitializationParametersSDKType, PowerShapingParameters, PowerShapingParametersAmino, PowerShapingParametersSDKType, AllowlistedRewardDenoms, AllowlistedRewardDenomsAmino, AllowlistedRewardDenomsSDKType } from "./provider";
import { Params, ParamsAmino, ParamsSDKType, Height, HeightAmino, HeightSDKType } from "../../../../ibc/core/client/v1/client";
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { Duration, DurationAmino, DurationSDKType } from "../../../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { toTimestamp, fromTimestamp, bytesFromBase64, base64FromBytes } from "../../../../helpers";
import { Decimal } from "@cosmjs/math";
export interface MsgAssignConsumerKey {
  /** [DEPRECATED] use `consumer_id` instead */
  /** @deprecated */
  chainId: string;
  /** The validator address on the provider */
  providerAddr: string;
  /**
   * The consensus public key to use on the consumer.
   * in json string format corresponding to proto-any, ex:
   * `{"@type":"/cosmos.crypto.ed25519.PubKey","key":"Ui5Gf1+mtWUdH8u3xlmzdKID+F3PK0sfXZ73GZ6q6is="}`
   */
  consumerKey: string;
  signer: string;
  /** the consumer id of the consumer chain to assign a consensus public key to */
  consumerId: string;
}
export interface MsgAssignConsumerKeyProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKey";
  value: Uint8Array;
}
export interface MsgAssignConsumerKeyAmino {
  /** [DEPRECATED] use `consumer_id` instead */
  /** @deprecated */
  chain_id?: string;
  /** The validator address on the provider */
  provider_addr?: string;
  /**
   * The consensus public key to use on the consumer.
   * in json string format corresponding to proto-any, ex:
   * `{"@type":"/cosmos.crypto.ed25519.PubKey","key":"Ui5Gf1+mtWUdH8u3xlmzdKID+F3PK0sfXZ73GZ6q6is="}`
   */
  consumer_key?: string;
  signer?: string;
  /** the consumer id of the consumer chain to assign a consensus public key to */
  consumer_id?: string;
}
export interface MsgAssignConsumerKeyAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKey";
  value: MsgAssignConsumerKeyAmino;
}
export interface MsgAssignConsumerKeySDKType {
  /** @deprecated */
  chain_id: string;
  provider_addr: string;
  consumer_key: string;
  signer: string;
  consumer_id: string;
}
export interface MsgAssignConsumerKeyResponse {}
export interface MsgAssignConsumerKeyResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKeyResponse";
  value: Uint8Array;
}
export interface MsgAssignConsumerKeyResponseAmino {}
export interface MsgAssignConsumerKeyResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKeyResponse";
  value: MsgAssignConsumerKeyResponseAmino;
}
export interface MsgAssignConsumerKeyResponseSDKType {}
/**
 * MsgSubmitConsumerMisbehaviour defines a message that reports a light client attack,
 * also known as a misbehaviour, observed on a consumer chain
 */
export interface MsgSubmitConsumerMisbehaviour {
  submitter: string;
  /**
   * The Misbehaviour of the consumer chain wrapping
   * two conflicting IBC headers
   */
  misbehaviour?: Misbehaviour | undefined;
  /** the consumer id of the consumer chain where the misbehaviour occurred */
  consumerId: string;
}
export interface MsgSubmitConsumerMisbehaviourProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerMisbehaviour";
  value: Uint8Array;
}
/**
 * MsgSubmitConsumerMisbehaviour defines a message that reports a light client attack,
 * also known as a misbehaviour, observed on a consumer chain
 */
export interface MsgSubmitConsumerMisbehaviourAmino {
  submitter?: string;
  /**
   * The Misbehaviour of the consumer chain wrapping
   * two conflicting IBC headers
   */
  misbehaviour?: MisbehaviourAmino | undefined;
  /** the consumer id of the consumer chain where the misbehaviour occurred */
  consumer_id?: string;
}
export interface MsgSubmitConsumerMisbehaviourAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerMisbehaviour";
  value: MsgSubmitConsumerMisbehaviourAmino;
}
/**
 * MsgSubmitConsumerMisbehaviour defines a message that reports a light client attack,
 * also known as a misbehaviour, observed on a consumer chain
 */
export interface MsgSubmitConsumerMisbehaviourSDKType {
  submitter: string;
  misbehaviour?: MisbehaviourSDKType | undefined;
  consumer_id: string;
}
export interface MsgSubmitConsumerMisbehaviourResponse {}
export interface MsgSubmitConsumerMisbehaviourResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerMisbehaviourResponse";
  value: Uint8Array;
}
export interface MsgSubmitConsumerMisbehaviourResponseAmino {}
export interface MsgSubmitConsumerMisbehaviourResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerMisbehaviourResponse";
  value: MsgSubmitConsumerMisbehaviourResponseAmino;
}
export interface MsgSubmitConsumerMisbehaviourResponseSDKType {}
/**
 * MsgSubmitConsumerDoubleVoting defines a message that reports
 * a double signing infraction observed on a consumer chain
 */
export interface MsgSubmitConsumerDoubleVoting {
  submitter: string;
  /**
   * The equivocation of the consumer chain wrapping
   * an evidence of a validator that signed two conflicting votes
   */
  duplicateVoteEvidence?: DuplicateVoteEvidence | undefined;
  /** The light client header of the infraction block */
  infractionBlockHeader?: Header | undefined;
  /** the consumer id of the consumer chain where the double-voting took place */
  consumerId: string;
}
export interface MsgSubmitConsumerDoubleVotingProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerDoubleVoting";
  value: Uint8Array;
}
/**
 * MsgSubmitConsumerDoubleVoting defines a message that reports
 * a double signing infraction observed on a consumer chain
 */
export interface MsgSubmitConsumerDoubleVotingAmino {
  submitter?: string;
  /**
   * The equivocation of the consumer chain wrapping
   * an evidence of a validator that signed two conflicting votes
   */
  duplicate_vote_evidence?: DuplicateVoteEvidenceAmino | undefined;
  /** The light client header of the infraction block */
  infraction_block_header?: HeaderAmino | undefined;
  /** the consumer id of the consumer chain where the double-voting took place */
  consumer_id?: string;
}
export interface MsgSubmitConsumerDoubleVotingAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerDoubleVoting";
  value: MsgSubmitConsumerDoubleVotingAmino;
}
/**
 * MsgSubmitConsumerDoubleVoting defines a message that reports
 * a double signing infraction observed on a consumer chain
 */
export interface MsgSubmitConsumerDoubleVotingSDKType {
  submitter: string;
  duplicate_vote_evidence?: DuplicateVoteEvidenceSDKType | undefined;
  infraction_block_header?: HeaderSDKType | undefined;
  consumer_id: string;
}
export interface MsgSubmitConsumerDoubleVotingResponse {}
export interface MsgSubmitConsumerDoubleVotingResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerDoubleVotingResponse";
  value: Uint8Array;
}
export interface MsgSubmitConsumerDoubleVotingResponseAmino {}
export interface MsgSubmitConsumerDoubleVotingResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerDoubleVotingResponse";
  value: MsgSubmitConsumerDoubleVotingResponseAmino;
}
export interface MsgSubmitConsumerDoubleVotingResponseSDKType {}
/** MsgUpdateParams is the Msg/UpdateParams request type */
export interface MsgUpdateParams {
  /** authority is the address of the governance account. */
  authority: string;
  /** params defines the x/provider parameters to update. */
  params: Params | undefined;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgUpdateParams";
  value: Uint8Array;
}
/** MsgUpdateParams is the Msg/UpdateParams request type */
export interface MsgUpdateParamsAmino {
  /** authority is the address of the governance account. */
  authority?: string;
  /** params defines the x/provider parameters to update. */
  params?: ParamsAmino | undefined;
}
export interface MsgUpdateParamsAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/** MsgUpdateParams is the Msg/UpdateParams request type */
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType | undefined;
}
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
export interface MsgUpdateParamsResponseSDKType {}
/** [DEPRECATED] Use `MsgCreateConsumer` instead */
/** @deprecated */
export interface MsgConsumerAddition {
  /**
   * the proposed chain-id of the new consumer chain, must be different from all
   * other consumer chain ids of the executing provider chain.
   */
  chainId: string;
  /**
   * the proposed initial height of new consumer chain.
   * For a completely new chain, this will be {0,1}. However, it may be
   * different if this is a chain that is converting to a consumer chain.
   */
  initialHeight: Height | undefined;
  /**
   * The hash of the consumer chain genesis state without the consumer CCV
   * module genesis params. It is used for off-chain confirmation of
   * genesis.json validity by validators and other parties.
   */
  genesisHash: Uint8Array;
  /**
   * The hash of the consumer chain binary that should be run by validators on
   * chain initialization. It is used for off-chain confirmation of binary
   * validity by validators and other parties.
   */
  binaryHash: Uint8Array;
  /**
   * spawn time is the time on the provider chain at which the consumer chain
   * genesis is finalized and all validators will be responsible for starting
   * their consumer chain validator node.
   */
  spawnTime: Date | undefined;
  /**
   * Unbonding period for the consumer,
   * which should be smaller than that of the provider in general.
   */
  unbondingPeriod: Duration | undefined;
  /** Sent CCV related IBC packets will timeout after this duration */
  ccvTimeoutPeriod: Duration | undefined;
  /** Sent transfer related IBC packets will timeout after this duration */
  transferTimeoutPeriod: Duration | undefined;
  /**
   * The fraction of tokens allocated to the consumer redistribution address
   * during distribution events. The fraction is a string representing a
   * decimal number. For example "0.75" would represent 75%.
   */
  consumerRedistributionFraction: string;
  /**
   * BlocksPerDistributionTransmission is the number of blocks between
   * ibc-token-transfers from the consumer chain to the provider chain. On
   * sending transmission event, `consumer_redistribution_fraction` of the
   * accumulated tokens are sent to the consumer redistribution address.
   */
  blocksPerDistributionTransmission: bigint;
  /**
   * The number of historical info entries to persist in store.
   * This param is a part of the cosmos sdk staking module. In the case of
   * a ccv enabled consumer chain, the ccv module acts as the staking module.
   */
  historicalEntries: bigint;
  /**
   * The ID of a token transfer channel used for the Reward Distribution
   * sub-protocol. If DistributionTransmissionChannel == "", a new transfer
   * channel is created on top of the same connection as the CCV channel.
   * Note that transfer_channel_id is the ID of the channel end on the consumer
   * chain. it is most relevant for chains performing a sovereign to consumer
   * changeover in order to maintain the existing ibc transfer channel
   */
  distributionTransmissionChannel: string;
  /**
   * Corresponds to the percentage of validators that have to validate the chain under the Top N case.
   * For example, 53 corresponds to a Top 53% chain, meaning that the top 53% provider validators by voting power
   * have to validate the proposed consumer chain. top_N can either be 0 or any value in [50, 100].
   * A chain can join with top_N == 0 as an Opt In chain, or with top_N ∈ [50, 100] as a Top N chain.
   */
  topN: number;
  /**
   * Corresponds to the maximum power (percentage-wise) a validator can have on the consumer chain. For instance, if
   * `validators_power_cap` is set to 32, it means that no validator can have more than 32% of the voting power on the
   * consumer chain. Note that this might not be feasible. For example, think of a consumer chain with only
   * 5 validators and with `validators_power_cap` set to 10%. In such a scenario, at least one validator would need
   * to have more than 20% of the total voting power. Therefore, `validators_power_cap` operates on a best-effort basis.
   */
  validatorsPowerCap: number;
  /**
   * Corresponds to the maximum number of validators that can validate a consumer chain.
   * Only applicable to Opt In chains. Setting `validator_set_cap` on a Top N chain is a no-op.
   */
  validatorSetCap: number;
  /**
   * Corresponds to a list of provider consensus addresses of validators that are the ONLY ones that can validate
   * the consumer chain.
   */
  allowlist: string[];
  /** Corresponds to a list of provider consensus addresses of validators that CANNOT validate the consumer chain. */
  denylist: string[];
  /** signer address */
  authority: string;
  /** Corresponds to the minimal amount of (provider chain) stake required to validate on the consumer chain. */
  minStake: bigint;
  /** Corresponds to whether inactive validators are allowed to validate the consumer chain. */
  allowInactiveVals: boolean;
}
export interface MsgConsumerAdditionProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgConsumerAddition";
  value: Uint8Array;
}
/** [DEPRECATED] Use `MsgCreateConsumer` instead */
/** @deprecated */
export interface MsgConsumerAdditionAmino {
  /**
   * the proposed chain-id of the new consumer chain, must be different from all
   * other consumer chain ids of the executing provider chain.
   */
  chain_id?: string;
  /**
   * the proposed initial height of new consumer chain.
   * For a completely new chain, this will be {0,1}. However, it may be
   * different if this is a chain that is converting to a consumer chain.
   */
  initial_height?: HeightAmino | undefined;
  /**
   * The hash of the consumer chain genesis state without the consumer CCV
   * module genesis params. It is used for off-chain confirmation of
   * genesis.json validity by validators and other parties.
   */
  genesis_hash?: string;
  /**
   * The hash of the consumer chain binary that should be run by validators on
   * chain initialization. It is used for off-chain confirmation of binary
   * validity by validators and other parties.
   */
  binary_hash?: string;
  /**
   * spawn time is the time on the provider chain at which the consumer chain
   * genesis is finalized and all validators will be responsible for starting
   * their consumer chain validator node.
   */
  spawn_time?: string | undefined;
  /**
   * Unbonding period for the consumer,
   * which should be smaller than that of the provider in general.
   */
  unbonding_period?: DurationAmino | undefined;
  /** Sent CCV related IBC packets will timeout after this duration */
  ccv_timeout_period?: DurationAmino | undefined;
  /** Sent transfer related IBC packets will timeout after this duration */
  transfer_timeout_period?: DurationAmino | undefined;
  /**
   * The fraction of tokens allocated to the consumer redistribution address
   * during distribution events. The fraction is a string representing a
   * decimal number. For example "0.75" would represent 75%.
   */
  consumer_redistribution_fraction?: string;
  /**
   * BlocksPerDistributionTransmission is the number of blocks between
   * ibc-token-transfers from the consumer chain to the provider chain. On
   * sending transmission event, `consumer_redistribution_fraction` of the
   * accumulated tokens are sent to the consumer redistribution address.
   */
  blocks_per_distribution_transmission?: string;
  /**
   * The number of historical info entries to persist in store.
   * This param is a part of the cosmos sdk staking module. In the case of
   * a ccv enabled consumer chain, the ccv module acts as the staking module.
   */
  historical_entries?: string;
  /**
   * The ID of a token transfer channel used for the Reward Distribution
   * sub-protocol. If DistributionTransmissionChannel == "", a new transfer
   * channel is created on top of the same connection as the CCV channel.
   * Note that transfer_channel_id is the ID of the channel end on the consumer
   * chain. it is most relevant for chains performing a sovereign to consumer
   * changeover in order to maintain the existing ibc transfer channel
   */
  distribution_transmission_channel?: string;
  /**
   * Corresponds to the percentage of validators that have to validate the chain under the Top N case.
   * For example, 53 corresponds to a Top 53% chain, meaning that the top 53% provider validators by voting power
   * have to validate the proposed consumer chain. top_N can either be 0 or any value in [50, 100].
   * A chain can join with top_N == 0 as an Opt In chain, or with top_N ∈ [50, 100] as a Top N chain.
   */
  top_N?: number;
  /**
   * Corresponds to the maximum power (percentage-wise) a validator can have on the consumer chain. For instance, if
   * `validators_power_cap` is set to 32, it means that no validator can have more than 32% of the voting power on the
   * consumer chain. Note that this might not be feasible. For example, think of a consumer chain with only
   * 5 validators and with `validators_power_cap` set to 10%. In such a scenario, at least one validator would need
   * to have more than 20% of the total voting power. Therefore, `validators_power_cap` operates on a best-effort basis.
   */
  validators_power_cap?: number;
  /**
   * Corresponds to the maximum number of validators that can validate a consumer chain.
   * Only applicable to Opt In chains. Setting `validator_set_cap` on a Top N chain is a no-op.
   */
  validator_set_cap?: number;
  /**
   * Corresponds to a list of provider consensus addresses of validators that are the ONLY ones that can validate
   * the consumer chain.
   */
  allowlist?: string[];
  /** Corresponds to a list of provider consensus addresses of validators that CANNOT validate the consumer chain. */
  denylist?: string[];
  /** signer address */
  authority?: string;
  /** Corresponds to the minimal amount of (provider chain) stake required to validate on the consumer chain. */
  min_stake?: string;
  /** Corresponds to whether inactive validators are allowed to validate the consumer chain. */
  allow_inactive_vals?: boolean;
}
export interface MsgConsumerAdditionAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgConsumerAddition";
  value: MsgConsumerAdditionAmino;
}
/** [DEPRECATED] Use `MsgCreateConsumer` instead */
/** @deprecated */
export interface MsgConsumerAdditionSDKType {
  chain_id: string;
  initial_height: HeightSDKType | undefined;
  genesis_hash: Uint8Array;
  binary_hash: Uint8Array;
  spawn_time: Date | undefined;
  unbonding_period: DurationSDKType | undefined;
  ccv_timeout_period: DurationSDKType | undefined;
  transfer_timeout_period: DurationSDKType | undefined;
  consumer_redistribution_fraction: string;
  blocks_per_distribution_transmission: bigint;
  historical_entries: bigint;
  distribution_transmission_channel: string;
  top_N: number;
  validators_power_cap: number;
  validator_set_cap: number;
  allowlist: string[];
  denylist: string[];
  authority: string;
  min_stake: bigint;
  allow_inactive_vals: boolean;
}
/** [DEPRECATED] Use `MsgRemoveConsumer` instead */
/** @deprecated */
export interface MsgConsumerRemoval {
  /** the chain-id of the consumer chain to be stopped */
  chainId: string;
  /**
   * the time on the provider chain at which all validators are responsible to
   * stop their consumer chain validator node
   */
  stopTime: Date | undefined;
  /** signer address */
  authority: string;
}
export interface MsgConsumerRemovalProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgConsumerRemoval";
  value: Uint8Array;
}
/** [DEPRECATED] Use `MsgRemoveConsumer` instead */
/** @deprecated */
export interface MsgConsumerRemovalAmino {
  /** the chain-id of the consumer chain to be stopped */
  chain_id?: string;
  /**
   * the time on the provider chain at which all validators are responsible to
   * stop their consumer chain validator node
   */
  stop_time?: string | undefined;
  /** signer address */
  authority?: string;
}
export interface MsgConsumerRemovalAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgConsumerRemoval";
  value: MsgConsumerRemovalAmino;
}
/** [DEPRECATED] Use `MsgRemoveConsumer` instead */
/** @deprecated */
export interface MsgConsumerRemovalSDKType {
  chain_id: string;
  stop_time: Date | undefined;
  authority: string;
}
/**
 * MsgRemoveConsumer defines the message used to remove (and stop) a consumer chain.
 * If it passes, all the consumer chain's state is eventually removed from the provider chain.
 */
export interface MsgRemoveConsumer {
  /** the consumer id of the consumer chain to be stopped */
  consumerId: string;
  /** the address of the owner of the consumer chain to be stopped */
  owner: string;
}
export interface MsgRemoveConsumerProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgRemoveConsumer";
  value: Uint8Array;
}
/**
 * MsgRemoveConsumer defines the message used to remove (and stop) a consumer chain.
 * If it passes, all the consumer chain's state is eventually removed from the provider chain.
 */
export interface MsgRemoveConsumerAmino {
  /** the consumer id of the consumer chain to be stopped */
  consumer_id?: string;
  /** the address of the owner of the consumer chain to be stopped */
  owner?: string;
}
export interface MsgRemoveConsumerAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgRemoveConsumer";
  value: MsgRemoveConsumerAmino;
}
/**
 * MsgRemoveConsumer defines the message used to remove (and stop) a consumer chain.
 * If it passes, all the consumer chain's state is eventually removed from the provider chain.
 */
export interface MsgRemoveConsumerSDKType {
  consumer_id: string;
  owner: string;
}
/** MsgRemoveConsumerResponse defines response type for MsgRemoveConsumer messages */
export interface MsgRemoveConsumerResponse {}
export interface MsgRemoveConsumerResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgRemoveConsumerResponse";
  value: Uint8Array;
}
/** MsgRemoveConsumerResponse defines response type for MsgRemoveConsumer messages */
export interface MsgRemoveConsumerResponseAmino {}
export interface MsgRemoveConsumerResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgRemoveConsumerResponse";
  value: MsgRemoveConsumerResponseAmino;
}
/** MsgRemoveConsumerResponse defines response type for MsgRemoveConsumer messages */
export interface MsgRemoveConsumerResponseSDKType {}
/**
 * ChangeRewardDenomsProposal is a governance proposal on the provider chain to
 * mutate the set of denoms accepted by the provider as rewards.
 * 
 * Note: this replaces ChangeRewardDenomsProposal which is deprecated and will be removed soon
 */
export interface MsgChangeRewardDenoms {
  /** the list of consumer reward denoms to add */
  denomsToAdd: string[];
  /** the list of consumer reward denoms to remove */
  denomsToRemove: string[];
  /** authority is the address of the governance account */
  authority: string;
}
export interface MsgChangeRewardDenomsProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgChangeRewardDenoms";
  value: Uint8Array;
}
/**
 * ChangeRewardDenomsProposal is a governance proposal on the provider chain to
 * mutate the set of denoms accepted by the provider as rewards.
 * 
 * Note: this replaces ChangeRewardDenomsProposal which is deprecated and will be removed soon
 */
export interface MsgChangeRewardDenomsAmino {
  /** the list of consumer reward denoms to add */
  denoms_to_add?: string[];
  /** the list of consumer reward denoms to remove */
  denoms_to_remove?: string[];
  /** authority is the address of the governance account */
  authority?: string;
}
export interface MsgChangeRewardDenomsAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgChangeRewardDenoms";
  value: MsgChangeRewardDenomsAmino;
}
/**
 * ChangeRewardDenomsProposal is a governance proposal on the provider chain to
 * mutate the set of denoms accepted by the provider as rewards.
 * 
 * Note: this replaces ChangeRewardDenomsProposal which is deprecated and will be removed soon
 */
export interface MsgChangeRewardDenomsSDKType {
  denoms_to_add: string[];
  denoms_to_remove: string[];
  authority: string;
}
/** MsgChangeRewardDenomsResponse defines response type for MsgChangeRewardDenoms messages */
export interface MsgChangeRewardDenomsResponse {}
export interface MsgChangeRewardDenomsResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgChangeRewardDenomsResponse";
  value: Uint8Array;
}
/** MsgChangeRewardDenomsResponse defines response type for MsgChangeRewardDenoms messages */
export interface MsgChangeRewardDenomsResponseAmino {}
export interface MsgChangeRewardDenomsResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgChangeRewardDenomsResponse";
  value: MsgChangeRewardDenomsResponseAmino;
}
/** MsgChangeRewardDenomsResponse defines response type for MsgChangeRewardDenoms messages */
export interface MsgChangeRewardDenomsResponseSDKType {}
export interface MsgOptIn {
  /** [DEPRECATED] use `consumer_id` instead */
  /** @deprecated */
  chainId: string;
  /** the validator address on the provider */
  providerAddr: string;
  /**
   * (optional) The consensus public key to use on the consumer in json string format corresponding to proto-any,
   * for example `{"@type":"/cosmos.crypto.ed25519.PubKey","key":"Ui5Gf1+mtWUdH8u3xlmzdKID+F3PK0sfXZ73GZ6q6is="}`.
   * This field is optional and can remain empty (i.e., `consumer_key = ""`). A validator can always change the
   * consumer public key at a later stage by issuing a `MsgAssignConsumerKey` message.
   */
  consumerKey: string;
  /** submitter address */
  signer: string;
  /** the consumer id of the consumer chain to opt in to */
  consumerId: string;
}
export interface MsgOptInProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgOptIn";
  value: Uint8Array;
}
export interface MsgOptInAmino {
  /** [DEPRECATED] use `consumer_id` instead */
  /** @deprecated */
  chain_id?: string;
  /** the validator address on the provider */
  provider_addr?: string;
  /**
   * (optional) The consensus public key to use on the consumer in json string format corresponding to proto-any,
   * for example `{"@type":"/cosmos.crypto.ed25519.PubKey","key":"Ui5Gf1+mtWUdH8u3xlmzdKID+F3PK0sfXZ73GZ6q6is="}`.
   * This field is optional and can remain empty (i.e., `consumer_key = ""`). A validator can always change the
   * consumer public key at a later stage by issuing a `MsgAssignConsumerKey` message.
   */
  consumer_key?: string;
  /** submitter address */
  signer?: string;
  /** the consumer id of the consumer chain to opt in to */
  consumer_id?: string;
}
export interface MsgOptInAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgOptIn";
  value: MsgOptInAmino;
}
export interface MsgOptInSDKType {
  /** @deprecated */
  chain_id: string;
  provider_addr: string;
  consumer_key: string;
  signer: string;
  consumer_id: string;
}
export interface MsgOptInResponse {}
export interface MsgOptInResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgOptInResponse";
  value: Uint8Array;
}
export interface MsgOptInResponseAmino {}
export interface MsgOptInResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgOptInResponse";
  value: MsgOptInResponseAmino;
}
export interface MsgOptInResponseSDKType {}
export interface MsgOptOut {
  /** [DEPRECATED] use `consumer_id` instead */
  /** @deprecated */
  chainId: string;
  /** the validator address on the provider */
  providerAddr: string;
  /** submitter address */
  signer: string;
  /** the consumer id of the consumer chain to opt out from */
  consumerId: string;
}
export interface MsgOptOutProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgOptOut";
  value: Uint8Array;
}
export interface MsgOptOutAmino {
  /** [DEPRECATED] use `consumer_id` instead */
  /** @deprecated */
  chain_id?: string;
  /** the validator address on the provider */
  provider_addr?: string;
  /** submitter address */
  signer?: string;
  /** the consumer id of the consumer chain to opt out from */
  consumer_id?: string;
}
export interface MsgOptOutAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgOptOut";
  value: MsgOptOutAmino;
}
export interface MsgOptOutSDKType {
  /** @deprecated */
  chain_id: string;
  provider_addr: string;
  signer: string;
  consumer_id: string;
}
export interface MsgOptOutResponse {}
export interface MsgOptOutResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgOptOutResponse";
  value: Uint8Array;
}
export interface MsgOptOutResponseAmino {}
export interface MsgOptOutResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgOptOutResponse";
  value: MsgOptOutResponseAmino;
}
export interface MsgOptOutResponseSDKType {}
/**
 * MsgSetConsumerCommissionRate allows validators to set
 * a per-consumer chain commission rate
 */
export interface MsgSetConsumerCommissionRate {
  /** The validator address on the provider */
  providerAddr: string;
  /** [DEPRECATED] use `consumer_id` instead */
  /** @deprecated */
  chainId: string;
  /**
   * The rate to charge delegators on the consumer chain, as a fraction
   * TODO: migrate rate from sdk.Dec to math.LegacyDec
   */
  rate: string;
  /** submitter address */
  signer: string;
  /** the consumer id of the consumer chain to set the commission rate */
  consumerId: string;
}
export interface MsgSetConsumerCommissionRateProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgSetConsumerCommissionRate";
  value: Uint8Array;
}
/**
 * MsgSetConsumerCommissionRate allows validators to set
 * a per-consumer chain commission rate
 */
export interface MsgSetConsumerCommissionRateAmino {
  /** The validator address on the provider */
  provider_addr?: string;
  /** [DEPRECATED] use `consumer_id` instead */
  /** @deprecated */
  chain_id?: string;
  /**
   * The rate to charge delegators on the consumer chain, as a fraction
   * TODO: migrate rate from sdk.Dec to math.LegacyDec
   */
  rate?: string;
  /** submitter address */
  signer?: string;
  /** the consumer id of the consumer chain to set the commission rate */
  consumer_id?: string;
}
export interface MsgSetConsumerCommissionRateAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgSetConsumerCommissionRate";
  value: MsgSetConsumerCommissionRateAmino;
}
/**
 * MsgSetConsumerCommissionRate allows validators to set
 * a per-consumer chain commission rate
 */
export interface MsgSetConsumerCommissionRateSDKType {
  provider_addr: string;
  /** @deprecated */
  chain_id: string;
  rate: string;
  signer: string;
  consumer_id: string;
}
export interface MsgSetConsumerCommissionRateResponse {}
export interface MsgSetConsumerCommissionRateResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgSetConsumerCommissionRateResponse";
  value: Uint8Array;
}
export interface MsgSetConsumerCommissionRateResponseAmino {}
export interface MsgSetConsumerCommissionRateResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgSetConsumerCommissionRateResponse";
  value: MsgSetConsumerCommissionRateResponseAmino;
}
export interface MsgSetConsumerCommissionRateResponseSDKType {}
/** [DEPRECATED] Use `MsgUpdateConsumer` instead */
/** @deprecated */
export interface MsgConsumerModification {
  /** the title of the proposal */
  title: string;
  /** the description of the proposal */
  description: string;
  /** the chain-id of the consumer chain to be modified */
  chainId: string;
  /**
   * Corresponds to the percentage of validators that have to validate the chain under the Top N case.
   * For example, 53 corresponds to a Top 53% chain, meaning that the top 53% provider validators by voting power
   * have to validate the proposed consumer chain. top_N can either be 0 or any value in [50, 100].
   * A chain can join with top_N == 0 as an Opt In chain, or with top_N ∈ [50, 100] as a Top N chain.
   */
  topN: number;
  /**
   * Corresponds to the maximum power (percentage-wise) a validator can have on the consumer chain. For instance, if
   * `validators_power_cap` is set to 32, it means that no validator can have more than 32% of the voting power on the
   * consumer chain. Note that this might not be feasible. For example, think of a consumer chain with only
   * 5 validators and with `validators_power_cap` set to 10%. In such a scenario, at least one validator would need
   * to have more than 20% of the total voting power. Therefore, `validators_power_cap` operates on a best-effort basis.
   */
  validatorsPowerCap: number;
  /**
   * Corresponds to the maximum number of validators that can validate a consumer chain.
   * Only applicable to Opt In chains. Setting `validator_set_cap` on a Top N chain is a no-op.
   */
  validatorSetCap: number;
  /**
   * Corresponds to a list of provider consensus addresses of validators that are the ONLY ones that can validate
   * the consumer chain.
   */
  allowlist: string[];
  /** Corresponds to a list of provider consensus addresses of validators that CANNOT validate the consumer chain. */
  denylist: string[];
  /** signer address */
  authority: string;
  /** Corresponds to the minimal amount of (provider chain) stake required to validate on the consumer chain. */
  minStake: bigint;
  /** Corresponds to whether inactive validators are allowed to validate the consumer chain. */
  allowInactiveVals: boolean;
}
export interface MsgConsumerModificationProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgConsumerModification";
  value: Uint8Array;
}
/** [DEPRECATED] Use `MsgUpdateConsumer` instead */
/** @deprecated */
export interface MsgConsumerModificationAmino {
  /** the title of the proposal */
  title?: string;
  /** the description of the proposal */
  description?: string;
  /** the chain-id of the consumer chain to be modified */
  chain_id?: string;
  /**
   * Corresponds to the percentage of validators that have to validate the chain under the Top N case.
   * For example, 53 corresponds to a Top 53% chain, meaning that the top 53% provider validators by voting power
   * have to validate the proposed consumer chain. top_N can either be 0 or any value in [50, 100].
   * A chain can join with top_N == 0 as an Opt In chain, or with top_N ∈ [50, 100] as a Top N chain.
   */
  top_N?: number;
  /**
   * Corresponds to the maximum power (percentage-wise) a validator can have on the consumer chain. For instance, if
   * `validators_power_cap` is set to 32, it means that no validator can have more than 32% of the voting power on the
   * consumer chain. Note that this might not be feasible. For example, think of a consumer chain with only
   * 5 validators and with `validators_power_cap` set to 10%. In such a scenario, at least one validator would need
   * to have more than 20% of the total voting power. Therefore, `validators_power_cap` operates on a best-effort basis.
   */
  validators_power_cap?: number;
  /**
   * Corresponds to the maximum number of validators that can validate a consumer chain.
   * Only applicable to Opt In chains. Setting `validator_set_cap` on a Top N chain is a no-op.
   */
  validator_set_cap?: number;
  /**
   * Corresponds to a list of provider consensus addresses of validators that are the ONLY ones that can validate
   * the consumer chain.
   */
  allowlist?: string[];
  /** Corresponds to a list of provider consensus addresses of validators that CANNOT validate the consumer chain. */
  denylist?: string[];
  /** signer address */
  authority?: string;
  /** Corresponds to the minimal amount of (provider chain) stake required to validate on the consumer chain. */
  min_stake?: string;
  /** Corresponds to whether inactive validators are allowed to validate the consumer chain. */
  allow_inactive_vals?: boolean;
}
export interface MsgConsumerModificationAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgConsumerModification";
  value: MsgConsumerModificationAmino;
}
/** [DEPRECATED] Use `MsgUpdateConsumer` instead */
/** @deprecated */
export interface MsgConsumerModificationSDKType {
  title: string;
  description: string;
  chain_id: string;
  top_N: number;
  validators_power_cap: number;
  validator_set_cap: number;
  allowlist: string[];
  denylist: string[];
  authority: string;
  min_stake: bigint;
  allow_inactive_vals: boolean;
}
export interface MsgConsumerModificationResponse {}
export interface MsgConsumerModificationResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgConsumerModificationResponse";
  value: Uint8Array;
}
export interface MsgConsumerModificationResponseAmino {}
export interface MsgConsumerModificationResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgConsumerModificationResponse";
  value: MsgConsumerModificationResponseAmino;
}
export interface MsgConsumerModificationResponseSDKType {}
/** MsgCreateConsumer defines the message that creates a consumer chain */
export interface MsgCreateConsumer {
  /**
   * Submitter address. If the message is successfully handled, the ownership of
   * the consumer chain will given to this address.
   */
  submitter: string;
  /** the chain id of the new consumer chain */
  chainId: string;
  metadata: ConsumerMetadata | undefined;
  initializationParameters?: ConsumerInitializationParameters | undefined;
  powerShapingParameters?: PowerShapingParameters | undefined;
  /** allowlisted reward denoms of the consumer */
  allowlistedRewardDenoms?: AllowlistedRewardDenoms | undefined;
}
export interface MsgCreateConsumerProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgCreateConsumer";
  value: Uint8Array;
}
/** MsgCreateConsumer defines the message that creates a consumer chain */
export interface MsgCreateConsumerAmino {
  /**
   * Submitter address. If the message is successfully handled, the ownership of
   * the consumer chain will given to this address.
   */
  submitter?: string;
  /** the chain id of the new consumer chain */
  chain_id?: string;
  metadata?: ConsumerMetadataAmino | undefined;
  initialization_parameters?: ConsumerInitializationParametersAmino | undefined;
  power_shaping_parameters?: PowerShapingParametersAmino | undefined;
  /** allowlisted reward denoms of the consumer */
  allowlisted_reward_denoms?: AllowlistedRewardDenomsAmino | undefined;
}
export interface MsgCreateConsumerAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgCreateConsumer";
  value: MsgCreateConsumerAmino;
}
/** MsgCreateConsumer defines the message that creates a consumer chain */
export interface MsgCreateConsumerSDKType {
  submitter: string;
  chain_id: string;
  metadata: ConsumerMetadataSDKType | undefined;
  initialization_parameters?: ConsumerInitializationParametersSDKType | undefined;
  power_shaping_parameters?: PowerShapingParametersSDKType | undefined;
  allowlisted_reward_denoms?: AllowlistedRewardDenomsSDKType | undefined;
}
/** MsgCreateConsumerResponse defines response type for MsgCreateConsumer */
export interface MsgCreateConsumerResponse {
  consumerId: string;
}
export interface MsgCreateConsumerResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgCreateConsumerResponse";
  value: Uint8Array;
}
/** MsgCreateConsumerResponse defines response type for MsgCreateConsumer */
export interface MsgCreateConsumerResponseAmino {
  consumer_id?: string;
}
export interface MsgCreateConsumerResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgCreateConsumerResponse";
  value: MsgCreateConsumerResponseAmino;
}
/** MsgCreateConsumerResponse defines response type for MsgCreateConsumer */
export interface MsgCreateConsumerResponseSDKType {
  consumer_id: string;
}
/** MsgUpdateConsumer defines the message used to modify a consumer chain. */
export interface MsgUpdateConsumer {
  /** the address of the owner of the consumer chain to be updated */
  owner: string;
  /** the consumer id of the consumer chain to be updated */
  consumerId: string;
  /** the new owner of the consumer when updated */
  newOwnerAddress: string;
  /** the metadata of the consumer when updated */
  metadata?: ConsumerMetadata | undefined;
  /** initialization parameters can only be updated before a chain has launched */
  initializationParameters?: ConsumerInitializationParameters | undefined;
  /** the power-shaping parameters of the consumer when updated */
  powerShapingParameters?: PowerShapingParameters | undefined;
  /** allowlisted reward denoms of the consumer (if provided they overwrite previously set reward denoms) */
  allowlistedRewardDenoms?: AllowlistedRewardDenoms | undefined;
}
export interface MsgUpdateConsumerProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgUpdateConsumer";
  value: Uint8Array;
}
/** MsgUpdateConsumer defines the message used to modify a consumer chain. */
export interface MsgUpdateConsumerAmino {
  /** the address of the owner of the consumer chain to be updated */
  owner?: string;
  /** the consumer id of the consumer chain to be updated */
  consumer_id?: string;
  /** the new owner of the consumer when updated */
  new_owner_address?: string;
  /** the metadata of the consumer when updated */
  metadata?: ConsumerMetadataAmino | undefined;
  /** initialization parameters can only be updated before a chain has launched */
  initialization_parameters?: ConsumerInitializationParametersAmino | undefined;
  /** the power-shaping parameters of the consumer when updated */
  power_shaping_parameters?: PowerShapingParametersAmino | undefined;
  /** allowlisted reward denoms of the consumer (if provided they overwrite previously set reward denoms) */
  allowlisted_reward_denoms?: AllowlistedRewardDenomsAmino | undefined;
}
export interface MsgUpdateConsumerAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgUpdateConsumer";
  value: MsgUpdateConsumerAmino;
}
/** MsgUpdateConsumer defines the message used to modify a consumer chain. */
export interface MsgUpdateConsumerSDKType {
  owner: string;
  consumer_id: string;
  new_owner_address: string;
  metadata?: ConsumerMetadataSDKType | undefined;
  initialization_parameters?: ConsumerInitializationParametersSDKType | undefined;
  power_shaping_parameters?: PowerShapingParametersSDKType | undefined;
  allowlisted_reward_denoms?: AllowlistedRewardDenomsSDKType | undefined;
}
/** MsgUpdateConsumerResponse defines response type for MsgUpdateConsumer messages */
export interface MsgUpdateConsumerResponse {}
export interface MsgUpdateConsumerResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgUpdateConsumerResponse";
  value: Uint8Array;
}
/** MsgUpdateConsumerResponse defines response type for MsgUpdateConsumer messages */
export interface MsgUpdateConsumerResponseAmino {}
export interface MsgUpdateConsumerResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.MsgUpdateConsumerResponse";
  value: MsgUpdateConsumerResponseAmino;
}
/** MsgUpdateConsumerResponse defines response type for MsgUpdateConsumer messages */
export interface MsgUpdateConsumerResponseSDKType {}
function createBaseMsgAssignConsumerKey(): MsgAssignConsumerKey {
  return {
    chainId: "",
    providerAddr: "",
    consumerKey: "",
    signer: "",
    consumerId: ""
  };
}
export const MsgAssignConsumerKey = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKey",
  encode(message: MsgAssignConsumerKey, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.providerAddr !== "") {
      writer.uint32(18).string(message.providerAddr);
    }
    if (message.consumerKey !== "") {
      writer.uint32(26).string(message.consumerKey);
    }
    if (message.signer !== "") {
      writer.uint32(34).string(message.signer);
    }
    if (message.consumerId !== "") {
      writer.uint32(42).string(message.consumerId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAssignConsumerKey {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAssignConsumerKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.providerAddr = reader.string();
          break;
        case 3:
          message.consumerKey = reader.string();
          break;
        case 4:
          message.signer = reader.string();
          break;
        case 5:
          message.consumerId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAssignConsumerKey>): MsgAssignConsumerKey {
    const message = createBaseMsgAssignConsumerKey();
    message.chainId = object.chainId ?? "";
    message.providerAddr = object.providerAddr ?? "";
    message.consumerKey = object.consumerKey ?? "";
    message.signer = object.signer ?? "";
    message.consumerId = object.consumerId ?? "";
    return message;
  },
  fromAmino(object: MsgAssignConsumerKeyAmino): MsgAssignConsumerKey {
    const message = createBaseMsgAssignConsumerKey();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.provider_addr !== undefined && object.provider_addr !== null) {
      message.providerAddr = object.provider_addr;
    }
    if (object.consumer_key !== undefined && object.consumer_key !== null) {
      message.consumerKey = object.consumer_key;
    }
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer;
    }
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    return message;
  },
  toAmino(message: MsgAssignConsumerKey, useInterfaces: boolean = false): MsgAssignConsumerKeyAmino {
    const obj: any = {};
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.provider_addr = message.providerAddr === "" ? undefined : message.providerAddr;
    obj.consumer_key = message.consumerKey === "" ? undefined : message.consumerKey;
    obj.signer = message.signer === "" ? undefined : message.signer;
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    return obj;
  },
  fromAminoMsg(object: MsgAssignConsumerKeyAminoMsg): MsgAssignConsumerKey {
    return MsgAssignConsumerKey.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAssignConsumerKeyProtoMsg, useInterfaces: boolean = false): MsgAssignConsumerKey {
    return MsgAssignConsumerKey.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAssignConsumerKey): Uint8Array {
    return MsgAssignConsumerKey.encode(message).finish();
  },
  toProtoMsg(message: MsgAssignConsumerKey): MsgAssignConsumerKeyProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKey",
      value: MsgAssignConsumerKey.encode(message).finish()
    };
  }
};
function createBaseMsgAssignConsumerKeyResponse(): MsgAssignConsumerKeyResponse {
  return {};
}
export const MsgAssignConsumerKeyResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKeyResponse",
  encode(_: MsgAssignConsumerKeyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAssignConsumerKeyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAssignConsumerKeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgAssignConsumerKeyResponse>): MsgAssignConsumerKeyResponse {
    const message = createBaseMsgAssignConsumerKeyResponse();
    return message;
  },
  fromAmino(_: MsgAssignConsumerKeyResponseAmino): MsgAssignConsumerKeyResponse {
    const message = createBaseMsgAssignConsumerKeyResponse();
    return message;
  },
  toAmino(_: MsgAssignConsumerKeyResponse, useInterfaces: boolean = false): MsgAssignConsumerKeyResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgAssignConsumerKeyResponseAminoMsg): MsgAssignConsumerKeyResponse {
    return MsgAssignConsumerKeyResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAssignConsumerKeyResponseProtoMsg, useInterfaces: boolean = false): MsgAssignConsumerKeyResponse {
    return MsgAssignConsumerKeyResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAssignConsumerKeyResponse): Uint8Array {
    return MsgAssignConsumerKeyResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAssignConsumerKeyResponse): MsgAssignConsumerKeyResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKeyResponse",
      value: MsgAssignConsumerKeyResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitConsumerMisbehaviour(): MsgSubmitConsumerMisbehaviour {
  return {
    submitter: "",
    misbehaviour: undefined,
    consumerId: ""
  };
}
export const MsgSubmitConsumerMisbehaviour = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerMisbehaviour",
  encode(message: MsgSubmitConsumerMisbehaviour, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.submitter !== "") {
      writer.uint32(10).string(message.submitter);
    }
    if (message.misbehaviour !== undefined) {
      Misbehaviour.encode(message.misbehaviour, writer.uint32(18).fork()).ldelim();
    }
    if (message.consumerId !== "") {
      writer.uint32(26).string(message.consumerId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSubmitConsumerMisbehaviour {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitConsumerMisbehaviour();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.submitter = reader.string();
          break;
        case 2:
          message.misbehaviour = Misbehaviour.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.consumerId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitConsumerMisbehaviour>): MsgSubmitConsumerMisbehaviour {
    const message = createBaseMsgSubmitConsumerMisbehaviour();
    message.submitter = object.submitter ?? "";
    message.misbehaviour = object.misbehaviour !== undefined && object.misbehaviour !== null ? Misbehaviour.fromPartial(object.misbehaviour) : undefined;
    message.consumerId = object.consumerId ?? "";
    return message;
  },
  fromAmino(object: MsgSubmitConsumerMisbehaviourAmino): MsgSubmitConsumerMisbehaviour {
    const message = createBaseMsgSubmitConsumerMisbehaviour();
    if (object.submitter !== undefined && object.submitter !== null) {
      message.submitter = object.submitter;
    }
    if (object.misbehaviour !== undefined && object.misbehaviour !== null) {
      message.misbehaviour = Misbehaviour.fromAmino(object.misbehaviour);
    }
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    return message;
  },
  toAmino(message: MsgSubmitConsumerMisbehaviour, useInterfaces: boolean = false): MsgSubmitConsumerMisbehaviourAmino {
    const obj: any = {};
    obj.submitter = message.submitter === "" ? undefined : message.submitter;
    obj.misbehaviour = message.misbehaviour ? Misbehaviour.toAmino(message.misbehaviour, useInterfaces) : undefined;
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    return obj;
  },
  fromAminoMsg(object: MsgSubmitConsumerMisbehaviourAminoMsg): MsgSubmitConsumerMisbehaviour {
    return MsgSubmitConsumerMisbehaviour.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitConsumerMisbehaviourProtoMsg, useInterfaces: boolean = false): MsgSubmitConsumerMisbehaviour {
    return MsgSubmitConsumerMisbehaviour.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSubmitConsumerMisbehaviour): Uint8Array {
    return MsgSubmitConsumerMisbehaviour.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitConsumerMisbehaviour): MsgSubmitConsumerMisbehaviourProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerMisbehaviour",
      value: MsgSubmitConsumerMisbehaviour.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitConsumerMisbehaviourResponse(): MsgSubmitConsumerMisbehaviourResponse {
  return {};
}
export const MsgSubmitConsumerMisbehaviourResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerMisbehaviourResponse",
  encode(_: MsgSubmitConsumerMisbehaviourResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSubmitConsumerMisbehaviourResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitConsumerMisbehaviourResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgSubmitConsumerMisbehaviourResponse>): MsgSubmitConsumerMisbehaviourResponse {
    const message = createBaseMsgSubmitConsumerMisbehaviourResponse();
    return message;
  },
  fromAmino(_: MsgSubmitConsumerMisbehaviourResponseAmino): MsgSubmitConsumerMisbehaviourResponse {
    const message = createBaseMsgSubmitConsumerMisbehaviourResponse();
    return message;
  },
  toAmino(_: MsgSubmitConsumerMisbehaviourResponse, useInterfaces: boolean = false): MsgSubmitConsumerMisbehaviourResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitConsumerMisbehaviourResponseAminoMsg): MsgSubmitConsumerMisbehaviourResponse {
    return MsgSubmitConsumerMisbehaviourResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitConsumerMisbehaviourResponseProtoMsg, useInterfaces: boolean = false): MsgSubmitConsumerMisbehaviourResponse {
    return MsgSubmitConsumerMisbehaviourResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSubmitConsumerMisbehaviourResponse): Uint8Array {
    return MsgSubmitConsumerMisbehaviourResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitConsumerMisbehaviourResponse): MsgSubmitConsumerMisbehaviourResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerMisbehaviourResponse",
      value: MsgSubmitConsumerMisbehaviourResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitConsumerDoubleVoting(): MsgSubmitConsumerDoubleVoting {
  return {
    submitter: "",
    duplicateVoteEvidence: undefined,
    infractionBlockHeader: undefined,
    consumerId: ""
  };
}
export const MsgSubmitConsumerDoubleVoting = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerDoubleVoting",
  encode(message: MsgSubmitConsumerDoubleVoting, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.submitter !== "") {
      writer.uint32(10).string(message.submitter);
    }
    if (message.duplicateVoteEvidence !== undefined) {
      DuplicateVoteEvidence.encode(message.duplicateVoteEvidence, writer.uint32(18).fork()).ldelim();
    }
    if (message.infractionBlockHeader !== undefined) {
      Header.encode(message.infractionBlockHeader, writer.uint32(26).fork()).ldelim();
    }
    if (message.consumerId !== "") {
      writer.uint32(34).string(message.consumerId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSubmitConsumerDoubleVoting {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitConsumerDoubleVoting();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.submitter = reader.string();
          break;
        case 2:
          message.duplicateVoteEvidence = DuplicateVoteEvidence.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.infractionBlockHeader = Header.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.consumerId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitConsumerDoubleVoting>): MsgSubmitConsumerDoubleVoting {
    const message = createBaseMsgSubmitConsumerDoubleVoting();
    message.submitter = object.submitter ?? "";
    message.duplicateVoteEvidence = object.duplicateVoteEvidence !== undefined && object.duplicateVoteEvidence !== null ? DuplicateVoteEvidence.fromPartial(object.duplicateVoteEvidence) : undefined;
    message.infractionBlockHeader = object.infractionBlockHeader !== undefined && object.infractionBlockHeader !== null ? Header.fromPartial(object.infractionBlockHeader) : undefined;
    message.consumerId = object.consumerId ?? "";
    return message;
  },
  fromAmino(object: MsgSubmitConsumerDoubleVotingAmino): MsgSubmitConsumerDoubleVoting {
    const message = createBaseMsgSubmitConsumerDoubleVoting();
    if (object.submitter !== undefined && object.submitter !== null) {
      message.submitter = object.submitter;
    }
    if (object.duplicate_vote_evidence !== undefined && object.duplicate_vote_evidence !== null) {
      message.duplicateVoteEvidence = DuplicateVoteEvidence.fromAmino(object.duplicate_vote_evidence);
    }
    if (object.infraction_block_header !== undefined && object.infraction_block_header !== null) {
      message.infractionBlockHeader = Header.fromAmino(object.infraction_block_header);
    }
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    return message;
  },
  toAmino(message: MsgSubmitConsumerDoubleVoting, useInterfaces: boolean = false): MsgSubmitConsumerDoubleVotingAmino {
    const obj: any = {};
    obj.submitter = message.submitter === "" ? undefined : message.submitter;
    obj.duplicate_vote_evidence = message.duplicateVoteEvidence ? DuplicateVoteEvidence.toAmino(message.duplicateVoteEvidence, useInterfaces) : undefined;
    obj.infraction_block_header = message.infractionBlockHeader ? Header.toAmino(message.infractionBlockHeader, useInterfaces) : undefined;
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    return obj;
  },
  fromAminoMsg(object: MsgSubmitConsumerDoubleVotingAminoMsg): MsgSubmitConsumerDoubleVoting {
    return MsgSubmitConsumerDoubleVoting.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitConsumerDoubleVotingProtoMsg, useInterfaces: boolean = false): MsgSubmitConsumerDoubleVoting {
    return MsgSubmitConsumerDoubleVoting.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSubmitConsumerDoubleVoting): Uint8Array {
    return MsgSubmitConsumerDoubleVoting.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitConsumerDoubleVoting): MsgSubmitConsumerDoubleVotingProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerDoubleVoting",
      value: MsgSubmitConsumerDoubleVoting.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitConsumerDoubleVotingResponse(): MsgSubmitConsumerDoubleVotingResponse {
  return {};
}
export const MsgSubmitConsumerDoubleVotingResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerDoubleVotingResponse",
  encode(_: MsgSubmitConsumerDoubleVotingResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSubmitConsumerDoubleVotingResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitConsumerDoubleVotingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgSubmitConsumerDoubleVotingResponse>): MsgSubmitConsumerDoubleVotingResponse {
    const message = createBaseMsgSubmitConsumerDoubleVotingResponse();
    return message;
  },
  fromAmino(_: MsgSubmitConsumerDoubleVotingResponseAmino): MsgSubmitConsumerDoubleVotingResponse {
    const message = createBaseMsgSubmitConsumerDoubleVotingResponse();
    return message;
  },
  toAmino(_: MsgSubmitConsumerDoubleVotingResponse, useInterfaces: boolean = false): MsgSubmitConsumerDoubleVotingResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitConsumerDoubleVotingResponseAminoMsg): MsgSubmitConsumerDoubleVotingResponse {
    return MsgSubmitConsumerDoubleVotingResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSubmitConsumerDoubleVotingResponseProtoMsg, useInterfaces: boolean = false): MsgSubmitConsumerDoubleVotingResponse {
    return MsgSubmitConsumerDoubleVotingResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSubmitConsumerDoubleVotingResponse): Uint8Array {
    return MsgSubmitConsumerDoubleVotingResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitConsumerDoubleVotingResponse): MsgSubmitConsumerDoubleVotingResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerDoubleVotingResponse",
      value: MsgSubmitConsumerDoubleVotingResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg, useInterfaces: boolean = false): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgUpdateParamsResponse",
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateParamsResponse, useInterfaces: boolean = false): MsgUpdateParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgConsumerAddition(): MsgConsumerAddition {
  return {
    chainId: "",
    initialHeight: Height.fromPartial({}),
    genesisHash: new Uint8Array(),
    binaryHash: new Uint8Array(),
    spawnTime: new Date(),
    unbondingPeriod: Duration.fromPartial({}),
    ccvTimeoutPeriod: Duration.fromPartial({}),
    transferTimeoutPeriod: Duration.fromPartial({}),
    consumerRedistributionFraction: "",
    blocksPerDistributionTransmission: BigInt(0),
    historicalEntries: BigInt(0),
    distributionTransmissionChannel: "",
    topN: 0,
    validatorsPowerCap: 0,
    validatorSetCap: 0,
    allowlist: [],
    denylist: [],
    authority: "",
    minStake: BigInt(0),
    allowInactiveVals: false
  };
}
export const MsgConsumerAddition = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgConsumerAddition",
  encode(message: MsgConsumerAddition, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.initialHeight !== undefined) {
      Height.encode(message.initialHeight, writer.uint32(18).fork()).ldelim();
    }
    if (message.genesisHash.length !== 0) {
      writer.uint32(26).bytes(message.genesisHash);
    }
    if (message.binaryHash.length !== 0) {
      writer.uint32(34).bytes(message.binaryHash);
    }
    if (message.spawnTime !== undefined) {
      Timestamp.encode(toTimestamp(message.spawnTime), writer.uint32(42).fork()).ldelim();
    }
    if (message.unbondingPeriod !== undefined) {
      Duration.encode(message.unbondingPeriod, writer.uint32(50).fork()).ldelim();
    }
    if (message.ccvTimeoutPeriod !== undefined) {
      Duration.encode(message.ccvTimeoutPeriod, writer.uint32(58).fork()).ldelim();
    }
    if (message.transferTimeoutPeriod !== undefined) {
      Duration.encode(message.transferTimeoutPeriod, writer.uint32(66).fork()).ldelim();
    }
    if (message.consumerRedistributionFraction !== "") {
      writer.uint32(74).string(message.consumerRedistributionFraction);
    }
    if (message.blocksPerDistributionTransmission !== BigInt(0)) {
      writer.uint32(80).int64(message.blocksPerDistributionTransmission);
    }
    if (message.historicalEntries !== BigInt(0)) {
      writer.uint32(88).int64(message.historicalEntries);
    }
    if (message.distributionTransmissionChannel !== "") {
      writer.uint32(98).string(message.distributionTransmissionChannel);
    }
    if (message.topN !== 0) {
      writer.uint32(104).uint32(message.topN);
    }
    if (message.validatorsPowerCap !== 0) {
      writer.uint32(112).uint32(message.validatorsPowerCap);
    }
    if (message.validatorSetCap !== 0) {
      writer.uint32(120).uint32(message.validatorSetCap);
    }
    for (const v of message.allowlist) {
      writer.uint32(130).string(v!);
    }
    for (const v of message.denylist) {
      writer.uint32(138).string(v!);
    }
    if (message.authority !== "") {
      writer.uint32(146).string(message.authority);
    }
    if (message.minStake !== BigInt(0)) {
      writer.uint32(152).uint64(message.minStake);
    }
    if (message.allowInactiveVals === true) {
      writer.uint32(160).bool(message.allowInactiveVals);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgConsumerAddition {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConsumerAddition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.initialHeight = Height.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.genesisHash = reader.bytes();
          break;
        case 4:
          message.binaryHash = reader.bytes();
          break;
        case 5:
          message.spawnTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 6:
          message.unbondingPeriod = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 7:
          message.ccvTimeoutPeriod = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 8:
          message.transferTimeoutPeriod = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 9:
          message.consumerRedistributionFraction = reader.string();
          break;
        case 10:
          message.blocksPerDistributionTransmission = reader.int64();
          break;
        case 11:
          message.historicalEntries = reader.int64();
          break;
        case 12:
          message.distributionTransmissionChannel = reader.string();
          break;
        case 13:
          message.topN = reader.uint32();
          break;
        case 14:
          message.validatorsPowerCap = reader.uint32();
          break;
        case 15:
          message.validatorSetCap = reader.uint32();
          break;
        case 16:
          message.allowlist.push(reader.string());
          break;
        case 17:
          message.denylist.push(reader.string());
          break;
        case 18:
          message.authority = reader.string();
          break;
        case 19:
          message.minStake = reader.uint64();
          break;
        case 20:
          message.allowInactiveVals = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgConsumerAddition>): MsgConsumerAddition {
    const message = createBaseMsgConsumerAddition();
    message.chainId = object.chainId ?? "";
    message.initialHeight = object.initialHeight !== undefined && object.initialHeight !== null ? Height.fromPartial(object.initialHeight) : undefined;
    message.genesisHash = object.genesisHash ?? new Uint8Array();
    message.binaryHash = object.binaryHash ?? new Uint8Array();
    message.spawnTime = object.spawnTime ?? undefined;
    message.unbondingPeriod = object.unbondingPeriod !== undefined && object.unbondingPeriod !== null ? Duration.fromPartial(object.unbondingPeriod) : undefined;
    message.ccvTimeoutPeriod = object.ccvTimeoutPeriod !== undefined && object.ccvTimeoutPeriod !== null ? Duration.fromPartial(object.ccvTimeoutPeriod) : undefined;
    message.transferTimeoutPeriod = object.transferTimeoutPeriod !== undefined && object.transferTimeoutPeriod !== null ? Duration.fromPartial(object.transferTimeoutPeriod) : undefined;
    message.consumerRedistributionFraction = object.consumerRedistributionFraction ?? "";
    message.blocksPerDistributionTransmission = object.blocksPerDistributionTransmission !== undefined && object.blocksPerDistributionTransmission !== null ? BigInt(object.blocksPerDistributionTransmission.toString()) : BigInt(0);
    message.historicalEntries = object.historicalEntries !== undefined && object.historicalEntries !== null ? BigInt(object.historicalEntries.toString()) : BigInt(0);
    message.distributionTransmissionChannel = object.distributionTransmissionChannel ?? "";
    message.topN = object.topN ?? 0;
    message.validatorsPowerCap = object.validatorsPowerCap ?? 0;
    message.validatorSetCap = object.validatorSetCap ?? 0;
    message.allowlist = object.allowlist?.map(e => e) || [];
    message.denylist = object.denylist?.map(e => e) || [];
    message.authority = object.authority ?? "";
    message.minStake = object.minStake !== undefined && object.minStake !== null ? BigInt(object.minStake.toString()) : BigInt(0);
    message.allowInactiveVals = object.allowInactiveVals ?? false;
    return message;
  },
  fromAmino(object: MsgConsumerAdditionAmino): MsgConsumerAddition {
    const message = createBaseMsgConsumerAddition();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.initial_height !== undefined && object.initial_height !== null) {
      message.initialHeight = Height.fromAmino(object.initial_height);
    }
    if (object.genesis_hash !== undefined && object.genesis_hash !== null) {
      message.genesisHash = bytesFromBase64(object.genesis_hash);
    }
    if (object.binary_hash !== undefined && object.binary_hash !== null) {
      message.binaryHash = bytesFromBase64(object.binary_hash);
    }
    if (object.spawn_time !== undefined && object.spawn_time !== null) {
      message.spawnTime = fromTimestamp(Timestamp.fromAmino(object.spawn_time));
    }
    if (object.unbonding_period !== undefined && object.unbonding_period !== null) {
      message.unbondingPeriod = Duration.fromAmino(object.unbonding_period);
    }
    if (object.ccv_timeout_period !== undefined && object.ccv_timeout_period !== null) {
      message.ccvTimeoutPeriod = Duration.fromAmino(object.ccv_timeout_period);
    }
    if (object.transfer_timeout_period !== undefined && object.transfer_timeout_period !== null) {
      message.transferTimeoutPeriod = Duration.fromAmino(object.transfer_timeout_period);
    }
    if (object.consumer_redistribution_fraction !== undefined && object.consumer_redistribution_fraction !== null) {
      message.consumerRedistributionFraction = object.consumer_redistribution_fraction;
    }
    if (object.blocks_per_distribution_transmission !== undefined && object.blocks_per_distribution_transmission !== null) {
      message.blocksPerDistributionTransmission = BigInt(object.blocks_per_distribution_transmission);
    }
    if (object.historical_entries !== undefined && object.historical_entries !== null) {
      message.historicalEntries = BigInt(object.historical_entries);
    }
    if (object.distribution_transmission_channel !== undefined && object.distribution_transmission_channel !== null) {
      message.distributionTransmissionChannel = object.distribution_transmission_channel;
    }
    if (object.top_N !== undefined && object.top_N !== null) {
      message.topN = object.top_N;
    }
    if (object.validators_power_cap !== undefined && object.validators_power_cap !== null) {
      message.validatorsPowerCap = object.validators_power_cap;
    }
    if (object.validator_set_cap !== undefined && object.validator_set_cap !== null) {
      message.validatorSetCap = object.validator_set_cap;
    }
    message.allowlist = object.allowlist?.map(e => e) || [];
    message.denylist = object.denylist?.map(e => e) || [];
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.min_stake !== undefined && object.min_stake !== null) {
      message.minStake = BigInt(object.min_stake);
    }
    if (object.allow_inactive_vals !== undefined && object.allow_inactive_vals !== null) {
      message.allowInactiveVals = object.allow_inactive_vals;
    }
    return message;
  },
  toAmino(message: MsgConsumerAddition, useInterfaces: boolean = false): MsgConsumerAdditionAmino {
    const obj: any = {};
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.initial_height = message.initialHeight ? Height.toAmino(message.initialHeight, useInterfaces) : {};
    obj.genesis_hash = message.genesisHash ? base64FromBytes(message.genesisHash) : undefined;
    obj.binary_hash = message.binaryHash ? base64FromBytes(message.binaryHash) : undefined;
    obj.spawn_time = message.spawnTime ? Timestamp.toAmino(toTimestamp(message.spawnTime)) : undefined;
    obj.unbonding_period = message.unbondingPeriod ? Duration.toAmino(message.unbondingPeriod, useInterfaces) : undefined;
    obj.ccv_timeout_period = message.ccvTimeoutPeriod ? Duration.toAmino(message.ccvTimeoutPeriod, useInterfaces) : undefined;
    obj.transfer_timeout_period = message.transferTimeoutPeriod ? Duration.toAmino(message.transferTimeoutPeriod, useInterfaces) : undefined;
    obj.consumer_redistribution_fraction = message.consumerRedistributionFraction === "" ? undefined : message.consumerRedistributionFraction;
    obj.blocks_per_distribution_transmission = message.blocksPerDistributionTransmission !== BigInt(0) ? message.blocksPerDistributionTransmission.toString() : undefined;
    obj.historical_entries = message.historicalEntries !== BigInt(0) ? message.historicalEntries.toString() : undefined;
    obj.distribution_transmission_channel = message.distributionTransmissionChannel === "" ? undefined : message.distributionTransmissionChannel;
    obj.top_N = message.topN === 0 ? undefined : message.topN;
    obj.validators_power_cap = message.validatorsPowerCap === 0 ? undefined : message.validatorsPowerCap;
    obj.validator_set_cap = message.validatorSetCap === 0 ? undefined : message.validatorSetCap;
    if (message.allowlist) {
      obj.allowlist = message.allowlist.map(e => e);
    } else {
      obj.allowlist = message.allowlist;
    }
    if (message.denylist) {
      obj.denylist = message.denylist.map(e => e);
    } else {
      obj.denylist = message.denylist;
    }
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.min_stake = message.minStake !== BigInt(0) ? message.minStake.toString() : undefined;
    obj.allow_inactive_vals = message.allowInactiveVals === false ? undefined : message.allowInactiveVals;
    return obj;
  },
  fromAminoMsg(object: MsgConsumerAdditionAminoMsg): MsgConsumerAddition {
    return MsgConsumerAddition.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgConsumerAdditionProtoMsg, useInterfaces: boolean = false): MsgConsumerAddition {
    return MsgConsumerAddition.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgConsumerAddition): Uint8Array {
    return MsgConsumerAddition.encode(message).finish();
  },
  toProtoMsg(message: MsgConsumerAddition): MsgConsumerAdditionProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgConsumerAddition",
      value: MsgConsumerAddition.encode(message).finish()
    };
  }
};
function createBaseMsgConsumerRemoval(): MsgConsumerRemoval {
  return {
    chainId: "",
    stopTime: new Date(),
    authority: ""
  };
}
export const MsgConsumerRemoval = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgConsumerRemoval",
  encode(message: MsgConsumerRemoval, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.stopTime !== undefined) {
      Timestamp.encode(toTimestamp(message.stopTime), writer.uint32(18).fork()).ldelim();
    }
    if (message.authority !== "") {
      writer.uint32(26).string(message.authority);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgConsumerRemoval {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConsumerRemoval();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.stopTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.authority = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgConsumerRemoval>): MsgConsumerRemoval {
    const message = createBaseMsgConsumerRemoval();
    message.chainId = object.chainId ?? "";
    message.stopTime = object.stopTime ?? undefined;
    message.authority = object.authority ?? "";
    return message;
  },
  fromAmino(object: MsgConsumerRemovalAmino): MsgConsumerRemoval {
    const message = createBaseMsgConsumerRemoval();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.stop_time !== undefined && object.stop_time !== null) {
      message.stopTime = fromTimestamp(Timestamp.fromAmino(object.stop_time));
    }
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    return message;
  },
  toAmino(message: MsgConsumerRemoval, useInterfaces: boolean = false): MsgConsumerRemovalAmino {
    const obj: any = {};
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.stop_time = message.stopTime ? Timestamp.toAmino(toTimestamp(message.stopTime)) : undefined;
    obj.authority = message.authority === "" ? undefined : message.authority;
    return obj;
  },
  fromAminoMsg(object: MsgConsumerRemovalAminoMsg): MsgConsumerRemoval {
    return MsgConsumerRemoval.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgConsumerRemovalProtoMsg, useInterfaces: boolean = false): MsgConsumerRemoval {
    return MsgConsumerRemoval.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgConsumerRemoval): Uint8Array {
    return MsgConsumerRemoval.encode(message).finish();
  },
  toProtoMsg(message: MsgConsumerRemoval): MsgConsumerRemovalProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgConsumerRemoval",
      value: MsgConsumerRemoval.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveConsumer(): MsgRemoveConsumer {
  return {
    consumerId: "",
    owner: ""
  };
}
export const MsgRemoveConsumer = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgRemoveConsumer",
  encode(message: MsgRemoveConsumer, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consumerId !== "") {
      writer.uint32(10).string(message.consumerId);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRemoveConsumer {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveConsumer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerId = reader.string();
          break;
        case 2:
          message.owner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRemoveConsumer>): MsgRemoveConsumer {
    const message = createBaseMsgRemoveConsumer();
    message.consumerId = object.consumerId ?? "";
    message.owner = object.owner ?? "";
    return message;
  },
  fromAmino(object: MsgRemoveConsumerAmino): MsgRemoveConsumer {
    const message = createBaseMsgRemoveConsumer();
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    return message;
  },
  toAmino(message: MsgRemoveConsumer, useInterfaces: boolean = false): MsgRemoveConsumerAmino {
    const obj: any = {};
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    obj.owner = message.owner === "" ? undefined : message.owner;
    return obj;
  },
  fromAminoMsg(object: MsgRemoveConsumerAminoMsg): MsgRemoveConsumer {
    return MsgRemoveConsumer.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveConsumerProtoMsg, useInterfaces: boolean = false): MsgRemoveConsumer {
    return MsgRemoveConsumer.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRemoveConsumer): Uint8Array {
    return MsgRemoveConsumer.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveConsumer): MsgRemoveConsumerProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgRemoveConsumer",
      value: MsgRemoveConsumer.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveConsumerResponse(): MsgRemoveConsumerResponse {
  return {};
}
export const MsgRemoveConsumerResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgRemoveConsumerResponse",
  encode(_: MsgRemoveConsumerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRemoveConsumerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveConsumerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgRemoveConsumerResponse>): MsgRemoveConsumerResponse {
    const message = createBaseMsgRemoveConsumerResponse();
    return message;
  },
  fromAmino(_: MsgRemoveConsumerResponseAmino): MsgRemoveConsumerResponse {
    const message = createBaseMsgRemoveConsumerResponse();
    return message;
  },
  toAmino(_: MsgRemoveConsumerResponse, useInterfaces: boolean = false): MsgRemoveConsumerResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRemoveConsumerResponseAminoMsg): MsgRemoveConsumerResponse {
    return MsgRemoveConsumerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveConsumerResponseProtoMsg, useInterfaces: boolean = false): MsgRemoveConsumerResponse {
    return MsgRemoveConsumerResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRemoveConsumerResponse): Uint8Array {
    return MsgRemoveConsumerResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveConsumerResponse): MsgRemoveConsumerResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgRemoveConsumerResponse",
      value: MsgRemoveConsumerResponse.encode(message).finish()
    };
  }
};
function createBaseMsgChangeRewardDenoms(): MsgChangeRewardDenoms {
  return {
    denomsToAdd: [],
    denomsToRemove: [],
    authority: ""
  };
}
export const MsgChangeRewardDenoms = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgChangeRewardDenoms",
  encode(message: MsgChangeRewardDenoms, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.denomsToAdd) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.denomsToRemove) {
      writer.uint32(18).string(v!);
    }
    if (message.authority !== "") {
      writer.uint32(26).string(message.authority);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgChangeRewardDenoms {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChangeRewardDenoms();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denomsToAdd.push(reader.string());
          break;
        case 2:
          message.denomsToRemove.push(reader.string());
          break;
        case 3:
          message.authority = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgChangeRewardDenoms>): MsgChangeRewardDenoms {
    const message = createBaseMsgChangeRewardDenoms();
    message.denomsToAdd = object.denomsToAdd?.map(e => e) || [];
    message.denomsToRemove = object.denomsToRemove?.map(e => e) || [];
    message.authority = object.authority ?? "";
    return message;
  },
  fromAmino(object: MsgChangeRewardDenomsAmino): MsgChangeRewardDenoms {
    const message = createBaseMsgChangeRewardDenoms();
    message.denomsToAdd = object.denoms_to_add?.map(e => e) || [];
    message.denomsToRemove = object.denoms_to_remove?.map(e => e) || [];
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    return message;
  },
  toAmino(message: MsgChangeRewardDenoms, useInterfaces: boolean = false): MsgChangeRewardDenomsAmino {
    const obj: any = {};
    if (message.denomsToAdd) {
      obj.denoms_to_add = message.denomsToAdd.map(e => e);
    } else {
      obj.denoms_to_add = message.denomsToAdd;
    }
    if (message.denomsToRemove) {
      obj.denoms_to_remove = message.denomsToRemove.map(e => e);
    } else {
      obj.denoms_to_remove = message.denomsToRemove;
    }
    obj.authority = message.authority === "" ? undefined : message.authority;
    return obj;
  },
  fromAminoMsg(object: MsgChangeRewardDenomsAminoMsg): MsgChangeRewardDenoms {
    return MsgChangeRewardDenoms.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgChangeRewardDenomsProtoMsg, useInterfaces: boolean = false): MsgChangeRewardDenoms {
    return MsgChangeRewardDenoms.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgChangeRewardDenoms): Uint8Array {
    return MsgChangeRewardDenoms.encode(message).finish();
  },
  toProtoMsg(message: MsgChangeRewardDenoms): MsgChangeRewardDenomsProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgChangeRewardDenoms",
      value: MsgChangeRewardDenoms.encode(message).finish()
    };
  }
};
function createBaseMsgChangeRewardDenomsResponse(): MsgChangeRewardDenomsResponse {
  return {};
}
export const MsgChangeRewardDenomsResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgChangeRewardDenomsResponse",
  encode(_: MsgChangeRewardDenomsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgChangeRewardDenomsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChangeRewardDenomsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgChangeRewardDenomsResponse>): MsgChangeRewardDenomsResponse {
    const message = createBaseMsgChangeRewardDenomsResponse();
    return message;
  },
  fromAmino(_: MsgChangeRewardDenomsResponseAmino): MsgChangeRewardDenomsResponse {
    const message = createBaseMsgChangeRewardDenomsResponse();
    return message;
  },
  toAmino(_: MsgChangeRewardDenomsResponse, useInterfaces: boolean = false): MsgChangeRewardDenomsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgChangeRewardDenomsResponseAminoMsg): MsgChangeRewardDenomsResponse {
    return MsgChangeRewardDenomsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgChangeRewardDenomsResponseProtoMsg, useInterfaces: boolean = false): MsgChangeRewardDenomsResponse {
    return MsgChangeRewardDenomsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgChangeRewardDenomsResponse): Uint8Array {
    return MsgChangeRewardDenomsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgChangeRewardDenomsResponse): MsgChangeRewardDenomsResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgChangeRewardDenomsResponse",
      value: MsgChangeRewardDenomsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgOptIn(): MsgOptIn {
  return {
    chainId: "",
    providerAddr: "",
    consumerKey: "",
    signer: "",
    consumerId: ""
  };
}
export const MsgOptIn = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgOptIn",
  encode(message: MsgOptIn, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.providerAddr !== "") {
      writer.uint32(18).string(message.providerAddr);
    }
    if (message.consumerKey !== "") {
      writer.uint32(26).string(message.consumerKey);
    }
    if (message.signer !== "") {
      writer.uint32(34).string(message.signer);
    }
    if (message.consumerId !== "") {
      writer.uint32(42).string(message.consumerId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgOptIn {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgOptIn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.providerAddr = reader.string();
          break;
        case 3:
          message.consumerKey = reader.string();
          break;
        case 4:
          message.signer = reader.string();
          break;
        case 5:
          message.consumerId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgOptIn>): MsgOptIn {
    const message = createBaseMsgOptIn();
    message.chainId = object.chainId ?? "";
    message.providerAddr = object.providerAddr ?? "";
    message.consumerKey = object.consumerKey ?? "";
    message.signer = object.signer ?? "";
    message.consumerId = object.consumerId ?? "";
    return message;
  },
  fromAmino(object: MsgOptInAmino): MsgOptIn {
    const message = createBaseMsgOptIn();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.provider_addr !== undefined && object.provider_addr !== null) {
      message.providerAddr = object.provider_addr;
    }
    if (object.consumer_key !== undefined && object.consumer_key !== null) {
      message.consumerKey = object.consumer_key;
    }
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer;
    }
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    return message;
  },
  toAmino(message: MsgOptIn, useInterfaces: boolean = false): MsgOptInAmino {
    const obj: any = {};
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.provider_addr = message.providerAddr === "" ? undefined : message.providerAddr;
    obj.consumer_key = message.consumerKey === "" ? undefined : message.consumerKey;
    obj.signer = message.signer === "" ? undefined : message.signer;
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    return obj;
  },
  fromAminoMsg(object: MsgOptInAminoMsg): MsgOptIn {
    return MsgOptIn.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgOptInProtoMsg, useInterfaces: boolean = false): MsgOptIn {
    return MsgOptIn.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgOptIn): Uint8Array {
    return MsgOptIn.encode(message).finish();
  },
  toProtoMsg(message: MsgOptIn): MsgOptInProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgOptIn",
      value: MsgOptIn.encode(message).finish()
    };
  }
};
function createBaseMsgOptInResponse(): MsgOptInResponse {
  return {};
}
export const MsgOptInResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgOptInResponse",
  encode(_: MsgOptInResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgOptInResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgOptInResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgOptInResponse>): MsgOptInResponse {
    const message = createBaseMsgOptInResponse();
    return message;
  },
  fromAmino(_: MsgOptInResponseAmino): MsgOptInResponse {
    const message = createBaseMsgOptInResponse();
    return message;
  },
  toAmino(_: MsgOptInResponse, useInterfaces: boolean = false): MsgOptInResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgOptInResponseAminoMsg): MsgOptInResponse {
    return MsgOptInResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgOptInResponseProtoMsg, useInterfaces: boolean = false): MsgOptInResponse {
    return MsgOptInResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgOptInResponse): Uint8Array {
    return MsgOptInResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgOptInResponse): MsgOptInResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgOptInResponse",
      value: MsgOptInResponse.encode(message).finish()
    };
  }
};
function createBaseMsgOptOut(): MsgOptOut {
  return {
    chainId: "",
    providerAddr: "",
    signer: "",
    consumerId: ""
  };
}
export const MsgOptOut = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgOptOut",
  encode(message: MsgOptOut, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.providerAddr !== "") {
      writer.uint32(18).string(message.providerAddr);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    if (message.consumerId !== "") {
      writer.uint32(34).string(message.consumerId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgOptOut {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgOptOut();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.providerAddr = reader.string();
          break;
        case 3:
          message.signer = reader.string();
          break;
        case 4:
          message.consumerId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgOptOut>): MsgOptOut {
    const message = createBaseMsgOptOut();
    message.chainId = object.chainId ?? "";
    message.providerAddr = object.providerAddr ?? "";
    message.signer = object.signer ?? "";
    message.consumerId = object.consumerId ?? "";
    return message;
  },
  fromAmino(object: MsgOptOutAmino): MsgOptOut {
    const message = createBaseMsgOptOut();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.provider_addr !== undefined && object.provider_addr !== null) {
      message.providerAddr = object.provider_addr;
    }
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer;
    }
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    return message;
  },
  toAmino(message: MsgOptOut, useInterfaces: boolean = false): MsgOptOutAmino {
    const obj: any = {};
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.provider_addr = message.providerAddr === "" ? undefined : message.providerAddr;
    obj.signer = message.signer === "" ? undefined : message.signer;
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    return obj;
  },
  fromAminoMsg(object: MsgOptOutAminoMsg): MsgOptOut {
    return MsgOptOut.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgOptOutProtoMsg, useInterfaces: boolean = false): MsgOptOut {
    return MsgOptOut.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgOptOut): Uint8Array {
    return MsgOptOut.encode(message).finish();
  },
  toProtoMsg(message: MsgOptOut): MsgOptOutProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgOptOut",
      value: MsgOptOut.encode(message).finish()
    };
  }
};
function createBaseMsgOptOutResponse(): MsgOptOutResponse {
  return {};
}
export const MsgOptOutResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgOptOutResponse",
  encode(_: MsgOptOutResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgOptOutResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgOptOutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgOptOutResponse>): MsgOptOutResponse {
    const message = createBaseMsgOptOutResponse();
    return message;
  },
  fromAmino(_: MsgOptOutResponseAmino): MsgOptOutResponse {
    const message = createBaseMsgOptOutResponse();
    return message;
  },
  toAmino(_: MsgOptOutResponse, useInterfaces: boolean = false): MsgOptOutResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgOptOutResponseAminoMsg): MsgOptOutResponse {
    return MsgOptOutResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgOptOutResponseProtoMsg, useInterfaces: boolean = false): MsgOptOutResponse {
    return MsgOptOutResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgOptOutResponse): Uint8Array {
    return MsgOptOutResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgOptOutResponse): MsgOptOutResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgOptOutResponse",
      value: MsgOptOutResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetConsumerCommissionRate(): MsgSetConsumerCommissionRate {
  return {
    providerAddr: "",
    chainId: "",
    rate: "",
    signer: "",
    consumerId: ""
  };
}
export const MsgSetConsumerCommissionRate = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgSetConsumerCommissionRate",
  encode(message: MsgSetConsumerCommissionRate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.providerAddr !== "") {
      writer.uint32(10).string(message.providerAddr);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    if (message.rate !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.rate, 18).atomics);
    }
    if (message.signer !== "") {
      writer.uint32(34).string(message.signer);
    }
    if (message.consumerId !== "") {
      writer.uint32(42).string(message.consumerId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetConsumerCommissionRate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetConsumerCommissionRate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.providerAddr = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        case 3:
          message.rate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.signer = reader.string();
          break;
        case 5:
          message.consumerId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetConsumerCommissionRate>): MsgSetConsumerCommissionRate {
    const message = createBaseMsgSetConsumerCommissionRate();
    message.providerAddr = object.providerAddr ?? "";
    message.chainId = object.chainId ?? "";
    message.rate = object.rate ?? "";
    message.signer = object.signer ?? "";
    message.consumerId = object.consumerId ?? "";
    return message;
  },
  fromAmino(object: MsgSetConsumerCommissionRateAmino): MsgSetConsumerCommissionRate {
    const message = createBaseMsgSetConsumerCommissionRate();
    if (object.provider_addr !== undefined && object.provider_addr !== null) {
      message.providerAddr = object.provider_addr;
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.rate !== undefined && object.rate !== null) {
      message.rate = object.rate;
    }
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer;
    }
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    return message;
  },
  toAmino(message: MsgSetConsumerCommissionRate, useInterfaces: boolean = false): MsgSetConsumerCommissionRateAmino {
    const obj: any = {};
    obj.provider_addr = message.providerAddr === "" ? undefined : message.providerAddr;
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.rate = message.rate === "" ? undefined : message.rate;
    obj.signer = message.signer === "" ? undefined : message.signer;
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    return obj;
  },
  fromAminoMsg(object: MsgSetConsumerCommissionRateAminoMsg): MsgSetConsumerCommissionRate {
    return MsgSetConsumerCommissionRate.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetConsumerCommissionRateProtoMsg, useInterfaces: boolean = false): MsgSetConsumerCommissionRate {
    return MsgSetConsumerCommissionRate.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetConsumerCommissionRate): Uint8Array {
    return MsgSetConsumerCommissionRate.encode(message).finish();
  },
  toProtoMsg(message: MsgSetConsumerCommissionRate): MsgSetConsumerCommissionRateProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgSetConsumerCommissionRate",
      value: MsgSetConsumerCommissionRate.encode(message).finish()
    };
  }
};
function createBaseMsgSetConsumerCommissionRateResponse(): MsgSetConsumerCommissionRateResponse {
  return {};
}
export const MsgSetConsumerCommissionRateResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgSetConsumerCommissionRateResponse",
  encode(_: MsgSetConsumerCommissionRateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetConsumerCommissionRateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetConsumerCommissionRateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgSetConsumerCommissionRateResponse>): MsgSetConsumerCommissionRateResponse {
    const message = createBaseMsgSetConsumerCommissionRateResponse();
    return message;
  },
  fromAmino(_: MsgSetConsumerCommissionRateResponseAmino): MsgSetConsumerCommissionRateResponse {
    const message = createBaseMsgSetConsumerCommissionRateResponse();
    return message;
  },
  toAmino(_: MsgSetConsumerCommissionRateResponse, useInterfaces: boolean = false): MsgSetConsumerCommissionRateResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetConsumerCommissionRateResponseAminoMsg): MsgSetConsumerCommissionRateResponse {
    return MsgSetConsumerCommissionRateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetConsumerCommissionRateResponseProtoMsg, useInterfaces: boolean = false): MsgSetConsumerCommissionRateResponse {
    return MsgSetConsumerCommissionRateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetConsumerCommissionRateResponse): Uint8Array {
    return MsgSetConsumerCommissionRateResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetConsumerCommissionRateResponse): MsgSetConsumerCommissionRateResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgSetConsumerCommissionRateResponse",
      value: MsgSetConsumerCommissionRateResponse.encode(message).finish()
    };
  }
};
function createBaseMsgConsumerModification(): MsgConsumerModification {
  return {
    title: "",
    description: "",
    chainId: "",
    topN: 0,
    validatorsPowerCap: 0,
    validatorSetCap: 0,
    allowlist: [],
    denylist: [],
    authority: "",
    minStake: BigInt(0),
    allowInactiveVals: false
  };
}
export const MsgConsumerModification = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgConsumerModification",
  encode(message: MsgConsumerModification, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.chainId !== "") {
      writer.uint32(26).string(message.chainId);
    }
    if (message.topN !== 0) {
      writer.uint32(32).uint32(message.topN);
    }
    if (message.validatorsPowerCap !== 0) {
      writer.uint32(40).uint32(message.validatorsPowerCap);
    }
    if (message.validatorSetCap !== 0) {
      writer.uint32(48).uint32(message.validatorSetCap);
    }
    for (const v of message.allowlist) {
      writer.uint32(58).string(v!);
    }
    for (const v of message.denylist) {
      writer.uint32(66).string(v!);
    }
    if (message.authority !== "") {
      writer.uint32(74).string(message.authority);
    }
    if (message.minStake !== BigInt(0)) {
      writer.uint32(80).uint64(message.minStake);
    }
    if (message.allowInactiveVals === true) {
      writer.uint32(88).bool(message.allowInactiveVals);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgConsumerModification {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConsumerModification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.chainId = reader.string();
          break;
        case 4:
          message.topN = reader.uint32();
          break;
        case 5:
          message.validatorsPowerCap = reader.uint32();
          break;
        case 6:
          message.validatorSetCap = reader.uint32();
          break;
        case 7:
          message.allowlist.push(reader.string());
          break;
        case 8:
          message.denylist.push(reader.string());
          break;
        case 9:
          message.authority = reader.string();
          break;
        case 10:
          message.minStake = reader.uint64();
          break;
        case 11:
          message.allowInactiveVals = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgConsumerModification>): MsgConsumerModification {
    const message = createBaseMsgConsumerModification();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.chainId = object.chainId ?? "";
    message.topN = object.topN ?? 0;
    message.validatorsPowerCap = object.validatorsPowerCap ?? 0;
    message.validatorSetCap = object.validatorSetCap ?? 0;
    message.allowlist = object.allowlist?.map(e => e) || [];
    message.denylist = object.denylist?.map(e => e) || [];
    message.authority = object.authority ?? "";
    message.minStake = object.minStake !== undefined && object.minStake !== null ? BigInt(object.minStake.toString()) : BigInt(0);
    message.allowInactiveVals = object.allowInactiveVals ?? false;
    return message;
  },
  fromAmino(object: MsgConsumerModificationAmino): MsgConsumerModification {
    const message = createBaseMsgConsumerModification();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.top_N !== undefined && object.top_N !== null) {
      message.topN = object.top_N;
    }
    if (object.validators_power_cap !== undefined && object.validators_power_cap !== null) {
      message.validatorsPowerCap = object.validators_power_cap;
    }
    if (object.validator_set_cap !== undefined && object.validator_set_cap !== null) {
      message.validatorSetCap = object.validator_set_cap;
    }
    message.allowlist = object.allowlist?.map(e => e) || [];
    message.denylist = object.denylist?.map(e => e) || [];
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.min_stake !== undefined && object.min_stake !== null) {
      message.minStake = BigInt(object.min_stake);
    }
    if (object.allow_inactive_vals !== undefined && object.allow_inactive_vals !== null) {
      message.allowInactiveVals = object.allow_inactive_vals;
    }
    return message;
  },
  toAmino(message: MsgConsumerModification, useInterfaces: boolean = false): MsgConsumerModificationAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.top_N = message.topN === 0 ? undefined : message.topN;
    obj.validators_power_cap = message.validatorsPowerCap === 0 ? undefined : message.validatorsPowerCap;
    obj.validator_set_cap = message.validatorSetCap === 0 ? undefined : message.validatorSetCap;
    if (message.allowlist) {
      obj.allowlist = message.allowlist.map(e => e);
    } else {
      obj.allowlist = message.allowlist;
    }
    if (message.denylist) {
      obj.denylist = message.denylist.map(e => e);
    } else {
      obj.denylist = message.denylist;
    }
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.min_stake = message.minStake !== BigInt(0) ? message.minStake.toString() : undefined;
    obj.allow_inactive_vals = message.allowInactiveVals === false ? undefined : message.allowInactiveVals;
    return obj;
  },
  fromAminoMsg(object: MsgConsumerModificationAminoMsg): MsgConsumerModification {
    return MsgConsumerModification.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgConsumerModificationProtoMsg, useInterfaces: boolean = false): MsgConsumerModification {
    return MsgConsumerModification.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgConsumerModification): Uint8Array {
    return MsgConsumerModification.encode(message).finish();
  },
  toProtoMsg(message: MsgConsumerModification): MsgConsumerModificationProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgConsumerModification",
      value: MsgConsumerModification.encode(message).finish()
    };
  }
};
function createBaseMsgConsumerModificationResponse(): MsgConsumerModificationResponse {
  return {};
}
export const MsgConsumerModificationResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgConsumerModificationResponse",
  encode(_: MsgConsumerModificationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgConsumerModificationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConsumerModificationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgConsumerModificationResponse>): MsgConsumerModificationResponse {
    const message = createBaseMsgConsumerModificationResponse();
    return message;
  },
  fromAmino(_: MsgConsumerModificationResponseAmino): MsgConsumerModificationResponse {
    const message = createBaseMsgConsumerModificationResponse();
    return message;
  },
  toAmino(_: MsgConsumerModificationResponse, useInterfaces: boolean = false): MsgConsumerModificationResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgConsumerModificationResponseAminoMsg): MsgConsumerModificationResponse {
    return MsgConsumerModificationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgConsumerModificationResponseProtoMsg, useInterfaces: boolean = false): MsgConsumerModificationResponse {
    return MsgConsumerModificationResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgConsumerModificationResponse): Uint8Array {
    return MsgConsumerModificationResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgConsumerModificationResponse): MsgConsumerModificationResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgConsumerModificationResponse",
      value: MsgConsumerModificationResponse.encode(message).finish()
    };
  }
};
function createBaseMsgCreateConsumer(): MsgCreateConsumer {
  return {
    submitter: "",
    chainId: "",
    metadata: ConsumerMetadata.fromPartial({}),
    initializationParameters: undefined,
    powerShapingParameters: undefined,
    allowlistedRewardDenoms: undefined
  };
}
export const MsgCreateConsumer = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgCreateConsumer",
  encode(message: MsgCreateConsumer, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.submitter !== "") {
      writer.uint32(10).string(message.submitter);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    if (message.metadata !== undefined) {
      ConsumerMetadata.encode(message.metadata, writer.uint32(26).fork()).ldelim();
    }
    if (message.initializationParameters !== undefined) {
      ConsumerInitializationParameters.encode(message.initializationParameters, writer.uint32(34).fork()).ldelim();
    }
    if (message.powerShapingParameters !== undefined) {
      PowerShapingParameters.encode(message.powerShapingParameters, writer.uint32(42).fork()).ldelim();
    }
    if (message.allowlistedRewardDenoms !== undefined) {
      AllowlistedRewardDenoms.encode(message.allowlistedRewardDenoms, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCreateConsumer {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateConsumer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.submitter = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        case 3:
          message.metadata = ConsumerMetadata.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.initializationParameters = ConsumerInitializationParameters.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.powerShapingParameters = PowerShapingParameters.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.allowlistedRewardDenoms = AllowlistedRewardDenoms.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreateConsumer>): MsgCreateConsumer {
    const message = createBaseMsgCreateConsumer();
    message.submitter = object.submitter ?? "";
    message.chainId = object.chainId ?? "";
    message.metadata = object.metadata !== undefined && object.metadata !== null ? ConsumerMetadata.fromPartial(object.metadata) : undefined;
    message.initializationParameters = object.initializationParameters !== undefined && object.initializationParameters !== null ? ConsumerInitializationParameters.fromPartial(object.initializationParameters) : undefined;
    message.powerShapingParameters = object.powerShapingParameters !== undefined && object.powerShapingParameters !== null ? PowerShapingParameters.fromPartial(object.powerShapingParameters) : undefined;
    message.allowlistedRewardDenoms = object.allowlistedRewardDenoms !== undefined && object.allowlistedRewardDenoms !== null ? AllowlistedRewardDenoms.fromPartial(object.allowlistedRewardDenoms) : undefined;
    return message;
  },
  fromAmino(object: MsgCreateConsumerAmino): MsgCreateConsumer {
    const message = createBaseMsgCreateConsumer();
    if (object.submitter !== undefined && object.submitter !== null) {
      message.submitter = object.submitter;
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = ConsumerMetadata.fromAmino(object.metadata);
    }
    if (object.initialization_parameters !== undefined && object.initialization_parameters !== null) {
      message.initializationParameters = ConsumerInitializationParameters.fromAmino(object.initialization_parameters);
    }
    if (object.power_shaping_parameters !== undefined && object.power_shaping_parameters !== null) {
      message.powerShapingParameters = PowerShapingParameters.fromAmino(object.power_shaping_parameters);
    }
    if (object.allowlisted_reward_denoms !== undefined && object.allowlisted_reward_denoms !== null) {
      message.allowlistedRewardDenoms = AllowlistedRewardDenoms.fromAmino(object.allowlisted_reward_denoms);
    }
    return message;
  },
  toAmino(message: MsgCreateConsumer, useInterfaces: boolean = false): MsgCreateConsumerAmino {
    const obj: any = {};
    obj.submitter = message.submitter === "" ? undefined : message.submitter;
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.metadata = message.metadata ? ConsumerMetadata.toAmino(message.metadata, useInterfaces) : undefined;
    obj.initialization_parameters = message.initializationParameters ? ConsumerInitializationParameters.toAmino(message.initializationParameters, useInterfaces) : undefined;
    obj.power_shaping_parameters = message.powerShapingParameters ? PowerShapingParameters.toAmino(message.powerShapingParameters, useInterfaces) : undefined;
    obj.allowlisted_reward_denoms = message.allowlistedRewardDenoms ? AllowlistedRewardDenoms.toAmino(message.allowlistedRewardDenoms, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgCreateConsumerAminoMsg): MsgCreateConsumer {
    return MsgCreateConsumer.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateConsumerProtoMsg, useInterfaces: boolean = false): MsgCreateConsumer {
    return MsgCreateConsumer.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCreateConsumer): Uint8Array {
    return MsgCreateConsumer.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateConsumer): MsgCreateConsumerProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgCreateConsumer",
      value: MsgCreateConsumer.encode(message).finish()
    };
  }
};
function createBaseMsgCreateConsumerResponse(): MsgCreateConsumerResponse {
  return {
    consumerId: ""
  };
}
export const MsgCreateConsumerResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgCreateConsumerResponse",
  encode(message: MsgCreateConsumerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consumerId !== "") {
      writer.uint32(10).string(message.consumerId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCreateConsumerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateConsumerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreateConsumerResponse>): MsgCreateConsumerResponse {
    const message = createBaseMsgCreateConsumerResponse();
    message.consumerId = object.consumerId ?? "";
    return message;
  },
  fromAmino(object: MsgCreateConsumerResponseAmino): MsgCreateConsumerResponse {
    const message = createBaseMsgCreateConsumerResponse();
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    return message;
  },
  toAmino(message: MsgCreateConsumerResponse, useInterfaces: boolean = false): MsgCreateConsumerResponseAmino {
    const obj: any = {};
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    return obj;
  },
  fromAminoMsg(object: MsgCreateConsumerResponseAminoMsg): MsgCreateConsumerResponse {
    return MsgCreateConsumerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateConsumerResponseProtoMsg, useInterfaces: boolean = false): MsgCreateConsumerResponse {
    return MsgCreateConsumerResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCreateConsumerResponse): Uint8Array {
    return MsgCreateConsumerResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateConsumerResponse): MsgCreateConsumerResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgCreateConsumerResponse",
      value: MsgCreateConsumerResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateConsumer(): MsgUpdateConsumer {
  return {
    owner: "",
    consumerId: "",
    newOwnerAddress: "",
    metadata: undefined,
    initializationParameters: undefined,
    powerShapingParameters: undefined,
    allowlistedRewardDenoms: undefined
  };
}
export const MsgUpdateConsumer = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgUpdateConsumer",
  encode(message: MsgUpdateConsumer, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.consumerId !== "") {
      writer.uint32(18).string(message.consumerId);
    }
    if (message.newOwnerAddress !== "") {
      writer.uint32(26).string(message.newOwnerAddress);
    }
    if (message.metadata !== undefined) {
      ConsumerMetadata.encode(message.metadata, writer.uint32(34).fork()).ldelim();
    }
    if (message.initializationParameters !== undefined) {
      ConsumerInitializationParameters.encode(message.initializationParameters, writer.uint32(42).fork()).ldelim();
    }
    if (message.powerShapingParameters !== undefined) {
      PowerShapingParameters.encode(message.powerShapingParameters, writer.uint32(50).fork()).ldelim();
    }
    if (message.allowlistedRewardDenoms !== undefined) {
      AllowlistedRewardDenoms.encode(message.allowlistedRewardDenoms, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateConsumer {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateConsumer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.consumerId = reader.string();
          break;
        case 3:
          message.newOwnerAddress = reader.string();
          break;
        case 4:
          message.metadata = ConsumerMetadata.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.initializationParameters = ConsumerInitializationParameters.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.powerShapingParameters = PowerShapingParameters.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 7:
          message.allowlistedRewardDenoms = AllowlistedRewardDenoms.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateConsumer>): MsgUpdateConsumer {
    const message = createBaseMsgUpdateConsumer();
    message.owner = object.owner ?? "";
    message.consumerId = object.consumerId ?? "";
    message.newOwnerAddress = object.newOwnerAddress ?? "";
    message.metadata = object.metadata !== undefined && object.metadata !== null ? ConsumerMetadata.fromPartial(object.metadata) : undefined;
    message.initializationParameters = object.initializationParameters !== undefined && object.initializationParameters !== null ? ConsumerInitializationParameters.fromPartial(object.initializationParameters) : undefined;
    message.powerShapingParameters = object.powerShapingParameters !== undefined && object.powerShapingParameters !== null ? PowerShapingParameters.fromPartial(object.powerShapingParameters) : undefined;
    message.allowlistedRewardDenoms = object.allowlistedRewardDenoms !== undefined && object.allowlistedRewardDenoms !== null ? AllowlistedRewardDenoms.fromPartial(object.allowlistedRewardDenoms) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateConsumerAmino): MsgUpdateConsumer {
    const message = createBaseMsgUpdateConsumer();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    if (object.new_owner_address !== undefined && object.new_owner_address !== null) {
      message.newOwnerAddress = object.new_owner_address;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = ConsumerMetadata.fromAmino(object.metadata);
    }
    if (object.initialization_parameters !== undefined && object.initialization_parameters !== null) {
      message.initializationParameters = ConsumerInitializationParameters.fromAmino(object.initialization_parameters);
    }
    if (object.power_shaping_parameters !== undefined && object.power_shaping_parameters !== null) {
      message.powerShapingParameters = PowerShapingParameters.fromAmino(object.power_shaping_parameters);
    }
    if (object.allowlisted_reward_denoms !== undefined && object.allowlisted_reward_denoms !== null) {
      message.allowlistedRewardDenoms = AllowlistedRewardDenoms.fromAmino(object.allowlisted_reward_denoms);
    }
    return message;
  },
  toAmino(message: MsgUpdateConsumer, useInterfaces: boolean = false): MsgUpdateConsumerAmino {
    const obj: any = {};
    obj.owner = message.owner === "" ? undefined : message.owner;
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    obj.new_owner_address = message.newOwnerAddress === "" ? undefined : message.newOwnerAddress;
    obj.metadata = message.metadata ? ConsumerMetadata.toAmino(message.metadata, useInterfaces) : undefined;
    obj.initialization_parameters = message.initializationParameters ? ConsumerInitializationParameters.toAmino(message.initializationParameters, useInterfaces) : undefined;
    obj.power_shaping_parameters = message.powerShapingParameters ? PowerShapingParameters.toAmino(message.powerShapingParameters, useInterfaces) : undefined;
    obj.allowlisted_reward_denoms = message.allowlistedRewardDenoms ? AllowlistedRewardDenoms.toAmino(message.allowlistedRewardDenoms, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateConsumerAminoMsg): MsgUpdateConsumer {
    return MsgUpdateConsumer.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateConsumerProtoMsg, useInterfaces: boolean = false): MsgUpdateConsumer {
    return MsgUpdateConsumer.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateConsumer): Uint8Array {
    return MsgUpdateConsumer.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateConsumer): MsgUpdateConsumerProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgUpdateConsumer",
      value: MsgUpdateConsumer.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateConsumerResponse(): MsgUpdateConsumerResponse {
  return {};
}
export const MsgUpdateConsumerResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.MsgUpdateConsumerResponse",
  encode(_: MsgUpdateConsumerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateConsumerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateConsumerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdateConsumerResponse>): MsgUpdateConsumerResponse {
    const message = createBaseMsgUpdateConsumerResponse();
    return message;
  },
  fromAmino(_: MsgUpdateConsumerResponseAmino): MsgUpdateConsumerResponse {
    const message = createBaseMsgUpdateConsumerResponse();
    return message;
  },
  toAmino(_: MsgUpdateConsumerResponse, useInterfaces: boolean = false): MsgUpdateConsumerResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateConsumerResponseAminoMsg): MsgUpdateConsumerResponse {
    return MsgUpdateConsumerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateConsumerResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateConsumerResponse {
    return MsgUpdateConsumerResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateConsumerResponse): Uint8Array {
    return MsgUpdateConsumerResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateConsumerResponse): MsgUpdateConsumerResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.MsgUpdateConsumerResponse",
      value: MsgUpdateConsumerResponse.encode(message).finish()
    };
  }
};