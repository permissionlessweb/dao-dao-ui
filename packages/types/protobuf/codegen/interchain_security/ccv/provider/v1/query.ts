//@ts-nocheck
import { ConsumerPhase, ConsumerMetadata, ConsumerMetadataAmino, ConsumerMetadataSDKType, AllowlistedRewardDenoms, AllowlistedRewardDenomsAmino, AllowlistedRewardDenomsSDKType, Params, ParamsAmino, ParamsSDKType, ConsumerInitializationParameters, ConsumerInitializationParametersAmino, ConsumerInitializationParametersSDKType, PowerShapingParameters, PowerShapingParametersAmino, PowerShapingParametersSDKType } from "./provider";
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../../cosmos/base/query/v1beta1/pagination";
import { ConsumerGenesisState, ConsumerGenesisStateAmino, ConsumerGenesisStateSDKType } from "../../v1/shared_consumer";
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { PublicKey, PublicKeyAmino, PublicKeySDKType } from "../../../../tendermint/crypto/keys";
import { Description, DescriptionAmino, DescriptionSDKType, BondStatus } from "../../../../cosmos/staking/v1beta1/staking";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { toTimestamp, fromTimestamp } from "../../../../helpers";
import { Decimal } from "@cosmjs/math";
export interface QueryConsumerGenesisRequest {
  consumerId: string;
}
export interface QueryConsumerGenesisRequestProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerGenesisRequest";
  value: Uint8Array;
}
export interface QueryConsumerGenesisRequestAmino {
  consumer_id?: string;
}
export interface QueryConsumerGenesisRequestAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryConsumerGenesisRequest";
  value: QueryConsumerGenesisRequestAmino;
}
export interface QueryConsumerGenesisRequestSDKType {
  consumer_id: string;
}
export interface QueryConsumerGenesisResponse {
  genesisState: ConsumerGenesisState | undefined;
}
export interface QueryConsumerGenesisResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerGenesisResponse";
  value: Uint8Array;
}
export interface QueryConsumerGenesisResponseAmino {
  genesis_state?: ConsumerGenesisStateAmino | undefined;
}
export interface QueryConsumerGenesisResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryConsumerGenesisResponse";
  value: QueryConsumerGenesisResponseAmino;
}
export interface QueryConsumerGenesisResponseSDKType {
  genesis_state: ConsumerGenesisStateSDKType | undefined;
}
export interface QueryConsumerChainsRequest {
  /**
   * The phase of the consumer chains returned (optional)
   * Registered=1|Initialized=2|Launched=3|Stopped=4|Deleted=5
   */
  phase: ConsumerPhase;
  pagination?: PageRequest | undefined;
}
export interface QueryConsumerChainsRequestProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainsRequest";
  value: Uint8Array;
}
export interface QueryConsumerChainsRequestAmino {
  /**
   * The phase of the consumer chains returned (optional)
   * Registered=1|Initialized=2|Launched=3|Stopped=4|Deleted=5
   */
  phase?: ConsumerPhase;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryConsumerChainsRequestAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryConsumerChainsRequest";
  value: QueryConsumerChainsRequestAmino;
}
export interface QueryConsumerChainsRequestSDKType {
  phase: ConsumerPhase;
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryConsumerChainsResponse {
  chains: Chain[];
  pagination?: PageResponse | undefined;
}
export interface QueryConsumerChainsResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainsResponse";
  value: Uint8Array;
}
export interface QueryConsumerChainsResponseAmino {
  chains?: ChainAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryConsumerChainsResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryConsumerChainsResponse";
  value: QueryConsumerChainsResponseAmino;
}
export interface QueryConsumerChainsResponseSDKType {
  chains: ChainSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface Chain {
  chainId: string;
  clientId: string;
  topN: number;
  /**
   * If the chain is a Top-N chain, this is the minimum power required to be in the top N.
   * Otherwise, this is -1.
   */
  minPowerInTopN: bigint;
  /** Corresponds to the maximum power (percentage-wise) a validator can have on the consumer chain. */
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
  /** The phase the consumer chain */
  phase: string;
  /** The metadata of the consumer chain */
  metadata: ConsumerMetadata | undefined;
  /** Corresponds to the minimal amount of (provider chain) stake required to validate on the consumer chain. */
  minStake: bigint;
  /** Corresponds to whether inactive validators are allowed to validate the consumer chain. */
  allowInactiveVals: boolean;
  consumerId: string;
  /** the reward denoms allowlisted by this consumer chain */
  allowlistedRewardDenoms?: AllowlistedRewardDenoms | undefined;
  /**
   * Corresponds to a list of provider consensus addresses of validators that should have PRIORITY to validate on the consumer chain,
   * meaning as long as they are eligible/opted in to validate on the consumer chain, the validator set will be
   * filled with these validators first, and other validators will be added to the validator set only if there are
   * not enough eligible priority validators.
   */
  prioritylist: string[];
}
export interface ChainProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.Chain";
  value: Uint8Array;
}
export interface ChainAmino {
  chain_id?: string;
  client_id?: string;
  top_N?: number;
  /**
   * If the chain is a Top-N chain, this is the minimum power required to be in the top N.
   * Otherwise, this is -1.
   */
  min_power_in_top_N?: string;
  /** Corresponds to the maximum power (percentage-wise) a validator can have on the consumer chain. */
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
  /** The phase the consumer chain */
  phase?: string;
  /** The metadata of the consumer chain */
  metadata?: ConsumerMetadataAmino | undefined;
  /** Corresponds to the minimal amount of (provider chain) stake required to validate on the consumer chain. */
  min_stake?: string;
  /** Corresponds to whether inactive validators are allowed to validate the consumer chain. */
  allow_inactive_vals?: boolean;
  consumer_id?: string;
  /** the reward denoms allowlisted by this consumer chain */
  allowlisted_reward_denoms?: AllowlistedRewardDenomsAmino | undefined;
  /**
   * Corresponds to a list of provider consensus addresses of validators that should have PRIORITY to validate on the consumer chain,
   * meaning as long as they are eligible/opted in to validate on the consumer chain, the validator set will be
   * filled with these validators first, and other validators will be added to the validator set only if there are
   * not enough eligible priority validators.
   */
  prioritylist?: string[];
}
export interface ChainAminoMsg {
  type: "/interchain_security.ccv.provider.v1.Chain";
  value: ChainAmino;
}
export interface ChainSDKType {
  chain_id: string;
  client_id: string;
  top_N: number;
  min_power_in_top_N: bigint;
  validators_power_cap: number;
  validator_set_cap: number;
  allowlist: string[];
  denylist: string[];
  phase: string;
  metadata: ConsumerMetadataSDKType | undefined;
  min_stake: bigint;
  allow_inactive_vals: boolean;
  consumer_id: string;
  allowlisted_reward_denoms?: AllowlistedRewardDenomsSDKType | undefined;
  prioritylist: string[];
}
export interface QueryValidatorConsumerAddrRequest {
  /** The consensus address of the validator on the provider chain */
  providerAddress: string;
  /** The id of the consumer chain */
  consumerId: string;
}
export interface QueryValidatorConsumerAddrRequestProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerAddrRequest";
  value: Uint8Array;
}
export interface QueryValidatorConsumerAddrRequestAmino {
  /** The consensus address of the validator on the provider chain */
  provider_address?: string;
  /** The id of the consumer chain */
  consumer_id?: string;
}
export interface QueryValidatorConsumerAddrRequestAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerAddrRequest";
  value: QueryValidatorConsumerAddrRequestAmino;
}
export interface QueryValidatorConsumerAddrRequestSDKType {
  provider_address: string;
  consumer_id: string;
}
export interface QueryValidatorConsumerAddrResponse {
  /** The address of the validator on the consumer chain */
  consumerAddress: string;
}
export interface QueryValidatorConsumerAddrResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerAddrResponse";
  value: Uint8Array;
}
export interface QueryValidatorConsumerAddrResponseAmino {
  /** The address of the validator on the consumer chain */
  consumer_address?: string;
}
export interface QueryValidatorConsumerAddrResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerAddrResponse";
  value: QueryValidatorConsumerAddrResponseAmino;
}
export interface QueryValidatorConsumerAddrResponseSDKType {
  consumer_address: string;
}
export interface QueryValidatorProviderAddrRequest {
  /** The consensus address of the validator on the consumer chain */
  consumerAddress: string;
  /** The id of the consumer chain */
  consumerId: string;
}
export interface QueryValidatorProviderAddrRequestProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorProviderAddrRequest";
  value: Uint8Array;
}
export interface QueryValidatorProviderAddrRequestAmino {
  /** The consensus address of the validator on the consumer chain */
  consumer_address?: string;
  /** The id of the consumer chain */
  consumer_id?: string;
}
export interface QueryValidatorProviderAddrRequestAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryValidatorProviderAddrRequest";
  value: QueryValidatorProviderAddrRequestAmino;
}
export interface QueryValidatorProviderAddrRequestSDKType {
  consumer_address: string;
  consumer_id: string;
}
export interface QueryValidatorProviderAddrResponse {
  /** The address of the validator on the provider chain */
  providerAddress: string;
}
export interface QueryValidatorProviderAddrResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorProviderAddrResponse";
  value: Uint8Array;
}
export interface QueryValidatorProviderAddrResponseAmino {
  /** The address of the validator on the provider chain */
  provider_address?: string;
}
export interface QueryValidatorProviderAddrResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryValidatorProviderAddrResponse";
  value: QueryValidatorProviderAddrResponseAmino;
}
export interface QueryValidatorProviderAddrResponseSDKType {
  provider_address: string;
}
export interface QueryThrottleStateRequest {}
export interface QueryThrottleStateRequestProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryThrottleStateRequest";
  value: Uint8Array;
}
export interface QueryThrottleStateRequestAmino {}
export interface QueryThrottleStateRequestAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryThrottleStateRequest";
  value: QueryThrottleStateRequestAmino;
}
export interface QueryThrottleStateRequestSDKType {}
export interface QueryThrottleStateResponse {
  /** current slash_meter state */
  slashMeter: bigint;
  /**
   * allowance of voting power units (int) that the slash meter is given per
   * replenish period this also serves as the max value for the meter.
   */
  slashMeterAllowance: bigint;
  /**
   * next time the slash meter could potentially be replenished, iff it's not
   * full
   */
  nextReplenishCandidate: Date | undefined;
}
export interface QueryThrottleStateResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryThrottleStateResponse";
  value: Uint8Array;
}
export interface QueryThrottleStateResponseAmino {
  /** current slash_meter state */
  slash_meter?: string;
  /**
   * allowance of voting power units (int) that the slash meter is given per
   * replenish period this also serves as the max value for the meter.
   */
  slash_meter_allowance?: string;
  /**
   * next time the slash meter could potentially be replenished, iff it's not
   * full
   */
  next_replenish_candidate?: string | undefined;
}
export interface QueryThrottleStateResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryThrottleStateResponse";
  value: QueryThrottleStateResponseAmino;
}
export interface QueryThrottleStateResponseSDKType {
  slash_meter: bigint;
  slash_meter_allowance: bigint;
  next_replenish_candidate: Date | undefined;
}
export interface QueryRegisteredConsumerRewardDenomsRequest {}
export interface QueryRegisteredConsumerRewardDenomsRequestProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryRegisteredConsumerRewardDenomsRequest";
  value: Uint8Array;
}
export interface QueryRegisteredConsumerRewardDenomsRequestAmino {}
export interface QueryRegisteredConsumerRewardDenomsRequestAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryRegisteredConsumerRewardDenomsRequest";
  value: QueryRegisteredConsumerRewardDenomsRequestAmino;
}
export interface QueryRegisteredConsumerRewardDenomsRequestSDKType {}
export interface QueryRegisteredConsumerRewardDenomsResponse {
  denoms: string[];
}
export interface QueryRegisteredConsumerRewardDenomsResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryRegisteredConsumerRewardDenomsResponse";
  value: Uint8Array;
}
export interface QueryRegisteredConsumerRewardDenomsResponseAmino {
  denoms?: string[];
}
export interface QueryRegisteredConsumerRewardDenomsResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryRegisteredConsumerRewardDenomsResponse";
  value: QueryRegisteredConsumerRewardDenomsResponseAmino;
}
export interface QueryRegisteredConsumerRewardDenomsResponseSDKType {
  denoms: string[];
}
export interface QueryAllPairsValConsAddrByConsumerRequest {
  /** The id of the consumer chain */
  consumerId: string;
}
export interface QueryAllPairsValConsAddrByConsumerRequestProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryAllPairsValConsAddrByConsumerRequest";
  value: Uint8Array;
}
export interface QueryAllPairsValConsAddrByConsumerRequestAmino {
  /** The id of the consumer chain */
  consumer_id?: string;
}
export interface QueryAllPairsValConsAddrByConsumerRequestAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryAllPairsValConsAddrByConsumerRequest";
  value: QueryAllPairsValConsAddrByConsumerRequestAmino;
}
export interface QueryAllPairsValConsAddrByConsumerRequestSDKType {
  consumer_id: string;
}
export interface QueryAllPairsValConsAddrByConsumerResponse {
  pairValConAddr: PairValConAddrProviderAndConsumer[];
}
export interface QueryAllPairsValConsAddrByConsumerResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryAllPairsValConsAddrByConsumerResponse";
  value: Uint8Array;
}
export interface QueryAllPairsValConsAddrByConsumerResponseAmino {
  pair_val_con_addr?: PairValConAddrProviderAndConsumerAmino[];
}
export interface QueryAllPairsValConsAddrByConsumerResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryAllPairsValConsAddrByConsumerResponse";
  value: QueryAllPairsValConsAddrByConsumerResponseAmino;
}
export interface QueryAllPairsValConsAddrByConsumerResponseSDKType {
  pair_val_con_addr: PairValConAddrProviderAndConsumerSDKType[];
}
export interface PairValConAddrProviderAndConsumer {
  /** The consensus address of the validator on the provider chain */
  providerAddress: string;
  /** The consensus address of the validator on the consumer chain */
  consumerAddress: string;
  consumerKey?: PublicKey | undefined;
}
export interface PairValConAddrProviderAndConsumerProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.PairValConAddrProviderAndConsumer";
  value: Uint8Array;
}
export interface PairValConAddrProviderAndConsumerAmino {
  /** The consensus address of the validator on the provider chain */
  provider_address?: string;
  /** The consensus address of the validator on the consumer chain */
  consumer_address?: string;
  consumer_key?: PublicKeyAmino | undefined;
}
export interface PairValConAddrProviderAndConsumerAminoMsg {
  type: "/interchain_security.ccv.provider.v1.PairValConAddrProviderAndConsumer";
  value: PairValConAddrProviderAndConsumerAmino;
}
export interface PairValConAddrProviderAndConsumerSDKType {
  provider_address: string;
  consumer_address: string;
  consumer_key?: PublicKeySDKType | undefined;
}
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryParamsRequest";
  value: Uint8Array;
}
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
export interface QueryParamsRequestSDKType {}
export interface QueryParamsResponse {
  params: Params | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryParamsResponse";
  value: Uint8Array;
}
export interface QueryParamsResponseAmino {
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
export interface QueryConsumerChainOptedInValidatorsRequest {
  consumerId: string;
}
export interface QueryConsumerChainOptedInValidatorsRequestProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainOptedInValidatorsRequest";
  value: Uint8Array;
}
export interface QueryConsumerChainOptedInValidatorsRequestAmino {
  consumer_id?: string;
}
export interface QueryConsumerChainOptedInValidatorsRequestAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryConsumerChainOptedInValidatorsRequest";
  value: QueryConsumerChainOptedInValidatorsRequestAmino;
}
export interface QueryConsumerChainOptedInValidatorsRequestSDKType {
  consumer_id: string;
}
export interface QueryConsumerChainOptedInValidatorsResponse {
  /** The consensus addresses of the validators on the provider chain */
  validatorsProviderAddresses: string[];
}
export interface QueryConsumerChainOptedInValidatorsResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainOptedInValidatorsResponse";
  value: Uint8Array;
}
export interface QueryConsumerChainOptedInValidatorsResponseAmino {
  /** The consensus addresses of the validators on the provider chain */
  validators_provider_addresses?: string[];
}
export interface QueryConsumerChainOptedInValidatorsResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryConsumerChainOptedInValidatorsResponse";
  value: QueryConsumerChainOptedInValidatorsResponseAmino;
}
export interface QueryConsumerChainOptedInValidatorsResponseSDKType {
  validators_provider_addresses: string[];
}
export interface QueryConsumerValidatorsRequest {
  consumerId: string;
}
export interface QueryConsumerValidatorsRequestProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerValidatorsRequest";
  value: Uint8Array;
}
export interface QueryConsumerValidatorsRequestAmino {
  consumer_id?: string;
}
export interface QueryConsumerValidatorsRequestAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryConsumerValidatorsRequest";
  value: QueryConsumerValidatorsRequestAmino;
}
export interface QueryConsumerValidatorsRequestSDKType {
  consumer_id: string;
}
export interface QueryConsumerValidatorsValidator {
  /** The consensus address of the validator on the provider chain */
  providerAddress: string;
  /** The consumer public key of the validator used on the consumer chain */
  consumerKey?: PublicKey | undefined;
  /** [DEPRECATED] use `consumer_power` instead */
  /** @deprecated */
  power: bigint;
  /** [DEPRECATED] use `consumer_commission_rate` instead */
  /** @deprecated */
  rate: string;
  /** The power of the validator used on the consumer chain */
  consumerPower: bigint;
  /** The rate to charge delegators on the consumer chain, as a fraction */
  consumerCommissionRate: string;
  /** The rate to charge delegators on the provider chain, as a fraction */
  providerCommissionRate: string;
  /** description defines the description terms for the validator */
  description: Description | undefined;
  /** provider_operator_address defines the address of the validator's operator */
  providerOperatorAddress: string;
  /** jailed defined whether the validator has been jailed from bonded status or not. */
  jailed: boolean;
  /** status is the validator status (bonded/unbonding/unbonded). */
  status: BondStatus;
  /** provider_tokens defines the delegated tokens (incl. self-delegation). */
  providerTokens: string;
  /** The power of the validator used on the provider chain */
  providerPower: bigint;
  /** validates_current_epoch defines whether the validator has to validate for the current epoch or not */
  validatesCurrentEpoch: boolean;
}
export interface QueryConsumerValidatorsValidatorProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerValidatorsValidator";
  value: Uint8Array;
}
export interface QueryConsumerValidatorsValidatorAmino {
  /** The consensus address of the validator on the provider chain */
  provider_address?: string;
  /** The consumer public key of the validator used on the consumer chain */
  consumer_key?: PublicKeyAmino | undefined;
  /** [DEPRECATED] use `consumer_power` instead */
  /** @deprecated */
  power?: string;
  /** [DEPRECATED] use `consumer_commission_rate` instead */
  /** @deprecated */
  rate?: string;
  /** The power of the validator used on the consumer chain */
  consumer_power?: string;
  /** The rate to charge delegators on the consumer chain, as a fraction */
  consumer_commission_rate?: string;
  /** The rate to charge delegators on the provider chain, as a fraction */
  provider_commission_rate?: string;
  /** description defines the description terms for the validator */
  description?: DescriptionAmino | undefined;
  /** provider_operator_address defines the address of the validator's operator */
  provider_operator_address?: string;
  /** jailed defined whether the validator has been jailed from bonded status or not. */
  jailed?: boolean;
  /** status is the validator status (bonded/unbonding/unbonded). */
  status?: BondStatus;
  /** provider_tokens defines the delegated tokens (incl. self-delegation). */
  provider_tokens?: string;
  /** The power of the validator used on the provider chain */
  provider_power?: string;
  /** validates_current_epoch defines whether the validator has to validate for the current epoch or not */
  validates_current_epoch?: boolean;
}
export interface QueryConsumerValidatorsValidatorAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryConsumerValidatorsValidator";
  value: QueryConsumerValidatorsValidatorAmino;
}
export interface QueryConsumerValidatorsValidatorSDKType {
  provider_address: string;
  consumer_key?: PublicKeySDKType | undefined;
  /** @deprecated */
  power: bigint;
  /** @deprecated */
  rate: string;
  consumer_power: bigint;
  consumer_commission_rate: string;
  provider_commission_rate: string;
  description: DescriptionSDKType | undefined;
  provider_operator_address: string;
  jailed: boolean;
  status: BondStatus;
  provider_tokens: string;
  provider_power: bigint;
  validates_current_epoch: boolean;
}
export interface QueryConsumerValidatorsResponse {
  validators: QueryConsumerValidatorsValidator[];
}
export interface QueryConsumerValidatorsResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerValidatorsResponse";
  value: Uint8Array;
}
export interface QueryConsumerValidatorsResponseAmino {
  validators?: QueryConsumerValidatorsValidatorAmino[];
}
export interface QueryConsumerValidatorsResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryConsumerValidatorsResponse";
  value: QueryConsumerValidatorsResponseAmino;
}
export interface QueryConsumerValidatorsResponseSDKType {
  validators: QueryConsumerValidatorsValidatorSDKType[];
}
export interface QueryConsumerChainsValidatorHasToValidateRequest {
  /** The consensus address of the validator on the provider chain */
  providerAddress: string;
}
export interface QueryConsumerChainsValidatorHasToValidateRequestProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainsValidatorHasToValidateRequest";
  value: Uint8Array;
}
export interface QueryConsumerChainsValidatorHasToValidateRequestAmino {
  /** The consensus address of the validator on the provider chain */
  provider_address?: string;
}
export interface QueryConsumerChainsValidatorHasToValidateRequestAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryConsumerChainsValidatorHasToValidateRequest";
  value: QueryConsumerChainsValidatorHasToValidateRequestAmino;
}
export interface QueryConsumerChainsValidatorHasToValidateRequestSDKType {
  provider_address: string;
}
export interface QueryConsumerChainsValidatorHasToValidateResponse {
  consumerIds: string[];
}
export interface QueryConsumerChainsValidatorHasToValidateResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainsValidatorHasToValidateResponse";
  value: Uint8Array;
}
export interface QueryConsumerChainsValidatorHasToValidateResponseAmino {
  consumer_ids?: string[];
}
export interface QueryConsumerChainsValidatorHasToValidateResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryConsumerChainsValidatorHasToValidateResponse";
  value: QueryConsumerChainsValidatorHasToValidateResponseAmino;
}
export interface QueryConsumerChainsValidatorHasToValidateResponseSDKType {
  consumer_ids: string[];
}
export interface QueryValidatorConsumerCommissionRateRequest {
  consumerId: string;
  /** The consensus address of the validator on the provider chain */
  providerAddress: string;
}
export interface QueryValidatorConsumerCommissionRateRequestProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerCommissionRateRequest";
  value: Uint8Array;
}
export interface QueryValidatorConsumerCommissionRateRequestAmino {
  consumer_id?: string;
  /** The consensus address of the validator on the provider chain */
  provider_address?: string;
}
export interface QueryValidatorConsumerCommissionRateRequestAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerCommissionRateRequest";
  value: QueryValidatorConsumerCommissionRateRequestAmino;
}
export interface QueryValidatorConsumerCommissionRateRequestSDKType {
  consumer_id: string;
  provider_address: string;
}
export interface QueryValidatorConsumerCommissionRateResponse {
  /** The rate to charge delegators on the consumer chain, as a fraction */
  rate: string;
}
export interface QueryValidatorConsumerCommissionRateResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerCommissionRateResponse";
  value: Uint8Array;
}
export interface QueryValidatorConsumerCommissionRateResponseAmino {
  /** The rate to charge delegators on the consumer chain, as a fraction */
  rate?: string;
}
export interface QueryValidatorConsumerCommissionRateResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerCommissionRateResponse";
  value: QueryValidatorConsumerCommissionRateResponseAmino;
}
export interface QueryValidatorConsumerCommissionRateResponseSDKType {
  rate: string;
}
export interface QueryBlocksUntilNextEpochRequest {}
export interface QueryBlocksUntilNextEpochRequestProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryBlocksUntilNextEpochRequest";
  value: Uint8Array;
}
export interface QueryBlocksUntilNextEpochRequestAmino {}
export interface QueryBlocksUntilNextEpochRequestAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryBlocksUntilNextEpochRequest";
  value: QueryBlocksUntilNextEpochRequestAmino;
}
export interface QueryBlocksUntilNextEpochRequestSDKType {}
export interface QueryBlocksUntilNextEpochResponse {
  /** The number of blocks until the next epoch starts */
  blocksUntilNextEpoch: bigint;
}
export interface QueryBlocksUntilNextEpochResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryBlocksUntilNextEpochResponse";
  value: Uint8Array;
}
export interface QueryBlocksUntilNextEpochResponseAmino {
  /** The number of blocks until the next epoch starts */
  blocks_until_next_epoch?: string;
}
export interface QueryBlocksUntilNextEpochResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryBlocksUntilNextEpochResponse";
  value: QueryBlocksUntilNextEpochResponseAmino;
}
export interface QueryBlocksUntilNextEpochResponseSDKType {
  blocks_until_next_epoch: bigint;
}
export interface QueryConsumerIdFromClientIdRequest {
  /**
   * the client id (on the provider) that is tracking the consumer chain
   * the client id can be found from the consumer chain by querying (i.e., `query ccvconsumer provider-info`)
   */
  clientId: string;
}
export interface QueryConsumerIdFromClientIdRequestProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerIdFromClientIdRequest";
  value: Uint8Array;
}
export interface QueryConsumerIdFromClientIdRequestAmino {
  /**
   * the client id (on the provider) that is tracking the consumer chain
   * the client id can be found from the consumer chain by querying (i.e., `query ccvconsumer provider-info`)
   */
  client_id?: string;
}
export interface QueryConsumerIdFromClientIdRequestAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryConsumerIdFromClientIdRequest";
  value: QueryConsumerIdFromClientIdRequestAmino;
}
export interface QueryConsumerIdFromClientIdRequestSDKType {
  client_id: string;
}
export interface QueryConsumerIdFromClientIdResponse {
  /** the consumer id of the chain associated with this client id */
  consumerId: string;
}
export interface QueryConsumerIdFromClientIdResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerIdFromClientIdResponse";
  value: Uint8Array;
}
export interface QueryConsumerIdFromClientIdResponseAmino {
  /** the consumer id of the chain associated with this client id */
  consumer_id?: string;
}
export interface QueryConsumerIdFromClientIdResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryConsumerIdFromClientIdResponse";
  value: QueryConsumerIdFromClientIdResponseAmino;
}
export interface QueryConsumerIdFromClientIdResponseSDKType {
  consumer_id: string;
}
export interface QueryConsumerChainRequest {
  consumerId: string;
}
export interface QueryConsumerChainRequestProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainRequest";
  value: Uint8Array;
}
export interface QueryConsumerChainRequestAmino {
  consumer_id?: string;
}
export interface QueryConsumerChainRequestAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryConsumerChainRequest";
  value: QueryConsumerChainRequestAmino;
}
export interface QueryConsumerChainRequestSDKType {
  consumer_id: string;
}
export interface QueryConsumerChainResponse {
  consumerId: string;
  chainId: string;
  ownerAddress: string;
  phase: string;
  metadata: ConsumerMetadata | undefined;
  initParams?: ConsumerInitializationParameters | undefined;
  powerShapingParams?: PowerShapingParameters | undefined;
}
export interface QueryConsumerChainResponseProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainResponse";
  value: Uint8Array;
}
export interface QueryConsumerChainResponseAmino {
  consumer_id?: string;
  chain_id?: string;
  owner_address?: string;
  phase?: string;
  metadata?: ConsumerMetadataAmino | undefined;
  init_params?: ConsumerInitializationParametersAmino | undefined;
  power_shaping_params?: PowerShapingParametersAmino | undefined;
}
export interface QueryConsumerChainResponseAminoMsg {
  type: "/interchain_security.ccv.provider.v1.QueryConsumerChainResponse";
  value: QueryConsumerChainResponseAmino;
}
export interface QueryConsumerChainResponseSDKType {
  consumer_id: string;
  chain_id: string;
  owner_address: string;
  phase: string;
  metadata: ConsumerMetadataSDKType | undefined;
  init_params?: ConsumerInitializationParametersSDKType | undefined;
  power_shaping_params?: PowerShapingParametersSDKType | undefined;
}
function createBaseQueryConsumerGenesisRequest(): QueryConsumerGenesisRequest {
  return {
    consumerId: ""
  };
}
export const QueryConsumerGenesisRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerGenesisRequest",
  encode(message: QueryConsumerGenesisRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consumerId !== "") {
      writer.uint32(10).string(message.consumerId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsumerGenesisRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerGenesisRequest();
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
  fromPartial(object: Partial<QueryConsumerGenesisRequest>): QueryConsumerGenesisRequest {
    const message = createBaseQueryConsumerGenesisRequest();
    message.consumerId = object.consumerId ?? "";
    return message;
  },
  fromAmino(object: QueryConsumerGenesisRequestAmino): QueryConsumerGenesisRequest {
    const message = createBaseQueryConsumerGenesisRequest();
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    return message;
  },
  toAmino(message: QueryConsumerGenesisRequest, useInterfaces: boolean = false): QueryConsumerGenesisRequestAmino {
    const obj: any = {};
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    return obj;
  },
  fromAminoMsg(object: QueryConsumerGenesisRequestAminoMsg): QueryConsumerGenesisRequest {
    return QueryConsumerGenesisRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerGenesisRequestProtoMsg, useInterfaces: boolean = false): QueryConsumerGenesisRequest {
    return QueryConsumerGenesisRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsumerGenesisRequest): Uint8Array {
    return QueryConsumerGenesisRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerGenesisRequest): QueryConsumerGenesisRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerGenesisRequest",
      value: QueryConsumerGenesisRequest.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerGenesisResponse(): QueryConsumerGenesisResponse {
  return {
    genesisState: ConsumerGenesisState.fromPartial({})
  };
}
export const QueryConsumerGenesisResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerGenesisResponse",
  encode(message: QueryConsumerGenesisResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.genesisState !== undefined) {
      ConsumerGenesisState.encode(message.genesisState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsumerGenesisResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerGenesisResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.genesisState = ConsumerGenesisState.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsumerGenesisResponse>): QueryConsumerGenesisResponse {
    const message = createBaseQueryConsumerGenesisResponse();
    message.genesisState = object.genesisState !== undefined && object.genesisState !== null ? ConsumerGenesisState.fromPartial(object.genesisState) : undefined;
    return message;
  },
  fromAmino(object: QueryConsumerGenesisResponseAmino): QueryConsumerGenesisResponse {
    const message = createBaseQueryConsumerGenesisResponse();
    if (object.genesis_state !== undefined && object.genesis_state !== null) {
      message.genesisState = ConsumerGenesisState.fromAmino(object.genesis_state);
    }
    return message;
  },
  toAmino(message: QueryConsumerGenesisResponse, useInterfaces: boolean = false): QueryConsumerGenesisResponseAmino {
    const obj: any = {};
    obj.genesis_state = message.genesisState ? ConsumerGenesisState.toAmino(message.genesisState, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryConsumerGenesisResponseAminoMsg): QueryConsumerGenesisResponse {
    return QueryConsumerGenesisResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerGenesisResponseProtoMsg, useInterfaces: boolean = false): QueryConsumerGenesisResponse {
    return QueryConsumerGenesisResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsumerGenesisResponse): Uint8Array {
    return QueryConsumerGenesisResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerGenesisResponse): QueryConsumerGenesisResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerGenesisResponse",
      value: QueryConsumerGenesisResponse.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerChainsRequest(): QueryConsumerChainsRequest {
  return {
    phase: 0,
    pagination: undefined
  };
}
export const QueryConsumerChainsRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainsRequest",
  encode(message: QueryConsumerChainsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.phase !== 0) {
      writer.uint32(8).int32(message.phase);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsumerChainsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.phase = (reader.int32() as any);
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsumerChainsRequest>): QueryConsumerChainsRequest {
    const message = createBaseQueryConsumerChainsRequest();
    message.phase = object.phase ?? 0;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryConsumerChainsRequestAmino): QueryConsumerChainsRequest {
    const message = createBaseQueryConsumerChainsRequest();
    if (object.phase !== undefined && object.phase !== null) {
      message.phase = object.phase;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryConsumerChainsRequest, useInterfaces: boolean = false): QueryConsumerChainsRequestAmino {
    const obj: any = {};
    obj.phase = message.phase === 0 ? undefined : message.phase;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryConsumerChainsRequestAminoMsg): QueryConsumerChainsRequest {
    return QueryConsumerChainsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerChainsRequestProtoMsg, useInterfaces: boolean = false): QueryConsumerChainsRequest {
    return QueryConsumerChainsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsumerChainsRequest): Uint8Array {
    return QueryConsumerChainsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerChainsRequest): QueryConsumerChainsRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainsRequest",
      value: QueryConsumerChainsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerChainsResponse(): QueryConsumerChainsResponse {
  return {
    chains: [],
    pagination: undefined
  };
}
export const QueryConsumerChainsResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainsResponse",
  encode(message: QueryConsumerChainsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.chains) {
      Chain.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsumerChainsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chains.push(Chain.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsumerChainsResponse>): QueryConsumerChainsResponse {
    const message = createBaseQueryConsumerChainsResponse();
    message.chains = object.chains?.map(e => Chain.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryConsumerChainsResponseAmino): QueryConsumerChainsResponse {
    const message = createBaseQueryConsumerChainsResponse();
    message.chains = object.chains?.map(e => Chain.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryConsumerChainsResponse, useInterfaces: boolean = false): QueryConsumerChainsResponseAmino {
    const obj: any = {};
    if (message.chains) {
      obj.chains = message.chains.map(e => e ? Chain.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.chains = message.chains;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryConsumerChainsResponseAminoMsg): QueryConsumerChainsResponse {
    return QueryConsumerChainsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerChainsResponseProtoMsg, useInterfaces: boolean = false): QueryConsumerChainsResponse {
    return QueryConsumerChainsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsumerChainsResponse): Uint8Array {
    return QueryConsumerChainsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerChainsResponse): QueryConsumerChainsResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainsResponse",
      value: QueryConsumerChainsResponse.encode(message).finish()
    };
  }
};
function createBaseChain(): Chain {
  return {
    chainId: "",
    clientId: "",
    topN: 0,
    minPowerInTopN: BigInt(0),
    validatorsPowerCap: 0,
    validatorSetCap: 0,
    allowlist: [],
    denylist: [],
    phase: "",
    metadata: ConsumerMetadata.fromPartial({}),
    minStake: BigInt(0),
    allowInactiveVals: false,
    consumerId: "",
    allowlistedRewardDenoms: undefined,
    prioritylist: []
  };
}
export const Chain = {
  typeUrl: "/interchain_security.ccv.provider.v1.Chain",
  encode(message: Chain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.clientId !== "") {
      writer.uint32(18).string(message.clientId);
    }
    if (message.topN !== 0) {
      writer.uint32(24).uint32(message.topN);
    }
    if (message.minPowerInTopN !== BigInt(0)) {
      writer.uint32(32).int64(message.minPowerInTopN);
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
    if (message.phase !== "") {
      writer.uint32(74).string(message.phase);
    }
    if (message.metadata !== undefined) {
      ConsumerMetadata.encode(message.metadata, writer.uint32(82).fork()).ldelim();
    }
    if (message.minStake !== BigInt(0)) {
      writer.uint32(88).uint64(message.minStake);
    }
    if (message.allowInactiveVals === true) {
      writer.uint32(96).bool(message.allowInactiveVals);
    }
    if (message.consumerId !== "") {
      writer.uint32(106).string(message.consumerId);
    }
    if (message.allowlistedRewardDenoms !== undefined) {
      AllowlistedRewardDenoms.encode(message.allowlistedRewardDenoms, writer.uint32(114).fork()).ldelim();
    }
    for (const v of message.prioritylist) {
      writer.uint32(122).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Chain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.clientId = reader.string();
          break;
        case 3:
          message.topN = reader.uint32();
          break;
        case 4:
          message.minPowerInTopN = reader.int64();
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
          message.phase = reader.string();
          break;
        case 10:
          message.metadata = ConsumerMetadata.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 11:
          message.minStake = reader.uint64();
          break;
        case 12:
          message.allowInactiveVals = reader.bool();
          break;
        case 13:
          message.consumerId = reader.string();
          break;
        case 14:
          message.allowlistedRewardDenoms = AllowlistedRewardDenoms.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 15:
          message.prioritylist.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Chain>): Chain {
    const message = createBaseChain();
    message.chainId = object.chainId ?? "";
    message.clientId = object.clientId ?? "";
    message.topN = object.topN ?? 0;
    message.minPowerInTopN = object.minPowerInTopN !== undefined && object.minPowerInTopN !== null ? BigInt(object.minPowerInTopN.toString()) : BigInt(0);
    message.validatorsPowerCap = object.validatorsPowerCap ?? 0;
    message.validatorSetCap = object.validatorSetCap ?? 0;
    message.allowlist = object.allowlist?.map(e => e) || [];
    message.denylist = object.denylist?.map(e => e) || [];
    message.phase = object.phase ?? "";
    message.metadata = object.metadata !== undefined && object.metadata !== null ? ConsumerMetadata.fromPartial(object.metadata) : undefined;
    message.minStake = object.minStake !== undefined && object.minStake !== null ? BigInt(object.minStake.toString()) : BigInt(0);
    message.allowInactiveVals = object.allowInactiveVals ?? false;
    message.consumerId = object.consumerId ?? "";
    message.allowlistedRewardDenoms = object.allowlistedRewardDenoms !== undefined && object.allowlistedRewardDenoms !== null ? AllowlistedRewardDenoms.fromPartial(object.allowlistedRewardDenoms) : undefined;
    message.prioritylist = object.prioritylist?.map(e => e) || [];
    return message;
  },
  fromAmino(object: ChainAmino): Chain {
    const message = createBaseChain();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.client_id !== undefined && object.client_id !== null) {
      message.clientId = object.client_id;
    }
    if (object.top_N !== undefined && object.top_N !== null) {
      message.topN = object.top_N;
    }
    if (object.min_power_in_top_N !== undefined && object.min_power_in_top_N !== null) {
      message.minPowerInTopN = BigInt(object.min_power_in_top_N);
    }
    if (object.validators_power_cap !== undefined && object.validators_power_cap !== null) {
      message.validatorsPowerCap = object.validators_power_cap;
    }
    if (object.validator_set_cap !== undefined && object.validator_set_cap !== null) {
      message.validatorSetCap = object.validator_set_cap;
    }
    message.allowlist = object.allowlist?.map(e => e) || [];
    message.denylist = object.denylist?.map(e => e) || [];
    if (object.phase !== undefined && object.phase !== null) {
      message.phase = object.phase;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = ConsumerMetadata.fromAmino(object.metadata);
    }
    if (object.min_stake !== undefined && object.min_stake !== null) {
      message.minStake = BigInt(object.min_stake);
    }
    if (object.allow_inactive_vals !== undefined && object.allow_inactive_vals !== null) {
      message.allowInactiveVals = object.allow_inactive_vals;
    }
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    if (object.allowlisted_reward_denoms !== undefined && object.allowlisted_reward_denoms !== null) {
      message.allowlistedRewardDenoms = AllowlistedRewardDenoms.fromAmino(object.allowlisted_reward_denoms);
    }
    message.prioritylist = object.prioritylist?.map(e => e) || [];
    return message;
  },
  toAmino(message: Chain, useInterfaces: boolean = false): ChainAmino {
    const obj: any = {};
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.client_id = message.clientId === "" ? undefined : message.clientId;
    obj.top_N = message.topN === 0 ? undefined : message.topN;
    obj.min_power_in_top_N = message.minPowerInTopN !== BigInt(0) ? message.minPowerInTopN.toString() : undefined;
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
    obj.phase = message.phase === "" ? undefined : message.phase;
    obj.metadata = message.metadata ? ConsumerMetadata.toAmino(message.metadata, useInterfaces) : undefined;
    obj.min_stake = message.minStake !== BigInt(0) ? message.minStake.toString() : undefined;
    obj.allow_inactive_vals = message.allowInactiveVals === false ? undefined : message.allowInactiveVals;
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    obj.allowlisted_reward_denoms = message.allowlistedRewardDenoms ? AllowlistedRewardDenoms.toAmino(message.allowlistedRewardDenoms, useInterfaces) : undefined;
    if (message.prioritylist) {
      obj.prioritylist = message.prioritylist.map(e => e);
    } else {
      obj.prioritylist = message.prioritylist;
    }
    return obj;
  },
  fromAminoMsg(object: ChainAminoMsg): Chain {
    return Chain.fromAmino(object.value);
  },
  fromProtoMsg(message: ChainProtoMsg, useInterfaces: boolean = false): Chain {
    return Chain.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Chain): Uint8Array {
    return Chain.encode(message).finish();
  },
  toProtoMsg(message: Chain): ChainProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.Chain",
      value: Chain.encode(message).finish()
    };
  }
};
function createBaseQueryValidatorConsumerAddrRequest(): QueryValidatorConsumerAddrRequest {
  return {
    providerAddress: "",
    consumerId: ""
  };
}
export const QueryValidatorConsumerAddrRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerAddrRequest",
  encode(message: QueryValidatorConsumerAddrRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.providerAddress !== "") {
      writer.uint32(10).string(message.providerAddress);
    }
    if (message.consumerId !== "") {
      writer.uint32(18).string(message.consumerId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryValidatorConsumerAddrRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorConsumerAddrRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.providerAddress = reader.string();
          break;
        case 2:
          message.consumerId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryValidatorConsumerAddrRequest>): QueryValidatorConsumerAddrRequest {
    const message = createBaseQueryValidatorConsumerAddrRequest();
    message.providerAddress = object.providerAddress ?? "";
    message.consumerId = object.consumerId ?? "";
    return message;
  },
  fromAmino(object: QueryValidatorConsumerAddrRequestAmino): QueryValidatorConsumerAddrRequest {
    const message = createBaseQueryValidatorConsumerAddrRequest();
    if (object.provider_address !== undefined && object.provider_address !== null) {
      message.providerAddress = object.provider_address;
    }
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    return message;
  },
  toAmino(message: QueryValidatorConsumerAddrRequest, useInterfaces: boolean = false): QueryValidatorConsumerAddrRequestAmino {
    const obj: any = {};
    obj.provider_address = message.providerAddress === "" ? undefined : message.providerAddress;
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    return obj;
  },
  fromAminoMsg(object: QueryValidatorConsumerAddrRequestAminoMsg): QueryValidatorConsumerAddrRequest {
    return QueryValidatorConsumerAddrRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryValidatorConsumerAddrRequestProtoMsg, useInterfaces: boolean = false): QueryValidatorConsumerAddrRequest {
    return QueryValidatorConsumerAddrRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryValidatorConsumerAddrRequest): Uint8Array {
    return QueryValidatorConsumerAddrRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryValidatorConsumerAddrRequest): QueryValidatorConsumerAddrRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerAddrRequest",
      value: QueryValidatorConsumerAddrRequest.encode(message).finish()
    };
  }
};
function createBaseQueryValidatorConsumerAddrResponse(): QueryValidatorConsumerAddrResponse {
  return {
    consumerAddress: ""
  };
}
export const QueryValidatorConsumerAddrResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerAddrResponse",
  encode(message: QueryValidatorConsumerAddrResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consumerAddress !== "") {
      writer.uint32(10).string(message.consumerAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryValidatorConsumerAddrResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorConsumerAddrResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryValidatorConsumerAddrResponse>): QueryValidatorConsumerAddrResponse {
    const message = createBaseQueryValidatorConsumerAddrResponse();
    message.consumerAddress = object.consumerAddress ?? "";
    return message;
  },
  fromAmino(object: QueryValidatorConsumerAddrResponseAmino): QueryValidatorConsumerAddrResponse {
    const message = createBaseQueryValidatorConsumerAddrResponse();
    if (object.consumer_address !== undefined && object.consumer_address !== null) {
      message.consumerAddress = object.consumer_address;
    }
    return message;
  },
  toAmino(message: QueryValidatorConsumerAddrResponse, useInterfaces: boolean = false): QueryValidatorConsumerAddrResponseAmino {
    const obj: any = {};
    obj.consumer_address = message.consumerAddress === "" ? undefined : message.consumerAddress;
    return obj;
  },
  fromAminoMsg(object: QueryValidatorConsumerAddrResponseAminoMsg): QueryValidatorConsumerAddrResponse {
    return QueryValidatorConsumerAddrResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryValidatorConsumerAddrResponseProtoMsg, useInterfaces: boolean = false): QueryValidatorConsumerAddrResponse {
    return QueryValidatorConsumerAddrResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryValidatorConsumerAddrResponse): Uint8Array {
    return QueryValidatorConsumerAddrResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryValidatorConsumerAddrResponse): QueryValidatorConsumerAddrResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerAddrResponse",
      value: QueryValidatorConsumerAddrResponse.encode(message).finish()
    };
  }
};
function createBaseQueryValidatorProviderAddrRequest(): QueryValidatorProviderAddrRequest {
  return {
    consumerAddress: "",
    consumerId: ""
  };
}
export const QueryValidatorProviderAddrRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorProviderAddrRequest",
  encode(message: QueryValidatorProviderAddrRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consumerAddress !== "") {
      writer.uint32(10).string(message.consumerAddress);
    }
    if (message.consumerId !== "") {
      writer.uint32(18).string(message.consumerId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryValidatorProviderAddrRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorProviderAddrRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerAddress = reader.string();
          break;
        case 2:
          message.consumerId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryValidatorProviderAddrRequest>): QueryValidatorProviderAddrRequest {
    const message = createBaseQueryValidatorProviderAddrRequest();
    message.consumerAddress = object.consumerAddress ?? "";
    message.consumerId = object.consumerId ?? "";
    return message;
  },
  fromAmino(object: QueryValidatorProviderAddrRequestAmino): QueryValidatorProviderAddrRequest {
    const message = createBaseQueryValidatorProviderAddrRequest();
    if (object.consumer_address !== undefined && object.consumer_address !== null) {
      message.consumerAddress = object.consumer_address;
    }
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    return message;
  },
  toAmino(message: QueryValidatorProviderAddrRequest, useInterfaces: boolean = false): QueryValidatorProviderAddrRequestAmino {
    const obj: any = {};
    obj.consumer_address = message.consumerAddress === "" ? undefined : message.consumerAddress;
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    return obj;
  },
  fromAminoMsg(object: QueryValidatorProviderAddrRequestAminoMsg): QueryValidatorProviderAddrRequest {
    return QueryValidatorProviderAddrRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryValidatorProviderAddrRequestProtoMsg, useInterfaces: boolean = false): QueryValidatorProviderAddrRequest {
    return QueryValidatorProviderAddrRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryValidatorProviderAddrRequest): Uint8Array {
    return QueryValidatorProviderAddrRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryValidatorProviderAddrRequest): QueryValidatorProviderAddrRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorProviderAddrRequest",
      value: QueryValidatorProviderAddrRequest.encode(message).finish()
    };
  }
};
function createBaseQueryValidatorProviderAddrResponse(): QueryValidatorProviderAddrResponse {
  return {
    providerAddress: ""
  };
}
export const QueryValidatorProviderAddrResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorProviderAddrResponse",
  encode(message: QueryValidatorProviderAddrResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.providerAddress !== "") {
      writer.uint32(10).string(message.providerAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryValidatorProviderAddrResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorProviderAddrResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.providerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryValidatorProviderAddrResponse>): QueryValidatorProviderAddrResponse {
    const message = createBaseQueryValidatorProviderAddrResponse();
    message.providerAddress = object.providerAddress ?? "";
    return message;
  },
  fromAmino(object: QueryValidatorProviderAddrResponseAmino): QueryValidatorProviderAddrResponse {
    const message = createBaseQueryValidatorProviderAddrResponse();
    if (object.provider_address !== undefined && object.provider_address !== null) {
      message.providerAddress = object.provider_address;
    }
    return message;
  },
  toAmino(message: QueryValidatorProviderAddrResponse, useInterfaces: boolean = false): QueryValidatorProviderAddrResponseAmino {
    const obj: any = {};
    obj.provider_address = message.providerAddress === "" ? undefined : message.providerAddress;
    return obj;
  },
  fromAminoMsg(object: QueryValidatorProviderAddrResponseAminoMsg): QueryValidatorProviderAddrResponse {
    return QueryValidatorProviderAddrResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryValidatorProviderAddrResponseProtoMsg, useInterfaces: boolean = false): QueryValidatorProviderAddrResponse {
    return QueryValidatorProviderAddrResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryValidatorProviderAddrResponse): Uint8Array {
    return QueryValidatorProviderAddrResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryValidatorProviderAddrResponse): QueryValidatorProviderAddrResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorProviderAddrResponse",
      value: QueryValidatorProviderAddrResponse.encode(message).finish()
    };
  }
};
function createBaseQueryThrottleStateRequest(): QueryThrottleStateRequest {
  return {};
}
export const QueryThrottleStateRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryThrottleStateRequest",
  encode(_: QueryThrottleStateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryThrottleStateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryThrottleStateRequest();
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
  fromPartial(_: Partial<QueryThrottleStateRequest>): QueryThrottleStateRequest {
    const message = createBaseQueryThrottleStateRequest();
    return message;
  },
  fromAmino(_: QueryThrottleStateRequestAmino): QueryThrottleStateRequest {
    const message = createBaseQueryThrottleStateRequest();
    return message;
  },
  toAmino(_: QueryThrottleStateRequest, useInterfaces: boolean = false): QueryThrottleStateRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryThrottleStateRequestAminoMsg): QueryThrottleStateRequest {
    return QueryThrottleStateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryThrottleStateRequestProtoMsg, useInterfaces: boolean = false): QueryThrottleStateRequest {
    return QueryThrottleStateRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryThrottleStateRequest): Uint8Array {
    return QueryThrottleStateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryThrottleStateRequest): QueryThrottleStateRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryThrottleStateRequest",
      value: QueryThrottleStateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryThrottleStateResponse(): QueryThrottleStateResponse {
  return {
    slashMeter: BigInt(0),
    slashMeterAllowance: BigInt(0),
    nextReplenishCandidate: new Date()
  };
}
export const QueryThrottleStateResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryThrottleStateResponse",
  encode(message: QueryThrottleStateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.slashMeter !== BigInt(0)) {
      writer.uint32(8).int64(message.slashMeter);
    }
    if (message.slashMeterAllowance !== BigInt(0)) {
      writer.uint32(16).int64(message.slashMeterAllowance);
    }
    if (message.nextReplenishCandidate !== undefined) {
      Timestamp.encode(toTimestamp(message.nextReplenishCandidate), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryThrottleStateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryThrottleStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.slashMeter = reader.int64();
          break;
        case 2:
          message.slashMeterAllowance = reader.int64();
          break;
        case 3:
          message.nextReplenishCandidate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryThrottleStateResponse>): QueryThrottleStateResponse {
    const message = createBaseQueryThrottleStateResponse();
    message.slashMeter = object.slashMeter !== undefined && object.slashMeter !== null ? BigInt(object.slashMeter.toString()) : BigInt(0);
    message.slashMeterAllowance = object.slashMeterAllowance !== undefined && object.slashMeterAllowance !== null ? BigInt(object.slashMeterAllowance.toString()) : BigInt(0);
    message.nextReplenishCandidate = object.nextReplenishCandidate ?? undefined;
    return message;
  },
  fromAmino(object: QueryThrottleStateResponseAmino): QueryThrottleStateResponse {
    const message = createBaseQueryThrottleStateResponse();
    if (object.slash_meter !== undefined && object.slash_meter !== null) {
      message.slashMeter = BigInt(object.slash_meter);
    }
    if (object.slash_meter_allowance !== undefined && object.slash_meter_allowance !== null) {
      message.slashMeterAllowance = BigInt(object.slash_meter_allowance);
    }
    if (object.next_replenish_candidate !== undefined && object.next_replenish_candidate !== null) {
      message.nextReplenishCandidate = fromTimestamp(Timestamp.fromAmino(object.next_replenish_candidate));
    }
    return message;
  },
  toAmino(message: QueryThrottleStateResponse, useInterfaces: boolean = false): QueryThrottleStateResponseAmino {
    const obj: any = {};
    obj.slash_meter = message.slashMeter !== BigInt(0) ? message.slashMeter.toString() : undefined;
    obj.slash_meter_allowance = message.slashMeterAllowance !== BigInt(0) ? message.slashMeterAllowance.toString() : undefined;
    obj.next_replenish_candidate = message.nextReplenishCandidate ? Timestamp.toAmino(toTimestamp(message.nextReplenishCandidate)) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryThrottleStateResponseAminoMsg): QueryThrottleStateResponse {
    return QueryThrottleStateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryThrottleStateResponseProtoMsg, useInterfaces: boolean = false): QueryThrottleStateResponse {
    return QueryThrottleStateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryThrottleStateResponse): Uint8Array {
    return QueryThrottleStateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryThrottleStateResponse): QueryThrottleStateResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryThrottleStateResponse",
      value: QueryThrottleStateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRegisteredConsumerRewardDenomsRequest(): QueryRegisteredConsumerRewardDenomsRequest {
  return {};
}
export const QueryRegisteredConsumerRewardDenomsRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryRegisteredConsumerRewardDenomsRequest",
  encode(_: QueryRegisteredConsumerRewardDenomsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRegisteredConsumerRewardDenomsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRegisteredConsumerRewardDenomsRequest();
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
  fromPartial(_: Partial<QueryRegisteredConsumerRewardDenomsRequest>): QueryRegisteredConsumerRewardDenomsRequest {
    const message = createBaseQueryRegisteredConsumerRewardDenomsRequest();
    return message;
  },
  fromAmino(_: QueryRegisteredConsumerRewardDenomsRequestAmino): QueryRegisteredConsumerRewardDenomsRequest {
    const message = createBaseQueryRegisteredConsumerRewardDenomsRequest();
    return message;
  },
  toAmino(_: QueryRegisteredConsumerRewardDenomsRequest, useInterfaces: boolean = false): QueryRegisteredConsumerRewardDenomsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryRegisteredConsumerRewardDenomsRequestAminoMsg): QueryRegisteredConsumerRewardDenomsRequest {
    return QueryRegisteredConsumerRewardDenomsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRegisteredConsumerRewardDenomsRequestProtoMsg, useInterfaces: boolean = false): QueryRegisteredConsumerRewardDenomsRequest {
    return QueryRegisteredConsumerRewardDenomsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRegisteredConsumerRewardDenomsRequest): Uint8Array {
    return QueryRegisteredConsumerRewardDenomsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRegisteredConsumerRewardDenomsRequest): QueryRegisteredConsumerRewardDenomsRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryRegisteredConsumerRewardDenomsRequest",
      value: QueryRegisteredConsumerRewardDenomsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRegisteredConsumerRewardDenomsResponse(): QueryRegisteredConsumerRewardDenomsResponse {
  return {
    denoms: []
  };
}
export const QueryRegisteredConsumerRewardDenomsResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryRegisteredConsumerRewardDenomsResponse",
  encode(message: QueryRegisteredConsumerRewardDenomsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.denoms) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRegisteredConsumerRewardDenomsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRegisteredConsumerRewardDenomsResponse();
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
  fromPartial(object: Partial<QueryRegisteredConsumerRewardDenomsResponse>): QueryRegisteredConsumerRewardDenomsResponse {
    const message = createBaseQueryRegisteredConsumerRewardDenomsResponse();
    message.denoms = object.denoms?.map(e => e) || [];
    return message;
  },
  fromAmino(object: QueryRegisteredConsumerRewardDenomsResponseAmino): QueryRegisteredConsumerRewardDenomsResponse {
    const message = createBaseQueryRegisteredConsumerRewardDenomsResponse();
    message.denoms = object.denoms?.map(e => e) || [];
    return message;
  },
  toAmino(message: QueryRegisteredConsumerRewardDenomsResponse, useInterfaces: boolean = false): QueryRegisteredConsumerRewardDenomsResponseAmino {
    const obj: any = {};
    if (message.denoms) {
      obj.denoms = message.denoms.map(e => e);
    } else {
      obj.denoms = message.denoms;
    }
    return obj;
  },
  fromAminoMsg(object: QueryRegisteredConsumerRewardDenomsResponseAminoMsg): QueryRegisteredConsumerRewardDenomsResponse {
    return QueryRegisteredConsumerRewardDenomsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRegisteredConsumerRewardDenomsResponseProtoMsg, useInterfaces: boolean = false): QueryRegisteredConsumerRewardDenomsResponse {
    return QueryRegisteredConsumerRewardDenomsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRegisteredConsumerRewardDenomsResponse): Uint8Array {
    return QueryRegisteredConsumerRewardDenomsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRegisteredConsumerRewardDenomsResponse): QueryRegisteredConsumerRewardDenomsResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryRegisteredConsumerRewardDenomsResponse",
      value: QueryRegisteredConsumerRewardDenomsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAllPairsValConsAddrByConsumerRequest(): QueryAllPairsValConsAddrByConsumerRequest {
  return {
    consumerId: ""
  };
}
export const QueryAllPairsValConsAddrByConsumerRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryAllPairsValConsAddrByConsumerRequest",
  encode(message: QueryAllPairsValConsAddrByConsumerRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consumerId !== "") {
      writer.uint32(10).string(message.consumerId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPairsValConsAddrByConsumerRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPairsValConsAddrByConsumerRequest();
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
  fromPartial(object: Partial<QueryAllPairsValConsAddrByConsumerRequest>): QueryAllPairsValConsAddrByConsumerRequest {
    const message = createBaseQueryAllPairsValConsAddrByConsumerRequest();
    message.consumerId = object.consumerId ?? "";
    return message;
  },
  fromAmino(object: QueryAllPairsValConsAddrByConsumerRequestAmino): QueryAllPairsValConsAddrByConsumerRequest {
    const message = createBaseQueryAllPairsValConsAddrByConsumerRequest();
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    return message;
  },
  toAmino(message: QueryAllPairsValConsAddrByConsumerRequest, useInterfaces: boolean = false): QueryAllPairsValConsAddrByConsumerRequestAmino {
    const obj: any = {};
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    return obj;
  },
  fromAminoMsg(object: QueryAllPairsValConsAddrByConsumerRequestAminoMsg): QueryAllPairsValConsAddrByConsumerRequest {
    return QueryAllPairsValConsAddrByConsumerRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPairsValConsAddrByConsumerRequestProtoMsg, useInterfaces: boolean = false): QueryAllPairsValConsAddrByConsumerRequest {
    return QueryAllPairsValConsAddrByConsumerRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPairsValConsAddrByConsumerRequest): Uint8Array {
    return QueryAllPairsValConsAddrByConsumerRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPairsValConsAddrByConsumerRequest): QueryAllPairsValConsAddrByConsumerRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryAllPairsValConsAddrByConsumerRequest",
      value: QueryAllPairsValConsAddrByConsumerRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAllPairsValConsAddrByConsumerResponse(): QueryAllPairsValConsAddrByConsumerResponse {
  return {
    pairValConAddr: []
  };
}
export const QueryAllPairsValConsAddrByConsumerResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryAllPairsValConsAddrByConsumerResponse",
  encode(message: QueryAllPairsValConsAddrByConsumerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.pairValConAddr) {
      PairValConAddrProviderAndConsumer.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAllPairsValConsAddrByConsumerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllPairsValConsAddrByConsumerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pairValConAddr.push(PairValConAddrProviderAndConsumer.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAllPairsValConsAddrByConsumerResponse>): QueryAllPairsValConsAddrByConsumerResponse {
    const message = createBaseQueryAllPairsValConsAddrByConsumerResponse();
    message.pairValConAddr = object.pairValConAddr?.map(e => PairValConAddrProviderAndConsumer.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryAllPairsValConsAddrByConsumerResponseAmino): QueryAllPairsValConsAddrByConsumerResponse {
    const message = createBaseQueryAllPairsValConsAddrByConsumerResponse();
    message.pairValConAddr = object.pair_val_con_addr?.map(e => PairValConAddrProviderAndConsumer.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryAllPairsValConsAddrByConsumerResponse, useInterfaces: boolean = false): QueryAllPairsValConsAddrByConsumerResponseAmino {
    const obj: any = {};
    if (message.pairValConAddr) {
      obj.pair_val_con_addr = message.pairValConAddr.map(e => e ? PairValConAddrProviderAndConsumer.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pair_val_con_addr = message.pairValConAddr;
    }
    return obj;
  },
  fromAminoMsg(object: QueryAllPairsValConsAddrByConsumerResponseAminoMsg): QueryAllPairsValConsAddrByConsumerResponse {
    return QueryAllPairsValConsAddrByConsumerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAllPairsValConsAddrByConsumerResponseProtoMsg, useInterfaces: boolean = false): QueryAllPairsValConsAddrByConsumerResponse {
    return QueryAllPairsValConsAddrByConsumerResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAllPairsValConsAddrByConsumerResponse): Uint8Array {
    return QueryAllPairsValConsAddrByConsumerResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAllPairsValConsAddrByConsumerResponse): QueryAllPairsValConsAddrByConsumerResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryAllPairsValConsAddrByConsumerResponse",
      value: QueryAllPairsValConsAddrByConsumerResponse.encode(message).finish()
    };
  }
};
function createBasePairValConAddrProviderAndConsumer(): PairValConAddrProviderAndConsumer {
  return {
    providerAddress: "",
    consumerAddress: "",
    consumerKey: undefined
  };
}
export const PairValConAddrProviderAndConsumer = {
  typeUrl: "/interchain_security.ccv.provider.v1.PairValConAddrProviderAndConsumer",
  encode(message: PairValConAddrProviderAndConsumer, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.providerAddress !== "") {
      writer.uint32(10).string(message.providerAddress);
    }
    if (message.consumerAddress !== "") {
      writer.uint32(18).string(message.consumerAddress);
    }
    if (message.consumerKey !== undefined) {
      PublicKey.encode(message.consumerKey, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PairValConAddrProviderAndConsumer {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePairValConAddrProviderAndConsumer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.providerAddress = reader.string();
          break;
        case 2:
          message.consumerAddress = reader.string();
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
  fromPartial(object: Partial<PairValConAddrProviderAndConsumer>): PairValConAddrProviderAndConsumer {
    const message = createBasePairValConAddrProviderAndConsumer();
    message.providerAddress = object.providerAddress ?? "";
    message.consumerAddress = object.consumerAddress ?? "";
    message.consumerKey = object.consumerKey !== undefined && object.consumerKey !== null ? PublicKey.fromPartial(object.consumerKey) : undefined;
    return message;
  },
  fromAmino(object: PairValConAddrProviderAndConsumerAmino): PairValConAddrProviderAndConsumer {
    const message = createBasePairValConAddrProviderAndConsumer();
    if (object.provider_address !== undefined && object.provider_address !== null) {
      message.providerAddress = object.provider_address;
    }
    if (object.consumer_address !== undefined && object.consumer_address !== null) {
      message.consumerAddress = object.consumer_address;
    }
    if (object.consumer_key !== undefined && object.consumer_key !== null) {
      message.consumerKey = PublicKey.fromAmino(object.consumer_key);
    }
    return message;
  },
  toAmino(message: PairValConAddrProviderAndConsumer, useInterfaces: boolean = false): PairValConAddrProviderAndConsumerAmino {
    const obj: any = {};
    obj.provider_address = message.providerAddress === "" ? undefined : message.providerAddress;
    obj.consumer_address = message.consumerAddress === "" ? undefined : message.consumerAddress;
    obj.consumer_key = message.consumerKey ? PublicKey.toAmino(message.consumerKey, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: PairValConAddrProviderAndConsumerAminoMsg): PairValConAddrProviderAndConsumer {
    return PairValConAddrProviderAndConsumer.fromAmino(object.value);
  },
  fromProtoMsg(message: PairValConAddrProviderAndConsumerProtoMsg, useInterfaces: boolean = false): PairValConAddrProviderAndConsumer {
    return PairValConAddrProviderAndConsumer.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PairValConAddrProviderAndConsumer): Uint8Array {
    return PairValConAddrProviderAndConsumer.encode(message).finish();
  },
  toProtoMsg(message: PairValConAddrProviderAndConsumer): PairValConAddrProviderAndConsumerProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.PairValConAddrProviderAndConsumer",
      value: PairValConAddrProviderAndConsumer.encode(message).finish()
    };
  }
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest, useInterfaces: boolean = false): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg, useInterfaces: boolean = false): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse, useInterfaces: boolean = false): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg, useInterfaces: boolean = false): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerChainOptedInValidatorsRequest(): QueryConsumerChainOptedInValidatorsRequest {
  return {
    consumerId: ""
  };
}
export const QueryConsumerChainOptedInValidatorsRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainOptedInValidatorsRequest",
  encode(message: QueryConsumerChainOptedInValidatorsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consumerId !== "") {
      writer.uint32(10).string(message.consumerId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsumerChainOptedInValidatorsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainOptedInValidatorsRequest();
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
  fromPartial(object: Partial<QueryConsumerChainOptedInValidatorsRequest>): QueryConsumerChainOptedInValidatorsRequest {
    const message = createBaseQueryConsumerChainOptedInValidatorsRequest();
    message.consumerId = object.consumerId ?? "";
    return message;
  },
  fromAmino(object: QueryConsumerChainOptedInValidatorsRequestAmino): QueryConsumerChainOptedInValidatorsRequest {
    const message = createBaseQueryConsumerChainOptedInValidatorsRequest();
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    return message;
  },
  toAmino(message: QueryConsumerChainOptedInValidatorsRequest, useInterfaces: boolean = false): QueryConsumerChainOptedInValidatorsRequestAmino {
    const obj: any = {};
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    return obj;
  },
  fromAminoMsg(object: QueryConsumerChainOptedInValidatorsRequestAminoMsg): QueryConsumerChainOptedInValidatorsRequest {
    return QueryConsumerChainOptedInValidatorsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerChainOptedInValidatorsRequestProtoMsg, useInterfaces: boolean = false): QueryConsumerChainOptedInValidatorsRequest {
    return QueryConsumerChainOptedInValidatorsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsumerChainOptedInValidatorsRequest): Uint8Array {
    return QueryConsumerChainOptedInValidatorsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerChainOptedInValidatorsRequest): QueryConsumerChainOptedInValidatorsRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainOptedInValidatorsRequest",
      value: QueryConsumerChainOptedInValidatorsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerChainOptedInValidatorsResponse(): QueryConsumerChainOptedInValidatorsResponse {
  return {
    validatorsProviderAddresses: []
  };
}
export const QueryConsumerChainOptedInValidatorsResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainOptedInValidatorsResponse",
  encode(message: QueryConsumerChainOptedInValidatorsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.validatorsProviderAddresses) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsumerChainOptedInValidatorsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainOptedInValidatorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorsProviderAddresses.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsumerChainOptedInValidatorsResponse>): QueryConsumerChainOptedInValidatorsResponse {
    const message = createBaseQueryConsumerChainOptedInValidatorsResponse();
    message.validatorsProviderAddresses = object.validatorsProviderAddresses?.map(e => e) || [];
    return message;
  },
  fromAmino(object: QueryConsumerChainOptedInValidatorsResponseAmino): QueryConsumerChainOptedInValidatorsResponse {
    const message = createBaseQueryConsumerChainOptedInValidatorsResponse();
    message.validatorsProviderAddresses = object.validators_provider_addresses?.map(e => e) || [];
    return message;
  },
  toAmino(message: QueryConsumerChainOptedInValidatorsResponse, useInterfaces: boolean = false): QueryConsumerChainOptedInValidatorsResponseAmino {
    const obj: any = {};
    if (message.validatorsProviderAddresses) {
      obj.validators_provider_addresses = message.validatorsProviderAddresses.map(e => e);
    } else {
      obj.validators_provider_addresses = message.validatorsProviderAddresses;
    }
    return obj;
  },
  fromAminoMsg(object: QueryConsumerChainOptedInValidatorsResponseAminoMsg): QueryConsumerChainOptedInValidatorsResponse {
    return QueryConsumerChainOptedInValidatorsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerChainOptedInValidatorsResponseProtoMsg, useInterfaces: boolean = false): QueryConsumerChainOptedInValidatorsResponse {
    return QueryConsumerChainOptedInValidatorsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsumerChainOptedInValidatorsResponse): Uint8Array {
    return QueryConsumerChainOptedInValidatorsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerChainOptedInValidatorsResponse): QueryConsumerChainOptedInValidatorsResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainOptedInValidatorsResponse",
      value: QueryConsumerChainOptedInValidatorsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerValidatorsRequest(): QueryConsumerValidatorsRequest {
  return {
    consumerId: ""
  };
}
export const QueryConsumerValidatorsRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerValidatorsRequest",
  encode(message: QueryConsumerValidatorsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consumerId !== "") {
      writer.uint32(10).string(message.consumerId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsumerValidatorsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerValidatorsRequest();
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
  fromPartial(object: Partial<QueryConsumerValidatorsRequest>): QueryConsumerValidatorsRequest {
    const message = createBaseQueryConsumerValidatorsRequest();
    message.consumerId = object.consumerId ?? "";
    return message;
  },
  fromAmino(object: QueryConsumerValidatorsRequestAmino): QueryConsumerValidatorsRequest {
    const message = createBaseQueryConsumerValidatorsRequest();
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    return message;
  },
  toAmino(message: QueryConsumerValidatorsRequest, useInterfaces: boolean = false): QueryConsumerValidatorsRequestAmino {
    const obj: any = {};
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    return obj;
  },
  fromAminoMsg(object: QueryConsumerValidatorsRequestAminoMsg): QueryConsumerValidatorsRequest {
    return QueryConsumerValidatorsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerValidatorsRequestProtoMsg, useInterfaces: boolean = false): QueryConsumerValidatorsRequest {
    return QueryConsumerValidatorsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsumerValidatorsRequest): Uint8Array {
    return QueryConsumerValidatorsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerValidatorsRequest): QueryConsumerValidatorsRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerValidatorsRequest",
      value: QueryConsumerValidatorsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerValidatorsValidator(): QueryConsumerValidatorsValidator {
  return {
    providerAddress: "",
    consumerKey: undefined,
    power: BigInt(0),
    rate: "",
    consumerPower: BigInt(0),
    consumerCommissionRate: "",
    providerCommissionRate: "",
    description: Description.fromPartial({}),
    providerOperatorAddress: "",
    jailed: false,
    status: 0,
    providerTokens: "",
    providerPower: BigInt(0),
    validatesCurrentEpoch: false
  };
}
export const QueryConsumerValidatorsValidator = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerValidatorsValidator",
  encode(message: QueryConsumerValidatorsValidator, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.providerAddress !== "") {
      writer.uint32(10).string(message.providerAddress);
    }
    if (message.consumerKey !== undefined) {
      PublicKey.encode(message.consumerKey, writer.uint32(18).fork()).ldelim();
    }
    if (message.power !== BigInt(0)) {
      writer.uint32(24).int64(message.power);
    }
    if (message.rate !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.rate, 18).atomics);
    }
    if (message.consumerPower !== BigInt(0)) {
      writer.uint32(40).int64(message.consumerPower);
    }
    if (message.consumerCommissionRate !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.consumerCommissionRate, 18).atomics);
    }
    if (message.providerCommissionRate !== "") {
      writer.uint32(58).string(Decimal.fromUserInput(message.providerCommissionRate, 18).atomics);
    }
    if (message.description !== undefined) {
      Description.encode(message.description, writer.uint32(66).fork()).ldelim();
    }
    if (message.providerOperatorAddress !== "") {
      writer.uint32(74).string(message.providerOperatorAddress);
    }
    if (message.jailed === true) {
      writer.uint32(80).bool(message.jailed);
    }
    if (message.status !== 0) {
      writer.uint32(88).int32(message.status);
    }
    if (message.providerTokens !== "") {
      writer.uint32(98).string(message.providerTokens);
    }
    if (message.providerPower !== BigInt(0)) {
      writer.uint32(104).int64(message.providerPower);
    }
    if (message.validatesCurrentEpoch === true) {
      writer.uint32(112).bool(message.validatesCurrentEpoch);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsumerValidatorsValidator {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerValidatorsValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.providerAddress = reader.string();
          break;
        case 2:
          message.consumerKey = PublicKey.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.power = reader.int64();
          break;
        case 4:
          message.rate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.consumerPower = reader.int64();
          break;
        case 6:
          message.consumerCommissionRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.providerCommissionRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 8:
          message.description = Description.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 9:
          message.providerOperatorAddress = reader.string();
          break;
        case 10:
          message.jailed = reader.bool();
          break;
        case 11:
          message.status = (reader.int32() as any);
          break;
        case 12:
          message.providerTokens = reader.string();
          break;
        case 13:
          message.providerPower = reader.int64();
          break;
        case 14:
          message.validatesCurrentEpoch = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsumerValidatorsValidator>): QueryConsumerValidatorsValidator {
    const message = createBaseQueryConsumerValidatorsValidator();
    message.providerAddress = object.providerAddress ?? "";
    message.consumerKey = object.consumerKey !== undefined && object.consumerKey !== null ? PublicKey.fromPartial(object.consumerKey) : undefined;
    message.power = object.power !== undefined && object.power !== null ? BigInt(object.power.toString()) : BigInt(0);
    message.rate = object.rate ?? "";
    message.consumerPower = object.consumerPower !== undefined && object.consumerPower !== null ? BigInt(object.consumerPower.toString()) : BigInt(0);
    message.consumerCommissionRate = object.consumerCommissionRate ?? "";
    message.providerCommissionRate = object.providerCommissionRate ?? "";
    message.description = object.description !== undefined && object.description !== null ? Description.fromPartial(object.description) : undefined;
    message.providerOperatorAddress = object.providerOperatorAddress ?? "";
    message.jailed = object.jailed ?? false;
    message.status = object.status ?? 0;
    message.providerTokens = object.providerTokens ?? "";
    message.providerPower = object.providerPower !== undefined && object.providerPower !== null ? BigInt(object.providerPower.toString()) : BigInt(0);
    message.validatesCurrentEpoch = object.validatesCurrentEpoch ?? false;
    return message;
  },
  fromAmino(object: QueryConsumerValidatorsValidatorAmino): QueryConsumerValidatorsValidator {
    const message = createBaseQueryConsumerValidatorsValidator();
    if (object.provider_address !== undefined && object.provider_address !== null) {
      message.providerAddress = object.provider_address;
    }
    if (object.consumer_key !== undefined && object.consumer_key !== null) {
      message.consumerKey = PublicKey.fromAmino(object.consumer_key);
    }
    if (object.power !== undefined && object.power !== null) {
      message.power = BigInt(object.power);
    }
    if (object.rate !== undefined && object.rate !== null) {
      message.rate = object.rate;
    }
    if (object.consumer_power !== undefined && object.consumer_power !== null) {
      message.consumerPower = BigInt(object.consumer_power);
    }
    if (object.consumer_commission_rate !== undefined && object.consumer_commission_rate !== null) {
      message.consumerCommissionRate = object.consumer_commission_rate;
    }
    if (object.provider_commission_rate !== undefined && object.provider_commission_rate !== null) {
      message.providerCommissionRate = object.provider_commission_rate;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = Description.fromAmino(object.description);
    }
    if (object.provider_operator_address !== undefined && object.provider_operator_address !== null) {
      message.providerOperatorAddress = object.provider_operator_address;
    }
    if (object.jailed !== undefined && object.jailed !== null) {
      message.jailed = object.jailed;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.provider_tokens !== undefined && object.provider_tokens !== null) {
      message.providerTokens = object.provider_tokens;
    }
    if (object.provider_power !== undefined && object.provider_power !== null) {
      message.providerPower = BigInt(object.provider_power);
    }
    if (object.validates_current_epoch !== undefined && object.validates_current_epoch !== null) {
      message.validatesCurrentEpoch = object.validates_current_epoch;
    }
    return message;
  },
  toAmino(message: QueryConsumerValidatorsValidator, useInterfaces: boolean = false): QueryConsumerValidatorsValidatorAmino {
    const obj: any = {};
    obj.provider_address = message.providerAddress === "" ? undefined : message.providerAddress;
    obj.consumer_key = message.consumerKey ? PublicKey.toAmino(message.consumerKey, useInterfaces) : undefined;
    obj.power = message.power !== BigInt(0) ? message.power.toString() : undefined;
    obj.rate = message.rate === "" ? undefined : message.rate;
    obj.consumer_power = message.consumerPower !== BigInt(0) ? message.consumerPower.toString() : undefined;
    obj.consumer_commission_rate = message.consumerCommissionRate === "" ? undefined : message.consumerCommissionRate;
    obj.provider_commission_rate = message.providerCommissionRate === "" ? undefined : message.providerCommissionRate;
    obj.description = message.description ? Description.toAmino(message.description, useInterfaces) : undefined;
    obj.provider_operator_address = message.providerOperatorAddress === "" ? undefined : message.providerOperatorAddress;
    obj.jailed = message.jailed === false ? undefined : message.jailed;
    obj.status = message.status === 0 ? undefined : message.status;
    obj.provider_tokens = message.providerTokens === "" ? undefined : message.providerTokens;
    obj.provider_power = message.providerPower !== BigInt(0) ? message.providerPower.toString() : undefined;
    obj.validates_current_epoch = message.validatesCurrentEpoch === false ? undefined : message.validatesCurrentEpoch;
    return obj;
  },
  fromAminoMsg(object: QueryConsumerValidatorsValidatorAminoMsg): QueryConsumerValidatorsValidator {
    return QueryConsumerValidatorsValidator.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerValidatorsValidatorProtoMsg, useInterfaces: boolean = false): QueryConsumerValidatorsValidator {
    return QueryConsumerValidatorsValidator.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsumerValidatorsValidator): Uint8Array {
    return QueryConsumerValidatorsValidator.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerValidatorsValidator): QueryConsumerValidatorsValidatorProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerValidatorsValidator",
      value: QueryConsumerValidatorsValidator.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerValidatorsResponse(): QueryConsumerValidatorsResponse {
  return {
    validators: []
  };
}
export const QueryConsumerValidatorsResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerValidatorsResponse",
  encode(message: QueryConsumerValidatorsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.validators) {
      QueryConsumerValidatorsValidator.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsumerValidatorsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerValidatorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validators.push(QueryConsumerValidatorsValidator.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsumerValidatorsResponse>): QueryConsumerValidatorsResponse {
    const message = createBaseQueryConsumerValidatorsResponse();
    message.validators = object.validators?.map(e => QueryConsumerValidatorsValidator.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryConsumerValidatorsResponseAmino): QueryConsumerValidatorsResponse {
    const message = createBaseQueryConsumerValidatorsResponse();
    message.validators = object.validators?.map(e => QueryConsumerValidatorsValidator.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryConsumerValidatorsResponse, useInterfaces: boolean = false): QueryConsumerValidatorsResponseAmino {
    const obj: any = {};
    if (message.validators) {
      obj.validators = message.validators.map(e => e ? QueryConsumerValidatorsValidator.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.validators = message.validators;
    }
    return obj;
  },
  fromAminoMsg(object: QueryConsumerValidatorsResponseAminoMsg): QueryConsumerValidatorsResponse {
    return QueryConsumerValidatorsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerValidatorsResponseProtoMsg, useInterfaces: boolean = false): QueryConsumerValidatorsResponse {
    return QueryConsumerValidatorsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsumerValidatorsResponse): Uint8Array {
    return QueryConsumerValidatorsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerValidatorsResponse): QueryConsumerValidatorsResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerValidatorsResponse",
      value: QueryConsumerValidatorsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerChainsValidatorHasToValidateRequest(): QueryConsumerChainsValidatorHasToValidateRequest {
  return {
    providerAddress: ""
  };
}
export const QueryConsumerChainsValidatorHasToValidateRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainsValidatorHasToValidateRequest",
  encode(message: QueryConsumerChainsValidatorHasToValidateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.providerAddress !== "") {
      writer.uint32(10).string(message.providerAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsumerChainsValidatorHasToValidateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainsValidatorHasToValidateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.providerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsumerChainsValidatorHasToValidateRequest>): QueryConsumerChainsValidatorHasToValidateRequest {
    const message = createBaseQueryConsumerChainsValidatorHasToValidateRequest();
    message.providerAddress = object.providerAddress ?? "";
    return message;
  },
  fromAmino(object: QueryConsumerChainsValidatorHasToValidateRequestAmino): QueryConsumerChainsValidatorHasToValidateRequest {
    const message = createBaseQueryConsumerChainsValidatorHasToValidateRequest();
    if (object.provider_address !== undefined && object.provider_address !== null) {
      message.providerAddress = object.provider_address;
    }
    return message;
  },
  toAmino(message: QueryConsumerChainsValidatorHasToValidateRequest, useInterfaces: boolean = false): QueryConsumerChainsValidatorHasToValidateRequestAmino {
    const obj: any = {};
    obj.provider_address = message.providerAddress === "" ? undefined : message.providerAddress;
    return obj;
  },
  fromAminoMsg(object: QueryConsumerChainsValidatorHasToValidateRequestAminoMsg): QueryConsumerChainsValidatorHasToValidateRequest {
    return QueryConsumerChainsValidatorHasToValidateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerChainsValidatorHasToValidateRequestProtoMsg, useInterfaces: boolean = false): QueryConsumerChainsValidatorHasToValidateRequest {
    return QueryConsumerChainsValidatorHasToValidateRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsumerChainsValidatorHasToValidateRequest): Uint8Array {
    return QueryConsumerChainsValidatorHasToValidateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerChainsValidatorHasToValidateRequest): QueryConsumerChainsValidatorHasToValidateRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainsValidatorHasToValidateRequest",
      value: QueryConsumerChainsValidatorHasToValidateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerChainsValidatorHasToValidateResponse(): QueryConsumerChainsValidatorHasToValidateResponse {
  return {
    consumerIds: []
  };
}
export const QueryConsumerChainsValidatorHasToValidateResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainsValidatorHasToValidateResponse",
  encode(message: QueryConsumerChainsValidatorHasToValidateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.consumerIds) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsumerChainsValidatorHasToValidateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainsValidatorHasToValidateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerIds.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsumerChainsValidatorHasToValidateResponse>): QueryConsumerChainsValidatorHasToValidateResponse {
    const message = createBaseQueryConsumerChainsValidatorHasToValidateResponse();
    message.consumerIds = object.consumerIds?.map(e => e) || [];
    return message;
  },
  fromAmino(object: QueryConsumerChainsValidatorHasToValidateResponseAmino): QueryConsumerChainsValidatorHasToValidateResponse {
    const message = createBaseQueryConsumerChainsValidatorHasToValidateResponse();
    message.consumerIds = object.consumer_ids?.map(e => e) || [];
    return message;
  },
  toAmino(message: QueryConsumerChainsValidatorHasToValidateResponse, useInterfaces: boolean = false): QueryConsumerChainsValidatorHasToValidateResponseAmino {
    const obj: any = {};
    if (message.consumerIds) {
      obj.consumer_ids = message.consumerIds.map(e => e);
    } else {
      obj.consumer_ids = message.consumerIds;
    }
    return obj;
  },
  fromAminoMsg(object: QueryConsumerChainsValidatorHasToValidateResponseAminoMsg): QueryConsumerChainsValidatorHasToValidateResponse {
    return QueryConsumerChainsValidatorHasToValidateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerChainsValidatorHasToValidateResponseProtoMsg, useInterfaces: boolean = false): QueryConsumerChainsValidatorHasToValidateResponse {
    return QueryConsumerChainsValidatorHasToValidateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsumerChainsValidatorHasToValidateResponse): Uint8Array {
    return QueryConsumerChainsValidatorHasToValidateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerChainsValidatorHasToValidateResponse): QueryConsumerChainsValidatorHasToValidateResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainsValidatorHasToValidateResponse",
      value: QueryConsumerChainsValidatorHasToValidateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryValidatorConsumerCommissionRateRequest(): QueryValidatorConsumerCommissionRateRequest {
  return {
    consumerId: "",
    providerAddress: ""
  };
}
export const QueryValidatorConsumerCommissionRateRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerCommissionRateRequest",
  encode(message: QueryValidatorConsumerCommissionRateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consumerId !== "") {
      writer.uint32(10).string(message.consumerId);
    }
    if (message.providerAddress !== "") {
      writer.uint32(18).string(message.providerAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryValidatorConsumerCommissionRateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorConsumerCommissionRateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerId = reader.string();
          break;
        case 2:
          message.providerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryValidatorConsumerCommissionRateRequest>): QueryValidatorConsumerCommissionRateRequest {
    const message = createBaseQueryValidatorConsumerCommissionRateRequest();
    message.consumerId = object.consumerId ?? "";
    message.providerAddress = object.providerAddress ?? "";
    return message;
  },
  fromAmino(object: QueryValidatorConsumerCommissionRateRequestAmino): QueryValidatorConsumerCommissionRateRequest {
    const message = createBaseQueryValidatorConsumerCommissionRateRequest();
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    if (object.provider_address !== undefined && object.provider_address !== null) {
      message.providerAddress = object.provider_address;
    }
    return message;
  },
  toAmino(message: QueryValidatorConsumerCommissionRateRequest, useInterfaces: boolean = false): QueryValidatorConsumerCommissionRateRequestAmino {
    const obj: any = {};
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    obj.provider_address = message.providerAddress === "" ? undefined : message.providerAddress;
    return obj;
  },
  fromAminoMsg(object: QueryValidatorConsumerCommissionRateRequestAminoMsg): QueryValidatorConsumerCommissionRateRequest {
    return QueryValidatorConsumerCommissionRateRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryValidatorConsumerCommissionRateRequestProtoMsg, useInterfaces: boolean = false): QueryValidatorConsumerCommissionRateRequest {
    return QueryValidatorConsumerCommissionRateRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryValidatorConsumerCommissionRateRequest): Uint8Array {
    return QueryValidatorConsumerCommissionRateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryValidatorConsumerCommissionRateRequest): QueryValidatorConsumerCommissionRateRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerCommissionRateRequest",
      value: QueryValidatorConsumerCommissionRateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryValidatorConsumerCommissionRateResponse(): QueryValidatorConsumerCommissionRateResponse {
  return {
    rate: ""
  };
}
export const QueryValidatorConsumerCommissionRateResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerCommissionRateResponse",
  encode(message: QueryValidatorConsumerCommissionRateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rate !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.rate, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryValidatorConsumerCommissionRateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorConsumerCommissionRateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryValidatorConsumerCommissionRateResponse>): QueryValidatorConsumerCommissionRateResponse {
    const message = createBaseQueryValidatorConsumerCommissionRateResponse();
    message.rate = object.rate ?? "";
    return message;
  },
  fromAmino(object: QueryValidatorConsumerCommissionRateResponseAmino): QueryValidatorConsumerCommissionRateResponse {
    const message = createBaseQueryValidatorConsumerCommissionRateResponse();
    if (object.rate !== undefined && object.rate !== null) {
      message.rate = object.rate;
    }
    return message;
  },
  toAmino(message: QueryValidatorConsumerCommissionRateResponse, useInterfaces: boolean = false): QueryValidatorConsumerCommissionRateResponseAmino {
    const obj: any = {};
    obj.rate = message.rate === "" ? undefined : message.rate;
    return obj;
  },
  fromAminoMsg(object: QueryValidatorConsumerCommissionRateResponseAminoMsg): QueryValidatorConsumerCommissionRateResponse {
    return QueryValidatorConsumerCommissionRateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryValidatorConsumerCommissionRateResponseProtoMsg, useInterfaces: boolean = false): QueryValidatorConsumerCommissionRateResponse {
    return QueryValidatorConsumerCommissionRateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryValidatorConsumerCommissionRateResponse): Uint8Array {
    return QueryValidatorConsumerCommissionRateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryValidatorConsumerCommissionRateResponse): QueryValidatorConsumerCommissionRateResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryValidatorConsumerCommissionRateResponse",
      value: QueryValidatorConsumerCommissionRateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryBlocksUntilNextEpochRequest(): QueryBlocksUntilNextEpochRequest {
  return {};
}
export const QueryBlocksUntilNextEpochRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryBlocksUntilNextEpochRequest",
  encode(_: QueryBlocksUntilNextEpochRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryBlocksUntilNextEpochRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBlocksUntilNextEpochRequest();
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
  fromPartial(_: Partial<QueryBlocksUntilNextEpochRequest>): QueryBlocksUntilNextEpochRequest {
    const message = createBaseQueryBlocksUntilNextEpochRequest();
    return message;
  },
  fromAmino(_: QueryBlocksUntilNextEpochRequestAmino): QueryBlocksUntilNextEpochRequest {
    const message = createBaseQueryBlocksUntilNextEpochRequest();
    return message;
  },
  toAmino(_: QueryBlocksUntilNextEpochRequest, useInterfaces: boolean = false): QueryBlocksUntilNextEpochRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryBlocksUntilNextEpochRequestAminoMsg): QueryBlocksUntilNextEpochRequest {
    return QueryBlocksUntilNextEpochRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBlocksUntilNextEpochRequestProtoMsg, useInterfaces: boolean = false): QueryBlocksUntilNextEpochRequest {
    return QueryBlocksUntilNextEpochRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryBlocksUntilNextEpochRequest): Uint8Array {
    return QueryBlocksUntilNextEpochRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryBlocksUntilNextEpochRequest): QueryBlocksUntilNextEpochRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryBlocksUntilNextEpochRequest",
      value: QueryBlocksUntilNextEpochRequest.encode(message).finish()
    };
  }
};
function createBaseQueryBlocksUntilNextEpochResponse(): QueryBlocksUntilNextEpochResponse {
  return {
    blocksUntilNextEpoch: BigInt(0)
  };
}
export const QueryBlocksUntilNextEpochResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryBlocksUntilNextEpochResponse",
  encode(message: QueryBlocksUntilNextEpochResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.blocksUntilNextEpoch !== BigInt(0)) {
      writer.uint32(8).uint64(message.blocksUntilNextEpoch);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryBlocksUntilNextEpochResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBlocksUntilNextEpochResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blocksUntilNextEpoch = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryBlocksUntilNextEpochResponse>): QueryBlocksUntilNextEpochResponse {
    const message = createBaseQueryBlocksUntilNextEpochResponse();
    message.blocksUntilNextEpoch = object.blocksUntilNextEpoch !== undefined && object.blocksUntilNextEpoch !== null ? BigInt(object.blocksUntilNextEpoch.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryBlocksUntilNextEpochResponseAmino): QueryBlocksUntilNextEpochResponse {
    const message = createBaseQueryBlocksUntilNextEpochResponse();
    if (object.blocks_until_next_epoch !== undefined && object.blocks_until_next_epoch !== null) {
      message.blocksUntilNextEpoch = BigInt(object.blocks_until_next_epoch);
    }
    return message;
  },
  toAmino(message: QueryBlocksUntilNextEpochResponse, useInterfaces: boolean = false): QueryBlocksUntilNextEpochResponseAmino {
    const obj: any = {};
    obj.blocks_until_next_epoch = message.blocksUntilNextEpoch !== BigInt(0) ? message.blocksUntilNextEpoch.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBlocksUntilNextEpochResponseAminoMsg): QueryBlocksUntilNextEpochResponse {
    return QueryBlocksUntilNextEpochResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBlocksUntilNextEpochResponseProtoMsg, useInterfaces: boolean = false): QueryBlocksUntilNextEpochResponse {
    return QueryBlocksUntilNextEpochResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryBlocksUntilNextEpochResponse): Uint8Array {
    return QueryBlocksUntilNextEpochResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryBlocksUntilNextEpochResponse): QueryBlocksUntilNextEpochResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryBlocksUntilNextEpochResponse",
      value: QueryBlocksUntilNextEpochResponse.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerIdFromClientIdRequest(): QueryConsumerIdFromClientIdRequest {
  return {
    clientId: ""
  };
}
export const QueryConsumerIdFromClientIdRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerIdFromClientIdRequest",
  encode(message: QueryConsumerIdFromClientIdRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsumerIdFromClientIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerIdFromClientIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsumerIdFromClientIdRequest>): QueryConsumerIdFromClientIdRequest {
    const message = createBaseQueryConsumerIdFromClientIdRequest();
    message.clientId = object.clientId ?? "";
    return message;
  },
  fromAmino(object: QueryConsumerIdFromClientIdRequestAmino): QueryConsumerIdFromClientIdRequest {
    const message = createBaseQueryConsumerIdFromClientIdRequest();
    if (object.client_id !== undefined && object.client_id !== null) {
      message.clientId = object.client_id;
    }
    return message;
  },
  toAmino(message: QueryConsumerIdFromClientIdRequest, useInterfaces: boolean = false): QueryConsumerIdFromClientIdRequestAmino {
    const obj: any = {};
    obj.client_id = message.clientId === "" ? undefined : message.clientId;
    return obj;
  },
  fromAminoMsg(object: QueryConsumerIdFromClientIdRequestAminoMsg): QueryConsumerIdFromClientIdRequest {
    return QueryConsumerIdFromClientIdRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerIdFromClientIdRequestProtoMsg, useInterfaces: boolean = false): QueryConsumerIdFromClientIdRequest {
    return QueryConsumerIdFromClientIdRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsumerIdFromClientIdRequest): Uint8Array {
    return QueryConsumerIdFromClientIdRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerIdFromClientIdRequest): QueryConsumerIdFromClientIdRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerIdFromClientIdRequest",
      value: QueryConsumerIdFromClientIdRequest.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerIdFromClientIdResponse(): QueryConsumerIdFromClientIdResponse {
  return {
    consumerId: ""
  };
}
export const QueryConsumerIdFromClientIdResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerIdFromClientIdResponse",
  encode(message: QueryConsumerIdFromClientIdResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consumerId !== "") {
      writer.uint32(10).string(message.consumerId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsumerIdFromClientIdResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerIdFromClientIdResponse();
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
  fromPartial(object: Partial<QueryConsumerIdFromClientIdResponse>): QueryConsumerIdFromClientIdResponse {
    const message = createBaseQueryConsumerIdFromClientIdResponse();
    message.consumerId = object.consumerId ?? "";
    return message;
  },
  fromAmino(object: QueryConsumerIdFromClientIdResponseAmino): QueryConsumerIdFromClientIdResponse {
    const message = createBaseQueryConsumerIdFromClientIdResponse();
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    return message;
  },
  toAmino(message: QueryConsumerIdFromClientIdResponse, useInterfaces: boolean = false): QueryConsumerIdFromClientIdResponseAmino {
    const obj: any = {};
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    return obj;
  },
  fromAminoMsg(object: QueryConsumerIdFromClientIdResponseAminoMsg): QueryConsumerIdFromClientIdResponse {
    return QueryConsumerIdFromClientIdResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerIdFromClientIdResponseProtoMsg, useInterfaces: boolean = false): QueryConsumerIdFromClientIdResponse {
    return QueryConsumerIdFromClientIdResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsumerIdFromClientIdResponse): Uint8Array {
    return QueryConsumerIdFromClientIdResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerIdFromClientIdResponse): QueryConsumerIdFromClientIdResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerIdFromClientIdResponse",
      value: QueryConsumerIdFromClientIdResponse.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerChainRequest(): QueryConsumerChainRequest {
  return {
    consumerId: ""
  };
}
export const QueryConsumerChainRequest = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainRequest",
  encode(message: QueryConsumerChainRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consumerId !== "") {
      writer.uint32(10).string(message.consumerId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsumerChainRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainRequest();
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
  fromPartial(object: Partial<QueryConsumerChainRequest>): QueryConsumerChainRequest {
    const message = createBaseQueryConsumerChainRequest();
    message.consumerId = object.consumerId ?? "";
    return message;
  },
  fromAmino(object: QueryConsumerChainRequestAmino): QueryConsumerChainRequest {
    const message = createBaseQueryConsumerChainRequest();
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    return message;
  },
  toAmino(message: QueryConsumerChainRequest, useInterfaces: boolean = false): QueryConsumerChainRequestAmino {
    const obj: any = {};
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    return obj;
  },
  fromAminoMsg(object: QueryConsumerChainRequestAminoMsg): QueryConsumerChainRequest {
    return QueryConsumerChainRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerChainRequestProtoMsg, useInterfaces: boolean = false): QueryConsumerChainRequest {
    return QueryConsumerChainRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsumerChainRequest): Uint8Array {
    return QueryConsumerChainRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerChainRequest): QueryConsumerChainRequestProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainRequest",
      value: QueryConsumerChainRequest.encode(message).finish()
    };
  }
};
function createBaseQueryConsumerChainResponse(): QueryConsumerChainResponse {
  return {
    consumerId: "",
    chainId: "",
    ownerAddress: "",
    phase: "",
    metadata: ConsumerMetadata.fromPartial({}),
    initParams: undefined,
    powerShapingParams: undefined
  };
}
export const QueryConsumerChainResponse = {
  typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainResponse",
  encode(message: QueryConsumerChainResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consumerId !== "") {
      writer.uint32(10).string(message.consumerId);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    if (message.ownerAddress !== "") {
      writer.uint32(26).string(message.ownerAddress);
    }
    if (message.phase !== "") {
      writer.uint32(34).string(message.phase);
    }
    if (message.metadata !== undefined) {
      ConsumerMetadata.encode(message.metadata, writer.uint32(42).fork()).ldelim();
    }
    if (message.initParams !== undefined) {
      ConsumerInitializationParameters.encode(message.initParams, writer.uint32(50).fork()).ldelim();
    }
    if (message.powerShapingParams !== undefined) {
      PowerShapingParameters.encode(message.powerShapingParams, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryConsumerChainResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerId = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        case 3:
          message.ownerAddress = reader.string();
          break;
        case 4:
          message.phase = reader.string();
          break;
        case 5:
          message.metadata = ConsumerMetadata.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.initParams = ConsumerInitializationParameters.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 7:
          message.powerShapingParams = PowerShapingParameters.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsumerChainResponse>): QueryConsumerChainResponse {
    const message = createBaseQueryConsumerChainResponse();
    message.consumerId = object.consumerId ?? "";
    message.chainId = object.chainId ?? "";
    message.ownerAddress = object.ownerAddress ?? "";
    message.phase = object.phase ?? "";
    message.metadata = object.metadata !== undefined && object.metadata !== null ? ConsumerMetadata.fromPartial(object.metadata) : undefined;
    message.initParams = object.initParams !== undefined && object.initParams !== null ? ConsumerInitializationParameters.fromPartial(object.initParams) : undefined;
    message.powerShapingParams = object.powerShapingParams !== undefined && object.powerShapingParams !== null ? PowerShapingParameters.fromPartial(object.powerShapingParams) : undefined;
    return message;
  },
  fromAmino(object: QueryConsumerChainResponseAmino): QueryConsumerChainResponse {
    const message = createBaseQueryConsumerChainResponse();
    if (object.consumer_id !== undefined && object.consumer_id !== null) {
      message.consumerId = object.consumer_id;
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.owner_address !== undefined && object.owner_address !== null) {
      message.ownerAddress = object.owner_address;
    }
    if (object.phase !== undefined && object.phase !== null) {
      message.phase = object.phase;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = ConsumerMetadata.fromAmino(object.metadata);
    }
    if (object.init_params !== undefined && object.init_params !== null) {
      message.initParams = ConsumerInitializationParameters.fromAmino(object.init_params);
    }
    if (object.power_shaping_params !== undefined && object.power_shaping_params !== null) {
      message.powerShapingParams = PowerShapingParameters.fromAmino(object.power_shaping_params);
    }
    return message;
  },
  toAmino(message: QueryConsumerChainResponse, useInterfaces: boolean = false): QueryConsumerChainResponseAmino {
    const obj: any = {};
    obj.consumer_id = message.consumerId === "" ? undefined : message.consumerId;
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.owner_address = message.ownerAddress === "" ? undefined : message.ownerAddress;
    obj.phase = message.phase === "" ? undefined : message.phase;
    obj.metadata = message.metadata ? ConsumerMetadata.toAmino(message.metadata, useInterfaces) : undefined;
    obj.init_params = message.initParams ? ConsumerInitializationParameters.toAmino(message.initParams, useInterfaces) : undefined;
    obj.power_shaping_params = message.powerShapingParams ? PowerShapingParameters.toAmino(message.powerShapingParams, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryConsumerChainResponseAminoMsg): QueryConsumerChainResponse {
    return QueryConsumerChainResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryConsumerChainResponseProtoMsg, useInterfaces: boolean = false): QueryConsumerChainResponse {
    return QueryConsumerChainResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryConsumerChainResponse): Uint8Array {
    return QueryConsumerChainResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryConsumerChainResponse): QueryConsumerChainResponseProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.QueryConsumerChainResponse",
      value: QueryConsumerChainResponse.encode(message).finish()
    };
  }
};