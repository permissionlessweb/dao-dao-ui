import { Check, Close } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Trans, useTranslation } from 'react-i18next'

import {
  AddressInput,
  Button,
  ButtonLink,
  DnasFileUploadInput,
  IconButton,
  InputLabel,
  useActionOptions,
} from '@dao-dao/stateless'
import { ActionContextType, RecordOfDnasKeysByAddr } from '@dao-dao/types'
import {
  getChainForChainId,
  isValidBech32Address,
  makeValidateAddress,
  processError,
  transformIpfsUrlToHttpsIfNecessary,
  validateRequired,
} from '@dao-dao/utils'

import { useQueryLoadingData } from '../../../../../hooks'
import { useDnas } from '../hooks'
import { dnasQueries } from '../queries'
import { ConsumeDnasActionData, UploadedFile, UseDnasKeyData } from '../types'
import { DnasKeyPicker } from './DnasKeyPicker'

export const ConsumeDnasKeysRenderer = ({
  fieldNamePrefix,
  daoOwnedKeys,
  isCreating,
}: ConsumeDnasActionData) => {
  const { t } = useTranslation()
  const {
    address,
    chain: { chainId, bech32Prefix },
    chainContext,
    context: { type: actionType },
    queryClient,
  } = useActionOptions()
  const { useRegisteredDnasKeys } = useDnas()

  // Add state to track the current upload step
  const [addressSet, setAddressSet] = useState(false)
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
    formState: { errors },
  } = useFormContext<ConsumeDnasActionData>()

  const watchDaoAddress = watch(
    (fieldNamePrefix + 'dnasKeyInUse.daoAddr') as 'dnasKeyInUse.daoAddr'
  )
  const watchChainId = watch(
    (fieldNamePrefix + 'dnasKeyInUse.chainId') as 'dnasKeyInUse.chainId'
  )
  const watchDnasKeyOwner = watch(
    (fieldNamePrefix +
      'dnasKeyInUse.dnasKeyOwner') as 'dnasKeyInUse.dnasKeyOwner'
  )
  const watchDnasKeyHash = watch(
    (fieldNamePrefix + 'dnasKeyInUse.dnasKeyHash') as 'dnasKeyInUse.dnasKeyHash'
  )

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
    watchDaoAddress
      ? dnasQueries.dnasKeysByDaoAddr({ address: watchDaoAddress })
      : undefined,
    {} as RecordOfDnasKeysByAddr
  )

  // Initialize DAO address when component loads
  useEffect(() => {
    if (actionType === ActionContextType.Dao && address) {
      // console.log("Initializing DAO address:", address)
      setTimeout(() => {
        setValue(
          (fieldNamePrefix + 'dnasKeyInUse.daoAddr') as 'dnasKeyInUse.daoAddr',
          address
        )
        setValue(
          (fieldNamePrefix + 'dnasKeyInUse.chainId') as 'dnasKeyInUse.chainId',
          chainId
        )
        setValue(
          (fieldNamePrefix +
            'dnasKeyInUse.dnasKeyOwner') as 'dnasKeyInUse.dnasKeyOwner',
          ''
        )
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
      isImage: true,
    },
    {
      title: t('form.contentVideo'),
      description: t('form.uploadContentFileDesc'),
      isImage: false,
    },
    {
      title: t('form.metadataJson'),
      description: t('form.uploadMetadataJsonDesc'),
      isImage: false,
    },
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
  const handleAddFileToForm = async (
    file: File,
    fileUrl: string,
    index?: number
  ) => {
    appendFile({ name: file.name, url: fileUrl, mimetype: file.type, file })
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

      console.log('prepMsg.files:', prepMsg.files)

      // Call the upload function from the useDnas hook
      let response = await useRegisteredDnasKeys.go(prepMsg)

      // Store response to display upload results
      if (response && response.files) {
        setUploadedFilesResponse(response.files)
      }

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
          defaultValue={actionType === ActionContextType.Dao ? address : ''}
          error={errors?.dnasKeyInUse?.daoAddr}
          fieldName={
            (fieldNamePrefix + 'dnasKeyInUse.daoAddr') as 'dnasKeyInUse.daoAddr'
          }
          register={register}
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
      {!allDaoDnasKeyProfile.loading &&
      Object.values(allDaoDnasKeyProfile.data || {}).length > 0 &&
      !isLoadingKeys ? (
        <div className="mb-4 flex">
          <DnasKeyPicker
            chainId={watchChainId || chainId}
            daoAddr={watchDaoAddress}
            displayClassName="grow min-w-0"
            dnasKeyOwners={allDaoDnasKeyProfile.data || {}}
            onSelect={(p) => {
              setValue(
                (fieldNamePrefix +
                  'dnasKeyInUse.dnasKeyOwner') as 'dnasKeyInUse.dnasKeyOwner',
                p.keyOwner
              )
              setValue(
                (fieldNamePrefix +
                  'dnasKeyInUse.daoAddr') as 'dnasKeyInUse.daoAddr',
                p.daoAddr
              )
              setValue(
                (fieldNamePrefix +
                  'dnasKeyInUse.dnasKeyHash') as 'dnasKeyInUse.dnasKeyHash',
                p.keyHash
              )
              // console.log("Selected DNAS key:", p)
            }}
            readOnly={isCreating}
            selectedAddress={watchDnasKeyOwner}
          />
        </div>
      ) : (
        <InputLabel name={t('form.noDnasKeysRegisteredToDao')} />
      )}

      {/* <div className="flex flex-col items-start gap-1 mb-6">
      </div> */}
      {isValidBech32Address(watchDaoAddress) && watchDnasKeyOwner !== '' ? (
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
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    index === currentStep
                      ? 'bg-primary text-white'
                      : fileFields[index]?.url
                        ? 'bg-success text-white'
                        : 'bg-bg-secondary'
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
            <h3 className="text-lg font-medium mb-2">
              {steps[currentStep].title}
            </h3>
            <p className="text-text-secondary mb-4">
              {steps[currentStep].description}
            </p>

            {/* {isCreating && ( */}
            <div className="flex flex-col items-center">
              {fileFields[currentStep]?.url ? (
                <div className="flex flex-row items-center gap-2 mb-4">
                  {fileFields[currentStep].mimetype?.startsWith('image') ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      alt={fileFields[currentStep].name || 'Uploaded image'}
                      className="min-w-24 min-h-24 max-w-80 h-auto max-h-80 w-auto"
                      src={
                        fileFields[currentStep].url
                          ? transformIpfsUrlToHttpsIfNecessary(
                              fileFields[currentStep].url!
                            )
                          : undefined
                      }
                    />
                  ) : (
                    <ButtonLink
                      href={
                        fileFields[currentStep].url
                          ? transformIpfsUrlToHttpsIfNecessary(
                              fileFields[currentStep].url!
                            )
                          : undefined
                      }
                      openInNewTab
                      variant="underline"
                    >
                      {fileFields[currentStep].name ||
                        fileFields[currentStep].url}
                    </ButtonLink>
                  )}

                  <IconButton
                    Icon={Close}
                    aria-label={t('button.remove')}
                    onClick={() => handleRemoveFile(currentStep)}
                    size="sm"
                    variant="ghost"
                  />
                </div>
              ) : steps[currentStep].isImage ? (
                <DnasFileUploadInput
                  Trans={Trans}
                  onAddFileToForm={handleAddFileToForm}
                  onChange={(url, file) => handleAddFileToForm(file, url)}
                  onError={(err) => toast.error(processError(err))}
                  onRemove={(index) => handleRemoveFile(index)}
                />
              ) : (
                <DnasFileUploadInput
                  Trans={Trans}
                  onAddFileToForm={handleAddFileToForm}
                  onChange={(url, file) => handleAddFileToForm(file, url)}
                  onError={(err) => toast.error(processError(err))}
                  onRemove={(index) => handleRemoveFile(index)}
                />
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

          <div className="bg-bg-secondary mt-6 p-4 rounded-md">
            {/* File upload progress summary */}
            <div className="bg-bg-secondary mt-6 p-4 rounded-md"></div>

            {/* Debug information toggle */}
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => setShowDebugInfo(!showDebugInfo)}
                size="sm"
                variant="ghost"
              >
                {showDebugInfo
                  ? t('button.hideDebugInfo')
                  : t('button.showDebugInfo')}
              </Button>
            </div>

            {/* Display results of uploaded files */}
            {uploadedFiles.length > 0 && (
              <div className="bg-success/10 border-success mt-6 p-6 rounded-lg border-2">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-success w-6 h-6 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-success text-lg font-semibold">
                      {t('title.uploadSuccess')}
                    </h3>
                  </div>
                  <Button
                    onClick={() => {
                      const results = {
                        timestamp: new Date().toISOString(),
                        daoAddress: watchDaoAddress,
                        dnasKeyOwner: watchDnasKeyOwner,
                        files: uploadedFiles,
                      }
                      const jsonString = JSON.stringify(results, null, 2)
                      navigator.clipboard
                        .writeText(jsonString)
                        .then(() => {
                          toast.success(t('info.copiedToClipboard'))
                        })
                        .catch((err) => {
                          toast.error(t('error.copyFailed'))
                          console.error('Failed to copy:', err)
                        })
                    }}
                    size="sm"
                    variant="secondary"
                  >
                    {t('button.copyResults')}
                  </Button>
                </div>

                <div className="bg-background-base p-4 rounded-md mb-4">
                  <p className="text-sm text-text-secondary mb-2">
                    {t('info.uploadedAt')}: {new Date().toLocaleString()}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {t('info.totalFiles')}: {uploadedFiles.length}
                  </p>
                </div>

                <div className="space-y-4">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="bg-background-base p-4 rounded-md border border-border-secondary"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-semibold text-base">
                          {steps[index]?.title || `File #${index + 1}`}
                        </h5>
                        <div className="bg-success/20 text-success text-xs px-2 py-1 rounded">
                          {t('status.uploaded')}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-text-primary">
                            {t('debug.name')}:
                          </span>
                          <div className="text-text-secondary break-all mt-1 font-mono text-xs bg-background-secondary p-2 rounded">
                            {file.name}
                          </div>
                        </div>

                        <div>
                          <span className="font-medium text-text-primary">
                            {t('debug.type')}:
                          </span>
                          <div className="text-text-secondary mt-1 font-mono text-xs bg-background-secondary p-2 rounded">
                            {file.type}
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <span className="font-medium text-text-primary">
                            {t('debug.cid')}:
                          </span>
                          <div className="text-text-secondary break-all mt-1 font-mono text-xs bg-background-secondary p-2 rounded flex justify-between items-center">
                            <span>{file.cid}</span>
                            <Button
                              onClick={() => {
                                navigator.clipboard.writeText(file.cid)
                                toast.success(t('info.cidCopied'))
                              }}
                              size="sm"
                              variant="ghost"
                            >
                              {t('button.copy')}
                            </Button>
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <span className="font-medium text-text-primary">
                            {t('debug.id')}:
                          </span>
                          <div className="text-text-secondary break-all mt-1 font-mono text-xs bg-background-secondary p-2 rounded">
                            {file.id}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Visual debugging section */}
            {showDebugInfo && (
              <div className="bg-bg-tertiary mt-4 p-4 rounded-md border border-dashed border-border-primary">
                <h4 className="text-md font-medium mb-2">
                  {t('title.debugInfo')}
                </h4>
                <div className="space-y-4">
                  {fileFields.map((file, index) => (
                    <div key={index} className="bg-bg-secondary p-3 rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">
                          File #{index + 1}: {steps[index]?.title}
                        </h5>

                        <Button
                          onClick={() => handleRemoveFile(index)}
                          size="sm"
                          variant="ghost"
                        >
                          {t('button.removeFile')}
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="font-medium">{t('debug.name')}:</div>
                        <div className="text-text-secondary">
                          {file.name || t('debug.notSet')}
                        </div>

                        <div className="font-medium">{t('debug.url')}:</div>
                        <div className="text-text-secondary break-all">
                          {file.url || t('debug.notSet')}
                        </div>

                        <div className="font-medium">
                          {t('debug.mimeType')}:
                        </div>
                        <div className="text-text-secondary">
                          {file.mimetype || t('debug.notSet')}
                        </div>

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
