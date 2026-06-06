import { useQueries } from '@tanstack/react-query'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useRecoilCallback } from 'recoil'

import {
  AddressInput,
  Button,
  ChainProvider,
  DaoSupportedChainPickerInput,
  FormSwitch,
  InputErrorMessage,
  InputLabel,
  useActionOptions,
} from '@dao-dao/stateless'
import { ActionComponent, ActionContextType } from '@dao-dao/types'
import {
  getChainForChainId,
  makeCombineQueryResultsIntoLoadingDataWithError,
  makeValidateAddress,
  processError,
  validateRequired,
} from '@dao-dao/utils'

import { ClaimHeadstashModal } from '../../../../modules/modules/Headstash/components/ClaimHeadstashModal'
import { HeadstashPicker } from '../../../../modules/modules/Headstash/components/HeadstashPicker'
import { headstashQueries } from './queries'
import { ClaimHeadstashModalProps, HeadstashConfig } from './types'
import { useWallet } from '../../../../hooks'
import { ClaimHeadstashActionData, ClaimHeadstashOptions } from '../../../../modules/modules/Headstash/HeadstashRenderer'



export const ClaimHeadstashComponent: ActionComponent<
  ClaimHeadstashOptions
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  addAction,
  remove,
  index: actionIndex,
  allActionsWithData,
  options: { headstashAddr },
}) => {
    const { t } = useTranslation()
    const actionOptions = useActionOptions()
    const queryClient = actionOptions.queryClient
    const {
      control,
      register,
      watch,
      getValues,
      resetField,
      setValue,
      setError,
      clearErrors,
      trigger,
    } = useFormContext<ClaimHeadstashActionData>()



    const [headstashInstance, setHeadstashInstancce] = useState<HeadstashConfig>()
    const [contractChosen, setChooseContractChosen] = useState(false)
    const [chooseLoading, setChooseLoading] = useState(false)

    const {
      context,
      chainContext,
      chain: { chainId: nativeChainId },
    } = actionOptions

    const {
      isWalletConnected,
      chainWallet,
      connect,
      address: currentWallet,
    } = useWallet()


    const watchChainId = watch((fieldNamePrefix + 'homeChainId') as 'homeChainId')

    const watchUsingCustomHeadstash = watch(
      (fieldNamePrefix + 'usingCustomHeadstash') as 'usingCustomHeadstash'
    )
    const watchEligibleAddr = watch(
      (fieldNamePrefix + 'eligibleAddr') as 'eligibleAddr'
    )
    const watchSelectedHeadstashOwner = watch(
      (fieldNamePrefix + 'headstashOwner') as 'headstashOwner'
    )

    const [claimHeadstashModalProps, setClaimHeadstashModalProps] =
      useState<
        Pick<ClaimHeadstashModalProps, 'uniqueId' | 'chainId' | 'transaction'>
      >()



    const chainWalletList = chainWallet?.mainWallet?.getChainWalletList(false)
    const currentChainWallet = chainWalletList?.find(
      (cw) => cw.chainId === watchChainId
    )


    // Fetch infos individually so they refresh when data is updated elsewhere.
    const headstashInfoLoading = useQueries({
      queries: [
        headstashQueries.headstashesByOwner(queryClient, {
          daoAddress: watchSelectedHeadstashOwner
            ? watchSelectedHeadstashOwner
            : actionOptions.address,
        }),
      ],
      combine: makeCombineQueryResultsIntoLoadingDataWithError({
        firstLoad: 'one',
        // transform: (infos) =>
        //   uniqBy(
        //     infos,
        //     (info) => info.chainId + ':' + info.shitstrapContractAddr
        //   ),
      }),
    })

    // handle loading and affirm shitstrap contract
    // const onChooseExistingHeadstash = useRecoilCallback(
    //   ({ snapshot }) =>
    //     async () => {
    //       setChooseLoading(true)
    //       try {
    //         console.log('watchHeadstashContractAddr', watchHeadstashContractAddr)
    //         clearErrors(
    //           (fieldNamePrefix +
    //             'headstashContractAddr') as 'headstashContractAddr'
    //         )
    //         // // Manually validate the contract address.
    //         const valid = await trigger(
    //           (fieldNamePrefix +
    //             'headstashContractAddr') as 'headstashContractAddr'
    //         )
    //         console.log('valid:', valid)
    //         if (!valid) {
    //           return
    //         }
    //         // Should never happen due to validation above; just typecheck.
    //         if (!watchHeadstashContractAddr) {
    //           throw new Error(t('error.loadingData'))
    //         }
    //         setChooseContractChosen(true)

    //         const headstashInfo = await queryClient.fetchQuery(
    //           headstashQueries.headstashConfig(queryClient, {
    //             // chainId: watchChainId,
    //             contractAddress: watchHeadstashContractAddr!,
    //           })
    //         )
    //         if (typeof headstashInfo?.config.multiplier !== 'boolean') {
    //           throw new Error(t('error.notAHeadstashAddress'))
    //         }
    //         console.log('all good!')
    //         const hsInstance: HeadstashConfig = headstashInfo.config
    //         console.log('hsInstance:', hsInstance)
    //         setHeadstashInstancce(hsInstance)
    //       } catch (err) {
    //         console.error(err)
    //         setError('headstashContractAddr', {
    //           type: 'custom',
    //           message:
    //             err instanceof Error ? err.message : `${processError(err)}`,
    //         })
    //         return
    //       } finally {
    //         // setChooseLoading(false)
    //       }
    //     },
    //   [
    //     // setChooseLoading,
    //   ]
    // )

    return (
      <ChainProvider chainId={watchChainId}>
        <p className="max-w-prose">{t('info.claimHeadstashDescription')}</p>
        {actionOptions.context.type === ActionContextType.Dao && (
          <></>
        )}



        {/* {shitstrapFactoryExists && ( */}
        <div className="flex flex-row gap-3 items-center">
          {!headstashInfoLoading.loading &&
            !headstashInfoLoading.errored ?
            (
              <></>
            ) : (
              <>
                {/* Input to search for headstash contracts directly, or by admin of headstash contract */}
                <div className="flex flex-row items-center gap-x-4">
                  {context.type === ActionContextType.Dao && (
                    <DaoSupportedChainPickerInput
                      disabled={!isCreating}
                      fieldName={fieldNamePrefix + 'homeChainId'}
                      onChange={(chainId) => {
                        // Reset when switching chain.
                        setValue((fieldNamePrefix + 'homeChainId') as 'homeChainId', chainId)

                      }}
                    />
                  )}
                </div>
              </>
            )}


          {/* modal to display when selecting headstash to claim */}
          <ClaimHeadstashModal
            chainId={watchChainId}
            crossChainPackets={[]}
            throwawayWallet={null}
            transaction={{
              type: 'execute',
              msgs: [],
            }}
            uniqueId=""
            visible={!!claimHeadstashModalProps}
            {...claimHeadstashModalProps}
            onClose={() => setClaimHeadstashModalProps(undefined)}
            onSuccess={
              () => { }
              // onProposalUpdateFallback(
              //   {
              //     status: ProposalStatusEnum.Executed,
              //     proposalId: proposalInfo.id,
              //   },
              //   // Force call the fallback, and don't wait for a block to pass.
              //   {
              //     onlyIfNotListening: false,
              //     skipWait: true,
              //   }
              // )
            }
          />
        </div>
        {/* )} */}

        {/* No shitstrap factories exist */}
      </ChainProvider>
    )
  }
