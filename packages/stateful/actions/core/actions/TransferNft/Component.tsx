import { Check, Close } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  Button,
  ChainProvider,
  CodeMirrorInput,
  ErrorPage,
  FormSwitchCard,
  HorizontalNftCard,
  HorizontalNftCardLoader,
  InputErrorMessage,
  InputLabel,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  AddressInputProps,
  LazyNftCardInfo,
  LoadingDataWithError,
  NftCardInfo,
  NftSelectionModalProps,
} from '@dao-dao/types'
import {
  getChainForChainId,
  getNftKey,
  makeValidateAddress,
  validateJSON,
  validateRequired,
} from '@dao-dao/utils'

export type TransferNftData = {
  chainId: string
  nfts: {
    collection: string
    tokenId: string
  }[]
  recipient: string
  // When true, uses `send` instead of `transfer_nft` to transfer the NFT(s).
  executeSmartContract: boolean
  smartContractMsg: string
}

export interface TransferNftOptions {
  // The set of NFTs that may be transfered as part of this action.
  options: LoadingDataWithError<LazyNftCardInfo[]>
  // Information about the NFTs currently selected. If undefined, no NFTs are
  // selected.
  nftInfos: LoadingDataWithError<NftCardInfo[]> | undefined

  AddressInput: ComponentType<AddressInputProps<TransferNftData>>
  NftSelectionModal: ComponentType<NftSelectionModalProps>
}

export const TransferNftComponent: ActionComponent<TransferNftOptions> = ({
  fieldNamePrefix,
  isCreating,
  errors,
  options: { options, nftInfos, AddressInput, NftSelectionModal },
}) => {
  const { t } = useTranslation()
  const {
    control,
    watch,
    setValue,
    getValues,
    setError,
    register,
    clearErrors,
  } = useFormContext<TransferNftData>()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const chain = getChainForChainId(chainId)

  const nfts = watch((fieldNamePrefix + 'nfts') as 'nfts')
  const executeSmartContract = watch(
    (fieldNamePrefix + 'executeSmartContract') as 'executeSmartContract'
  )

  useEffect(() => {
    if (!nfts.length) {
      setError((fieldNamePrefix + 'nfts') as 'nfts', {
        type: 'required',
        message: t('error.noNftSelected'),
      })
    } else {
      clearErrors((fieldNamePrefix + 'nfts') as 'nfts')
    }
  }, [nfts.length, setError, clearErrors, t, fieldNamePrefix])

  // Show modal initially if creating and no NFT already selected.
  const [showModal, setShowModal] = useState<boolean>(
    isCreating && !nfts.length
  )

  // If any NFT is selected, only show NFTs from that chain. Otherwise, show all
  // NFTs.
  const nftOptions: LoadingDataWithError<LazyNftCardInfo[]> =
    options.loading || options.errored || nfts.length === 0
      ? options
      : {
          loading: false,
          errored: false,
          updating: options.updating,
          data: options.data.filter((o) => o.chainId === chainId),
        }

  const selectedKeys = nfts.map((nft) =>
    getNftKey(chainId, nft.collection, nft.tokenId)
  )

  return (
    <>
      <div className="flex flex-col gap-y-4 gap-x-12 lg:flex-row lg:flex-wrap">
        <div className="flex grow flex-col gap-4">
          <div className="flex flex-col gap-1">
            <InputLabel
              className={clsx(isCreating && 'mb-2')}
              name={
                isCreating
                  ? t('form.whoTransferNftsQuestion')
                  : t('form.recipient')
              }
              primary={isCreating}
            />

            <ChainProvider chainId={chainId}>
              <AddressInput
                disabled={!isCreating}
                error={errors?.recipient}
                fieldName={(fieldNamePrefix + 'recipient') as 'recipient'}
                register={register}
                validation={[
                  validateRequired,
                  // If executing smart contract, ensure recipient is smart
                  // contract.
                  (executeSmartContract
                    ? makeValidateAddress
                    : makeValidateAddress)(chain.bech32Prefix),
                ]}
              />
            </ChainProvider>
            <InputErrorMessage error={errors?.recipient} />
          </div>

          {/* Don't show if not creating and not executing smart contract. */}
          {(isCreating || executeSmartContract) && (
            <div className="flex flex-col gap-1">
              <FormSwitchCard
                containerClassName="self-start"
                fieldName={
                  (fieldNamePrefix +
                    'executeSmartContract') as 'executeSmartContract'
                }
                label={t('form.executeSmartContract')}
                onToggle={() => {
                  // Recipient validation changes as a function of this value,
                  // so reset errors on change and they will get revalidated
                  // later.
                  clearErrors((fieldNamePrefix + 'recipient') as 'recipient')
                  // Reset to valid empty JSON object.
                  setValue(
                    (fieldNamePrefix +
                      'smartContractMsg') as 'smartContractMsg',
                    '{}',
                    {
                      shouldValidate: true,
                    }
                  )
                }}
                readOnly={!isCreating}
                setValue={setValue}
                sizing="sm"
                tooltip={t('form.executeSmartContractTooltip')}
                tooltipIconSize="sm"
                value={executeSmartContract}
              />

              {executeSmartContract && (
                <div className="mt-2 flex flex-col gap-1">
                  <InputLabel name={t('form.smartContractMessage')} />

                  <CodeMirrorInput
                    control={control}
                    error={errors?.smartContractMsg}
                    fieldName={
                      (fieldNamePrefix +
                        'smartContractMsg') as 'smartContractMsg'
                    }
                    readOnly={!isCreating}
                    validation={[validateJSON]}
                  />

                  {errors?.smartContractMsg?.message ? (
                    <p className="flex items-center gap-1 text-sm text-text-interactive-error">
                      <Close className="!h-5 !w-5" />{' '}
                      <span>{errors.smartContractMsg.message}</span>
                    </p>
                  ) : (
                    <p className="flex items-center gap-1 text-sm text-text-interactive-valid">
                      <Check className="!h-5 !w-5" /> {t('info.jsonIsValid')}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex grow flex-col gap-2">
          {!isCreating && (
            <InputLabel
              name={t('title.numNfts', {
                count: nfts.length,
              })}
            />
          )}

          {nftInfos &&
            (nftInfos.loading ? (
              <HorizontalNftCardLoader />
            ) : nftInfos.errored ? (
              <ErrorPage error={nftInfos.error} />
            ) : (
              <div className="flex flex-col gap-1">
                {nftInfos.data.map(({ key, ...nftInfo }) => (
                  <HorizontalNftCard key={key} {...nftInfo} />
                ))}
              </div>
            ))}

          {isCreating && (
            <Button
              className={clsx(
                nftInfos && !nftInfos.loading && !nftInfos.errored
                  ? 'self-end'
                  : 'self-start'
              )}
              onClick={() => setShowModal(true)}
              variant={nfts.length ? 'secondary' : 'primary'}
            >
              {t('button.selectNfts')}
            </Button>
          )}

          <InputErrorMessage error={errors?.nfts} />
        </div>
      </div>

      {isCreating && (
        <NftSelectionModal
          action={{
            loading: false,
            label: t('button.save'),
            onClick: () => setShowModal(false),
          }}
          header={{
            title: t('title.selectNftsToTransfer'),
          }}
          nfts={nftOptions}
          onClose={() => setShowModal(false)}
          onNftClick={(nft) => {
            const selected = getValues((fieldNamePrefix + 'nfts') as 'nfts')

            // If no NFTs are selected, set the chain and selected NFT.
            if (selected.length === 0) {
              setValue((fieldNamePrefix + 'chainId') as 'chainId', nft.chainId)
              setValue((fieldNamePrefix + 'nfts') as 'nfts', [
                {
                  collection: nft.collectionAddress,
                  tokenId: nft.tokenId,
                },
              ])
            } else if (
              // If the NFT is already selected, remove it.
              selected.some(
                (n) =>
                  n.collection === nft.collectionAddress &&
                  n.tokenId === nft.tokenId
              )
            ) {
              setValue(
                (fieldNamePrefix + 'nfts') as 'nfts',
                nfts.filter(
                  (n) => getNftKey(chainId, n.collection, n.tokenId) !== nft.key
                )
              )
            } else if (nft.chainId === chainId) {
              // Otherwise, add the NFT if from the same chain.
              setValue((fieldNamePrefix + 'nfts') as 'nfts', [
                ...selected,
                {
                  collection: nft.collectionAddress,
                  tokenId: nft.tokenId,
                },
              ])
            } else {
              // This should never happen since we filter NFTs based on the
              // chain of the first one selected, but if it does, show an error.
              toast.error(t('error.selectedNftsMustBeFromSameChain'))
            }
          }}
          selectedKeys={selectedKeys}
          visible={showModal}
        />
      )}
    </>
  )
}
