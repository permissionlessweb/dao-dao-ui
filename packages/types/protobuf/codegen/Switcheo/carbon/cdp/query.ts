//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { RateStrategyParams, RateStrategyParamsAmino, RateStrategyParamsSDKType } from "./rate_strategy_params";
import { AssetParamsAPI, AssetParamsAPIAmino, AssetParamsAPISDKType } from "./asset_params";
import { DebtInfo, DebtInfoAmino, DebtInfoSDKType } from "./debt_info";
import { StablecoinDebtInfo, StablecoinDebtInfoAmino, StablecoinDebtInfoSDKType } from "./stablecoin_debt_info";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { RewardScheme, RewardSchemeAmino, RewardSchemeSDKType, RewardDebt, RewardDebtAmino, RewardDebtSDKType } from "./reward_scheme";
import { EModeCategory, EModeCategoryAmino, EModeCategorySDKType } from "./e_mode_category";
import { StablecoinInterestInfo, StablecoinInterestInfoAmino, StablecoinInterestInfoSDKType } from "./stablecoin_interest_info";
import { CDPLiquidations, CDPLiquidationsAmino, CDPLiquidationsSDKType } from "./cdp_liquidations";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryParamsRequest";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryParamsResponse";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
export interface QueryRateStrategyRequest {
  name: string;
}
export interface QueryRateStrategyRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryRateStrategyRequest";
  value: Uint8Array;
}
export interface QueryRateStrategyRequestAmino {
  name?: string;
}
export interface QueryRateStrategyRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryRateStrategyRequest";
  value: QueryRateStrategyRequestAmino;
}
export interface QueryRateStrategyRequestSDKType {
  name: string;
}
export interface QueryRateStrategyResponse {
  rateStrategyParams?: RateStrategyParams | undefined;
}
export interface QueryRateStrategyResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryRateStrategyResponse";
  value: Uint8Array;
}
export interface QueryRateStrategyResponseAmino {
  rate_strategy_params?: RateStrategyParamsAmino | undefined;
}
export interface QueryRateStrategyResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryRateStrategyResponse";
  value: QueryRateStrategyResponseAmino;
}
export interface QueryRateStrategyResponseSDKType {
  rate_strategy_params?: RateStrategyParamsSDKType | undefined;
}
export interface QueryRateStrategyAllRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryRateStrategyAllRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryRateStrategyAllRequest";
  value: Uint8Array;
}
export interface QueryRateStrategyAllRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryRateStrategyAllRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryRateStrategyAllRequest";
  value: QueryRateStrategyAllRequestAmino;
}
export interface QueryRateStrategyAllRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryRateStrategyAllResponse {
  rateStrategyParamsAll: RateStrategyParams[];
  pagination?: PageResponse | undefined;
}
export interface QueryRateStrategyAllResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryRateStrategyAllResponse";
  value: Uint8Array;
}
export interface QueryRateStrategyAllResponseAmino {
  rate_strategy_params_all?: RateStrategyParamsAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryRateStrategyAllResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryRateStrategyAllResponse";
  value: QueryRateStrategyAllResponseAmino;
}
export interface QueryRateStrategyAllResponseSDKType {
  rate_strategy_params_all: RateStrategyParamsSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryAccountDataRequest {
  address: string;
}
export interface QueryAccountDataRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountDataRequest";
  value: Uint8Array;
}
export interface QueryAccountDataRequestAmino {
  address?: string;
}
export interface QueryAccountDataRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryAccountDataRequest";
  value: QueryAccountDataRequestAmino;
}
export interface QueryAccountDataRequestSDKType {
  address: string;
}
export interface QueryAccountDataResponse {
  totalCollateralsUsd: string;
  totalDebtsUsd: string;
  availableBorrowsUsd: string;
  currLiquidationThreshold: string;
}
export interface QueryAccountDataResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountDataResponse";
  value: Uint8Array;
}
export interface QueryAccountDataResponseAmino {
  total_collaterals_usd?: string;
  total_debts_usd?: string;
  available_borrows_usd?: string;
  curr_liquidation_threshold?: string;
}
export interface QueryAccountDataResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryAccountDataResponse";
  value: QueryAccountDataResponseAmino;
}
export interface QueryAccountDataResponseSDKType {
  total_collaterals_usd: string;
  total_debts_usd: string;
  available_borrows_usd: string;
  curr_liquidation_threshold: string;
}
export interface QueryAccountCollateralRequest {
  address: string;
  cibtDenom: string;
}
export interface QueryAccountCollateralRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountCollateralRequest";
  value: Uint8Array;
}
export interface QueryAccountCollateralRequestAmino {
  address?: string;
  cibt_denom?: string;
}
export interface QueryAccountCollateralRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryAccountCollateralRequest";
  value: QueryAccountCollateralRequestAmino;
}
export interface QueryAccountCollateralRequestSDKType {
  address: string;
  cibt_denom: string;
}
export interface QueryAccountCollateralResponse {
  collateral?: Collateral | undefined;
}
export interface QueryAccountCollateralResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountCollateralResponse";
  value: Uint8Array;
}
export interface QueryAccountCollateralResponseAmino {
  collateral?: CollateralAmino | undefined;
}
export interface QueryAccountCollateralResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryAccountCollateralResponse";
  value: QueryAccountCollateralResponseAmino;
}
export interface QueryAccountCollateralResponseSDKType {
  collateral?: CollateralSDKType | undefined;
}
export interface QueryAccountCollateralAllRequest {
  address: string;
  pagination?: PageRequest | undefined;
}
export interface QueryAccountCollateralAllRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountCollateralAllRequest";
  value: Uint8Array;
}
export interface QueryAccountCollateralAllRequestAmino {
  address?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAccountCollateralAllRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryAccountCollateralAllRequest";
  value: QueryAccountCollateralAllRequestAmino;
}
export interface QueryAccountCollateralAllRequestSDKType {
  address: string;
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAccountCollateralAllResponse {
  collaterals: Collateral[];
  pagination?: PageResponse | undefined;
}
export interface QueryAccountCollateralAllResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountCollateralAllResponse";
  value: Uint8Array;
}
export interface QueryAccountCollateralAllResponseAmino {
  collaterals?: CollateralAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAccountCollateralAllResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryAccountCollateralAllResponse";
  value: QueryAccountCollateralAllResponseAmino;
}
export interface QueryAccountCollateralAllResponseSDKType {
  collaterals: CollateralSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface Collateral {
  denom: string;
  cibtDenom: string;
  collateralAmount: string;
}
export interface CollateralProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.Collateral";
  value: Uint8Array;
}
export interface CollateralAmino {
  denom?: string;
  cibt_denom?: string;
  collateral_amount?: string;
}
export interface CollateralAminoMsg {
  type: "/Switcheo.carbon.cdp.Collateral";
  value: CollateralAmino;
}
export interface CollateralSDKType {
  denom: string;
  cibt_denom: string;
  collateral_amount: string;
}
export interface QueryAccountDebtRequest {
  address: string;
  denom: string;
}
export interface QueryAccountDebtRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountDebtRequest";
  value: Uint8Array;
}
export interface QueryAccountDebtRequestAmino {
  address?: string;
  denom?: string;
}
export interface QueryAccountDebtRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryAccountDebtRequest";
  value: QueryAccountDebtRequestAmino;
}
export interface QueryAccountDebtRequestSDKType {
  address: string;
  denom: string;
}
export interface QueryAccountDebtResponse {
  debt?: Debt | undefined;
}
export interface QueryAccountDebtResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountDebtResponse";
  value: Uint8Array;
}
export interface QueryAccountDebtResponseAmino {
  debt?: DebtAmino | undefined;
}
export interface QueryAccountDebtResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryAccountDebtResponse";
  value: QueryAccountDebtResponseAmino;
}
export interface QueryAccountDebtResponseSDKType {
  debt?: DebtSDKType | undefined;
}
export interface QueryAccountDebtAllRequest {
  address: string;
  pagination?: PageRequest | undefined;
}
export interface QueryAccountDebtAllRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountDebtAllRequest";
  value: Uint8Array;
}
export interface QueryAccountDebtAllRequestAmino {
  address?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAccountDebtAllRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryAccountDebtAllRequest";
  value: QueryAccountDebtAllRequestAmino;
}
export interface QueryAccountDebtAllRequestSDKType {
  address: string;
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAccountDebtAllResponse {
  debts: Debt[];
  pagination?: PageResponse | undefined;
}
export interface QueryAccountDebtAllResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountDebtAllResponse";
  value: Uint8Array;
}
export interface QueryAccountDebtAllResponseAmino {
  debts?: DebtAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAccountDebtAllResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryAccountDebtAllResponse";
  value: QueryAccountDebtAllResponseAmino;
}
export interface QueryAccountDebtAllResponseSDKType {
  debts: DebtSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface Debt {
  denom: string;
  principal: string;
  initialCumulativeInterestMultiplier: string;
}
export interface DebtProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.Debt";
  value: Uint8Array;
}
export interface DebtAmino {
  denom?: string;
  principal?: string;
  initial_cumulative_interest_multiplier?: string;
}
export interface DebtAminoMsg {
  type: "/Switcheo.carbon.cdp.Debt";
  value: DebtAmino;
}
export interface DebtSDKType {
  denom: string;
  principal: string;
  initial_cumulative_interest_multiplier: string;
}
export interface QueryAccountStablecoinRequest {
  address: string;
}
export interface QueryAccountStablecoinRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountStablecoinRequest";
  value: Uint8Array;
}
export interface QueryAccountStablecoinRequestAmino {
  address?: string;
}
export interface QueryAccountStablecoinRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryAccountStablecoinRequest";
  value: QueryAccountStablecoinRequestAmino;
}
export interface QueryAccountStablecoinRequestSDKType {
  address: string;
}
export interface QueryAccountStablecoinResponse {
  principal: string;
  interest: string;
  initialCumulativeInterestMultiplier: string;
}
export interface QueryAccountStablecoinResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountStablecoinResponse";
  value: Uint8Array;
}
export interface QueryAccountStablecoinResponseAmino {
  principal?: string;
  interest?: string;
  initial_cumulative_interest_multiplier?: string;
}
export interface QueryAccountStablecoinResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryAccountStablecoinResponse";
  value: QueryAccountStablecoinResponseAmino;
}
export interface QueryAccountStablecoinResponseSDKType {
  principal: string;
  interest: string;
  initial_cumulative_interest_multiplier: string;
}
export interface QueryAssetRequest {
  denom: string;
}
export interface QueryAssetRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryAssetRequest";
  value: Uint8Array;
}
export interface QueryAssetRequestAmino {
  denom?: string;
}
export interface QueryAssetRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryAssetRequest";
  value: QueryAssetRequestAmino;
}
export interface QueryAssetRequestSDKType {
  denom: string;
}
export interface QueryAssetResponse {
  assetParams?: AssetParamsAPI | undefined;
}
export interface QueryAssetResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryAssetResponse";
  value: Uint8Array;
}
export interface QueryAssetResponseAmino {
  asset_params?: AssetParamsAPIAmino | undefined;
}
export interface QueryAssetResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryAssetResponse";
  value: QueryAssetResponseAmino;
}
export interface QueryAssetResponseSDKType {
  asset_params?: AssetParamsAPISDKType | undefined;
}
export interface QueryAssetAllRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryAssetAllRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryAssetAllRequest";
  value: Uint8Array;
}
export interface QueryAssetAllRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryAssetAllRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryAssetAllRequest";
  value: QueryAssetAllRequestAmino;
}
export interface QueryAssetAllRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryAssetAllResponse {
  assetParamsAll: AssetParamsAPI[];
  pagination?: PageResponse | undefined;
}
export interface QueryAssetAllResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryAssetAllResponse";
  value: Uint8Array;
}
export interface QueryAssetAllResponseAmino {
  asset_params_all?: AssetParamsAPIAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryAssetAllResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryAssetAllResponse";
  value: QueryAssetAllResponseAmino;
}
export interface QueryAssetAllResponseSDKType {
  asset_params_all: AssetParamsAPISDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryTokenDebtRequest {
  denom: string;
}
export interface QueryTokenDebtRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryTokenDebtRequest";
  value: Uint8Array;
}
export interface QueryTokenDebtRequestAmino {
  denom?: string;
}
export interface QueryTokenDebtRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryTokenDebtRequest";
  value: QueryTokenDebtRequestAmino;
}
export interface QueryTokenDebtRequestSDKType {
  denom: string;
}
export interface QueryTokenDebtResponse {
  debtInfo?: DebtInfo | undefined;
}
export interface QueryTokenDebtResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryTokenDebtResponse";
  value: Uint8Array;
}
export interface QueryTokenDebtResponseAmino {
  debt_info?: DebtInfoAmino | undefined;
}
export interface QueryTokenDebtResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryTokenDebtResponse";
  value: QueryTokenDebtResponseAmino;
}
export interface QueryTokenDebtResponseSDKType {
  debt_info?: DebtInfoSDKType | undefined;
}
export interface QueryTokenDebtAllRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryTokenDebtAllRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryTokenDebtAllRequest";
  value: Uint8Array;
}
export interface QueryTokenDebtAllRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryTokenDebtAllRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryTokenDebtAllRequest";
  value: QueryTokenDebtAllRequestAmino;
}
export interface QueryTokenDebtAllRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryTokenDebtAllResponse {
  debtInfosAll: DebtInfo[];
  pagination?: PageResponse | undefined;
}
export interface QueryTokenDebtAllResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryTokenDebtAllResponse";
  value: Uint8Array;
}
export interface QueryTokenDebtAllResponseAmino {
  debt_infos_all?: DebtInfoAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryTokenDebtAllResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryTokenDebtAllResponse";
  value: QueryTokenDebtAllResponseAmino;
}
export interface QueryTokenDebtAllResponseSDKType {
  debt_infos_all: DebtInfoSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryStablecoinDebtRequest {}
export interface QueryStablecoinDebtRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryStablecoinDebtRequest";
  value: Uint8Array;
}
export interface QueryStablecoinDebtRequestAmino {}
export interface QueryStablecoinDebtRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryStablecoinDebtRequest";
  value: QueryStablecoinDebtRequestAmino;
}
export interface QueryStablecoinDebtRequestSDKType {}
export interface QueryStablecoinDebtResponse {
  stablecoinDebtInfo?: StablecoinDebtInfo | undefined;
}
export interface QueryStablecoinDebtResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryStablecoinDebtResponse";
  value: Uint8Array;
}
export interface QueryStablecoinDebtResponseAmino {
  stablecoin_debt_info?: StablecoinDebtInfoAmino | undefined;
}
export interface QueryStablecoinDebtResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryStablecoinDebtResponse";
  value: QueryStablecoinDebtResponseAmino;
}
export interface QueryStablecoinDebtResponseSDKType {
  stablecoin_debt_info?: StablecoinDebtInfoSDKType | undefined;
}
export interface CdpPositionItem {
  address: string;
  denom: string;
  cibtDenom: string;
  healthFactor: string;
  collateralAmount: string;
  borrowAmount: string;
  mintDenom: string;
  mintAmount: string;
}
export interface CdpPositionItemProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.CdpPositionItem";
  value: Uint8Array;
}
export interface CdpPositionItemAmino {
  address?: string;
  denom?: string;
  cibt_denom?: string;
  health_factor?: string;
  collateral_amount?: string;
  borrow_amount?: string;
  mint_denom?: string;
  mint_amount?: string;
}
export interface CdpPositionItemAminoMsg {
  type: "/Switcheo.carbon.cdp.CdpPositionItem";
  value: CdpPositionItemAmino;
}
export interface CdpPositionItemSDKType {
  address: string;
  denom: string;
  cibt_denom: string;
  health_factor: string;
  collateral_amount: string;
  borrow_amount: string;
  mint_denom: string;
  mint_amount: string;
}
export interface CdpPosition {
  address: string;
  healthFactor: string;
  collateral: Coin[];
  borrow: Coin[];
  mint: Coin[];
}
export interface CdpPositionProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.CdpPosition";
  value: Uint8Array;
}
export interface CdpPositionAmino {
  address?: string;
  health_factor?: string;
  collateral?: CoinAmino[];
  borrow?: CoinAmino[];
  mint?: CoinAmino[];
}
export interface CdpPositionAminoMsg {
  type: "/Switcheo.carbon.cdp.CdpPosition";
  value: CdpPositionAmino;
}
export interface CdpPositionSDKType {
  address: string;
  health_factor: string;
  collateral: CoinSDKType[];
  borrow: CoinSDKType[];
  mint: CoinSDKType[];
}
export interface QueryCdpPositionRequest {
  address: string;
}
export interface QueryCdpPositionRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryCdpPositionRequest";
  value: Uint8Array;
}
export interface QueryCdpPositionRequestAmino {
  address?: string;
}
export interface QueryCdpPositionRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryCdpPositionRequest";
  value: QueryCdpPositionRequestAmino;
}
export interface QueryCdpPositionRequestSDKType {
  address: string;
}
export interface QueryCdpPositionResponse {
  position?: CdpPosition | undefined;
}
export interface QueryCdpPositionResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryCdpPositionResponse";
  value: Uint8Array;
}
export interface QueryCdpPositionResponseAmino {
  position?: CdpPositionAmino | undefined;
}
export interface QueryCdpPositionResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryCdpPositionResponse";
  value: QueryCdpPositionResponseAmino;
}
export interface QueryCdpPositionResponseSDKType {
  position?: CdpPositionSDKType | undefined;
}
export interface QueryCdpPositionsRequest {
  pagination?: PageRequest | undefined;
  maxHealthFactor?: string;
  minHealthFactor?: string;
}
export interface QueryCdpPositionsRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryCdpPositionsRequest";
  value: Uint8Array;
}
export interface QueryCdpPositionsRequestAmino {
  pagination?: PageRequestAmino | undefined;
  max_health_factor?: string;
  min_health_factor?: string;
}
export interface QueryCdpPositionsRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryCdpPositionsRequest";
  value: QueryCdpPositionsRequestAmino;
}
export interface QueryCdpPositionsRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
  max_health_factor?: string;
  min_health_factor?: string;
}
export interface QueryCdpPositionsResponse {
  positions: CdpPosition[];
  pagination?: PageResponse | undefined;
}
export interface QueryCdpPositionsResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryCdpPositionsResponse";
  value: Uint8Array;
}
export interface QueryCdpPositionsResponseAmino {
  positions?: CdpPositionAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryCdpPositionsResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryCdpPositionsResponse";
  value: QueryCdpPositionsResponseAmino;
}
export interface QueryCdpPositionsResponseSDKType {
  positions: CdpPositionSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryRewardSchemesAllRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryRewardSchemesAllRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryRewardSchemesAllRequest";
  value: Uint8Array;
}
export interface QueryRewardSchemesAllRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryRewardSchemesAllRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryRewardSchemesAllRequest";
  value: QueryRewardSchemesAllRequestAmino;
}
export interface QueryRewardSchemesAllRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryRewardSchemesAllResponse {
  rewardSchemes: RewardScheme[];
  pagination?: PageResponse | undefined;
}
export interface QueryRewardSchemesAllResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryRewardSchemesAllResponse";
  value: Uint8Array;
}
export interface QueryRewardSchemesAllResponseAmino {
  reward_schemes?: RewardSchemeAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryRewardSchemesAllResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryRewardSchemesAllResponse";
  value: QueryRewardSchemesAllResponseAmino;
}
export interface QueryRewardSchemesAllResponseSDKType {
  reward_schemes: RewardSchemeSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryRewardDebtsRequest {
  address: string;
  pagination?: PageRequest | undefined;
}
export interface QueryRewardDebtsRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryRewardDebtsRequest";
  value: Uint8Array;
}
export interface QueryRewardDebtsRequestAmino {
  address?: string;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryRewardDebtsRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryRewardDebtsRequest";
  value: QueryRewardDebtsRequestAmino;
}
export interface QueryRewardDebtsRequestSDKType {
  address: string;
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryRewardDebtsResponse {
  rewardDebts: RewardDebt[];
  pagination?: PageResponse | undefined;
}
export interface QueryRewardDebtsResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryRewardDebtsResponse";
  value: Uint8Array;
}
export interface QueryRewardDebtsResponseAmino {
  reward_debts?: RewardDebtAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryRewardDebtsResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryRewardDebtsResponse";
  value: QueryRewardDebtsResponseAmino;
}
export interface QueryRewardDebtsResponseSDKType {
  reward_debts: RewardDebtSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryRewardDebtsAllRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryRewardDebtsAllRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryRewardDebtsAllRequest";
  value: Uint8Array;
}
export interface QueryRewardDebtsAllRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryRewardDebtsAllRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryRewardDebtsAllRequest";
  value: QueryRewardDebtsAllRequestAmino;
}
export interface QueryRewardDebtsAllRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryEModeAllRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryEModeAllRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryEModeAllRequest";
  value: Uint8Array;
}
export interface QueryEModeAllRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryEModeAllRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryEModeAllRequest";
  value: QueryEModeAllRequestAmino;
}
export interface QueryEModeAllRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryEModeAllResponse {
  eModeCategories: EModeCategory[];
  pagination?: PageResponse | undefined;
}
export interface QueryEModeAllResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryEModeAllResponse";
  value: Uint8Array;
}
export interface QueryEModeAllResponseAmino {
  e_mode_categories?: EModeCategoryAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryEModeAllResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryEModeAllResponse";
  value: QueryEModeAllResponseAmino;
}
export interface QueryEModeAllResponseSDKType {
  e_mode_categories: EModeCategorySDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface QueryStablecoinInterestRequest {}
export interface QueryStablecoinInterestRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryStablecoinInterestRequest";
  value: Uint8Array;
}
export interface QueryStablecoinInterestRequestAmino {}
export interface QueryStablecoinInterestRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryStablecoinInterestRequest";
  value: QueryStablecoinInterestRequestAmino;
}
export interface QueryStablecoinInterestRequestSDKType {}
export interface QueryStablecoinInterestResponse {
  stablecoinInterestInfo?: StablecoinInterestInfo | undefined;
}
export interface QueryStablecoinInterestResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryStablecoinInterestResponse";
  value: Uint8Array;
}
export interface QueryStablecoinInterestResponseAmino {
  stablecoin_interest_info?: StablecoinInterestInfoAmino | undefined;
}
export interface QueryStablecoinInterestResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryStablecoinInterestResponse";
  value: QueryStablecoinInterestResponseAmino;
}
export interface QueryStablecoinInterestResponseSDKType {
  stablecoin_interest_info?: StablecoinInterestInfoSDKType | undefined;
}
export interface QueryEModeRequest {
  name: string;
}
export interface QueryEModeRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryEModeRequest";
  value: Uint8Array;
}
export interface QueryEModeRequestAmino {
  name?: string;
}
export interface QueryEModeRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryEModeRequest";
  value: QueryEModeRequestAmino;
}
export interface QueryEModeRequestSDKType {
  name: string;
}
export interface QueryEModeResponse {
  eModeCategory: EModeCategory | undefined;
}
export interface QueryEModeResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryEModeResponse";
  value: Uint8Array;
}
export interface QueryEModeResponseAmino {
  e_mode_category?: EModeCategoryAmino | undefined;
}
export interface QueryEModeResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryEModeResponse";
  value: QueryEModeResponseAmino;
}
export interface QueryEModeResponseSDKType {
  e_mode_category: EModeCategorySDKType | undefined;
}
export interface QueryHealthFactorRequest {
  address: string;
}
export interface QueryHealthFactorRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryHealthFactorRequest";
  value: Uint8Array;
}
export interface QueryHealthFactorRequestAmino {
  address?: string;
}
export interface QueryHealthFactorRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryHealthFactorRequest";
  value: QueryHealthFactorRequestAmino;
}
export interface QueryHealthFactorRequestSDKType {
  address: string;
}
export interface QueryHealthFactorResponse {
  healthFactor: string;
}
export interface QueryHealthFactorResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryHealthFactorResponse";
  value: Uint8Array;
}
export interface QueryHealthFactorResponseAmino {
  health_factor?: string;
}
export interface QueryHealthFactorResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryHealthFactorResponse";
  value: QueryHealthFactorResponseAmino;
}
export interface QueryHealthFactorResponseSDKType {
  health_factor: string;
}
export interface QueryAccountEModeRequest {
  address: string;
}
export interface QueryAccountEModeRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountEModeRequest";
  value: Uint8Array;
}
export interface QueryAccountEModeRequestAmino {
  address?: string;
}
export interface QueryAccountEModeRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryAccountEModeRequest";
  value: QueryAccountEModeRequestAmino;
}
export interface QueryAccountEModeRequestSDKType {
  address: string;
}
export interface QueryAccountEModeResponse {
  eModeCategoryName: string;
}
export interface QueryAccountEModeResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountEModeResponse";
  value: Uint8Array;
}
export interface QueryAccountEModeResponseAmino {
  e_mode_category_name?: string;
}
export interface QueryAccountEModeResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryAccountEModeResponse";
  value: QueryAccountEModeResponseAmino;
}
export interface QueryAccountEModeResponseSDKType {
  e_mode_category_name: string;
}
export interface QueryCDPLiquidationsAllRequest {
  pagination?: PageRequest | undefined;
}
export interface QueryCDPLiquidationsAllRequestProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryCDPLiquidationsAllRequest";
  value: Uint8Array;
}
export interface QueryCDPLiquidationsAllRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface QueryCDPLiquidationsAllRequestAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryCDPLiquidationsAllRequest";
  value: QueryCDPLiquidationsAllRequestAmino;
}
export interface QueryCDPLiquidationsAllRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface QueryCDPLiquidationsAllResponse {
  cdpLiquidationsAll: CDPLiquidations[];
  pagination?: PageResponse | undefined;
}
export interface QueryCDPLiquidationsAllResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.QueryCDPLiquidationsAllResponse";
  value: Uint8Array;
}
export interface QueryCDPLiquidationsAllResponseAmino {
  cdp_liquidations_all?: CDPLiquidationsAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface QueryCDPLiquidationsAllResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.QueryCDPLiquidationsAllResponse";
  value: QueryCDPLiquidationsAllResponseAmino;
}
export interface QueryCDPLiquidationsAllResponseSDKType {
  cdp_liquidations_all: CDPLiquidationsSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryParamsRequest",
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
      typeUrl: "/Switcheo.carbon.cdp.QueryParamsRequest",
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
  typeUrl: "/Switcheo.carbon.cdp.QueryParamsResponse",
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
      typeUrl: "/Switcheo.carbon.cdp.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRateStrategyRequest(): QueryRateStrategyRequest {
  return {
    name: ""
  };
}
export const QueryRateStrategyRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryRateStrategyRequest",
  encode(message: QueryRateStrategyRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRateStrategyRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRateStrategyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRateStrategyRequest>): QueryRateStrategyRequest {
    const message = createBaseQueryRateStrategyRequest();
    message.name = object.name ?? "";
    return message;
  },
  fromAmino(object: QueryRateStrategyRequestAmino): QueryRateStrategyRequest {
    const message = createBaseQueryRateStrategyRequest();
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    return message;
  },
  toAmino(message: QueryRateStrategyRequest, useInterfaces: boolean = false): QueryRateStrategyRequestAmino {
    const obj: any = {};
    obj.name = message.name === "" ? undefined : message.name;
    return obj;
  },
  fromAminoMsg(object: QueryRateStrategyRequestAminoMsg): QueryRateStrategyRequest {
    return QueryRateStrategyRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRateStrategyRequestProtoMsg, useInterfaces: boolean = false): QueryRateStrategyRequest {
    return QueryRateStrategyRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRateStrategyRequest): Uint8Array {
    return QueryRateStrategyRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRateStrategyRequest): QueryRateStrategyRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryRateStrategyRequest",
      value: QueryRateStrategyRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRateStrategyResponse(): QueryRateStrategyResponse {
  return {
    rateStrategyParams: undefined
  };
}
export const QueryRateStrategyResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryRateStrategyResponse",
  encode(message: QueryRateStrategyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rateStrategyParams !== undefined) {
      RateStrategyParams.encode(message.rateStrategyParams, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRateStrategyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRateStrategyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rateStrategyParams = RateStrategyParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRateStrategyResponse>): QueryRateStrategyResponse {
    const message = createBaseQueryRateStrategyResponse();
    message.rateStrategyParams = object.rateStrategyParams !== undefined && object.rateStrategyParams !== null ? RateStrategyParams.fromPartial(object.rateStrategyParams) : undefined;
    return message;
  },
  fromAmino(object: QueryRateStrategyResponseAmino): QueryRateStrategyResponse {
    const message = createBaseQueryRateStrategyResponse();
    if (object.rate_strategy_params !== undefined && object.rate_strategy_params !== null) {
      message.rateStrategyParams = RateStrategyParams.fromAmino(object.rate_strategy_params);
    }
    return message;
  },
  toAmino(message: QueryRateStrategyResponse, useInterfaces: boolean = false): QueryRateStrategyResponseAmino {
    const obj: any = {};
    obj.rate_strategy_params = message.rateStrategyParams ? RateStrategyParams.toAmino(message.rateStrategyParams, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRateStrategyResponseAminoMsg): QueryRateStrategyResponse {
    return QueryRateStrategyResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRateStrategyResponseProtoMsg, useInterfaces: boolean = false): QueryRateStrategyResponse {
    return QueryRateStrategyResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRateStrategyResponse): Uint8Array {
    return QueryRateStrategyResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRateStrategyResponse): QueryRateStrategyResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryRateStrategyResponse",
      value: QueryRateStrategyResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRateStrategyAllRequest(): QueryRateStrategyAllRequest {
  return {
    pagination: undefined
  };
}
export const QueryRateStrategyAllRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryRateStrategyAllRequest",
  encode(message: QueryRateStrategyAllRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRateStrategyAllRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRateStrategyAllRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRateStrategyAllRequest>): QueryRateStrategyAllRequest {
    const message = createBaseQueryRateStrategyAllRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryRateStrategyAllRequestAmino): QueryRateStrategyAllRequest {
    const message = createBaseQueryRateStrategyAllRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryRateStrategyAllRequest, useInterfaces: boolean = false): QueryRateStrategyAllRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRateStrategyAllRequestAminoMsg): QueryRateStrategyAllRequest {
    return QueryRateStrategyAllRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRateStrategyAllRequestProtoMsg, useInterfaces: boolean = false): QueryRateStrategyAllRequest {
    return QueryRateStrategyAllRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRateStrategyAllRequest): Uint8Array {
    return QueryRateStrategyAllRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRateStrategyAllRequest): QueryRateStrategyAllRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryRateStrategyAllRequest",
      value: QueryRateStrategyAllRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRateStrategyAllResponse(): QueryRateStrategyAllResponse {
  return {
    rateStrategyParamsAll: [],
    pagination: undefined
  };
}
export const QueryRateStrategyAllResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryRateStrategyAllResponse",
  encode(message: QueryRateStrategyAllResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.rateStrategyParamsAll) {
      RateStrategyParams.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRateStrategyAllResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRateStrategyAllResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rateStrategyParamsAll.push(RateStrategyParams.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryRateStrategyAllResponse>): QueryRateStrategyAllResponse {
    const message = createBaseQueryRateStrategyAllResponse();
    message.rateStrategyParamsAll = object.rateStrategyParamsAll?.map(e => RateStrategyParams.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryRateStrategyAllResponseAmino): QueryRateStrategyAllResponse {
    const message = createBaseQueryRateStrategyAllResponse();
    message.rateStrategyParamsAll = object.rate_strategy_params_all?.map(e => RateStrategyParams.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryRateStrategyAllResponse, useInterfaces: boolean = false): QueryRateStrategyAllResponseAmino {
    const obj: any = {};
    if (message.rateStrategyParamsAll) {
      obj.rate_strategy_params_all = message.rateStrategyParamsAll.map(e => e ? RateStrategyParams.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.rate_strategy_params_all = message.rateStrategyParamsAll;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRateStrategyAllResponseAminoMsg): QueryRateStrategyAllResponse {
    return QueryRateStrategyAllResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRateStrategyAllResponseProtoMsg, useInterfaces: boolean = false): QueryRateStrategyAllResponse {
    return QueryRateStrategyAllResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRateStrategyAllResponse): Uint8Array {
    return QueryRateStrategyAllResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRateStrategyAllResponse): QueryRateStrategyAllResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryRateStrategyAllResponse",
      value: QueryRateStrategyAllResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAccountDataRequest(): QueryAccountDataRequest {
  return {
    address: ""
  };
}
export const QueryAccountDataRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountDataRequest",
  encode(message: QueryAccountDataRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAccountDataRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAccountDataRequest>): QueryAccountDataRequest {
    const message = createBaseQueryAccountDataRequest();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QueryAccountDataRequestAmino): QueryAccountDataRequest {
    const message = createBaseQueryAccountDataRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QueryAccountDataRequest, useInterfaces: boolean = false): QueryAccountDataRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: QueryAccountDataRequestAminoMsg): QueryAccountDataRequest {
    return QueryAccountDataRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAccountDataRequestProtoMsg, useInterfaces: boolean = false): QueryAccountDataRequest {
    return QueryAccountDataRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAccountDataRequest): Uint8Array {
    return QueryAccountDataRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountDataRequest): QueryAccountDataRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryAccountDataRequest",
      value: QueryAccountDataRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAccountDataResponse(): QueryAccountDataResponse {
  return {
    totalCollateralsUsd: "",
    totalDebtsUsd: "",
    availableBorrowsUsd: "",
    currLiquidationThreshold: ""
  };
}
export const QueryAccountDataResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountDataResponse",
  encode(message: QueryAccountDataResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.totalCollateralsUsd !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.totalCollateralsUsd, 18).atomics);
    }
    if (message.totalDebtsUsd !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.totalDebtsUsd, 18).atomics);
    }
    if (message.availableBorrowsUsd !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.availableBorrowsUsd, 18).atomics);
    }
    if (message.currLiquidationThreshold !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.currLiquidationThreshold, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAccountDataResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountDataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.totalCollateralsUsd = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.totalDebtsUsd = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.availableBorrowsUsd = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.currLiquidationThreshold = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAccountDataResponse>): QueryAccountDataResponse {
    const message = createBaseQueryAccountDataResponse();
    message.totalCollateralsUsd = object.totalCollateralsUsd ?? "";
    message.totalDebtsUsd = object.totalDebtsUsd ?? "";
    message.availableBorrowsUsd = object.availableBorrowsUsd ?? "";
    message.currLiquidationThreshold = object.currLiquidationThreshold ?? "";
    return message;
  },
  fromAmino(object: QueryAccountDataResponseAmino): QueryAccountDataResponse {
    const message = createBaseQueryAccountDataResponse();
    if (object.total_collaterals_usd !== undefined && object.total_collaterals_usd !== null) {
      message.totalCollateralsUsd = object.total_collaterals_usd;
    }
    if (object.total_debts_usd !== undefined && object.total_debts_usd !== null) {
      message.totalDebtsUsd = object.total_debts_usd;
    }
    if (object.available_borrows_usd !== undefined && object.available_borrows_usd !== null) {
      message.availableBorrowsUsd = object.available_borrows_usd;
    }
    if (object.curr_liquidation_threshold !== undefined && object.curr_liquidation_threshold !== null) {
      message.currLiquidationThreshold = object.curr_liquidation_threshold;
    }
    return message;
  },
  toAmino(message: QueryAccountDataResponse, useInterfaces: boolean = false): QueryAccountDataResponseAmino {
    const obj: any = {};
    obj.total_collaterals_usd = message.totalCollateralsUsd === "" ? undefined : message.totalCollateralsUsd;
    obj.total_debts_usd = message.totalDebtsUsd === "" ? undefined : message.totalDebtsUsd;
    obj.available_borrows_usd = message.availableBorrowsUsd === "" ? undefined : message.availableBorrowsUsd;
    obj.curr_liquidation_threshold = message.currLiquidationThreshold === "" ? undefined : message.currLiquidationThreshold;
    return obj;
  },
  fromAminoMsg(object: QueryAccountDataResponseAminoMsg): QueryAccountDataResponse {
    return QueryAccountDataResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAccountDataResponseProtoMsg, useInterfaces: boolean = false): QueryAccountDataResponse {
    return QueryAccountDataResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAccountDataResponse): Uint8Array {
    return QueryAccountDataResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountDataResponse): QueryAccountDataResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryAccountDataResponse",
      value: QueryAccountDataResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAccountCollateralRequest(): QueryAccountCollateralRequest {
  return {
    address: "",
    cibtDenom: ""
  };
}
export const QueryAccountCollateralRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountCollateralRequest",
  encode(message: QueryAccountCollateralRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.cibtDenom !== "") {
      writer.uint32(18).string(message.cibtDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAccountCollateralRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountCollateralRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.cibtDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAccountCollateralRequest>): QueryAccountCollateralRequest {
    const message = createBaseQueryAccountCollateralRequest();
    message.address = object.address ?? "";
    message.cibtDenom = object.cibtDenom ?? "";
    return message;
  },
  fromAmino(object: QueryAccountCollateralRequestAmino): QueryAccountCollateralRequest {
    const message = createBaseQueryAccountCollateralRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.cibt_denom !== undefined && object.cibt_denom !== null) {
      message.cibtDenom = object.cibt_denom;
    }
    return message;
  },
  toAmino(message: QueryAccountCollateralRequest, useInterfaces: boolean = false): QueryAccountCollateralRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.cibt_denom = message.cibtDenom === "" ? undefined : message.cibtDenom;
    return obj;
  },
  fromAminoMsg(object: QueryAccountCollateralRequestAminoMsg): QueryAccountCollateralRequest {
    return QueryAccountCollateralRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAccountCollateralRequestProtoMsg, useInterfaces: boolean = false): QueryAccountCollateralRequest {
    return QueryAccountCollateralRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAccountCollateralRequest): Uint8Array {
    return QueryAccountCollateralRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountCollateralRequest): QueryAccountCollateralRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryAccountCollateralRequest",
      value: QueryAccountCollateralRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAccountCollateralResponse(): QueryAccountCollateralResponse {
  return {
    collateral: undefined
  };
}
export const QueryAccountCollateralResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountCollateralResponse",
  encode(message: QueryAccountCollateralResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.collateral !== undefined) {
      Collateral.encode(message.collateral, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAccountCollateralResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountCollateralResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collateral = Collateral.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAccountCollateralResponse>): QueryAccountCollateralResponse {
    const message = createBaseQueryAccountCollateralResponse();
    message.collateral = object.collateral !== undefined && object.collateral !== null ? Collateral.fromPartial(object.collateral) : undefined;
    return message;
  },
  fromAmino(object: QueryAccountCollateralResponseAmino): QueryAccountCollateralResponse {
    const message = createBaseQueryAccountCollateralResponse();
    if (object.collateral !== undefined && object.collateral !== null) {
      message.collateral = Collateral.fromAmino(object.collateral);
    }
    return message;
  },
  toAmino(message: QueryAccountCollateralResponse, useInterfaces: boolean = false): QueryAccountCollateralResponseAmino {
    const obj: any = {};
    obj.collateral = message.collateral ? Collateral.toAmino(message.collateral, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAccountCollateralResponseAminoMsg): QueryAccountCollateralResponse {
    return QueryAccountCollateralResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAccountCollateralResponseProtoMsg, useInterfaces: boolean = false): QueryAccountCollateralResponse {
    return QueryAccountCollateralResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAccountCollateralResponse): Uint8Array {
    return QueryAccountCollateralResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountCollateralResponse): QueryAccountCollateralResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryAccountCollateralResponse",
      value: QueryAccountCollateralResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAccountCollateralAllRequest(): QueryAccountCollateralAllRequest {
  return {
    address: "",
    pagination: undefined
  };
}
export const QueryAccountCollateralAllRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountCollateralAllRequest",
  encode(message: QueryAccountCollateralAllRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAccountCollateralAllRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountCollateralAllRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
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
  fromPartial(object: Partial<QueryAccountCollateralAllRequest>): QueryAccountCollateralAllRequest {
    const message = createBaseQueryAccountCollateralAllRequest();
    message.address = object.address ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAccountCollateralAllRequestAmino): QueryAccountCollateralAllRequest {
    const message = createBaseQueryAccountCollateralAllRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAccountCollateralAllRequest, useInterfaces: boolean = false): QueryAccountCollateralAllRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAccountCollateralAllRequestAminoMsg): QueryAccountCollateralAllRequest {
    return QueryAccountCollateralAllRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAccountCollateralAllRequestProtoMsg, useInterfaces: boolean = false): QueryAccountCollateralAllRequest {
    return QueryAccountCollateralAllRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAccountCollateralAllRequest): Uint8Array {
    return QueryAccountCollateralAllRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountCollateralAllRequest): QueryAccountCollateralAllRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryAccountCollateralAllRequest",
      value: QueryAccountCollateralAllRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAccountCollateralAllResponse(): QueryAccountCollateralAllResponse {
  return {
    collaterals: [],
    pagination: undefined
  };
}
export const QueryAccountCollateralAllResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountCollateralAllResponse",
  encode(message: QueryAccountCollateralAllResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.collaterals) {
      Collateral.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAccountCollateralAllResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountCollateralAllResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collaterals.push(Collateral.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryAccountCollateralAllResponse>): QueryAccountCollateralAllResponse {
    const message = createBaseQueryAccountCollateralAllResponse();
    message.collaterals = object.collaterals?.map(e => Collateral.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAccountCollateralAllResponseAmino): QueryAccountCollateralAllResponse {
    const message = createBaseQueryAccountCollateralAllResponse();
    message.collaterals = object.collaterals?.map(e => Collateral.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAccountCollateralAllResponse, useInterfaces: boolean = false): QueryAccountCollateralAllResponseAmino {
    const obj: any = {};
    if (message.collaterals) {
      obj.collaterals = message.collaterals.map(e => e ? Collateral.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.collaterals = message.collaterals;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAccountCollateralAllResponseAminoMsg): QueryAccountCollateralAllResponse {
    return QueryAccountCollateralAllResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAccountCollateralAllResponseProtoMsg, useInterfaces: boolean = false): QueryAccountCollateralAllResponse {
    return QueryAccountCollateralAllResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAccountCollateralAllResponse): Uint8Array {
    return QueryAccountCollateralAllResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountCollateralAllResponse): QueryAccountCollateralAllResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryAccountCollateralAllResponse",
      value: QueryAccountCollateralAllResponse.encode(message).finish()
    };
  }
};
function createBaseCollateral(): Collateral {
  return {
    denom: "",
    cibtDenom: "",
    collateralAmount: ""
  };
}
export const Collateral = {
  typeUrl: "/Switcheo.carbon.cdp.Collateral",
  encode(message: Collateral, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.cibtDenom !== "") {
      writer.uint32(18).string(message.cibtDenom);
    }
    if (message.collateralAmount !== "") {
      writer.uint32(26).string(message.collateralAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Collateral {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCollateral();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.cibtDenom = reader.string();
          break;
        case 3:
          message.collateralAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Collateral>): Collateral {
    const message = createBaseCollateral();
    message.denom = object.denom ?? "";
    message.cibtDenom = object.cibtDenom ?? "";
    message.collateralAmount = object.collateralAmount ?? "";
    return message;
  },
  fromAmino(object: CollateralAmino): Collateral {
    const message = createBaseCollateral();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.cibt_denom !== undefined && object.cibt_denom !== null) {
      message.cibtDenom = object.cibt_denom;
    }
    if (object.collateral_amount !== undefined && object.collateral_amount !== null) {
      message.collateralAmount = object.collateral_amount;
    }
    return message;
  },
  toAmino(message: Collateral, useInterfaces: boolean = false): CollateralAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.cibt_denom = message.cibtDenom === "" ? undefined : message.cibtDenom;
    obj.collateral_amount = message.collateralAmount === "" ? undefined : message.collateralAmount;
    return obj;
  },
  fromAminoMsg(object: CollateralAminoMsg): Collateral {
    return Collateral.fromAmino(object.value);
  },
  fromProtoMsg(message: CollateralProtoMsg, useInterfaces: boolean = false): Collateral {
    return Collateral.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Collateral): Uint8Array {
    return Collateral.encode(message).finish();
  },
  toProtoMsg(message: Collateral): CollateralProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.Collateral",
      value: Collateral.encode(message).finish()
    };
  }
};
function createBaseQueryAccountDebtRequest(): QueryAccountDebtRequest {
  return {
    address: "",
    denom: ""
  };
}
export const QueryAccountDebtRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountDebtRequest",
  encode(message: QueryAccountDebtRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAccountDebtRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountDebtRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAccountDebtRequest>): QueryAccountDebtRequest {
    const message = createBaseQueryAccountDebtRequest();
    message.address = object.address ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: QueryAccountDebtRequestAmino): QueryAccountDebtRequest {
    const message = createBaseQueryAccountDebtRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: QueryAccountDebtRequest, useInterfaces: boolean = false): QueryAccountDebtRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: QueryAccountDebtRequestAminoMsg): QueryAccountDebtRequest {
    return QueryAccountDebtRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAccountDebtRequestProtoMsg, useInterfaces: boolean = false): QueryAccountDebtRequest {
    return QueryAccountDebtRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAccountDebtRequest): Uint8Array {
    return QueryAccountDebtRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountDebtRequest): QueryAccountDebtRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryAccountDebtRequest",
      value: QueryAccountDebtRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAccountDebtResponse(): QueryAccountDebtResponse {
  return {
    debt: undefined
  };
}
export const QueryAccountDebtResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountDebtResponse",
  encode(message: QueryAccountDebtResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.debt !== undefined) {
      Debt.encode(message.debt, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAccountDebtResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountDebtResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.debt = Debt.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAccountDebtResponse>): QueryAccountDebtResponse {
    const message = createBaseQueryAccountDebtResponse();
    message.debt = object.debt !== undefined && object.debt !== null ? Debt.fromPartial(object.debt) : undefined;
    return message;
  },
  fromAmino(object: QueryAccountDebtResponseAmino): QueryAccountDebtResponse {
    const message = createBaseQueryAccountDebtResponse();
    if (object.debt !== undefined && object.debt !== null) {
      message.debt = Debt.fromAmino(object.debt);
    }
    return message;
  },
  toAmino(message: QueryAccountDebtResponse, useInterfaces: boolean = false): QueryAccountDebtResponseAmino {
    const obj: any = {};
    obj.debt = message.debt ? Debt.toAmino(message.debt, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAccountDebtResponseAminoMsg): QueryAccountDebtResponse {
    return QueryAccountDebtResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAccountDebtResponseProtoMsg, useInterfaces: boolean = false): QueryAccountDebtResponse {
    return QueryAccountDebtResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAccountDebtResponse): Uint8Array {
    return QueryAccountDebtResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountDebtResponse): QueryAccountDebtResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryAccountDebtResponse",
      value: QueryAccountDebtResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAccountDebtAllRequest(): QueryAccountDebtAllRequest {
  return {
    address: "",
    pagination: undefined
  };
}
export const QueryAccountDebtAllRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountDebtAllRequest",
  encode(message: QueryAccountDebtAllRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAccountDebtAllRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountDebtAllRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
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
  fromPartial(object: Partial<QueryAccountDebtAllRequest>): QueryAccountDebtAllRequest {
    const message = createBaseQueryAccountDebtAllRequest();
    message.address = object.address ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAccountDebtAllRequestAmino): QueryAccountDebtAllRequest {
    const message = createBaseQueryAccountDebtAllRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAccountDebtAllRequest, useInterfaces: boolean = false): QueryAccountDebtAllRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAccountDebtAllRequestAminoMsg): QueryAccountDebtAllRequest {
    return QueryAccountDebtAllRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAccountDebtAllRequestProtoMsg, useInterfaces: boolean = false): QueryAccountDebtAllRequest {
    return QueryAccountDebtAllRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAccountDebtAllRequest): Uint8Array {
    return QueryAccountDebtAllRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountDebtAllRequest): QueryAccountDebtAllRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryAccountDebtAllRequest",
      value: QueryAccountDebtAllRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAccountDebtAllResponse(): QueryAccountDebtAllResponse {
  return {
    debts: [],
    pagination: undefined
  };
}
export const QueryAccountDebtAllResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountDebtAllResponse",
  encode(message: QueryAccountDebtAllResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.debts) {
      Debt.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAccountDebtAllResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountDebtAllResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.debts.push(Debt.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryAccountDebtAllResponse>): QueryAccountDebtAllResponse {
    const message = createBaseQueryAccountDebtAllResponse();
    message.debts = object.debts?.map(e => Debt.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAccountDebtAllResponseAmino): QueryAccountDebtAllResponse {
    const message = createBaseQueryAccountDebtAllResponse();
    message.debts = object.debts?.map(e => Debt.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAccountDebtAllResponse, useInterfaces: boolean = false): QueryAccountDebtAllResponseAmino {
    const obj: any = {};
    if (message.debts) {
      obj.debts = message.debts.map(e => e ? Debt.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.debts = message.debts;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAccountDebtAllResponseAminoMsg): QueryAccountDebtAllResponse {
    return QueryAccountDebtAllResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAccountDebtAllResponseProtoMsg, useInterfaces: boolean = false): QueryAccountDebtAllResponse {
    return QueryAccountDebtAllResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAccountDebtAllResponse): Uint8Array {
    return QueryAccountDebtAllResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountDebtAllResponse): QueryAccountDebtAllResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryAccountDebtAllResponse",
      value: QueryAccountDebtAllResponse.encode(message).finish()
    };
  }
};
function createBaseDebt(): Debt {
  return {
    denom: "",
    principal: "",
    initialCumulativeInterestMultiplier: ""
  };
}
export const Debt = {
  typeUrl: "/Switcheo.carbon.cdp.Debt",
  encode(message: Debt, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.principal !== "") {
      writer.uint32(18).string(message.principal);
    }
    if (message.initialCumulativeInterestMultiplier !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.initialCumulativeInterestMultiplier, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Debt {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDebt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.principal = reader.string();
          break;
        case 3:
          message.initialCumulativeInterestMultiplier = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Debt>): Debt {
    const message = createBaseDebt();
    message.denom = object.denom ?? "";
    message.principal = object.principal ?? "";
    message.initialCumulativeInterestMultiplier = object.initialCumulativeInterestMultiplier ?? "";
    return message;
  },
  fromAmino(object: DebtAmino): Debt {
    const message = createBaseDebt();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.principal !== undefined && object.principal !== null) {
      message.principal = object.principal;
    }
    if (object.initial_cumulative_interest_multiplier !== undefined && object.initial_cumulative_interest_multiplier !== null) {
      message.initialCumulativeInterestMultiplier = object.initial_cumulative_interest_multiplier;
    }
    return message;
  },
  toAmino(message: Debt, useInterfaces: boolean = false): DebtAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.principal = message.principal === "" ? undefined : message.principal;
    obj.initial_cumulative_interest_multiplier = message.initialCumulativeInterestMultiplier === "" ? undefined : message.initialCumulativeInterestMultiplier;
    return obj;
  },
  fromAminoMsg(object: DebtAminoMsg): Debt {
    return Debt.fromAmino(object.value);
  },
  fromProtoMsg(message: DebtProtoMsg, useInterfaces: boolean = false): Debt {
    return Debt.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Debt): Uint8Array {
    return Debt.encode(message).finish();
  },
  toProtoMsg(message: Debt): DebtProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.Debt",
      value: Debt.encode(message).finish()
    };
  }
};
function createBaseQueryAccountStablecoinRequest(): QueryAccountStablecoinRequest {
  return {
    address: ""
  };
}
export const QueryAccountStablecoinRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountStablecoinRequest",
  encode(message: QueryAccountStablecoinRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAccountStablecoinRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountStablecoinRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAccountStablecoinRequest>): QueryAccountStablecoinRequest {
    const message = createBaseQueryAccountStablecoinRequest();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QueryAccountStablecoinRequestAmino): QueryAccountStablecoinRequest {
    const message = createBaseQueryAccountStablecoinRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QueryAccountStablecoinRequest, useInterfaces: boolean = false): QueryAccountStablecoinRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: QueryAccountStablecoinRequestAminoMsg): QueryAccountStablecoinRequest {
    return QueryAccountStablecoinRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAccountStablecoinRequestProtoMsg, useInterfaces: boolean = false): QueryAccountStablecoinRequest {
    return QueryAccountStablecoinRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAccountStablecoinRequest): Uint8Array {
    return QueryAccountStablecoinRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountStablecoinRequest): QueryAccountStablecoinRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryAccountStablecoinRequest",
      value: QueryAccountStablecoinRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAccountStablecoinResponse(): QueryAccountStablecoinResponse {
  return {
    principal: "",
    interest: "",
    initialCumulativeInterestMultiplier: ""
  };
}
export const QueryAccountStablecoinResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountStablecoinResponse",
  encode(message: QueryAccountStablecoinResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.principal !== "") {
      writer.uint32(10).string(message.principal);
    }
    if (message.interest !== "") {
      writer.uint32(18).string(message.interest);
    }
    if (message.initialCumulativeInterestMultiplier !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.initialCumulativeInterestMultiplier, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAccountStablecoinResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountStablecoinResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.principal = reader.string();
          break;
        case 2:
          message.interest = reader.string();
          break;
        case 3:
          message.initialCumulativeInterestMultiplier = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAccountStablecoinResponse>): QueryAccountStablecoinResponse {
    const message = createBaseQueryAccountStablecoinResponse();
    message.principal = object.principal ?? "";
    message.interest = object.interest ?? "";
    message.initialCumulativeInterestMultiplier = object.initialCumulativeInterestMultiplier ?? "";
    return message;
  },
  fromAmino(object: QueryAccountStablecoinResponseAmino): QueryAccountStablecoinResponse {
    const message = createBaseQueryAccountStablecoinResponse();
    if (object.principal !== undefined && object.principal !== null) {
      message.principal = object.principal;
    }
    if (object.interest !== undefined && object.interest !== null) {
      message.interest = object.interest;
    }
    if (object.initial_cumulative_interest_multiplier !== undefined && object.initial_cumulative_interest_multiplier !== null) {
      message.initialCumulativeInterestMultiplier = object.initial_cumulative_interest_multiplier;
    }
    return message;
  },
  toAmino(message: QueryAccountStablecoinResponse, useInterfaces: boolean = false): QueryAccountStablecoinResponseAmino {
    const obj: any = {};
    obj.principal = message.principal === "" ? undefined : message.principal;
    obj.interest = message.interest === "" ? undefined : message.interest;
    obj.initial_cumulative_interest_multiplier = message.initialCumulativeInterestMultiplier === "" ? undefined : message.initialCumulativeInterestMultiplier;
    return obj;
  },
  fromAminoMsg(object: QueryAccountStablecoinResponseAminoMsg): QueryAccountStablecoinResponse {
    return QueryAccountStablecoinResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAccountStablecoinResponseProtoMsg, useInterfaces: boolean = false): QueryAccountStablecoinResponse {
    return QueryAccountStablecoinResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAccountStablecoinResponse): Uint8Array {
    return QueryAccountStablecoinResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountStablecoinResponse): QueryAccountStablecoinResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryAccountStablecoinResponse",
      value: QueryAccountStablecoinResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAssetRequest(): QueryAssetRequest {
  return {
    denom: ""
  };
}
export const QueryAssetRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryAssetRequest",
  encode(message: QueryAssetRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAssetRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAssetRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAssetRequest>): QueryAssetRequest {
    const message = createBaseQueryAssetRequest();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: QueryAssetRequestAmino): QueryAssetRequest {
    const message = createBaseQueryAssetRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: QueryAssetRequest, useInterfaces: boolean = false): QueryAssetRequestAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: QueryAssetRequestAminoMsg): QueryAssetRequest {
    return QueryAssetRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAssetRequestProtoMsg, useInterfaces: boolean = false): QueryAssetRequest {
    return QueryAssetRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAssetRequest): Uint8Array {
    return QueryAssetRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAssetRequest): QueryAssetRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryAssetRequest",
      value: QueryAssetRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAssetResponse(): QueryAssetResponse {
  return {
    assetParams: undefined
  };
}
export const QueryAssetResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryAssetResponse",
  encode(message: QueryAssetResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetParams !== undefined) {
      AssetParamsAPI.encode(message.assetParams, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAssetResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAssetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetParams = AssetParamsAPI.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAssetResponse>): QueryAssetResponse {
    const message = createBaseQueryAssetResponse();
    message.assetParams = object.assetParams !== undefined && object.assetParams !== null ? AssetParamsAPI.fromPartial(object.assetParams) : undefined;
    return message;
  },
  fromAmino(object: QueryAssetResponseAmino): QueryAssetResponse {
    const message = createBaseQueryAssetResponse();
    if (object.asset_params !== undefined && object.asset_params !== null) {
      message.assetParams = AssetParamsAPI.fromAmino(object.asset_params);
    }
    return message;
  },
  toAmino(message: QueryAssetResponse, useInterfaces: boolean = false): QueryAssetResponseAmino {
    const obj: any = {};
    obj.asset_params = message.assetParams ? AssetParamsAPI.toAmino(message.assetParams, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAssetResponseAminoMsg): QueryAssetResponse {
    return QueryAssetResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAssetResponseProtoMsg, useInterfaces: boolean = false): QueryAssetResponse {
    return QueryAssetResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAssetResponse): Uint8Array {
    return QueryAssetResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAssetResponse): QueryAssetResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryAssetResponse",
      value: QueryAssetResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAssetAllRequest(): QueryAssetAllRequest {
  return {
    pagination: undefined
  };
}
export const QueryAssetAllRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryAssetAllRequest",
  encode(message: QueryAssetAllRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAssetAllRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAssetAllRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAssetAllRequest>): QueryAssetAllRequest {
    const message = createBaseQueryAssetAllRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAssetAllRequestAmino): QueryAssetAllRequest {
    const message = createBaseQueryAssetAllRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAssetAllRequest, useInterfaces: boolean = false): QueryAssetAllRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAssetAllRequestAminoMsg): QueryAssetAllRequest {
    return QueryAssetAllRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAssetAllRequestProtoMsg, useInterfaces: boolean = false): QueryAssetAllRequest {
    return QueryAssetAllRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAssetAllRequest): Uint8Array {
    return QueryAssetAllRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAssetAllRequest): QueryAssetAllRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryAssetAllRequest",
      value: QueryAssetAllRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAssetAllResponse(): QueryAssetAllResponse {
  return {
    assetParamsAll: [],
    pagination: undefined
  };
}
export const QueryAssetAllResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryAssetAllResponse",
  encode(message: QueryAssetAllResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.assetParamsAll) {
      AssetParamsAPI.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAssetAllResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAssetAllResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetParamsAll.push(AssetParamsAPI.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryAssetAllResponse>): QueryAssetAllResponse {
    const message = createBaseQueryAssetAllResponse();
    message.assetParamsAll = object.assetParamsAll?.map(e => AssetParamsAPI.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryAssetAllResponseAmino): QueryAssetAllResponse {
    const message = createBaseQueryAssetAllResponse();
    message.assetParamsAll = object.asset_params_all?.map(e => AssetParamsAPI.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryAssetAllResponse, useInterfaces: boolean = false): QueryAssetAllResponseAmino {
    const obj: any = {};
    if (message.assetParamsAll) {
      obj.asset_params_all = message.assetParamsAll.map(e => e ? AssetParamsAPI.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.asset_params_all = message.assetParamsAll;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryAssetAllResponseAminoMsg): QueryAssetAllResponse {
    return QueryAssetAllResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAssetAllResponseProtoMsg, useInterfaces: boolean = false): QueryAssetAllResponse {
    return QueryAssetAllResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAssetAllResponse): Uint8Array {
    return QueryAssetAllResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAssetAllResponse): QueryAssetAllResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryAssetAllResponse",
      value: QueryAssetAllResponse.encode(message).finish()
    };
  }
};
function createBaseQueryTokenDebtRequest(): QueryTokenDebtRequest {
  return {
    denom: ""
  };
}
export const QueryTokenDebtRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryTokenDebtRequest",
  encode(message: QueryTokenDebtRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryTokenDebtRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTokenDebtRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryTokenDebtRequest>): QueryTokenDebtRequest {
    const message = createBaseQueryTokenDebtRequest();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: QueryTokenDebtRequestAmino): QueryTokenDebtRequest {
    const message = createBaseQueryTokenDebtRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: QueryTokenDebtRequest, useInterfaces: boolean = false): QueryTokenDebtRequestAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: QueryTokenDebtRequestAminoMsg): QueryTokenDebtRequest {
    return QueryTokenDebtRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryTokenDebtRequestProtoMsg, useInterfaces: boolean = false): QueryTokenDebtRequest {
    return QueryTokenDebtRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryTokenDebtRequest): Uint8Array {
    return QueryTokenDebtRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryTokenDebtRequest): QueryTokenDebtRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryTokenDebtRequest",
      value: QueryTokenDebtRequest.encode(message).finish()
    };
  }
};
function createBaseQueryTokenDebtResponse(): QueryTokenDebtResponse {
  return {
    debtInfo: undefined
  };
}
export const QueryTokenDebtResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryTokenDebtResponse",
  encode(message: QueryTokenDebtResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.debtInfo !== undefined) {
      DebtInfo.encode(message.debtInfo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryTokenDebtResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTokenDebtResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.debtInfo = DebtInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryTokenDebtResponse>): QueryTokenDebtResponse {
    const message = createBaseQueryTokenDebtResponse();
    message.debtInfo = object.debtInfo !== undefined && object.debtInfo !== null ? DebtInfo.fromPartial(object.debtInfo) : undefined;
    return message;
  },
  fromAmino(object: QueryTokenDebtResponseAmino): QueryTokenDebtResponse {
    const message = createBaseQueryTokenDebtResponse();
    if (object.debt_info !== undefined && object.debt_info !== null) {
      message.debtInfo = DebtInfo.fromAmino(object.debt_info);
    }
    return message;
  },
  toAmino(message: QueryTokenDebtResponse, useInterfaces: boolean = false): QueryTokenDebtResponseAmino {
    const obj: any = {};
    obj.debt_info = message.debtInfo ? DebtInfo.toAmino(message.debtInfo, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryTokenDebtResponseAminoMsg): QueryTokenDebtResponse {
    return QueryTokenDebtResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryTokenDebtResponseProtoMsg, useInterfaces: boolean = false): QueryTokenDebtResponse {
    return QueryTokenDebtResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryTokenDebtResponse): Uint8Array {
    return QueryTokenDebtResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryTokenDebtResponse): QueryTokenDebtResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryTokenDebtResponse",
      value: QueryTokenDebtResponse.encode(message).finish()
    };
  }
};
function createBaseQueryTokenDebtAllRequest(): QueryTokenDebtAllRequest {
  return {
    pagination: undefined
  };
}
export const QueryTokenDebtAllRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryTokenDebtAllRequest",
  encode(message: QueryTokenDebtAllRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryTokenDebtAllRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTokenDebtAllRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryTokenDebtAllRequest>): QueryTokenDebtAllRequest {
    const message = createBaseQueryTokenDebtAllRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryTokenDebtAllRequestAmino): QueryTokenDebtAllRequest {
    const message = createBaseQueryTokenDebtAllRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryTokenDebtAllRequest, useInterfaces: boolean = false): QueryTokenDebtAllRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryTokenDebtAllRequestAminoMsg): QueryTokenDebtAllRequest {
    return QueryTokenDebtAllRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryTokenDebtAllRequestProtoMsg, useInterfaces: boolean = false): QueryTokenDebtAllRequest {
    return QueryTokenDebtAllRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryTokenDebtAllRequest): Uint8Array {
    return QueryTokenDebtAllRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryTokenDebtAllRequest): QueryTokenDebtAllRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryTokenDebtAllRequest",
      value: QueryTokenDebtAllRequest.encode(message).finish()
    };
  }
};
function createBaseQueryTokenDebtAllResponse(): QueryTokenDebtAllResponse {
  return {
    debtInfosAll: [],
    pagination: undefined
  };
}
export const QueryTokenDebtAllResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryTokenDebtAllResponse",
  encode(message: QueryTokenDebtAllResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.debtInfosAll) {
      DebtInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryTokenDebtAllResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTokenDebtAllResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.debtInfosAll.push(DebtInfo.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryTokenDebtAllResponse>): QueryTokenDebtAllResponse {
    const message = createBaseQueryTokenDebtAllResponse();
    message.debtInfosAll = object.debtInfosAll?.map(e => DebtInfo.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryTokenDebtAllResponseAmino): QueryTokenDebtAllResponse {
    const message = createBaseQueryTokenDebtAllResponse();
    message.debtInfosAll = object.debt_infos_all?.map(e => DebtInfo.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryTokenDebtAllResponse, useInterfaces: boolean = false): QueryTokenDebtAllResponseAmino {
    const obj: any = {};
    if (message.debtInfosAll) {
      obj.debt_infos_all = message.debtInfosAll.map(e => e ? DebtInfo.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.debt_infos_all = message.debtInfosAll;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryTokenDebtAllResponseAminoMsg): QueryTokenDebtAllResponse {
    return QueryTokenDebtAllResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryTokenDebtAllResponseProtoMsg, useInterfaces: boolean = false): QueryTokenDebtAllResponse {
    return QueryTokenDebtAllResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryTokenDebtAllResponse): Uint8Array {
    return QueryTokenDebtAllResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryTokenDebtAllResponse): QueryTokenDebtAllResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryTokenDebtAllResponse",
      value: QueryTokenDebtAllResponse.encode(message).finish()
    };
  }
};
function createBaseQueryStablecoinDebtRequest(): QueryStablecoinDebtRequest {
  return {};
}
export const QueryStablecoinDebtRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryStablecoinDebtRequest",
  encode(_: QueryStablecoinDebtRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryStablecoinDebtRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStablecoinDebtRequest();
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
  fromPartial(_: Partial<QueryStablecoinDebtRequest>): QueryStablecoinDebtRequest {
    const message = createBaseQueryStablecoinDebtRequest();
    return message;
  },
  fromAmino(_: QueryStablecoinDebtRequestAmino): QueryStablecoinDebtRequest {
    const message = createBaseQueryStablecoinDebtRequest();
    return message;
  },
  toAmino(_: QueryStablecoinDebtRequest, useInterfaces: boolean = false): QueryStablecoinDebtRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryStablecoinDebtRequestAminoMsg): QueryStablecoinDebtRequest {
    return QueryStablecoinDebtRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryStablecoinDebtRequestProtoMsg, useInterfaces: boolean = false): QueryStablecoinDebtRequest {
    return QueryStablecoinDebtRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryStablecoinDebtRequest): Uint8Array {
    return QueryStablecoinDebtRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryStablecoinDebtRequest): QueryStablecoinDebtRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryStablecoinDebtRequest",
      value: QueryStablecoinDebtRequest.encode(message).finish()
    };
  }
};
function createBaseQueryStablecoinDebtResponse(): QueryStablecoinDebtResponse {
  return {
    stablecoinDebtInfo: undefined
  };
}
export const QueryStablecoinDebtResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryStablecoinDebtResponse",
  encode(message: QueryStablecoinDebtResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.stablecoinDebtInfo !== undefined) {
      StablecoinDebtInfo.encode(message.stablecoinDebtInfo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryStablecoinDebtResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStablecoinDebtResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stablecoinDebtInfo = StablecoinDebtInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryStablecoinDebtResponse>): QueryStablecoinDebtResponse {
    const message = createBaseQueryStablecoinDebtResponse();
    message.stablecoinDebtInfo = object.stablecoinDebtInfo !== undefined && object.stablecoinDebtInfo !== null ? StablecoinDebtInfo.fromPartial(object.stablecoinDebtInfo) : undefined;
    return message;
  },
  fromAmino(object: QueryStablecoinDebtResponseAmino): QueryStablecoinDebtResponse {
    const message = createBaseQueryStablecoinDebtResponse();
    if (object.stablecoin_debt_info !== undefined && object.stablecoin_debt_info !== null) {
      message.stablecoinDebtInfo = StablecoinDebtInfo.fromAmino(object.stablecoin_debt_info);
    }
    return message;
  },
  toAmino(message: QueryStablecoinDebtResponse, useInterfaces: boolean = false): QueryStablecoinDebtResponseAmino {
    const obj: any = {};
    obj.stablecoin_debt_info = message.stablecoinDebtInfo ? StablecoinDebtInfo.toAmino(message.stablecoinDebtInfo, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryStablecoinDebtResponseAminoMsg): QueryStablecoinDebtResponse {
    return QueryStablecoinDebtResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryStablecoinDebtResponseProtoMsg, useInterfaces: boolean = false): QueryStablecoinDebtResponse {
    return QueryStablecoinDebtResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryStablecoinDebtResponse): Uint8Array {
    return QueryStablecoinDebtResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryStablecoinDebtResponse): QueryStablecoinDebtResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryStablecoinDebtResponse",
      value: QueryStablecoinDebtResponse.encode(message).finish()
    };
  }
};
function createBaseCdpPositionItem(): CdpPositionItem {
  return {
    address: "",
    denom: "",
    cibtDenom: "",
    healthFactor: "",
    collateralAmount: "",
    borrowAmount: "",
    mintDenom: "",
    mintAmount: ""
  };
}
export const CdpPositionItem = {
  typeUrl: "/Switcheo.carbon.cdp.CdpPositionItem",
  encode(message: CdpPositionItem, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.cibtDenom !== "") {
      writer.uint32(26).string(message.cibtDenom);
    }
    if (message.healthFactor !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.healthFactor, 18).atomics);
    }
    if (message.collateralAmount !== "") {
      writer.uint32(42).string(message.collateralAmount);
    }
    if (message.borrowAmount !== "") {
      writer.uint32(50).string(message.borrowAmount);
    }
    if (message.mintDenom !== "") {
      writer.uint32(58).string(message.mintDenom);
    }
    if (message.mintAmount !== "") {
      writer.uint32(66).string(message.mintAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CdpPositionItem {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCdpPositionItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.cibtDenom = reader.string();
          break;
        case 4:
          message.healthFactor = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.collateralAmount = reader.string();
          break;
        case 6:
          message.borrowAmount = reader.string();
          break;
        case 7:
          message.mintDenom = reader.string();
          break;
        case 8:
          message.mintAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CdpPositionItem>): CdpPositionItem {
    const message = createBaseCdpPositionItem();
    message.address = object.address ?? "";
    message.denom = object.denom ?? "";
    message.cibtDenom = object.cibtDenom ?? "";
    message.healthFactor = object.healthFactor ?? "";
    message.collateralAmount = object.collateralAmount ?? "";
    message.borrowAmount = object.borrowAmount ?? "";
    message.mintDenom = object.mintDenom ?? "";
    message.mintAmount = object.mintAmount ?? "";
    return message;
  },
  fromAmino(object: CdpPositionItemAmino): CdpPositionItem {
    const message = createBaseCdpPositionItem();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.cibt_denom !== undefined && object.cibt_denom !== null) {
      message.cibtDenom = object.cibt_denom;
    }
    if (object.health_factor !== undefined && object.health_factor !== null) {
      message.healthFactor = object.health_factor;
    }
    if (object.collateral_amount !== undefined && object.collateral_amount !== null) {
      message.collateralAmount = object.collateral_amount;
    }
    if (object.borrow_amount !== undefined && object.borrow_amount !== null) {
      message.borrowAmount = object.borrow_amount;
    }
    if (object.mint_denom !== undefined && object.mint_denom !== null) {
      message.mintDenom = object.mint_denom;
    }
    if (object.mint_amount !== undefined && object.mint_amount !== null) {
      message.mintAmount = object.mint_amount;
    }
    return message;
  },
  toAmino(message: CdpPositionItem, useInterfaces: boolean = false): CdpPositionItemAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.cibt_denom = message.cibtDenom === "" ? undefined : message.cibtDenom;
    obj.health_factor = message.healthFactor === "" ? undefined : message.healthFactor;
    obj.collateral_amount = message.collateralAmount === "" ? undefined : message.collateralAmount;
    obj.borrow_amount = message.borrowAmount === "" ? undefined : message.borrowAmount;
    obj.mint_denom = message.mintDenom === "" ? undefined : message.mintDenom;
    obj.mint_amount = message.mintAmount === "" ? undefined : message.mintAmount;
    return obj;
  },
  fromAminoMsg(object: CdpPositionItemAminoMsg): CdpPositionItem {
    return CdpPositionItem.fromAmino(object.value);
  },
  fromProtoMsg(message: CdpPositionItemProtoMsg, useInterfaces: boolean = false): CdpPositionItem {
    return CdpPositionItem.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CdpPositionItem): Uint8Array {
    return CdpPositionItem.encode(message).finish();
  },
  toProtoMsg(message: CdpPositionItem): CdpPositionItemProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.CdpPositionItem",
      value: CdpPositionItem.encode(message).finish()
    };
  }
};
function createBaseCdpPosition(): CdpPosition {
  return {
    address: "",
    healthFactor: "",
    collateral: [],
    borrow: [],
    mint: []
  };
}
export const CdpPosition = {
  typeUrl: "/Switcheo.carbon.cdp.CdpPosition",
  encode(message: CdpPosition, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.healthFactor !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.healthFactor, 18).atomics);
    }
    for (const v of message.collateral) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.borrow) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.mint) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CdpPosition {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCdpPosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.healthFactor = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.collateral.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.borrow.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.mint.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CdpPosition>): CdpPosition {
    const message = createBaseCdpPosition();
    message.address = object.address ?? "";
    message.healthFactor = object.healthFactor ?? "";
    message.collateral = object.collateral?.map(e => Coin.fromPartial(e)) || [];
    message.borrow = object.borrow?.map(e => Coin.fromPartial(e)) || [];
    message.mint = object.mint?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: CdpPositionAmino): CdpPosition {
    const message = createBaseCdpPosition();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.health_factor !== undefined && object.health_factor !== null) {
      message.healthFactor = object.health_factor;
    }
    message.collateral = object.collateral?.map(e => Coin.fromAmino(e)) || [];
    message.borrow = object.borrow?.map(e => Coin.fromAmino(e)) || [];
    message.mint = object.mint?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: CdpPosition, useInterfaces: boolean = false): CdpPositionAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.health_factor = message.healthFactor === "" ? undefined : message.healthFactor;
    if (message.collateral) {
      obj.collateral = message.collateral.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.collateral = message.collateral;
    }
    if (message.borrow) {
      obj.borrow = message.borrow.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.borrow = message.borrow;
    }
    if (message.mint) {
      obj.mint = message.mint.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.mint = message.mint;
    }
    return obj;
  },
  fromAminoMsg(object: CdpPositionAminoMsg): CdpPosition {
    return CdpPosition.fromAmino(object.value);
  },
  fromProtoMsg(message: CdpPositionProtoMsg, useInterfaces: boolean = false): CdpPosition {
    return CdpPosition.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CdpPosition): Uint8Array {
    return CdpPosition.encode(message).finish();
  },
  toProtoMsg(message: CdpPosition): CdpPositionProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.CdpPosition",
      value: CdpPosition.encode(message).finish()
    };
  }
};
function createBaseQueryCdpPositionRequest(): QueryCdpPositionRequest {
  return {
    address: ""
  };
}
export const QueryCdpPositionRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryCdpPositionRequest",
  encode(message: QueryCdpPositionRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryCdpPositionRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCdpPositionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCdpPositionRequest>): QueryCdpPositionRequest {
    const message = createBaseQueryCdpPositionRequest();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QueryCdpPositionRequestAmino): QueryCdpPositionRequest {
    const message = createBaseQueryCdpPositionRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QueryCdpPositionRequest, useInterfaces: boolean = false): QueryCdpPositionRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: QueryCdpPositionRequestAminoMsg): QueryCdpPositionRequest {
    return QueryCdpPositionRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCdpPositionRequestProtoMsg, useInterfaces: boolean = false): QueryCdpPositionRequest {
    return QueryCdpPositionRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryCdpPositionRequest): Uint8Array {
    return QueryCdpPositionRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryCdpPositionRequest): QueryCdpPositionRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryCdpPositionRequest",
      value: QueryCdpPositionRequest.encode(message).finish()
    };
  }
};
function createBaseQueryCdpPositionResponse(): QueryCdpPositionResponse {
  return {
    position: undefined
  };
}
export const QueryCdpPositionResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryCdpPositionResponse",
  encode(message: QueryCdpPositionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.position !== undefined) {
      CdpPosition.encode(message.position, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryCdpPositionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCdpPositionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.position = CdpPosition.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCdpPositionResponse>): QueryCdpPositionResponse {
    const message = createBaseQueryCdpPositionResponse();
    message.position = object.position !== undefined && object.position !== null ? CdpPosition.fromPartial(object.position) : undefined;
    return message;
  },
  fromAmino(object: QueryCdpPositionResponseAmino): QueryCdpPositionResponse {
    const message = createBaseQueryCdpPositionResponse();
    if (object.position !== undefined && object.position !== null) {
      message.position = CdpPosition.fromAmino(object.position);
    }
    return message;
  },
  toAmino(message: QueryCdpPositionResponse, useInterfaces: boolean = false): QueryCdpPositionResponseAmino {
    const obj: any = {};
    obj.position = message.position ? CdpPosition.toAmino(message.position, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryCdpPositionResponseAminoMsg): QueryCdpPositionResponse {
    return QueryCdpPositionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCdpPositionResponseProtoMsg, useInterfaces: boolean = false): QueryCdpPositionResponse {
    return QueryCdpPositionResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryCdpPositionResponse): Uint8Array {
    return QueryCdpPositionResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCdpPositionResponse): QueryCdpPositionResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryCdpPositionResponse",
      value: QueryCdpPositionResponse.encode(message).finish()
    };
  }
};
function createBaseQueryCdpPositionsRequest(): QueryCdpPositionsRequest {
  return {
    pagination: undefined,
    maxHealthFactor: undefined,
    minHealthFactor: undefined
  };
}
export const QueryCdpPositionsRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryCdpPositionsRequest",
  encode(message: QueryCdpPositionsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.maxHealthFactor !== undefined) {
      writer.uint32(18).string(message.maxHealthFactor);
    }
    if (message.minHealthFactor !== undefined) {
      writer.uint32(26).string(message.minHealthFactor);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryCdpPositionsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCdpPositionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.maxHealthFactor = reader.string();
          break;
        case 3:
          message.minHealthFactor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCdpPositionsRequest>): QueryCdpPositionsRequest {
    const message = createBaseQueryCdpPositionsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    message.maxHealthFactor = object.maxHealthFactor ?? undefined;
    message.minHealthFactor = object.minHealthFactor ?? undefined;
    return message;
  },
  fromAmino(object: QueryCdpPositionsRequestAmino): QueryCdpPositionsRequest {
    const message = createBaseQueryCdpPositionsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    if (object.max_health_factor !== undefined && object.max_health_factor !== null) {
      message.maxHealthFactor = object.max_health_factor;
    }
    if (object.min_health_factor !== undefined && object.min_health_factor !== null) {
      message.minHealthFactor = object.min_health_factor;
    }
    return message;
  },
  toAmino(message: QueryCdpPositionsRequest, useInterfaces: boolean = false): QueryCdpPositionsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    obj.max_health_factor = message.maxHealthFactor === null ? undefined : message.maxHealthFactor;
    obj.min_health_factor = message.minHealthFactor === null ? undefined : message.minHealthFactor;
    return obj;
  },
  fromAminoMsg(object: QueryCdpPositionsRequestAminoMsg): QueryCdpPositionsRequest {
    return QueryCdpPositionsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCdpPositionsRequestProtoMsg, useInterfaces: boolean = false): QueryCdpPositionsRequest {
    return QueryCdpPositionsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryCdpPositionsRequest): Uint8Array {
    return QueryCdpPositionsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryCdpPositionsRequest): QueryCdpPositionsRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryCdpPositionsRequest",
      value: QueryCdpPositionsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryCdpPositionsResponse(): QueryCdpPositionsResponse {
  return {
    positions: [],
    pagination: undefined
  };
}
export const QueryCdpPositionsResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryCdpPositionsResponse",
  encode(message: QueryCdpPositionsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.positions) {
      CdpPosition.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryCdpPositionsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCdpPositionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.positions.push(CdpPosition.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryCdpPositionsResponse>): QueryCdpPositionsResponse {
    const message = createBaseQueryCdpPositionsResponse();
    message.positions = object.positions?.map(e => CdpPosition.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryCdpPositionsResponseAmino): QueryCdpPositionsResponse {
    const message = createBaseQueryCdpPositionsResponse();
    message.positions = object.positions?.map(e => CdpPosition.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryCdpPositionsResponse, useInterfaces: boolean = false): QueryCdpPositionsResponseAmino {
    const obj: any = {};
    if (message.positions) {
      obj.positions = message.positions.map(e => e ? CdpPosition.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.positions = message.positions;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryCdpPositionsResponseAminoMsg): QueryCdpPositionsResponse {
    return QueryCdpPositionsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCdpPositionsResponseProtoMsg, useInterfaces: boolean = false): QueryCdpPositionsResponse {
    return QueryCdpPositionsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryCdpPositionsResponse): Uint8Array {
    return QueryCdpPositionsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCdpPositionsResponse): QueryCdpPositionsResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryCdpPositionsResponse",
      value: QueryCdpPositionsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRewardSchemesAllRequest(): QueryRewardSchemesAllRequest {
  return {
    pagination: undefined
  };
}
export const QueryRewardSchemesAllRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryRewardSchemesAllRequest",
  encode(message: QueryRewardSchemesAllRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRewardSchemesAllRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRewardSchemesAllRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRewardSchemesAllRequest>): QueryRewardSchemesAllRequest {
    const message = createBaseQueryRewardSchemesAllRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryRewardSchemesAllRequestAmino): QueryRewardSchemesAllRequest {
    const message = createBaseQueryRewardSchemesAllRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryRewardSchemesAllRequest, useInterfaces: boolean = false): QueryRewardSchemesAllRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRewardSchemesAllRequestAminoMsg): QueryRewardSchemesAllRequest {
    return QueryRewardSchemesAllRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRewardSchemesAllRequestProtoMsg, useInterfaces: boolean = false): QueryRewardSchemesAllRequest {
    return QueryRewardSchemesAllRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRewardSchemesAllRequest): Uint8Array {
    return QueryRewardSchemesAllRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRewardSchemesAllRequest): QueryRewardSchemesAllRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryRewardSchemesAllRequest",
      value: QueryRewardSchemesAllRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRewardSchemesAllResponse(): QueryRewardSchemesAllResponse {
  return {
    rewardSchemes: [],
    pagination: undefined
  };
}
export const QueryRewardSchemesAllResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryRewardSchemesAllResponse",
  encode(message: QueryRewardSchemesAllResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.rewardSchemes) {
      RewardScheme.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRewardSchemesAllResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRewardSchemesAllResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rewardSchemes.push(RewardScheme.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryRewardSchemesAllResponse>): QueryRewardSchemesAllResponse {
    const message = createBaseQueryRewardSchemesAllResponse();
    message.rewardSchemes = object.rewardSchemes?.map(e => RewardScheme.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryRewardSchemesAllResponseAmino): QueryRewardSchemesAllResponse {
    const message = createBaseQueryRewardSchemesAllResponse();
    message.rewardSchemes = object.reward_schemes?.map(e => RewardScheme.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryRewardSchemesAllResponse, useInterfaces: boolean = false): QueryRewardSchemesAllResponseAmino {
    const obj: any = {};
    if (message.rewardSchemes) {
      obj.reward_schemes = message.rewardSchemes.map(e => e ? RewardScheme.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.reward_schemes = message.rewardSchemes;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRewardSchemesAllResponseAminoMsg): QueryRewardSchemesAllResponse {
    return QueryRewardSchemesAllResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRewardSchemesAllResponseProtoMsg, useInterfaces: boolean = false): QueryRewardSchemesAllResponse {
    return QueryRewardSchemesAllResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRewardSchemesAllResponse): Uint8Array {
    return QueryRewardSchemesAllResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRewardSchemesAllResponse): QueryRewardSchemesAllResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryRewardSchemesAllResponse",
      value: QueryRewardSchemesAllResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRewardDebtsRequest(): QueryRewardDebtsRequest {
  return {
    address: "",
    pagination: undefined
  };
}
export const QueryRewardDebtsRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryRewardDebtsRequest",
  encode(message: QueryRewardDebtsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRewardDebtsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRewardDebtsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
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
  fromPartial(object: Partial<QueryRewardDebtsRequest>): QueryRewardDebtsRequest {
    const message = createBaseQueryRewardDebtsRequest();
    message.address = object.address ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryRewardDebtsRequestAmino): QueryRewardDebtsRequest {
    const message = createBaseQueryRewardDebtsRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryRewardDebtsRequest, useInterfaces: boolean = false): QueryRewardDebtsRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRewardDebtsRequestAminoMsg): QueryRewardDebtsRequest {
    return QueryRewardDebtsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRewardDebtsRequestProtoMsg, useInterfaces: boolean = false): QueryRewardDebtsRequest {
    return QueryRewardDebtsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRewardDebtsRequest): Uint8Array {
    return QueryRewardDebtsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRewardDebtsRequest): QueryRewardDebtsRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryRewardDebtsRequest",
      value: QueryRewardDebtsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryRewardDebtsResponse(): QueryRewardDebtsResponse {
  return {
    rewardDebts: [],
    pagination: undefined
  };
}
export const QueryRewardDebtsResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryRewardDebtsResponse",
  encode(message: QueryRewardDebtsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.rewardDebts) {
      RewardDebt.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRewardDebtsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRewardDebtsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rewardDebts.push(RewardDebt.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryRewardDebtsResponse>): QueryRewardDebtsResponse {
    const message = createBaseQueryRewardDebtsResponse();
    message.rewardDebts = object.rewardDebts?.map(e => RewardDebt.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryRewardDebtsResponseAmino): QueryRewardDebtsResponse {
    const message = createBaseQueryRewardDebtsResponse();
    message.rewardDebts = object.reward_debts?.map(e => RewardDebt.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryRewardDebtsResponse, useInterfaces: boolean = false): QueryRewardDebtsResponseAmino {
    const obj: any = {};
    if (message.rewardDebts) {
      obj.reward_debts = message.rewardDebts.map(e => e ? RewardDebt.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.reward_debts = message.rewardDebts;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRewardDebtsResponseAminoMsg): QueryRewardDebtsResponse {
    return QueryRewardDebtsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRewardDebtsResponseProtoMsg, useInterfaces: boolean = false): QueryRewardDebtsResponse {
    return QueryRewardDebtsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRewardDebtsResponse): Uint8Array {
    return QueryRewardDebtsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryRewardDebtsResponse): QueryRewardDebtsResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryRewardDebtsResponse",
      value: QueryRewardDebtsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryRewardDebtsAllRequest(): QueryRewardDebtsAllRequest {
  return {
    pagination: undefined
  };
}
export const QueryRewardDebtsAllRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryRewardDebtsAllRequest",
  encode(message: QueryRewardDebtsAllRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryRewardDebtsAllRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRewardDebtsAllRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryRewardDebtsAllRequest>): QueryRewardDebtsAllRequest {
    const message = createBaseQueryRewardDebtsAllRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryRewardDebtsAllRequestAmino): QueryRewardDebtsAllRequest {
    const message = createBaseQueryRewardDebtsAllRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryRewardDebtsAllRequest, useInterfaces: boolean = false): QueryRewardDebtsAllRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryRewardDebtsAllRequestAminoMsg): QueryRewardDebtsAllRequest {
    return QueryRewardDebtsAllRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryRewardDebtsAllRequestProtoMsg, useInterfaces: boolean = false): QueryRewardDebtsAllRequest {
    return QueryRewardDebtsAllRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryRewardDebtsAllRequest): Uint8Array {
    return QueryRewardDebtsAllRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryRewardDebtsAllRequest): QueryRewardDebtsAllRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryRewardDebtsAllRequest",
      value: QueryRewardDebtsAllRequest.encode(message).finish()
    };
  }
};
function createBaseQueryEModeAllRequest(): QueryEModeAllRequest {
  return {
    pagination: undefined
  };
}
export const QueryEModeAllRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryEModeAllRequest",
  encode(message: QueryEModeAllRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryEModeAllRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEModeAllRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryEModeAllRequest>): QueryEModeAllRequest {
    const message = createBaseQueryEModeAllRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryEModeAllRequestAmino): QueryEModeAllRequest {
    const message = createBaseQueryEModeAllRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryEModeAllRequest, useInterfaces: boolean = false): QueryEModeAllRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryEModeAllRequestAminoMsg): QueryEModeAllRequest {
    return QueryEModeAllRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEModeAllRequestProtoMsg, useInterfaces: boolean = false): QueryEModeAllRequest {
    return QueryEModeAllRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryEModeAllRequest): Uint8Array {
    return QueryEModeAllRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryEModeAllRequest): QueryEModeAllRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryEModeAllRequest",
      value: QueryEModeAllRequest.encode(message).finish()
    };
  }
};
function createBaseQueryEModeAllResponse(): QueryEModeAllResponse {
  return {
    eModeCategories: [],
    pagination: undefined
  };
}
export const QueryEModeAllResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryEModeAllResponse",
  encode(message: QueryEModeAllResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.eModeCategories) {
      EModeCategory.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryEModeAllResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEModeAllResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.eModeCategories.push(EModeCategory.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryEModeAllResponse>): QueryEModeAllResponse {
    const message = createBaseQueryEModeAllResponse();
    message.eModeCategories = object.eModeCategories?.map(e => EModeCategory.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryEModeAllResponseAmino): QueryEModeAllResponse {
    const message = createBaseQueryEModeAllResponse();
    message.eModeCategories = object.e_mode_categories?.map(e => EModeCategory.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryEModeAllResponse, useInterfaces: boolean = false): QueryEModeAllResponseAmino {
    const obj: any = {};
    if (message.eModeCategories) {
      obj.e_mode_categories = message.eModeCategories.map(e => e ? EModeCategory.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.e_mode_categories = message.eModeCategories;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryEModeAllResponseAminoMsg): QueryEModeAllResponse {
    return QueryEModeAllResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEModeAllResponseProtoMsg, useInterfaces: boolean = false): QueryEModeAllResponse {
    return QueryEModeAllResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryEModeAllResponse): Uint8Array {
    return QueryEModeAllResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryEModeAllResponse): QueryEModeAllResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryEModeAllResponse",
      value: QueryEModeAllResponse.encode(message).finish()
    };
  }
};
function createBaseQueryStablecoinInterestRequest(): QueryStablecoinInterestRequest {
  return {};
}
export const QueryStablecoinInterestRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryStablecoinInterestRequest",
  encode(_: QueryStablecoinInterestRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryStablecoinInterestRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStablecoinInterestRequest();
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
  fromPartial(_: Partial<QueryStablecoinInterestRequest>): QueryStablecoinInterestRequest {
    const message = createBaseQueryStablecoinInterestRequest();
    return message;
  },
  fromAmino(_: QueryStablecoinInterestRequestAmino): QueryStablecoinInterestRequest {
    const message = createBaseQueryStablecoinInterestRequest();
    return message;
  },
  toAmino(_: QueryStablecoinInterestRequest, useInterfaces: boolean = false): QueryStablecoinInterestRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryStablecoinInterestRequestAminoMsg): QueryStablecoinInterestRequest {
    return QueryStablecoinInterestRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryStablecoinInterestRequestProtoMsg, useInterfaces: boolean = false): QueryStablecoinInterestRequest {
    return QueryStablecoinInterestRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryStablecoinInterestRequest): Uint8Array {
    return QueryStablecoinInterestRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryStablecoinInterestRequest): QueryStablecoinInterestRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryStablecoinInterestRequest",
      value: QueryStablecoinInterestRequest.encode(message).finish()
    };
  }
};
function createBaseQueryStablecoinInterestResponse(): QueryStablecoinInterestResponse {
  return {
    stablecoinInterestInfo: undefined
  };
}
export const QueryStablecoinInterestResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryStablecoinInterestResponse",
  encode(message: QueryStablecoinInterestResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.stablecoinInterestInfo !== undefined) {
      StablecoinInterestInfo.encode(message.stablecoinInterestInfo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryStablecoinInterestResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStablecoinInterestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stablecoinInterestInfo = StablecoinInterestInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryStablecoinInterestResponse>): QueryStablecoinInterestResponse {
    const message = createBaseQueryStablecoinInterestResponse();
    message.stablecoinInterestInfo = object.stablecoinInterestInfo !== undefined && object.stablecoinInterestInfo !== null ? StablecoinInterestInfo.fromPartial(object.stablecoinInterestInfo) : undefined;
    return message;
  },
  fromAmino(object: QueryStablecoinInterestResponseAmino): QueryStablecoinInterestResponse {
    const message = createBaseQueryStablecoinInterestResponse();
    if (object.stablecoin_interest_info !== undefined && object.stablecoin_interest_info !== null) {
      message.stablecoinInterestInfo = StablecoinInterestInfo.fromAmino(object.stablecoin_interest_info);
    }
    return message;
  },
  toAmino(message: QueryStablecoinInterestResponse, useInterfaces: boolean = false): QueryStablecoinInterestResponseAmino {
    const obj: any = {};
    obj.stablecoin_interest_info = message.stablecoinInterestInfo ? StablecoinInterestInfo.toAmino(message.stablecoinInterestInfo, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryStablecoinInterestResponseAminoMsg): QueryStablecoinInterestResponse {
    return QueryStablecoinInterestResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryStablecoinInterestResponseProtoMsg, useInterfaces: boolean = false): QueryStablecoinInterestResponse {
    return QueryStablecoinInterestResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryStablecoinInterestResponse): Uint8Array {
    return QueryStablecoinInterestResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryStablecoinInterestResponse): QueryStablecoinInterestResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryStablecoinInterestResponse",
      value: QueryStablecoinInterestResponse.encode(message).finish()
    };
  }
};
function createBaseQueryEModeRequest(): QueryEModeRequest {
  return {
    name: ""
  };
}
export const QueryEModeRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryEModeRequest",
  encode(message: QueryEModeRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryEModeRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEModeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryEModeRequest>): QueryEModeRequest {
    const message = createBaseQueryEModeRequest();
    message.name = object.name ?? "";
    return message;
  },
  fromAmino(object: QueryEModeRequestAmino): QueryEModeRequest {
    const message = createBaseQueryEModeRequest();
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    return message;
  },
  toAmino(message: QueryEModeRequest, useInterfaces: boolean = false): QueryEModeRequestAmino {
    const obj: any = {};
    obj.name = message.name === "" ? undefined : message.name;
    return obj;
  },
  fromAminoMsg(object: QueryEModeRequestAminoMsg): QueryEModeRequest {
    return QueryEModeRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEModeRequestProtoMsg, useInterfaces: boolean = false): QueryEModeRequest {
    return QueryEModeRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryEModeRequest): Uint8Array {
    return QueryEModeRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryEModeRequest): QueryEModeRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryEModeRequest",
      value: QueryEModeRequest.encode(message).finish()
    };
  }
};
function createBaseQueryEModeResponse(): QueryEModeResponse {
  return {
    eModeCategory: EModeCategory.fromPartial({})
  };
}
export const QueryEModeResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryEModeResponse",
  encode(message: QueryEModeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.eModeCategory !== undefined) {
      EModeCategory.encode(message.eModeCategory, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryEModeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEModeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.eModeCategory = EModeCategory.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryEModeResponse>): QueryEModeResponse {
    const message = createBaseQueryEModeResponse();
    message.eModeCategory = object.eModeCategory !== undefined && object.eModeCategory !== null ? EModeCategory.fromPartial(object.eModeCategory) : undefined;
    return message;
  },
  fromAmino(object: QueryEModeResponseAmino): QueryEModeResponse {
    const message = createBaseQueryEModeResponse();
    if (object.e_mode_category !== undefined && object.e_mode_category !== null) {
      message.eModeCategory = EModeCategory.fromAmino(object.e_mode_category);
    }
    return message;
  },
  toAmino(message: QueryEModeResponse, useInterfaces: boolean = false): QueryEModeResponseAmino {
    const obj: any = {};
    obj.e_mode_category = message.eModeCategory ? EModeCategory.toAmino(message.eModeCategory, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryEModeResponseAminoMsg): QueryEModeResponse {
    return QueryEModeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEModeResponseProtoMsg, useInterfaces: boolean = false): QueryEModeResponse {
    return QueryEModeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryEModeResponse): Uint8Array {
    return QueryEModeResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryEModeResponse): QueryEModeResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryEModeResponse",
      value: QueryEModeResponse.encode(message).finish()
    };
  }
};
function createBaseQueryHealthFactorRequest(): QueryHealthFactorRequest {
  return {
    address: ""
  };
}
export const QueryHealthFactorRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryHealthFactorRequest",
  encode(message: QueryHealthFactorRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryHealthFactorRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHealthFactorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryHealthFactorRequest>): QueryHealthFactorRequest {
    const message = createBaseQueryHealthFactorRequest();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QueryHealthFactorRequestAmino): QueryHealthFactorRequest {
    const message = createBaseQueryHealthFactorRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QueryHealthFactorRequest, useInterfaces: boolean = false): QueryHealthFactorRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: QueryHealthFactorRequestAminoMsg): QueryHealthFactorRequest {
    return QueryHealthFactorRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryHealthFactorRequestProtoMsg, useInterfaces: boolean = false): QueryHealthFactorRequest {
    return QueryHealthFactorRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryHealthFactorRequest): Uint8Array {
    return QueryHealthFactorRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryHealthFactorRequest): QueryHealthFactorRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryHealthFactorRequest",
      value: QueryHealthFactorRequest.encode(message).finish()
    };
  }
};
function createBaseQueryHealthFactorResponse(): QueryHealthFactorResponse {
  return {
    healthFactor: ""
  };
}
export const QueryHealthFactorResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryHealthFactorResponse",
  encode(message: QueryHealthFactorResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.healthFactor !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.healthFactor, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryHealthFactorResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryHealthFactorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.healthFactor = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryHealthFactorResponse>): QueryHealthFactorResponse {
    const message = createBaseQueryHealthFactorResponse();
    message.healthFactor = object.healthFactor ?? "";
    return message;
  },
  fromAmino(object: QueryHealthFactorResponseAmino): QueryHealthFactorResponse {
    const message = createBaseQueryHealthFactorResponse();
    if (object.health_factor !== undefined && object.health_factor !== null) {
      message.healthFactor = object.health_factor;
    }
    return message;
  },
  toAmino(message: QueryHealthFactorResponse, useInterfaces: boolean = false): QueryHealthFactorResponseAmino {
    const obj: any = {};
    obj.health_factor = message.healthFactor === "" ? undefined : message.healthFactor;
    return obj;
  },
  fromAminoMsg(object: QueryHealthFactorResponseAminoMsg): QueryHealthFactorResponse {
    return QueryHealthFactorResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryHealthFactorResponseProtoMsg, useInterfaces: boolean = false): QueryHealthFactorResponse {
    return QueryHealthFactorResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryHealthFactorResponse): Uint8Array {
    return QueryHealthFactorResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryHealthFactorResponse): QueryHealthFactorResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryHealthFactorResponse",
      value: QueryHealthFactorResponse.encode(message).finish()
    };
  }
};
function createBaseQueryAccountEModeRequest(): QueryAccountEModeRequest {
  return {
    address: ""
  };
}
export const QueryAccountEModeRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountEModeRequest",
  encode(message: QueryAccountEModeRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAccountEModeRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountEModeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAccountEModeRequest>): QueryAccountEModeRequest {
    const message = createBaseQueryAccountEModeRequest();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: QueryAccountEModeRequestAmino): QueryAccountEModeRequest {
    const message = createBaseQueryAccountEModeRequest();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: QueryAccountEModeRequest, useInterfaces: boolean = false): QueryAccountEModeRequestAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    return obj;
  },
  fromAminoMsg(object: QueryAccountEModeRequestAminoMsg): QueryAccountEModeRequest {
    return QueryAccountEModeRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAccountEModeRequestProtoMsg, useInterfaces: boolean = false): QueryAccountEModeRequest {
    return QueryAccountEModeRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAccountEModeRequest): Uint8Array {
    return QueryAccountEModeRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountEModeRequest): QueryAccountEModeRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryAccountEModeRequest",
      value: QueryAccountEModeRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAccountEModeResponse(): QueryAccountEModeResponse {
  return {
    eModeCategoryName: ""
  };
}
export const QueryAccountEModeResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryAccountEModeResponse",
  encode(message: QueryAccountEModeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.eModeCategoryName !== "") {
      writer.uint32(10).string(message.eModeCategoryName);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAccountEModeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountEModeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.eModeCategoryName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAccountEModeResponse>): QueryAccountEModeResponse {
    const message = createBaseQueryAccountEModeResponse();
    message.eModeCategoryName = object.eModeCategoryName ?? "";
    return message;
  },
  fromAmino(object: QueryAccountEModeResponseAmino): QueryAccountEModeResponse {
    const message = createBaseQueryAccountEModeResponse();
    if (object.e_mode_category_name !== undefined && object.e_mode_category_name !== null) {
      message.eModeCategoryName = object.e_mode_category_name;
    }
    return message;
  },
  toAmino(message: QueryAccountEModeResponse, useInterfaces: boolean = false): QueryAccountEModeResponseAmino {
    const obj: any = {};
    obj.e_mode_category_name = message.eModeCategoryName === "" ? undefined : message.eModeCategoryName;
    return obj;
  },
  fromAminoMsg(object: QueryAccountEModeResponseAminoMsg): QueryAccountEModeResponse {
    return QueryAccountEModeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryAccountEModeResponseProtoMsg, useInterfaces: boolean = false): QueryAccountEModeResponse {
    return QueryAccountEModeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAccountEModeResponse): Uint8Array {
    return QueryAccountEModeResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAccountEModeResponse): QueryAccountEModeResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryAccountEModeResponse",
      value: QueryAccountEModeResponse.encode(message).finish()
    };
  }
};
function createBaseQueryCDPLiquidationsAllRequest(): QueryCDPLiquidationsAllRequest {
  return {
    pagination: undefined
  };
}
export const QueryCDPLiquidationsAllRequest = {
  typeUrl: "/Switcheo.carbon.cdp.QueryCDPLiquidationsAllRequest",
  encode(message: QueryCDPLiquidationsAllRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryCDPLiquidationsAllRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCDPLiquidationsAllRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCDPLiquidationsAllRequest>): QueryCDPLiquidationsAllRequest {
    const message = createBaseQueryCDPLiquidationsAllRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryCDPLiquidationsAllRequestAmino): QueryCDPLiquidationsAllRequest {
    const message = createBaseQueryCDPLiquidationsAllRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryCDPLiquidationsAllRequest, useInterfaces: boolean = false): QueryCDPLiquidationsAllRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryCDPLiquidationsAllRequestAminoMsg): QueryCDPLiquidationsAllRequest {
    return QueryCDPLiquidationsAllRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCDPLiquidationsAllRequestProtoMsg, useInterfaces: boolean = false): QueryCDPLiquidationsAllRequest {
    return QueryCDPLiquidationsAllRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryCDPLiquidationsAllRequest): Uint8Array {
    return QueryCDPLiquidationsAllRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryCDPLiquidationsAllRequest): QueryCDPLiquidationsAllRequestProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryCDPLiquidationsAllRequest",
      value: QueryCDPLiquidationsAllRequest.encode(message).finish()
    };
  }
};
function createBaseQueryCDPLiquidationsAllResponse(): QueryCDPLiquidationsAllResponse {
  return {
    cdpLiquidationsAll: [],
    pagination: undefined
  };
}
export const QueryCDPLiquidationsAllResponse = {
  typeUrl: "/Switcheo.carbon.cdp.QueryCDPLiquidationsAllResponse",
  encode(message: QueryCDPLiquidationsAllResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.cdpLiquidationsAll) {
      CDPLiquidations.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryCDPLiquidationsAllResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCDPLiquidationsAllResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cdpLiquidationsAll.push(CDPLiquidations.decode(reader, reader.uint32(), useInterfaces));
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
  fromPartial(object: Partial<QueryCDPLiquidationsAllResponse>): QueryCDPLiquidationsAllResponse {
    const message = createBaseQueryCDPLiquidationsAllResponse();
    message.cdpLiquidationsAll = object.cdpLiquidationsAll?.map(e => CDPLiquidations.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryCDPLiquidationsAllResponseAmino): QueryCDPLiquidationsAllResponse {
    const message = createBaseQueryCDPLiquidationsAllResponse();
    message.cdpLiquidationsAll = object.cdp_liquidations_all?.map(e => CDPLiquidations.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryCDPLiquidationsAllResponse, useInterfaces: boolean = false): QueryCDPLiquidationsAllResponseAmino {
    const obj: any = {};
    if (message.cdpLiquidationsAll) {
      obj.cdp_liquidations_all = message.cdpLiquidationsAll.map(e => e ? CDPLiquidations.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.cdp_liquidations_all = message.cdpLiquidationsAll;
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryCDPLiquidationsAllResponseAminoMsg): QueryCDPLiquidationsAllResponse {
    return QueryCDPLiquidationsAllResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCDPLiquidationsAllResponseProtoMsg, useInterfaces: boolean = false): QueryCDPLiquidationsAllResponse {
    return QueryCDPLiquidationsAllResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryCDPLiquidationsAllResponse): Uint8Array {
    return QueryCDPLiquidationsAllResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCDPLiquidationsAllResponse): QueryCDPLiquidationsAllResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.QueryCDPLiquidationsAllResponse",
      value: QueryCDPLiquidationsAllResponse.encode(message).finish()
    };
  }
};