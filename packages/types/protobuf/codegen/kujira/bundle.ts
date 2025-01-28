import * as _168 from "./denom/authorityMetadata";
import * as _169 from "./denom/genesis";
import * as _170 from "./denom/params";
import * as _171 from "./denom/query";
import * as _172 from "./denom/tx";
import * as _173 from "./oracle/genesis";
import * as _174 from "./oracle/oracle";
import * as _175 from "./oracle/query";
import * as _176 from "./oracle/tx";
import * as _177 from "./scheduler/genesis";
import * as _178 from "./scheduler/hook";
import * as _179 from "./scheduler/params";
import * as _180 from "./scheduler/proposal";
import * as _181 from "./scheduler/query";
import * as _525 from "./denom/tx.amino";
import * as _526 from "./oracle/tx.amino";
import * as _527 from "./denom/tx.registry";
import * as _528 from "./oracle/tx.registry";
import * as _529 from "./denom/query.rpc.Query";
import * as _530 from "./oracle/query.rpc.Query";
import * as _531 from "./scheduler/query.rpc.Query";
import * as _532 from "./denom/tx.rpc.msg";
import * as _533 from "./oracle/tx.rpc.msg";
import * as _706 from "./rpc.query";
import * as _707 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._168,
    ..._169,
    ..._170,
    ..._171,
    ..._172,
    ..._525,
    ..._527,
    ..._529,
    ..._532
  };
  export const oracle = {
    ..._173,
    ..._174,
    ..._175,
    ..._176,
    ..._526,
    ..._528,
    ..._530,
    ..._533
  };
  export const scheduler = {
    ..._177,
    ..._178,
    ..._179,
    ..._180,
    ..._181,
    ..._531
  };
  export const ClientFactory = {
    ..._706,
    ..._707
  };
}