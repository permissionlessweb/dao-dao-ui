import { AudiotrackRounded, ImageNotSupported } from '@mui/icons-material'
import clsx from 'clsx'
import NextImage from 'next/image'
import { ComponentType, forwardRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactPlayer from 'react-player'

import { EligibleCollectionCardProps, NftCardInfo, StatefulEntityDisplayProps } from '@dao-dao/types'
import {
  NFT_VIDEO_EXTENSIONS,
  getImageUrlForChainId,
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


export interface HorizontalInfusionCardProps extends Infusion {
  className?: string
  chainId: string
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export const HorizontalInfusionCard = forwardRef<
  HTMLDivElement,
  HorizontalInfusionCardProps
>(function HorizontalInfusionCard(
  {
    collections,
    infused_collection,
    className,
    chainId,
    infusion_params,
    payment_recipient,
    EntityDisplay,
  },
  ref
) {
  const { t } = useTranslation()

  const chainImage = getImageUrlForChainId(chainId)
  const chainImageNode = chainImage && (
    <NextImage
      alt=""
      className="shrink-0"
      height={36}
      src={chainImage}
      width={36}
    />
  )

  const eligibleCollectionCardProps: EligibleCollectionCardProps[] = collections.map((eligible) => {
    return {
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
        className
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
                label={infused_collection.name}
                textClassName="primary-text"
                tooltip={t('button.copyAddressToClipboard')}
                value={infused_collection.addr!}
              />
            </p>
            <p className="secondary-text text-xs">{t('title.infusedCollectionTotalSupply')}</p>
            <div className="flex flex-row gap-2">
              <p className="primary-text text-lg truncate font-semibold">{infused_collection.num_tokens}</p>
              <Button className={clsx('self-end')}
                onClick={() => { }}  // setShowModal(true)
                variant={'primary'}
              >
                {t('button.viewInfusedCollection')}
              </Button>
            </div>
            <p className="secondary-text text-xs">{t('title.infusedCollectionMintFee')}</p>
            <p className="primary-text truncate font-normal">
              {infusion_params.mint_fee ? <TokenAmountDisplay
                amount={HugeDecimal.from(infusion_params.mint_fee.amount)}
                decimals={6}
                // iconUrl={ }
                showFullAmount
                symbol={infusion_params.mint_fee.denom}
              /> : <>{t('title.noInfusionFee')}</>}
            </p>
            <p className="secondary-text text-xs">{t('title.infusionPaymentRecipient')}</p>

            {payment_recipient ? (
              <EntityDisplay address={payment_recipient!} />
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
            {eligibleCollectionCardProps.length != 0 && console.log(eligibleCollectionCardProps)}
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
            onClick={() => { }}  //  setShowModal(true)
            variant={'primary'}
          >
            {t('button.selectNfts')}
          </Button>
        </div>


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
