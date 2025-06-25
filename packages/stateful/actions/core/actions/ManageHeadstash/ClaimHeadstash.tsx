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

import { ClaimHeadstashModal } from './components/ClaimHeadstashModal'
import { HeadstashPicker } from './components/HeadstashPicker'
import { headstashQueries } from './queries'
import { ClaimHeadstashModalProps, HeadstashConfig } from './types'

export type ClaimHeadstashActionData = {
  usingCustomHeadstash: boolean
  headstashChainId: string
  headstashContractAddr: string
  eligilbeAddr: string
  eligilbeAddrSignature: string
  throwawayAddress: string
  headstashOwner?: string
}
// query and filter all shitstraps owned by entity that are full
//if none, display input for shitstrap contract address
export type ClaimHeadstashOptions = {
  actionData: ClaimHeadstashActionData | undefined
}

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
  options,
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

  const watchChainId = watch(
    (fieldNamePrefix + 'headstashChainId') as 'headstashChainId'
  )
  const watchHeadstashContractAddr = watch(
    (fieldNamePrefix + 'headstashContractAddr') as 'headstashContractAddr'
  )
  const watchUsingCustomHeadstash = watch(
    (fieldNamePrefix + 'usingCustomHeadstash') as 'usingCustomHeadstash'
  )
  const watchEligibleAddr = watch(
    (fieldNamePrefix + 'eligilbeAddr') as 'eligilbeAddr'
  )
  const watchSelectedHeadstashOwner = watch(
    (fieldNamePrefix + 'headstashOwner') as 'headstashOwner'
  )

  const [claimHeadstashModalProps, setClaimHeadstashModalProps] =
    useState<
      Pick<ClaimHeadstashModalProps, 'uniqueId' | 'chainId' | 'transaction'>
    >()

  const [usingCustomHeadstash, useCustomHeadstash] = useState(false)
  const [headstashInstance, setHeadstashInstancce] = useState<HeadstashConfig>()
  const [contractChosen, setChooseContractChosen] = useState(false)
  const [chooseLoading, setChooseLoading] = useState(false)

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
  const onChooseExistingHeadstash = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        setChooseLoading(true)
        try {
          console.log('watchHeadstashContractAddr', watchHeadstashContractAddr)
          clearErrors(
            (fieldNamePrefix +
              'headstashContractAddr') as 'headstashContractAddr'
          )
          // // Manually validate the contract address.
          const valid = await trigger(
            (fieldNamePrefix +
              'headstashContractAddr') as 'headstashContractAddr'
          )
          console.log('valid:', valid)
          if (!valid) {
            return
          }
          // Should never happen due to validation above; just typecheck.
          if (!watchHeadstashContractAddr) {
            throw new Error(t('error.loadingData'))
          }
          setChooseContractChosen(true)

          const headstashInfo = await queryClient.fetchQuery(
            headstashQueries.headstashConfig(queryClient, {
              // chainId: watchChainId,
              contractAddress: watchHeadstashContractAddr!,
            })
          )
          if (typeof headstashInfo?.config.multiplier !== 'boolean') {
            throw new Error(t('error.notAHeadstashAddress'))
          }
          console.log('all good!')
          const hsInstance: HeadstashConfig = headstashInfo.config
          console.log('hsInstance:', hsInstance)
          setHeadstashInstancce(hsInstance)
        } catch (err) {
          console.error(err)
          setError('headstashContractAddr', {
            type: 'custom',
            message:
              err instanceof Error ? err.message : `${processError(err)}`,
          })
          return
        } finally {
          // setChooseLoading(false)
        }
      },
    [
      // setChooseLoading,
    ]
  )

  return (
    <ChainProvider chainId={watchChainId}>
      <p className="max-w-prose">{t('info.claimHeadstashDescription')}</p>
      {actionOptions.context.type === ActionContextType.Dao && (
        // todo: first display all headstashes dao has created if present
        // todo: display modal to search for all headstashes connected entity is eliglibe for
        <DaoSupportedChainPickerInput
          disabled={!isCreating}
          fieldName={fieldNamePrefix + 'chainId'}
          onChange={(chainId) => {
            // Reset when switching chain.
            setValue(
              (fieldNamePrefix +
                'headstashContractAddr') as 'headstashContractAddr',
              ''
            )
            setValue(
              (fieldNamePrefix + 'headstashChainId') as 'headstashChainId',
              chainId
            )
          }}
        />
      )}
      {/* <div className="flex flex-row flex-wrap items-center gap-2">
        <div className="flex shrink-0 flex-col gap-1">
          <div className="flex flex-row items-end justify-between gap-2">
            <InputLabel name={t('form.inputShitstrapFlush')} />
          </div>

        </div>
      </div> */}
      {/* Current DAO entity is admin of headstashes, display these first*/}

      {/* {shitstrapFactoryExists && ( */}
      <div className="flex flex-row gap-3 items-center">
        {!headstashInfoLoading.loading &&
        !headstashInfoLoading.errored &&
        !usingCustomHeadstash ? (
          <>
            <HeadstashPicker
              headstashes={headstashInfoLoading.data}
              onSelect={(hsContractAddr) =>
                setValue(
                  (fieldNamePrefix +
                    'headstashContractAddr') as 'headstashContractAddr',
                  hsContractAddr
                )
              }
              readOnly={!isCreating}
              selectedAddress={watchHeadstashContractAddr}
            />
          </>
        ) : (
          <>
            {/* Input to search for headstash contracts directly, or by admin of headstash contract */}
            <div className="flex flex-row gap-1">
              <AddressInput
                error={errors?.collectionAddress}
                fieldName={
                  (fieldNamePrefix +
                    'headstashContractAddr') as 'headstashContractAddr'
                }
                register={register}
                type="contract"
                validation={[
                  validateRequired,
                  makeValidateAddress(
                    getChainForChainId(watchChainId).bech32Prefix
                  ),
                ]}
              />
            </div>
          </>
        )}

        <Button
          className="self-end"
          loading={chooseLoading}
          onClick={onChooseExistingHeadstash}
          size="lg"
        >
          {t('button.continue')}
        </Button>
        <FormSwitch
          fieldName={`usingCustomHeadstash`}
          onToggle={useCustomHeadstash}
          setValue={setValue}
          sizing="md"
          value={usingCustomHeadstash}
        />

        <InputLabel name={t('title.customShitstrapAddress')} title />

        <InputErrorMessage error={errors?.collectionAddress} />

        {/* modal to display when selecting headstash to claim */}
        <ClaimHeadstashModal
          chainId=""
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
            () => {}
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
