//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgAssignConsumerKey, MsgSubmitConsumerMisbehaviour, MsgSubmitConsumerDoubleVoting, MsgCreateConsumer, MsgUpdateConsumer, MsgRemoveConsumer, MsgUpdateParams, MsgOptIn, MsgOptOut, MsgSetConsumerCommissionRate, MsgChangeRewardDenoms } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/interchain_security.ccv.provider.v1.MsgAssignConsumerKey", MsgAssignConsumerKey], ["/interchain_security.ccv.provider.v1.MsgSubmitConsumerMisbehaviour", MsgSubmitConsumerMisbehaviour], ["/interchain_security.ccv.provider.v1.MsgSubmitConsumerDoubleVoting", MsgSubmitConsumerDoubleVoting], ["/interchain_security.ccv.provider.v1.MsgCreateConsumer", MsgCreateConsumer], ["/interchain_security.ccv.provider.v1.MsgUpdateConsumer", MsgUpdateConsumer], ["/interchain_security.ccv.provider.v1.MsgRemoveConsumer", MsgRemoveConsumer], ["/interchain_security.ccv.provider.v1.MsgUpdateParams", MsgUpdateParams], ["/interchain_security.ccv.provider.v1.MsgOptIn", MsgOptIn], ["/interchain_security.ccv.provider.v1.MsgOptOut", MsgOptOut], ["/interchain_security.ccv.provider.v1.MsgSetConsumerCommissionRate", MsgSetConsumerCommissionRate], ["/interchain_security.ccv.provider.v1.MsgChangeRewardDenoms", MsgChangeRewardDenoms]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    assignConsumerKey(value: MsgAssignConsumerKey) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKey",
        value: MsgAssignConsumerKey.encode(value).finish()
      };
    },
    submitConsumerMisbehaviour(value: MsgSubmitConsumerMisbehaviour) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerMisbehaviour",
        value: MsgSubmitConsumerMisbehaviour.encode(value).finish()
      };
    },
    submitConsumerDoubleVoting(value: MsgSubmitConsumerDoubleVoting) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerDoubleVoting",
        value: MsgSubmitConsumerDoubleVoting.encode(value).finish()
      };
    },
    createConsumer(value: MsgCreateConsumer) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgCreateConsumer",
        value: MsgCreateConsumer.encode(value).finish()
      };
    },
    updateConsumer(value: MsgUpdateConsumer) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgUpdateConsumer",
        value: MsgUpdateConsumer.encode(value).finish()
      };
    },
    removeConsumer(value: MsgRemoveConsumer) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgRemoveConsumer",
        value: MsgRemoveConsumer.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    optIn(value: MsgOptIn) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgOptIn",
        value: MsgOptIn.encode(value).finish()
      };
    },
    optOut(value: MsgOptOut) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgOptOut",
        value: MsgOptOut.encode(value).finish()
      };
    },
    setConsumerCommissionRate(value: MsgSetConsumerCommissionRate) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgSetConsumerCommissionRate",
        value: MsgSetConsumerCommissionRate.encode(value).finish()
      };
    },
    changeRewardDenoms(value: MsgChangeRewardDenoms) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgChangeRewardDenoms",
        value: MsgChangeRewardDenoms.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    assignConsumerKey(value: MsgAssignConsumerKey) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKey",
        value
      };
    },
    submitConsumerMisbehaviour(value: MsgSubmitConsumerMisbehaviour) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerMisbehaviour",
        value
      };
    },
    submitConsumerDoubleVoting(value: MsgSubmitConsumerDoubleVoting) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerDoubleVoting",
        value
      };
    },
    createConsumer(value: MsgCreateConsumer) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgCreateConsumer",
        value
      };
    },
    updateConsumer(value: MsgUpdateConsumer) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgUpdateConsumer",
        value
      };
    },
    removeConsumer(value: MsgRemoveConsumer) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgRemoveConsumer",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgUpdateParams",
        value
      };
    },
    optIn(value: MsgOptIn) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgOptIn",
        value
      };
    },
    optOut(value: MsgOptOut) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgOptOut",
        value
      };
    },
    setConsumerCommissionRate(value: MsgSetConsumerCommissionRate) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgSetConsumerCommissionRate",
        value
      };
    },
    changeRewardDenoms(value: MsgChangeRewardDenoms) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgChangeRewardDenoms",
        value
      };
    }
  },
  fromPartial: {
    assignConsumerKey(value: MsgAssignConsumerKey) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKey",
        value: MsgAssignConsumerKey.fromPartial(value)
      };
    },
    submitConsumerMisbehaviour(value: MsgSubmitConsumerMisbehaviour) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerMisbehaviour",
        value: MsgSubmitConsumerMisbehaviour.fromPartial(value)
      };
    },
    submitConsumerDoubleVoting(value: MsgSubmitConsumerDoubleVoting) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgSubmitConsumerDoubleVoting",
        value: MsgSubmitConsumerDoubleVoting.fromPartial(value)
      };
    },
    createConsumer(value: MsgCreateConsumer) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgCreateConsumer",
        value: MsgCreateConsumer.fromPartial(value)
      };
    },
    updateConsumer(value: MsgUpdateConsumer) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgUpdateConsumer",
        value: MsgUpdateConsumer.fromPartial(value)
      };
    },
    removeConsumer(value: MsgRemoveConsumer) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgRemoveConsumer",
        value: MsgRemoveConsumer.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    optIn(value: MsgOptIn) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgOptIn",
        value: MsgOptIn.fromPartial(value)
      };
    },
    optOut(value: MsgOptOut) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgOptOut",
        value: MsgOptOut.fromPartial(value)
      };
    },
    setConsumerCommissionRate(value: MsgSetConsumerCommissionRate) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgSetConsumerCommissionRate",
        value: MsgSetConsumerCommissionRate.fromPartial(value)
      };
    },
    changeRewardDenoms(value: MsgChangeRewardDenoms) {
      return {
        typeUrl: "/interchain_security.ccv.provider.v1.MsgChangeRewardDenoms",
        value: MsgChangeRewardDenoms.fromPartial(value)
      };
    }
  }
};