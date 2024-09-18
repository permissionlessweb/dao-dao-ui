/**
 * This file was automatically generated by @cosmwasm/ts-codegen@1.10.0.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import { QueryClient, UseQueryOptions } from '@tanstack/react-query'

import {
  ActiveThresholdResponse,
  Addr,
  ArrayOfString,
  Boolean,
  Config,
  HooksResponse,
  InfoResponse,
  NftClaimsResponse,
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoVotingCw721Staked'
import { getCosmWasmClientForChainId } from '@dao-dao/utils'

import { DaoVotingCw721StakedQueryClient } from '../../../contracts/DaoVotingCw721Staked'
import { contractQueries } from '../contract'
import { indexerQueries } from '../indexer'

export const daoVotingCw721StakedQueryKeys = {
  contract: [
    {
      contract: 'daoVotingCw721Staked',
    },
  ] as const,
  address: (chainId: string, contractAddress: string) =>
    [
      {
        ...daoVotingCw721StakedQueryKeys.contract[0],
        chainId,
        address: contractAddress,
      },
    ] as const,
  config: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...daoVotingCw721StakedQueryKeys.address(chainId, contractAddress)[0],
        method: 'config',
        args,
      },
    ] as const,
  nftClaims: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...daoVotingCw721StakedQueryKeys.address(chainId, contractAddress)[0],
        method: 'nft_claims',
        args,
      },
    ] as const,
  hooks: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...daoVotingCw721StakedQueryKeys.address(chainId, contractAddress)[0],
        method: 'hooks',
        args,
      },
    ] as const,
  stakedNfts: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...daoVotingCw721StakedQueryKeys.address(chainId, contractAddress)[0],
        method: 'staked_nfts',
        args,
      },
    ] as const,
  activeThreshold: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...daoVotingCw721StakedQueryKeys.address(chainId, contractAddress)[0],
        method: 'active_threshold',
        args,
      },
    ] as const,
  isActive: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...daoVotingCw721StakedQueryKeys.address(chainId, contractAddress)[0],
        method: 'is_active',
        args,
      },
    ] as const,
  votingPowerAtHeight: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...daoVotingCw721StakedQueryKeys.address(chainId, contractAddress)[0],
        method: 'voting_power_at_height',
        args,
      },
    ] as const,
  totalPowerAtHeight: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...daoVotingCw721StakedQueryKeys.address(chainId, contractAddress)[0],
        method: 'total_power_at_height',
        args,
      },
    ] as const,
  dao: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...daoVotingCw721StakedQueryKeys.address(chainId, contractAddress)[0],
        method: 'dao',
        args,
      },
    ] as const,
  info: (
    chainId: string,
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...daoVotingCw721StakedQueryKeys.address(chainId, contractAddress)[0],
        method: 'info',
        args,
      },
    ] as const,
}
export const daoVotingCw721StakedQueries = {
  config: <TData = Config>(
    queryClient: QueryClient,
    {
      chainId,
      contractAddress,
      options,
    }: DaoVotingCw721StakedConfigQuery<TData>
  ): UseQueryOptions<Config, Error, TData> => ({
    queryKey: daoVotingCw721StakedQueryKeys.config(chainId, contractAddress),
    queryFn: async () => {
      try {
        // Attempt to fetch data from the indexer.
        return await queryClient.fetchQuery(
          indexerQueries.queryContract(queryClient, {
            chainId,
            contractAddress,
            formula: 'daoVotingCw721Staked/config',
          })
        )
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new DaoVotingCw721StakedQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).config()
    },
    ...options,
  }),
  nftClaims: <TData = NftClaimsResponse>(
    queryClient: QueryClient,
    {
      chainId,
      contractAddress,
      args,
      options,
    }: DaoVotingCw721StakedNftClaimsQuery<TData>
  ): UseQueryOptions<NftClaimsResponse, Error, TData> => ({
    queryKey: daoVotingCw721StakedQueryKeys.nftClaims(
      chainId,
      contractAddress,
      args
    ),
    queryFn: async () => {
      try {
        // Attempt to fetch data from the indexer.
        return {
          nft_claims: await queryClient.fetchQuery(
            indexerQueries.queryContract(queryClient, {
              chainId,
              contractAddress,
              formula: 'daoVotingCw721Staked/nftClaims',
              args,
            })
          ),
        }
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new DaoVotingCw721StakedQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).nftClaims({
        address: args.address,
      })
    },
    ...options,
  }),
  hooks: <TData = HooksResponse>(
    queryClient: QueryClient,
    { chainId, contractAddress, options }: DaoVotingCw721StakedHooksQuery<TData>
  ): UseQueryOptions<HooksResponse, Error, TData> => ({
    queryKey: daoVotingCw721StakedQueryKeys.hooks(chainId, contractAddress),
    queryFn: async () => {
      try {
        // Attempt to fetch data from the indexer.
        return await queryClient.fetchQuery(
          indexerQueries.queryContract(queryClient, {
            chainId,
            contractAddress,
            formula: 'daoVotingCw721Staked/hooks',
          })
        )
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new DaoVotingCw721StakedQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).hooks()
    },
    ...options,
  }),
  stakedNfts: <TData = ArrayOfString>(
    queryClient: QueryClient,
    {
      chainId,
      contractAddress,
      args,
      options,
    }: DaoVotingCw721StakedStakedNftsQuery<TData>
  ): UseQueryOptions<ArrayOfString, Error, TData> => ({
    queryKey: daoVotingCw721StakedQueryKeys.stakedNfts(
      chainId,
      contractAddress,
      args
    ),
    queryFn: async () => {
      try {
        // Attempt to fetch data from the indexer.
        return await queryClient.fetchQuery(
          indexerQueries.queryContract(queryClient, {
            chainId,
            contractAddress,
            formula: 'daoVotingCw721Staked/stakedNfts',
            args,
          })
        )
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new DaoVotingCw721StakedQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).stakedNfts({
        address: args.address,
        limit: args.limit,
        startAfter: args.startAfter,
      })
    },
    ...options,
  }),
  activeThreshold: <TData = ActiveThresholdResponse>(
    queryClient: QueryClient,
    {
      chainId,
      contractAddress,
      options,
    }: DaoVotingCw721StakedActiveThresholdQuery<TData>
  ): UseQueryOptions<ActiveThresholdResponse, Error, TData> => ({
    queryKey: daoVotingCw721StakedQueryKeys.activeThreshold(
      chainId,
      contractAddress
    ),
    queryFn: async () => {
      try {
        // Attempt to fetch data from the indexer.
        return {
          active_threshold: await queryClient.fetchQuery(
            indexerQueries.queryContract(queryClient, {
              chainId,
              contractAddress,
              formula: 'daoVotingCw721Staked/activeThreshold',
            })
          ),
        }
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new DaoVotingCw721StakedQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).activeThreshold()
    },
    ...options,
  }),
  isActive: <TData = Boolean>({
    chainId,
    contractAddress,
    options,
  }: DaoVotingCw721StakedIsActiveQuery<TData>): UseQueryOptions<
    Boolean,
    Error,
    TData
  > => ({
    queryKey: daoVotingCw721StakedQueryKeys.isActive(chainId, contractAddress),
    queryFn: async () => {
      return new DaoVotingCw721StakedQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).isActive()
    },
    ...options,
  }),
  votingPowerAtHeight: <TData = VotingPowerAtHeightResponse>(
    queryClient: QueryClient,
    {
      chainId,
      contractAddress,
      args,
      options,
    }: DaoVotingCw721StakedVotingPowerAtHeightQuery<TData>
  ): UseQueryOptions<VotingPowerAtHeightResponse, Error, TData> => ({
    queryKey: daoVotingCw721StakedQueryKeys.votingPowerAtHeight(
      chainId,
      contractAddress,
      args
    ),
    queryFn: async () => {
      try {
        // Attempt to fetch data from the indexer.
        return await queryClient.fetchQuery(
          indexerQueries.queryContract(queryClient, {
            chainId,
            contractAddress,
            formula: 'daoVotingCw721Staked/votingPowerAtHeight',
            args: {
              address: args.address,
            },
            ...(args.height && { block: { height: args.height } }),
          })
        )
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new DaoVotingCw721StakedQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).votingPowerAtHeight({
        address: args.address,
        height: args.height,
      })
    },
    ...options,
  }),
  totalPowerAtHeight: <TData = TotalPowerAtHeightResponse>(
    queryClient: QueryClient,
    {
      chainId,
      contractAddress,
      args,
      options,
    }: DaoVotingCw721StakedTotalPowerAtHeightQuery<TData>
  ): UseQueryOptions<TotalPowerAtHeightResponse, Error, TData> => ({
    queryKey: daoVotingCw721StakedQueryKeys.totalPowerAtHeight(
      chainId,
      contractAddress,
      args
    ),
    queryFn: async () => {
      try {
        // Attempt to fetch data from the indexer.
        return await queryClient.fetchQuery(
          indexerQueries.queryContract(queryClient, {
            chainId,
            contractAddress,
            formula: 'daoVotingCw721Staked/totalPowerAtHeight',
            ...(args.height && { block: { height: args.height } }),
          })
        )
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new DaoVotingCw721StakedQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).totalPowerAtHeight({
        height: args.height,
      })
    },
    ...options,
  }),
  dao: <TData = Addr>(
    queryClient: QueryClient,
    { chainId, contractAddress, options }: DaoVotingCw721StakedDaoQuery<TData>
  ): UseQueryOptions<Addr, Error, TData> => ({
    queryKey: daoVotingCw721StakedQueryKeys.dao(chainId, contractAddress),
    queryFn: async () => {
      try {
        // Attempt to fetch data from the indexer.
        return await queryClient.fetchQuery(
          indexerQueries.queryContract(queryClient, {
            chainId,
            contractAddress,
            formula: 'daoVotingCw721Staked/dao',
          })
        )
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new DaoVotingCw721StakedQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).dao()
    },
    ...options,
  }),
  info: contractQueries.info,
}
export interface DaoVotingCw721StakedReactQuery<TResponse, TData = TResponse> {
  chainId: string
  contractAddress: string
  options?: Omit<
    UseQueryOptions<TResponse, Error, TData>,
    'queryKey' | 'queryFn' | 'initialData'
  > & {
    initialData?: undefined
  }
}
export interface DaoVotingCw721StakedInfoQuery<TData>
  extends DaoVotingCw721StakedReactQuery<InfoResponse, TData> {}
export interface DaoVotingCw721StakedDaoQuery<TData>
  extends DaoVotingCw721StakedReactQuery<Addr, TData> {}
export interface DaoVotingCw721StakedTotalPowerAtHeightQuery<TData>
  extends DaoVotingCw721StakedReactQuery<TotalPowerAtHeightResponse, TData> {
  args: {
    height?: number
  }
}
export interface DaoVotingCw721StakedVotingPowerAtHeightQuery<TData>
  extends DaoVotingCw721StakedReactQuery<VotingPowerAtHeightResponse, TData> {
  args: {
    address: string
    height?: number
  }
}
export interface DaoVotingCw721StakedIsActiveQuery<TData>
  extends DaoVotingCw721StakedReactQuery<Boolean, TData> {}
export interface DaoVotingCw721StakedActiveThresholdQuery<TData>
  extends DaoVotingCw721StakedReactQuery<ActiveThresholdResponse, TData> {}
export interface DaoVotingCw721StakedStakedNftsQuery<TData>
  extends DaoVotingCw721StakedReactQuery<ArrayOfString, TData> {
  args: {
    address: string
    limit?: number
    startAfter?: string
  }
}
export interface DaoVotingCw721StakedHooksQuery<TData>
  extends DaoVotingCw721StakedReactQuery<HooksResponse, TData> {}
export interface DaoVotingCw721StakedNftClaimsQuery<TData>
  extends DaoVotingCw721StakedReactQuery<NftClaimsResponse, TData> {
  args: {
    address: string
  }
}
export interface DaoVotingCw721StakedConfigQuery<TData>
  extends DaoVotingCw721StakedReactQuery<Config, TData> {}
