import {
  Add,
  ArrowRightAltRounded,
  Close,
  SubdirectoryArrowRightRounded,
} from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  IconButton,
  InputErrorMessage,
  InputLabel,
  NumberInput,
  TooltipInfoIcon,
  useDetectWrap,
} from '@dao-dao/stateless'
import { ActionComponent, AddressInputProps } from '@dao-dao/types'
import { Member } from '@dao-dao/types/contracts/Cw4Group'
import {
  makeValidateAddress,
  validateNonNegative,
  validateRequired,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../../../actions'

export interface ManageMembersData {
  toAdd: Member[]
  toRemove: { addr: string }[]
}

export interface ManageMembersOptions {
  currentMembers: string[]
  // Used to show the profiles of the members being updated.
  AddressInput: ComponentType<AddressInputProps<any>>
}

export const ManageMembersComponent: ActionComponent<
  ManageMembersOptions,
  ManageMembersData
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { currentMembers, AddressInput },
}) => {
  const { t } = useTranslation()
  const {
    chain: { bech32_prefix: bech32Prefix },
  } = useActionOptions()
  const { register, setValue, watch, control } =
    useFormContext<ManageMembersData>()

  const {
    fields: toAddFields,
    append: toAddAppend,
    remove: toAddRemove,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'toAdd') as 'toAdd',
  })
  const {
    fields: toRemoveFields,
    append: toRemoveAppend,
    remove: toRemoveRemove,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + 'toRemove') as 'toRemove',
  })

  const { containerRef, childRef, wrapped } = useDetectWrap()
  const Icon = wrapped ? SubdirectoryArrowRightRounded : ArrowRightAltRounded

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <InputLabel name={t('form.membersToAddOrUpdate')} />
          <TooltipInfoIcon
            placement="top"
            size="sm"
            title={t('form.membersToAddOrUpdateDescription')}
          />
        </div>
        <div className="my-2 flex flex-col items-stretch gap-1">
          {toAddFields.map(({ id }, index) => {
            const addrFieldName = (fieldNamePrefix +
              `toAdd.${index}.addr`) as `toAdd.${number}.addr`
            const weightFieldName = (fieldNamePrefix +
              `toAdd.${index}.weight`) as `toAdd.${number}.weight`

            return (
              <div
                key={id}
                className="flex flex-row items-center gap-3 rounded-lg bg-background-secondary p-4"
              >
                <div
                  className="flex grow flex-row flex-wrap items-stretch gap-x-3 gap-y-2"
                  ref={containerRef}
                >
                  <div className="flex flex-col gap-1">
                    <InputLabel name={t('form.votingWeightPlaceholder')} />
                    <NumberInput
                      disabled={!isCreating}
                      error={errors?.toAdd?.[index]?.weight}
                      fieldName={weightFieldName}
                      min={0}
                      placeholder={t('form.votingWeightPlaceholder')}
                      register={register}
                      setValue={setValue}
                      sizing="fill"
                      validation={[validateRequired, validateNonNegative]}
                      watch={watch}
                    />
                    <InputErrorMessage error={errors?.toAdd?.[index]?.weight} />
                  </div>

                  <div
                    className="flex grow flex-row items-stretch justify-center gap-2 sm:gap-3"
                    ref={childRef}
                  >
                    <div
                      className={clsx(
                        'flex flex-row items-center pt-4',
                        wrapped && 'pl-1'
                      )}
                    >
                      <Icon className="!h-6 !w-6 text-text-secondary" />
                    </div>

                    <div className="flex grow flex-col gap-1">
                      <InputLabel name={t('form.address')} />
                      <AddressInput
                        containerClassName="h-full"
                        disabled={!isCreating}
                        error={errors?.toAdd?.[index]?.addr}
                        fieldName={addrFieldName}
                        register={register}
                        validation={[
                          validateRequired,
                          makeValidateAddress(bech32Prefix),
                          (value) =>
                            toRemoveFields.every(
                              ({ addr }) => addr !== value
                            ) || t('error.invalidDuplicateFound'),
                        ]}
                      />
                      <InputErrorMessage error={errors?.toAdd?.[index]?.addr} />
                    </div>
                  </div>
                </div>

                {isCreating && (
                  <IconButton
                    Icon={Close}
                    onClick={() => toAddRemove(index)}
                    size="sm"
                    variant="ghost"
                  />
                )}
              </div>
            )
          })}
          {!isCreating && toAddFields.length === 0 && (
            <p className="text-xs italic text-text-tertiary">
              {t('info.none')}
            </p>
          )}
          {isCreating && (
            <Button
              className="mt-1 self-start"
              onClick={() => toAddAppend({ weight: NaN, addr: '' })}
              size="sm"
              variant="secondary"
            >
              <Add className="!h-4 !w-4" />
              {t('button.add')}
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <InputLabel name={t('form.membersToRemove')} />
          <TooltipInfoIcon
            placement="top"
            size="sm"
            title={t('form.membersToRemoveDescription')}
          />
        </div>

        <div className="my-2 flex flex-col items-stretch gap-1">
          {toRemoveFields.map(({ id }, index) => (
            <div
              key={id}
              className="flex flex-row items-center gap-3 rounded-lg bg-background-secondary p-4"
            >
              <div className="flex grow flex-col gap-1">
                <InputLabel name={t('form.address')} />
                <AddressInput
                  disabled={!isCreating}
                  error={errors?.toRemove?.[index]?.addr}
                  fieldName={
                    (fieldNamePrefix +
                      `toRemove.${index}.addr`) as `toRemove.${number}.addr`
                  }
                  register={register}
                  validation={[
                    validateRequired,
                    makeValidateAddress(bech32Prefix),
                    (value) =>
                      currentMembers.includes(value) ||
                      t('error.addressNotAMember'),
                    (value) =>
                      toAddFields.every(({ addr }) => addr !== value) ||
                      t('error.invalidDuplicateFound'),
                  ]}
                />
                <InputErrorMessage error={errors?.toRemove?.[index]?.addr} />
              </div>

              {isCreating && (
                <IconButton
                  Icon={Close}
                  onClick={() => toRemoveRemove(index)}
                  size="sm"
                  variant="ghost"
                />
              )}
            </div>
          ))}
          {!isCreating && toRemoveFields.length === 0 && (
            <p className="text-xs italic text-text-tertiary">
              {t('info.none')}
            </p>
          )}
          {isCreating && (
            <Button
              className="mt-1 self-start"
              onClick={() => toRemoveAppend({ addr: '' })}
              size="sm"
              variant="secondary"
            >
              <Add className="!h-4 !w-4" />
              {t('button.add')}
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
