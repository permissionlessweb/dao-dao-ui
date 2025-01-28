import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
import { BoolValue, BoolValueAmino, BoolValueSDKType } from "../../../google/protobuf/wrappers";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
/** Params defines the parameters for the module. */
export interface Params {
  interestFee: string;
  liquidationFee: string;
  stablecoinMintCap: string;
  /**
   * Complete Liquidation Threshold determines how far between
   * liquidation_threshold (LT) and collateral_value (CV) a borrower's
   * borrowed value must have progressed in order to allow a full liquidation.
   * 0.3 indicates 30% of the way from LT to CV.
   * Valid values: 0-1.
   */
  completeLiquidationThreshold: string;
  /**
   * Close Factor determines the portion of a borrower's position that can be
   * liquidated in a single event. Minimum Close Factor is Close Factor at
   * liquidation_threshold. 0.1 means that that 10% of the borrower position can
   * be liquidated when the borrowed value passes the liquidation_threshold.
   * close_factor scales linearly between minimum_close_factor and 1.0,
   * reaching its maximum when borrowed value passes
   * complete_liquidation_threshold. We can put it into the picture:
   * 
   *             borrowed           C := collateral
   *             value                   value
   *  --- | ------- | ----- | -------- | ------->
   *      L                 CL
   * 
   * liquidation = liquidation_threshold * C
   * CL = L + (C-CL) * complete_liquidation_threshold
   *    is the borrowed value above which close factor will be 1.
   * 
   * Valid values: 0-1.
   */
  minimumCloseFactor: string;
  /**
   * Small Liquidation Size determines the USD value at which a borrow is
   * considered small enough to be liquidated in a single transaction, bypassing
   * dynamic close factor.
   */
  smallLiquidationSize: string;
  /**
   * stale_price_grace_period determines the grace period before an oracle price
   * is regarded as stale. This would cause certain actions like borrowing to be
   * paused
   */
  stalePriceGracePeriod: Duration | undefined;
  /**
   * cdp_paused if true, causes all supply, locking, lending, borrowing and
   * liquidations to be paused
   */
  cdpPaused: boolean;
  /**
   * time interval in between each adjustment of stablecoin interest rate to
   * help stablecoin price stability
   */
  stablecoinInterestRateEpoch: Duration | undefined;
  /**
   * used in formula to calculate stablecoin interest rate to help stablecoin
   * price stability
   */
  stablecoinInterestRateAdjusterCoefficient: string;
}
export interface ParamsProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  interest_fee?: string;
  liquidation_fee?: string;
  stablecoin_mint_cap?: string;
  /**
   * Complete Liquidation Threshold determines how far between
   * liquidation_threshold (LT) and collateral_value (CV) a borrower's
   * borrowed value must have progressed in order to allow a full liquidation.
   * 0.3 indicates 30% of the way from LT to CV.
   * Valid values: 0-1.
   */
  complete_liquidation_threshold?: string;
  /**
   * Close Factor determines the portion of a borrower's position that can be
   * liquidated in a single event. Minimum Close Factor is Close Factor at
   * liquidation_threshold. 0.1 means that that 10% of the borrower position can
   * be liquidated when the borrowed value passes the liquidation_threshold.
   * close_factor scales linearly between minimum_close_factor and 1.0,
   * reaching its maximum when borrowed value passes
   * complete_liquidation_threshold. We can put it into the picture:
   * 
   *             borrowed           C := collateral
   *             value                   value
   *  --- | ------- | ----- | -------- | ------->
   *      L                 CL
   * 
   * liquidation = liquidation_threshold * C
   * CL = L + (C-CL) * complete_liquidation_threshold
   *    is the borrowed value above which close factor will be 1.
   * 
   * Valid values: 0-1.
   */
  minimum_close_factor?: string;
  /**
   * Small Liquidation Size determines the USD value at which a borrow is
   * considered small enough to be liquidated in a single transaction, bypassing
   * dynamic close factor.
   */
  small_liquidation_size?: string;
  /**
   * stale_price_grace_period determines the grace period before an oracle price
   * is regarded as stale. This would cause certain actions like borrowing to be
   * paused
   */
  stale_price_grace_period?: DurationAmino | undefined;
  /**
   * cdp_paused if true, causes all supply, locking, lending, borrowing and
   * liquidations to be paused
   */
  cdp_paused?: boolean;
  /**
   * time interval in between each adjustment of stablecoin interest rate to
   * help stablecoin price stability
   */
  stablecoin_interest_rate_epoch?: DurationAmino | undefined;
  /**
   * used in formula to calculate stablecoin interest rate to help stablecoin
   * price stability
   */
  stablecoin_interest_rate_adjuster_coefficient?: string;
}
export interface ParamsAminoMsg {
  type: "/Switcheo.carbon.cdp.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  interest_fee: string;
  liquidation_fee: string;
  stablecoin_mint_cap: string;
  complete_liquidation_threshold: string;
  minimum_close_factor: string;
  small_liquidation_size: string;
  stale_price_grace_period: DurationSDKType | undefined;
  cdp_paused: boolean;
  stablecoin_interest_rate_epoch: DurationSDKType | undefined;
  stablecoin_interest_rate_adjuster_coefficient: string;
}
/** ParamsToUpdate allows optional fields for Params. */
export interface ParamsToUpdate {
  interestFee?: string;
  liquidationFee?: string;
  stablecoinMintCap?: string;
  completeLiquidationThreshold?: string;
  minimumCloseFactor?: string;
  smallLiquidationSize?: string;
  stalePriceGracePeriod?: Duration | undefined;
  cdpPaused?: BoolValue | undefined;
  stablecoinInterestRateEpoch?: Duration | undefined;
  stablecoinInterestRateAdjusterCoefficient?: string;
}
export interface ParamsToUpdateProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.ParamsToUpdate";
  value: Uint8Array;
}
/** ParamsToUpdate allows optional fields for Params. */
export interface ParamsToUpdateAmino {
  interest_fee?: string;
  liquidation_fee?: string;
  stablecoin_mint_cap?: string;
  complete_liquidation_threshold?: string;
  minimum_close_factor?: string;
  small_liquidation_size?: string;
  stale_price_grace_period?: DurationAmino | undefined;
  cdp_paused?: BoolValueAmino | undefined;
  stablecoin_interest_rate_epoch?: DurationAmino | undefined;
  stablecoin_interest_rate_adjuster_coefficient?: string;
}
export interface ParamsToUpdateAminoMsg {
  type: "/Switcheo.carbon.cdp.ParamsToUpdate";
  value: ParamsToUpdateAmino;
}
/** ParamsToUpdate allows optional fields for Params. */
export interface ParamsToUpdateSDKType {
  interest_fee?: string;
  liquidation_fee?: string;
  stablecoin_mint_cap?: string;
  complete_liquidation_threshold?: string;
  minimum_close_factor?: string;
  small_liquidation_size?: string;
  stale_price_grace_period?: DurationSDKType | undefined;
  cdp_paused?: BoolValueSDKType | undefined;
  stablecoin_interest_rate_epoch?: DurationSDKType | undefined;
  stablecoin_interest_rate_adjuster_coefficient?: string;
}
function createBaseParams(): Params {
  return {
    interestFee: "",
    liquidationFee: "",
    stablecoinMintCap: "",
    completeLiquidationThreshold: "",
    minimumCloseFactor: "",
    smallLiquidationSize: "",
    stalePriceGracePeriod: Duration.fromPartial({}),
    cdpPaused: false,
    stablecoinInterestRateEpoch: Duration.fromPartial({}),
    stablecoinInterestRateAdjusterCoefficient: ""
  };
}
export const Params = {
  typeUrl: "/Switcheo.carbon.cdp.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.interestFee !== "") {
      writer.uint32(10).string(message.interestFee);
    }
    if (message.liquidationFee !== "") {
      writer.uint32(18).string(message.liquidationFee);
    }
    if (message.stablecoinMintCap !== "") {
      writer.uint32(34).string(message.stablecoinMintCap);
    }
    if (message.completeLiquidationThreshold !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.completeLiquidationThreshold, 18).atomics);
    }
    if (message.minimumCloseFactor !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.minimumCloseFactor, 18).atomics);
    }
    if (message.smallLiquidationSize !== "") {
      writer.uint32(58).string(Decimal.fromUserInput(message.smallLiquidationSize, 18).atomics);
    }
    if (message.stalePriceGracePeriod !== undefined) {
      Duration.encode(message.stalePriceGracePeriod, writer.uint32(66).fork()).ldelim();
    }
    if (message.cdpPaused === true) {
      writer.uint32(72).bool(message.cdpPaused);
    }
    if (message.stablecoinInterestRateEpoch !== undefined) {
      Duration.encode(message.stablecoinInterestRateEpoch, writer.uint32(82).fork()).ldelim();
    }
    if (message.stablecoinInterestRateAdjusterCoefficient !== "") {
      writer.uint32(90).string(Decimal.fromUserInput(message.stablecoinInterestRateAdjusterCoefficient, 18).atomics);
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
          message.interestFee = reader.string();
          break;
        case 2:
          message.liquidationFee = reader.string();
          break;
        case 4:
          message.stablecoinMintCap = reader.string();
          break;
        case 5:
          message.completeLiquidationThreshold = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.minimumCloseFactor = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.smallLiquidationSize = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 8:
          message.stalePriceGracePeriod = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 9:
          message.cdpPaused = reader.bool();
          break;
        case 10:
          message.stablecoinInterestRateEpoch = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 11:
          message.stablecoinInterestRateAdjusterCoefficient = Decimal.fromAtomics(reader.string(), 18).toString();
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
    message.interestFee = object.interestFee ?? "";
    message.liquidationFee = object.liquidationFee ?? "";
    message.stablecoinMintCap = object.stablecoinMintCap ?? "";
    message.completeLiquidationThreshold = object.completeLiquidationThreshold ?? "";
    message.minimumCloseFactor = object.minimumCloseFactor ?? "";
    message.smallLiquidationSize = object.smallLiquidationSize ?? "";
    message.stalePriceGracePeriod = object.stalePriceGracePeriod !== undefined && object.stalePriceGracePeriod !== null ? Duration.fromPartial(object.stalePriceGracePeriod) : undefined;
    message.cdpPaused = object.cdpPaused ?? false;
    message.stablecoinInterestRateEpoch = object.stablecoinInterestRateEpoch !== undefined && object.stablecoinInterestRateEpoch !== null ? Duration.fromPartial(object.stablecoinInterestRateEpoch) : undefined;
    message.stablecoinInterestRateAdjusterCoefficient = object.stablecoinInterestRateAdjusterCoefficient ?? "";
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.interest_fee !== undefined && object.interest_fee !== null) {
      message.interestFee = object.interest_fee;
    }
    if (object.liquidation_fee !== undefined && object.liquidation_fee !== null) {
      message.liquidationFee = object.liquidation_fee;
    }
    if (object.stablecoin_mint_cap !== undefined && object.stablecoin_mint_cap !== null) {
      message.stablecoinMintCap = object.stablecoin_mint_cap;
    }
    if (object.complete_liquidation_threshold !== undefined && object.complete_liquidation_threshold !== null) {
      message.completeLiquidationThreshold = object.complete_liquidation_threshold;
    }
    if (object.minimum_close_factor !== undefined && object.minimum_close_factor !== null) {
      message.minimumCloseFactor = object.minimum_close_factor;
    }
    if (object.small_liquidation_size !== undefined && object.small_liquidation_size !== null) {
      message.smallLiquidationSize = object.small_liquidation_size;
    }
    if (object.stale_price_grace_period !== undefined && object.stale_price_grace_period !== null) {
      message.stalePriceGracePeriod = Duration.fromAmino(object.stale_price_grace_period);
    }
    if (object.cdp_paused !== undefined && object.cdp_paused !== null) {
      message.cdpPaused = object.cdp_paused;
    }
    if (object.stablecoin_interest_rate_epoch !== undefined && object.stablecoin_interest_rate_epoch !== null) {
      message.stablecoinInterestRateEpoch = Duration.fromAmino(object.stablecoin_interest_rate_epoch);
    }
    if (object.stablecoin_interest_rate_adjuster_coefficient !== undefined && object.stablecoin_interest_rate_adjuster_coefficient !== null) {
      message.stablecoinInterestRateAdjusterCoefficient = object.stablecoin_interest_rate_adjuster_coefficient;
    }
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.interest_fee = message.interestFee === "" ? undefined : message.interestFee;
    obj.liquidation_fee = message.liquidationFee === "" ? undefined : message.liquidationFee;
    obj.stablecoin_mint_cap = message.stablecoinMintCap === "" ? undefined : message.stablecoinMintCap;
    obj.complete_liquidation_threshold = message.completeLiquidationThreshold === "" ? undefined : message.completeLiquidationThreshold;
    obj.minimum_close_factor = message.minimumCloseFactor === "" ? undefined : message.minimumCloseFactor;
    obj.small_liquidation_size = message.smallLiquidationSize === "" ? undefined : message.smallLiquidationSize;
    obj.stale_price_grace_period = message.stalePriceGracePeriod ? Duration.toAmino(message.stalePriceGracePeriod, useInterfaces) : undefined;
    obj.cdp_paused = message.cdpPaused === false ? undefined : message.cdpPaused;
    obj.stablecoin_interest_rate_epoch = message.stablecoinInterestRateEpoch ? Duration.toAmino(message.stablecoinInterestRateEpoch, useInterfaces) : undefined;
    obj.stablecoin_interest_rate_adjuster_coefficient = message.stablecoinInterestRateAdjusterCoefficient === "" ? undefined : message.stablecoinInterestRateAdjusterCoefficient;
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
      typeUrl: "/Switcheo.carbon.cdp.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseParamsToUpdate(): ParamsToUpdate {
  return {
    interestFee: undefined,
    liquidationFee: undefined,
    stablecoinMintCap: undefined,
    completeLiquidationThreshold: undefined,
    minimumCloseFactor: undefined,
    smallLiquidationSize: undefined,
    stalePriceGracePeriod: undefined,
    cdpPaused: undefined,
    stablecoinInterestRateEpoch: undefined,
    stablecoinInterestRateAdjusterCoefficient: undefined
  };
}
export const ParamsToUpdate = {
  typeUrl: "/Switcheo.carbon.cdp.ParamsToUpdate",
  encode(message: ParamsToUpdate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.interestFee !== undefined) {
      writer.uint32(10).string(message.interestFee);
    }
    if (message.liquidationFee !== undefined) {
      writer.uint32(18).string(message.liquidationFee);
    }
    if (message.stablecoinMintCap !== undefined) {
      writer.uint32(34).string(message.stablecoinMintCap);
    }
    if (message.completeLiquidationThreshold !== undefined) {
      writer.uint32(42).string(Decimal.fromUserInput(message.completeLiquidationThreshold, 18).atomics);
    }
    if (message.minimumCloseFactor !== undefined) {
      writer.uint32(50).string(Decimal.fromUserInput(message.minimumCloseFactor, 18).atomics);
    }
    if (message.smallLiquidationSize !== undefined) {
      writer.uint32(58).string(Decimal.fromUserInput(message.smallLiquidationSize, 18).atomics);
    }
    if (message.stalePriceGracePeriod !== undefined) {
      Duration.encode(message.stalePriceGracePeriod, writer.uint32(66).fork()).ldelim();
    }
    if (message.cdpPaused !== undefined) {
      BoolValue.encode(message.cdpPaused, writer.uint32(74).fork()).ldelim();
    }
    if (message.stablecoinInterestRateEpoch !== undefined) {
      Duration.encode(message.stablecoinInterestRateEpoch, writer.uint32(82).fork()).ldelim();
    }
    if (message.stablecoinInterestRateAdjusterCoefficient !== undefined) {
      writer.uint32(90).string(Decimal.fromUserInput(message.stablecoinInterestRateAdjusterCoefficient, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ParamsToUpdate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsToUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.interestFee = reader.string();
          break;
        case 2:
          message.liquidationFee = reader.string();
          break;
        case 4:
          message.stablecoinMintCap = reader.string();
          break;
        case 5:
          message.completeLiquidationThreshold = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.minimumCloseFactor = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.smallLiquidationSize = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 8:
          message.stalePriceGracePeriod = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 9:
          message.cdpPaused = BoolValue.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 10:
          message.stablecoinInterestRateEpoch = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 11:
          message.stablecoinInterestRateAdjusterCoefficient = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ParamsToUpdate>): ParamsToUpdate {
    const message = createBaseParamsToUpdate();
    message.interestFee = object.interestFee ?? undefined;
    message.liquidationFee = object.liquidationFee ?? undefined;
    message.stablecoinMintCap = object.stablecoinMintCap ?? undefined;
    message.completeLiquidationThreshold = object.completeLiquidationThreshold ?? undefined;
    message.minimumCloseFactor = object.minimumCloseFactor ?? undefined;
    message.smallLiquidationSize = object.smallLiquidationSize ?? undefined;
    message.stalePriceGracePeriod = object.stalePriceGracePeriod !== undefined && object.stalePriceGracePeriod !== null ? Duration.fromPartial(object.stalePriceGracePeriod) : undefined;
    message.cdpPaused = object.cdpPaused !== undefined && object.cdpPaused !== null ? BoolValue.fromPartial(object.cdpPaused) : undefined;
    message.stablecoinInterestRateEpoch = object.stablecoinInterestRateEpoch !== undefined && object.stablecoinInterestRateEpoch !== null ? Duration.fromPartial(object.stablecoinInterestRateEpoch) : undefined;
    message.stablecoinInterestRateAdjusterCoefficient = object.stablecoinInterestRateAdjusterCoefficient ?? undefined;
    return message;
  },
  fromAmino(object: ParamsToUpdateAmino): ParamsToUpdate {
    const message = createBaseParamsToUpdate();
    if (object.interest_fee !== undefined && object.interest_fee !== null) {
      message.interestFee = object.interest_fee;
    }
    if (object.liquidation_fee !== undefined && object.liquidation_fee !== null) {
      message.liquidationFee = object.liquidation_fee;
    }
    if (object.stablecoin_mint_cap !== undefined && object.stablecoin_mint_cap !== null) {
      message.stablecoinMintCap = object.stablecoin_mint_cap;
    }
    if (object.complete_liquidation_threshold !== undefined && object.complete_liquidation_threshold !== null) {
      message.completeLiquidationThreshold = object.complete_liquidation_threshold;
    }
    if (object.minimum_close_factor !== undefined && object.minimum_close_factor !== null) {
      message.minimumCloseFactor = object.minimum_close_factor;
    }
    if (object.small_liquidation_size !== undefined && object.small_liquidation_size !== null) {
      message.smallLiquidationSize = object.small_liquidation_size;
    }
    if (object.stale_price_grace_period !== undefined && object.stale_price_grace_period !== null) {
      message.stalePriceGracePeriod = Duration.fromAmino(object.stale_price_grace_period);
    }
    if (object.cdp_paused !== undefined && object.cdp_paused !== null) {
      message.cdpPaused = BoolValue.fromAmino(object.cdp_paused);
    }
    if (object.stablecoin_interest_rate_epoch !== undefined && object.stablecoin_interest_rate_epoch !== null) {
      message.stablecoinInterestRateEpoch = Duration.fromAmino(object.stablecoin_interest_rate_epoch);
    }
    if (object.stablecoin_interest_rate_adjuster_coefficient !== undefined && object.stablecoin_interest_rate_adjuster_coefficient !== null) {
      message.stablecoinInterestRateAdjusterCoefficient = object.stablecoin_interest_rate_adjuster_coefficient;
    }
    return message;
  },
  toAmino(message: ParamsToUpdate, useInterfaces: boolean = false): ParamsToUpdateAmino {
    const obj: any = {};
    obj.interest_fee = message.interestFee === null ? undefined : message.interestFee;
    obj.liquidation_fee = message.liquidationFee === null ? undefined : message.liquidationFee;
    obj.stablecoin_mint_cap = message.stablecoinMintCap === null ? undefined : message.stablecoinMintCap;
    obj.complete_liquidation_threshold = message.completeLiquidationThreshold === null ? undefined : message.completeLiquidationThreshold;
    obj.minimum_close_factor = message.minimumCloseFactor === null ? undefined : message.minimumCloseFactor;
    obj.small_liquidation_size = message.smallLiquidationSize === null ? undefined : message.smallLiquidationSize;
    obj.stale_price_grace_period = message.stalePriceGracePeriod ? Duration.toAmino(message.stalePriceGracePeriod, useInterfaces) : undefined;
    obj.cdp_paused = message.cdpPaused ? BoolValue.toAmino(message.cdpPaused, useInterfaces) : undefined;
    obj.stablecoin_interest_rate_epoch = message.stablecoinInterestRateEpoch ? Duration.toAmino(message.stablecoinInterestRateEpoch, useInterfaces) : undefined;
    obj.stablecoin_interest_rate_adjuster_coefficient = message.stablecoinInterestRateAdjusterCoefficient === null ? undefined : message.stablecoinInterestRateAdjusterCoefficient;
    return obj;
  },
  fromAminoMsg(object: ParamsToUpdateAminoMsg): ParamsToUpdate {
    return ParamsToUpdate.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsToUpdateProtoMsg, useInterfaces: boolean = false): ParamsToUpdate {
    return ParamsToUpdate.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ParamsToUpdate): Uint8Array {
    return ParamsToUpdate.encode(message).finish();
  },
  toProtoMsg(message: ParamsToUpdate): ParamsToUpdateProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.ParamsToUpdate",
      value: ParamsToUpdate.encode(message).finish()
    };
  }
};