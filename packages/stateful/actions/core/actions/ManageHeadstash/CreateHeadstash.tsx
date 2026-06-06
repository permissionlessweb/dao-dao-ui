import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useRecoilCallback } from 'recoil'

import {
  ChainProvider,
  DaoSupportedChainPickerInput,
  useActionOptions,
} from '@dao-dao/stateless'
import { ActionComponent, ActionContextType } from '@dao-dao/types'
import { CreateHeadstashActionData, CreateHeadstashOptions } from '../../../../modules/modules/Headstash/HeadstashRenderer'


export const CreateHeadstashComponent: ActionComponent<
  CreateHeadstashOptions
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  addAction,
  remove,
  index: actionIndex,
  allActionsWithData,
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
    } = useFormContext<CreateHeadstashActionData>()

    const watchChainId = watch((fieldNamePrefix + 'homeChainId') as 'homeChainId')

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
            // setError(
            //     (fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress',
            //     {
            //         type: 'custom',
            //         message:
            //             err instanceof Error ? err.message : `${processError(err)}`,
            //     }
            // )
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
      <ChainProvider chainId={watchChainId}>
        <p className="max-w-prose">{t('info.createHeadstashDescription')}</p>
        {actionOptions.context.type === ActionContextType.Dao && (
          // todo: first display all headstashes dao has created if present
          // todo: display modal to search for all headstashes connected entity is eliglibe for
          <DaoSupportedChainPickerInput
            disabled={!isCreating}
            fieldName={fieldNamePrefix + 'chainId'}
            onChange={(chainId) => {
              // Reset when switching chain.
              setValue(
                (fieldNamePrefix + 'homeChainId') as 'homeChainId',
                chainId
              )

            }}
          />
        )}


      </ChainProvider>
    )
  }
