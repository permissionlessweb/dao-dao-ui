import { Check, Close } from '@mui/icons-material'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
  waitForAny,
} from 'recoil'

import { CommonNftSelectors, consumeDnasKeyVisibleAtom, DaoDaoCoreSelectors } from '@dao-dao/state/recoil'
import toast from 'react-hot-toast'
import {
  AddressInput,
  Button,
  ButtonLink,
  CodeMirrorInput,
  DnasFileUploadInput,
  DnasImageUploadInput,
  FileUploadInput,
  FormattedJsonDisplay,
  FormSwitch,
  IconButton,
  ImageSelector,
  ImageUploadInput,
  InputErrorMessage,
  InputLabel,
  TextAreaInput,
  TextInput,
  useActionOptions,
} from '@dao-dao/stateless'
import { LoadingDataWithError, FetchedDaoKeys, WidgetEditorProps } from '@dao-dao/types'
import { transformIpfsUrlToHttpsIfNecessary, processError } from '@dao-dao/utils'

import { useDnas } from '../hooks'
import { DnasKeyPicker } from './DnasKeyPicker'
import { ConsumeDnasActionData, DnasFile, UseDnasKeyData } from '../types'

export const ConsumeDnasKeysRenderer = ({ fieldNamePrefix, daoOwnedKeys, dnasKeyInUse: { daoAddr, dnasKeyHash, dnasKeyOwner }, isCreating }: ConsumeDnasActionData) => {
  const { t } = useTranslation()
  const {
    address,
    chain: { chainId, bech32Prefix },
    context: { type: actionType }
  } = useActionOptions()

  // Add state to track the current upload step
  const [currentStep, setCurrentStep] = useState(0)
  const [showDebugInfo, setShowDebugInfo] = useState(false)
  const totalSteps = 3

  const { useRegisteredDnasKeys } = useDnas()

  const {
    control,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ConsumeDnasActionData>()

  const watchDaoAddress = watch('dnasKeyInUse.daoAddr') as 'dnasKeyInUse.daoAddr'

  const {
    fields: fileFields,
    append: appendFile,
    remove: removeFile,
  } = useFieldArray({
    control,
    name: 'files',
  })

  const steps = [
    {
      title: t('form.coverImage'),
      description: t('form.uploadCoverImageDesc'),
      isImage: true
    },
    {
      title: t('form.contentFile'),
      description: t('form.uploadContentFileDesc'),
      isImage: false
    },
    {
      title: t('form.metadataJson'),
      description: t('form.uploadMetadataJsonDesc'),
      isImage: false
    }
  ]

  // Log file fields for debugging
  useEffect(() => {
    console.log("files:", fileFields)
  }, [fileFields])

  useMemo(() => {
    if (isCreating && fileFields.length === 0) {
      // Pre-initialize the three file slots
      for (let i = 0; i < totalSteps; i++) {
        appendFile({ image: steps[i].isImage })
      }
    }
  }, [isCreating, fileFields.length, appendFile])

  // save file to form in expected position (1st is image, 2nd is video, 3rd is a json file)
  const handleAddFileToForm = async (file: File, fileUrl: string, index?: number) => {
    appendFile({
      name: file.name,
      url: fileUrl,
      mimetype: file.type,
      image: false
    })

  }

  const handleRemoveFile = async (fileIndex: number) => {
    removeFile(fileIndex)
  }
  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleUploadFiles = async () => {
    try {
      // form the objects
      const prepMsg: UseDnasKeyData = {
        daoAddr,
        dnasKeyHash,
        dnasKeyOwner,
        files: fileFields,
      }

      // Call the upload function from the useDnas hook
      await useRegisteredDnasKeys.go(prepMsg)
      toast.success(t('success.filesUploaded'))
    } catch (err) {
      toast.error(processError(err))
    }
  }

  // // Check if all files have been uploaded
  // const allFilesUploaded = fileFields.length === totalSteps &&
  //   fileFields.every((file) => file.url)
  // Check if current step file is uploaded
  // const currentStepFileUploaded = fileFields[currentStep]?.url


  //  button to clear the form of all files and restart
  // component for viewing files existing in form
  return (
    <>
      {/* DNAS Key Owner Selection */}
      <InputLabel name={t('form.dnasKeyOwner')} />
      <DnasKeyPicker
        onSelect={(p) => {
          setValue((fieldNamePrefix + 'dnasKeyInUse.dnasKeyOwner') as 'dnasKeyInUse.dnasKeyOwner', p.keyOwner)
          setValue((fieldNamePrefix + 'dnasKeyInUse.daoAddr') as 'dnasKeyInUse.daoAddr', p.daoAddr)
        }
        }
        readOnly={!isCreating}
        selectedAddress={dnasKeyOwner}
        dnasKeyOwners={daoOwnedKeys}
        chainId={chainId} />
      <div className="flex flex-col items-start gap-1 mb-6">
      </div>

      {/* Step indicators */}
      <div className="flex justify-between mb-4 w-full">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${index === currentStep ? 'text-primary' : 'text-text-tertiary'}`}
            onClick={() => setCurrentStep(index)} // Allow clicking on steps to navigate
            style={{ cursor: 'pointer' }}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${index === currentStep ? 'bg-primary text-white' :
                fileFields[index]?.url ? 'bg-success text-white' : 'bg-bg-secondary'
                }`}
            >
              {fileFields[index]?.url ? <Check /> : index + 1}
            </div>
            <span className="text-sm">{steps[index].title}</span>
          </div>
        ))}
      </div>

      {/* Current step content */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">{steps[currentStep].title}</h3>
        <p className="text-text-secondary mb-4">{steps[currentStep].description}</p>

        {/* {isCreating && ( */}
        <div className="flex flex-col items-center">
          {fileFields[currentStep]?.url ? (
            <div className="flex flex-row items-center gap-2 mb-4">
              {fileFields[currentStep].mimetype?.startsWith('image') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={fileFields[currentStep].name || 'Uploaded image'}
                  className="min-w-24 min-h-24 max-w-80 h-auto max-h-80 w-auto"
                  src={transformIpfsUrlToHttpsIfNecessary(
                    fileFields[currentStep].url
                  )}
                />
              ) : (
                <ButtonLink
                  href={transformIpfsUrlToHttpsIfNecessary(
                    fileFields[currentStep].url
                  )}
                  openInNewTab
                  variant="underline"
                >
                  {fileFields[currentStep].name || fileFields[currentStep].url}
                </ButtonLink>
              )}

              <IconButton
                Icon={Close}
                onClick={() => handleRemoveFile(currentStep)}
                size="sm"
                variant="ghost"
                aria-label={t('button.remove')}
              />
            </div>
          ) : (
            steps[currentStep].isImage ? (
              <DnasFileUploadInput
                Trans={Trans}
                onChange={(url, file) => handleAddFileToForm(file, url)}
                onRemove={(index) => handleRemoveFile(index)}
                onError={(err) => toast.error(processError(err))}
                onAddFileToForm={handleAddFileToForm}
              />
            ) : (
              <DnasFileUploadInput
                Trans={Trans}
                onChange={(url, file) => handleAddFileToForm(file, url)}
                onRemove={(index) => handleRemoveFile(index)}
                onError={(err) => toast.error(processError(err))}
                onAddFileToForm={handleAddFileToForm} />
            )
          )}
        </div>
        {/* )} */}
      </div>

      {/* Navigation and action buttons */}
      <div className="flex justify-between">
        <Button
          disabled={currentStep === 0}
          onClick={handlePrevStep}
          variant="secondary"
        >
          {t('button.previous')}
        </Button>

        {currentStep < totalSteps - 1 ? (
          <Button
            // disabled={!coverPhotoAddedToForm}
            onClick={handleNextStep}
            variant="primary"
          >
            {t('button.next')}
          </Button>
        ) : (
          <Button
            // disabled={!allFilesUploaded}
            onClick={handleUploadFiles}
            variant="primary"
          >
            {t('button.uploadFiles')}
          </Button>
        )}
      </div>

      <div className="mt-6 p-4 bg-bg-secondary rounded-md">
        {/* File upload progress summary */}
        <div className="mt-6 p-4 bg-bg-secondary rounded-md">
        </div>


        {/* Debug information toggle */}
        <div className="mt-4 flex justify-end">
          <Button
            onClick={() => setShowDebugInfo(!showDebugInfo)}
            variant="ghost"
            size="sm"
          >
            {showDebugInfo ? t('button.hideDebugInfo') : t('button.showDebugInfo')}
          </Button>
        </div>

        {/* Visual debugging section */}
        {showDebugInfo && (
          <div className="mt-4 p-4 bg-bg-tertiary rounded-md border border-dashed border-border-primary">
            <h4 className="text-md font-medium mb-2">{t('title.debugInfo')}</h4>
            <div className="space-y-4">
              {fileFields.map((file, index) => (
                <div key={index} className="p-3 bg-bg-secondary rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">File #{index + 1}: {steps[index]?.title}</h5>
                    <span className={`px-2 py-1 text-xs rounded-full ${file.url ? 'bg-success bg-opacity-20 text-success' : 'bg-error bg-opacity-20 text-error'
                      }`}>
                      {file.url ? t('status.uploaded') : t('status.notUploaded')}
                    </span>
                    <Button
                      onClick={() => handleRemoveFile(index)}
                      variant="ghost"
                      size="sm"
                    >
                      {t('button.removeFile')}
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">{t('debug.name')}:</div>
                    <div className="text-text-secondary">{file.name || t('debug.notSet')}</div>

                    <div className="font-medium">{t('debug.url')}:</div>
                    <div className="text-text-secondary break-all">
                      {file.url || t('debug.notSet')}
                    </div>

                    <div className="font-medium">{t('debug.mimeType')}:</div>
                    <div className="text-text-secondary">{file.mimetype || t('debug.notSet')}</div>

                    <div className="font-medium">{t('debug.isImage')}:</div>
                    <div className="text-text-secondary">{file.image ? t('debug.yes') : t('debug.no')}</div>
                  </div>

                  {file.url && file.mimetype?.startsWith('image') && (
                    <div className="mt-2">
                      <p className="text-sm mb-1">{t('debug.preview')}:</p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={file.name || 'Preview'}
                        className="max-w-full h-auto max-h-40 rounded"
                        src={transformIpfsUrlToHttpsIfNecessary(file.url)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}