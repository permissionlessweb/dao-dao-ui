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
  DateTimePicker,
  FormSwitchCard,
  IconButton,
  InputErrorMessage,
  InputLabel,
  NativeCoinSelector,
  NumericInput,
  SelectInput,
  SwitchCard,
  TextInput,
  TokenInput,
  useChain,
  useChainContext,
} from '@dao-dao/stateless'
import { DurationUnits, GenericToken, NewDao } from '@dao-dao/types'
import {
  DISTRIBUTION_COLORS,
  formatDateTimeTz,
  getChainAssets,
  makeValidateAddress,
  validateNonNegative,
  validateRequired,
} from '@dao-dao/utils'

import { CreateEventActionData } from '../CreateEventComponent'
import { useEffect, useState } from 'react'
import { EventSegmentAccessType, EventSegments } from '@dao-dao/types/contracts/CwAve'
import { HugeDecimal } from '@dao-dao/math'


export interface EventTimelineCardProps {
  data: CreateEventActionData
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

export const EventTimelineCard = ({
  // Don't pass along to member.
  remove,

  ...props
}: EventTimelineCardProps) => {
  const {
    data,
    control,
    register,
    watch,
    errors,
    setValue,
    getValues,
    showColorDotOnMember,
    fieldNamePrefix = '',
  } = props

  const { t } = useTranslation()
  const {
    chainId,
    chain: { bech32Prefix },
    nativeToken,
  } = useChainContext()

  const {
    fields: eventSegments,
    append: appendEventSegments,
    remove: removeEventSegments,
  } = useFieldArray({
    control,
    name: (fieldNamePrefix + `event_timeline`) as 'event_timeline',
  })

  const parsedStartDate = Date.parse(watch((fieldNamePrefix + `event_timeline.${0}.start`) as `event_timeline.${number}.start`))
  const startDate = !isNaN(parsedStartDate)
    ? new Date(parsedStartDate)
    : undefined

  const segments =
    startDate &&
    eventSegments.reduce((acc, seg, index): EventSegments[] => {
      // const delayMs = delay.value
      //   ? convertDurationWithUnitsToSeconds(delay) * 1000
      //   : 0

      const lastMs =
        index === 0 ? startDate.getTime() : acc[acc.length - 1].end

      return [
        ...acc,
        {
          end: seg.end,
          stage_description: seg.stage_description,
          start: seg.start,
        },
      ]
    }, [] as EventSegments[])

  const start = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  return (
    <div className="rounded-lg bg-background-tertiary">

      <div className="flex flex-row flex-wrap gap-2">


        {/* Finish Date, once created */}
        {/* {!isCreating && finishDate && (
          <div className="flex max-w-xs flex-col gap-2">
            <InputLabel name={t('form.finishDate')} />
            <DateTimePickerNoForm disabled value={finishDate} />
          </div>
        )} */}
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-3">
        <InputLabel name={t('form.avEventSegments')} primary />

        {eventSegments.map(({ id }, index) => {
          const segmentTimestamp =
            segments && new Date(segments[index].start)

          return (
            <div
              key={id}
              className="flex flex-row flex-wrap items-center gap-2"
            >
              {/* Segment Title */}
              <div className="space-y-2">
                <InputLabel name={t('form.eventSegmentTitle')} />
                <TextInput
                  error={errors?.title}
                  fieldName={(fieldNamePrefix + `event_timeline.${index}.stage_description`) as `event_timeline.${number}.stage_description`}
                  register={register}
                  required
                />
                <InputErrorMessage error={errors?.event_timeline} />
              </div>


              {/* Start Date */}
              <div className="flex max-w-xs flex-col gap-2">
                <InputLabel name={t('form.startDate')} />

                <div className="flex flex-col gap-1">
                  <DateTimePicker
                    control={control}
                    disabled={false}
                    error={errors?.event_timeline}
                    fieldName={(fieldNamePrefix + `event_timeline.${index}.start`) as `event_timeline.${number}.start`}
                    required
                  />+
                  <InputErrorMessage error={errors?.event_timeline} />
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-1">
                {/* Date Preview */}
                {/* <div className="flex flex-row items-end justify-between gap-2">
                  <InputLabel name={'...' + t('form.afterDelay')} />

                  {segmentTimestamp && (
                    <p className="caption-text">
                      ({formatDateTimeTz(segmentTimestamp)})
                    </p>
                  )}
                </div> */}

                {/* End Date */}
                <div className="flex max-w-xs flex-col gap-2">
                  <InputLabel name={t('form.endDate')} />
                  <div className="flex flex-col gap-1">
                    <DateTimePicker
                      control={control}
                      disabled={false}
                      error={errors?.event_timeline}
                      fieldName={(fieldNamePrefix + `event_timeline.${index}.end`) as `event_timeline.${number}.end`}
                      required
                    />
                    <InputErrorMessage error={errors?.event_timeline} />
                  </div>
                </div>

                {/* <InputErrorMessage
                  error={
                    errors?.steps?.[index]?.delay?.value ||
                    errors?.steps?.[index]?.delay?.units
                  }
                /> */}
              </div>

              <IconButton
                Icon={Close}
                className="mt-6"
                onClick={() => removeEventSegments(index)}
                size="sm"
                variant="ghost"
              />
              {/* {isCreating && (
              )} */}
            </div>
          )
        })}

        <Button
          className="self-start"
          onClick={() =>
            appendEventSegments({
              stage_description: '',
              start: `${start.toISOString().split('T')[0]} 12:00 AM`,
            })
          }
          variant="secondary"
        >
          {t('button.addEventSegment')}
        </Button>
        {/* {isCreating && (
        )} */}

        <InputErrorMessage error={errors?.event_timeline} />
      </div>
    </div>
  )
}
