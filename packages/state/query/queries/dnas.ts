import {
  QueryClient,
  UseQueryOptions,
  queryOptions,
  skipToken,
} from '@tanstack/react-query'

import {
  ChainId,
  FetchedDaoKeys,
  PfpkProfile,
  ResolvedProfile,
  UnifiedProfile,
} from '@dao-dao/types'
import {
  DNAS_API_BASE,
  MAINNET,
  PFPK_API_BASE,
  STARGAZE_NAMES_CONTRACT,
  getChainForChainId,
  getCosmWasmClientForChainId,
  imageUrlFromStargazeIndexerNft,
  makeEmptyDnasApiKeys,
  makeEmptyPfpkProfile,
  // makeEmptydnasProfile,
  makeEmptyUnifiedProfile,
  processError,
  toBech32Hash,
  transformBech32Address,
} from '@dao-dao/utils'

import { stargazeIndexerClient, stargazeTokenQuery } from '../../graphql'

/**
 * Fetch unified profile information for any wallet.
 */
export const fetchDnasProfileInfo = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<UnifiedProfile> => {
  const profile = makeEmptyUnifiedProfile(chainId, address, true)
  if (!address) {
    return profile
  }

  console.log("hitting dnasProfile query...")
  const dnasProfile = await queryClient.fetchQuery(
    dnasQueries.dnasProfile({
      address,
    })
  )
  // Copy PFPK profile info into unified profile.
  profile.uuid = dnasProfile.uuid
  profile.nonce = dnasProfile.nonce
  profile.name = dnasProfile.name
  profile.nft = dnasProfile.nft
  profile.chains = dnasProfile.chains

  // Use profile address for Stargaze if set, falling back to transforming the
  // address (which is unreliable due to different chains using different HD
  // paths).
  // const stargazeAddress =
  //   profile.chains[ChainId.StargazeMainnet]?.address ||
  //   transformBech32Address(address, ChainId.StargazeMainnet)

  // Load Stargaze name as backup if no PFPK name set.
  // if (!profile.name) {
  //   const stargazeName = await queryClient
  //     .fetchQuery(
  //       dnasQueries.stargazeName({
  //         address: stargazeAddress,
  //       })
  //     )
  //     .catch(() => null)
  //   if (stargazeName) {
  //     profile.name =
  //       stargazeName + '.' + getChainForChainId(chainId).bech32Prefix
  //     profile.nameSource = 'stargaze'
  //   }
  // }

  // Set `imageUrl` to PFPK image, defaulting to fallback image.
  // profile.imageUrl = dnasProfile?.nft?.imageUrl || profile.backupImageUrl

  // // Load Stargaze name image if no PFPK image.
  // if (!dnasProfile?.nft?.imageUrl) {
  //   const stargazeNameImage = await queryClient
  //     .fetchQuery(
  //       dnasQueries.stargazeNameImage(queryClient, {
  //         address: stargazeAddress,
  //       })
  //     )
  //     .catch(() => null)
  //   if (stargazeNameImage) {
  //     profile.imageUrl = stargazeNameImage
  //   }
  // }

  return profile
}

/**
 * Fetch DNAS key information for any DAO.
 */
export const fetchAllDnasApiKeyInfoByDao = async ({
  bech32Hash,
}: {
  bech32Hash: string
}): Promise<FetchedDaoKeys> => {
  if (!bech32Hash) {
    return makeEmptyDnasApiKeys()
  }

  try {
    const response = await fetch('http://localhost:58229' + `/daoKeys/bech32/${bech32Hash}`)
    if (response.ok) {
      return await response.json()
    } else {
      console.error(await response.json().catch(() => response.statusText))
    }
  } catch (err) {
    console.error(err)
  }

  return makeEmptyDnasApiKeys()
}


/**
 * Fetch PFPK profile information for any wallet.
 */
export const fetchdnasProfileInfo = async ({
  bech32Hash,
}: {
  bech32Hash: string
}): Promise<PfpkProfile> => {
  if (!bech32Hash) {
    return makeEmptyPfpkProfile()
  }

  try {
    console.log("hitting dnas api:")
    const base = 'http://localhost:58229' + `/bech32/${bech32Hash}`;
    console.log(base)
    const response = await fetch(base)
    if (response.ok) {
      console.log("got response from dnas api  - Fetch DNAS profile:", response)
      const res = await response.json()
      return res

    } else {
      // Don't try to parse HTML error as JSON
      console.error(`Error fetching profile: ${response.status} ${response.statusText}`)
    }
  } catch (err) {
    console.log(err)
    console.error(err)
  }

  return makeEmptyPfpkProfile()
}



export const dnasQueries = {
  /**
   * Fetch unified profile.
   */
  unified: (
    queryClient: QueryClient,
    // If undefined, query will be disabled.
    options?: Parameters<typeof fetchDnasProfileInfo>[1]
  ) =>
    queryOptions({
      queryKey: [
        {
          category: 'dnas',
          name: 'unified',
          options: options && {
            ...options,
            // Add this to match pfpk query key so we can invalidate and thus
            // refetch both at once.
            bech32Hash: toBech32Hash(options.address),
          },
        },
      ],
      queryFn: options
        ? () => fetchDnasProfileInfo(queryClient, options)
        : skipToken,
    }),
  /**
   * Fetch PFPK profile.
   */
  dnasProfile: (
    /**
     * Redirects address queries to bech32 hash queries.
     *
     * If undefined, query will be disabled.
     */
    options?: { address: string } | { bech32Hash: string }
  ): UseQueryOptions<
    PfpkProfile,
    Error,
    PfpkProfile,
    [
      {
        category: 'dnas'
        name: 'profile'
        options: { bech32Hash: string } | undefined
      },
    ]
  > =>
    // Redirect address queries to bech32 hash queries.
    options && 'address' in options
      ? dnasQueries.dnasProfile({
        bech32Hash: toBech32Hash(options.address),
      })
      : queryOptions({
        queryKey: [
          {
            category: 'dnas',
            name: 'profile',
            options,
          },
        ],
        queryFn: options ? () => fetchdnasProfileInfo(options) : skipToken,
      }),

  dnasKeysByDaoAddr: (
    /**
     * Redirects address queries to bech32 hash queries.
     *
     * If undefined, query will be disabled.
     */
    options?: { address: string } | { bech32Hash: string }
  ): UseQueryOptions<
    FetchedDaoKeys,
    Error,
    FetchedDaoKeys,
    [
      {
        category: 'dnas'
        name: 'dnasKeysByDao'
        options: { bech32Hash: string } | undefined
      },
    ]
  > =>
    // Redirect address queries to bech32 hash queries.
    options && 'address' in options
      ? dnasQueries.dnasKeysByDaoAddr({
        bech32Hash: toBech32Hash(options.address),
      })
      : queryOptions({
        queryKey: [
          {
            category: 'dnas',
            name: 'dnasKeysByDao',
            options,
          },
        ],
        queryFn: options ? () => fetchAllDnasApiKeyInfoByDao(options) : skipToken,
      }),

}
