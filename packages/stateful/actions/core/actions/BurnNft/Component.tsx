import clsx from 'clsx'
import { ComponentType, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  HorizontalNftCard,
  HorizontalNftCardLoader,
  InputErrorMessage,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  LazyNftCardInfo,
  LoadingDataWithError,
  NftCardInfo,
  NftSelectionModalProps,
} from '@dao-dao/types'
import { getNftKey } from '@dao-dao/utils'

export type BurnNftData = {
  nfts: {
    chainId: string
    collection: string
    tokenId: string
  }[]
}

export interface BurnNftOptions {
  // The set of NFTs that may be burned as part of this action.
  options: LoadingDataWithError<LazyNftCardInfo[]>
  // Information about the NFTs currently selected. If errored, it may be burnt.
  // If undefined, no NFTs are selected.
  nftInfos: LoadingDataWithError<NftCardInfo[]> | undefined
  NftSelectionModal: ComponentType<NftSelectionModalProps>
}

export const BurnNft: ActionComponent<BurnNftOptions> = ({
  fieldNamePrefix,
  isCreating,
  errors,
  options: { options, nftInfos, NftSelectionModal },
}) => {
  const { t } = useTranslation()
  const { watch, setValue, getValues, setError, clearErrors } =
    useFormContext<BurnNftData>()

  const nfts = watch((fieldNamePrefix + 'nfts') as 'nfts')
  const selectedKeys = nfts.map((nft) =>
    getNftKey(nft.chainId, nft.collection, nft.tokenId)
  )

  useEffect(() => {
    if (!nfts.length) {
      setError((fieldNamePrefix + 'nfts') as 'nfts', {
        type: 'required',
        message: t('error.noNftSelected'),
      })
    } else {
      clearErrors((fieldNamePrefix + 'nfts') as 'nfts')
    }
  }, [nfts.length, setError, clearErrors, t, fieldNamePrefix])

  // Show modal initially if creating and no NFT already selected.
  const [showModal, setShowModal] = useState<boolean>(
    isCreating && !nfts.length
  )

  return (
    <>
      <div className="flex flex-col gap-2">
        {nftInfos &&
          (nftInfos.loading ? (
            <HorizontalNftCardLoader />
          ) : !nftInfos.errored ? (
            <div className="flex flex-col gap-1">
              {nftInfos.data.map(({ key, ...nftInfo }) => (
                <HorizontalNftCard key={key} {...nftInfo} />
              ))}
            </div>
          ) : (
            // If errored loading NFT and not creating, token likely burned.
            nftInfos.errored &&
            !isCreating && (
              <p className="primary-text">
                {t('info.tokensBurned', { tokenIds: selectedKeys.join(', ') })}
              </p>
            )
          ))}

        {isCreating && (
          <Button
            className={clsx(
              'text-text-tertiary',
              nftInfos && !nftInfos.loading && !nftInfos.errored
                ? 'self-end'
                : 'self-start'
            )}
            onClick={() => setShowModal(true)}
            variant={nfts.length ? 'secondary' : 'primary'}
          >
            {t('button.selectNfts')}
          </Button>
        )}

        <InputErrorMessage error={errors?.collection} />
      </div>

      {isCreating && (
        <NftSelectionModal
          action={{
            loading: false,
            label: t('button.save'),
            onClick: () => setShowModal(false),
          }}
          header={{
            title: t('title.selectNftsToBurn'),
          }}
          nfts={options}
          onClose={() => setShowModal(false)}
          onNftClick={(nft) => {
            const selected = getValues((fieldNamePrefix + 'nfts') as 'nfts')

            // If the NFT is already selected, remove it.
            if (
              selected.some(
                (n) =>
                  n.chainId === nft.chainId &&
                  n.collection === nft.collectionAddress &&
                  n.tokenId === nft.tokenId
              )
            ) {
              setValue(
                (fieldNamePrefix + 'nfts') as 'nfts',
                nfts.filter(
                  (n) =>
                    getNftKey(n.chainId, n.collection, n.tokenId) !== nft.key
                )
              )
            } else {
              // Otherwise, add the NFT.
              setValue((fieldNamePrefix + 'nfts') as 'nfts', [
                ...selected,
                {
                  chainId: nft.chainId,
                  collection: nft.collectionAddress,
                  tokenId: nft.tokenId,
                },
              ])
            }
          }}
          selectedKeys={selectedKeys}
          visible={showModal}
        />
      )}
    </>
  )
}
