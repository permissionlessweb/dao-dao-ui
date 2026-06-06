import { ArrowOutwardRounded, PanoramaFishEye } from '@mui/icons-material'
import clsx from 'clsx'
import NextImage from 'next/image'
import { ComponentType, forwardRef, useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import { InfusionNFTSelectionModal, LazyNftCard, NftSelectionModal } from '@dao-dao/stateful'
import {
  EligibleCollectionCardProps,
  LazyNftCardInfo,
  LoadingDataWithError,
  NftCardInfo,
  StatefulEntityDisplayProps,

} from '@dao-dao/types'
import { Bundle, BundleType, InfusionWithDetails } from '@dao-dao/types/contracts/CwInfuser'
import {

  toAccessibleImageUrl,
} from '@dao-dao/utils'
import { Button, Collapsible, ErrorPage, HorizontalNftCard, HorizontalNftCardLoader, HorizontalScroller, LinkWrapper, NftsTab, PAGINATION_MIN_PAGE, Switch, SwitchCard, TokenAmountDisplay, Tooltip, TooltipInfoIcon, TooltipLikeDisplay, useCachedLoading, useCachedLoadingWithError, useQuerySyncedState } from '@dao-dao/stateless'
import { CommonNftSelectors, lazyNftCardInfosForDaoSelector } from '@dao-dao/state/recoil'
import { coin } from '@cosmjs/amino'
import { useWallet } from '../../../../hooks/useWallet'
import { ClaimHeadstashActionData, HeadstashActionData } from '../HeadstashRenderer'



export interface HorizontalHeadstashCardProps extends InfusionWithDetails {
  currentEntity: string | undefined
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
  selectedNfts: LoadingDataWithError<NftCardInfo[]>
  entityEligibleNFTs: LoadingDataWithError<LazyNftCardInfo[]>
  fieldNamePrefix: string
  className?: string
  chainId: string
  isProposalAction: boolean
  isCreating: boolean
  onInfuseNft?: () => void
}

interface BundleDisplayProps {
  usingAllFeePaymentSub: boolean;
  watchInfuionBundles: any[];
  infusion: any;
}

interface BundleNftsProps {
  bundle: Bundle;

}

interface BundleProps {
  bundle: Bundle;
  bundleIndex: number;
  totalBundles: number;

}

export const HorizontalHeadstashCard = forwardRef<
  HTMLDivElement,
  HorizontalHeadstashCardProps
>(function HorizontalHeadstashCard(infusion, ref) {
  const { t } = useTranslation()
  const {
    control,
    watch,
    setValue,
    getValues,
    setError,
    register,
    clearErrors,
  } = useFormContext<ClaimHeadstashActionData>()

  const [displayGallery, setDisplayGallery] = useState<boolean>(true)

  const [showModal, setShowModal] = useState<boolean>(false)
  const [imageLoading, setImageLoading] = useState(!!infusion.infused_collection.image)
  const [imageLoadErrored, setImageLoadErrored] = useState(false)
  const [loadedImageSrc, setLoadedImgSrc] = useState<string>()

  const fieldNamePrefix = infusion.fieldNamePrefix
  const watchChainId = infusion.chainId





  const { disconnect, connect, } = useWallet({ chainId: watchChainId })
  const handleReconnect = () => {
    disconnect()
    connect()
  }

  const showingImageUrl = infusion.infused_collection.image && !imageLoadErrored
  // const chainImage = getImageUrlForChainId(infusion.chainId)
  // const chainImageNode = chainImage && (
  //   <NextImage
  //     alt=""
  //     className="shrink-0"
  //     height={36}
  //     src={chainImage}
  //     width={36}
  //   />
  // )

  useEffect(() => {
    // If showing a video, don't load image.
    if (
      !infusion.infused_collection.image ||
      loadedImageSrc === toAccessibleImageUrl(infusion.infused_collection.image)
    ) {
      return
    }

    setImageLoading(true)

    const img = new Image()
    img.onload = () => {
      setLoadedImgSrc(img.src)
      setImageLoading(false)
      setImageLoadErrored(false)
    }
    img.onerror = () => {
      setLoadedImgSrc(undefined)
      setImageLoading(false)
      setImageLoadErrored(true)
    }
    img.src = toAccessibleImageUrl(infusion.infused_collection.image)
  }, [infusion.infused_collection.image, loadedImageSrc])

  const [usingAllFeePaymentSub, setUsingAllFeePaymentSub] = useState<boolean>(false)



  // useEffect(() => {
  //   console.log("infusion:", infusion)
  //   console.log("HORIZONTALINFUSION FORM COINS:", watchFunds)
  //   console.log("fieldNamePrefix:", fieldNamePrefix)
  // }, [infusion, watchFunds, setDisplayGallery])


  return (
    <div
      className={clsx(
        'flex flex-col rounded-lg bg-background-primary overflow-hidden',
        infusion.className
      )}
      ref={ref}
    >
      {/* Golden Ratio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,38.2%)_minmax(0,1fr)] gap-6 p-6">

        {/* Left Column - Core Infusion Parameters */}
        <div className="flex flex-col gap-6">
          {/* Headstash Details */}
          {/* Start/End */}
          {/* Multiplier Enabled */}
          {/* Bloom Params */}

          <div>
            {infusion.isCreating ? <>
              <p className="primary-text text-sm font-medium">
                {t('title.claimHeadstash')}
              </p>
              <Button
                onClick={() => setShowModal(!usingAllFeePaymentSub)}
                variant={usingAllFeePaymentSub ? 'secondary' : 'primary'}
                size="lg"
                // className="flex justify-between items-center p-4 "
                className="self-start w-full  gap-6 p-4 "
              >
                {t('button.startHeadstashClaim')}
              </Button> </> : undefined}
          </div>
        </div>


        <div className="flex flex-col gap-3 p-2 ">
          <div className="flex flex-col gap-6 p-4 rounded-lg bg-background-tertiary overflow-x-auto">

            {/* Throwaway Wallet Modal */}
            <div className="flex flex-col gap-3">
              <div className="flex  items-center">
                <p className="title-text truncate font-mono hover:opacity-80 transition-opacity">
                  {t('title.eligibleCollections')}
                </p>
                <TooltipInfoIcon
                  className="relative mx-2 inline-block"
                  size="xs"
                  title={t('info.eligibleCollectionTooltip')}
                />
              </div>

            </div>

          </div>


          <div className="flex flex-col gap-6 p-4 rounded-lg bg-background-tertiary overflow-x-auto">
            <Collapsible
              containerClassName="!gap-1 border-t border-border-secondary pt-2"
              contentContainerClassName="styled-scrollbar flex flex-col pl-[0.625rem] overflow-y-auto max-h-64 -mr-3.5 pr-3.5 -mb-4 pb-4"
              defaultCollapsed={!displayGallery}
              onExpand={() => {
                setDisplayGallery(displayGallery)
              }}

              label={t('title.infusedCollectionGallery')}
              labelClassName="title-text truncate font-mono hover:opacity-80 transition-opacity"
              noContentIndent
              noHeaderIndent
            >
              {/* Eligilbe Wallets Display */}
              <></>
            </Collapsible>
          </div>

        </div>
      </div >



      {/* Claim Headstash Modal */}
      {
        infusion.isCreating && (
          <></>
        )
      }
      {/* Bloom Headstash Modal */}
      {
        infusion.isCreating && (
          <></>
        )
      }
    </div >
  )
}
)


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
