import * as _11 from "./fantoken/v1beta1/tx";
import * as _414 from "./fantoken/v1beta1/tx.amino";
import * as _415 from "./fantoken/v1beta1/tx.registry";
import * as _416 from "./fantoken/v1beta1/query.rpc.Query";
import * as _417 from "./fantoken/v1beta1/tx.rpc.msg";
import * as _688 from "./rpc.query";
import * as _689 from "./rpc.tx";
export namespace bitsong {
  export const fantoken = {
    ..._11,
    ..._414,
    ..._415,
    ..._417,
    v1beta1: {
      ..._416
    }
  };
  export const ClientFactory = {
    ..._688,
    ..._689
  };
}