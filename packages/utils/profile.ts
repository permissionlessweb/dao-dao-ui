import { FetchedDaoKeys, PfpkProfile, UnifiedProfile } from '@dao-dao/types'

import { getFallbackImage } from './getFallbackImage'

export const makeEmptyPfpkProfile = (): PfpkProfile => ({
  uuid: null,
  // Disallows editing if we don't have correct nonce from server.
  nonce: -1,
  name: null,
  nft: null,
  chains: {},
})


export const makeEmptyUnifiedProfile = (
  chainId: string,
  address: string,
  dnas?: boolean,
): UnifiedProfile => ({
  ...makeEmptyPfpkProfile(),
  source: {
    chainId,
    address,
  },
  nameSource: dnas && dnas ? 'dnas' : 'pfpk',
  imageUrl: getFallbackImage(address),
  backupImageUrl: getFallbackImage(address),
})


export const makeEmptyDnasApiKeys = (): FetchedDaoKeys => ({
  fetchedRecordOfKeysByChain: {}
})