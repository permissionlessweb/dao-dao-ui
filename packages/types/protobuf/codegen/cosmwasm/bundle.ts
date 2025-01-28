import * as _93 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _94 from "./tokenfactory/v1beta1/genesis";
import * as _95 from "./tokenfactory/v1beta1/params";
import * as _96 from "./tokenfactory/v1beta1/query";
import * as _97 from "./tokenfactory/v1beta1/tx";
import * as _98 from "./wasm/v1/authz";
import * as _99 from "./wasm/v1/genesis";
import * as _100 from "./wasm/v1/ibc";
import * as _101 from "./wasm/v1/proposal";
import * as _102 from "./wasm/v1/query";
import * as _103 from "./wasm/v1/tx";
import * as _104 from "./wasm/v1/types";
import * as _469 from "./tokenfactory/v1beta1/tx.amino";
import * as _470 from "./wasm/v1/tx.amino";
import * as _471 from "./tokenfactory/v1beta1/tx.registry";
import * as _472 from "./wasm/v1/tx.registry";
import * as _473 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _474 from "./wasm/v1/query.rpc.Query";
import * as _475 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _476 from "./wasm/v1/tx.rpc.msg";
import * as _694 from "./rpc.query";
import * as _695 from "./rpc.tx";
export namespace cosmwasm {
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._93,
      ..._94,
      ..._95,
      ..._96,
      ..._97,
      ..._469,
      ..._471,
      ..._473,
      ..._475
    };
  }
  export namespace wasm {
    export const v1 = {
      ..._98,
      ..._99,
      ..._100,
      ..._101,
      ..._102,
      ..._103,
      ..._104,
      ..._470,
      ..._472,
      ..._474,
      ..._476
    };
  }
  export const ClientFactory = {
    ..._694,
    ..._695
  };
}