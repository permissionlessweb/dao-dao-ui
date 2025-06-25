import { toUtf8 } from '@cosmjs/encoding'
import { QueryClient, useQueries, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  cwInfuserExtraQueries,
  nftQueries,
  walletLazyNftCardInfosSelector,
} from '@dao-dao/state'
import {
  AddressInput,
  Button,
  ChainProvider,
  DaoSupportedChainPickerInput,
  HorizontalInfusionCard,
  NumericInput,
  useCachedLoadingWithError,
  useChain,
} from '@dao-dao/stateless'
import {
  InfusionActionMode,
  LazyNftCardInfo,
  LoadingDataWithError,
  WidgetRendererProps,
} from '@dao-dao/types'
import { MsgExecuteContract } from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/tx'
import {
  CHAIN_GAS_MULTIPLIER,
  combineLoadingDataWithErrors,
  isValidBech32Address,
  makeCombineQueryResultsIntoLoadingDataWithError,
  makeValidateAddress,
  processError,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { ManageInfusionsData } from '../../../actions/core/actions'
import { EntityDisplay } from '../../../components'
import { useAwaitNextBlock } from '../../../hooks'
import { useWallet } from '../../../hooks/useWallet'
import { InfusionWidgetData } from './types'

const useInfusionContract = (
  queryClient: QueryClient,
  chainId: string,
  infusionMinter: string,
  infusionId: string
) => {
  return useQueries({
    queries: [
      cwInfuserExtraQueries.infusionById(queryClient, {
        chainId: chainId,
        address: infusionMinter,
        id: parseInt(infusionId),
      }),
    ],
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      transform: (infos) => infos.flat(),
    }),
  })
}

export const InfusionsRenderer =
  ({}: WidgetRendererProps<InfusionWidgetData>) => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    const { chainId, bech32Prefix } = useChain()
    const {
      address: walletAddress = '',
      getSigningClient,
      isWalletConnected,
    } = useWallet()
    const awaitNextBlock = useAwaitNextBlock()

    const formMethods = useForm<ManageInfusionsData>({
      defaultValues: {
        mode: InfusionActionMode.Infuse,
        infuse: {
          infusionBundles: [],
        },
      },
    })

    const {
      watch,
      control,
      register,
      setValue,
      handleSubmit,
      formState: { errors },
    } = formMethods

    const mode = watch('mode' as 'mode')
    const watchChainId =
      mode === 'create'
        ? watch('create.chainId' as 'create.chainId')
        : watch('infuse.chainId' as 'infuse.chainId')
    const watchInfusionMinter =
      mode === 'create'
        ? watch('create.infusionMinter' as 'create.infusionMinter')
        : watch('infuse.infusionMinter' as 'infuse.infusionMinter')
    const watchInfusionId = watch('infuse.infusionId' as 'infuse.infusionId')
    const watchInfusionBundles = watch(
      'infuse.infusionBundles' as 'infuse.infusionBundles'
    )
    const watchInfusionFunds = watch('infuse.funds' as 'infuse.funds')

    const infusionInfoLDWE = useInfusionContract(
      queryClient,
      chainId,
      watchInfusionMinter,
      watchInfusionId
    )
    const infusionInfo =
      !infusionInfoLDWE.errored && !infusionInfoLDWE.loading
        ? infusionInfoLDWE.data
        : []

    // set to default chain and  infusion minter
    useEffect(() => {
      setTimeout(() => {
        setValue('mode' as 'mode', InfusionActionMode.Infuse)
        setValue('infuse.chainId' as 'infuse.chainId', 'stargaze-1')
        setValue(
          'infuse.infusionMinter' as 'infuse.infusionMinter',
          'stars1zkdqlly53sdafh6dhcpuapxxc3llxyqw4v9ekk9x553mc4mv0xlqkyvg3l'
        )
        setValue('infuse.infusionId' as 'infuse.infusionId', '1')
      }, 0)
    }, [])

    // gets the nfts info for the selected nft.
    const selectedNftInfos = useQueries({
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

    // gets the nfts owned by wallet or dao
    const nftOptions = useCachedLoadingWithError(
      walletLazyNftCardInfosSelector({
        walletAddress: walletAddress,
        chainId: chainId,
      })
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
      !allChainOptions.errored && !allChainOptions.loading
        ? {
            loading: false,
            errored: false,
            data: allChainOptions.data.filter((nft) =>
              infusionInfo.some((infusion) =>
                infusion.eligibleCollections.some(
                  (collection) => collection.addr == nft.collectionAddress
                )
              )
            ),
          }
        : allChainOptions
    // call infusion contract
    const onInfuseNfts = async () => {
      if (!isWalletConnected || !walletAddress) {
        toast.error(t('error.logInToContinue'))
        return
      }

      // setStakingLoading(true)
      const approveNftsMsgs = watchInfusionBundles.flatMap((ib) => {
        return ib.nfts.map((bnfts) => {
          return {
            chainId,
            sender: walletAddress,
            contractAddress: bnfts.addr,
            msg: {
              approve: {
                token_id: bnfts.token_id.toString(),
                spender: watchInfusionMinter,
                //todo: add expiration
              },
            },
          }
        })
      })

      console.log('DEBUG APPROVE MSG:', approveNftsMsgs)
      console.log('DEBUG watchInfusionFunds:', watchInfusionFunds)

      infusionInfo &&
        setValue('infuse.funds' as 'infuse.funds', [
          {
            denom:
              infusionInfo[0].infusionParamsGeneric.mintFeeGeneric?.token
                .denomOrAddress!,
            amount:
              infusionInfo[0].infusionParamsGeneric.mintFeeGeneric?.balance!,
            decimals:
              infusionInfo[0].infusionParamsGeneric.mintFeeGeneric?.token
                .decimals!,
          },
        ])
      try {
        await (
          await getSigningClient()
        ).signAndBroadcast(
          walletAddress,
          [
            // Approve NFTS
            ...approveNftsMsgs.map((msg) => ({
              typeUrl: MsgExecuteContract.typeUrl,
              value: MsgExecuteContract.fromPartial({
                sender: msg.sender,
                contract: msg.contractAddress,
                msg: toUtf8(JSON.stringify(msg.msg)),
                funds: [],
              }),
            })),
            // Prepare
            {
              typeUrl: MsgExecuteContract.typeUrl,
              value: MsgExecuteContract.fromPartial({
                sender: walletAddress,
                contract: watchInfusionMinter,
                msg: toUtf8(
                  JSON.stringify({
                    infuse: {
                      infusion_id: watchInfusionId,
                      bundle:
                        watchInfusionBundles.length == 0
                          ? [{ nfts: [] }]
                          : watchInfusionBundles,
                    },
                  })
                ),
                funds: watchInfusionFunds
                  .map(({ denom, amount, decimals }) =>
                    HugeDecimal.fromHumanReadable(amount, 0).toCoin(denom)
                  )
                  // Neutron errors with `invalid coins` if the funds list is not
                  // alphabetized.
                  .sort((a, b) => a.denom.localeCompare(b.denom)),
              }),
            },
          ],
          CHAIN_GAS_MULTIPLIER
        )

        // New balances will not appear until the next block.
        await awaitNextBlock()

        toast.success(
          t('success.infusedBundle', {
            amount: watchInfusionBundles.length,
          })
        )
        // setStakeTokenIds([])

        // Close once done.
        // onClose()
      } catch (err) {
        console.error(err)
        toast.error(processError(err))
      } finally {
        // setStakingLoading(false)
      }
    }

    useEffect(() => {
      console.log('DEBUG: watchChainId:', watchChainId)
      console.log('DEBUG: watchInfusionBundles:', watchInfusionBundles)
    }, [selectedNftInfos])

    return (
      <FormProvider {...formMethods}>
        <ChainProvider chainId={watchChainId}>
          <div className="flex grow flex-col gap-4">
            <DaoSupportedChainPickerInput
              // disabled={!isCreating}
              fieldName={'infuse.chainId'}
              onChange={(chainId) => {
                // Reset when switching chain.
                setValue('infuse.chainId', chainId)
              }}
            />
            <div className="flex flex-col gap-1">
              <p className="primary-text mb-3">
                {t('form.selectInfusionMinter')}
              </p>
              <div className="flex min-w-0 flex-col flex-wrap gap-x-3 gap-y-2 sm:flex-row sm:items-stretch">
                <AddressInput
                  defaultValue={watchInfusionMinter}
                  fieldName={'infuse.infusionMinter' as 'infuse.infusionMinter'}
                  register={register}
                  validation={[
                    validateRequired,
                    // If executing smart contract, ensure recipient is smart
                    // contract.
                    // (executeSmartContract
                    //     ? makeValidateAddress
                    //     : makeValidateAddress)(chain.bech32_prefix),
                    makeValidateAddress(bech32Prefix),
                  ]}
                />

                {isValidBech32Address(watchInfusionMinter) ? (
                  <>
                    <NumericInput
                      defaultValue={watchInfusionId}
                      fieldName={'infuse.infusionId' as 'infuse.infusionId'}
                      min={0}
                      numericValue
                      register={register}
                      sizing="sm"
                      step={1}
                      validation={[validateRequired, validatePositive]}
                    />
                    <p className="primary-text mb-3">
                      {t('form.selectInfusionId')}
                    </p>
                  </>
                ) : null}
              </div>

              {infusionInfo.length != 0
                ? infusionInfo.map((ii, index) => {
                    return (
                      <HorizontalInfusionCard
                        {...ii}
                        EntityDisplay={EntityDisplay}
                        chainId={chainId}
                        currentEntity={walletAddress}
                        entityEligibleNFTs={availableToInfuse}
                        fieldNamePrefix={'infuse.'}
                        isCreating={true}
                        isProposalAction={false}
                        selectedNfts={selectedNftInfos}
                      />
                    )
                  })
                : null}
            </div>
            <Button
              className="self-start"
              onClick={onInfuseNfts}
              size="lg"
              variant="brand"
            >
              {t('button.infuseNfts')}
            </Button>
          </div>
        </ChainProvider>
      </FormProvider>
    )
  }
