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
  getFallbackImage,
  getImageUrlForChainId,
  getNftKey,
  toAccessibleImageUrl,
} from '@dao-dao/utils'
import { Button, Collapsible, ErrorPage, HorizontalNftCard, HorizontalNftCardLoader, HorizontalScroller, LinkWrapper, NftsTab, PAGINATION_MIN_PAGE, Switch, SwitchCard, TokenAmountDisplay, Tooltip, TooltipLikeDisplay, useCachedLoading, useCachedLoadingWithError, useQuerySyncedState } from '@dao-dao/stateless'
import { EligibleCollectionCard } from './EligibleCollectionCard'
import { InfuseNftsData, InfusionBundleType } from '../../InfusionsRenderer'
import { NftGalleryModal } from './BrowseInfusionNfts'
import { CommonNftSelectors, lazyNftCardInfosForDaoSelector } from '@dao-dao/state/recoil'
import { coin } from '@cosmjs/amino'
import { useWallet } from '../../../../../hooks/useWallet'

const NFTS_PER_PAGE = 30

export interface HorizontalInfusionCardProps extends InfusionWithDetails {
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

export const HorizontalInfusionCard = forwardRef<
  HTMLDivElement,
  HorizontalInfusionCardProps
>(function HorizontalInfusionCard(infusion, ref) {
  const { t } = useTranslation()
  const {
    control,
    watch,
    setValue,
    getValues,
    setError,
    register,
    clearErrors,
  } = useFormContext<InfuseNftsData>()

  const [displayGallery, setDisplayGallery] = useState<boolean>(true)

  const [showModal, setShowModal] = useState<boolean>(false)
  const [imageLoading, setImageLoading] = useState(!!infusion.infused_collection.image)
  const [imageLoadErrored, setImageLoadErrored] = useState(false)
  const [loadedImageSrc, setLoadedImgSrc] = useState<string>()

  const fieldNamePrefix = infusion.fieldNamePrefix
  const watchChainId = infusion.chainId

  const watchInfusionMinter = watch((fieldNamePrefix + 'infusionMinter') as 'infusionMinter')
  const watchInfusionId = watch((fieldNamePrefix + 'infusionId') as 'infusionId')
  const watchInfuionBundles = watch((fieldNamePrefix + 'infusionBundles') as 'infusionBundles')


  // bundles
  const {
    fields: infusionBundleFields,
    append: appendinfusionBundle,
    remove: removeInfusionBundle,
    update: updateInfusionBundle,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'infusionBundles') as 'infusionBundles',
  })
  // funds
  const {
    fields: watchFunds,
    append: appendCoin,
    remove: removeCoin,
    update: updateCoin,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'funds') as 'funds',
  })

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


  const onUseSingleFeeSubstitute = (nftAddr: string, usingFeeSub: boolean) => {
    let required = infusion.eligibleCollections.find((i) => i.addr == nftAddr)
    if (!required || !required.payment_substitute) return;
    if (!usingFeeSub) {
      console.log("removeing fee substitute for collection:", nftAddr)
      const denom = required.payment_substitute.token.denomOrAddress;
      const subtractAmount = HugeDecimal.from(required.payment_substitute.balance);
      const coinIndex = watchFunds.findIndex(c => c.denom === denom);

      if (coinIndex >= 0) {
        console.log("found coin at index:", coinIndex)
        const currentAmount = HugeDecimal.from(watchFunds[coinIndex].amount);
        let newAmount = currentAmount.minus(subtractAmount);
        console.log("newAmount:", newAmount)

        if (newAmount.gt(0)) {
          updateCoin(coinIndex, {
            ...watchFunds[coinIndex],
            amount: newAmount.toString()
          });
        } else {
          removeCoin(coinIndex);
          // ensure we stil have the static mint fee
          if (infusion.infusionParamsGeneric.mintFeeGeneric && infusion.infusionParamsGeneric.mintFeeGeneric.token.denomOrAddress == denom) {
            appendCoin({
              denom: infusion.infusionParamsGeneric.mintFeeGeneric.token.denomOrAddress,
              amount: infusion.infusionParamsGeneric.mintFeeGeneric.balance,
              decimals: required.payment_substitute.token.decimals,

            });
          }


        }
      }

      // console.log("watchCoins after removing:", watchCoins)
    } else {
      console.log("enabling abling fee substitute")
      const newBundles = watchInfuionBundles.map(bundle => ({
        ...bundle,
        nfts: bundle.nfts.filter(nft => nft.addr !== nftAddr)
      })).filter(bundle => bundle.nfts.length > 0);

      console.log("newBundles", newBundles)
      setValue(`${fieldNamePrefix}infusionBundles` as 'infusionBundles', newBundles);

      const denom = required.payment_substitute.token.denomOrAddress;
      const addAmount = HugeDecimal.from(required.payment_substitute.balance);
      const coinIndex = watchFunds.findIndex(c => c.denom === denom);
      console.log("coinIndex", coinIndex)
      if (coinIndex >= 0) {
        const currentAmount = HugeDecimal.from(watchFunds[coinIndex].amount);
        const newAmount = currentAmount.plus(addAmount);
        updateCoin(coinIndex, {
          ...watchFunds[coinIndex],
          amount: newAmount.toString()
        });
      } else {
        appendCoin({
          denom,
          amount: addAmount.toString(),
          decimals: required.payment_substitute.token.decimals,

        });
      }
    }
  };


  const onUseAllFeePaymentSubstitute = () => {
    if (!usingAllFeePaymentSub) {
      setUsingAllFeePaymentSub(true);

      // Remove all NFTs from bundles
      setValue(`${fieldNamePrefix}infusionBundles` as 'infusionBundles', []);

      // Build coins map starting with existing coins
      const existingCoins = new Map<string, {
        amount: HugeDecimal;
        decimals: number;
        denom: string;
      }>();


      // Preserve existing coins (merge with generic fee if same denom)
      watchFunds.forEach(coin => {
        const current = existingCoins.get(coin.denom);
        if (current) {
          // If coin already exists, add to it
          existingCoins.set(coin.denom, {
            amount: current.amount.plus(HugeDecimal.from(coin.amount)),
            decimals: coin.decimals!,
            denom: coin.denom
          });
        } else {
          // New coin
          existingCoins.set(coin.denom, {
            amount: HugeDecimal.from(coin.amount),
            decimals: coin.decimals!,
            denom: coin.denom
          });
        }
      });

      // Add generic mint fee if it exists
      if (infusion.infusionParamsGeneric.mintFeeGeneric) {
        existingCoins.set(infusion.infusionParamsGeneric.mintFeeGeneric.token.denomOrAddress, {
          denom: infusion.infusionParamsGeneric.mintFeeGeneric.token.denomOrAddress,
          amount: HugeDecimal.from(infusion.infusionParamsGeneric.mintFeeGeneric.balance),
          decimals: infusion.infusionParamsGeneric.mintFeeGeneric.token.decimals,
        });
      }


      // Add payment substitutes for all eligible collections
      infusion.eligibleCollections.forEach(collection => {
        if (collection.payment_substitute) {
          const denom = collection.payment_substitute.token.denomOrAddress;
          const current = existingCoins.get(denom);
          const newAmount = (current?.amount || HugeDecimal.zero).plus(
            HugeDecimal.from(collection.payment_substitute.balance)
          );
          existingCoins.set(denom, {
            amount: newAmount,
            decimals: collection.payment_substitute.token.decimals,
            denom,
          });
        }
      });

      // Update funds with all combined coins
      setValue(`${fieldNamePrefix}funds` as 'funds',
        Array.from(existingCoins.values()).map(coin => ({
          denom: coin.denom,
          amount: coin.amount.toString(),
          decimals: coin.decimals
        }))
      );
    } else {
      setUsingAllFeePaymentSub(false);
      setValue(`${fieldNamePrefix}funds` as 'funds',
        infusion.infusionParamsGeneric.mintFeeGeneric
          ? [{
            denom: infusion.infusionParamsGeneric.mintFeeGeneric.token.denomOrAddress,
            amount: infusion.infusionParamsGeneric.mintFeeGeneric.balance.toString(),
            decimals: infusion.infusionParamsGeneric.mintFeeGeneric.token.decimals,
          }]
          : []
      );
    }
  };

  // Updates the form with bundles that are compatible with the infusion the are destined for.
  const updateInfusionBundles = (
    nft: LazyNftCardInfo,
    remove: boolean = false
  ) => {
    const required = infusion.eligibleCollections.find(
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
            !(
              bnft.addr === nft.collectionAddress &&
              bnft.token_id === parseInt(nft.tokenId)
            )
        )

        if (updatedNfts.length === 0) {
          // Remove entire bundle if empty
          removeInfusionBundle(bundleIndex)
          // console.log("after-removed:", watchInfuionBundles)
        } else {
          // Update bundle with remaining NFTs
          updateInfusionBundle(bundleIndex, { nfts: updatedNfts })
          // console.log("after-removed-updated:", watchInfuionBundles)
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

        if (
          sameCollectionCount > 0 &&
          (required ? sameCollectionCount < required : true)
        ) {
          targetBundleIndex = index
          canAddToExisting = true
        }
      })

      if (canAddToExisting && targetBundleIndex !== -1) {
        // Add to existing bundle
        const updatedNfts = [
          ...infusionBundleFields[targetBundleIndex].nfts,
          { addr: nft.collectionAddress, token_id: parseInt(nft.tokenId) },
        ]
        updateInfusionBundle(targetBundleIndex, { nfts: updatedNfts })
        // console.log("after-updated-added:", watchInfuionBundles)
        // console.log("after-updated-added:", infusion)
      } else {
        // Create new bundle
        appendinfusionBundle({
          nfts: [
            { addr: nft.collectionAddress, token_id: parseInt(nft.tokenId) },
          ],
        })
        // console.log("after-updated-appended:", watchInfuionBundles)
      }
    }
  }

  const [page, setPage] = useQuerySyncedState({
    param: 'np',
    defaultValue: PAGINATION_MIN_PAGE,
  })

  const numNfts = useCachedLoadingWithError(
    CommonNftSelectors.numTokensSelector({
      chainId: watchChainId,
      contractAddress: infusion.infused_collection.addr!,
      params: [],
    }),
    ({ count }) => count
  )

  const infusedNfts = useCachedLoadingWithError(
    CommonNftSelectors.paginatedAllTokensSelector({
      chainId: watchChainId,
      contractAddress: infusion.infused_collection.addr!,
      page,
      pageSize: NFTS_PER_PAGE,
    }),
    (data) =>
      data.map((tokenId) => ({
        key: getNftKey(watchChainId, infusion.infused_collection.addr!, tokenId),
        chainId: watchChainId,
        collectionAddress: infusion.infused_collection.addr!,
        tokenId,
        type: 'owner' as const,
      }))
  )

  const selectedKeys = infusionBundleFields.flatMap((nft) => {
    return nft.nfts.map((n) => {
      return getNftKey(watchChainId, n.addr, n.token_id.toString())
    })
  })



  const eligibleCollectionCardProps: EligibleCollectionCardProps[] =
    infusion.eligibleCollections.map((eligible, index) => {
      // let found = watchFeeSubs && watchFeeSubs.findIndex(f => f.addr == eligible.addr)
      // let feesubset = eligible.payment_substitute && found >= 0 ? true : false;

      let props = {
        key: `${eligible.addr}-${index}`,
        fieldNamePrefix: fieldNamePrefix,
        nftInfo: eligible.collectionInfo,
        contractInfo: eligible.contractInfo,
        index,
        nftAddr: eligible.addr,
        requiredParams: eligible,
        bundleType: infusion.infusionParamsGeneric.bundle_type,
        paymentSub: eligible.payment_substitute,
        globalPaymentSub: usingAllFeePaymentSub,
        onUseSingleFeeSubstitute
      }

      // Debug each prop to see if any are objects being rendered
      // console.log('Props for', eligible.addr, ':', props)
      // Object.entries(props).forEach(([key, value]) => {
      //   if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      //     console.log(`${key} is an object:`, value)
      //   }
      // })

      return props
    })

  // when infusion ID or infusion contract is changed, reset selected nfts & funds
  useEffect(() => {
    // Reset bundles and coins when infusion ID or contract changes
    setValue((fieldNamePrefix + 'infusionBundles') as 'infusionBundles', [])
    setValue((fieldNamePrefix + 'funds') as 'funds', [])
    infusion.infusionParamsGeneric.mintFeeGeneric && appendCoin({ amount: infusion.infusionParamsGeneric.mintFeeGeneric.balance, denom: infusion.infusionParamsGeneric.mintFeeGeneric.token.denomOrAddress })
  }, [watchInfusionId, watchInfusionMinter, infusion.infusionParamsGeneric.mintFeeGeneric])

  useEffect(() => {
    console.log("infusion:", infusion)
    console.log("HORIZONTALINFUSION FORM COINS:", watchFunds)
    console.log("fieldNamePrefix:", fieldNamePrefix)
  }, [infusion, watchFunds, setDisplayGallery])


  const BundleDisplay = () => {
    if (usingAllFeePaymentSub || watchInfuionBundles.length === 0) return null;

    return (
      <div className="mb-4">
        <p className="primary-text text-sm font-medium mb-2">
          {t('title.selectedBundles')} ({watchInfuionBundles.length})
        </p>

        {watchInfuionBundles.map((bundle, bundleIndex) => (
          <Bundle key={bundleIndex} bundle={bundle} bundleIndex={bundleIndex} totalBundles={watchInfuionBundles.length} />
        ))}
      </div>
    );
  };

  const Bundle = ({ bundle, bundleIndex, totalBundles, }: BundleProps) => (
    <div
      className={clsx(
        'mb-3 p-3 rounded-lg border border-border-secondary',
        bundleIndex === totalBundles - 1 && 'mb-0'
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="title-text truncate font-mono hover:opacity-80 transition-opacity">
          {t('title.bundle')} {bundleIndex + 1}
        </p>

        <p className="secondary-text text-xs">
          {bundle.nfts.length} {t('title.nfts')}
        </p>
      </div>

      <BundleNfts bundle={bundle} />
    </div>
  );

  const BundleNfts = ({ bundle }: BundleNftsProps) => (
    <div className="space-y-1">
      {bundle.nfts.map((nft, nftIndex) => {
        const matchingNft = infusion.selectedNfts.loading || infusion.selectedNfts.errored
          ? null
          : infusion.selectedNfts.data.find(selected =>
            selected.collectionAddress === nft.addr &&
            selected.tokenId === nft.token_id.toString()
          );

        return (
          <div key={nftIndex} className="flex items-center gap-2 p-2 rounded bg-background-tertiary">
            {matchingNft ? (
              <HorizontalNftCard {...matchingNft} />
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-background-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="primary-text text-xs truncate">
                    {nft.addr}
                  </p>
                  <p className="secondary-text text-xs">
                    #{nft.token_id}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

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

          {/* Collection Details */}
          <div className="p-4 rounded-lg bg-background-tertiary">
            <div className="aspect-square w-full rounded-lg overflow-hidden bg-background-secondary mb-4">
              {showingImageUrl ? (
                <div
                  className={clsx(
                    'relative w-full h-full bg-cover bg-center transition-opacity',
                    loadedImageSrc ? 'opacity-100' : 'opacity-0'
                  )}
                  style={{ backgroundImage: loadedImageSrc && `url(${loadedImageSrc})` }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  {/* Image placeholder */}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <LinkWrapper
                href={`https://www.stargaze.zone/m/${infusion.infused_collection.addr!}/tokens`}
                className="block"
              >
                <p className="title-text truncate font-mono hover:opacity-80 transition-opacity">
                  {infusion.infused_collection.name}
                </p>
              </LinkWrapper>
              <p className="primary-text text-sm">
                {infusion.infused_collection.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="secondary-text text-xs">
                  {t('title.infusedCollectionTotalSupply')}
                </p>
                <p className="primary-text text-lg font-semibold">
                  {infusion.infused_collection.num_tokens}
                </p>
              </div>

              <div>
                <p className="secondary-text text-xs">
                  {t('title.infusedCollectionMintFee')}
                </p>
                <p className="primary-text truncate">
                  {infusion.infusionParamsGeneric.mintFeeGeneric ? (
                    <TokenAmountDisplay
                      amount={HugeDecimal.from(
                        infusion.infusionParamsGeneric.mintFeeGeneric?.balance
                      )}
                      decimals={6}
                      iconUrl={
                        infusion.infusionParamsGeneric.mintFeeGeneric?.token.imageUrl
                      }
                      symbol={
                        infusion.infusionParamsGeneric.mintFeeGeneric?.token.symbol
                      }
                    />
                  ) : (
                    <>{t('title.noInfusionFee')}</>
                  )}
                </p>
              </div>

              <div>
                <div className="col-span-2">
                  <p className="secondary-text text-xs">
                    {t('title.infusionPaymentRecipient')}
                  </p>
                  {infusion.payment_recipient ? (
                    <infusion.EntityDisplay
                      address={infusion.payment_recipient!}
                      className="mt-1"
                    />
                  ) : (
                    <p className="body-text italic text-sm">
                      {t('info.failedToDecodeAddressUnrecognizedMessage')}
                    </p>
                  )}
                </div>

              </div>


              <div className="flex justify-between items-center p-4 ">
              </div>
            </div>
          </div>
          <div>
          </div>


          <div>
            {infusion.isCreating ? <>
              <p className="primary-text text-sm font-medium">
                {t('title.selectedNftsToInfuse')}
              </p>
              <Button
                onClick={() => setShowModal(!usingAllFeePaymentSub)}
                variant={usingAllFeePaymentSub ? 'secondary' : 'primary'}
                size="lg"
                // className="flex justify-between items-center p-4 "
                className="self-start w-full  gap-6 p-4 "
              >
                {t('button.selectNfts')}
              </Button> </> : undefined}


            {'all_of' in infusion.infusionParamsGeneric.bundle_type && infusion.eligibleCollections.find((i) => i.payment_substitute) ? <>
              <SwitchCard
                containerClassName="self-start mt-2"
                label={t('form.useFeeSubstitute')}
                enabled={!!usingAllFeePaymentSub}
                onClick={() => onUseAllFeePaymentSubstitute()}
                sizing="md"
                tooltip={usingAllFeePaymentSub ? t('button.useNftInfusions') : t('button.useAllFeeSubstitutes')}
                tooltipIconSize="sm"
              />
            </> : null}
          </div>

          <div>


            {!infusion.isProposalAction &&
              <Button
                className="self-start w-full"
                onClick={infusion.onInfuseNft}
                size="lg"
                variant="brand"
              >
                {t('button.infuseNfts')}
              </Button>
            }
            <Collapsible
              containerClassName="!gap-1 border-t border-border-secondary pt-2"
              contentContainerClassName="styled-scrollbar flex flex-col pl-[0.625rem] overflow-y-auto max-h-64 -mr-3.5 pr-3.5 -mb-4 pb-4"
              defaultCollapsed
              label={t('title.breakdown')}
              labelClassName="!body-text !text-text-tertiary"
              noContentIndent
              noHeaderIndent
            >

              {/* Fee Substitution Status */}
              <div className="mb-4 p-3 rounded-lg bg-background-interactive-disabled">
                <div className="flex items-center gap-2 mb-2">
                  <PanoramaFishEye className="w-4 h-4 text-text-interactive-valid" />
                  <p className="primary-text text-sm font-medium">
                    {usingAllFeePaymentSub ? t('title.feeSubstitutionActive') : t('title.usingFeeSubstitute')}
                  </p>
                </div>
                <p className="secondary-text text-xs">
                  {t('info.staticFeeExplination')}
                </p>

                {/* {infusion.infusionParamsGeneric && infusion.infusionParamsGeneric.mintFeeGeneric ?
                  <div className="mb-4 p-3 rounded-lg bg-background-interactive-disabled">
                    {
                      infusion.infusionParamsGeneric.mintFeeGeneric ? <>
                        <Tooltip title={t('info.staticFeeToolTip')}>
                          <TokenAmountDisplay
                            amount={HugeDecimal.from(infusion.infusionParamsGeneric.mintFeeGeneric.balance)}
                            className="text-text-body"
                            decimals={infusion.infusionParamsGeneric.mintFeeGeneric.token.decimals}
                            hideSymbol
                            iconUrl={
                              infusion.infusionParamsGeneric.mintFeeGeneric.token.imageUrl ||
                              getFallbackImage(infusion.infusionParamsGeneric.mintFeeGeneric.token.denomOrAddress)
                            }
                            showAllDecimals
                            showFullAmount
                            suffix={'  $' + infusion.infusionParamsGeneric.mintFeeGeneric.token.symbol}
                            suffixClassName="whitespace-pre text-text-tertiary"
                          />
                        </Tooltip>
                      </> : <>
                        <PanoramaFishEye className="w-8 h-8 text-text-tertiary mb-2" />
                        <p className="secondary-text text-sm">
                          {t('info.noBundlesSelected')}
                        </p>
                        <p className="secondary-text text-xs mt-1">
                          {t('info.selectNftsToCreateBundles')}
                        </p>
                      </>
                    }

                  </div> : undefined
                } */}
                <p className="secondary-text text-xs">
                  {t('info.totalBreakdownInfo')}
                </p>

                {watchFunds.map((c) => {
                  let paysub = infusion.eligibleCollections.find((ec) => ec.payment_substitute?.token.denomOrAddress == c.denom)?.payment_substitute;
                  let token = infusion.infusionParamsGeneric.mintFeeGeneric && c.denom == infusion.infusionParamsGeneric.mintFeeGeneric.token.denomOrAddress ? infusion.infusionParamsGeneric.mintFeeGeneric : paysub;
                  return <>
                    <div className="mb-4 p-3 rounded-lg bg-background-interactive-disabled">
                      <div
                        className={clsx(
                          'flex flex-row grow items-center justify-between min-w-0 gap-8',
                          // bottom border between items, with padding that
                          // matches top padding in the item below it
                          // index !== rewards.data.length - 1 &&
                          // 'border-dashed border-b border-border-secondary pb-2'
                        )}
                      >
                        <TokenAmountDisplay
                          amount={HugeDecimal.from(c.amount)}
                          className="text-text-body"
                          decimals={token ? token.token.decimals : 6}
                          hideSymbol
                          iconUrl={token?.token.imageUrl}
                          showFullAmount
                          suffix={'  $' + token ? token?.token.symbol : c.denom}
                          suffixClassName="whitespace-pre text-text-tertiary"
                        />
                      </div >
                    </div>
                  </>
                })}
                {/* reset bundle form */}
                {infusion.infusionParamsGeneric.mintFeeGeneric && <Button
                  className="self-start "
                  onClick={() => {
                    setValue((fieldNamePrefix + 'infusionBundles') as 'infusionBundles', [])
                    setValue((fieldNamePrefix + 'funds') as 'funds', [])
                    if (infusion.infusionParamsGeneric.mintFeeGeneric) {
                      appendCoin({ denom: infusion.infusionParamsGeneric.mintFeeGeneric.token.denomOrAddress, amount: infusion.infusionParamsGeneric.mintFeeGeneric.balance, decimals: infusion.infusionParamsGeneric.mintFeeGeneric.token.decimals, })
                    }

                  }}
                  size="sm"
                  variant="brand"
                >
                  {t('button.resetBundles')}
                </Button>}
              </div>


              {/* Bundle Display */}
              {!usingAllFeePaymentSub && watchInfuionBundles.length > 0 && (
                <div className="mb-4">
                  <BundleDisplay />
                </div>
              )}

            </Collapsible>
          </div>
        </div>


        <div className="flex flex-col gap-3 p-2 ">
          <div className="flex flex-col gap-6 p-4 rounded-lg bg-background-tertiary overflow-x-auto">

            {/* Eligible Collections & Bundle TZ */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="title-text truncate font-mono hover:opacity-80 transition-opacity">
                  {t('title.eligibleCollections')}
                </p>
              </div>
              <HorizontalScroller
                Component={EligibleCollectionCard}
                containerClassName="py-2"
                itemClassName="min-w-[12rem] w-48"
                items={{ loading: false, data: eligibleCollectionCardProps }}
              />
            </div>

            <div className="mt-auto">
              {'all_of' in infusion.infusionParamsGeneric.bundle_type ? (
                <p className="title-text truncate font-mono hover:opacity-80 transition-opacity">
                  {t('title.allofBundle')}
                </p>
              ) : 'any_of' in infusion.infusionParamsGeneric.bundle_type ? (
                <p className="title-text truncate font-mono hover:opacity-80 transition-opacity">
                  {t('title.anyOfBundle')}
                </p>
              ) : 'any_of_blend' in infusion.infusionParamsGeneric.bundle_type ? (
                <p className="title-text truncate font-mono hover:opacity-80 transition-opacity">
                  {t('title.anyOfBlend')}
                </p>
              ) : null}
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
              labelClassName="!body-text !text-text-tertiary"
              noContentIndent
              noHeaderIndent
            >
              {/* Horizontal  Gallery Modal */}
              <NftsTab
                NftCard={LazyNftCard}
                description={t('info.infusedGalleryExplanation', { context: 'all' })}
                nfts={infusedNfts}
                numNfts={numNfts}
                page={page}
                pageSize={NFTS_PER_PAGE}
                setPage={setPage}
              />
            </Collapsible>
          </div>

        </div>
      </div >
      {/* Full Gallery Modal */}
      {/* {
        displayGallery &&
        <NftsTab
          NftCard={LazyNftCard}
          description={t('info.nftCollectionExplanation', { context: 'all' })}
          nfts={infusedNfts}
          numNfts={numNfts}
          page={page}
          pageSize={NFTS_PER_PAGE}
          setPage={setPage}
        />

      } */}


      {/* NFT Selection Modal */}
      {
        infusion.isCreating && (
          <InfusionNFTSelectionModal
            action={{
              loading: false,
              label: t('button.save'),
              onClick: () => {
                setShowModal(false)
              },
            }}
            header={{ title: t('title.selectNftsToInfuse') }}
            headerContent={
              <Button
                variant="secondary"
                size="sm"
                className="self-start mt-2"
                onClick={handleReconnect}
              >
                {t('button.reconnectWalletToRefreshNFTs')}
              </Button>
            }
            footerContent={<>

              <div
                className={clsx(
                  'flex flex-row items-center gap-6',
                  // If selectedDisplay is null, it will be hidden, so align button at
                  // the end.
                  // selectedDisplay === null ? 'justify-end' : 'justify-between'
                  'justify-end'
                )}
              >
                {/* {selectedDisplay !== undefined ? (
                  selectedDisplay
                ) : ( */}
                <p>{t('info.numNftsSelected', { count: selectedKeys.length })}</p>
                {/* )} */}

                <div className="flex flex-row items-stretch gap-2">
                  {/* {secondaryAction && (
                    <Button
                      loading={secondaryAction.loading}
                      onClick={secondaryAction.onClick}
                      variant="secondary"
                    >
                      {secondaryAction.label}
                    </Button>
                  )} */}

                  <Button
                    disabled={selectedKeys.length === 0}
                    loading={false}
                    onClick={() => {
                      setShowModal(false)
                    }}
                    variant="primary"
                  >
                    {t('button.save')}
                  </Button>
                </div>
              </div>
              <BundleDisplay />
            </>

            }
            nfts={infusion.entityEligibleNFTs}
            onClose={() => setShowModal(false)}
            onNftClick={(nft) => {
              const selected = getValues((fieldNamePrefix + 'infusionBundles') as 'infusionBundles')
              console.log("debug selected:", selected)
              const isSelected = selected.some((bundle) => {
                let found = bundle.nfts.find((bnft) => {
                  let addrEquals = bnft.addr === nft.collectionAddress
                  let tokenIdEq = bnft.token_id === parseInt(nft.tokenId)
                  console.log("addrEquals:", addrEquals)
                  console.log("tokenIdEq:", tokenIdEq)
                  return addrEquals && tokenIdEq
                })
                if (found) {
                  return true
                } else {
                }
              })
              console.log("isSelected:", isSelected)
              if (isSelected) {
                updateInfusionBundles(nft, true)
              } else {
                updateInfusionBundles(nft, false)
              }

              console.log("After click selected nfts:", infusion.selectedNfts)
              console.log("After click selected watchInfuionBundles:", watchInfuionBundles)
            }}
            selectedKeys={selectedKeys}
            visible={showModal}
          />
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
