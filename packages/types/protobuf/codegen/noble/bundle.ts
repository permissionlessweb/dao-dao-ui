import * as _397 from "../tariff/genesis";
import * as _398 from "../tariff/params";
import * as _399 from "../tariff/query";
import * as _685 from "../tariff/query.rpc.Query";
import * as _724 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._397,
    ..._398,
    ..._399,
    ..._685
  };
  export const ClientFactory = {
    ..._724
  };
}