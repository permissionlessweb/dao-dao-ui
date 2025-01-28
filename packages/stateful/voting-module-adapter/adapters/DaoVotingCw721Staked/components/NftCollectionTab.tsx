import { useTranslation } from 'react-i18next'

import { CommonNftSelectors } from '@dao-dao/state/recoil'
import {
  NftsTab,
  PAGINATION_MIN_PAGE,
  useCachedLoadingWithError,
  useChain,
  useQuerySyncedState,
} from '@dao-dao/stateless'
import { getNftKey } from '@dao-dao/utils'

import { LazyNftCard } from '../../../../components'
import { useGovernanceCollectionInfo } from '../hooks'

const NFTS_PER_PAGE = 30

export const NftCollectionTab = () => {
  const { t } = useTranslation()
  const { chainId } = useChain()
  const { collectionAddress, stakingContractAddress } =
    useGovernanceCollectionInfo()

  const [page, setPage] = useQuerySyncedState({
    param: 'np',
    defaultValue: PAGINATION_MIN_PAGE,
  })

  const numNfts = useCachedLoadingWithError(
    CommonNftSelectors.numTokensSelector({
      chainId,
      contractAddress: collectionAddress,
      params: [],
    }),
    ({ count }) => count
  )

  const nfts = useCachedLoadingWithError(
    CommonNftSelectors.paginatedAllTokensSelector({
      chainId,
      contractAddress: collectionAddress,
      page,
      pageSize: NFTS_PER_PAGE,
    }),
    (data) =>
      data.map((tokenId) => ({
        key: getNftKey(chainId, collectionAddress, tokenId),
        chainId,
        collectionAddress,
        tokenId,
        stakingContractAddress,
        type: 'owner' as const,
      }))
  )

  return (
    <NftsTab
      NftCard={LazyNftCard}
      description={t('info.nftCollectionExplanation', { context: 'all' })}
      nfts={nfts}
      numNfts={numNfts}
      page={page}
      pageSize={NFTS_PER_PAGE}
      setPage={setPage}
    />
  )
}
