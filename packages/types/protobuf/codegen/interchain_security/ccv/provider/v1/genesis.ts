//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType, ValidatorConsumerPubKey, ValidatorConsumerPubKeyAmino, ValidatorConsumerPubKeySDKType, ValidatorByConsumerAddr, ValidatorByConsumerAddrAmino, ValidatorByConsumerAddrSDKType, ConsumerAddrsToPruneV2, ConsumerAddrsToPruneV2Amino, ConsumerAddrsToPruneV2SDKType, ConsumerPhase } from "./provider";
import { ConsumerGenesisState, ConsumerGenesisStateAmino, ConsumerGenesisStateSDKType } from "../../v1/shared_consumer";
import { ValidatorSetChangePacketData, ValidatorSetChangePacketDataAmino, ValidatorSetChangePacketDataSDKType } from "../../v1/wire";
import { BinaryReader, BinaryWriter } from "../../../../binary";
/** GenesisState defines the CCV provider chain genesis state */
export interface GenesisState {
  /** strictly positive and set to 1 (DefaultValsetUpdateID) for a new chain */
  valsetUpdateId: bigint;
  /** empty for a new chain */
  consumerStates: ConsumerState[];
  /** empty for a new chain */
  valsetUpdateIdToHeight: ValsetUpdateIdToHeight[];
  params: Params | undefined;
  /** empty for a new chain */
  validatorConsumerPubkeys: ValidatorConsumerPubKey[];
  /** empty for a new chain */
  validatorsByConsumerAddr: ValidatorByConsumerAddr[];
  /** empty for a new chain */
  consumerAddrsToPruneV2: ConsumerAddrsToPruneV2[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the CCV provider chain genesis state */
export interface GenesisStateAmino {
  /** strictly positive and set to 1 (DefaultValsetUpdateID) for a new chain */
  valset_update_id?: string;
  /** empty for a new chain */
  consumer_states?: ConsumerStateAmino[];
  /** empty for a new chain */
  valset_update_id_to_height?: ValsetUpdateIdToHeightAmino[];
  params?: ParamsAmino | undefined;
  /** empty for a new chain */
  validator_consumer_pubkeys?: ValidatorConsumerPubKeyAmino[];
  /** empty for a new chain */
  validators_by_consumer_addr?: ValidatorByConsumerAddrAmino[];
  /** empty for a new chain */
  consumer_addrs_to_prune_v2?: ConsumerAddrsToPruneV2Amino[];
}
export interface GenesisStateAminoMsg {
  type: "/interchain_security.ccv.provider.v1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the CCV provider chain genesis state */
export interface GenesisStateSDKType {
  valset_update_id: bigint;
  consumer_states: ConsumerStateSDKType[];
  valset_update_id_to_height: ValsetUpdateIdToHeightSDKType[];
  params: ParamsSDKType | undefined;
  validator_consumer_pubkeys: ValidatorConsumerPubKeySDKType[];
  validators_by_consumer_addr: ValidatorByConsumerAddrSDKType[];
  consumer_addrs_to_prune_v2: ConsumerAddrsToPruneV2SDKType[];
}
/**
 * The provider CCV module's knowledge of consumer state.
 * 
 * Note this type is only used internally to the provider CCV module.
 */
export interface ConsumerState {
  /** ChainID defines the chain ID for the consumer chain */
  chainId: string;
  /** ChannelID defines the IBC channel ID for the consumer chain */
  channelId: string;
  /** ClientID defines the IBC client ID for the consumer chain */
  clientId: string;
  /** InitalHeight defines the initial block height for the consumer chain */
  initialHeight: bigint;
  /** ConsumerGenesis defines the initial consumer chain genesis states */
  consumerGenesis: ConsumerGenesisState | undefined;
  pendingValsetChanges: ValidatorSetChangePacketData[];
  slashDowntimeAck: string[];
  /** the phase of the consumer chain */
  phase: ConsumerPhase;
}
export interface ConsumerStateProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerState";
  value: Uint8Array;
}
/**
 * The provider CCV module's knowledge of consumer state.
 * 
 * Note this type is only used internally to the provider CCV module.
 */
export interface ConsumerStateAmino {
  /** ChainID defines the chain ID for the consumer chain */
  chain_id?: string;
  /** ChannelID defines the IBC channel ID for the consumer chain */
  channel_id?: string;
  /** ClientID defines the IBC client ID for the consumer chain */
  client_id?: string;
  /** InitalHeight defines the initial block height for the consumer chain */
  initial_height?: string;
  /** ConsumerGenesis defines the initial consumer chain genesis states */
  consumer_genesis?: ConsumerGenesisStateAmino | undefined;
  pending_valset_changes?: ValidatorSetChangePacketDataAmino[];
  slash_downtime_ack?: string[];
  /** the phase of the consumer chain */
  phase?: ConsumerPhase;
}
export interface ConsumerStateAminoMsg {
  type: "/interchain_security.ccv.provider.v1.ConsumerState";
  value: ConsumerStateAmino;
}
/**
 * The provider CCV module's knowledge of consumer state.
 * 
 * Note this type is only used internally to the provider CCV module.
 */
export interface ConsumerStateSDKType {
  chain_id: string;
  channel_id: string;
  client_id: string;
  initial_height: bigint;
  consumer_genesis: ConsumerGenesisStateSDKType | undefined;
  pending_valset_changes: ValidatorSetChangePacketDataSDKType[];
  slash_downtime_ack: string[];
  phase: ConsumerPhase;
}
/**
 * ValsetUpdateIdToHeight defines the genesis information for the mapping
 * of each valset update id to a block height
 */
export interface ValsetUpdateIdToHeight {
  valsetUpdateId: bigint;
  height: bigint;
}
export interface ValsetUpdateIdToHeightProtoMsg {
  typeUrl: "/interchain_security.ccv.provider.v1.ValsetUpdateIdToHeight";
  value: Uint8Array;
}
/**
 * ValsetUpdateIdToHeight defines the genesis information for the mapping
 * of each valset update id to a block height
 */
export interface ValsetUpdateIdToHeightAmino {
  valset_update_id?: string;
  height?: string;
}
export interface ValsetUpdateIdToHeightAminoMsg {
  type: "/interchain_security.ccv.provider.v1.ValsetUpdateIdToHeight";
  value: ValsetUpdateIdToHeightAmino;
}
/**
 * ValsetUpdateIdToHeight defines the genesis information for the mapping
 * of each valset update id to a block height
 */
export interface ValsetUpdateIdToHeightSDKType {
  valset_update_id: bigint;
  height: bigint;
}
function createBaseGenesisState(): GenesisState {
  return {
    valsetUpdateId: BigInt(0),
    consumerStates: [],
    valsetUpdateIdToHeight: [],
    params: Params.fromPartial({}),
    validatorConsumerPubkeys: [],
    validatorsByConsumerAddr: [],
    consumerAddrsToPruneV2: []
  };
}
export const GenesisState = {
  typeUrl: "/interchain_security.ccv.provider.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.valsetUpdateId !== BigInt(0)) {
      writer.uint32(8).uint64(message.valsetUpdateId);
    }
    for (const v of message.consumerStates) {
      ConsumerState.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.valsetUpdateIdToHeight) {
      ValsetUpdateIdToHeight.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.validatorConsumerPubkeys) {
      ValidatorConsumerPubKey.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.validatorsByConsumerAddr) {
      ValidatorByConsumerAddr.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.consumerAddrsToPruneV2) {
      ConsumerAddrsToPruneV2.encode(v!, writer.uint32(114).fork()).ldelim();
    }
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
          message.valsetUpdateId = reader.uint64();
          break;
        case 2:
          message.consumerStates.push(ConsumerState.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.valsetUpdateIdToHeight.push(ValsetUpdateIdToHeight.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 8:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 9:
          message.validatorConsumerPubkeys.push(ValidatorConsumerPubKey.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 10:
          message.validatorsByConsumerAddr.push(ValidatorByConsumerAddr.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 14:
          message.consumerAddrsToPruneV2.push(ConsumerAddrsToPruneV2.decode(reader, reader.uint32(), useInterfaces));
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
    message.valsetUpdateId = object.valsetUpdateId !== undefined && object.valsetUpdateId !== null ? BigInt(object.valsetUpdateId.toString()) : BigInt(0);
    message.consumerStates = object.consumerStates?.map(e => ConsumerState.fromPartial(e)) || [];
    message.valsetUpdateIdToHeight = object.valsetUpdateIdToHeight?.map(e => ValsetUpdateIdToHeight.fromPartial(e)) || [];
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.validatorConsumerPubkeys = object.validatorConsumerPubkeys?.map(e => ValidatorConsumerPubKey.fromPartial(e)) || [];
    message.validatorsByConsumerAddr = object.validatorsByConsumerAddr?.map(e => ValidatorByConsumerAddr.fromPartial(e)) || [];
    message.consumerAddrsToPruneV2 = object.consumerAddrsToPruneV2?.map(e => ConsumerAddrsToPruneV2.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.valset_update_id !== undefined && object.valset_update_id !== null) {
      message.valsetUpdateId = BigInt(object.valset_update_id);
    }
    message.consumerStates = object.consumer_states?.map(e => ConsumerState.fromAmino(e)) || [];
    message.valsetUpdateIdToHeight = object.valset_update_id_to_height?.map(e => ValsetUpdateIdToHeight.fromAmino(e)) || [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.validatorConsumerPubkeys = object.validator_consumer_pubkeys?.map(e => ValidatorConsumerPubKey.fromAmino(e)) || [];
    message.validatorsByConsumerAddr = object.validators_by_consumer_addr?.map(e => ValidatorByConsumerAddr.fromAmino(e)) || [];
    message.consumerAddrsToPruneV2 = object.consumer_addrs_to_prune_v2?.map(e => ConsumerAddrsToPruneV2.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.valset_update_id = message.valsetUpdateId !== BigInt(0) ? message.valsetUpdateId.toString() : undefined;
    if (message.consumerStates) {
      obj.consumer_states = message.consumerStates.map(e => e ? ConsumerState.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.consumer_states = message.consumerStates;
    }
    if (message.valsetUpdateIdToHeight) {
      obj.valset_update_id_to_height = message.valsetUpdateIdToHeight.map(e => e ? ValsetUpdateIdToHeight.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.valset_update_id_to_height = message.valsetUpdateIdToHeight;
    }
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    if (message.validatorConsumerPubkeys) {
      obj.validator_consumer_pubkeys = message.validatorConsumerPubkeys.map(e => e ? ValidatorConsumerPubKey.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.validator_consumer_pubkeys = message.validatorConsumerPubkeys;
    }
    if (message.validatorsByConsumerAddr) {
      obj.validators_by_consumer_addr = message.validatorsByConsumerAddr.map(e => e ? ValidatorByConsumerAddr.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.validators_by_consumer_addr = message.validatorsByConsumerAddr;
    }
    if (message.consumerAddrsToPruneV2) {
      obj.consumer_addrs_to_prune_v2 = message.consumerAddrsToPruneV2.map(e => e ? ConsumerAddrsToPruneV2.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.consumer_addrs_to_prune_v2 = message.consumerAddrsToPruneV2;
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
      typeUrl: "/interchain_security.ccv.provider.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBaseConsumerState(): ConsumerState {
  return {
    chainId: "",
    channelId: "",
    clientId: "",
    initialHeight: BigInt(0),
    consumerGenesis: ConsumerGenesisState.fromPartial({}),
    pendingValsetChanges: [],
    slashDowntimeAck: [],
    phase: 0
  };
}
export const ConsumerState = {
  typeUrl: "/interchain_security.ccv.provider.v1.ConsumerState",
  encode(message: ConsumerState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.clientId !== "") {
      writer.uint32(26).string(message.clientId);
    }
    if (message.initialHeight !== BigInt(0)) {
      writer.uint32(32).uint64(message.initialHeight);
    }
    if (message.consumerGenesis !== undefined) {
      ConsumerGenesisState.encode(message.consumerGenesis, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.pendingValsetChanges) {
      ValidatorSetChangePacketData.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.slashDowntimeAck) {
      writer.uint32(58).string(v!);
    }
    if (message.phase !== 0) {
      writer.uint32(72).int32(message.phase);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ConsumerState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        case 3:
          message.clientId = reader.string();
          break;
        case 4:
          message.initialHeight = reader.uint64();
          break;
        case 5:
          message.consumerGenesis = ConsumerGenesisState.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.pendingValsetChanges.push(ValidatorSetChangePacketData.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 7:
          message.slashDowntimeAck.push(reader.string());
          break;
        case 9:
          message.phase = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConsumerState>): ConsumerState {
    const message = createBaseConsumerState();
    message.chainId = object.chainId ?? "";
    message.channelId = object.channelId ?? "";
    message.clientId = object.clientId ?? "";
    message.initialHeight = object.initialHeight !== undefined && object.initialHeight !== null ? BigInt(object.initialHeight.toString()) : BigInt(0);
    message.consumerGenesis = object.consumerGenesis !== undefined && object.consumerGenesis !== null ? ConsumerGenesisState.fromPartial(object.consumerGenesis) : undefined;
    message.pendingValsetChanges = object.pendingValsetChanges?.map(e => ValidatorSetChangePacketData.fromPartial(e)) || [];
    message.slashDowntimeAck = object.slashDowntimeAck?.map(e => e) || [];
    message.phase = object.phase ?? 0;
    return message;
  },
  fromAmino(object: ConsumerStateAmino): ConsumerState {
    const message = createBaseConsumerState();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channelId = object.channel_id;
    }
    if (object.client_id !== undefined && object.client_id !== null) {
      message.clientId = object.client_id;
    }
    if (object.initial_height !== undefined && object.initial_height !== null) {
      message.initialHeight = BigInt(object.initial_height);
    }
    if (object.consumer_genesis !== undefined && object.consumer_genesis !== null) {
      message.consumerGenesis = ConsumerGenesisState.fromAmino(object.consumer_genesis);
    }
    message.pendingValsetChanges = object.pending_valset_changes?.map(e => ValidatorSetChangePacketData.fromAmino(e)) || [];
    message.slashDowntimeAck = object.slash_downtime_ack?.map(e => e) || [];
    if (object.phase !== undefined && object.phase !== null) {
      message.phase = object.phase;
    }
    return message;
  },
  toAmino(message: ConsumerState, useInterfaces: boolean = false): ConsumerStateAmino {
    const obj: any = {};
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.channel_id = message.channelId === "" ? undefined : message.channelId;
    obj.client_id = message.clientId === "" ? undefined : message.clientId;
    obj.initial_height = message.initialHeight !== BigInt(0) ? message.initialHeight.toString() : undefined;
    obj.consumer_genesis = message.consumerGenesis ? ConsumerGenesisState.toAmino(message.consumerGenesis, useInterfaces) : undefined;
    if (message.pendingValsetChanges) {
      obj.pending_valset_changes = message.pendingValsetChanges.map(e => e ? ValidatorSetChangePacketData.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pending_valset_changes = message.pendingValsetChanges;
    }
    if (message.slashDowntimeAck) {
      obj.slash_downtime_ack = message.slashDowntimeAck.map(e => e);
    } else {
      obj.slash_downtime_ack = message.slashDowntimeAck;
    }
    obj.phase = message.phase === 0 ? undefined : message.phase;
    return obj;
  },
  fromAminoMsg(object: ConsumerStateAminoMsg): ConsumerState {
    return ConsumerState.fromAmino(object.value);
  },
  fromProtoMsg(message: ConsumerStateProtoMsg, useInterfaces: boolean = false): ConsumerState {
    return ConsumerState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ConsumerState): Uint8Array {
    return ConsumerState.encode(message).finish();
  },
  toProtoMsg(message: ConsumerState): ConsumerStateProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ConsumerState",
      value: ConsumerState.encode(message).finish()
    };
  }
};
function createBaseValsetUpdateIdToHeight(): ValsetUpdateIdToHeight {
  return {
    valsetUpdateId: BigInt(0),
    height: BigInt(0)
  };
}
export const ValsetUpdateIdToHeight = {
  typeUrl: "/interchain_security.ccv.provider.v1.ValsetUpdateIdToHeight",
  encode(message: ValsetUpdateIdToHeight, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.valsetUpdateId !== BigInt(0)) {
      writer.uint32(8).uint64(message.valsetUpdateId);
    }
    if (message.height !== BigInt(0)) {
      writer.uint32(16).uint64(message.height);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ValsetUpdateIdToHeight {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValsetUpdateIdToHeight();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.valsetUpdateId = reader.uint64();
          break;
        case 2:
          message.height = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ValsetUpdateIdToHeight>): ValsetUpdateIdToHeight {
    const message = createBaseValsetUpdateIdToHeight();
    message.valsetUpdateId = object.valsetUpdateId !== undefined && object.valsetUpdateId !== null ? BigInt(object.valsetUpdateId.toString()) : BigInt(0);
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ValsetUpdateIdToHeightAmino): ValsetUpdateIdToHeight {
    const message = createBaseValsetUpdateIdToHeight();
    if (object.valset_update_id !== undefined && object.valset_update_id !== null) {
      message.valsetUpdateId = BigInt(object.valset_update_id);
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height);
    }
    return message;
  },
  toAmino(message: ValsetUpdateIdToHeight, useInterfaces: boolean = false): ValsetUpdateIdToHeightAmino {
    const obj: any = {};
    obj.valset_update_id = message.valsetUpdateId !== BigInt(0) ? message.valsetUpdateId.toString() : undefined;
    obj.height = message.height !== BigInt(0) ? message.height.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ValsetUpdateIdToHeightAminoMsg): ValsetUpdateIdToHeight {
    return ValsetUpdateIdToHeight.fromAmino(object.value);
  },
  fromProtoMsg(message: ValsetUpdateIdToHeightProtoMsg, useInterfaces: boolean = false): ValsetUpdateIdToHeight {
    return ValsetUpdateIdToHeight.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ValsetUpdateIdToHeight): Uint8Array {
    return ValsetUpdateIdToHeight.encode(message).finish();
  },
  toProtoMsg(message: ValsetUpdateIdToHeight): ValsetUpdateIdToHeightProtoMsg {
    return {
      typeUrl: "/interchain_security.ccv.provider.v1.ValsetUpdateIdToHeight",
      value: ValsetUpdateIdToHeight.encode(message).finish()
    };
  }
};