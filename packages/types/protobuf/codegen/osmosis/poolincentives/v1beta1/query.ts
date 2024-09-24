//@ts-nocheck
import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
import { DistrInfo, DistrInfoAmino, DistrInfoSDKType, Params, ParamsAmino, ParamsSDKType } from "./incentives";
import { Gauge, GaugeAmino, GaugeSDKType } from "../../incentives/gauge";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface QueryGaugeIdsRequest {
  poolId: bigint;
}
export interface QueryGaugeIdsRequestProtoMsg {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryGaugeIdsRequest";
  value: Uint8Array;
}
export interface QueryGaugeIdsRequestAmino {
  pool_id?: string;
}
export interface QueryGaugeIdsRequestAminoMsg {
  type: "osmosis/poolincentives/query-gauge-ids-request";
  value: QueryGaugeIdsRequestAmino;
}
export interface QueryGaugeIdsRequestSDKType {
  pool_id: bigint;
}
export interface QueryGaugeIdsResponse {
  gaugeIdsWithDuration: QueryGaugeIdsResponse_GaugeIdWithDuration[];
}
export interface QueryGaugeIdsResponseProtoMsg {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryGaugeIdsResponse";
  value: Uint8Array;
}
export interface QueryGaugeIdsResponseAmino {
  gauge_ids_with_duration?: QueryGaugeIdsResponse_GaugeIdWithDurationAmino[];
}
export interface QueryGaugeIdsResponseAminoMsg {
  type: "osmosis/poolincentives/query-gauge-ids-response";
  value: QueryGaugeIdsResponseAmino;
}
export interface QueryGaugeIdsResponseSDKType {
  gauge_ids_with_duration: QueryGaugeIdsResponse_GaugeIdWithDurationSDKType[];
}
export interface QueryGaugeIdsResponse_GaugeIdWithDuration {
  gaugeId: bigint;
  duration: Duration | undefined;
  gaugeIncentivePercentage: string;
}
export interface QueryGaugeIdsResponse_GaugeIdWithDurationProtoMsg {
  typeUrl: "/osmosis.poolincentives.v1beta1.GaugeIdWithDuration";
  value: Uint8Array;
}
export interface QueryGaugeIdsResponse_GaugeIdWithDurationAmino {
  gauge_id?: string;
  duration?: DurationAmino | undefined;
  gauge_incentive_percentage?: string;
}
export interface QueryGaugeIdsResponse_GaugeIdWithDurationAminoMsg {
  type: "osmosis/poolincentives/gauge-id-with-duration";
  value: QueryGaugeIdsResponse_GaugeIdWithDurationAmino;
}
export interface QueryGaugeIdsResponse_GaugeIdWithDurationSDKType {
  gauge_id: bigint;
  duration: DurationSDKType | undefined;
  gauge_incentive_percentage: string;
}
export interface QueryDistrInfoRequest {}
export interface QueryDistrInfoRequestProtoMsg {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryDistrInfoRequest";
  value: Uint8Array;
}
export interface QueryDistrInfoRequestAmino {}
export interface QueryDistrInfoRequestAminoMsg {
  type: "osmosis/poolincentives/query-distr-info-request";
  value: QueryDistrInfoRequestAmino;
}
export interface QueryDistrInfoRequestSDKType {}
export interface QueryDistrInfoResponse {
  distrInfo: DistrInfo | undefined;
}
export interface QueryDistrInfoResponseProtoMsg {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryDistrInfoResponse";
  value: Uint8Array;
}
export interface QueryDistrInfoResponseAmino {
  distr_info?: DistrInfoAmino | undefined;
}
export interface QueryDistrInfoResponseAminoMsg {
  type: "osmosis/poolincentives/query-distr-info-response";
  value: QueryDistrInfoResponseAmino;
}
export interface QueryDistrInfoResponseSDKType {
  distr_info: DistrInfoSDKType | undefined;
}
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryParamsRequest";
  value: Uint8Array;
}
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "osmosis/poolincentives/query-params-request";
  value: QueryParamsRequestAmino;
}
export interface QueryParamsRequestSDKType {}
export interface QueryParamsResponse {
  params: Params | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryParamsResponse";
  value: Uint8Array;
}
export interface QueryParamsResponseAmino {
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "osmosis/poolincentives/query-params-response";
  value: QueryParamsResponseAmino;
}
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
export interface QueryLockableDurationsRequest {}
export interface QueryLockableDurationsRequestProtoMsg {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryLockableDurationsRequest";
  value: Uint8Array;
}
export interface QueryLockableDurationsRequestAmino {}
export interface QueryLockableDurationsRequestAminoMsg {
  type: "osmosis/poolincentives/query-lockable-durations-request";
  value: QueryLockableDurationsRequestAmino;
}
export interface QueryLockableDurationsRequestSDKType {}
export interface QueryLockableDurationsResponse {
  lockableDurations: Duration[];
}
export interface QueryLockableDurationsResponseProtoMsg {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryLockableDurationsResponse";
  value: Uint8Array;
}
export interface QueryLockableDurationsResponseAmino {
  lockable_durations?: DurationAmino[];
}
export interface QueryLockableDurationsResponseAminoMsg {
  type: "osmosis/poolincentives/query-lockable-durations-response";
  value: QueryLockableDurationsResponseAmino;
}
export interface QueryLockableDurationsResponseSDKType {
  lockable_durations: DurationSDKType[];
}
export interface QueryIncentivizedPoolsRequest {}
export interface QueryIncentivizedPoolsRequestProtoMsg {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryIncentivizedPoolsRequest";
  value: Uint8Array;
}
export interface QueryIncentivizedPoolsRequestAmino {}
export interface QueryIncentivizedPoolsRequestAminoMsg {
  type: "osmosis/poolincentives/query-incentivized-pools-request";
  value: QueryIncentivizedPoolsRequestAmino;
}
export interface QueryIncentivizedPoolsRequestSDKType {}
export interface IncentivizedPool {
  poolId: bigint;
  lockableDuration: Duration | undefined;
  gaugeId: bigint;
}
export interface IncentivizedPoolProtoMsg {
  typeUrl: "/osmosis.poolincentives.v1beta1.IncentivizedPool";
  value: Uint8Array;
}
export interface IncentivizedPoolAmino {
  pool_id?: string;
  lockable_duration?: DurationAmino | undefined;
  gauge_id?: string;
}
export interface IncentivizedPoolAminoMsg {
  type: "osmosis/poolincentives/incentivized-pool";
  value: IncentivizedPoolAmino;
}
export interface IncentivizedPoolSDKType {
  pool_id: bigint;
  lockable_duration: DurationSDKType | undefined;
  gauge_id: bigint;
}
export interface QueryIncentivizedPoolsResponse {
  incentivizedPools: IncentivizedPool[];
}
export interface QueryIncentivizedPoolsResponseProtoMsg {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryIncentivizedPoolsResponse";
  value: Uint8Array;
}
export interface QueryIncentivizedPoolsResponseAmino {
  incentivized_pools?: IncentivizedPoolAmino[];
}
export interface QueryIncentivizedPoolsResponseAminoMsg {
  type: "osmosis/poolincentives/query-incentivized-pools-response";
  value: QueryIncentivizedPoolsResponseAmino;
}
export interface QueryIncentivizedPoolsResponseSDKType {
  incentivized_pools: IncentivizedPoolSDKType[];
}
export interface QueryExternalIncentiveGaugesRequest {}
export interface QueryExternalIncentiveGaugesRequestProtoMsg {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryExternalIncentiveGaugesRequest";
  value: Uint8Array;
}
export interface QueryExternalIncentiveGaugesRequestAmino {}
export interface QueryExternalIncentiveGaugesRequestAminoMsg {
  type: "osmosis/poolincentives/query-external-incentive-gauges-request";
  value: QueryExternalIncentiveGaugesRequestAmino;
}
export interface QueryExternalIncentiveGaugesRequestSDKType {}
export interface QueryExternalIncentiveGaugesResponse {
  data: Gauge[];
}
export interface QueryExternalIncentiveGaugesResponseProtoMsg {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryExternalIncentiveGaugesResponse";
  value: Uint8Array;
}
export interface QueryExternalIncentiveGaugesResponseAmino {
  data?: GaugeAmino[];
}
export interface QueryExternalIncentiveGaugesResponseAminoMsg {
  type: "osmosis/poolincentives/query-external-incentive-gauges-response";
  value: QueryExternalIncentiveGaugesResponseAmino;
}
export interface QueryExternalIncentiveGaugesResponseSDKType {
  data: GaugeSDKType[];
}
function createBaseQueryGaugeIdsRequest(): QueryGaugeIdsRequest {
  return {
    poolId: BigInt(0)
  };
}
export const QueryGaugeIdsRequest = {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryGaugeIdsRequest",
  encode(message: QueryGaugeIdsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGaugeIdsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGaugeIdsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGaugeIdsRequest>): QueryGaugeIdsRequest {
    const message = createBaseQueryGaugeIdsRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGaugeIdsRequestAmino): QueryGaugeIdsRequest {
    const message = createBaseQueryGaugeIdsRequest();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    return message;
  },
  toAmino(message: QueryGaugeIdsRequest, useInterfaces: boolean = false): QueryGaugeIdsRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGaugeIdsRequestAminoMsg): QueryGaugeIdsRequest {
    return QueryGaugeIdsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGaugeIdsRequest, useInterfaces: boolean = false): QueryGaugeIdsRequestAminoMsg {
    return {
      type: "osmosis/poolincentives/query-gauge-ids-request",
      value: QueryGaugeIdsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGaugeIdsRequestProtoMsg, useInterfaces: boolean = false): QueryGaugeIdsRequest {
    return QueryGaugeIdsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGaugeIdsRequest): Uint8Array {
    return QueryGaugeIdsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGaugeIdsRequest): QueryGaugeIdsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolincentives.v1beta1.QueryGaugeIdsRequest",
      value: QueryGaugeIdsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGaugeIdsResponse(): QueryGaugeIdsResponse {
  return {
    gaugeIdsWithDuration: []
  };
}
export const QueryGaugeIdsResponse = {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryGaugeIdsResponse",
  encode(message: QueryGaugeIdsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.gaugeIdsWithDuration) {
      QueryGaugeIdsResponse_GaugeIdWithDuration.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGaugeIdsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGaugeIdsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gaugeIdsWithDuration.push(QueryGaugeIdsResponse_GaugeIdWithDuration.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGaugeIdsResponse>): QueryGaugeIdsResponse {
    const message = createBaseQueryGaugeIdsResponse();
    message.gaugeIdsWithDuration = object.gaugeIdsWithDuration?.map(e => QueryGaugeIdsResponse_GaugeIdWithDuration.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryGaugeIdsResponseAmino): QueryGaugeIdsResponse {
    const message = createBaseQueryGaugeIdsResponse();
    message.gaugeIdsWithDuration = object.gauge_ids_with_duration?.map(e => QueryGaugeIdsResponse_GaugeIdWithDuration.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryGaugeIdsResponse, useInterfaces: boolean = false): QueryGaugeIdsResponseAmino {
    const obj: any = {};
    if (message.gaugeIdsWithDuration) {
      obj.gauge_ids_with_duration = message.gaugeIdsWithDuration.map(e => e ? QueryGaugeIdsResponse_GaugeIdWithDuration.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.gauge_ids_with_duration = message.gaugeIdsWithDuration;
    }
    return obj;
  },
  fromAminoMsg(object: QueryGaugeIdsResponseAminoMsg): QueryGaugeIdsResponse {
    return QueryGaugeIdsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGaugeIdsResponse, useInterfaces: boolean = false): QueryGaugeIdsResponseAminoMsg {
    return {
      type: "osmosis/poolincentives/query-gauge-ids-response",
      value: QueryGaugeIdsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGaugeIdsResponseProtoMsg, useInterfaces: boolean = false): QueryGaugeIdsResponse {
    return QueryGaugeIdsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGaugeIdsResponse): Uint8Array {
    return QueryGaugeIdsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGaugeIdsResponse): QueryGaugeIdsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolincentives.v1beta1.QueryGaugeIdsResponse",
      value: QueryGaugeIdsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGaugeIdsResponse_GaugeIdWithDuration(): QueryGaugeIdsResponse_GaugeIdWithDuration {
  return {
    gaugeId: BigInt(0),
    duration: Duration.fromPartial({}),
    gaugeIncentivePercentage: ""
  };
}
export const QueryGaugeIdsResponse_GaugeIdWithDuration = {
  typeUrl: "/osmosis.poolincentives.v1beta1.GaugeIdWithDuration",
  encode(message: QueryGaugeIdsResponse_GaugeIdWithDuration, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.gaugeId !== BigInt(0)) {
      writer.uint32(8).uint64(message.gaugeId);
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(18).fork()).ldelim();
    }
    if (message.gaugeIncentivePercentage !== "") {
      writer.uint32(26).string(message.gaugeIncentivePercentage);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryGaugeIdsResponse_GaugeIdWithDuration {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGaugeIdsResponse_GaugeIdWithDuration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gaugeId = reader.uint64();
          break;
        case 2:
          message.duration = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.gaugeIncentivePercentage = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGaugeIdsResponse_GaugeIdWithDuration>): QueryGaugeIdsResponse_GaugeIdWithDuration {
    const message = createBaseQueryGaugeIdsResponse_GaugeIdWithDuration();
    message.gaugeId = object.gaugeId !== undefined && object.gaugeId !== null ? BigInt(object.gaugeId.toString()) : BigInt(0);
    message.duration = object.duration !== undefined && object.duration !== null ? Duration.fromPartial(object.duration) : undefined;
    message.gaugeIncentivePercentage = object.gaugeIncentivePercentage ?? "";
    return message;
  },
  fromAmino(object: QueryGaugeIdsResponse_GaugeIdWithDurationAmino): QueryGaugeIdsResponse_GaugeIdWithDuration {
    const message = createBaseQueryGaugeIdsResponse_GaugeIdWithDuration();
    if (object.gauge_id !== undefined && object.gauge_id !== null) {
      message.gaugeId = BigInt(object.gauge_id);
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Duration.fromAmino(object.duration);
    }
    if (object.gauge_incentive_percentage !== undefined && object.gauge_incentive_percentage !== null) {
      message.gaugeIncentivePercentage = object.gauge_incentive_percentage;
    }
    return message;
  },
  toAmino(message: QueryGaugeIdsResponse_GaugeIdWithDuration, useInterfaces: boolean = false): QueryGaugeIdsResponse_GaugeIdWithDurationAmino {
    const obj: any = {};
    obj.gauge_id = message.gaugeId !== BigInt(0) ? message.gaugeId.toString() : undefined;
    obj.duration = message.duration ? Duration.toAmino(message.duration, useInterfaces) : undefined;
    obj.gauge_incentive_percentage = message.gaugeIncentivePercentage === "" ? undefined : message.gaugeIncentivePercentage;
    return obj;
  },
  fromAminoMsg(object: QueryGaugeIdsResponse_GaugeIdWithDurationAminoMsg): QueryGaugeIdsResponse_GaugeIdWithDuration {
    return QueryGaugeIdsResponse_GaugeIdWithDuration.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGaugeIdsResponse_GaugeIdWithDuration, useInterfaces: boolean = false): QueryGaugeIdsResponse_GaugeIdWithDurationAminoMsg {
    return {
      type: "osmosis/poolincentives/gauge-id-with-duration",
      value: QueryGaugeIdsResponse_GaugeIdWithDuration.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryGaugeIdsResponse_GaugeIdWithDurationProtoMsg, useInterfaces: boolean = false): QueryGaugeIdsResponse_GaugeIdWithDuration {
    return QueryGaugeIdsResponse_GaugeIdWithDuration.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryGaugeIdsResponse_GaugeIdWithDuration): Uint8Array {
    return QueryGaugeIdsResponse_GaugeIdWithDuration.encode(message).finish();
  },
  toProtoMsg(message: QueryGaugeIdsResponse_GaugeIdWithDuration): QueryGaugeIdsResponse_GaugeIdWithDurationProtoMsg {
    return {
      typeUrl: "/osmosis.poolincentives.v1beta1.GaugeIdWithDuration",
      value: QueryGaugeIdsResponse_GaugeIdWithDuration.encode(message).finish()
    };
  }
};
function createBaseQueryDistrInfoRequest(): QueryDistrInfoRequest {
  return {};
}
export const QueryDistrInfoRequest = {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryDistrInfoRequest",
  encode(_: QueryDistrInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryDistrInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDistrInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryDistrInfoRequest>): QueryDistrInfoRequest {
    const message = createBaseQueryDistrInfoRequest();
    return message;
  },
  fromAmino(_: QueryDistrInfoRequestAmino): QueryDistrInfoRequest {
    const message = createBaseQueryDistrInfoRequest();
    return message;
  },
  toAmino(_: QueryDistrInfoRequest, useInterfaces: boolean = false): QueryDistrInfoRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryDistrInfoRequestAminoMsg): QueryDistrInfoRequest {
    return QueryDistrInfoRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryDistrInfoRequest, useInterfaces: boolean = false): QueryDistrInfoRequestAminoMsg {
    return {
      type: "osmosis/poolincentives/query-distr-info-request",
      value: QueryDistrInfoRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryDistrInfoRequestProtoMsg, useInterfaces: boolean = false): QueryDistrInfoRequest {
    return QueryDistrInfoRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryDistrInfoRequest): Uint8Array {
    return QueryDistrInfoRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryDistrInfoRequest): QueryDistrInfoRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolincentives.v1beta1.QueryDistrInfoRequest",
      value: QueryDistrInfoRequest.encode(message).finish()
    };
  }
};
function createBaseQueryDistrInfoResponse(): QueryDistrInfoResponse {
  return {
    distrInfo: DistrInfo.fromPartial({})
  };
}
export const QueryDistrInfoResponse = {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryDistrInfoResponse",
  encode(message: QueryDistrInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.distrInfo !== undefined) {
      DistrInfo.encode(message.distrInfo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryDistrInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDistrInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.distrInfo = DistrInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryDistrInfoResponse>): QueryDistrInfoResponse {
    const message = createBaseQueryDistrInfoResponse();
    message.distrInfo = object.distrInfo !== undefined && object.distrInfo !== null ? DistrInfo.fromPartial(object.distrInfo) : undefined;
    return message;
  },
  fromAmino(object: QueryDistrInfoResponseAmino): QueryDistrInfoResponse {
    const message = createBaseQueryDistrInfoResponse();
    if (object.distr_info !== undefined && object.distr_info !== null) {
      message.distrInfo = DistrInfo.fromAmino(object.distr_info);
    }
    return message;
  },
  toAmino(message: QueryDistrInfoResponse, useInterfaces: boolean = false): QueryDistrInfoResponseAmino {
    const obj: any = {};
    obj.distr_info = message.distrInfo ? DistrInfo.toAmino(message.distrInfo, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryDistrInfoResponseAminoMsg): QueryDistrInfoResponse {
    return QueryDistrInfoResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryDistrInfoResponse, useInterfaces: boolean = false): QueryDistrInfoResponseAminoMsg {
    return {
      type: "osmosis/poolincentives/query-distr-info-response",
      value: QueryDistrInfoResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryDistrInfoResponseProtoMsg, useInterfaces: boolean = false): QueryDistrInfoResponse {
    return QueryDistrInfoResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryDistrInfoResponse): Uint8Array {
    return QueryDistrInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryDistrInfoResponse): QueryDistrInfoResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolincentives.v1beta1.QueryDistrInfoResponse",
      value: QueryDistrInfoResponse.encode(message).finish()
    };
  }
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest, useInterfaces: boolean = false): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryParamsRequest, useInterfaces: boolean = false): QueryParamsRequestAminoMsg {
    return {
      type: "osmosis/poolincentives/query-params-request",
      value: QueryParamsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg, useInterfaces: boolean = false): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolincentives.v1beta1.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse, useInterfaces: boolean = false): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryParamsResponse, useInterfaces: boolean = false): QueryParamsResponseAminoMsg {
    return {
      type: "osmosis/poolincentives/query-params-response",
      value: QueryParamsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg, useInterfaces: boolean = false): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolincentives.v1beta1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryLockableDurationsRequest(): QueryLockableDurationsRequest {
  return {};
}
export const QueryLockableDurationsRequest = {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryLockableDurationsRequest",
  encode(_: QueryLockableDurationsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryLockableDurationsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLockableDurationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryLockableDurationsRequest>): QueryLockableDurationsRequest {
    const message = createBaseQueryLockableDurationsRequest();
    return message;
  },
  fromAmino(_: QueryLockableDurationsRequestAmino): QueryLockableDurationsRequest {
    const message = createBaseQueryLockableDurationsRequest();
    return message;
  },
  toAmino(_: QueryLockableDurationsRequest, useInterfaces: boolean = false): QueryLockableDurationsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryLockableDurationsRequestAminoMsg): QueryLockableDurationsRequest {
    return QueryLockableDurationsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryLockableDurationsRequest, useInterfaces: boolean = false): QueryLockableDurationsRequestAminoMsg {
    return {
      type: "osmosis/poolincentives/query-lockable-durations-request",
      value: QueryLockableDurationsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryLockableDurationsRequestProtoMsg, useInterfaces: boolean = false): QueryLockableDurationsRequest {
    return QueryLockableDurationsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryLockableDurationsRequest): Uint8Array {
    return QueryLockableDurationsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryLockableDurationsRequest): QueryLockableDurationsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolincentives.v1beta1.QueryLockableDurationsRequest",
      value: QueryLockableDurationsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryLockableDurationsResponse(): QueryLockableDurationsResponse {
  return {
    lockableDurations: []
  };
}
export const QueryLockableDurationsResponse = {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryLockableDurationsResponse",
  encode(message: QueryLockableDurationsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.lockableDurations) {
      Duration.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryLockableDurationsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLockableDurationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lockableDurations.push(Duration.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryLockableDurationsResponse>): QueryLockableDurationsResponse {
    const message = createBaseQueryLockableDurationsResponse();
    message.lockableDurations = object.lockableDurations?.map(e => Duration.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryLockableDurationsResponseAmino): QueryLockableDurationsResponse {
    const message = createBaseQueryLockableDurationsResponse();
    message.lockableDurations = object.lockable_durations?.map(e => Duration.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryLockableDurationsResponse, useInterfaces: boolean = false): QueryLockableDurationsResponseAmino {
    const obj: any = {};
    if (message.lockableDurations) {
      obj.lockable_durations = message.lockableDurations.map(e => e ? Duration.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.lockable_durations = message.lockableDurations;
    }
    return obj;
  },
  fromAminoMsg(object: QueryLockableDurationsResponseAminoMsg): QueryLockableDurationsResponse {
    return QueryLockableDurationsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryLockableDurationsResponse, useInterfaces: boolean = false): QueryLockableDurationsResponseAminoMsg {
    return {
      type: "osmosis/poolincentives/query-lockable-durations-response",
      value: QueryLockableDurationsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryLockableDurationsResponseProtoMsg, useInterfaces: boolean = false): QueryLockableDurationsResponse {
    return QueryLockableDurationsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryLockableDurationsResponse): Uint8Array {
    return QueryLockableDurationsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryLockableDurationsResponse): QueryLockableDurationsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolincentives.v1beta1.QueryLockableDurationsResponse",
      value: QueryLockableDurationsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryIncentivizedPoolsRequest(): QueryIncentivizedPoolsRequest {
  return {};
}
export const QueryIncentivizedPoolsRequest = {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryIncentivizedPoolsRequest",
  encode(_: QueryIncentivizedPoolsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryIncentivizedPoolsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncentivizedPoolsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryIncentivizedPoolsRequest>): QueryIncentivizedPoolsRequest {
    const message = createBaseQueryIncentivizedPoolsRequest();
    return message;
  },
  fromAmino(_: QueryIncentivizedPoolsRequestAmino): QueryIncentivizedPoolsRequest {
    const message = createBaseQueryIncentivizedPoolsRequest();
    return message;
  },
  toAmino(_: QueryIncentivizedPoolsRequest, useInterfaces: boolean = false): QueryIncentivizedPoolsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryIncentivizedPoolsRequestAminoMsg): QueryIncentivizedPoolsRequest {
    return QueryIncentivizedPoolsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryIncentivizedPoolsRequest, useInterfaces: boolean = false): QueryIncentivizedPoolsRequestAminoMsg {
    return {
      type: "osmosis/poolincentives/query-incentivized-pools-request",
      value: QueryIncentivizedPoolsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryIncentivizedPoolsRequestProtoMsg, useInterfaces: boolean = false): QueryIncentivizedPoolsRequest {
    return QueryIncentivizedPoolsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryIncentivizedPoolsRequest): Uint8Array {
    return QueryIncentivizedPoolsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryIncentivizedPoolsRequest): QueryIncentivizedPoolsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolincentives.v1beta1.QueryIncentivizedPoolsRequest",
      value: QueryIncentivizedPoolsRequest.encode(message).finish()
    };
  }
};
function createBaseIncentivizedPool(): IncentivizedPool {
  return {
    poolId: BigInt(0),
    lockableDuration: Duration.fromPartial({}),
    gaugeId: BigInt(0)
  };
}
export const IncentivizedPool = {
  typeUrl: "/osmosis.poolincentives.v1beta1.IncentivizedPool",
  encode(message: IncentivizedPool, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.lockableDuration !== undefined) {
      Duration.encode(message.lockableDuration, writer.uint32(18).fork()).ldelim();
    }
    if (message.gaugeId !== BigInt(0)) {
      writer.uint32(24).uint64(message.gaugeId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): IncentivizedPool {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIncentivizedPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.lockableDuration = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.gaugeId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<IncentivizedPool>): IncentivizedPool {
    const message = createBaseIncentivizedPool();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.lockableDuration = object.lockableDuration !== undefined && object.lockableDuration !== null ? Duration.fromPartial(object.lockableDuration) : undefined;
    message.gaugeId = object.gaugeId !== undefined && object.gaugeId !== null ? BigInt(object.gaugeId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: IncentivizedPoolAmino): IncentivizedPool {
    const message = createBaseIncentivizedPool();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.lockable_duration !== undefined && object.lockable_duration !== null) {
      message.lockableDuration = Duration.fromAmino(object.lockable_duration);
    }
    if (object.gauge_id !== undefined && object.gauge_id !== null) {
      message.gaugeId = BigInt(object.gauge_id);
    }
    return message;
  },
  toAmino(message: IncentivizedPool, useInterfaces: boolean = false): IncentivizedPoolAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.lockable_duration = message.lockableDuration ? Duration.toAmino(message.lockableDuration, useInterfaces) : undefined;
    obj.gauge_id = message.gaugeId !== BigInt(0) ? message.gaugeId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: IncentivizedPoolAminoMsg): IncentivizedPool {
    return IncentivizedPool.fromAmino(object.value);
  },
  toAminoMsg(message: IncentivizedPool, useInterfaces: boolean = false): IncentivizedPoolAminoMsg {
    return {
      type: "osmosis/poolincentives/incentivized-pool",
      value: IncentivizedPool.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: IncentivizedPoolProtoMsg, useInterfaces: boolean = false): IncentivizedPool {
    return IncentivizedPool.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: IncentivizedPool): Uint8Array {
    return IncentivizedPool.encode(message).finish();
  },
  toProtoMsg(message: IncentivizedPool): IncentivizedPoolProtoMsg {
    return {
      typeUrl: "/osmosis.poolincentives.v1beta1.IncentivizedPool",
      value: IncentivizedPool.encode(message).finish()
    };
  }
};
function createBaseQueryIncentivizedPoolsResponse(): QueryIncentivizedPoolsResponse {
  return {
    incentivizedPools: []
  };
}
export const QueryIncentivizedPoolsResponse = {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryIncentivizedPoolsResponse",
  encode(message: QueryIncentivizedPoolsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.incentivizedPools) {
      IncentivizedPool.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryIncentivizedPoolsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryIncentivizedPoolsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.incentivizedPools.push(IncentivizedPool.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryIncentivizedPoolsResponse>): QueryIncentivizedPoolsResponse {
    const message = createBaseQueryIncentivizedPoolsResponse();
    message.incentivizedPools = object.incentivizedPools?.map(e => IncentivizedPool.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryIncentivizedPoolsResponseAmino): QueryIncentivizedPoolsResponse {
    const message = createBaseQueryIncentivizedPoolsResponse();
    message.incentivizedPools = object.incentivized_pools?.map(e => IncentivizedPool.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryIncentivizedPoolsResponse, useInterfaces: boolean = false): QueryIncentivizedPoolsResponseAmino {
    const obj: any = {};
    if (message.incentivizedPools) {
      obj.incentivized_pools = message.incentivizedPools.map(e => e ? IncentivizedPool.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.incentivized_pools = message.incentivizedPools;
    }
    return obj;
  },
  fromAminoMsg(object: QueryIncentivizedPoolsResponseAminoMsg): QueryIncentivizedPoolsResponse {
    return QueryIncentivizedPoolsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryIncentivizedPoolsResponse, useInterfaces: boolean = false): QueryIncentivizedPoolsResponseAminoMsg {
    return {
      type: "osmosis/poolincentives/query-incentivized-pools-response",
      value: QueryIncentivizedPoolsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryIncentivizedPoolsResponseProtoMsg, useInterfaces: boolean = false): QueryIncentivizedPoolsResponse {
    return QueryIncentivizedPoolsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryIncentivizedPoolsResponse): Uint8Array {
    return QueryIncentivizedPoolsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryIncentivizedPoolsResponse): QueryIncentivizedPoolsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolincentives.v1beta1.QueryIncentivizedPoolsResponse",
      value: QueryIncentivizedPoolsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryExternalIncentiveGaugesRequest(): QueryExternalIncentiveGaugesRequest {
  return {};
}
export const QueryExternalIncentiveGaugesRequest = {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryExternalIncentiveGaugesRequest",
  encode(_: QueryExternalIncentiveGaugesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryExternalIncentiveGaugesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryExternalIncentiveGaugesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<QueryExternalIncentiveGaugesRequest>): QueryExternalIncentiveGaugesRequest {
    const message = createBaseQueryExternalIncentiveGaugesRequest();
    return message;
  },
  fromAmino(_: QueryExternalIncentiveGaugesRequestAmino): QueryExternalIncentiveGaugesRequest {
    const message = createBaseQueryExternalIncentiveGaugesRequest();
    return message;
  },
  toAmino(_: QueryExternalIncentiveGaugesRequest, useInterfaces: boolean = false): QueryExternalIncentiveGaugesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryExternalIncentiveGaugesRequestAminoMsg): QueryExternalIncentiveGaugesRequest {
    return QueryExternalIncentiveGaugesRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryExternalIncentiveGaugesRequest, useInterfaces: boolean = false): QueryExternalIncentiveGaugesRequestAminoMsg {
    return {
      type: "osmosis/poolincentives/query-external-incentive-gauges-request",
      value: QueryExternalIncentiveGaugesRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryExternalIncentiveGaugesRequestProtoMsg, useInterfaces: boolean = false): QueryExternalIncentiveGaugesRequest {
    return QueryExternalIncentiveGaugesRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryExternalIncentiveGaugesRequest): Uint8Array {
    return QueryExternalIncentiveGaugesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryExternalIncentiveGaugesRequest): QueryExternalIncentiveGaugesRequestProtoMsg {
    return {
      typeUrl: "/osmosis.poolincentives.v1beta1.QueryExternalIncentiveGaugesRequest",
      value: QueryExternalIncentiveGaugesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryExternalIncentiveGaugesResponse(): QueryExternalIncentiveGaugesResponse {
  return {
    data: []
  };
}
export const QueryExternalIncentiveGaugesResponse = {
  typeUrl: "/osmosis.poolincentives.v1beta1.QueryExternalIncentiveGaugesResponse",
  encode(message: QueryExternalIncentiveGaugesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.data) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryExternalIncentiveGaugesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryExternalIncentiveGaugesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data.push(Gauge.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryExternalIncentiveGaugesResponse>): QueryExternalIncentiveGaugesResponse {
    const message = createBaseQueryExternalIncentiveGaugesResponse();
    message.data = object.data?.map(e => Gauge.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryExternalIncentiveGaugesResponseAmino): QueryExternalIncentiveGaugesResponse {
    const message = createBaseQueryExternalIncentiveGaugesResponse();
    message.data = object.data?.map(e => Gauge.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryExternalIncentiveGaugesResponse, useInterfaces: boolean = false): QueryExternalIncentiveGaugesResponseAmino {
    const obj: any = {};
    if (message.data) {
      obj.data = message.data.map(e => e ? Gauge.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.data = message.data;
    }
    return obj;
  },
  fromAminoMsg(object: QueryExternalIncentiveGaugesResponseAminoMsg): QueryExternalIncentiveGaugesResponse {
    return QueryExternalIncentiveGaugesResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryExternalIncentiveGaugesResponse, useInterfaces: boolean = false): QueryExternalIncentiveGaugesResponseAminoMsg {
    return {
      type: "osmosis/poolincentives/query-external-incentive-gauges-response",
      value: QueryExternalIncentiveGaugesResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryExternalIncentiveGaugesResponseProtoMsg, useInterfaces: boolean = false): QueryExternalIncentiveGaugesResponse {
    return QueryExternalIncentiveGaugesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryExternalIncentiveGaugesResponse): Uint8Array {
    return QueryExternalIncentiveGaugesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryExternalIncentiveGaugesResponse): QueryExternalIncentiveGaugesResponseProtoMsg {
    return {
      typeUrl: "/osmosis.poolincentives.v1beta1.QueryExternalIncentiveGaugesResponse",
      value: QueryExternalIncentiveGaugesResponse.encode(message).finish()
    };
  }
};