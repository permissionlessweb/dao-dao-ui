import { ArrowOutwardRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import { InfuseNftsData } from '@dao-dao/stateful/actions/core/actions/TransferInfusions/InfuseNfts'
import { EligibleCollectionCardProps } from '@dao-dao/types'
import { toAccessibleImageUrl } from '@dao-dao/utils'

import { useDaoNavHelpers } from '../../hooks'
import { Button } from '../buttons'
import { LinkWrapper } from '../LinkWrapper'
import { ProfileImage } from '../profile'
import { TokenAmountDisplay } from '../token'
import { TooltipLikeDisplay } from '../tooltip'

export const EligibleCollectionCard = ({
  fieldNamePrefix,
  address,
  paymentSub,
  requiredParams,
  index,
  nftInfo,
  contractInfo,
}: EligibleCollectionCardProps) => {
  const { t } = useTranslation()
  const { getDaoPath } = useDaoNavHelpers()

  const [paymentSubstituteEligible, setPaymentSubEligible] =
    useState<boolean>(false)
  const { control, watch, setValue, setError, register, clearErrors } =
    useFormContext<InfuseNftsData>()

  const watchTokenId = watch((fieldNamePrefix + 'funds') as 'funds')

  const {
    fields: coins,
    append: appendCoin,
    remove: removeCoin,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'funds') as 'funds',
  })
  const [paymentSubstituteSet, setPaymentSubstitute] = useState(false)

  const [imageLoading, setImageLoading] = useState(!!nftInfo.image)
  const [imageLoadErrored, setImageLoadErrored] = useState(false)
  const [loadedImageSrc, setLoadedImgSrc] = useState<string>()
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
    console.log('nftInfo.image', nftInfo.image)
    img.src = toAccessibleImageUrl(nftInfo.image)
  }, [nftInfo.image, loadedImageSrc])

  const showingImageUrl = nftInfo.image && !imageLoadErrored

  const title = (
    <p className={clsx('title-text text-text-body !text-base')}>
      {contractInfo.name}
    </p>
  )
  // : (
  //     <p className="title-text text-text-tertiary !text-base truncate">
  //         {abbreviateAddress(address)}
  //     </p>
  // )

  return (
    <div className="flex flex-col justify-between rounded-md border border-border-primary">
      <div className="flex flex-col items-center p-4 gap-2">
        <ProfileImage
          imageUrl={loadedImageSrc}
          loading={imageLoading}
          rounded={true}
          size="lg"
        />
        <div className="flex flex-row gap-2 items-center">
          <LinkWrapper
            href={`https://www.stargaze.zone/m/${address}/tokens`}
            // Don't click on anything else, such as the checkbox.
            onClick={(e) => e.stopPropagation()}
            openInNewTab
          >
            <TooltipLikeDisplay
              className="group-hover/nft:opacity-100 absolute  left-4 opacity-0 shadow-dp4 transition-opacity hover:!opacity-90"
              icon={<ArrowOutwardRounded className="!h-5 !w-5" />}
              label={t('button.openInDestination', {
                destination: 'Stargaze',
              })}
            />
            <p className="primary-text text-xs">{title}</p>
          </LinkWrapper>
        </div>
        <div className="flex flex-col  border-t border-border-interactive-disabled  " />
        <p className="secondary-text text-xs">{t('info.minRequired')}</p>
        <p className="primary-text text-sm">{requiredParams.min_req}</p>
        {requiredParams.max_req !== requiredParams.min_req && (
          <>
            <p className="secondary-text text-xs">{t('info.maxRequired')}</p>
            <p className="primary-text text-sm">{requiredParams.max_req}</p>
          </>
        )}
        {requiredParams.payment_substitute && (
          <>
            <p className="secondary-text text-xs">
              {t('info.paymentSubstitute')}
            </p>
            <TokenAmountDisplay
              amount={HugeDecimal.from(
                requiredParams.payment_substitute.balance
              )}
              decimals={requiredParams.payment_substitute.token.decimals}
              iconUrl={requiredParams.payment_substitute.token.imageUrl}
              showFullAmount
              symbol={requiredParams.payment_substitute.token.symbol}
            />
            {paymentSub ? (
              <div className="flex flex-row gap-3 items-center">
                <Button
                  className="mb-2 self-start"
                  onClick={() => {
                    if (!paymentSubstituteSet) {
                      // If the token wasn't found in the existing coins, append it
                      var found = false
                      const token = watchTokenId.find((coin, i) => {
                        found = true
                        console.log('watchTokenId:', coin, i)
                        let added = HugeDecimal.from(coin.amount)
                          .plus(paymentSub.balance)
                          .toString()
                        if (coin.denom === paymentSub.token.denomOrAddress) {
                          setValue(
                            (fieldNamePrefix +
                              `funds.${i}.amount`) as `funds.${number}.amount`,
                            added
                          )
                        }
                      })
                      if (!found) {
                        appendCoin({
                          amount: paymentSub.balance,
                          denom: paymentSub.token.denomOrAddress,
                          decimals: 0,
                        })
                      }
                      setPaymentSubstitute(true)
                    } else {
                      // Remove payment substitute
                      watchTokenId.map((coin, i) => {
                        if (coin.denom === paymentSub.token.denomOrAddress) {
                          const subtractedAmount = HugeDecimal.from(coin.amount)
                            .minus(paymentSub.balance)
                            .toString()
                          if (subtractedAmount !== '0') {
                            removeCoin(i)
                            appendCoin({ ...coin, amount: subtractedAmount })
                          } else {
                            removeCoin(i)
                          }
                        }
                      })
                      setPaymentSubstitute(false)
                    }
                  }}
                  variant="secondary"
                >
                  {paymentSubstituteSet
                    ? t('button.removePaymentSubstitute')
                    : t('button.usePaymentSubstitute')}
                </Button>
              </div>
            ) : undefined}
          </>
        )}
      </div>
    </div>
  )
}
