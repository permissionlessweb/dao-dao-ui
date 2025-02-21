import { AudiotrackRounded, ImageNotSupported } from '@mui/icons-material'
import clsx from 'clsx'
import NextImage from 'next/image'
import { ComponentType, forwardRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactPlayer from 'react-player'

import { EligibleCollectionCardProps, LazyNftCardInfo, LoadingDataWithError, NftCardInfo, StatefulEntityDisplayProps } from '@dao-dao/types'
import {
  NFT_VIDEO_EXTENSIONS,
  getImageUrlForChainId,
  getNftKey,
  getNftName,
  objectMatchesStructure,
  toAccessibleImageUrl,
} from '@dao-dao/utils'

import { AudioPlayer } from './AudioPlayer'
import { CopyToClipboard } from './CopyToClipboard'
import { LinkWrapper } from './LinkWrapper'
import { Infusion } from '@dao-dao/types/contracts/CwInfuser'
import { Button } from './buttons'
import { TokenAmountDisplay } from './token'
import { HugeDecimal } from '@dao-dao/math'
import { EligibleCollectionCard } from './infusions'
import { HorizontalScroller } from './HorizontalScroller'
import { NftSelectionModal } from '@dao-dao/stateful'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { InfuseNftsData } from '@dao-dao/stateful/actions/core/actions/TransferInfusions/Component'
import { HorizontalNftCard, HorizontalNftCardLoader } from './HorizontalNftCard'
import { ErrorPage } from './error'


export interface HorizontalInfusionCardProps extends Infusion {
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
  selectedNfts: LoadingDataWithError<NftCardInfo[]>
  entityEligibleNFTs: LoadingDataWithError<LazyNftCardInfo[]>
  fieldNamePrefix: string
  className?: string
  chainId: string
  isProposalAction: boolean,
}

export const HorizontalInfusionCard = forwardRef<
  HTMLDivElement,
  HorizontalInfusionCardProps
>(function HorizontalInfusionCard(
  infusion,
  ref
) {
  const { t } = useTranslation()
  const { control, watch, setValue, setError, register, clearErrors, } =
    useFormContext<InfuseNftsData>()


  const [showModal, setShowModal] = useState<boolean>(false)

  const watchChainId = watch((infusion.fieldNamePrefix + 'chainId') as 'chainId')
  const watchInfusionMinter = watch((infusion.fieldNamePrefix + 'infusionMinter') as 'infusionMinter')
  const watchInfusionId = watch((infusion.fieldNamePrefix + 'infusionId') as 'infusionId')
  const watchCollection = watch((infusion.fieldNamePrefix + 'collection') as 'collection')
  const watchTokenId = watch((infusion.fieldNamePrefix + 'tokenId') as 'tokenId')
  const watchPaymentInfusionExists = watch((infusion.fieldNamePrefix + 'paymentSubstituteExists') as 'paymentSubstituteExists')
  const watchInfuionBundles = watch(
    (infusion.fieldNamePrefix + 'infusionBundles') as 'infusionBundles'
  )

  // bundles
  const {
    fields: infusionBundleFields,
    append: appendEligibleAsset,
    remove: removeEligibleAsset,
    update: updateEligibleAsset,
  } = useFieldArray({
    control,
    name: (infusion.fieldNamePrefix + 'infusionBundles') as 'infusionBundles',
  })
  // funds 
  const {
    fields: coins,
    append: appendCoin,
    remove: removeCoin,
  } = useFieldArray({
    control,
    name: infusion.fieldNamePrefix + 'funds' as 'funds',
  })

  const updateInfusionBundles = (nft: LazyNftCardInfo, remove: boolean = false) => {
    const required = infusion.collections.find(
      (accNftColl) => accNftColl.addr === nft.collectionAddress
    )?.min_req

    if (remove) {
      const bundleIndex = infusionBundleFields.findIndex((bundle) =>
        bundle.nfts.some(
          (bnft) =>
            bnft.addr === nft.collectionAddress &&
            bnft.token_id === parseInt(nft.tokenId)
        )
      )

      if (bundleIndex !== -1) {
        // Find and remove the specific NFT from the bundle
        const updatedNfts = infusionBundleFields[bundleIndex].nfts.filter(
          (bnft) =>
            !(bnft.addr === nft.collectionAddress && bnft.token_id === parseInt(nft.tokenId))
        )

        if (updatedNfts.length === 0) {
          // Remove entire bundle if empty
          removeEligibleAsset(bundleIndex)
          console.log("after-removed:", watchInfuionBundles)
        } else {
          // Update bundle with remaining NFTs
          updateEligibleAsset(bundleIndex, { nfts: updatedNfts })
          console.log("after-removed-updated:", watchInfuionBundles)
        }
      }
    } else {
      // Add NFT to bundles
      let targetBundleIndex = -1
      let canAddToExisting = false

      // Check existing bundles for same collection
      infusionBundleFields.forEach((bundle, index) => {
        const sameCollectionCount = bundle.nfts.filter(
          (bnft) => bnft.addr === nft.collectionAddress
        ).length

        if (sameCollectionCount > 0 && (required ? sameCollectionCount < required : true)) {
          targetBundleIndex = index
          canAddToExisting = true
        }
      })

      if (canAddToExisting && targetBundleIndex !== -1) {
        // Add to existing bundle
        const updatedNfts = [
          ...infusionBundleFields[targetBundleIndex].nfts,
          { addr: nft.collectionAddress, token_id: parseInt(nft.tokenId) }
        ]
        updateEligibleAsset(targetBundleIndex, { nfts: updatedNfts })
        console.log("after-updated-added:", watchInfuionBundles)
        console.log("after-updated-added:", infusion)
      } else {
        // Create new bundle
        appendEligibleAsset({
          nfts: [{ addr: nft.collectionAddress, token_id: parseInt(nft.tokenId) }]
        })
        console.log("after-updated-appended:", watchInfuionBundles)
      }
    }
  }

  const selectedKey = getNftKey(watchChainId, watchCollection, watchTokenId)


  useEffect(() => {

    console.log("infusion.entityEligibleNFTs", infusion.entityEligibleNFTs)
    console.log("infusion.collections", infusion.collections)
    console.log("infusion.infused_collection", infusion.infused_collection)

  }, [showModal, setShowModal])

  // when infusion ID or infusion contract is changed, reset selected nfts & funds 
  useEffect(() => {
    infusionBundleFields.forEach((_, index) => {
      removeEligibleAsset(index);
    });
    coins.forEach((_, index) => {
      removeCoin(index);
    });

    setValue((infusion.fieldNamePrefix + 'collection') as 'collection', '')
    setValue((infusion.fieldNamePrefix + 'tokenId') as 'tokenId', '')
  }, [watchInfusionId, watchInfusionMinter]);


  const chainImage = getImageUrlForChainId(infusion.chainId)
  const chainImageNode = chainImage && (
    <NextImage
      alt=""
      className="shrink-0"
      height={36}
      src={chainImage}
      width={36}
    />
  )

  const eligibleCollectionCardProps: EligibleCollectionCardProps[] = infusion.collections.map((eligible, index) => {
    return {
      index,
      address: eligible.addr,
      substituteLabel: eligible.payment_substitute ? t('title.infusedCollectionTotalSupply') : t('title.infusedCollectionTotalSupply'),
      paymentSub: eligible.payment_substitute ? eligible.payment_substitute : undefined
    }
  })

  // const [imageLoading, setImageLoading] = useState(!!imageUrl)
  // const [imageLoadErrored, setImageLoadErrored] = useState(false)
  // // Load image in background so we can listen for loading complete.
  // const [loadedImageSrc, setLoadedImgSrc] = useState<string>()
  // useEffect(() => {
  //   if (
  //     // If showing a video, don't load image.
  //     video ||
  //     !imageUrl ||
  //     loadedImageSrc === toAccessibleImageUrl(imageUrl)
  //   ) {
  //     return
  //   }

  //   setImageLoading(true)

  //   const img = new Image()
  //   img.onload = () => {
  //     setLoadedImgSrc(img.src)
  //     setImageLoading(false)
  //     setImageLoadErrored(false)
  //   }
  //   img.onerror = () => {
  //     setLoadedImgSrc(undefined)
  //     setImageLoading(false)
  //     setImageLoadErrored(true)
  //   }
  //   img.src = toAccessibleImageUrl(imageUrl)
  // }, [imageUrl, loadedImageSrc, video])

  // const audio =
  //   metadata &&
  //     objectMatchesStructure(metadata, {
  //       properties: {
  //         audio: {},
  //       },
  //     })
  //     ? metadata.properties.audio
  //     : null

  // const showingImageUrl = imageUrl && !imageLoadErrored

  return (
    <div
      className={clsx(
        'flex flex-col items-stretch overflow-hidden rounded-lg bg-background-primary sm:grid sm:grid-cols-[auto_1fr] sm:grid-rows-1',
        // imageLoading && 'animate-pulse',
        infusion.className
      )}
      ref={ref}
    >
      <div className="relative aspect-square sm:h-36 sm:w-36">
        <div className="absolute top-0 right-0 bottom-0 left-0">
          {/* {video ? (
            <ReactPlayer
              controls
              height="100%"
              onReady={() => setImageLoading(false)}
              url={video}
              width="100%"
            />
          ) : showingImageUrl ? (
            <div
              className={clsx(
                'relative aspect-square bg-cover bg-center transition-opacity',
                loadedImageSrc ? 'opacity-100' : 'opacity-0'
              )}
              style={{
                backgroundImage: loadedImageSrc && `url(${loadedImageSrc})`,
              }}
            ></div>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              {audio ? (
                <AudiotrackRounded className="!h-14 !w-14 text-icon-tertiary" />
              ) : (
                <ImageNotSupported className="!h-14 !w-14 text-icon-tertiary" />
              )}
            </div>
          )} */}
        </div>

        {/* {audio && !video && (
          <AudioPlayer
            className="absolute bottom-0 left-0 right-0 bg-transparent"
            iconClassName="text-icon-primary"
            progressClassName="text-text-primary"
            src={audio}
            style={{
              background:
                'linear-gradient(to bottom, rgba(var(--color-background-base), 0), rgba(var(--color-background-base), 0.8) 50%, rgba(var(--color-background-base), 1) 100%)',
            }}
          />
        )} */}

      </div>

      <div className="flex min-w-0 grow flex-col">
        <p className="title-text border-b border-border-secondary py-4 px-6" />

        <div className="flex grow flex-row items-center justify-between gap-8 py-4 px-6 overflow-x-auto">
          {/* Collection */}
          <div className="flex flex-col items-stretch justify-between gap-1">
            <p className="secondary-text text-xs">{t('title.infusedCollectionTitle')}</p>

            <p className="primary-text truncate font-normal">
              <CopyToClipboard
                className="text-xs"
                label={infusion.infused_collection.name}
                textClassName="primary-text"
                tooltip={t('button.copyAddressToClipboard')}
                value={infusion.infused_collection.addr!}
              />
            </p>
            <p className="secondary-text text-xs">{t('title.infusedCollectionTotalSupply')}</p>
            <div className="flex flex-row gap-2">
              <p className="primary-text text-lg truncate font-semibold">{infusion.infused_collection.num_tokens}</p>
              <Button className={clsx('self-end')}
                onClick={() => { }}
                variant={'primary'}
              >
                {t('button.viewInfusedCollection')}
              </Button>
            </div>
            <p className="secondary-text text-xs">{t('title.infusedCollectionMintFee')}</p>
            <p className="primary-text truncate font-normal">
              {infusion.infusion_params.mint_fee ? <TokenAmountDisplay
                amount={HugeDecimal.from(infusion.infusion_params.mint_fee.amount)}
                decimals={6}
                // iconUrl={ }
                showFullAmount
                symbol={infusion.infusion_params.mint_fee.denom}
              /> : <>{t('title.noInfusionFee')}</>}
            </p>
            <p className="secondary-text text-xs">{t('title.infusionPaymentRecipient')}</p>

            {infusion.payment_recipient ? (
              <infusion.EntityDisplay address={infusion.payment_recipient!} />
            ) : (
              <p className="body-text italic">
                {t('info.failedToDecodeAddressUnrecognizedMessage')}
              </p>
            )}

            {/* Map  of eligible collections, */}
            <p className="title-text border-b border-border-secondary py-4 px-6" />
            <p className="primary-text text-xs">{t('title.eligibleCollections')}</p>
            <HorizontalScroller
              Component={EligibleCollectionCard}
              containerClassName="  "
              itemClassName="w-48"
              items={{ loading: false, data: eligibleCollectionCardProps }}
              shadowClassName=" "
            />
            {infusion.selectedNfts && !infusion.isProposalAction &&
              (infusion.selectedNfts.loading ? (
                <HorizontalNftCardLoader />
              ) : infusion.selectedNfts.errored ? (
                <ErrorPage error={infusion.selectedNfts.error} />
              ) : (
                <div className="flex flex-col gap-1">
                  {infusion.selectedNfts.data.map(({ key, ...nftInfo }) => (
                    <HorizontalNftCard key={key} {...nftInfo} />
                  ))}
                </div>
              ))}
          </div>
          {/* Source chain */}
          {/* {chainImageNode ? (
            externalLink ? (
              <LinkWrapper
              className="shrink-0"
              href={externalLink?.href}
              openInNewTab
              >
              {chainImageNode}
              </LinkWrapper>
              ) : (
                chainImageNode
                )
                ) : null} */}
          <Button className={clsx('self-start')}
            onClick={() => setShowModal(true)}  //  setShowModal(true)
            variant={'primary'}
          >
            {t('button.selectNfts')}
          </Button>

        </div>
        {/* add funds selector if payment subsitute enabled */}
        {/* Preview json action option */}
        {/* Prompt transaction or proposal based on entity type*/}

        <NftSelectionModal
          action={{
            loading: false,
            label: t('button.save'),
            onClick: () => {
              setShowModal(false)
            },
          }}
          header={{
            title: t('title.selectNftsToInfuse'),
          }}
          nfts={infusion.entityEligibleNFTs}
          onClose={() => setShowModal(false)}
          onNftClick={(nft) => {
            if (nft.key === selectedKey) {
              setValue((infusion.fieldNamePrefix + 'tokenId') as 'tokenId', '')
              setValue((infusion.fieldNamePrefix + 'collection') as 'collection', '')
              updateInfusionBundles(nft, true)
            } else {
              setValue((infusion.fieldNamePrefix + 'chainId') as 'chainId', nft.chainId)
              setValue((infusion.fieldNamePrefix + 'tokenId') as 'tokenId', nft.tokenId)
              setValue(
                (infusion.fieldNamePrefix + 'collection') as 'collection',
                nft.collectionAddress
              )
              updateInfusionBundles(nft, false)
            }
          }}
          selectedKeys={selectedKey ? [selectedKey] : []}
          visible={showModal}
        />
      </div>
      <p className="title-text border-b border-border-secondary py-10 px-6" />
    </div>
  )
})

export const HorizontalInfusionCardLoader = () => (
  <div className="flex animate-pulse flex-col items-stretch overflow-hidden rounded-lg bg-background-primary sm:grid sm:grid-cols-[auto_1fr] sm:grid-rows-1">
    <div className="aspect-square sm:h-36 sm:w-36"></div>
    <div className="flex min-w-0 grow flex-col">
      <p className="title-text border-b border-border-secondary py-4 px-6 opacity-0">
        LOADING
      </p>

      <div className="flex grow flex-row items-center justify-between gap-8 py-4 px-6">
        <div className="flex flex-col items-stretch justify-between gap-1 overflow-hidden">
          <p className="secondary-text text-xs opacity-0">LOADING</p>
          <p className="primary-text truncate font-normal opacity-0">LOADING</p>
        </div>
      </div>
    </div>
  </div>
)
