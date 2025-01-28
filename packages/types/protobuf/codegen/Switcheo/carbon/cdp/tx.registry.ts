//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgAddRateStrategy, MsgRemoveRateStrategy, MsgAddAsset, MsgUpdateRateStrategy, MsgUpdateAsset, MsgSupplyAsset, MsgWithdrawAsset, MsgLockCollateral, MsgUnlockCollateral, MsgBorrowAsset, MsgRepayAsset, MsgSupplyAssetAndLockCollateral, MsgUnlockCollateralAndWithdrawAsset, MsgLiquidateCollateral, MsgSetLiquidationFee, MsgSetInterestFee, MsgCreateRewardScheme, MsgUpdateRewardScheme, MsgClaimRewards, MsgSetStablecoinInterestRate, MsgSetStablecoinMintCap, MsgMintStablecoin, MsgReturnStablecoin, MsgSetCompleteLiquidationThreshold, MsgSetMinimumCloseFactor, MsgSetSmallLiquidationSize, MsgSetStalePriceGracePeriod, MsgSetCdpPaused, MsgConvertTokenInCdpToGroupTokens, MsgAddEModeCategory, MsgUpdateEModeCategory, MsgSetAccountEMode, MsgRemoveAccountEMode, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/Switcheo.carbon.cdp.MsgAddRateStrategy", MsgAddRateStrategy], ["/Switcheo.carbon.cdp.MsgRemoveRateStrategy", MsgRemoveRateStrategy], ["/Switcheo.carbon.cdp.MsgAddAsset", MsgAddAsset], ["/Switcheo.carbon.cdp.MsgUpdateRateStrategy", MsgUpdateRateStrategy], ["/Switcheo.carbon.cdp.MsgUpdateAsset", MsgUpdateAsset], ["/Switcheo.carbon.cdp.MsgSupplyAsset", MsgSupplyAsset], ["/Switcheo.carbon.cdp.MsgWithdrawAsset", MsgWithdrawAsset], ["/Switcheo.carbon.cdp.MsgLockCollateral", MsgLockCollateral], ["/Switcheo.carbon.cdp.MsgUnlockCollateral", MsgUnlockCollateral], ["/Switcheo.carbon.cdp.MsgBorrowAsset", MsgBorrowAsset], ["/Switcheo.carbon.cdp.MsgRepayAsset", MsgRepayAsset], ["/Switcheo.carbon.cdp.MsgSupplyAssetAndLockCollateral", MsgSupplyAssetAndLockCollateral], ["/Switcheo.carbon.cdp.MsgUnlockCollateralAndWithdrawAsset", MsgUnlockCollateralAndWithdrawAsset], ["/Switcheo.carbon.cdp.MsgLiquidateCollateral", MsgLiquidateCollateral], ["/Switcheo.carbon.cdp.MsgSetLiquidationFee", MsgSetLiquidationFee], ["/Switcheo.carbon.cdp.MsgSetInterestFee", MsgSetInterestFee], ["/Switcheo.carbon.cdp.MsgCreateRewardScheme", MsgCreateRewardScheme], ["/Switcheo.carbon.cdp.MsgUpdateRewardScheme", MsgUpdateRewardScheme], ["/Switcheo.carbon.cdp.MsgClaimRewards", MsgClaimRewards], ["/Switcheo.carbon.cdp.MsgSetStablecoinInterestRate", MsgSetStablecoinInterestRate], ["/Switcheo.carbon.cdp.MsgSetStablecoinMintCap", MsgSetStablecoinMintCap], ["/Switcheo.carbon.cdp.MsgMintStablecoin", MsgMintStablecoin], ["/Switcheo.carbon.cdp.MsgReturnStablecoin", MsgReturnStablecoin], ["/Switcheo.carbon.cdp.MsgSetCompleteLiquidationThreshold", MsgSetCompleteLiquidationThreshold], ["/Switcheo.carbon.cdp.MsgSetMinimumCloseFactor", MsgSetMinimumCloseFactor], ["/Switcheo.carbon.cdp.MsgSetSmallLiquidationSize", MsgSetSmallLiquidationSize], ["/Switcheo.carbon.cdp.MsgSetStalePriceGracePeriod", MsgSetStalePriceGracePeriod], ["/Switcheo.carbon.cdp.MsgSetCdpPaused", MsgSetCdpPaused], ["/Switcheo.carbon.cdp.MsgConvertTokenInCdpToGroupTokens", MsgConvertTokenInCdpToGroupTokens], ["/Switcheo.carbon.cdp.MsgAddEModeCategory", MsgAddEModeCategory], ["/Switcheo.carbon.cdp.MsgUpdateEModeCategory", MsgUpdateEModeCategory], ["/Switcheo.carbon.cdp.MsgSetAccountEMode", MsgSetAccountEMode], ["/Switcheo.carbon.cdp.MsgRemoveAccountEMode", MsgRemoveAccountEMode], ["/Switcheo.carbon.cdp.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    addRateStrategy(value: MsgAddRateStrategy) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgAddRateStrategy",
        value: MsgAddRateStrategy.encode(value).finish()
      };
    },
    removeRateStrategy(value: MsgRemoveRateStrategy) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgRemoveRateStrategy",
        value: MsgRemoveRateStrategy.encode(value).finish()
      };
    },
    addAsset(value: MsgAddAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgAddAsset",
        value: MsgAddAsset.encode(value).finish()
      };
    },
    updateRateStrategy(value: MsgUpdateRateStrategy) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUpdateRateStrategy",
        value: MsgUpdateRateStrategy.encode(value).finish()
      };
    },
    updateAsset(value: MsgUpdateAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUpdateAsset",
        value: MsgUpdateAsset.encode(value).finish()
      };
    },
    supplyAsset(value: MsgSupplyAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSupplyAsset",
        value: MsgSupplyAsset.encode(value).finish()
      };
    },
    withdrawAsset(value: MsgWithdrawAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgWithdrawAsset",
        value: MsgWithdrawAsset.encode(value).finish()
      };
    },
    lockCollateral(value: MsgLockCollateral) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgLockCollateral",
        value: MsgLockCollateral.encode(value).finish()
      };
    },
    unlockCollateral(value: MsgUnlockCollateral) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUnlockCollateral",
        value: MsgUnlockCollateral.encode(value).finish()
      };
    },
    borrowAsset(value: MsgBorrowAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgBorrowAsset",
        value: MsgBorrowAsset.encode(value).finish()
      };
    },
    repayAsset(value: MsgRepayAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgRepayAsset",
        value: MsgRepayAsset.encode(value).finish()
      };
    },
    supplyAssetAndLockCollateral(value: MsgSupplyAssetAndLockCollateral) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSupplyAssetAndLockCollateral",
        value: MsgSupplyAssetAndLockCollateral.encode(value).finish()
      };
    },
    unlockCollateralAndWithdrawAsset(value: MsgUnlockCollateralAndWithdrawAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUnlockCollateralAndWithdrawAsset",
        value: MsgUnlockCollateralAndWithdrawAsset.encode(value).finish()
      };
    },
    liquidateCollateral(value: MsgLiquidateCollateral) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgLiquidateCollateral",
        value: MsgLiquidateCollateral.encode(value).finish()
      };
    },
    setLiquidationFee(value: MsgSetLiquidationFee) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetLiquidationFee",
        value: MsgSetLiquidationFee.encode(value).finish()
      };
    },
    setInterestFee(value: MsgSetInterestFee) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetInterestFee",
        value: MsgSetInterestFee.encode(value).finish()
      };
    },
    createRewardScheme(value: MsgCreateRewardScheme) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgCreateRewardScheme",
        value: MsgCreateRewardScheme.encode(value).finish()
      };
    },
    updateRewardScheme(value: MsgUpdateRewardScheme) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUpdateRewardScheme",
        value: MsgUpdateRewardScheme.encode(value).finish()
      };
    },
    claimRewards(value: MsgClaimRewards) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgClaimRewards",
        value: MsgClaimRewards.encode(value).finish()
      };
    },
    setStablecoinInterestRate(value: MsgSetStablecoinInterestRate) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetStablecoinInterestRate",
        value: MsgSetStablecoinInterestRate.encode(value).finish()
      };
    },
    setStablecoinMintCap(value: MsgSetStablecoinMintCap) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetStablecoinMintCap",
        value: MsgSetStablecoinMintCap.encode(value).finish()
      };
    },
    mintStablecoin(value: MsgMintStablecoin) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgMintStablecoin",
        value: MsgMintStablecoin.encode(value).finish()
      };
    },
    returnStablecoin(value: MsgReturnStablecoin) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgReturnStablecoin",
        value: MsgReturnStablecoin.encode(value).finish()
      };
    },
    setCompleteLiquidationThreshold(value: MsgSetCompleteLiquidationThreshold) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetCompleteLiquidationThreshold",
        value: MsgSetCompleteLiquidationThreshold.encode(value).finish()
      };
    },
    setMinimumCloseFactor(value: MsgSetMinimumCloseFactor) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetMinimumCloseFactor",
        value: MsgSetMinimumCloseFactor.encode(value).finish()
      };
    },
    setSmallLiquidationSize(value: MsgSetSmallLiquidationSize) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetSmallLiquidationSize",
        value: MsgSetSmallLiquidationSize.encode(value).finish()
      };
    },
    setStalePriceGracePeriod(value: MsgSetStalePriceGracePeriod) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetStalePriceGracePeriod",
        value: MsgSetStalePriceGracePeriod.encode(value).finish()
      };
    },
    setCdpPaused(value: MsgSetCdpPaused) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetCdpPaused",
        value: MsgSetCdpPaused.encode(value).finish()
      };
    },
    convertTokenInCdpToGroupTokens(value: MsgConvertTokenInCdpToGroupTokens) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgConvertTokenInCdpToGroupTokens",
        value: MsgConvertTokenInCdpToGroupTokens.encode(value).finish()
      };
    },
    addEModeCategory(value: MsgAddEModeCategory) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgAddEModeCategory",
        value: MsgAddEModeCategory.encode(value).finish()
      };
    },
    updateEModeCategory(value: MsgUpdateEModeCategory) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUpdateEModeCategory",
        value: MsgUpdateEModeCategory.encode(value).finish()
      };
    },
    setAccountEMode(value: MsgSetAccountEMode) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetAccountEMode",
        value: MsgSetAccountEMode.encode(value).finish()
      };
    },
    removeAccountEMode(value: MsgRemoveAccountEMode) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgRemoveAccountEMode",
        value: MsgRemoveAccountEMode.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    addRateStrategy(value: MsgAddRateStrategy) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgAddRateStrategy",
        value
      };
    },
    removeRateStrategy(value: MsgRemoveRateStrategy) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgRemoveRateStrategy",
        value
      };
    },
    addAsset(value: MsgAddAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgAddAsset",
        value
      };
    },
    updateRateStrategy(value: MsgUpdateRateStrategy) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUpdateRateStrategy",
        value
      };
    },
    updateAsset(value: MsgUpdateAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUpdateAsset",
        value
      };
    },
    supplyAsset(value: MsgSupplyAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSupplyAsset",
        value
      };
    },
    withdrawAsset(value: MsgWithdrawAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgWithdrawAsset",
        value
      };
    },
    lockCollateral(value: MsgLockCollateral) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgLockCollateral",
        value
      };
    },
    unlockCollateral(value: MsgUnlockCollateral) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUnlockCollateral",
        value
      };
    },
    borrowAsset(value: MsgBorrowAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgBorrowAsset",
        value
      };
    },
    repayAsset(value: MsgRepayAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgRepayAsset",
        value
      };
    },
    supplyAssetAndLockCollateral(value: MsgSupplyAssetAndLockCollateral) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSupplyAssetAndLockCollateral",
        value
      };
    },
    unlockCollateralAndWithdrawAsset(value: MsgUnlockCollateralAndWithdrawAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUnlockCollateralAndWithdrawAsset",
        value
      };
    },
    liquidateCollateral(value: MsgLiquidateCollateral) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgLiquidateCollateral",
        value
      };
    },
    setLiquidationFee(value: MsgSetLiquidationFee) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetLiquidationFee",
        value
      };
    },
    setInterestFee(value: MsgSetInterestFee) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetInterestFee",
        value
      };
    },
    createRewardScheme(value: MsgCreateRewardScheme) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgCreateRewardScheme",
        value
      };
    },
    updateRewardScheme(value: MsgUpdateRewardScheme) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUpdateRewardScheme",
        value
      };
    },
    claimRewards(value: MsgClaimRewards) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgClaimRewards",
        value
      };
    },
    setStablecoinInterestRate(value: MsgSetStablecoinInterestRate) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetStablecoinInterestRate",
        value
      };
    },
    setStablecoinMintCap(value: MsgSetStablecoinMintCap) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetStablecoinMintCap",
        value
      };
    },
    mintStablecoin(value: MsgMintStablecoin) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgMintStablecoin",
        value
      };
    },
    returnStablecoin(value: MsgReturnStablecoin) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgReturnStablecoin",
        value
      };
    },
    setCompleteLiquidationThreshold(value: MsgSetCompleteLiquidationThreshold) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetCompleteLiquidationThreshold",
        value
      };
    },
    setMinimumCloseFactor(value: MsgSetMinimumCloseFactor) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetMinimumCloseFactor",
        value
      };
    },
    setSmallLiquidationSize(value: MsgSetSmallLiquidationSize) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetSmallLiquidationSize",
        value
      };
    },
    setStalePriceGracePeriod(value: MsgSetStalePriceGracePeriod) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetStalePriceGracePeriod",
        value
      };
    },
    setCdpPaused(value: MsgSetCdpPaused) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetCdpPaused",
        value
      };
    },
    convertTokenInCdpToGroupTokens(value: MsgConvertTokenInCdpToGroupTokens) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgConvertTokenInCdpToGroupTokens",
        value
      };
    },
    addEModeCategory(value: MsgAddEModeCategory) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgAddEModeCategory",
        value
      };
    },
    updateEModeCategory(value: MsgUpdateEModeCategory) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUpdateEModeCategory",
        value
      };
    },
    setAccountEMode(value: MsgSetAccountEMode) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetAccountEMode",
        value
      };
    },
    removeAccountEMode(value: MsgRemoveAccountEMode) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgRemoveAccountEMode",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUpdateParams",
        value
      };
    }
  },
  fromPartial: {
    addRateStrategy(value: MsgAddRateStrategy) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgAddRateStrategy",
        value: MsgAddRateStrategy.fromPartial(value)
      };
    },
    removeRateStrategy(value: MsgRemoveRateStrategy) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgRemoveRateStrategy",
        value: MsgRemoveRateStrategy.fromPartial(value)
      };
    },
    addAsset(value: MsgAddAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgAddAsset",
        value: MsgAddAsset.fromPartial(value)
      };
    },
    updateRateStrategy(value: MsgUpdateRateStrategy) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUpdateRateStrategy",
        value: MsgUpdateRateStrategy.fromPartial(value)
      };
    },
    updateAsset(value: MsgUpdateAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUpdateAsset",
        value: MsgUpdateAsset.fromPartial(value)
      };
    },
    supplyAsset(value: MsgSupplyAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSupplyAsset",
        value: MsgSupplyAsset.fromPartial(value)
      };
    },
    withdrawAsset(value: MsgWithdrawAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgWithdrawAsset",
        value: MsgWithdrawAsset.fromPartial(value)
      };
    },
    lockCollateral(value: MsgLockCollateral) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgLockCollateral",
        value: MsgLockCollateral.fromPartial(value)
      };
    },
    unlockCollateral(value: MsgUnlockCollateral) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUnlockCollateral",
        value: MsgUnlockCollateral.fromPartial(value)
      };
    },
    borrowAsset(value: MsgBorrowAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgBorrowAsset",
        value: MsgBorrowAsset.fromPartial(value)
      };
    },
    repayAsset(value: MsgRepayAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgRepayAsset",
        value: MsgRepayAsset.fromPartial(value)
      };
    },
    supplyAssetAndLockCollateral(value: MsgSupplyAssetAndLockCollateral) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSupplyAssetAndLockCollateral",
        value: MsgSupplyAssetAndLockCollateral.fromPartial(value)
      };
    },
    unlockCollateralAndWithdrawAsset(value: MsgUnlockCollateralAndWithdrawAsset) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUnlockCollateralAndWithdrawAsset",
        value: MsgUnlockCollateralAndWithdrawAsset.fromPartial(value)
      };
    },
    liquidateCollateral(value: MsgLiquidateCollateral) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgLiquidateCollateral",
        value: MsgLiquidateCollateral.fromPartial(value)
      };
    },
    setLiquidationFee(value: MsgSetLiquidationFee) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetLiquidationFee",
        value: MsgSetLiquidationFee.fromPartial(value)
      };
    },
    setInterestFee(value: MsgSetInterestFee) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetInterestFee",
        value: MsgSetInterestFee.fromPartial(value)
      };
    },
    createRewardScheme(value: MsgCreateRewardScheme) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgCreateRewardScheme",
        value: MsgCreateRewardScheme.fromPartial(value)
      };
    },
    updateRewardScheme(value: MsgUpdateRewardScheme) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUpdateRewardScheme",
        value: MsgUpdateRewardScheme.fromPartial(value)
      };
    },
    claimRewards(value: MsgClaimRewards) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgClaimRewards",
        value: MsgClaimRewards.fromPartial(value)
      };
    },
    setStablecoinInterestRate(value: MsgSetStablecoinInterestRate) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetStablecoinInterestRate",
        value: MsgSetStablecoinInterestRate.fromPartial(value)
      };
    },
    setStablecoinMintCap(value: MsgSetStablecoinMintCap) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetStablecoinMintCap",
        value: MsgSetStablecoinMintCap.fromPartial(value)
      };
    },
    mintStablecoin(value: MsgMintStablecoin) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgMintStablecoin",
        value: MsgMintStablecoin.fromPartial(value)
      };
    },
    returnStablecoin(value: MsgReturnStablecoin) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgReturnStablecoin",
        value: MsgReturnStablecoin.fromPartial(value)
      };
    },
    setCompleteLiquidationThreshold(value: MsgSetCompleteLiquidationThreshold) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetCompleteLiquidationThreshold",
        value: MsgSetCompleteLiquidationThreshold.fromPartial(value)
      };
    },
    setMinimumCloseFactor(value: MsgSetMinimumCloseFactor) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetMinimumCloseFactor",
        value: MsgSetMinimumCloseFactor.fromPartial(value)
      };
    },
    setSmallLiquidationSize(value: MsgSetSmallLiquidationSize) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetSmallLiquidationSize",
        value: MsgSetSmallLiquidationSize.fromPartial(value)
      };
    },
    setStalePriceGracePeriod(value: MsgSetStalePriceGracePeriod) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetStalePriceGracePeriod",
        value: MsgSetStalePriceGracePeriod.fromPartial(value)
      };
    },
    setCdpPaused(value: MsgSetCdpPaused) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetCdpPaused",
        value: MsgSetCdpPaused.fromPartial(value)
      };
    },
    convertTokenInCdpToGroupTokens(value: MsgConvertTokenInCdpToGroupTokens) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgConvertTokenInCdpToGroupTokens",
        value: MsgConvertTokenInCdpToGroupTokens.fromPartial(value)
      };
    },
    addEModeCategory(value: MsgAddEModeCategory) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgAddEModeCategory",
        value: MsgAddEModeCategory.fromPartial(value)
      };
    },
    updateEModeCategory(value: MsgUpdateEModeCategory) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUpdateEModeCategory",
        value: MsgUpdateEModeCategory.fromPartial(value)
      };
    },
    setAccountEMode(value: MsgSetAccountEMode) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgSetAccountEMode",
        value: MsgSetAccountEMode.fromPartial(value)
      };
    },
    removeAccountEMode(value: MsgRemoveAccountEMode) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgRemoveAccountEMode",
        value: MsgRemoveAccountEMode.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/Switcheo.carbon.cdp.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};