import { MsgAddRateStrategy, MsgRemoveRateStrategy, MsgAddAsset, MsgUpdateRateStrategy, MsgUpdateAsset, MsgSupplyAsset, MsgWithdrawAsset, MsgLockCollateral, MsgUnlockCollateral, MsgBorrowAsset, MsgRepayAsset, MsgSupplyAssetAndLockCollateral, MsgUnlockCollateralAndWithdrawAsset, MsgLiquidateCollateral, MsgSetLiquidationFee, MsgSetInterestFee, MsgCreateRewardScheme, MsgUpdateRewardScheme, MsgClaimRewards, MsgSetStablecoinInterestRate, MsgSetStablecoinMintCap, MsgMintStablecoin, MsgReturnStablecoin, MsgSetCompleteLiquidationThreshold, MsgSetMinimumCloseFactor, MsgSetSmallLiquidationSize, MsgSetStalePriceGracePeriod, MsgSetCdpPaused, MsgConvertTokenInCdpToGroupTokens, MsgAddEModeCategory, MsgUpdateEModeCategory, MsgSetAccountEMode, MsgRemoveAccountEMode, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/Switcheo.carbon.cdp.MsgAddRateStrategy": {
    aminoType: "cdp/AddRateStrategy",
    toAmino: MsgAddRateStrategy.toAmino,
    fromAmino: MsgAddRateStrategy.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgRemoveRateStrategy": {
    aminoType: "cdp/RemoveRateStrategy",
    toAmino: MsgRemoveRateStrategy.toAmino,
    fromAmino: MsgRemoveRateStrategy.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgAddAsset": {
    aminoType: "cdp/AddAsset",
    toAmino: MsgAddAsset.toAmino,
    fromAmino: MsgAddAsset.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgUpdateRateStrategy": {
    aminoType: "cdp/UpdateRateStrategy",
    toAmino: MsgUpdateRateStrategy.toAmino,
    fromAmino: MsgUpdateRateStrategy.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgUpdateAsset": {
    aminoType: "cdp/UpdateAsset",
    toAmino: MsgUpdateAsset.toAmino,
    fromAmino: MsgUpdateAsset.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgSupplyAsset": {
    aminoType: "cdp/SupplyAsset",
    toAmino: MsgSupplyAsset.toAmino,
    fromAmino: MsgSupplyAsset.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgWithdrawAsset": {
    aminoType: "cdp/WithdrawAsset",
    toAmino: MsgWithdrawAsset.toAmino,
    fromAmino: MsgWithdrawAsset.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgLockCollateral": {
    aminoType: "cdp/LockCollateral",
    toAmino: MsgLockCollateral.toAmino,
    fromAmino: MsgLockCollateral.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgUnlockCollateral": {
    aminoType: "cdp/UnlockCollateral",
    toAmino: MsgUnlockCollateral.toAmino,
    fromAmino: MsgUnlockCollateral.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgBorrowAsset": {
    aminoType: "cdp/BorrowAsset",
    toAmino: MsgBorrowAsset.toAmino,
    fromAmino: MsgBorrowAsset.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgRepayAsset": {
    aminoType: "cdp/RepayAsset",
    toAmino: MsgRepayAsset.toAmino,
    fromAmino: MsgRepayAsset.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgSupplyAssetAndLockCollateral": {
    aminoType: "cdp/SupplyAssetAndLockCollateral",
    toAmino: MsgSupplyAssetAndLockCollateral.toAmino,
    fromAmino: MsgSupplyAssetAndLockCollateral.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgUnlockCollateralAndWithdrawAsset": {
    aminoType: "cdp/UnlockCollateralAndWithdrawAsset",
    toAmino: MsgUnlockCollateralAndWithdrawAsset.toAmino,
    fromAmino: MsgUnlockCollateralAndWithdrawAsset.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgLiquidateCollateral": {
    aminoType: "cdp/LiquidateCollateral",
    toAmino: MsgLiquidateCollateral.toAmino,
    fromAmino: MsgLiquidateCollateral.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgSetLiquidationFee": {
    aminoType: "cdp/SetLiquidationFee",
    toAmino: MsgSetLiquidationFee.toAmino,
    fromAmino: MsgSetLiquidationFee.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgSetInterestFee": {
    aminoType: "cdp/SetInterestFee",
    toAmino: MsgSetInterestFee.toAmino,
    fromAmino: MsgSetInterestFee.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgCreateRewardScheme": {
    aminoType: "cdp/CreateRewardScheme",
    toAmino: MsgCreateRewardScheme.toAmino,
    fromAmino: MsgCreateRewardScheme.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgUpdateRewardScheme": {
    aminoType: "cdp/UpdateRewardScheme",
    toAmino: MsgUpdateRewardScheme.toAmino,
    fromAmino: MsgUpdateRewardScheme.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgClaimRewards": {
    aminoType: "cdp/ClaimRewards",
    toAmino: MsgClaimRewards.toAmino,
    fromAmino: MsgClaimRewards.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgSetStablecoinInterestRate": {
    aminoType: "cdp/SetStablecoinInterestRate",
    toAmino: MsgSetStablecoinInterestRate.toAmino,
    fromAmino: MsgSetStablecoinInterestRate.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgSetStablecoinMintCap": {
    aminoType: "cdp/SetStablecoinMintCap",
    toAmino: MsgSetStablecoinMintCap.toAmino,
    fromAmino: MsgSetStablecoinMintCap.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgMintStablecoin": {
    aminoType: "cdp/MintStablecoin",
    toAmino: MsgMintStablecoin.toAmino,
    fromAmino: MsgMintStablecoin.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgReturnStablecoin": {
    aminoType: "cdp/ReturnStablecoin",
    toAmino: MsgReturnStablecoin.toAmino,
    fromAmino: MsgReturnStablecoin.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgSetCompleteLiquidationThreshold": {
    aminoType: "cdp/SetCompleteLiquidationThreshold",
    toAmino: MsgSetCompleteLiquidationThreshold.toAmino,
    fromAmino: MsgSetCompleteLiquidationThreshold.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgSetMinimumCloseFactor": {
    aminoType: "cdp/SetMinimumCloseFactor",
    toAmino: MsgSetMinimumCloseFactor.toAmino,
    fromAmino: MsgSetMinimumCloseFactor.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgSetSmallLiquidationSize": {
    aminoType: "cdp/SetSmallLiquidationSize",
    toAmino: MsgSetSmallLiquidationSize.toAmino,
    fromAmino: MsgSetSmallLiquidationSize.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgSetStalePriceGracePeriod": {
    aminoType: "cdp/SetStalePriceGracePeriod",
    toAmino: MsgSetStalePriceGracePeriod.toAmino,
    fromAmino: MsgSetStalePriceGracePeriod.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgSetCdpPaused": {
    aminoType: "cdp/SetCdpPaused",
    toAmino: MsgSetCdpPaused.toAmino,
    fromAmino: MsgSetCdpPaused.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgConvertTokenInCdpToGroupTokens": {
    aminoType: "cdp/ConvertTokenInCdpToGroupTokens",
    toAmino: MsgConvertTokenInCdpToGroupTokens.toAmino,
    fromAmino: MsgConvertTokenInCdpToGroupTokens.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgAddEModeCategory": {
    aminoType: "cdp/AddEModeCategory",
    toAmino: MsgAddEModeCategory.toAmino,
    fromAmino: MsgAddEModeCategory.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgUpdateEModeCategory": {
    aminoType: "cdp/UpdateEModeCategory",
    toAmino: MsgUpdateEModeCategory.toAmino,
    fromAmino: MsgUpdateEModeCategory.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgSetAccountEMode": {
    aminoType: "cdp/SetAccountEMode",
    toAmino: MsgSetAccountEMode.toAmino,
    fromAmino: MsgSetAccountEMode.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgRemoveAccountEMode": {
    aminoType: "cdp/RemoveAccountEMode",
    toAmino: MsgRemoveAccountEMode.toAmino,
    fromAmino: MsgRemoveAccountEMode.fromAmino
  },
  "/Switcheo.carbon.cdp.MsgUpdateParams": {
    aminoType: "cdp/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};