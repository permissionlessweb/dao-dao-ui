import { Config, InfusedCollection, InfusionParams, NFTCollection } from "@dao-dao/types/contracts/CwInfuser"
import { Counterparty } from "../token_swap/types"
import { ComponentType, useEffect } from "react"
import { ActionChainContextType, ActionComponentProps, ActionContextType, ActionKey, AddressInputProps, EntityType, GenericTokenBalance, GenericTokenBalanceWithOwner, LoadingData, LoadingDataWithError, TokenType } from "@dao-dao/types"
import { useTranslation } from "react-i18next"
import { AddressInput, Button, DaoSupportedChainPickerInput, FormSwitch, IconButton, InputErrorMessage, InputLabel, NumericInput, TextAreaInput, TextInput, TokenAmountDisplay, TokenInput, useActionOptions, useCachedLoading, useChain, useInitializedActionForKey } from "@dao-dao/stateless"
import { useEntity, useWallet } from "../../../../hooks"
import { useTokenBalances } from "../../../hooks"
import { useFieldArray, useFormContext } from "react-hook-form"
import { getChainAddressForActionOptions, getChainForChainId, getSupportedChainConfig, isValidBech32Address, makeValidateAddress, validatePositive, validateRequired } from "@dao-dao/utils"
import { HugeDecimal } from "@dao-dao/math"
import { constSelector, useRecoilValueLoadable } from "recoil"
import { DaoDaoCoreSelectors, genericTokenBalancesSelector } from "@dao-dao/state/recoil"
import { Close } from "@mui/icons-material"


export type CreateInfusionData = {
    chainId: string
    description: string
    infusionMinter: string  //todo: replace for widget
    collections: NFTCollection[]
    infusedCollection: InfusedCollection
    infusionParams: InfusionParams
    paymentRecipient: string
    owner?: string
    deposit: {
        amount: string
        denom: string
    }[]
    //   description: string
}

export type CreateInfusionOptions = {
    tokens: LoadingData<GenericTokenBalance[]>
    infusion: LoadingDataWithError<Config[]>
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
        const watchCreationFee = watch((fieldNamePrefix + 'deposit') as 'deposit')

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
        const chainAddressOwner = getChainAddressForActionOptions(
            actionOptions,
            currentChain.chainId
        )
        const validInfusionMinterAddr = !!watchInfusionMinter && isValidBech32Address(watchInfusionMinter, currentChain.bech32Prefix)
        const infusionConfig = options.infusion.loading || options.infusion.errored ? null : options.infusion.data[0]


        // automatically set the required infusion creation fee, 
        // if one exists and current entity is not owner of infusion contract.
        useEffect(() => {
            // console.log("options.infusion:", options.infusion)
            if (!options.infusion.errored && !options.infusion.loading && infusionConfig?.min_creation_fee && chainAddressOwner != infusionConfig.contract_owner) {
                setValue((fieldNamePrefix + 'deposit.0.amount') as 'deposit.0.amount', infusionConfig.min_creation_fee.amount)
                setValue((fieldNamePrefix + 'deposit.0.denom') as 'deposit.0.denom', infusionConfig.min_creation_fee.denom)

            } else {
                setValue((fieldNamePrefix + 'deposit') as 'deposit', [])
            }
            // console.log("watchCreationFee:", watchCreationFee)
        }, [options.infusion])

        return (
            <>
                <div className="flex flex-col gap-4">

                    {context.type === ActionContextType.Dao && (
                        <DaoSupportedChainPickerInput
                            disabled={!isCreating}
                            fieldName={fieldNamePrefix + 'chainId'}
                            onChange={(chainId) => {
                                // Reset when switching chain.
                                setValue((fieldNamePrefix + 'chainId') as 'chainId', chainId)
                                setValue((fieldNamePrefix + 'collections') as 'collections', [])
                                setValue((fieldNamePrefix + 'infusionParams') as 'infusionParams', {})
                                setValue((fieldNamePrefix + 'owner') as 'owner', chainAddressOwner ? chainAddressOwner : '')
                                setValue((fieldNamePrefix + 'paymentRecipient') as 'paymentRecipient', chainAddressOwner ? chainAddressOwner : '')
                            }}
                        />
                    )}
                    <div className="space-y-2">
                        <InputLabel name={t('form.infusionMinter')} />
                        <AddressInput
                            containerClassName="grow"
                            disabled={!isCreating}
                            error={errors?.recipient}
                            fieldName={(fieldNamePrefix + 'infusionMinter') as 'infusionMinter'}
                            register={register}
                            validation={[
                                makeValidateAddress(currentChain.bech32Prefix),
                            ]}
                        />
                        {validInfusionMinterAddr ? (<>
                            <p className="primary-text mb-3">{t('form.infusedCollectionDetails')}</p>
                            <div className="flex flex-row gap-3">
                                <InputLabel name={t('form.infusedName')} />
                                <TextInput
                                    className="w-1/3"
                                    disabled={!isCreating}
                                    error={errors?.title}
                                    fieldName={(fieldNamePrefix + 'infusedCollection.name') as 'infusedCollection.name'}
                                    register={register}
                                    required
                                />
                                <InputLabel name={t('form.infusedSymbol')} />
                                <TextInput
                                    className="w-1/4"
                                    disabled={!isCreating}
                                    error={errors?.title}
                                    fieldName={(fieldNamePrefix + 'infusedCollection.symbol') as 'infusedCollection.symbol'}
                                    register={register}
                                    required
                                />
                                <InputLabel name={t('form.infusedNumToken')} />
                                <NumericInput
                                    className="!w-9"
                                    getValues={getValues}
                                    register={register}
                                    setValue={setValue}
                                    validation={[validatePositive, validateRequired]}
                                    min={1}
                                    disabled={!isCreating}
                                    error={errors?.title}
                                    fieldName={(fieldNamePrefix + 'infusedCollection.num_tokens') as 'infusedCollection.num_tokens'}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <InputLabel name={t('form.infusedCollectionDescription')} />
                                <TextAreaInput
                                    disabled={!isCreating}
                                    fieldName={(fieldNamePrefix + 'infusedCollection.description') as 'infusedCollection.description'}
                                    placeholder={t('form.infusionDescriptionMaxCharacters')}
                                    register={register}
                                    rows={5}
                                    validation={[validateRequired]}
                                />
                                {/* <InputErrorMessage error={errors.newProposal?.description} /> */}
                            </div>
                            <div className="flex flex-row gap-3">
                                {/* define new infused params */}
                            </div>
                            <div className="flex flex-col gap-3">
                                <InputLabel name={t('form.infusedBaseUri')} />
                                <TextInput
                                    disabled={!isCreating}
                                    error={errors?.title}
                                    fieldName={(fieldNamePrefix + 'infusedCollection.base_uri') as 'infusedCollection.base_uri'}
                                    register={register}
                                    required
                                />
                                <InputLabel name={t('form.infusedCollectionImage')} />
                                <TextInput
                                    disabled={!isCreating}
                                    error={errors?.title}
                                    fieldName={(fieldNamePrefix + 'infusedCollection.image') as 'infusedCollection.image'}
                                    register={register}
                                    required
                                />
                                <InputLabel name={t('form.infusedExternalLink')} />
                                <TextInput
                                    className="width-auto"
                                    disabled={!isCreating}
                                    error={errors?.title}
                                    fieldName={(fieldNamePrefix + 'infusedCollection.external_link') as 'infusedCollection.external_link'}
                                    register={register}
                                />
                            </div>
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
                                    fieldName={(fieldNamePrefix + 'infusedCollection.royalty_info.share') as 'infusedCollection.royalty_info.share'}
                                    getValues={getValues}
                                    register={register}
                                    min={0.01}
                                    max={100}
                                    step={0.01}
                                    setValue={setValue}
                                    placeholder={t('form.infusionRoyaltyShares')}
                                />

                            </div>
                            {/* input for eligible collections */}
                            <div className="flex flex-col gap-3">
                                <p className="primary-text mb-3">{t('form.infusedEligibleCollections')}</p>
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
                                                            getValues={getValues}
                                                            register={register}
                                                            setValue={setValue}
                                                            min={1}
                                                            numericValue
                                                            max={10}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-4">
                                                        <InputLabel name={t('form.infusedEligibleCollectionMaxRequired')} />
                                                        <NumericInput
                                                            max={25}
                                                            disabled={!isCreating}
                                                            error={errors?.title}
                                                            fieldName={(fieldNamePrefix + `collections.${index}.max_req`) as `collections.${number}.max_req`}
                                                            getValues={getValues}
                                                            register={register}
                                                            setValue={setValue}
                                                        />
                                                    </div>

                                                </div>
                                                {isCreating &&
                                                    <div className="flex flex-col gap-4">
                                                        <InputLabel name={t('form.paymmentSubtitute')} />
                                                        <TokenInput
                                                            amount={{
                                                                watch, setValue, register, getValues,
                                                                fieldName: (fieldNamePrefix + `collections.${index}.payment_substitute.amount`) as `collections.${number}.payment_substitute.amount`,
                                                                error: errors?.amount,
                                                                min: HugeDecimal.one.toHumanReadableNumber(6),
                                                                step: HugeDecimal.one.toHumanReadableNumber(6),
                                                            }}
                                                            // disabled={!shitstrapOwnerAddrValid}
                                                            onSelectToken={(token) => {
                                                                setValue((fieldNamePrefix + `collections.${index}.payment_substitute.denom`) as `collections.${number}.payment_substitute.denom`, token?.denomOrAddress!)
                                                            }}
                                                            onCustomTokenChange={(custom) => {
                                                                setValue((fieldNamePrefix + `collections.${index}.payment_substitute.denom`) as `collections.${number}.payment_substitute.denom`, custom)
                                                            }}
                                                            allowCustomToken
                                                            readOnly={!isCreating}
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
                                                                                HugeDecimal.from(balance
                                                                                ).toInternationalizedHumanReadableString({
                                                                                    decimals: 6,
                                                                                }),
                                                                        }))
                                                                    : [],
                                                            }}
                                                        />
                                                    </div>
                                                }
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
                                fieldName={(fieldNamePrefix + 'paymentRecipient') as 'paymentRecipient'}
                                register={register}
                                validation={[makeValidateAddress(currentChain.bech32Prefix)]}
                            />
                            <InputLabel name={t('form.infusionParams')} />
                            <InputLabel name={t('form.infusionMintFee')} />
                            {isCreating && <>
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
                                    readOnly={!isCreating}
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
                            </>}
                        </>) : null}

                        <div className="flex flex-col space-y-2">
                            <InputLabel name={t('form.infusionDescription')} />
                            <TextAreaInput
                                fieldName={(fieldNamePrefix + 'description') as 'description'}
                                placeholder={t('form.infusionDescriptionMaxCharacters')}
                                register={register}
                                rows={5}
                                validation={[validateRequired]}
                            />
                            {/* <InputErrorMessage error={errors.newProposal?.description} /> */}
                        </div>

                    </div>
                    {infusionConfig?.min_creation_fee && (
                        <>
                            <p className="primary-text mb-3">{t('form.globalInfusionCreationFee')}</p>
                            <TokenAmountDisplay
                                amount={HugeDecimal.from(infusionConfig.min_creation_fee.amount)}
                                decimals={6}
                                // iconUrl={distribution.token.imageUrl}
                                showAllDecimals
                                showFullAmount
                                symbol={infusionConfig.min_creation_fee.denom}
                            />
                        </>

                    )}

                </div>
            </>)
    }