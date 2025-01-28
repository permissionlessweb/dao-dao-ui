import * as _370 from "./compute/v1beta1/genesis";
import * as _371 from "./compute/v1beta1/msg";
import * as _372 from "./compute/v1beta1/query";
import * as _373 from "./compute/v1beta1/types";
import * as _374 from "./emergencybutton/v1beta1/genesis";
import * as _375 from "./emergencybutton/v1beta1/params";
import * as _376 from "./emergencybutton/v1beta1/query";
import * as _377 from "./emergencybutton/v1beta1/tx";
import * as _378 from "./intertx/v1beta1/query";
import * as _379 from "./intertx/v1beta1/tx";
import * as _380 from "./registration/v1beta1/genesis";
import * as _381 from "./registration/v1beta1/msg";
import * as _382 from "./registration/v1beta1/query";
import * as _383 from "./registration/v1beta1/types";
import * as _668 from "./compute/v1beta1/msg.amino";
import * as _669 from "./emergencybutton/v1beta1/tx.amino";
import * as _670 from "./intertx/v1beta1/tx.amino";
import * as _671 from "./compute/v1beta1/msg.registry";
import * as _672 from "./emergencybutton/v1beta1/tx.registry";
import * as _673 from "./intertx/v1beta1/tx.registry";
import * as _674 from "./compute/v1beta1/query.rpc.Query";
import * as _675 from "./emergencybutton/v1beta1/query.rpc.Query";
import * as _676 from "./intertx/v1beta1/query.rpc.Query";
import * as _677 from "./registration/v1beta1/query.rpc.Query";
import * as _678 from "./compute/v1beta1/msg.rpc.msg";
import * as _679 from "./emergencybutton/v1beta1/tx.rpc.msg";
import * as _680 from "./intertx/v1beta1/tx.rpc.msg";
import * as _720 from "./rpc.query";
import * as _721 from "./rpc.tx";
export namespace secret {
  export namespace compute {
    export const v1beta1 = {
      ..._370,
      ..._371,
      ..._372,
      ..._373,
      ..._668,
      ..._671,
      ..._674,
      ..._678
    };
  }
  export namespace emergencybutton {
    export const v1beta1 = {
      ..._374,
      ..._375,
      ..._376,
      ..._377,
      ..._669,
      ..._672,
      ..._675,
      ..._679
    };
  }
  export namespace intertx {
    export const v1beta1 = {
      ..._378,
      ..._379,
      ..._670,
      ..._673,
      ..._676,
      ..._680
    };
  }
  export namespace registration {
    export const v1beta1 = {
      ..._380,
      ..._381,
      ..._382,
      ..._383,
      ..._677
    };
  }
  export const ClientFactory = {
    ..._720,
    ..._721
  };
}