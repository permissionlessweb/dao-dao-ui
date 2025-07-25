import { toUtf8 } from '@cosmjs/encoding'
import { QueryClient, useQueries, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  cwInfuserExtraQueries,
  lazyNftCardInfosForDaoSelector,
  nftQueries,
  walletLazyNftCardInfosSelector,
} from '@dao-dao/state'
import {
  AddressInput,
  Button,
  ChainProvider,
  DaoSupportedChainPickerInput,

  InputLabel,

  NumericInput,
  RawActionsRenderer,
  RawActionsRendererMessages,
  useActionOptions,
  useCachedLoading,
  useCachedLoadingWithError,
  useChain,
  useDao,
} from '@dao-dao/stateless'
import {
  ActionContextType,
  InfusionActionMode,
  LazyNftCardInfo,
  LoadingDataWithError,
  ModuleRendererProps,
} from '@dao-dao/types'
import { MsgExecuteContract } from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/tx'
import {
  CHAIN_GAS_MULTIPLIER,
  combineLoadingDataWithErrors,
  getChainForChainId,
  isValidBech32Address,
  makeCombineQueryResultsIntoLoadingDataWithError,
  makeValidateAddress,
  processError,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { EntityDisplay } from '../../../components'
import { useAwaitNextBlock } from '../../../hooks'
import { useWallet } from '../../../hooks/useWallet'
import { InfusionWidgetData } from './types'
import { HorizontalInfusionCard } from './components/stateless/HorizontalInfusionCard'
import { Bundle, InfusedCollection, InfusionParams, NFTCollection } from '@dao-dao/types/contracts/CwInfuser'
import { NewProposalPreview } from '../../../proposal-module-adapter/adapters/DaoProposalSingle/common/components/NewProposalPreview'
import { useActionEncodeContext } from '../../../actions'
import json5 from 'json5'
import { ArrowLeftOutlined, ArrowRightOutlined, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRightOutlined } from '@mui/icons-material'
import { WalletStatus } from '@cosmos-kit/core'
// import { infusionsSelecta } from './components/state/infusionSelecta'


export enum InfusionBundleType {
  AllOf = 'allOf',
  AnyOf = 'anyOf',
  AnyOfBlend = 'anyOfBlend',
}


// data coming from action tabs content
export type ManageInfusionsData = {
  module_msg: string
  chainId: string
  mode: InfusionActionMode
  create: CreateInfusionData
  infuse: InfuseNftsData
}

export type CreateInfusionData = {
  chainId: string
  description: string
  infusionMinter: string //todo: replace for widget
  collections: NFTCollection[]
  infusedCollection: InfusedCollection
  infusionParams: InfusionParams
  paymentRecipient: string
  owner?: string
  deposit: {
    amount: string
    denom: string
    decimal?: string,
  }[]
  mode: InfusionBundleType
}

export type InfuseNftsData = {
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
    decimals?: number
  }[]
}

/**
 * Get infusion config
 */
const getInfusionConfig = (
  queryClient: QueryClient,
  chainId: string,
  infuserAddr: string
) => {
  const infusionConfig = cwInfuserExtraQueries.config(queryClient, {
    chainId: chainId,
    address: infuserAddr,
  })
  return infusionConfig
}

export enum BroadcastInfusion {
  Idle = 'idle',
  Prepare = 'prepare',
  Confirm = 'confirm',
}


// // grabs the infusion config from the infusion minter defined in form
const useInfusionConfigFromForm = (
  queryClient: QueryClient,
  chainId: string,
  infusionMinter: string
) => {
  return useQueries({
    queries: [getInfusionConfig(queryClient, chainId, infusionMinter)],
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      transform: (infos) => infos.flat(),
    }),
  })
}


// const useInfusionContract = (
//   queryClient: QueryClient,
//   chainId: string,
//   infusionMinter: string,
//   infusionId: string
// ) => {
//   return useQueries({
//     queries: [
//       cwInfuserExtraQueries.infusionById(queryClient, {
//         chainId: chainId,
//         address: infusionMinter,
//         id: parseInt(infusionId),
//       }),
//     ],
//     combine: makeCombineQueryResultsIntoLoadingDataWithError({
//       transform: (infos) => infos.flat(),
//     }),
//   })
// }

const useInfusionContractFromForm = (
  queryClient: QueryClient,
  chainId: string,
  infusionMinter: string,
  infusionId: string
) => {
  return useQueries({
    queries: [
      getInfusionById(
        queryClient,
        chainId,
        infusionMinter,
        parseInt(infusionId)
      ),
    ],
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      transform: (infos) => infos.flat(),
    }),
  })
}

const getInfusionById = (
  queryClient: QueryClient,
  chainId: string,
  address: string,
  id: number
) => {
  const infusionInfo = cwInfuserExtraQueries.infusionById(queryClient, {
    chainId,
    address,
    id,
  })
  return infusionInfo
}



export const InfusionsRenderer =
  (props: ModuleRendererProps<InfusionWidgetData>) => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()

    const awaitNextBlock = useAwaitNextBlock()
    const dao = useDao()

    // const {
    //   address,
    //   chain: { chainId: nativeChainId },
    // } = useActionOptions()
    // let encodeContext = useActionEncodeContext()

    const formMethods = useForm<ManageInfusionsData>({
      defaultValues: {
        mode: InfusionActionMode.Infuse,
        chainId: 'stargaze-1',
        infuse: {
          funds: [],
          chainId: 'stargaze-1',
          infusionMinter: 'stars16k2ewvfapjdsnncdk2snv9wj3f8vg3j82sfq962906rdx3n67kns22fsvh',
          infusionId: '1',
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
    const watchChainId = mode === 'create'
      ? watch('create.chainId' as 'create.chainId')
      : watch('infuse.chainId' as 'infuse.chainId')
    const watchInfusionMinter =
      mode === 'create'
        ? watch('create.infusionMinter' as 'create.infusionMinter')
        : watch('infuse.infusionMinter' as 'infuse.infusionMinter')
    const watchInfusionId = watch('infuse.infusionId' as 'infuse.infusionId')
    const watchInfusionBundles = watch('infuse.infusionBundles' as 'infuse.infusionBundles')
    const watchInfusionFunds = watch('infuse.funds' as 'infuse.funds')

    const infusionInfoLDWE = useInfusionContractFromForm(
      queryClient,
      watchChainId,
      watchInfusionMinter,
      watchInfusionId
    )
    const infusionConfigLDWE = useInfusionConfigFromForm(
      queryClient,
      watchChainId,
      watchInfusionMinter,
    )
    const infusionInfo =
      !infusionInfoLDWE.errored && !infusionInfoLDWE.loading
        ? infusionInfoLDWE.data
        : []
    const infusionConfig =
      !infusionConfigLDWE.errored && !infusionConfigLDWE.loading
        ? infusionConfigLDWE.data
        : undefined



    const currentChain = getChainForChainId(watchChainId)

    const {
      address: walletAddress,
      getSigningClient,
      isWalletConnected,
      disconnect,
      connect,
      status,
    } = useWallet({ chainId: watchChainId })


    // gets the nfts owned by wallet or dao
    // Only query NFTs when wallet is fully connected and address is available
    const nftOptions = useCachedLoadingWithError(
      status === WalletStatus.Connected && walletAddress
        ? walletLazyNftCardInfosSelector({
          walletAddress,
          chainId: watchChainId,
        })
        : undefined
    );

    // Combine NFT data from all chains
    const allChainOptions: LoadingDataWithError<LazyNftCardInfo[]> =
      nftOptions.loading || nftOptions.errored
        ? nftOptions
        : combineLoadingDataWithErrors(
          ...Object.values(nftOptions.data).filter(
            (data): data is LoadingDataWithError<LazyNftCardInfo[]> => !!data
          )
        );

    // Filter NFTs by infusion eligibility
    const availableToInfuse: LoadingDataWithError<LazyNftCardInfo[]> =
      !allChainOptions.errored &&
        !allChainOptions.loading &&
        infusionInfo &&
        status === WalletStatus.Connected &&
        walletAddress
        ? {
          loading: false,
          errored: false,
          data: allChainOptions.data.filter((nft) =>
            infusionInfo.some((infusion) =>
              infusion.eligibleCollections.some(
                (collection) => collection.addr === nft.collectionAddress
              )
            )
          ),
        }
        : allChainOptions;


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

    // useEffect(() => {
    //   console.log('walletAddress:', walletAddress)
    //   console.log('isWalletConnected:', isWalletConnected)
    //   console.log('address:', address)
    //   console.log('nftOptions:', nftOptions)
    //   console.log('allChainOptions:', allChainOptions)
    //   console.log('selectedNftInfos:', selectedNftInfos)
    // }, [selectedNftInfos, allChainOptions])


    // useEffect(() => {
    //   infusionInfo[0].infusionParamsGeneric.mintFeeGeneric
    //   // if static mint fee, set it any time we render new infusion
    //   // if bundle type 
    // }, [infusionInfo, infusionInfo[0].infusionParamsGeneric.mintFeeGeneric])


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
            chainId: watchChainId,
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


      let funds = Array.from(
        watchInfusionFunds
          .map(({ denom, amount }) =>
            HugeDecimal.fromHumanReadable(amount, 0).toCoin(denom)
          )
          .reduce((map, coin) => {
            const existing = map.get(coin.denom);
            if (existing) {
              map.set(coin.denom, {
                ...existing,
                amount: HugeDecimal.from(existing.amount).plus(coin.amount)
              });
            } else {
              map.set(coin.denom, coin);
            }
            return map;
          }, new Map())
          .values()
      ).sort((a, b) => a.denom.localeCompare(b.denom));

      // if generic fee and funds dont have them, set
      if (infusionInfo[0].infusionParamsGeneric.mintFeeGeneric) {
        const genericFee = infusionInfo[0].infusionParamsGeneric.mintFeeGeneric;
        const requiredAmount = HugeDecimal.fromHumanReadable(genericFee.balance, 0);

        // Check if this denom already exists in funds
        const existingFund = funds.find(fund => fund.denom === genericFee.token.denomOrAddress);

        if (!existingFund) {
          // Add the generic fee to funds and re-sort
          funds.push(requiredAmount.toCoin(genericFee.token.denomOrAddress));
          funds.sort((a, b) => a.denom.localeCompare(b.denom));
        } else {
          // ensure at least the minimum exists
          const currentAmount = HugeDecimal.from(existingFund.amount);
          if (currentAmount.lt(requiredAmount)) {
            existingFund.amount = requiredAmount.toString();
          }
        }
      }



      let msg = [
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
        // Infuse Bundles
        {
          typeUrl: MsgExecuteContract.typeUrl,
          value: MsgExecuteContract.fromPartial({
            sender: walletAddress,
            contract: watchInfusionMinter,
            msg: toUtf8(
              JSON.stringify({
                infuse: {
                  id: watchInfusionId,
                  bundle:
                    watchInfusionBundles.length == 0
                      ? [{ nfts: [] }]
                      : watchInfusionBundles,
                },
              })
            ),
            funds,
          }),
        },
      ];
      console.log("msg", json5.stringify(msg))
      try {
        await (
          await getSigningClient()
        ).signAndBroadcast(
          walletAddress,
          msg,
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

    // Reset query when wallet disconnects
    useEffect(() => {
      if (status === WalletStatus.Disconnected || status === WalletStatus.Error) {
        // Optionally reset Recoil state or clear cache here if needed
        // resetRecoilState(walletLazyNftCardInfosSelector);
      }
    }, [status]);
    // useEffect(() => {
    //   console.log('DEBUG: watchChainId:', watchChainId)
    //   console.log('DEBUG: watchInfusionBundles:', watchInfusionBundles)
    // }, [selectedNftInfos])

    return (
      <FormProvider {...formMethods}>
        <ChainProvider chainId={watchChainId}>
          <div className="flex grow flex-col gap-2">
            <DaoSupportedChainPickerInput
              fieldName={'infuse.chainId'}
              onlyDaoChainIds={true}
              onChange={(chainId) => {
                setValue('infuse.chainId', chainId)
              }}
            />

            <div className="flex flex-col gap-1">
              <InputLabel name={t('form.selectInfusionMinter')} />
              <div className="flex min-w-0 flex-col flex-wrap gap-x-3 gap-y-2 sm:flex-row sm:items-stretch">
                <AddressInput
                  defaultValue={watchInfusionMinter}
                  fieldName={'infuse.infusionMinter' as 'infuse.infusionMinter'}
                  register={register}
                  validation={[
                    validateRequired,
                    makeValidateAddress(currentChain.bech32Prefix),
                  ]}
                />

              </div>
              {isValidBech32Address(watchInfusionMinter) && infusionConfig && (
                <div className="relative my-2">
                  <p className="primary-text mb-3 text-center">
                    {t('form.selectInfusionId')}
                  </p>

                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {/* First/Previous Buttons */}
                    <div className="flex space-x-1">
                      <Button
                        onClick={() => setValue('infuse.infusionId', '1')}
                        disabled={Number(watchInfusionId) <= 1}
                        className="sacred-hexagon-button disabled:opacity-30"
                      >
                        <KeyboardDoubleArrowLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => setValue('infuse.infusionId', (Number(watchInfusionId) - 1).toString())}
                        disabled={Number(watchInfusionId) <= 1}
                        className="sacred-hexagon-button disabled:opacity-30"
                      >
                        <ArrowLeftOutlined className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Current ID Display */}
                    <div className="relative sacred-geometric-container mx-2">
                      <div className="sacred-geometric-pattern"></div>
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
                    </div>

                    {/* Next/Last Buttons */}
                    <div className="flex space-x-1">
                      <Button
                        onClick={() => setValue('infuse.infusionId', (Number(watchInfusionId) + 1).toString())}
                        disabled={Number(watchInfusionId) >= infusionConfig[0].latest_infusion_id}
                        className="sacred-hexagon-button disabled:opacity-30"
                      >
                        <ArrowRightOutlined className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => setValue('infuse.infusionId', infusionConfig[0].latest_infusion_id.toString())}
                        disabled={Number(watchInfusionId) >= infusionConfig[0].latest_infusion_id}
                        className="sacred-hexagon-button disabled:opacity-30"
                      >
                        <KeyboardDoubleArrowRightOutlined className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>


                </div>
              )}

              {isValidBech32Address(watchInfusionMinter) && infusionConfig && (
                <>
                  {infusionInfo.length != 0
                    ? infusionInfo.map((ii, index) => {
                      return (
                        <HorizontalInfusionCard
                          {...ii}
                          EntityDisplay={EntityDisplay}
                          chainId={watchChainId}
                          currentEntity={walletAddress}
                          entityEligibleNFTs={availableToInfuse}
                          fieldNamePrefix={'infuse.'}
                          isCreating={true}
                          isProposalAction={false}
                          selectedNfts={selectedNftInfos}
                          onInfuseNft={onInfuseNfts}
                        />
                      )
                    })
                    : null}
                </>
              )}
            </div>
          </div>
        </ChainProvider>
      </FormProvider >
    )
  }
