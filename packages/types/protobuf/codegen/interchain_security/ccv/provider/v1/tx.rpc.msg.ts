import { Rpc } from "../../../../helpers";
import { BinaryReader } from "../../../../binary";
import { MsgAssignConsumerKey, MsgAssignConsumerKeyResponse, MsgSubmitConsumerMisbehaviour, MsgSubmitConsumerMisbehaviourResponse, MsgSubmitConsumerDoubleVoting, MsgSubmitConsumerDoubleVotingResponse, MsgCreateConsumer, MsgCreateConsumerResponse, MsgUpdateConsumer, MsgUpdateConsumerResponse, MsgRemoveConsumer, MsgRemoveConsumerResponse, MsgUpdateParams, MsgUpdateParamsResponse, MsgOptIn, MsgOptInResponse, MsgOptOut, MsgOptOutResponse, MsgSetConsumerCommissionRate, MsgSetConsumerCommissionRateResponse, MsgChangeRewardDenoms, MsgChangeRewardDenomsResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  assignConsumerKey(request: MsgAssignConsumerKey): Promise<MsgAssignConsumerKeyResponse>;
  submitConsumerMisbehaviour(request: MsgSubmitConsumerMisbehaviour): Promise<MsgSubmitConsumerMisbehaviourResponse>;
  submitConsumerDoubleVoting(request: MsgSubmitConsumerDoubleVoting): Promise<MsgSubmitConsumerDoubleVotingResponse>;
  createConsumer(request: MsgCreateConsumer): Promise<MsgCreateConsumerResponse>;
  updateConsumer(request: MsgUpdateConsumer): Promise<MsgUpdateConsumerResponse>;
  removeConsumer(request: MsgRemoveConsumer): Promise<MsgRemoveConsumerResponse>;
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  optIn(request: MsgOptIn): Promise<MsgOptInResponse>;
  optOut(request: MsgOptOut): Promise<MsgOptOutResponse>;
  setConsumerCommissionRate(request: MsgSetConsumerCommissionRate): Promise<MsgSetConsumerCommissionRateResponse>;
  changeRewardDenoms(request: MsgChangeRewardDenoms): Promise<MsgChangeRewardDenomsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.assignConsumerKey = this.assignConsumerKey.bind(this);
    this.submitConsumerMisbehaviour = this.submitConsumerMisbehaviour.bind(this);
    this.submitConsumerDoubleVoting = this.submitConsumerDoubleVoting.bind(this);
    this.createConsumer = this.createConsumer.bind(this);
    this.updateConsumer = this.updateConsumer.bind(this);
    this.removeConsumer = this.removeConsumer.bind(this);
    this.updateParams = this.updateParams.bind(this);
    this.optIn = this.optIn.bind(this);
    this.optOut = this.optOut.bind(this);
    this.setConsumerCommissionRate = this.setConsumerCommissionRate.bind(this);
    this.changeRewardDenoms = this.changeRewardDenoms.bind(this);
  }
  assignConsumerKey(request: MsgAssignConsumerKey, useInterfaces: boolean = true): Promise<MsgAssignConsumerKeyResponse> {
    const data = MsgAssignConsumerKey.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Msg", "AssignConsumerKey", data);
    return promise.then(data => MsgAssignConsumerKeyResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  submitConsumerMisbehaviour(request: MsgSubmitConsumerMisbehaviour, useInterfaces: boolean = true): Promise<MsgSubmitConsumerMisbehaviourResponse> {
    const data = MsgSubmitConsumerMisbehaviour.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Msg", "SubmitConsumerMisbehaviour", data);
    return promise.then(data => MsgSubmitConsumerMisbehaviourResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  submitConsumerDoubleVoting(request: MsgSubmitConsumerDoubleVoting, useInterfaces: boolean = true): Promise<MsgSubmitConsumerDoubleVotingResponse> {
    const data = MsgSubmitConsumerDoubleVoting.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Msg", "SubmitConsumerDoubleVoting", data);
    return promise.then(data => MsgSubmitConsumerDoubleVotingResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  createConsumer(request: MsgCreateConsumer, useInterfaces: boolean = true): Promise<MsgCreateConsumerResponse> {
    const data = MsgCreateConsumer.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Msg", "CreateConsumer", data);
    return promise.then(data => MsgCreateConsumerResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateConsumer(request: MsgUpdateConsumer, useInterfaces: boolean = true): Promise<MsgUpdateConsumerResponse> {
    const data = MsgUpdateConsumer.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Msg", "UpdateConsumer", data);
    return promise.then(data => MsgUpdateConsumerResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  removeConsumer(request: MsgRemoveConsumer, useInterfaces: boolean = true): Promise<MsgRemoveConsumerResponse> {
    const data = MsgRemoveConsumer.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Msg", "RemoveConsumer", data);
    return promise.then(data => MsgRemoveConsumerResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  optIn(request: MsgOptIn, useInterfaces: boolean = true): Promise<MsgOptInResponse> {
    const data = MsgOptIn.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Msg", "OptIn", data);
    return promise.then(data => MsgOptInResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  optOut(request: MsgOptOut, useInterfaces: boolean = true): Promise<MsgOptOutResponse> {
    const data = MsgOptOut.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Msg", "OptOut", data);
    return promise.then(data => MsgOptOutResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setConsumerCommissionRate(request: MsgSetConsumerCommissionRate, useInterfaces: boolean = true): Promise<MsgSetConsumerCommissionRateResponse> {
    const data = MsgSetConsumerCommissionRate.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Msg", "SetConsumerCommissionRate", data);
    return promise.then(data => MsgSetConsumerCommissionRateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  changeRewardDenoms(request: MsgChangeRewardDenoms, useInterfaces: boolean = true): Promise<MsgChangeRewardDenomsResponse> {
    const data = MsgChangeRewardDenoms.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Msg", "ChangeRewardDenoms", data);
    return promise.then(data => MsgChangeRewardDenomsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}