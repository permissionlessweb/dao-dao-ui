import {
  ArrowRightAltRounded,
  SubdirectoryArrowRightRounded,
} from '@mui/icons-material'
import clsx from 'clsx'
import cloneDeep from 'lodash.clonedeep'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  HorizontalNftCard,
  InputErrorMessage,
  InputLabel,
  TextInput,
  useChain,
  useDetectWrap,
} from '@dao-dao/stateless'
import { ActionComponent, ActionKey } from '@dao-dao/types'
import { makeValidateAddress, validateRequired } from '@dao-dao/utils'

import { MintNftData, MintNftOptions } from '../types'

// Form displayed when the user is minting a new NFT.
export const MintNft: ActionComponent<MintNftOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { nftInfo, AddressInput },
  addAction,
  index,
}) => {
  const { t } = useTranslation()
  const { bech32Prefix } = useChain()

  const { getValues, register } = useFormContext<MintNftData>()

  const { containerRef, childRef, wrapped } = useDetectWrap()
  const Icon = wrapped ? SubdirectoryArrowRightRounded : ArrowRightAltRounded

  return (
    <div className="flex flex-col gap-4">
      {isCreating && (
        <p className="max-w-prose">{t('form.nftMintInstructions')}</p>
      )}

      <HorizontalNftCard {...nftInfo} />

      <InputLabel className="-mb-3" name={t('form.uniqueTokenId')} />
      <div
        className="flex flex-row flex-wrap items-stretch gap-x-3 gap-y-2"
        ref={containerRef}
      >
        <TextInput
          className="w-auto"
          disabled={!isCreating}
          error={errors?.mintMsg?.token_id}
          fieldName={
            (fieldNamePrefix + 'mintMsg.token_id') as 'mintMsg.token_id'
          }
          register={register}
          validation={[validateRequired]}
        />

        <div
          className="flex grow flex-row items-stretch gap-2 sm:gap-3"
          ref={childRef}
        >
          <div
            className={clsx('flex flex-row items-center', wrapped && 'pl-1')}
          >
            <Icon className="!h-6 !w-6 text-text-secondary" />
          </div>

          <AddressInput
            containerClassName="grow"
            disabled={!isCreating}
            error={errors?.mintMsg?.owner}
            fieldName={(fieldNamePrefix + 'mintMsg.owner') as 'mintMsg.owner'}
            register={register}
            validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
          />
        </div>
      </div>

      {isCreating && addAction && (
        <Button
          className="self-start"
          onClick={() =>
            addAction(
              {
                actionKey: ActionKey.MintNft,
                data: cloneDeep(
                  // Remove trailing dot from prefix to get all data.
                  getValues(fieldNamePrefix.slice(0, -1) as any) as MintNftData
                ),
              },
              index + 1
            )
          }
          variant="secondary"
        >
          {t('button.duplicate')}
        </Button>
      )}

      <InputErrorMessage error={errors?.mintMsg?.token_id} />
      <InputErrorMessage error={errors?.mintMsg?.owner} />
    </div>
  )
}
