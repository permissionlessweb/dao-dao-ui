import { Check, Close } from '@mui/icons-material'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import {
  AddressInput,
  Button,
  ButtonLink,
  CodeMirrorInput,
  DnasFileUploadInput,
  IconButton,
  ImageSelector,
  ImageUploadInput,
  InputErrorMessage,
  InputLabel,
  TextAreaInput,
  TextInput,
  useActionOptions,
  ValidatorPicker,
} from '@dao-dao/stateless'
import { ActionContextType, ActionOptions, DnasKeyByDaoObjectWithDAO, RecordOfDnasKeysByAddr } from '@dao-dao/types'
import { transformIpfsUrlToHttpsIfNecessary, processError, validateRequired, makeValidateAddress, getChainForChainId, isValidBech32Address } from '@dao-dao/utils'

import { useDnas } from '../hooks'
import { DnasKeyPicker } from './DnasKeyPicker'
import { ConsumeDnasActionData, UploadedFile, UseDnasKeyData } from '../types'
import { useQueries, useQuery } from '@tanstack/react-query'
import { dnasQueries } from '../queries'
import { useQueryLoadingData } from '../../../../../hooks'


export const ConsumeDnasKeysRenderer = ({ fieldNamePrefix, daoOwnedKeys, isCreating }: ConsumeDnasActionData) => {
  const { t } = useTranslation()
  const {
    address,
    chain: { chainId, bech32Prefix, },
    chainContext,
    context: { type: actionType },
    queryClient,
  } = useActionOptions()
  const { useRegisteredDnasKeys } = useDnas()

  // Add state to track the current upload step
  const [addressSet, setAddressSet] = useState(false);
  const [currentStep, setCurrentStep] = useState(0)
  const [showDebugInfo, setShowDebugInfo] = useState(false)
  const [isLoadingKeys, setIsLoadingKeys] = useState(false)
  const [uploadedFiles, setUploadedFilesResponse] = useState<UploadedFile[]>([])

  const totalSteps = 3

  const {
    control,
    register,
    reset,
    setValue,
    watch,
    formState: { errors, },
  } = useFormContext<ConsumeDnasActionData>()

  const watchDaoAddress = watch((fieldNamePrefix + 'dnasKeyInUse.daoAddr') as 'dnasKeyInUse.daoAddr')
  const watchChainId = watch((fieldNamePrefix + 'dnasKeyInUse.chainId') as 'dnasKeyInUse.chainId')
  const watchDnasKeyOwner = watch((fieldNamePrefix + 'dnasKeyInUse.dnasKeyOwner') as 'dnasKeyInUse.dnasKeyOwner')
  const watchDnasKeyHash = watch((fieldNamePrefix + 'dnasKeyInUse.dnasKeyHash') as 'dnasKeyInUse.dnasKeyHash')

  const {
    fields: fileFields,
    append: appendFile,
    remove: removeFile,
  } = useFieldArray({
    control,
    name: 'files',
  })


  // Fetch DNAs keys when watchDaoAddress changes
  const allDaoDnasKeyProfile = useQueryLoadingData(
    watchDaoAddress ? dnasQueries.dnasKeysByDaoAddr({ address: watchDaoAddress }) : undefined,
    {} as RecordOfDnasKeysByAddr
  );

  // Initialize DAO address when component loads
  useEffect(() => {
    if (actionType === ActionContextType.Dao && address) {
      // console.log("Initializing DAO address:", address)
      setTimeout(() => {
        setValue((fieldNamePrefix + 'dnasKeyInUse.daoAddr') as 'dnasKeyInUse.daoAddr', address);
        setValue((fieldNamePrefix + 'dnasKeyInUse.chainId') as 'dnasKeyInUse.chainId', chainId);
        // Fetch keys for the DAO address on initial load
        // console.log("allDaoDnasKeyProfile:", allDaoDnasKeyProfile)
      }, 0)
    }
  }, [])

  // useEffect(() => {
  //   if (allDaoDnasKeyProfile && !allDaoDnasKeyProfile.loading && allDaoDnasKeyProfile.data) {
  //     console.log("GET DNAS KEYS FROM DAO:", allDaoDnasKeyProfile.data);
  //     setDnasKeys(allDaoDnasKeyProfile.data); // Adjust based on actual data structure
  //     setIsLoadingKeys(false);
  //   } else if (allDaoDnasKeyProfile?.loading) {
  //     setIsLoadingKeys(true);
  //   } else {
  //     setDnasKeys({});
  //     setIsLoadingKeys(false);
  //   }
  // }, [allDaoDnasKeyProfile]);




  const steps = [
    {
      title: t('form.coverImage'),
      description: t('form.uploadCoverImageDesc'),
      isImage: true
    },
    {
      title: t('form.contentVideo'),
      description: t('form.uploadContentFileDesc'),
      isImage: false
    },
    {
      title: t('form.metadataJson'),
      description: t('form.uploadMetadataJsonDesc'),
      isImage: false
    }
  ]

  // Implement a function to handle setting the DAO address
  // const handleSetDaoAddress = () => {
  //   if (address) {
  //     console.log("Setting DAO address to:", address);
  //     setValue(
  //       (fieldNamePrefix + 'dnasKeyInUse.daoAddr') as 'dnasKeyInUse.daoAddr',
  //       address
  //     );
  //     setValue(
  //       (fieldNamePrefix + 'dnasKeyInUse.chainId') as 'dnasKeyInUse.chainId',
  //       chainId
  //     );

  //     // Log the current value after setting
  //     setTimeout(() => {
  //       console.log("Current watchDaoAddress after setting:", watchDaoAddress);
  //     }, 100);
  //   }
  // };


  // save file to form in expected position (1st is image, 2nd is video, 3rd is a json file)
  const handleAddFileToForm = async (file: File, fileUrl: string, index?: number) => {
    appendFile({
      name: file.name,
      url: fileUrl,
      mimetype: file.type,
      file,
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
      if (!watchDaoAddress || !watchDnasKeyOwner) {
        throw new Error('Please select a dnas key to use first.')
      }
      // form the objects
      const prepMsg: UseDnasKeyData = {
        daoAddr: watchDaoAddress,
        dnasKeyOwner: watchDnasKeyOwner,
        files: fileFields,
      }

      console.log("prepMsg.files:", prepMsg.files)

      // Call the upload function from the useDnas hook
      let response = await useRegisteredDnasKeys.go(prepMsg)
      // add response to state to display cids
      toast.success(t('success.filesUploaded'))
    } catch (err) {
      toast.error(processError(err))
    }
  }

  return (
    <>
      {/* DNAS Key Owner Selection */}
      <InputLabel name={t('form.dnasKeyOwner')} />
      <>

        <AddressInput
          error={errors?.dnasKeyInUse?.daoAddr}
          fieldName={(fieldNamePrefix + 'dnasKeyInUse.daoAddr') as 'dnasKeyInUse.daoAddr'}
          register={register}
          defaultValue={actionType === ActionContextType.Dao ? address : ''}
          type="contract"
          // onChange={() => {}}
          validation={[
            validateRequired,
            makeValidateAddress(getChainForChainId(watchChainId).bech32Prefix),
          ]}
        />
        {/* <Button
          onClick={() => {
            setValue(
              (fieldNamePrefix + 'dnasKeyInUse.daoAddr') as 'dnasKeyInUse.daoAddr',
              address,
              // { shouldValidate: true, shouldDirty: true }
            );
            // clear the keys from allDaoDnasPicker
            setValue((fieldNamePrefix + 'dnasKeyInUse.dnasKeyOwner') as 'dnasKeyInUse.dnasKeyOwner', '')
            setValue((fieldNamePrefix + 'dnasKeyInUse.dnasKeyHash') as 'dnasKeyInUse.dnasKeyHash', '')
            // clear the files from the form
            setValue((fieldNamePrefix + 'files') as 'files', [])
          }}
        >
          {watchDaoAddress ? t('button.changeDAOinUse') : t('button.useDAO')}

        </Button> */}
      </>

      {/* DNAS Key Picker */}
      {/* {console.log({
        loading: allDaoDnasKeyProfile.loading,
        dataLength: !allDaoDnasKeyProfile.loading ? Object.values(allDaoDnasKeyProfile.data || {}).length: 0,
        isLoadingKeys,
        allDaoDnasKeyProfile,
      })} */}
      {!allDaoDnasKeyProfile.loading && Object.values(allDaoDnasKeyProfile.data || {}).length > 0 && !isLoadingKeys ? (
        <div className="mb-4 flex">
          <DnasKeyPicker
            displayClassName="grow min-w-0"
            onSelect={(p) => {
              setValue((fieldNamePrefix + 'dnasKeyInUse.dnasKeyOwner') as 'dnasKeyInUse.dnasKeyOwner', p.keyOwner)
              setValue((fieldNamePrefix + 'dnasKeyInUse.daoAddr') as 'dnasKeyInUse.daoAddr', p.daoAddr)
              setValue((fieldNamePrefix + 'dnasKeyInUse.dnasKeyHash') as 'dnasKeyInUse.dnasKeyHash', p.keyHash)
              // console.log("Selected DNAS key:", p)
            }}
            readOnly={isCreating}
            selectedAddress={watchDnasKeyOwner}
            dnasKeyOwners={allDaoDnasKeyProfile.data || {}}
            chainId={watchChainId || chainId}
            daoAddr={watchDaoAddress}
          />
        </div>
      ) : <InputLabel name={t('form.noDnasKeysRegisteredToDao')} />}

      {/* <div className="flex flex-col items-start gap-1 mb-6">
      </div> */}
      {isValidBech32Address(watchDaoAddress) && watchDnasKeyOwner != '' ? (
        <>
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
          {/* Step indicators */}

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

            {/* Display results of uploaded files */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 p-4 bg-bg-tertiary rounded-md border border-dashed border-border-primary">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-md font-medium">{t('title.uploadedFiles')}</h4>
                  <button
                    onClick={() => {
                      const jsonString = JSON.stringify(uploadedFiles, null, 2);
                      navigator.clipboard.writeText(jsonString).then(() => {
                        // Optional: Add a toast notification or visual feedback
                        console.log('Copied to clipboard');
                        alert('JSON copied to clipboard!');
                      }).catch(err => {
                        console.error('Failed to copy:', err);
                      });
                    }}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Copy JSON
                  </button>
                </div>
                <div className="space-y-4">
                  {uploadedFiles.map((file, index) => (

                    <div key={index} className="p-3 bg-bg-secondary rounded-md">

                      <h5 className="font-medium">File #{index + 1}: {steps[index]?.title}</h5>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="font-medium">{t('debug.name')}:</div>
                        <div className="text-text-secondary">{file.name}</div>

                        <div className="font-medium">{t('debug.type')}:</div>
                        <div className="text-text-secondary break-all">
                          {file.type}
                        </div>

                        <div className="font-medium">{t('debug.cid')}:</div>
                        <div className="text-text-secondary">{file.cid}</div>

                        <div className="font-medium">{t('debug.cid')}:</div>
                        <div className="text-text-secondary">{file.id}</div>


                        {/* <div className="text-text-secondary">{file.image ? t('debug.yes') : t('debug.no')}</div> */}
                      </div>
                    </div>

                  ))}
                </div>
              </div>
            )}
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
                        {/* <div className="text-text-secondary">{file.image ? t('debug.yes') : t('debug.no')}</div> */}
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
      ) : undefined}


    </>
  )
}