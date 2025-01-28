import { BinaryReader, BinaryWriter } from "../../../binary";
export interface EModeCategory {
  name: string;
  denoms: string[];
  loanToValue: string;
  liquidationThreshold: string;
  liquidationDiscount: string;
  isActive: boolean;
}
export interface EModeCategoryProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.EModeCategory";
  value: Uint8Array;
}
export interface EModeCategoryAmino {
  name?: string;
  denoms?: string[];
  loan_to_value?: string;
  liquidation_threshold?: string;
  liquidation_discount?: string;
  is_active?: boolean;
}
export interface EModeCategoryAminoMsg {
  type: "/Switcheo.carbon.cdp.EModeCategory";
  value: EModeCategoryAmino;
}
export interface EModeCategorySDKType {
  name: string;
  denoms: string[];
  loan_to_value: string;
  liquidation_threshold: string;
  liquidation_discount: string;
  is_active: boolean;
}
function createBaseEModeCategory(): EModeCategory {
  return {
    name: "",
    denoms: [],
    loanToValue: "",
    liquidationThreshold: "",
    liquidationDiscount: "",
    isActive: false
  };
}
export const EModeCategory = {
  typeUrl: "/Switcheo.carbon.cdp.EModeCategory",
  encode(message: EModeCategory, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.denoms) {
      writer.uint32(18).string(v!);
    }
    if (message.loanToValue !== "") {
      writer.uint32(26).string(message.loanToValue);
    }
    if (message.liquidationThreshold !== "") {
      writer.uint32(34).string(message.liquidationThreshold);
    }
    if (message.liquidationDiscount !== "") {
      writer.uint32(42).string(message.liquidationDiscount);
    }
    if (message.isActive === true) {
      writer.uint32(48).bool(message.isActive);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EModeCategory {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEModeCategory();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.denoms.push(reader.string());
          break;
        case 3:
          message.loanToValue = reader.string();
          break;
        case 4:
          message.liquidationThreshold = reader.string();
          break;
        case 5:
          message.liquidationDiscount = reader.string();
          break;
        case 6:
          message.isActive = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EModeCategory>): EModeCategory {
    const message = createBaseEModeCategory();
    message.name = object.name ?? "";
    message.denoms = object.denoms?.map(e => e) || [];
    message.loanToValue = object.loanToValue ?? "";
    message.liquidationThreshold = object.liquidationThreshold ?? "";
    message.liquidationDiscount = object.liquidationDiscount ?? "";
    message.isActive = object.isActive ?? false;
    return message;
  },
  fromAmino(object: EModeCategoryAmino): EModeCategory {
    const message = createBaseEModeCategory();
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    message.denoms = object.denoms?.map(e => e) || [];
    if (object.loan_to_value !== undefined && object.loan_to_value !== null) {
      message.loanToValue = object.loan_to_value;
    }
    if (object.liquidation_threshold !== undefined && object.liquidation_threshold !== null) {
      message.liquidationThreshold = object.liquidation_threshold;
    }
    if (object.liquidation_discount !== undefined && object.liquidation_discount !== null) {
      message.liquidationDiscount = object.liquidation_discount;
    }
    if (object.is_active !== undefined && object.is_active !== null) {
      message.isActive = object.is_active;
    }
    return message;
  },
  toAmino(message: EModeCategory, useInterfaces: boolean = false): EModeCategoryAmino {
    const obj: any = {};
    obj.name = message.name === "" ? undefined : message.name;
    if (message.denoms) {
      obj.denoms = message.denoms.map(e => e);
    } else {
      obj.denoms = message.denoms;
    }
    obj.loan_to_value = message.loanToValue === "" ? undefined : message.loanToValue;
    obj.liquidation_threshold = message.liquidationThreshold === "" ? undefined : message.liquidationThreshold;
    obj.liquidation_discount = message.liquidationDiscount === "" ? undefined : message.liquidationDiscount;
    obj.is_active = message.isActive === false ? undefined : message.isActive;
    return obj;
  },
  fromAminoMsg(object: EModeCategoryAminoMsg): EModeCategory {
    return EModeCategory.fromAmino(object.value);
  },
  fromProtoMsg(message: EModeCategoryProtoMsg, useInterfaces: boolean = false): EModeCategory {
    return EModeCategory.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EModeCategory): Uint8Array {
    return EModeCategory.encode(message).finish();
  },
  toProtoMsg(message: EModeCategory): EModeCategoryProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.EModeCategory",
      value: EModeCategory.encode(message).finish()
    };
  }
};