import { QueryClient, queryOptions } from '@tanstack/react-query'

import { ArrayOfVestingContract } from '@dao-dao/types/contracts/CwPayrollFactory'

import { indexerQueries } from '../indexer'
import { cwPayrollFactoryQueries } from './CwPayrollFactory'
import { ArrayOfAvEventContract } from '@dao-dao/types/contracts/CwAveFactory'
import { cwAveFactoryQueries } from './CwAveFactory'

/**
 * List all vesting contracts.
 */
export const listAllAveContracts = async (
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
    contracts: ArrayOfAvEventContract
}> => {
    try {
        const list: ArrayOfAvEventContract = await queryClient.fetchQuery(
            indexerQueries.queryContract(queryClient, {
                chainId,
                contractAddress: address,
                formula: 'cwAveFactory/listAveContracts',
            })
        )
        if (list && Array.isArray(list)) {
            return {
                chainId,
                contracts: list,
            }
        }
    } catch (err) {
        console.error(err)
    }

    // If indexer query fails, fallback to contract queries.
    const aveContracts: ArrayOfAvEventContract = []
    const limit = 30
    while (true) {
        const response = await queryClient.fetchQuery(
            cwAveFactoryQueries.listAvEventContracts(queryClient, {
                chainId,
                contractAddress: address,
                args: {
                    startAfter: aveContracts[aveContracts.length - 1]?.contract,
                    limit,
                },
            })
        )

        if (!response?.length) {
            break
        }

        aveContracts.push(...response)

        // If we have less than the limit of items, we've exhausted them.
        if (response.length < limit) {
            break
        }
    }

    return {
        chainId,
        contracts: aveContracts,
    }
}

export const cwAveFactoryExtraQueries = {
    /**
     * List all vesting contracts.
     */
    listAllAveContracts: (
        queryClient: QueryClient,
        options: Parameters<typeof listAllAveContracts>[1]
    ) =>
        queryOptions({
            queryKey: ['cwAveFactoryExtra', 'listAllAveContracts', options],
            queryFn: () => listAllAveContracts(queryClient, options),
        }),
}
