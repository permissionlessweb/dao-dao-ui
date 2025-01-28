import * as _384 from "./carbon/cdp/asset_params";
import * as _385 from "./carbon/cdp/cdp_liquidations";
import * as _386 from "./carbon/cdp/debt_info";
import * as _387 from "./carbon/cdp/e_mode_category";
import * as _388 from "./carbon/cdp/event";
import * as _389 from "./carbon/cdp/genesis";
import * as _390 from "./carbon/cdp/params";
import * as _391 from "./carbon/cdp/query";
import * as _392 from "./carbon/cdp/rate_strategy_params";
import * as _393 from "./carbon/cdp/reward_scheme";
import * as _394 from "./carbon/cdp/stablecoin_debt_info";
import * as _395 from "./carbon/cdp/stablecoin_interest_info";
import * as _396 from "./carbon/cdp/tx";
import * as _681 from "./carbon/cdp/tx.amino";
import * as _682 from "./carbon/cdp/tx.registry";
import * as _683 from "./carbon/cdp/query.rpc.Query";
import * as _684 from "./carbon/cdp/tx.rpc.msg";
import * as _722 from "./rpc.query";
import * as _723 from "./rpc.tx";
export namespace Switcheo {
  export namespace carbon {
    export const cdp = {
      ..._384,
      ..._385,
      ..._386,
      ..._387,
      ..._388,
      ..._389,
      ..._390,
      ..._391,
      ..._392,
      ..._393,
      ..._394,
      ..._395,
      ..._396,
      ..._681,
      ..._682,
      ..._683,
      ..._684
    };
  }
  export const ClientFactory = {
    ..._722,
    ..._723
  };
}