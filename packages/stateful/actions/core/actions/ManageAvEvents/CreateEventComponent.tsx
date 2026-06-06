
import {
    Add,
    ArrowRightAltRounded,
    Close,
    SubdirectoryArrowRightRounded,
} from '@mui/icons-material'
import { ComponentType, useCallback, useEffect, useRef, useState } from 'react'
import { FieldArrayPath, FieldArrayWithId, FieldErrors, InternalFieldName, Message, Path, PathValue, UnpackNestedValue, useFieldArray, useFormContext, UseFormRegisterReturn, Validate, ValidationRule } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import {
    DaoDaoCoreSelectors,
    genericTokenBalancesSelector,
} from '@dao-dao/state/recoil'
import {
    Button,
    DaoSupportedChainPickerInput,
    IconButton,
    InputErrorMessage,
    InputLabel,
    StatusCard,
    TextAreaInput,
    TextInput,
    TokenInput,
    useActionOptions,
    useCachedLoading,
    useChain,
    useInitializedActionForKey,
} from '@dao-dao/stateless'
import {
    ActionChainContextType,
    ActionComponentProps,
    ActionContextType,
    ActionKey,
    AddressInputProps,
    EntityType,
    GenericTokenBalanceWithOwner,
    TokenType,
    AvEventModuleData,
    StatefulEntityDisplayProps,
    DurationWithUnits,
    Action,
} from '@dao-dao/types'

import {
    getChainAddressForActionOptions,
    getChainForChainId,
    getDisplayNameForChainId,
    getNativeTokenForChainId,
    getSupportedChainConfig,
    isValidBech32Address,
    makeValidateAddress,
    validateRequired,
} from '@dao-dao/utils'

import { useEntity, useWallet } from '../../../../hooks'

import { InstantiateMsg as CwAveInitMsg, EventSegments, GuestDetails } from '@dao-dao/types/contracts/CwAve'
import { Member } from '@dao-dao/types/contracts/Cw4Group'
import { AddressInput } from '../../../../components'
import { GuestDetailsCard } from './components/GuestDetailCard'
import { UsherDetailsCard } from './components/UsherDetailCard'
import { EventTimelineCard } from './components/EventTimelineCard'
import cloneDeep from 'lodash.clonedeep'


export type TokenToShit = {
    denomOrAddress: string
    type: TokenType
    chainId: string
}

export type CreateEventActionData = {
    chainId: string
    cw420: number;
    description: string;
    event_curator: string;
    event_timeline: EventSegments[];
    guest_details: GuestDetails[];
    title: string;
    usher_admins: AdminTierHelper[];
}
export interface AdminTierHelper {
    weight: number
    addr: Member[]
}
export interface EventSegmentData {
    stage_description: string,
    delay: DurationWithUnits
}

export type CreateEventOptions = {
    // If undefined, no widget is setup, and begin vesting should be disabled.
    moduleData: AvEventModuleData | undefined
    tokens: GenericTokenBalanceWithOwner[]
    AddressInput: ComponentType<AddressInputProps<CreateEventActionData>>
    EntityDisplay: ComponentType<StatefulEntityDisplayProps>

}

export const CreateEvent: ComponentType<ActionComponentProps<CreateEventOptions>> = ({
    fieldNamePrefix,
    allActionsWithData,
    isCreating,
    index: actionIndex,
    errors,
    options: { moduleData, tokens },
    remove,
    addAction,
    ...props
}) => {
    // If widget not set up, don't render anything because create event cannot be
    // used.
    if (!moduleData) {
        return null
    }

    const { t } = useTranslation()
    const actionOptions = useActionOptions()
    const {
        context,
        chainContext,
        chain: { chainId: nativeChainId },
    } = actionOptions


    if (chainContext.type !== ActionChainContextType.Supported) {
        throw new Error('Unsupported chain context')
    }

    // get connected wallet balance info
    const { address: walletAddress, getSigningClient } = useWallet()
    const { chainId, bech32Prefix } = useChain()

    // create forms
    const {
        control,
        register,
        watch,
        setValue,
        setError,
        getValues,
        resetField,
        reset,
        clearErrors,
    } = useFormContext<CreateEventActionData>()

    const watchChainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
    const watchTitle = watch((fieldNamePrefix + 'title') as 'title')
    const watchCurator = watch((fieldNamePrefix + 'event_curator') as 'event_curator')
    const watchEventTimeline = watch((fieldNamePrefix + 'event_timeline') as 'event_timeline')

    const {
        fields: watchEventTimelineFields,
        append: appendEventTimelines,
        remove: removeEventTimelines,
    } = useFieldArray({
        control,
        name: (fieldNamePrefix + 'event_timeline') as 'event_timeline',
    })

    const {
        fields: watchGuestDetailsFields,
        append: appendGuestDetails,
        remove: removeGuestDetails,
    } = useFieldArray({
        control,
        name: (fieldNamePrefix + 'guest_details') as 'guest_details',
    })

    const {
        fields: watchUsherAdminsFields,
        append: appendUsherAdmins,
        remove: removeUsherAdmins,
    } = useFieldArray({
        control,
        name: (fieldNamePrefix + 'usher_admins') as 'usher_admins',
    })

    useEffect(() => {
        console.log("watchEventTimeline", watchEventTimeline)
    }, [watchEventTimeline])

    useEffect(() => {
        console.log("props.data", props.data)
    }, [props.data])

    const addEventGuestTypeRef = useRef<HTMLButtonElement>(null)
    const addGuestType = useCallback(() => {

        appendGuestDetails({
            event_segment_access: {
                single_segment: {}
            }
        })
    }, [appendGuestDetails])
    const nativeToken = getNativeTokenForChainId(watchChainId)
    const currentChain = getChainForChainId(watchChainId)

    const chainAccounts = context.accounts.filter(
        (a) => a.chainId === watchChainId
    )
    const chainAddressOwner = getChainAddressForActionOptions(
        actionOptions,
        watchChainId
    )

    const avEventFactoryExists = !!moduleData?.deployers?.[watchChainId]
    const crossChainAccountActionExists = allActionsWithData.some(
        (action) => action.actionKey === ActionKey.ManageAvEvents
    )

    // A DAO can create a avEvent  factory on the current chain and any
    // polytone connection that is also a supported chain (since the avEvent
    // factory+contract only exists on supported chains).
    const possibleChainIds = [
        nativeChainId,
        ...Object.keys(chainContext.config.polytone || {}).filter((chainId) =>
            getSupportedChainConfig(chainId)
        ),
    ]

    // Only set defaults once.
    // const [defaultsSet, setDefaultsSet] = useState(
    //     !!watchSelfEntity && !!watchShitstrapOwner
    // )


    const { entity: walletEntity } = useEntity(
        walletAddress
            ? isValidBech32Address(walletAddress, bech32Prefix)
                ? walletAddress
                : ''
            : ''
    )



    useEffect(() => {
        console.log("guestDetailCardData:", props.data)
    }, [])


    // Load balances as loadables since they refresh automatically on a timer.
    // const currentWalletTokenBalances = useCachedLoading(
    //     walletAddress &&
    //         !walletEntity.loading &&
    //         walletEntity.data &&
    //         currentEntityDAOTokenLoadable.state !== 'loading'
    //         ? genericTokenBalancesSelector({
    //             chainId: walletEntity.data.chainId,
    //             address: walletEntity.data.address,
    //             cw20GovernanceTokenAddress: undefined,
    //             filter: {
    //                 account: {
    //                     chainId: watchChainId,
    //                     address: walletAddress,
    //                 },
    //             },
    //         })
    //         : undefined,
    //     []
    // )


    return (
        <>
            <p className="max-w-prose">{t('info.avEventExplanation')}</p>
            <div className="flex  flex-col gap-4">
                {isCreating && !avEventFactoryExists && (
                    <StatusCard
                        className="max-w-lg"
                        content={t('info.avEventFactoryNeeded', {
                            chain: getDisplayNameForChainId(watchChainId),
                        })}
                        style="warning"
                    >
                        {/* {console.log("crossChainAccountActionExists", crossChainAccountActionExists)}
                {console.log("configureCreateShitStrapActionDefaults", configureCreateShitStrapActionDefaults)} */}
                        <Button
                            disabled={avEventFactoryExists}
                            onClick={() => {
                                remove()
                                addAction(
                                    {
                                        actionKey: ActionKey.ManageAvEvents,
                                        data: {},
                                    },
                                    actionIndex
                                )
                            }}
                            variant="primary"
                        >
                            {avEventFactoryExists
                                ? t('button.shitstrapManagerSetupActionAdded')
                                : t('button.addShitstrapManagerSetupAction')}
                        </Button>
                    </StatusCard>
                )}
                <div className="space-y-2">
                    <InputLabel name={t('form.title')} />
                    <TextInput
                        disabled={!isCreating}
                        error={errors?.title}
                        fieldName={(fieldNamePrefix + 'title') as 'title'}
                        register={register}
                        required
                    />
                    <InputErrorMessage error={errors?.title} />
                </div>


                {/* evemt ushers */}
                {watchUsherAdminsFields.map(({ id }, etIndex) => (
                    <div
                        key={id}
                        className="flex flex-row items-center gap-2"
                    >
                        <UsherDetailsCard
                            data={props.data}
                            fieldNamePrefix={fieldNamePrefix}
                            tierIndex={etIndex}
                            showColorDotOnMember={false}
                            control={control}
                            register={register}
                            watch={watch}
                            errors={errors?.create}
                            setValue={setValue}
                            getValues={getValues}
                        />


                        {isCreating && (
                            <IconButton
                                Icon={Close}
                                onClick={() => removeUsherAdmins(etIndex)}
                                size="sm"
                                variant="ghost"
                            />
                        )}
                    </div>
                ))}

                {/* evemt timeline */}
                <EventTimelineCard data={props.data}
                    fieldNamePrefix={fieldNamePrefix}
                    showColorDotOnMember={false}
                    control={control}
                    register={register}
                    watch={watch}
                    errors={errors?.create}
                    setValue={setValue}
                    getValues={getValues}
                />



                {/* guest details */}
                {watchGuestDetailsFields.map(({ id }, index) => (
                    <div
                        key={id}
                        className="flex flex-row items-center gap-2"
                    >
                        <GuestDetailsCard
                            fieldNamePrefix={fieldNamePrefix}
                            data={props.data}
                            tierIndex={index}
                            showColorDotOnMember={false}
                            control={control}
                            register={register}
                            watch={watch}
                            errors={errors?.create}
                            setValue={setValue}
                            getValues={getValues}
                        />

                        {isCreating && (
                            <IconButton
                                Icon={Close}
                                onClick={() => removeGuestDetails(index)}
                                size="sm"
                                variant="ghost"
                            />
                        )}
                    </div>
                ))}

                <div className="flex flex-col">
                    <Button
                        className="self-start"
                        onClick={addGuestType}
                        ref={addEventGuestTypeRef}
                        variant="secondary"
                    >
                        <Add className="!h-6 !w-6 text-icon-primary" />
                        <p>{t('button.addTier')}</p>
                    </Button>

                    <InputErrorMessage error={errors?.create?.data?._tiersError} />
                </div>


                {(errors?.amount || errors?.denomOrAddress || errors?.recipient) && (
                    <div className="space-y-1">
                        <InputErrorMessage error={errors?.amount} />
                        <InputErrorMessage error={errors?.denomOrAddress} />
                        <InputErrorMessage error={errors?.recipient} />
                    </div>
                )}
            </div>

        </>
    )
}
