import { Add, Close } from '@mui/icons-material'
import {
  Control,
  FormState,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  AddressInput,
  Button,
  FormSwitchCard,
  IconButton,
  InputErrorMessage,
  InputLabel,
  NativeCoinSelector,
  NumericInput,
  SwitchCard,
  TextInput,
  TokenInput,
  useChain,
  useChainContext,
} from '@dao-dao/stateless'
import { GenericToken, NewDao } from '@dao-dao/types'
import {
  DISTRIBUTION_COLORS,
  getChainAssets,
  makeValidateAddress,
  validateNonNegative,
  validateRequired,
} from '@dao-dao/utils'

import { CreateEventActionData } from '../CreateEventComponent'
import { useState } from 'react'
import { EventSegmentAccessType } from '@dao-dao/types/contracts/CwAve'
import { HugeDecimal } from '@dao-dao/math'


export interface UsherDetailsCardProps {
  data: CreateEventActionData
  tierIndex: number
  // Display color dots next to each member instead of each tier.
  // When there is only one tier, all members are displayed on the chart,
  // so the colors correspond to members instead of tiers.
  showColorDotOnMember: boolean
  control: Control<CreateEventActionData>
  register: UseFormRegister<CreateEventActionData>
  watch: UseFormWatch<CreateEventActionData>
  errors: FormState<CreateEventActionData>['errors']
  setValue: UseFormSetValue<CreateEventActionData>
  getValues: UseFormGetValues<CreateEventActionData>
  fieldNamePrefix?: string,
  remove?: () => void
}

export const UsherDetailsCard = ({
  // Don't pass along to member.
  remove,

  ...props
}: UsherDetailsCardProps) => {
  const {
    data,
    tierIndex,
    control,
    register,
    watch,
    errors,
    setValue,
    getValues,
    showColorDotOnMember,
    fieldNamePrefix,
  } = props

  const { t } = useTranslation()
  const {
    chainId,
    chain: { bech32Prefix },
    nativeToken,
  } = useChainContext()

  const {
    fields: usherTiers,
    append: appendUsherTiers,
    remove: removeUsherTiers,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + `usher_admins.${tierIndex}.addr`) as `usher_admins.${number}.addr`,
  })

  const tierColor = DISTRIBUTION_COLORS[tierIndex % DISTRIBUTION_COLORS.length]
  const usherTierWeight = data.usher_admins?.[tierIndex]?.weight ?? 0
  const usherTierAddrs = data.usher_admins?.[tierIndex]?.addr ?? []


  return (
    <div className="rounded-lg bg-background-tertiary">
      <div className="flex h-14 flex-row items-center justify-between border-b border-border-base p-4">
        <div className="flex flex-row items-center gap-3">
          {!showColorDotOnMember && (
            <div
              className="h-3 w-3 shrink-0 rounded-full"
              style={{
                backgroundColor: tierColor,
              }}
            ></div>
          )}

          <p className="primary-text text-text-body">
            {t('title.usherTier', { tier: tierIndex + 1 })}
          </p>
        </div>

        {remove && (
          <IconButton
            Icon={Close}
            iconClassName="text-icon-secondary"
            onClick={remove}
            variant="ghost"
          />
        )}
      </div>

      <div className="flex flex-col items-stretch sm:flex-row sm:items-center sm:justify-between">
        {/* <div className="flex grow flex-col border-b border-border-secondary p-6 sm:border-r sm:border-b-0">
          <InputLabel
            containerProps={{ className: 'mb-2' }}
            name={t('form.guestTypeTitle')}
            tooltip={t('form.guestTypeTitleTooltip')}
          />

          <TextInput
            error={errors.guest_details?.[tierIndex]?.guest_type}
            fieldName={`guest_details.${tierIndex}.guest_type`}
            placeholder={t('form.guestTypeTitle') + '...'}
            register={register}
            validation={[validateRequired]}
          />

          <InputErrorMessage
            error={errors.guest_details?.[tierIndex]?.guest_type}
          />
        </div> */}

        <div className="flex grow flex-col p-6">
          <InputLabel
            containerProps={{ className: 'mb-2' }}
            name={t('form.usherWeight')}
            tooltip={t('form.usherWeightTooltip', {
              weight: usherTierWeight.toLocaleString(),
            })}
          />

          <NumericInput
            error={errors.usher_admins?.[tierIndex]?.weight}
            fieldName={(fieldNamePrefix + `usher_admins.${tierIndex}.weight`) as `usher_admins.${number}.weight`}
            getValues={getValues}
            min={0}
            numericValue
            register={register}
            setValue={setValue}
            step={1}
            validation={[validateNonNegative, validateRequired]}
          />

          <InputErrorMessage
            error={errors.usher_admins?.[tierIndex]?.weight}
          />
        </div>


      </div>



      <div className="flex flex-col border-t border-border-secondary p-6">
        <InputLabel
          containerProps={{ className: 'mb-2' }}
          name={t('title.eventUshers')}
        />

        <div className="flex flex-col items-stretch gap-1">
          {usherTiers.map(({ id }, usherIndex) => (
            <div
              key={id}
              className="flex flex-row items-center gap-4 rounded-lg bg-background-secondary p-4"
            >
              <div className="grow">
                <div className="flex flex-row items-center gap-4">
                  {showColorDotOnMember && (
                    <div
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          DISTRIBUTION_COLORS[
                          usherIndex % DISTRIBUTION_COLORS.length
                          ],
                      }}
                    ></div>
                  )}

                  <AddressInput
                    containerClassName="grow"
                    error={
                      errors.usher_admins?.[tierIndex]?.addr?.[
                        usherIndex
                      ]?.addr
                    }
                    fieldName={(fieldNamePrefix + `usher_admins.${tierIndex}.addr.${usherIndex}.addr`) as `usher_admins.${number}.addr.${number}.addr`}
                    placeholder={t('form.ushersAddress')}
                    register={register}
                    setValue={setValue}
                    validation={[
                      validateRequired,
                      makeValidateAddress(bech32Prefix),
                    ]}
                    watch={watch}
                  />
                </div>

                <InputErrorMessage
                  error={
                    errors.usher_admins?.[tierIndex]?.addr?.[
                      usherIndex
                    ]?.addr
                  }
                />
              </div>

              <IconButton
                Icon={Close}
                iconClassName="text-icon-secondary"
                onClick={() => removeUsherTiers(usherIndex)}
                size="sm"
                variant="ghost"
              />
            </div>
          ))}

          <Button
            className="mt-1 self-start"
            onClick={() => appendUsherTiers({ addr: '' })}
            variant="ghost"
          >
            <Add className="!h-6 !w-6 text-icon-secondary" />
            <p>{t('button.addUsher')}</p>
          </Button>

          {/* <InputErrorMessage
            error={errors.usher_admins?.[tierIndex]?._error}
          /> */}
        </div>
      </div>
    </div>
  )
}
