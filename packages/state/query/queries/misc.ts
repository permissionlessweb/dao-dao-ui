import { QueryClient } from '@tanstack/react-query'

import { DaoDaoIndexerAllStats, DaoDaoIndexerChainStats } from '@dao-dao/types'
import { chainIsIndexed, getSupportedChains, retry } from '@dao-dao/utils'

import { indexerQueries } from './indexer'

/**
 * Fetch home page stats.
 */
export const fetchHomePageStats = async (
  queryClient: QueryClient,
  {
    chainId,
  }: {
    /**
     * Chain ID to fetch stats for. If undefined, fetch stats for all chains.
     */
    chainId?: string
  }
): Promise<DaoDaoIndexerAllStats> => {
  const [tvl, all, month, week] = await Promise.all([
    // Get all or chain-specific stats and TVL.
    !chainId || chainIsIndexed(chainId)
      ? retry(5, () =>
          queryClient.fetchQuery(
            indexerQueries.snapper<number>({
              query: chainId ? 'daodao-chain-tvl' : 'daodao-all-tvl',
              parameters: chainId ? { chainId } : undefined,
            })
          )
        ).catch(() => 0)
      : null,
    !chainId || chainIsIndexed(chainId)
      ? retry(5, () =>
          queryClient.fetchQuery(
            indexerQueries.snapper<DaoDaoIndexerChainStats>({
              query: chainId ? 'daodao-chain-stats' : 'daodao-all-stats',
              parameters: chainId ? { chainId } : undefined,
            })
          )
        )
      : null,
    !chainId || chainIsIndexed(chainId)
      ? retry(5, () =>
          queryClient.fetchQuery(
            indexerQueries.snapper<DaoDaoIndexerChainStats>({
              query: chainId ? 'daodao-chain-stats' : 'daodao-all-stats',
              parameters: {
                ...(chainId ? { chainId } : undefined),
                daysAgo: 30,
              },
            })
          )
        )
      : null,
    !chainId || chainIsIndexed(chainId)
      ? retry(5, () =>
          queryClient.fetchQuery(
            indexerQueries.snapper<DaoDaoIndexerChainStats>({
              query: chainId ? 'daodao-chain-stats' : 'daodao-all-stats',
              parameters: {
                ...(chainId ? { chainId } : undefined),
                daysAgo: 7,
              },
            })
          )
        )
      : null,
  ])

  return {
    all,
    month,
    week,
    tvl,
    chains: chainId ? 1 : getSupportedChains().length,
  }
}

export const miscQueries = {
  /**
   * Fetch home page stats.
   */
  homePageStats: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchHomePageStats>[1]
  ) => ({
    queryKey: ['misc', 'homePageStats', options],
    queryFn: () => fetchHomePageStats(queryClient, options),
  }),
}
