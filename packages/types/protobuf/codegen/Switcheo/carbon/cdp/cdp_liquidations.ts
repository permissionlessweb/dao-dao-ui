import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
import { toTimestamp, fromTimestamp } from "../../../helpers";
export interface CDPLiquidations {
  id: bigint;
  liquidator: string;
  debtor: string;
  collateralDenom: string;
  collateralAmountLiquidated: string;
  collateralAmountLiquidator: string;
  collateralAmountFee: string;
  liquidationPrice: string;
  marketPrice: string;
  discount: string;
  debtDenom: string;
  debtAmount: string;
  blockHeight: bigint;
  blockTime: Date | undefined;
  transactionHash: string;
}
export interface CDPLiquidationsProtoMsg {
  typeUrl: "/Switcheo.carbon.cdp.CDPLiquidations";
  value: Uint8Array;
}
export interface CDPLiquidationsAmino {
  id?: string;
  liquidator?: string;
  debtor?: string;
  collateral_denom?: string;
  collateral_amount_liquidated?: string;
  collateral_amount_liquidator?: string;
  collateral_amount_fee?: string;
  liquidation_price?: string;
  market_price?: string;
  discount?: string;
  debt_denom?: string;
  debt_amount?: string;
  block_height?: string;
  block_time?: string | undefined;
  transaction_hash?: string;
}
export interface CDPLiquidationsAminoMsg {
  type: "/Switcheo.carbon.cdp.CDPLiquidations";
  value: CDPLiquidationsAmino;
}
export interface CDPLiquidationsSDKType {
  id: bigint;
  liquidator: string;
  debtor: string;
  collateral_denom: string;
  collateral_amount_liquidated: string;
  collateral_amount_liquidator: string;
  collateral_amount_fee: string;
  liquidation_price: string;
  market_price: string;
  discount: string;
  debt_denom: string;
  debt_amount: string;
  block_height: bigint;
  block_time: Date | undefined;
  transaction_hash: string;
}
function createBaseCDPLiquidations(): CDPLiquidations {
  return {
    id: BigInt(0),
    liquidator: "",
    debtor: "",
    collateralDenom: "",
    collateralAmountLiquidated: "",
    collateralAmountLiquidator: "",
    collateralAmountFee: "",
    liquidationPrice: "",
    marketPrice: "",
    discount: "",
    debtDenom: "",
    debtAmount: "",
    blockHeight: BigInt(0),
    blockTime: new Date(),
    transactionHash: ""
  };
}
export const CDPLiquidations = {
  typeUrl: "/Switcheo.carbon.cdp.CDPLiquidations",
  encode(message: CDPLiquidations, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.liquidator !== "") {
      writer.uint32(18).string(message.liquidator);
    }
    if (message.debtor !== "") {
      writer.uint32(26).string(message.debtor);
    }
    if (message.collateralDenom !== "") {
      writer.uint32(34).string(message.collateralDenom);
    }
    if (message.collateralAmountLiquidated !== "") {
      writer.uint32(42).string(message.collateralAmountLiquidated);
    }
    if (message.collateralAmountLiquidator !== "") {
      writer.uint32(50).string(message.collateralAmountLiquidator);
    }
    if (message.collateralAmountFee !== "") {
      writer.uint32(58).string(message.collateralAmountFee);
    }
    if (message.liquidationPrice !== "") {
      writer.uint32(66).string(Decimal.fromUserInput(message.liquidationPrice, 18).atomics);
    }
    if (message.marketPrice !== "") {
      writer.uint32(74).string(Decimal.fromUserInput(message.marketPrice, 18).atomics);
    }
    if (message.discount !== "") {
      writer.uint32(82).string(Decimal.fromUserInput(message.discount, 18).atomics);
    }
    if (message.debtDenom !== "") {
      writer.uint32(90).string(message.debtDenom);
    }
    if (message.debtAmount !== "") {
      writer.uint32(98).string(message.debtAmount);
    }
    if (message.blockHeight !== BigInt(0)) {
      writer.uint32(104).int64(message.blockHeight);
    }
    if (message.blockTime !== undefined) {
      Timestamp.encode(toTimestamp(message.blockTime), writer.uint32(114).fork()).ldelim();
    }
    if (message.transactionHash !== "") {
      writer.uint32(122).string(message.transactionHash);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CDPLiquidations {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCDPLiquidations();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.liquidator = reader.string();
          break;
        case 3:
          message.debtor = reader.string();
          break;
        case 4:
          message.collateralDenom = reader.string();
          break;
        case 5:
          message.collateralAmountLiquidated = reader.string();
          break;
        case 6:
          message.collateralAmountLiquidator = reader.string();
          break;
        case 7:
          message.collateralAmountFee = reader.string();
          break;
        case 8:
          message.liquidationPrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 9:
          message.marketPrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 10:
          message.discount = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 11:
          message.debtDenom = reader.string();
          break;
        case 12:
          message.debtAmount = reader.string();
          break;
        case 13:
          message.blockHeight = reader.int64();
          break;
        case 14:
          message.blockTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 15:
          message.transactionHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CDPLiquidations>): CDPLiquidations {
    const message = createBaseCDPLiquidations();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.liquidator = object.liquidator ?? "";
    message.debtor = object.debtor ?? "";
    message.collateralDenom = object.collateralDenom ?? "";
    message.collateralAmountLiquidated = object.collateralAmountLiquidated ?? "";
    message.collateralAmountLiquidator = object.collateralAmountLiquidator ?? "";
    message.collateralAmountFee = object.collateralAmountFee ?? "";
    message.liquidationPrice = object.liquidationPrice ?? "";
    message.marketPrice = object.marketPrice ?? "";
    message.discount = object.discount ?? "";
    message.debtDenom = object.debtDenom ?? "";
    message.debtAmount = object.debtAmount ?? "";
    message.blockHeight = object.blockHeight !== undefined && object.blockHeight !== null ? BigInt(object.blockHeight.toString()) : BigInt(0);
    message.blockTime = object.blockTime ?? undefined;
    message.transactionHash = object.transactionHash ?? "";
    return message;
  },
  fromAmino(object: CDPLiquidationsAmino): CDPLiquidations {
    const message = createBaseCDPLiquidations();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.liquidator !== undefined && object.liquidator !== null) {
      message.liquidator = object.liquidator;
    }
    if (object.debtor !== undefined && object.debtor !== null) {
      message.debtor = object.debtor;
    }
    if (object.collateral_denom !== undefined && object.collateral_denom !== null) {
      message.collateralDenom = object.collateral_denom;
    }
    if (object.collateral_amount_liquidated !== undefined && object.collateral_amount_liquidated !== null) {
      message.collateralAmountLiquidated = object.collateral_amount_liquidated;
    }
    if (object.collateral_amount_liquidator !== undefined && object.collateral_amount_liquidator !== null) {
      message.collateralAmountLiquidator = object.collateral_amount_liquidator;
    }
    if (object.collateral_amount_fee !== undefined && object.collateral_amount_fee !== null) {
      message.collateralAmountFee = object.collateral_amount_fee;
    }
    if (object.liquidation_price !== undefined && object.liquidation_price !== null) {
      message.liquidationPrice = object.liquidation_price;
    }
    if (object.market_price !== undefined && object.market_price !== null) {
      message.marketPrice = object.market_price;
    }
    if (object.discount !== undefined && object.discount !== null) {
      message.discount = object.discount;
    }
    if (object.debt_denom !== undefined && object.debt_denom !== null) {
      message.debtDenom = object.debt_denom;
    }
    if (object.debt_amount !== undefined && object.debt_amount !== null) {
      message.debtAmount = object.debt_amount;
    }
    if (object.block_height !== undefined && object.block_height !== null) {
      message.blockHeight = BigInt(object.block_height);
    }
    if (object.block_time !== undefined && object.block_time !== null) {
      message.blockTime = fromTimestamp(Timestamp.fromAmino(object.block_time));
    }
    if (object.transaction_hash !== undefined && object.transaction_hash !== null) {
      message.transactionHash = object.transaction_hash;
    }
    return message;
  },
  toAmino(message: CDPLiquidations, useInterfaces: boolean = false): CDPLiquidationsAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.liquidator = message.liquidator === "" ? undefined : message.liquidator;
    obj.debtor = message.debtor === "" ? undefined : message.debtor;
    obj.collateral_denom = message.collateralDenom === "" ? undefined : message.collateralDenom;
    obj.collateral_amount_liquidated = message.collateralAmountLiquidated === "" ? undefined : message.collateralAmountLiquidated;
    obj.collateral_amount_liquidator = message.collateralAmountLiquidator === "" ? undefined : message.collateralAmountLiquidator;
    obj.collateral_amount_fee = message.collateralAmountFee === "" ? undefined : message.collateralAmountFee;
    obj.liquidation_price = message.liquidationPrice === "" ? undefined : message.liquidationPrice;
    obj.market_price = message.marketPrice === "" ? undefined : message.marketPrice;
    obj.discount = message.discount === "" ? undefined : message.discount;
    obj.debt_denom = message.debtDenom === "" ? undefined : message.debtDenom;
    obj.debt_amount = message.debtAmount === "" ? undefined : message.debtAmount;
    obj.block_height = message.blockHeight !== BigInt(0) ? message.blockHeight.toString() : undefined;
    obj.block_time = message.blockTime ? Timestamp.toAmino(toTimestamp(message.blockTime)) : undefined;
    obj.transaction_hash = message.transactionHash === "" ? undefined : message.transactionHash;
    return obj;
  },
  fromAminoMsg(object: CDPLiquidationsAminoMsg): CDPLiquidations {
    return CDPLiquidations.fromAmino(object.value);
  },
  fromProtoMsg(message: CDPLiquidationsProtoMsg, useInterfaces: boolean = false): CDPLiquidations {
    return CDPLiquidations.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CDPLiquidations): Uint8Array {
    return CDPLiquidations.encode(message).finish();
  },
  toProtoMsg(message: CDPLiquidations): CDPLiquidationsProtoMsg {
    return {
      typeUrl: "/Switcheo.carbon.cdp.CDPLiquidations",
      value: CDPLiquidations.encode(message).finish()
    };
  }
};