import { GenericToken } from './token'

export type ShitstrapInfo = {
  chainId: string
  shitstrapContractAddr: string
  eligibleAssets: PossibleShit[]
  elegibleGenericAssets: GenericToken[]
  shit: GenericToken
  // Whether or not shitstrap is complete
  full: boolean
  cutoff: Uint128
  owner: string
  title: string
  description: string
}

export type Uint128 = string
export type UncheckedDenom =
  | {
      native: string
    }
  | {
      cw20: string
    }
export interface InstantiateMsg {
  title: string
  description: string
  accepted: PossibleShit[]
  cutoff: Uint128
  owner: string
  shitmos: UncheckedDenom
}
export interface PossibleShit {
  shit_rate: Uint128
  token: UncheckedDenom
}
export type ExecuteMsg =
  | {
      shit_strap: {
        shit: AssetUnchecked
      }
    }
  | {
      flush: {}
    }
  | {
      receive: Cw20ReceiveMsg
    }
  | {
      refund_shitter: {}
    }
export type Binary = string
export interface AssetUnchecked {
  amount: Uint128
  denom: UncheckedDenom
}
export interface Cw20ReceiveMsg {
  amount: Uint128
  msg: Binary
  sender: string
}
export type QueryMsg =
  | {
      config: {}
    }
  | {
      shit_pile: {}
    }
  | {
      full_of_shit: {}
    }
  | {
      shit_rate: {
        asset: string
      }
    }
  | {
      shit_rates: {}
    }
export type Addr = string
export interface Config {
  accepted: PossibleShit[]
  cutoff: Uint128
  description: string
  full_of_shit: boolean
  owner: Addr
  shitmos_addr: UncheckedDenom
  title: string
}
export type Boolean = boolean
export type NullableUint128 = Uint128 | null
export type NullableArrayOfPossibleShit = PossibleShit[] | null
