/**
 * This file was automatically generated by @cosmwasm/ts-codegen@1.10.0.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import { Coin, StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import {
  Action,
  Binary,
  DistributionState,
  DistributionsResponse,
  EmissionRate,
  InfoResponse,
  MemberDiff,
  NftStakeChangedHookMsg,
  OwnershipForAddr,
  PendingRewardsResponse,
  StakeChangedHookMsg,
  Uint128,
  UncheckedDenom,
} from '@dao-dao/types/contracts/DaoRewardsDistributor'
import { CHAIN_GAS_MULTIPLIER } from '@dao-dao/utils'

export interface DaoRewardsDistributorReadOnlyInterface {
  contractAddress: string
  info: () => Promise<InfoResponse>
  ownership: () => Promise<OwnershipForAddr>
  pendingRewards: ({
    address,
    limit,
    startAfter,
  }: {
    address: string
    limit?: number
    startAfter?: number
  }) => Promise<PendingRewardsResponse>
  undistributedRewards: ({ id }: { id: number }) => Promise<Uint128>
  distribution: ({ id }: { id: number }) => Promise<DistributionState>
  distributions: ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: number
  }) => Promise<DistributionsResponse>
}
export class DaoRewardsDistributorQueryClient
  implements DaoRewardsDistributorReadOnlyInterface
{
  client: CosmWasmClient
  contractAddress: string
  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.info = this.info.bind(this)
    this.ownership = this.ownership.bind(this)
    this.pendingRewards = this.pendingRewards.bind(this)
    this.undistributedRewards = this.undistributedRewards.bind(this)
    this.distribution = this.distribution.bind(this)
    this.distributions = this.distributions.bind(this)
  }
  info = async (): Promise<InfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      info: {},
    })
  }
  ownership = async (): Promise<OwnershipForAddr> => {
    return this.client.queryContractSmart(this.contractAddress, {
      ownership: {},
    })
  }
  pendingRewards = async ({
    address,
    limit,
    startAfter,
  }: {
    address: string
    limit?: number
    startAfter?: number
  }): Promise<PendingRewardsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      pending_rewards: {
        address,
        limit,
        start_after: startAfter,
      },
    })
  }
  undistributedRewards = async ({ id }: { id: number }): Promise<Uint128> => {
    return this.client.queryContractSmart(this.contractAddress, {
      undistributed_rewards: {
        id,
      },
    })
  }
  distribution = async ({ id }: { id: number }): Promise<DistributionState> => {
    return this.client.queryContractSmart(this.contractAddress, {
      distribution: {
        id,
      },
    })
  }
  distributions = async ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: number
  }): Promise<DistributionsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      distributions: {
        limit,
        start_after: startAfter,
      },
    })
  }
}
export interface DaoRewardsDistributorInterface
  extends DaoRewardsDistributorReadOnlyInterface {
  contractAddress: string
  sender: string
  memberChangedHook: (
    {
      diffs,
    }: {
      diffs: MemberDiff[]
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  nftStakeChangeHook: (
    nftStakeChangedHookMsg: NftStakeChangedHookMsg,
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  stakeChangeHook: (
    stakeChangedHookMsg: StakeChangedHookMsg,
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  create: (
    {
      denom,
      emissionRate,
      hookCaller,
      openFunding,
      vpContract,
      withdrawDestination,
    }: {
      denom: UncheckedDenom
      emissionRate: EmissionRate
      hookCaller: string
      openFunding?: boolean
      vpContract: string
      withdrawDestination?: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  update: (
    {
      emissionRate,
      hookCaller,
      id,
      openFunding,
      vpContract,
      withdrawDestination,
    }: {
      emissionRate?: EmissionRate
      hookCaller?: string
      id: number
      openFunding?: boolean
      vpContract?: string
      withdrawDestination?: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  receive: (
    {
      amount,
      msg,
      sender,
    }: {
      amount: Uint128
      msg: Binary
      sender: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  fund: (
    {
      id,
    }: {
      id: number
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  fundLatest: (
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  claim: (
    {
      id,
    }: {
      id: number
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  withdraw: (
    {
      id,
    }: {
      id: number
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  updateOwnership: (
    action: Action,
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
}
export class DaoRewardsDistributorClient
  extends DaoRewardsDistributorQueryClient
  implements DaoRewardsDistributorInterface
{
  client: SigningCosmWasmClient
  sender: string
  contractAddress: string
  constructor(
    client: SigningCosmWasmClient,
    sender: string,
    contractAddress: string
  ) {
    super(client, contractAddress)
    this.client = client
    this.sender = sender
    this.contractAddress = contractAddress
    this.memberChangedHook = this.memberChangedHook.bind(this)
    this.nftStakeChangeHook = this.nftStakeChangeHook.bind(this)
    this.stakeChangeHook = this.stakeChangeHook.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.receive = this.receive.bind(this)
    this.fund = this.fund.bind(this)
    this.fundLatest = this.fundLatest.bind(this)
    this.claim = this.claim.bind(this)
    this.withdraw = this.withdraw.bind(this)
    this.updateOwnership = this.updateOwnership.bind(this)
  }
  memberChangedHook = async (
    {
      diffs,
    }: {
      diffs: MemberDiff[]
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        member_changed_hook: {
          diffs,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  nftStakeChangeHook = async (
    nftStakeChangedHookMsg: NftStakeChangedHookMsg,
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        nft_stake_change_hook: nftStakeChangedHookMsg,
      },
      fee,
      memo,
      _funds
    )
  }
  stakeChangeHook = async (
    stakeChangedHookMsg: StakeChangedHookMsg,
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        stake_change_hook: stakeChangedHookMsg,
      },
      fee,
      memo,
      _funds
    )
  }
  create = async (
    {
      denom,
      emissionRate,
      hookCaller,
      openFunding,
      vpContract,
      withdrawDestination,
    }: {
      denom: UncheckedDenom
      emissionRate: EmissionRate
      hookCaller: string
      openFunding?: boolean
      vpContract: string
      withdrawDestination?: string
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        create: {
          denom,
          emission_rate: emissionRate,
          hook_caller: hookCaller,
          open_funding: openFunding,
          vp_contract: vpContract,
          withdraw_destination: withdrawDestination,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  update = async (
    {
      emissionRate,
      hookCaller,
      id,
      openFunding,
      vpContract,
      withdrawDestination,
    }: {
      emissionRate?: EmissionRate
      hookCaller?: string
      id: number
      openFunding?: boolean
      vpContract?: string
      withdrawDestination?: string
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update: {
          emission_rate: emissionRate,
          hook_caller: hookCaller,
          id,
          open_funding: openFunding,
          vp_contract: vpContract,
          withdraw_destination: withdrawDestination,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  receive = async (
    {
      amount,
      msg,
      sender,
    }: {
      amount: Uint128
      msg: Binary
      sender: string
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        receive: {
          amount,
          msg,
          sender,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  fund = async (
    {
      id,
    }: {
      id: number
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        fund: {
          id,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  fundLatest = async (
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        fund_latest: {},
      },
      fee,
      memo,
      _funds
    )
  }
  claim = async (
    {
      id,
    }: {
      id: number
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        claim: {
          id,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  withdraw = async (
    {
      id,
    }: {
      id: number
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        withdraw: {
          id,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  updateOwnership = async (
    action: Action,
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_ownership: action,
      },
      fee,
      memo,
      _funds
    )
  }
}
