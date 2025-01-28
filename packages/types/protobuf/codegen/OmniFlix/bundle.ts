import * as _220 from "./onft/v1beta1/genesis";
import * as _221 from "./onft/v1beta1/onft";
import * as _222 from "./onft/v1beta1/params";
import * as _223 from "./onft/v1beta1/query";
import * as _224 from "./onft/v1beta1/tx";
import * as _558 from "./onft/v1beta1/tx.amino";
import * as _559 from "./onft/v1beta1/tx.registry";
import * as _560 from "./onft/v1beta1/query.rpc.Query";
import * as _561 from "./onft/v1beta1/tx.rpc.msg";
import * as _710 from "./rpc.query";
import * as _711 from "./rpc.tx";
export namespace OmniFlix {
  export namespace onft {
    export const v1beta1 = {
      ..._220,
      ..._221,
      ..._222,
      ..._223,
      ..._224,
      ..._558,
      ..._559,
      ..._560,
      ..._561
    };
  }
  export const ClientFactory = {
    ..._710,
    ..._711
  };
}