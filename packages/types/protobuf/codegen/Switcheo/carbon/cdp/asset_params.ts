import { StringValue, StringValueAmino, StringValueSDKType, BoolValue, BoolValueAmino, BoolValueSDKType } from "../../../google/protobuf/wrappers";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
export interface AssetParamsAPI {
  assetParams?: AssetParams | undefined;
  tokenName: string;
}
export interface AssetParamsAPIProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.AssetParamsAPI";
  value: Uint8Array;
}
export interface AssetParamsAPIAmino {
  asset_params?: AssetParamsAmino | undefined;
  token_name?: string;
}
export interface AssetParamsAPIAminoMsg {
  type: "/Switcheo.carbon.cdp.AssetParamsAPI";
  value: AssetParamsAPIAmino;
}
export interface AssetParamsAPISDKType {
  asset_params?: AssetParamsSDKType | undefined;
  token_name: string;
}
export interface AssetParams {
  denom: string;
  rateStrategyName: string;
  allowRepayStablecoinInterest: boolean;
  loanToValue?: string;
  liquidationThreshold?: string;
  liquidationDiscount?: string;
  supplyCap?: string;
  borrowCap?: string;
}
export interface AssetParamsProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.AssetParams";
  value: Uint8Array;
}
export interface AssetParamsAmino {
  denom?: string;
  rate_strategy_name?: string;
  allow_repay_stablecoin_interest?: boolean;
  loan_to_value?: string;
  liquidation_threshold?: string;
  liquidation_discount?: string;
  supply_cap?: string;
  borrow_cap?: string;
}
export interface AssetParamsAminoMsg {
  type: "/Switcheo.carbon.cdp.AssetParams";
  value: AssetParamsAmino;
}
export interface AssetParamsSDKType {
  denom: string;
  rate_strategy_name: string;
  allow_repay_stablecoin_interest: boolean;
  loan_to_value?: string;
  liquidation_threshold?: string;
  liquidation_discount?: string;
  supply_cap?: string;
  borrow_cap?: string;
}
export interface AssetUtilization {
  denom: string;
  totalBorrowed?: string;
  totalAmount?: string;
  utilizationRate?: string;
}
export interface AssetUtilizationProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.AssetUtilization";
  value: Uint8Array;
}
export interface AssetUtilizationAmino {
  denom?: string;
  total_borrowed?: string;
  total_amount?: string;
  utilization_rate?: string;
}
export interface AssetUtilizationAminoMsg {
  type: "/Switcheo.carbon.cdp.AssetUtilization";
  value: AssetUtilizationAmino;
}
export interface AssetUtilizationSDKType {
  denom: string;
  total_borrowed?: string;
  total_amount?: string;
  utilization_rate?: string;
}
export interface UpdateAssetParams {
  denom: string;
  rateStrategyName?: StringValue | undefined;
  allowRepayStablecoinInterest?: BoolValue | undefined;
  loanToValue?: string;
  liquidationThreshold?: string;
  liquidationDiscount?: string;
  supplyCap?: string;
  borrowCap?: string;
}
export interface UpdateAssetParamsProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.UpdateAssetParams";
  value: Uint8Array;
}
export interface UpdateAssetParamsAmino {
  denom?: string;
  rate_strategy_name?: StringValueAmino | undefined;
  allow_repay_stablecoin_interest?: BoolValueAmino | undefined;
  loan_to_value?: string;
  liquidation_threshold?: string;
  liquidation_discount?: string;
  supply_cap?: string;
  borrow_cap?: string;
}
export interface UpdateAssetParamsAminoMsg {
  type: "/Switcheo.carbon.cdp.UpdateAssetParams";
  value: UpdateAssetParamsAmino;
}
export interface UpdateAssetParamsSDKType {
  denom: string;
  rate_strategy_name?: StringValueSDKType | undefined;
  allow_repay_stablecoin_interest?: BoolValueSDKType | undefined;
  loan_to_value?: string;
  liquidation_threshold?: string;
  liquidation_discount?: string;
  supply_cap?: string;
  borrow_cap?: string;
}
function createBaseAssetParamsAPI(): AssetParamsAPI {
  return {
    assetParams: undefined,
    tokenName: ""
  };
}
export const AssetParamsAPI = {
  typeUrl: "/Switcheo.carbon.cdp.AssetParamsAPI",
  encode(message: AssetParamsAPI, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetParams !== undefined) {
      AssetParams.encode(message.assetParams, writer.uint32(10).fork()).ldelim();
    }
    if (message.tokenName !== "") {
      writer.uint32(18).string(message.tokenName);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AssetParamsAPI {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssetParamsAPI();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetParams = AssetParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.tokenName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AssetParamsAPI>): AssetParamsAPI {
    const message = createBaseAssetParamsAPI();
    message.assetParams = object.assetParams !== undefined && object.assetParams !== null ? AssetParams.fromPartial(object.assetParams) : undefined;
    message.tokenName = object.tokenName ?? "";
    return message;
  },
  fromAmino(object: AssetParamsAPIAmino): AssetParamsAPI {
    const message = createBaseAssetParamsAPI();
    if (object.asset_params !== undefined && object.asset_params !== null) {
      message.assetParams = AssetParams.fromAmino(object.asset_params);
    }
    if (object.token_name !== undefined && object.token_name !== null) {
      message.tokenName = object.token_name;
    }
    return message;
  },
  toAmino(message: AssetParamsAPI, useInterfaces: boolean = false): AssetParamsAPIAmino {
    const obj: any = {};
    obj.asset_params = message.assetParams ? AssetParams.toAmino(message.assetParams, useInterfaces) : undefined;
    obj.token_name = message.tokenName === "" ? undefined : message.tokenName;
    return obj;
  },
  fromAminoMsg(object: AssetParamsAPIAminoMsg): AssetParamsAPI {
    return AssetParamsAPI.fromAmino(object.value);
  },
  fromProtoMsg(message: AssetParamsAPIProtoMsg, useInterfaces: boolean = false): AssetParamsAPI {
    return AssetParamsAPI.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AssetParamsAPI): Uint8Array {
    return AssetParamsAPI.encode(message).finish();
  },
  toProtoMsg(message: AssetParamsAPI): AssetParamsAPIProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.AssetParamsAPI",
      value: AssetParamsAPI.encode(message).finish()
    };
  }
};
function createBaseAssetParams(): AssetParams {
  return {
    denom: "",
    rateStrategyName: "",
    allowRepayStablecoinInterest: false,
    loanToValue: undefined,
    liquidationThreshold: undefined,
    liquidationDiscount: undefined,
    supplyCap: undefined,
    borrowCap: undefined
  };
}
export const AssetParams = {
  typeUrl: "/Switcheo.carbon.cdp.AssetParams",
  encode(message: AssetParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.rateStrategyName !== "") {
      writer.uint32(26).string(message.rateStrategyName);
    }
    if (message.allowRepayStablecoinInterest === true) {
      writer.uint32(32).bool(message.allowRepayStablecoinInterest);
    }
    if (message.loanToValue !== undefined) {
      writer.uint32(42).string(message.loanToValue);
    }
    if (message.liquidationThreshold !== undefined) {
      writer.uint32(50).string(message.liquidationThreshold);
    }
    if (message.liquidationDiscount !== undefined) {
      writer.uint32(58).string(message.liquidationDiscount);
    }
    if (message.supplyCap !== undefined) {
      writer.uint32(66).string(message.supplyCap);
    }
    if (message.borrowCap !== undefined) {
      writer.uint32(74).string(message.borrowCap);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AssetParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssetParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 3:
          message.rateStrategyName = reader.string();
          break;
        case 4:
          message.allowRepayStablecoinInterest = reader.bool();
          break;
        case 5:
          message.loanToValue = reader.string();
          break;
        case 6:
          message.liquidationThreshold = reader.string();
          break;
        case 7:
          message.liquidationDiscount = reader.string();
          break;
        case 8:
          message.supplyCap = reader.string();
          break;
        case 9:
          message.borrowCap = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AssetParams>): AssetParams {
    const message = createBaseAssetParams();
    message.denom = object.denom ?? "";
    message.rateStrategyName = object.rateStrategyName ?? "";
    message.allowRepayStablecoinInterest = object.allowRepayStablecoinInterest ?? false;
    message.loanToValue = object.loanToValue ?? undefined;
    message.liquidationThreshold = object.liquidationThreshold ?? undefined;
    message.liquidationDiscount = object.liquidationDiscount ?? undefined;
    message.supplyCap = object.supplyCap ?? undefined;
    message.borrowCap = object.borrowCap ?? undefined;
    return message;
  },
  fromAmino(object: AssetParamsAmino): AssetParams {
    const message = createBaseAssetParams();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.rate_strategy_name !== undefined && object.rate_strategy_name !== null) {
      message.rateStrategyName = object.rate_strategy_name;
    }
    if (object.allow_repay_stablecoin_interest !== undefined && object.allow_repay_stablecoin_interest !== null) {
      message.allowRepayStablecoinInterest = object.allow_repay_stablecoin_interest;
    }
    if (object.loan_to_value !== undefined && object.loan_to_value !== null) {
      message.loanToValue = object.loan_to_value;
    }
    if (object.liquidation_threshold !== undefined && object.liquidation_threshold !== null) {
      message.liquidationThreshold = object.liquidation_threshold;
    }
    if (object.liquidation_discount !== undefined && object.liquidation_discount !== null) {
      message.liquidationDiscount = object.liquidation_discount;
    }
    if (object.supply_cap !== undefined && object.supply_cap !== null) {
      message.supplyCap = object.supply_cap;
    }
    if (object.borrow_cap !== undefined && object.borrow_cap !== null) {
      message.borrowCap = object.borrow_cap;
    }
    return message;
  },
  toAmino(message: AssetParams, useInterfaces: boolean = false): AssetParamsAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.rate_strategy_name = message.rateStrategyName === "" ? undefined : message.rateStrategyName;
    obj.allow_repay_stablecoin_interest = message.allowRepayStablecoinInterest === false ? undefined : message.allowRepayStablecoinInterest;
    obj.loan_to_value = message.loanToValue === null ? undefined : message.loanToValue;
    obj.liquidation_threshold = message.liquidationThreshold === null ? undefined : message.liquidationThreshold;
    obj.liquidation_discount = message.liquidationDiscount === null ? undefined : message.liquidationDiscount;
    obj.supply_cap = message.supplyCap === null ? undefined : message.supplyCap;
    obj.borrow_cap = message.borrowCap === null ? undefined : message.borrowCap;
    return obj;
  },
  fromAminoMsg(object: AssetParamsAminoMsg): AssetParams {
    return AssetParams.fromAmino(object.value);
  },
  fromProtoMsg(message: AssetParamsProtoMsg, useInterfaces: boolean = false): AssetParams {
    return AssetParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AssetParams): Uint8Array {
    return AssetParams.encode(message).finish();
  },
  toProtoMsg(message: AssetParams): AssetParamsProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.AssetParams",
      value: AssetParams.encode(message).finish()
    };
  }
};
function createBaseAssetUtilization(): AssetUtilization {
  return {
    denom: "",
    totalBorrowed: undefined,
    totalAmount: undefined,
    utilizationRate: undefined
  };
}
export const AssetUtilization = {
  typeUrl: "/Switcheo.carbon.cdp.AssetUtilization",
  encode(message: AssetUtilization, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.totalBorrowed !== undefined) {
      writer.uint32(18).string(message.totalBorrowed);
    }
    if (message.totalAmount !== undefined) {
      writer.uint32(26).string(message.totalAmount);
    }
    if (message.utilizationRate !== undefined) {
      writer.uint32(34).string(Decimal.fromUserInput(message.utilizationRate, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AssetUtilization {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssetUtilization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.totalBorrowed = reader.string();
          break;
        case 3:
          message.totalAmount = reader.string();
          break;
        case 4:
          message.utilizationRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AssetUtilization>): AssetUtilization {
    const message = createBaseAssetUtilization();
    message.denom = object.denom ?? "";
    message.totalBorrowed = object.totalBorrowed ?? undefined;
    message.totalAmount = object.totalAmount ?? undefined;
    message.utilizationRate = object.utilizationRate ?? undefined;
    return message;
  },
  fromAmino(object: AssetUtilizationAmino): AssetUtilization {
    const message = createBaseAssetUtilization();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.total_borrowed !== undefined && object.total_borrowed !== null) {
      message.totalBorrowed = object.total_borrowed;
    }
    if (object.total_amount !== undefined && object.total_amount !== null) {
      message.totalAmount = object.total_amount;
    }
    if (object.utilization_rate !== undefined && object.utilization_rate !== null) {
      message.utilizationRate = object.utilization_rate;
    }
    return message;
  },
  toAmino(message: AssetUtilization, useInterfaces: boolean = false): AssetUtilizationAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.total_borrowed = message.totalBorrowed === null ? undefined : message.totalBorrowed;
    obj.total_amount = message.totalAmount === null ? undefined : message.totalAmount;
    obj.utilization_rate = message.utilizationRate === null ? undefined : message.utilizationRate;
    return obj;
  },
  fromAminoMsg(object: AssetUtilizationAminoMsg): AssetUtilization {
    return AssetUtilization.fromAmino(object.value);
  },
  fromProtoMsg(message: AssetUtilizationProtoMsg, useInterfaces: boolean = false): AssetUtilization {
    return AssetUtilization.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AssetUtilization): Uint8Array {
    return AssetUtilization.encode(message).finish();
  },
  toProtoMsg(message: AssetUtilization): AssetUtilizationProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.AssetUtilization",
      value: AssetUtilization.encode(message).finish()
    };
  }
};
function createBaseUpdateAssetParams(): UpdateAssetParams {
  return {
    denom: "",
    rateStrategyName: undefined,
    allowRepayStablecoinInterest: undefined,
    loanToValue: undefined,
    liquidationThreshold: undefined,
    liquidationDiscount: undefined,
    supplyCap: undefined,
    borrowCap: undefined
  };
}
export const UpdateAssetParams = {
  typeUrl: "/Switcheo.carbon.cdp.UpdateAssetParams",
  encode(message: UpdateAssetParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.rateStrategyName !== undefined) {
      StringValue.encode(message.rateStrategyName, writer.uint32(18).fork()).ldelim();
    }
    if (message.allowRepayStablecoinInterest !== undefined) {
      BoolValue.encode(message.allowRepayStablecoinInterest, writer.uint32(26).fork()).ldelim();
    }
    if (message.loanToValue !== undefined) {
      writer.uint32(34).string(message.loanToValue);
    }
    if (message.liquidationThreshold !== undefined) {
      writer.uint32(42).string(message.liquidationThreshold);
    }
    if (message.liquidationDiscount !== undefined) {
      writer.uint32(50).string(message.liquidationDiscount);
    }
    if (message.supplyCap !== undefined) {
      writer.uint32(58).string(message.supplyCap);
    }
    if (message.borrowCap !== undefined) {
      writer.uint32(66).string(message.borrowCap);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UpdateAssetParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateAssetParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.rateStrategyName = StringValue.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.allowRepayStablecoinInterest = BoolValue.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.loanToValue = reader.string();
          break;
        case 5:
          message.liquidationThreshold = reader.string();
          break;
        case 6:
          message.liquidationDiscount = reader.string();
          break;
        case 7:
          message.supplyCap = reader.string();
          break;
        case 8:
          message.borrowCap = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UpdateAssetParams>): UpdateAssetParams {
    const message = createBaseUpdateAssetParams();
    message.denom = object.denom ?? "";
    message.rateStrategyName = object.rateStrategyName !== undefined && object.rateStrategyName !== null ? StringValue.fromPartial(object.rateStrategyName) : undefined;
    message.allowRepayStablecoinInterest = object.allowRepayStablecoinInterest !== undefined && object.allowRepayStablecoinInterest !== null ? BoolValue.fromPartial(object.allowRepayStablecoinInterest) : undefined;
    message.loanToValue = object.loanToValue ?? undefined;
    message.liquidationThreshold = object.liquidationThreshold ?? undefined;
    message.liquidationDiscount = object.liquidationDiscount ?? undefined;
    message.supplyCap = object.supplyCap ?? undefined;
    message.borrowCap = object.borrowCap ?? undefined;
    return message;
  },
  fromAmino(object: UpdateAssetParamsAmino): UpdateAssetParams {
    const message = createBaseUpdateAssetParams();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.rate_strategy_name !== undefined && object.rate_strategy_name !== null) {
      message.rateStrategyName = StringValue.fromAmino(object.rate_strategy_name);
    }
    if (object.allow_repay_stablecoin_interest !== undefined && object.allow_repay_stablecoin_interest !== null) {
      message.allowRepayStablecoinInterest = BoolValue.fromAmino(object.allow_repay_stablecoin_interest);
    }
    if (object.loan_to_value !== undefined && object.loan_to_value !== null) {
      message.loanToValue = object.loan_to_value;
    }
    if (object.liquidation_threshold !== undefined && object.liquidation_threshold !== null) {
      message.liquidationThreshold = object.liquidation_threshold;
    }
    if (object.liquidation_discount !== undefined && object.liquidation_discount !== null) {
      message.liquidationDiscount = object.liquidation_discount;
    }
    if (object.supply_cap !== undefined && object.supply_cap !== null) {
      message.supplyCap = object.supply_cap;
    }
    if (object.borrow_cap !== undefined && object.borrow_cap !== null) {
      message.borrowCap = object.borrow_cap;
    }
    return message;
  },
  toAmino(message: UpdateAssetParams, useInterfaces: boolean = false): UpdateAssetParamsAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.rate_strategy_name = message.rateStrategyName ? StringValue.toAmino(message.rateStrategyName, useInterfaces) : undefined;
    obj.allow_repay_stablecoin_interest = message.allowRepayStablecoinInterest ? BoolValue.toAmino(message.allowRepayStablecoinInterest, useInterfaces) : undefined;
    obj.loan_to_value = message.loanToValue === null ? undefined : message.loanToValue;
    obj.liquidation_threshold = message.liquidationThreshold === null ? undefined : message.liquidationThreshold;
    obj.liquidation_discount = message.liquidationDiscount === null ? undefined : message.liquidationDiscount;
    obj.supply_cap = message.supplyCap === null ? undefined : message.supplyCap;
    obj.borrow_cap = message.borrowCap === null ? undefined : message.borrowCap;
    return obj;
  },
  fromAminoMsg(object: UpdateAssetParamsAminoMsg): UpdateAssetParams {
    return UpdateAssetParams.fromAmino(object.value);
  },
  fromProtoMsg(message: UpdateAssetParamsProtoMsg, useInterfaces: boolean = false): UpdateAssetParams {
    return UpdateAssetParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UpdateAssetParams): Uint8Array {
    return UpdateAssetParams.encode(message).finish();
  },
  toProtoMsg(message: UpdateAssetParams): UpdateAssetParamsProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.UpdateAssetParams",
      value: UpdateAssetParams.encode(message).finish()
    };
  }
};