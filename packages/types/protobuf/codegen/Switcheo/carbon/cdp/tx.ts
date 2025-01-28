//@ts-nocheck
import { RateStrategyParams, RateStrategyParamsAmino, RateStrategyParamsSDKType } from "./rate_strategy_params";
import { AssetParams, AssetParamsAmino, AssetParamsSDKType, UpdateAssetParams, UpdateAssetParamsAmino, UpdateAssetParamsSDKType } from "./asset_params";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { CreateRewardSchemeParams, CreateRewardSchemeParamsAmino, CreateRewardSchemeParamsSDKType, UpdateRewardSchemeParams, UpdateRewardSchemeParamsAmino, UpdateRewardSchemeParamsSDKType } from "./reward_scheme";
import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
import { EModeCategory, EModeCategoryAmino, EModeCategorySDKType } from "./e_mode_category";
import { ParamsToUpdate, ParamsToUpdateAmino, ParamsToUpdateSDKType } from "./params";
import { StringValue, StringValueAmino, StringValueSDKType, Int64Value, Int64ValueAmino, Int64ValueSDKType, BoolValue, BoolValueAmino, BoolValueSDKType } from "../../../google/protobuf/wrappers";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export interface MsgAddRateStrategy {
  creator: string;
  rateStrategyParams: RateStrategyParams | undefined;
}
export interface MsgAddRateStrategyProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgAddRateStrategy";
  value: Uint8Array;
}
export interface MsgAddRateStrategyAmino {
  creator?: string;
  rate_strategy_params?: RateStrategyParamsAmino | undefined;
}
export interface MsgAddRateStrategyAminoMsg {
  type: "cdp/AddRateStrategy";
  value: MsgAddRateStrategyAmino;
}
export interface MsgAddRateStrategySDKType {
  creator: string;
  rate_strategy_params: RateStrategyParamsSDKType | undefined;
}
export interface MsgAddRateStrategyResponse {
  rateStrategyParams: RateStrategyParams | undefined;
}
export interface MsgAddRateStrategyResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgAddRateStrategyResponse";
  value: Uint8Array;
}
export interface MsgAddRateStrategyResponseAmino {
  rate_strategy_params?: RateStrategyParamsAmino | undefined;
}
export interface MsgAddRateStrategyResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgAddRateStrategyResponse";
  value: MsgAddRateStrategyResponseAmino;
}
export interface MsgAddRateStrategyResponseSDKType {
  rate_strategy_params: RateStrategyParamsSDKType | undefined;
}
export interface MsgUpdateRateStrategy {
  creator: string;
  rateStrategyParams: RateStrategyParams | undefined;
}
export interface MsgUpdateRateStrategyProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateRateStrategy";
  value: Uint8Array;
}
export interface MsgUpdateRateStrategyAmino {
  creator?: string;
  rate_strategy_params?: RateStrategyParamsAmino | undefined;
}
export interface MsgUpdateRateStrategyAminoMsg {
  type: "cdp/UpdateRateStrategy";
  value: MsgUpdateRateStrategyAmino;
}
export interface MsgUpdateRateStrategySDKType {
  creator: string;
  rate_strategy_params: RateStrategyParamsSDKType | undefined;
}
export interface MsgUpdateRateStrategyResponse {
  rateStrategyParams: RateStrategyParams | undefined;
}
export interface MsgUpdateRateStrategyResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateRateStrategyResponse";
  value: Uint8Array;
}
export interface MsgUpdateRateStrategyResponseAmino {
  rate_strategy_params?: RateStrategyParamsAmino | undefined;
}
export interface MsgUpdateRateStrategyResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgUpdateRateStrategyResponse";
  value: MsgUpdateRateStrategyResponseAmino;
}
export interface MsgUpdateRateStrategyResponseSDKType {
  rate_strategy_params: RateStrategyParamsSDKType | undefined;
}
export interface MsgRemoveRateStrategy {
  creator: string;
  name: string;
}
export interface MsgRemoveRateStrategyProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgRemoveRateStrategy";
  value: Uint8Array;
}
export interface MsgRemoveRateStrategyAmino {
  creator?: string;
  name?: string;
}
export interface MsgRemoveRateStrategyAminoMsg {
  type: "cdp/RemoveRateStrategy";
  value: MsgRemoveRateStrategyAmino;
}
export interface MsgRemoveRateStrategySDKType {
  creator: string;
  name: string;
}
export interface MsgRemoveRateStrategyResponse {
  name: string;
}
export interface MsgRemoveRateStrategyResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgRemoveRateStrategyResponse";
  value: Uint8Array;
}
export interface MsgRemoveRateStrategyResponseAmino {
  name?: string;
}
export interface MsgRemoveRateStrategyResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgRemoveRateStrategyResponse";
  value: MsgRemoveRateStrategyResponseAmino;
}
export interface MsgRemoveRateStrategyResponseSDKType {
  name: string;
}
export interface MsgAddAsset {
  creator: string;
  assetParams: AssetParams | undefined;
}
export interface MsgAddAssetProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgAddAsset";
  value: Uint8Array;
}
export interface MsgAddAssetAmino {
  creator?: string;
  asset_params?: AssetParamsAmino | undefined;
}
export interface MsgAddAssetAminoMsg {
  type: "cdp/AddAsset";
  value: MsgAddAssetAmino;
}
export interface MsgAddAssetSDKType {
  creator: string;
  asset_params: AssetParamsSDKType | undefined;
}
export interface MsgAddAssetResponse {
  assetParams: AssetParams | undefined;
}
export interface MsgAddAssetResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgAddAssetResponse";
  value: Uint8Array;
}
export interface MsgAddAssetResponseAmino {
  asset_params?: AssetParamsAmino | undefined;
}
export interface MsgAddAssetResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgAddAssetResponse";
  value: MsgAddAssetResponseAmino;
}
export interface MsgAddAssetResponseSDKType {
  asset_params: AssetParamsSDKType | undefined;
}
export interface MsgUpdateAsset {
  creator: string;
  assetParams: UpdateAssetParams | undefined;
}
export interface MsgUpdateAssetProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateAsset";
  value: Uint8Array;
}
export interface MsgUpdateAssetAmino {
  creator?: string;
  asset_params?: UpdateAssetParamsAmino | undefined;
}
export interface MsgUpdateAssetAminoMsg {
  type: "cdp/UpdateAsset";
  value: MsgUpdateAssetAmino;
}
export interface MsgUpdateAssetSDKType {
  creator: string;
  asset_params: UpdateAssetParamsSDKType | undefined;
}
export interface MsgUpdateAssetResponse {
  assetParams: AssetParams | undefined;
}
export interface MsgUpdateAssetResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateAssetResponse";
  value: Uint8Array;
}
export interface MsgUpdateAssetResponseAmino {
  asset_params?: AssetParamsAmino | undefined;
}
export interface MsgUpdateAssetResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgUpdateAssetResponse";
  value: MsgUpdateAssetResponseAmino;
}
export interface MsgUpdateAssetResponseSDKType {
  asset_params: AssetParamsSDKType | undefined;
}
export interface MsgSupplyAsset {
  creator: string;
  denom: string;
  amount: string;
}
export interface MsgSupplyAssetProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSupplyAsset";
  value: Uint8Array;
}
export interface MsgSupplyAssetAmino {
  creator?: string;
  denom?: string;
  amount?: string;
}
export interface MsgSupplyAssetAminoMsg {
  type: "cdp/SupplyAsset";
  value: MsgSupplyAssetAmino;
}
export interface MsgSupplyAssetSDKType {
  creator: string;
  denom: string;
  amount: string;
}
export interface MsgSupplyAssetResponse {}
export interface MsgSupplyAssetResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSupplyAssetResponse";
  value: Uint8Array;
}
export interface MsgSupplyAssetResponseAmino {}
export interface MsgSupplyAssetResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgSupplyAssetResponse";
  value: MsgSupplyAssetResponseAmino;
}
export interface MsgSupplyAssetResponseSDKType {}
export interface MsgWithdrawAsset {
  creator: string;
  cibtDenom: string;
  amount: string;
}
export interface MsgWithdrawAssetProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgWithdrawAsset";
  value: Uint8Array;
}
export interface MsgWithdrawAssetAmino {
  creator?: string;
  cibt_denom?: string;
  amount?: string;
}
export interface MsgWithdrawAssetAminoMsg {
  type: "cdp/WithdrawAsset";
  value: MsgWithdrawAssetAmino;
}
export interface MsgWithdrawAssetSDKType {
  creator: string;
  cibt_denom: string;
  amount: string;
}
export interface MsgWithdrawAssetResponse {}
export interface MsgWithdrawAssetResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgWithdrawAssetResponse";
  value: Uint8Array;
}
export interface MsgWithdrawAssetResponseAmino {}
export interface MsgWithdrawAssetResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgWithdrawAssetResponse";
  value: MsgWithdrawAssetResponseAmino;
}
export interface MsgWithdrawAssetResponseSDKType {}
export interface MsgLockCollateral {
  creator: string;
  cibtDenom: string;
  amount: string;
}
export interface MsgLockCollateralProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgLockCollateral";
  value: Uint8Array;
}
export interface MsgLockCollateralAmino {
  creator?: string;
  cibt_denom?: string;
  amount?: string;
}
export interface MsgLockCollateralAminoMsg {
  type: "cdp/LockCollateral";
  value: MsgLockCollateralAmino;
}
export interface MsgLockCollateralSDKType {
  creator: string;
  cibt_denom: string;
  amount: string;
}
export interface MsgLockCollateralResponse {}
export interface MsgLockCollateralResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgLockCollateralResponse";
  value: Uint8Array;
}
export interface MsgLockCollateralResponseAmino {}
export interface MsgLockCollateralResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgLockCollateralResponse";
  value: MsgLockCollateralResponseAmino;
}
export interface MsgLockCollateralResponseSDKType {}
export interface MsgUnlockCollateral {
  creator: string;
  cibtDenom: string;
  amount: string;
}
export interface MsgUnlockCollateralProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgUnlockCollateral";
  value: Uint8Array;
}
export interface MsgUnlockCollateralAmino {
  creator?: string;
  cibt_denom?: string;
  amount?: string;
}
export interface MsgUnlockCollateralAminoMsg {
  type: "cdp/UnlockCollateral";
  value: MsgUnlockCollateralAmino;
}
export interface MsgUnlockCollateralSDKType {
  creator: string;
  cibt_denom: string;
  amount: string;
}
export interface MsgUnlockCollateralResponse {}
export interface MsgUnlockCollateralResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgUnlockCollateralResponse";
  value: Uint8Array;
}
export interface MsgUnlockCollateralResponseAmino {}
export interface MsgUnlockCollateralResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgUnlockCollateralResponse";
  value: MsgUnlockCollateralResponseAmino;
}
export interface MsgUnlockCollateralResponseSDKType {}
export interface MsgBorrowAsset {
  creator: string;
  denom: string;
  amount: string;
}
export interface MsgBorrowAssetProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgBorrowAsset";
  value: Uint8Array;
}
export interface MsgBorrowAssetAmino {
  creator?: string;
  denom?: string;
  amount?: string;
}
export interface MsgBorrowAssetAminoMsg {
  type: "cdp/BorrowAsset";
  value: MsgBorrowAssetAmino;
}
export interface MsgBorrowAssetSDKType {
  creator: string;
  denom: string;
  amount: string;
}
export interface MsgBorrowAssetResponse {}
export interface MsgBorrowAssetResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgBorrowAssetResponse";
  value: Uint8Array;
}
export interface MsgBorrowAssetResponseAmino {}
export interface MsgBorrowAssetResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgBorrowAssetResponse";
  value: MsgBorrowAssetResponseAmino;
}
export interface MsgBorrowAssetResponseSDKType {}
export interface MsgRepayAsset {
  creator: string;
  denom: string;
  amount: string;
  debtor: string;
  fromCollateral: boolean;
}
export interface MsgRepayAssetProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgRepayAsset";
  value: Uint8Array;
}
export interface MsgRepayAssetAmino {
  creator?: string;
  denom?: string;
  amount?: string;
  debtor?: string;
  from_collateral?: boolean;
}
export interface MsgRepayAssetAminoMsg {
  type: "cdp/RepayAsset";
  value: MsgRepayAssetAmino;
}
export interface MsgRepayAssetSDKType {
  creator: string;
  denom: string;
  amount: string;
  debtor: string;
  from_collateral: boolean;
}
export interface MsgRepayAssetResponse {}
export interface MsgRepayAssetResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgRepayAssetResponse";
  value: Uint8Array;
}
export interface MsgRepayAssetResponseAmino {}
export interface MsgRepayAssetResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgRepayAssetResponse";
  value: MsgRepayAssetResponseAmino;
}
export interface MsgRepayAssetResponseSDKType {}
export interface MsgSupplyAssetAndLockCollateral {
  creator: string;
  denom: string;
  supplyAmount: string;
  lockAmount: string;
}
export interface MsgSupplyAssetAndLockCollateralProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSupplyAssetAndLockCollateral";
  value: Uint8Array;
}
export interface MsgSupplyAssetAndLockCollateralAmino {
  creator?: string;
  denom?: string;
  supply_amount?: string;
  lock_amount?: string;
}
export interface MsgSupplyAssetAndLockCollateralAminoMsg {
  type: "cdp/SupplyAssetAndLockCollateral";
  value: MsgSupplyAssetAndLockCollateralAmino;
}
export interface MsgSupplyAssetAndLockCollateralSDKType {
  creator: string;
  denom: string;
  supply_amount: string;
  lock_amount: string;
}
export interface MsgSupplyAssetAndLockCollateralResponse {}
export interface MsgSupplyAssetAndLockCollateralResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSupplyAssetAndLockCollateralResponse";
  value: Uint8Array;
}
export interface MsgSupplyAssetAndLockCollateralResponseAmino {}
export interface MsgSupplyAssetAndLockCollateralResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgSupplyAssetAndLockCollateralResponse";
  value: MsgSupplyAssetAndLockCollateralResponseAmino;
}
export interface MsgSupplyAssetAndLockCollateralResponseSDKType {}
export interface MsgUnlockCollateralAndWithdrawAsset {
  creator: string;
  cibtDenom: string;
  unlockAmount: string;
  withdrawAmount: string;
}
export interface MsgUnlockCollateralAndWithdrawAssetProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgUnlockCollateralAndWithdrawAsset";
  value: Uint8Array;
}
export interface MsgUnlockCollateralAndWithdrawAssetAmino {
  creator?: string;
  cibt_denom?: string;
  unlock_amount?: string;
  withdraw_amount?: string;
}
export interface MsgUnlockCollateralAndWithdrawAssetAminoMsg {
  type: "cdp/UnlockCollateralAndWithdrawAsset";
  value: MsgUnlockCollateralAndWithdrawAssetAmino;
}
export interface MsgUnlockCollateralAndWithdrawAssetSDKType {
  creator: string;
  cibt_denom: string;
  unlock_amount: string;
  withdraw_amount: string;
}
export interface MsgUnlockCollateralAndWithdrawAssetResponse {}
export interface MsgUnlockCollateralAndWithdrawAssetResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgUnlockCollateralAndWithdrawAssetResponse";
  value: Uint8Array;
}
export interface MsgUnlockCollateralAndWithdrawAssetResponseAmino {}
export interface MsgUnlockCollateralAndWithdrawAssetResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgUnlockCollateralAndWithdrawAssetResponse";
  value: MsgUnlockCollateralAndWithdrawAssetResponseAmino;
}
export interface MsgUnlockCollateralAndWithdrawAssetResponseSDKType {}
export interface MsgLiquidateCollateral {
  creator: string;
  debtor: string;
  minCollateral: Coin | undefined;
  debt: Coin | undefined;
  stableInterest?: Coin | undefined;
  debtFromCollateral: boolean;
  interestFromCollateral: boolean;
}
export interface MsgLiquidateCollateralProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgLiquidateCollateral";
  value: Uint8Array;
}
export interface MsgLiquidateCollateralAmino {
  creator?: string;
  debtor?: string;
  min_collateral?: CoinAmino | undefined;
  debt?: CoinAmino | undefined;
  stable_interest?: CoinAmino | undefined;
  debt_from_collateral?: boolean;
  interest_from_collateral?: boolean;
}
export interface MsgLiquidateCollateralAminoMsg {
  type: "cdp/LiquidateCollateral";
  value: MsgLiquidateCollateralAmino;
}
export interface MsgLiquidateCollateralSDKType {
  creator: string;
  debtor: string;
  min_collateral: CoinSDKType | undefined;
  debt: CoinSDKType | undefined;
  stable_interest?: CoinSDKType | undefined;
  debt_from_collateral: boolean;
  interest_from_collateral: boolean;
}
export interface MsgLiquidateCollateralResponse {}
export interface MsgLiquidateCollateralResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgLiquidateCollateralResponse";
  value: Uint8Array;
}
export interface MsgLiquidateCollateralResponseAmino {}
export interface MsgLiquidateCollateralResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgLiquidateCollateralResponse";
  value: MsgLiquidateCollateralResponseAmino;
}
export interface MsgLiquidateCollateralResponseSDKType {}
export interface MsgSetLiquidationFee {
  creator: string;
  liquidationFee: string;
}
export interface MsgSetLiquidationFeeProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetLiquidationFee";
  value: Uint8Array;
}
export interface MsgSetLiquidationFeeAmino {
  creator?: string;
  liquidation_fee?: string;
}
export interface MsgSetLiquidationFeeAminoMsg {
  type: "cdp/SetLiquidationFee";
  value: MsgSetLiquidationFeeAmino;
}
export interface MsgSetLiquidationFeeSDKType {
  creator: string;
  liquidation_fee: string;
}
export interface MsgSetLiquidationFeeResponse {}
export interface MsgSetLiquidationFeeResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetLiquidationFeeResponse";
  value: Uint8Array;
}
export interface MsgSetLiquidationFeeResponseAmino {}
export interface MsgSetLiquidationFeeResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgSetLiquidationFeeResponse";
  value: MsgSetLiquidationFeeResponseAmino;
}
export interface MsgSetLiquidationFeeResponseSDKType {}
export interface MsgSetInterestFee {
  creator: string;
  interestFee: string;
}
export interface MsgSetInterestFeeProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetInterestFee";
  value: Uint8Array;
}
export interface MsgSetInterestFeeAmino {
  creator?: string;
  interest_fee?: string;
}
export interface MsgSetInterestFeeAminoMsg {
  type: "cdp/SetInterestFee";
  value: MsgSetInterestFeeAmino;
}
export interface MsgSetInterestFeeSDKType {
  creator: string;
  interest_fee: string;
}
export interface MsgSetInterestFeeResponse {}
export interface MsgSetInterestFeeResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetInterestFeeResponse";
  value: Uint8Array;
}
export interface MsgSetInterestFeeResponseAmino {}
export interface MsgSetInterestFeeResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgSetInterestFeeResponse";
  value: MsgSetInterestFeeResponseAmino;
}
export interface MsgSetInterestFeeResponseSDKType {}
export interface MsgSetStablecoinMintCap {
  creator: string;
  stablecoinMintCap: string;
}
export interface MsgSetStablecoinMintCapProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetStablecoinMintCap";
  value: Uint8Array;
}
export interface MsgSetStablecoinMintCapAmino {
  creator?: string;
  stablecoin_mint_cap?: string;
}
export interface MsgSetStablecoinMintCapAminoMsg {
  type: "cdp/SetStablecoinMintCap";
  value: MsgSetStablecoinMintCapAmino;
}
export interface MsgSetStablecoinMintCapSDKType {
  creator: string;
  stablecoin_mint_cap: string;
}
export interface MsgSetStablecoinMintCapResponse {}
export interface MsgSetStablecoinMintCapResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetStablecoinMintCapResponse";
  value: Uint8Array;
}
export interface MsgSetStablecoinMintCapResponseAmino {}
export interface MsgSetStablecoinMintCapResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgSetStablecoinMintCapResponse";
  value: MsgSetStablecoinMintCapResponseAmino;
}
export interface MsgSetStablecoinMintCapResponseSDKType {}
export interface MsgSetStablecoinInterestRate {
  creator: string;
  stablecoinInterestRate: string;
}
export interface MsgSetStablecoinInterestRateProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetStablecoinInterestRate";
  value: Uint8Array;
}
export interface MsgSetStablecoinInterestRateAmino {
  creator?: string;
  stablecoin_interest_rate?: string;
}
export interface MsgSetStablecoinInterestRateAminoMsg {
  type: "cdp/SetStablecoinInterestRate";
  value: MsgSetStablecoinInterestRateAmino;
}
export interface MsgSetStablecoinInterestRateSDKType {
  creator: string;
  stablecoin_interest_rate: string;
}
export interface MsgSetStablecoinInterestRateResponse {}
export interface MsgSetStablecoinInterestRateResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetStablecoinInterestRateResponse";
  value: Uint8Array;
}
export interface MsgSetStablecoinInterestRateResponseAmino {}
export interface MsgSetStablecoinInterestRateResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgSetStablecoinInterestRateResponse";
  value: MsgSetStablecoinInterestRateResponseAmino;
}
export interface MsgSetStablecoinInterestRateResponseSDKType {}
export interface MsgMintStablecoin {
  creator: string;
  amount: string;
}
export interface MsgMintStablecoinProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgMintStablecoin";
  value: Uint8Array;
}
export interface MsgMintStablecoinAmino {
  creator?: string;
  amount?: string;
}
export interface MsgMintStablecoinAminoMsg {
  type: "cdp/MintStablecoin";
  value: MsgMintStablecoinAmino;
}
export interface MsgMintStablecoinSDKType {
  creator: string;
  amount: string;
}
export interface MsgMintStablecoinResponse {}
export interface MsgMintStablecoinResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgMintStablecoinResponse";
  value: Uint8Array;
}
export interface MsgMintStablecoinResponseAmino {}
export interface MsgMintStablecoinResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgMintStablecoinResponse";
  value: MsgMintStablecoinResponseAmino;
}
export interface MsgMintStablecoinResponseSDKType {}
export interface MsgReturnStablecoin {
  creator: string;
  principal: Coin | undefined;
  interest: Coin | undefined;
  debtor: string;
  principalFromCollateral: boolean;
  interestFromCollateral: boolean;
}
export interface MsgReturnStablecoinProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgReturnStablecoin";
  value: Uint8Array;
}
export interface MsgReturnStablecoinAmino {
  creator?: string;
  principal?: CoinAmino | undefined;
  interest?: CoinAmino | undefined;
  debtor?: string;
  principal_from_collateral?: boolean;
  interest_from_collateral?: boolean;
}
export interface MsgReturnStablecoinAminoMsg {
  type: "cdp/ReturnStablecoin";
  value: MsgReturnStablecoinAmino;
}
export interface MsgReturnStablecoinSDKType {
  creator: string;
  principal: CoinSDKType | undefined;
  interest: CoinSDKType | undefined;
  debtor: string;
  principal_from_collateral: boolean;
  interest_from_collateral: boolean;
}
export interface MsgReturnStablecoinResponse {}
export interface MsgReturnStablecoinResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgReturnStablecoinResponse";
  value: Uint8Array;
}
export interface MsgReturnStablecoinResponseAmino {}
export interface MsgReturnStablecoinResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgReturnStablecoinResponse";
  value: MsgReturnStablecoinResponseAmino;
}
export interface MsgReturnStablecoinResponseSDKType {}
export interface MsgSetCompleteLiquidationThreshold {
  creator: string;
  completeLiquidationThreshold: string;
}
export interface MsgSetCompleteLiquidationThresholdProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetCompleteLiquidationThreshold";
  value: Uint8Array;
}
export interface MsgSetCompleteLiquidationThresholdAmino {
  creator?: string;
  complete_liquidation_threshold?: string;
}
export interface MsgSetCompleteLiquidationThresholdAminoMsg {
  type: "cdp/SetCompleteLiquidationThreshold";
  value: MsgSetCompleteLiquidationThresholdAmino;
}
export interface MsgSetCompleteLiquidationThresholdSDKType {
  creator: string;
  complete_liquidation_threshold: string;
}
export interface MsgSetCompleteLiquidationThresholdResponse {}
export interface MsgSetCompleteLiquidationThresholdResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetCompleteLiquidationThresholdResponse";
  value: Uint8Array;
}
export interface MsgSetCompleteLiquidationThresholdResponseAmino {}
export interface MsgSetCompleteLiquidationThresholdResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgSetCompleteLiquidationThresholdResponse";
  value: MsgSetCompleteLiquidationThresholdResponseAmino;
}
export interface MsgSetCompleteLiquidationThresholdResponseSDKType {}
export interface MsgSetMinimumCloseFactor {
  creator: string;
  minimumCloseFactor: string;
}
export interface MsgSetMinimumCloseFactorProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetMinimumCloseFactor";
  value: Uint8Array;
}
export interface MsgSetMinimumCloseFactorAmino {
  creator?: string;
  minimum_close_factor?: string;
}
export interface MsgSetMinimumCloseFactorAminoMsg {
  type: "cdp/SetMinimumCloseFactor";
  value: MsgSetMinimumCloseFactorAmino;
}
export interface MsgSetMinimumCloseFactorSDKType {
  creator: string;
  minimum_close_factor: string;
}
export interface MsgSetMinimumCloseFactorResponse {}
export interface MsgSetMinimumCloseFactorResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetMinimumCloseFactorResponse";
  value: Uint8Array;
}
export interface MsgSetMinimumCloseFactorResponseAmino {}
export interface MsgSetMinimumCloseFactorResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgSetMinimumCloseFactorResponse";
  value: MsgSetMinimumCloseFactorResponseAmino;
}
export interface MsgSetMinimumCloseFactorResponseSDKType {}
export interface MsgSetSmallLiquidationSize {
  creator: string;
  smallLiquidationSize: string;
}
export interface MsgSetSmallLiquidationSizeProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetSmallLiquidationSize";
  value: Uint8Array;
}
export interface MsgSetSmallLiquidationSizeAmino {
  creator?: string;
  small_liquidation_size?: string;
}
export interface MsgSetSmallLiquidationSizeAminoMsg {
  type: "cdp/SetSmallLiquidationSize";
  value: MsgSetSmallLiquidationSizeAmino;
}
export interface MsgSetSmallLiquidationSizeSDKType {
  creator: string;
  small_liquidation_size: string;
}
export interface MsgSetSmallLiquidationSizeResponse {}
export interface MsgSetSmallLiquidationSizeResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetSmallLiquidationSizeResponse";
  value: Uint8Array;
}
export interface MsgSetSmallLiquidationSizeResponseAmino {}
export interface MsgSetSmallLiquidationSizeResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgSetSmallLiquidationSizeResponse";
  value: MsgSetSmallLiquidationSizeResponseAmino;
}
export interface MsgSetSmallLiquidationSizeResponseSDKType {}
export interface MsgCreateRewardScheme {
  creator: string;
  createRewardSchemeParams: CreateRewardSchemeParams | undefined;
}
export interface MsgCreateRewardSchemeProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgCreateRewardScheme";
  value: Uint8Array;
}
export interface MsgCreateRewardSchemeAmino {
  creator?: string;
  create_reward_scheme_params?: CreateRewardSchemeParamsAmino | undefined;
}
export interface MsgCreateRewardSchemeAminoMsg {
  type: "cdp/CreateRewardScheme";
  value: MsgCreateRewardSchemeAmino;
}
export interface MsgCreateRewardSchemeSDKType {
  creator: string;
  create_reward_scheme_params: CreateRewardSchemeParamsSDKType | undefined;
}
export interface MsgCreateRewardSchemeResponse {}
export interface MsgCreateRewardSchemeResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgCreateRewardSchemeResponse";
  value: Uint8Array;
}
export interface MsgCreateRewardSchemeResponseAmino {}
export interface MsgCreateRewardSchemeResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgCreateRewardSchemeResponse";
  value: MsgCreateRewardSchemeResponseAmino;
}
export interface MsgCreateRewardSchemeResponseSDKType {}
export interface MsgUpdateRewardScheme {
  updater: string;
  updateRewardSchemeParams: UpdateRewardSchemeParams | undefined;
}
export interface MsgUpdateRewardSchemeProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateRewardScheme";
  value: Uint8Array;
}
export interface MsgUpdateRewardSchemeAmino {
  updater?: string;
  update_reward_scheme_params?: UpdateRewardSchemeParamsAmino | undefined;
}
export interface MsgUpdateRewardSchemeAminoMsg {
  type: "cdp/UpdateRewardScheme";
  value: MsgUpdateRewardSchemeAmino;
}
export interface MsgUpdateRewardSchemeSDKType {
  updater: string;
  update_reward_scheme_params: UpdateRewardSchemeParamsSDKType | undefined;
}
export interface MsgUpdateRewardSchemeResponse {}
export interface MsgUpdateRewardSchemeResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateRewardSchemeResponse";
  value: Uint8Array;
}
export interface MsgUpdateRewardSchemeResponseAmino {}
export interface MsgUpdateRewardSchemeResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgUpdateRewardSchemeResponse";
  value: MsgUpdateRewardSchemeResponseAmino;
}
export interface MsgUpdateRewardSchemeResponseSDKType {}
export interface MsgClaimRewards {
  creator: string;
}
export interface MsgClaimRewardsProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgClaimRewards";
  value: Uint8Array;
}
export interface MsgClaimRewardsAmino {
  creator?: string;
}
export interface MsgClaimRewardsAminoMsg {
  type: "cdp/ClaimRewards";
  value: MsgClaimRewardsAmino;
}
export interface MsgClaimRewardsSDKType {
  creator: string;
}
export interface MsgClaimRewardsResponse {}
export interface MsgClaimRewardsResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgClaimRewardsResponse";
  value: Uint8Array;
}
export interface MsgClaimRewardsResponseAmino {}
export interface MsgClaimRewardsResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgClaimRewardsResponse";
  value: MsgClaimRewardsResponseAmino;
}
export interface MsgClaimRewardsResponseSDKType {}
export interface MsgSetStalePriceGracePeriod {
  creator: string;
  stalePriceGracePeriod: Duration | undefined;
}
export interface MsgSetStalePriceGracePeriodProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetStalePriceGracePeriod";
  value: Uint8Array;
}
export interface MsgSetStalePriceGracePeriodAmino {
  creator?: string;
  stale_price_grace_period?: DurationAmino | undefined;
}
export interface MsgSetStalePriceGracePeriodAminoMsg {
  type: "cdp/SetStalePriceGracePeriod";
  value: MsgSetStalePriceGracePeriodAmino;
}
export interface MsgSetStalePriceGracePeriodSDKType {
  creator: string;
  stale_price_grace_period: DurationSDKType | undefined;
}
export interface MsgSetStalePriceGracePeriodResponse {}
export interface MsgSetStalePriceGracePeriodResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetStalePriceGracePeriodResponse";
  value: Uint8Array;
}
export interface MsgSetStalePriceGracePeriodResponseAmino {}
export interface MsgSetStalePriceGracePeriodResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgSetStalePriceGracePeriodResponse";
  value: MsgSetStalePriceGracePeriodResponseAmino;
}
export interface MsgSetStalePriceGracePeriodResponseSDKType {}
export interface MsgSetCdpPaused {
  creator: string;
  cdpPaused: boolean;
}
export interface MsgSetCdpPausedProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetCdpPaused";
  value: Uint8Array;
}
export interface MsgSetCdpPausedAmino {
  creator?: string;
  cdpPaused?: boolean;
}
export interface MsgSetCdpPausedAminoMsg {
  type: "cdp/SetCdpPaused";
  value: MsgSetCdpPausedAmino;
}
export interface MsgSetCdpPausedSDKType {
  creator: string;
  cdpPaused: boolean;
}
export interface MsgSetCdpPausedResponse {}
export interface MsgSetCdpPausedResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetCdpPausedResponse";
  value: Uint8Array;
}
export interface MsgSetCdpPausedResponseAmino {}
export interface MsgSetCdpPausedResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgSetCdpPausedResponse";
  value: MsgSetCdpPausedResponseAmino;
}
export interface MsgSetCdpPausedResponseSDKType {}
export interface MsgConvertTokenInCdpToGroupTokens {
  creator: string;
  denom: string;
}
export interface MsgConvertTokenInCdpToGroupTokensProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgConvertTokenInCdpToGroupTokens";
  value: Uint8Array;
}
export interface MsgConvertTokenInCdpToGroupTokensAmino {
  creator?: string;
  denom?: string;
}
export interface MsgConvertTokenInCdpToGroupTokensAminoMsg {
  type: "cdp/ConvertTokenInCdpToGroupTokens";
  value: MsgConvertTokenInCdpToGroupTokensAmino;
}
export interface MsgConvertTokenInCdpToGroupTokensSDKType {
  creator: string;
  denom: string;
}
export interface MsgConvertTokenInCdpToGroupTokensResponse {}
export interface MsgConvertTokenInCdpToGroupTokensResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgConvertTokenInCdpToGroupTokensResponse";
  value: Uint8Array;
}
export interface MsgConvertTokenInCdpToGroupTokensResponseAmino {}
export interface MsgConvertTokenInCdpToGroupTokensResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgConvertTokenInCdpToGroupTokensResponse";
  value: MsgConvertTokenInCdpToGroupTokensResponseAmino;
}
export interface MsgConvertTokenInCdpToGroupTokensResponseSDKType {}
export interface MsgAddEModeCategory {
  creator: string;
  eModeCategory: EModeCategory | undefined;
}
export interface MsgAddEModeCategoryProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgAddEModeCategory";
  value: Uint8Array;
}
export interface MsgAddEModeCategoryAmino {
  creator?: string;
  e_mode_category?: EModeCategoryAmino | undefined;
}
export interface MsgAddEModeCategoryAminoMsg {
  type: "cdp/AddEModeCategory";
  value: MsgAddEModeCategoryAmino;
}
export interface MsgAddEModeCategorySDKType {
  creator: string;
  e_mode_category: EModeCategorySDKType | undefined;
}
export interface MsgAddEModeCategoryResponse {}
export interface MsgAddEModeCategoryResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgAddEModeCategoryResponse";
  value: Uint8Array;
}
export interface MsgAddEModeCategoryResponseAmino {}
export interface MsgAddEModeCategoryResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgAddEModeCategoryResponse";
  value: MsgAddEModeCategoryResponseAmino;
}
export interface MsgAddEModeCategoryResponseSDKType {}
export interface MsgUpdateEModeCategory {
  creator: string;
  eModeCategoryName: string;
  updateEModeCategoryParams: UpdateEModeCategoryParams | undefined;
}
export interface MsgUpdateEModeCategoryProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateEModeCategory";
  value: Uint8Array;
}
export interface MsgUpdateEModeCategoryAmino {
  creator?: string;
  e_mode_category_name?: string;
  update_e_mode_category_params?: UpdateEModeCategoryParamsAmino | undefined;
}
export interface MsgUpdateEModeCategoryAminoMsg {
  type: "cdp/UpdateEModeCategory";
  value: MsgUpdateEModeCategoryAmino;
}
export interface MsgUpdateEModeCategorySDKType {
  creator: string;
  e_mode_category_name: string;
  update_e_mode_category_params: UpdateEModeCategoryParamsSDKType | undefined;
}
export interface UpdateEModeCategoryParams {
  denoms: StringValue[];
  loanToValue?: Int64Value | undefined;
  liquidationThreshold?: Int64Value | undefined;
  liquidationDiscount?: Int64Value | undefined;
  isActive?: BoolValue | undefined;
}
export interface UpdateEModeCategoryParamsProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.UpdateEModeCategoryParams";
  value: Uint8Array;
}
export interface UpdateEModeCategoryParamsAmino {
  denoms?: StringValueAmino[];
  loan_to_value?: Int64ValueAmino | undefined;
  liquidation_threshold?: Int64ValueAmino | undefined;
  liquidation_discount?: Int64ValueAmino | undefined;
  is_active?: BoolValueAmino | undefined;
}
export interface UpdateEModeCategoryParamsAminoMsg {
  type: "/Switcheo.carbon.cdp.UpdateEModeCategoryParams";
  value: UpdateEModeCategoryParamsAmino;
}
export interface UpdateEModeCategoryParamsSDKType {
  denoms: StringValueSDKType[];
  loan_to_value?: Int64ValueSDKType | undefined;
  liquidation_threshold?: Int64ValueSDKType | undefined;
  liquidation_discount?: Int64ValueSDKType | undefined;
  is_active?: BoolValueSDKType | undefined;
}
export interface MsgUpdateEModeCategoryResponse {}
export interface MsgUpdateEModeCategoryResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateEModeCategoryResponse";
  value: Uint8Array;
}
export interface MsgUpdateEModeCategoryResponseAmino {}
export interface MsgUpdateEModeCategoryResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgUpdateEModeCategoryResponse";
  value: MsgUpdateEModeCategoryResponseAmino;
}
export interface MsgUpdateEModeCategoryResponseSDKType {}
export interface MsgSetAccountEMode {
  creator: string;
  eModeCategoryName: string;
}
export interface MsgSetAccountEModeProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetAccountEMode";
  value: Uint8Array;
}
export interface MsgSetAccountEModeAmino {
  creator?: string;
  e_mode_category_name?: string;
}
export interface MsgSetAccountEModeAminoMsg {
  type: "cdp/SetAccountEMode";
  value: MsgSetAccountEModeAmino;
}
export interface MsgSetAccountEModeSDKType {
  creator: string;
  e_mode_category_name: string;
}
export interface MsgSetAccountEModeResponse {}
export interface MsgSetAccountEModeResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetAccountEModeResponse";
  value: Uint8Array;
}
export interface MsgSetAccountEModeResponseAmino {}
export interface MsgSetAccountEModeResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgSetAccountEModeResponse";
  value: MsgSetAccountEModeResponseAmino;
}
export interface MsgSetAccountEModeResponseSDKType {}
export interface MsgRemoveAccountEMode {
  creator: string;
}
export interface MsgRemoveAccountEModeProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgRemoveAccountEMode";
  value: Uint8Array;
}
export interface MsgRemoveAccountEModeAmino {
  creator?: string;
}
export interface MsgRemoveAccountEModeAminoMsg {
  type: "cdp/RemoveAccountEMode";
  value: MsgRemoveAccountEModeAmino;
}
export interface MsgRemoveAccountEModeSDKType {
  creator: string;
}
export interface MsgRemoveAccountEModeResponse {}
export interface MsgRemoveAccountEModeResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgRemoveAccountEModeResponse";
  value: Uint8Array;
}
export interface MsgRemoveAccountEModeResponseAmino {}
export interface MsgRemoveAccountEModeResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgRemoveAccountEModeResponse";
  value: MsgRemoveAccountEModeResponseAmino;
}
export interface MsgRemoveAccountEModeResponseSDKType {}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParams {
  /** authority is the address of the governance account. */
  authority: string;
  /** params defines the optional parameters to update. */
  params: ParamsToUpdate | undefined;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateParams";
  value: Uint8Array;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsAmino {
  /** authority is the address of the governance account. */
  authority?: string;
  /** params defines the optional parameters to update. */
  params?: ParamsToUpdateAmino | undefined;
}
export interface MsgUpdateParamsAminoMsg {
  type: "cdp/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsToUpdateSDKType | undefined;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/Switcheo.carbon.cdp.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 * 
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponseSDKType {}
function createBaseMsgAddRateStrategy(): MsgAddRateStrategy {
  return {
    creator: "",
    rateStrategyParams: RateStrategyParams.fromPartial({})
  };
}
export const MsgAddRateStrategy = {
  typeUrl: "/Switcheo.carbon.cdp.MsgAddRateStrategy",
  encode(message: MsgAddRateStrategy, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.rateStrategyParams !== undefined) {
      RateStrategyParams.encode(message.rateStrategyParams, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAddRateStrategy {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddRateStrategy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.rateStrategyParams = RateStrategyParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAddRateStrategy>): MsgAddRateStrategy {
    const message = createBaseMsgAddRateStrategy();
    message.creator = object.creator ?? "";
    message.rateStrategyParams = object.rateStrategyParams !== undefined && object.rateStrategyParams !== null ? RateStrategyParams.fromPartial(object.rateStrategyParams) : undefined;
    return message;
  },
  fromAmino(object: MsgAddRateStrategyAmino): MsgAddRateStrategy {
    const message = createBaseMsgAddRateStrategy();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.rate_strategy_params !== undefined && object.rate_strategy_params !== null) {
      message.rateStrategyParams = RateStrategyParams.fromAmino(object.rate_strategy_params);
    }
    return message;
  },
  toAmino(message: MsgAddRateStrategy, useInterfaces: boolean = false): MsgAddRateStrategyAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.rate_strategy_params = message.rateStrategyParams ? RateStrategyParams.toAmino(message.rateStrategyParams, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgAddRateStrategyAminoMsg): MsgAddRateStrategy {
    return MsgAddRateStrategy.fromAmino(object.value);
  },
  toAminoMsg(message: MsgAddRateStrategy, useInterfaces: boolean = false): MsgAddRateStrategyAminoMsg {
    return {
      type: "cdp/AddRateStrategy",
      value: MsgAddRateStrategy.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgAddRateStrategyProtoMsg, useInterfaces: boolean = false): MsgAddRateStrategy {
    return MsgAddRateStrategy.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAddRateStrategy): Uint8Array {
    return MsgAddRateStrategy.encode(message).finish();
  },
  toProtoMsg(message: MsgAddRateStrategy): MsgAddRateStrategyProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgAddRateStrategy",
      value: MsgAddRateStrategy.encode(message).finish()
    };
  }
};
function createBaseMsgAddRateStrategyResponse(): MsgAddRateStrategyResponse {
  return {
    rateStrategyParams: RateStrategyParams.fromPartial({})
  };
}
export const MsgAddRateStrategyResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgAddRateStrategyResponse",
  encode(message: MsgAddRateStrategyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rateStrategyParams !== undefined) {
      RateStrategyParams.encode(message.rateStrategyParams, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAddRateStrategyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddRateStrategyResponse();
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
  fromPartial(object: Partial<MsgAddRateStrategyResponse>): MsgAddRateStrategyResponse {
    const message = createBaseMsgAddRateStrategyResponse();
    message.rateStrategyParams = object.rateStrategyParams !== undefined && object.rateStrategyParams !== null ? RateStrategyParams.fromPartial(object.rateStrategyParams) : undefined;
    return message;
  },
  fromAmino(object: MsgAddRateStrategyResponseAmino): MsgAddRateStrategyResponse {
    const message = createBaseMsgAddRateStrategyResponse();
    if (object.rate_strategy_params !== undefined && object.rate_strategy_params !== null) {
      message.rateStrategyParams = RateStrategyParams.fromAmino(object.rate_strategy_params);
    }
    return message;
  },
  toAmino(message: MsgAddRateStrategyResponse, useInterfaces: boolean = false): MsgAddRateStrategyResponseAmino {
    const obj: any = {};
    obj.rate_strategy_params = message.rateStrategyParams ? RateStrategyParams.toAmino(message.rateStrategyParams, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgAddRateStrategyResponseAminoMsg): MsgAddRateStrategyResponse {
    return MsgAddRateStrategyResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddRateStrategyResponseProtoMsg, useInterfaces: boolean = false): MsgAddRateStrategyResponse {
    return MsgAddRateStrategyResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAddRateStrategyResponse): Uint8Array {
    return MsgAddRateStrategyResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAddRateStrategyResponse): MsgAddRateStrategyResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgAddRateStrategyResponse",
      value: MsgAddRateStrategyResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateRateStrategy(): MsgUpdateRateStrategy {
  return {
    creator: "",
    rateStrategyParams: RateStrategyParams.fromPartial({})
  };
}
export const MsgUpdateRateStrategy = {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateRateStrategy",
  encode(message: MsgUpdateRateStrategy, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.rateStrategyParams !== undefined) {
      RateStrategyParams.encode(message.rateStrategyParams, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateRateStrategy {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateRateStrategy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.rateStrategyParams = RateStrategyParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateRateStrategy>): MsgUpdateRateStrategy {
    const message = createBaseMsgUpdateRateStrategy();
    message.creator = object.creator ?? "";
    message.rateStrategyParams = object.rateStrategyParams !== undefined && object.rateStrategyParams !== null ? RateStrategyParams.fromPartial(object.rateStrategyParams) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateRateStrategyAmino): MsgUpdateRateStrategy {
    const message = createBaseMsgUpdateRateStrategy();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.rate_strategy_params !== undefined && object.rate_strategy_params !== null) {
      message.rateStrategyParams = RateStrategyParams.fromAmino(object.rate_strategy_params);
    }
    return message;
  },
  toAmino(message: MsgUpdateRateStrategy, useInterfaces: boolean = false): MsgUpdateRateStrategyAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.rate_strategy_params = message.rateStrategyParams ? RateStrategyParams.toAmino(message.rateStrategyParams, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateRateStrategyAminoMsg): MsgUpdateRateStrategy {
    return MsgUpdateRateStrategy.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateRateStrategy, useInterfaces: boolean = false): MsgUpdateRateStrategyAminoMsg {
    return {
      type: "cdp/UpdateRateStrategy",
      value: MsgUpdateRateStrategy.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateRateStrategyProtoMsg, useInterfaces: boolean = false): MsgUpdateRateStrategy {
    return MsgUpdateRateStrategy.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateRateStrategy): Uint8Array {
    return MsgUpdateRateStrategy.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateRateStrategy): MsgUpdateRateStrategyProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgUpdateRateStrategy",
      value: MsgUpdateRateStrategy.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateRateStrategyResponse(): MsgUpdateRateStrategyResponse {
  return {
    rateStrategyParams: RateStrategyParams.fromPartial({})
  };
}
export const MsgUpdateRateStrategyResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateRateStrategyResponse",
  encode(message: MsgUpdateRateStrategyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rateStrategyParams !== undefined) {
      RateStrategyParams.encode(message.rateStrategyParams, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateRateStrategyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateRateStrategyResponse();
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
  fromPartial(object: Partial<MsgUpdateRateStrategyResponse>): MsgUpdateRateStrategyResponse {
    const message = createBaseMsgUpdateRateStrategyResponse();
    message.rateStrategyParams = object.rateStrategyParams !== undefined && object.rateStrategyParams !== null ? RateStrategyParams.fromPartial(object.rateStrategyParams) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateRateStrategyResponseAmino): MsgUpdateRateStrategyResponse {
    const message = createBaseMsgUpdateRateStrategyResponse();
    if (object.rate_strategy_params !== undefined && object.rate_strategy_params !== null) {
      message.rateStrategyParams = RateStrategyParams.fromAmino(object.rate_strategy_params);
    }
    return message;
  },
  toAmino(message: MsgUpdateRateStrategyResponse, useInterfaces: boolean = false): MsgUpdateRateStrategyResponseAmino {
    const obj: any = {};
    obj.rate_strategy_params = message.rateStrategyParams ? RateStrategyParams.toAmino(message.rateStrategyParams, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateRateStrategyResponseAminoMsg): MsgUpdateRateStrategyResponse {
    return MsgUpdateRateStrategyResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateRateStrategyResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateRateStrategyResponse {
    return MsgUpdateRateStrategyResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateRateStrategyResponse): Uint8Array {
    return MsgUpdateRateStrategyResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateRateStrategyResponse): MsgUpdateRateStrategyResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgUpdateRateStrategyResponse",
      value: MsgUpdateRateStrategyResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveRateStrategy(): MsgRemoveRateStrategy {
  return {
    creator: "",
    name: ""
  };
}
export const MsgRemoveRateStrategy = {
  typeUrl: "/Switcheo.carbon.cdp.MsgRemoveRateStrategy",
  encode(message: MsgRemoveRateStrategy, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRemoveRateStrategy {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveRateStrategy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRemoveRateStrategy>): MsgRemoveRateStrategy {
    const message = createBaseMsgRemoveRateStrategy();
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    return message;
  },
  fromAmino(object: MsgRemoveRateStrategyAmino): MsgRemoveRateStrategy {
    const message = createBaseMsgRemoveRateStrategy();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    return message;
  },
  toAmino(message: MsgRemoveRateStrategy, useInterfaces: boolean = false): MsgRemoveRateStrategyAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.name = message.name === "" ? undefined : message.name;
    return obj;
  },
  fromAminoMsg(object: MsgRemoveRateStrategyAminoMsg): MsgRemoveRateStrategy {
    return MsgRemoveRateStrategy.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRemoveRateStrategy, useInterfaces: boolean = false): MsgRemoveRateStrategyAminoMsg {
    return {
      type: "cdp/RemoveRateStrategy",
      value: MsgRemoveRateStrategy.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRemoveRateStrategyProtoMsg, useInterfaces: boolean = false): MsgRemoveRateStrategy {
    return MsgRemoveRateStrategy.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRemoveRateStrategy): Uint8Array {
    return MsgRemoveRateStrategy.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveRateStrategy): MsgRemoveRateStrategyProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgRemoveRateStrategy",
      value: MsgRemoveRateStrategy.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveRateStrategyResponse(): MsgRemoveRateStrategyResponse {
  return {
    name: ""
  };
}
export const MsgRemoveRateStrategyResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgRemoveRateStrategyResponse",
  encode(message: MsgRemoveRateStrategyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRemoveRateStrategyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveRateStrategyResponse();
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
  fromPartial(object: Partial<MsgRemoveRateStrategyResponse>): MsgRemoveRateStrategyResponse {
    const message = createBaseMsgRemoveRateStrategyResponse();
    message.name = object.name ?? "";
    return message;
  },
  fromAmino(object: MsgRemoveRateStrategyResponseAmino): MsgRemoveRateStrategyResponse {
    const message = createBaseMsgRemoveRateStrategyResponse();
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    return message;
  },
  toAmino(message: MsgRemoveRateStrategyResponse, useInterfaces: boolean = false): MsgRemoveRateStrategyResponseAmino {
    const obj: any = {};
    obj.name = message.name === "" ? undefined : message.name;
    return obj;
  },
  fromAminoMsg(object: MsgRemoveRateStrategyResponseAminoMsg): MsgRemoveRateStrategyResponse {
    return MsgRemoveRateStrategyResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveRateStrategyResponseProtoMsg, useInterfaces: boolean = false): MsgRemoveRateStrategyResponse {
    return MsgRemoveRateStrategyResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRemoveRateStrategyResponse): Uint8Array {
    return MsgRemoveRateStrategyResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveRateStrategyResponse): MsgRemoveRateStrategyResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgRemoveRateStrategyResponse",
      value: MsgRemoveRateStrategyResponse.encode(message).finish()
    };
  }
};
function createBaseMsgAddAsset(): MsgAddAsset {
  return {
    creator: "",
    assetParams: AssetParams.fromPartial({})
  };
}
export const MsgAddAsset = {
  typeUrl: "/Switcheo.carbon.cdp.MsgAddAsset",
  encode(message: MsgAddAsset, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.assetParams !== undefined) {
      AssetParams.encode(message.assetParams, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAddAsset {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.assetParams = AssetParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAddAsset>): MsgAddAsset {
    const message = createBaseMsgAddAsset();
    message.creator = object.creator ?? "";
    message.assetParams = object.assetParams !== undefined && object.assetParams !== null ? AssetParams.fromPartial(object.assetParams) : undefined;
    return message;
  },
  fromAmino(object: MsgAddAssetAmino): MsgAddAsset {
    const message = createBaseMsgAddAsset();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.asset_params !== undefined && object.asset_params !== null) {
      message.assetParams = AssetParams.fromAmino(object.asset_params);
    }
    return message;
  },
  toAmino(message: MsgAddAsset, useInterfaces: boolean = false): MsgAddAssetAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.asset_params = message.assetParams ? AssetParams.toAmino(message.assetParams, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgAddAssetAminoMsg): MsgAddAsset {
    return MsgAddAsset.fromAmino(object.value);
  },
  toAminoMsg(message: MsgAddAsset, useInterfaces: boolean = false): MsgAddAssetAminoMsg {
    return {
      type: "cdp/AddAsset",
      value: MsgAddAsset.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgAddAssetProtoMsg, useInterfaces: boolean = false): MsgAddAsset {
    return MsgAddAsset.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAddAsset): Uint8Array {
    return MsgAddAsset.encode(message).finish();
  },
  toProtoMsg(message: MsgAddAsset): MsgAddAssetProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgAddAsset",
      value: MsgAddAsset.encode(message).finish()
    };
  }
};
function createBaseMsgAddAssetResponse(): MsgAddAssetResponse {
  return {
    assetParams: AssetParams.fromPartial({})
  };
}
export const MsgAddAssetResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgAddAssetResponse",
  encode(message: MsgAddAssetResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetParams !== undefined) {
      AssetParams.encode(message.assetParams, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAddAssetResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddAssetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetParams = AssetParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAddAssetResponse>): MsgAddAssetResponse {
    const message = createBaseMsgAddAssetResponse();
    message.assetParams = object.assetParams !== undefined && object.assetParams !== null ? AssetParams.fromPartial(object.assetParams) : undefined;
    return message;
  },
  fromAmino(object: MsgAddAssetResponseAmino): MsgAddAssetResponse {
    const message = createBaseMsgAddAssetResponse();
    if (object.asset_params !== undefined && object.asset_params !== null) {
      message.assetParams = AssetParams.fromAmino(object.asset_params);
    }
    return message;
  },
  toAmino(message: MsgAddAssetResponse, useInterfaces: boolean = false): MsgAddAssetResponseAmino {
    const obj: any = {};
    obj.asset_params = message.assetParams ? AssetParams.toAmino(message.assetParams, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgAddAssetResponseAminoMsg): MsgAddAssetResponse {
    return MsgAddAssetResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddAssetResponseProtoMsg, useInterfaces: boolean = false): MsgAddAssetResponse {
    return MsgAddAssetResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAddAssetResponse): Uint8Array {
    return MsgAddAssetResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAddAssetResponse): MsgAddAssetResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgAddAssetResponse",
      value: MsgAddAssetResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateAsset(): MsgUpdateAsset {
  return {
    creator: "",
    assetParams: UpdateAssetParams.fromPartial({})
  };
}
export const MsgUpdateAsset = {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateAsset",
  encode(message: MsgUpdateAsset, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.assetParams !== undefined) {
      UpdateAssetParams.encode(message.assetParams, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateAsset {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.assetParams = UpdateAssetParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateAsset>): MsgUpdateAsset {
    const message = createBaseMsgUpdateAsset();
    message.creator = object.creator ?? "";
    message.assetParams = object.assetParams !== undefined && object.assetParams !== null ? UpdateAssetParams.fromPartial(object.assetParams) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateAssetAmino): MsgUpdateAsset {
    const message = createBaseMsgUpdateAsset();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.asset_params !== undefined && object.asset_params !== null) {
      message.assetParams = UpdateAssetParams.fromAmino(object.asset_params);
    }
    return message;
  },
  toAmino(message: MsgUpdateAsset, useInterfaces: boolean = false): MsgUpdateAssetAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.asset_params = message.assetParams ? UpdateAssetParams.toAmino(message.assetParams, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateAssetAminoMsg): MsgUpdateAsset {
    return MsgUpdateAsset.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateAsset, useInterfaces: boolean = false): MsgUpdateAssetAminoMsg {
    return {
      type: "cdp/UpdateAsset",
      value: MsgUpdateAsset.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateAssetProtoMsg, useInterfaces: boolean = false): MsgUpdateAsset {
    return MsgUpdateAsset.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateAsset): Uint8Array {
    return MsgUpdateAsset.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateAsset): MsgUpdateAssetProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgUpdateAsset",
      value: MsgUpdateAsset.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateAssetResponse(): MsgUpdateAssetResponse {
  return {
    assetParams: AssetParams.fromPartial({})
  };
}
export const MsgUpdateAssetResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateAssetResponse",
  encode(message: MsgUpdateAssetResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetParams !== undefined) {
      AssetParams.encode(message.assetParams, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateAssetResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateAssetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetParams = AssetParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateAssetResponse>): MsgUpdateAssetResponse {
    const message = createBaseMsgUpdateAssetResponse();
    message.assetParams = object.assetParams !== undefined && object.assetParams !== null ? AssetParams.fromPartial(object.assetParams) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateAssetResponseAmino): MsgUpdateAssetResponse {
    const message = createBaseMsgUpdateAssetResponse();
    if (object.asset_params !== undefined && object.asset_params !== null) {
      message.assetParams = AssetParams.fromAmino(object.asset_params);
    }
    return message;
  },
  toAmino(message: MsgUpdateAssetResponse, useInterfaces: boolean = false): MsgUpdateAssetResponseAmino {
    const obj: any = {};
    obj.asset_params = message.assetParams ? AssetParams.toAmino(message.assetParams, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateAssetResponseAminoMsg): MsgUpdateAssetResponse {
    return MsgUpdateAssetResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateAssetResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateAssetResponse {
    return MsgUpdateAssetResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateAssetResponse): Uint8Array {
    return MsgUpdateAssetResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateAssetResponse): MsgUpdateAssetResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgUpdateAssetResponse",
      value: MsgUpdateAssetResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSupplyAsset(): MsgSupplyAsset {
  return {
    creator: "",
    denom: "",
    amount: ""
  };
}
export const MsgSupplyAsset = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSupplyAsset",
  encode(message: MsgSupplyAsset, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSupplyAsset {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSupplyAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSupplyAsset>): MsgSupplyAsset {
    const message = createBaseMsgSupplyAsset();
    message.creator = object.creator ?? "";
    message.denom = object.denom ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: MsgSupplyAssetAmino): MsgSupplyAsset {
    const message = createBaseMsgSupplyAsset();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: MsgSupplyAsset, useInterfaces: boolean = false): MsgSupplyAssetAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: MsgSupplyAssetAminoMsg): MsgSupplyAsset {
    return MsgSupplyAsset.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSupplyAsset, useInterfaces: boolean = false): MsgSupplyAssetAminoMsg {
    return {
      type: "cdp/SupplyAsset",
      value: MsgSupplyAsset.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSupplyAssetProtoMsg, useInterfaces: boolean = false): MsgSupplyAsset {
    return MsgSupplyAsset.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSupplyAsset): Uint8Array {
    return MsgSupplyAsset.encode(message).finish();
  },
  toProtoMsg(message: MsgSupplyAsset): MsgSupplyAssetProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSupplyAsset",
      value: MsgSupplyAsset.encode(message).finish()
    };
  }
};
function createBaseMsgSupplyAssetResponse(): MsgSupplyAssetResponse {
  return {};
}
export const MsgSupplyAssetResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSupplyAssetResponse",
  encode(_: MsgSupplyAssetResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSupplyAssetResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSupplyAssetResponse();
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
  fromPartial(_: Partial<MsgSupplyAssetResponse>): MsgSupplyAssetResponse {
    const message = createBaseMsgSupplyAssetResponse();
    return message;
  },
  fromAmino(_: MsgSupplyAssetResponseAmino): MsgSupplyAssetResponse {
    const message = createBaseMsgSupplyAssetResponse();
    return message;
  },
  toAmino(_: MsgSupplyAssetResponse, useInterfaces: boolean = false): MsgSupplyAssetResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSupplyAssetResponseAminoMsg): MsgSupplyAssetResponse {
    return MsgSupplyAssetResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSupplyAssetResponseProtoMsg, useInterfaces: boolean = false): MsgSupplyAssetResponse {
    return MsgSupplyAssetResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSupplyAssetResponse): Uint8Array {
    return MsgSupplyAssetResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSupplyAssetResponse): MsgSupplyAssetResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSupplyAssetResponse",
      value: MsgSupplyAssetResponse.encode(message).finish()
    };
  }
};
function createBaseMsgWithdrawAsset(): MsgWithdrawAsset {
  return {
    creator: "",
    cibtDenom: "",
    amount: ""
  };
}
export const MsgWithdrawAsset = {
  typeUrl: "/Switcheo.carbon.cdp.MsgWithdrawAsset",
  encode(message: MsgWithdrawAsset, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.cibtDenom !== "") {
      writer.uint32(18).string(message.cibtDenom);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgWithdrawAsset {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.cibtDenom = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgWithdrawAsset>): MsgWithdrawAsset {
    const message = createBaseMsgWithdrawAsset();
    message.creator = object.creator ?? "";
    message.cibtDenom = object.cibtDenom ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: MsgWithdrawAssetAmino): MsgWithdrawAsset {
    const message = createBaseMsgWithdrawAsset();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.cibt_denom !== undefined && object.cibt_denom !== null) {
      message.cibtDenom = object.cibt_denom;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: MsgWithdrawAsset, useInterfaces: boolean = false): MsgWithdrawAssetAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.cibt_denom = message.cibtDenom === "" ? undefined : message.cibtDenom;
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: MsgWithdrawAssetAminoMsg): MsgWithdrawAsset {
    return MsgWithdrawAsset.fromAmino(object.value);
  },
  toAminoMsg(message: MsgWithdrawAsset, useInterfaces: boolean = false): MsgWithdrawAssetAminoMsg {
    return {
      type: "cdp/WithdrawAsset",
      value: MsgWithdrawAsset.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgWithdrawAssetProtoMsg, useInterfaces: boolean = false): MsgWithdrawAsset {
    return MsgWithdrawAsset.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgWithdrawAsset): Uint8Array {
    return MsgWithdrawAsset.encode(message).finish();
  },
  toProtoMsg(message: MsgWithdrawAsset): MsgWithdrawAssetProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgWithdrawAsset",
      value: MsgWithdrawAsset.encode(message).finish()
    };
  }
};
function createBaseMsgWithdrawAssetResponse(): MsgWithdrawAssetResponse {
  return {};
}
export const MsgWithdrawAssetResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgWithdrawAssetResponse",
  encode(_: MsgWithdrawAssetResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgWithdrawAssetResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawAssetResponse();
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
  fromPartial(_: Partial<MsgWithdrawAssetResponse>): MsgWithdrawAssetResponse {
    const message = createBaseMsgWithdrawAssetResponse();
    return message;
  },
  fromAmino(_: MsgWithdrawAssetResponseAmino): MsgWithdrawAssetResponse {
    const message = createBaseMsgWithdrawAssetResponse();
    return message;
  },
  toAmino(_: MsgWithdrawAssetResponse, useInterfaces: boolean = false): MsgWithdrawAssetResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgWithdrawAssetResponseAminoMsg): MsgWithdrawAssetResponse {
    return MsgWithdrawAssetResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgWithdrawAssetResponseProtoMsg, useInterfaces: boolean = false): MsgWithdrawAssetResponse {
    return MsgWithdrawAssetResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgWithdrawAssetResponse): Uint8Array {
    return MsgWithdrawAssetResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgWithdrawAssetResponse): MsgWithdrawAssetResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgWithdrawAssetResponse",
      value: MsgWithdrawAssetResponse.encode(message).finish()
    };
  }
};
function createBaseMsgLockCollateral(): MsgLockCollateral {
  return {
    creator: "",
    cibtDenom: "",
    amount: ""
  };
}
export const MsgLockCollateral = {
  typeUrl: "/Switcheo.carbon.cdp.MsgLockCollateral",
  encode(message: MsgLockCollateral, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.cibtDenom !== "") {
      writer.uint32(18).string(message.cibtDenom);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLockCollateral {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLockCollateral();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.cibtDenom = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgLockCollateral>): MsgLockCollateral {
    const message = createBaseMsgLockCollateral();
    message.creator = object.creator ?? "";
    message.cibtDenom = object.cibtDenom ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: MsgLockCollateralAmino): MsgLockCollateral {
    const message = createBaseMsgLockCollateral();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.cibt_denom !== undefined && object.cibt_denom !== null) {
      message.cibtDenom = object.cibt_denom;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: MsgLockCollateral, useInterfaces: boolean = false): MsgLockCollateralAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.cibt_denom = message.cibtDenom === "" ? undefined : message.cibtDenom;
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: MsgLockCollateralAminoMsg): MsgLockCollateral {
    return MsgLockCollateral.fromAmino(object.value);
  },
  toAminoMsg(message: MsgLockCollateral, useInterfaces: boolean = false): MsgLockCollateralAminoMsg {
    return {
      type: "cdp/LockCollateral",
      value: MsgLockCollateral.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgLockCollateralProtoMsg, useInterfaces: boolean = false): MsgLockCollateral {
    return MsgLockCollateral.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLockCollateral): Uint8Array {
    return MsgLockCollateral.encode(message).finish();
  },
  toProtoMsg(message: MsgLockCollateral): MsgLockCollateralProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgLockCollateral",
      value: MsgLockCollateral.encode(message).finish()
    };
  }
};
function createBaseMsgLockCollateralResponse(): MsgLockCollateralResponse {
  return {};
}
export const MsgLockCollateralResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgLockCollateralResponse",
  encode(_: MsgLockCollateralResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLockCollateralResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLockCollateralResponse();
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
  fromPartial(_: Partial<MsgLockCollateralResponse>): MsgLockCollateralResponse {
    const message = createBaseMsgLockCollateralResponse();
    return message;
  },
  fromAmino(_: MsgLockCollateralResponseAmino): MsgLockCollateralResponse {
    const message = createBaseMsgLockCollateralResponse();
    return message;
  },
  toAmino(_: MsgLockCollateralResponse, useInterfaces: boolean = false): MsgLockCollateralResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgLockCollateralResponseAminoMsg): MsgLockCollateralResponse {
    return MsgLockCollateralResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgLockCollateralResponseProtoMsg, useInterfaces: boolean = false): MsgLockCollateralResponse {
    return MsgLockCollateralResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLockCollateralResponse): Uint8Array {
    return MsgLockCollateralResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgLockCollateralResponse): MsgLockCollateralResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgLockCollateralResponse",
      value: MsgLockCollateralResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUnlockCollateral(): MsgUnlockCollateral {
  return {
    creator: "",
    cibtDenom: "",
    amount: ""
  };
}
export const MsgUnlockCollateral = {
  typeUrl: "/Switcheo.carbon.cdp.MsgUnlockCollateral",
  encode(message: MsgUnlockCollateral, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.cibtDenom !== "") {
      writer.uint32(18).string(message.cibtDenom);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUnlockCollateral {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnlockCollateral();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.cibtDenom = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUnlockCollateral>): MsgUnlockCollateral {
    const message = createBaseMsgUnlockCollateral();
    message.creator = object.creator ?? "";
    message.cibtDenom = object.cibtDenom ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: MsgUnlockCollateralAmino): MsgUnlockCollateral {
    const message = createBaseMsgUnlockCollateral();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.cibt_denom !== undefined && object.cibt_denom !== null) {
      message.cibtDenom = object.cibt_denom;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: MsgUnlockCollateral, useInterfaces: boolean = false): MsgUnlockCollateralAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.cibt_denom = message.cibtDenom === "" ? undefined : message.cibtDenom;
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: MsgUnlockCollateralAminoMsg): MsgUnlockCollateral {
    return MsgUnlockCollateral.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUnlockCollateral, useInterfaces: boolean = false): MsgUnlockCollateralAminoMsg {
    return {
      type: "cdp/UnlockCollateral",
      value: MsgUnlockCollateral.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUnlockCollateralProtoMsg, useInterfaces: boolean = false): MsgUnlockCollateral {
    return MsgUnlockCollateral.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUnlockCollateral): Uint8Array {
    return MsgUnlockCollateral.encode(message).finish();
  },
  toProtoMsg(message: MsgUnlockCollateral): MsgUnlockCollateralProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgUnlockCollateral",
      value: MsgUnlockCollateral.encode(message).finish()
    };
  }
};
function createBaseMsgUnlockCollateralResponse(): MsgUnlockCollateralResponse {
  return {};
}
export const MsgUnlockCollateralResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgUnlockCollateralResponse",
  encode(_: MsgUnlockCollateralResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUnlockCollateralResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnlockCollateralResponse();
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
  fromPartial(_: Partial<MsgUnlockCollateralResponse>): MsgUnlockCollateralResponse {
    const message = createBaseMsgUnlockCollateralResponse();
    return message;
  },
  fromAmino(_: MsgUnlockCollateralResponseAmino): MsgUnlockCollateralResponse {
    const message = createBaseMsgUnlockCollateralResponse();
    return message;
  },
  toAmino(_: MsgUnlockCollateralResponse, useInterfaces: boolean = false): MsgUnlockCollateralResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUnlockCollateralResponseAminoMsg): MsgUnlockCollateralResponse {
    return MsgUnlockCollateralResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUnlockCollateralResponseProtoMsg, useInterfaces: boolean = false): MsgUnlockCollateralResponse {
    return MsgUnlockCollateralResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUnlockCollateralResponse): Uint8Array {
    return MsgUnlockCollateralResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUnlockCollateralResponse): MsgUnlockCollateralResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgUnlockCollateralResponse",
      value: MsgUnlockCollateralResponse.encode(message).finish()
    };
  }
};
function createBaseMsgBorrowAsset(): MsgBorrowAsset {
  return {
    creator: "",
    denom: "",
    amount: ""
  };
}
export const MsgBorrowAsset = {
  typeUrl: "/Switcheo.carbon.cdp.MsgBorrowAsset",
  encode(message: MsgBorrowAsset, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgBorrowAsset {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBorrowAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgBorrowAsset>): MsgBorrowAsset {
    const message = createBaseMsgBorrowAsset();
    message.creator = object.creator ?? "";
    message.denom = object.denom ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: MsgBorrowAssetAmino): MsgBorrowAsset {
    const message = createBaseMsgBorrowAsset();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: MsgBorrowAsset, useInterfaces: boolean = false): MsgBorrowAssetAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: MsgBorrowAssetAminoMsg): MsgBorrowAsset {
    return MsgBorrowAsset.fromAmino(object.value);
  },
  toAminoMsg(message: MsgBorrowAsset, useInterfaces: boolean = false): MsgBorrowAssetAminoMsg {
    return {
      type: "cdp/BorrowAsset",
      value: MsgBorrowAsset.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgBorrowAssetProtoMsg, useInterfaces: boolean = false): MsgBorrowAsset {
    return MsgBorrowAsset.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgBorrowAsset): Uint8Array {
    return MsgBorrowAsset.encode(message).finish();
  },
  toProtoMsg(message: MsgBorrowAsset): MsgBorrowAssetProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgBorrowAsset",
      value: MsgBorrowAsset.encode(message).finish()
    };
  }
};
function createBaseMsgBorrowAssetResponse(): MsgBorrowAssetResponse {
  return {};
}
export const MsgBorrowAssetResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgBorrowAssetResponse",
  encode(_: MsgBorrowAssetResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgBorrowAssetResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBorrowAssetResponse();
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
  fromPartial(_: Partial<MsgBorrowAssetResponse>): MsgBorrowAssetResponse {
    const message = createBaseMsgBorrowAssetResponse();
    return message;
  },
  fromAmino(_: MsgBorrowAssetResponseAmino): MsgBorrowAssetResponse {
    const message = createBaseMsgBorrowAssetResponse();
    return message;
  },
  toAmino(_: MsgBorrowAssetResponse, useInterfaces: boolean = false): MsgBorrowAssetResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgBorrowAssetResponseAminoMsg): MsgBorrowAssetResponse {
    return MsgBorrowAssetResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgBorrowAssetResponseProtoMsg, useInterfaces: boolean = false): MsgBorrowAssetResponse {
    return MsgBorrowAssetResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgBorrowAssetResponse): Uint8Array {
    return MsgBorrowAssetResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgBorrowAssetResponse): MsgBorrowAssetResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgBorrowAssetResponse",
      value: MsgBorrowAssetResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRepayAsset(): MsgRepayAsset {
  return {
    creator: "",
    denom: "",
    amount: "",
    debtor: "",
    fromCollateral: false
  };
}
export const MsgRepayAsset = {
  typeUrl: "/Switcheo.carbon.cdp.MsgRepayAsset",
  encode(message: MsgRepayAsset, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    if (message.debtor !== "") {
      writer.uint32(34).string(message.debtor);
    }
    if (message.fromCollateral === true) {
      writer.uint32(40).bool(message.fromCollateral);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRepayAsset {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRepayAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        case 4:
          message.debtor = reader.string();
          break;
        case 5:
          message.fromCollateral = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRepayAsset>): MsgRepayAsset {
    const message = createBaseMsgRepayAsset();
    message.creator = object.creator ?? "";
    message.denom = object.denom ?? "";
    message.amount = object.amount ?? "";
    message.debtor = object.debtor ?? "";
    message.fromCollateral = object.fromCollateral ?? false;
    return message;
  },
  fromAmino(object: MsgRepayAssetAmino): MsgRepayAsset {
    const message = createBaseMsgRepayAsset();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.debtor !== undefined && object.debtor !== null) {
      message.debtor = object.debtor;
    }
    if (object.from_collateral !== undefined && object.from_collateral !== null) {
      message.fromCollateral = object.from_collateral;
    }
    return message;
  },
  toAmino(message: MsgRepayAsset, useInterfaces: boolean = false): MsgRepayAssetAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.amount = message.amount === "" ? undefined : message.amount;
    obj.debtor = message.debtor === "" ? undefined : message.debtor;
    obj.from_collateral = message.fromCollateral === false ? undefined : message.fromCollateral;
    return obj;
  },
  fromAminoMsg(object: MsgRepayAssetAminoMsg): MsgRepayAsset {
    return MsgRepayAsset.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRepayAsset, useInterfaces: boolean = false): MsgRepayAssetAminoMsg {
    return {
      type: "cdp/RepayAsset",
      value: MsgRepayAsset.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRepayAssetProtoMsg, useInterfaces: boolean = false): MsgRepayAsset {
    return MsgRepayAsset.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRepayAsset): Uint8Array {
    return MsgRepayAsset.encode(message).finish();
  },
  toProtoMsg(message: MsgRepayAsset): MsgRepayAssetProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgRepayAsset",
      value: MsgRepayAsset.encode(message).finish()
    };
  }
};
function createBaseMsgRepayAssetResponse(): MsgRepayAssetResponse {
  return {};
}
export const MsgRepayAssetResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgRepayAssetResponse",
  encode(_: MsgRepayAssetResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRepayAssetResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRepayAssetResponse();
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
  fromPartial(_: Partial<MsgRepayAssetResponse>): MsgRepayAssetResponse {
    const message = createBaseMsgRepayAssetResponse();
    return message;
  },
  fromAmino(_: MsgRepayAssetResponseAmino): MsgRepayAssetResponse {
    const message = createBaseMsgRepayAssetResponse();
    return message;
  },
  toAmino(_: MsgRepayAssetResponse, useInterfaces: boolean = false): MsgRepayAssetResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRepayAssetResponseAminoMsg): MsgRepayAssetResponse {
    return MsgRepayAssetResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRepayAssetResponseProtoMsg, useInterfaces: boolean = false): MsgRepayAssetResponse {
    return MsgRepayAssetResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRepayAssetResponse): Uint8Array {
    return MsgRepayAssetResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRepayAssetResponse): MsgRepayAssetResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgRepayAssetResponse",
      value: MsgRepayAssetResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSupplyAssetAndLockCollateral(): MsgSupplyAssetAndLockCollateral {
  return {
    creator: "",
    denom: "",
    supplyAmount: "",
    lockAmount: ""
  };
}
export const MsgSupplyAssetAndLockCollateral = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSupplyAssetAndLockCollateral",
  encode(message: MsgSupplyAssetAndLockCollateral, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.supplyAmount !== "") {
      writer.uint32(26).string(message.supplyAmount);
    }
    if (message.lockAmount !== "") {
      writer.uint32(34).string(message.lockAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSupplyAssetAndLockCollateral {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSupplyAssetAndLockCollateral();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.supplyAmount = reader.string();
          break;
        case 4:
          message.lockAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSupplyAssetAndLockCollateral>): MsgSupplyAssetAndLockCollateral {
    const message = createBaseMsgSupplyAssetAndLockCollateral();
    message.creator = object.creator ?? "";
    message.denom = object.denom ?? "";
    message.supplyAmount = object.supplyAmount ?? "";
    message.lockAmount = object.lockAmount ?? "";
    return message;
  },
  fromAmino(object: MsgSupplyAssetAndLockCollateralAmino): MsgSupplyAssetAndLockCollateral {
    const message = createBaseMsgSupplyAssetAndLockCollateral();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.supply_amount !== undefined && object.supply_amount !== null) {
      message.supplyAmount = object.supply_amount;
    }
    if (object.lock_amount !== undefined && object.lock_amount !== null) {
      message.lockAmount = object.lock_amount;
    }
    return message;
  },
  toAmino(message: MsgSupplyAssetAndLockCollateral, useInterfaces: boolean = false): MsgSupplyAssetAndLockCollateralAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.supply_amount = message.supplyAmount === "" ? undefined : message.supplyAmount;
    obj.lock_amount = message.lockAmount === "" ? undefined : message.lockAmount;
    return obj;
  },
  fromAminoMsg(object: MsgSupplyAssetAndLockCollateralAminoMsg): MsgSupplyAssetAndLockCollateral {
    return MsgSupplyAssetAndLockCollateral.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSupplyAssetAndLockCollateral, useInterfaces: boolean = false): MsgSupplyAssetAndLockCollateralAminoMsg {
    return {
      type: "cdp/SupplyAssetAndLockCollateral",
      value: MsgSupplyAssetAndLockCollateral.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSupplyAssetAndLockCollateralProtoMsg, useInterfaces: boolean = false): MsgSupplyAssetAndLockCollateral {
    return MsgSupplyAssetAndLockCollateral.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSupplyAssetAndLockCollateral): Uint8Array {
    return MsgSupplyAssetAndLockCollateral.encode(message).finish();
  },
  toProtoMsg(message: MsgSupplyAssetAndLockCollateral): MsgSupplyAssetAndLockCollateralProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSupplyAssetAndLockCollateral",
      value: MsgSupplyAssetAndLockCollateral.encode(message).finish()
    };
  }
};
function createBaseMsgSupplyAssetAndLockCollateralResponse(): MsgSupplyAssetAndLockCollateralResponse {
  return {};
}
export const MsgSupplyAssetAndLockCollateralResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSupplyAssetAndLockCollateralResponse",
  encode(_: MsgSupplyAssetAndLockCollateralResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSupplyAssetAndLockCollateralResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSupplyAssetAndLockCollateralResponse();
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
  fromPartial(_: Partial<MsgSupplyAssetAndLockCollateralResponse>): MsgSupplyAssetAndLockCollateralResponse {
    const message = createBaseMsgSupplyAssetAndLockCollateralResponse();
    return message;
  },
  fromAmino(_: MsgSupplyAssetAndLockCollateralResponseAmino): MsgSupplyAssetAndLockCollateralResponse {
    const message = createBaseMsgSupplyAssetAndLockCollateralResponse();
    return message;
  },
  toAmino(_: MsgSupplyAssetAndLockCollateralResponse, useInterfaces: boolean = false): MsgSupplyAssetAndLockCollateralResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSupplyAssetAndLockCollateralResponseAminoMsg): MsgSupplyAssetAndLockCollateralResponse {
    return MsgSupplyAssetAndLockCollateralResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSupplyAssetAndLockCollateralResponseProtoMsg, useInterfaces: boolean = false): MsgSupplyAssetAndLockCollateralResponse {
    return MsgSupplyAssetAndLockCollateralResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSupplyAssetAndLockCollateralResponse): Uint8Array {
    return MsgSupplyAssetAndLockCollateralResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSupplyAssetAndLockCollateralResponse): MsgSupplyAssetAndLockCollateralResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSupplyAssetAndLockCollateralResponse",
      value: MsgSupplyAssetAndLockCollateralResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUnlockCollateralAndWithdrawAsset(): MsgUnlockCollateralAndWithdrawAsset {
  return {
    creator: "",
    cibtDenom: "",
    unlockAmount: "",
    withdrawAmount: ""
  };
}
export const MsgUnlockCollateralAndWithdrawAsset = {
  typeUrl: "/Switcheo.carbon.cdp.MsgUnlockCollateralAndWithdrawAsset",
  encode(message: MsgUnlockCollateralAndWithdrawAsset, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.cibtDenom !== "") {
      writer.uint32(18).string(message.cibtDenom);
    }
    if (message.unlockAmount !== "") {
      writer.uint32(26).string(message.unlockAmount);
    }
    if (message.withdrawAmount !== "") {
      writer.uint32(34).string(message.withdrawAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUnlockCollateralAndWithdrawAsset {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnlockCollateralAndWithdrawAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.cibtDenom = reader.string();
          break;
        case 3:
          message.unlockAmount = reader.string();
          break;
        case 4:
          message.withdrawAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUnlockCollateralAndWithdrawAsset>): MsgUnlockCollateralAndWithdrawAsset {
    const message = createBaseMsgUnlockCollateralAndWithdrawAsset();
    message.creator = object.creator ?? "";
    message.cibtDenom = object.cibtDenom ?? "";
    message.unlockAmount = object.unlockAmount ?? "";
    message.withdrawAmount = object.withdrawAmount ?? "";
    return message;
  },
  fromAmino(object: MsgUnlockCollateralAndWithdrawAssetAmino): MsgUnlockCollateralAndWithdrawAsset {
    const message = createBaseMsgUnlockCollateralAndWithdrawAsset();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.cibt_denom !== undefined && object.cibt_denom !== null) {
      message.cibtDenom = object.cibt_denom;
    }
    if (object.unlock_amount !== undefined && object.unlock_amount !== null) {
      message.unlockAmount = object.unlock_amount;
    }
    if (object.withdraw_amount !== undefined && object.withdraw_amount !== null) {
      message.withdrawAmount = object.withdraw_amount;
    }
    return message;
  },
  toAmino(message: MsgUnlockCollateralAndWithdrawAsset, useInterfaces: boolean = false): MsgUnlockCollateralAndWithdrawAssetAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.cibt_denom = message.cibtDenom === "" ? undefined : message.cibtDenom;
    obj.unlock_amount = message.unlockAmount === "" ? undefined : message.unlockAmount;
    obj.withdraw_amount = message.withdrawAmount === "" ? undefined : message.withdrawAmount;
    return obj;
  },
  fromAminoMsg(object: MsgUnlockCollateralAndWithdrawAssetAminoMsg): MsgUnlockCollateralAndWithdrawAsset {
    return MsgUnlockCollateralAndWithdrawAsset.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUnlockCollateralAndWithdrawAsset, useInterfaces: boolean = false): MsgUnlockCollateralAndWithdrawAssetAminoMsg {
    return {
      type: "cdp/UnlockCollateralAndWithdrawAsset",
      value: MsgUnlockCollateralAndWithdrawAsset.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUnlockCollateralAndWithdrawAssetProtoMsg, useInterfaces: boolean = false): MsgUnlockCollateralAndWithdrawAsset {
    return MsgUnlockCollateralAndWithdrawAsset.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUnlockCollateralAndWithdrawAsset): Uint8Array {
    return MsgUnlockCollateralAndWithdrawAsset.encode(message).finish();
  },
  toProtoMsg(message: MsgUnlockCollateralAndWithdrawAsset): MsgUnlockCollateralAndWithdrawAssetProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgUnlockCollateralAndWithdrawAsset",
      value: MsgUnlockCollateralAndWithdrawAsset.encode(message).finish()
    };
  }
};
function createBaseMsgUnlockCollateralAndWithdrawAssetResponse(): MsgUnlockCollateralAndWithdrawAssetResponse {
  return {};
}
export const MsgUnlockCollateralAndWithdrawAssetResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgUnlockCollateralAndWithdrawAssetResponse",
  encode(_: MsgUnlockCollateralAndWithdrawAssetResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUnlockCollateralAndWithdrawAssetResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnlockCollateralAndWithdrawAssetResponse();
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
  fromPartial(_: Partial<MsgUnlockCollateralAndWithdrawAssetResponse>): MsgUnlockCollateralAndWithdrawAssetResponse {
    const message = createBaseMsgUnlockCollateralAndWithdrawAssetResponse();
    return message;
  },
  fromAmino(_: MsgUnlockCollateralAndWithdrawAssetResponseAmino): MsgUnlockCollateralAndWithdrawAssetResponse {
    const message = createBaseMsgUnlockCollateralAndWithdrawAssetResponse();
    return message;
  },
  toAmino(_: MsgUnlockCollateralAndWithdrawAssetResponse, useInterfaces: boolean = false): MsgUnlockCollateralAndWithdrawAssetResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUnlockCollateralAndWithdrawAssetResponseAminoMsg): MsgUnlockCollateralAndWithdrawAssetResponse {
    return MsgUnlockCollateralAndWithdrawAssetResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUnlockCollateralAndWithdrawAssetResponseProtoMsg, useInterfaces: boolean = false): MsgUnlockCollateralAndWithdrawAssetResponse {
    return MsgUnlockCollateralAndWithdrawAssetResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUnlockCollateralAndWithdrawAssetResponse): Uint8Array {
    return MsgUnlockCollateralAndWithdrawAssetResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUnlockCollateralAndWithdrawAssetResponse): MsgUnlockCollateralAndWithdrawAssetResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgUnlockCollateralAndWithdrawAssetResponse",
      value: MsgUnlockCollateralAndWithdrawAssetResponse.encode(message).finish()
    };
  }
};
function createBaseMsgLiquidateCollateral(): MsgLiquidateCollateral {
  return {
    creator: "",
    debtor: "",
    minCollateral: Coin.fromPartial({}),
    debt: Coin.fromPartial({}),
    stableInterest: undefined,
    debtFromCollateral: false,
    interestFromCollateral: false
  };
}
export const MsgLiquidateCollateral = {
  typeUrl: "/Switcheo.carbon.cdp.MsgLiquidateCollateral",
  encode(message: MsgLiquidateCollateral, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.debtor !== "") {
      writer.uint32(18).string(message.debtor);
    }
    if (message.minCollateral !== undefined) {
      Coin.encode(message.minCollateral, writer.uint32(26).fork()).ldelim();
    }
    if (message.debt !== undefined) {
      Coin.encode(message.debt, writer.uint32(34).fork()).ldelim();
    }
    if (message.stableInterest !== undefined) {
      Coin.encode(message.stableInterest, writer.uint32(42).fork()).ldelim();
    }
    if (message.debtFromCollateral === true) {
      writer.uint32(48).bool(message.debtFromCollateral);
    }
    if (message.interestFromCollateral === true) {
      writer.uint32(56).bool(message.interestFromCollateral);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLiquidateCollateral {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLiquidateCollateral();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.debtor = reader.string();
          break;
        case 3:
          message.minCollateral = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.debt = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.stableInterest = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.debtFromCollateral = reader.bool();
          break;
        case 7:
          message.interestFromCollateral = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgLiquidateCollateral>): MsgLiquidateCollateral {
    const message = createBaseMsgLiquidateCollateral();
    message.creator = object.creator ?? "";
    message.debtor = object.debtor ?? "";
    message.minCollateral = object.minCollateral !== undefined && object.minCollateral !== null ? Coin.fromPartial(object.minCollateral) : undefined;
    message.debt = object.debt !== undefined && object.debt !== null ? Coin.fromPartial(object.debt) : undefined;
    message.stableInterest = object.stableInterest !== undefined && object.stableInterest !== null ? Coin.fromPartial(object.stableInterest) : undefined;
    message.debtFromCollateral = object.debtFromCollateral ?? false;
    message.interestFromCollateral = object.interestFromCollateral ?? false;
    return message;
  },
  fromAmino(object: MsgLiquidateCollateralAmino): MsgLiquidateCollateral {
    const message = createBaseMsgLiquidateCollateral();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.debtor !== undefined && object.debtor !== null) {
      message.debtor = object.debtor;
    }
    if (object.min_collateral !== undefined && object.min_collateral !== null) {
      message.minCollateral = Coin.fromAmino(object.min_collateral);
    }
    if (object.debt !== undefined && object.debt !== null) {
      message.debt = Coin.fromAmino(object.debt);
    }
    if (object.stable_interest !== undefined && object.stable_interest !== null) {
      message.stableInterest = Coin.fromAmino(object.stable_interest);
    }
    if (object.debt_from_collateral !== undefined && object.debt_from_collateral !== null) {
      message.debtFromCollateral = object.debt_from_collateral;
    }
    if (object.interest_from_collateral !== undefined && object.interest_from_collateral !== null) {
      message.interestFromCollateral = object.interest_from_collateral;
    }
    return message;
  },
  toAmino(message: MsgLiquidateCollateral, useInterfaces: boolean = false): MsgLiquidateCollateralAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.debtor = message.debtor === "" ? undefined : message.debtor;
    obj.min_collateral = message.minCollateral ? Coin.toAmino(message.minCollateral, useInterfaces) : undefined;
    obj.debt = message.debt ? Coin.toAmino(message.debt, useInterfaces) : undefined;
    obj.stable_interest = message.stableInterest ? Coin.toAmino(message.stableInterest, useInterfaces) : undefined;
    obj.debt_from_collateral = message.debtFromCollateral === false ? undefined : message.debtFromCollateral;
    obj.interest_from_collateral = message.interestFromCollateral === false ? undefined : message.interestFromCollateral;
    return obj;
  },
  fromAminoMsg(object: MsgLiquidateCollateralAminoMsg): MsgLiquidateCollateral {
    return MsgLiquidateCollateral.fromAmino(object.value);
  },
  toAminoMsg(message: MsgLiquidateCollateral, useInterfaces: boolean = false): MsgLiquidateCollateralAminoMsg {
    return {
      type: "cdp/LiquidateCollateral",
      value: MsgLiquidateCollateral.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgLiquidateCollateralProtoMsg, useInterfaces: boolean = false): MsgLiquidateCollateral {
    return MsgLiquidateCollateral.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLiquidateCollateral): Uint8Array {
    return MsgLiquidateCollateral.encode(message).finish();
  },
  toProtoMsg(message: MsgLiquidateCollateral): MsgLiquidateCollateralProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgLiquidateCollateral",
      value: MsgLiquidateCollateral.encode(message).finish()
    };
  }
};
function createBaseMsgLiquidateCollateralResponse(): MsgLiquidateCollateralResponse {
  return {};
}
export const MsgLiquidateCollateralResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgLiquidateCollateralResponse",
  encode(_: MsgLiquidateCollateralResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLiquidateCollateralResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLiquidateCollateralResponse();
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
  fromPartial(_: Partial<MsgLiquidateCollateralResponse>): MsgLiquidateCollateralResponse {
    const message = createBaseMsgLiquidateCollateralResponse();
    return message;
  },
  fromAmino(_: MsgLiquidateCollateralResponseAmino): MsgLiquidateCollateralResponse {
    const message = createBaseMsgLiquidateCollateralResponse();
    return message;
  },
  toAmino(_: MsgLiquidateCollateralResponse, useInterfaces: boolean = false): MsgLiquidateCollateralResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgLiquidateCollateralResponseAminoMsg): MsgLiquidateCollateralResponse {
    return MsgLiquidateCollateralResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgLiquidateCollateralResponseProtoMsg, useInterfaces: boolean = false): MsgLiquidateCollateralResponse {
    return MsgLiquidateCollateralResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLiquidateCollateralResponse): Uint8Array {
    return MsgLiquidateCollateralResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgLiquidateCollateralResponse): MsgLiquidateCollateralResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgLiquidateCollateralResponse",
      value: MsgLiquidateCollateralResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetLiquidationFee(): MsgSetLiquidationFee {
  return {
    creator: "",
    liquidationFee: ""
  };
}
export const MsgSetLiquidationFee = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetLiquidationFee",
  encode(message: MsgSetLiquidationFee, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.liquidationFee !== "") {
      writer.uint32(18).string(message.liquidationFee);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetLiquidationFee {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetLiquidationFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.liquidationFee = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetLiquidationFee>): MsgSetLiquidationFee {
    const message = createBaseMsgSetLiquidationFee();
    message.creator = object.creator ?? "";
    message.liquidationFee = object.liquidationFee ?? "";
    return message;
  },
  fromAmino(object: MsgSetLiquidationFeeAmino): MsgSetLiquidationFee {
    const message = createBaseMsgSetLiquidationFee();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.liquidation_fee !== undefined && object.liquidation_fee !== null) {
      message.liquidationFee = object.liquidation_fee;
    }
    return message;
  },
  toAmino(message: MsgSetLiquidationFee, useInterfaces: boolean = false): MsgSetLiquidationFeeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.liquidation_fee = message.liquidationFee === "" ? undefined : message.liquidationFee;
    return obj;
  },
  fromAminoMsg(object: MsgSetLiquidationFeeAminoMsg): MsgSetLiquidationFee {
    return MsgSetLiquidationFee.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSetLiquidationFee, useInterfaces: boolean = false): MsgSetLiquidationFeeAminoMsg {
    return {
      type: "cdp/SetLiquidationFee",
      value: MsgSetLiquidationFee.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSetLiquidationFeeProtoMsg, useInterfaces: boolean = false): MsgSetLiquidationFee {
    return MsgSetLiquidationFee.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetLiquidationFee): Uint8Array {
    return MsgSetLiquidationFee.encode(message).finish();
  },
  toProtoMsg(message: MsgSetLiquidationFee): MsgSetLiquidationFeeProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetLiquidationFee",
      value: MsgSetLiquidationFee.encode(message).finish()
    };
  }
};
function createBaseMsgSetLiquidationFeeResponse(): MsgSetLiquidationFeeResponse {
  return {};
}
export const MsgSetLiquidationFeeResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetLiquidationFeeResponse",
  encode(_: MsgSetLiquidationFeeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetLiquidationFeeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetLiquidationFeeResponse();
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
  fromPartial(_: Partial<MsgSetLiquidationFeeResponse>): MsgSetLiquidationFeeResponse {
    const message = createBaseMsgSetLiquidationFeeResponse();
    return message;
  },
  fromAmino(_: MsgSetLiquidationFeeResponseAmino): MsgSetLiquidationFeeResponse {
    const message = createBaseMsgSetLiquidationFeeResponse();
    return message;
  },
  toAmino(_: MsgSetLiquidationFeeResponse, useInterfaces: boolean = false): MsgSetLiquidationFeeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetLiquidationFeeResponseAminoMsg): MsgSetLiquidationFeeResponse {
    return MsgSetLiquidationFeeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetLiquidationFeeResponseProtoMsg, useInterfaces: boolean = false): MsgSetLiquidationFeeResponse {
    return MsgSetLiquidationFeeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetLiquidationFeeResponse): Uint8Array {
    return MsgSetLiquidationFeeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetLiquidationFeeResponse): MsgSetLiquidationFeeResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetLiquidationFeeResponse",
      value: MsgSetLiquidationFeeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetInterestFee(): MsgSetInterestFee {
  return {
    creator: "",
    interestFee: ""
  };
}
export const MsgSetInterestFee = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetInterestFee",
  encode(message: MsgSetInterestFee, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.interestFee !== "") {
      writer.uint32(18).string(message.interestFee);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetInterestFee {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetInterestFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.interestFee = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetInterestFee>): MsgSetInterestFee {
    const message = createBaseMsgSetInterestFee();
    message.creator = object.creator ?? "";
    message.interestFee = object.interestFee ?? "";
    return message;
  },
  fromAmino(object: MsgSetInterestFeeAmino): MsgSetInterestFee {
    const message = createBaseMsgSetInterestFee();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.interest_fee !== undefined && object.interest_fee !== null) {
      message.interestFee = object.interest_fee;
    }
    return message;
  },
  toAmino(message: MsgSetInterestFee, useInterfaces: boolean = false): MsgSetInterestFeeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.interest_fee = message.interestFee === "" ? undefined : message.interestFee;
    return obj;
  },
  fromAminoMsg(object: MsgSetInterestFeeAminoMsg): MsgSetInterestFee {
    return MsgSetInterestFee.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSetInterestFee, useInterfaces: boolean = false): MsgSetInterestFeeAminoMsg {
    return {
      type: "cdp/SetInterestFee",
      value: MsgSetInterestFee.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSetInterestFeeProtoMsg, useInterfaces: boolean = false): MsgSetInterestFee {
    return MsgSetInterestFee.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetInterestFee): Uint8Array {
    return MsgSetInterestFee.encode(message).finish();
  },
  toProtoMsg(message: MsgSetInterestFee): MsgSetInterestFeeProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetInterestFee",
      value: MsgSetInterestFee.encode(message).finish()
    };
  }
};
function createBaseMsgSetInterestFeeResponse(): MsgSetInterestFeeResponse {
  return {};
}
export const MsgSetInterestFeeResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetInterestFeeResponse",
  encode(_: MsgSetInterestFeeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetInterestFeeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetInterestFeeResponse();
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
  fromPartial(_: Partial<MsgSetInterestFeeResponse>): MsgSetInterestFeeResponse {
    const message = createBaseMsgSetInterestFeeResponse();
    return message;
  },
  fromAmino(_: MsgSetInterestFeeResponseAmino): MsgSetInterestFeeResponse {
    const message = createBaseMsgSetInterestFeeResponse();
    return message;
  },
  toAmino(_: MsgSetInterestFeeResponse, useInterfaces: boolean = false): MsgSetInterestFeeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetInterestFeeResponseAminoMsg): MsgSetInterestFeeResponse {
    return MsgSetInterestFeeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetInterestFeeResponseProtoMsg, useInterfaces: boolean = false): MsgSetInterestFeeResponse {
    return MsgSetInterestFeeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetInterestFeeResponse): Uint8Array {
    return MsgSetInterestFeeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetInterestFeeResponse): MsgSetInterestFeeResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetInterestFeeResponse",
      value: MsgSetInterestFeeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetStablecoinMintCap(): MsgSetStablecoinMintCap {
  return {
    creator: "",
    stablecoinMintCap: ""
  };
}
export const MsgSetStablecoinMintCap = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetStablecoinMintCap",
  encode(message: MsgSetStablecoinMintCap, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.stablecoinMintCap !== "") {
      writer.uint32(18).string(message.stablecoinMintCap);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetStablecoinMintCap {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetStablecoinMintCap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.stablecoinMintCap = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetStablecoinMintCap>): MsgSetStablecoinMintCap {
    const message = createBaseMsgSetStablecoinMintCap();
    message.creator = object.creator ?? "";
    message.stablecoinMintCap = object.stablecoinMintCap ?? "";
    return message;
  },
  fromAmino(object: MsgSetStablecoinMintCapAmino): MsgSetStablecoinMintCap {
    const message = createBaseMsgSetStablecoinMintCap();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.stablecoin_mint_cap !== undefined && object.stablecoin_mint_cap !== null) {
      message.stablecoinMintCap = object.stablecoin_mint_cap;
    }
    return message;
  },
  toAmino(message: MsgSetStablecoinMintCap, useInterfaces: boolean = false): MsgSetStablecoinMintCapAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.stablecoin_mint_cap = message.stablecoinMintCap === "" ? undefined : message.stablecoinMintCap;
    return obj;
  },
  fromAminoMsg(object: MsgSetStablecoinMintCapAminoMsg): MsgSetStablecoinMintCap {
    return MsgSetStablecoinMintCap.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSetStablecoinMintCap, useInterfaces: boolean = false): MsgSetStablecoinMintCapAminoMsg {
    return {
      type: "cdp/SetStablecoinMintCap",
      value: MsgSetStablecoinMintCap.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSetStablecoinMintCapProtoMsg, useInterfaces: boolean = false): MsgSetStablecoinMintCap {
    return MsgSetStablecoinMintCap.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetStablecoinMintCap): Uint8Array {
    return MsgSetStablecoinMintCap.encode(message).finish();
  },
  toProtoMsg(message: MsgSetStablecoinMintCap): MsgSetStablecoinMintCapProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetStablecoinMintCap",
      value: MsgSetStablecoinMintCap.encode(message).finish()
    };
  }
};
function createBaseMsgSetStablecoinMintCapResponse(): MsgSetStablecoinMintCapResponse {
  return {};
}
export const MsgSetStablecoinMintCapResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetStablecoinMintCapResponse",
  encode(_: MsgSetStablecoinMintCapResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetStablecoinMintCapResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetStablecoinMintCapResponse();
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
  fromPartial(_: Partial<MsgSetStablecoinMintCapResponse>): MsgSetStablecoinMintCapResponse {
    const message = createBaseMsgSetStablecoinMintCapResponse();
    return message;
  },
  fromAmino(_: MsgSetStablecoinMintCapResponseAmino): MsgSetStablecoinMintCapResponse {
    const message = createBaseMsgSetStablecoinMintCapResponse();
    return message;
  },
  toAmino(_: MsgSetStablecoinMintCapResponse, useInterfaces: boolean = false): MsgSetStablecoinMintCapResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetStablecoinMintCapResponseAminoMsg): MsgSetStablecoinMintCapResponse {
    return MsgSetStablecoinMintCapResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetStablecoinMintCapResponseProtoMsg, useInterfaces: boolean = false): MsgSetStablecoinMintCapResponse {
    return MsgSetStablecoinMintCapResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetStablecoinMintCapResponse): Uint8Array {
    return MsgSetStablecoinMintCapResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetStablecoinMintCapResponse): MsgSetStablecoinMintCapResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetStablecoinMintCapResponse",
      value: MsgSetStablecoinMintCapResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetStablecoinInterestRate(): MsgSetStablecoinInterestRate {
  return {
    creator: "",
    stablecoinInterestRate: ""
  };
}
export const MsgSetStablecoinInterestRate = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetStablecoinInterestRate",
  encode(message: MsgSetStablecoinInterestRate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.stablecoinInterestRate !== "") {
      writer.uint32(18).string(message.stablecoinInterestRate);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetStablecoinInterestRate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetStablecoinInterestRate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.stablecoinInterestRate = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetStablecoinInterestRate>): MsgSetStablecoinInterestRate {
    const message = createBaseMsgSetStablecoinInterestRate();
    message.creator = object.creator ?? "";
    message.stablecoinInterestRate = object.stablecoinInterestRate ?? "";
    return message;
  },
  fromAmino(object: MsgSetStablecoinInterestRateAmino): MsgSetStablecoinInterestRate {
    const message = createBaseMsgSetStablecoinInterestRate();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.stablecoin_interest_rate !== undefined && object.stablecoin_interest_rate !== null) {
      message.stablecoinInterestRate = object.stablecoin_interest_rate;
    }
    return message;
  },
  toAmino(message: MsgSetStablecoinInterestRate, useInterfaces: boolean = false): MsgSetStablecoinInterestRateAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.stablecoin_interest_rate = message.stablecoinInterestRate === "" ? undefined : message.stablecoinInterestRate;
    return obj;
  },
  fromAminoMsg(object: MsgSetStablecoinInterestRateAminoMsg): MsgSetStablecoinInterestRate {
    return MsgSetStablecoinInterestRate.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSetStablecoinInterestRate, useInterfaces: boolean = false): MsgSetStablecoinInterestRateAminoMsg {
    return {
      type: "cdp/SetStablecoinInterestRate",
      value: MsgSetStablecoinInterestRate.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSetStablecoinInterestRateProtoMsg, useInterfaces: boolean = false): MsgSetStablecoinInterestRate {
    return MsgSetStablecoinInterestRate.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetStablecoinInterestRate): Uint8Array {
    return MsgSetStablecoinInterestRate.encode(message).finish();
  },
  toProtoMsg(message: MsgSetStablecoinInterestRate): MsgSetStablecoinInterestRateProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetStablecoinInterestRate",
      value: MsgSetStablecoinInterestRate.encode(message).finish()
    };
  }
};
function createBaseMsgSetStablecoinInterestRateResponse(): MsgSetStablecoinInterestRateResponse {
  return {};
}
export const MsgSetStablecoinInterestRateResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetStablecoinInterestRateResponse",
  encode(_: MsgSetStablecoinInterestRateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetStablecoinInterestRateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetStablecoinInterestRateResponse();
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
  fromPartial(_: Partial<MsgSetStablecoinInterestRateResponse>): MsgSetStablecoinInterestRateResponse {
    const message = createBaseMsgSetStablecoinInterestRateResponse();
    return message;
  },
  fromAmino(_: MsgSetStablecoinInterestRateResponseAmino): MsgSetStablecoinInterestRateResponse {
    const message = createBaseMsgSetStablecoinInterestRateResponse();
    return message;
  },
  toAmino(_: MsgSetStablecoinInterestRateResponse, useInterfaces: boolean = false): MsgSetStablecoinInterestRateResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetStablecoinInterestRateResponseAminoMsg): MsgSetStablecoinInterestRateResponse {
    return MsgSetStablecoinInterestRateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetStablecoinInterestRateResponseProtoMsg, useInterfaces: boolean = false): MsgSetStablecoinInterestRateResponse {
    return MsgSetStablecoinInterestRateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetStablecoinInterestRateResponse): Uint8Array {
    return MsgSetStablecoinInterestRateResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetStablecoinInterestRateResponse): MsgSetStablecoinInterestRateResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetStablecoinInterestRateResponse",
      value: MsgSetStablecoinInterestRateResponse.encode(message).finish()
    };
  }
};
function createBaseMsgMintStablecoin(): MsgMintStablecoin {
  return {
    creator: "",
    amount: ""
  };
}
export const MsgMintStablecoin = {
  typeUrl: "/Switcheo.carbon.cdp.MsgMintStablecoin",
  encode(message: MsgMintStablecoin, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgMintStablecoin {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintStablecoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgMintStablecoin>): MsgMintStablecoin {
    const message = createBaseMsgMintStablecoin();
    message.creator = object.creator ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: MsgMintStablecoinAmino): MsgMintStablecoin {
    const message = createBaseMsgMintStablecoin();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: MsgMintStablecoin, useInterfaces: boolean = false): MsgMintStablecoinAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: MsgMintStablecoinAminoMsg): MsgMintStablecoin {
    return MsgMintStablecoin.fromAmino(object.value);
  },
  toAminoMsg(message: MsgMintStablecoin, useInterfaces: boolean = false): MsgMintStablecoinAminoMsg {
    return {
      type: "cdp/MintStablecoin",
      value: MsgMintStablecoin.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgMintStablecoinProtoMsg, useInterfaces: boolean = false): MsgMintStablecoin {
    return MsgMintStablecoin.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgMintStablecoin): Uint8Array {
    return MsgMintStablecoin.encode(message).finish();
  },
  toProtoMsg(message: MsgMintStablecoin): MsgMintStablecoinProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgMintStablecoin",
      value: MsgMintStablecoin.encode(message).finish()
    };
  }
};
function createBaseMsgMintStablecoinResponse(): MsgMintStablecoinResponse {
  return {};
}
export const MsgMintStablecoinResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgMintStablecoinResponse",
  encode(_: MsgMintStablecoinResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgMintStablecoinResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintStablecoinResponse();
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
  fromPartial(_: Partial<MsgMintStablecoinResponse>): MsgMintStablecoinResponse {
    const message = createBaseMsgMintStablecoinResponse();
    return message;
  },
  fromAmino(_: MsgMintStablecoinResponseAmino): MsgMintStablecoinResponse {
    const message = createBaseMsgMintStablecoinResponse();
    return message;
  },
  toAmino(_: MsgMintStablecoinResponse, useInterfaces: boolean = false): MsgMintStablecoinResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgMintStablecoinResponseAminoMsg): MsgMintStablecoinResponse {
    return MsgMintStablecoinResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgMintStablecoinResponseProtoMsg, useInterfaces: boolean = false): MsgMintStablecoinResponse {
    return MsgMintStablecoinResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgMintStablecoinResponse): Uint8Array {
    return MsgMintStablecoinResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgMintStablecoinResponse): MsgMintStablecoinResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgMintStablecoinResponse",
      value: MsgMintStablecoinResponse.encode(message).finish()
    };
  }
};
function createBaseMsgReturnStablecoin(): MsgReturnStablecoin {
  return {
    creator: "",
    principal: Coin.fromPartial({}),
    interest: Coin.fromPartial({}),
    debtor: "",
    principalFromCollateral: false,
    interestFromCollateral: false
  };
}
export const MsgReturnStablecoin = {
  typeUrl: "/Switcheo.carbon.cdp.MsgReturnStablecoin",
  encode(message: MsgReturnStablecoin, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.principal !== undefined) {
      Coin.encode(message.principal, writer.uint32(18).fork()).ldelim();
    }
    if (message.interest !== undefined) {
      Coin.encode(message.interest, writer.uint32(26).fork()).ldelim();
    }
    if (message.debtor !== "") {
      writer.uint32(34).string(message.debtor);
    }
    if (message.principalFromCollateral === true) {
      writer.uint32(40).bool(message.principalFromCollateral);
    }
    if (message.interestFromCollateral === true) {
      writer.uint32(48).bool(message.interestFromCollateral);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgReturnStablecoin {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReturnStablecoin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.principal = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.interest = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.debtor = reader.string();
          break;
        case 5:
          message.principalFromCollateral = reader.bool();
          break;
        case 6:
          message.interestFromCollateral = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgReturnStablecoin>): MsgReturnStablecoin {
    const message = createBaseMsgReturnStablecoin();
    message.creator = object.creator ?? "";
    message.principal = object.principal !== undefined && object.principal !== null ? Coin.fromPartial(object.principal) : undefined;
    message.interest = object.interest !== undefined && object.interest !== null ? Coin.fromPartial(object.interest) : undefined;
    message.debtor = object.debtor ?? "";
    message.principalFromCollateral = object.principalFromCollateral ?? false;
    message.interestFromCollateral = object.interestFromCollateral ?? false;
    return message;
  },
  fromAmino(object: MsgReturnStablecoinAmino): MsgReturnStablecoin {
    const message = createBaseMsgReturnStablecoin();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.principal !== undefined && object.principal !== null) {
      message.principal = Coin.fromAmino(object.principal);
    }
    if (object.interest !== undefined && object.interest !== null) {
      message.interest = Coin.fromAmino(object.interest);
    }
    if (object.debtor !== undefined && object.debtor !== null) {
      message.debtor = object.debtor;
    }
    if (object.principal_from_collateral !== undefined && object.principal_from_collateral !== null) {
      message.principalFromCollateral = object.principal_from_collateral;
    }
    if (object.interest_from_collateral !== undefined && object.interest_from_collateral !== null) {
      message.interestFromCollateral = object.interest_from_collateral;
    }
    return message;
  },
  toAmino(message: MsgReturnStablecoin, useInterfaces: boolean = false): MsgReturnStablecoinAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.principal = message.principal ? Coin.toAmino(message.principal, useInterfaces) : undefined;
    obj.interest = message.interest ? Coin.toAmino(message.interest, useInterfaces) : undefined;
    obj.debtor = message.debtor === "" ? undefined : message.debtor;
    obj.principal_from_collateral = message.principalFromCollateral === false ? undefined : message.principalFromCollateral;
    obj.interest_from_collateral = message.interestFromCollateral === false ? undefined : message.interestFromCollateral;
    return obj;
  },
  fromAminoMsg(object: MsgReturnStablecoinAminoMsg): MsgReturnStablecoin {
    return MsgReturnStablecoin.fromAmino(object.value);
  },
  toAminoMsg(message: MsgReturnStablecoin, useInterfaces: boolean = false): MsgReturnStablecoinAminoMsg {
    return {
      type: "cdp/ReturnStablecoin",
      value: MsgReturnStablecoin.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgReturnStablecoinProtoMsg, useInterfaces: boolean = false): MsgReturnStablecoin {
    return MsgReturnStablecoin.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgReturnStablecoin): Uint8Array {
    return MsgReturnStablecoin.encode(message).finish();
  },
  toProtoMsg(message: MsgReturnStablecoin): MsgReturnStablecoinProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgReturnStablecoin",
      value: MsgReturnStablecoin.encode(message).finish()
    };
  }
};
function createBaseMsgReturnStablecoinResponse(): MsgReturnStablecoinResponse {
  return {};
}
export const MsgReturnStablecoinResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgReturnStablecoinResponse",
  encode(_: MsgReturnStablecoinResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgReturnStablecoinResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgReturnStablecoinResponse();
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
  fromPartial(_: Partial<MsgReturnStablecoinResponse>): MsgReturnStablecoinResponse {
    const message = createBaseMsgReturnStablecoinResponse();
    return message;
  },
  fromAmino(_: MsgReturnStablecoinResponseAmino): MsgReturnStablecoinResponse {
    const message = createBaseMsgReturnStablecoinResponse();
    return message;
  },
  toAmino(_: MsgReturnStablecoinResponse, useInterfaces: boolean = false): MsgReturnStablecoinResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgReturnStablecoinResponseAminoMsg): MsgReturnStablecoinResponse {
    return MsgReturnStablecoinResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgReturnStablecoinResponseProtoMsg, useInterfaces: boolean = false): MsgReturnStablecoinResponse {
    return MsgReturnStablecoinResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgReturnStablecoinResponse): Uint8Array {
    return MsgReturnStablecoinResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgReturnStablecoinResponse): MsgReturnStablecoinResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgReturnStablecoinResponse",
      value: MsgReturnStablecoinResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetCompleteLiquidationThreshold(): MsgSetCompleteLiquidationThreshold {
  return {
    creator: "",
    completeLiquidationThreshold: ""
  };
}
export const MsgSetCompleteLiquidationThreshold = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetCompleteLiquidationThreshold",
  encode(message: MsgSetCompleteLiquidationThreshold, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.completeLiquidationThreshold !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.completeLiquidationThreshold, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetCompleteLiquidationThreshold {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetCompleteLiquidationThreshold();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.completeLiquidationThreshold = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetCompleteLiquidationThreshold>): MsgSetCompleteLiquidationThreshold {
    const message = createBaseMsgSetCompleteLiquidationThreshold();
    message.creator = object.creator ?? "";
    message.completeLiquidationThreshold = object.completeLiquidationThreshold ?? "";
    return message;
  },
  fromAmino(object: MsgSetCompleteLiquidationThresholdAmino): MsgSetCompleteLiquidationThreshold {
    const message = createBaseMsgSetCompleteLiquidationThreshold();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.complete_liquidation_threshold !== undefined && object.complete_liquidation_threshold !== null) {
      message.completeLiquidationThreshold = object.complete_liquidation_threshold;
    }
    return message;
  },
  toAmino(message: MsgSetCompleteLiquidationThreshold, useInterfaces: boolean = false): MsgSetCompleteLiquidationThresholdAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.complete_liquidation_threshold = message.completeLiquidationThreshold === "" ? undefined : message.completeLiquidationThreshold;
    return obj;
  },
  fromAminoMsg(object: MsgSetCompleteLiquidationThresholdAminoMsg): MsgSetCompleteLiquidationThreshold {
    return MsgSetCompleteLiquidationThreshold.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSetCompleteLiquidationThreshold, useInterfaces: boolean = false): MsgSetCompleteLiquidationThresholdAminoMsg {
    return {
      type: "cdp/SetCompleteLiquidationThreshold",
      value: MsgSetCompleteLiquidationThreshold.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSetCompleteLiquidationThresholdProtoMsg, useInterfaces: boolean = false): MsgSetCompleteLiquidationThreshold {
    return MsgSetCompleteLiquidationThreshold.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetCompleteLiquidationThreshold): Uint8Array {
    return MsgSetCompleteLiquidationThreshold.encode(message).finish();
  },
  toProtoMsg(message: MsgSetCompleteLiquidationThreshold): MsgSetCompleteLiquidationThresholdProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetCompleteLiquidationThreshold",
      value: MsgSetCompleteLiquidationThreshold.encode(message).finish()
    };
  }
};
function createBaseMsgSetCompleteLiquidationThresholdResponse(): MsgSetCompleteLiquidationThresholdResponse {
  return {};
}
export const MsgSetCompleteLiquidationThresholdResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetCompleteLiquidationThresholdResponse",
  encode(_: MsgSetCompleteLiquidationThresholdResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetCompleteLiquidationThresholdResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetCompleteLiquidationThresholdResponse();
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
  fromPartial(_: Partial<MsgSetCompleteLiquidationThresholdResponse>): MsgSetCompleteLiquidationThresholdResponse {
    const message = createBaseMsgSetCompleteLiquidationThresholdResponse();
    return message;
  },
  fromAmino(_: MsgSetCompleteLiquidationThresholdResponseAmino): MsgSetCompleteLiquidationThresholdResponse {
    const message = createBaseMsgSetCompleteLiquidationThresholdResponse();
    return message;
  },
  toAmino(_: MsgSetCompleteLiquidationThresholdResponse, useInterfaces: boolean = false): MsgSetCompleteLiquidationThresholdResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetCompleteLiquidationThresholdResponseAminoMsg): MsgSetCompleteLiquidationThresholdResponse {
    return MsgSetCompleteLiquidationThresholdResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetCompleteLiquidationThresholdResponseProtoMsg, useInterfaces: boolean = false): MsgSetCompleteLiquidationThresholdResponse {
    return MsgSetCompleteLiquidationThresholdResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetCompleteLiquidationThresholdResponse): Uint8Array {
    return MsgSetCompleteLiquidationThresholdResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetCompleteLiquidationThresholdResponse): MsgSetCompleteLiquidationThresholdResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetCompleteLiquidationThresholdResponse",
      value: MsgSetCompleteLiquidationThresholdResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetMinimumCloseFactor(): MsgSetMinimumCloseFactor {
  return {
    creator: "",
    minimumCloseFactor: ""
  };
}
export const MsgSetMinimumCloseFactor = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetMinimumCloseFactor",
  encode(message: MsgSetMinimumCloseFactor, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.minimumCloseFactor !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.minimumCloseFactor, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetMinimumCloseFactor {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetMinimumCloseFactor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.minimumCloseFactor = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetMinimumCloseFactor>): MsgSetMinimumCloseFactor {
    const message = createBaseMsgSetMinimumCloseFactor();
    message.creator = object.creator ?? "";
    message.minimumCloseFactor = object.minimumCloseFactor ?? "";
    return message;
  },
  fromAmino(object: MsgSetMinimumCloseFactorAmino): MsgSetMinimumCloseFactor {
    const message = createBaseMsgSetMinimumCloseFactor();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.minimum_close_factor !== undefined && object.minimum_close_factor !== null) {
      message.minimumCloseFactor = object.minimum_close_factor;
    }
    return message;
  },
  toAmino(message: MsgSetMinimumCloseFactor, useInterfaces: boolean = false): MsgSetMinimumCloseFactorAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.minimum_close_factor = message.minimumCloseFactor === "" ? undefined : message.minimumCloseFactor;
    return obj;
  },
  fromAminoMsg(object: MsgSetMinimumCloseFactorAminoMsg): MsgSetMinimumCloseFactor {
    return MsgSetMinimumCloseFactor.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSetMinimumCloseFactor, useInterfaces: boolean = false): MsgSetMinimumCloseFactorAminoMsg {
    return {
      type: "cdp/SetMinimumCloseFactor",
      value: MsgSetMinimumCloseFactor.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSetMinimumCloseFactorProtoMsg, useInterfaces: boolean = false): MsgSetMinimumCloseFactor {
    return MsgSetMinimumCloseFactor.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetMinimumCloseFactor): Uint8Array {
    return MsgSetMinimumCloseFactor.encode(message).finish();
  },
  toProtoMsg(message: MsgSetMinimumCloseFactor): MsgSetMinimumCloseFactorProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetMinimumCloseFactor",
      value: MsgSetMinimumCloseFactor.encode(message).finish()
    };
  }
};
function createBaseMsgSetMinimumCloseFactorResponse(): MsgSetMinimumCloseFactorResponse {
  return {};
}
export const MsgSetMinimumCloseFactorResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetMinimumCloseFactorResponse",
  encode(_: MsgSetMinimumCloseFactorResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetMinimumCloseFactorResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetMinimumCloseFactorResponse();
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
  fromPartial(_: Partial<MsgSetMinimumCloseFactorResponse>): MsgSetMinimumCloseFactorResponse {
    const message = createBaseMsgSetMinimumCloseFactorResponse();
    return message;
  },
  fromAmino(_: MsgSetMinimumCloseFactorResponseAmino): MsgSetMinimumCloseFactorResponse {
    const message = createBaseMsgSetMinimumCloseFactorResponse();
    return message;
  },
  toAmino(_: MsgSetMinimumCloseFactorResponse, useInterfaces: boolean = false): MsgSetMinimumCloseFactorResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetMinimumCloseFactorResponseAminoMsg): MsgSetMinimumCloseFactorResponse {
    return MsgSetMinimumCloseFactorResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetMinimumCloseFactorResponseProtoMsg, useInterfaces: boolean = false): MsgSetMinimumCloseFactorResponse {
    return MsgSetMinimumCloseFactorResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetMinimumCloseFactorResponse): Uint8Array {
    return MsgSetMinimumCloseFactorResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetMinimumCloseFactorResponse): MsgSetMinimumCloseFactorResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetMinimumCloseFactorResponse",
      value: MsgSetMinimumCloseFactorResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetSmallLiquidationSize(): MsgSetSmallLiquidationSize {
  return {
    creator: "",
    smallLiquidationSize: ""
  };
}
export const MsgSetSmallLiquidationSize = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetSmallLiquidationSize",
  encode(message: MsgSetSmallLiquidationSize, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.smallLiquidationSize !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.smallLiquidationSize, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetSmallLiquidationSize {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetSmallLiquidationSize();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.smallLiquidationSize = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetSmallLiquidationSize>): MsgSetSmallLiquidationSize {
    const message = createBaseMsgSetSmallLiquidationSize();
    message.creator = object.creator ?? "";
    message.smallLiquidationSize = object.smallLiquidationSize ?? "";
    return message;
  },
  fromAmino(object: MsgSetSmallLiquidationSizeAmino): MsgSetSmallLiquidationSize {
    const message = createBaseMsgSetSmallLiquidationSize();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.small_liquidation_size !== undefined && object.small_liquidation_size !== null) {
      message.smallLiquidationSize = object.small_liquidation_size;
    }
    return message;
  },
  toAmino(message: MsgSetSmallLiquidationSize, useInterfaces: boolean = false): MsgSetSmallLiquidationSizeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.small_liquidation_size = message.smallLiquidationSize === "" ? undefined : message.smallLiquidationSize;
    return obj;
  },
  fromAminoMsg(object: MsgSetSmallLiquidationSizeAminoMsg): MsgSetSmallLiquidationSize {
    return MsgSetSmallLiquidationSize.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSetSmallLiquidationSize, useInterfaces: boolean = false): MsgSetSmallLiquidationSizeAminoMsg {
    return {
      type: "cdp/SetSmallLiquidationSize",
      value: MsgSetSmallLiquidationSize.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSetSmallLiquidationSizeProtoMsg, useInterfaces: boolean = false): MsgSetSmallLiquidationSize {
    return MsgSetSmallLiquidationSize.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetSmallLiquidationSize): Uint8Array {
    return MsgSetSmallLiquidationSize.encode(message).finish();
  },
  toProtoMsg(message: MsgSetSmallLiquidationSize): MsgSetSmallLiquidationSizeProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetSmallLiquidationSize",
      value: MsgSetSmallLiquidationSize.encode(message).finish()
    };
  }
};
function createBaseMsgSetSmallLiquidationSizeResponse(): MsgSetSmallLiquidationSizeResponse {
  return {};
}
export const MsgSetSmallLiquidationSizeResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetSmallLiquidationSizeResponse",
  encode(_: MsgSetSmallLiquidationSizeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetSmallLiquidationSizeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetSmallLiquidationSizeResponse();
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
  fromPartial(_: Partial<MsgSetSmallLiquidationSizeResponse>): MsgSetSmallLiquidationSizeResponse {
    const message = createBaseMsgSetSmallLiquidationSizeResponse();
    return message;
  },
  fromAmino(_: MsgSetSmallLiquidationSizeResponseAmino): MsgSetSmallLiquidationSizeResponse {
    const message = createBaseMsgSetSmallLiquidationSizeResponse();
    return message;
  },
  toAmino(_: MsgSetSmallLiquidationSizeResponse, useInterfaces: boolean = false): MsgSetSmallLiquidationSizeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetSmallLiquidationSizeResponseAminoMsg): MsgSetSmallLiquidationSizeResponse {
    return MsgSetSmallLiquidationSizeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetSmallLiquidationSizeResponseProtoMsg, useInterfaces: boolean = false): MsgSetSmallLiquidationSizeResponse {
    return MsgSetSmallLiquidationSizeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetSmallLiquidationSizeResponse): Uint8Array {
    return MsgSetSmallLiquidationSizeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetSmallLiquidationSizeResponse): MsgSetSmallLiquidationSizeResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetSmallLiquidationSizeResponse",
      value: MsgSetSmallLiquidationSizeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgCreateRewardScheme(): MsgCreateRewardScheme {
  return {
    creator: "",
    createRewardSchemeParams: CreateRewardSchemeParams.fromPartial({})
  };
}
export const MsgCreateRewardScheme = {
  typeUrl: "/Switcheo.carbon.cdp.MsgCreateRewardScheme",
  encode(message: MsgCreateRewardScheme, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.createRewardSchemeParams !== undefined) {
      CreateRewardSchemeParams.encode(message.createRewardSchemeParams, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCreateRewardScheme {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateRewardScheme();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.createRewardSchemeParams = CreateRewardSchemeParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreateRewardScheme>): MsgCreateRewardScheme {
    const message = createBaseMsgCreateRewardScheme();
    message.creator = object.creator ?? "";
    message.createRewardSchemeParams = object.createRewardSchemeParams !== undefined && object.createRewardSchemeParams !== null ? CreateRewardSchemeParams.fromPartial(object.createRewardSchemeParams) : undefined;
    return message;
  },
  fromAmino(object: MsgCreateRewardSchemeAmino): MsgCreateRewardScheme {
    const message = createBaseMsgCreateRewardScheme();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.create_reward_scheme_params !== undefined && object.create_reward_scheme_params !== null) {
      message.createRewardSchemeParams = CreateRewardSchemeParams.fromAmino(object.create_reward_scheme_params);
    }
    return message;
  },
  toAmino(message: MsgCreateRewardScheme, useInterfaces: boolean = false): MsgCreateRewardSchemeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.create_reward_scheme_params = message.createRewardSchemeParams ? CreateRewardSchemeParams.toAmino(message.createRewardSchemeParams, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgCreateRewardSchemeAminoMsg): MsgCreateRewardScheme {
    return MsgCreateRewardScheme.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCreateRewardScheme, useInterfaces: boolean = false): MsgCreateRewardSchemeAminoMsg {
    return {
      type: "cdp/CreateRewardScheme",
      value: MsgCreateRewardScheme.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgCreateRewardSchemeProtoMsg, useInterfaces: boolean = false): MsgCreateRewardScheme {
    return MsgCreateRewardScheme.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCreateRewardScheme): Uint8Array {
    return MsgCreateRewardScheme.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateRewardScheme): MsgCreateRewardSchemeProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgCreateRewardScheme",
      value: MsgCreateRewardScheme.encode(message).finish()
    };
  }
};
function createBaseMsgCreateRewardSchemeResponse(): MsgCreateRewardSchemeResponse {
  return {};
}
export const MsgCreateRewardSchemeResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgCreateRewardSchemeResponse",
  encode(_: MsgCreateRewardSchemeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCreateRewardSchemeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateRewardSchemeResponse();
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
  fromPartial(_: Partial<MsgCreateRewardSchemeResponse>): MsgCreateRewardSchemeResponse {
    const message = createBaseMsgCreateRewardSchemeResponse();
    return message;
  },
  fromAmino(_: MsgCreateRewardSchemeResponseAmino): MsgCreateRewardSchemeResponse {
    const message = createBaseMsgCreateRewardSchemeResponse();
    return message;
  },
  toAmino(_: MsgCreateRewardSchemeResponse, useInterfaces: boolean = false): MsgCreateRewardSchemeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCreateRewardSchemeResponseAminoMsg): MsgCreateRewardSchemeResponse {
    return MsgCreateRewardSchemeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateRewardSchemeResponseProtoMsg, useInterfaces: boolean = false): MsgCreateRewardSchemeResponse {
    return MsgCreateRewardSchemeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCreateRewardSchemeResponse): Uint8Array {
    return MsgCreateRewardSchemeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateRewardSchemeResponse): MsgCreateRewardSchemeResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgCreateRewardSchemeResponse",
      value: MsgCreateRewardSchemeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateRewardScheme(): MsgUpdateRewardScheme {
  return {
    updater: "",
    updateRewardSchemeParams: UpdateRewardSchemeParams.fromPartial({})
  };
}
export const MsgUpdateRewardScheme = {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateRewardScheme",
  encode(message: MsgUpdateRewardScheme, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.updater !== "") {
      writer.uint32(10).string(message.updater);
    }
    if (message.updateRewardSchemeParams !== undefined) {
      UpdateRewardSchemeParams.encode(message.updateRewardSchemeParams, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateRewardScheme {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateRewardScheme();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.updater = reader.string();
          break;
        case 2:
          message.updateRewardSchemeParams = UpdateRewardSchemeParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateRewardScheme>): MsgUpdateRewardScheme {
    const message = createBaseMsgUpdateRewardScheme();
    message.updater = object.updater ?? "";
    message.updateRewardSchemeParams = object.updateRewardSchemeParams !== undefined && object.updateRewardSchemeParams !== null ? UpdateRewardSchemeParams.fromPartial(object.updateRewardSchemeParams) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateRewardSchemeAmino): MsgUpdateRewardScheme {
    const message = createBaseMsgUpdateRewardScheme();
    if (object.updater !== undefined && object.updater !== null) {
      message.updater = object.updater;
    }
    if (object.update_reward_scheme_params !== undefined && object.update_reward_scheme_params !== null) {
      message.updateRewardSchemeParams = UpdateRewardSchemeParams.fromAmino(object.update_reward_scheme_params);
    }
    return message;
  },
  toAmino(message: MsgUpdateRewardScheme, useInterfaces: boolean = false): MsgUpdateRewardSchemeAmino {
    const obj: any = {};
    obj.updater = message.updater === "" ? undefined : message.updater;
    obj.update_reward_scheme_params = message.updateRewardSchemeParams ? UpdateRewardSchemeParams.toAmino(message.updateRewardSchemeParams, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateRewardSchemeAminoMsg): MsgUpdateRewardScheme {
    return MsgUpdateRewardScheme.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateRewardScheme, useInterfaces: boolean = false): MsgUpdateRewardSchemeAminoMsg {
    return {
      type: "cdp/UpdateRewardScheme",
      value: MsgUpdateRewardScheme.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateRewardSchemeProtoMsg, useInterfaces: boolean = false): MsgUpdateRewardScheme {
    return MsgUpdateRewardScheme.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateRewardScheme): Uint8Array {
    return MsgUpdateRewardScheme.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateRewardScheme): MsgUpdateRewardSchemeProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgUpdateRewardScheme",
      value: MsgUpdateRewardScheme.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateRewardSchemeResponse(): MsgUpdateRewardSchemeResponse {
  return {};
}
export const MsgUpdateRewardSchemeResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateRewardSchemeResponse",
  encode(_: MsgUpdateRewardSchemeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateRewardSchemeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateRewardSchemeResponse();
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
  fromPartial(_: Partial<MsgUpdateRewardSchemeResponse>): MsgUpdateRewardSchemeResponse {
    const message = createBaseMsgUpdateRewardSchemeResponse();
    return message;
  },
  fromAmino(_: MsgUpdateRewardSchemeResponseAmino): MsgUpdateRewardSchemeResponse {
    const message = createBaseMsgUpdateRewardSchemeResponse();
    return message;
  },
  toAmino(_: MsgUpdateRewardSchemeResponse, useInterfaces: boolean = false): MsgUpdateRewardSchemeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateRewardSchemeResponseAminoMsg): MsgUpdateRewardSchemeResponse {
    return MsgUpdateRewardSchemeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateRewardSchemeResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateRewardSchemeResponse {
    return MsgUpdateRewardSchemeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateRewardSchemeResponse): Uint8Array {
    return MsgUpdateRewardSchemeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateRewardSchemeResponse): MsgUpdateRewardSchemeResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgUpdateRewardSchemeResponse",
      value: MsgUpdateRewardSchemeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgClaimRewards(): MsgClaimRewards {
  return {
    creator: ""
  };
}
export const MsgClaimRewards = {
  typeUrl: "/Switcheo.carbon.cdp.MsgClaimRewards",
  encode(message: MsgClaimRewards, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgClaimRewards {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimRewards();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgClaimRewards>): MsgClaimRewards {
    const message = createBaseMsgClaimRewards();
    message.creator = object.creator ?? "";
    return message;
  },
  fromAmino(object: MsgClaimRewardsAmino): MsgClaimRewards {
    const message = createBaseMsgClaimRewards();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    return message;
  },
  toAmino(message: MsgClaimRewards, useInterfaces: boolean = false): MsgClaimRewardsAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    return obj;
  },
  fromAminoMsg(object: MsgClaimRewardsAminoMsg): MsgClaimRewards {
    return MsgClaimRewards.fromAmino(object.value);
  },
  toAminoMsg(message: MsgClaimRewards, useInterfaces: boolean = false): MsgClaimRewardsAminoMsg {
    return {
      type: "cdp/ClaimRewards",
      value: MsgClaimRewards.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgClaimRewardsProtoMsg, useInterfaces: boolean = false): MsgClaimRewards {
    return MsgClaimRewards.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgClaimRewards): Uint8Array {
    return MsgClaimRewards.encode(message).finish();
  },
  toProtoMsg(message: MsgClaimRewards): MsgClaimRewardsProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgClaimRewards",
      value: MsgClaimRewards.encode(message).finish()
    };
  }
};
function createBaseMsgClaimRewardsResponse(): MsgClaimRewardsResponse {
  return {};
}
export const MsgClaimRewardsResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgClaimRewardsResponse",
  encode(_: MsgClaimRewardsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgClaimRewardsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimRewardsResponse();
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
  fromPartial(_: Partial<MsgClaimRewardsResponse>): MsgClaimRewardsResponse {
    const message = createBaseMsgClaimRewardsResponse();
    return message;
  },
  fromAmino(_: MsgClaimRewardsResponseAmino): MsgClaimRewardsResponse {
    const message = createBaseMsgClaimRewardsResponse();
    return message;
  },
  toAmino(_: MsgClaimRewardsResponse, useInterfaces: boolean = false): MsgClaimRewardsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgClaimRewardsResponseAminoMsg): MsgClaimRewardsResponse {
    return MsgClaimRewardsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgClaimRewardsResponseProtoMsg, useInterfaces: boolean = false): MsgClaimRewardsResponse {
    return MsgClaimRewardsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgClaimRewardsResponse): Uint8Array {
    return MsgClaimRewardsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgClaimRewardsResponse): MsgClaimRewardsResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgClaimRewardsResponse",
      value: MsgClaimRewardsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetStalePriceGracePeriod(): MsgSetStalePriceGracePeriod {
  return {
    creator: "",
    stalePriceGracePeriod: Duration.fromPartial({})
  };
}
export const MsgSetStalePriceGracePeriod = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetStalePriceGracePeriod",
  encode(message: MsgSetStalePriceGracePeriod, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.stalePriceGracePeriod !== undefined) {
      Duration.encode(message.stalePriceGracePeriod, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetStalePriceGracePeriod {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetStalePriceGracePeriod();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.stalePriceGracePeriod = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetStalePriceGracePeriod>): MsgSetStalePriceGracePeriod {
    const message = createBaseMsgSetStalePriceGracePeriod();
    message.creator = object.creator ?? "";
    message.stalePriceGracePeriod = object.stalePriceGracePeriod !== undefined && object.stalePriceGracePeriod !== null ? Duration.fromPartial(object.stalePriceGracePeriod) : undefined;
    return message;
  },
  fromAmino(object: MsgSetStalePriceGracePeriodAmino): MsgSetStalePriceGracePeriod {
    const message = createBaseMsgSetStalePriceGracePeriod();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.stale_price_grace_period !== undefined && object.stale_price_grace_period !== null) {
      message.stalePriceGracePeriod = Duration.fromAmino(object.stale_price_grace_period);
    }
    return message;
  },
  toAmino(message: MsgSetStalePriceGracePeriod, useInterfaces: boolean = false): MsgSetStalePriceGracePeriodAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.stale_price_grace_period = message.stalePriceGracePeriod ? Duration.toAmino(message.stalePriceGracePeriod, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSetStalePriceGracePeriodAminoMsg): MsgSetStalePriceGracePeriod {
    return MsgSetStalePriceGracePeriod.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSetStalePriceGracePeriod, useInterfaces: boolean = false): MsgSetStalePriceGracePeriodAminoMsg {
    return {
      type: "cdp/SetStalePriceGracePeriod",
      value: MsgSetStalePriceGracePeriod.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSetStalePriceGracePeriodProtoMsg, useInterfaces: boolean = false): MsgSetStalePriceGracePeriod {
    return MsgSetStalePriceGracePeriod.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetStalePriceGracePeriod): Uint8Array {
    return MsgSetStalePriceGracePeriod.encode(message).finish();
  },
  toProtoMsg(message: MsgSetStalePriceGracePeriod): MsgSetStalePriceGracePeriodProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetStalePriceGracePeriod",
      value: MsgSetStalePriceGracePeriod.encode(message).finish()
    };
  }
};
function createBaseMsgSetStalePriceGracePeriodResponse(): MsgSetStalePriceGracePeriodResponse {
  return {};
}
export const MsgSetStalePriceGracePeriodResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetStalePriceGracePeriodResponse",
  encode(_: MsgSetStalePriceGracePeriodResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetStalePriceGracePeriodResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetStalePriceGracePeriodResponse();
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
  fromPartial(_: Partial<MsgSetStalePriceGracePeriodResponse>): MsgSetStalePriceGracePeriodResponse {
    const message = createBaseMsgSetStalePriceGracePeriodResponse();
    return message;
  },
  fromAmino(_: MsgSetStalePriceGracePeriodResponseAmino): MsgSetStalePriceGracePeriodResponse {
    const message = createBaseMsgSetStalePriceGracePeriodResponse();
    return message;
  },
  toAmino(_: MsgSetStalePriceGracePeriodResponse, useInterfaces: boolean = false): MsgSetStalePriceGracePeriodResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetStalePriceGracePeriodResponseAminoMsg): MsgSetStalePriceGracePeriodResponse {
    return MsgSetStalePriceGracePeriodResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetStalePriceGracePeriodResponseProtoMsg, useInterfaces: boolean = false): MsgSetStalePriceGracePeriodResponse {
    return MsgSetStalePriceGracePeriodResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetStalePriceGracePeriodResponse): Uint8Array {
    return MsgSetStalePriceGracePeriodResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetStalePriceGracePeriodResponse): MsgSetStalePriceGracePeriodResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetStalePriceGracePeriodResponse",
      value: MsgSetStalePriceGracePeriodResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetCdpPaused(): MsgSetCdpPaused {
  return {
    creator: "",
    cdpPaused: false
  };
}
export const MsgSetCdpPaused = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetCdpPaused",
  encode(message: MsgSetCdpPaused, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.cdpPaused === true) {
      writer.uint32(16).bool(message.cdpPaused);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetCdpPaused {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetCdpPaused();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.cdpPaused = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetCdpPaused>): MsgSetCdpPaused {
    const message = createBaseMsgSetCdpPaused();
    message.creator = object.creator ?? "";
    message.cdpPaused = object.cdpPaused ?? false;
    return message;
  },
  fromAmino(object: MsgSetCdpPausedAmino): MsgSetCdpPaused {
    const message = createBaseMsgSetCdpPaused();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.cdpPaused !== undefined && object.cdpPaused !== null) {
      message.cdpPaused = object.cdpPaused;
    }
    return message;
  },
  toAmino(message: MsgSetCdpPaused, useInterfaces: boolean = false): MsgSetCdpPausedAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.cdpPaused = message.cdpPaused === false ? undefined : message.cdpPaused;
    return obj;
  },
  fromAminoMsg(object: MsgSetCdpPausedAminoMsg): MsgSetCdpPaused {
    return MsgSetCdpPaused.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSetCdpPaused, useInterfaces: boolean = false): MsgSetCdpPausedAminoMsg {
    return {
      type: "cdp/SetCdpPaused",
      value: MsgSetCdpPaused.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSetCdpPausedProtoMsg, useInterfaces: boolean = false): MsgSetCdpPaused {
    return MsgSetCdpPaused.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetCdpPaused): Uint8Array {
    return MsgSetCdpPaused.encode(message).finish();
  },
  toProtoMsg(message: MsgSetCdpPaused): MsgSetCdpPausedProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetCdpPaused",
      value: MsgSetCdpPaused.encode(message).finish()
    };
  }
};
function createBaseMsgSetCdpPausedResponse(): MsgSetCdpPausedResponse {
  return {};
}
export const MsgSetCdpPausedResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetCdpPausedResponse",
  encode(_: MsgSetCdpPausedResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetCdpPausedResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetCdpPausedResponse();
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
  fromPartial(_: Partial<MsgSetCdpPausedResponse>): MsgSetCdpPausedResponse {
    const message = createBaseMsgSetCdpPausedResponse();
    return message;
  },
  fromAmino(_: MsgSetCdpPausedResponseAmino): MsgSetCdpPausedResponse {
    const message = createBaseMsgSetCdpPausedResponse();
    return message;
  },
  toAmino(_: MsgSetCdpPausedResponse, useInterfaces: boolean = false): MsgSetCdpPausedResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetCdpPausedResponseAminoMsg): MsgSetCdpPausedResponse {
    return MsgSetCdpPausedResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetCdpPausedResponseProtoMsg, useInterfaces: boolean = false): MsgSetCdpPausedResponse {
    return MsgSetCdpPausedResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetCdpPausedResponse): Uint8Array {
    return MsgSetCdpPausedResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetCdpPausedResponse): MsgSetCdpPausedResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetCdpPausedResponse",
      value: MsgSetCdpPausedResponse.encode(message).finish()
    };
  }
};
function createBaseMsgConvertTokenInCdpToGroupTokens(): MsgConvertTokenInCdpToGroupTokens {
  return {
    creator: "",
    denom: ""
  };
}
export const MsgConvertTokenInCdpToGroupTokens = {
  typeUrl: "/Switcheo.carbon.cdp.MsgConvertTokenInCdpToGroupTokens",
  encode(message: MsgConvertTokenInCdpToGroupTokens, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgConvertTokenInCdpToGroupTokens {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConvertTokenInCdpToGroupTokens();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
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
  fromPartial(object: Partial<MsgConvertTokenInCdpToGroupTokens>): MsgConvertTokenInCdpToGroupTokens {
    const message = createBaseMsgConvertTokenInCdpToGroupTokens();
    message.creator = object.creator ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: MsgConvertTokenInCdpToGroupTokensAmino): MsgConvertTokenInCdpToGroupTokens {
    const message = createBaseMsgConvertTokenInCdpToGroupTokens();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: MsgConvertTokenInCdpToGroupTokens, useInterfaces: boolean = false): MsgConvertTokenInCdpToGroupTokensAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: MsgConvertTokenInCdpToGroupTokensAminoMsg): MsgConvertTokenInCdpToGroupTokens {
    return MsgConvertTokenInCdpToGroupTokens.fromAmino(object.value);
  },
  toAminoMsg(message: MsgConvertTokenInCdpToGroupTokens, useInterfaces: boolean = false): MsgConvertTokenInCdpToGroupTokensAminoMsg {
    return {
      type: "cdp/ConvertTokenInCdpToGroupTokens",
      value: MsgConvertTokenInCdpToGroupTokens.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgConvertTokenInCdpToGroupTokensProtoMsg, useInterfaces: boolean = false): MsgConvertTokenInCdpToGroupTokens {
    return MsgConvertTokenInCdpToGroupTokens.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgConvertTokenInCdpToGroupTokens): Uint8Array {
    return MsgConvertTokenInCdpToGroupTokens.encode(message).finish();
  },
  toProtoMsg(message: MsgConvertTokenInCdpToGroupTokens): MsgConvertTokenInCdpToGroupTokensProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgConvertTokenInCdpToGroupTokens",
      value: MsgConvertTokenInCdpToGroupTokens.encode(message).finish()
    };
  }
};
function createBaseMsgConvertTokenInCdpToGroupTokensResponse(): MsgConvertTokenInCdpToGroupTokensResponse {
  return {};
}
export const MsgConvertTokenInCdpToGroupTokensResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgConvertTokenInCdpToGroupTokensResponse",
  encode(_: MsgConvertTokenInCdpToGroupTokensResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgConvertTokenInCdpToGroupTokensResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConvertTokenInCdpToGroupTokensResponse();
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
  fromPartial(_: Partial<MsgConvertTokenInCdpToGroupTokensResponse>): MsgConvertTokenInCdpToGroupTokensResponse {
    const message = createBaseMsgConvertTokenInCdpToGroupTokensResponse();
    return message;
  },
  fromAmino(_: MsgConvertTokenInCdpToGroupTokensResponseAmino): MsgConvertTokenInCdpToGroupTokensResponse {
    const message = createBaseMsgConvertTokenInCdpToGroupTokensResponse();
    return message;
  },
  toAmino(_: MsgConvertTokenInCdpToGroupTokensResponse, useInterfaces: boolean = false): MsgConvertTokenInCdpToGroupTokensResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgConvertTokenInCdpToGroupTokensResponseAminoMsg): MsgConvertTokenInCdpToGroupTokensResponse {
    return MsgConvertTokenInCdpToGroupTokensResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgConvertTokenInCdpToGroupTokensResponseProtoMsg, useInterfaces: boolean = false): MsgConvertTokenInCdpToGroupTokensResponse {
    return MsgConvertTokenInCdpToGroupTokensResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgConvertTokenInCdpToGroupTokensResponse): Uint8Array {
    return MsgConvertTokenInCdpToGroupTokensResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgConvertTokenInCdpToGroupTokensResponse): MsgConvertTokenInCdpToGroupTokensResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgConvertTokenInCdpToGroupTokensResponse",
      value: MsgConvertTokenInCdpToGroupTokensResponse.encode(message).finish()
    };
  }
};
function createBaseMsgAddEModeCategory(): MsgAddEModeCategory {
  return {
    creator: "",
    eModeCategory: EModeCategory.fromPartial({})
  };
}
export const MsgAddEModeCategory = {
  typeUrl: "/Switcheo.carbon.cdp.MsgAddEModeCategory",
  encode(message: MsgAddEModeCategory, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.eModeCategory !== undefined) {
      EModeCategory.encode(message.eModeCategory, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAddEModeCategory {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddEModeCategory();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.eModeCategory = EModeCategory.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAddEModeCategory>): MsgAddEModeCategory {
    const message = createBaseMsgAddEModeCategory();
    message.creator = object.creator ?? "";
    message.eModeCategory = object.eModeCategory !== undefined && object.eModeCategory !== null ? EModeCategory.fromPartial(object.eModeCategory) : undefined;
    return message;
  },
  fromAmino(object: MsgAddEModeCategoryAmino): MsgAddEModeCategory {
    const message = createBaseMsgAddEModeCategory();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.e_mode_category !== undefined && object.e_mode_category !== null) {
      message.eModeCategory = EModeCategory.fromAmino(object.e_mode_category);
    }
    return message;
  },
  toAmino(message: MsgAddEModeCategory, useInterfaces: boolean = false): MsgAddEModeCategoryAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.e_mode_category = message.eModeCategory ? EModeCategory.toAmino(message.eModeCategory, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgAddEModeCategoryAminoMsg): MsgAddEModeCategory {
    return MsgAddEModeCategory.fromAmino(object.value);
  },
  toAminoMsg(message: MsgAddEModeCategory, useInterfaces: boolean = false): MsgAddEModeCategoryAminoMsg {
    return {
      type: "cdp/AddEModeCategory",
      value: MsgAddEModeCategory.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgAddEModeCategoryProtoMsg, useInterfaces: boolean = false): MsgAddEModeCategory {
    return MsgAddEModeCategory.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAddEModeCategory): Uint8Array {
    return MsgAddEModeCategory.encode(message).finish();
  },
  toProtoMsg(message: MsgAddEModeCategory): MsgAddEModeCategoryProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgAddEModeCategory",
      value: MsgAddEModeCategory.encode(message).finish()
    };
  }
};
function createBaseMsgAddEModeCategoryResponse(): MsgAddEModeCategoryResponse {
  return {};
}
export const MsgAddEModeCategoryResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgAddEModeCategoryResponse",
  encode(_: MsgAddEModeCategoryResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAddEModeCategoryResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddEModeCategoryResponse();
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
  fromPartial(_: Partial<MsgAddEModeCategoryResponse>): MsgAddEModeCategoryResponse {
    const message = createBaseMsgAddEModeCategoryResponse();
    return message;
  },
  fromAmino(_: MsgAddEModeCategoryResponseAmino): MsgAddEModeCategoryResponse {
    const message = createBaseMsgAddEModeCategoryResponse();
    return message;
  },
  toAmino(_: MsgAddEModeCategoryResponse, useInterfaces: boolean = false): MsgAddEModeCategoryResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgAddEModeCategoryResponseAminoMsg): MsgAddEModeCategoryResponse {
    return MsgAddEModeCategoryResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddEModeCategoryResponseProtoMsg, useInterfaces: boolean = false): MsgAddEModeCategoryResponse {
    return MsgAddEModeCategoryResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAddEModeCategoryResponse): Uint8Array {
    return MsgAddEModeCategoryResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAddEModeCategoryResponse): MsgAddEModeCategoryResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgAddEModeCategoryResponse",
      value: MsgAddEModeCategoryResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateEModeCategory(): MsgUpdateEModeCategory {
  return {
    creator: "",
    eModeCategoryName: "",
    updateEModeCategoryParams: UpdateEModeCategoryParams.fromPartial({})
  };
}
export const MsgUpdateEModeCategory = {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateEModeCategory",
  encode(message: MsgUpdateEModeCategory, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.eModeCategoryName !== "") {
      writer.uint32(18).string(message.eModeCategoryName);
    }
    if (message.updateEModeCategoryParams !== undefined) {
      UpdateEModeCategoryParams.encode(message.updateEModeCategoryParams, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateEModeCategory {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateEModeCategory();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.eModeCategoryName = reader.string();
          break;
        case 3:
          message.updateEModeCategoryParams = UpdateEModeCategoryParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateEModeCategory>): MsgUpdateEModeCategory {
    const message = createBaseMsgUpdateEModeCategory();
    message.creator = object.creator ?? "";
    message.eModeCategoryName = object.eModeCategoryName ?? "";
    message.updateEModeCategoryParams = object.updateEModeCategoryParams !== undefined && object.updateEModeCategoryParams !== null ? UpdateEModeCategoryParams.fromPartial(object.updateEModeCategoryParams) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateEModeCategoryAmino): MsgUpdateEModeCategory {
    const message = createBaseMsgUpdateEModeCategory();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.e_mode_category_name !== undefined && object.e_mode_category_name !== null) {
      message.eModeCategoryName = object.e_mode_category_name;
    }
    if (object.update_e_mode_category_params !== undefined && object.update_e_mode_category_params !== null) {
      message.updateEModeCategoryParams = UpdateEModeCategoryParams.fromAmino(object.update_e_mode_category_params);
    }
    return message;
  },
  toAmino(message: MsgUpdateEModeCategory, useInterfaces: boolean = false): MsgUpdateEModeCategoryAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.e_mode_category_name = message.eModeCategoryName === "" ? undefined : message.eModeCategoryName;
    obj.update_e_mode_category_params = message.updateEModeCategoryParams ? UpdateEModeCategoryParams.toAmino(message.updateEModeCategoryParams, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateEModeCategoryAminoMsg): MsgUpdateEModeCategory {
    return MsgUpdateEModeCategory.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateEModeCategory, useInterfaces: boolean = false): MsgUpdateEModeCategoryAminoMsg {
    return {
      type: "cdp/UpdateEModeCategory",
      value: MsgUpdateEModeCategory.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateEModeCategoryProtoMsg, useInterfaces: boolean = false): MsgUpdateEModeCategory {
    return MsgUpdateEModeCategory.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateEModeCategory): Uint8Array {
    return MsgUpdateEModeCategory.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateEModeCategory): MsgUpdateEModeCategoryProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgUpdateEModeCategory",
      value: MsgUpdateEModeCategory.encode(message).finish()
    };
  }
};
function createBaseUpdateEModeCategoryParams(): UpdateEModeCategoryParams {
  return {
    denoms: [],
    loanToValue: undefined,
    liquidationThreshold: undefined,
    liquidationDiscount: undefined,
    isActive: undefined
  };
}
export const UpdateEModeCategoryParams = {
  typeUrl: "/Switcheo.carbon.cdp.UpdateEModeCategoryParams",
  encode(message: UpdateEModeCategoryParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.denoms) {
      StringValue.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.loanToValue !== undefined) {
      Int64Value.encode(message.loanToValue, writer.uint32(18).fork()).ldelim();
    }
    if (message.liquidationThreshold !== undefined) {
      Int64Value.encode(message.liquidationThreshold, writer.uint32(26).fork()).ldelim();
    }
    if (message.liquidationDiscount !== undefined) {
      Int64Value.encode(message.liquidationDiscount, writer.uint32(34).fork()).ldelim();
    }
    if (message.isActive !== undefined) {
      BoolValue.encode(message.isActive, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UpdateEModeCategoryParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateEModeCategoryParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denoms.push(StringValue.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.loanToValue = Int64Value.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.liquidationThreshold = Int64Value.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.liquidationDiscount = Int64Value.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.isActive = BoolValue.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UpdateEModeCategoryParams>): UpdateEModeCategoryParams {
    const message = createBaseUpdateEModeCategoryParams();
    message.denoms = object.denoms?.map(e => StringValue.fromPartial(e)) || [];
    message.loanToValue = object.loanToValue !== undefined && object.loanToValue !== null ? Int64Value.fromPartial(object.loanToValue) : undefined;
    message.liquidationThreshold = object.liquidationThreshold !== undefined && object.liquidationThreshold !== null ? Int64Value.fromPartial(object.liquidationThreshold) : undefined;
    message.liquidationDiscount = object.liquidationDiscount !== undefined && object.liquidationDiscount !== null ? Int64Value.fromPartial(object.liquidationDiscount) : undefined;
    message.isActive = object.isActive !== undefined && object.isActive !== null ? BoolValue.fromPartial(object.isActive) : undefined;
    return message;
  },
  fromAmino(object: UpdateEModeCategoryParamsAmino): UpdateEModeCategoryParams {
    const message = createBaseUpdateEModeCategoryParams();
    message.denoms = object.denoms?.map(e => StringValue.fromAmino(e)) || [];
    if (object.loan_to_value !== undefined && object.loan_to_value !== null) {
      message.loanToValue = Int64Value.fromAmino(object.loan_to_value);
    }
    if (object.liquidation_threshold !== undefined && object.liquidation_threshold !== null) {
      message.liquidationThreshold = Int64Value.fromAmino(object.liquidation_threshold);
    }
    if (object.liquidation_discount !== undefined && object.liquidation_discount !== null) {
      message.liquidationDiscount = Int64Value.fromAmino(object.liquidation_discount);
    }
    if (object.is_active !== undefined && object.is_active !== null) {
      message.isActive = BoolValue.fromAmino(object.is_active);
    }
    return message;
  },
  toAmino(message: UpdateEModeCategoryParams, useInterfaces: boolean = false): UpdateEModeCategoryParamsAmino {
    const obj: any = {};
    if (message.denoms) {
      obj.denoms = message.denoms.map(e => e ? StringValue.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.denoms = message.denoms;
    }
    obj.loan_to_value = message.loanToValue ? Int64Value.toAmino(message.loanToValue, useInterfaces) : undefined;
    obj.liquidation_threshold = message.liquidationThreshold ? Int64Value.toAmino(message.liquidationThreshold, useInterfaces) : undefined;
    obj.liquidation_discount = message.liquidationDiscount ? Int64Value.toAmino(message.liquidationDiscount, useInterfaces) : undefined;
    obj.is_active = message.isActive ? BoolValue.toAmino(message.isActive, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: UpdateEModeCategoryParamsAminoMsg): UpdateEModeCategoryParams {
    return UpdateEModeCategoryParams.fromAmino(object.value);
  },
  fromProtoMsg(message: UpdateEModeCategoryParamsProtoMsg, useInterfaces: boolean = false): UpdateEModeCategoryParams {
    return UpdateEModeCategoryParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UpdateEModeCategoryParams): Uint8Array {
    return UpdateEModeCategoryParams.encode(message).finish();
  },
  toProtoMsg(message: UpdateEModeCategoryParams): UpdateEModeCategoryParamsProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.UpdateEModeCategoryParams",
      value: UpdateEModeCategoryParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateEModeCategoryResponse(): MsgUpdateEModeCategoryResponse {
  return {};
}
export const MsgUpdateEModeCategoryResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateEModeCategoryResponse",
  encode(_: MsgUpdateEModeCategoryResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateEModeCategoryResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateEModeCategoryResponse();
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
  fromPartial(_: Partial<MsgUpdateEModeCategoryResponse>): MsgUpdateEModeCategoryResponse {
    const message = createBaseMsgUpdateEModeCategoryResponse();
    return message;
  },
  fromAmino(_: MsgUpdateEModeCategoryResponseAmino): MsgUpdateEModeCategoryResponse {
    const message = createBaseMsgUpdateEModeCategoryResponse();
    return message;
  },
  toAmino(_: MsgUpdateEModeCategoryResponse, useInterfaces: boolean = false): MsgUpdateEModeCategoryResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateEModeCategoryResponseAminoMsg): MsgUpdateEModeCategoryResponse {
    return MsgUpdateEModeCategoryResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateEModeCategoryResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateEModeCategoryResponse {
    return MsgUpdateEModeCategoryResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateEModeCategoryResponse): Uint8Array {
    return MsgUpdateEModeCategoryResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateEModeCategoryResponse): MsgUpdateEModeCategoryResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgUpdateEModeCategoryResponse",
      value: MsgUpdateEModeCategoryResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetAccountEMode(): MsgSetAccountEMode {
  return {
    creator: "",
    eModeCategoryName: ""
  };
}
export const MsgSetAccountEMode = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetAccountEMode",
  encode(message: MsgSetAccountEMode, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.eModeCategoryName !== "") {
      writer.uint32(18).string(message.eModeCategoryName);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetAccountEMode {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetAccountEMode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.eModeCategoryName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetAccountEMode>): MsgSetAccountEMode {
    const message = createBaseMsgSetAccountEMode();
    message.creator = object.creator ?? "";
    message.eModeCategoryName = object.eModeCategoryName ?? "";
    return message;
  },
  fromAmino(object: MsgSetAccountEModeAmino): MsgSetAccountEMode {
    const message = createBaseMsgSetAccountEMode();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.e_mode_category_name !== undefined && object.e_mode_category_name !== null) {
      message.eModeCategoryName = object.e_mode_category_name;
    }
    return message;
  },
  toAmino(message: MsgSetAccountEMode, useInterfaces: boolean = false): MsgSetAccountEModeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.e_mode_category_name = message.eModeCategoryName === "" ? undefined : message.eModeCategoryName;
    return obj;
  },
  fromAminoMsg(object: MsgSetAccountEModeAminoMsg): MsgSetAccountEMode {
    return MsgSetAccountEMode.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSetAccountEMode, useInterfaces: boolean = false): MsgSetAccountEModeAminoMsg {
    return {
      type: "cdp/SetAccountEMode",
      value: MsgSetAccountEMode.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSetAccountEModeProtoMsg, useInterfaces: boolean = false): MsgSetAccountEMode {
    return MsgSetAccountEMode.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetAccountEMode): Uint8Array {
    return MsgSetAccountEMode.encode(message).finish();
  },
  toProtoMsg(message: MsgSetAccountEMode): MsgSetAccountEModeProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetAccountEMode",
      value: MsgSetAccountEMode.encode(message).finish()
    };
  }
};
function createBaseMsgSetAccountEModeResponse(): MsgSetAccountEModeResponse {
  return {};
}
export const MsgSetAccountEModeResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgSetAccountEModeResponse",
  encode(_: MsgSetAccountEModeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetAccountEModeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetAccountEModeResponse();
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
  fromPartial(_: Partial<MsgSetAccountEModeResponse>): MsgSetAccountEModeResponse {
    const message = createBaseMsgSetAccountEModeResponse();
    return message;
  },
  fromAmino(_: MsgSetAccountEModeResponseAmino): MsgSetAccountEModeResponse {
    const message = createBaseMsgSetAccountEModeResponse();
    return message;
  },
  toAmino(_: MsgSetAccountEModeResponse, useInterfaces: boolean = false): MsgSetAccountEModeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetAccountEModeResponseAminoMsg): MsgSetAccountEModeResponse {
    return MsgSetAccountEModeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetAccountEModeResponseProtoMsg, useInterfaces: boolean = false): MsgSetAccountEModeResponse {
    return MsgSetAccountEModeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetAccountEModeResponse): Uint8Array {
    return MsgSetAccountEModeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetAccountEModeResponse): MsgSetAccountEModeResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgSetAccountEModeResponse",
      value: MsgSetAccountEModeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveAccountEMode(): MsgRemoveAccountEMode {
  return {
    creator: ""
  };
}
export const MsgRemoveAccountEMode = {
  typeUrl: "/Switcheo.carbon.cdp.MsgRemoveAccountEMode",
  encode(message: MsgRemoveAccountEMode, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRemoveAccountEMode {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveAccountEMode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRemoveAccountEMode>): MsgRemoveAccountEMode {
    const message = createBaseMsgRemoveAccountEMode();
    message.creator = object.creator ?? "";
    return message;
  },
  fromAmino(object: MsgRemoveAccountEModeAmino): MsgRemoveAccountEMode {
    const message = createBaseMsgRemoveAccountEMode();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    return message;
  },
  toAmino(message: MsgRemoveAccountEMode, useInterfaces: boolean = false): MsgRemoveAccountEModeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    return obj;
  },
  fromAminoMsg(object: MsgRemoveAccountEModeAminoMsg): MsgRemoveAccountEMode {
    return MsgRemoveAccountEMode.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRemoveAccountEMode, useInterfaces: boolean = false): MsgRemoveAccountEModeAminoMsg {
    return {
      type: "cdp/RemoveAccountEMode",
      value: MsgRemoveAccountEMode.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRemoveAccountEModeProtoMsg, useInterfaces: boolean = false): MsgRemoveAccountEMode {
    return MsgRemoveAccountEMode.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRemoveAccountEMode): Uint8Array {
    return MsgRemoveAccountEMode.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveAccountEMode): MsgRemoveAccountEModeProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgRemoveAccountEMode",
      value: MsgRemoveAccountEMode.encode(message).finish()
    };
  }
};
function createBaseMsgRemoveAccountEModeResponse(): MsgRemoveAccountEModeResponse {
  return {};
}
export const MsgRemoveAccountEModeResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgRemoveAccountEModeResponse",
  encode(_: MsgRemoveAccountEModeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRemoveAccountEModeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRemoveAccountEModeResponse();
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
  fromPartial(_: Partial<MsgRemoveAccountEModeResponse>): MsgRemoveAccountEModeResponse {
    const message = createBaseMsgRemoveAccountEModeResponse();
    return message;
  },
  fromAmino(_: MsgRemoveAccountEModeResponseAmino): MsgRemoveAccountEModeResponse {
    const message = createBaseMsgRemoveAccountEModeResponse();
    return message;
  },
  toAmino(_: MsgRemoveAccountEModeResponse, useInterfaces: boolean = false): MsgRemoveAccountEModeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRemoveAccountEModeResponseAminoMsg): MsgRemoveAccountEModeResponse {
    return MsgRemoveAccountEModeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRemoveAccountEModeResponseProtoMsg, useInterfaces: boolean = false): MsgRemoveAccountEModeResponse {
    return MsgRemoveAccountEModeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRemoveAccountEModeResponse): Uint8Array {
    return MsgRemoveAccountEModeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRemoveAccountEModeResponse): MsgRemoveAccountEModeResponseProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgRemoveAccountEModeResponse",
      value: MsgRemoveAccountEModeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: ParamsToUpdate.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      ParamsToUpdate.encode(message.params, writer.uint32(18).fork()).ldelim();
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
          message.params = ParamsToUpdate.decode(reader, reader.uint32(), useInterfaces);
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
    message.params = object.params !== undefined && object.params !== null ? ParamsToUpdate.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = ParamsToUpdate.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? ParamsToUpdate.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAminoMsg {
    return {
      type: "cdp/MsgUpdateParams",
      value: MsgUpdateParams.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg, useInterfaces: boolean = false): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/Switcheo.carbon.cdp.MsgUpdateParamsResponse",
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
      typeUrl: "/Switcheo.carbon.cdp.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};