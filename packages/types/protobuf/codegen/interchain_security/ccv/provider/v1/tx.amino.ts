import { MsgAssignConsumerKey, MsgSubmitConsumerMisbehaviour, MsgSubmitConsumerDoubleVoting, MsgCreateConsumer, MsgUpdateConsumer, MsgRemoveConsumer, MsgUpdateParams, MsgOptIn, MsgOptOut, MsgSetConsumerCommissionRate, MsgChangeRewardDenoms } from "./tx";
export const AminoConverter = {
  "/interchain_security.ccv.provider.v1.MsgAssignConsumerKey": {
    aminoType: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKey",
    toAmino: MsgAssignConsumerKey.toAmino,
    fromAmino: MsgAssignConsumerKey.fromAmino
  },
  "/interchain_security.ccv.provider.v1.MsgSubmitConsumerMisbehaviour": {
    aminoType: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerMisbehaviour",
    toAmino: MsgSubmitConsumerMisbehaviour.toAmino,
    fromAmino: MsgSubmitConsumerMisbehaviour.fromAmino
  },
  "/interchain_security.ccv.provider.v1.MsgSubmitConsumerDoubleVoting": {
    aminoType: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerDoubleVoting",
    toAmino: MsgSubmitConsumerDoubleVoting.toAmino,
    fromAmino: MsgSubmitConsumerDoubleVoting.fromAmino
  },
  "/interchain_security.ccv.provider.v1.MsgCreateConsumer": {
    aminoType: "/interchain_security.ccv.provider.v1.MsgCreateConsumer",
    toAmino: MsgCreateConsumer.toAmino,
    fromAmino: MsgCreateConsumer.fromAmino
  },
  "/interchain_security.ccv.provider.v1.MsgUpdateConsumer": {
    aminoType: "/interchain_security.ccv.provider.v1.MsgUpdateConsumer",
    toAmino: MsgUpdateConsumer.toAmino,
    fromAmino: MsgUpdateConsumer.fromAmino
  },
  "/interchain_security.ccv.provider.v1.MsgRemoveConsumer": {
    aminoType: "/interchain_security.ccv.provider.v1.MsgRemoveConsumer",
    toAmino: MsgRemoveConsumer.toAmino,
    fromAmino: MsgRemoveConsumer.fromAmino
  },
  "/interchain_security.ccv.provider.v1.MsgUpdateParams": {
    aminoType: "/interchain_security.ccv.provider.v1.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/interchain_security.ccv.provider.v1.MsgOptIn": {
    aminoType: "/interchain_security.ccv.provider.v1.MsgOptIn",
    toAmino: MsgOptIn.toAmino,
    fromAmino: MsgOptIn.fromAmino
  },
  "/interchain_security.ccv.provider.v1.MsgOptOut": {
    aminoType: "/interchain_security.ccv.provider.v1.MsgOptOut",
    toAmino: MsgOptOut.toAmino,
    fromAmino: MsgOptOut.fromAmino
  },
  "/interchain_security.ccv.provider.v1.MsgSetConsumerCommissionRate": {
    aminoType: "/interchain_security.ccv.provider.v1.MsgSetConsumerCommissionRate",
    toAmino: MsgSetConsumerCommissionRate.toAmino,
    fromAmino: MsgSetConsumerCommissionRate.fromAmino
  },
  "/interchain_security.ccv.provider.v1.MsgChangeRewardDenoms": {
    aminoType: "/interchain_security.ccv.provider.v1.MsgChangeRewardDenoms",
    toAmino: MsgChangeRewardDenoms.toAmino,
    fromAmino: MsgChangeRewardDenoms.fromAmino
  }
};