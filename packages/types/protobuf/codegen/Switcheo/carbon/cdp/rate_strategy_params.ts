import { BinaryReader, BinaryWriter } from "../../../binary";
export interface RateStrategyParams {
  name: string;
  optimalUsage?: string;
  baseVariableBorrowRate?: string;
  variableRateSlope1?: string;
  variableRateSlope2?: string;
  baseStableBorrowRate?: string;
  stableRateSlope1?: string;
  stableRateSlope2?: string;
  optimalStableToTotalDebtRatio?: string;
}
export interface RateStrategyParamsProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.RateStrategyParams";
  value: Uint8Array;
}
export interface RateStrategyParamsAmino {
  name?: string;
  optimal_usage?: string;
  base_variable_borrow_rate?: string;
  variable_rate_slope_1?: string;
  variable_rate_slope_2?: string;
  base_stable_borrow_rate?: string;
  stable_rate_slope_1?: string;
  stable_rate_slope_2?: string;
  optimal_stable_to_total_debt_ratio?: string;
}
export interface RateStrategyParamsAminoMsg {
  type: "/Switcheo.carbon.cdp.RateStrategyParams";
  value: RateStrategyParamsAmino;
}
export interface RateStrategyParamsSDKType {
  name: string;
  optimal_usage?: string;
  base_variable_borrow_rate?: string;
  variable_rate_slope_1?: string;
  variable_rate_slope_2?: string;
  base_stable_borrow_rate?: string;
  stable_rate_slope_1?: string;
  stable_rate_slope_2?: string;
  optimal_stable_to_total_debt_ratio?: string;
}
function createBaseRateStrategyParams(): RateStrategyParams {
  return {
    name: "",
    optimalUsage: undefined,
    baseVariableBorrowRate: undefined,
    variableRateSlope1: undefined,
    variableRateSlope2: undefined,
    baseStableBorrowRate: undefined,
    stableRateSlope1: undefined,
    stableRateSlope2: undefined,
    optimalStableToTotalDebtRatio: undefined
  };
}
export const RateStrategyParams = {
  typeUrl: "/Switcheo.carbon.cdp.RateStrategyParams",
  encode(message: RateStrategyParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.optimalUsage !== undefined) {
      writer.uint32(18).string(message.optimalUsage);
    }
    if (message.baseVariableBorrowRate !== undefined) {
      writer.uint32(26).string(message.baseVariableBorrowRate);
    }
    if (message.variableRateSlope1 !== undefined) {
      writer.uint32(34).string(message.variableRateSlope1);
    }
    if (message.variableRateSlope2 !== undefined) {
      writer.uint32(42).string(message.variableRateSlope2);
    }
    if (message.baseStableBorrowRate !== undefined) {
      writer.uint32(50).string(message.baseStableBorrowRate);
    }
    if (message.stableRateSlope1 !== undefined) {
      writer.uint32(58).string(message.stableRateSlope1);
    }
    if (message.stableRateSlope2 !== undefined) {
      writer.uint32(66).string(message.stableRateSlope2);
    }
    if (message.optimalStableToTotalDebtRatio !== undefined) {
      writer.uint32(74).string(message.optimalStableToTotalDebtRatio);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RateStrategyParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRateStrategyParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.optimalUsage = reader.string();
          break;
        case 3:
          message.baseVariableBorrowRate = reader.string();
          break;
        case 4:
          message.variableRateSlope1 = reader.string();
          break;
        case 5:
          message.variableRateSlope2 = reader.string();
          break;
        case 6:
          message.baseStableBorrowRate = reader.string();
          break;
        case 7:
          message.stableRateSlope1 = reader.string();
          break;
        case 8:
          message.stableRateSlope2 = reader.string();
          break;
        case 9:
          message.optimalStableToTotalDebtRatio = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RateStrategyParams>): RateStrategyParams {
    const message = createBaseRateStrategyParams();
    message.name = object.name ?? "";
    message.optimalUsage = object.optimalUsage ?? undefined;
    message.baseVariableBorrowRate = object.baseVariableBorrowRate ?? undefined;
    message.variableRateSlope1 = object.variableRateSlope1 ?? undefined;
    message.variableRateSlope2 = object.variableRateSlope2 ?? undefined;
    message.baseStableBorrowRate = object.baseStableBorrowRate ?? undefined;
    message.stableRateSlope1 = object.stableRateSlope1 ?? undefined;
    message.stableRateSlope2 = object.stableRateSlope2 ?? undefined;
    message.optimalStableToTotalDebtRatio = object.optimalStableToTotalDebtRatio ?? undefined;
    return message;
  },
  fromAmino(object: RateStrategyParamsAmino): RateStrategyParams {
    const message = createBaseRateStrategyParams();
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.optimal_usage !== undefined && object.optimal_usage !== null) {
      message.optimalUsage = object.optimal_usage;
    }
    if (object.base_variable_borrow_rate !== undefined && object.base_variable_borrow_rate !== null) {
      message.baseVariableBorrowRate = object.base_variable_borrow_rate;
    }
    if (object.variable_rate_slope_1 !== undefined && object.variable_rate_slope_1 !== null) {
      message.variableRateSlope1 = object.variable_rate_slope_1;
    }
    if (object.variable_rate_slope_2 !== undefined && object.variable_rate_slope_2 !== null) {
      message.variableRateSlope2 = object.variable_rate_slope_2;
    }
    if (object.base_stable_borrow_rate !== undefined && object.base_stable_borrow_rate !== null) {
      message.baseStableBorrowRate = object.base_stable_borrow_rate;
    }
    if (object.stable_rate_slope_1 !== undefined && object.stable_rate_slope_1 !== null) {
      message.stableRateSlope1 = object.stable_rate_slope_1;
    }
    if (object.stable_rate_slope_2 !== undefined && object.stable_rate_slope_2 !== null) {
      message.stableRateSlope2 = object.stable_rate_slope_2;
    }
    if (object.optimal_stable_to_total_debt_ratio !== undefined && object.optimal_stable_to_total_debt_ratio !== null) {
      message.optimalStableToTotalDebtRatio = object.optimal_stable_to_total_debt_ratio;
    }
    return message;
  },
  toAmino(message: RateStrategyParams, useInterfaces: boolean = false): RateStrategyParamsAmino {
    const obj: any = {};
    obj.name = message.name === "" ? undefined : message.name;
    obj.optimal_usage = message.optimalUsage === null ? undefined : message.optimalUsage;
    obj.base_variable_borrow_rate = message.baseVariableBorrowRate === null ? undefined : message.baseVariableBorrowRate;
    obj.variable_rate_slope_1 = message.variableRateSlope1 === null ? undefined : message.variableRateSlope1;
    obj.variable_rate_slope_2 = message.variableRateSlope2 === null ? undefined : message.variableRateSlope2;
    obj.base_stable_borrow_rate = message.baseStableBorrowRate === null ? undefined : message.baseStableBorrowRate;
    obj.stable_rate_slope_1 = message.stableRateSlope1 === null ? undefined : message.stableRateSlope1;
    obj.stable_rate_slope_2 = message.stableRateSlope2 === null ? undefined : message.stableRateSlope2;
    obj.optimal_stable_to_total_debt_ratio = message.optimalStableToTotalDebtRatio === null ? undefined : message.optimalStableToTotalDebtRatio;
    return obj;
  },
  fromAminoMsg(object: RateStrategyParamsAminoMsg): RateStrategyParams {
    return RateStrategyParams.fromAmino(object.value);
  },
  fromProtoMsg(message: RateStrategyParamsProtoMsg, useInterfaces: boolean = false): RateStrategyParams {
    return RateStrategyParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RateStrategyParams): Uint8Array {
    return RateStrategyParams.encode(message).finish();
  },
  toProtoMsg(message: RateStrategyParams): RateStrategyParamsProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.RateStrategyParams",
      value: RateStrategyParams.encode(message).finish()
    };
  }
};