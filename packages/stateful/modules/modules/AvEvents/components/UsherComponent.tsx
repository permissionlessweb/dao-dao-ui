import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useRecoilCallback } from 'recoil'

import { ChainProvider, InputLabel, useActionOptions } from '@dao-dao/stateless'
import { ActionComponent, ActionContextType } from '@dao-dao/types'
import { processError } from '@dao-dao/utils'


export type UsherComponentActionData = {
  connectedUsher: string,
}

// query and filter all avEvents owned by entity that are full
//if none, display input for avEvent contract address
export type EventUsherOptions = {
  actionData: UsherComponentActionData | undefined
}

export const UsherComponent: ActionComponent<EventUsherOptions> = ({
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

  const watcHeadstashChainId = watch((fieldNamePrefix + 'eventChainId') as 'eventChainId')

  return (
    <ChainProvider chainId={watcHeadstashChainId}>
      <p className="max-w-prose">{t('info.shitstrapFlushDescription')}</p>
      {/* {actionOptions.context.type === ActionContextType.Dao && (
  
      )} */}

      {/* QR Code Scanner */}

      {/* Scanned Guest Information:
    - guest ticket type 
    - guest arrival status for each day
    - modal to update arrival status
  */}
    </ChainProvider>
  )
}
