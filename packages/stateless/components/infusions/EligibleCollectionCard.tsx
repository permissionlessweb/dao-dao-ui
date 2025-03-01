import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { EligibleCollectionCardProps, EntityType } from '@dao-dao/types'
import { abbreviateAddress, formatPercentOf100 } from '@dao-dao/utils'

import { useDaoNavHelpers } from '../../hooks'
import { ButtonLink } from '../buttons'
import { CopyToClipboard } from '../CopyToClipboard'
import { ProfileImage } from '../profile'
import { TokenAmountDisplay } from '../token'
import { LinkWrapper } from '../LinkWrapper'
import { TooltipLikeDisplay } from '../tooltip'
import { ArrowOutwardRounded } from '@mui/icons-material'

export const EligibleCollectionCard = ({
    address,
    paymentSub,
    substituteLabel,
    index,

}: EligibleCollectionCardProps) => {
    const { t } = useTranslation()
    const { getDaoPath } = useDaoNavHelpers()

    // const title = loadingOrHasName ? (
    //     <p
    //         className={clsx(
    //             'title-text text-text-body !text-base',
    //             (loadingEntity.loading || loadingEntity.updating) && 'animate-pulse'
    //         )}
    //     >
    //         {loadingEntity.loading ||
    //             (loadingEntity.updating && !loadingEntity.data.name)
    //             ? '...'
    //             : loadingEntity.data.name}
    //     </p>
    // ) : (
    //     <p className="title-text text-text-tertiary !text-base truncate">
    //         {abbreviateAddress(address)}
    //     </p>
    // )

    return (
        <div className="flex flex-col justify-between rounded-md border border-border-primary">

            <div className="flex flex-col items-center p-4 gap-2">
                {/*   <ProfileImage
                imageUrl={
                    loadingEntity.loading ? undefined : loadingEntity.data.imageUrl
                }
                loading={loadingEntity.loading || loadingEntity.updating}
                rounded={
                    !loadingEntity.loading &&
                    loadingEntity.data.type !== EntityType.Wallet
                }
                size="lg"
            />        */}

                <div className="flex flex-row gap-2 items-center">
                    <LinkWrapper
                        href={`https://www.stargaze.zone/m/${address}/tokens`}
                        // Don't click on anything else, such as the checkbox.
                        onClick={(e) => e.stopPropagation()}
                        openInNewTab
                    >
                        <TooltipLikeDisplay
                            className="group-hover/nft:opacity-100 absolute bottom-4 left-4 opacity-0 shadow-dp4 transition-opacity hover:!opacity-90"
                            icon={<ArrowOutwardRounded className="!h-5 !w-5" />}
                            label={t('button.openInDestination', {
                                destination: "Stargaze",
                            })}
                        />
                    </LinkWrapper>

                    {/* {!loadingEntity.loading &&
                        loadingEntity.data.type === EntityType.Dao ? (
                        <ButtonLink href={getDaoPath(address)} size="none" variant="none">
                            {title}
                        </ButtonLink>
                    ) : (
                        title
                    )} */}


                </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-border-interactive-disabled p-4">
                {/* Balance */}
                {/* <div className="flex flex-row flex-wrap items-center justify-between gap-x-2 gap-y-1">
                    <p className="caption-text">{balanceLabel}</p>

                    <TokenAmountDisplay
                        amount={balance.loading ? { loading: true } : balance.data.amount}
                        className="caption-text font-mono"
                        decimals={
                            balance.loading || !balance.data.token
                                ? 0
                                : balance.data.token.decimals
                        }
                        hideSymbol={!balance.loading && !balance.data.token}
                        symbol={balance.loading ? '...' : balance.data.token?.symbol || ''}
                    />
                </div> */}
            </div>
        </div >
    )
}
