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
import { Action, GenericToken, LoadingDataWithError, NewDao } from '@dao-dao/types'
import {
  DISTRIBUTION_COLORS,
  getChainAssets,
  makeValidateAddress,
  validateNonNegative,
  validateRequired,
} from '@dao-dao/utils'

import { CreateEventActionData } from '../CreateEventComponent'
import { useEffect, useState } from 'react'
import { EventSegmentAccessType } from '@dao-dao/types/contracts/CwAve'
import { HugeDecimal } from '@dao-dao/math'


export interface GuestDetailCardProps {
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
  fieldNamePrefix?: string
  remove?: () => void
}

export const GuestDetailsCard = ({
  // Don't pass along to member.
  remove,

  ...props
}: GuestDetailCardProps) => {
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
    fields: acceptedPaymentCoin,
    append: appendPaymentCoin,
    remove: removePaymentCoin,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + `guest_details.${tierIndex}.ticket_cost`) as `guest_details.${number}.ticket_cost`,
  })

  const tierColor = DISTRIBUTION_COLORS[tierIndex % DISTRIBUTION_COLORS.length]
  const tierVotingWeight = data?.guest_details?.[tierIndex]?.guest_weight ?? 0
  const tierMaxTicketLImit = data.guest_details?.[tierIndex]?.max_ticket_limit ?? 0
  const tierTotalTicketLimit = data.guest_details?.[tierIndex]?.total_ticket_limit ?? 0

  const eventSegments = watch((fieldNamePrefix + 'event_timeline') as 'event_timeline')



  const [specificSegmentAccessTypeVisible, setSpecificSegmentsEventAccessType] = useState(false)
  const availableTokens: GenericToken[] = Object.values(
    Object.fromEntries(
      [
        // First native.
        ...(nativeToken ? [nativeToken] : []),
        // Then the chain assets.
        ...getChainAssets(chainId).filter(
          ({ denomOrAddress }) =>
            !nativeToken || denomOrAddress !== nativeToken.denomOrAddress
        ),
      ].map((token) => [token.denomOrAddress, token])
    )
  )


  // const [defaultsSet, setDefaultsSet] = useState(false)
  // // Set form defaults on load if necessary.
  // useEffect(() => {
  //   if (defaultsSet) {
  //     return
  //   }
  //   console.log("defaults", defaults)
  //   !defaults.errored && !defaults.loading && (
  //     setValue((fieldNamePrefix + 'guest_details') as `guest_details`, defaults.data.defaults.guest_details)
  //   )

  //   setDefaultsSet(true)
  //   // Only run on mount.
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

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
            {data.guest_details?.[tierIndex]?.guest_type?.trim() ||
              t('title.eventGuest', { tier: tierIndex + 1 })}
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
        <div className="flex grow flex-col border-b border-border-secondary p-6 sm:border-r sm:border-b-0">
          <InputLabel
            containerProps={{ className: 'mb-2' }}
            name={t('form.guestTypeTitle')}
            tooltip={t('form.guestTypeTitleTooltip')}
          />

          <TextInput
            error={errors?.guest_details?.[tierIndex]?.guest_type}
            fieldName={(fieldNamePrefix + `guest_details.${tierIndex}.guest_type`) as `guest_details.${number}.guest_type`}
            placeholder={t('form.guestTypeTitle') + '...'}
            register={register}
            validation={[validateRequired]}
          />

          <InputErrorMessage
            error={errors?.guest_details?.[tierIndex]?.guest_type}
          />
        </div>

        <div className="flex grow flex-col p-6">
          <InputLabel
            containerProps={{ className: 'mb-2' }}
            name={t('form.guestWeight')}
            tooltip={t('form.guestWeightTooltip', {
              weight: tierVotingWeight.toLocaleString(),
            })}
          />

          <NumericInput
            error={errors?.guest_details?.[tierIndex]?.guest_weight}
            fieldName={(fieldNamePrefix + `guest_details.${tierIndex}.guest_weight`) as `guest_details.${number}.guest_weight`}
            getValues={getValues}
            min={0}
            numericValue
            register={register}
            setValue={setValue}
            step={1}
            validation={[validateNonNegative, validateRequired]}
          />

          <InputErrorMessage
            error={errors?.guest_details?.[tierIndex]?.guest_weight}
          />
        </div>
        {/* max_ticket_limit */}
        <div className="flex grow flex-col p-6">
          <InputLabel
            containerProps={{ className: 'mb-2' }}
            name={t('form.guestTypeTicketLimit')}
            tooltip={t('form.guestTypeTicketLimitTooltip', {
              weight: tierMaxTicketLImit.toLocaleString(),
            })}
          />

          <NumericInput
            error={errors?.guest_details?.[tierIndex]?.max_ticket_limit}
            fieldName={(fieldNamePrefix + `guest_details.${tierIndex}.max_ticket_limit`) as `guest_details.${number}.max_ticket_limit`}
            getValues={getValues}
            min={0}
            numericValue
            register={register}
            setValue={setValue}
            step={1}
            validation={[validateNonNegative, validateRequired]}
          />

          <InputErrorMessage
            error={errors?.guest_details?.[tierIndex]?.max_ticket_limit}
          />
        </div>
        {/* total_ticket_limit */}
        <div className="flex grow flex-col p-6">
          <InputLabel
            containerProps={{ className: 'mb-2' }}
            name={t('form.guestTypeTotalTicketLimit')}
            tooltip={t('form.guestTypeTotalTicketLimitTooltip', {
              weight: tierTotalTicketLimit.toLocaleString(),
            })}
          />

          <NumericInput
            error={errors?.guest_details?.[tierIndex]?.total_ticket_limit}
            fieldName={(fieldNamePrefix + `guest_details.${tierIndex}.total_ticket_limit`) as `guest_details.${number}.total_ticket_limit`}
            getValues={getValues}
            min={0}
            numericValue
            register={register}
            setValue={setValue}
            step={1}
            validation={[validateNonNegative, validateRequired]}
          />

          <InputErrorMessage
            error={errors?.guest_details?.[tierIndex]?.total_ticket_limit}
          />
        </div>
      </div>
      {/* event_segment_access */}
      <div className="flex flex-row flex-wrap gap-4">
        <SwitchCard
          containerClassName="self-start mt-2"
          enabled={specificSegmentAccessTypeVisible}
          label={t('form.eligibleEventSegments')}
          onClick={() => {
            const newValue = !specificSegmentAccessTypeVisible;
            console.log("CLICKED EVENT SEGMENT DATA:", data)
            console.log("specificSegmentAccessTypeVisible:", specificSegmentAccessTypeVisible)
            console.log("eventSegments:", eventSegments)
            if (newValue) {
              setValue((fieldNamePrefix + `guest_details.${tierIndex}.event_segment_access`) as `guest_details.${number}.event_segment_access`, {
                specific_segments: { ids: [] }
              });
            } else {
              // Set to "single_segment" with empty object
              setValue((fieldNamePrefix + `guest_details.${tierIndex}.event_segment_access`) as `guest_details.${number}.event_segment_access`, {
                single_segment: {}
              });
            }
            setSpecificSegmentsEventAccessType(newValue);
            console.log("AFTER CLICK:", data)
            console.log("watchEventSegments AFTER:", eventSegments)

          }}
          sizing="md"
          tooltip={t('form.guestTypeEventSegmentAccessTooltip')}
          tooltipIconSize="sm"
        />
        {specificSegmentAccessTypeVisible &&
          <>
            {eventSegments?.map((es, index) => (
              <div
                key={index}
                className="flex flex-row items-center gap-4 rounded-lg bg-background-secondary p-4"
              >
                {/* on click, set add this event segment to the form for this guest type */}
                <IconButton
                  Icon={Close}
                  iconClassName="text-icon-secondary"
                  onClick={() => {
                    const currentValue = getValues((fieldNamePrefix + `guest_details.${tierIndex}.event_segment_access`) as `guest_details.${number}.event_segment_access`);
                    if ('specific_segments' in currentValue) {
                      setValue(
                        (fieldNamePrefix + `guest_details.${tierIndex}.event_segment_access`) as `guest_details.${number}.event_segment_access`,
                        { specific_segments: { ids: currentValue.specific_segments.ids } }
                      );
                    }
                  }}
                  size="sm"
                  variant="ghost"
                > {es.stage_description}</IconButton>
              </div>
            ))}
          </>}
      </div>

      <div className="flex flex-col border-t border-border-secondary p-6">
        <InputLabel
          containerProps={{ className: 'mb-2' }}
          name={t('title.acceptedPayment')}
        />

        <div className="flex flex-row flex-wrap items-end justify-between gap-6">
          <div className="flex grow flex-col gap-1">
            <div className="flex flex-col items-stretch gap-2">
              {acceptedPaymentCoin.map(({ id }, index) => {
                const denom = watch((fieldNamePrefix + `guest_details.${tierIndex}.ticket_cost.${index}.denom`) as `guest_details.${number}.ticket_cost.${number}.denom`)
                const selectedToken = availableTokens.find(
                  ({ denomOrAddress }) => denomOrAddress === denom
                )
                if (!selectedToken) {
                  return null
                }

                return (
                  <div
                    key={id}
                    className="flex flex-row items-center gap-2"
                  >
                    <TokenInput
                      amount={{
                        watch,
                        setValue,
                        getValues,
                        register,
                        fieldName: (fieldNamePrefix + `guest_details.${tierIndex}.ticket_cost.${index}.amount`) as `guest_details.${number}.ticket_cost.${number}.amount`,
                        error: errors?.guest_details?.[tierIndex]?.ticket_cost,
                        min: HugeDecimal.one.toHumanReadableNumber(
                          selectedToken.decimals
                        ),
                        step: HugeDecimal.one.toHumanReadableNumber(
                          selectedToken.decimals
                        ),
                      }}
                      onSelectToken={({
                        denomOrAddress,
                        decimals,
                      }) => {
                        setValue(
                          (fieldNamePrefix + `guest_details.${tierIndex}.ticket_cost.${index}.denom`) as `guest_details.${number}.ticket_cost.${number}.denom`,
                          denomOrAddress
                        )
                        // setValue(
                        //   (
                        //     `guest_details.${tierIndex}.ticket_cost`),
                        //   decimals
                        // )
                      }}
                      selectedToken={selectedToken}
                      tokens={{
                        loading: false,
                        data: availableTokens,
                      }}
                    />

                    <IconButton
                      Icon={Close}
                      onClick={() => removePaymentCoin(index)}
                      size="sm"
                      variant="ghost"
                    />
                  </div>
                )
              })}


              <Button
                className="self-start"
                onClick={() =>
                  appendPaymentCoin({
                    amount: '1',
                    denom: nativeToken?.denomOrAddress || '',
                  })
                }
                variant="secondary"
              >
                {t('button.addAcceptedPayment')}
              </Button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
