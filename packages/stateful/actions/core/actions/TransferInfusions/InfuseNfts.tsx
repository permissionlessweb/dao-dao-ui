import { useQueries } from '@tanstack/react-query'
import { ComponentType, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { nftQueries } from '@dao-dao/state/query'
import {
  lazyNftCardInfosForDaoSelector,
  walletLazyNftCardInfosSelector,
} from '@dao-dao/state/recoil'
import {
  ChainProvider,
  DaoSupportedChainPickerInput,
  HorizontalInfusionCard,
  HorizontalInfusionCardProps,
  InputErrorMessage,
  NumericInput,
  useActionOptions,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  AddressInputProps,
  GenericTokenBalance,
  LazyNftCardInfo,
  LoadingData,
  LoadingDataWithError,
  NftSelectionModalProps,
} from '@dao-dao/types'
import { Bundle, InfusionWithDetails } from '@dao-dao/types/contracts/CwInfuser'
import {
  combineLoadingDataWithErrors,
  getChainAddressForActionOptions,
  getChainForChainId,
  isValidBech32Address,
  makeCombineQueryResultsIntoLoadingDataWithError,
  makeValidateAddress,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { EntityDisplay } from '../../../../components'
import { useCw721CommonGovernanceTokenInfoIfExists } from '../../../../voting-module-adapter'

interface InfusionCollections {
  collection: String
  minRequired: number
  maxRequired: number | undefined
  paymentSubstitute: GenericTokenBalance | undefined
}

export type InfuseNftsData = {
  paymentSubstituteExists: boolean
  chainId: string
  infusionMinter: string
  infusionId: string
  // the bundle of nfts being infused
  infusionBundles: Bundle[]
  collection: string
  tokenId: string
  funds: {
    denom: string
    amount: string
    // Will multiply `amount` by 10^decimals when generating the message.
    decimals: number
  }[]
}

export interface InfuseNftsOptions {
  // The set of NFTs that may be infused as part of this action.
  // ownedNfts: LoadingDataWithError<LazyNftCardInfo[]>
  // Information about the NFT currently selected.
  // selectedNfts: LoadingDataWithError<NftCardInfo[]> | undefined
  // Information from the Infusion currently selected.
  infusionInfo: LoadingDataWithError<InfusionWithDetails[] | undefined>
  // // Information about the approval status of NFTs selected to be infused.
  // approvalInfo: LoadingDataWithError<Approval[] | undefined>

  tokens: LoadingData<GenericTokenBalance[]>
  AddressInput: ComponentType<AddressInputProps<InfuseNftsData>>
  NftSelectionModal: ComponentType<NftSelectionModalProps>
}

export const InfuseNftsComponent: ActionComponent<InfuseNftsOptions> = ({
  fieldNamePrefix,
  isCreating,
  errors,
  options: { tokens, infusionInfo, AddressInput, NftSelectionModal },
}) => {
  const { t } = useTranslation()
  const actionOptions = useActionOptions()
  const { denomOrAddress: governanceCollectionAddress } =
    useCw721CommonGovernanceTokenInfoIfExists() ?? {}

  const [showModal, setShowModal] = useState<boolean>(false)
  const { context, chainContext, chain, queryClient } = actionOptions
  const {
    control,
    watch,
    setValue,
    setError,
    getValues,
    register,
    clearErrors,
  } = useFormContext<InfuseNftsData>()

  const watchChainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const watchInfusionMinter = watch(
    (fieldNamePrefix + 'infusionMinter') as 'infusionMinter'
  )
  const watchInfusionId = watch(
    (fieldNamePrefix + 'infusionId') as 'infusionId'
  )

  const watchPaymentInfusionExists = watch(
    (fieldNamePrefix + 'paymentSubstituteExists') as 'paymentSubstituteExists'
  )
  const watchInfusionBundles = watch(
    (fieldNamePrefix + 'infusionBundles') as 'infusionBundles'
  )

  const currentChain = watchChainId ? getChainForChainId(watchChainId) : chain
  const chainAddressOwner = getChainAddressForActionOptions(
    actionOptions,
    currentChain.chainId
  )

  const infusion =
    !infusionInfo.errored && !infusionInfo.loading ? infusionInfo.data : []

  // gets the nfts owned by wallet or dao
  const nftOptions = useCachedLoadingWithError(
    isCreating
      ? actionOptions.context.type === ActionContextType.Wallet
        ? walletLazyNftCardInfosSelector({
            walletAddress: actionOptions.address,
            chainId: currentChain.chainId,
          })
        : lazyNftCardInfosForDaoSelector({
            chainId: currentChain.chainId,
            coreAddress: actionOptions.address,
            governanceCollectionAddress,
          })
      : undefined
  )

  const allChainOptions =
    nftOptions.loading || nftOptions.errored
      ? nftOptions
      : combineLoadingDataWithErrors(
          ...Object.values(nftOptions.data).filter(
            (data): data is LoadingDataWithError<LazyNftCardInfo[]> => !!data
          )
        )

  // filter nft info by accepted collection for current infusion
  const availableToInfuse: LoadingDataWithError<LazyNftCardInfo[]> =
    !allChainOptions.errored && !allChainOptions.loading && infusion
      ? {
          loading: false,
          errored: false,
          data: allChainOptions.data.filter((nft) =>
            infusion.some((infusion) =>
              infusion.eligibleCollections.some(
                (collection) => collection.addr == nft.collectionAddress
              )
            )
          ),
        }
      : allChainOptions

  // gets the nfts info for the selected nft.
  const selectedNfts = useQueries({
    queries:
      watchChainId && watchInfusionMinter && watchInfusionId
        ? watchInfusionBundles.flatMap((infuse) =>
            infuse.nfts.map((nft) =>
              nftQueries.cardInfo(queryClient, {
                chainId: watchChainId,
                collection: nft.addr,
                tokenId: nft.token_id.toString(),
              })
            )
          )
        : [],
    combine: makeCombineQueryResultsIntoLoadingDataWithError(),
  })

  useEffect(() => {
    if (!watchInfusionBundles) {
      setError((fieldNamePrefix + 'infusionBundles') as 'infusionBundles', {
        type: 'required',
        message: t('error.noInfusionBundles'),
      })
    } else {
      clearErrors((fieldNamePrefix + 'infusionBundles') as 'infusionBundles')
    }
  }, [watchInfusionBundles, setError, clearErrors, t, fieldNamePrefix])

  useEffect(() => {
    console.log('FORM DEBUG: watchInfuionBundles', watchInfusionBundles)
    console.log('FORM DEBUG: watchChainId', watchChainId)
    console.log('FORM DEBUG: selectedNfts', selectedNfts)
  }, [watchInfusionBundles])

  // when infusion ID or infusion contract is changed, reset selected nfts & funds
  useEffect(() => {
    setValue((fieldNamePrefix + 'infusionBundles') as 'infusionBundles', [])
    setValue((fieldNamePrefix + 'funds') as 'funds', [])
    setValue((fieldNamePrefix + 'collection') as 'collection', '')
    setValue((fieldNamePrefix + 'tokenId') as 'tokenId', '')
  }, [watchInfusionId, watchInfusionMinter])

  return (
    <>
      <div className="flex flex-col gap-y-4 gap-x-12 lg:flex-row lg:flex-wrap">
        {context.type === ActionContextType.Dao && (
          <DaoSupportedChainPickerInput
            disabled={!isCreating}
            fieldName={fieldNamePrefix + 'chainId'}
            onChange={(chainId) => {
              // Reset when switching chain.
              setValue((fieldNamePrefix + 'chainId') as 'chainId', chainId)
            }}
          />
        )}
        <div className="flex grow flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="primary-text mb-3">
              {isCreating
                ? t('form.whichInfusionMinter')
                : t('form.infusionMinter')}
            </p>
            <ChainProvider chainId={watchChainId}>
              <AddressInput
                disabled={!isCreating}
                error={errors?.recipient}
                fieldName={
                  (fieldNamePrefix + 'infusionMinter') as 'infusionMinter'
                }
                register={register}
                validation={[
                  validateRequired,
                  // If executing smart contract, ensure recipient is smart
                  // contract.
                  // (executeSmartContract
                  //     ? makeValidateAddress
                  //     : makeValidateAddress)(chain.bech32_prefix),
                  makeValidateAddress(currentChain.bech32Prefix),
                ]}
              />

              {isValidBech32Address(watchInfusionMinter) ? (
                <>
                  <p className="primary-text mb-3">
                    {isCreating
                      ? t('form.whichInfusionId')
                      : t('form.infusionId')}
                  </p>
                  <NumericInput
                    disabled={!isCreating}
                    error={errors?.codeId}
                    fieldName={(fieldNamePrefix + 'infusionId') as 'infusionId'}
                    min={0}
                    numericValue
                    register={register}
                    sizing="sm"
                    step={1}
                    validation={[validateRequired, validatePositive]}
                  />
                </>
              ) : null}
            </ChainProvider>
            <InputErrorMessage error={errors?.recipient} />
          </div>
        </div>

        <div className="flex grow flex-col gap-2">
          {isCreating && infusion?.length != 0 && (
            <></> // <InputLabel name={t('title.numNfts', { count: watchInfuionBundles.length() })} />
          )}

          <InputErrorMessage error={errors?.collection} />
        </div>
      </div>
      {/* Create way to tab between infusions for a given */}
      <div className="flex flex-col gap-1">
        {infusion &&
          selectedNfts &&
          !selectedNfts.errored &&
          !selectedNfts.loading && (
            <>
              {infusion.map((ii, index) => {
                const newIi: HorizontalInfusionCardProps = {
                  ...ii,
                  currentEntity: chainAddressOwner,
                  chainId: watchChainId,
                  EntityDisplay,
                  fieldNamePrefix,
                  entityEligibleNFTs: availableToInfuse,
                  selectedNfts,
                  isProposalAction: true,
                  isCreating,
                }
                return (
                  <HorizontalInfusionCard key={index.toString()} {...newIi} />
                )
              })}
            </>
          )}
      </div>
    </>
  )
}
