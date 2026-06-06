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
import { ActionComponent, AvEventInstance, Entity, LoadingData } from '@dao-dao/types'
import {
  getChainForChainId,
  makeCombineQueryResultsIntoLoadingDataWithError,
  makeValidateAddress,
  processError,
  validateRequired,
} from '@dao-dao/utils'


import { CheckInDetails, RegisteringGuest } from '@dao-dao/types/contracts/CwAve'
import { QrCodeScanner } from './stateless/QRCodeScanner'


export type EventGuestActionData = {
  selectedEvent: AvEventInstance,
  ticketsToPurchase: RegisteringGuest[]
  checkingInDetails: CheckInDetails[]
}
// query and filter all events owned by entity that are full
//if none, display input for event contract address
export type EventGuestComponentOptions = {
  actionData: EventGuestActionData | undefined
  walletEntity: LoadingData<Entity>
}

export const EventGuestComponent: ActionComponent<EventGuestComponentOptions> = ({
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
  } = useFormContext()


  const watchChainId = watch((fieldNamePrefix + 'eventChainId') as 'eventChainId')



  return (
    <ChainProvider chainId={watchChainId}>
      <p className="max-w-prose">{t('info.avEventGuestDescription')}</p>

      {/* Display QR code of connected wallet */}
      {!options.walletEntity.loading ?
        <QrCodeScanner
          fieldNamePrefix={fieldNamePrefix}
          isCreating={false}
          isEventUsher={false}
          avEventInstance={options.actionData?.selectedEvent!}
          guestVerification={{
            guestWeight: 0,
            isCheckedIn: false
          }}
          currentEntity={options.walletEntity.data} />
        : null}
    </ChainProvider>

    // check if guest has already purchased ticket:
    // - no: display ticket purchase modal for event
    // - yes: display all checkin status for event segments (cwAveQueries.guestAttendanceStatusAll)
    //          - disable all event segments that have not yet started


    // checkinModal - modal displayed when checking in for any event segment.
    // functions:
    // - generate offline signature for guest 
    // components: 
    // - camera for scanning usher qr code
    // - qr code displaying checkin data for usher to scan

    // - button to display QR code scanner


  )
}
