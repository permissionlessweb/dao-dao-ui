import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { toTimestamp, fromTimestamp } from "../../../helpers";
import { Decimal } from "@cosmjs/math";
export interface DebtInfo {
  denom: string;
  lastUpdatedTime: Date | undefined;
  totalPrincipal: string;
  cumulativeInterestMultiplier: string;
  totalAccumulatedInterest: string;
  utilizationRate: string;
}
export interface DebtInfoProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.DebtInfo";
  value: Uint8Array;
}
export interface DebtInfoAmino {
  denom?: string;
  last_updated_time?: string | undefined;
  total_principal?: string;
  cumulative_interest_multiplier?: string;
  total_accumulated_interest?: string;
  utilization_rate?: string;
}
export interface DebtInfoAminoMsg {
  type: "/Switcheo.carbon.cdp.DebtInfo";
  value: DebtInfoAmino;
}
export interface DebtInfoSDKType {
  denom: string;
  last_updated_time: Date | undefined;
  total_principal: string;
  cumulative_interest_multiplier: string;
  total_accumulated_interest: string;
  utilization_rate: string;
}
function createBaseDebtInfo(): DebtInfo {
  return {
    denom: "",
    lastUpdatedTime: new Date(),
    totalPrincipal: "",
    cumulativeInterestMultiplier: "",
    totalAccumulatedInterest: "",
    utilizationRate: ""
  };
}
export const DebtInfo = {
  typeUrl: "/Switcheo.carbon.cdp.DebtInfo",
  encode(message: DebtInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.lastUpdatedTime !== undefined) {
      Timestamp.encode(toTimestamp(message.lastUpdatedTime), writer.uint32(18).fork()).ldelim();
    }
    if (message.totalPrincipal !== "") {
      writer.uint32(26).string(message.totalPrincipal);
    }
    if (message.cumulativeInterestMultiplier !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.cumulativeInterestMultiplier, 18).atomics);
    }
    if (message.totalAccumulatedInterest !== "") {
      writer.uint32(42).string(message.totalAccumulatedInterest);
    }
    if (message.utilizationRate !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.utilizationRate, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DebtInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDebtInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.lastUpdatedTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.totalPrincipal = reader.string();
          break;
        case 4:
          message.cumulativeInterestMultiplier = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.totalAccumulatedInterest = reader.string();
          break;
        case 6:
          message.utilizationRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DebtInfo>): DebtInfo {
    const message = createBaseDebtInfo();
    message.denom = object.denom ?? "";
    message.lastUpdatedTime = object.lastUpdatedTime ?? undefined;
    message.totalPrincipal = object.totalPrincipal ?? "";
    message.cumulativeInterestMultiplier = object.cumulativeInterestMultiplier ?? "";
    message.totalAccumulatedInterest = object.totalAccumulatedInterest ?? "";
    message.utilizationRate = object.utilizationRate ?? "";
    return message;
  },
  fromAmino(object: DebtInfoAmino): DebtInfo {
    const message = createBaseDebtInfo();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.last_updated_time !== undefined && object.last_updated_time !== null) {
      message.lastUpdatedTime = fromTimestamp(Timestamp.fromAmino(object.last_updated_time));
    }
    if (object.total_principal !== undefined && object.total_principal !== null) {
      message.totalPrincipal = object.total_principal;
    }
    if (object.cumulative_interest_multiplier !== undefined && object.cumulative_interest_multiplier !== null) {
      message.cumulativeInterestMultiplier = object.cumulative_interest_multiplier;
    }
    if (object.total_accumulated_interest !== undefined && object.total_accumulated_interest !== null) {
      message.totalAccumulatedInterest = object.total_accumulated_interest;
    }
    if (object.utilization_rate !== undefined && object.utilization_rate !== null) {
      message.utilizationRate = object.utilization_rate;
    }
    return message;
  },
  toAmino(message: DebtInfo, useInterfaces: boolean = false): DebtInfoAmino {
    const obj: any = {};
    obj.denom = message.denom === "" ? undefined : message.denom;
    obj.last_updated_time = message.lastUpdatedTime ? Timestamp.toAmino(toTimestamp(message.lastUpdatedTime)) : undefined;
    obj.total_principal = message.totalPrincipal === "" ? undefined : message.totalPrincipal;
    obj.cumulative_interest_multiplier = message.cumulativeInterestMultiplier === "" ? undefined : message.cumulativeInterestMultiplier;
    obj.total_accumulated_interest = message.totalAccumulatedInterest === "" ? undefined : message.totalAccumulatedInterest;
    obj.utilization_rate = message.utilizationRate === "" ? undefined : message.utilizationRate;
    return obj;
  },
  fromAminoMsg(object: DebtInfoAminoMsg): DebtInfo {
    return DebtInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: DebtInfoProtoMsg, useInterfaces: boolean = false): DebtInfo {
    return DebtInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DebtInfo): Uint8Array {
    return DebtInfo.encode(message).finish();
  },
  toProtoMsg(message: DebtInfo): DebtInfoProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.DebtInfo",
      value: DebtInfo.encode(message).finish()
    };
  }
};