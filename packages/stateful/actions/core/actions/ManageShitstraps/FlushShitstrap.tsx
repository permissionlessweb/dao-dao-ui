import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useRecoilCallback } from 'recoil'

import { shitStrapQueries } from '@dao-dao/state/query'
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
import {
  ActionComponent,
  ActionContextType,
  GenericTokenBalanceWithOwner,
} from '@dao-dao/types'
import { Config as ShitstrapConfig } from '@dao-dao/types/ShitStrap'
import {
  getChainAddressForActionOptions,
  getChainForChainId,
  makeValidateAddress,
  processError,
  validateRequired,
} from '@dao-dao/utils'

import { ShitstrapPaymentWidgetData } from '../../../../widgets/widgets/Shitstrap/types'

export type FlushShitstrapData = {
  chainId: string
  shitstrapAddress: string
  owner: string
}

// query and filter all shitstraps owned by entity that are full
//if none, display input for shitstrap contract address
export type FlushShitstrapOptions = {
  widgetData: ShitstrapPaymentWidgetData | undefined
  tokens: GenericTokenBalanceWithOwner[]
}

export const FlushShitstrap: ActionComponent<FlushShitstrapOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  addAction,
  remove,
  index: actionIndex,
  allActionsWithData,
  options: { widgetData },
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
  } = useFormContext()
  // const estimatedToken = eligibleAsset ? (HugeDecimal.from(eligibleAsset.shit_rate ?? 1).div(HugeDecimal.from(10).pow(6)).toNumber()) * parseInt(watchAmountToSendToShit) : 1;
  const [usingCustomShitstrap, useCustomShitstrap] = useState(false)
  const [contractChosen, setChoossetContractChosen] = useState(false)
  const [chooseLoading, setChooseLoading] = useState(false)
  const [shitstrapInfo, setShitstrapInfo] = useState<ShitstrapConfig>()

  const watchShitstrapAddress: string | undefined = watch(
    (fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress'
  )

  const watchChainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const currentChain = getChainForChainId(watchChainId)
  const chainAddressOwner = getChainAddressForActionOptions(
    actionOptions,
    watchChainId
  )
  const shitstrapFactoryExists = !!widgetData?.factories?.[watchChainId]

  // handle loading and affirm shitstrap contract
  const onChooseExistingContract = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        setChooseLoading(true)
        try {
          console.log('watchShitstrapAddress', watchShitstrapAddress)
          clearErrors(
            (fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress'
          )
          // Manually validate the contract address.
          const valid = await trigger(
            (fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress'
          )
          console.log('valid:', valid)
          if (!valid) {
            return
          }
          // Should never happen due to validation above; just typecheck.
          if (!watchShitstrapAddress) {
            throw new Error(t('error.loadingData'))
          }
          setChoossetContractChosen(true)
          const info = await queryClient.fetchQuery(
            shitStrapQueries.config(queryClient, {
              chainId: watchChainId,
              contractAddress: watchShitstrapAddress!,
            })
          )
          if (typeof info.full_of_shit !== 'boolean') {
            throw new Error(t('error.notAShitstrapAddress'))
          }
          console.log('all good!')
          console.log('info:', info)

          setShitstrapInfo(info as ShitstrapConfig | undefined)
        } catch (err) {
          console.error(err)
          setError(
            (fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress',
            {
              type: 'custom',
              message:
                err instanceof Error ? err.message : `${processError(err)}`,
            }
          )
          return
        } finally {
          setChooseLoading(false)
        }
      },
    [setChooseLoading]
  )

  // Grabs all shitstraps created from the factory saved in daos widget item
  return (
    <ChainProvider chainId={watchChainId}>
      <p className="max-w-prose">{t('info.shitstrapFlushDescription')}</p>
      {actionOptions.context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          disabled={!isCreating}
          fieldName={fieldNamePrefix + 'chainId'}
          onChange={(chainId) => {
            // Reset when switching chain.
            setValue((fieldNamePrefix + 'cutoff') as 'cutoff', '')
            setValue((fieldNamePrefix + 'chainId') as 'chainId', chainId)
            setValue((fieldNamePrefix + 'possibleShit') as 'possibleShit', [])
            setValue(
              (fieldNamePrefix +
                'ownerEntity.address') as 'ownerEntity.address',
              chainAddressOwner ? chainAddressOwner : ''
            )
          }}
        />
      )}
      <div className="flex flex-row flex-wrap items-center gap-2">
        <div className="flex shrink-0 flex-col gap-1">
          <div className="flex flex-row items-end justify-between gap-2">
            <InputLabel name={t('form.inputShitstrapFlush')} />
          </div>
        </div>
      </div>
      {/* Shitstrap factories exist on chain, display button to select shitstraps */}
      {shitstrapFactoryExists && (
        <div className="flex flex-row gap-3 items-center">
          {!usingCustomShitstrap ? (
            <>
              {/* <ShitstrapPicker !shitstrapInfosLoading.errored && !shitstrapInfosLoading.loading ? 
                        onSelect={(shitstrapContractAddr) =>
                          setValue(
                            (fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress',
                            shitstrapContractAddr
                          )
                        }
                        readOnly={!isCreating}
                        selectedAddress={watchShitstrapAddress}
                        shitstraps={shitstrapInfosLoading.data}
                      /> */}
            </>
          ) : (
            <>
              <div className="flex flex-row gap-1">
                <AddressInput
                  error={errors?.collectionAddress}
                  fieldName={
                    (fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress'
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
            onClick={onChooseExistingContract}
            size="lg"
          >
            {t('button.continue')}
          </Button>
          <FormSwitch
            fieldName={`none`}
            onToggle={useCustomShitstrap}
            setValue={setValue}
            sizing="md"
            value={usingCustomShitstrap}
          />

          <InputLabel name={t('title.customShitstrapAddress')} title />

          <InputErrorMessage error={errors?.collectionAddress} />
        </div>
      )}

      {/* No shitstrap factories exist */}
    </ChainProvider>
  )
}
