import { ArrowOutwardRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import { EligibleCollectionCardProps } from '@dao-dao/types'
import { toAccessibleImageUrl } from '@dao-dao/utils'
import { Button, LinkWrapper, ProfileImage, TokenAmountDisplay, TooltipLikeDisplay, useDaoNavHelpers } from '@dao-dao/stateless'
import { InfuseNftsData } from '../../InfusionsRenderer'


export const EligibleCollectionCard = ({
  fieldNamePrefix,
  nftAddr,
  paymentSub,
  requiredParams,
  index,
  nftInfo,
  contractInfo,
  globalPaymentSub,
}: EligibleCollectionCardProps) => {
  const { t } = useTranslation()

  const [usingFeeSub, setUsingFeeSub] = useState<boolean>(false)
  const [imageLoading, setImageLoading] = useState(!!nftInfo.image)
  const [imageLoadErrored, setImageLoadErrored] = useState(false)
  const [loadedImageSrc, setLoadedImgSrc] = useState<string>()

  const { control, setValue, watch } = useFormContext<InfuseNftsData>()

  const watchInfuionBundles = watch((fieldNamePrefix + 'infusionBundles') as 'infusionBundles')
  // funds
  const {
    fields: watchCoins,
    append: appendCoin,
    remove: removeCoin,
    update: updateCoin,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'funds') as 'funds',
  })

  // // feesubMaps
  // const {
  //   fields: feeSubMap,
  //   append: appendFeeSubMap,
  //   remove: removeFeeSubMap,
  //   update: updateFeesubMap,
  // } = useFieldArray({
  //   control,
  //   name: (fieldNamePrefix + 'feeSubEnabled') as 'feeSubEnabled',
  // })

  const onUseSingleFeeSubstitute = () => {
    if (usingFeeSub) {
      // console.log("disabling fee substitute")
      if (!requiredParams.payment_substitute) return;
      // // find in feesubmap to display in parent
      // let feeSubIndex = feeSubMap.findIndex((fsi => fsi.addr == nftAddr))
      // if (feeSubIndex >= 0) {
      //   removeFeeSubMap(feeSubIndex)
      // }

      // console.log("watchCoins prior to removing:", watchCoins)
      const denom = requiredParams.payment_substitute.token.denomOrAddress;
      const subtractAmount = HugeDecimal.from(requiredParams.payment_substitute.balance);

      const coinIndex = watchCoins.findIndex(c => c.denom === denom);

      if (coinIndex >= 0) {
        console.log("found coin at index:", coinIndex)
        const currentAmount = HugeDecimal.from(watchCoins[coinIndex].amount);
        const newAmount = currentAmount.minus(subtractAmount);

        if (newAmount.gt(0)) {
          updateCoin(coinIndex, {
            ...watchCoins[coinIndex],
            amount: newAmount.toString()
          });
        } else {
          removeCoin(coinIndex);
        }
      }
      setUsingFeeSub(false)
      // console.log("watchCoins after removing:", watchCoins)
    } else {
      // console.log("enabling abling fee substitute")
      // console.log("watchCoins", watchCoins)
      const newBundles = watchInfuionBundles.map(bundle => ({
        ...bundle,
        nfts: bundle.nfts.filter(nft => nft.addr !== nftAddr)
      })).filter(bundle => bundle.nfts.length > 0);

      console.log("newBundles", newBundles)
      setValue(`${fieldNamePrefix}infusionBundles` as 'infusionBundles', newBundles);

      if (!requiredParams.payment_substitute) return;

      const denom = requiredParams.payment_substitute.token.denomOrAddress;
      const addAmount = HugeDecimal.from(requiredParams.payment_substitute.balance);
      const coinIndex = watchCoins.findIndex(c => c.denom === denom);

      if (coinIndex >= 0) {
        const currentAmount = HugeDecimal.from(watchCoins[coinIndex].amount);
        const newAmount = currentAmount.plus(addAmount);

        updateCoin(coinIndex, {
          ...watchCoins[coinIndex],
          amount: newAmount.toString()
        });
      } else {
        appendCoin({
          denom,
          amount: addAmount.toString(),
          decimals: requiredParams.payment_substitute.token.decimals,

        });
      }

      setUsingFeeSub(true)

      // // find in feesubmap to display in parent
      // let feeSubIndex = feeSubMap.findIndex((fsi => fsi.addr == nftAddr))
      // if (feeSubIndex >= 0) {

      //   console.log("found fee sub index", newBundles)
      // } else {
      //   appendFeeSubMap({ addr: nftAddr })
      // }
    }
  };

  useEffect(() => {
    if (
      // If showing a video, don't load image.
      //   video ||
      !nftInfo.image ||
      loadedImageSrc === toAccessibleImageUrl(nftInfo.image)
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
    img.src = toAccessibleImageUrl(nftInfo.image)
  }, [nftInfo.image, loadedImageSrc])

  const showingImageUrl = nftInfo.image && !imageLoadErrored


  return (
    <div
      className={clsx(
        'flex flex-col justify-between rounded-lg border shadow-sm transition-colors',
        usingFeeSub
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
          : 'border-border-primary'
      )}
    >

      <div className="flex flex-col items-center">
        <div className="p-6 pb-4">
          <ProfileImage
            imageUrl={loadedImageSrc}
            loading={imageLoading}
            rounded={true}
            size="lg"
          />
        </div>

        <div className="px-6 pb-4">
          <div className="flex flex-row gap-2 items-center justify-center">
            <LinkWrapper
              href={`https://www.stargaze.zone/m/${nftAddr}/tokens`}
              onClick={(e) => e.stopPropagation()}
              openInNewTab
              className="relative group"
            >
              <TooltipLikeDisplay
                className="group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 shadow-dp4 transition-opacity hover:!opacity-90 z-10"
                icon={<ArrowOutwardRounded className="!h-4 !w-4" />}
                label={t('button.openInDestination', {
                  destination: 'Stargaze',
                })}
              />
              <h3 className="title-text text-text-body text-lg font-medium text-center hover:text-text-interactive-hover transition-colors">
                {contractInfo.name}
              </h3>
            </LinkWrapper>
          </div>
        </div>

        <div className="w-full border-t border-border-interactive-disabled" />

        <div className="px-6 py-4 space-y-3 w-full">
          <div className="flex flex-col items-center space-y-1">
            <span className="secondary-text text-xs font-medium uppercase tracking-wide">
              {t('info.minRequired')}
            </span>
            <span className="primary-text text-base font-semibold">
              {requiredParams.min_req}
            </span>
          </div>



          {requiredParams.payment_substitute && (
            <div className="flex flex-col items-center space-y-3 pt-2">
              <span className="secondary-text text-xs font-medium uppercase tracking-wide">
                {t('info.paymentSubstitute')}
              </span>
              <TokenAmountDisplay
                amount={HugeDecimal.from(
                  requiredParams.payment_substitute.balance
                )}
                decimals={requiredParams.payment_substitute.token.decimals}
                iconUrl={requiredParams.payment_substitute.token.imageUrl}
                showFullAmount
                symbol={requiredParams.payment_substitute.token.symbol}
              />
              {paymentSub && !globalPaymentSub && (
                <div className="pt-2">
                  <Button
                    onClick={onUseSingleFeeSubstitute}
                    variant="secondary"
                    size="sm"
                  >
                    {usingFeeSub
                      ? t('button.removePaymentSubstitute')
                      : t('button.usePaymentSubstitute')}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
