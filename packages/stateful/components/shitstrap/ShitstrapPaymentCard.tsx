import { Button, SegmentedControls, TokenAmountDisplay, TokenInput, Tooltip, useActionOptions, useCachedLoading, useChain, useDaoNavHelpers, useInitializedActionForKey } from "@dao-dao/stateless";
import { ActionContextType, ActionKey, EntityType, ShitstrapPaymentMode, StatefulShitStrapPaymentCardProps, TokenType } from "@dao-dao/types";
import { useTranslation } from "next-i18next";

import { useQueryClient } from "@tanstack/react-query";
import { cwShitstrapExtraQueries } from "@dao-dao/state/query";

import { useEffect, useState } from "react";
import { getChainForChainId, getDaoProposalSinglePrefill, isValidBech32Address, processError } from "@dao-dao/utils";
import { useFormContext } from "react-hook-form";

import clsx from "clsx";
import { HugeDecimal } from "@dao-dao/math";
import toast from "react-hot-toast";
import { constSelector, useRecoilValueLoadable } from "recoil";
import { DaoDaoCoreSelectors, genericTokenBalancesSelector } from "@dao-dao/state";
import { useEntity, useQueryLoadingDataWithError, useWallet } from "../../hooks";
import { useTokenBalances } from "../../actions";
import { useMakeShitstrapPayment } from "../../hooks/contracts/CwShitstrap";



export const ShitstrapPaymentCard = ({
    shitstrapInfo: fallbackInfo,
    shitting,
    // transparentBackground,
}: StatefulShitStrapPaymentCardProps) => {
    const { t } = useTranslation()
    const { chain_id: chainId } = useChain()
    const { bech32_prefix: bech32Prefix } = getChainForChainId(chainId)
    const { goToDaoProposal } = useDaoNavHelpers()
    const [mode, setMode] = useState(ShitstrapPaymentMode.Payment)
    const {
        context,
        address,
        chain: { chain_id: currentChainId },
    } = useActionOptions()


    // create form for selecting token and amount 
    const { register, control, watch, setValue, setError, getValues, clearErrors } = useFormContext()

    // token selected to pay for some shit
    const watchShitToken = watch(('payment.' + 'shitToken') as 'shitToken')
    // amount of selected watchShitToken 
    const watchAmount = watch(('payment.' + 'amount') as 'amount')

    // Wallet & balance of wallet
    const { address: walletAddress = '', getSigningClient } = useWallet()
    const selfPartyTokenBalances = useTokenBalances()

    // Get entities
    const { entity } = useEntity(
        context.type === ActionContextType.Dao
            ? isValidBech32Address(address, bech32Prefix) ? address : ''
            : isValidBech32Address(walletAddress, bech32Prefix) ? walletAddress : ''
    );

    // DAO & balance of DAO 
    // Try to retrieve governance token address, failing if not a cw20-based DAO.
    const counterpartyDaoGovernanceTokenAddressLoadable = useRecoilValueLoadable(
        !entity.loading &&
            entity.data.type === EntityType.Dao &&
            // Only care about loading the governance token if on the chain we're
            // creating the token swap on.
            entity.data.chainId === chainId
            ? DaoDaoCoreSelectors.tryFetchGovernanceTokenAddressSelector({
                chainId,
                contractAddress: entity.data.address,
            })
            : constSelector(undefined)
    )
    // Load balances as loadables since they refresh automatically on a timer.
    const ownerEntityTokenBalances = useCachedLoading(
        entity &&
            !entity.loading &&
            entity.data &&
            counterpartyDaoGovernanceTokenAddressLoadable.state !== 'loading'
            ? genericTokenBalancesSelector({
                chainId: entity.data.chainId,
                address: entity.data.address,
                cw20GovernanceTokenAddress:
                    counterpartyDaoGovernanceTokenAddressLoadable.state === 'hasValue'
                        ? counterpartyDaoGovernanceTokenAddressLoadable.contents
                        : undefined,
                filter: {
                    account: {
                        chainId,
                        address: entity.data.address,
                    },
                },
            })
            : undefined,
        []
    )

    // if wallet is selected to make payment, use wallet tokens in TokenInput, broacast payment via wallet
    const [usingOwnShit, setUsingOwnShit] = useState(false)
    useEffect(() => {
        if (context.type === ActionContextType.Wallet) {
            setUsingOwnShit(true)
        }
    }, [context.type]);
    const ownerIsDao = watchShitToken && !entity.loading && entity.data.type === EntityType.Dao;

    // helper for actions to occur once token is selected
    const [initialValueSet, setInitialValueSet] = useState(false);
    useEffect(() => {
        if (watchShitToken && !initialValueSet) {
            setInitialValueSet(true);
        }
    }, [watchShitToken]);


    const queryClient = useQueryClient()
    // Use info passed into props as fallback, since it came from the list query;
    // the individual query updates more frequently.
    const freshInfo = useQueryLoadingDataWithError(
        cwShitstrapExtraQueries.info(queryClient, {
            chainId,
            address: fallbackInfo.shitstrapContractAddr,
        })
    )

    const shitstrapInfo =
        freshInfo.loading || freshInfo.errored ? fallbackInfo : freshInfo.data

    const {
        full,
        cutoff,
        chainId: shitChainId,
        shit,
        owner,
        title,
        description,
        eligibleAssets,
        shitstrapContractAddr,
    } = shitstrapInfo


    const selectedToken = watchShitToken && selfPartyTokenBalances.loading == false
        ? selfPartyTokenBalances.data.find((token) =>
            ('native' in watchShitToken && token.token.denomOrAddress === watchShitToken.native)
            || ('cw20' in watchShitToken && token.token.denomOrAddress === watchShitToken.cw20)
        )
        : undefined;

    const eligibleAsset = watchShitToken
        ? shitstrapInfo.eligibleAssets.find((asset) =>
        (typeof asset.token === 'object' && typeof watchShitToken === 'object'
            ? (('native' in asset.token && 'native' in watchShitToken && asset.token.native === watchShitToken.native)
                || ('cw20' in asset.token && 'cw20' in watchShitToken && asset.token.cw20 === watchShitToken.cw20))
            : asset.token === watchShitToken)
        )
        : undefined;
    // microdenom helpers
    const decimals = watchShitToken ? selectedToken?.token.decimals ?? 0 : 0
    const selectedMicroBalance = watchShitToken ? selectedToken?.balance ?? 0 : 0
    const selectedBalance = watchShitToken ? HugeDecimal.from(selectedMicroBalance).toHumanReadableString(decimals) : 0
    const insufficientBalanceI18nKey = watchShitToken
        ? (context.type === ActionContextType.Wallet
            ? 'error.insufficientWalletBalance'
            : 'error.cantSpendMoreThanTreasury')
        : '';


    // estimate shitstrap rewards
    const estimatedToken = eligibleAsset ?
        HugeDecimal.from(1).div(HugeDecimal.fromHumanReadable(eligibleAsset.shit_rate, 6)).times(watchAmount)
        : HugeDecimal.from(0);


    // if user wants to make payment with fund from account,
    // we make use of the recoilHook here that takes the props currently set
    const makeShitstrapPayment = useMakeShitstrapPayment({
        contractAddress: shitstrapContractAddr,
        sender: walletAddress,
    })

    const shitAction = useInitializedActionForKey(ActionKey.ManageShitstrap)

    const [makingPayment, setMakingPayment] = useState(false)
    const onShitstrapPayment = async () => {
        setMakingPayment(true)
        try {

            if (!shitAction.loading && !shitAction.errored && !entity.loading) {
                await goToDaoProposal(entity.data.address, 'create', {
                    prefill: getDaoProposalSinglePrefill({
                        actions: [
                            {
                                actionKey: shitAction.data.key,
                                data: {
                                    chainId,
                                    address: shitstrapInfo.shitstrapContractAddr,
                                    message: JSON.stringify(
                                        {
                                            shistrap: {
                                                shit: { native: watchShitToken }
                                            },
                                        },
                                        null,
                                        2
                                    ),
                                    funds: [{
                                        denom: watchShitToken,
                                        amount: parseInt(watchAmount)
                                    }],
                                    cw20: false,
                                },
                            },
                        ],
                    }),
                })
            } else if (watchShitToken && watchShitToken.type == TokenType.Native) {
                makeShitstrapPayment(
                    {
                        shit: {
                            amount: watchAmount,
                            denom: watchShitToken.type == TokenType.Native ?
                                { native: watchShitToken?.denomOrAddress } : { native: watchShitToken?.denomOrAddress }
                        }
                    },
                    "auto",
                    "shitstrap payment",
                    [{ amount: HugeDecimal.fromHumanReadable(watchAmount, 6).toString(), denom: watchShitToken.denomOrAddress }])
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
                <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-6">
                    <div className="flex flex-row items-start justify-between gap-8">
                        <p className="link-text">
                            {t('info.shitstrapPaymentTitle')}
                        </p>
                    </div>
                    <p className="link-text">
                        {t('info.shitstrapPaymentDescription')}
                    </p>
                </div>

                <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-6">
                    <Tooltip title={"test"}>
                        <p className="caption-text leading-5 text-text-body">
                            Eligible Assets
                        </p>
                    </Tooltip>
                    <div className="flex flex-row items-start justify-between gap-8">
                        {/* leading-5 to match link-text's line-height. */}
                        {shitstrapInfo.eligibleAssets && shitstrapInfo.eligibleAssets.length > 0 ? (
                            shitstrapInfo.eligibleAssets.map((asset, index) => (
                                <div className={clsx(
                                    'b h-8 cursor-pointer grid-cols-2 items-center gap-3 rounded-lg py-2 px-3 transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed',
                                    'bg-background-tertiary'
                                )} key={index}>

                                    <TokenAmountDisplay
                                        prefix="for every: "
                                        suffix={`, recieve 1 ${shitstrapInfo.shit.denomOrAddress}`}
                                        amount={HugeDecimal.from(asset.shit_rate ?? 0)}
                                        className="body-text truncate font-mono"
                                        decimals={0}
                                        symbol={typeof asset.token === 'object'
                                            ? ('native' in asset.token ? asset.token.native : asset.token.cw20)
                                            : asset.token}
                                    />

                                </div>
                            ))
                        ) : (
                            <p>{t('info.unknown')}</p>
                        )}

                    </div>
                    <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-6">

                        {t(`title.shitstrapAction`)}
                        <Tooltip title={"Select the shit action you wish to perform. Only the owner of the shit may flush. You shit, you flush."}>
                            <div className="mt-5 flex w-full flex-col gap-4">
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

                        {mode === ShitstrapPaymentMode.Payment ? (<>

                            <div className="mt-5 flex w-full flex-col gap-4">
                                <SegmentedControls
                                    onSelect={setUsingOwnShit}
                                    selected={usingOwnShit}
                                    tabs={[
                                        {
                                            label: t('button.shitstrapPaymentMode.useYourWallet'),
                                            value: true,
                                        },
                                        {
                                            label: t('button.shitstrapPaymentMode.useTheDao'),
                                            value: false,
                                        },
                                    ]}
                                />

                            </div>

                            <TokenInput
                                allowCustomToken={false}
                                amount={{
                                    watch,
                                    setValue,
                                    register,
                                    getValues,
                                    fieldName: ('payment.' + 'amount') as 'amount',
                                    error: undefined,
                                    min: 0,
                                    max: 999999999999999999,
                                    step: HugeDecimal.one.toHumanReadableNumber(decimals),
                                    validations: [
                                        (amount) =>
                                            HugeDecimal.from(amount).toString() <= selectedBalance.toString() ||
                                            t(insufficientBalanceI18nKey, {
                                                amount: selectedBalance.toLocaleString(undefined, {
                                                    maximumFractionDigits: decimals,
                                                }),
                                                tokenSymbol:
                                                    selectedToken?.token.symbol ??
                                                    t('info.token').toLocaleUpperCase(),
                                            }),
                                    ],
                                }}
                                onSelectToken={(token) => {
                                    // set the token in balance array that has the same owner and address
                                    const matchedToken = selfPartyTokenBalances.loading ? false : selfPartyTokenBalances.data.find((t) =>
                                        t.owner.address === walletAddress &&
                                        t.token.denomOrAddress === token.denomOrAddress
                                    );

                                    if (matchedToken) {
                                        // Save the matched token to the form in shitToken field
                                        setValue(('payment.' + 'shitToken') as 'shitToken',
                                            matchedToken.token.type === TokenType.Native
                                                ? { native: matchedToken.token.denomOrAddress }
                                                : { cw20: matchedToken.token.denomOrAddress }
                                        );
                                        console.log(matchedToken)
                                    } else {
                                        console.log("none")
                                    }
                                }}
                                readOnly={shitting}
                                selectedToken={selectedToken?.token}
                                showChainImage
                                tokens={
                                    {
                                        loading: false,
                                        data: selfPartyTokenBalances.loading
                                            ? []
                                            : (selfPartyTokenBalances.data
                                                ?.filter(({ token }) =>
                                                    shitstrapInfo.eligibleAssets.some((asset) => {
                                                        if (typeof asset.token === 'object') {
                                                            if ('native' in asset.token) {
                                                                return asset.token.native === token.denomOrAddress;
                                                            } else if ('cw20' in asset.token) {
                                                                return asset.token.cw20 === token.denomOrAddress;
                                                            } else {
                                                                return false;
                                                            }
                                                        } else {
                                                            return asset.token === token.denomOrAddress;
                                                        }
                                                    })
                                                )
                                                ?.map(({ owner, balance, token }) => ({
                                                    ...token,
                                                    owner,
                                                    description:
                                                        t('title.balance') +
                                                        ': ' + HugeDecimal.from(balance).toInternationalizedHumanReadableString({ decimals })
                                                    ,
                                                })) ?? []),
                                    }
                                }
                            /></>) : null}
                        {mode === ShitstrapPaymentMode.Flush ? (<></>) : null}
                        {mode === ShitstrapPaymentMode.OverFlow ? (<></>) : null}
                    </div>

                    {!entity.loading && (
                        <div className="flex flex-col gap-2 border-t border-border-secondary px-6 py-4">
                            <p className="link-text mb-1">{t('info.previewShitstrapPayment')}</p>

                            <div className="flex flex-row items-center justify-between gap-8">
                                <p className="secondary-text">{t('title.estimatedToShit')}</p>
                                {estimatedToken !== HugeDecimal.zero && (
                                    <TokenAmountDisplay
                                        amount={estimatedToken}
                                        className="caption-text text-right font-mono text-text-body"
                                        decimals={6}
                                        symbol={shitstrapInfo.shit.denomOrAddress}
                                        hideSymbol={false}
                                    />
                                )}
                            </div>

                            <div className="flex flex-row items-center justify-between gap-8">
                                {/* <p className="secondary-text">{t('title.stakedTo')}</p> */}

                            </div>

                            <div className="flex flex-row items-center justify-between gap-8">
                                {/* <p className="secondary-text">{t('title.unstakingTokens')}</p>


                        </div>

                        <div className="flex flex-row items-center justify-between gap-8">
                            {/* <p className="secondary-text">{t('info.pendingRewards')}</p> */}
                            </div>

                            {onShitstrapPayment && (
                                <Button
                                    center
                                    className="mt-2"
                                    loading={shitting}
                                    onClick={onShitstrapPayment}
                                    variant="brand"
                                >
                                    {t('button.makeShitStrapPayment')}
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}