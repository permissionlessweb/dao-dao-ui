import * as _325 from "./stargaze/alloc/v1beta1/genesis";
import * as _326 from "./stargaze/alloc/v1beta1/params";
import * as _327 from "./stargaze/alloc/v1beta1/query";
import * as _328 from "./stargaze/alloc/v1beta1/tx";
import * as _329 from "./stargaze/cron/v1/cron";
import * as _330 from "./stargaze/cron/v1/genesis";
import * as _331 from "./stargaze/cron/v1/proposal";
import * as _332 from "./stargaze/cron/v1/query";
import * as _333 from "./stargaze/cron/v1/tx";
import * as _334 from "./stargaze/globalfee/v1/genesis";
import * as _335 from "./stargaze/globalfee/v1/globalfee";
import * as _336 from "./stargaze/globalfee/v1/proposal";
import * as _337 from "./stargaze/globalfee/v1/query";
import * as _338 from "./stargaze/globalfee/v1/tx";
import * as _339 from "./stargaze/mint/v1beta1/genesis";
import * as _340 from "./stargaze/mint/v1beta1/mint";
import * as _341 from "./stargaze/mint/v1beta1/query";
import * as _342 from "./stargaze/mint/v1beta1/tx";
import * as _633 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _634 from "./stargaze/cron/v1/tx.amino";
import * as _635 from "./stargaze/globalfee/v1/tx.amino";
import * as _636 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _637 from "./stargaze/cron/v1/tx.registry";
import * as _638 from "./stargaze/globalfee/v1/tx.registry";
import * as _639 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _640 from "./stargaze/cron/v1/query.rpc.Query";
import * as _641 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _642 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _643 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _644 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _645 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _716 from "./rpc.query";
import * as _717 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._325,
        ..._326,
        ..._327,
        ..._328,
        ..._633,
        ..._636,
        ..._639,
        ..._643
      };
    }
    export namespace cron {
      export const v1 = {
        ..._329,
        ..._330,
        ..._331,
        ..._332,
        ..._333,
        ..._634,
        ..._637,
        ..._640,
        ..._644
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._334,
        ..._335,
        ..._336,
        ..._337,
        ..._338,
        ..._635,
        ..._638,
        ..._641,
        ..._645
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._339,
        ..._340,
        ..._341,
        ..._342,
        ..._642
      };
    }
  }
  export const ClientFactory = {
    ..._716,
    ..._717
  };
}