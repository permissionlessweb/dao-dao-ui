import { InfusedCollection, InfusionParams, NFTCollection } from "@dao-dao/types/contracts/CwInfuser"
import { Counterparty } from "../token_swap/types"
import { ComponentType } from "react"
import { ActionChainContextType, ActionComponentProps, ActionKey, AddressInputProps, EntityType, GenericTokenBalance, GenericTokenBalanceWithOwner, LoadingData, TokenType } from "@dao-dao/types"
import { useTranslation } from "react-i18next"
import { AddressInput, Button, FormSwitch, IconButton, InputLabel, NumericInput, TextInput, TokenInput, useActionOptions, useCachedLoading, useChain, useInitializedActionForKey } from "@dao-dao/stateless"
import { useEntity, useWallet } from "../../../../hooks"
import { useTokenBalances } from "../../../hooks"
import { useFieldArray, useFormContext } from "react-hook-form"
import { getChainForChainId, getSupportedChainConfig, isValidBech32Address, makeValidateAddress } from "@dao-dao/utils"
import { HugeDecimal } from "@dao-dao/math"
import { constSelector, useRecoilValueLoadable } from "recoil"
import { DaoDaoCoreSelectors, genericTokenBalancesSelector } from "@dao-dao/state/recoil"
import { Close } from "@mui/icons-material"


export type CreateInfusionData = {
    chainId: string
    infusionMinter: string  //todo: replace for widget
    collections: NFTCollection[]
    infusedCollection: InfusedCollection
    infusionParams: InfusionParams
    paymentRecipient: string
    owner?: string
    //   description: string
}

export type CreateInfusionOptions = {
    tokens: LoadingData<GenericTokenBalance[]>

    AddressInput: ComponentType<AddressInputProps<CreateInfusionData>>
}


export const CreateInfusion: ComponentType<
    ActionComponentProps<CreateInfusionOptions>
> = ({
    isCreating,
    options,
    errors,
    fieldNamePrefix,
}) => {

        const { t } = useTranslation()
        const actionOptions = useActionOptions()
        const {
            context,
            chainContext,
            chain: { chainId: nativeChainId },
        } = actionOptions
        const configureCreateInfusionActionDefaults = useInitializedActionForKey(
            ActionKey.ConfigureShitstrapPayments
        )
        if (chainContext.type !== ActionChainContextType.Supported) {
            throw new Error('Unsupported chain context')
        }

        // get connected wallet balance info
        const { address: walletAddress, getSigningClient } = useWallet()
        const { chainId, bech32Prefix } = useChain()
        const tokenBalances = useTokenBalances()
        const { entity: walletEntity } = useEntity(
            walletAddress ? isValidBech32Address(walletAddress, bech32Prefix)
                ? walletAddress : '' : ''
        )

        const possibleChainIds = [
            nativeChainId,
            ...Object.keys(chainContext.config.polytone || {}).filter((chainId) =>
                getSupportedChainConfig(chainId)
            ),
        ]


        if (chainContext.type !== ActionChainContextType.Supported) {
            throw new Error('Unsupported chain context')
        }


        // create forms
        const {
            control,
            register,
            watch,
            setValue,
            setError,
            getValues,
            resetField,
            clearErrors,
        } = useFormContext<CreateInfusionData>()

        const watchChainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
        const watchInfusionMinter = watch((fieldNamePrefix + 'infusionMinter') as 'infusionMinter')
        const watchEligibleCollections = watch((fieldNamePrefix + 'collections') as 'collections')
        const watchInfusedCollection = watch((fieldNamePrefix + 'infusedCollection') as 'infusedCollection')
        const watchInfusedParams = watch((fieldNamePrefix + 'infusionParams') as 'infusionParams')
        const watchPaymentRecipient = watch((fieldNamePrefix + 'paymentRecipient') as 'paymentRecipient')
        const watchOwner = watch((fieldNamePrefix + 'owner') as 'owner')
        const watchRoyaltyInfo = watch((fieldNamePrefix + 'royaltyInfo') as 'owner')

        const {
            fields: eligibleCollectionField,
            append: appendEligibleCollection,
            remove: removeEligibleCollection,
        } = useFieldArray({
            control,
            name: (fieldNamePrefix + 'collections') as 'collections',
        })


        // Try to retrieve governance token address, failing if not a cw20-based DAO.
        const currentEntityDAOTokenLoadable = useRecoilValueLoadable(
            EntityType.Dao && !walletEntity.loading ?
                DaoDaoCoreSelectors.tryFetchGovernanceTokenAddressSelector({
                    chainId: watchChainId,
                    contractAddress: walletEntity.data.address,
                })
                : constSelector(undefined)
        )

        // Load balances as loadables since they refresh automatically on a timer.
        const currentWalletTokenBalances = useCachedLoading(
            walletAddress &&
                !walletEntity.loading &&
                walletEntity.data &&
                currentEntityDAOTokenLoadable.state !== 'loading'
                ? genericTokenBalancesSelector({
                    chainId: walletEntity.data.chainId,
                    address: walletEntity.data.address,
                    cw20GovernanceTokenAddress: undefined,
                    filter: {
                        account: {
                            chainId: watchChainId,
                            address: walletAddress,
                        },
                    },
                })
                : undefined,
            []
        )



        const currentChain = getChainForChainId(watchChainId)
        return (
            <>
                <div className="flex flex-col gap-4">
                    {isCreating && (<>
                        <div className="space-y-2">
                            <InputLabel name={t('form.infusionMinter')} />
                            <AddressInput
                                containerClassName="grow"
                                disabled={!isCreating}
                                error={errors?.recipient}
                                fieldName={(fieldNamePrefix + 'infusedCollection.royalty_info.payment_address') as 'infusedCollection.royalty_info.payment_address'}
                                register={register}
                                validation={[
                                    makeValidateAddress(currentChain.bech32Prefix),
                                ]}
                            />
                            {isValidBech32Address(watchInfusionMinter) ? (<>

                                <div className="flex flex-row gap-3">
                                    {/* define new infused params */}
                                    <InputLabel name={t('form.infusedName')} />
                                    <TextInput
                                        disabled={!isCreating}
                                        error={errors?.title}
                                        fieldName={(fieldNamePrefix + 'infusedCollection.name') as 'infusedCollection.name'}
                                        register={register}
                                        required
                                    />
                                    <InputLabel name={t('form.infusedSymbol')} />
                                    <TextInput
                                        disabled={!isCreating}
                                        error={errors?.title}
                                        fieldName={(fieldNamePrefix + 'infusedCollection.symbol') as 'infusedCollection.symbol'}
                                        register={register}
                                        required
                                    />
                                    <InputLabel name={t('form.infusedNumToken')} />
                                    <NumericInput
                                        disabled={!isCreating}
                                        error={errors?.title}
                                        fieldName={(fieldNamePrefix + 'infusedCollection.num_tokens') as 'infusedCollection.num_tokens'}
                                        register={register}
                                        required
                                    />
                                </div>
                                <div className="flex flex-row gap-3">
                                    <InputLabel name={t('form.infusedBaseUri')} />
                                    <TextInput
                                        disabled={!isCreating}
                                        error={errors?.title}
                                        fieldName={(fieldNamePrefix + 'infusedCollection.base_uri') as 'infusedCollection.base_uri'}
                                        register={register}
                                        required
                                    />
                                    <InputLabel name={t('form.infusedExternalLink')} />
                                    <TextInput
                                        disabled={!isCreating}
                                        error={errors?.title}
                                        fieldName={(fieldNamePrefix + 'infusedCollection.external_link') as 'infusedCollection.external_link'}
                                        register={register}
                                    />
                                </div>


                                {/* optional values */}
                                <InputLabel name={t('form.infusedRoyaltyInfo')} />
                                <div className="flex flex-row gap-3">
                                    <InputLabel name={t('form.royaltyRecipientAddress')} />
                                    <AddressInput
                                        containerClassName="grow"
                                        disabled={!isCreating}
                                        error={errors?.recipient}
                                        fieldName={(fieldNamePrefix + 'infusedCollection.royalty_info.payment_address') as 'infusedCollection.royalty_info.payment_address'}
                                        register={register}
                                        validation={[
                                            makeValidateAddress(currentChain.bech32Prefix),
                                        ]}
                                    />
                                    <InputLabel name={t('form.royaltyPercentage')} />
                                    <NumericInput
                                        disabled={!isCreating}
                                        error={errors?.title}
                                        fieldName={(fieldNamePrefix + 'infusedCollection.num_tokens') as 'infusedCollection.num_tokens'}
                                        register={register}
                                        placeholder={t('form.infusionRoyaltyShares')}
                                    />

                                </div>
                                {/* input for eligible collections */}
                                <div className="flex flex-col gap-3">
                                    <InputLabel name={t('form.infusedEligibleCollections')} />
                                    {eligibleCollectionField.map((props, index) => {
                                        return (
                                            <div key={props.id} className={`flex rounded-lg p-3 flex-row flex-wrap items-center gap-2 ${index % 2 === 0
                                                ? 'bg-background-secondary'
                                                : 'bg-background-tertiary'
                                                }`}>
                                                {isCreating && (
                                                    <IconButton
                                                        Icon={Close}
                                                        className="mt-6"
                                                        onClick={() => removeEligibleCollection(index)}
                                                        size="sm"
                                                        variant="ghost"
                                                    />
                                                )}
                                                <div className="flex shrink-0 flex-col gap-1">
                                                    <div className="flex flex-row gap-1">
                                                        <div className="flex flex-col gap-4">
                                                            <InputLabel name={t('form.infusedEligibleCollectionAddr')} />
                                                            <AddressInput
                                                                containerClassName="grow"
                                                                disabled={!isCreating}
                                                                error={errors?.recipient}
                                                                fieldName={(fieldNamePrefix + `collections.${index}.addr`) as `collections.${number}.addr`}
                                                                register={register}
                                                                validation={[makeValidateAddress(currentChain.bech32Prefix)]}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-4">
                                                            <InputLabel name={t('form.infusedEligibleCollectionMinRequired')} />
                                                            <NumericInput
                                                                disabled={!isCreating}
                                                                error={errors?.title}
                                                                fieldName={(fieldNamePrefix + `collections.${index}.min_req`) as `collections.${number}.min_req`}
                                                                register={register}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-4">
                                                            <InputLabel name={t('form.infusedEligibleCollectionMaxRequired')} />
                                                            <NumericInput
                                                                disabled={!isCreating}
                                                                error={errors?.title}
                                                                fieldName={(fieldNamePrefix + `collections.${index}.max_req`) as `collections.${number}.max_req`}
                                                                register={register}
                                                            />
                                                        </div>

                                                    </div>
                                                    <div className="flex flex-col gap-4">
                                                        <InputLabel name={t('form.paymmentSubtitute')} />
                                                        <TokenInput
                                                            amount={{
                                                                watch, setValue, register, getValues,
                                                                fieldName: (fieldNamePrefix + `collections.${index}.payment_substitute`) as `collections.${number}.payment_substitute`,
                                                                error: errors?.amount,
                                                                min: HugeDecimal.one.toHumanReadableNumber(6),
                                                                step: HugeDecimal.one.toHumanReadableNumber(6),
                                                            }}
                                                            // disabled={!shitstrapOwnerAddrValid}
                                                            onSelectToken={(token) => {
                                                                setValue((fieldNamePrefix + 'infusionParams.mint_fee.denom') as 'infusionParams.mint_fee.denom', token?.denomOrAddress!)
                                                            }}
                                                            onCustomTokenChange={(custom) => {
                                                                setValue((fieldNamePrefix + 'infusionParams.mint_fee.denom') as 'infusionParams.mint_fee.denom', custom)
                                                            }}
                                                            allowCustomToken
                                                            // readOnly={!isCreating}
                                                            selectedToken={{
                                                                type: TokenType.Native,
                                                                denomOrAddress: watchInfusedParams.mint_fee?.denom!,
                                                                chainId: watchChainId,
                                                            }}
                                                            showChainImage
                                                            tokens={{
                                                                loading: false,
                                                                data: !currentWalletTokenBalances.loading
                                                                    ? currentWalletTokenBalances.data
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
                                                                                    decimals: 6,
                                                                                }),
                                                                        }))
                                                                    : [],
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                                {
                                    isCreating && (
                                        <Button
                                            className="self-start"
                                            onClick={() => appendEligibleCollection({})}
                                            variant="secondary"
                                        >
                                            {t('button.addEligibleCollection')}
                                        </Button>
                                    )
                                }

                                <InputLabel name={t('form.infusedAdmin')} />
                                <AddressInput
                                    containerClassName="grow"
                                    disabled={!isCreating}
                                    error={errors?.recipient}
                                    fieldName={(fieldNamePrefix + 'owner') as 'owner'}
                                    register={register}
                                    validation={[

                                        makeValidateAddress(currentChain.bech32Prefix),
                                    ]}
                                />
                                <InputLabel name={t('form.infusedPaymentRecipient')} />
                                <AddressInput
                                    containerClassName="grow"
                                    disabled={!isCreating}
                                    error={errors?.recipient}
                                    fieldName={(fieldNamePrefix + 'owner') as 'owner'}
                                    register={register}
                                    validation={[

                                        makeValidateAddress(currentChain.bech32Prefix),
                                    ]}
                                />
                                <InputLabel name={t('form.infusionParams')} />
                                <InputLabel name={t('form.infusionMintFee')} />
                                <TokenInput
                                    amount={{
                                        watch,
                                        setValue,
                                        register,
                                        getValues,
                                        fieldName: (fieldNamePrefix + 'infusionParams.mint_fee.amount') as 'infusionParams.mint_fee.amount',
                                        error: errors?.amount,
                                        min: HugeDecimal.one.toHumanReadableNumber(6),
                                        step: HugeDecimal.one.toHumanReadableNumber(6),
                                    }}
                                    // disabled={!shitstrapOwnerAddrValid}
                                    onSelectToken={(token) => {
                                        setValue((fieldNamePrefix + 'infusionParams.mint_fee.denom') as 'infusionParams.mint_fee.denom', token?.denomOrAddress!)
                                    }}
                                    onCustomTokenChange={(custom) => {
                                        setValue((fieldNamePrefix + 'infusionParams.mint_fee.denom') as 'infusionParams.mint_fee.denom', custom)
                                    }}
                                    allowCustomToken
                                    // readOnly={!isCreating}
                                    selectedToken={{
                                        type: TokenType.Native,
                                        denomOrAddress: watchInfusedParams.mint_fee?.denom!,
                                        chainId: watchChainId,
                                    }}
                                    showChainImage
                                    tokens={{
                                        loading: false,
                                        data: !currentWalletTokenBalances.loading
                                            ? currentWalletTokenBalances.data
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
                                                            decimals: 6,
                                                        }),
                                                }))
                                            : [],
                                    }}
                                /></>) : null}

                        </div>
                    </>)}
                </div>
            </>)
    }