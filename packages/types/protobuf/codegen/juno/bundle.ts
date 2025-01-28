import * as _160 from "./feeshare/v1/feeshare";
import * as _161 from "./feeshare/v1/genesis";
import * as _162 from "./feeshare/v1/query";
import * as _163 from "./feeshare/v1/tx";
import * as _164 from "./mint/genesis";
import * as _165 from "./mint/mint";
import * as _166 from "./mint/query";
import * as _167 from "./mint/tx";
import * as _517 from "./feeshare/v1/tx.amino";
import * as _518 from "./mint/tx.amino";
import * as _519 from "./feeshare/v1/tx.registry";
import * as _520 from "./mint/tx.registry";
import * as _521 from "./feeshare/v1/query.rpc.Query";
import * as _522 from "./mint/query.rpc.Query";
import * as _523 from "./feeshare/v1/tx.rpc.msg";
import * as _524 from "./mint/tx.rpc.msg";
import * as _704 from "./rpc.query";
import * as _705 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._160,
      ..._161,
      ..._162,
      ..._163,
      ..._517,
      ..._519,
      ..._521,
      ..._523
    };
  }
  export const mint = {
    ..._164,
    ..._165,
    ..._166,
    ..._167,
    ..._518,
    ..._520,
    ..._522,
    ..._524
  };
  export const ClientFactory = {
    ..._704,
    ..._705
  };
}