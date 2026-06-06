import {
  QueryClient,
  UseQueryOptions,
  queryOptions,
  skipToken,
} from '@tanstack/react-query'

import {
  PfpkProfile,
  RecordOfDnasKeysByAddr,
  UnifiedProfile,
} from '@dao-dao/types'
import {
  DNAS_API_BASE,
  makeEmptyPfpkProfile,
  // makeEmptydnasProfile,
  makeEmptyUnifiedProfile,
  toBech32Hash,
} from '@dao-dao/utils'

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
  const profile = makeEmptyUnifiedProfile(chainId, address,)
  if (!address) {
    return profile
  }

  console.log('hitting dnasProfile query...')
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
}): Promise<RecordOfDnasKeysByAddr> => {
  if (!bech32Hash) {
    return {}
  }

  try {
    const response = await fetch(
      DNAS_API_BASE + `/daoKeys/bech32/${bech32Hash}`
    )
    if (response.ok) {
      const res = await response.json()
      console.log(res)
      return await res
    } else {
      console.error(await response.json().catch(() => response.statusText))
    }
  } catch (err) {
    console.error(err)
  }

  return {}
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
    console.log('hitting dnas api:')
    const base = DNAS_API_BASE + `/bech32/${bech32Hash}`
    console.log(base)
    const response = await fetch(base)
    if (response.ok) {
      const json = await response.json()
      console.log('got response from dnas api  - Fetch DNAS profile:', json)
      const res = json
      return res
    } else {
      // Don't try to parse HTML error as JSON
      console.error(
        `Error fetching profile: ${response.status} ${response.statusText}`
      )
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
    options?: { address: string } | { bech32Hash: string }
  ): UseQueryOptions<
    RecordOfDnasKeysByAddr,
    Error,
    RecordOfDnasKeysByAddr,
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
        bech32Hash: options.address,
      })
      : queryOptions({
        queryKey: [
          {
            category: 'dnas',
            name: 'dnasKeysByDao',
            options,
          },
        ],
        queryFn: options
          ? () => fetchAllDnasApiKeyInfoByDao(options)
          : skipToken,
      }),
}
