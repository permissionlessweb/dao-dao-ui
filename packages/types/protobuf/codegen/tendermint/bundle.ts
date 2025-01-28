import * as _400 from "./abci/types";
import * as _401 from "./crypto/keys";
import * as _402 from "./crypto/proof";
import * as _403 from "./p2p/types";
import * as _404 from "./types/block";
import * as _405 from "./types/evidence";
import * as _406 from "./types/params";
import * as _407 from "./types/types";
import * as _408 from "./types/validator";
import * as _409 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._400
  };
  export const crypto = {
    ..._401,
    ..._402
  };
  export const p2p = {
    ..._403
  };
  export const types = {
    ..._404,
    ..._405,
    ..._406,
    ..._407,
    ..._408
  };
  export const version = {
    ..._409
  };
}