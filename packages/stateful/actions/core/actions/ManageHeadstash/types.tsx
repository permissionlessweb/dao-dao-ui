import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'

import {
  CrossChainPacketInfo,
  ModalProps,
  UnifiedCosmosMsg,
} from '@dao-dao/types'

export type HeadstashInstance = {
  loading: boolean
  eligibleAddr: string
  eligibleHeadstashAmounts: HeadstashToken[]
  headstashProofs: string[] | null
}

export type HeadstashAllocations = HeadstashAllocation[]

export type HeadstashToken = {
  // snip120u contract
  contract: string
  // amount eligible
  amount: number
}

export type HeadstashConfigResponse = {
  config: HeadstashConfig
}
export type HeadstashConfig = {
  owner: string
  claimMsgPlaintxt: string
  startDate: string
  endDate?: string
  snip120us: []
  snipHash: string
  multiplier: string
  bloom?: BloomConfig
}

export type HeadstashConfigWithContractAddr = HeadstashConfig & {
  contractAddr: string
}

export type BloomConfig = {
  defaultCadance: number
  minimumCadance: number
  maximumCadance: number
  maximumGranularity: number
}

export type HeadstashAllocation = {
  // public wallet eligible
  address: string
  // list of items wallet is eligible for
  headstash: HeadstashToken[]
}

export interface ThrowawayWallet {
  mnemonic: string // base64 encoded privkey
  pubkey: string
}

export const initialThrowawayDetails: ThrowawayWallet = {
  mnemonic: '',
  pubkey: '',
}

export const initialAmountDetails: HeadstashAllocation = {
  address: '',
  headstash: [],
}

export const initialSigDetails: SigDetails = {
  message: '',
  signatureHash: null,
  address: '',
  timestamp: '',
}

export interface SigDetails {
  message: string
  signatureHash: any
  address: string
  timestamp: string
}

export type ClaimHeadstashModalProps = Pick<
  ModalProps,
  'onClose' | 'visible'
> & {
  throwawayWallet: DirectSecp256k1HdWallet | null
  // Uniquely identify the self-relay execution. This is likely a proposal
  // module address and proposal ID. This is used to cache the relayer mnemonic
  // locally in case something goes wrong during the process. It will try to
  // load the same mnemonic again if the user tries to self-relay and execute
  // the same unique ID.
  uniqueId: string
  // chain-id of
  chainId: string
  // Cross-chain packets that contain the packets that need self-relaying.
  crossChainPackets: CrossChainPacketInfo[]
  // Information on how to find the transaction to relay packets from.
  transaction: HeadstashClaimTransaction
  // Called when the self-relay execution is successful and all relayer wallets
  // refund the original wallet.
  onSuccess: () => void
}

export type HeadstashClaimTransaction =
  | {
      type: 'execute'
      // CosmWasm-formatted messages to execute that will create IBC packets
      // that need self-relaying.
      msgs: UnifiedCosmosMsg[]
    }
  | {
      type: 'exists'
      // The transaction hash of the transaction that created the IBC packets
      // that need self-relaying.
      hash: string
    }

export type SelfRelayBloomExecuteModalProps = Pick<
  ModalProps,
  'onClose' | 'visible'
> & {
  // Uniquely identify the self-relay execution. This is likely a
  // headstash contract and a ID. This is used to cache the relayer mnemonic
  // locally in case something goes wrong during the process. It will try to
  // load the same mnemonic again if the user tries to self-relay and execute
  // the same unique ID.
  uniqueId: string
  // All chain IDs that will receive an IBC packet.
  chainIds: string[]
  // Cross-chain packets that contain the packets that need self-relaying.
  crossChainPackets: CrossChainPacketInfo[]
  // Information on how to find the transaction to relay packets from.
  transaction: SelfRelayBloomTransaction
  // Called when the self-relay execution is successful and all relayer wallets
  // refund the original wallet.
  onSuccess: () => void
}

export type SelfRelayBloomTransaction =
  | {
      type: 'execute'
      // CosmWasm-formatted messages to execute that will create IBC packets
      // that need self-relaying.
      msgs: UnifiedCosmosMsg[]
    }
  | {
      type: 'exists'
      // The transaction hash of the transaction that created the IBC packets
      // that need self-relaying.
      hash: string
    }

export interface HeadstashAmountResponse {
  amount: string
}

export interface ProofsResponse {
  proofs: string[]
}
