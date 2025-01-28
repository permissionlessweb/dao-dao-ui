import * as _109 from "./globalfee/v1beta1/genesis";
import * as _110 from "./globalfee/v1beta1/query";
import * as _111 from "./globalfee/v1beta1/tx";
import * as _112 from "./metaprotocols/extensions";
import * as _481 from "./globalfee/v1beta1/tx.amino";
import * as _482 from "./globalfee/v1beta1/tx.registry";
import * as _483 from "./globalfee/v1beta1/query.rpc.Query";
import * as _484 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _698 from "./rpc.query";
import * as _699 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._109,
      ..._110,
      ..._111,
      ..._481,
      ..._482,
      ..._483,
      ..._484
    };
  }
  export const metaprotocols = {
    ..._112
  };
  export const ClientFactory = {
    ..._698,
    ..._699
  };
}