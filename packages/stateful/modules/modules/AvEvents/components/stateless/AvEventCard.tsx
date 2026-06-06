import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

import { HugeDecimal } from '@dao-dao/math'
import { allBalancesSelector } from '@dao-dao/state'
import { tokenQueries } from '@dao-dao/state/query'
import { cwAveQueries } from '@dao-dao/state/query/queries/contracts/CwAve'
import {
    Button,
    Collapsible,
    HorizontalScroller,
    SegmentedControls,
    StatusCard,
    TokenAmountDisplay,
    TokenInput,
    Tooltip,
    useActionOptions,
    useCachedLoading,
    useChain,
    useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
    ActionContextType,
    ActionKey,
    TokenType,
    AvEventInstance, AvEventsMode,
    TicketInfoCardProps,
    ButtonPopupSection,
    AvEventPurchaseTicketsActionData
} from '@dao-dao/types'
import {
    getChainForChainId,
    getDaoProposalSinglePrefill,
    isValidBech32Address,
    processError,
    UNDO_PAGE_PADDING_HORIZONTAL_CLASSES,
} from '@dao-dao/utils'

import { QueryClient } from '@tanstack/react-query'
import { } from '@dao-dao/types/contracts/CwAve'
import { useAwaitNextBlock, useEntity, useQueryLoadingDataWithError, useWallet } from '../../../../../hooks'
import { DaoCard, EntityDisplay } from '../../../../../components'
import clsx from 'clsx'
import { TicketInfoCard } from './TicketInfoCard'



export type AvEventCardProps = {
    eventInfo: AvEventInstance
    guestCards: TicketInfoCardProps[]
}


export const AvEventCard = ({ eventInfo, guestCards }: AvEventCardProps) => {
    const { t } = useTranslation()
    const { chainId } = useChain()
    const { bech32Prefix } = getChainForChainId(chainId)

    const { goToDaoProposal } = useDaoNavHelpers()
    const [mode, setMode] = useState(AvEventsMode.Guest)
    const {
        chain: { chainId: daoChainID }, queryClient,
    } = useActionOptions()
    const { address: walletAddress = '', getSigningClient } = useWallet()

    const {
        control,
        register,
        watch,
        setValue,
        setError,
        getValues,
        resetField,
        reset,
        clearErrors,
        formState,
    } = useFormContext<AvEventPurchaseTicketsActionData>()
    const watchTicketsToPurchase = watch('tickets_to_purchase')

    const { entity } = useEntity(isValidBech32Address(walletAddress, bech32Prefix) ? walletAddress : '')

    const isIbc = !!daoChainID && !!chainId && daoChainID !== chainId


    const [prestageTicketPurchase, setPrestageTicketPurchase] = useState(false)
    const onPreparePurchaseTicket = async () => {
        setPrestageTicketPurchase(true)
        // setDisconnecting(true)
        // try {
        //     await disconnect()
        //     afterDisconnect?.()
        // } finally {
        //     setDisconnecting(false)
        // }
    }


    // const balances = useCachedLoading(
    //     allBalancesSelector({
    //         chainId,
    //         address: entity.loading ? walletAddress : entity.data.address,
    //         // This hook is used to fetch usable balances for actions. Staked
    //         // balances are not desired.
    //         ignoreStaked: true,
    //         // includeAccountTypes,
    //         // excludeAccountTypes,
    //         // includeChainIds,
    //     }),
    //     [],
    //     (error) => console.error(error)
    // )

    // if user wants to make payment with fund from account,
    // we make use of the recoilHook here that takes the props currently set
    // const makeShitstrapPayment = useMakeShitstrapPayment({
    //     contractAddress: fallbackInfo.eventContract,
    //     sender: walletAddress,
    // })
    // const makeShitstrapFlush = useFlush({
    //     contractAddress: fallbackInfo.eventContract,
    //     sender: walletAddress,
    // })

    // const shitAction = useInitializedActionForKey(ActionKey.ManageShitstrap)
    // const [makingPayment, setMakingPayment] = useState(false)
    // const awaitNextBlock = useAwaitNextBlock()



    return (
        <>
            <div className="rounded-lg bg-background-tertiary">
                {/* Description */}
                <div className="flex flex-col gap-1 border-t border-border-secondary py-4 px-6">
                    <div className="flex flex-row items-start justify-between gap-8">
                        <p className=" link-text  text-lg">
                            {eventInfo && eventInfo.config.title}
                        </p>
                    </div>
                    {/* <p className="link-text">{eventInfo && eventInfo.config.description}</p> */}
                    <p className="link-text"><EntityDisplay address={eventInfo.config.curator} /> </p>
                </div>

                {/* event timeline */}
                <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-6">
                    <p className="link-text  text-lg">{' '}</p>
                    {/* <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-6">
                        <p className="link-text">
                            {' '}
                            {eventInfo && eventInfo}
                        </p>
                    </div> */}
                </div>

                <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-0">
                    {/* all event tickets */}
                    <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-6">
                        <h4 className="text-lg font-bold">{t('info.ticketInfo')}</h4>
                        <HorizontalScroller
                            // Margin offsets container padding.
                            Component={TicketInfoCard}
                            containerClassName={clsx(
                                'self-stretch px-[1px]',
                                (eventInfo.eventGuestDetails.length > 0) &&
                                UNDO_PAGE_PADDING_HORIZONTAL_CLASSES
                            )}
                            contentContainerClassName="px-6"
                            itemClassName="w-64"
                            items={{ loading: false, updating: false, data: guestCards }}
                            shadowClassName="w-6"
                        />
                        <Button center variant="secondary" className="w-full" onClick={onPreparePurchaseTicket} size="lg" >
                            <p>{t('button.confirmTicketPurchase')}</p>
                        </Button>
                    </div>

                    {prestageTicketPurchase && (

                        <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-6">
                            <p className=" link-text  text-lg">
                                {t(`title.previewTicketAction`)}
                            </p>
                            <Collapsible
                                containerClassName="!gap-1 border-t border-border-secondary pt-2"
                                contentContainerClassName="styled-scrollbar flex flex-col pl-[0.625rem] overflow-y-auto max-h-64 -mr-3.5 pr-3.5 -mb-4 pb-4"
                                defaultCollapsed
                                label={t('title.breakdown')}
                                labelClassName="!body-text !text-text-tertiary"
                                noContentIndent
                                noHeaderIndent
                            >
                                {watchTicketsToPurchase.map(
                                    (ticket, index) => (
                                        <div
                                            key={ticket.weight}
                                            className={clsx(
                                                'flex flex-row pl-4 items-stretch border-border-secondary border-l-2',
                                                // padding between above item's bottom border
                                                index > 0 && 'pt-2',
                                                // padding above first and below last items within
                                                // container
                                                index === 0 && 'pt-1',
                                                index === ticket.tickets.length - 1 && 'pb-1'
                                            )}
                                        >
                                            <div
                                                className={clsx(
                                                    'flex flex-row grow items-center justify-between min-w-0 gap-8',
                                                    // bottom border between items, with padding that
                                                    // matches top padding in the item below it
                                                    index !== ticket.tickets.length - 1 &&
                                                    'border-dashed border-b border-border-secondary pb-2'
                                                )}
                                            >
                                                {ticket.tickets.map(tt => (

                                                    <>{tt.quantity > 0 ? <>
                                                        {tt.quantity} x
                                                        {<TokenAmountDisplay
                                                            amount={HugeDecimal.from(tt.payment.balance)}
                                                            className="caption-text mt-4 font-mono"
                                                            decimals={tt.payment.token.decimals}
                                                            // ={t('info.ticketCost') + ': '}
                                                            showFullAmount
                                                            iconUrl={tt.payment.token.imageUrl}
                                                            symbol={tt.payment.token.symbol}
                                                        />}
                                                    </> : null}</>
                                                ))}
                                                {/* <TokenAmountDisplay
                                                    amount={ticket}
                                                    className="text-text-body"
                                                    decimals={token.decimals}
                                                    hideSymbol
                                                    iconUrl={
                                                        token.imageUrl ||
                                                        getFallbackImage(token.denomOrAddress)
                                                    }
                                                    showAllDecimals
                                                    showFullAmount
                                                    suffix={'  $' + token.symbol}
                                                    suffixClassName="whitespace-pre text-text-tertiary"
                                                />

                                                <TokenAmountDisplay
                                                    amount={usdValue}
                                                    className={clsx(
                                                        '!text-sm',
                                                        usdValue > 0
                                                            ? '!text-text-interactive-valid'
                                                            : '!text-text-tertiary'
                                                    )}
                                                    dateFetched={timestamp}
                                                    decimals={2}
                                                    hideSymbol
                                                    minAmount={0.01}
                                                    prefix="$"
                                                    showAllDecimals
                                                    wrapperClassName="shrink-0"
                                                /> */}
                                            </div>
                                        </div>
                                    )
                                )}
                            </Collapsible>
                            {/* <Tooltip title={'Select the shit action you wish to perform. Only the owner of the shit may flush. You shit, you flush.'}>
                            <div className="mt-5 flex w-full flex-col gap-1">

                                <SegmentedControls
                                    onSelect={setMode}
                                    selected={mode}
                                    tabs={[
                                        {
                                            label: t('button.avEventsMode.guest'),
                                            value: AvEventsMode.Guest,
                                        },
                                        {
                                            label: t('button.avEventsMode.usher'),
                                            value: AvEventsMode.Usher,
                                        },
                                    ]}
                                />
                            </div>
                        </Tooltip> */}


                            {/* display modal to select guest type to select  */}

                            {mode === AvEventsMode.Guest ? (
                                <>
                                    <div className="mt-5 flex w-full flex-col gap-2">
                                        <p className="link-text text-lg">
                                            {t(`title.avEventGuestActions`)}
                                        </p>

                                        {/* display selected guest type information  */}
                                        {/*  */}
                                    </div>


                                </>
                            ) : null}
                            {mode === AvEventsMode.Usher ? (
                                <>
                                    <div className="mt-5 flex w-full flex-col gap-2">
                                        <p className="link-text text-lg">
                                            {t(`title.avEventUsherAction`)}
                                        </p>

                                    </div>


                                </>
                            ) : null}


                        </div>
                    )}


                </div>
            </div>
        </>
    )
}
