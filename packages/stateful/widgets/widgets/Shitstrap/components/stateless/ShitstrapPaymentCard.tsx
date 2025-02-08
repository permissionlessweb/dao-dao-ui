import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import {
    allBalancesSelector,
    DaoDaoCoreSelectors,
    genericTokenBalancesSelector,
} from '@dao-dao/state'
import { accountQueries, cwShitstrapExtraQueries, polytoneQueries, tokenQueries } from '@dao-dao/state/query'
import {
    Button,
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
    Entity,
    EntityType,
    ShitstrapPaymentMode,
    StatefulShitStrapPaymentCardProps,
    TokenType,
} from '@dao-dao/types'
import {
    getChainForChainId,
    getDaoProposalSinglePrefill,
    isValidBech32Address,
    processError,
} from '@dao-dao/utils'

import {
    useAwaitNextBlock,
    useEntity,
    useQueryLoadingDataWithError,
    useWallet,
} from '../../../../../hooks'
import { useMakeShitstrapPayment } from '../../../../../hooks/contracts/CwShitstrap'
import { entityQueries } from '../../../../../queries'
import { useTokenBalances } from '../../../../../actions'

export const ShitstrapPaymentCard = (
    { shitstrapInfo: fallbackInfo, shitting, queryClient }: StatefulShitStrapPaymentCardProps) => {
    const { t } = useTranslation()
    const { chainId } = useChain()
    const { bech32Prefix, } = getChainForChainId(chainId)

    const { goToDaoProposal } = useDaoNavHelpers()
    const [mode, setMode] = useState(ShitstrapPaymentMode.Payment)
    const { context, address, chainContext, chain: { chainId: daoChainID } } = useActionOptions()
    // create form for selecting token and amount
    const { register, control, watch, setValue, setError, getValues, clearErrors, } = useForm()

    // token & amount being sent to shitstrap contract in msg
    const watchShitToken = watch(('payment.' + 'shitToken') as 'shitToken')
    const watchAmount = watch(('payment.' + 'amount') as 'amount')

    const { address: walletAddress = '', getSigningClient } = useWallet()

    const [usingOwnShit, setUsingOwnShit] = useState(true)
    const { entity } = useEntity(!usingOwnShit ?
        isValidBech32Address(address, bech32Prefix) ? address : address :
        isValidBech32Address(walletAddress, bech32Prefix) ? walletAddress : ''
    )

    const isIbc = !!daoChainID && !!chainId && daoChainID !== chainId


    // // Load balances as loadables since they refresh automatically on a timer.
    // const currentEntityTokenBalances = useCachedLoading(
    //     entity &&
    //         !entity.loading &&
    //         entity.data ? genericTokenBalancesSelector({
    //             chainId: chainId,
    //             address: entity.data.address,
    //             filter: {
    //                 account: {
    //                     chainId,
    //                     address: entity.data.polytoneProxy ? entity.data.polytoneProxy.address : entity.data.address,
    //                 },
    //             },
    //         })
    //         : undefined,
    //     []
    // )


    const balances = useCachedLoading(
        allBalancesSelector({
            chainId,
            address: entity.loading ? walletAddress : entity.data.address,
            // cw20GovernanceTokenAddress: governanceTokenAddress,
            // additionalTokens,
            // This hook is used to fetch usable balances for actions. Staked
            // balances are not desired.
            ignoreStaked: true,
            // includeAccountTypes,
            // excludeAccountTypes,
            // includeChainIds,
        }),
        [],
        (error) => console.error(error)
    )


    // if wallet is selected to make payment, use wallet tokens in TokenInput, broacast payment via wallet
    useEffect(() => {
        if (context.type === ActionContextType.Wallet) {
            setUsingOwnShit(true)
        }
    }, [context.type])

    // helper for actions to occur once token is selected
    const [initialValueSet, setInitialValueSet] = useState(false)
    useEffect(() => {
        if (watchShitToken && !initialValueSet) {
            setInitialValueSet(true)
        }
    }, [watchShitToken])


    // Use info passed into props as fallback, since it came from the list query;
    // the individual query updates more frequently.
    const freshInfo = useQueryLoadingDataWithError(
        cwShitstrapExtraQueries.info(queryClient, {
            chainId,
            contractAddress: fallbackInfo.shitstrapContractAddr,
        })
    )
    const shitstrapInfo = freshInfo.loading || freshInfo.errored ? undefined : freshInfo.data

    const freshShitTokenQuery = useQueryLoadingDataWithError(
        tokenQueries.info(queryClient, {
            chainId,
            type: shitstrapInfo ? shitstrapInfo?.shit.type : fallbackInfo.shit.type,
            denomOrAddress: shitstrapInfo ? shitstrapInfo.shit.denomOrAddress : fallbackInfo.shit.denomOrAddress,

        })
    )

    const tokenToShit = freshShitTokenQuery.loading || freshShitTokenQuery.errored ? undefined : freshShitTokenQuery.data


    // return the asset that 
    const eligibleAsset = watchShitToken && shitstrapInfo
        ? shitstrapInfo.possibleShit.find((asset) => {
            asset.denomOrAddress == watchShitToken.denomOrAddress
            return asset
        })
        : undefined

    // microdenom helpers
    const decimals = watchShitToken ? watchShitToken?.decimals ?? 0 : 0
    const selectedMicroBalance = watchShitToken ? watchShitToken?.balance ?? 0 : 0
    const selectedBalance = watchShitToken
        ? HugeDecimal.from(selectedMicroBalance).toHumanReadableString(decimals)
        : 0
    const insufficientBalanceI18nKey = watchShitToken
        ? context.type === ActionContextType.Wallet
            ? 'error.insufficientWalletBalance'
            : 'error.cantSpendMoreThanTreasury'
        : ''

    const convertedShitRate = eligibleAsset ? HugeDecimal.from(eligibleAsset.shit_rate ?? 1).div(HugeDecimal.from(10).pow(18)).toNumber() : 1
    const estimatedToken = convertedShitRate * watchAmount

    useEffect(() => {
        const timeout = setTimeout(() => { }, 200)
        clearTimeout(timeout)

        // console.log("shitstrapShitGenericTokenLoading", shitstrapShitGenericTokenLoading)
        // console.log("eligibleAsset",eligibleAsset)
        // console.log("watchAmount",watchAmount)
        // console.log("watchShitToken",watchShitToken)
        // console.log("estimatedToken",estimatedToken)

        const thisdebu = !entity.loading ? entity.data : undefined
        // console.log(thisdebu)
        // console.log()
        // console.log(balances)
        // console.log(daoChainID)
        // console.log(chainId)
        return () => clearTimeout(timeout)
    }, [usingOwnShit, entity])
    useEffect(() => {
        // console.log("eligibleAsset",eligibleAsset)
        // console.log("watchAmount",watchAmount)
        // console.log("watchShitToken",watchShitToken)
        // console.log("estimatedToken",estimatedToken)
    }, [watchAmount])

    // if user wants to make payment with fund from account,
    // we make use of the recoilHook here that takes the props currently set
    const makeShitstrapPayment = useMakeShitstrapPayment({
        contractAddress: shitstrapInfo ? shitstrapInfo.shitstrapContractAddr : fallbackInfo.shitstrapContractAddr,
        sender: walletAddress,
    })

    // const shitAction = useInitializedActionForKey(ActionKey.ManageShitstrap)
    const [makingPayment, setMakingPayment] = useState(false)
    const awaitNextBlock = useAwaitNextBlock()
    const onShitstrapPayment = async () => {
        setMakingPayment(true)
        try {
            if (!entity.loading && !usingOwnShit) {
                let debugActions = [
                    {
                        actionKey: ActionKey.Execute,
                        data: {
                            chainId,
                            address: shitstrapInfo ? shitstrapInfo.shitstrapContractAddr : fallbackInfo.shitstrapContractAddr,
                            message: JSON.stringify(
                                {
                                    shit_strap: {
                                        shit: {
                                            amount: HugeDecimal.fromHumanReadable(watchAmount, 6).toString(),
                                            denom: watchShitToken.type == TokenType.Native
                                                ? { native: watchShitToken?.denomOrAddress }
                                                : { native: watchShitToken?.denomOrAddress },
                                        },
                                    },
                                },
                                null,
                                2
                            ),
                            funds: [
                                {
                                    amount: HugeDecimal.fromHumanReadable(watchAmount, 6).toString(),
                                    denom: watchShitToken?.denomOrAddress,
                                },
                            ],
                            cw20: false,
                        },
                    },
                ]
                console.log(debugActions)
                let debug = goToDaoProposal(entity.data.address, 'create', {
                    prefill: getDaoProposalSinglePrefill({
                        actions: debugActions,
                    }),
                })
                await debug
            } else if (watchShitToken && watchShitToken.type == TokenType.Native && usingOwnShit) {
                let res = makeShitstrapPayment(
                    {
                        shit: {
                            amount: HugeDecimal.fromHumanReadable(watchAmount, 6).toString(),
                            denom: watchShitToken.type == TokenType.Native
                                ? { native: watchShitToken?.denomOrAddress }
                                : { cw20: watchShitToken?.denomOrAddress },
                        },
                    },
                    'auto',
                    'shitstrap payment',
                    [
                        {
                            amount: HugeDecimal.fromHumanReadable(watchAmount, 6).toString(),
                            denom: watchShitToken?.denomOrAddress,
                        },
                    ]
                )

                console.log(res)
                await res
                // refresh()
                toast.success(t('success.shitstrapPaymentMade'))
            }
        } catch (err) {
            console.error(err)
            toast.error(processError(err))
        } finally {
            setMakingPayment(false)
        }
    }

    return (
        <>
            <div className="rounded-lg bg-background-tertiary">
                {/* Description */}
                <div className="flex flex-col gap-1 border-t border-border-secondary py-4 px-6">
                    <div className="flex flex-row items-start justify-between gap-8">
                        <p className=" text-lg  link-text">{t('info.shitstrapPaymentTitle')}</p>
                    </div>
                    <p className="link-text">{t('info.shitstrapPaymentDescription')}</p>
                </div>
                <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-6">
                    <p className="text-lg  link-text"> {shitstrapInfo && shitstrapInfo.title}</p>
                    <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-6">
                        <p className="link-text">    {shitstrapInfo && shitstrapInfo.description}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-0">
                    <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-6">
                        <h4 className="text-lg font-bold">{t('info.eligibleTokens')}</h4>
                        {shitstrapInfo && shitstrapInfo.possibleShit &&
                            shitstrapInfo.possibleShit.length > 0 ? (
                            shitstrapInfo.possibleShit.map((asset, index) => (
                                // <div
                                //     key={index}
                                //     className={clsx(
                                //         'flex flex-row items-center justify-between p-4 rounded-lg',
                                //         'bg-background-tertiary hover:bg-background-interactive-hover'
                                //     )}
                                // >
                                <TokenAmountDisplay
                                    amount={1}
                                    className="body-text truncate font-mono"
                                    decimals={4}
                                    hideSymbol={false}
                                    prefix="For every: "
                                    suffix={`, Receive: ${HugeDecimal.from(asset.shit_rate ?? 1).div(HugeDecimal.from(10).pow(18)).toNumber()} $${tokenToShit?.symbol} `}
                                    symbol={asset.symbol}
                                />
                                // </div>
                            ))
                        ) : (
                            <p>{t('info.unknown')}</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-6">
                        <Tooltip title={'Select the shit action you wish to perform. Only the owner of the shit may flush. You shit, you flush.'}>

                            <div className="mt-5 flex w-full flex-col gap-1">
                                <p className=" text-lg  link-text"> {t(`title.shitstrapAction`)}</p>
                                <SegmentedControls
                                    onSelect={setMode}
                                    selected={mode}
                                    tabs={[
                                        {
                                            label: t('button.shitstrapPaymentMode.payment'),
                                            value: ShitstrapPaymentMode.Payment,
                                        },
                                        {
                                            label: t('button.shitstrapPaymentMode.flush'),
                                            value: ShitstrapPaymentMode.Flush,
                                        },
                                    ]}
                                />
                            </div>
                        </Tooltip>

                        {mode === ShitstrapPaymentMode.Payment ? (
                            <>
                                <div className="mt-5 flex w-full flex-col gap-2">
                                    <p className="text-lg link-text">{t(`title.shitstrapActionPayment`)}</p>
                                    <SegmentedControls
                                        onSelect={setUsingOwnShit}
                                        selected={usingOwnShit}
                                        tabs={[
                                            { label: t('button.shitstrapPaymentMode.useYourWallet'), value: true },
                                            { label: t('button.shitstrapPaymentMode.useTheDao'), value: false },
                                        ]}
                                    />
                                </div>

                                <TokenInput
                                    allowCustomToken={false}
                                    amount={{
                                        watch, setValue: (fieldName, value) => setValue(fieldName, value), register, getValues,
                                        fieldName: ('payment.' + 'amount') as 'amount', error: undefined,
                                        min: 0, max: 999999999999999999, step: HugeDecimal.one.toHumanReadableNumber(decimals),
                                        validations: [
                                            (amount) =>
                                                HugeDecimal.from(amount).toString() <=
                                                selectedBalance.toString() ||
                                                t(insufficientBalanceI18nKey, {
                                                    amount: selectedBalance.toLocaleString(undefined, {
                                                        maximumFractionDigits: decimals,
                                                    }),
                                                    tokenSymbol: watchShitToken?.symbol ?? t('info.token').toLocaleUpperCase(),
                                                }),
                                        ],
                                    }}
                                    onSelectToken={(token) => {
                                        // Save the matched token to the form in shitToken field
                                        setValue(('payment.' + 'shitToken') as 'shitToken', token)
                                    }}
                                    selectedToken={watchShitToken}
                                    showChainImage
                                    tokens={
                                        {
                                            loading: false,
                                            data: balances.loading
                                                ? []
                                                : balances.data
                                                    ?.filter(({ token }) => {
                                                        console.log(token)
                                                        if (token.chainId == chainId) {
                                                            return shitstrapInfo && shitstrapInfo.possibleShit.some((asset) => {
                                                                if (asset.denomOrAddress == token.denomOrAddress) {
                                                                    return asset
                                                                }

                                                            })
                                                        }
                                                    }
                                                    )
                                                    ?.map(({ balance, token }) => ({
                                                        ...token,
                                                        description:
                                                            t('title.balance') + ': ' +
                                                            HugeDecimal.from(balance).toInternationalizedHumanReadableString({ decimals: 6, }),
                                                    })) ?? [],
                                        }
                                    }
                                />
                                {usingOwnShit ? <>
                                    <StatusCard
                                        className="max-w-2xl self-center"
                                        content={t('info.shitstrapWarning')}
                                        style="warning"
                                    />
                                </> : null}

                            </>
                        ) : null}
                        {mode === ShitstrapPaymentMode.Flush ? <></> : null}
                        {mode === ShitstrapPaymentMode.OverFlow ? <></> : null}
                    </div>
                    {!entity.loading && (

                        <div className="flex flex-col gap-2 border-t border-border-secondary px-6 py-4">
                            {mode == ShitstrapPaymentMode.Payment ? (<>
                                <p className="link-text mb-1">{t('info.previewShitstrapPayment')}</p>
                                <div className="flex flex-row items-center justify-between gap-8">

                                    <p className="link-text mb-1">{t('title.estimatedToShit')}</p>
                                    {tokenToShit && estimatedToken && (
                                        <TokenAmountDisplay
                                            showAllDecimals={true}
                                            showFullAmount={true}
                                            amount={HugeDecimal.from(estimatedToken).toNumber()}
                                            iconUrl={tokenToShit.imageUrl}
                                            className="grow text-sm"
                                            decimals={tokenToShit.decimals}
                                            hideSymbol={false}
                                            symbol={tokenToShit.symbol}
                                        />
                                    )}
                                </div>

                            </>) : undefined}


                            {onShitstrapPayment && (
                                <Button
                                    center
                                    className="mt-2"
                                    loading={shitting}
                                    onClick={onShitstrapPayment}
                                    variant="brand"
                                >
                                    {mode == ShitstrapPaymentMode.Flush ? (<>{t('button.flushShitstrap')}</>) : (<>{t('button.makeShitStrapPayment')}</>)}

                                </Button>
                            )}

                        </div>
                    )}
                </div>
            </div >
        </>
    )
}