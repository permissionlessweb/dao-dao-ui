import { QueryClient, queryOptions } from '@tanstack/react-query'

import { ArrayOfShitstrapContract } from '@dao-dao/types/contracts/ShitstrapFactory'

import { indexerQueries } from '../indexer'
import { cwPayrollFactoryQueries } from './CwPayrollFactory'
import { shitStrapFactoryQueries } from './ShitstrapFactory'


/**
 * List all vesting contracts.
**/
export const listAllShitstrapContracts = async (
  queryClient: QueryClient,
  {
    chainId,
    address,

  }: {
    chainId: string
    address: string
  }
): Promise<{
  chainId: string
  contracts: ArrayOfShitstrapContract
}> => {
  // try {
  //   const list: ArrayOfShitstrapContract = await queryClient.fetchQuery(
  //     indexerQueries.queryContract(queryClient, {
  //       chainId,
  //       contractAddress: address,
  //       formula: 'cwPayrollFactory/listVestingContracts',
  //     })
  //   )
  //   if (list && Array.isArray(list)) {
  //     return {
  //       chainId,
  //       contracts: list,
  //     }
  //   }
  // } catch (err) {
  //   console.error(err)
  // }

  // If indexer query fails, fallback to contract queries.
  const defaultSEZShitstrapFactoryContractAddress = 'osmo1dv9hjuxaxwzgj8m7memnvzu5t2tsnkuafqdjv3vl4g6snxefkwfqkt0gy3';
  const shistrapContracts: ArrayOfShitstrapContract = []
  const limit = 30
  while (true) {
    const response = await queryClient.fetchQuery(
      shitStrapFactoryQueries.listShitstrapContracts(queryClient, {
        chainId,
        contractAddress: defaultSEZShitstrapFactoryContractAddress,
        args: {
          startAfter: shistrapContracts[shistrapContracts.length - 1]?.contract,
          limit,
        },
      })
    )

    if (!response?.length) {
      break
    }

    shistrapContracts.push(...response)

    // If we have less than the limit of items, we've exhausted them.
    if (response.length < limit) {
      break
    }
  }

  return {
    chainId,
    contracts: shistrapContracts,
  }
}
/**
 * List all vesting contracts by instanitater addr
 */
export const listAllShitstrapContractsByInstantiator = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
    instantiator,
  }: {
    chainId: string
    address: string
    instantiator: string
  }
): Promise<{
  chainId: string
  contracts: ArrayOfShitstrapContract
}> => {
  // try {
  //   const list: ArrayOfShitstrapContract = await queryClient.fetchQuery(
  //     indexerQueries.queryContract(queryClient, {
  //       chainId,
  //       contractAddress: address,
  //       formula: 'cwShitstrapFactory/listShitstrapContractsByInstantiator',
  //     })
  //   )
  //   if (list && Array.isArray(list)) {
  //     return {
  //       chainId,
  //       contracts: list,
  //     }
  //   }
  // } catch (err) {
  //   console.error(err)
  // }

  // If indexer query fails, fallback to contract queries.
  const shistrapContracts: ArrayOfShitstrapContract = []
  const limit = 30
  while (true) {
    const defaultSEZShitstrapFactoryContractAddress = 'osmo1dv9hjuxaxwzgj8m7memnvzu5t2tsnkuafqdjv3vl4g6snxefkwfqkt0gy3';
    const response = await queryClient.fetchQuery(
      shitStrapFactoryQueries.listShitstrapContractsByInstantiator(queryClient, {
        chainId,
        contractAddress: defaultSEZShitstrapFactoryContractAddress,
        args: {
          instantiator,
          startAfter: shistrapContracts[shistrapContracts.length - 1]?.contract,
          limit,
        },
      })
    )

    console.log(response)

    if (!response?.length) {
      break
    }

    shistrapContracts.push(...response)

    // If we have less than the limit of items, we've exhausted them.
    if (response.length < limit) {
      break
    }
  }

  return {
    chainId,
    contracts: shistrapContracts,
  }
}

export const cwShitstrapFactoriesExtraQuery = {
  /**
   * List all shitstrap contracts.
   */
  listAllShitstrapContracts: (
    queryClient: QueryClient,
    options: Parameters<typeof listAllShitstrapContracts>[1]
  ) =>
    queryOptions({
      queryKey: ['cwShitstrapFactoryExtra', 'listAllShitstrapContracts', options],
      queryFn: () => listAllShitstrapContracts(queryClient, options),
    }),
  /**
   * List all shitstrap contracts by instantiator address.
   */
  listAllShitstrapContractsByInstantiator: (
    queryClient: QueryClient,
    options: Parameters<typeof listAllShitstrapContractsByInstantiator>[1]
  ) =>
    queryOptions({
      queryKey: ['cwShitstrapFactoryExtra', 'listAllShitstrapContractsByInstantiator', options],
      queryFn: () => listAllShitstrapContractsByInstantiator(queryClient, options),
    }),
}
