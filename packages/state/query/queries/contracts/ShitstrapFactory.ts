import { Coin, StdFee } from '@cosmjs/amino'
import { QueryClient, UseQueryOptions } from '@tanstack/react-query'

import {
  ArrayOfShitstrapContract,
  OwnershipForAddr,
  ShitstrapInstantiateMsg,
  Uint64,
} from '@dao-dao/types/contracts/ShitstrapFactory'
import { getCosmWasmClientForChainId } from '@dao-dao/utils'

import {
  ShitStrapFactoryClient,
  ShitStrapFactoryQueryClient,
} from '../../../contracts/ShitStrapFactory'
import { indexerQueries } from '../indexer'

export const shitStrapFactoryQueryKeys = {
  contract: [
    {
      contract: 'shitStrapFactory',
    },
  ] as const,
  address: (contractAddress: string) =>
    [
      {
        ...shitStrapFactoryQueryKeys.contract[0],
        address: contractAddress,
      },
    ] as const,
  listShitstrapContracts: (
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...shitStrapFactoryQueryKeys.address(contractAddress)[0],
        method: 'list_shitstrap_contracts',
        args,
      },
    ] as const,
  listShitstrapContractsReverse: (
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...shitStrapFactoryQueryKeys.address(contractAddress)[0],
        method: 'list_shitstrap_contracts_reverse',
        args,
      },
    ] as const,
  listShitstrapContractsByInstantiator: (
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...shitStrapFactoryQueryKeys.address(contractAddress)[0],
        method: 'list_shitstrap_contracts_by_instantiator',
        args,
      },
    ] as const,
  listShitstrapContractsByInstantiatorReverse: (
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...shitStrapFactoryQueryKeys.address(contractAddress)[0],
        method: 'list_shitstrap_contracts_by_instantiator_reverse',
        args,
      },
    ] as const,
  listShitstrapContractsByToken: (
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...shitStrapFactoryQueryKeys.address(contractAddress)[0],
        method: 'list_shitstrap_contracts_by_token',
        args,
      },
    ] as const,
  listShitstrapContractsByTokenReverse: (
    contractAddress: string,
    args?: Record<string, unknown>
  ) =>
    [
      {
        ...shitStrapFactoryQueryKeys.address(contractAddress)[0],
        method: 'list_shitstrap_contracts_by_token_reverse',
        args,
      },
    ] as const,
  ownership: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...shitStrapFactoryQueryKeys.address(contractAddress)[0],
        method: 'ownership',
        args,
      },
    ] as const,
  codeId: (contractAddress: string, args?: Record<string, unknown>) =>
    [
      {
        ...shitStrapFactoryQueryKeys.address(contractAddress)[0],
        method: 'code_id',
        args,
      },
    ] as const,
}
export const shitStrapFactoryQueries = {
  listShitstrapContracts: <TData = ArrayOfShitstrapContract>(
    queryClient: QueryClient,
    {
      chainId,
      contractAddress,
      args,
      options,
    }: ShitStrapFactoryListShitstrapContractsQuery<TData>
  ): UseQueryOptions<ArrayOfShitstrapContract, Error, TData> => ({
    queryKey: shitStrapFactoryQueryKeys.listShitstrapContracts(
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
            formula: 'cwShitstrapFactory/listShitstrapContracts',
            args,
          })
        )
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new ShitStrapFactoryQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).listShitstrapContracts({
        limit: args.limit,
        startAfter: args.startAfter,
      })
    },
    ...options,
    enabled:
      !!contractAddress &&
      (options?.enabled != undefined ? options.enabled : true),
  }),
  listShitstrapContractsReverse: <TData = ArrayOfShitstrapContract>(
    queryClient: QueryClient,
    {
      chainId,
      contractAddress,
      args,
      options,
    }: ShitStrapFactoryListShitstrapContractsReverseQuery<TData>
  ): UseQueryOptions<ArrayOfShitstrapContract, Error, TData> => ({
    queryKey: shitStrapFactoryQueryKeys.listShitstrapContractsReverse(
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
            formula: 'cwShitstrapFactory/listShitstrapContractsReverse',
            args,
          })
        )
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new ShitStrapFactoryQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).listShitstrapContractsReverse({
        limit: args.limit,
        startBefore: args.startBefore,
      })
    },
    ...options,
    enabled:
      !!contractAddress &&
      (options?.enabled != undefined ? options.enabled : true),
  }),
  listShitstrapContractsByInstantiator: <TData = ArrayOfShitstrapContract>(
    queryClient: QueryClient,
    {
      chainId,
      contractAddress,
      args,
      options,
    }: ShitStrapFactoryListShitstrapContractsByInstantiatorQuery<TData>
  ): UseQueryOptions<ArrayOfShitstrapContract, Error, TData> => ({
    queryKey: shitStrapFactoryQueryKeys.listShitstrapContractsByInstantiator(
      contractAddress,
      args
    ),
    queryFn: async () => {
      // try {
      //   // Attempt to fetch data from the indexer.
      //   return await queryClient.fetchQuery(
      //     indexerQueries.queryContract(queryClient, {
      //       chainId,
      //       contractAddress,
      //       formula: 'cwShitstrapFactory/listShitstrapContractsByInstantiator',
      //       args,
      //     })
      //   )
      // } catch (error) {
      //   console.error(error)
      // }

      // If indexer query fails, fallback to contract query.
      let contractQuery = new ShitStrapFactoryQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).listShitstrapContractsByInstantiator({
        instantiator: args.instantiator,
        limit: args.limit,
        startAfter: args.startAfter,
      })
      console.log(contractQuery)
      return contractQuery
    },
    ...options,
    enabled:
      !!contractAddress &&
      (options?.enabled != undefined ? options.enabled : true),
  }),
  listShitstrapContractsByInstantiatorReverse: <
    TData = ArrayOfShitstrapContract
  >(
    queryClient: QueryClient,
    {
      chainId,
      contractAddress,
      args,
      options,
    }: ShitStrapFactoryListShitstrapContractsByInstantiatorReverseQuery<TData>
  ): UseQueryOptions<ArrayOfShitstrapContract, Error, TData> => ({
    queryKey:
      shitStrapFactoryQueryKeys.listShitstrapContractsByInstantiatorReverse(
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
            formula:
              'cwShitstrapFactory/listShitstrapContractsByInstantiatorReverse',
            args,
          })
        )
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new ShitStrapFactoryQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).listShitstrapContractsByInstantiatorReverse({
        instantiator: args.instantiator,
        limit: args.limit,
        startBefore: args.startBefore,
      })
    },
    ...options,
    enabled:
      !!contractAddress &&
      (options?.enabled != undefined ? options.enabled : true),
  }),
  listShitstrapContractsByToken: <TData = ArrayOfShitstrapContract>(
    queryClient: QueryClient,
    {
      chainId,
      contractAddress,
      args,
      options,
    }: ShitStrapFactoryListShitstrapContractsByTokenQuery<TData>
  ): UseQueryOptions<ArrayOfShitstrapContract, Error, TData> => ({
    queryKey: shitStrapFactoryQueryKeys.listShitstrapContractsByToken(
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
            formula: 'cwShitstrapFactory/listShitstrapContractsByToken',
            args,
          })
        )
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new ShitStrapFactoryQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).listShitstrapContractsByToken({
        limit: args.limit,
        recipient: args.recipient,
        startAfter: args.startAfter,
      })
    },
    ...options,
    enabled:
      !!contractAddress &&
      (options?.enabled != undefined ? options.enabled : true),
  }),
  listShitstrapContractsByTokenReverse: <TData = ArrayOfShitstrapContract>(
    queryClient: QueryClient,
    {
      chainId,
      contractAddress,
      args,
      options,
    }: ShitStrapFactoryListShitstrapContractsByTokenReverseQuery<TData>
  ): UseQueryOptions<ArrayOfShitstrapContract, Error, TData> => ({
    queryKey: shitStrapFactoryQueryKeys.listShitstrapContractsByTokenReverse(
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
            formula: 'cwShitstrapFactory/listShitstrapContractsByTokenReverse',
            args,
          })
        )
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new ShitStrapFactoryQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).listShitstrapContractsByTokenReverse({
        limit: args.limit,
        recipient: args.recipient,
        startBefore: args.startBefore,
      })
    },
    ...options,
    enabled:
      !!contractAddress &&
      (options?.enabled != undefined ? options.enabled : true),
  }),
  ownership: <TData = OwnershipForAddr>(
    queryClient: QueryClient,
    { chainId, contractAddress, options }: ShitStrapFactoryOwnershipQuery<TData>
  ): UseQueryOptions<OwnershipForAddr, Error, TData> => ({
    queryKey: shitStrapFactoryQueryKeys.ownership(contractAddress),
    queryFn: async () => {
      try {
        // Attempt to fetch data from the indexer.
        return await queryClient.fetchQuery(
          indexerQueries.queryContract(queryClient, {
            chainId,
            contractAddress,
            formula: 'cwPayrollFactory/ownership',
          })
        )
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new ShitStrapFactoryQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).ownership()
    },
    ...options,
    enabled:
      !!contractAddress &&
      (options?.enabled != undefined ? options.enabled : true),
  }),
  codeId: <TData = Uint64>(
    queryClient: QueryClient,
    { chainId, contractAddress, options }: ShitStrapFactoryCodeIdQuery<TData>
  ): UseQueryOptions<Uint64, Error, TData> => ({
    queryKey: shitStrapFactoryQueryKeys.codeId(contractAddress),
    queryFn: async () => {
      try {
        // Attempt to fetch data from the indexer.
        return await queryClient.fetchQuery(
          indexerQueries.queryContract(queryClient, {
            chainId,
            contractAddress,
            formula: 'cwPayrollFactory/codeId',
          })
        )
      } catch (error) {
        console.error(error)
      }

      // If indexer query fails, fallback to contract query.
      return new ShitStrapFactoryQueryClient(
        await getCosmWasmClientForChainId(chainId),
        contractAddress
      ).codeId()
    },
    ...options,
    enabled:
      !!contractAddress &&
      (options?.enabled != undefined ? options.enabled : true),
  }),
}
export interface ShitStrapFactoryReactQuery<TResponse, TData = TResponse> {
  chainId: string
  contractAddress: string
  options?: Omit<
    UseQueryOptions<TResponse, Error, TData>,
    "'queryKey' | 'queryFn' | 'initialData'"
  > & {
    initialData?: undefined
  }
}
export interface ShitStrapFactoryCodeIdQuery<TData>
  extends ShitStrapFactoryReactQuery<Uint64, TData> {}
export interface ShitStrapFactoryOwnershipQuery<TData>
  extends ShitStrapFactoryReactQuery<OwnershipForAddr, TData> {}
export interface ShitStrapFactoryListShitstrapContractsByTokenReverseQuery<
  TData
> extends ShitStrapFactoryReactQuery<ArrayOfShitstrapContract, TData> {
  args: {
    limit?: number
    recipient: string
    startBefore?: string
  }
}
export interface ShitStrapFactoryListShitstrapContractsByTokenQuery<TData>
  extends ShitStrapFactoryReactQuery<ArrayOfShitstrapContract, TData> {
  args: {
    limit?: number
    recipient: string
    startAfter?: string
  }
}
export interface ShitStrapFactoryListShitstrapContractsByInstantiatorReverseQuery<
  TData
> extends ShitStrapFactoryReactQuery<ArrayOfShitstrapContract, TData> {
  args: {
    instantiator: string
    limit?: number
    startBefore?: string
  }
}
export interface ShitStrapFactoryListShitstrapContractsByInstantiatorQuery<
  TData
> extends ShitStrapFactoryReactQuery<ArrayOfShitstrapContract, TData> {
  args: {
    instantiator: string
    limit?: number
    startAfter?: string
  }
}
export interface ShitStrapFactoryListShitstrapContractsReverseQuery<TData>
  extends ShitStrapFactoryReactQuery<ArrayOfShitstrapContract, TData> {
  args: {
    limit?: number
    startBefore?: string
  }
}
export interface ShitStrapFactoryListShitstrapContractsQuery<TData>
  extends ShitStrapFactoryReactQuery<ArrayOfShitstrapContract, TData> {
  args: {
    limit?: number
    startAfter?: string
  }
}
export interface ShitStrapFactoryUpdateOwnershipMutation {
  client: ShitStrapFactoryClient
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}

export interface ShitStrapFactoryUpdateCodeIdMutation {
  client: ShitStrapFactoryClient
  msg: {
    shitstrapCodeId: number
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}

export interface ShitStrapFactoryCreateNativeShitStrapContractMutation {
  client: ShitStrapFactoryClient
  msg: {
    instantiateMsg: ShitstrapInstantiateMsg
    label: string
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
