import * as _150 from "./ccv/consumer/v1/consumer";
import * as _151 from "./ccv/consumer/v1/genesis";
import * as _152 from "./ccv/consumer/v1/query";
import * as _153 from "./ccv/consumer/v1/tx";
import * as _154 from "./ccv/provider/v1/genesis";
import * as _155 from "./ccv/provider/v1/provider";
import * as _156 from "./ccv/provider/v1/query";
import * as _157 from "./ccv/provider/v1/tx";
import * as _158 from "./ccv/v1/shared_consumer";
import * as _159 from "./ccv/v1/wire";
import * as _509 from "./ccv/consumer/v1/tx.amino";
import * as _510 from "./ccv/provider/v1/tx.amino";
import * as _511 from "./ccv/consumer/v1/tx.registry";
import * as _512 from "./ccv/provider/v1/tx.registry";
import * as _513 from "./ccv/consumer/v1/query.rpc.Query";
import * as _514 from "./ccv/provider/v1/query.rpc.Query";
import * as _515 from "./ccv/consumer/v1/tx.rpc.msg";
import * as _516 from "./ccv/provider/v1/tx.rpc.msg";
import * as _702 from "./rpc.query";
import * as _703 from "./rpc.tx";
export namespace interchain_security {
  export namespace ccv {
    export namespace consumer {
      export const v1 = {
        ..._150,
        ..._151,
        ..._152,
        ..._153,
        ..._509,
        ..._511,
        ..._513,
        ..._515
      };
    }
    export namespace provider {
      export const v1 = {
        ..._154,
        ..._155,
        ..._156,
        ..._157,
        ..._510,
        ..._512,
        ..._514,
        ..._516
      };
    }
    export const v1 = {
      ..._158,
      ..._159
    };
  }
  export const ClientFactory = {
    ..._702,
    ..._703
  };
}