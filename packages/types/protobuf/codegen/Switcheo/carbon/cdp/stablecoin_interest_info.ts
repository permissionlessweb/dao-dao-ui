import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { toTimestamp, fromTimestamp } from "../../../helpers";
import { Decimal } from "@cosmjs/math";
export interface StablecoinInterestInfo {
  lastUpdatedTime: Date | undefined;
  stablecoinInterestRate: string;
}
export interface StablecoinInterestInfoProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.StablecoinInterestInfo";
  value: Uint8Array;
}
export interface StablecoinInterestInfoAmino {
  last_updated_time?: string | undefined;
  stablecoin_interest_rate?: string;
}
export interface StablecoinInterestInfoAminoMsg {
  type: "/Switcheo.carbon.cdp.StablecoinInterestInfo";
  value: StablecoinInterestInfoAmino;
}
export interface StablecoinInterestInfoSDKType {
  last_updated_time: Date | undefined;
  stablecoin_interest_rate: string;
}
function createBaseStablecoinInterestInfo(): StablecoinInterestInfo {
  return {
    lastUpdatedTime: new Date(),
    stablecoinInterestRate: ""
  };
}
export const StablecoinInterestInfo = {
  typeUrl: "/Switcheo.carbon.cdp.StablecoinInterestInfo",
  encode(message: StablecoinInterestInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lastUpdatedTime !== undefined) {
      Timestamp.encode(toTimestamp(message.lastUpdatedTime), writer.uint32(10).fork()).ldelim();
    }
    if (message.stablecoinInterestRate !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.stablecoinInterestRate, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): StablecoinInterestInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStablecoinInterestInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lastUpdatedTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.stablecoinInterestRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<StablecoinInterestInfo>): StablecoinInterestInfo {
    const message = createBaseStablecoinInterestInfo();
    message.lastUpdatedTime = object.lastUpdatedTime ?? undefined;
    message.stablecoinInterestRate = object.stablecoinInterestRate ?? "";
    return message;
  },
  fromAmino(object: StablecoinInterestInfoAmino): StablecoinInterestInfo {
    const message = createBaseStablecoinInterestInfo();
    if (object.last_updated_time !== undefined && object.last_updated_time !== null) {
      message.lastUpdatedTime = fromTimestamp(Timestamp.fromAmino(object.last_updated_time));
    }
    if (object.stablecoin_interest_rate !== undefined && object.stablecoin_interest_rate !== null) {
      message.stablecoinInterestRate = object.stablecoin_interest_rate;
    }
    return message;
  },
  toAmino(message: StablecoinInterestInfo, useInterfaces: boolean = false): StablecoinInterestInfoAmino {
    const obj: any = {};
    obj.last_updated_time = message.lastUpdatedTime ? Timestamp.toAmino(toTimestamp(message.lastUpdatedTime)) : undefined;
    obj.stablecoin_interest_rate = message.stablecoinInterestRate === "" ? undefined : message.stablecoinInterestRate;
    return obj;
  },
  fromAminoMsg(object: StablecoinInterestInfoAminoMsg): StablecoinInterestInfo {
    return StablecoinInterestInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: StablecoinInterestInfoProtoMsg, useInterfaces: boolean = false): StablecoinInterestInfo {
    return StablecoinInterestInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: StablecoinInterestInfo): Uint8Array {
    return StablecoinInterestInfo.encode(message).finish();
  },
  toProtoMsg(message: StablecoinInterestInfo): StablecoinInterestInfoProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.StablecoinInterestInfo",
      value: StablecoinInterestInfo.encode(message).finish()
    };
  }
};