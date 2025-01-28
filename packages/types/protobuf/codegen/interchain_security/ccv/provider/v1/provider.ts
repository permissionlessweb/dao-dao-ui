import { Height, HeightAmino, HeightSDKType } from "../../../../ibc/core/client/v1/client";
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { Duration, DurationAmino, DurationSDKType } from "../../../../google/protobuf/duration";
import { Equivocation, EquivocationAmino, EquivocationSDKType } from "../../../../cosmos/evidence/v1beta1/evidence";
import { ClientState, ClientStateAmino, ClientStateSDKType } from "../../../../ibc/lightclients/tendermint/v1/tendermint";
import { Coin, CoinAmino, CoinSDKType, DecCoin, DecCoinAmino, DecCoinSDKType } from "../../../../cosmos/base/v1beta1/coin";
import { ValidatorSetChangePacketData, ValidatorSetChangePacketDataAmino, ValidatorSetChangePacketDataSDKType } from "../../v1/wire";
import { PublicKey, PublicKeyAmino, PublicKeySDKType } from "../../../../tendermint/crypto/keys";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { toTimestamp, fromTimestamp, bytesFromBase64, base64FromBytes } from "../../../../helpers";
/** ConsumerPhase indicates the phases of a consumer chain according to ADR 019 */
export enum ConsumerPhase {
  /** CONSUMER_PHASE_UNSPECIFIED - UNSPECIFIED defines an empty phase. */
  CONSUMER_PHASE_UNSPECIFIED = 0,
  /**
   * CONSUMER_PHASE_REGISTERED - REGISTERED defines the phase in which a consumer chain has been assigned a unique consumer id.
   * A chain in this phase cannot yet launch.
   */
  CONSUMER_PHASE_REGISTERED = 1,
  /**
   * CONSUMER_PHASE_INITIALIZED - INITIALIZED defines the phase in which a consumer chain has set all the needed parameters to launch but
   * has not yet launched (e.g., because the `spawnTime` of the consumer chain has not yet been reached).
   */
  CONSUMER_PHASE_INITIALIZED = 2,
  /**
   * CONSUMER_PHASE_LAUNCHED - LAUNCHED defines the phase in which a consumer chain is running and consuming a subset of the validator
   * set of the provider.
   */
  CONSUMER_PHASE_LAUNCHED = 3,
  /** CONSUMER_PHASE_STOPPED - STOPPED defines the phase in which a previously-launched chain has stopped. */
  CONSUMER_PHASE_STOPPED = 4,
  /** CONSUMER_PHASE_DELETED - DELETED defines the phase in which the state of a stopped chain has been deleted. */
  CONSUMER_PHASE_DELETED = 5,
  UNRECOGNIZED = -1,
}
export const ConsumerPhaseSDKType = ConsumerPhase;
export const ConsumerPhaseAmino = ConsumerPhase;
export function consumerPhaseFromJSON(object: any): ConsumerPhase {
  switch (object) {
    case 0:
    case "CONSUMER_PHASE_UNSPECIFIED":
      return ConsumerPhase.CONSUMER_PHASE_UNSPECIFIED;
    case 1:
    case "CONSUMER_PHASE_REGISTERED":
      return ConsumerPhase.CONSUMER_PHASE_REGISTERED;
    case 2:
    case "CONSUMER_PHASE_INITIALIZED":
      return ConsumerPhase.CONSUMER_PHASE_INITIALIZED;
    case 3:
    case "CONSUMER_PHASE_LAUNCHED":
      return ConsumerPhase.CONSUMER_PHASE_LAUNCHED;
    case 4:
    case "CONSUMER_PHASE_STOPPED":
      return ConsumerPhase.CONSUMER_PHASE_STOPPED;
    case 5:
    case "CONSUMER_PHASE_DELETED":
      return ConsumerPhase.CONSUMER_PHASE_DELETED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ConsumerPhase.UNRECOGNIZED;
  }
}
export function consumerPhaseToJSON(object: ConsumerPhase): string {
  switch (object) {
    case ConsumerPhase.CONSUMER_PHASE_UNSPECIFIED:
      return "CONSUMER_PHASE_UNSPECIFIED";
    case ConsumerPhase.CONSUMER_PHASE_REGISTERED:
      return "CONSUMER_PHASE_REGISTERED";
    case ConsumerPhase.CONSUMER_PHASE_INITIALIZED:
      return "CONSUMER_PHASE_INITIALIZED";
    case ConsumerPhase.CONSUMER_PHASE_LAUNCHED:
      return "CONSUMER_PHASE_LAUNCHED";
    case ConsumerPhase.CONSUMER_PHASE_STOPPED:
      return "CONSUMER_PHASE_STOPPED";
    case ConsumerPhase.CONSUMER_PHASE_DELETED:
      return "CONSUMER_PHASE_DELETED";
    case ConsumerPhase.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * WARNING: This message is deprecated in favor of `MsgCreateConsumer`.
 * ConsumerAdditionProposal is a governance proposal on the provider chain to
 * spawn a new consumer chain. If it passes, then all validators on the provider
 * chain are expected to validate the consumer chain at spawn time or get
 * slashed. It is recommended that spawn time occurs after the proposal end
 * time.
 * Use MsgConsumerAddition to submit this proposal type.
 */
/** @deprecated */
export interface ConsumerAdditionProposal {
  $typeUrl?: "/interchain_security.ccv.provider.v1.ConsumerAdditionProposal";
  /** the title of the proposal */
  title: string;
  /** the description of the proposal */
  description: string;
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
  /** Corresponds to the minimal amount of (provider chain) stake required to validate on the consumer chain. */
  minStake: bigint;
  /** Corresponds to whether inactive validators are allowed to validate the consumer chain. */
  allowInactiveVals: boolean;
}
export interface ConsumerAdditionProposalProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerAdditionProposal";
  value: Uint8Array;
}
/**
 * WARNING: This message is deprecated in favor of `MsgCreateConsumer`.
 * ConsumerAdditionProposal is a governance proposal on the provider chain to
 * spawn a new consumer chain. If it passes, then all validators on the provider
 * chain are expected to validate the consumer chain at spawn time or get
 * slashed. It is recommended that spawn time occurs after the proposal end
 * time.
 * Use MsgConsumerAddition to submit this proposal type.
 */
/** @deprecated */
export interface ConsumerAdditionProposalAmino {
  /** the title of the proposal */
  title?: string;
  /** the description of the proposal */
  description?: string;
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
  /** Corresponds to the minimal amount of (provider chain) stake required to validate on the consumer chain. */
  min_stake?: string;
  /** Corresponds to whether inactive validators are allowed to validate the consumer chain. */
  allow_inactive_vals?: boolean;
}
export interface ConsumerAdditionProposalAminoMsg {
  type: "/interchain_security.ccv.provider.v1.ConsumerAdditionProposal";
  value: ConsumerAdditionProposalAmino;
}
/**
 * WARNING: This message is deprecated in favor of `MsgCreateConsumer`.
 * ConsumerAdditionProposal is a governance proposal on the provider chain to
 * spawn a new consumer chain. If it passes, then all validators on the provider
 * chain are expected to validate the consumer chain at spawn time or get
 * slashed. It is recommended that spawn time occurs after the proposal end
 * time.
 * Use MsgConsumerAddition to submit this proposal type.
 */
/** @deprecated */
export interface ConsumerAdditionProposalSDKType {
  $typeUrl?: "/interchain_security.ccv.provider.v1.ConsumerAdditionProposal";
  title: string;
  description: string;
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
  min_stake: bigint;
  allow_inactive_vals: boolean;
}
/**
 * WARNING: This message is deprecated in favor of `MsgRemoveConsumer`.
 * ConsumerRemovalProposal is a governance proposal on the provider chain to
 * remove (and stop) a consumer chain. If it passes, all the consumer chain's
 * state is removed from the provider chain. The outstanding unbonding operation
 * funds are released.
 * Use MsgConsumerRemoval to submit this proposal type.
 */
/** @deprecated */
export interface ConsumerRemovalProposal {
  $typeUrl?: "/interchain_security.ccv.provider.v1.ConsumerRemovalProposal";
  /** the title of the proposal */
  title: string;
  /** the description of the proposal */
  description: string;
  /** the chain-id of the consumer chain to be stopped */
  chainId: string;
  /**
   * the time on the provider chain at which all validators are responsible to
   * stop their consumer chain validator node
   */
  stopTime: Date | undefined;
}
export interface ConsumerRemovalProposalProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerRemovalProposal";
  value: Uint8Array;
}
/**
 * WARNING: This message is deprecated in favor of `MsgRemoveConsumer`.
 * ConsumerRemovalProposal is a governance proposal on the provider chain to
 * remove (and stop) a consumer chain. If it passes, all the consumer chain's
 * state is removed from the provider chain. The outstanding unbonding operation
 * funds are released.
 * Use MsgConsumerRemoval to submit this proposal type.
 */
/** @deprecated */
export interface ConsumerRemovalProposalAmino {
  /** the title of the proposal */
  title?: string;
  /** the description of the proposal */
  description?: string;
  /** the chain-id of the consumer chain to be stopped */
  chain_id?: string;
  /**
   * the time on the provider chain at which all validators are responsible to
   * stop their consumer chain validator node
   */
  stop_time?: string | undefined;
}
export interface ConsumerRemovalProposalAminoMsg {
  type: "/interchain_security.ccv.provider.v1.ConsumerRemovalProposal";
  value: ConsumerRemovalProposalAmino;
}
/**
 * WARNING: This message is deprecated in favor of `MsgRemoveConsumer`.
 * ConsumerRemovalProposal is a governance proposal on the provider chain to
 * remove (and stop) a consumer chain. If it passes, all the consumer chain's
 * state is removed from the provider chain. The outstanding unbonding operation
 * funds are released.
 * Use MsgConsumerRemoval to submit this proposal type.
 */
/** @deprecated */
export interface ConsumerRemovalProposalSDKType {
  $typeUrl?: "/interchain_security.ccv.provider.v1.ConsumerRemovalProposal";
  title: string;
  description: string;
  chain_id: string;
  stop_time: Date | undefined;
}
/**
 * WARNING: This message is deprecated in favor of `MsgUpdateConsumer`.
 * ConsumerModificationProposal is a governance proposal on the provider chain to modify parameters of a running
 * consumer chain. If it passes, the consumer chain's state is updated to take into account the newest params.
 */
/** @deprecated */
export interface ConsumerModificationProposal {
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
  /** Corresponds to the minimal amount of (provider chain) stake required to validate on the consumer chain. */
  minStake: bigint;
  /** Corresponds to whether inactive validators are allowed to validate the consumer chain. */
  allowInactiveVals: boolean;
}
export interface ConsumerModificationProposalProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerModificationProposal";
  value: Uint8Array;
}
/**
 * WARNING: This message is deprecated in favor of `MsgUpdateConsumer`.
 * ConsumerModificationProposal is a governance proposal on the provider chain to modify parameters of a running
 * consumer chain. If it passes, the consumer chain's state is updated to take into account the newest params.
 */
/** @deprecated */
export interface ConsumerModificationProposalAmino {
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
  /** Corresponds to the minimal amount of (provider chain) stake required to validate on the consumer chain. */
  min_stake?: string;
  /** Corresponds to whether inactive validators are allowed to validate the consumer chain. */
  allow_inactive_vals?: boolean;
}
export interface ConsumerModificationProposalAminoMsg {
  type: "/interchain_security.ccv.provider.v1.ConsumerModificationProposal";
  value: ConsumerModificationProposalAmino;
}
/**
 * WARNING: This message is deprecated in favor of `MsgUpdateConsumer`.
 * ConsumerModificationProposal is a governance proposal on the provider chain to modify parameters of a running
 * consumer chain. If it passes, the consumer chain's state is updated to take into account the newest params.
 */
/** @deprecated */
export interface ConsumerModificationProposalSDKType {
  title: string;
  description: string;
  chain_id: string;
  top_N: number;
  validators_power_cap: number;
  validator_set_cap: number;
  allowlist: string[];
  denylist: string[];
  min_stake: bigint;
  allow_inactive_vals: boolean;
}
/**
 * EquivocationProposal is a governance proposal on the provider chain to
 * punish a validator for equivocation on a consumer chain.
 * 
 * This type is only used internally to the consumer CCV module.
 * WARNING: This message is deprecated now that equivocations can be submitted
 * and verified automatically on the provider. (see SubmitConsumerDoubleVoting in proto/interchain-security/ccv/provider/v1/tx.proto).
 */
/** @deprecated */
export interface EquivocationProposal {
  /** the title of the proposal */
  title: string;
  /** the description of the proposal */
  description: string;
  /** the list of equivocations that will be processed */
  equivocations: Equivocation[];
}
export interface EquivocationProposalProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.EquivocationProposal";
  value: Uint8Array;
}
/**
 * EquivocationProposal is a governance proposal on the provider chain to
 * punish a validator for equivocation on a consumer chain.
 * 
 * This type is only used internally to the consumer CCV module.
 * WARNING: This message is deprecated now that equivocations can be submitted
 * and verified automatically on the provider. (see SubmitConsumerDoubleVoting in proto/interchain-security/ccv/provider/v1/tx.proto).
 */
/** @deprecated */
export interface EquivocationProposalAmino {
  /** the title of the proposal */
  title?: string;
  /** the description of the proposal */
  description?: string;
  /** the list of equivocations that will be processed */
  equivocations?: EquivocationAmino[];
}
export interface EquivocationProposalAminoMsg {
  type: "/interchain_security.ccv.provider.v1.EquivocationProposal";
  value: EquivocationProposalAmino;
}
/**
 * EquivocationProposal is a governance proposal on the provider chain to
 * punish a validator for equivocation on a consumer chain.
 * 
 * This type is only used internally to the consumer CCV module.
 * WARNING: This message is deprecated now that equivocations can be submitted
 * and verified automatically on the provider. (see SubmitConsumerDoubleVoting in proto/interchain-security/ccv/provider/v1/tx.proto).
 */
/** @deprecated */
export interface EquivocationProposalSDKType {
  title: string;
  description: string;
  equivocations: EquivocationSDKType[];
}
/**
 * ChangeRewardDenomsProposal is a governance proposal on the provider chain to
 * mutate the set of denoms accepted by the provider as rewards.
 * Use MsgChangeRewardDenoms to submit this proposal type.
 */
export interface ChangeRewardDenomsProposal {
  $typeUrl?: "/interchain_security.ccv.provider.v1.ChangeRewardDenomsProposal";
  /** the title of the proposal */
  title: string;
  /** the description of the proposal */
  description: string;
  /** the list of consumer reward denoms to add */
  denomsToAdd: string[];
  /** the list of consumer reward denoms to remove */
  denomsToRemove: string[];
}
export interface ChangeRewardDenomsProposalProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.ChangeRewardDenomsProposal";
  value: Uint8Array;
}
/**
 * ChangeRewardDenomsProposal is a governance proposal on the provider chain to
 * mutate the set of denoms accepted by the provider as rewards.
 * Use MsgChangeRewardDenoms to submit this proposal type.
 */
export interface ChangeRewardDenomsProposalAmino {
  /** the title of the proposal */
  title?: string;
  /** the description of the proposal */
  description?: string;
  /** the list of consumer reward denoms to add */
  denoms_to_add?: string[];
  /** the list of consumer reward denoms to remove */
  denoms_to_remove?: string[];
}
export interface ChangeRewardDenomsProposalAminoMsg {
  type: "/interchain_security.ccv.provider.v1.ChangeRewardDenomsProposal";
  value: ChangeRewardDenomsProposalAmino;
}
/**
 * ChangeRewardDenomsProposal is a governance proposal on the provider chain to
 * mutate the set of denoms accepted by the provider as rewards.
 * Use MsgChangeRewardDenoms to submit this proposal type.
 */
export interface ChangeRewardDenomsProposalSDKType {
  $typeUrl?: "/interchain_security.ccv.provider.v1.ChangeRewardDenomsProposal";
  title: string;
  description: string;
  denoms_to_add: string[];
  denoms_to_remove: string[];
}
/**
 * A persisted queue entry indicating that a slash packet data instance needs to
 * be handled. This type belongs in the "global" queue, to coordinate slash
 * packet handling times between consumers.
 */
export interface GlobalSlashEntry {
  /**
   * Block time that slash packet was received by provider chain.
   * This field is used for store key iteration ordering.
   */
  recvTime: Date | undefined;
  /** The consumer that sent a slash packet. */
  consumerChainId: string;
  /**
   * The IBC sequence number of the recv packet.
   * This field is used in the store key to ensure uniqueness.
   */
  ibcSeqNum: bigint;
  /**
   * The provider's consensus address of the validator being slashed.
   * This field is used to obtain validator power in HandleThrottleQueues.
   * 
   * This field is not used in the store key, but is persisted in value bytes,
   * see QueueGlobalSlashEntry.
   */
  providerValConsAddr: Uint8Array;
}
export interface GlobalSlashEntryProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.GlobalSlashEntry";
  value: Uint8Array;
}
/**
 * A persisted queue entry indicating that a slash packet data instance needs to
 * be handled. This type belongs in the "global" queue, to coordinate slash
 * packet handling times between consumers.
 */
export interface GlobalSlashEntryAmino {
  /**
   * Block time that slash packet was received by provider chain.
   * This field is used for store key iteration ordering.
   */
  recv_time?: string | undefined;
  /** The consumer that sent a slash packet. */
  consumer_chain_id?: string;
  /**
   * The IBC sequence number of the recv packet.
   * This field is used in the store key to ensure uniqueness.
   */
  ibc_seq_num?: string;
  /**
   * The provider's consensus address of the validator being slashed.
   * This field is used to obtain validator power in HandleThrottleQueues.
   * 
   * This field is not used in the store key, but is persisted in value bytes,
   * see QueueGlobalSlashEntry.
   */
  provider_val_cons_addr?: string;
}
export interface GlobalSlashEntryAminoMsg {
  type: "/interchain_security.ccv.provider.v1.GlobalSlashEntry";
  value: GlobalSlashEntryAmino;
}
/**
 * A persisted queue entry indicating that a slash packet data instance needs to
 * be handled. This type belongs in the "global" queue, to coordinate slash
 * packet handling times between consumers.
 */
export interface GlobalSlashEntrySDKType {
  recv_time: Date | undefined;
  consumer_chain_id: string;
  ibc_seq_num: bigint;
  provider_val_cons_addr: Uint8Array;
}
/** Params defines the parameters for CCV Provider module */
export interface Params {
  templateClient?: ClientState | undefined;
  /**
   * TrustingPeriodFraction is used to compute the consumer and provider IBC
   * client's TrustingPeriod from the chain defined UnbondingPeriod
   */
  trustingPeriodFraction: string;
  /** Sent IBC packets will timeout after this duration */
  ccvTimeoutPeriod: Duration | undefined;
  /** The period for which the slash meter is replenished */
  slashMeterReplenishPeriod: Duration | undefined;
  /**
   * The fraction of total voting power that is replenished to the slash meter
   * every replenish period. This param also serves as a maximum fraction of
   * total voting power that the slash meter can hold.
   */
  slashMeterReplenishFraction: string;
  /** The fee required to be paid to add a reward denom */
  consumerRewardDenomRegistrationFee: Coin | undefined;
  /** The number of blocks that comprise an epoch. */
  blocksPerEpoch: bigint;
  /** The number of epochs a validator has to validate a consumer chain in order to start receiving rewards from that chain. */
  numberOfEpochsToStartReceivingRewards: bigint;
  /**
   * The maximal number of validators that will be passed
   * to the consensus engine on the provider.
   */
  maxProviderConsensusValidators: bigint;
}
export interface ParamsProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.Params";
  value: Uint8Array;
}
/** Params defines the parameters for CCV Provider module */
export interface ParamsAmino {
  template_client?: ClientStateAmino | undefined;
  /**
   * TrustingPeriodFraction is used to compute the consumer and provider IBC
   * client's TrustingPeriod from the chain defined UnbondingPeriod
   */
  trusting_period_fraction?: string;
  /** Sent IBC packets will timeout after this duration */
  ccv_timeout_period?: DurationAmino | undefined;
  /** The period for which the slash meter is replenished */
  slash_meter_replenish_period?: DurationAmino | undefined;
  /**
   * The fraction of total voting power that is replenished to the slash meter
   * every replenish period. This param also serves as a maximum fraction of
   * total voting power that the slash meter can hold.
   */
  slash_meter_replenish_fraction?: string;
  /** The fee required to be paid to add a reward denom */
  consumer_reward_denom_registration_fee?: CoinAmino | undefined;
  /** The number of blocks that comprise an epoch. */
  blocks_per_epoch?: string;
  /** The number of epochs a validator has to validate a consumer chain in order to start receiving rewards from that chain. */
  number_of_epochs_to_start_receiving_rewards?: string;
  /**
   * The maximal number of validators that will be passed
   * to the consensus engine on the provider.
   */
  max_provider_consensus_validators?: string;
}
export interface ParamsAminoMsg {
  type: "/interchain_security.ccv.provider.v1.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for CCV Provider module */
export interface ParamsSDKType {
  template_client?: ClientStateSDKType | undefined;
  trusting_period_fraction: string;
  ccv_timeout_period: DurationSDKType | undefined;
  slash_meter_replenish_period: DurationSDKType | undefined;
  slash_meter_replenish_fraction: string;
  consumer_reward_denom_registration_fee: CoinSDKType | undefined;
  blocks_per_epoch: bigint;
  number_of_epochs_to_start_receiving_rewards: bigint;
  max_provider_consensus_validators: bigint;
}
/**
 * SlashAcks contains cons addresses of consumer chain validators
 * successfully slashed on the provider chain.
 */
export interface SlashAcks {
  addresses: string[];
}
export interface SlashAcksProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.SlashAcks";
  value: Uint8Array;
}
/**
 * SlashAcks contains cons addresses of consumer chain validators
 * successfully slashed on the provider chain.
 */
export interface SlashAcksAmino {
  addresses?: string[];
}
export interface SlashAcksAminoMsg {
  type: "/interchain_security.ccv.provider.v1.SlashAcks";
  value: SlashAcksAmino;
}
/**
 * SlashAcks contains cons addresses of consumer chain validators
 * successfully slashed on the provider chain.
 */
export interface SlashAcksSDKType {
  addresses: string[];
}
/**
 * ConsumerAdditionProposals holds pending governance proposals on the provider
 * chain to spawn a new chain.
 */
export interface ConsumerAdditionProposals {
  /** proposals waiting for spawn_time to pass */
  pending: ConsumerAdditionProposal[];
}
export interface ConsumerAdditionProposalsProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerAdditionProposals";
  value: Uint8Array;
}
/**
 * ConsumerAdditionProposals holds pending governance proposals on the provider
 * chain to spawn a new chain.
 */
export interface ConsumerAdditionProposalsAmino {
  /** proposals waiting for spawn_time to pass */
  pending?: ConsumerAdditionProposalAmino[];
}
export interface ConsumerAdditionProposalsAminoMsg {
  type: "/interchain_security.ccv.provider.v1.ConsumerAdditionProposals";
  value: ConsumerAdditionProposalsAmino;
}
/**
 * ConsumerAdditionProposals holds pending governance proposals on the provider
 * chain to spawn a new chain.
 */
export interface ConsumerAdditionProposalsSDKType {
  pending: ConsumerAdditionProposalSDKType[];
}
/**
 * ConsumerRemovalProposals holds pending governance proposals on the provider
 * chain to remove (and stop) a consumer chain.
 */
export interface ConsumerRemovalProposals {
  /** proposals waiting for stop_time to pass */
  pending: ConsumerRemovalProposal[];
}
export interface ConsumerRemovalProposalsProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerRemovalProposals";
  value: Uint8Array;
}
/**
 * ConsumerRemovalProposals holds pending governance proposals on the provider
 * chain to remove (and stop) a consumer chain.
 */
export interface ConsumerRemovalProposalsAmino {
  /** proposals waiting for stop_time to pass */
  pending?: ConsumerRemovalProposalAmino[];
}
export interface ConsumerRemovalProposalsAminoMsg {
  type: "/interchain_security.ccv.provider.v1.ConsumerRemovalProposals";
  value: ConsumerRemovalProposalsAmino;
}
/**
 * ConsumerRemovalProposals holds pending governance proposals on the provider
 * chain to remove (and stop) a consumer chain.
 */
export interface ConsumerRemovalProposalsSDKType {
  pending: ConsumerRemovalProposalSDKType[];
}
/** AddressList contains a list of consensus addresses */
export interface AddressList {
  addresses: Uint8Array[];
}
export interface AddressListProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.AddressList";
  value: Uint8Array;
}
/** AddressList contains a list of consensus addresses */
export interface AddressListAmino {
  addresses?: string[];
}
export interface AddressListAminoMsg {
  type: "/interchain_security.ccv.provider.v1.AddressList";
  value: AddressListAmino;
}
/** AddressList contains a list of consensus addresses */
export interface AddressListSDKType {
  addresses: Uint8Array[];
}
/**
 * WARNING: This message is deprecated and is not used.
 * ChannelToChain is used to map a CCV channel ID to the consumer chainID
 */
/** @deprecated */
export interface ChannelToChain {
  channelId: string;
  chainId: string;
}
export interface ChannelToChainProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.ChannelToChain";
  value: Uint8Array;
}
/**
 * WARNING: This message is deprecated and is not used.
 * ChannelToChain is used to map a CCV channel ID to the consumer chainID
 */
/** @deprecated */
export interface ChannelToChainAmino {
  channel_id?: string;
  chain_id?: string;
}
export interface ChannelToChainAminoMsg {
  type: "/interchain_security.ccv.provider.v1.ChannelToChain";
  value: ChannelToChainAmino;
}
/**
 * WARNING: This message is deprecated and is not used.
 * ChannelToChain is used to map a CCV channel ID to the consumer chainID
 */
/** @deprecated */
export interface ChannelToChainSDKType {
  channel_id: string;
  chain_id: string;
}
/** ValidatorSetChangePackets is a pb list of ccv.ValidatorSetChangePacketData. */
export interface ValidatorSetChangePackets {
  list: ValidatorSetChangePacketData[];
}
export interface ValidatorSetChangePacketsProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.ValidatorSetChangePackets";
  value: Uint8Array;
}
/** ValidatorSetChangePackets is a pb list of ccv.ValidatorSetChangePacketData. */
export interface ValidatorSetChangePacketsAmino {
  list?: ValidatorSetChangePacketDataAmino[];
}
export interface ValidatorSetChangePacketsAminoMsg {
  type: "/interchain_security.ccv.provider.v1.ValidatorSetChangePackets";
  value: ValidatorSetChangePacketsAmino;
}
/** ValidatorSetChangePackets is a pb list of ccv.ValidatorSetChangePacketData. */
export interface ValidatorSetChangePacketsSDKType {
  list: ValidatorSetChangePacketDataSDKType[];
}
export interface KeyAssignmentReplacement {
  providerAddr: Uint8Array;
  prevCKey?: PublicKey | undefined;
  power: bigint;
}
export interface KeyAssignmentReplacementProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.KeyAssignmentReplacement";
  value: Uint8Array;
}
export interface KeyAssignmentReplacementAmino {
  provider_addr?: string;
  prev_c_key?: PublicKeyAmino | undefined;
  power?: string;
}
export interface KeyAssignmentReplacementAminoMsg {
  type: "/interchain_security.ccv.provider.v1.KeyAssignmentReplacement";
  value: KeyAssignmentReplacementAmino;
}
export interface KeyAssignmentReplacementSDKType {
  provider_addr: Uint8Array;
  prev_c_key?: PublicKeySDKType | undefined;
  power: bigint;
}
/**
 * Used to serialize the ValidatorConsumerPubKey index from key assignment
 * ValidatorConsumerPubKey: (chainID, providerAddr consAddr) -> consumerKey
 * tmprotocrypto.PublicKey
 */
export interface ValidatorConsumerPubKey {
  chainId: string;
  providerAddr: Uint8Array;
  consumerKey?: PublicKey | undefined;
}
export interface ValidatorConsumerPubKeyProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.ValidatorConsumerPubKey";
  value: Uint8Array;
}
/**
 * Used to serialize the ValidatorConsumerPubKey index from key assignment
 * ValidatorConsumerPubKey: (chainID, providerAddr consAddr) -> consumerKey
 * tmprotocrypto.PublicKey
 */
export interface ValidatorConsumerPubKeyAmino {
  chain_id?: string;
  provider_addr?: string;
  consumer_key?: PublicKeyAmino | undefined;
}
export interface ValidatorConsumerPubKeyAminoMsg {
  type: "/interchain_security.ccv.provider.v1.ValidatorConsumerPubKey";
  value: ValidatorConsumerPubKeyAmino;
}
/**
 * Used to serialize the ValidatorConsumerPubKey index from key assignment
 * ValidatorConsumerPubKey: (chainID, providerAddr consAddr) -> consumerKey
 * tmprotocrypto.PublicKey
 */
export interface ValidatorConsumerPubKeySDKType {
  chain_id: string;
  provider_addr: Uint8Array;
  consumer_key?: PublicKeySDKType | undefined;
}
/**
 * Used to serialize the ValidatorConsumerAddr index from key assignment
 * ValidatorByConsumerAddr: (chainID, consumerAddr consAddr) -> providerAddr
 * consAddr
 */
export interface ValidatorByConsumerAddr {
  chainId: string;
  consumerAddr: Uint8Array;
  providerAddr: Uint8Array;
}
export interface ValidatorByConsumerAddrProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.ValidatorByConsumerAddr";
  value: Uint8Array;
}
/**
 * Used to serialize the ValidatorConsumerAddr index from key assignment
 * ValidatorByConsumerAddr: (chainID, consumerAddr consAddr) -> providerAddr
 * consAddr
 */
export interface ValidatorByConsumerAddrAmino {
  chain_id?: string;
  consumer_addr?: string;
  provider_addr?: string;
}
export interface ValidatorByConsumerAddrAminoMsg {
  type: "/interchain_security.ccv.provider.v1.ValidatorByConsumerAddr";
  value: ValidatorByConsumerAddrAmino;
}
/**
 * Used to serialize the ValidatorConsumerAddr index from key assignment
 * ValidatorByConsumerAddr: (chainID, consumerAddr consAddr) -> providerAddr
 * consAddr
 */
export interface ValidatorByConsumerAddrSDKType {
  chain_id: string;
  consumer_addr: Uint8Array;
  provider_addr: Uint8Array;
}
/**
 * Used to serialize the ConsumerAddrsToPruneV2 index from key assignment
 * ConsumerAddrsToPruneV2: (chainID, pruneTs time.Time) -> consumerAddrs AddressList
 */
export interface ConsumerAddrsToPruneV2 {
  chainId: string;
  pruneTs: Date | undefined;
  consumerAddrs?: AddressList | undefined;
}
export interface ConsumerAddrsToPruneV2ProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerAddrsToPruneV2";
  value: Uint8Array;
}
/**
 * Used to serialize the ConsumerAddrsToPruneV2 index from key assignment
 * ConsumerAddrsToPruneV2: (chainID, pruneTs time.Time) -> consumerAddrs AddressList
 */
export interface ConsumerAddrsToPruneV2Amino {
  chain_id?: string;
  prune_ts?: string | undefined;
  consumer_addrs?: AddressListAmino | undefined;
}
export interface ConsumerAddrsToPruneV2AminoMsg {
  type: "/interchain_security.ccv.provider.v1.ConsumerAddrsToPruneV2";
  value: ConsumerAddrsToPruneV2Amino;
}
/**
 * Used to serialize the ConsumerAddrsToPruneV2 index from key assignment
 * ConsumerAddrsToPruneV2: (chainID, pruneTs time.Time) -> consumerAddrs AddressList
 */
export interface ConsumerAddrsToPruneV2SDKType {
  chain_id: string;
  prune_ts: Date | undefined;
  consumer_addrs?: AddressListSDKType | undefined;
}
/**
 * ConsensusValidator is used to express a validator that
 * should be validating on a chain.
 * It contains relevant info for
 * a validator that is expected to validate on
 * either the provider or a consumer chain.
 */
export interface ConsensusValidator {
  /** validator's consensus address on the provider chain */
  providerConsAddr: Uint8Array;
  /** voting power the validator has during this epoch */
  power: bigint;
  /** public key the validator uses on the consumer chain during this epoch */
  publicKey?: PublicKey | undefined;
  /**
   * height the validator had when it FIRST became a consumer validator
   * If a validator becomes a consumer validator at height `H` and is continuously a consumer validator for all the upcoming
   * epochs, then the height of the validator SHOULD remain `H`. This height only resets to a different height if a validator
   * stops being a consumer validator during an epoch and later becomes again a consumer validator.
   */
  joinHeight: bigint;
}
export interface ConsensusValidatorProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsensusValidator";
  value: Uint8Array;
}
/**
 * ConsensusValidator is used to express a validator that
 * should be validating on a chain.
 * It contains relevant info for
 * a validator that is expected to validate on
 * either the provider or a consumer chain.
 */
export interface ConsensusValidatorAmino {
  /** validator's consensus address on the provider chain */
  provider_cons_addr?: string;
  /** voting power the validator has during this epoch */
  power?: string;
  /** public key the validator uses on the consumer chain during this epoch */
  public_key?: PublicKeyAmino | undefined;
  /**
   * height the validator had when it FIRST became a consumer validator
   * If a validator becomes a consumer validator at height `H` and is continuously a consumer validator for all the upcoming
   * epochs, then the height of the validator SHOULD remain `H`. This height only resets to a different height if a validator
   * stops being a consumer validator during an epoch and later becomes again a consumer validator.
   */
  join_height?: string;
}
export interface ConsensusValidatorAminoMsg {
  type: "/interchain_security.ccv.provider.v1.ConsensusValidator";
  value: ConsensusValidatorAmino;
}
/**
 * ConsensusValidator is used to express a validator that
 * should be validating on a chain.
 * It contains relevant info for
 * a validator that is expected to validate on
 * either the provider or a consumer chain.
 */
export interface ConsensusValidatorSDKType {
  provider_cons_addr: Uint8Array;
  power: bigint;
  public_key?: PublicKeySDKType | undefined;
  join_height: bigint;
}
/**
 * ConsumerRewardsAllocation stores the rewards allocated by a consumer chain
 * to the consumer rewards pool. It is used to allocate the tokens to the consumer
 * opted-in validators and the community pool during BeginBlock.
 */
export interface ConsumerRewardsAllocation {
  rewards: DecCoin[];
}
export interface ConsumerRewardsAllocationProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerRewardsAllocation";
  value: Uint8Array;
}
/**
 * ConsumerRewardsAllocation stores the rewards allocated by a consumer chain
 * to the consumer rewards pool. It is used to allocate the tokens to the consumer
 * opted-in validators and the community pool during BeginBlock.
 */
export interface ConsumerRewardsAllocationAmino {
  rewards: DecCoinAmino[];
}
export interface ConsumerRewardsAllocationAminoMsg {
  type: "/interchain_security.ccv.provider.v1.ConsumerRewardsAllocation";
  value: ConsumerRewardsAllocationAmino;
}
/**
 * ConsumerRewardsAllocation stores the rewards allocated by a consumer chain
 * to the consumer rewards pool. It is used to allocate the tokens to the consumer
 * opted-in validators and the community pool during BeginBlock.
 */
export interface ConsumerRewardsAllocationSDKType {
  rewards: DecCoinSDKType[];
}
/** ConsumerMetadata contains general information about the registered chain */
export interface ConsumerMetadata {
  /** the name of the chain */
  name: string;
  /** the description of the chain */
  description: string;
  /** the metadata (e.g., GitHub repository URL) of the chain */
  metadata: string;
}
export interface ConsumerMetadataProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerMetadata";
  value: Uint8Array;
}
/** ConsumerMetadata contains general information about the registered chain */
export interface ConsumerMetadataAmino {
  /** the name of the chain */
  name?: string;
  /** the description of the chain */
  description?: string;
  /** the metadata (e.g., GitHub repository URL) of the chain */
  metadata?: string;
}
export interface ConsumerMetadataAminoMsg {
  type: "/interchain_security.ccv.provider.v1.ConsumerMetadata";
  value: ConsumerMetadataAmino;
}
/** ConsumerMetadata contains general information about the registered chain */
export interface ConsumerMetadataSDKType {
  name: string;
  description: string;
  metadata: string;
}
/** ConsumerInitializationParameters are the parameters needed to launch a chain */
export interface ConsumerInitializationParameters {
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
}
export interface ConsumerInitializationParametersProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerInitializationParameters";
  value: Uint8Array;
}
/** ConsumerInitializationParameters are the parameters needed to launch a chain */
export interface ConsumerInitializationParametersAmino {
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
}
export interface ConsumerInitializationParametersAminoMsg {
  type: "/interchain_security.ccv.provider.v1.ConsumerInitializationParameters";
  value: ConsumerInitializationParametersAmino;
}
/** ConsumerInitializationParameters are the parameters needed to launch a chain */
export interface ConsumerInitializationParametersSDKType {
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
}
/** PowerShapingParameters contains parameters that shape the validator set that we send to the consumer chain */
export interface PowerShapingParameters {
  /**
   * Corresponds to the percentage of validators that have to validate the chain under the Top N case.
   * For example, 53 corresponds to a Top 53% chain, meaning that the top 53% provider validators by voting power
   * have to validate the proposed consumer chain. top_N can either be 0 or any value in [50, 100].
   * A chain can join with top_N == 0 as an Opt In chain, or with top_N ∈ [50, 100] as a Top N chain.
   */
  topN: number;
  /**
   * `validators_power_cap` corresponds to the maximum power (percentage-wise) a validator can have on the consumer chain.
   * For instance, if `validators_power_cap` is set to 32, no validator can have more than 32% of the total voting power of the
   * consumer chain. The power cap is intended as a safeguard against a validator having too much power on the consumer
   * chain and hence "taking over" the consumer chain.
   * 
   * To respect this power cap, the voting powers of the validators that run the consumer chain are decremented or
   * incremented accordingly. It is important to note that the voting powers of validators on the provider do **not** change.
   * For example, assume that the provider chain has among others, validators `A`, `B`, `C`, and `D` with voting powers
   * 100, 1, 1, 1 respectively. Assume that only those 4 validators opt in on a consumer chain. Without a power cap set,
   * validator `A` would have 100 / (100 + 1 + 1 + 1) = ~97% of the total voting power on the consumer chain, while
   * validators `B`, `C`, and `D` would have 1 /(100 + 1 + 1 + 1) = ~1% of the total voting power on the consumer chain.
   * If `validators_power_cap` is set to 30%, then the voting power of `A` would be reduced from 100 to 30 on the consumer
   * chain, the voting power of `B` would be increased from 1 to 25, and the power of `C` and `D` would be increased from
   * 1 to 24. After those modifications, `A` would have 30 / (30 + 25 + 24 + 24) = ~29% of the total voting power of the
   * consumer chain, `B` would have 25 / (30 + 25 + 24 + 24) = ~25%, and `C` and `D` would both have 24 / (30 + 25 + 24 + 24) = ~23%.
   * Naturally, there are many ways to change the voting powers of validators to respect the power cap, and ICS chooses
   * one of them (see the `NoMoreThanPercentOfTheSum` function).
   * 
   * Note that respecting `validators_power_cap` might NOT always be possible. For example, if we have a consumer
   * chain with only 5 validators and `validators_power_cap` is set to 10%, then it is not possible to respect the
   * `validators_power_cap`. If the voting power of each validator is capped to a maximum of 10% of the total consumer
   * chain's voting power, then the total voting power of the consumer chain would add up to 50% which obviously does not
   * make sense (percentages should add up to 100%). In cases where it is not feasible to respect the power cap, all
   * validators on the consumer chain will have equal voting power in order to minimize the power of a single validator.
   * Thus, in the example of 5 validators and a `validators_power_cap` set to 10%, all validators would end up having 20%
   * of the total voting power on the consumer chain. Therefore, `validators_power_cap` operates on a best-effort basis.
   * For more information on the power cap and other power-shaping parameters, please refer to the ICS docs and
   * specifically `interchain-security/docs/docs/features/power-shaping.md`.
   */
  validatorsPowerCap: number;
  /**
   * Corresponds to the maximum number of validators that can validate a consumer chain.
   * Only applicable to Opt In chains. Setting `validator_set_cap` on a Top N chain is a no-op.
   */
  validatorSetCap: number;
  /** corresponds to a list of provider consensus addresses of validators that are the ONLY ones that can validate the consumer chain */
  allowlist: string[];
  /** corresponds to a list of provider consensus addresses of validators that CANNOT validate the consumer chain */
  denylist: string[];
  /** Corresponds to the minimal amount of (provider chain) stake required to validate on the consumer chain. */
  minStake: bigint;
  /** Corresponds to whether inactive validators are allowed to validate the consumer chain. */
  allowInactiveVals: boolean;
  /**
   * Corresponds to a list of provider consensus addresses of validators that should have PRIORITY to validate on the consumer chain,
   * meaning as long as they are eligible/opted in to validate on the consumer chain, the validator set will be
   * filled with these validators first, and other validators will be added to the validator set only if there are
   * not enough eligible priority validators.
   */
  prioritylist: string[];
}
export interface PowerShapingParametersProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.PowerShapingParameters";
  value: Uint8Array;
}
/** PowerShapingParameters contains parameters that shape the validator set that we send to the consumer chain */
export interface PowerShapingParametersAmino {
  /**
   * Corresponds to the percentage of validators that have to validate the chain under the Top N case.
   * For example, 53 corresponds to a Top 53% chain, meaning that the top 53% provider validators by voting power
   * have to validate the proposed consumer chain. top_N can either be 0 or any value in [50, 100].
   * A chain can join with top_N == 0 as an Opt In chain, or with top_N ∈ [50, 100] as a Top N chain.
   */
  top_N?: number;
  /**
   * `validators_power_cap` corresponds to the maximum power (percentage-wise) a validator can have on the consumer chain.
   * For instance, if `validators_power_cap` is set to 32, no validator can have more than 32% of the total voting power of the
   * consumer chain. The power cap is intended as a safeguard against a validator having too much power on the consumer
   * chain and hence "taking over" the consumer chain.
   * 
   * To respect this power cap, the voting powers of the validators that run the consumer chain are decremented or
   * incremented accordingly. It is important to note that the voting powers of validators on the provider do **not** change.
   * For example, assume that the provider chain has among others, validators `A`, `B`, `C`, and `D` with voting powers
   * 100, 1, 1, 1 respectively. Assume that only those 4 validators opt in on a consumer chain. Without a power cap set,
   * validator `A` would have 100 / (100 + 1 + 1 + 1) = ~97% of the total voting power on the consumer chain, while
   * validators `B`, `C`, and `D` would have 1 /(100 + 1 + 1 + 1) = ~1% of the total voting power on the consumer chain.
   * If `validators_power_cap` is set to 30%, then the voting power of `A` would be reduced from 100 to 30 on the consumer
   * chain, the voting power of `B` would be increased from 1 to 25, and the power of `C` and `D` would be increased from
   * 1 to 24. After those modifications, `A` would have 30 / (30 + 25 + 24 + 24) = ~29% of the total voting power of the
   * consumer chain, `B` would have 25 / (30 + 25 + 24 + 24) = ~25%, and `C` and `D` would both have 24 / (30 + 25 + 24 + 24) = ~23%.
   * Naturally, there are many ways to change the voting powers of validators to respect the power cap, and ICS chooses
   * one of them (see the `NoMoreThanPercentOfTheSum` function).
   * 
   * Note that respecting `validators_power_cap` might NOT always be possible. For example, if we have a consumer
   * chain with only 5 validators and `validators_power_cap` is set to 10%, then it is not possible to respect the
   * `validators_power_cap`. If the voting power of each validator is capped to a maximum of 10% of the total consumer
   * chain's voting power, then the total voting power of the consumer chain would add up to 50% which obviously does not
   * make sense (percentages should add up to 100%). In cases where it is not feasible to respect the power cap, all
   * validators on the consumer chain will have equal voting power in order to minimize the power of a single validator.
   * Thus, in the example of 5 validators and a `validators_power_cap` set to 10%, all validators would end up having 20%
   * of the total voting power on the consumer chain. Therefore, `validators_power_cap` operates on a best-effort basis.
   * For more information on the power cap and other power-shaping parameters, please refer to the ICS docs and
   * specifically `interchain-security/docs/docs/features/power-shaping.md`.
   */
  validators_power_cap?: number;
  /**
   * Corresponds to the maximum number of validators that can validate a consumer chain.
   * Only applicable to Opt In chains. Setting `validator_set_cap` on a Top N chain is a no-op.
   */
  validator_set_cap?: number;
  /** corresponds to a list of provider consensus addresses of validators that are the ONLY ones that can validate the consumer chain */
  allowlist?: string[];
  /** corresponds to a list of provider consensus addresses of validators that CANNOT validate the consumer chain */
  denylist?: string[];
  /** Corresponds to the minimal amount of (provider chain) stake required to validate on the consumer chain. */
  min_stake?: string;
  /** Corresponds to whether inactive validators are allowed to validate the consumer chain. */
  allow_inactive_vals?: boolean;
  /**
   * Corresponds to a list of provider consensus addresses of validators that should have PRIORITY to validate on the consumer chain,
   * meaning as long as they are eligible/opted in to validate on the consumer chain, the validator set will be
   * filled with these validators first, and other validators will be added to the validator set only if there are
   * not enough eligible priority validators.
   */
  prioritylist?: string[];
}
export interface PowerShapingParametersAminoMsg {
  type: "/interchain_security.ccv.provider.v1.PowerShapingParameters";
  value: PowerShapingParametersAmino;
}
/** PowerShapingParameters contains parameters that shape the validator set that we send to the consumer chain */
export interface PowerShapingParametersSDKType {
  top_N: number;
  validators_power_cap: number;
  validator_set_cap: number;
  allowlist: string[];
  denylist: string[];
  min_stake: bigint;
  allow_inactive_vals: boolean;
  prioritylist: string[];
}
/**
 * ConsumerIds contains consumer ids of chains
 * Used so we can easily (de)serialize slices of strings
 */
export interface ConsumerIds {
  ids: string[];
}
export interface ConsumerIdsProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerIds";
  value: Uint8Array;
}
/**
 * ConsumerIds contains consumer ids of chains
 * Used so we can easily (de)serialize slices of strings
 */
export interface ConsumerIdsAmino {
  ids?: string[];
}
export interface ConsumerIdsAminoMsg {
  type: "/interchain_security.ccv.provider.v1.ConsumerIds";
  value: ConsumerIdsAmino;
}
/**
 * ConsumerIds contains consumer ids of chains
 * Used so we can easily (de)serialize slices of strings
 */
export interface ConsumerIdsSDKType {
  ids: string[];
}
/** AllowlistedRewardDenoms corresponds to the denoms allowlisted by a specific consumer id */
export interface AllowlistedRewardDenoms {
  denoms: string[];
}
export interface AllowlistedRewardDenomsProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.AllowlistedRewardDenoms";
  value: Uint8Array;
}
/** AllowlistedRewardDenoms corresponds to the denoms allowlisted by a specific consumer id */
export interface AllowlistedRewardDenomsAmino {
  denoms?: string[];
}
export interface AllowlistedRewardDenomsAminoMsg {
  type: "/interchain_security.ccv.provider.v1.AllowlistedRewardDenoms";
  value: AllowlistedRewardDenomsAmino;
}
/** AllowlistedRewardDenoms corresponds to the denoms allowlisted by a specific consumer id */
export interface AllowlistedRewardDenomsSDKType {
  denoms: string[];
}
function createBaseConsumerAdditionProposal(): ConsumerAdditionProposal {
  return {
    $typeUrl: "/interchain_security.ccv.provider.v1.ConsumerAdditionProposal",
    title: "",
    description: "",
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
    minStake: BigInt(0),
    allowInactiveVals: false
  };
}
export const ConsumerAdditionProposal = {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerAdditionProposal",
  encode(message: ConsumerAdditionProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.chainId !== "") {
      writer.uint32(26).string(message.chainId);
    }
    if (message.initialHeight !== undefined) {
      Height.encode(message.initialHeight, writer.uint32(34).fork()).ldelim();
    }
    if (message.genesisHash.length !== 0) {
      writer.uint32(42).bytes(message.genesisHash);
    }
    if (message.binaryHash.length !== 0) {
      writer.uint32(50).bytes(message.binaryHash);
    }
    if (message.spawnTime !== undefined) {
      Timestamp.encode(toTimestamp(message.spawnTime), writer.uint32(58).fork()).ldelim();
    }
    if (message.unbondingPeriod !== undefined) {
      Duration.encode(message.unbondingPeriod, writer.uint32(66).fork()).ldelim();
    }
    if (message.ccvTimeoutPeriod !== undefined) {
      Duration.encode(message.ccvTimeoutPeriod, writer.uint32(74).fork()).ldelim();
    }
    if (message.transferTimeoutPeriod !== undefined) {
      Duration.encode(message.transferTimeoutPeriod, writer.uint32(82).fork()).ldelim();
    }
    if (message.consumerRedistributionFraction !== "") {
      writer.uint32(90).string(message.consumerRedistributionFraction);
    }
    if (message.blocksPerDistributionTransmission !== BigInt(0)) {
      writer.uint32(96).int64(message.blocksPerDistributionTransmission);
    }
    if (message.historicalEntries !== BigInt(0)) {
      writer.uint32(104).int64(message.historicalEntries);
    }
    if (message.distributionTransmissionChannel !== "") {
      writer.uint32(114).string(message.distributionTransmissionChannel);
    }
    if (message.topN !== 0) {
      writer.uint32(120).uint32(message.topN);
    }
    if (message.validatorsPowerCap !== 0) {
      writer.uint32(128).uint32(message.validatorsPowerCap);
    }
    if (message.validatorSetCap !== 0) {
      writer.uint32(136).uint32(message.validatorSetCap);
    }
    for (const v of message.allowlist) {
      writer.uint32(146).string(v!);
    }
    for (const v of message.denylist) {
      writer.uint32(154).string(v!);
    }
    if (message.minStake !== BigInt(0)) {
      writer.uint32(160).uint64(message.minStake);
    }
    if (message.allowInactiveVals === true) {
      writer.uint32(168).bool(message.allowInactiveVals);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ConsumerAdditionProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerAdditionProposal();
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
          message.initialHeight = Height.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.genesisHash = reader.bytes();
          break;
        case 6:
          message.binaryHash = reader.bytes();
          break;
        case 7:
          message.spawnTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 8:
          message.unbondingPeriod = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 9:
          message.ccvTimeoutPeriod = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 10:
          message.transferTimeoutPeriod = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 11:
          message.consumerRedistributionFraction = reader.string();
          break;
        case 12:
          message.blocksPerDistributionTransmission = reader.int64();
          break;
        case 13:
          message.historicalEntries = reader.int64();
          break;
        case 14:
          message.distributionTransmissionChannel = reader.string();
          break;
        case 15:
          message.topN = reader.uint32();
          break;
        case 16:
          message.validatorsPowerCap = reader.uint32();
          break;
        case 17:
          message.validatorSetCap = reader.uint32();
          break;
        case 18:
          message.allowlist.push(reader.string());
          break;
        case 19:
          message.denylist.push(reader.string());
          break;
        case 20:
          message.minStake = reader.uint64();
          break;
        case 21:
          message.allowInactiveVals = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerAdditionProposal>): ConsumerAdditionProposal {
    const message = createBaseConsumerAdditionProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
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
    message.minStake = object.minStake !== undefined && object.minStake !== null ? BigInt(object.minStake.toString()) : BigInt(0);
    message.allowInactiveVals = object.allowInactiveVals ?? false;
    return message;
  },
  fromAmino(object: ConsumerAdditionProposalAmino): ConsumerAdditionProposal {
    const message = createBaseConsumerAdditionProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
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
    if (object.min_stake !== undefined && object.min_stake !== null) {
      message.minStake = BigInt(object.min_stake);
    }
    if (object.allow_inactive_vals !== undefined && object.allow_inactive_vals !== null) {
      message.allowInactiveVals = object.allow_inactive_vals;
    }
    return message;
  },
  toAmino(message: ConsumerAdditionProposal, useInterfaces: boolean = false): ConsumerAdditionProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
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
    obj.min_stake = message.minStake !== BigInt(0) ? message.minStake.toString() : undefined;
    obj.allow_inactive_vals = message.allowInactiveVals === false ? undefined : message.allowInactiveVals;
    return obj;
  },
  fromAminoMsg(object: ConsumerAdditionProposalAminoMsg): ConsumerAdditionProposal {
    return ConsumerAdditionProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerAdditionProposalProtoMsg, useInterfaces: boolean = false): ConsumerAdditionProposal {
    return ConsumerAdditionProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ConsumerAdditionProposal): Uint8Array {
    return ConsumerAdditionProposal.encode(message).finish();
  },
  toProtoMsg(message: ConsumerAdditionProposal): ConsumerAdditionProposalProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ConsumerAdditionProposal",
      value: ConsumerAdditionProposal.encode(message).finish()
    };
  }
};
function createBaseConsumerRemovalProposal(): ConsumerRemovalProposal {
  return {
    $typeUrl: "/interchain_security.ccv.provider.v1.ConsumerRemovalProposal",
    title: "",
    description: "",
    chainId: "",
    stopTime: new Date()
  };
}
export const ConsumerRemovalProposal = {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerRemovalProposal",
  encode(message: ConsumerRemovalProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.chainId !== "") {
      writer.uint32(26).string(message.chainId);
    }
    if (message.stopTime !== undefined) {
      Timestamp.encode(toTimestamp(message.stopTime), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ConsumerRemovalProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerRemovalProposal();
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
          message.stopTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerRemovalProposal>): ConsumerRemovalProposal {
    const message = createBaseConsumerRemovalProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.chainId = object.chainId ?? "";
    message.stopTime = object.stopTime ?? undefined;
    return message;
  },
  fromAmino(object: ConsumerRemovalProposalAmino): ConsumerRemovalProposal {
    const message = createBaseConsumerRemovalProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.stop_time !== undefined && object.stop_time !== null) {
      message.stopTime = fromTimestamp(Timestamp.fromAmino(object.stop_time));
    }
    return message;
  },
  toAmino(message: ConsumerRemovalProposal, useInterfaces: boolean = false): ConsumerRemovalProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.stop_time = message.stopTime ? Timestamp.toAmino(toTimestamp(message.stopTime)) : undefined;
    return obj;
  },
  fromAminoMsg(object: ConsumerRemovalProposalAminoMsg): ConsumerRemovalProposal {
    return ConsumerRemovalProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerRemovalProposalProtoMsg, useInterfaces: boolean = false): ConsumerRemovalProposal {
    return ConsumerRemovalProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ConsumerRemovalProposal): Uint8Array {
    return ConsumerRemovalProposal.encode(message).finish();
  },
  toProtoMsg(message: ConsumerRemovalProposal): ConsumerRemovalProposalProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ConsumerRemovalProposal",
      value: ConsumerRemovalProposal.encode(message).finish()
    };
  }
};
function createBaseConsumerModificationProposal(): ConsumerModificationProposal {
  return {
    title: "",
    description: "",
    chainId: "",
    topN: 0,
    validatorsPowerCap: 0,
    validatorSetCap: 0,
    allowlist: [],
    denylist: [],
    minStake: BigInt(0),
    allowInactiveVals: false
  };
}
export const ConsumerModificationProposal = {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerModificationProposal",
  encode(message: ConsumerModificationProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
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
    if (message.minStake !== BigInt(0)) {
      writer.uint32(72).uint64(message.minStake);
    }
    if (message.allowInactiveVals === true) {
      writer.uint32(80).bool(message.allowInactiveVals);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ConsumerModificationProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerModificationProposal();
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
          message.minStake = reader.uint64();
          break;
        case 10:
          message.allowInactiveVals = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerModificationProposal>): ConsumerModificationProposal {
    const message = createBaseConsumerModificationProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.chainId = object.chainId ?? "";
    message.topN = object.topN ?? 0;
    message.validatorsPowerCap = object.validatorsPowerCap ?? 0;
    message.validatorSetCap = object.validatorSetCap ?? 0;
    message.allowlist = object.allowlist?.map(e => e) || [];
    message.denylist = object.denylist?.map(e => e) || [];
    message.minStake = object.minStake !== undefined && object.minStake !== null ? BigInt(object.minStake.toString()) : BigInt(0);
    message.allowInactiveVals = object.allowInactiveVals ?? false;
    return message;
  },
  fromAmino(object: ConsumerModificationProposalAmino): ConsumerModificationProposal {
    const message = createBaseConsumerModificationProposal();
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
    if (object.min_stake !== undefined && object.min_stake !== null) {
      message.minStake = BigInt(object.min_stake);
    }
    if (object.allow_inactive_vals !== undefined && object.allow_inactive_vals !== null) {
      message.allowInactiveVals = object.allow_inactive_vals;
    }
    return message;
  },
  toAmino(message: ConsumerModificationProposal, useInterfaces: boolean = false): ConsumerModificationProposalAmino {
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
    obj.min_stake = message.minStake !== BigInt(0) ? message.minStake.toString() : undefined;
    obj.allow_inactive_vals = message.allowInactiveVals === false ? undefined : message.allowInactiveVals;
    return obj;
  },
  fromAminoMsg(object: ConsumerModificationProposalAminoMsg): ConsumerModificationProposal {
    return ConsumerModificationProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerModificationProposalProtoMsg, useInterfaces: boolean = false): ConsumerModificationProposal {
    return ConsumerModificationProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ConsumerModificationProposal): Uint8Array {
    return ConsumerModificationProposal.encode(message).finish();
  },
  toProtoMsg(message: ConsumerModificationProposal): ConsumerModificationProposalProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ConsumerModificationProposal",
      value: ConsumerModificationProposal.encode(message).finish()
    };
  }
};
function createBaseEquivocationProposal(): EquivocationProposal {
  return {
    title: "",
    description: "",
    equivocations: []
  };
}
export const EquivocationProposal = {
  typeUrl: "/interchain_security.ccv.provider.v1.EquivocationProposal",
  encode(message: EquivocationProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.equivocations) {
      Equivocation.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EquivocationProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEquivocationProposal();
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
          message.equivocations.push(Equivocation.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EquivocationProposal>): EquivocationProposal {
    const message = createBaseEquivocationProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.equivocations = object.equivocations?.map(e => Equivocation.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: EquivocationProposalAmino): EquivocationProposal {
    const message = createBaseEquivocationProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    message.equivocations = object.equivocations?.map(e => Equivocation.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: EquivocationProposal, useInterfaces: boolean = false): EquivocationProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    if (message.equivocations) {
      obj.equivocations = message.equivocations.map(e => e ? Equivocation.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.equivocations = message.equivocations;
    }
    return obj;
  },
  fromAminoMsg(object: EquivocationProposalAminoMsg): EquivocationProposal {
    return EquivocationProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: EquivocationProposalProtoMsg, useInterfaces: boolean = false): EquivocationProposal {
    return EquivocationProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EquivocationProposal): Uint8Array {
    return EquivocationProposal.encode(message).finish();
  },
  toProtoMsg(message: EquivocationProposal): EquivocationProposalProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.EquivocationProposal",
      value: EquivocationProposal.encode(message).finish()
    };
  }
};
function createBaseChangeRewardDenomsProposal(): ChangeRewardDenomsProposal {
  return {
    $typeUrl: "/interchain_security.ccv.provider.v1.ChangeRewardDenomsProposal",
    title: "",
    description: "",
    denomsToAdd: [],
    denomsToRemove: []
  };
}
export const ChangeRewardDenomsProposal = {
  typeUrl: "/interchain_security.ccv.provider.v1.ChangeRewardDenomsProposal",
  encode(message: ChangeRewardDenomsProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.denomsToAdd) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.denomsToRemove) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ChangeRewardDenomsProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangeRewardDenomsProposal();
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
          message.denomsToAdd.push(reader.string());
          break;
        case 4:
          message.denomsToRemove.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ChangeRewardDenomsProposal>): ChangeRewardDenomsProposal {
    const message = createBaseChangeRewardDenomsProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.denomsToAdd = object.denomsToAdd?.map(e => e) || [];
    message.denomsToRemove = object.denomsToRemove?.map(e => e) || [];
    return message;
  },
  fromAmino(object: ChangeRewardDenomsProposalAmino): ChangeRewardDenomsProposal {
    const message = createBaseChangeRewardDenomsProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    message.denomsToAdd = object.denoms_to_add?.map(e => e) || [];
    message.denomsToRemove = object.denoms_to_remove?.map(e => e) || [];
    return message;
  },
  toAmino(message: ChangeRewardDenomsProposal, useInterfaces: boolean = false): ChangeRewardDenomsProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
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
    return obj;
  },
  fromAminoMsg(object: ChangeRewardDenomsProposalAminoMsg): ChangeRewardDenomsProposal {
    return ChangeRewardDenomsProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: ChangeRewardDenomsProposalProtoMsg, useInterfaces: boolean = false): ChangeRewardDenomsProposal {
    return ChangeRewardDenomsProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ChangeRewardDenomsProposal): Uint8Array {
    return ChangeRewardDenomsProposal.encode(message).finish();
  },
  toProtoMsg(message: ChangeRewardDenomsProposal): ChangeRewardDenomsProposalProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ChangeRewardDenomsProposal",
      value: ChangeRewardDenomsProposal.encode(message).finish()
    };
  }
};
function createBaseGlobalSlashEntry(): GlobalSlashEntry {
  return {
    recvTime: new Date(),
    consumerChainId: "",
    ibcSeqNum: BigInt(0),
    providerValConsAddr: new Uint8Array()
  };
}
export const GlobalSlashEntry = {
  typeUrl: "/interchain_security.ccv.provider.v1.GlobalSlashEntry",
  encode(message: GlobalSlashEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.recvTime !== undefined) {
      Timestamp.encode(toTimestamp(message.recvTime), writer.uint32(10).fork()).ldelim();
    }
    if (message.consumerChainId !== "") {
      writer.uint32(18).string(message.consumerChainId);
    }
    if (message.ibcSeqNum !== BigInt(0)) {
      writer.uint32(24).uint64(message.ibcSeqNum);
    }
    if (message.providerValConsAddr.length !== 0) {
      writer.uint32(34).bytes(message.providerValConsAddr);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GlobalSlashEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGlobalSlashEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recvTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.consumerChainId = reader.string();
          break;
        case 3:
          message.ibcSeqNum = reader.uint64();
          break;
        case 4:
          message.providerValConsAddr = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GlobalSlashEntry>): GlobalSlashEntry {
    const message = createBaseGlobalSlashEntry();
    message.recvTime = object.recvTime ?? undefined;
    message.consumerChainId = object.consumerChainId ?? "";
    message.ibcSeqNum = object.ibcSeqNum !== undefined && object.ibcSeqNum !== null ? BigInt(object.ibcSeqNum.toString()) : BigInt(0);
    message.providerValConsAddr = object.providerValConsAddr ?? new Uint8Array();
    return message;
  },
  fromAmino(object: GlobalSlashEntryAmino): GlobalSlashEntry {
    const message = createBaseGlobalSlashEntry();
    if (object.recv_time !== undefined && object.recv_time !== null) {
      message.recvTime = fromTimestamp(Timestamp.fromAmino(object.recv_time));
    }
    if (object.consumer_chain_id !== undefined && object.consumer_chain_id !== null) {
      message.consumerChainId = object.consumer_chain_id;
    }
    if (object.ibc_seq_num !== undefined && object.ibc_seq_num !== null) {
      message.ibcSeqNum = BigInt(object.ibc_seq_num);
    }
    if (object.provider_val_cons_addr !== undefined && object.provider_val_cons_addr !== null) {
      message.providerValConsAddr = bytesFromBase64(object.provider_val_cons_addr);
    }
    return message;
  },
  toAmino(message: GlobalSlashEntry, useInterfaces: boolean = false): GlobalSlashEntryAmino {
    const obj: any = {};
    obj.recv_time = message.recvTime ? Timestamp.toAmino(toTimestamp(message.recvTime)) : undefined;
    obj.consumer_chain_id = message.consumerChainId === "" ? undefined : message.consumerChainId;
    obj.ibc_seq_num = message.ibcSeqNum !== BigInt(0) ? message.ibcSeqNum.toString() : undefined;
    obj.provider_val_cons_addr = message.providerValConsAddr ? base64FromBytes(message.providerValConsAddr) : undefined;
    return obj;
  },
  fromAminoMsg(object: GlobalSlashEntryAminoMsg): GlobalSlashEntry {
    return GlobalSlashEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: GlobalSlashEntryProtoMsg, useInterfaces: boolean = false): GlobalSlashEntry {
    return GlobalSlashEntry.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GlobalSlashEntry): Uint8Array {
    return GlobalSlashEntry.encode(message).finish();
  },
  toProtoMsg(message: GlobalSlashEntry): GlobalSlashEntryProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.GlobalSlashEntry",
      value: GlobalSlashEntry.encode(message).finish()
    };
  }
};
function createBaseParams(): Params {
  return {
    templateClient: undefined,
    trustingPeriodFraction: "",
    ccvTimeoutPeriod: Duration.fromPartial({}),
    slashMeterReplenishPeriod: Duration.fromPartial({}),
    slashMeterReplenishFraction: "",
    consumerRewardDenomRegistrationFee: Coin.fromPartial({}),
    blocksPerEpoch: BigInt(0),
    numberOfEpochsToStartReceivingRewards: BigInt(0),
    maxProviderConsensusValidators: BigInt(0)
  };
}
export const Params = {
  typeUrl: "/interchain_security.ccv.provider.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.templateClient !== undefined) {
      ClientState.encode(message.templateClient, writer.uint32(10).fork()).ldelim();
    }
    if (message.trustingPeriodFraction !== "") {
      writer.uint32(18).string(message.trustingPeriodFraction);
    }
    if (message.ccvTimeoutPeriod !== undefined) {
      Duration.encode(message.ccvTimeoutPeriod, writer.uint32(26).fork()).ldelim();
    }
    if (message.slashMeterReplenishPeriod !== undefined) {
      Duration.encode(message.slashMeterReplenishPeriod, writer.uint32(50).fork()).ldelim();
    }
    if (message.slashMeterReplenishFraction !== "") {
      writer.uint32(58).string(message.slashMeterReplenishFraction);
    }
    if (message.consumerRewardDenomRegistrationFee !== undefined) {
      Coin.encode(message.consumerRewardDenomRegistrationFee, writer.uint32(74).fork()).ldelim();
    }
    if (message.blocksPerEpoch !== BigInt(0)) {
      writer.uint32(80).int64(message.blocksPerEpoch);
    }
    if (message.numberOfEpochsToStartReceivingRewards !== BigInt(0)) {
      writer.uint32(88).int64(message.numberOfEpochsToStartReceivingRewards);
    }
    if (message.maxProviderConsensusValidators !== BigInt(0)) {
      writer.uint32(96).int64(message.maxProviderConsensusValidators);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.templateClient = ClientState.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.trustingPeriodFraction = reader.string();
          break;
        case 3:
          message.ccvTimeoutPeriod = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.slashMeterReplenishPeriod = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 7:
          message.slashMeterReplenishFraction = reader.string();
          break;
        case 9:
          message.consumerRewardDenomRegistrationFee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 10:
          message.blocksPerEpoch = reader.int64();
          break;
        case 11:
          message.numberOfEpochsToStartReceivingRewards = reader.int64();
          break;
        case 12:
          message.maxProviderConsensusValidators = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.templateClient = object.templateClient !== undefined && object.templateClient !== null ? ClientState.fromPartial(object.templateClient) : undefined;
    message.trustingPeriodFraction = object.trustingPeriodFraction ?? "";
    message.ccvTimeoutPeriod = object.ccvTimeoutPeriod !== undefined && object.ccvTimeoutPeriod !== null ? Duration.fromPartial(object.ccvTimeoutPeriod) : undefined;
    message.slashMeterReplenishPeriod = object.slashMeterReplenishPeriod !== undefined && object.slashMeterReplenishPeriod !== null ? Duration.fromPartial(object.slashMeterReplenishPeriod) : undefined;
    message.slashMeterReplenishFraction = object.slashMeterReplenishFraction ?? "";
    message.consumerRewardDenomRegistrationFee = object.consumerRewardDenomRegistrationFee !== undefined && object.consumerRewardDenomRegistrationFee !== null ? Coin.fromPartial(object.consumerRewardDenomRegistrationFee) : undefined;
    message.blocksPerEpoch = object.blocksPerEpoch !== undefined && object.blocksPerEpoch !== null ? BigInt(object.blocksPerEpoch.toString()) : BigInt(0);
    message.numberOfEpochsToStartReceivingRewards = object.numberOfEpochsToStartReceivingRewards !== undefined && object.numberOfEpochsToStartReceivingRewards !== null ? BigInt(object.numberOfEpochsToStartReceivingRewards.toString()) : BigInt(0);
    message.maxProviderConsensusValidators = object.maxProviderConsensusValidators !== undefined && object.maxProviderConsensusValidators !== null ? BigInt(object.maxProviderConsensusValidators.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.template_client !== undefined && object.template_client !== null) {
      message.templateClient = ClientState.fromAmino(object.template_client);
    }
    if (object.trusting_period_fraction !== undefined && object.trusting_period_fraction !== null) {
      message.trustingPeriodFraction = object.trusting_period_fraction;
    }
    if (object.ccv_timeout_period !== undefined && object.ccv_timeout_period !== null) {
      message.ccvTimeoutPeriod = Duration.fromAmino(object.ccv_timeout_period);
    }
    if (object.slash_meter_replenish_period !== undefined && object.slash_meter_replenish_period !== null) {
      message.slashMeterReplenishPeriod = Duration.fromAmino(object.slash_meter_replenish_period);
    }
    if (object.slash_meter_replenish_fraction !== undefined && object.slash_meter_replenish_fraction !== null) {
      message.slashMeterReplenishFraction = object.slash_meter_replenish_fraction;
    }
    if (object.consumer_reward_denom_registration_fee !== undefined && object.consumer_reward_denom_registration_fee !== null) {
      message.consumerRewardDenomRegistrationFee = Coin.fromAmino(object.consumer_reward_denom_registration_fee);
    }
    if (object.blocks_per_epoch !== undefined && object.blocks_per_epoch !== null) {
      message.blocksPerEpoch = BigInt(object.blocks_per_epoch);
    }
    if (object.number_of_epochs_to_start_receiving_rewards !== undefined && object.number_of_epochs_to_start_receiving_rewards !== null) {
      message.numberOfEpochsToStartReceivingRewards = BigInt(object.number_of_epochs_to_start_receiving_rewards);
    }
    if (object.max_provider_consensus_validators !== undefined && object.max_provider_consensus_validators !== null) {
      message.maxProviderConsensusValidators = BigInt(object.max_provider_consensus_validators);
    }
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.template_client = message.templateClient ? ClientState.toAmino(message.templateClient, useInterfaces) : undefined;
    obj.trusting_period_fraction = message.trustingPeriodFraction === "" ? undefined : message.trustingPeriodFraction;
    obj.ccv_timeout_period = message.ccvTimeoutPeriod ? Duration.toAmino(message.ccvTimeoutPeriod, useInterfaces) : undefined;
    obj.slash_meter_replenish_period = message.slashMeterReplenishPeriod ? Duration.toAmino(message.slashMeterReplenishPeriod, useInterfaces) : undefined;
    obj.slash_meter_replenish_fraction = message.slashMeterReplenishFraction === "" ? undefined : message.slashMeterReplenishFraction;
    obj.consumer_reward_denom_registration_fee = message.consumerRewardDenomRegistrationFee ? Coin.toAmino(message.consumerRewardDenomRegistrationFee, useInterfaces) : undefined;
    obj.blocks_per_epoch = message.blocksPerEpoch !== BigInt(0) ? message.blocksPerEpoch.toString() : undefined;
    obj.number_of_epochs_to_start_receiving_rewards = message.numberOfEpochsToStartReceivingRewards !== BigInt(0) ? message.numberOfEpochsToStartReceivingRewards.toString() : undefined;
    obj.max_provider_consensus_validators = message.maxProviderConsensusValidators !== BigInt(0) ? message.maxProviderConsensusValidators.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsProtoMsg, useInterfaces: boolean = false): Params {
    return Params.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseSlashAcks(): SlashAcks {
  return {
    addresses: []
  };
}
export const SlashAcks = {
  typeUrl: "/interchain_security.ccv.provider.v1.SlashAcks",
  encode(message: SlashAcks, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.addresses) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SlashAcks {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSlashAcks();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addresses.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SlashAcks>): SlashAcks {
    const message = createBaseSlashAcks();
    message.addresses = object.addresses?.map(e => e) || [];
    return message;
  },
  fromAmino(object: SlashAcksAmino): SlashAcks {
    const message = createBaseSlashAcks();
    message.addresses = object.addresses?.map(e => e) || [];
    return message;
  },
  toAmino(message: SlashAcks, useInterfaces: boolean = false): SlashAcksAmino {
    const obj: any = {};
    if (message.addresses) {
      obj.addresses = message.addresses.map(e => e);
    } else {
      obj.addresses = message.addresses;
    }
    return obj;
  },
  fromAminoMsg(object: SlashAcksAminoMsg): SlashAcks {
    return SlashAcks.fromAmino(object.value);
  },
  fromProtoMsg(message: SlashAcksProtoMsg, useInterfaces: boolean = false): SlashAcks {
    return SlashAcks.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SlashAcks): Uint8Array {
    return SlashAcks.encode(message).finish();
  },
  toProtoMsg(message: SlashAcks): SlashAcksProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.SlashAcks",
      value: SlashAcks.encode(message).finish()
    };
  }
};
function createBaseConsumerAdditionProposals(): ConsumerAdditionProposals {
  return {
    pending: []
  };
}
export const ConsumerAdditionProposals = {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerAdditionProposals",
  encode(message: ConsumerAdditionProposals, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.pending) {
      ConsumerAdditionProposal.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ConsumerAdditionProposals {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerAdditionProposals();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pending.push(ConsumerAdditionProposal.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerAdditionProposals>): ConsumerAdditionProposals {
    const message = createBaseConsumerAdditionProposals();
    message.pending = object.pending?.map(e => ConsumerAdditionProposal.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ConsumerAdditionProposalsAmino): ConsumerAdditionProposals {
    const message = createBaseConsumerAdditionProposals();
    message.pending = object.pending?.map(e => ConsumerAdditionProposal.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: ConsumerAdditionProposals, useInterfaces: boolean = false): ConsumerAdditionProposalsAmino {
    const obj: any = {};
    if (message.pending) {
      obj.pending = message.pending.map(e => e ? ConsumerAdditionProposal.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pending = message.pending;
    }
    return obj;
  },
  fromAminoMsg(object: ConsumerAdditionProposalsAminoMsg): ConsumerAdditionProposals {
    return ConsumerAdditionProposals.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerAdditionProposalsProtoMsg, useInterfaces: boolean = false): ConsumerAdditionProposals {
    return ConsumerAdditionProposals.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ConsumerAdditionProposals): Uint8Array {
    return ConsumerAdditionProposals.encode(message).finish();
  },
  toProtoMsg(message: ConsumerAdditionProposals): ConsumerAdditionProposalsProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ConsumerAdditionProposals",
      value: ConsumerAdditionProposals.encode(message).finish()
    };
  }
};
function createBaseConsumerRemovalProposals(): ConsumerRemovalProposals {
  return {
    pending: []
  };
}
export const ConsumerRemovalProposals = {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerRemovalProposals",
  encode(message: ConsumerRemovalProposals, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.pending) {
      ConsumerRemovalProposal.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ConsumerRemovalProposals {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerRemovalProposals();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pending.push(ConsumerRemovalProposal.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerRemovalProposals>): ConsumerRemovalProposals {
    const message = createBaseConsumerRemovalProposals();
    message.pending = object.pending?.map(e => ConsumerRemovalProposal.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ConsumerRemovalProposalsAmino): ConsumerRemovalProposals {
    const message = createBaseConsumerRemovalProposals();
    message.pending = object.pending?.map(e => ConsumerRemovalProposal.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: ConsumerRemovalProposals, useInterfaces: boolean = false): ConsumerRemovalProposalsAmino {
    const obj: any = {};
    if (message.pending) {
      obj.pending = message.pending.map(e => e ? ConsumerRemovalProposal.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pending = message.pending;
    }
    return obj;
  },
  fromAminoMsg(object: ConsumerRemovalProposalsAminoMsg): ConsumerRemovalProposals {
    return ConsumerRemovalProposals.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerRemovalProposalsProtoMsg, useInterfaces: boolean = false): ConsumerRemovalProposals {
    return ConsumerRemovalProposals.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ConsumerRemovalProposals): Uint8Array {
    return ConsumerRemovalProposals.encode(message).finish();
  },
  toProtoMsg(message: ConsumerRemovalProposals): ConsumerRemovalProposalsProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ConsumerRemovalProposals",
      value: ConsumerRemovalProposals.encode(message).finish()
    };
  }
};
function createBaseAddressList(): AddressList {
  return {
    addresses: []
  };
}
export const AddressList = {
  typeUrl: "/interchain_security.ccv.provider.v1.AddressList",
  encode(message: AddressList, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.addresses) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AddressList {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddressList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addresses.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AddressList>): AddressList {
    const message = createBaseAddressList();
    message.addresses = object.addresses?.map(e => e) || [];
    return message;
  },
  fromAmino(object: AddressListAmino): AddressList {
    const message = createBaseAddressList();
    message.addresses = object.addresses?.map(e => bytesFromBase64(e)) || [];
    return message;
  },
  toAmino(message: AddressList, useInterfaces: boolean = false): AddressListAmino {
    const obj: any = {};
    if (message.addresses) {
      obj.addresses = message.addresses.map(e => base64FromBytes(e));
    } else {
      obj.addresses = message.addresses;
    }
    return obj;
  },
  fromAminoMsg(object: AddressListAminoMsg): AddressList {
    return AddressList.fromAmino(object.value);
  },
  fromProtoMsg(message: AddressListProtoMsg, useInterfaces: boolean = false): AddressList {
    return AddressList.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AddressList): Uint8Array {
    return AddressList.encode(message).finish();
  },
  toProtoMsg(message: AddressList): AddressListProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.AddressList",
      value: AddressList.encode(message).finish()
    };
  }
};
function createBaseChannelToChain(): ChannelToChain {
  return {
    channelId: "",
    chainId: ""
  };
}
export const ChannelToChain = {
  typeUrl: "/interchain_security.ccv.provider.v1.ChannelToChain",
  encode(message: ChannelToChain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.channelId !== "") {
      writer.uint32(10).string(message.channelId);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ChannelToChain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelToChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channelId = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ChannelToChain>): ChannelToChain {
    const message = createBaseChannelToChain();
    message.channelId = object.channelId ?? "";
    message.chainId = object.chainId ?? "";
    return message;
  },
  fromAmino(object: ChannelToChainAmino): ChannelToChain {
    const message = createBaseChannelToChain();
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channelId = object.channel_id;
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    return message;
  },
  toAmino(message: ChannelToChain, useInterfaces: boolean = false): ChannelToChainAmino {
    const obj: any = {};
    obj.channel_id = message.channelId === "" ? undefined : message.channelId;
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    return obj;
  },
  fromAminoMsg(object: ChannelToChainAminoMsg): ChannelToChain {
    return ChannelToChain.fromAmino(object.value);
  },
  fromProtoMsg(message: ChannelToChainProtoMsg, useInterfaces: boolean = false): ChannelToChain {
    return ChannelToChain.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ChannelToChain): Uint8Array {
    return ChannelToChain.encode(message).finish();
  },
  toProtoMsg(message: ChannelToChain): ChannelToChainProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ChannelToChain",
      value: ChannelToChain.encode(message).finish()
    };
  }
};
function createBaseValidatorSetChangePackets(): ValidatorSetChangePackets {
  return {
    list: []
  };
}
export const ValidatorSetChangePackets = {
  typeUrl: "/interchain_security.ccv.provider.v1.ValidatorSetChangePackets",
  encode(message: ValidatorSetChangePackets, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.list) {
      ValidatorSetChangePacketData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ValidatorSetChangePackets {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorSetChangePackets();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.list.push(ValidatorSetChangePacketData.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ValidatorSetChangePackets>): ValidatorSetChangePackets {
    const message = createBaseValidatorSetChangePackets();
    message.list = object.list?.map(e => ValidatorSetChangePacketData.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ValidatorSetChangePacketsAmino): ValidatorSetChangePackets {
    const message = createBaseValidatorSetChangePackets();
    message.list = object.list?.map(e => ValidatorSetChangePacketData.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: ValidatorSetChangePackets, useInterfaces: boolean = false): ValidatorSetChangePacketsAmino {
    const obj: any = {};
    if (message.list) {
      obj.list = message.list.map(e => e ? ValidatorSetChangePacketData.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.list = message.list;
    }
    return obj;
  },
  fromAminoMsg(object: ValidatorSetChangePacketsAminoMsg): ValidatorSetChangePackets {
    return ValidatorSetChangePackets.fromAmino(object.value);
  },
  fromProtoMsg(message: ValidatorSetChangePacketsProtoMsg, useInterfaces: boolean = false): ValidatorSetChangePackets {
    return ValidatorSetChangePackets.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ValidatorSetChangePackets): Uint8Array {
    return ValidatorSetChangePackets.encode(message).finish();
  },
  toProtoMsg(message: ValidatorSetChangePackets): ValidatorSetChangePacketsProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ValidatorSetChangePackets",
      value: ValidatorSetChangePackets.encode(message).finish()
    };
  }
};
function createBaseKeyAssignmentReplacement(): KeyAssignmentReplacement {
  return {
    providerAddr: new Uint8Array(),
    prevCKey: undefined,
    power: BigInt(0)
  };
}
export const KeyAssignmentReplacement = {
  typeUrl: "/interchain_security.ccv.provider.v1.KeyAssignmentReplacement",
  encode(message: KeyAssignmentReplacement, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.providerAddr.length !== 0) {
      writer.uint32(10).bytes(message.providerAddr);
    }
    if (message.prevCKey !== undefined) {
      PublicKey.encode(message.prevCKey, writer.uint32(18).fork()).ldelim();
    }
    if (message.power !== BigInt(0)) {
      writer.uint32(24).int64(message.power);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): KeyAssignmentReplacement {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyAssignmentReplacement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.providerAddr = reader.bytes();
          break;
        case 2:
          message.prevCKey = PublicKey.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.power = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<KeyAssignmentReplacement>): KeyAssignmentReplacement {
    const message = createBaseKeyAssignmentReplacement();
    message.providerAddr = object.providerAddr ?? new Uint8Array();
    message.prevCKey = object.prevCKey !== undefined && object.prevCKey !== null ? PublicKey.fromPartial(object.prevCKey) : undefined;
    message.power = object.power !== undefined && object.power !== null ? BigInt(object.power.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: KeyAssignmentReplacementAmino): KeyAssignmentReplacement {
    const message = createBaseKeyAssignmentReplacement();
    if (object.provider_addr !== undefined && object.provider_addr !== null) {
      message.providerAddr = bytesFromBase64(object.provider_addr);
    }
    if (object.prev_c_key !== undefined && object.prev_c_key !== null) {
      message.prevCKey = PublicKey.fromAmino(object.prev_c_key);
    }
    if (object.power !== undefined && object.power !== null) {
      message.power = BigInt(object.power);
    }
    return message;
  },
  toAmino(message: KeyAssignmentReplacement, useInterfaces: boolean = false): KeyAssignmentReplacementAmino {
    const obj: any = {};
    obj.provider_addr = message.providerAddr ? base64FromBytes(message.providerAddr) : undefined;
    obj.prev_c_key = message.prevCKey ? PublicKey.toAmino(message.prevCKey, useInterfaces) : undefined;
    obj.power = message.power !== BigInt(0) ? message.power.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: KeyAssignmentReplacementAminoMsg): KeyAssignmentReplacement {
    return KeyAssignmentReplacement.fromAmino(object.value);
  },
  fromProtoMsg(message: KeyAssignmentReplacementProtoMsg, useInterfaces: boolean = false): KeyAssignmentReplacement {
    return KeyAssignmentReplacement.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: KeyAssignmentReplacement): Uint8Array {
    return KeyAssignmentReplacement.encode(message).finish();
  },
  toProtoMsg(message: KeyAssignmentReplacement): KeyAssignmentReplacementProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.KeyAssignmentReplacement",
      value: KeyAssignmentReplacement.encode(message).finish()
    };
  }
};
function createBaseValidatorConsumerPubKey(): ValidatorConsumerPubKey {
  return {
    chainId: "",
    providerAddr: new Uint8Array(),
    consumerKey: undefined
  };
}
export const ValidatorConsumerPubKey = {
  typeUrl: "/interchain_security.ccv.provider.v1.ValidatorConsumerPubKey",
  encode(message: ValidatorConsumerPubKey, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.providerAddr.length !== 0) {
      writer.uint32(18).bytes(message.providerAddr);
    }
    if (message.consumerKey !== undefined) {
      PublicKey.encode(message.consumerKey, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ValidatorConsumerPubKey {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorConsumerPubKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.providerAddr = reader.bytes();
          break;
        case 3:
          message.consumerKey = PublicKey.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ValidatorConsumerPubKey>): ValidatorConsumerPubKey {
    const message = createBaseValidatorConsumerPubKey();
    message.chainId = object.chainId ?? "";
    message.providerAddr = object.providerAddr ?? new Uint8Array();
    message.consumerKey = object.consumerKey !== undefined && object.consumerKey !== null ? PublicKey.fromPartial(object.consumerKey) : undefined;
    return message;
  },
  fromAmino(object: ValidatorConsumerPubKeyAmino): ValidatorConsumerPubKey {
    const message = createBaseValidatorConsumerPubKey();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.provider_addr !== undefined && object.provider_addr !== null) {
      message.providerAddr = bytesFromBase64(object.provider_addr);
    }
    if (object.consumer_key !== undefined && object.consumer_key !== null) {
      message.consumerKey = PublicKey.fromAmino(object.consumer_key);
    }
    return message;
  },
  toAmino(message: ValidatorConsumerPubKey, useInterfaces: boolean = false): ValidatorConsumerPubKeyAmino {
    const obj: any = {};
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.provider_addr = message.providerAddr ? base64FromBytes(message.providerAddr) : undefined;
    obj.consumer_key = message.consumerKey ? PublicKey.toAmino(message.consumerKey, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ValidatorConsumerPubKeyAminoMsg): ValidatorConsumerPubKey {
    return ValidatorConsumerPubKey.fromAmino(object.value);
  },
  fromProtoMsg(message: ValidatorConsumerPubKeyProtoMsg, useInterfaces: boolean = false): ValidatorConsumerPubKey {
    return ValidatorConsumerPubKey.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ValidatorConsumerPubKey): Uint8Array {
    return ValidatorConsumerPubKey.encode(message).finish();
  },
  toProtoMsg(message: ValidatorConsumerPubKey): ValidatorConsumerPubKeyProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ValidatorConsumerPubKey",
      value: ValidatorConsumerPubKey.encode(message).finish()
    };
  }
};
function createBaseValidatorByConsumerAddr(): ValidatorByConsumerAddr {
  return {
    chainId: "",
    consumerAddr: new Uint8Array(),
    providerAddr: new Uint8Array()
  };
}
export const ValidatorByConsumerAddr = {
  typeUrl: "/interchain_security.ccv.provider.v1.ValidatorByConsumerAddr",
  encode(message: ValidatorByConsumerAddr, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.consumerAddr.length !== 0) {
      writer.uint32(18).bytes(message.consumerAddr);
    }
    if (message.providerAddr.length !== 0) {
      writer.uint32(26).bytes(message.providerAddr);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ValidatorByConsumerAddr {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorByConsumerAddr();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.consumerAddr = reader.bytes();
          break;
        case 3:
          message.providerAddr = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ValidatorByConsumerAddr>): ValidatorByConsumerAddr {
    const message = createBaseValidatorByConsumerAddr();
    message.chainId = object.chainId ?? "";
    message.consumerAddr = object.consumerAddr ?? new Uint8Array();
    message.providerAddr = object.providerAddr ?? new Uint8Array();
    return message;
  },
  fromAmino(object: ValidatorByConsumerAddrAmino): ValidatorByConsumerAddr {
    const message = createBaseValidatorByConsumerAddr();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.consumer_addr !== undefined && object.consumer_addr !== null) {
      message.consumerAddr = bytesFromBase64(object.consumer_addr);
    }
    if (object.provider_addr !== undefined && object.provider_addr !== null) {
      message.providerAddr = bytesFromBase64(object.provider_addr);
    }
    return message;
  },
  toAmino(message: ValidatorByConsumerAddr, useInterfaces: boolean = false): ValidatorByConsumerAddrAmino {
    const obj: any = {};
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.consumer_addr = message.consumerAddr ? base64FromBytes(message.consumerAddr) : undefined;
    obj.provider_addr = message.providerAddr ? base64FromBytes(message.providerAddr) : undefined;
    return obj;
  },
  fromAminoMsg(object: ValidatorByConsumerAddrAminoMsg): ValidatorByConsumerAddr {
    return ValidatorByConsumerAddr.fromAmino(object.value);
  },
  fromProtoMsg(message: ValidatorByConsumerAddrProtoMsg, useInterfaces: boolean = false): ValidatorByConsumerAddr {
    return ValidatorByConsumerAddr.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ValidatorByConsumerAddr): Uint8Array {
    return ValidatorByConsumerAddr.encode(message).finish();
  },
  toProtoMsg(message: ValidatorByConsumerAddr): ValidatorByConsumerAddrProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ValidatorByConsumerAddr",
      value: ValidatorByConsumerAddr.encode(message).finish()
    };
  }
};
function createBaseConsumerAddrsToPruneV2(): ConsumerAddrsToPruneV2 {
  return {
    chainId: "",
    pruneTs: new Date(),
    consumerAddrs: undefined
  };
}
export const ConsumerAddrsToPruneV2 = {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerAddrsToPruneV2",
  encode(message: ConsumerAddrsToPruneV2, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.pruneTs !== undefined) {
      Timestamp.encode(toTimestamp(message.pruneTs), writer.uint32(18).fork()).ldelim();
    }
    if (message.consumerAddrs !== undefined) {
      AddressList.encode(message.consumerAddrs, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ConsumerAddrsToPruneV2 {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerAddrsToPruneV2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.pruneTs = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.consumerAddrs = AddressList.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerAddrsToPruneV2>): ConsumerAddrsToPruneV2 {
    const message = createBaseConsumerAddrsToPruneV2();
    message.chainId = object.chainId ?? "";
    message.pruneTs = object.pruneTs ?? undefined;
    message.consumerAddrs = object.consumerAddrs !== undefined && object.consumerAddrs !== null ? AddressList.fromPartial(object.consumerAddrs) : undefined;
    return message;
  },
  fromAmino(object: ConsumerAddrsToPruneV2Amino): ConsumerAddrsToPruneV2 {
    const message = createBaseConsumerAddrsToPruneV2();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.prune_ts !== undefined && object.prune_ts !== null) {
      message.pruneTs = fromTimestamp(Timestamp.fromAmino(object.prune_ts));
    }
    if (object.consumer_addrs !== undefined && object.consumer_addrs !== null) {
      message.consumerAddrs = AddressList.fromAmino(object.consumer_addrs);
    }
    return message;
  },
  toAmino(message: ConsumerAddrsToPruneV2, useInterfaces: boolean = false): ConsumerAddrsToPruneV2Amino {
    const obj: any = {};
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.prune_ts = message.pruneTs ? Timestamp.toAmino(toTimestamp(message.pruneTs)) : undefined;
    obj.consumer_addrs = message.consumerAddrs ? AddressList.toAmino(message.consumerAddrs, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ConsumerAddrsToPruneV2AminoMsg): ConsumerAddrsToPruneV2 {
    return ConsumerAddrsToPruneV2.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerAddrsToPruneV2ProtoMsg, useInterfaces: boolean = false): ConsumerAddrsToPruneV2 {
    return ConsumerAddrsToPruneV2.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ConsumerAddrsToPruneV2): Uint8Array {
    return ConsumerAddrsToPruneV2.encode(message).finish();
  },
  toProtoMsg(message: ConsumerAddrsToPruneV2): ConsumerAddrsToPruneV2ProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ConsumerAddrsToPruneV2",
      value: ConsumerAddrsToPruneV2.encode(message).finish()
    };
  }
};
function createBaseConsensusValidator(): ConsensusValidator {
  return {
    providerConsAddr: new Uint8Array(),
    power: BigInt(0),
    publicKey: undefined,
    joinHeight: BigInt(0)
  };
}
export const ConsensusValidator = {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsensusValidator",
  encode(message: ConsensusValidator, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.providerConsAddr.length !== 0) {
      writer.uint32(10).bytes(message.providerConsAddr);
    }
    if (message.power !== BigInt(0)) {
      writer.uint32(16).int64(message.power);
    }
    if (message.publicKey !== undefined) {
      PublicKey.encode(message.publicKey, writer.uint32(26).fork()).ldelim();
    }
    if (message.joinHeight !== BigInt(0)) {
      writer.uint32(32).int64(message.joinHeight);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ConsensusValidator {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsensusValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.providerConsAddr = reader.bytes();
          break;
        case 2:
          message.power = reader.int64();
          break;
        case 3:
          message.publicKey = PublicKey.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.joinHeight = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsensusValidator>): ConsensusValidator {
    const message = createBaseConsensusValidator();
    message.providerConsAddr = object.providerConsAddr ?? new Uint8Array();
    message.power = object.power !== undefined && object.power !== null ? BigInt(object.power.toString()) : BigInt(0);
    message.publicKey = object.publicKey !== undefined && object.publicKey !== null ? PublicKey.fromPartial(object.publicKey) : undefined;
    message.joinHeight = object.joinHeight !== undefined && object.joinHeight !== null ? BigInt(object.joinHeight.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ConsensusValidatorAmino): ConsensusValidator {
    const message = createBaseConsensusValidator();
    if (object.provider_cons_addr !== undefined && object.provider_cons_addr !== null) {
      message.providerConsAddr = bytesFromBase64(object.provider_cons_addr);
    }
    if (object.power !== undefined && object.power !== null) {
      message.power = BigInt(object.power);
    }
    if (object.public_key !== undefined && object.public_key !== null) {
      message.publicKey = PublicKey.fromAmino(object.public_key);
    }
    if (object.join_height !== undefined && object.join_height !== null) {
      message.joinHeight = BigInt(object.join_height);
    }
    return message;
  },
  toAmino(message: ConsensusValidator, useInterfaces: boolean = false): ConsensusValidatorAmino {
    const obj: any = {};
    obj.provider_cons_addr = message.providerConsAddr ? base64FromBytes(message.providerConsAddr) : undefined;
    obj.power = message.power !== BigInt(0) ? message.power.toString() : undefined;
    obj.public_key = message.publicKey ? PublicKey.toAmino(message.publicKey, useInterfaces) : undefined;
    obj.join_height = message.joinHeight !== BigInt(0) ? message.joinHeight.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ConsensusValidatorAminoMsg): ConsensusValidator {
    return ConsensusValidator.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsensusValidatorProtoMsg, useInterfaces: boolean = false): ConsensusValidator {
    return ConsensusValidator.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ConsensusValidator): Uint8Array {
    return ConsensusValidator.encode(message).finish();
  },
  toProtoMsg(message: ConsensusValidator): ConsensusValidatorProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ConsensusValidator",
      value: ConsensusValidator.encode(message).finish()
    };
  }
};
function createBaseConsumerRewardsAllocation(): ConsumerRewardsAllocation {
  return {
    rewards: []
  };
}
export const ConsumerRewardsAllocation = {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerRewardsAllocation",
  encode(message: ConsumerRewardsAllocation, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.rewards) {
      DecCoin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ConsumerRewardsAllocation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerRewardsAllocation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rewards.push(DecCoin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerRewardsAllocation>): ConsumerRewardsAllocation {
    const message = createBaseConsumerRewardsAllocation();
    message.rewards = object.rewards?.map(e => DecCoin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ConsumerRewardsAllocationAmino): ConsumerRewardsAllocation {
    const message = createBaseConsumerRewardsAllocation();
    message.rewards = object.rewards?.map(e => DecCoin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: ConsumerRewardsAllocation, useInterfaces: boolean = false): ConsumerRewardsAllocationAmino {
    const obj: any = {};
    if (message.rewards) {
      obj.rewards = message.rewards.map(e => e ? DecCoin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.rewards = message.rewards;
    }
    return obj;
  },
  fromAminoMsg(object: ConsumerRewardsAllocationAminoMsg): ConsumerRewardsAllocation {
    return ConsumerRewardsAllocation.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerRewardsAllocationProtoMsg, useInterfaces: boolean = false): ConsumerRewardsAllocation {
    return ConsumerRewardsAllocation.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ConsumerRewardsAllocation): Uint8Array {
    return ConsumerRewardsAllocation.encode(message).finish();
  },
  toProtoMsg(message: ConsumerRewardsAllocation): ConsumerRewardsAllocationProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ConsumerRewardsAllocation",
      value: ConsumerRewardsAllocation.encode(message).finish()
    };
  }
};
function createBaseConsumerMetadata(): ConsumerMetadata {
  return {
    name: "",
    description: "",
    metadata: ""
  };
}
export const ConsumerMetadata = {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerMetadata",
  encode(message: ConsumerMetadata, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ConsumerMetadata {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.metadata = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerMetadata>): ConsumerMetadata {
    const message = createBaseConsumerMetadata();
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.metadata = object.metadata ?? "";
    return message;
  },
  fromAmino(object: ConsumerMetadataAmino): ConsumerMetadata {
    const message = createBaseConsumerMetadata();
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    }
    return message;
  },
  toAmino(message: ConsumerMetadata, useInterfaces: boolean = false): ConsumerMetadataAmino {
    const obj: any = {};
    obj.name = message.name === "" ? undefined : message.name;
    obj.description = message.description === "" ? undefined : message.description;
    obj.metadata = message.metadata === "" ? undefined : message.metadata;
    return obj;
  },
  fromAminoMsg(object: ConsumerMetadataAminoMsg): ConsumerMetadata {
    return ConsumerMetadata.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerMetadataProtoMsg, useInterfaces: boolean = false): ConsumerMetadata {
    return ConsumerMetadata.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ConsumerMetadata): Uint8Array {
    return ConsumerMetadata.encode(message).finish();
  },
  toProtoMsg(message: ConsumerMetadata): ConsumerMetadataProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ConsumerMetadata",
      value: ConsumerMetadata.encode(message).finish()
    };
  }
};
function createBaseConsumerInitializationParameters(): ConsumerInitializationParameters {
  return {
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
    distributionTransmissionChannel: ""
  };
}
export const ConsumerInitializationParameters = {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerInitializationParameters",
  encode(message: ConsumerInitializationParameters, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.initialHeight !== undefined) {
      Height.encode(message.initialHeight, writer.uint32(10).fork()).ldelim();
    }
    if (message.genesisHash.length !== 0) {
      writer.uint32(18).bytes(message.genesisHash);
    }
    if (message.binaryHash.length !== 0) {
      writer.uint32(26).bytes(message.binaryHash);
    }
    if (message.spawnTime !== undefined) {
      Timestamp.encode(toTimestamp(message.spawnTime), writer.uint32(34).fork()).ldelim();
    }
    if (message.unbondingPeriod !== undefined) {
      Duration.encode(message.unbondingPeriod, writer.uint32(42).fork()).ldelim();
    }
    if (message.ccvTimeoutPeriod !== undefined) {
      Duration.encode(message.ccvTimeoutPeriod, writer.uint32(50).fork()).ldelim();
    }
    if (message.transferTimeoutPeriod !== undefined) {
      Duration.encode(message.transferTimeoutPeriod, writer.uint32(58).fork()).ldelim();
    }
    if (message.consumerRedistributionFraction !== "") {
      writer.uint32(66).string(message.consumerRedistributionFraction);
    }
    if (message.blocksPerDistributionTransmission !== BigInt(0)) {
      writer.uint32(72).int64(message.blocksPerDistributionTransmission);
    }
    if (message.historicalEntries !== BigInt(0)) {
      writer.uint32(80).int64(message.historicalEntries);
    }
    if (message.distributionTransmissionChannel !== "") {
      writer.uint32(90).string(message.distributionTransmissionChannel);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ConsumerInitializationParameters {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerInitializationParameters();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.initialHeight = Height.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.genesisHash = reader.bytes();
          break;
        case 3:
          message.binaryHash = reader.bytes();
          break;
        case 4:
          message.spawnTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 5:
          message.unbondingPeriod = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.ccvTimeoutPeriod = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 7:
          message.transferTimeoutPeriod = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 8:
          message.consumerRedistributionFraction = reader.string();
          break;
        case 9:
          message.blocksPerDistributionTransmission = reader.int64();
          break;
        case 10:
          message.historicalEntries = reader.int64();
          break;
        case 11:
          message.distributionTransmissionChannel = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerInitializationParameters>): ConsumerInitializationParameters {
    const message = createBaseConsumerInitializationParameters();
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
    return message;
  },
  fromAmino(object: ConsumerInitializationParametersAmino): ConsumerInitializationParameters {
    const message = createBaseConsumerInitializationParameters();
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
    return message;
  },
  toAmino(message: ConsumerInitializationParameters, useInterfaces: boolean = false): ConsumerInitializationParametersAmino {
    const obj: any = {};
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
    return obj;
  },
  fromAminoMsg(object: ConsumerInitializationParametersAminoMsg): ConsumerInitializationParameters {
    return ConsumerInitializationParameters.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerInitializationParametersProtoMsg, useInterfaces: boolean = false): ConsumerInitializationParameters {
    return ConsumerInitializationParameters.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ConsumerInitializationParameters): Uint8Array {
    return ConsumerInitializationParameters.encode(message).finish();
  },
  toProtoMsg(message: ConsumerInitializationParameters): ConsumerInitializationParametersProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ConsumerInitializationParameters",
      value: ConsumerInitializationParameters.encode(message).finish()
    };
  }
};
function createBasePowerShapingParameters(): PowerShapingParameters {
  return {
    topN: 0,
    validatorsPowerCap: 0,
    validatorSetCap: 0,
    allowlist: [],
    denylist: [],
    minStake: BigInt(0),
    allowInactiveVals: false,
    prioritylist: []
  };
}
export const PowerShapingParameters = {
  typeUrl: "/interchain_security.ccv.provider.v1.PowerShapingParameters",
  encode(message: PowerShapingParameters, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.topN !== 0) {
      writer.uint32(8).uint32(message.topN);
    }
    if (message.validatorsPowerCap !== 0) {
      writer.uint32(16).uint32(message.validatorsPowerCap);
    }
    if (message.validatorSetCap !== 0) {
      writer.uint32(24).uint32(message.validatorSetCap);
    }
    for (const v of message.allowlist) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.denylist) {
      writer.uint32(42).string(v!);
    }
    if (message.minStake !== BigInt(0)) {
      writer.uint32(48).uint64(message.minStake);
    }
    if (message.allowInactiveVals === true) {
      writer.uint32(56).bool(message.allowInactiveVals);
    }
    for (const v of message.prioritylist) {
      writer.uint32(66).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PowerShapingParameters {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePowerShapingParameters();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.topN = reader.uint32();
          break;
        case 2:
          message.validatorsPowerCap = reader.uint32();
          break;
        case 3:
          message.validatorSetCap = reader.uint32();
          break;
        case 4:
          message.allowlist.push(reader.string());
          break;
        case 5:
          message.denylist.push(reader.string());
          break;
        case 6:
          message.minStake = reader.uint64();
          break;
        case 7:
          message.allowInactiveVals = reader.bool();
          break;
        case 8:
          message.prioritylist.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PowerShapingParameters>): PowerShapingParameters {
    const message = createBasePowerShapingParameters();
    message.topN = object.topN ?? 0;
    message.validatorsPowerCap = object.validatorsPowerCap ?? 0;
    message.validatorSetCap = object.validatorSetCap ?? 0;
    message.allowlist = object.allowlist?.map(e => e) || [];
    message.denylist = object.denylist?.map(e => e) || [];
    message.minStake = object.minStake !== undefined && object.minStake !== null ? BigInt(object.minStake.toString()) : BigInt(0);
    message.allowInactiveVals = object.allowInactiveVals ?? false;
    message.prioritylist = object.prioritylist?.map(e => e) || [];
    return message;
  },
  fromAmino(object: PowerShapingParametersAmino): PowerShapingParameters {
    const message = createBasePowerShapingParameters();
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
    if (object.min_stake !== undefined && object.min_stake !== null) {
      message.minStake = BigInt(object.min_stake);
    }
    if (object.allow_inactive_vals !== undefined && object.allow_inactive_vals !== null) {
      message.allowInactiveVals = object.allow_inactive_vals;
    }
    message.prioritylist = object.prioritylist?.map(e => e) || [];
    return message;
  },
  toAmino(message: PowerShapingParameters, useInterfaces: boolean = false): PowerShapingParametersAmino {
    const obj: any = {};
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
    obj.min_stake = message.minStake !== BigInt(0) ? message.minStake.toString() : undefined;
    obj.allow_inactive_vals = message.allowInactiveVals === false ? undefined : message.allowInactiveVals;
    if (message.prioritylist) {
      obj.prioritylist = message.prioritylist.map(e => e);
    } else {
      obj.prioritylist = message.prioritylist;
    }
    return obj;
  },
  fromAminoMsg(object: PowerShapingParametersAminoMsg): PowerShapingParameters {
    return PowerShapingParameters.fromAmino(object.value);
  },
  fromProtoMsg(message: PowerShapingParametersProtoMsg, useInterfaces: boolean = false): PowerShapingParameters {
    return PowerShapingParameters.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PowerShapingParameters): Uint8Array {
    return PowerShapingParameters.encode(message).finish();
  },
  toProtoMsg(message: PowerShapingParameters): PowerShapingParametersProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.PowerShapingParameters",
      value: PowerShapingParameters.encode(message).finish()
    };
  }
};
function createBaseConsumerIds(): ConsumerIds {
  return {
    ids: []
  };
}
export const ConsumerIds = {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerIds",
  encode(message: ConsumerIds, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ConsumerIds {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerIds();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerIds>): ConsumerIds {
    const message = createBaseConsumerIds();
    message.ids = object.ids?.map(e => e) || [];
    return message;
  },
  fromAmino(object: ConsumerIdsAmino): ConsumerIds {
    const message = createBaseConsumerIds();
    message.ids = object.ids?.map(e => e) || [];
    return message;
  },
  toAmino(message: ConsumerIds, useInterfaces: boolean = false): ConsumerIdsAmino {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map(e => e);
    } else {
      obj.ids = message.ids;
    }
    return obj;
  },
  fromAminoMsg(object: ConsumerIdsAminoMsg): ConsumerIds {
    return ConsumerIds.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerIdsProtoMsg, useInterfaces: boolean = false): ConsumerIds {
    return ConsumerIds.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ConsumerIds): Uint8Array {
    return ConsumerIds.encode(message).finish();
  },
  toProtoMsg(message: ConsumerIds): ConsumerIdsProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ConsumerIds",
      value: ConsumerIds.encode(message).finish()
    };
  }
};
function createBaseAllowlistedRewardDenoms(): AllowlistedRewardDenoms {
  return {
    denoms: []
  };
}
export const AllowlistedRewardDenoms = {
  typeUrl: "/interchain_security.ccv.provider.v1.AllowlistedRewardDenoms",
  encode(message: AllowlistedRewardDenoms, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.denoms) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllowlistedRewardDenoms {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllowlistedRewardDenoms();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denoms.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AllowlistedRewardDenoms>): AllowlistedRewardDenoms {
    const message = createBaseAllowlistedRewardDenoms();
    message.denoms = object.denoms?.map(e => e) || [];
    return message;
  },
  fromAmino(object: AllowlistedRewardDenomsAmino): AllowlistedRewardDenoms {
    const message = createBaseAllowlistedRewardDenoms();
    message.denoms = object.denoms?.map(e => e) || [];
    return message;
  },
  toAmino(message: AllowlistedRewardDenoms, useInterfaces: boolean = false): AllowlistedRewardDenomsAmino {
    const obj: any = {};
    if (message.denoms) {
      obj.denoms = message.denoms.map(e => e);
    } else {
      obj.denoms = message.denoms;
    }
    return obj;
  },
  fromAminoMsg(object: AllowlistedRewardDenomsAminoMsg): AllowlistedRewardDenoms {
    return AllowlistedRewardDenoms.fromAmino(object.value);
  },
  fromProtoMsg(message: AllowlistedRewardDenomsProtoMsg, useInterfaces: boolean = false): AllowlistedRewardDenoms {
    return AllowlistedRewardDenoms.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllowlistedRewardDenoms): Uint8Array {
    return AllowlistedRewardDenoms.encode(message).finish();
  },
  toProtoMsg(message: AllowlistedRewardDenoms): AllowlistedRewardDenomsProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.AllowlistedRewardDenoms",
      value: AllowlistedRewardDenoms.encode(message).finish()
    };
  }
};