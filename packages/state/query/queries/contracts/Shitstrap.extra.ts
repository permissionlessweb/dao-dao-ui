import { QueryClient, queryOptions } from '@tanstack/react-query'

import { GenericToken, TokenType } from '@dao-dao/types'
import { ShitstrapInfo, ShitstrapInfoGeneric } from '@dao-dao/types/contracts/ShitStrap'

import { shitStrapQueries } from './ShitStrap'
import { tokenQueries } from '../token'

/**
 * Fetch info for a shitstrap contract
 */
export const fetchShitstrapInfo = async (
  queryClient: QueryClient,
  {
    chainId,
    contractAddress,
  }: {
    chainId: string
    contractAddress: string
  }
): Promise<ShitstrapInfoGeneric> => {
  const [config] = await Promise.all(
    [
      queryClient
        .fetchQuery(
          shitStrapQueries.config(queryClient, {
            chainId,
            contractAddress,
          })
        )
        .then(async (config) => {
          config.accepted

          return config
        }),
    ])
  const [shiit] = await Promise.all(
    [
      queryClient
        .fetchQuery(
          tokenQueries.info(queryClient, {
            chainId,
            type: config.shitmos_addr ? 'native' in config.shitmos_addr ? TokenType.Native : 'cw20' in config.shitmos_addr ? TokenType.Cw20 : TokenType.Native : TokenType.Native,
            denomOrAddress:
              'native' in config.shitmos_addr
                ? config.shitmos_addr.native
                : config.shitmos_addr.cw20,
          })
        )
      // .then(async (config) => {
      //   return config
      // }),
    ])
  const acceptedShiit = await Promise.all(
    config.accepted.map((ps) =>
      queryClient.fetchQuery(
        tokenQueries.info(queryClient, {
          chainId,
          type: typeof ps.token == 'object' ? 'native' in ps.token ? TokenType.Native : 'cw20' in ps.token ? TokenType.Cw20 : TokenType.Native : TokenType.Native,
          denomOrAddress: typeof ps.token == 'object' ? 'native' in ps.token ? ps.token.native : ps.token.cw20 : ps.token,
        })
      )
    )
  );

  return {
    title: config.title,
    description: config.description,
    owner: config.owner,
    chainId,
    shitstrapContractAddr: contractAddress,
    possibleShit: config.accepted.map((a) => {
      const token = typeof a.token == 'object' ? 'native' in a.token ? a.token.native : a.token.cw20 : a.token
      let match = acceptedShiit.filter((as) => {
        return as.denomOrAddress === token
      }).map((as) => ({ ...as, shit_rate: a.shit_rate }))

      return match
    }).flat(),
    shit: shiit,
    full: config.full_of_shit,
    cutoff: config.cutoff,
  }
}

export const cwShitstrapExtraQueries = {
  /**
   * Fetch info for a shitstrap contract.
   **/
  info: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchShitstrapInfo>[1]
  ) =>
    queryOptions({
      queryKey: ['cwShitStrapExtra', 'fetchShitstrapInfo', options],
      queryFn: () => fetchShitstrapInfo(queryClient, options),
    }),
}
