//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { RateStrategyParams, RateStrategyParamsAmino, RateStrategyParamsSDKType } from "./rate_strategy_params";
import { AssetParams, AssetParamsAmino, AssetParamsSDKType } from "./asset_params";
import { DebtInfo, DebtInfoAmino, DebtInfoSDKType } from "./debt_info";
import { RewardScheme, RewardSchemeAmino, RewardSchemeSDKType } from "./reward_scheme";
import { StablecoinDebtInfo, StablecoinDebtInfoAmino, StablecoinDebtInfoSDKType } from "./stablecoin_debt_info";
import { StablecoinInterestInfo, StablecoinInterestInfoAmino, StablecoinInterestInfoSDKType } from "./stablecoin_interest_info";
import { EModeCategory, EModeCategoryAmino, EModeCategorySDKType } from "./e_mode_category";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../helpers";
export interface GenesisState_CollateralizedCibtRecordsEntry {
  key: string;
  value: Uint8Array;
}
export interface GenesisState_CollateralizedCibtRecordsEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface GenesisState_CollateralizedCibtRecordsEntryAmino {
  key?: string;
  value?: string;
}
export interface GenesisState_CollateralizedCibtRecordsEntryAminoMsg {
  type: string;
  value: GenesisState_CollateralizedCibtRecordsEntryAmino;
}
export interface GenesisState_CollateralizedCibtRecordsEntrySDKType {
  key: string;
  value: Uint8Array;
}
export interface GenesisState_PrincipalRecordsEntry {
  key: string;
  value: Uint8Array;
}
export interface GenesisState_PrincipalRecordsEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface GenesisState_PrincipalRecordsEntryAmino {
  key?: string;
  value?: string;
}
export interface GenesisState_PrincipalRecordsEntryAminoMsg {
  type: string;
  value: GenesisState_PrincipalRecordsEntryAmino;
}
export interface GenesisState_PrincipalRecordsEntrySDKType {
  key: string;
  value: Uint8Array;
}
export interface GenesisState_InitialCumulativeInterestMultiplierRecordsEntry {
  key: string;
  value: Uint8Array;
}
export interface GenesisState_InitialCumulativeInterestMultiplierRecordsEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface GenesisState_InitialCumulativeInterestMultiplierRecordsEntryAmino {
  key?: string;
  value?: string;
}
export interface GenesisState_InitialCumulativeInterestMultiplierRecordsEntryAminoMsg {
  type: string;
  value: GenesisState_InitialCumulativeInterestMultiplierRecordsEntryAmino;
}
export interface GenesisState_InitialCumulativeInterestMultiplierRecordsEntrySDKType {
  key: string;
  value: Uint8Array;
}
export interface GenesisState_PrincipalStablecoinDebtRecordsEntry {
  key: string;
  value: Uint8Array;
}
export interface GenesisState_PrincipalStablecoinDebtRecordsEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface GenesisState_PrincipalStablecoinDebtRecordsEntryAmino {
  key?: string;
  value?: string;
}
export interface GenesisState_PrincipalStablecoinDebtRecordsEntryAminoMsg {
  type: string;
  value: GenesisState_PrincipalStablecoinDebtRecordsEntryAmino;
}
export interface GenesisState_PrincipalStablecoinDebtRecordsEntrySDKType {
  key: string;
  value: Uint8Array;
}
export interface GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry {
  key: string;
  value: Uint8Array;
}
export interface GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntryAmino {
  key?: string;
  value?: string;
}
export interface GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntryAminoMsg {
  type: string;
  value: GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntryAmino;
}
export interface GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntrySDKType {
  key: string;
  value: Uint8Array;
}
export interface GenesisState_RewardDebtRecordsEntry {
  key: string;
  value: Uint8Array;
}
export interface GenesisState_RewardDebtRecordsEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface GenesisState_RewardDebtRecordsEntryAmino {
  key?: string;
  value?: string;
}
export interface GenesisState_RewardDebtRecordsEntryAminoMsg {
  type: string;
  value: GenesisState_RewardDebtRecordsEntryAmino;
}
export interface GenesisState_RewardDebtRecordsEntrySDKType {
  key: string;
  value: Uint8Array;
}
export interface GenesisState_AccountEModeCategoryRecordsEntry {
  key: string;
  value: string;
}
export interface GenesisState_AccountEModeCategoryRecordsEntryProtoMsg {
  typeUrl: string;
  value: Uint8Array;
}
export interface GenesisState_AccountEModeCategoryRecordsEntryAmino {
  key?: string;
  value?: string;
}
export interface GenesisState_AccountEModeCategoryRecordsEntryAminoMsg {
  type: string;
  value: GenesisState_AccountEModeCategoryRecordsEntryAmino;
}
export interface GenesisState_AccountEModeCategoryRecordsEntrySDKType {
  key: string;
  value: string;
}
/** GenesisState defines the cdp module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  rateStrategies: RateStrategyParams[];
  assets: AssetParams[];
  debtInfos: DebtInfo[];
  rewardSchemes: RewardScheme[];
  sequenceNumber: bigint;
  collateralizedCibtRecords: {
    [key: string]: Uint8Array;
  };
  principalRecords: {
    [key: string]: Uint8Array;
  };
  initialCumulativeInterestMultiplierRecords: {
    [key: string]: Uint8Array;
  };
  stablecoinDebtInfo: StablecoinDebtInfo | undefined;
  principalStablecoinDebtRecords: {
    [key: string]: Uint8Array;
  };
  stablecoinInitialCumulativeInterestMultiplierRecords: {
    [key: string]: Uint8Array;
  };
  rewardDebtRecords: {
    [key: string]: Uint8Array;
  };
  stablecoinInterestInfo: StablecoinInterestInfo | undefined;
  eModeCategories: EModeCategory[];
  accountEModeCategoryRecords: {
    [key: string]: string;
  };
}
export interface GenesisStateProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the cdp module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino | undefined;
  rate_strategies?: RateStrategyParamsAmino[];
  assets?: AssetParamsAmino[];
  debt_infos?: DebtInfoAmino[];
  reward_schemes?: RewardSchemeAmino[];
  sequence_number?: string;
  collateralized_cibt_records?: {
    [key: string]: string;
  };
  principal_records?: {
    [key: string]: string;
  };
  initial_cumulative_interest_multiplier_records?: {
    [key: string]: string;
  };
  stablecoin_debt_info?: StablecoinDebtInfoAmino | undefined;
  principal_stablecoin_debt_records?: {
    [key: string]: string;
  };
  stablecoin_initial_cumulative_interest_multiplier_records?: {
    [key: string]: string;
  };
  reward_debt_records?: {
    [key: string]: string;
  };
  stablecoin_interest_info?: StablecoinInterestInfoAmino | undefined;
  e_mode_categories?: EModeCategoryAmino[];
  account_e_mode_category_records?: {
    [key: string]: string;
  };
}
export interface GenesisStateAminoMsg {
  type: "/Switcheo.carbon.cdp.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the cdp module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  rate_strategies: RateStrategyParamsSDKType[];
  assets: AssetParamsSDKType[];
  debt_infos: DebtInfoSDKType[];
  reward_schemes: RewardSchemeSDKType[];
  sequence_number: bigint;
  collateralized_cibt_records: {
    [key: string]: Uint8Array;
  };
  principal_records: {
    [key: string]: Uint8Array;
  };
  initial_cumulative_interest_multiplier_records: {
    [key: string]: Uint8Array;
  };
  stablecoin_debt_info: StablecoinDebtInfoSDKType | undefined;
  principal_stablecoin_debt_records: {
    [key: string]: Uint8Array;
  };
  stablecoin_initial_cumulative_interest_multiplier_records: {
    [key: string]: Uint8Array;
  };
  reward_debt_records: {
    [key: string]: Uint8Array;
  };
  stablecoin_interest_info: StablecoinInterestInfoSDKType | undefined;
  e_mode_categories: EModeCategorySDKType[];
  account_e_mode_category_records: {
    [key: string]: string;
  };
}
function createBaseGenesisState_CollateralizedCibtRecordsEntry(): GenesisState_CollateralizedCibtRecordsEntry {
  return {
    key: "",
    value: new Uint8Array()
  };
}
export const GenesisState_CollateralizedCibtRecordsEntry = {
  encode(message: GenesisState_CollateralizedCibtRecordsEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GenesisState_CollateralizedCibtRecordsEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState_CollateralizedCibtRecordsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState_CollateralizedCibtRecordsEntry>): GenesisState_CollateralizedCibtRecordsEntry {
    const message = createBaseGenesisState_CollateralizedCibtRecordsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? new Uint8Array();
    return message;
  },
  fromAmino(object: GenesisState_CollateralizedCibtRecordsEntryAmino): GenesisState_CollateralizedCibtRecordsEntry {
    const message = createBaseGenesisState_CollateralizedCibtRecordsEntry();
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value);
    }
    return message;
  },
  toAmino(message: GenesisState_CollateralizedCibtRecordsEntry, useInterfaces: boolean = false): GenesisState_CollateralizedCibtRecordsEntryAmino {
    const obj: any = {};
    obj.key = message.key === "" ? undefined : message.key;
    obj.value = message.value ? base64FromBytes(message.value) : undefined;
    return obj;
  },
  fromAminoMsg(object: GenesisState_CollateralizedCibtRecordsEntryAminoMsg): GenesisState_CollateralizedCibtRecordsEntry {
    return GenesisState_CollateralizedCibtRecordsEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisState_CollateralizedCibtRecordsEntryProtoMsg, useInterfaces: boolean = false): GenesisState_CollateralizedCibtRecordsEntry {
    return GenesisState_CollateralizedCibtRecordsEntry.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState_CollateralizedCibtRecordsEntry): Uint8Array {
    return GenesisState_CollateralizedCibtRecordsEntry.encode(message).finish();
  }
};
function createBaseGenesisState_PrincipalRecordsEntry(): GenesisState_PrincipalRecordsEntry {
  return {
    key: "",
    value: new Uint8Array()
  };
}
export const GenesisState_PrincipalRecordsEntry = {
  encode(message: GenesisState_PrincipalRecordsEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GenesisState_PrincipalRecordsEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState_PrincipalRecordsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState_PrincipalRecordsEntry>): GenesisState_PrincipalRecordsEntry {
    const message = createBaseGenesisState_PrincipalRecordsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? new Uint8Array();
    return message;
  },
  fromAmino(object: GenesisState_PrincipalRecordsEntryAmino): GenesisState_PrincipalRecordsEntry {
    const message = createBaseGenesisState_PrincipalRecordsEntry();
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value);
    }
    return message;
  },
  toAmino(message: GenesisState_PrincipalRecordsEntry, useInterfaces: boolean = false): GenesisState_PrincipalRecordsEntryAmino {
    const obj: any = {};
    obj.key = message.key === "" ? undefined : message.key;
    obj.value = message.value ? base64FromBytes(message.value) : undefined;
    return obj;
  },
  fromAminoMsg(object: GenesisState_PrincipalRecordsEntryAminoMsg): GenesisState_PrincipalRecordsEntry {
    return GenesisState_PrincipalRecordsEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisState_PrincipalRecordsEntryProtoMsg, useInterfaces: boolean = false): GenesisState_PrincipalRecordsEntry {
    return GenesisState_PrincipalRecordsEntry.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState_PrincipalRecordsEntry): Uint8Array {
    return GenesisState_PrincipalRecordsEntry.encode(message).finish();
  }
};
function createBaseGenesisState_InitialCumulativeInterestMultiplierRecordsEntry(): GenesisState_InitialCumulativeInterestMultiplierRecordsEntry {
  return {
    key: "",
    value: new Uint8Array()
  };
}
export const GenesisState_InitialCumulativeInterestMultiplierRecordsEntry = {
  encode(message: GenesisState_InitialCumulativeInterestMultiplierRecordsEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GenesisState_InitialCumulativeInterestMultiplierRecordsEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState_InitialCumulativeInterestMultiplierRecordsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState_InitialCumulativeInterestMultiplierRecordsEntry>): GenesisState_InitialCumulativeInterestMultiplierRecordsEntry {
    const message = createBaseGenesisState_InitialCumulativeInterestMultiplierRecordsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? new Uint8Array();
    return message;
  },
  fromAmino(object: GenesisState_InitialCumulativeInterestMultiplierRecordsEntryAmino): GenesisState_InitialCumulativeInterestMultiplierRecordsEntry {
    const message = createBaseGenesisState_InitialCumulativeInterestMultiplierRecordsEntry();
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value);
    }
    return message;
  },
  toAmino(message: GenesisState_InitialCumulativeInterestMultiplierRecordsEntry, useInterfaces: boolean = false): GenesisState_InitialCumulativeInterestMultiplierRecordsEntryAmino {
    const obj: any = {};
    obj.key = message.key === "" ? undefined : message.key;
    obj.value = message.value ? base64FromBytes(message.value) : undefined;
    return obj;
  },
  fromAminoMsg(object: GenesisState_InitialCumulativeInterestMultiplierRecordsEntryAminoMsg): GenesisState_InitialCumulativeInterestMultiplierRecordsEntry {
    return GenesisState_InitialCumulativeInterestMultiplierRecordsEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisState_InitialCumulativeInterestMultiplierRecordsEntryProtoMsg, useInterfaces: boolean = false): GenesisState_InitialCumulativeInterestMultiplierRecordsEntry {
    return GenesisState_InitialCumulativeInterestMultiplierRecordsEntry.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState_InitialCumulativeInterestMultiplierRecordsEntry): Uint8Array {
    return GenesisState_InitialCumulativeInterestMultiplierRecordsEntry.encode(message).finish();
  }
};
function createBaseGenesisState_PrincipalStablecoinDebtRecordsEntry(): GenesisState_PrincipalStablecoinDebtRecordsEntry {
  return {
    key: "",
    value: new Uint8Array()
  };
}
export const GenesisState_PrincipalStablecoinDebtRecordsEntry = {
  encode(message: GenesisState_PrincipalStablecoinDebtRecordsEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GenesisState_PrincipalStablecoinDebtRecordsEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState_PrincipalStablecoinDebtRecordsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState_PrincipalStablecoinDebtRecordsEntry>): GenesisState_PrincipalStablecoinDebtRecordsEntry {
    const message = createBaseGenesisState_PrincipalStablecoinDebtRecordsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? new Uint8Array();
    return message;
  },
  fromAmino(object: GenesisState_PrincipalStablecoinDebtRecordsEntryAmino): GenesisState_PrincipalStablecoinDebtRecordsEntry {
    const message = createBaseGenesisState_PrincipalStablecoinDebtRecordsEntry();
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value);
    }
    return message;
  },
  toAmino(message: GenesisState_PrincipalStablecoinDebtRecordsEntry, useInterfaces: boolean = false): GenesisState_PrincipalStablecoinDebtRecordsEntryAmino {
    const obj: any = {};
    obj.key = message.key === "" ? undefined : message.key;
    obj.value = message.value ? base64FromBytes(message.value) : undefined;
    return obj;
  },
  fromAminoMsg(object: GenesisState_PrincipalStablecoinDebtRecordsEntryAminoMsg): GenesisState_PrincipalStablecoinDebtRecordsEntry {
    return GenesisState_PrincipalStablecoinDebtRecordsEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisState_PrincipalStablecoinDebtRecordsEntryProtoMsg, useInterfaces: boolean = false): GenesisState_PrincipalStablecoinDebtRecordsEntry {
    return GenesisState_PrincipalStablecoinDebtRecordsEntry.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState_PrincipalStablecoinDebtRecordsEntry): Uint8Array {
    return GenesisState_PrincipalStablecoinDebtRecordsEntry.encode(message).finish();
  }
};
function createBaseGenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry(): GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry {
  return {
    key: "",
    value: new Uint8Array()
  };
}
export const GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry = {
  encode(message: GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry>): GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry {
    const message = createBaseGenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? new Uint8Array();
    return message;
  },
  fromAmino(object: GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntryAmino): GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry {
    const message = createBaseGenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry();
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value);
    }
    return message;
  },
  toAmino(message: GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry, useInterfaces: boolean = false): GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntryAmino {
    const obj: any = {};
    obj.key = message.key === "" ? undefined : message.key;
    obj.value = message.value ? base64FromBytes(message.value) : undefined;
    return obj;
  },
  fromAminoMsg(object: GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntryAminoMsg): GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry {
    return GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntryProtoMsg, useInterfaces: boolean = false): GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry {
    return GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry): Uint8Array {
    return GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry.encode(message).finish();
  }
};
function createBaseGenesisState_RewardDebtRecordsEntry(): GenesisState_RewardDebtRecordsEntry {
  return {
    key: "",
    value: new Uint8Array()
  };
}
export const GenesisState_RewardDebtRecordsEntry = {
  encode(message: GenesisState_RewardDebtRecordsEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GenesisState_RewardDebtRecordsEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState_RewardDebtRecordsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState_RewardDebtRecordsEntry>): GenesisState_RewardDebtRecordsEntry {
    const message = createBaseGenesisState_RewardDebtRecordsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? new Uint8Array();
    return message;
  },
  fromAmino(object: GenesisState_RewardDebtRecordsEntryAmino): GenesisState_RewardDebtRecordsEntry {
    const message = createBaseGenesisState_RewardDebtRecordsEntry();
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value);
    }
    return message;
  },
  toAmino(message: GenesisState_RewardDebtRecordsEntry, useInterfaces: boolean = false): GenesisState_RewardDebtRecordsEntryAmino {
    const obj: any = {};
    obj.key = message.key === "" ? undefined : message.key;
    obj.value = message.value ? base64FromBytes(message.value) : undefined;
    return obj;
  },
  fromAminoMsg(object: GenesisState_RewardDebtRecordsEntryAminoMsg): GenesisState_RewardDebtRecordsEntry {
    return GenesisState_RewardDebtRecordsEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisState_RewardDebtRecordsEntryProtoMsg, useInterfaces: boolean = false): GenesisState_RewardDebtRecordsEntry {
    return GenesisState_RewardDebtRecordsEntry.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState_RewardDebtRecordsEntry): Uint8Array {
    return GenesisState_RewardDebtRecordsEntry.encode(message).finish();
  }
};
function createBaseGenesisState_AccountEModeCategoryRecordsEntry(): GenesisState_AccountEModeCategoryRecordsEntry {
  return {
    key: "",
    value: ""
  };
}
export const GenesisState_AccountEModeCategoryRecordsEntry = {
  encode(message: GenesisState_AccountEModeCategoryRecordsEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GenesisState_AccountEModeCategoryRecordsEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState_AccountEModeCategoryRecordsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState_AccountEModeCategoryRecordsEntry>): GenesisState_AccountEModeCategoryRecordsEntry {
    const message = createBaseGenesisState_AccountEModeCategoryRecordsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
  fromAmino(object: GenesisState_AccountEModeCategoryRecordsEntryAmino): GenesisState_AccountEModeCategoryRecordsEntry {
    const message = createBaseGenesisState_AccountEModeCategoryRecordsEntry();
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toAmino(message: GenesisState_AccountEModeCategoryRecordsEntry, useInterfaces: boolean = false): GenesisState_AccountEModeCategoryRecordsEntryAmino {
    const obj: any = {};
    obj.key = message.key === "" ? undefined : message.key;
    obj.value = message.value === "" ? undefined : message.value;
    return obj;
  },
  fromAminoMsg(object: GenesisState_AccountEModeCategoryRecordsEntryAminoMsg): GenesisState_AccountEModeCategoryRecordsEntry {
    return GenesisState_AccountEModeCategoryRecordsEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisState_AccountEModeCategoryRecordsEntryProtoMsg, useInterfaces: boolean = false): GenesisState_AccountEModeCategoryRecordsEntry {
    return GenesisState_AccountEModeCategoryRecordsEntry.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState_AccountEModeCategoryRecordsEntry): Uint8Array {
    return GenesisState_AccountEModeCategoryRecordsEntry.encode(message).finish();
  }
};
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    rateStrategies: [],
    assets: [],
    debtInfos: [],
    rewardSchemes: [],
    sequenceNumber: BigInt(0),
    collateralizedCibtRecords: {},
    principalRecords: {},
    initialCumulativeInterestMultiplierRecords: {},
    stablecoinDebtInfo: StablecoinDebtInfo.fromPartial({}),
    principalStablecoinDebtRecords: {},
    stablecoinInitialCumulativeInterestMultiplierRecords: {},
    rewardDebtRecords: {},
    stablecoinInterestInfo: StablecoinInterestInfo.fromPartial({}),
    eModeCategories: [],
    accountEModeCategoryRecords: {}
  };
}
export const GenesisState = {
  typeUrl: "/Switcheo.carbon.cdp.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.rateStrategies) {
      RateStrategyParams.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.assets) {
      AssetParams.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.debtInfos) {
      DebtInfo.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.rewardSchemes) {
      RewardScheme.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.sequenceNumber !== BigInt(0)) {
      writer.uint32(48).uint64(message.sequenceNumber);
    }
    Object.entries(message.collateralizedCibtRecords).forEach(([key, value]) => {
      GenesisState_CollateralizedCibtRecordsEntry.encode({
        key: (key as any),
        value
      }, writer.uint32(58).fork()).ldelim();
    });
    Object.entries(message.principalRecords).forEach(([key, value]) => {
      GenesisState_PrincipalRecordsEntry.encode({
        key: (key as any),
        value
      }, writer.uint32(66).fork()).ldelim();
    });
    Object.entries(message.initialCumulativeInterestMultiplierRecords).forEach(([key, value]) => {
      GenesisState_InitialCumulativeInterestMultiplierRecordsEntry.encode({
        key: (key as any),
        value
      }, writer.uint32(74).fork()).ldelim();
    });
    if (message.stablecoinDebtInfo !== undefined) {
      StablecoinDebtInfo.encode(message.stablecoinDebtInfo, writer.uint32(82).fork()).ldelim();
    }
    Object.entries(message.principalStablecoinDebtRecords).forEach(([key, value]) => {
      GenesisState_PrincipalStablecoinDebtRecordsEntry.encode({
        key: (key as any),
        value
      }, writer.uint32(90).fork()).ldelim();
    });
    Object.entries(message.stablecoinInitialCumulativeInterestMultiplierRecords).forEach(([key, value]) => {
      GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry.encode({
        key: (key as any),
        value
      }, writer.uint32(98).fork()).ldelim();
    });
    Object.entries(message.rewardDebtRecords).forEach(([key, value]) => {
      GenesisState_RewardDebtRecordsEntry.encode({
        key: (key as any),
        value
      }, writer.uint32(106).fork()).ldelim();
    });
    if (message.stablecoinInterestInfo !== undefined) {
      StablecoinInterestInfo.encode(message.stablecoinInterestInfo, writer.uint32(114).fork()).ldelim();
    }
    for (const v of message.eModeCategories) {
      EModeCategory.encode(v!, writer.uint32(122).fork()).ldelim();
    }
    Object.entries(message.accountEModeCategoryRecords).forEach(([key, value]) => {
      GenesisState_AccountEModeCategoryRecordsEntry.encode({
        key: (key as any),
        value
      }, writer.uint32(130).fork()).ldelim();
    });
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.rateStrategies.push(RateStrategyParams.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.assets.push(AssetParams.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.debtInfos.push(DebtInfo.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.rewardSchemes.push(RewardScheme.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 6:
          message.sequenceNumber = reader.uint64();
          break;
        case 7:
          const entry7 = GenesisState_CollateralizedCibtRecordsEntry.decode(reader, reader.uint32());
          if (entry7.value !== undefined) {
            message.collateralizedCibtRecords[entry7.key] = entry7.value;
          }
          break;
        case 8:
          const entry8 = GenesisState_PrincipalRecordsEntry.decode(reader, reader.uint32());
          if (entry8.value !== undefined) {
            message.principalRecords[entry8.key] = entry8.value;
          }
          break;
        case 9:
          const entry9 = GenesisState_InitialCumulativeInterestMultiplierRecordsEntry.decode(reader, reader.uint32());
          if (entry9.value !== undefined) {
            message.initialCumulativeInterestMultiplierRecords[entry9.key] = entry9.value;
          }
          break;
        case 10:
          message.stablecoinDebtInfo = StablecoinDebtInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 11:
          const entry11 = GenesisState_PrincipalStablecoinDebtRecordsEntry.decode(reader, reader.uint32());
          if (entry11.value !== undefined) {
            message.principalStablecoinDebtRecords[entry11.key] = entry11.value;
          }
          break;
        case 12:
          const entry12 = GenesisState_StablecoinInitialCumulativeInterestMultiplierRecordsEntry.decode(reader, reader.uint32());
          if (entry12.value !== undefined) {
            message.stablecoinInitialCumulativeInterestMultiplierRecords[entry12.key] = entry12.value;
          }
          break;
        case 13:
          const entry13 = GenesisState_RewardDebtRecordsEntry.decode(reader, reader.uint32());
          if (entry13.value !== undefined) {
            message.rewardDebtRecords[entry13.key] = entry13.value;
          }
          break;
        case 14:
          message.stablecoinInterestInfo = StablecoinInterestInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 15:
          message.eModeCategories.push(EModeCategory.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 16:
          const entry16 = GenesisState_AccountEModeCategoryRecordsEntry.decode(reader, reader.uint32());
          if (entry16.value !== undefined) {
            message.accountEModeCategoryRecords[entry16.key] = entry16.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.rateStrategies = object.rateStrategies?.map(e => RateStrategyParams.fromPartial(e)) || [];
    message.assets = object.assets?.map(e => AssetParams.fromPartial(e)) || [];
    message.debtInfos = object.debtInfos?.map(e => DebtInfo.fromPartial(e)) || [];
    message.rewardSchemes = object.rewardSchemes?.map(e => RewardScheme.fromPartial(e)) || [];
    message.sequenceNumber = object.sequenceNumber !== undefined && object.sequenceNumber !== null ? BigInt(object.sequenceNumber.toString()) : BigInt(0);
    message.collateralizedCibtRecords = Object.entries(object.collateralizedCibtRecords ?? {}).reduce<{
      [key: string]: bytes;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = bytes.fromPartial(value);
      }
      return acc;
    }, {});
    message.principalRecords = Object.entries(object.principalRecords ?? {}).reduce<{
      [key: string]: bytes;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = bytes.fromPartial(value);
      }
      return acc;
    }, {});
    message.initialCumulativeInterestMultiplierRecords = Object.entries(object.initialCumulativeInterestMultiplierRecords ?? {}).reduce<{
      [key: string]: bytes;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = bytes.fromPartial(value);
      }
      return acc;
    }, {});
    message.stablecoinDebtInfo = object.stablecoinDebtInfo !== undefined && object.stablecoinDebtInfo !== null ? StablecoinDebtInfo.fromPartial(object.stablecoinDebtInfo) : undefined;
    message.principalStablecoinDebtRecords = Object.entries(object.principalStablecoinDebtRecords ?? {}).reduce<{
      [key: string]: bytes;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = bytes.fromPartial(value);
      }
      return acc;
    }, {});
    message.stablecoinInitialCumulativeInterestMultiplierRecords = Object.entries(object.stablecoinInitialCumulativeInterestMultiplierRecords ?? {}).reduce<{
      [key: string]: bytes;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = bytes.fromPartial(value);
      }
      return acc;
    }, {});
    message.rewardDebtRecords = Object.entries(object.rewardDebtRecords ?? {}).reduce<{
      [key: string]: bytes;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = bytes.fromPartial(value);
      }
      return acc;
    }, {});
    message.stablecoinInterestInfo = object.stablecoinInterestInfo !== undefined && object.stablecoinInterestInfo !== null ? StablecoinInterestInfo.fromPartial(object.stablecoinInterestInfo) : undefined;
    message.eModeCategories = object.eModeCategories?.map(e => EModeCategory.fromPartial(e)) || [];
    message.accountEModeCategoryRecords = Object.entries(object.accountEModeCategoryRecords ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.rateStrategies = object.rate_strategies?.map(e => RateStrategyParams.fromAmino(e)) || [];
    message.assets = object.assets?.map(e => AssetParams.fromAmino(e)) || [];
    message.debtInfos = object.debt_infos?.map(e => DebtInfo.fromAmino(e)) || [];
    message.rewardSchemes = object.reward_schemes?.map(e => RewardScheme.fromAmino(e)) || [];
    if (object.sequence_number !== undefined && object.sequence_number !== null) {
      message.sequenceNumber = BigInt(object.sequence_number);
    }
    message.collateralizedCibtRecords = Object.entries(object.collateralized_cibt_records ?? {}).reduce<{
      [key: string]: bytes;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = bytes.fromAmino(value);
      }
      return acc;
    }, {});
    message.principalRecords = Object.entries(object.principal_records ?? {}).reduce<{
      [key: string]: bytes;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = bytes.fromAmino(value);
      }
      return acc;
    }, {});
    message.initialCumulativeInterestMultiplierRecords = Object.entries(object.initial_cumulative_interest_multiplier_records ?? {}).reduce<{
      [key: string]: bytes;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = bytes.fromAmino(value);
      }
      return acc;
    }, {});
    if (object.stablecoin_debt_info !== undefined && object.stablecoin_debt_info !== null) {
      message.stablecoinDebtInfo = StablecoinDebtInfo.fromAmino(object.stablecoin_debt_info);
    }
    message.principalStablecoinDebtRecords = Object.entries(object.principal_stablecoin_debt_records ?? {}).reduce<{
      [key: string]: bytes;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = bytes.fromAmino(value);
      }
      return acc;
    }, {});
    message.stablecoinInitialCumulativeInterestMultiplierRecords = Object.entries(object.stablecoin_initial_cumulative_interest_multiplier_records ?? {}).reduce<{
      [key: string]: bytes;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = bytes.fromAmino(value);
      }
      return acc;
    }, {});
    message.rewardDebtRecords = Object.entries(object.reward_debt_records ?? {}).reduce<{
      [key: string]: bytes;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = bytes.fromAmino(value);
      }
      return acc;
    }, {});
    if (object.stablecoin_interest_info !== undefined && object.stablecoin_interest_info !== null) {
      message.stablecoinInterestInfo = StablecoinInterestInfo.fromAmino(object.stablecoin_interest_info);
    }
    message.eModeCategories = object.e_mode_categories?.map(e => EModeCategory.fromAmino(e)) || [];
    message.accountEModeCategoryRecords = Object.entries(object.account_e_mode_category_records ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    if (message.rateStrategies) {
      obj.rate_strategies = message.rateStrategies.map(e => e ? RateStrategyParams.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.rate_strategies = message.rateStrategies;
    }
    if (message.assets) {
      obj.assets = message.assets.map(e => e ? AssetParams.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.assets = message.assets;
    }
    if (message.debtInfos) {
      obj.debt_infos = message.debtInfos.map(e => e ? DebtInfo.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.debt_infos = message.debtInfos;
    }
    if (message.rewardSchemes) {
      obj.reward_schemes = message.rewardSchemes.map(e => e ? RewardScheme.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.reward_schemes = message.rewardSchemes;
    }
    obj.sequence_number = message.sequenceNumber !== BigInt(0) ? message.sequenceNumber.toString() : undefined;
    obj.collateralized_cibt_records = {};
    if (message.collateralizedCibtRecords) {
      Object.entries(message.collateralizedCibtRecords).forEach(([k, v]) => {
        obj.collateralized_cibt_records[k] = bytes.toAmino(v);
      });
    }
    obj.principal_records = {};
    if (message.principalRecords) {
      Object.entries(message.principalRecords).forEach(([k, v]) => {
        obj.principal_records[k] = bytes.toAmino(v);
      });
    }
    obj.initial_cumulative_interest_multiplier_records = {};
    if (message.initialCumulativeInterestMultiplierRecords) {
      Object.entries(message.initialCumulativeInterestMultiplierRecords).forEach(([k, v]) => {
        obj.initial_cumulative_interest_multiplier_records[k] = bytes.toAmino(v);
      });
    }
    obj.stablecoin_debt_info = message.stablecoinDebtInfo ? StablecoinDebtInfo.toAmino(message.stablecoinDebtInfo, useInterfaces) : undefined;
    obj.principal_stablecoin_debt_records = {};
    if (message.principalStablecoinDebtRecords) {
      Object.entries(message.principalStablecoinDebtRecords).forEach(([k, v]) => {
        obj.principal_stablecoin_debt_records[k] = bytes.toAmino(v);
      });
    }
    obj.stablecoin_initial_cumulative_interest_multiplier_records = {};
    if (message.stablecoinInitialCumulativeInterestMultiplierRecords) {
      Object.entries(message.stablecoinInitialCumulativeInterestMultiplierRecords).forEach(([k, v]) => {
        obj.stablecoin_initial_cumulative_interest_multiplier_records[k] = bytes.toAmino(v);
      });
    }
    obj.reward_debt_records = {};
    if (message.rewardDebtRecords) {
      Object.entries(message.rewardDebtRecords).forEach(([k, v]) => {
        obj.reward_debt_records[k] = bytes.toAmino(v);
      });
    }
    obj.stablecoin_interest_info = message.stablecoinInterestInfo ? StablecoinInterestInfo.toAmino(message.stablecoinInterestInfo, useInterfaces) : undefined;
    if (message.eModeCategories) {
      obj.e_mode_categories = message.eModeCategories.map(e => e ? EModeCategory.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.e_mode_categories = message.eModeCategories;
    }
    obj.account_e_mode_category_records = {};
    if (message.accountEModeCategoryRecords) {
      Object.entries(message.accountEModeCategoryRecords).forEach(([k, v]) => {
        obj.account_e_mode_category_records[k] = v;
      });
    }
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg, useInterfaces: boolean = false): GenesisState {
    return GenesisState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};