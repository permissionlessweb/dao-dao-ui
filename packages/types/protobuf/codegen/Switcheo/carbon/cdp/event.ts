import { RateStrategyParams, RateStrategyParamsAmino, RateStrategyParamsSDKType } from "./rate_strategy_params";
import { AssetParams, AssetParamsAmino, AssetParamsSDKType } from "./asset_params";
import { EModeCategory, EModeCategoryAmino, EModeCategorySDKType } from "./e_mode_category";
import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
import { DebtInfo, DebtInfoAmino, DebtInfoSDKType } from "./debt_info";
import { StablecoinDebtInfo, StablecoinDebtInfoAmino, StablecoinDebtInfoSDKType } from "./stablecoin_debt_info";
import { RewardDebt, RewardDebtAmino, RewardDebtSDKType, RewardScheme, RewardSchemeAmino, RewardSchemeSDKType } from "./reward_scheme";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export interface NewRateStrategyParamsEvent {
  rateStrategyParams: RateStrategyParams | undefined;
  type: string;
}
export interface NewRateStrategyParamsEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.NewRateStrategyParamsEvent";
  value: Uint8Array;
}
export interface NewRateStrategyParamsEventAmino {
  rate_strategy_params?: RateStrategyParamsAmino | undefined;
  type?: string;
}
export interface NewRateStrategyParamsEventAminoMsg {
  type: "/Switcheo.carbon.cdp.NewRateStrategyParamsEvent";
  value: NewRateStrategyParamsEventAmino;
}
export interface NewRateStrategyParamsEventSDKType {
  rate_strategy_params: RateStrategyParamsSDKType | undefined;
  type: string;
}
export interface UpdateRateStrategyParamsEvent {
  rateStrategyParams: RateStrategyParams | undefined;
  type: string;
}
export interface UpdateRateStrategyParamsEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.UpdateRateStrategyParamsEvent";
  value: Uint8Array;
}
export interface UpdateRateStrategyParamsEventAmino {
  rate_strategy_params?: RateStrategyParamsAmino | undefined;
  type?: string;
}
export interface UpdateRateStrategyParamsEventAminoMsg {
  type: "/Switcheo.carbon.cdp.UpdateRateStrategyParamsEvent";
  value: UpdateRateStrategyParamsEventAmino;
}
export interface UpdateRateStrategyParamsEventSDKType {
  rate_strategy_params: RateStrategyParamsSDKType | undefined;
  type: string;
}
export interface RemoveRateStrategyParamsEvent {
  rateStrategyParams: RateStrategyParams | undefined;
  type: string;
}
export interface RemoveRateStrategyParamsEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.RemoveRateStrategyParamsEvent";
  value: Uint8Array;
}
export interface RemoveRateStrategyParamsEventAmino {
  rate_strategy_params?: RateStrategyParamsAmino | undefined;
  type?: string;
}
export interface RemoveRateStrategyParamsEventAminoMsg {
  type: "/Switcheo.carbon.cdp.RemoveRateStrategyParamsEvent";
  value: RemoveRateStrategyParamsEventAmino;
}
export interface RemoveRateStrategyParamsEventSDKType {
  rate_strategy_params: RateStrategyParamsSDKType | undefined;
  type: string;
}
export interface NewAssetParamsEvent {
  assetParams: AssetParams | undefined;
  type: string;
}
export interface NewAssetParamsEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.NewAssetParamsEvent";
  value: Uint8Array;
}
export interface NewAssetParamsEventAmino {
  asset_params?: AssetParamsAmino | undefined;
  type?: string;
}
export interface NewAssetParamsEventAminoMsg {
  type: "/Switcheo.carbon.cdp.NewAssetParamsEvent";
  value: NewAssetParamsEventAmino;
}
export interface NewAssetParamsEventSDKType {
  asset_params: AssetParamsSDKType | undefined;
  type: string;
}
export interface UpdateAssetParamsEvent {
  assetParams: AssetParams | undefined;
  type: string;
}
export interface UpdateAssetParamsEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.UpdateAssetParamsEvent";
  value: Uint8Array;
}
export interface UpdateAssetParamsEventAmino {
  asset_params?: AssetParamsAmino | undefined;
  type?: string;
}
export interface UpdateAssetParamsEventAminoMsg {
  type: "/Switcheo.carbon.cdp.UpdateAssetParamsEvent";
  value: UpdateAssetParamsEventAmino;
}
export interface UpdateAssetParamsEventSDKType {
  asset_params: AssetParamsSDKType | undefined;
  type: string;
}
export interface NewEModeCategoryEvent {
  eModeCategory: EModeCategory | undefined;
  type: string;
}
export interface NewEModeCategoryEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.NewEModeCategoryEvent";
  value: Uint8Array;
}
export interface NewEModeCategoryEventAmino {
  e_mode_category?: EModeCategoryAmino | undefined;
  type?: string;
}
export interface NewEModeCategoryEventAminoMsg {
  type: "/Switcheo.carbon.cdp.NewEModeCategoryEvent";
  value: NewEModeCategoryEventAmino;
}
export interface NewEModeCategoryEventSDKType {
  e_mode_category: EModeCategorySDKType | undefined;
  type: string;
}
export interface UpdateEModeCategoryEvent {
  eModeCategory: EModeCategory | undefined;
  type: string;
}
export interface UpdateEModeCategoryEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.UpdateEModeCategoryEvent";
  value: Uint8Array;
}
export interface UpdateEModeCategoryEventAmino {
  e_mode_category?: EModeCategoryAmino | undefined;
  type?: string;
}
export interface UpdateEModeCategoryEventAminoMsg {
  type: "/Switcheo.carbon.cdp.UpdateEModeCategoryEvent";
  value: UpdateEModeCategoryEventAmino;
}
export interface UpdateEModeCategoryEventSDKType {
  e_mode_category: EModeCategorySDKType | undefined;
  type: string;
}
export interface UpdateAccountEModeCategoryNameEvent {
  account: string;
  eModeCategoryName: string;
}
export interface UpdateAccountEModeCategoryNameEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.UpdateAccountEModeCategoryNameEvent";
  value: Uint8Array;
}
export interface UpdateAccountEModeCategoryNameEventAmino {
  account?: string;
  e_mode_category_name?: string;
}
export interface UpdateAccountEModeCategoryNameEventAminoMsg {
  type: "/Switcheo.carbon.cdp.UpdateAccountEModeCategoryNameEvent";
  value: UpdateAccountEModeCategoryNameEventAmino;
}
export interface UpdateAccountEModeCategoryNameEventSDKType {
  account: string;
  e_mode_category_name: string;
}
export interface SetInterestFeeEvent {
  interestFee: string;
  type: string;
}
export interface SetInterestFeeEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.SetInterestFeeEvent";
  value: Uint8Array;
}
export interface SetInterestFeeEventAmino {
  interest_fee?: string;
  type?: string;
}
export interface SetInterestFeeEventAminoMsg {
  type: "/Switcheo.carbon.cdp.SetInterestFeeEvent";
  value: SetInterestFeeEventAmino;
}
export interface SetInterestFeeEventSDKType {
  interest_fee: string;
  type: string;
}
export interface SetLiquidationFeeEvent {
  liquidationFee: string;
  type: string;
}
export interface SetLiquidationFeeEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.SetLiquidationFeeEvent";
  value: Uint8Array;
}
export interface SetLiquidationFeeEventAmino {
  liquidation_fee?: string;
  type?: string;
}
export interface SetLiquidationFeeEventAminoMsg {
  type: "/Switcheo.carbon.cdp.SetLiquidationFeeEvent";
  value: SetLiquidationFeeEventAmino;
}
export interface SetLiquidationFeeEventSDKType {
  liquidation_fee: string;
  type: string;
}
export interface SetStablecoinInterestRateEvent {
  /** Deprecated for stablecoin_interest_rate_dec */
  stablecoinInterestRate: string;
  type: string;
  stablecoinInterestRateDec: string;
}
export interface SetStablecoinInterestRateEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.SetStablecoinInterestRateEvent";
  value: Uint8Array;
}
export interface SetStablecoinInterestRateEventAmino {
  /** Deprecated for stablecoin_interest_rate_dec */
  stablecoin_interest_rate?: string;
  type?: string;
  stablecoin_interest_rate_dec?: string;
}
export interface SetStablecoinInterestRateEventAminoMsg {
  type: "/Switcheo.carbon.cdp.SetStablecoinInterestRateEvent";
  value: SetStablecoinInterestRateEventAmino;
}
export interface SetStablecoinInterestRateEventSDKType {
  stablecoin_interest_rate: string;
  type: string;
  stablecoin_interest_rate_dec: string;
}
export interface SetStablecoinMintCapEvent {
  stablecoinMintCap: string;
  type: string;
}
export interface SetStablecoinMintCapEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.SetStablecoinMintCapEvent";
  value: Uint8Array;
}
export interface SetStablecoinMintCapEventAmino {
  stablecoin_mint_cap?: string;
  type?: string;
}
export interface SetStablecoinMintCapEventAminoMsg {
  type: "/Switcheo.carbon.cdp.SetStablecoinMintCapEvent";
  value: SetStablecoinMintCapEventAmino;
}
export interface SetStablecoinMintCapEventSDKType {
  stablecoin_mint_cap: string;
  type: string;
}
export interface SetCompleteLiquidationThresholdEvent {
  completeLiquidationThreshold: string;
  type: string;
}
export interface SetCompleteLiquidationThresholdEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.SetCompleteLiquidationThresholdEvent";
  value: Uint8Array;
}
export interface SetCompleteLiquidationThresholdEventAmino {
  complete_liquidation_threshold?: string;
  type?: string;
}
export interface SetCompleteLiquidationThresholdEventAminoMsg {
  type: "/Switcheo.carbon.cdp.SetCompleteLiquidationThresholdEvent";
  value: SetCompleteLiquidationThresholdEventAmino;
}
export interface SetCompleteLiquidationThresholdEventSDKType {
  complete_liquidation_threshold: string;
  type: string;
}
export interface SetMinimumCloseFactorEvent {
  minimumCloseFactor: string;
  type: string;
}
export interface SetMinimumCloseFactorEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.SetMinimumCloseFactorEvent";
  value: Uint8Array;
}
export interface SetMinimumCloseFactorEventAmino {
  minimum_close_factor?: string;
  type?: string;
}
export interface SetMinimumCloseFactorEventAminoMsg {
  type: "/Switcheo.carbon.cdp.SetMinimumCloseFactorEvent";
  value: SetMinimumCloseFactorEventAmino;
}
export interface SetMinimumCloseFactorEventSDKType {
  minimum_close_factor: string;
  type: string;
}
export interface SetSmallLiquidationSizeEvent {
  smallLiquidationSize: string;
  type: string;
}
export interface SetSmallLiquidationSizeEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.SetSmallLiquidationSizeEvent";
  value: Uint8Array;
}
export interface SetSmallLiquidationSizeEventAmino {
  small_liquidation_size?: string;
  type?: string;
}
export interface SetSmallLiquidationSizeEventAminoMsg {
  type: "/Switcheo.carbon.cdp.SetSmallLiquidationSizeEvent";
  value: SetSmallLiquidationSizeEventAmino;
}
export interface SetSmallLiquidationSizeEventSDKType {
  small_liquidation_size: string;
  type: string;
}
export interface SetStalePriceGracePeriodEvent {
  stalePriceGracePeriod: Duration | undefined;
  type: string;
}
export interface SetStalePriceGracePeriodEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.SetStalePriceGracePeriodEvent";
  value: Uint8Array;
}
export interface SetStalePriceGracePeriodEventAmino {
  stale_price_grace_period?: DurationAmino | undefined;
  type?: string;
}
export interface SetStalePriceGracePeriodEventAminoMsg {
  type: "/Switcheo.carbon.cdp.SetStalePriceGracePeriodEvent";
  value: SetStalePriceGracePeriodEventAmino;
}
export interface SetStalePriceGracePeriodEventSDKType {
  stale_price_grace_period: DurationSDKType | undefined;
  type: string;
}
export interface SetCdpPausedEvent {
  cdpPaused: boolean;
  type: string;
}
export interface SetCdpPausedEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.SetCdpPausedEvent";
  value: Uint8Array;
}
export interface SetCdpPausedEventAmino {
  cdp_paused?: boolean;
  type?: string;
}
export interface SetCdpPausedEventAminoMsg {
  type: "/Switcheo.carbon.cdp.SetCdpPausedEvent";
  value: SetCdpPausedEventAmino;
}
export interface SetCdpPausedEventSDKType {
  cdp_paused: boolean;
  type: string;
}
export interface SupplyAssetEvent {
  supplier: string;
  denom: string;
  amountSupplied: string;
  cibtDenom: string;
  amountMinted: string;
}
export interface SupplyAssetEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.SupplyAssetEvent";
  value: Uint8Array;
}
export interface SupplyAssetEventAmino {
  supplier?: string;
  denom?: string;
  amount_supplied?: string;
  cibt_denom?: string;
  amount_minted?: string;
}
export interface SupplyAssetEventAminoMsg {
  type: "/Switcheo.carbon.cdp.SupplyAssetEvent";
  value: SupplyAssetEventAmino;
}
export interface SupplyAssetEventSDKType {
  supplier: string;
  denom: string;
  amount_supplied: string;
  cibt_denom: string;
  amount_minted: string;
}
export interface WithdrawAssetEvent {
  withdrawer: string;
  denom: string;
  amountWithdrawed: string;
  cibtDenom: string;
  amountBurned: string;
}
export interface WithdrawAssetEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.WithdrawAssetEvent";
  value: Uint8Array;
}
export interface WithdrawAssetEventAmino {
  withdrawer?: string;
  denom?: string;
  amount_withdrawed?: string;
  cibt_denom?: string;
  amount_burned?: string;
}
export interface WithdrawAssetEventAminoMsg {
  type: "/Switcheo.carbon.cdp.WithdrawAssetEvent";
  value: WithdrawAssetEventAmino;
}
export interface WithdrawAssetEventSDKType {
  withdrawer: string;
  denom: string;
  amount_withdrawed: string;
  cibt_denom: string;
  amount_burned: string;
}
export interface BorrowAssetEvent {
  borrower: string;
  denom: string;
  amountBorrowed: string;
  debtValue: string;
  collateralValue: string;
  initialCumulativeInterestMultiplier: string;
}
export interface BorrowAssetEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.BorrowAssetEvent";
  value: Uint8Array;
}
export interface BorrowAssetEventAmino {
  borrower?: string;
  denom?: string;
  amount_borrowed?: string;
  debt_value?: string;
  collateral_value?: string;
  initial_cumulative_interest_multiplier?: string;
}
export interface BorrowAssetEventAminoMsg {
  type: "/Switcheo.carbon.cdp.BorrowAssetEvent";
  value: BorrowAssetEventAmino;
}
export interface BorrowAssetEventSDKType {
  borrower: string;
  denom: string;
  amount_borrowed: string;
  debt_value: string;
  collateral_value: string;
  initial_cumulative_interest_multiplier: string;
}
export interface RepayAssetEvent {
  repayer: string;
  debtor: string;
  denom: string;
  principalRepaid: string;
  interestRepaid: string;
  debtValue: string;
  collateralValue: string;
}
export interface RepayAssetEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.RepayAssetEvent";
  value: Uint8Array;
}
export interface RepayAssetEventAmino {
  repayer?: string;
  debtor?: string;
  denom?: string;
  principal_repaid?: string;
  interest_repaid?: string;
  debt_value?: string;
  collateral_value?: string;
}
export interface RepayAssetEventAminoMsg {
  type: "/Switcheo.carbon.cdp.RepayAssetEvent";
  value: RepayAssetEventAmino;
}
export interface RepayAssetEventSDKType {
  repayer: string;
  debtor: string;
  denom: string;
  principal_repaid: string;
  interest_repaid: string;
  debt_value: string;
  collateral_value: string;
}
export interface LockCollateralEvent {
  locker: string;
  cibtDenom: string;
  amountLocked: string;
  debtValue: string;
  collateralValue: string;
}
export interface LockCollateralEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.LockCollateralEvent";
  value: Uint8Array;
}
export interface LockCollateralEventAmino {
  locker?: string;
  cibt_denom?: string;
  amount_locked?: string;
  debt_value?: string;
  collateral_value?: string;
}
export interface LockCollateralEventAminoMsg {
  type: "/Switcheo.carbon.cdp.LockCollateralEvent";
  value: LockCollateralEventAmino;
}
export interface LockCollateralEventSDKType {
  locker: string;
  cibt_denom: string;
  amount_locked: string;
  debt_value: string;
  collateral_value: string;
}
export interface UnlockCollateralEvent {
  unlocker: string;
  cibtDenom: string;
  amountUnlocked: string;
  debtValue: string;
  collateralValue: string;
}
export interface UnlockCollateralEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.UnlockCollateralEvent";
  value: Uint8Array;
}
export interface UnlockCollateralEventAmino {
  unlocker?: string;
  cibt_denom?: string;
  amount_unlocked?: string;
  debt_value?: string;
  collateral_value?: string;
}
export interface UnlockCollateralEventAminoMsg {
  type: "/Switcheo.carbon.cdp.UnlockCollateralEvent";
  value: UnlockCollateralEventAmino;
}
export interface UnlockCollateralEventSDKType {
  unlocker: string;
  cibt_denom: string;
  amount_unlocked: string;
  debt_value: string;
  collateral_value: string;
}
export interface UpdateDebtInfoEvent {
  debtInfo: DebtInfo | undefined;
  type: string;
}
export interface UpdateDebtInfoEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.UpdateDebtInfoEvent";
  value: Uint8Array;
}
export interface UpdateDebtInfoEventAmino {
  debt_info?: DebtInfoAmino | undefined;
  type?: string;
}
export interface UpdateDebtInfoEventAminoMsg {
  type: "/Switcheo.carbon.cdp.UpdateDebtInfoEvent";
  value: UpdateDebtInfoEventAmino;
}
export interface UpdateDebtInfoEventSDKType {
  debt_info: DebtInfoSDKType | undefined;
  type: string;
}
export interface UpdateStablecoinDebtInfoEvent {
  stablecoinDebtInfo: StablecoinDebtInfo | undefined;
  type: string;
}
export interface UpdateStablecoinDebtInfoEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.UpdateStablecoinDebtInfoEvent";
  value: Uint8Array;
}
export interface UpdateStablecoinDebtInfoEventAmino {
  stablecoin_debt_info?: StablecoinDebtInfoAmino | undefined;
  type?: string;
}
export interface UpdateStablecoinDebtInfoEventAminoMsg {
  type: "/Switcheo.carbon.cdp.UpdateStablecoinDebtInfoEvent";
  value: UpdateStablecoinDebtInfoEventAmino;
}
export interface UpdateStablecoinDebtInfoEventSDKType {
  stablecoin_debt_info: StablecoinDebtInfoSDKType | undefined;
  type: string;
}
export interface MintStablecoinEvent {
  minter: string;
  denom: string;
  amountMinted: string;
  debtValue: string;
  collateralValue: string;
  initialCumulativeInterestMultiplier: string;
}
export interface MintStablecoinEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.MintStablecoinEvent";
  value: Uint8Array;
}
export interface MintStablecoinEventAmino {
  minter?: string;
  denom?: string;
  amount_minted?: string;
  debt_value?: string;
  collateral_value?: string;
  initial_cumulative_interest_multiplier?: string;
}
export interface MintStablecoinEventAminoMsg {
  type: "/Switcheo.carbon.cdp.MintStablecoinEvent";
  value: MintStablecoinEventAmino;
}
export interface MintStablecoinEventSDKType {
  minter: string;
  denom: string;
  amount_minted: string;
  debt_value: string;
  collateral_value: string;
  initial_cumulative_interest_multiplier: string;
}
export interface ReturnStablecoinEvent {
  returner: string;
  debtor: string;
  interestDenom: string;
  interestRepaid: string;
  principalRepaid: string;
  debtValue: string;
  collateralValue: string;
}
export interface ReturnStablecoinEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.ReturnStablecoinEvent";
  value: Uint8Array;
}
export interface ReturnStablecoinEventAmino {
  returner?: string;
  debtor?: string;
  interest_denom?: string;
  interest_repaid?: string;
  principal_repaid?: string;
  debt_value?: string;
  collateral_value?: string;
}
export interface ReturnStablecoinEventAminoMsg {
  type: "/Switcheo.carbon.cdp.ReturnStablecoinEvent";
  value: ReturnStablecoinEventAmino;
}
export interface ReturnStablecoinEventSDKType {
  returner: string;
  debtor: string;
  interest_denom: string;
  interest_repaid: string;
  principal_repaid: string;
  debt_value: string;
  collateral_value: string;
}
export interface LiquidateCollateralEvent {
  liquidator: string;
  debtor: string;
  collateralDenom: string;
  collateralAmountLiquidated: string;
  collateralAmountLiquidator: string;
  collateralAmountFee: string;
  liquidationPrice: string;
  marketPrice: string;
  discount: string;
  debtDenom: string;
  debtAmount: string;
  id: bigint;
  principalAmount: string;
  interestDenom: string;
  interestAmount: string;
}
export interface LiquidateCollateralEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.LiquidateCollateralEvent";
  value: Uint8Array;
}
export interface LiquidateCollateralEventAmino {
  liquidator?: string;
  debtor?: string;
  collateral_denom?: string;
  collateral_amount_liquidated?: string;
  collateral_amount_liquidator?: string;
  collateral_amount_fee?: string;
  liquidation_price?: string;
  market_price?: string;
  discount?: string;
  debt_denom?: string;
  debt_amount?: string;
  id?: string;
  principal_amount?: string;
  interest_denom?: string;
  interest_amount?: string;
}
export interface LiquidateCollateralEventAminoMsg {
  type: "/Switcheo.carbon.cdp.LiquidateCollateralEvent";
  value: LiquidateCollateralEventAmino;
}
export interface LiquidateCollateralEventSDKType {
  liquidator: string;
  debtor: string;
  collateral_denom: string;
  collateral_amount_liquidated: string;
  collateral_amount_liquidator: string;
  collateral_amount_fee: string;
  liquidation_price: string;
  market_price: string;
  discount: string;
  debt_denom: string;
  debt_amount: string;
  id: bigint;
  principal_amount: string;
  interest_denom: string;
  interest_amount: string;
}
export interface ClaimRewardEvent {
  receiver: string;
  rewardSchemeId: string;
  rewardClaimed: string;
}
export interface ClaimRewardEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.ClaimRewardEvent";
  value: Uint8Array;
}
export interface ClaimRewardEventAmino {
  receiver?: string;
  reward_scheme_id?: string;
  reward_claimed?: string;
}
export interface ClaimRewardEventAminoMsg {
  type: "/Switcheo.carbon.cdp.ClaimRewardEvent";
  value: ClaimRewardEventAmino;
}
export interface ClaimRewardEventSDKType {
  receiver: string;
  reward_scheme_id: string;
  reward_claimed: string;
}
export interface RewardDebtEvent {
  rewardDebt?: RewardDebt | undefined;
  type: string;
}
export interface RewardDebtEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.RewardDebtEvent";
  value: Uint8Array;
}
export interface RewardDebtEventAmino {
  reward_debt?: RewardDebtAmino | undefined;
  type?: string;
}
export interface RewardDebtEventAminoMsg {
  type: "/Switcheo.carbon.cdp.RewardDebtEvent";
  value: RewardDebtEventAmino;
}
export interface RewardDebtEventSDKType {
  reward_debt?: RewardDebtSDKType | undefined;
  type: string;
}
export interface RewardSchemeEvent {
  rewardScheme?: RewardScheme | undefined;
  type: string;
}
export interface RewardSchemeEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.RewardSchemeEvent";
  value: Uint8Array;
}
export interface RewardSchemeEventAmino {
  reward_scheme?: RewardSchemeAmino | undefined;
  type?: string;
}
export interface RewardSchemeEventAminoMsg {
  type: "/Switcheo.carbon.cdp.RewardSchemeEvent";
  value: RewardSchemeEventAmino;
}
export interface RewardSchemeEventSDKType {
  reward_scheme?: RewardSchemeSDKType | undefined;
  type: string;
}
export interface AddReserveEvent {
  rewardScheme?: RewardScheme | undefined;
  amountAdded: string;
}
export interface AddReserveEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.AddReserveEvent";
  value: Uint8Array;
}
export interface AddReserveEventAmino {
  reward_scheme?: RewardSchemeAmino | undefined;
  amount_added?: string;
}
export interface AddReserveEventAminoMsg {
  type: "/Switcheo.carbon.cdp.AddReserveEvent";
  value: AddReserveEventAmino;
}
export interface AddReserveEventSDKType {
  reward_scheme?: RewardSchemeSDKType | undefined;
  amount_added: string;
}
export interface RefundReserveEvent {
  rewardScheme?: RewardScheme | undefined;
  amountRefunded: string;
}
export interface RefundReserveEventProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.RefundReserveEvent";
  value: Uint8Array;
}
export interface RefundReserveEventAmino {
  reward_scheme?: RewardSchemeAmino | undefined;
  amount_refunded?: string;
}
export interface RefundReserveEventAminoMsg {
  type: "/Switcheo.carbon.cdp.RefundReserveEvent";
  value: RefundReserveEventAmino;
}
export interface RefundReserveEventSDKType {
  reward_scheme?: RewardSchemeSDKType | undefined;
  amount_refunded: string;
}
function createBaseNewRateStrategyParamsEvent(): NewRateStrategyParamsEvent {
  return {
    rateStrategyParams: RateStrategyParams.fromPartial({}),
    type: ""
  };
}
export const NewRateStrategyParamsEvent = {
  typeUrl: "/Switcheo.carbon.cdp.NewRateStrategyParamsEvent",
  encode(message: NewRateStrategyParamsEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rateStrategyParams !== undefined) {
      RateStrategyParams.encode(message.rateStrategyParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): NewRateStrategyParamsEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNewRateStrategyParamsEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rateStrategyParams = RateStrategyParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<NewRateStrategyParamsEvent>): NewRateStrategyParamsEvent {
    const message = createBaseNewRateStrategyParamsEvent();
    message.rateStrategyParams = object.rateStrategyParams !== undefined && object.rateStrategyParams !== null ? RateStrategyParams.fromPartial(object.rateStrategyParams) : undefined;
    message.type = object.type ?? "";
    return message;
  },
  fromAmino(object: NewRateStrategyParamsEventAmino): NewRateStrategyParamsEvent {
    const message = createBaseNewRateStrategyParamsEvent();
    if (object.rate_strategy_params !== undefined && object.rate_strategy_params !== null) {
      message.rateStrategyParams = RateStrategyParams.fromAmino(object.rate_strategy_params);
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: NewRateStrategyParamsEvent, useInterfaces: boolean = false): NewRateStrategyParamsEventAmino {
    const obj: any = {};
    obj.rate_strategy_params = message.rateStrategyParams ? RateStrategyParams.toAmino(message.rateStrategyParams, useInterfaces) : undefined;
    obj.type = message.type === "" ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: NewRateStrategyParamsEventAminoMsg): NewRateStrategyParamsEvent {
    return NewRateStrategyParamsEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: NewRateStrategyParamsEventProtoMsg, useInterfaces: boolean = false): NewRateStrategyParamsEvent {
    return NewRateStrategyParamsEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: NewRateStrategyParamsEvent): Uint8Array {
    return NewRateStrategyParamsEvent.encode(message).finish();
  },
  toProtoMsg(message: NewRateStrategyParamsEvent): NewRateStrategyParamsEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.NewRateStrategyParamsEvent",
      value: NewRateStrategyParamsEvent.encode(message).finish()
    };
  }
};
function createBaseUpdateRateStrategyParamsEvent(): UpdateRateStrategyParamsEvent {
  return {
    rateStrategyParams: RateStrategyParams.fromPartial({}),
    type: ""
  };
}
export const UpdateRateStrategyParamsEvent = {
  typeUrl: "/Switcheo.carbon.cdp.UpdateRateStrategyParamsEvent",
  encode(message: UpdateRateStrategyParamsEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rateStrategyParams !== undefined) {
      RateStrategyParams.encode(message.rateStrategyParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UpdateRateStrategyParamsEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateRateStrategyParamsEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rateStrategyParams = RateStrategyParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UpdateRateStrategyParamsEvent>): UpdateRateStrategyParamsEvent {
    const message = createBaseUpdateRateStrategyParamsEvent();
    message.rateStrategyParams = object.rateStrategyParams !== undefined && object.rateStrategyParams !== null ? RateStrategyParams.fromPartial(object.rateStrategyParams) : undefined;
    message.type = object.type ?? "";
    return message;
  },
  fromAmino(object: UpdateRateStrategyParamsEventAmino): UpdateRateStrategyParamsEvent {
    const message = createBaseUpdateRateStrategyParamsEvent();
    if (object.rate_strategy_params !== undefined && object.rate_strategy_params !== null) {
      message.rateStrategyParams = RateStrategyParams.fromAmino(object.rate_strategy_params);
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: UpdateRateStrategyParamsEvent, useInterfaces: boolean = false): UpdateRateStrategyParamsEventAmino {
    const obj: any = {};
    obj.rate_strategy_params = message.rateStrategyParams ? RateStrategyParams.toAmino(message.rateStrategyParams, useInterfaces) : undefined;
    obj.type = message.type === "" ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: UpdateRateStrategyParamsEventAminoMsg): UpdateRateStrategyParamsEvent {
    return UpdateRateStrategyParamsEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: UpdateRateStrategyParamsEventProtoMsg, useInterfaces: boolean = false): UpdateRateStrategyParamsEvent {
    return UpdateRateStrategyParamsEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UpdateRateStrategyParamsEvent): Uint8Array {
    return UpdateRateStrategyParamsEvent.encode(message).finish();
  },
  toProtoMsg(message: UpdateRateStrategyParamsEvent): UpdateRateStrategyParamsEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.UpdateRateStrategyParamsEvent",
      value: UpdateRateStrategyParamsEvent.encode(message).finish()
    };
  }
};
function createBaseRemoveRateStrategyParamsEvent(): RemoveRateStrategyParamsEvent {
  return {
    rateStrategyParams: RateStrategyParams.fromPartial({}),
    type: ""
  };
}
export const RemoveRateStrategyParamsEvent = {
  typeUrl: "/Switcheo.carbon.cdp.RemoveRateStrategyParamsEvent",
  encode(message: RemoveRateStrategyParamsEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rateStrategyParams !== undefined) {
      RateStrategyParams.encode(message.rateStrategyParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RemoveRateStrategyParamsEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveRateStrategyParamsEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rateStrategyParams = RateStrategyParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RemoveRateStrategyParamsEvent>): RemoveRateStrategyParamsEvent {
    const message = createBaseRemoveRateStrategyParamsEvent();
    message.rateStrategyParams = object.rateStrategyParams !== undefined && object.rateStrategyParams !== null ? RateStrategyParams.fromPartial(object.rateStrategyParams) : undefined;
    message.type = object.type ?? "";
    return message;
  },
  fromAmino(object: RemoveRateStrategyParamsEventAmino): RemoveRateStrategyParamsEvent {
    const message = createBaseRemoveRateStrategyParamsEvent();
    if (object.rate_strategy_params !== undefined && object.rate_strategy_params !== null) {
      message.rateStrategyParams = RateStrategyParams.fromAmino(object.rate_strategy_params);
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: RemoveRateStrategyParamsEvent, useInterfaces: boolean = false): RemoveRateStrategyParamsEventAmino {
    const obj: any = {};
    obj.rate_strategy_params = message.rateStrategyParams ? RateStrategyParams.toAmino(message.rateStrategyParams, useInterfaces) : undefined;
    obj.type = message.type === "" ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: RemoveRateStrategyParamsEventAminoMsg): RemoveRateStrategyParamsEvent {
    return RemoveRateStrategyParamsEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: RemoveRateStrategyParamsEventProtoMsg, useInterfaces: boolean = false): RemoveRateStrategyParamsEvent {
    return RemoveRateStrategyParamsEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RemoveRateStrategyParamsEvent): Uint8Array {
    return RemoveRateStrategyParamsEvent.encode(message).finish();
  },
  toProtoMsg(message: RemoveRateStrategyParamsEvent): RemoveRateStrategyParamsEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.RemoveRateStrategyParamsEvent",
      value: RemoveRateStrategyParamsEvent.encode(message).finish()
    };
  }
};
function createBaseNewAssetParamsEvent(): NewAssetParamsEvent {
  return {
    assetParams: AssetParams.fromPartial({}),
    type: ""
  };
}
export const NewAssetParamsEvent = {
  typeUrl: "/Switcheo.carbon.cdp.NewAssetParamsEvent",
  encode(message: NewAssetParamsEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetParams !== undefined) {
      AssetParams.encode(message.assetParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): NewAssetParamsEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNewAssetParamsEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetParams = AssetParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<NewAssetParamsEvent>): NewAssetParamsEvent {
    const message = createBaseNewAssetParamsEvent();
    message.assetParams = object.assetParams !== undefined && object.assetParams !== null ? AssetParams.fromPartial(object.assetParams) : undefined;
    message.type = object.type ?? "";
    return message;
  },
  fromAmino(object: NewAssetParamsEventAmino): NewAssetParamsEvent {
    const message = createBaseNewAssetParamsEvent();
    if (object.asset_params !== undefined && object.asset_params !== null) {
      message.assetParams = AssetParams.fromAmino(object.asset_params);
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: NewAssetParamsEvent, useInterfaces: boolean = false): NewAssetParamsEventAmino {
    const obj: any = {};
    obj.asset_params = message.assetParams ? AssetParams.toAmino(message.assetParams, useInterfaces) : undefined;
    obj.type = message.type === "" ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: NewAssetParamsEventAminoMsg): NewAssetParamsEvent {
    return NewAssetParamsEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: NewAssetParamsEventProtoMsg, useInterfaces: boolean = false): NewAssetParamsEvent {
    return NewAssetParamsEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: NewAssetParamsEvent): Uint8Array {
    return NewAssetParamsEvent.encode(message).finish();
  },
  toProtoMsg(message: NewAssetParamsEvent): NewAssetParamsEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.NewAssetParamsEvent",
      value: NewAssetParamsEvent.encode(message).finish()
    };
  }
};
function createBaseUpdateAssetParamsEvent(): UpdateAssetParamsEvent {
  return {
    assetParams: AssetParams.fromPartial({}),
    type: ""
  };
}
export const UpdateAssetParamsEvent = {
  typeUrl: "/Switcheo.carbon.cdp.UpdateAssetParamsEvent",
  encode(message: UpdateAssetParamsEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetParams !== undefined) {
      AssetParams.encode(message.assetParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UpdateAssetParamsEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateAssetParamsEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetParams = AssetParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UpdateAssetParamsEvent>): UpdateAssetParamsEvent {
    const message = createBaseUpdateAssetParamsEvent();
    message.assetParams = object.assetParams !== undefined && object.assetParams !== null ? AssetParams.fromPartial(object.assetParams) : undefined;
    message.type = object.type ?? "";
    return message;
  },
  fromAmino(object: UpdateAssetParamsEventAmino): UpdateAssetParamsEvent {
    const message = createBaseUpdateAssetParamsEvent();
    if (object.asset_params !== undefined && object.asset_params !== null) {
      message.assetParams = AssetParams.fromAmino(object.asset_params);
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: UpdateAssetParamsEvent, useInterfaces: boolean = false): UpdateAssetParamsEventAmino {
    const obj: any = {};
    obj.asset_params = message.assetParams ? AssetParams.toAmino(message.assetParams, useInterfaces) : undefined;
    obj.type = message.type === "" ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: UpdateAssetParamsEventAminoMsg): UpdateAssetParamsEvent {
    return UpdateAssetParamsEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: UpdateAssetParamsEventProtoMsg, useInterfaces: boolean = false): UpdateAssetParamsEvent {
    return UpdateAssetParamsEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UpdateAssetParamsEvent): Uint8Array {
    return UpdateAssetParamsEvent.encode(message).finish();
  },
  toProtoMsg(message: UpdateAssetParamsEvent): UpdateAssetParamsEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.UpdateAssetParamsEvent",
      value: UpdateAssetParamsEvent.encode(message).finish()
    };
  }
};
function createBaseNewEModeCategoryEvent(): NewEModeCategoryEvent {
  return {
    eModeCategory: EModeCategory.fromPartial({}),
    type: ""
  };
}
export const NewEModeCategoryEvent = {
  typeUrl: "/Switcheo.carbon.cdp.NewEModeCategoryEvent",
  encode(message: NewEModeCategoryEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.eModeCategory !== undefined) {
      EModeCategory.encode(message.eModeCategory, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): NewEModeCategoryEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNewEModeCategoryEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.eModeCategory = EModeCategory.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<NewEModeCategoryEvent>): NewEModeCategoryEvent {
    const message = createBaseNewEModeCategoryEvent();
    message.eModeCategory = object.eModeCategory !== undefined && object.eModeCategory !== null ? EModeCategory.fromPartial(object.eModeCategory) : undefined;
    message.type = object.type ?? "";
    return message;
  },
  fromAmino(object: NewEModeCategoryEventAmino): NewEModeCategoryEvent {
    const message = createBaseNewEModeCategoryEvent();
    if (object.e_mode_category !== undefined && object.e_mode_category !== null) {
      message.eModeCategory = EModeCategory.fromAmino(object.e_mode_category);
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: NewEModeCategoryEvent, useInterfaces: boolean = false): NewEModeCategoryEventAmino {
    const obj: any = {};
    obj.e_mode_category = message.eModeCategory ? EModeCategory.toAmino(message.eModeCategory, useInterfaces) : undefined;
    obj.type = message.type === "" ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: NewEModeCategoryEventAminoMsg): NewEModeCategoryEvent {
    return NewEModeCategoryEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: NewEModeCategoryEventProtoMsg, useInterfaces: boolean = false): NewEModeCategoryEvent {
    return NewEModeCategoryEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: NewEModeCategoryEvent): Uint8Array {
    return NewEModeCategoryEvent.encode(message).finish();
  },
  toProtoMsg(message: NewEModeCategoryEvent): NewEModeCategoryEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.NewEModeCategoryEvent",
      value: NewEModeCategoryEvent.encode(message).finish()
    };
  }
};
function createBaseUpdateEModeCategoryEvent(): UpdateEModeCategoryEvent {
  return {
    eModeCategory: EModeCategory.fromPartial({}),
    type: ""
  };
}
export const UpdateEModeCategoryEvent = {
  typeUrl: "/Switcheo.carbon.cdp.UpdateEModeCategoryEvent",
  encode(message: UpdateEModeCategoryEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.eModeCategory !== undefined) {
      EModeCategory.encode(message.eModeCategory, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UpdateEModeCategoryEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateEModeCategoryEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.eModeCategory = EModeCategory.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UpdateEModeCategoryEvent>): UpdateEModeCategoryEvent {
    const message = createBaseUpdateEModeCategoryEvent();
    message.eModeCategory = object.eModeCategory !== undefined && object.eModeCategory !== null ? EModeCategory.fromPartial(object.eModeCategory) : undefined;
    message.type = object.type ?? "";
    return message;
  },
  fromAmino(object: UpdateEModeCategoryEventAmino): UpdateEModeCategoryEvent {
    const message = createBaseUpdateEModeCategoryEvent();
    if (object.e_mode_category !== undefined && object.e_mode_category !== null) {
      message.eModeCategory = EModeCategory.fromAmino(object.e_mode_category);
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: UpdateEModeCategoryEvent, useInterfaces: boolean = false): UpdateEModeCategoryEventAmino {
    const obj: any = {};
    obj.e_mode_category = message.eModeCategory ? EModeCategory.toAmino(message.eModeCategory, useInterfaces) : undefined;
    obj.type = message.type === "" ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: UpdateEModeCategoryEventAminoMsg): UpdateEModeCategoryEvent {
    return UpdateEModeCategoryEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: UpdateEModeCategoryEventProtoMsg, useInterfaces: boolean = false): UpdateEModeCategoryEvent {
    return UpdateEModeCategoryEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UpdateEModeCategoryEvent): Uint8Array {
    return UpdateEModeCategoryEvent.encode(message).finish();
  },
  toProtoMsg(message: UpdateEModeCategoryEvent): UpdateEModeCategoryEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.UpdateEModeCategoryEvent",
      value: UpdateEModeCategoryEvent.encode(message).finish()
    };
  }
};
function createBaseUpdateAccountEModeCategoryNameEvent(): UpdateAccountEModeCategoryNameEvent {
  return {
    account: "",
    eModeCategoryName: ""
  };
}
export const UpdateAccountEModeCategoryNameEvent = {
  typeUrl: "/Switcheo.carbon.cdp.UpdateAccountEModeCategoryNameEvent",
  encode(message: UpdateAccountEModeCategoryNameEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.eModeCategoryName !== "") {
      writer.uint32(18).string(message.eModeCategoryName);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UpdateAccountEModeCategoryNameEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateAccountEModeCategoryNameEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
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
  fromPartial(object: Partial<UpdateAccountEModeCategoryNameEvent>): UpdateAccountEModeCategoryNameEvent {
    const message = createBaseUpdateAccountEModeCategoryNameEvent();
    message.account = object.account ?? "";
    message.eModeCategoryName = object.eModeCategoryName ?? "";
    return message;
  },
  fromAmino(object: UpdateAccountEModeCategoryNameEventAmino): UpdateAccountEModeCategoryNameEvent {
    const message = createBaseUpdateAccountEModeCategoryNameEvent();
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    }
    if (object.e_mode_category_name !== undefined && object.e_mode_category_name !== null) {
      message.eModeCategoryName = object.e_mode_category_name;
    }
    return message;
  },
  toAmino(message: UpdateAccountEModeCategoryNameEvent, useInterfaces: boolean = false): UpdateAccountEModeCategoryNameEventAmino {
    const obj: any = {};
    obj.account = message.account === "" ? undefined : message.account;
    obj.e_mode_category_name = message.eModeCategoryName === "" ? undefined : message.eModeCategoryName;
    return obj;
  },
  fromAminoMsg(object: UpdateAccountEModeCategoryNameEventAminoMsg): UpdateAccountEModeCategoryNameEvent {
    return UpdateAccountEModeCategoryNameEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: UpdateAccountEModeCategoryNameEventProtoMsg, useInterfaces: boolean = false): UpdateAccountEModeCategoryNameEvent {
    return UpdateAccountEModeCategoryNameEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UpdateAccountEModeCategoryNameEvent): Uint8Array {
    return UpdateAccountEModeCategoryNameEvent.encode(message).finish();
  },
  toProtoMsg(message: UpdateAccountEModeCategoryNameEvent): UpdateAccountEModeCategoryNameEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.UpdateAccountEModeCategoryNameEvent",
      value: UpdateAccountEModeCategoryNameEvent.encode(message).finish()
    };
  }
};
function createBaseSetInterestFeeEvent(): SetInterestFeeEvent {
  return {
    interestFee: "",
    type: ""
  };
}
export const SetInterestFeeEvent = {
  typeUrl: "/Switcheo.carbon.cdp.SetInterestFeeEvent",
  encode(message: SetInterestFeeEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.interestFee !== "") {
      writer.uint32(10).string(message.interestFee);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SetInterestFeeEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetInterestFeeEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.interestFee = reader.string();
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SetInterestFeeEvent>): SetInterestFeeEvent {
    const message = createBaseSetInterestFeeEvent();
    message.interestFee = object.interestFee ?? "";
    message.type = object.type ?? "";
    return message;
  },
  fromAmino(object: SetInterestFeeEventAmino): SetInterestFeeEvent {
    const message = createBaseSetInterestFeeEvent();
    if (object.interest_fee !== undefined && object.interest_fee !== null) {
      message.interestFee = object.interest_fee;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: SetInterestFeeEvent, useInterfaces: boolean = false): SetInterestFeeEventAmino {
    const obj: any = {};
    obj.interest_fee = message.interestFee === "" ? undefined : message.interestFee;
    obj.type = message.type === "" ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: SetInterestFeeEventAminoMsg): SetInterestFeeEvent {
    return SetInterestFeeEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: SetInterestFeeEventProtoMsg, useInterfaces: boolean = false): SetInterestFeeEvent {
    return SetInterestFeeEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SetInterestFeeEvent): Uint8Array {
    return SetInterestFeeEvent.encode(message).finish();
  },
  toProtoMsg(message: SetInterestFeeEvent): SetInterestFeeEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.SetInterestFeeEvent",
      value: SetInterestFeeEvent.encode(message).finish()
    };
  }
};
function createBaseSetLiquidationFeeEvent(): SetLiquidationFeeEvent {
  return {
    liquidationFee: "",
    type: ""
  };
}
export const SetLiquidationFeeEvent = {
  typeUrl: "/Switcheo.carbon.cdp.SetLiquidationFeeEvent",
  encode(message: SetLiquidationFeeEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.liquidationFee !== "") {
      writer.uint32(10).string(message.liquidationFee);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SetLiquidationFeeEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetLiquidationFeeEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidationFee = reader.string();
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SetLiquidationFeeEvent>): SetLiquidationFeeEvent {
    const message = createBaseSetLiquidationFeeEvent();
    message.liquidationFee = object.liquidationFee ?? "";
    message.type = object.type ?? "";
    return message;
  },
  fromAmino(object: SetLiquidationFeeEventAmino): SetLiquidationFeeEvent {
    const message = createBaseSetLiquidationFeeEvent();
    if (object.liquidation_fee !== undefined && object.liquidation_fee !== null) {
      message.liquidationFee = object.liquidation_fee;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: SetLiquidationFeeEvent, useInterfaces: boolean = false): SetLiquidationFeeEventAmino {
    const obj: any = {};
    obj.liquidation_fee = message.liquidationFee === "" ? undefined : message.liquidationFee;
    obj.type = message.type === "" ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: SetLiquidationFeeEventAminoMsg): SetLiquidationFeeEvent {
    return SetLiquidationFeeEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: SetLiquidationFeeEventProtoMsg, useInterfaces: boolean = false): SetLiquidationFeeEvent {
    return SetLiquidationFeeEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SetLiquidationFeeEvent): Uint8Array {
    return SetLiquidationFeeEvent.encode(message).finish();
  },
  toProtoMsg(message: SetLiquidationFeeEvent): SetLiquidationFeeEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.SetLiquidationFeeEvent",
      value: SetLiquidationFeeEvent.encode(message).finish()
    };
  }
};
function createBaseSetStablecoinInterestRateEvent(): SetStablecoinInterestRateEvent {
  return {
    stablecoinInterestRate: "",
    type: "",
    stablecoinInterestRateDec: ""
  };
}
export const SetStablecoinInterestRateEvent = {
  typeUrl: "/Switcheo.carbon.cdp.SetStablecoinInterestRateEvent",
  encode(message: SetStablecoinInterestRateEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.stablecoinInterestRate !== "") {
      writer.uint32(10).string(message.stablecoinInterestRate);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    if (message.stablecoinInterestRateDec !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.stablecoinInterestRateDec, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SetStablecoinInterestRateEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetStablecoinInterestRateEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stablecoinInterestRate = reader.string();
          break;
        case 2:
          message.type = reader.string();
          break;
        case 3:
          message.stablecoinInterestRateDec = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SetStablecoinInterestRateEvent>): SetStablecoinInterestRateEvent {
    const message = createBaseSetStablecoinInterestRateEvent();
    message.stablecoinInterestRate = object.stablecoinInterestRate ?? "";
    message.type = object.type ?? "";
    message.stablecoinInterestRateDec = object.stablecoinInterestRateDec ?? "";
    return message;
  },
  fromAmino(object: SetStablecoinInterestRateEventAmino): SetStablecoinInterestRateEvent {
    const message = createBaseSetStablecoinInterestRateEvent();
    if (object.stablecoin_interest_rate !== undefined && object.stablecoin_interest_rate !== null) {
      message.stablecoinInterestRate = object.stablecoin_interest_rate;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    if (object.stablecoin_interest_rate_dec !== undefined && object.stablecoin_interest_rate_dec !== null) {
      message.stablecoinInterestRateDec = object.stablecoin_interest_rate_dec;
    }
    return message;
  },
  toAmino(message: SetStablecoinInterestRateEvent, useInterfaces: boolean = false): SetStablecoinInterestRateEventAmino {
    const obj: any = {};
    obj.stablecoin_interest_rate = message.stablecoinInterestRate === "" ? undefined : message.stablecoinInterestRate;
    obj.type = message.type === "" ? undefined : message.type;
    obj.stablecoin_interest_rate_dec = message.stablecoinInterestRateDec === "" ? undefined : message.stablecoinInterestRateDec;
    return obj;
  },
  fromAminoMsg(object: SetStablecoinInterestRateEventAminoMsg): SetStablecoinInterestRateEvent {
    return SetStablecoinInterestRateEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: SetStablecoinInterestRateEventProtoMsg, useInterfaces: boolean = false): SetStablecoinInterestRateEvent {
    return SetStablecoinInterestRateEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SetStablecoinInterestRateEvent): Uint8Array {
    return SetStablecoinInterestRateEvent.encode(message).finish();
  },
  toProtoMsg(message: SetStablecoinInterestRateEvent): SetStablecoinInterestRateEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.SetStablecoinInterestRateEvent",
      value: SetStablecoinInterestRateEvent.encode(message).finish()
    };
  }
};
function createBaseSetStablecoinMintCapEvent(): SetStablecoinMintCapEvent {
  return {
    stablecoinMintCap: "",
    type: ""
  };
}
export const SetStablecoinMintCapEvent = {
  typeUrl: "/Switcheo.carbon.cdp.SetStablecoinMintCapEvent",
  encode(message: SetStablecoinMintCapEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.stablecoinMintCap !== "") {
      writer.uint32(10).string(message.stablecoinMintCap);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SetStablecoinMintCapEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetStablecoinMintCapEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stablecoinMintCap = reader.string();
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SetStablecoinMintCapEvent>): SetStablecoinMintCapEvent {
    const message = createBaseSetStablecoinMintCapEvent();
    message.stablecoinMintCap = object.stablecoinMintCap ?? "";
    message.type = object.type ?? "";
    return message;
  },
  fromAmino(object: SetStablecoinMintCapEventAmino): SetStablecoinMintCapEvent {
    const message = createBaseSetStablecoinMintCapEvent();
    if (object.stablecoin_mint_cap !== undefined && object.stablecoin_mint_cap !== null) {
      message.stablecoinMintCap = object.stablecoin_mint_cap;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: SetStablecoinMintCapEvent, useInterfaces: boolean = false): SetStablecoinMintCapEventAmino {
    const obj: any = {};
    obj.stablecoin_mint_cap = message.stablecoinMintCap === "" ? undefined : message.stablecoinMintCap;
    obj.type = message.type === "" ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: SetStablecoinMintCapEventAminoMsg): SetStablecoinMintCapEvent {
    return SetStablecoinMintCapEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: SetStablecoinMintCapEventProtoMsg, useInterfaces: boolean = false): SetStablecoinMintCapEvent {
    return SetStablecoinMintCapEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SetStablecoinMintCapEvent): Uint8Array {
    return SetStablecoinMintCapEvent.encode(message).finish();
  },
  toProtoMsg(message: SetStablecoinMintCapEvent): SetStablecoinMintCapEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.SetStablecoinMintCapEvent",
      value: SetStablecoinMintCapEvent.encode(message).finish()
    };
  }
};
function createBaseSetCompleteLiquidationThresholdEvent(): SetCompleteLiquidationThresholdEvent {
  return {
    completeLiquidationThreshold: "",
    type: ""
  };
}
export const SetCompleteLiquidationThresholdEvent = {
  typeUrl: "/Switcheo.carbon.cdp.SetCompleteLiquidationThresholdEvent",
  encode(message: SetCompleteLiquidationThresholdEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.completeLiquidationThreshold !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.completeLiquidationThreshold, 18).atomics);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SetCompleteLiquidationThresholdEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetCompleteLiquidationThresholdEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.completeLiquidationThreshold = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SetCompleteLiquidationThresholdEvent>): SetCompleteLiquidationThresholdEvent {
    const message = createBaseSetCompleteLiquidationThresholdEvent();
    message.completeLiquidationThreshold = object.completeLiquidationThreshold ?? "";
    message.type = object.type ?? "";
    return message;
  },
  fromAmino(object: SetCompleteLiquidationThresholdEventAmino): SetCompleteLiquidationThresholdEvent {
    const message = createBaseSetCompleteLiquidationThresholdEvent();
    if (object.complete_liquidation_threshold !== undefined && object.complete_liquidation_threshold !== null) {
      message.completeLiquidationThreshold = object.complete_liquidation_threshold;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: SetCompleteLiquidationThresholdEvent, useInterfaces: boolean = false): SetCompleteLiquidationThresholdEventAmino {
    const obj: any = {};
    obj.complete_liquidation_threshold = message.completeLiquidationThreshold === "" ? undefined : message.completeLiquidationThreshold;
    obj.type = message.type === "" ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: SetCompleteLiquidationThresholdEventAminoMsg): SetCompleteLiquidationThresholdEvent {
    return SetCompleteLiquidationThresholdEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: SetCompleteLiquidationThresholdEventProtoMsg, useInterfaces: boolean = false): SetCompleteLiquidationThresholdEvent {
    return SetCompleteLiquidationThresholdEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SetCompleteLiquidationThresholdEvent): Uint8Array {
    return SetCompleteLiquidationThresholdEvent.encode(message).finish();
  },
  toProtoMsg(message: SetCompleteLiquidationThresholdEvent): SetCompleteLiquidationThresholdEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.SetCompleteLiquidationThresholdEvent",
      value: SetCompleteLiquidationThresholdEvent.encode(message).finish()
    };
  }
};
function createBaseSetMinimumCloseFactorEvent(): SetMinimumCloseFactorEvent {
  return {
    minimumCloseFactor: "",
    type: ""
  };
}
export const SetMinimumCloseFactorEvent = {
  typeUrl: "/Switcheo.carbon.cdp.SetMinimumCloseFactorEvent",
  encode(message: SetMinimumCloseFactorEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.minimumCloseFactor !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.minimumCloseFactor, 18).atomics);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SetMinimumCloseFactorEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetMinimumCloseFactorEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.minimumCloseFactor = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SetMinimumCloseFactorEvent>): SetMinimumCloseFactorEvent {
    const message = createBaseSetMinimumCloseFactorEvent();
    message.minimumCloseFactor = object.minimumCloseFactor ?? "";
    message.type = object.type ?? "";
    return message;
  },
  fromAmino(object: SetMinimumCloseFactorEventAmino): SetMinimumCloseFactorEvent {
    const message = createBaseSetMinimumCloseFactorEvent();
    if (object.minimum_close_factor !== undefined && object.minimum_close_factor !== null) {
      message.minimumCloseFactor = object.minimum_close_factor;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: SetMinimumCloseFactorEvent, useInterfaces: boolean = false): SetMinimumCloseFactorEventAmino {
    const obj: any = {};
    obj.minimum_close_factor = message.minimumCloseFactor === "" ? undefined : message.minimumCloseFactor;
    obj.type = message.type === "" ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: SetMinimumCloseFactorEventAminoMsg): SetMinimumCloseFactorEvent {
    return SetMinimumCloseFactorEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: SetMinimumCloseFactorEventProtoMsg, useInterfaces: boolean = false): SetMinimumCloseFactorEvent {
    return SetMinimumCloseFactorEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SetMinimumCloseFactorEvent): Uint8Array {
    return SetMinimumCloseFactorEvent.encode(message).finish();
  },
  toProtoMsg(message: SetMinimumCloseFactorEvent): SetMinimumCloseFactorEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.SetMinimumCloseFactorEvent",
      value: SetMinimumCloseFactorEvent.encode(message).finish()
    };
  }
};
function createBaseSetSmallLiquidationSizeEvent(): SetSmallLiquidationSizeEvent {
  return {
    smallLiquidationSize: "",
    type: ""
  };
}
export const SetSmallLiquidationSizeEvent = {
  typeUrl: "/Switcheo.carbon.cdp.SetSmallLiquidationSizeEvent",
  encode(message: SetSmallLiquidationSizeEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.smallLiquidationSize !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.smallLiquidationSize, 18).atomics);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SetSmallLiquidationSizeEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetSmallLiquidationSizeEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.smallLiquidationSize = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SetSmallLiquidationSizeEvent>): SetSmallLiquidationSizeEvent {
    const message = createBaseSetSmallLiquidationSizeEvent();
    message.smallLiquidationSize = object.smallLiquidationSize ?? "";
    message.type = object.type ?? "";
    return message;
  },
  fromAmino(object: SetSmallLiquidationSizeEventAmino): SetSmallLiquidationSizeEvent {
    const message = createBaseSetSmallLiquidationSizeEvent();
    if (object.small_liquidation_size !== undefined && object.small_liquidation_size !== null) {
      message.smallLiquidationSize = object.small_liquidation_size;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: SetSmallLiquidationSizeEvent, useInterfaces: boolean = false): SetSmallLiquidationSizeEventAmino {
    const obj: any = {};
    obj.small_liquidation_size = message.smallLiquidationSize === "" ? undefined : message.smallLiquidationSize;
    obj.type = message.type === "" ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: SetSmallLiquidationSizeEventAminoMsg): SetSmallLiquidationSizeEvent {
    return SetSmallLiquidationSizeEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: SetSmallLiquidationSizeEventProtoMsg, useInterfaces: boolean = false): SetSmallLiquidationSizeEvent {
    return SetSmallLiquidationSizeEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SetSmallLiquidationSizeEvent): Uint8Array {
    return SetSmallLiquidationSizeEvent.encode(message).finish();
  },
  toProtoMsg(message: SetSmallLiquidationSizeEvent): SetSmallLiquidationSizeEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.SetSmallLiquidationSizeEvent",
      value: SetSmallLiquidationSizeEvent.encode(message).finish()
    };
  }
};
function createBaseSetStalePriceGracePeriodEvent(): SetStalePriceGracePeriodEvent {
  return {
    stalePriceGracePeriod: Duration.fromPartial({}),
    type: ""
  };
}
export const SetStalePriceGracePeriodEvent = {
  typeUrl: "/Switcheo.carbon.cdp.SetStalePriceGracePeriodEvent",
  encode(message: SetStalePriceGracePeriodEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.stalePriceGracePeriod !== undefined) {
      Duration.encode(message.stalePriceGracePeriod, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SetStalePriceGracePeriodEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetStalePriceGracePeriodEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stalePriceGracePeriod = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SetStalePriceGracePeriodEvent>): SetStalePriceGracePeriodEvent {
    const message = createBaseSetStalePriceGracePeriodEvent();
    message.stalePriceGracePeriod = object.stalePriceGracePeriod !== undefined && object.stalePriceGracePeriod !== null ? Duration.fromPartial(object.stalePriceGracePeriod) : undefined;
    message.type = object.type ?? "";
    return message;
  },
  fromAmino(object: SetStalePriceGracePeriodEventAmino): SetStalePriceGracePeriodEvent {
    const message = createBaseSetStalePriceGracePeriodEvent();
    if (object.stale_price_grace_period !== undefined && object.stale_price_grace_period !== null) {
      message.stalePriceGracePeriod = Duration.fromAmino(object.stale_price_grace_period);
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: SetStalePriceGracePeriodEvent, useInterfaces: boolean = false): SetStalePriceGracePeriodEventAmino {
    const obj: any = {};
    obj.stale_price_grace_period = message.stalePriceGracePeriod ? Duration.toAmino(message.stalePriceGracePeriod, useInterfaces) : undefined;
    obj.type = message.type === "" ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: SetStalePriceGracePeriodEventAminoMsg): SetStalePriceGracePeriodEvent {
    return SetStalePriceGracePeriodEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: SetStalePriceGracePeriodEventProtoMsg, useInterfaces: boolean = false): SetStalePriceGracePeriodEvent {
    return SetStalePriceGracePeriodEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SetStalePriceGracePeriodEvent): Uint8Array {
    return SetStalePriceGracePeriodEvent.encode(message).finish();
  },
  toProtoMsg(message: SetStalePriceGracePeriodEvent): SetStalePriceGracePeriodEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.SetStalePriceGracePeriodEvent",
      value: SetStalePriceGracePeriodEvent.encode(message).finish()
    };
  }
};
function createBaseSetCdpPausedEvent(): SetCdpPausedEvent {
  return {
    cdpPaused: false,
    type: ""
  };
}
export const SetCdpPausedEvent = {
  typeUrl: "/Switcheo.carbon.cdp.SetCdpPausedEvent",
  encode(message: SetCdpPausedEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.cdpPaused === true) {
      writer.uint32(8).bool(message.cdpPaused);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SetCdpPausedEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSetCdpPausedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cdpPaused = reader.bool();
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SetCdpPausedEvent>): SetCdpPausedEvent {
    const message = createBaseSetCdpPausedEvent();
    message.cdpPaused = object.cdpPaused ?? false;
    message.type = object.type ?? "";
    return message;
  },
  fromAmino(object: SetCdpPausedEventAmino): SetCdpPausedEvent {
    const message = createBaseSetCdpPausedEvent();
    if (object.cdp_paused !== undefined && object.cdp_paused !== null) {
      message.cdpPaused = object.cdp_paused;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: SetCdpPausedEvent, useInterfaces: boolean = false): SetCdpPausedEventAmino {
    const obj: any = {};
    obj.cdp_paused = message.cdpPaused === false ? undefined : message.cdpPaused;
    obj.type = message.type === "" ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: SetCdpPausedEventAminoMsg): SetCdpPausedEvent {
    return SetCdpPausedEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: SetCdpPausedEventProtoMsg, useInterfaces: boolean = false): SetCdpPausedEvent {
    return SetCdpPausedEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SetCdpPausedEvent): Uint8Array {
    return SetCdpPausedEvent.encode(message).finish();
  },
  toProtoMsg(message: SetCdpPausedEvent): SetCdpPausedEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.SetCdpPausedEvent",
      value: SetCdpPausedEvent.encode(message).finish()
    };
  }
};
function createBaseSupplyAssetEvent(): SupplyAssetEvent {
  return {
    supplier: "",
    denom: "",
    amountSupplied: "",
    cibtDenom: "",
    amountMinted: ""
  };
}
export const SupplyAssetEvent = {
  typeUrl: "/Switcheo.carbon.cdp.SupplyAssetEvent",
  encode(message: SupplyAssetEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.supplier !== "") {
      writer.uint32(10).string(message.supplier);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.amountSupplied !== "") {
      writer.uint32(26).string(message.amountSupplied);
    }
    if (message.cibtDenom !== "") {
      writer.uint32(34).string(message.cibtDenom);
    }
    if (message.amountMinted !== "") {
      writer.uint32(42).string(message.amountMinted);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SupplyAssetEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSupplyAssetEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.supplier = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.amountSupplied = reader.string();
          break;
        case 4:
          message.cibtDenom = reader.string();
          break;
        case 5:
          message.amountMinted = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SupplyAssetEvent>): SupplyAssetEvent {
    const message = createBaseSupplyAssetEvent();
    message.supplier = object.supplier ?? "";
    message.denom = object.denom ?? "";
    message.amountSupplied = object.amountSupplied ?? "";
    message.cibtDenom = object.cibtDenom ?? "";
    message.amountMinted = object.amountMinted ?? "";
    return message;
  },
  fromAmino(object: SupplyAssetEventAmino): SupplyAssetEvent {
    const message = createBaseSupplyAssetEvent();
    if (object.supplier !== undefined && object.supplier !== null) {
      message.supplier = object.supplier;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.amount_supplied !== undefined && object.amount_supplied !== null) {
      message.amountSupplied = object.amount_supplied;
    }
    if (object.cibt_denom !== undefined && object.cibt_denom !== null) {
      message.cibtDenom = object.cibt_denom;
    }
    if (object.amount_minted !== undefined && object.amount_minted !== null) {
      message.amountMinted = object.amount_minted;
    }
    return message;
  },
  toAmino(message: SupplyAssetEvent, useInterfaces: boolean = false): SupplyAssetEventAmino {
    const obj: any = {};
    obj.supplier = message.supplier === "" ? undefined : message.supplier;
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.amount_supplied = message.amountSupplied === "" ? undefined : message.amountSupplied;
    obj.cibt_denom = message.cibtDenom === "" ? undefined : message.cibtDenom;
    obj.amount_minted = message.amountMinted === "" ? undefined : message.amountMinted;
    return obj;
  },
  fromAminoMsg(object: SupplyAssetEventAminoMsg): SupplyAssetEvent {
    return SupplyAssetEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: SupplyAssetEventProtoMsg, useInterfaces: boolean = false): SupplyAssetEvent {
    return SupplyAssetEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SupplyAssetEvent): Uint8Array {
    return SupplyAssetEvent.encode(message).finish();
  },
  toProtoMsg(message: SupplyAssetEvent): SupplyAssetEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.SupplyAssetEvent",
      value: SupplyAssetEvent.encode(message).finish()
    };
  }
};
function createBaseWithdrawAssetEvent(): WithdrawAssetEvent {
  return {
    withdrawer: "",
    denom: "",
    amountWithdrawed: "",
    cibtDenom: "",
    amountBurned: ""
  };
}
export const WithdrawAssetEvent = {
  typeUrl: "/Switcheo.carbon.cdp.WithdrawAssetEvent",
  encode(message: WithdrawAssetEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.withdrawer !== "") {
      writer.uint32(10).string(message.withdrawer);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.amountWithdrawed !== "") {
      writer.uint32(26).string(message.amountWithdrawed);
    }
    if (message.cibtDenom !== "") {
      writer.uint32(34).string(message.cibtDenom);
    }
    if (message.amountBurned !== "") {
      writer.uint32(42).string(message.amountBurned);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): WithdrawAssetEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithdrawAssetEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.withdrawer = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.amountWithdrawed = reader.string();
          break;
        case 4:
          message.cibtDenom = reader.string();
          break;
        case 5:
          message.amountBurned = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<WithdrawAssetEvent>): WithdrawAssetEvent {
    const message = createBaseWithdrawAssetEvent();
    message.withdrawer = object.withdrawer ?? "";
    message.denom = object.denom ?? "";
    message.amountWithdrawed = object.amountWithdrawed ?? "";
    message.cibtDenom = object.cibtDenom ?? "";
    message.amountBurned = object.amountBurned ?? "";
    return message;
  },
  fromAmino(object: WithdrawAssetEventAmino): WithdrawAssetEvent {
    const message = createBaseWithdrawAssetEvent();
    if (object.withdrawer !== undefined && object.withdrawer !== null) {
      message.withdrawer = object.withdrawer;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.amount_withdrawed !== undefined && object.amount_withdrawed !== null) {
      message.amountWithdrawed = object.amount_withdrawed;
    }
    if (object.cibt_denom !== undefined && object.cibt_denom !== null) {
      message.cibtDenom = object.cibt_denom;
    }
    if (object.amount_burned !== undefined && object.amount_burned !== null) {
      message.amountBurned = object.amount_burned;
    }
    return message;
  },
  toAmino(message: WithdrawAssetEvent, useInterfaces: boolean = false): WithdrawAssetEventAmino {
    const obj: any = {};
    obj.withdrawer = message.withdrawer === "" ? undefined : message.withdrawer;
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.amount_withdrawed = message.amountWithdrawed === "" ? undefined : message.amountWithdrawed;
    obj.cibt_denom = message.cibtDenom === "" ? undefined : message.cibtDenom;
    obj.amount_burned = message.amountBurned === "" ? undefined : message.amountBurned;
    return obj;
  },
  fromAminoMsg(object: WithdrawAssetEventAminoMsg): WithdrawAssetEvent {
    return WithdrawAssetEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: WithdrawAssetEventProtoMsg, useInterfaces: boolean = false): WithdrawAssetEvent {
    return WithdrawAssetEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: WithdrawAssetEvent): Uint8Array {
    return WithdrawAssetEvent.encode(message).finish();
  },
  toProtoMsg(message: WithdrawAssetEvent): WithdrawAssetEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.WithdrawAssetEvent",
      value: WithdrawAssetEvent.encode(message).finish()
    };
  }
};
function createBaseBorrowAssetEvent(): BorrowAssetEvent {
  return {
    borrower: "",
    denom: "",
    amountBorrowed: "",
    debtValue: "",
    collateralValue: "",
    initialCumulativeInterestMultiplier: ""
  };
}
export const BorrowAssetEvent = {
  typeUrl: "/Switcheo.carbon.cdp.BorrowAssetEvent",
  encode(message: BorrowAssetEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.borrower !== "") {
      writer.uint32(10).string(message.borrower);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.amountBorrowed !== "") {
      writer.uint32(26).string(message.amountBorrowed);
    }
    if (message.debtValue !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.debtValue, 18).atomics);
    }
    if (message.collateralValue !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.collateralValue, 18).atomics);
    }
    if (message.initialCumulativeInterestMultiplier !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.initialCumulativeInterestMultiplier, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BorrowAssetEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBorrowAssetEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrower = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.amountBorrowed = reader.string();
          break;
        case 4:
          message.debtValue = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.collateralValue = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.initialCumulativeInterestMultiplier = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BorrowAssetEvent>): BorrowAssetEvent {
    const message = createBaseBorrowAssetEvent();
    message.borrower = object.borrower ?? "";
    message.denom = object.denom ?? "";
    message.amountBorrowed = object.amountBorrowed ?? "";
    message.debtValue = object.debtValue ?? "";
    message.collateralValue = object.collateralValue ?? "";
    message.initialCumulativeInterestMultiplier = object.initialCumulativeInterestMultiplier ?? "";
    return message;
  },
  fromAmino(object: BorrowAssetEventAmino): BorrowAssetEvent {
    const message = createBaseBorrowAssetEvent();
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.amount_borrowed !== undefined && object.amount_borrowed !== null) {
      message.amountBorrowed = object.amount_borrowed;
    }
    if (object.debt_value !== undefined && object.debt_value !== null) {
      message.debtValue = object.debt_value;
    }
    if (object.collateral_value !== undefined && object.collateral_value !== null) {
      message.collateralValue = object.collateral_value;
    }
    if (object.initial_cumulative_interest_multiplier !== undefined && object.initial_cumulative_interest_multiplier !== null) {
      message.initialCumulativeInterestMultiplier = object.initial_cumulative_interest_multiplier;
    }
    return message;
  },
  toAmino(message: BorrowAssetEvent, useInterfaces: boolean = false): BorrowAssetEventAmino {
    const obj: any = {};
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.amount_borrowed = message.amountBorrowed === "" ? undefined : message.amountBorrowed;
    obj.debt_value = message.debtValue === "" ? undefined : message.debtValue;
    obj.collateral_value = message.collateralValue === "" ? undefined : message.collateralValue;
    obj.initial_cumulative_interest_multiplier = message.initialCumulativeInterestMultiplier === "" ? undefined : message.initialCumulativeInterestMultiplier;
    return obj;
  },
  fromAminoMsg(object: BorrowAssetEventAminoMsg): BorrowAssetEvent {
    return BorrowAssetEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: BorrowAssetEventProtoMsg, useInterfaces: boolean = false): BorrowAssetEvent {
    return BorrowAssetEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BorrowAssetEvent): Uint8Array {
    return BorrowAssetEvent.encode(message).finish();
  },
  toProtoMsg(message: BorrowAssetEvent): BorrowAssetEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.BorrowAssetEvent",
      value: BorrowAssetEvent.encode(message).finish()
    };
  }
};
function createBaseRepayAssetEvent(): RepayAssetEvent {
  return {
    repayer: "",
    debtor: "",
    denom: "",
    principalRepaid: "",
    interestRepaid: "",
    debtValue: "",
    collateralValue: ""
  };
}
export const RepayAssetEvent = {
  typeUrl: "/Switcheo.carbon.cdp.RepayAssetEvent",
  encode(message: RepayAssetEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.repayer !== "") {
      writer.uint32(10).string(message.repayer);
    }
    if (message.debtor !== "") {
      writer.uint32(18).string(message.debtor);
    }
    if (message.denom !== "") {
      writer.uint32(26).string(message.denom);
    }
    if (message.principalRepaid !== "") {
      writer.uint32(34).string(message.principalRepaid);
    }
    if (message.interestRepaid !== "") {
      writer.uint32(42).string(message.interestRepaid);
    }
    if (message.debtValue !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.debtValue, 18).atomics);
    }
    if (message.collateralValue !== "") {
      writer.uint32(58).string(Decimal.fromUserInput(message.collateralValue, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RepayAssetEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRepayAssetEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.repayer = reader.string();
          break;
        case 2:
          message.debtor = reader.string();
          break;
        case 3:
          message.denom = reader.string();
          break;
        case 4:
          message.principalRepaid = reader.string();
          break;
        case 5:
          message.interestRepaid = reader.string();
          break;
        case 6:
          message.debtValue = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.collateralValue = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RepayAssetEvent>): RepayAssetEvent {
    const message = createBaseRepayAssetEvent();
    message.repayer = object.repayer ?? "";
    message.debtor = object.debtor ?? "";
    message.denom = object.denom ?? "";
    message.principalRepaid = object.principalRepaid ?? "";
    message.interestRepaid = object.interestRepaid ?? "";
    message.debtValue = object.debtValue ?? "";
    message.collateralValue = object.collateralValue ?? "";
    return message;
  },
  fromAmino(object: RepayAssetEventAmino): RepayAssetEvent {
    const message = createBaseRepayAssetEvent();
    if (object.repayer !== undefined && object.repayer !== null) {
      message.repayer = object.repayer;
    }
    if (object.debtor !== undefined && object.debtor !== null) {
      message.debtor = object.debtor;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.principal_repaid !== undefined && object.principal_repaid !== null) {
      message.principalRepaid = object.principal_repaid;
    }
    if (object.interest_repaid !== undefined && object.interest_repaid !== null) {
      message.interestRepaid = object.interest_repaid;
    }
    if (object.debt_value !== undefined && object.debt_value !== null) {
      message.debtValue = object.debt_value;
    }
    if (object.collateral_value !== undefined && object.collateral_value !== null) {
      message.collateralValue = object.collateral_value;
    }
    return message;
  },
  toAmino(message: RepayAssetEvent, useInterfaces: boolean = false): RepayAssetEventAmino {
    const obj: any = {};
    obj.repayer = message.repayer === "" ? undefined : message.repayer;
    obj.debtor = message.debtor === "" ? undefined : message.debtor;
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.principal_repaid = message.principalRepaid === "" ? undefined : message.principalRepaid;
    obj.interest_repaid = message.interestRepaid === "" ? undefined : message.interestRepaid;
    obj.debt_value = message.debtValue === "" ? undefined : message.debtValue;
    obj.collateral_value = message.collateralValue === "" ? undefined : message.collateralValue;
    return obj;
  },
  fromAminoMsg(object: RepayAssetEventAminoMsg): RepayAssetEvent {
    return RepayAssetEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: RepayAssetEventProtoMsg, useInterfaces: boolean = false): RepayAssetEvent {
    return RepayAssetEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RepayAssetEvent): Uint8Array {
    return RepayAssetEvent.encode(message).finish();
  },
  toProtoMsg(message: RepayAssetEvent): RepayAssetEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.RepayAssetEvent",
      value: RepayAssetEvent.encode(message).finish()
    };
  }
};
function createBaseLockCollateralEvent(): LockCollateralEvent {
  return {
    locker: "",
    cibtDenom: "",
    amountLocked: "",
    debtValue: "",
    collateralValue: ""
  };
}
export const LockCollateralEvent = {
  typeUrl: "/Switcheo.carbon.cdp.LockCollateralEvent",
  encode(message: LockCollateralEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.locker !== "") {
      writer.uint32(10).string(message.locker);
    }
    if (message.cibtDenom !== "") {
      writer.uint32(18).string(message.cibtDenom);
    }
    if (message.amountLocked !== "") {
      writer.uint32(26).string(message.amountLocked);
    }
    if (message.debtValue !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.debtValue, 18).atomics);
    }
    if (message.collateralValue !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.collateralValue, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LockCollateralEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLockCollateralEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.locker = reader.string();
          break;
        case 2:
          message.cibtDenom = reader.string();
          break;
        case 3:
          message.amountLocked = reader.string();
          break;
        case 4:
          message.debtValue = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.collateralValue = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LockCollateralEvent>): LockCollateralEvent {
    const message = createBaseLockCollateralEvent();
    message.locker = object.locker ?? "";
    message.cibtDenom = object.cibtDenom ?? "";
    message.amountLocked = object.amountLocked ?? "";
    message.debtValue = object.debtValue ?? "";
    message.collateralValue = object.collateralValue ?? "";
    return message;
  },
  fromAmino(object: LockCollateralEventAmino): LockCollateralEvent {
    const message = createBaseLockCollateralEvent();
    if (object.locker !== undefined && object.locker !== null) {
      message.locker = object.locker;
    }
    if (object.cibt_denom !== undefined && object.cibt_denom !== null) {
      message.cibtDenom = object.cibt_denom;
    }
    if (object.amount_locked !== undefined && object.amount_locked !== null) {
      message.amountLocked = object.amount_locked;
    }
    if (object.debt_value !== undefined && object.debt_value !== null) {
      message.debtValue = object.debt_value;
    }
    if (object.collateral_value !== undefined && object.collateral_value !== null) {
      message.collateralValue = object.collateral_value;
    }
    return message;
  },
  toAmino(message: LockCollateralEvent, useInterfaces: boolean = false): LockCollateralEventAmino {
    const obj: any = {};
    obj.locker = message.locker === "" ? undefined : message.locker;
    obj.cibt_denom = message.cibtDenom === "" ? undefined : message.cibtDenom;
    obj.amount_locked = message.amountLocked === "" ? undefined : message.amountLocked;
    obj.debt_value = message.debtValue === "" ? undefined : message.debtValue;
    obj.collateral_value = message.collateralValue === "" ? undefined : message.collateralValue;
    return obj;
  },
  fromAminoMsg(object: LockCollateralEventAminoMsg): LockCollateralEvent {
    return LockCollateralEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: LockCollateralEventProtoMsg, useInterfaces: boolean = false): LockCollateralEvent {
    return LockCollateralEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LockCollateralEvent): Uint8Array {
    return LockCollateralEvent.encode(message).finish();
  },
  toProtoMsg(message: LockCollateralEvent): LockCollateralEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.LockCollateralEvent",
      value: LockCollateralEvent.encode(message).finish()
    };
  }
};
function createBaseUnlockCollateralEvent(): UnlockCollateralEvent {
  return {
    unlocker: "",
    cibtDenom: "",
    amountUnlocked: "",
    debtValue: "",
    collateralValue: ""
  };
}
export const UnlockCollateralEvent = {
  typeUrl: "/Switcheo.carbon.cdp.UnlockCollateralEvent",
  encode(message: UnlockCollateralEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.unlocker !== "") {
      writer.uint32(10).string(message.unlocker);
    }
    if (message.cibtDenom !== "") {
      writer.uint32(18).string(message.cibtDenom);
    }
    if (message.amountUnlocked !== "") {
      writer.uint32(26).string(message.amountUnlocked);
    }
    if (message.debtValue !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.debtValue, 18).atomics);
    }
    if (message.collateralValue !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.collateralValue, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UnlockCollateralEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnlockCollateralEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.unlocker = reader.string();
          break;
        case 2:
          message.cibtDenom = reader.string();
          break;
        case 3:
          message.amountUnlocked = reader.string();
          break;
        case 4:
          message.debtValue = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.collateralValue = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UnlockCollateralEvent>): UnlockCollateralEvent {
    const message = createBaseUnlockCollateralEvent();
    message.unlocker = object.unlocker ?? "";
    message.cibtDenom = object.cibtDenom ?? "";
    message.amountUnlocked = object.amountUnlocked ?? "";
    message.debtValue = object.debtValue ?? "";
    message.collateralValue = object.collateralValue ?? "";
    return message;
  },
  fromAmino(object: UnlockCollateralEventAmino): UnlockCollateralEvent {
    const message = createBaseUnlockCollateralEvent();
    if (object.unlocker !== undefined && object.unlocker !== null) {
      message.unlocker = object.unlocker;
    }
    if (object.cibt_denom !== undefined && object.cibt_denom !== null) {
      message.cibtDenom = object.cibt_denom;
    }
    if (object.amount_unlocked !== undefined && object.amount_unlocked !== null) {
      message.amountUnlocked = object.amount_unlocked;
    }
    if (object.debt_value !== undefined && object.debt_value !== null) {
      message.debtValue = object.debt_value;
    }
    if (object.collateral_value !== undefined && object.collateral_value !== null) {
      message.collateralValue = object.collateral_value;
    }
    return message;
  },
  toAmino(message: UnlockCollateralEvent, useInterfaces: boolean = false): UnlockCollateralEventAmino {
    const obj: any = {};
    obj.unlocker = message.unlocker === "" ? undefined : message.unlocker;
    obj.cibt_denom = message.cibtDenom === "" ? undefined : message.cibtDenom;
    obj.amount_unlocked = message.amountUnlocked === "" ? undefined : message.amountUnlocked;
    obj.debt_value = message.debtValue === "" ? undefined : message.debtValue;
    obj.collateral_value = message.collateralValue === "" ? undefined : message.collateralValue;
    return obj;
  },
  fromAminoMsg(object: UnlockCollateralEventAminoMsg): UnlockCollateralEvent {
    return UnlockCollateralEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: UnlockCollateralEventProtoMsg, useInterfaces: boolean = false): UnlockCollateralEvent {
    return UnlockCollateralEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UnlockCollateralEvent): Uint8Array {
    return UnlockCollateralEvent.encode(message).finish();
  },
  toProtoMsg(message: UnlockCollateralEvent): UnlockCollateralEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.UnlockCollateralEvent",
      value: UnlockCollateralEvent.encode(message).finish()
    };
  }
};
function createBaseUpdateDebtInfoEvent(): UpdateDebtInfoEvent {
  return {
    debtInfo: DebtInfo.fromPartial({}),
    type: ""
  };
}
export const UpdateDebtInfoEvent = {
  typeUrl: "/Switcheo.carbon.cdp.UpdateDebtInfoEvent",
  encode(message: UpdateDebtInfoEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.debtInfo !== undefined) {
      DebtInfo.encode(message.debtInfo, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UpdateDebtInfoEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateDebtInfoEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.debtInfo = DebtInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UpdateDebtInfoEvent>): UpdateDebtInfoEvent {
    const message = createBaseUpdateDebtInfoEvent();
    message.debtInfo = object.debtInfo !== undefined && object.debtInfo !== null ? DebtInfo.fromPartial(object.debtInfo) : undefined;
    message.type = object.type ?? "";
    return message;
  },
  fromAmino(object: UpdateDebtInfoEventAmino): UpdateDebtInfoEvent {
    const message = createBaseUpdateDebtInfoEvent();
    if (object.debt_info !== undefined && object.debt_info !== null) {
      message.debtInfo = DebtInfo.fromAmino(object.debt_info);
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: UpdateDebtInfoEvent, useInterfaces: boolean = false): UpdateDebtInfoEventAmino {
    const obj: any = {};
    obj.debt_info = message.debtInfo ? DebtInfo.toAmino(message.debtInfo, useInterfaces) : undefined;
    obj.type = message.type === "" ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: UpdateDebtInfoEventAminoMsg): UpdateDebtInfoEvent {
    return UpdateDebtInfoEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: UpdateDebtInfoEventProtoMsg, useInterfaces: boolean = false): UpdateDebtInfoEvent {
    return UpdateDebtInfoEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UpdateDebtInfoEvent): Uint8Array {
    return UpdateDebtInfoEvent.encode(message).finish();
  },
  toProtoMsg(message: UpdateDebtInfoEvent): UpdateDebtInfoEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.UpdateDebtInfoEvent",
      value: UpdateDebtInfoEvent.encode(message).finish()
    };
  }
};
function createBaseUpdateStablecoinDebtInfoEvent(): UpdateStablecoinDebtInfoEvent {
  return {
    stablecoinDebtInfo: StablecoinDebtInfo.fromPartial({}),
    type: ""
  };
}
export const UpdateStablecoinDebtInfoEvent = {
  typeUrl: "/Switcheo.carbon.cdp.UpdateStablecoinDebtInfoEvent",
  encode(message: UpdateStablecoinDebtInfoEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.stablecoinDebtInfo !== undefined) {
      StablecoinDebtInfo.encode(message.stablecoinDebtInfo, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UpdateStablecoinDebtInfoEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateStablecoinDebtInfoEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stablecoinDebtInfo = StablecoinDebtInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UpdateStablecoinDebtInfoEvent>): UpdateStablecoinDebtInfoEvent {
    const message = createBaseUpdateStablecoinDebtInfoEvent();
    message.stablecoinDebtInfo = object.stablecoinDebtInfo !== undefined && object.stablecoinDebtInfo !== null ? StablecoinDebtInfo.fromPartial(object.stablecoinDebtInfo) : undefined;
    message.type = object.type ?? "";
    return message;
  },
  fromAmino(object: UpdateStablecoinDebtInfoEventAmino): UpdateStablecoinDebtInfoEvent {
    const message = createBaseUpdateStablecoinDebtInfoEvent();
    if (object.stablecoin_debt_info !== undefined && object.stablecoin_debt_info !== null) {
      message.stablecoinDebtInfo = StablecoinDebtInfo.fromAmino(object.stablecoin_debt_info);
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: UpdateStablecoinDebtInfoEvent, useInterfaces: boolean = false): UpdateStablecoinDebtInfoEventAmino {
    const obj: any = {};
    obj.stablecoin_debt_info = message.stablecoinDebtInfo ? StablecoinDebtInfo.toAmino(message.stablecoinDebtInfo, useInterfaces) : undefined;
    obj.type = message.type === "" ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: UpdateStablecoinDebtInfoEventAminoMsg): UpdateStablecoinDebtInfoEvent {
    return UpdateStablecoinDebtInfoEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: UpdateStablecoinDebtInfoEventProtoMsg, useInterfaces: boolean = false): UpdateStablecoinDebtInfoEvent {
    return UpdateStablecoinDebtInfoEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UpdateStablecoinDebtInfoEvent): Uint8Array {
    return UpdateStablecoinDebtInfoEvent.encode(message).finish();
  },
  toProtoMsg(message: UpdateStablecoinDebtInfoEvent): UpdateStablecoinDebtInfoEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.UpdateStablecoinDebtInfoEvent",
      value: UpdateStablecoinDebtInfoEvent.encode(message).finish()
    };
  }
};
function createBaseMintStablecoinEvent(): MintStablecoinEvent {
  return {
    minter: "",
    denom: "",
    amountMinted: "",
    debtValue: "",
    collateralValue: "",
    initialCumulativeInterestMultiplier: ""
  };
}
export const MintStablecoinEvent = {
  typeUrl: "/Switcheo.carbon.cdp.MintStablecoinEvent",
  encode(message: MintStablecoinEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.minter !== "") {
      writer.uint32(10).string(message.minter);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.amountMinted !== "") {
      writer.uint32(26).string(message.amountMinted);
    }
    if (message.debtValue !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.debtValue, 18).atomics);
    }
    if (message.collateralValue !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.collateralValue, 18).atomics);
    }
    if (message.initialCumulativeInterestMultiplier !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.initialCumulativeInterestMultiplier, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MintStablecoinEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMintStablecoinEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.minter = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.amountMinted = reader.string();
          break;
        case 4:
          message.debtValue = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.collateralValue = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.initialCumulativeInterestMultiplier = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MintStablecoinEvent>): MintStablecoinEvent {
    const message = createBaseMintStablecoinEvent();
    message.minter = object.minter ?? "";
    message.denom = object.denom ?? "";
    message.amountMinted = object.amountMinted ?? "";
    message.debtValue = object.debtValue ?? "";
    message.collateralValue = object.collateralValue ?? "";
    message.initialCumulativeInterestMultiplier = object.initialCumulativeInterestMultiplier ?? "";
    return message;
  },
  fromAmino(object: MintStablecoinEventAmino): MintStablecoinEvent {
    const message = createBaseMintStablecoinEvent();
    if (object.minter !== undefined && object.minter !== null) {
      message.minter = object.minter;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.amount_minted !== undefined && object.amount_minted !== null) {
      message.amountMinted = object.amount_minted;
    }
    if (object.debt_value !== undefined && object.debt_value !== null) {
      message.debtValue = object.debt_value;
    }
    if (object.collateral_value !== undefined && object.collateral_value !== null) {
      message.collateralValue = object.collateral_value;
    }
    if (object.initial_cumulative_interest_multiplier !== undefined && object.initial_cumulative_interest_multiplier !== null) {
      message.initialCumulativeInterestMultiplier = object.initial_cumulative_interest_multiplier;
    }
    return message;
  },
  toAmino(message: MintStablecoinEvent, useInterfaces: boolean = false): MintStablecoinEventAmino {
    const obj: any = {};
    obj.minter = message.minter === "" ? undefined : message.minter;
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.amount_minted = message.amountMinted === "" ? undefined : message.amountMinted;
    obj.debt_value = message.debtValue === "" ? undefined : message.debtValue;
    obj.collateral_value = message.collateralValue === "" ? undefined : message.collateralValue;
    obj.initial_cumulative_interest_multiplier = message.initialCumulativeInterestMultiplier === "" ? undefined : message.initialCumulativeInterestMultiplier;
    return obj;
  },
  fromAminoMsg(object: MintStablecoinEventAminoMsg): MintStablecoinEvent {
    return MintStablecoinEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: MintStablecoinEventProtoMsg, useInterfaces: boolean = false): MintStablecoinEvent {
    return MintStablecoinEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MintStablecoinEvent): Uint8Array {
    return MintStablecoinEvent.encode(message).finish();
  },
  toProtoMsg(message: MintStablecoinEvent): MintStablecoinEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.MintStablecoinEvent",
      value: MintStablecoinEvent.encode(message).finish()
    };
  }
};
function createBaseReturnStablecoinEvent(): ReturnStablecoinEvent {
  return {
    returner: "",
    debtor: "",
    interestDenom: "",
    interestRepaid: "",
    principalRepaid: "",
    debtValue: "",
    collateralValue: ""
  };
}
export const ReturnStablecoinEvent = {
  typeUrl: "/Switcheo.carbon.cdp.ReturnStablecoinEvent",
  encode(message: ReturnStablecoinEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.returner !== "") {
      writer.uint32(10).string(message.returner);
    }
    if (message.debtor !== "") {
      writer.uint32(18).string(message.debtor);
    }
    if (message.interestDenom !== "") {
      writer.uint32(26).string(message.interestDenom);
    }
    if (message.interestRepaid !== "") {
      writer.uint32(34).string(message.interestRepaid);
    }
    if (message.principalRepaid !== "") {
      writer.uint32(42).string(message.principalRepaid);
    }
    if (message.debtValue !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.debtValue, 18).atomics);
    }
    if (message.collateralValue !== "") {
      writer.uint32(58).string(Decimal.fromUserInput(message.collateralValue, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ReturnStablecoinEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReturnStablecoinEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.returner = reader.string();
          break;
        case 2:
          message.debtor = reader.string();
          break;
        case 3:
          message.interestDenom = reader.string();
          break;
        case 4:
          message.interestRepaid = reader.string();
          break;
        case 5:
          message.principalRepaid = reader.string();
          break;
        case 6:
          message.debtValue = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.collateralValue = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ReturnStablecoinEvent>): ReturnStablecoinEvent {
    const message = createBaseReturnStablecoinEvent();
    message.returner = object.returner ?? "";
    message.debtor = object.debtor ?? "";
    message.interestDenom = object.interestDenom ?? "";
    message.interestRepaid = object.interestRepaid ?? "";
    message.principalRepaid = object.principalRepaid ?? "";
    message.debtValue = object.debtValue ?? "";
    message.collateralValue = object.collateralValue ?? "";
    return message;
  },
  fromAmino(object: ReturnStablecoinEventAmino): ReturnStablecoinEvent {
    const message = createBaseReturnStablecoinEvent();
    if (object.returner !== undefined && object.returner !== null) {
      message.returner = object.returner;
    }
    if (object.debtor !== undefined && object.debtor !== null) {
      message.debtor = object.debtor;
    }
    if (object.interest_denom !== undefined && object.interest_denom !== null) {
      message.interestDenom = object.interest_denom;
    }
    if (object.interest_repaid !== undefined && object.interest_repaid !== null) {
      message.interestRepaid = object.interest_repaid;
    }
    if (object.principal_repaid !== undefined && object.principal_repaid !== null) {
      message.principalRepaid = object.principal_repaid;
    }
    if (object.debt_value !== undefined && object.debt_value !== null) {
      message.debtValue = object.debt_value;
    }
    if (object.collateral_value !== undefined && object.collateral_value !== null) {
      message.collateralValue = object.collateral_value;
    }
    return message;
  },
  toAmino(message: ReturnStablecoinEvent, useInterfaces: boolean = false): ReturnStablecoinEventAmino {
    const obj: any = {};
    obj.returner = message.returner === "" ? undefined : message.returner;
    obj.debtor = message.debtor === "" ? undefined : message.debtor;
    obj.interest_denom = message.interestDenom === "" ? undefined : message.interestDenom;
    obj.interest_repaid = message.interestRepaid === "" ? undefined : message.interestRepaid;
    obj.principal_repaid = message.principalRepaid === "" ? undefined : message.principalRepaid;
    obj.debt_value = message.debtValue === "" ? undefined : message.debtValue;
    obj.collateral_value = message.collateralValue === "" ? undefined : message.collateralValue;
    return obj;
  },
  fromAminoMsg(object: ReturnStablecoinEventAminoMsg): ReturnStablecoinEvent {
    return ReturnStablecoinEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: ReturnStablecoinEventProtoMsg, useInterfaces: boolean = false): ReturnStablecoinEvent {
    return ReturnStablecoinEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ReturnStablecoinEvent): Uint8Array {
    return ReturnStablecoinEvent.encode(message).finish();
  },
  toProtoMsg(message: ReturnStablecoinEvent): ReturnStablecoinEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.ReturnStablecoinEvent",
      value: ReturnStablecoinEvent.encode(message).finish()
    };
  }
};
function createBaseLiquidateCollateralEvent(): LiquidateCollateralEvent {
  return {
    liquidator: "",
    debtor: "",
    collateralDenom: "",
    collateralAmountLiquidated: "",
    collateralAmountLiquidator: "",
    collateralAmountFee: "",
    liquidationPrice: "",
    marketPrice: "",
    discount: "",
    debtDenom: "",
    debtAmount: "",
    id: BigInt(0),
    principalAmount: "",
    interestDenom: "",
    interestAmount: ""
  };
}
export const LiquidateCollateralEvent = {
  typeUrl: "/Switcheo.carbon.cdp.LiquidateCollateralEvent",
  encode(message: LiquidateCollateralEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.liquidator !== "") {
      writer.uint32(10).string(message.liquidator);
    }
    if (message.debtor !== "") {
      writer.uint32(18).string(message.debtor);
    }
    if (message.collateralDenom !== "") {
      writer.uint32(26).string(message.collateralDenom);
    }
    if (message.collateralAmountLiquidated !== "") {
      writer.uint32(34).string(message.collateralAmountLiquidated);
    }
    if (message.collateralAmountLiquidator !== "") {
      writer.uint32(42).string(message.collateralAmountLiquidator);
    }
    if (message.collateralAmountFee !== "") {
      writer.uint32(50).string(message.collateralAmountFee);
    }
    if (message.liquidationPrice !== "") {
      writer.uint32(58).string(Decimal.fromUserInput(message.liquidationPrice, 18).atomics);
    }
    if (message.marketPrice !== "") {
      writer.uint32(66).string(Decimal.fromUserInput(message.marketPrice, 18).atomics);
    }
    if (message.discount !== "") {
      writer.uint32(74).string(Decimal.fromUserInput(message.discount, 18).atomics);
    }
    if (message.debtDenom !== "") {
      writer.uint32(82).string(message.debtDenom);
    }
    if (message.debtAmount !== "") {
      writer.uint32(90).string(message.debtAmount);
    }
    if (message.id !== BigInt(0)) {
      writer.uint32(96).uint64(message.id);
    }
    if (message.principalAmount !== "") {
      writer.uint32(106).string(message.principalAmount);
    }
    if (message.interestDenom !== "") {
      writer.uint32(114).string(message.interestDenom);
    }
    if (message.interestAmount !== "") {
      writer.uint32(122).string(message.interestAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LiquidateCollateralEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLiquidateCollateralEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidator = reader.string();
          break;
        case 2:
          message.debtor = reader.string();
          break;
        case 3:
          message.collateralDenom = reader.string();
          break;
        case 4:
          message.collateralAmountLiquidated = reader.string();
          break;
        case 5:
          message.collateralAmountLiquidator = reader.string();
          break;
        case 6:
          message.collateralAmountFee = reader.string();
          break;
        case 7:
          message.liquidationPrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 8:
          message.marketPrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 9:
          message.discount = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 10:
          message.debtDenom = reader.string();
          break;
        case 11:
          message.debtAmount = reader.string();
          break;
        case 12:
          message.id = reader.uint64();
          break;
        case 13:
          message.principalAmount = reader.string();
          break;
        case 14:
          message.interestDenom = reader.string();
          break;
        case 15:
          message.interestAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LiquidateCollateralEvent>): LiquidateCollateralEvent {
    const message = createBaseLiquidateCollateralEvent();
    message.liquidator = object.liquidator ?? "";
    message.debtor = object.debtor ?? "";
    message.collateralDenom = object.collateralDenom ?? "";
    message.collateralAmountLiquidated = object.collateralAmountLiquidated ?? "";
    message.collateralAmountLiquidator = object.collateralAmountLiquidator ?? "";
    message.collateralAmountFee = object.collateralAmountFee ?? "";
    message.liquidationPrice = object.liquidationPrice ?? "";
    message.marketPrice = object.marketPrice ?? "";
    message.discount = object.discount ?? "";
    message.debtDenom = object.debtDenom ?? "";
    message.debtAmount = object.debtAmount ?? "";
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.principalAmount = object.principalAmount ?? "";
    message.interestDenom = object.interestDenom ?? "";
    message.interestAmount = object.interestAmount ?? "";
    return message;
  },
  fromAmino(object: LiquidateCollateralEventAmino): LiquidateCollateralEvent {
    const message = createBaseLiquidateCollateralEvent();
    if (object.liquidator !== undefined && object.liquidator !== null) {
      message.liquidator = object.liquidator;
    }
    if (object.debtor !== undefined && object.debtor !== null) {
      message.debtor = object.debtor;
    }
    if (object.collateral_denom !== undefined && object.collateral_denom !== null) {
      message.collateralDenom = object.collateral_denom;
    }
    if (object.collateral_amount_liquidated !== undefined && object.collateral_amount_liquidated !== null) {
      message.collateralAmountLiquidated = object.collateral_amount_liquidated;
    }
    if (object.collateral_amount_liquidator !== undefined && object.collateral_amount_liquidator !== null) {
      message.collateralAmountLiquidator = object.collateral_amount_liquidator;
    }
    if (object.collateral_amount_fee !== undefined && object.collateral_amount_fee !== null) {
      message.collateralAmountFee = object.collateral_amount_fee;
    }
    if (object.liquidation_price !== undefined && object.liquidation_price !== null) {
      message.liquidationPrice = object.liquidation_price;
    }
    if (object.market_price !== undefined && object.market_price !== null) {
      message.marketPrice = object.market_price;
    }
    if (object.discount !== undefined && object.discount !== null) {
      message.discount = object.discount;
    }
    if (object.debt_denom !== undefined && object.debt_denom !== null) {
      message.debtDenom = object.debt_denom;
    }
    if (object.debt_amount !== undefined && object.debt_amount !== null) {
      message.debtAmount = object.debt_amount;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.principal_amount !== undefined && object.principal_amount !== null) {
      message.principalAmount = object.principal_amount;
    }
    if (object.interest_denom !== undefined && object.interest_denom !== null) {
      message.interestDenom = object.interest_denom;
    }
    if (object.interest_amount !== undefined && object.interest_amount !== null) {
      message.interestAmount = object.interest_amount;
    }
    return message;
  },
  toAmino(message: LiquidateCollateralEvent, useInterfaces: boolean = false): LiquidateCollateralEventAmino {
    const obj: any = {};
    obj.liquidator = message.liquidator === "" ? undefined : message.liquidator;
    obj.debtor = message.debtor === "" ? undefined : message.debtor;
    obj.collateral_denom = message.collateralDenom === "" ? undefined : message.collateralDenom;
    obj.collateral_amount_liquidated = message.collateralAmountLiquidated === "" ? undefined : message.collateralAmountLiquidated;
    obj.collateral_amount_liquidator = message.collateralAmountLiquidator === "" ? undefined : message.collateralAmountLiquidator;
    obj.collateral_amount_fee = message.collateralAmountFee === "" ? undefined : message.collateralAmountFee;
    obj.liquidation_price = message.liquidationPrice === "" ? undefined : message.liquidationPrice;
    obj.market_price = message.marketPrice === "" ? undefined : message.marketPrice;
    obj.discount = message.discount === "" ? undefined : message.discount;
    obj.debt_denom = message.debtDenom === "" ? undefined : message.debtDenom;
    obj.debt_amount = message.debtAmount === "" ? undefined : message.debtAmount;
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.principal_amount = message.principalAmount === "" ? undefined : message.principalAmount;
    obj.interest_denom = message.interestDenom === "" ? undefined : message.interestDenom;
    obj.interest_amount = message.interestAmount === "" ? undefined : message.interestAmount;
    return obj;
  },
  fromAminoMsg(object: LiquidateCollateralEventAminoMsg): LiquidateCollateralEvent {
    return LiquidateCollateralEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: LiquidateCollateralEventProtoMsg, useInterfaces: boolean = false): LiquidateCollateralEvent {
    return LiquidateCollateralEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LiquidateCollateralEvent): Uint8Array {
    return LiquidateCollateralEvent.encode(message).finish();
  },
  toProtoMsg(message: LiquidateCollateralEvent): LiquidateCollateralEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.LiquidateCollateralEvent",
      value: LiquidateCollateralEvent.encode(message).finish()
    };
  }
};
function createBaseClaimRewardEvent(): ClaimRewardEvent {
  return {
    receiver: "",
    rewardSchemeId: "",
    rewardClaimed: ""
  };
}
export const ClaimRewardEvent = {
  typeUrl: "/Switcheo.carbon.cdp.ClaimRewardEvent",
  encode(message: ClaimRewardEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.receiver !== "") {
      writer.uint32(10).string(message.receiver);
    }
    if (message.rewardSchemeId !== "") {
      writer.uint32(18).string(message.rewardSchemeId);
    }
    if (message.rewardClaimed !== "") {
      writer.uint32(26).string(message.rewardClaimed);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ClaimRewardEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClaimRewardEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.receiver = reader.string();
          break;
        case 2:
          message.rewardSchemeId = reader.string();
          break;
        case 3:
          message.rewardClaimed = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ClaimRewardEvent>): ClaimRewardEvent {
    const message = createBaseClaimRewardEvent();
    message.receiver = object.receiver ?? "";
    message.rewardSchemeId = object.rewardSchemeId ?? "";
    message.rewardClaimed = object.rewardClaimed ?? "";
    return message;
  },
  fromAmino(object: ClaimRewardEventAmino): ClaimRewardEvent {
    const message = createBaseClaimRewardEvent();
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = object.receiver;
    }
    if (object.reward_scheme_id !== undefined && object.reward_scheme_id !== null) {
      message.rewardSchemeId = object.reward_scheme_id;
    }
    if (object.reward_claimed !== undefined && object.reward_claimed !== null) {
      message.rewardClaimed = object.reward_claimed;
    }
    return message;
  },
  toAmino(message: ClaimRewardEvent, useInterfaces: boolean = false): ClaimRewardEventAmino {
    const obj: any = {};
    obj.receiver = message.receiver === "" ? undefined : message.receiver;
    obj.reward_scheme_id = message.rewardSchemeId === "" ? undefined : message.rewardSchemeId;
    obj.reward_claimed = message.rewardClaimed === "" ? undefined : message.rewardClaimed;
    return obj;
  },
  fromAminoMsg(object: ClaimRewardEventAminoMsg): ClaimRewardEvent {
    return ClaimRewardEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: ClaimRewardEventProtoMsg, useInterfaces: boolean = false): ClaimRewardEvent {
    return ClaimRewardEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ClaimRewardEvent): Uint8Array {
    return ClaimRewardEvent.encode(message).finish();
  },
  toProtoMsg(message: ClaimRewardEvent): ClaimRewardEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.ClaimRewardEvent",
      value: ClaimRewardEvent.encode(message).finish()
    };
  }
};
function createBaseRewardDebtEvent(): RewardDebtEvent {
  return {
    rewardDebt: undefined,
    type: ""
  };
}
export const RewardDebtEvent = {
  typeUrl: "/Switcheo.carbon.cdp.RewardDebtEvent",
  encode(message: RewardDebtEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rewardDebt !== undefined) {
      RewardDebt.encode(message.rewardDebt, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RewardDebtEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardDebtEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rewardDebt = RewardDebt.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RewardDebtEvent>): RewardDebtEvent {
    const message = createBaseRewardDebtEvent();
    message.rewardDebt = object.rewardDebt !== undefined && object.rewardDebt !== null ? RewardDebt.fromPartial(object.rewardDebt) : undefined;
    message.type = object.type ?? "";
    return message;
  },
  fromAmino(object: RewardDebtEventAmino): RewardDebtEvent {
    const message = createBaseRewardDebtEvent();
    if (object.reward_debt !== undefined && object.reward_debt !== null) {
      message.rewardDebt = RewardDebt.fromAmino(object.reward_debt);
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: RewardDebtEvent, useInterfaces: boolean = false): RewardDebtEventAmino {
    const obj: any = {};
    obj.reward_debt = message.rewardDebt ? RewardDebt.toAmino(message.rewardDebt, useInterfaces) : undefined;
    obj.type = message.type === "" ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: RewardDebtEventAminoMsg): RewardDebtEvent {
    return RewardDebtEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: RewardDebtEventProtoMsg, useInterfaces: boolean = false): RewardDebtEvent {
    return RewardDebtEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RewardDebtEvent): Uint8Array {
    return RewardDebtEvent.encode(message).finish();
  },
  toProtoMsg(message: RewardDebtEvent): RewardDebtEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.RewardDebtEvent",
      value: RewardDebtEvent.encode(message).finish()
    };
  }
};
function createBaseRewardSchemeEvent(): RewardSchemeEvent {
  return {
    rewardScheme: undefined,
    type: ""
  };
}
export const RewardSchemeEvent = {
  typeUrl: "/Switcheo.carbon.cdp.RewardSchemeEvent",
  encode(message: RewardSchemeEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rewardScheme !== undefined) {
      RewardScheme.encode(message.rewardScheme, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RewardSchemeEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardSchemeEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rewardScheme = RewardScheme.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.type = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RewardSchemeEvent>): RewardSchemeEvent {
    const message = createBaseRewardSchemeEvent();
    message.rewardScheme = object.rewardScheme !== undefined && object.rewardScheme !== null ? RewardScheme.fromPartial(object.rewardScheme) : undefined;
    message.type = object.type ?? "";
    return message;
  },
  fromAmino(object: RewardSchemeEventAmino): RewardSchemeEvent {
    const message = createBaseRewardSchemeEvent();
    if (object.reward_scheme !== undefined && object.reward_scheme !== null) {
      message.rewardScheme = RewardScheme.fromAmino(object.reward_scheme);
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    }
    return message;
  },
  toAmino(message: RewardSchemeEvent, useInterfaces: boolean = false): RewardSchemeEventAmino {
    const obj: any = {};
    obj.reward_scheme = message.rewardScheme ? RewardScheme.toAmino(message.rewardScheme, useInterfaces) : undefined;
    obj.type = message.type === "" ? undefined : message.type;
    return obj;
  },
  fromAminoMsg(object: RewardSchemeEventAminoMsg): RewardSchemeEvent {
    return RewardSchemeEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: RewardSchemeEventProtoMsg, useInterfaces: boolean = false): RewardSchemeEvent {
    return RewardSchemeEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RewardSchemeEvent): Uint8Array {
    return RewardSchemeEvent.encode(message).finish();
  },
  toProtoMsg(message: RewardSchemeEvent): RewardSchemeEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.RewardSchemeEvent",
      value: RewardSchemeEvent.encode(message).finish()
    };
  }
};
function createBaseAddReserveEvent(): AddReserveEvent {
  return {
    rewardScheme: undefined,
    amountAdded: ""
  };
}
export const AddReserveEvent = {
  typeUrl: "/Switcheo.carbon.cdp.AddReserveEvent",
  encode(message: AddReserveEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rewardScheme !== undefined) {
      RewardScheme.encode(message.rewardScheme, writer.uint32(10).fork()).ldelim();
    }
    if (message.amountAdded !== "") {
      writer.uint32(18).string(message.amountAdded);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AddReserveEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddReserveEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rewardScheme = RewardScheme.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.amountAdded = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AddReserveEvent>): AddReserveEvent {
    const message = createBaseAddReserveEvent();
    message.rewardScheme = object.rewardScheme !== undefined && object.rewardScheme !== null ? RewardScheme.fromPartial(object.rewardScheme) : undefined;
    message.amountAdded = object.amountAdded ?? "";
    return message;
  },
  fromAmino(object: AddReserveEventAmino): AddReserveEvent {
    const message = createBaseAddReserveEvent();
    if (object.reward_scheme !== undefined && object.reward_scheme !== null) {
      message.rewardScheme = RewardScheme.fromAmino(object.reward_scheme);
    }
    if (object.amount_added !== undefined && object.amount_added !== null) {
      message.amountAdded = object.amount_added;
    }
    return message;
  },
  toAmino(message: AddReserveEvent, useInterfaces: boolean = false): AddReserveEventAmino {
    const obj: any = {};
    obj.reward_scheme = message.rewardScheme ? RewardScheme.toAmino(message.rewardScheme, useInterfaces) : undefined;
    obj.amount_added = message.amountAdded === "" ? undefined : message.amountAdded;
    return obj;
  },
  fromAminoMsg(object: AddReserveEventAminoMsg): AddReserveEvent {
    return AddReserveEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: AddReserveEventProtoMsg, useInterfaces: boolean = false): AddReserveEvent {
    return AddReserveEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AddReserveEvent): Uint8Array {
    return AddReserveEvent.encode(message).finish();
  },
  toProtoMsg(message: AddReserveEvent): AddReserveEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.AddReserveEvent",
      value: AddReserveEvent.encode(message).finish()
    };
  }
};
function createBaseRefundReserveEvent(): RefundReserveEvent {
  return {
    rewardScheme: undefined,
    amountRefunded: ""
  };
}
export const RefundReserveEvent = {
  typeUrl: "/Switcheo.carbon.cdp.RefundReserveEvent",
  encode(message: RefundReserveEvent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rewardScheme !== undefined) {
      RewardScheme.encode(message.rewardScheme, writer.uint32(10).fork()).ldelim();
    }
    if (message.amountRefunded !== "") {
      writer.uint32(18).string(message.amountRefunded);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RefundReserveEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRefundReserveEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rewardScheme = RewardScheme.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.amountRefunded = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RefundReserveEvent>): RefundReserveEvent {
    const message = createBaseRefundReserveEvent();
    message.rewardScheme = object.rewardScheme !== undefined && object.rewardScheme !== null ? RewardScheme.fromPartial(object.rewardScheme) : undefined;
    message.amountRefunded = object.amountRefunded ?? "";
    return message;
  },
  fromAmino(object: RefundReserveEventAmino): RefundReserveEvent {
    const message = createBaseRefundReserveEvent();
    if (object.reward_scheme !== undefined && object.reward_scheme !== null) {
      message.rewardScheme = RewardScheme.fromAmino(object.reward_scheme);
    }
    if (object.amount_refunded !== undefined && object.amount_refunded !== null) {
      message.amountRefunded = object.amount_refunded;
    }
    return message;
  },
  toAmino(message: RefundReserveEvent, useInterfaces: boolean = false): RefundReserveEventAmino {
    const obj: any = {};
    obj.reward_scheme = message.rewardScheme ? RewardScheme.toAmino(message.rewardScheme, useInterfaces) : undefined;
    obj.amount_refunded = message.amountRefunded === "" ? undefined : message.amountRefunded;
    return obj;
  },
  fromAminoMsg(object: RefundReserveEventAminoMsg): RefundReserveEvent {
    return RefundReserveEvent.fromAmino(object.value);
  },
  fromProtoMsg(message: RefundReserveEventProtoMsg, useInterfaces: boolean = false): RefundReserveEvent {
    return RefundReserveEvent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RefundReserveEvent): Uint8Array {
    return RefundReserveEvent.encode(message).finish();
  },
  toProtoMsg(message: RefundReserveEvent): RefundReserveEventProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.RefundReserveEvent",
      value: RefundReserveEvent.encode(message).finish()
    };
  }
};