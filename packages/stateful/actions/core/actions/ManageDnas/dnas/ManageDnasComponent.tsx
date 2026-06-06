import { Add, WarningRounded } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  Button,
  InputLabel,
  NoContent,
  NumericInput,
  TextInput,
  Tooltip,
  useActionOptions,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  DnasObjectWithValues,
} from '@dao-dao/types'
import { processError } from '@dao-dao/utils'

import { ConnectWallet } from '../../../../../components'
import { EntityDisplay } from '../../../../../components/EntityDisplay'
import { useWallet } from '../../../../../hooks'
import { useDnas } from '../hooks'
import { DnasKeyWithValueWithoutId, PerformMergeProps } from '../types'
import { DnasLine } from './DnasLine'

export type ManageDnasActionData = {
  // managing
  fieldNamePrefix: string
  updating: boolean
  newProfile?: boolean
  dnas: DnasObjectWithValues
}

export const HandleDnasKeysRenderer: ActionComponent<ManageDnasActionData> = ({
  fieldNamePrefix,
  isCreating,
  options,
}) => {
  const { t } = useTranslation()
  const {
    address: entityAddress,
    chain: { chainId, bech32Prefix },
    queryClient,
    context: { type: actionType },
  } = useActionOptions()
  const { address: walletAddress, chain: walletChain } = useWallet()
  const { unregisterDnasKey, addDnasToDao, dnas, profile, refreshProfile } =
    useDnas()
  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ManageDnasActionData>()

  const watchNeedNewProfile = watch(
    (fieldNamePrefix + 'newProfile') as 'newProfile'
  )
  const watchDnas = watch((fieldNamePrefix + 'dnas') as 'dnas')
  const watchDnasDao = watch(
    (fieldNamePrefix + 'dnas.daoAddr') as 'dnas.daoAddr'
  )
  const watchApiKeyHash = watch(
    (fieldNamePrefix + 'dnas.keyHash') as 'dnas.keyHash'
  )
  const watchApiKeyValue = watch(
    (fieldNamePrefix + 'dnas.apiKeyValue') as 'dnas.apiKeyValue'
  )

  // Watch form fields with proper naming structure
  const watchDnasKeyValue = watch('dnas.apiKeyValue')
  const watchDnasKeyOwner = watch('dnas.keyOwner')
  const watchDnasKeyMetadata = watch('dnas.keyMetadata')
  const watchUploadLimit = watch('dnas.uploadLimit')
  const watchDnasChainId = watch('dnas.chainId')
  const watchUpdating = watch('updating')
  const walletChainId = walletChain.chainId

  // Get the setter function at the component level
  const [registerDnasKeyVisible, setRegisterDnasKeyVisible] = useState(false)

  // Initialize DAO address when component loads
  useEffect(() => {
    if (actionType === ActionContextType.Dao && entityAddress) {
      setTimeout(() => {
        setValue(
          (fieldNamePrefix + 'dnas.daoAddr') as 'dnas.daoAddr',
          entityAddress
        )
      }, 0)
    }
  }, [])

  // Improved click handler with additional logging
  const handleShowModal = () => {
    console.log('Show modal clicked, setting to true')
    setRegisterDnasKeyVisible(true)
    console.log('Modal visibility after setting:', registerDnasKeyVisible) // This might still show the old value due to React's state update timing

    // Force check state after React has processed the update
    setTimeout(() => {
      console.log('Modal visibility after timeout:', registerDnasKeyVisible)
    }, 0)
  }

  const PerformDnasKeyRegister = ({
    updatingExistingDnasKey,
    onClose,
    dnas,
  }: PerformMergeProps) => {
    // CORRECT STRUCTURE (flattened properties)
    const daosToRegisterKeysTo: DnasKeyWithValueWithoutId[] = dnas
      ? dnas.map((data) => ({
        daoAddr: data.daoAddr,
        chainId: chainId,
        keyOwner: data.keyOwner,
        type: 'jackalPin',
        keyMetadata: '{}',
        uploadLimit: data.uploadLimit,
        apiKeyValue: data.apiKeyValue ? data.apiKeyValue : '',
      }))
      : []

    return (
      <Button
        center
        className="mt-4"
        onClick={async () => {
          try {
            console.log('daosToRegisterKeysTo:', daosToRegisterKeysTo)

            // Check for required fields before submission
            const hasInvalidData = daosToRegisterKeysTo.some(
              (item) => !item.daoAddr || !item.apiKeyValue || !item.keyOwner
            )

            if (hasInvalidData) {
              toast.error(t('error.missingRequiredFields'))
              return
            }
            // call the DNAS api
            await addDnasToDao.go(daosToRegisterKeysTo)

            toast.success(t('success.addedDnasToProfile'))
            onClose()
          } catch (err) {
            console.error(err)
            toast.error(processError(err))
          }
        }}
        size="lg"
        variant="brand"
      >
        {updatingExistingDnasKey ? (
          <>
            <Add className="!h-5 !w-5" />
            {t('button.updateDnasKey')}
          </>
        ) : (
          t('button.createNewDnasProfile')
        )}
      </Button>
    )
  }

  const newDnasForm = {
    daoAddr: watchDnasDao,
    apiKeyValue: watchDnasKeyValue,
    keyMetadata: watchDnasKeyMetadata,
    keyOwner: walletAddress,
    chainId: watchDnasChainId,
    uploadLimit: watchUploadLimit || '1024',
  }
  // Set initial values when modal becomes visible or profile changes
  useEffect(() => {
    console.log('profile loaded from useDnas:', profile)
    console.log('dnas keys loaded in manage components:', dnas)
  }, [profile])

  return (
    <>
      {!walletAddress ? (
        <>
          <ConnectWallet size="md" />
        </>
      ) : (
        <>
          {' '}
          {!registerDnasKeyVisible ? (
            <div className="flex flex-col items-start gap-1">
              <div className="space-y-1">
                {dnas && dnas.length > 0 ? (
                  <>
                    {Object.entries(dnas).map(([a, info], index) => (
                      <DnasLine
                        key={info.daoAddr + index}
                        EntityDisplay={EntityDisplay}
                        chainId={info.chainId}
                        daoAddr={info.daoAddr}
                        onClick={handleShowModal}
                        onRemove={() => {
                          //  set values to map when updating and removing to have in form
                          setValue(
                            (fieldNamePrefix +
                              'dnas.daoAddr') as 'dnas.daoAddr',
                            info.daoAddr
                          )
                          setValue(
                            (fieldNamePrefix +
                              'dnas.keyOwner') as 'dnas.keyOwner',
                            info.keyOwner
                          )
                          setValue(
                            (fieldNamePrefix +
                              'dnas.keyHash') as 'dnas.keyHash',
                            info.keyHash
                          )
                          setValue(
                            (fieldNamePrefix +
                              'dnas.apiKeyValue') as 'dnas.apiKeyValue',
                            ''
                          )

                          !profile.loading &&
                            unregisterDnasKey.go({
                              daoAddrs: [info.daoAddr],
                              nonce: 0 //profile.data.uuid, //TODO: fix for nonce
                            })
                        }}
                        onUpdate={() => {
                          setValue(
                            (fieldNamePrefix +
                              'dnas.daoAddr') as 'dnas.daoAddr',
                            info.daoAddr
                          )
                          setValue(
                            (fieldNamePrefix +
                              'dnas.keyOwner') as 'dnas.keyOwner',
                            info.keyOwner
                          )
                          setValue(
                            (fieldNamePrefix +
                              'dnas.keyHash') as 'dnas.keyHash',
                            info.keyHash
                          )
                          setValue(
                            (fieldNamePrefix +
                              'dnas.apiKeyValue') as 'dnas.apiKeyValue',
                            ''
                          )
                          console.log('info:', info)
                          console.log('watchDnas:', watchDnas)
                          setRegisterDnasKeyVisible(true)
                        }}
                      />
                    ))}
                    <Button
                      className="self-start"
                      onClick={() => setRegisterDnasKeyVisible(true)}
                      variant="secondary"
                    >
                      {t('button.registerNewDnasKey')}
                    </Button>
                  </>
                ) : (
                  <>
                    <NoContent
                      Icon={WarningRounded}
                      actionNudge={t('info.registerFirstDnasKey')}
                      body={t('info.addDnasKeyToProfile')}
                      buttonLabel={t('button.create')}
                      onClick={handleShowModal}
                    />
                  </>
                )}
                {/* <ActiveShitStrapLineHeader /> */}
              </div>
            </div>
          ) : (
            <>
              {/* Make dao address field visible */}
              <Tooltip title={t('info.daoAddress')}>
                <InputLabel name={t('form.daoAddress')} />
              </Tooltip>
              <TextInput
                autoComplete="off"
                defaultValue={watchDnasDao}
                fieldName={(fieldNamePrefix + 'dnas.daoAddr') as 'dnas.daoAddr'}
                register={register}
                required
              />

              {/* if no keys for this profile, display forms for registering one */}
              {/* <Tooltip title={t('info.dnasKeyUseLimit')}>
                        <InputLabel name={t('form.dnasKeyMetadata')} />
                    </Tooltip>
                    <CodeMirrorInput
                        control={control}
                        fieldName="dnas.keyMetadata"
                        validation={[]}
                    /> */}

              <Tooltip title={t('info.dnasKeyUseLimit')}>
                <InputLabel name={t('form.dnasKeyUseLimit')} />
              </Tooltip>
              <NumericInput
                fieldName={'dnas.uploadLimit'}
                max={1048576}
                min={1}
                numericValue
                register={register}
                sizing="sm"
                step={1}
                validation={[]}
              />

              <Tooltip title={t('info.dnasKeyValue')}>
                <>
                  <InputLabel name={t('form.dnasKeyValue')} />
                  <TextInput
                    autoComplete="off"
                    fieldName="dnas.apiKeyValue"
                    register={register}
                    // type="password"
                    required
                  />
                </>
              </Tooltip>

              <PerformDnasKeyRegister
                key={watchDnasChainId}
                dnas={[newDnasForm as DnasObjectWithValues]}
                onClose={() => {
                  setRegisterDnasKeyVisible(false)
                  refreshProfile()
                }}
                updatingExistingDnasKey={watchUpdating}
              />
            </>
          )}
        </>
      )}
    </>
  )
}
