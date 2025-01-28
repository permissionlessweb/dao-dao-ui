import * as _105 from "./feemarket/v1/genesis";
import * as _106 from "./feemarket/v1/params";
import * as _107 from "./feemarket/v1/query";
import * as _108 from "./feemarket/v1/tx";
import * as _477 from "./feemarket/v1/tx.amino";
import * as _478 from "./feemarket/v1/tx.registry";
import * as _479 from "./feemarket/v1/query.rpc.Query";
import * as _480 from "./feemarket/v1/tx.rpc.msg";
import * as _696 from "./rpc.query";
import * as _697 from "./rpc.tx";
export namespace feemarket {
  export namespace feemarket {
    export const v1 = {
      ..._105,
      ..._106,
      ..._107,
      ..._108,
      ..._477,
      ..._478,
      ..._479,
      ..._480
    };
  }
  export const ClientFactory = {
    ..._696,
    ..._697
  };
}