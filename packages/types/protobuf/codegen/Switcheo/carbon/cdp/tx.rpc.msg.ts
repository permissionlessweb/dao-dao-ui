import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgAddRateStrategy, MsgAddRateStrategyResponse, MsgRemoveRateStrategy, MsgRemoveRateStrategyResponse, MsgAddAsset, MsgAddAssetResponse, MsgUpdateRateStrategy, MsgUpdateRateStrategyResponse, MsgUpdateAsset, MsgUpdateAssetResponse, MsgSupplyAsset, MsgSupplyAssetResponse, MsgWithdrawAsset, MsgWithdrawAssetResponse, MsgLockCollateral, MsgLockCollateralResponse, MsgUnlockCollateral, MsgUnlockCollateralResponse, MsgBorrowAsset, MsgBorrowAssetResponse, MsgRepayAsset, MsgRepayAssetResponse, MsgSupplyAssetAndLockCollateral, MsgSupplyAssetAndLockCollateralResponse, MsgUnlockCollateralAndWithdrawAsset, MsgUnlockCollateralAndWithdrawAssetResponse, MsgLiquidateCollateral, MsgLiquidateCollateralResponse, MsgSetLiquidationFee, MsgSetLiquidationFeeResponse, MsgSetInterestFee, MsgSetInterestFeeResponse, MsgCreateRewardScheme, MsgCreateRewardSchemeResponse, MsgUpdateRewardScheme, MsgUpdateRewardSchemeResponse, MsgClaimRewards, MsgClaimRewardsResponse, MsgSetStablecoinInterestRate, MsgSetStablecoinInterestRateResponse, MsgSetStablecoinMintCap, MsgSetStablecoinMintCapResponse, MsgMintStablecoin, MsgMintStablecoinResponse, MsgReturnStablecoin, MsgReturnStablecoinResponse, MsgSetCompleteLiquidationThreshold, MsgSetCompleteLiquidationThresholdResponse, MsgSetMinimumCloseFactor, MsgSetMinimumCloseFactorResponse, MsgSetSmallLiquidationSize, MsgSetSmallLiquidationSizeResponse, MsgSetStalePriceGracePeriod, MsgSetStalePriceGracePeriodResponse, MsgSetCdpPaused, MsgSetCdpPausedResponse, MsgConvertTokenInCdpToGroupTokens, MsgConvertTokenInCdpToGroupTokensResponse, MsgAddEModeCategory, MsgAddEModeCategoryResponse, MsgUpdateEModeCategory, MsgUpdateEModeCategoryResponse, MsgSetAccountEMode, MsgSetAccountEModeResponse, MsgRemoveAccountEMode, MsgRemoveAccountEModeResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  addRateStrategy(request: MsgAddRateStrategy): Promise<MsgAddRateStrategyResponse>;
  removeRateStrategy(request: MsgRemoveRateStrategy): Promise<MsgRemoveRateStrategyResponse>;
  addAsset(request: MsgAddAsset): Promise<MsgAddAssetResponse>;
  updateRateStrategy(request: MsgUpdateRateStrategy): Promise<MsgUpdateRateStrategyResponse>;
  updateAsset(request: MsgUpdateAsset): Promise<MsgUpdateAssetResponse>;
  supplyAsset(request: MsgSupplyAsset): Promise<MsgSupplyAssetResponse>;
  withdrawAsset(request: MsgWithdrawAsset): Promise<MsgWithdrawAssetResponse>;
  lockCollateral(request: MsgLockCollateral): Promise<MsgLockCollateralResponse>;
  unlockCollateral(request: MsgUnlockCollateral): Promise<MsgUnlockCollateralResponse>;
  borrowAsset(request: MsgBorrowAsset): Promise<MsgBorrowAssetResponse>;
  repayAsset(request: MsgRepayAsset): Promise<MsgRepayAssetResponse>;
  supplyAssetAndLockCollateral(request: MsgSupplyAssetAndLockCollateral): Promise<MsgSupplyAssetAndLockCollateralResponse>;
  unlockCollateralAndWithdrawAsset(request: MsgUnlockCollateralAndWithdrawAsset): Promise<MsgUnlockCollateralAndWithdrawAssetResponse>;
  liquidateCollateral(request: MsgLiquidateCollateral): Promise<MsgLiquidateCollateralResponse>;
  setLiquidationFee(request: MsgSetLiquidationFee): Promise<MsgSetLiquidationFeeResponse>;
  setInterestFee(request: MsgSetInterestFee): Promise<MsgSetInterestFeeResponse>;
  createRewardScheme(request: MsgCreateRewardScheme): Promise<MsgCreateRewardSchemeResponse>;
  updateRewardScheme(request: MsgUpdateRewardScheme): Promise<MsgUpdateRewardSchemeResponse>;
  claimRewards(request: MsgClaimRewards): Promise<MsgClaimRewardsResponse>;
  setStablecoinInterestRate(request: MsgSetStablecoinInterestRate): Promise<MsgSetStablecoinInterestRateResponse>;
  setStablecoinMintCap(request: MsgSetStablecoinMintCap): Promise<MsgSetStablecoinMintCapResponse>;
  mintStablecoin(request: MsgMintStablecoin): Promise<MsgMintStablecoinResponse>;
  returnStablecoin(request: MsgReturnStablecoin): Promise<MsgReturnStablecoinResponse>;
  setCompleteLiquidationThreshold(request: MsgSetCompleteLiquidationThreshold): Promise<MsgSetCompleteLiquidationThresholdResponse>;
  setMinimumCloseFactor(request: MsgSetMinimumCloseFactor): Promise<MsgSetMinimumCloseFactorResponse>;
  setSmallLiquidationSize(request: MsgSetSmallLiquidationSize): Promise<MsgSetSmallLiquidationSizeResponse>;
  setStalePriceGracePeriod(request: MsgSetStalePriceGracePeriod): Promise<MsgSetStalePriceGracePeriodResponse>;
  setCdpPaused(request: MsgSetCdpPaused): Promise<MsgSetCdpPausedResponse>;
  convertTokenInCdpToGroupTokens(request: MsgConvertTokenInCdpToGroupTokens): Promise<MsgConvertTokenInCdpToGroupTokensResponse>;
  addEModeCategory(request: MsgAddEModeCategory): Promise<MsgAddEModeCategoryResponse>;
  updateEModeCategory(request: MsgUpdateEModeCategory): Promise<MsgUpdateEModeCategoryResponse>;
  setAccountEMode(request: MsgSetAccountEMode): Promise<MsgSetAccountEModeResponse>;
  removeAccountEMode(request: MsgRemoveAccountEMode): Promise<MsgRemoveAccountEModeResponse>;
  /**
   * UpdateParams defines a governance operation for updating the module
   * parameters. The authority is hard-coded to the x/gov module account.
   * 
   * Since: cosmos-sdk 0.47
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.addRateStrategy = this.addRateStrategy.bind(this);
    this.removeRateStrategy = this.removeRateStrategy.bind(this);
    this.addAsset = this.addAsset.bind(this);
    this.updateRateStrategy = this.updateRateStrategy.bind(this);
    this.updateAsset = this.updateAsset.bind(this);
    this.supplyAsset = this.supplyAsset.bind(this);
    this.withdrawAsset = this.withdrawAsset.bind(this);
    this.lockCollateral = this.lockCollateral.bind(this);
    this.unlockCollateral = this.unlockCollateral.bind(this);
    this.borrowAsset = this.borrowAsset.bind(this);
    this.repayAsset = this.repayAsset.bind(this);
    this.supplyAssetAndLockCollateral = this.supplyAssetAndLockCollateral.bind(this);
    this.unlockCollateralAndWithdrawAsset = this.unlockCollateralAndWithdrawAsset.bind(this);
    this.liquidateCollateral = this.liquidateCollateral.bind(this);
    this.setLiquidationFee = this.setLiquidationFee.bind(this);
    this.setInterestFee = this.setInterestFee.bind(this);
    this.createRewardScheme = this.createRewardScheme.bind(this);
    this.updateRewardScheme = this.updateRewardScheme.bind(this);
    this.claimRewards = this.claimRewards.bind(this);
    this.setStablecoinInterestRate = this.setStablecoinInterestRate.bind(this);
    this.setStablecoinMintCap = this.setStablecoinMintCap.bind(this);
    this.mintStablecoin = this.mintStablecoin.bind(this);
    this.returnStablecoin = this.returnStablecoin.bind(this);
    this.setCompleteLiquidationThreshold = this.setCompleteLiquidationThreshold.bind(this);
    this.setMinimumCloseFactor = this.setMinimumCloseFactor.bind(this);
    this.setSmallLiquidationSize = this.setSmallLiquidationSize.bind(this);
    this.setStalePriceGracePeriod = this.setStalePriceGracePeriod.bind(this);
    this.setCdpPaused = this.setCdpPaused.bind(this);
    this.convertTokenInCdpToGroupTokens = this.convertTokenInCdpToGroupTokens.bind(this);
    this.addEModeCategory = this.addEModeCategory.bind(this);
    this.updateEModeCategory = this.updateEModeCategory.bind(this);
    this.setAccountEMode = this.setAccountEMode.bind(this);
    this.removeAccountEMode = this.removeAccountEMode.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  addRateStrategy(request: MsgAddRateStrategy, useInterfaces: boolean = true): Promise<MsgAddRateStrategyResponse> {
    const data = MsgAddRateStrategy.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "AddRateStrategy", data);
    return promise.then(data => MsgAddRateStrategyResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  removeRateStrategy(request: MsgRemoveRateStrategy, useInterfaces: boolean = true): Promise<MsgRemoveRateStrategyResponse> {
    const data = MsgRemoveRateStrategy.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "RemoveRateStrategy", data);
    return promise.then(data => MsgRemoveRateStrategyResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  addAsset(request: MsgAddAsset, useInterfaces: boolean = true): Promise<MsgAddAssetResponse> {
    const data = MsgAddAsset.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "AddAsset", data);
    return promise.then(data => MsgAddAssetResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateRateStrategy(request: MsgUpdateRateStrategy, useInterfaces: boolean = true): Promise<MsgUpdateRateStrategyResponse> {
    const data = MsgUpdateRateStrategy.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "UpdateRateStrategy", data);
    return promise.then(data => MsgUpdateRateStrategyResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateAsset(request: MsgUpdateAsset, useInterfaces: boolean = true): Promise<MsgUpdateAssetResponse> {
    const data = MsgUpdateAsset.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "UpdateAsset", data);
    return promise.then(data => MsgUpdateAssetResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  supplyAsset(request: MsgSupplyAsset, useInterfaces: boolean = true): Promise<MsgSupplyAssetResponse> {
    const data = MsgSupplyAsset.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "SupplyAsset", data);
    return promise.then(data => MsgSupplyAssetResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  withdrawAsset(request: MsgWithdrawAsset, useInterfaces: boolean = true): Promise<MsgWithdrawAssetResponse> {
    const data = MsgWithdrawAsset.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "WithdrawAsset", data);
    return promise.then(data => MsgWithdrawAssetResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  lockCollateral(request: MsgLockCollateral, useInterfaces: boolean = true): Promise<MsgLockCollateralResponse> {
    const data = MsgLockCollateral.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "LockCollateral", data);
    return promise.then(data => MsgLockCollateralResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  unlockCollateral(request: MsgUnlockCollateral, useInterfaces: boolean = true): Promise<MsgUnlockCollateralResponse> {
    const data = MsgUnlockCollateral.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "UnlockCollateral", data);
    return promise.then(data => MsgUnlockCollateralResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  borrowAsset(request: MsgBorrowAsset, useInterfaces: boolean = true): Promise<MsgBorrowAssetResponse> {
    const data = MsgBorrowAsset.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "BorrowAsset", data);
    return promise.then(data => MsgBorrowAssetResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  repayAsset(request: MsgRepayAsset, useInterfaces: boolean = true): Promise<MsgRepayAssetResponse> {
    const data = MsgRepayAsset.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "RepayAsset", data);
    return promise.then(data => MsgRepayAssetResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  supplyAssetAndLockCollateral(request: MsgSupplyAssetAndLockCollateral, useInterfaces: boolean = true): Promise<MsgSupplyAssetAndLockCollateralResponse> {
    const data = MsgSupplyAssetAndLockCollateral.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "SupplyAssetAndLockCollateral", data);
    return promise.then(data => MsgSupplyAssetAndLockCollateralResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  unlockCollateralAndWithdrawAsset(request: MsgUnlockCollateralAndWithdrawAsset, useInterfaces: boolean = true): Promise<MsgUnlockCollateralAndWithdrawAssetResponse> {
    const data = MsgUnlockCollateralAndWithdrawAsset.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "UnlockCollateralAndWithdrawAsset", data);
    return promise.then(data => MsgUnlockCollateralAndWithdrawAssetResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  liquidateCollateral(request: MsgLiquidateCollateral, useInterfaces: boolean = true): Promise<MsgLiquidateCollateralResponse> {
    const data = MsgLiquidateCollateral.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "LiquidateCollateral", data);
    return promise.then(data => MsgLiquidateCollateralResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setLiquidationFee(request: MsgSetLiquidationFee, useInterfaces: boolean = true): Promise<MsgSetLiquidationFeeResponse> {
    const data = MsgSetLiquidationFee.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "SetLiquidationFee", data);
    return promise.then(data => MsgSetLiquidationFeeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setInterestFee(request: MsgSetInterestFee, useInterfaces: boolean = true): Promise<MsgSetInterestFeeResponse> {
    const data = MsgSetInterestFee.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "SetInterestFee", data);
    return promise.then(data => MsgSetInterestFeeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  createRewardScheme(request: MsgCreateRewardScheme, useInterfaces: boolean = true): Promise<MsgCreateRewardSchemeResponse> {
    const data = MsgCreateRewardScheme.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "CreateRewardScheme", data);
    return promise.then(data => MsgCreateRewardSchemeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateRewardScheme(request: MsgUpdateRewardScheme, useInterfaces: boolean = true): Promise<MsgUpdateRewardSchemeResponse> {
    const data = MsgUpdateRewardScheme.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "UpdateRewardScheme", data);
    return promise.then(data => MsgUpdateRewardSchemeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  claimRewards(request: MsgClaimRewards, useInterfaces: boolean = true): Promise<MsgClaimRewardsResponse> {
    const data = MsgClaimRewards.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "ClaimRewards", data);
    return promise.then(data => MsgClaimRewardsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setStablecoinInterestRate(request: MsgSetStablecoinInterestRate, useInterfaces: boolean = true): Promise<MsgSetStablecoinInterestRateResponse> {
    const data = MsgSetStablecoinInterestRate.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "SetStablecoinInterestRate", data);
    return promise.then(data => MsgSetStablecoinInterestRateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setStablecoinMintCap(request: MsgSetStablecoinMintCap, useInterfaces: boolean = true): Promise<MsgSetStablecoinMintCapResponse> {
    const data = MsgSetStablecoinMintCap.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "SetStablecoinMintCap", data);
    return promise.then(data => MsgSetStablecoinMintCapResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  mintStablecoin(request: MsgMintStablecoin, useInterfaces: boolean = true): Promise<MsgMintStablecoinResponse> {
    const data = MsgMintStablecoin.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "MintStablecoin", data);
    return promise.then(data => MsgMintStablecoinResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  returnStablecoin(request: MsgReturnStablecoin, useInterfaces: boolean = true): Promise<MsgReturnStablecoinResponse> {
    const data = MsgReturnStablecoin.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "ReturnStablecoin", data);
    return promise.then(data => MsgReturnStablecoinResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setCompleteLiquidationThreshold(request: MsgSetCompleteLiquidationThreshold, useInterfaces: boolean = true): Promise<MsgSetCompleteLiquidationThresholdResponse> {
    const data = MsgSetCompleteLiquidationThreshold.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "SetCompleteLiquidationThreshold", data);
    return promise.then(data => MsgSetCompleteLiquidationThresholdResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setMinimumCloseFactor(request: MsgSetMinimumCloseFactor, useInterfaces: boolean = true): Promise<MsgSetMinimumCloseFactorResponse> {
    const data = MsgSetMinimumCloseFactor.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "SetMinimumCloseFactor", data);
    return promise.then(data => MsgSetMinimumCloseFactorResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setSmallLiquidationSize(request: MsgSetSmallLiquidationSize, useInterfaces: boolean = true): Promise<MsgSetSmallLiquidationSizeResponse> {
    const data = MsgSetSmallLiquidationSize.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "SetSmallLiquidationSize", data);
    return promise.then(data => MsgSetSmallLiquidationSizeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setStalePriceGracePeriod(request: MsgSetStalePriceGracePeriod, useInterfaces: boolean = true): Promise<MsgSetStalePriceGracePeriodResponse> {
    const data = MsgSetStalePriceGracePeriod.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "SetStalePriceGracePeriod", data);
    return promise.then(data => MsgSetStalePriceGracePeriodResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setCdpPaused(request: MsgSetCdpPaused, useInterfaces: boolean = true): Promise<MsgSetCdpPausedResponse> {
    const data = MsgSetCdpPaused.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "SetCdpPaused", data);
    return promise.then(data => MsgSetCdpPausedResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  convertTokenInCdpToGroupTokens(request: MsgConvertTokenInCdpToGroupTokens, useInterfaces: boolean = true): Promise<MsgConvertTokenInCdpToGroupTokensResponse> {
    const data = MsgConvertTokenInCdpToGroupTokens.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "ConvertTokenInCdpToGroupTokens", data);
    return promise.then(data => MsgConvertTokenInCdpToGroupTokensResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  addEModeCategory(request: MsgAddEModeCategory, useInterfaces: boolean = true): Promise<MsgAddEModeCategoryResponse> {
    const data = MsgAddEModeCategory.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "AddEModeCategory", data);
    return promise.then(data => MsgAddEModeCategoryResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateEModeCategory(request: MsgUpdateEModeCategory, useInterfaces: boolean = true): Promise<MsgUpdateEModeCategoryResponse> {
    const data = MsgUpdateEModeCategory.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "UpdateEModeCategory", data);
    return promise.then(data => MsgUpdateEModeCategoryResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setAccountEMode(request: MsgSetAccountEMode, useInterfaces: boolean = true): Promise<MsgSetAccountEModeResponse> {
    const data = MsgSetAccountEMode.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "SetAccountEMode", data);
    return promise.then(data => MsgSetAccountEModeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  removeAccountEMode(request: MsgRemoveAccountEMode, useInterfaces: boolean = true): Promise<MsgRemoveAccountEModeResponse> {
    const data = MsgRemoveAccountEMode.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "RemoveAccountEMode", data);
    return promise.then(data => MsgRemoveAccountEModeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("Switcheo.carbon.cdp.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}