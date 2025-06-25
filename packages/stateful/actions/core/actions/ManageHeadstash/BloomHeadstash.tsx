import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useRecoilCallback } from 'recoil'

import { ChainProvider, InputLabel, useActionOptions } from '@dao-dao/stateless'
import { ActionComponent, ActionContextType } from '@dao-dao/types'
import { processError } from '@dao-dao/utils'

export enum BloomMode {
  Registering,
  Preparing,
  Processing,
}

export type BloomHeadstashActionData = {
  headstashAddr: string
  headstashChain: string
  destinationChain: string
  bloomMode: BloomMode
  thowawayAddress: string
}

// query and filter all shitstraps owned by entity that are full
//if none, display input for shitstrap contract address
export type BloomHeadstashOptions = {
  actionData: BloomHeadstashActionData | undefined
}

export const BloomComponent: ActionComponent<BloomHeadstashOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  addAction,
  remove,
  index: actionIndex,
  allActionsWithData,
  options: { actionData },
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

  const watcHeadstashChainId = watch(
    (fieldNamePrefix + 'headstashChainId') as 'headstashChainId'
  )

  // handle loading and affirm shitstrap contract
  const onChooseExistingContract = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        //   setChooseLoading(true)
        try {
          // console.log("watchShitstrapAddress", watchShitstrapAddress)
          // clearErrors(
          //   (fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress'
          // )
          // // Manually validate the contract address.
          // const valid = await trigger(
          //   (fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress'
          // )
          // console.log("valid:", valid)
          // if (!valid) {
          //   return
          // }
          // // Should never happen due to validation above; just typecheck.
          // if (!watchShitstrapAddress) {
          //   throw new Error(t('error.loadingData'))
          // }
          // setChoossetContractChosen(true)
          // const info = await queryClient.fetchQuery(
          //   shitStrapQueries.config(queryClient, {
          //     chainId: watchChainId,
          //     contractAddress: watchShitstrapAddress!,
          //   })
          // )
          // if (typeof info.full_of_shit !== 'boolean') {
          //   throw new Error(t('error.notAShitstrapAddress'))
          // }
          // console.log('all good!')
          // console.log("info:", info)
          // setShitstrapInfo(info as ShitstrapConfig | undefined)
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
          // setChooseLoading(false)
        }
      },
    [
      // setChooseLoading,
    ]
  )

  // Grabs all shitstraps created from the factory saved in daos widget item
  return (
    <ChainProvider chainId={watcHeadstashChainId}>
      <p className="max-w-prose">{t('info.shitstrapFlushDescription')}</p>
      {actionOptions.context.type === ActionContextType.Dao && (
        // todo: first display all headstashes dao has created if present
        // todo: display modal to search for all headstashes connected entity is eliglibe for
        <></>
        // <DaoSupportedChainPickerInput
        //   disabled={!isCreating}
        //   fieldName={fieldNamePrefix + 'chainId'}
        //   onChange={(chainId) => {
        //     // Reset when switching chain.
        //     setValue((fieldNamePrefix + 'cutoff') as 'cutoff', "")
        //     setValue((fieldNamePrefix + 'chainId') as 'chainId', chainId)
        //     setValue((fieldNamePrefix + 'possibleShit') as 'possibleShit', [])
        //     setValue(
        //       (fieldNamePrefix + 'ownerEntity.address') as 'ownerEntity.address',
        //       chainAddressOwner ? chainAddressOwner : ''
        //     )
        //   }}
        // />
      )}
      <div className="flex flex-row flex-wrap items-center gap-2">
        <div className="flex shrink-0 flex-col gap-1">
          <div className="flex flex-row items-end justify-between gap-2">
            <InputLabel name={t('form.inputShitstrapFlush')} />
          </div>
        </div>
      </div>
      {/* Shitstrap factories exist on chain, display button to select shitstraps */}
      {/* {shitstrapFactoryExists && ( */}
      <div className="flex flex-row gap-3 items-center">
        {/* {!usingCustomShitstrap ? (<> */}
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

        {/* </>) : ( */}
        <>
          {/* <div className="flex flex-row gap-1">
                <AddressInput
                  error={errors?.collectionAddress}
                  fieldName={
                    (fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress'
                  }
                  register={register}
                  type="contract"
                  validation={[
                    validateRequired,
                    makeValidateAddress(getChainForChainId(watchChainId).bech32Prefix),
                  ]}
                />
              </div> */}
        </>
        {/* )} */}

        {/* <Button
              className="self-end"
              loading={chooseLoading}
              onClick={onChooseExistingContract}
              size="lg"
            >
              {t('button.continue')}
            </Button>
            <FormSwitch
              fieldName={`none`}
              setValue={setValue}
              sizing="md"
              value={usingCustomShitstrap}
              onToggle={useCustomShitstrap}
            />

            <InputLabel
              name={t('title.customShitstrapAddress')}
              title
            />

            <InputErrorMessage error={errors?.collectionAddress} /> */}
      </div>
      {/* )} */}

      {/* No shitstrap factories exist */}
    </ChainProvider>
  )
}
