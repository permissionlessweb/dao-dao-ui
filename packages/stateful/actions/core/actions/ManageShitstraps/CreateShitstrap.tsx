import { PossibleShit } from "@dao-dao/types/contracts/ShitStrap"
import { Counterparty } from "../token_swap/types"

import { useQueries, useQueryClient } from "@tanstack/react-query"
import { ActionChainContextType, ActionComponent, ActionComponentProps, ActionContextType, ActionKey, ActionMaker, AddressInputProps, DurationUnits, EntityType, GenericToken, GenericTokenBalanceWithOwner, SegmentedControlsProps, ShitstrapPaymentMode, TokenType, TypedOption, UnifiedCosmosMsg, WidgetId } from "@dao-dao/types"
import { cwShitstrapExtraQueries, cwShitstrapFactoriesExtraQuery, shitStrapFactoryQueries } from "@dao-dao/state/query"
import { decodeJsonFromBase64, decodePolytoneExecuteMsg, encodeJsonToBase64, getChainAddressForActionOptions, getChainForChainId, getDisplayNameForChainId, getNativeTokenForChainId, getSupportedChainConfig, isValidBech32Address, makeCombineQueryResultsIntoLoadingDataWithError, makeValidateAddress, makeWasmMessage, objectMatchesStructure, validateRequired } from "@dao-dao/utils"
import { useTranslation } from "react-i18next"
import { ComponentType, useCallback, useEffect, useState } from "react"

import { SuspenseLoader } from "../../../../components"
import { AddressInput, Button, EntityDisplay, IconButton, InputErrorMessage, InputLabel, Loader, MoneyWingsEmoji, SegmentedControls, StatusCard, TextAreaInput, TextInput, TokenInput, useActionOptions, useCachedLoadable, useCachedLoading, useInitializedActionForKey } from "@dao-dao/stateless"
import { useTokenBalances } from "../../../hooks"
import { useFieldArray, useFormContext } from "react-hook-form"
import { useEntity, useQueryLoadingData, useWallet } from "../../../../hooks"
import { ShitstrapInfo } from "@dao-dao/types/contracts/ShitStrap"
import { useWidget } from "../../../../widgets"
import { ManageVestingData } from "../ManageVesting"

import { } from "@dao-dao/types/contracts/ShitStrap"
import { InstantiateMsg as ShitstrapInstantiateMsg } from "@dao-dao/types/contracts/ShitStrap"
import { InstantiateNativeShitstrapContractMsg, ExecuteMsg, Uint128 } from "@dao-dao/types/contracts/ShitstrapFactory"
import { coins } from "@cosmjs/amino"
import { DaoDaoCoreSelectors, genericTokenBalancesSelector, genericTokenSelector } from "@dao-dao/state/recoil"
import { constSelector, useRecoilValueLoadable } from "recoil"
import { FlushShitstrapData } from "./FlushShitstrap"
import { ShitstrapPaymentWidgetData } from "../../../../widgets/widgets/Shitstrap/types"
import { HugeDecimal } from "@dao-dao/math"
import { ArrowRightAltRounded, Close, SubdirectoryArrowRightRounded } from "@mui/icons-material"

export type TokenToShit = {
    denomOrAddress: string,
    type: TokenType,
    chainId: string,
}

export type CreateShitstrapData = {
    chainId: string
    title: string
    cutoff: number
    description: string
    tokenToShit: TokenToShit
    eligibleAssets: PossibleShit[]
    startDate: string
    // connected wallet entity
    selfEntity?: Omit<Counterparty, 'address'>
    // owner of shitstrap to-be entity
    ownerEntity?: Counterparty
}


export type CreateShitstrapOptions = {
    // If undefined, no widget is setup, and begin vesting should be disabled.
    widgetData: ShitstrapPaymentWidgetData | undefined
    tokens: GenericTokenBalanceWithOwner[]
    AddressInput: ComponentType<AddressInputProps<CreateShitstrapData>>
}

export const CreateShitstrap: ComponentType<ActionComponentProps<CreateShitstrapOptions>> = ({
    fieldNamePrefix,
    allActionsWithData,
    isCreating,
    index: actionIndex,
    errors,
    options: {
        widgetData,
        tokens,
        AddressInput,
    },
    remove,
    addAction,
    ...props
}) => {

    const { t } = useTranslation()
    const actionOptions = useActionOptions()
    const {
        context,
        chainContext,
        chain: { chain_id: nativeChainId },
    } = actionOptions
    const configureCreateShitStrapActionDefaults = useInitializedActionForKey(ActionKey.ManageShitstrap)

    // get connected wallet balance info
    const { address: walletAddress, getSigningClient } = useWallet()
    const selfPartyTokenBalances = useTokenBalances()

    if (chainContext.type !== ActionChainContextType.Supported) {
        throw new Error('Unsupported chain context')
    }

    // create forms
    const { control, register, watch, setValue, setError, getValues, resetField, clearErrors } = useFormContext<CreateShitstrapData>()
    const watchChainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
    const watchCutoffAmount = watch((fieldNamePrefix + 'cutoff') as 'cutoff')
    const watchDescription = watch((fieldNamePrefix + 'description') as 'description')
    const watchEligibleAssets = watch((fieldNamePrefix + 'eligibleAssets') as 'eligibleAssets')
    const watchOwnerEntity = watch((fieldNamePrefix + 'ownerEntity') as 'ownerEntity')
    const watchTokentoShit = watch((fieldNamePrefix + 'tokenToShit') as 'tokenToShit')
    const watchParsedStartDate = Date.parse(watch((fieldNamePrefix + 'startDate') as 'startDate')
    )
    const {
        fields: eligibleAssetFields,
        append: appendEligibleAsset,
        remove: removeEligibleAsset,
    } = useFieldArray({
        control,
        name: (fieldNamePrefix + 'eligibleAssets') as 'eligibleAssets',
    })

    const selectedToken = tokens.find(
        ({ token }) => token.denomOrAddress === watchTokentoShit.denomOrAddress
    )
    const selectedDecimals = selectedToken?.token.decimals ?? 0
    const selectedMicroBalance = selectedToken?.balance ?? 0
    const selectedBalance = HugeDecimal.from(selectedMicroBalance)
    const selectedSymbol = selectedToken?.token?.symbol ?? t('info.tokens')
    // If widget not set up, don't render anything because begin shitstrap cannot be
    // used.
    if (!widgetData) {
        return null
    }


    const { bech32_prefix: bech32Prefix } = getChainForChainId(nativeChainId)
    const nativeToken = getNativeTokenForChainId(watchChainId)
    const chainAddressOwner = getChainAddressForActionOptions(
        actionOptions,
        watchChainId
    )

    const shitstrapManagerExists =
        !!widgetData?.factories?.[watchChainId]
    const crossChainAccountActionExists = allActionsWithData.some(
        (action) => action.actionKey === ActionKey.ManageShitstrap
    )

    const shitstrapOwnerAddrValid =
        !!watchOwnerEntity &&
        isValidBech32Address(watchOwnerEntity.address, bech32Prefix)

    // A DAO can create a shitstrap payment factory on the current chain and any
    // polytone connection that is also a supported chain (since the shitstrap
    // factory+contract only exists on supported chains).
    const possibleChainIds = [
        nativeChainId,
        ...Object.keys(chainContext.config.polytone || {}).filter((chainId) =>
            getSupportedChainConfig(chainId)
        ),
    ]

    // Only set defaults once.
    const watchSelfEntity = watch(fieldNamePrefix + 'selfEntity' as 'selfEntity')
    const [defaultsSet, setDefaultsSet] = useState(!!watchSelfEntity && !!watchOwnerEntity)
    useEffect(() => {
        if (defaultsSet) {
            return
        }

        // Default selfParty to first CW20 if present. Otherwise, native.
        const selfPartySetData = selfPartyTokenBalances.loading === false ? selfPartyTokenBalances.data.filter(
            ({ token }) => token.chainId === watchChainId
        ) : []
        const selfPartyDefaultCw20 = selfPartySetData.find(
            (tokenBalance) => tokenBalance.token.type === TokenType.Cw20
        )

        resetField(fieldNamePrefix + 'selfEntity' as 'selfEntity', {
            defaultValue: {
                type: selfPartyDefaultCw20 ? TokenType.Cw20 : TokenType.Native,
                denomOrAddress: selfPartyDefaultCw20
                    ? selfPartyDefaultCw20.token.denomOrAddress
                    : nativeToken.denomOrAddress,
                amount: 0,
                decimals: selfPartyDefaultCw20
                    ? selfPartyDefaultCw20.token.decimals
                    : nativeToken.decimals,
            },
        })
        resetField(fieldNamePrefix + 'ownerEntity' as 'ownerEntity', {
            defaultValue: {
                address: '',
                type: 'native',
                denomOrAddress: nativeToken.denomOrAddress,
                amount: 0,
                decimals: nativeToken.decimals,
            },
        })

        setDefaultsSet(true)
        // Only run on mount.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const ownerEntityAddress: string | undefined = watch(
        fieldNamePrefix + 'ownerEntity.address' as 'ownerEntity.address'
    )


    // Get counterparty entity, which reverse engineers a DAO from its polytone
    // proxy.
    const { entity } = useEntity(
        ownerEntityAddress &&
            isValidBech32Address(ownerEntityAddress, bech32Prefix)
            ? ownerEntityAddress
            : ''
    )

    // Try to retrieve governance token address, failing if not a cw20-based DAO.
    const counterpartyDaoGovernanceTokenAddressLoadable = useRecoilValueLoadable(
        !entity.loading &&
            entity.data.type === EntityType.Dao &&
            // Only care about loading the governance token if on the chain we're
            // creating the token swap on.
            entity.data.chainId === watchChainId
            ? DaoDaoCoreSelectors.tryFetchGovernanceTokenAddressSelector({
                chainId: watchChainId,
                contractAddress: entity.data.address,
            })
            : constSelector(undefined)
    )


    // Load balances as loadables since they refresh automatically on a timer.
    const ownerEntityTokenBalances = useCachedLoading(
        ownerEntityAddress &&
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
                        chainId: watchChainId,
                        address: ownerEntityAddress,
                    },
                },
            })
            : undefined,
        []
    )

    const counterpartyToken = ownerEntityTokenBalances.loading
        ? undefined
        : ownerEntityTokenBalances.data.find(
            ({ token }) => watchOwnerEntity?.denomOrAddress === token.denomOrAddress
        )

    return (

        <>
            <p className="max-w-prose">{t('info.shitStrapExplanation')}</p>
            <div className="flex  flex-col gap-4">

                {isCreating && !shitstrapManagerExists && configureCreateShitStrapActionDefaults && (
                    <StatusCard
                        className="max-w-lg"
                        content={t('info.shitstrapManagerNeeded', {
                            chain: getDisplayNameForChainId(watchChainId),
                        })}
                        style="warning"
                    >

                        <Button
                            disabled={crossChainAccountActionExists}
                            onClick={() => {
                                remove()
                                addAction(
                                    {
                                        actionKey: ActionKey.ManageShitstrap,
                                        data: configureCreateShitStrapActionDefaults,
                                    },
                                    actionIndex
                                )
                            }}
                            variant="primary"
                        >
                            {crossChainAccountActionExists
                                ? t('button.shitstrapManagerSetupActionAdded')
                                : t('button.addShitstrapManagerSetupAction')}
                        </Button>
                    </StatusCard>
                )}
                <div className="space-y-2">
                    <InputLabel name={t('form.title')} />
                    <TextInput
                        disabled={!isCreating}
                        error={errors?.title}
                        fieldName={(fieldNamePrefix + 'title') as 'title'}
                        register={register}
                        required
                    />
                    <InputErrorMessage error={errors?.title} />
                </div>

                {(isCreating || !!watchDescription) && (
                    <div className="space-y-2">
                        <InputLabel name={t('form.descriptionOptional')} />
                        <TextAreaInput
                            disabled={!isCreating}
                            error={errors?.description}
                            fieldName={(fieldNamePrefix + 'description') as 'description'}
                            register={register}
                        />
                        <InputErrorMessage error={errors?.description} />
                    </div>
                )}
                <div className="space-y-2">

                    <InputLabel name={t('form.tokenToShitstrap')} />
                    {/* Allow to enter value for tokens to shitstrap than what they currently have in the treasury, since they could accept it at a future time when they do have the amount. In other words, don't set a max. */}
                    <div className="flex min-w-0 flex-col flex-wrap gap-x-3 gap-y-2 sm:flex-row sm:items-stretch">
                        <div className="flex flex-row items-center pl-1 sm:pl-0">
                            <AddressInput
                                containerClassName="grow"
                                disabled={!isCreating}
                                error={errors?.recipient}
                                fieldName={(fieldNamePrefix + 'ownerEntity.address') as 'ownerEntity.address'}
                                validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
                                register={register}
                            />
                            <div className="flex min-w-0 grow flex-row items-stretch gap-2 sm:gap-3">
                                <ArrowRightAltRounded className="!hidden !h-6 !w-6 text-text-secondary sm:!block" />
                                <SubdirectoryArrowRightRounded className="!h-4 !w-4 text-text-secondary sm:!hidden" />
                            </div>
                        </div>

                        {watchOwnerEntity?.address ? (

                            <TokenInput
                                amount={{
                                    watch,
                                    setValue,
                                    register,
                                    getValues,
                                    fieldName: (fieldNamePrefix + 'cutoff') as 'cutoff',
                                    error: errors?.amount,
                                    step: HugeDecimal.one.toHumanReadableNumber(selectedDecimals),
                                    // validations: [],
                                }}
                                // disabled={!shitstrapOwnerAddrValid}
                                onSelectToken={({ type, denomOrAddress, chainId }) => {
                                    setValue((fieldNamePrefix + 'tokenToShit.denomOrAddress') as 'tokenToShit.denomOrAddress', denomOrAddress)
                                    setValue((fieldNamePrefix + 'tokenToShit.type') as 'tokenToShit.type', type)
                                    setValue((fieldNamePrefix + 'tokenToShit.chainId') as 'tokenToShit.chainId', chainId)
                                }}
                                // readOnly={!isCreating}
                                selectedToken={{
                                    type: watchTokentoShit.type,
                                    denomOrAddress: watchTokentoShit.denomOrAddress,
                                    chainId: watchTokentoShit.chainId,
                                }}
                                showChainImage
                                tokens={!shitstrapOwnerAddrValid ? { loading: false, data: [] } : ownerEntityTokenBalances.loading ? { loading: true } : {
                                    loading: false, data: ownerEntityTokenBalances.data.map(
                                        ({ token }) => token
                                    ),
                                }}
                            // tokens={{
                            //     loading: false,
                            //     data: tokens
                            //         .filter(({ token: { chainId } }) =>
                            //             possibleChainIds.includes(chainId)
                            //         )
                            //         .map(({ balance, token }) => ({
                            //             ...token,
                            //             description:
                            //                 t('title.balance') +
                            //                 ': ' +
                            //                 convertMicroDenomToDenomWithDecimals(
                            //                     balance,
                            //                     token.decimals
                            //                 ).toLocaleString(undefined, {
                            //                     maximumFractionDigits: token.decimals,
                            //                 }),
                            //         })),
                            // }}
                            />

                        ) : undefined}



                    </div>
                </div>
                {(errors?.amount || errors?.denomOrAddress || errors?.recipient) && (
                    <div className="space-y-1">
                        <InputErrorMessage error={errors?.amount} />
                        <InputErrorMessage error={errors?.denomOrAddress} />
                        <InputErrorMessage error={errors?.recipient} />
                    </div>
                )}
            </div>
            {/* Eligible Assets */}
            <div className="flex flex-col gap-3">
                <InputLabel name={t('form.eligibleAssets')} primary />
                {eligibleAssetFields.map((props, index) => {
                    return (
                        <div
                            key={props.id}
                            className="flex flex-row flex-wrap items-center gap-2"
                        >
                            <div className="flex shrink-0 flex-col gap-1">
                                <div className="flex flex-row items-end justify-between gap-2">
                                </div>
                                <div className="flex flex-row gap-1">
                                    <TokenInput
                                        amount={{
                                            watch,
                                            setValue,
                                            getValues,
                                            register,
                                            fieldName: (fieldNamePrefix + `eligibleAssets.${index}.shit_rate`) as `eligibleAssets.${number}.shit_rate`,
                                            error: errors?.amount,
                                            min: HugeDecimal.one.toHumanReadableNumber(selectedDecimals),
                                            step: HugeDecimal.one.toHumanReadableNumber(selectedDecimals),
                                            validations: [],
                                        }}
                                        onSelectToken={({ chainId, denomOrAddress, type }) => {
                                            if (type === TokenType.Native) {

                                                setValue((fieldNamePrefix + `eligibleAssets.${index}.token`) as `eligibleAssets.${number}.token`, { native: denomOrAddress })
                                            }
                                            // } else if (type === TokenType.Cw20) {
                                            //     setValue(
                                            //         (fieldNamePrefix + `eligibleAssets.${index}.token`) as `eligibleAssets.${number}.token`,
                                            //         { cw20: denomOrAddress }
                                            //     )
                                            // }

                                        }}
                                        // onSelectToken={({ type, denomOrAddress, chainId }) => {
                                        //     setValue((fieldNamePrefix + 'tokenToShit.denomOrAddress') as 'tokenToShit.denomOrAddress',denomOrAddress)
                                        //     setValue((fieldNamePrefix + 'tokenToShit.type') as 'tokenToShit.type',type)
                                        //     setValue((fieldNamePrefix + 'tokenToShit.chainId') as 'tokenToShit.chainId',chainId)
                                        // }}
                                        readOnly={!isCreating}
                                        selectedToken={tokens.find(({ token }) =>
                                            watchEligibleAssets[index] && watchEligibleAssets[index].token && (
                                                (token.type === TokenType.Native && watchEligibleAssets[index].token === token.denomOrAddress) ||
                                                (token.type === TokenType.Cw20 && watchEligibleAssets[index].token === token.denomOrAddress)
                                            )
                                        )?.token}
                                        showChainImage
                                        tokens={{
                                            loading: false,
                                            data: tokens
                                                .filter(({ token: { chainId } }) =>
                                                    possibleChainIds.includes(chainId)
                                                )
                                                .map(({ balance, token }) => ({
                                                    ...token,
                                                    description:
                                                        t('title.balance') +
                                                        ': ' +
                                                        HugeDecimal.from(
                                                            balance
                                                        ).toInternationalizedHumanReadableString({
                                                            decimals: token.decimals,
                                                        }),
                                                })),
                                        }}
                                    />
                                    {isCreating && (
                                        <IconButton
                                            Icon={Close}
                                            className="mt-6"
                                            onClick={() => removeEligibleAsset(index)}
                                            size="sm"
                                            variant="ghost"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    )

                })}

                {isCreating && (
                    <Button
                        className="self-start"
                        onClick={() =>
                            appendEligibleAsset({
                            })
                        }
                        variant="secondary"
                    >
                        {t('button.addEligibleAsset')}
                    </Button>
                )}
                <InputErrorMessage error={errors?.eligibleAssets} />
            </div>
        </>
    )
}