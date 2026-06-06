import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import { VestingPaymentLineProps } from '@dao-dao/types'
import { formatDate, formatDateTimeTz } from '@dao-dao/utils'


import { AvEventLineProps } from '../stateful/AvEventLine'
import { Button, ChainProvider, Dropdown, TokenAmountDisplay, Tooltip, useTranslatedTimeDeltaFormatter } from '@dao-dao/stateless'

export const AvEventInstanceLine = ({
    eventInfo,
    onClick,
    transparentBackground,
    EntityDisplay,
}: AvEventLineProps) => {
    const { t } = useTranslation()
    const startTimeAgoFormatter = useTranslatedTimeDeltaFormatter({
        words: true,
        futureMode: 'in',
    })
    //   const endTimeAgoFormatter = useTranslatedTimeDeltaFormatter({
    //     words: true,
    //     futureMode: 'left',
    //   })

    const {
        config,
        eventChainId,
        eventContract,
        startDate,
        completed,
        eventGuestDetails,
        usherWeight,
    } = eventInfo

    const guestTypeOptions = eventGuestDetails.map((guestType, index) => ({
        value: [guestType],
        label: guestType.guest_type,
    }))

    const isAdmin = usherWeight.weight ? usherWeight.weight > 0 ? true : false : false

    return (
        <ChainProvider chainId={eventChainId}>
            <div
                className={clsx(
                    'box-content grid h-8 cursor-pointer grid-cols-2 items-center gap-3 rounded-lg py-2 px-3 transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed md:grid-cols-[2fr_3fr_3fr_4fr] md:gap-4 md:py-3 md:px-4',
                    !transparentBackground && 'bg-background-tertiary'
                )}
                onClick={onClick}
            >
                {/* Event curator */}
                <EntityDisplay address={config.curator} noUnderline />

                {completed ? (
                    <>
                        <div className="hidden md:block">
                            {/* {endDate ? (
                                <Tooltip title={endDate && formatDateTimeTz(endDate)}>
                                    <p className="inline-block">{formatDate(endDate, true)}</p>
                                </Tooltip>
                            ) : (
                                <p>{t('info.unknown')}</p>
                            )} */}
                        </div>

                        <div className="hidden md:block">
                            {/* Only show balance available to withdraw if nonzero. */}
                            {/* {distributable.isPositive() && (
                                <TokenAmountDisplay
                                    amount={distributable}
                                    className="body-text truncate font-mono"
                                    decimals={token.decimals}
                                    symbol={token.symbol}
                                />
                            )} */}
                        </div>

                        {/* <TokenAmountDisplay
                            amount={total}
                            className="body-text truncate text-right font-mono"
                            decimals={token.decimals}
                            symbol={token.symbol}
                            wrapperClassName="justify-end"
                        /> */}
                    </>
                ) : (
                    <>
                        <div className="hidden md:block">
                            {/* Event start date */}
                            {startDate ? (
                                <Tooltip title={startDate && formatDateTimeTz(startDate)}>
                                    <div className="inline-block">
                                        <TimeAgo
                                            date={startDate}
                                            formatter={startTimeAgoFormatter}
                                        />
                                    </div>
                                </Tooltip>
                            ) : (
                                <p>{t('info.unknown')}</p>
                            )}
                        </div>

                        <>
                            {/*  Display all guest types for event*/}
                            <div onClick={(event) => event.stopPropagation()}>
                                <Dropdown
                                    onSelect={() => {
                                        // todo: prompt event card to purchase ticket for this specific guest type
                                    }}
                                    options={guestTypeOptions}
                                    placeholder={t('info.eventGuestTypes', {
                                        number: guestTypeOptions.length,
                                    })}
                                />
                            </div>
                        </>


                        {/* Button for event ushers to checkin guests */}
                        {isAdmin &&
                            <div className="body-text flex flex-row items-center justify-end gap-1 justify-self-end text-right font-mono">
                                <Button
                                    className="self-start"
                                    onClick={() =>
                                    // prompt qrcode modal popup as admin
                                    { }
                                    }
                                    variant="secondary"
                                >
                                    {t('button.checkinGuest')}
                                </Button>
                            </div>}

                    </>
                )}
            </div>
        </ChainProvider>
    )
}
