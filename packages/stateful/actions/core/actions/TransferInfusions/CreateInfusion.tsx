import { Close } from '@mui/icons-material'
import { ComponentType, useEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import {
  CommonNftSelectors,
  DaoDaoCoreSelectors,
  genericTokenBalancesSelector,
  Sg721BaseSelectors,
} from '@dao-dao/state/recoil'
import {
  AddressInput as StatelessAddressInput,
  Button,
  ChainProvider,
  DaoSupportedChainPickerInput,
  FormSwitchCard,
  IconButton,
  InputLabel,
  MarkdownRenderer,
  NumericInput,
  SegmentedControls,
  SelectInput,
  Switch,
  SwitchCard,
  TextAreaInput,
  TextInput,
  TokenAmountDisplay,
  TokenInput,
  TooltipInfoIcon,
  useActionOptions,
  useCachedLoading,
  useCachedLoadingWithError,
  useChain,
  useInitializedActionForKey,
} from '@dao-dao/stateless'
import {
  ActionChainContextType,
  ActionComponentProps,
  ActionContextType,
  ActionKey,
  Addr,
  AddressInputProps,
  EntityType,
  GenericToken,
  GenericTokenBalance,
  LoadingData,
  LoadingDataWithError,
  SegmentedControlsProps,
  TokenType,
  TypedOption,
} from '@dao-dao/types'
import {
  BundleType,
  InfusedCollection,
  InfusionConfig,
  InfusionParams,
  NFTCollection,
} from '@dao-dao/types/contracts/CwInfuser'
import {
  getChainAddressForActionOptions,
  getChainAssets,
  getChainForChainId,
  getSupportedChainConfig,
  isValidBech32Address,
  makeValidateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { useEntity, useWallet } from '../../../../hooks'
import { useTokenBalances } from '../../../hooks'
import { CreateInfusionData, InfusionBundleType } from '../../../../modules/modules/Infusions/InfusionsRenderer'
import clsx from 'clsx'
import { EligibleCollectionCard } from '../../../../modules/modules/Infusions/components/stateless/EligibleCollectionCard'
import { AddressInput } from '../../../../components'


export type CreateInfusionOptions = {
  tokens: LoadingData<GenericTokenBalance[]>
  infusion: LoadingDataWithError<InfusionConfig[]>
  AddressInput: ComponentType<AddressInputProps<CreateInfusionData>>
}

export const CreateInfusion: ComponentType<
  ActionComponentProps<CreateInfusionOptions>
> = ({ isCreating, options, errors, fieldNamePrefix }) => {
  const { t } = useTranslation()
  const actionOptions = useActionOptions()

  const {
    context,
    chainContext,
    chain: { chainId: nativeChainId },
  } = actionOptions

  const configureCreateInfusionActionDefaults = useInitializedActionForKey(
    ActionKey.InfuseNfts
  )
  if (chainContext.type !== ActionChainContextType.Supported) {
    throw new Error('Unsupported chain context')
  }


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

  const watchMode = watch((fieldNamePrefix + 'mode') as 'mode')
  const watchChainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const watchInfusionMinter = watch(
    (fieldNamePrefix + 'infusionMinter') as 'infusionMinter'
  )
  const watchEligibleCollections = watch(
    (fieldNamePrefix + 'collections') as 'collections'
  )
  const watchInfusedCollection = watch(
    (fieldNamePrefix + 'infusedCollection') as 'infusedCollection'
  )
  const watchInfusedParams = watch(
    (fieldNamePrefix + 'infusionParams') as 'infusionParams'
  )
  const watchInfusionBundlType = watchInfusedParams.bundle_type
  const watchPaymentRecipient = watch(
    (fieldNamePrefix + 'paymentRecipient') as 'paymentRecipient'
  )
  const watchOwner = watch((fieldNamePrefix + 'owner') as 'owner')
  const watchCreationFee = watch((fieldNamePrefix + 'deposit') as 'deposit')


  const {
    fields: eligibleCollectionField,
    append: appendEligibleCollection,
    remove: removeEligibleCollection,
    update: updateEligibleCollection,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'collections') as 'collections',
  })

  // get connected wallet balance info
  const { address: walletAddress, getSigningClient } = useWallet()
  const tokenBalances = useTokenBalances()

  const { entity: walletEntity } = useEntity(
    walletAddress
      ? isValidBech32Address(walletAddress)
        ? walletAddress
        : ''
      : ''
  )

  const handleSelectAll = () => {
    // Get current bundle type value
    const currentBundle = watch((fieldNamePrefix + 'infusionParams.bundle_type') as 'infusionParams.bundle_type');

    // Extract existing addresses if any_of exists
    const existingAddrs =
      currentBundle &&
        'any_of' in currentBundle &&
        Array.isArray(currentBundle.any_of.addrs)
        ? currentBundle.any_of.addrs
        : [];

    // Get all eligible addresses
    const allAddrs = watchEligibleCollections.map(c => c.addr);

    // Combine existing with new, removing duplicates
    const combinedAddrs = Array.from(new Set([...existingAddrs, ...allAddrs]));

    // Update form value
    setValue(
      (fieldNamePrefix + 'infusionParams.bundle_type') as 'infusionParams.bundle_type',
      { any_of: { addrs: combinedAddrs } }
    );
  };


  const handleReset = () => {
    // reset any_of type
    setValue((fieldNamePrefix + 'infusionParams.bundle_type') as 'infusionParams.bundle_type', { any_of: { addrs: [] } })
  };


  const handleCollectionToggle = (addr: Addr) => {
    // Get current bundle type value
    const currentBundle = watch((fieldNamePrefix + 'infusionParams.bundle_type') as 'infusionParams.bundle_type');

    // Extract existing addresses if any_of exists
    const existingAddrs =
      currentBundle &&
        'any_of' in currentBundle &&
        Array.isArray(currentBundle.any_of.addrs)
        ? currentBundle.any_of.addrs
        : [];

    // Toggle address
    const updatedAddrs = existingAddrs.includes(addr)
      ? existingAddrs.filter(a => a !== addr) // Remove
      : [...existingAddrs, addr]; // Add

    // Update form value
    setValue(
      (fieldNamePrefix + 'infusionParams.bundle_type') as 'infusionParams.bundle_type',
      { any_of: { addrs: updatedAddrs } }
    );
  };

  // Create a reusable CollectionInfo component
  const CollectionInfoDisplay = ({ chainId, contractAddress }: { chainId: string; contractAddress: string }) => {
    const collectionInfo = useCachedLoadingWithError(
      Sg721BaseSelectors.collectionInfoSelector({
        chainId,
        contractAddress,
        params: []
      })
    )
    const contractInfo = useCachedLoadingWithError(
      Sg721BaseSelectors.contractInfoSelector({
        chainId,
        contractAddress,
        params: []
      })
    )

    return (
      <div className="bg-background-secondary rounded-lg p-3 mt-2">
        {collectionInfo.loading || contractInfo.loading ? (
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-background-base h-10 w-10"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-background-base rounded w-3/4"></div>
              <div className="h-3 bg-background-base rounded w-1/2"></div>
            </div>
          </div>
        ) : collectionInfo.errored || contractInfo.errored ? (
          <p className="text-error text-sm">⚠️ Failed to load collection info</p>
        ) : (
          <EligibleCollectionCard
            fieldNamePrefix={fieldNamePrefix}
            nftAddr={contractAddress} index={0} requiredParams={{
              addr: contractAddress,
              collectionInfo: collectionInfo.data,
              contractInfo: contractInfo.data,
              max_req: undefined,
              min_req: 0,
              payment_substitute: undefined
            }}
            globalPaymentSub={true}
            paymentSub={null}
            onUseSingleFeeSubstitute={() => { }}
            nftInfo={{ creator: '', description: '', image: '' }} contractInfo={{ name: '', symbol: '' }} bundleType={{
              all_of: {}
            } as BundleType}
          />
        )}
      </div>
    )
  }

  // Create a function to render all valid collection info
  const renderCollectionInfos = () => {
    return eligibleCollectionField.map((props, index) => {
      const address = watch(`collections.${index}.addr`)

      if (!isValidBech32Address(address)) return null

      return (
        <div key={props.id} className="mb-4">
          <div className="flex flex-row items-center space-x-2">
            <div className="flex grow flex-col gap-1">
              <AddressInput
                containerClassName="grow"
                disabled={!isCreating}
                error={errors?.collections?.[index]?.addr}
                fieldName={
                  (fieldNamePrefix +
                    `collections.${index}.addr`) as `collections.${number}.addr`
                }
                register={register}
                validation={[
                  makeValidateAddress(currentChain.bech32Prefix),
                ]}
              />
            </div>
            <Button
              type="button"
              onClick={() => removeEligibleCollection(index)}
              variant="ghost"
            // icon={<TrashBinIcon className="!h-5 !w-5 text-icon-tertiary" />}
            />
          </div>

          {/* Collection Info Display */}

        </div>
      )
    })
  }

  const currentChain = getChainForChainId(watchChainId)
  const chainAddressOwner = getChainAddressForActionOptions(
    actionOptions,
    currentChain.chainId
  )
  const validInfusionMinterAddr =
    !!watchInfusionMinter &&
    isValidBech32Address(watchInfusionMinter, currentChain.bech32Prefix)
  const infusionConfig =
    options.infusion.loading || options.infusion.errored
      ? null
      : options.infusion.data[0]

  const availableTokens: GenericToken[] = Object.values(
    Object.fromEntries(
      [
        // First native.
        ...(chainContext.nativeToken ? [chainContext.nativeToken] : []),
        // Then the chain assets.
        ...getChainAssets(currentChain.chainId).filter(
          ({ denomOrAddress }) =>
            !chainContext.nativeToken || denomOrAddress !== chainContext.nativeToken.denomOrAddress
        ),
      ].map((token) => [token.denomOrAddress, token])
    )
  )

  const tabs: SegmentedControlsProps<InfusionBundleType>['tabs'] = [
    // Only allow beginning a vest if widget is setup. ([
    {
      label: t('title.allOf'),
      value: InfusionBundleType.AllOf,
    },
    {
      label: t('title.anyOf'),
      value: InfusionBundleType.AnyOf,
    },
    // {
    //     label: t('title.anyOfBlend'),
    //     value: InfusionBundleType.AnyOfBlend,
    // },
  ] as TypedOption<InfusionBundleType>[]

  const selectedBundleType = tabs.find((tab) => tab.value === watchMode)
  useEffect(() => {
    availableTokens
  }, [availableTokens])
  // automatically set the required infusion creation fee,
  // if one exists and current entity is not owner of infusion contract.
  useEffect(() => {
    // console.log("options.infusion:", options.infusion)
    if (
      !options.infusion.errored &&
      !options.infusion.loading &&
      infusionConfig?.infusion_fee &&
      chainAddressOwner != infusionConfig.contract_owner
    ) {
      setValue(
        (fieldNamePrefix + 'deposit.0.amount') as 'deposit.0.amount',
        infusionConfig.infusion_fee.balance
      )
      setValue(
        (fieldNamePrefix + 'deposit.0.denom') as 'deposit.0.denom',
        infusionConfig.infusion_fee.token.denomOrAddress
      )
    } else {
      setValue((fieldNamePrefix + 'deposit') as 'deposit', [])
    }
    // console.log("watchCreationFee:", watchCreationFee)
  }, [options.infusion])



  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <div className="flex flex-row items-center gap-x-4">
            {context.type === ActionContextType.Dao && (
              <DaoSupportedChainPickerInput
                disabled={!isCreating}
                fieldName={fieldNamePrefix + 'chainId'}
                onChange={(chainId) => {
                  // Reset when switching chain.
                  setValue((fieldNamePrefix + 'chainId') as 'chainId', chainId)
                  setValue((fieldNamePrefix + 'collections') as 'collections', [])
                  setValue(
                    (fieldNamePrefix + 'infusionParams') as 'infusionParams',
                    { bundle_type: { all_of: {} }, wavs_enabled: false }
                  )
                  setValue(
                    (fieldNamePrefix + 'owner') as 'owner',
                    chainAddressOwner ? chainAddressOwner : ''
                  )
                  setValue(
                    (fieldNamePrefix + 'paymentRecipient') as 'paymentRecipient',
                    chainAddressOwner ? chainAddressOwner : ''
                  )
                }}
              />
            )}
            <div className="flex flex-col gap-1">
              <ChainProvider chainId={watchChainId}>
                <InputLabel name={t('form.infusionMinter')} />
                <AddressInput
                  containerClassName=""
                  disabled={!isCreating}
                  error={errors?.recipient}
                  fieldName={(fieldNamePrefix + 'infusionMinter') as 'infusionMinter'}
                  register={register}
                  validation={[makeValidateAddress(currentChain.bech32Prefix)]}
                />
              </ChainProvider>
            </div>
          </div>
          {validInfusionMinterAddr ? (
            <>
              <div className="flex flex-row gap-3">
                <p className="title-text truncate font-mono hover:opacity-80 transition-opacity">
                  {t('form.infusedCollectionDetails')}
                </p>
                <TooltipInfoIcon
                  className="relative mx-2 inline-block"
                  size="xs"
                  title={t('info.infusedCollectionDetailsTooltip')}
                />
              </div>
              <div className="flex flex-row gap-3">
                <InputLabel name={t('form.infusedName')} />
                <TextInput
                  className="w-1/3"
                  disabled={!isCreating}
                  error={errors?.title}
                  fieldName={
                    (fieldNamePrefix +
                      'infusedCollection.name') as 'infusedCollection.name'
                  }
                  register={register}
                  required
                />
                <InputLabel name={t('form.infusedSymbol')} />
                <TextInput
                  className="w-1/4"
                  disabled={!isCreating}
                  error={errors?.title}
                  fieldName={
                    (fieldNamePrefix +
                      'infusedCollection.symbol') as 'infusedCollection.symbol'
                  }
                  register={register}
                  required
                />
                <InputLabel name={t('form.infusedNumToken')} />
                <NumericInput
                  className="!w-9"
                  disabled={!isCreating}
                  error={errors?.title}
                  fieldName={
                    (fieldNamePrefix +
                      'infusedCollection.num_tokens') as 'infusedCollection.num_tokens'
                  }
                  getValues={getValues}
                  min={1}
                  register={register}
                  required
                  setValue={setValue}
                  validation={[validatePositive, validateRequired]}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <InputLabel name={t('form.infusedCollectionDescription')} />
                <TextAreaInput
                  disabled={!isCreating}
                  fieldName={
                    (fieldNamePrefix +
                      'infusedCollection.description') as 'infusedCollection.description'
                  }
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
                  fieldName={
                    (fieldNamePrefix +
                      'infusedCollection.base_uri') as 'infusedCollection.base_uri'
                  }
                  register={register}
                  required
                />
                <InputLabel name={t('form.infusedCollectionImage')} />
                <TextInput
                  disabled={!isCreating}
                  error={errors?.title}
                  fieldName={
                    (fieldNamePrefix +
                      'infusedCollection.image') as 'infusedCollection.image'
                  }
                  register={register}
                  required
                />
                <InputLabel name={t('form.infusedExternalLink')} />
                <TextInput
                  className="width-auto"
                  disabled={!isCreating}
                  error={errors?.title}
                  fieldName={
                    (fieldNamePrefix +
                      'infusedCollection.external_link') as 'infusedCollection.external_link'
                  }
                  register={register}
                />
              </div>

              <div className="flex flex-row gap-3">
                <InputLabel name={t('form.royaltyRecipientAddress')} />
                <TooltipInfoIcon
                  className="relative mx-2 inline-block"
                  size="xs"
                  title={t('info.royaltyRecipientAddressTooltip')}
                />
              </div>
              <div className="flex flex-row gap-3">
                <AddressInput
                  containerClassName="grow"
                  disabled={!isCreating}
                  error={errors?.recipient}
                  fieldName={
                    (fieldNamePrefix +
                      'infusedCollection.royalty_info.payment_address') as 'infusedCollection.royalty_info.payment_address'
                  }
                  register={register}
                  validation={[makeValidateAddress(currentChain.bech32Prefix)]}
                />
                <div className="flex flex-column gap-3">
                  <InputLabel name={t('form.royaltyPercentage')} />
                  <NumericInput
                    disabled={!isCreating}
                    error={errors?.title}
                    fieldName={
                      (fieldNamePrefix +
                        'infusedCollection.royalty_info.share') as 'infusedCollection.royalty_info.share'
                    }
                    getValues={getValues}
                    max={100}
                    min={0.01}
                    placeholder={t('form.infusionRoyaltyShares')}
                    register={register}
                    setValue={setValue}
                    step={0.01}
                  />
                </div>
              </div>
              {/* input for eligible collections */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-row gap-3">
                  <p className="title-text truncate font-mono hover:opacity-80 transition-opacity">
                    {t('form.infusedEligibleCollections')}
                  </p>
                  <TooltipInfoIcon
                    className="relative mx-2 inline-block"
                    size="xs"
                    title={t('info.infusedEligibleCollectionsTooltip')}
                  />
                </div>

                {eligibleCollectionField.map((props, index) => {
                  return (
                    <div
                      key={props.id}
                      className={`flex rounded-lg p-3 flex-row flex-wrap items-center gap-2 ${index % 2 === 0
                        ? 'bg-background-secondary'
                        : 'bg-background-tertiary'
                        }`}
                    >
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
                          <div className="flex flex-col gap-1">
                            <InputLabel
                              name={t('form.infusedEligibleCollectionAddr')}
                            />
                            <StatelessAddressInput
                              containerClassName="grow"
                              disabled={!isCreating}
                              error={errors?.recipient}
                              fieldName={
                                (fieldNamePrefix +
                                  `collections.${index}.addr`) as `collections.${number}.addr`
                              }
                              register={register}
                              validation={[
                                makeValidateAddress(currentChain.bech32Prefix),
                              ]}
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <InputLabel
                              name={t(
                                'form.infusedEligibleCollectionMinRequired'
                              )}
                            />
                            <NumericInput
                              disabled={!isCreating}
                              error={errors?.title}
                              fieldName={
                                (fieldNamePrefix +
                                  `collections.${index}.min_req`) as `collections.${number}.min_req`
                              }
                              getValues={getValues}
                              max={10}
                              min={1}
                              numericValue
                              register={register}
                              required
                              setValue={setValue}
                            />
                          </div>
                        </div>

                        {isCreating && (
                          <div className="flex flex-col gap-1">
                            <div className="flex flex-row gap-1">
                              <InputLabel name={t('form.paymentSubstitute')} />
                              <TooltipInfoIcon
                                className="relative mx-2 inline-block"
                                size="xs"
                                title={t('form.paymentSubstituteDescription')}
                              />
                            </div>
                            <SwitchCard
                              onLabel={t('form.disablePaymentSubstitute')}
                              offLabel={t('form.enablePaymentSubstitute')}
                              readOnly={!isCreating}
                              enabled={!!eligibleCollectionField.at(index)?.payment_substitute}
                              onClick={() => {
                                const eligible = eligibleCollectionField.at(index);
                                const newPaymentSubstitute = eligible?.payment_substitute ? undefined : { amount: '0', denom: '' };


                                updateEligibleCollection(index, {
                                  addr: '',
                                  min_req: 0
                                });
                              }}
                              sizing="sm"
                            />

                            {!!eligibleCollectionField.at(index)?.payment_substitute && (
                              <>
                                <TokenInput
                                  allowCustomToken

                                  amount={{
                                    watch,
                                    setValue,
                                    register,
                                    getValues,
                                    fieldName: (fieldNamePrefix +
                                      `collections.${index}.payment_substitute.amount`) as `collections.${number}.payment_substitute.amount`,
                                    error: errors?.amount,
                                    min: HugeDecimal.one.toHumanReadableNumber(6),
                                    step: HugeDecimal.one.toHumanReadableNumber(6),
                                  }}
                                  onCustomTokenChange={(custom) => {
                                    setValue(
                                      (fieldNamePrefix +
                                        `collections.${index}.payment_substitute.denom`) as `collections.${number}.payment_substitute.denom`,
                                      custom
                                    )
                                  }}
                                  onSelectToken={(token) => {
                                    setValue(
                                      (fieldNamePrefix +
                                        `collections.${index}.payment_substitute.denom`) as `collections.${number}.payment_substitute.denom`,
                                      token?.denomOrAddress!
                                    )
                                  }}
                                  readOnly={!isCreating}
                                  selectedToken={{
                                    type: TokenType.Native,
                                    denomOrAddress: watchEligibleCollections.at(index)?.payment_substitute?.denom!,
                                    chainId: watchChainId,
                                  }}
                                  showChainImage
                                  tokens={{
                                    loading: false,
                                    data: availableTokens,
                                  }}
                                />
                              </>
                            )}
                          </div>
                        )}


                      </div>
                    </div>
                  )
                })}
              </div>
              {isCreating && (
                <Button
                  className="self-start"
                  onClick={() => appendEligibleCollection({})}
                  variant="secondary"
                >
                  {t('button.addEligibleCollection')}
                </Button>
              )}


              <div className="flex flex-row gap-3">
                <p className="title-text truncate font-mono hover:opacity-80 transition-opacity">
                  {t('form.infusionBundleType')}
                </p>

                <TooltipInfoIcon
                  className="relative mx-2 inline-block"
                  size="xs"
                  title={<MarkdownRenderer
                    className="body-text text-text-secondary text-sm -mt-1"
                    markdown={t('form.InfusionBundleTypeDescription')}
                  />}
                />
              </div>

              <SegmentedControls<CreateInfusionData['mode']>
                className="mb-2"
                onSelect={(value) =>
                  setValue((fieldNamePrefix + 'mode') as 'mode', value)
                }
                selected={watchMode}
                tabs={tabs}
              />

              {/* form to select bundle: */}
              {/* AllOf: no additional stuff */}
              {/* AnyOf:Dropdown list from collections to set as eligible to set as accepted as anyOf */}
              {/* AnyOfBlend: similar modal as selecting eligible collections */}
              {watchMode === InfusionBundleType.AllOf ? <></> : null}
              {watchMode === InfusionBundleType.AnyOf ? <>
                <>
                  {/* if selected already, display in button, and on select if it already exist in the form we are removing it from the form  */}
                  <div className="grid grid-cols-3 gap-4 my-4">
                    {isCreating ? watchEligibleCollections.map((eligible, idx) => {
                      // Extract current bundle type value
                      const bundleType = watchInfusedParams?.bundle_type;

                      // Get current selected addresses
                      const currentAddrs =
                        bundleType && 'any_of' in bundleType
                          ? bundleType.any_of.addrs
                          : [];

                      // Check if current collection is selected
                      const isSelected = currentAddrs.includes(eligible.addr);

                      return (
                        <Button
                          key={idx}
                          className={clsx(
                            'sacred-button relative p-4 rounded-md  transition-all duration-300 transform',
                            'flex items-center justify-center',
                            // 'bg-gradient-to-br from-transparent via-transparent to-transparent',
                            'overflow-hidden',
                            isSelected ? [
                              'border-primary-500 scale-105',
                              'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]',
                              'from-primary-100/50 via-primary-200/30 to-primary-300/10',
                              'shadow-[0_0_5px_2px_rgba(99,102,241,0.1)]'
                            ] : '  hover:primary-300',
                            !isCreating && 'opacity-50 cursor-not-allowed'
                          )}
                          value={eligible.addr}
                          onClick={() => handleCollectionToggle(eligible.addr)}
                          variant="secondary"
                        >  <p className="truncate">
                            Collection #{idx}
                          </p>
                        </Button>

                      )
                    }) : undefined}
                    {/* Control Buttons */}
                    <div className="col-span-3 flex justify-between mt-4">
                      <Button
                        className="self-start"
                        onClick={() => handleSelectAll()}
                        variant="primary"
                      >
                        {t('button.selectAll')}
                      </Button>
                      <Button
                        className="self-start"
                        onClick={() => handleReset()}
                        variant="secondary"
                      >
                        {t('button.reset')}
                      </Button>
                    </div>
                  </div>


                </>
              </> : null}

              {watchMode === InfusionBundleType.AnyOfBlend ? <>
                {
                  watchEligibleCollections?.map((es, index) => (
                    <div
                      key={index}
                      className="flex flex-row items-center gap-4 rounded-lg bg-background-secondary p-4"
                    >
                      {/* on click, set add this event segment to the form for this guest type */}
                      <IconButton
                        Icon={Close}
                        iconClassName="text-icon-secondary"
                        onClick={() => {
                          // const currentValue = getValues((fieldNamePrefix + `guest_details.${tierIndex}.event_segment_access`) as `guest_details.${number}.event_segment_access`);
                          // if ('specific_segments' in currentValue) {
                          //   setValue(
                          //     (fieldNamePrefix + `guest_details.${tierIndex}.event_segment_access`) as `guest_details.${number}.event_segment_access`,
                          //     { specific_segments: { ids: currentValue.specific_segments.ids } }
                          //   );
                          // }
                        }}
                        size="sm"
                        variant="ghost"
                      > {es.addr}</IconButton>
                    </div>
                  ))
                }
              </> : null}

              <div className="flex flex-row gap-3">
                <p className="title-text truncate font-mono hover:opacity-80 transition-opacity">
                  {t('form.infusionParams')}
                </p>
                <TooltipInfoIcon
                  className="relative mx-2 inline-block"
                  size="xs"
                  title={t('form.infusionMintFeeDescription')}
                />
              </div>

              <InputLabel name={t('form.infusedAdmin')} />
              <AddressInput
                containerClassName="grow"
                disabled={!isCreating}
                error={errors?.recipient}
                fieldName={(fieldNamePrefix + 'owner') as 'owner'}
                register={register}
                validation={[makeValidateAddress(currentChain.bech32Prefix)]}
              />
              <InputLabel name={t('form.infusedPaymentRecipient')} />
              <AddressInput
                containerClassName="grow"
                disabled={!isCreating}
                error={errors?.recipient}
                fieldName={
                  (fieldNamePrefix + 'paymentRecipient') as 'paymentRecipient'
                }
                register={register}
                validation={[makeValidateAddress(currentChain.bech32Prefix)]}
              />



              <div className="flex flex-row gap-3">
                <InputLabel name={t('form.infusionMintFee')} />
                <TooltipInfoIcon
                  className="relative mx-2 inline-block"
                  size="xs"
                  title={t('form.infusionMintFeeDescription')}
                />
              </div>

              {isCreating && (
                <>
                  <TokenInput
                    allowCustomToken
                    // disabled={!shitstrapOwnerAddrValid}
                    amount={{
                      watch,
                      setValue,
                      register,
                      getValues,
                      fieldName: (fieldNamePrefix +
                        'infusionParams.mint_fee.amount') as 'infusionParams.mint_fee.amount',
                      error: errors?.amount,
                      min: HugeDecimal.one.toHumanReadableNumber(6),
                      step: HugeDecimal.one.toHumanReadableNumber(6),
                    }}
                    onCustomTokenChange={(custom) => {
                      setValue(
                        (fieldNamePrefix +
                          'infusionParams.mint_fee.denom') as 'infusionParams.mint_fee.denom',
                        custom
                      )
                    }}
                    onSelectToken={(token) => {
                      setValue(
                        (fieldNamePrefix +
                          'infusionParams.mint_fee.denom') as 'infusionParams.mint_fee.denom',
                        token?.denomOrAddress!
                      )
                    }}
                    readOnly={!isCreating}
                    selectedToken={{
                      type: TokenType.Native,
                      denomOrAddress: watchInfusedParams.mint_fee?.denom!,
                      chainId: watchChainId,
                    }}
                    showChainImage
                    tokens={{
                      loading: false,
                      data: availableTokens,
                    }}
                  />
                </>
              )}
            </>
          ) : null}

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
        {infusionConfig?.infusion_fee && (
          <>
            <p className="primary-text mb-3">
              {t('form.globalInfusionCreationFee')}
            </p>
            <TokenAmountDisplay
              amount={HugeDecimal.from(infusionConfig.infusion_fee.balance)}
              decimals={infusionConfig.infusion_fee.token.decimals}
              iconUrl={infusionConfig.infusion_fee.token.imageUrl}
              showAllDecimals
              showFullAmount
              symbol={infusionConfig.infusion_fee.token.symbol}
            />
          </>
        )}
      </div>
    </>
  )
}
