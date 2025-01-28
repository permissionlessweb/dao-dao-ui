import { Timestamp } from "../../../google/protobuf/timestamp";
import { StringValue, StringValueAmino, StringValueSDKType } from "../../../google/protobuf/wrappers";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { toTimestamp, fromTimestamp } from "../../../helpers";
import { Decimal } from "@cosmjs/math";
export interface RewardScheme {
  id: bigint;
  creator: string;
  rewardDenom: string;
  assetDenom: string;
  rewardType: string;
  rewardAmountPerSecond: string;
  startTime: Date | undefined;
  endTime: Date | undefined;
  rewardPerShareLastUpdatedAt: Date | undefined;
  rewardPerShare: string;
}
export interface RewardSchemeProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.RewardScheme";
  value: Uint8Array;
}
export interface RewardSchemeAmino {
  id?: string;
  creator?: string;
  reward_denom?: string;
  asset_denom?: string;
  reward_type?: string;
  reward_amount_per_second?: string;
  start_time?: string | undefined;
  end_time?: string | undefined;
  reward_per_share_last_updated_at?: string | undefined;
  reward_per_share?: string;
}
export interface RewardSchemeAminoMsg {
  type: "/Switcheo.carbon.cdp.RewardScheme";
  value: RewardSchemeAmino;
}
export interface RewardSchemeSDKType {
  id: bigint;
  creator: string;
  reward_denom: string;
  asset_denom: string;
  reward_type: string;
  reward_amount_per_second: string;
  start_time: Date | undefined;
  end_time: Date | undefined;
  reward_per_share_last_updated_at: Date | undefined;
  reward_per_share: string;
}
export interface CreateRewardSchemeParams {
  rewardDenom: string;
  assetDenom: string;
  rewardType: string;
  rewardAmountPerSecond: string;
  startTime: Date | undefined;
  endTime: Date | undefined;
}
export interface CreateRewardSchemeParamsProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.CreateRewardSchemeParams";
  value: Uint8Array;
}
export interface CreateRewardSchemeParamsAmino {
  reward_denom?: string;
  asset_denom?: string;
  reward_type?: string;
  reward_amount_per_second?: string;
  start_time?: string | undefined;
  end_time?: string | undefined;
}
export interface CreateRewardSchemeParamsAminoMsg {
  type: "/Switcheo.carbon.cdp.CreateRewardSchemeParams";
  value: CreateRewardSchemeParamsAmino;
}
export interface CreateRewardSchemeParamsSDKType {
  reward_denom: string;
  asset_denom: string;
  reward_type: string;
  reward_amount_per_second: string;
  start_time: Date | undefined;
  end_time: Date | undefined;
}
export interface UpdateRewardSchemeParams {
  rewardSchemeId: bigint;
  rewardDenom?: StringValue | undefined;
  assetDenom?: StringValue | undefined;
  rewardType?: StringValue | undefined;
  rewardAmountPerSecond?: string;
  startTime?: Date | undefined;
  endTime?: Date | undefined;
}
export interface UpdateRewardSchemeParamsProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.UpdateRewardSchemeParams";
  value: Uint8Array;
}
export interface UpdateRewardSchemeParamsAmino {
  reward_scheme_id?: string;
  reward_denom?: StringValueAmino | undefined;
  asset_denom?: StringValueAmino | undefined;
  reward_type?: StringValueAmino | undefined;
  reward_amount_per_second?: string;
  start_time?: string | undefined;
  end_time?: string | undefined;
}
export interface UpdateRewardSchemeParamsAminoMsg {
  type: "/Switcheo.carbon.cdp.UpdateRewardSchemeParams";
  value: UpdateRewardSchemeParamsAmino;
}
export interface UpdateRewardSchemeParamsSDKType {
  reward_scheme_id: bigint;
  reward_denom?: StringValueSDKType | undefined;
  asset_denom?: StringValueSDKType | undefined;
  reward_type?: StringValueSDKType | undefined;
  reward_amount_per_second?: string;
  start_time?: Date | undefined;
  end_time?: Date | undefined;
}
export interface RewardDebt {
  userAddress: string;
  rewardSchemeId: bigint;
  rewardDebt: string;
  lastUpdatedAt: Date | undefined;
}
export interface RewardDebtProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.RewardDebt";
  value: Uint8Array;
}
export interface RewardDebtAmino {
  user_address?: string;
  reward_scheme_id?: string;
  reward_debt?: string;
  last_updated_at?: string | undefined;
}
export interface RewardDebtAminoMsg {
  type: "/Switcheo.carbon.cdp.RewardDebt";
  value: RewardDebtAmino;
}
export interface RewardDebtSDKType {
  user_address: string;
  reward_scheme_id: bigint;
  reward_debt: string;
  last_updated_at: Date | undefined;
}
function createBaseRewardScheme(): RewardScheme {
  return {
    id: BigInt(0),
    creator: "",
    rewardDenom: "",
    assetDenom: "",
    rewardType: "",
    rewardAmountPerSecond: "",
    startTime: new Date(),
    endTime: new Date(),
    rewardPerShareLastUpdatedAt: new Date(),
    rewardPerShare: ""
  };
}
export const RewardScheme = {
  typeUrl: "/Switcheo.carbon.cdp.RewardScheme",
  encode(message: RewardScheme, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.rewardDenom !== "") {
      writer.uint32(26).string(message.rewardDenom);
    }
    if (message.assetDenom !== "") {
      writer.uint32(34).string(message.assetDenom);
    }
    if (message.rewardType !== "") {
      writer.uint32(42).string(message.rewardType);
    }
    if (message.rewardAmountPerSecond !== "") {
      writer.uint32(50).string(message.rewardAmountPerSecond);
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(58).fork()).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(toTimestamp(message.endTime), writer.uint32(66).fork()).ldelim();
    }
    if (message.rewardPerShareLastUpdatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.rewardPerShareLastUpdatedAt), writer.uint32(74).fork()).ldelim();
    }
    if (message.rewardPerShare !== "") {
      writer.uint32(82).string(Decimal.fromUserInput(message.rewardPerShare, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RewardScheme {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardScheme();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.creator = reader.string();
          break;
        case 3:
          message.rewardDenom = reader.string();
          break;
        case 4:
          message.assetDenom = reader.string();
          break;
        case 5:
          message.rewardType = reader.string();
          break;
        case 6:
          message.rewardAmountPerSecond = reader.string();
          break;
        case 7:
          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 8:
          message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 9:
          message.rewardPerShareLastUpdatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 10:
          message.rewardPerShare = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RewardScheme>): RewardScheme {
    const message = createBaseRewardScheme();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creator = object.creator ?? "";
    message.rewardDenom = object.rewardDenom ?? "";
    message.assetDenom = object.assetDenom ?? "";
    message.rewardType = object.rewardType ?? "";
    message.rewardAmountPerSecond = object.rewardAmountPerSecond ?? "";
    message.startTime = object.startTime ?? undefined;
    message.endTime = object.endTime ?? undefined;
    message.rewardPerShareLastUpdatedAt = object.rewardPerShareLastUpdatedAt ?? undefined;
    message.rewardPerShare = object.rewardPerShare ?? "";
    return message;
  },
  fromAmino(object: RewardSchemeAmino): RewardScheme {
    const message = createBaseRewardScheme();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.reward_denom !== undefined && object.reward_denom !== null) {
      message.rewardDenom = object.reward_denom;
    }
    if (object.asset_denom !== undefined && object.asset_denom !== null) {
      message.assetDenom = object.asset_denom;
    }
    if (object.reward_type !== undefined && object.reward_type !== null) {
      message.rewardType = object.reward_type;
    }
    if (object.reward_amount_per_second !== undefined && object.reward_amount_per_second !== null) {
      message.rewardAmountPerSecond = object.reward_amount_per_second;
    }
    if (object.start_time !== undefined && object.start_time !== null) {
      message.startTime = fromTimestamp(Timestamp.fromAmino(object.start_time));
    }
    if (object.end_time !== undefined && object.end_time !== null) {
      message.endTime = fromTimestamp(Timestamp.fromAmino(object.end_time));
    }
    if (object.reward_per_share_last_updated_at !== undefined && object.reward_per_share_last_updated_at !== null) {
      message.rewardPerShareLastUpdatedAt = fromTimestamp(Timestamp.fromAmino(object.reward_per_share_last_updated_at));
    }
    if (object.reward_per_share !== undefined && object.reward_per_share !== null) {
      message.rewardPerShare = object.reward_per_share;
    }
    return message;
  },
  toAmino(message: RewardScheme, useInterfaces: boolean = false): RewardSchemeAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.reward_denom = message.rewardDenom === "" ? undefined : message.rewardDenom;
    obj.asset_denom = message.assetDenom === "" ? undefined : message.assetDenom;
    obj.reward_type = message.rewardType === "" ? undefined : message.rewardType;
    obj.reward_amount_per_second = message.rewardAmountPerSecond === "" ? undefined : message.rewardAmountPerSecond;
    obj.start_time = message.startTime ? Timestamp.toAmino(toTimestamp(message.startTime)) : undefined;
    obj.end_time = message.endTime ? Timestamp.toAmino(toTimestamp(message.endTime)) : undefined;
    obj.reward_per_share_last_updated_at = message.rewardPerShareLastUpdatedAt ? Timestamp.toAmino(toTimestamp(message.rewardPerShareLastUpdatedAt)) : undefined;
    obj.reward_per_share = message.rewardPerShare === "" ? undefined : message.rewardPerShare;
    return obj;
  },
  fromAminoMsg(object: RewardSchemeAminoMsg): RewardScheme {
    return RewardScheme.fromAmino(object.value);
  },
  fromProtoMsg(message: RewardSchemeProtoMsg, useInterfaces: boolean = false): RewardScheme {
    return RewardScheme.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RewardScheme): Uint8Array {
    return RewardScheme.encode(message).finish();
  },
  toProtoMsg(message: RewardScheme): RewardSchemeProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.RewardScheme",
      value: RewardScheme.encode(message).finish()
    };
  }
};
function createBaseCreateRewardSchemeParams(): CreateRewardSchemeParams {
  return {
    rewardDenom: "",
    assetDenom: "",
    rewardType: "",
    rewardAmountPerSecond: "",
    startTime: new Date(),
    endTime: new Date()
  };
}
export const CreateRewardSchemeParams = {
  typeUrl: "/Switcheo.carbon.cdp.CreateRewardSchemeParams",
  encode(message: CreateRewardSchemeParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rewardDenom !== "") {
      writer.uint32(10).string(message.rewardDenom);
    }
    if (message.assetDenom !== "") {
      writer.uint32(18).string(message.assetDenom);
    }
    if (message.rewardType !== "") {
      writer.uint32(26).string(message.rewardType);
    }
    if (message.rewardAmountPerSecond !== "") {
      writer.uint32(34).string(message.rewardAmountPerSecond);
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(42).fork()).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(toTimestamp(message.endTime), writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CreateRewardSchemeParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateRewardSchemeParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rewardDenom = reader.string();
          break;
        case 2:
          message.assetDenom = reader.string();
          break;
        case 3:
          message.rewardType = reader.string();
          break;
        case 4:
          message.rewardAmountPerSecond = reader.string();
          break;
        case 5:
          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 6:
          message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CreateRewardSchemeParams>): CreateRewardSchemeParams {
    const message = createBaseCreateRewardSchemeParams();
    message.rewardDenom = object.rewardDenom ?? "";
    message.assetDenom = object.assetDenom ?? "";
    message.rewardType = object.rewardType ?? "";
    message.rewardAmountPerSecond = object.rewardAmountPerSecond ?? "";
    message.startTime = object.startTime ?? undefined;
    message.endTime = object.endTime ?? undefined;
    return message;
  },
  fromAmino(object: CreateRewardSchemeParamsAmino): CreateRewardSchemeParams {
    const message = createBaseCreateRewardSchemeParams();
    if (object.reward_denom !== undefined && object.reward_denom !== null) {
      message.rewardDenom = object.reward_denom;
    }
    if (object.asset_denom !== undefined && object.asset_denom !== null) {
      message.assetDenom = object.asset_denom;
    }
    if (object.reward_type !== undefined && object.reward_type !== null) {
      message.rewardType = object.reward_type;
    }
    if (object.reward_amount_per_second !== undefined && object.reward_amount_per_second !== null) {
      message.rewardAmountPerSecond = object.reward_amount_per_second;
    }
    if (object.start_time !== undefined && object.start_time !== null) {
      message.startTime = fromTimestamp(Timestamp.fromAmino(object.start_time));
    }
    if (object.end_time !== undefined && object.end_time !== null) {
      message.endTime = fromTimestamp(Timestamp.fromAmino(object.end_time));
    }
    return message;
  },
  toAmino(message: CreateRewardSchemeParams, useInterfaces: boolean = false): CreateRewardSchemeParamsAmino {
    const obj: any = {};
    obj.reward_denom = message.rewardDenom === "" ? undefined : message.rewardDenom;
    obj.asset_denom = message.assetDenom === "" ? undefined : message.assetDenom;
    obj.reward_type = message.rewardType === "" ? undefined : message.rewardType;
    obj.reward_amount_per_second = message.rewardAmountPerSecond === "" ? undefined : message.rewardAmountPerSecond;
    obj.start_time = message.startTime ? Timestamp.toAmino(toTimestamp(message.startTime)) : undefined;
    obj.end_time = message.endTime ? Timestamp.toAmino(toTimestamp(message.endTime)) : undefined;
    return obj;
  },
  fromAminoMsg(object: CreateRewardSchemeParamsAminoMsg): CreateRewardSchemeParams {
    return CreateRewardSchemeParams.fromAmino(object.value);
  },
  fromProtoMsg(message: CreateRewardSchemeParamsProtoMsg, useInterfaces: boolean = false): CreateRewardSchemeParams {
    return CreateRewardSchemeParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CreateRewardSchemeParams): Uint8Array {
    return CreateRewardSchemeParams.encode(message).finish();
  },
  toProtoMsg(message: CreateRewardSchemeParams): CreateRewardSchemeParamsProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.CreateRewardSchemeParams",
      value: CreateRewardSchemeParams.encode(message).finish()
    };
  }
};
function createBaseUpdateRewardSchemeParams(): UpdateRewardSchemeParams {
  return {
    rewardSchemeId: BigInt(0),
    rewardDenom: undefined,
    assetDenom: undefined,
    rewardType: undefined,
    rewardAmountPerSecond: undefined,
    startTime: undefined,
    endTime: undefined
  };
}
export const UpdateRewardSchemeParams = {
  typeUrl: "/Switcheo.carbon.cdp.UpdateRewardSchemeParams",
  encode(message: UpdateRewardSchemeParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rewardSchemeId !== BigInt(0)) {
      writer.uint32(8).uint64(message.rewardSchemeId);
    }
    if (message.rewardDenom !== undefined) {
      StringValue.encode(message.rewardDenom, writer.uint32(18).fork()).ldelim();
    }
    if (message.assetDenom !== undefined) {
      StringValue.encode(message.assetDenom, writer.uint32(26).fork()).ldelim();
    }
    if (message.rewardType !== undefined) {
      StringValue.encode(message.rewardType, writer.uint32(34).fork()).ldelim();
    }
    if (message.rewardAmountPerSecond !== undefined) {
      writer.uint32(42).string(message.rewardAmountPerSecond);
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(50).fork()).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(toTimestamp(message.endTime), writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UpdateRewardSchemeParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateRewardSchemeParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rewardSchemeId = reader.uint64();
          break;
        case 2:
          message.rewardDenom = StringValue.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.assetDenom = StringValue.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.rewardType = StringValue.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.rewardAmountPerSecond = reader.string();
          break;
        case 6:
          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 7:
          message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UpdateRewardSchemeParams>): UpdateRewardSchemeParams {
    const message = createBaseUpdateRewardSchemeParams();
    message.rewardSchemeId = object.rewardSchemeId !== undefined && object.rewardSchemeId !== null ? BigInt(object.rewardSchemeId.toString()) : BigInt(0);
    message.rewardDenom = object.rewardDenom !== undefined && object.rewardDenom !== null ? StringValue.fromPartial(object.rewardDenom) : undefined;
    message.assetDenom = object.assetDenom !== undefined && object.assetDenom !== null ? StringValue.fromPartial(object.assetDenom) : undefined;
    message.rewardType = object.rewardType !== undefined && object.rewardType !== null ? StringValue.fromPartial(object.rewardType) : undefined;
    message.rewardAmountPerSecond = object.rewardAmountPerSecond ?? undefined;
    message.startTime = object.startTime ?? undefined;
    message.endTime = object.endTime ?? undefined;
    return message;
  },
  fromAmino(object: UpdateRewardSchemeParamsAmino): UpdateRewardSchemeParams {
    const message = createBaseUpdateRewardSchemeParams();
    if (object.reward_scheme_id !== undefined && object.reward_scheme_id !== null) {
      message.rewardSchemeId = BigInt(object.reward_scheme_id);
    }
    if (object.reward_denom !== undefined && object.reward_denom !== null) {
      message.rewardDenom = StringValue.fromAmino(object.reward_denom);
    }
    if (object.asset_denom !== undefined && object.asset_denom !== null) {
      message.assetDenom = StringValue.fromAmino(object.asset_denom);
    }
    if (object.reward_type !== undefined && object.reward_type !== null) {
      message.rewardType = StringValue.fromAmino(object.reward_type);
    }
    if (object.reward_amount_per_second !== undefined && object.reward_amount_per_second !== null) {
      message.rewardAmountPerSecond = object.reward_amount_per_second;
    }
    if (object.start_time !== undefined && object.start_time !== null) {
      message.startTime = fromTimestamp(Timestamp.fromAmino(object.start_time));
    }
    if (object.end_time !== undefined && object.end_time !== null) {
      message.endTime = fromTimestamp(Timestamp.fromAmino(object.end_time));
    }
    return message;
  },
  toAmino(message: UpdateRewardSchemeParams, useInterfaces: boolean = false): UpdateRewardSchemeParamsAmino {
    const obj: any = {};
    obj.reward_scheme_id = message.rewardSchemeId !== BigInt(0) ? message.rewardSchemeId.toString() : undefined;
    obj.reward_denom = message.rewardDenom ? StringValue.toAmino(message.rewardDenom, useInterfaces) : undefined;
    obj.asset_denom = message.assetDenom ? StringValue.toAmino(message.assetDenom, useInterfaces) : undefined;
    obj.reward_type = message.rewardType ? StringValue.toAmino(message.rewardType, useInterfaces) : undefined;
    obj.reward_amount_per_second = message.rewardAmountPerSecond === null ? undefined : message.rewardAmountPerSecond;
    obj.start_time = message.startTime ? Timestamp.toAmino(toTimestamp(message.startTime)) : undefined;
    obj.end_time = message.endTime ? Timestamp.toAmino(toTimestamp(message.endTime)) : undefined;
    return obj;
  },
  fromAminoMsg(object: UpdateRewardSchemeParamsAminoMsg): UpdateRewardSchemeParams {
    return UpdateRewardSchemeParams.fromAmino(object.value);
  },
  fromProtoMsg(message: UpdateRewardSchemeParamsProtoMsg, useInterfaces: boolean = false): UpdateRewardSchemeParams {
    return UpdateRewardSchemeParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UpdateRewardSchemeParams): Uint8Array {
    return UpdateRewardSchemeParams.encode(message).finish();
  },
  toProtoMsg(message: UpdateRewardSchemeParams): UpdateRewardSchemeParamsProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.UpdateRewardSchemeParams",
      value: UpdateRewardSchemeParams.encode(message).finish()
    };
  }
};
function createBaseRewardDebt(): RewardDebt {
  return {
    userAddress: "",
    rewardSchemeId: BigInt(0),
    rewardDebt: "",
    lastUpdatedAt: new Date()
  };
}
export const RewardDebt = {
  typeUrl: "/Switcheo.carbon.cdp.RewardDebt",
  encode(message: RewardDebt, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.userAddress !== "") {
      writer.uint32(10).string(message.userAddress);
    }
    if (message.rewardSchemeId !== BigInt(0)) {
      writer.uint32(16).uint64(message.rewardSchemeId);
    }
    if (message.rewardDebt !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.rewardDebt, 18).atomics);
    }
    if (message.lastUpdatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.lastUpdatedAt), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RewardDebt {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardDebt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userAddress = reader.string();
          break;
        case 2:
          message.rewardSchemeId = reader.uint64();
          break;
        case 3:
          message.rewardDebt = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.lastUpdatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RewardDebt>): RewardDebt {
    const message = createBaseRewardDebt();
    message.userAddress = object.userAddress ?? "";
    message.rewardSchemeId = object.rewardSchemeId !== undefined && object.rewardSchemeId !== null ? BigInt(object.rewardSchemeId.toString()) : BigInt(0);
    message.rewardDebt = object.rewardDebt ?? "";
    message.lastUpdatedAt = object.lastUpdatedAt ?? undefined;
    return message;
  },
  fromAmino(object: RewardDebtAmino): RewardDebt {
    const message = createBaseRewardDebt();
    if (object.user_address !== undefined && object.user_address !== null) {
      message.userAddress = object.user_address;
    }
    if (object.reward_scheme_id !== undefined && object.reward_scheme_id !== null) {
      message.rewardSchemeId = BigInt(object.reward_scheme_id);
    }
    if (object.reward_debt !== undefined && object.reward_debt !== null) {
      message.rewardDebt = object.reward_debt;
    }
    if (object.last_updated_at !== undefined && object.last_updated_at !== null) {
      message.lastUpdatedAt = fromTimestamp(Timestamp.fromAmino(object.last_updated_at));
    }
    return message;
  },
  toAmino(message: RewardDebt, useInterfaces: boolean = false): RewardDebtAmino {
    const obj: any = {};
    obj.user_address = message.userAddress === "" ? undefined : message.userAddress;
    obj.reward_scheme_id = message.rewardSchemeId !== BigInt(0) ? message.rewardSchemeId.toString() : undefined;
    obj.reward_debt = message.rewardDebt === "" ? undefined : message.rewardDebt;
    obj.last_updated_at = message.lastUpdatedAt ? Timestamp.toAmino(toTimestamp(message.lastUpdatedAt)) : undefined;
    return obj;
  },
  fromAminoMsg(object: RewardDebtAminoMsg): RewardDebt {
    return RewardDebt.fromAmino(object.value);
  },
  fromProtoMsg(message: RewardDebtProtoMsg, useInterfaces: boolean = false): RewardDebt {
    return RewardDebt.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RewardDebt): Uint8Array {
    return RewardDebt.encode(message).finish();
  },
  toProtoMsg(message: RewardDebt): RewardDebtProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.RewardDebt",
      value: RewardDebt.encode(message).finish()
    };
  }
};