import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  DaoImage,
  FormSwitchCard,
  ImageSelector,
  InputErrorMessage,
  InputLabel,
  TextAreaInput,
  TextInput,
  useActionOptions,
  useDao,
} from '@dao-dao/stateless'
import { ChainId } from '@dao-dao/types'
import { ActionComponent, ActionContextType } from '@dao-dao/types/actions'
import { ConfigResponse as ConfigV1Response } from '@dao-dao/types/contracts/CwCore.v1'
import { Config as ConfigV2Response } from '@dao-dao/types/contracts/DaoDaoCore'
import {
  DAO_STATIC_PROPS_CACHE_SECONDS,
  isNeutronForkVersion,
  validateRequired,
} from '@dao-dao/utils'

import { LinkWrapper, Trans } from '../../../../components'

export type UpdateInfoData = (ConfigV1Response | ConfigV2Response) & {
  banner?: string | null
}

export const UpdateInfoComponent: ActionComponent<
  undefined,
  UpdateInfoData
> = ({ fieldNamePrefix, errors, isCreating, data }) => {
  const { name } = useDao()
  const { address, context } = useActionOptions()
  const { t } = useTranslation()
  const { register, watch, setValue } = useFormContext()

  const banner = watch(fieldNamePrefix + 'banner')

  const isNeutronForkDao =
    context.type === ActionContextType.Dao &&
    context.dao.chainId === ChainId.NeutronMainnet &&
    isNeutronForkVersion(context.dao.coreVersion)

  return (
    <>
      {(isCreating || !!banner) && (
        <div className="flex flex-col items-stretch gap-2">
          <InputLabel name={t('form.banner')} />
          <ImageSelector
            Trans={Trans}
            className="h-24"
            disabled={!isCreating}
            error={errors?.banner}
            fieldName={fieldNamePrefix + 'banner'}
            register={register}
            setValue={setValue}
            style="banner"
            watch={watch}
          />
        </div>
      )}

      <div className="flex flex-row flex-wrap items-center justify-center gap-4">
        {!isNeutronForkDao && (
          <div className="flex flex-col items-center gap-2 pl-2">
            <InputLabel name={t('form.image')} />
            {isCreating ? (
              <ImageSelector
                Trans={Trans}
                error={errors?.image_url}
                fieldName={fieldNamePrefix + 'image_url'}
                register={register}
                setValue={setValue}
                style="avatar"
                watch={watch}
              />
            ) : (
              <DaoImage
                LinkWrapper={LinkWrapper}
                coreAddress={address}
                daoName={name}
                imageUrl={data.image_url}
                size="lg"
              />
            )}
          </div>
        )}

        <div className="flex grow flex-col gap-2">
          <div>
            <TextInput
              disabled={!isCreating}
              error={errors?.name}
              fieldName={fieldNamePrefix + 'name'}
              placeholder={t('form.name')}
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors?.name} />
          </div>

          <div>
            <TextAreaInput
              disabled={!isCreating}
              error={errors?.description}
              fieldName={fieldNamePrefix + 'description'}
              placeholder={t('form.description')}
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors?.description} />
          </div>

          {!isNeutronForkDao && (
            <div className="flex flex-row flex-wrap gap-2">
              <FormSwitchCard
                containerClassName="grow"
                fieldName={fieldNamePrefix + 'automatically_add_cw20s'}
                label={t('form.automaticallyAddTokensTitle')}
                readOnly={!isCreating}
                setValue={setValue}
                sizing="sm"
                tooltip={t('form.automaticallyAddTokensTooltip')}
                tooltipIconSize="sm"
                value={watch(fieldNamePrefix + 'automatically_add_cw20s')}
              />

              <FormSwitchCard
                containerClassName="grow"
                fieldName={fieldNamePrefix + 'automatically_add_cw721s'}
                label={t('form.automaticallyAddNFTsTitle')}
                readOnly={!isCreating}
                setValue={setValue}
                sizing="sm"
                tooltip={t('form.automaticallyAddNFTsTooltip')}
                tooltipIconSize="sm"
                value={watch(fieldNamePrefix + 'automatically_add_cw721s')}
              />
            </div>
          )}

          {!isCreating && (
            <p className="text-xs italic text-text-tertiary">
              {t('info.daoInfoWillRefresh', {
                seconds: DAO_STATIC_PROPS_CACHE_SECONDS.toLocaleString(),
              })}
            </p>
          )}
        </div>
      </div>
    </>
  )
}
