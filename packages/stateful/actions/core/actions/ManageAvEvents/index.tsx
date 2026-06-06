import { useQueries, useQueryClient } from '@tanstack/react-query'
import { ComponentType, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  chainQueries,
  cw1WhitelistExtraQueries,
  cwAveFactoryExtraQueries,
  cwAveQueries,
  cwPayrollFactoryQueries,
  cwVestingExtraQueries,
  tokenQueries,
} from '@dao-dao/state/query'
import {
  ActionBase,
  Loader,
  MoneyWingsEmoji,
  SegmentedControls,
  useActionOptions,
  useInitializedActionForKey,
} from '@dao-dao/stateless'
import {
  AvEventInstance,
  AvEventModuleData,
  AvEventsMode,
  DurationUnits,
  DurationWithUnits,
  ModuleId,
  SegmentedControlsProps,
  TokenType,
  TypedOption,
  UnifiedCosmosMsg,
  VestingContractVersion,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionComponentProps,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import { InstantiateMsg as CwAveInitMsg, EventSegmentAccessType } from '@dao-dao/types/contracts/CwAve'
import { ArrayOfAvEventContract, ExecuteMsg as CwAveFactoryExecuteMsg } from '@dao-dao/types/contracts/CwAveFactory'
import {
  chainIsIndexed,
  convertDurationWithUnitsToSeconds,
  convertSecondsToDurationWithUnits,
  decodeJsonFromBase64,
  encodeJsonToBase64,
  getChainAddressForActionOptions,
  getDisplayNameForChainId,
  getNativeTokenForChainId,
  isValidBech32Address,
  makeCombineQueryResultsIntoLoadingDataWithError,
  makeExecuteSmartContractMessage,
  maybeMakePolytoneExecuteMessages,
  mustGetSupportedChainConfig,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  AddressInput,
  EntityDisplay,
  SuspenseLoader,
  Trans,
  VestingPaymentCard,
} from '../../../../components'
import {
  useCreateCw1Whitelist,
  useQueryLoadingData,
  useQueryLoadingDataWithError,
} from '../../../../hooks'
import { useModule } from '../../../../modules'
import { useTokenBalances } from '../../../hooks/useTokenBalances'
import { AdminTierHelper, CreateEvent, CreateEventActionData, CreateEventOptions } from './CreateEventComponent'
import { PsychologyAltTwoTone } from '@mui/icons-material'


// export type ManageAvEventsData = {
//   mode: 'begin' | 'cancel' | 'registerSlash'
//   begin: BeginVestingData
//   cancel: CancelVestingData
//   registerSlash: RegisterSlashData
// }

export type ManageAvEventsData = {
  mode: 'create'
  create: CreateEventActionData
  // usher: UsherComponentActionData
  // guest: EventGuestActionData
}

// const instantiateStructure = {
//   instantiate_msg: {
//     denom: {},
//     recipient: {},
//     schedule: {},
//     title: {},
//     total: {},
//     unbonding_duration_seconds: {},
//     vesting_duration_seconds: {},
//   },
//   label: {},
// }

// init event json object
const initEventStructure = {
  instantiate_msg: {
    cw420: {},
    description: {},
    event_curator: {},
    event_timeline: {},
    guest_details: {},
    title: {},
    usher_admins: {},
  },
  label: {},
}


/**
 * Get vesting sources from module data.
 */
const getAvEventSourcesFromModuleData = (
  options: ActionOptions,
  moduleData: AvEventModuleData
) =>
  moduleData.deployers
    ? Object.fromEntries(
      Object.entries(moduleData.deployers).map(
        ([chainId, { address: factory, version }]) => [
          chainId,
          {
            owner: getChainAddressForActionOptions(options, chainId) || '',
            factory,
            version,
          },
        ]
      )
    )
    : // If the factories are undefined, this DAO is using an old version
    // of the vesting module which only allows a single factory on the
    // same chain as the DAO. If module data is undefined, this is being
    // used by a wallet.
    {
      [options.chain.chainId]: {
        owner: options.address,
        factory: moduleData.deployer,
        version: moduleData.version,
      },
    }

/**
 * Get queries for the vesting infos owned by (and thus can be canceled by) the
 * current entity using this action, unless the chain is not indexed, in which
 * case fetch from the registered factories. These vests may or may not have
 * been created by the current entity, since someone can set another entity as
 * an owner/canceler of a vesting contract.
 */
const getAvEventInfoOwnedByEntityQueries = (
  options: ActionOptions,
  moduleData?: AvEventModuleData
) => {
  const sources =
    moduleData && getAvEventSourcesFromModuleData(options, moduleData)
  return options.context.accounts.flatMap(({ chainId, address }) =>
    // chainIsIndexed(chainId)
    //   ? cwAveFactoryExtraQueries.vestingInfosOwnedBy(options.queryClient, {
    //     address,
    //     chainId,
    //   })
    //   : // Fallback to factory query for this chain if no indexer. This is limited as vesting payments created by other entities will not load, even if the current entity has the power to cancel.
    sources?.[chainId]?.factory
      ? cwAveFactoryExtraQueries.listAllAveContracts(options.queryClient, {
        chainId,
        address: sources[chainId].factory!,
      })
      : []
  )
}

/**
 * Get the vesting infos owned by (and thus can be canceled by) the current
 * entity executing an action. These may or may not have been created by the
 * current entity, since someone can set another entity as an owner/canceler of
 * a vesting contract.
 */
const useAvEventInstances = () => {
  const options = useActionOptions()
  return useQueries({
    queries: getAvEventInfoOwnedByEntityQueries(options),
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      transform: (infos) => infos.flat(),
    }),
  })
}

const Component: ComponentType<
  ActionComponentProps<undefined, ManageAvEventsData> & {
    moduleData?: AvEventModuleData
  }
> = ({ moduleData, ...props }) => {
  const { t } = useTranslation()
  const { chain: { chainId: nativeChainId } } = useActionOptions()
  const { setValue, watch, setError, clearErrors, trigger } = useFormContext<ManageAvEventsData>()
  const mode = watch((props.fieldNamePrefix + 'mode') as 'mode')
  const selectedChainId = watch((props.fieldNamePrefix + 'create.chainId') as 'create.chainId')

  // mode === 'create'
  //   ? watch((props.fieldNamePrefix + 'create.chainId') as 'create.chainId')
  //   : mode === 'registerSlash'
  //     ? watch(
  //       (props.fieldNamePrefix +
  //         'registerSlash.chainId') as 'registerSlash.chainId'
  //     )
  //     : mode === 'cancel'
  //       ? watch(
  //         (props.fieldNamePrefix + 'cancel.chainId') as 'cancel.chainId'
  //       )
  //       : undefined
  // const selectedAddress =
  //   mode === 'registerSlash'
  //     ? watch(
  //       (props.fieldNamePrefix +
  //         'registerSlash.address') as 'registerSlash.address'
  //     )
  //     : mode === 'cancel'
  //       ? watch((props.fieldNamePrefix + 'cancel.address') as 'cancel.address')
  //       : undefined
  // const beginOwnerMode = watch(
  //   (props.fieldNamePrefix + 'begin.ownerMode') as 'begin.ownerMode'
  // )
  // const beginManyOwnersCw1WhitelistContract = watch(
  //   (props.fieldNamePrefix +
  //     'begin.manyOwnersCw1WhitelistContract') as 'begin.manyOwnersCw1WhitelistContract'
  // )

  const tokenBalances = useTokenBalances()

  // Only used on pre-v1 vesting modules.
  // const queryClient = useQueryClient()
  // const preV1VestingFactoryOwner = useQueryLoadingDataWithError(
  //   moduleData && !moduleData.version && moduleData.factory
  //     ? cwPayrollFactoryQueries.ownership(queryClient, {
  //       chainId: nativeChainId,
  //       contractAddress: moduleData.factory,
  //     })
  //     : undefined,
  //   ({ owner }) => owner || null
  // )

  const vestingInfos = useAvEventInstances()

  // const didSelectVest =
  //   !props.isCreating &&
  //   (mode === 'create') &&
  //   !!selectedChainId
  // // && !!selectedAddress
  // const selectedVest = useQueryLoadingData(
  //   didSelectVest
  //     ? cwAveQueries.eventInstance(queryClient, {
  //       chainId: selectedChainId,
  //       connectedAddr: selectedAddress,
  //       c
  //     })
  //     : undefined,
  //   undefined as AvEventInstance | undefined
  // )

  // Prevent action from being submitted if no address is selected while we're
  // registering slash or cancelling.
  // useEffect(() => {
  //   if (mode !== 'registerSlash' && mode !== 'cancel') {
  //     clearErrors(
  //       (props.fieldNamePrefix +
  //         'registerSlash.address') as 'registerSlash.address'
  //     )
  //     clearErrors(
  //       (props.fieldNamePrefix + 'cancel.address') as 'cancel.address'
  //     )
  //     return
  //   }
  //   // Make sure to clear errors for other modes on switch.
  //   else if (mode === 'registerSlash') {
  //     clearErrors(
  //       (props.fieldNamePrefix + 'cancel.address') as 'cancel.address'
  //     )
  //   } else if (mode === 'cancel') {
  //     clearErrors(
  //       (props.fieldNamePrefix +
  //         'registerSlash.address') as 'registerSlash.address'
  //     )
  //   }

  //   if (!selectedAddress || !isValidBech32Address(selectedAddress)) {
  //     setError(
  //       (props.fieldNamePrefix + `${mode}.address`) as `${typeof mode}.address`,
  //       {
  //         type: 'manual',
  //         message: t('error.noVestingContractSelected'),
  //       }
  //     )
  //   } else {
  //     clearErrors(
  //       (props.fieldNamePrefix + `${mode}.address`) as `${typeof mode}.address`
  //     )
  //   }
  // }, [setError, clearErrors, props.fieldNamePrefix, t, mode, selectedAddress])

  const tabs: SegmentedControlsProps<ManageAvEventsData['mode']>['tabs'] = [
    // Only allow beginning a vest if module is setup.
    ...(moduleData
      ? ([
        {
          label: t('title.createAvEvent'),
          value: 'create',
        },
      ] as TypedOption<ManageAvEventsData['mode']>[])
      : []),
    // {
    //   label: t('title.cancelVesting'),
    //   value: 'cancel',
    // },
    // {
    //   label: t('title.registerSlash'),
    //   value: 'registerSlash',
    // },
  ]
  const selectedTab = tabs.find((tab) => tab.value === mode)


  // const {
  //   creatingCw1Whitelist: creatingCw1WhitelistOwners,
  //   createCw1Whitelist: createCw1WhitelistOwners,
  // } = useCreateCw1Whitelist({
  //   // Trigger veto address field validations.
  //   validation: async () => {
  //     if (beginOwnerMode !== 'many') {
  //       throw new Error(t('error.unexpectedError'))
  //     }

  //     await trigger(
  //       (props.fieldNamePrefix + 'begin.manyOwners') as 'begin.manyOwners',
  //       {
  //         shouldFocus: true,
  //       }
  //     )
  //   },
  //   contractLabel: 'Vesting Multi-Owner cw1-whitelist',
  // })

  // Prevent action from being submitted if the cw1-whitelist contract has not
  // yet been created and it needs to be.
  // useEffect(() => {
  //   if (beginOwnerMode === 'many' && !beginManyOwnersCw1WhitelistContract) {
  //     setError(
  //       (props.fieldNamePrefix +
  //         'begin.manyOwnersCw1WhitelistContract') as 'begin.manyOwnersCw1WhitelistContract',
  //       {
  //         type: 'manual',
  //         message: t('error.accountListNeedsSaving'),
  //       }
  //     )
  //   } else {
  //     clearErrors(
  //       (props.fieldNamePrefix +
  //         'begin.manyOwnersCw1WhitelistContract') as 'begin.manyOwnersCw1WhitelistContract'
  //     )
  //   }
  // }, [
  //   setError,
  //   clearErrors,
  //   t,
  //   beginOwnerMode,
  //   beginManyOwnersCw1WhitelistContract,
  //   props.fieldNamePrefix,
  // ])

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={
        // Manually trigger loader.
        tokenBalances.loading
      }
    >
      {/* {props.isCreating ? (
        <SegmentedControls<ManageAvEventsData['mode']>
          className="mb-2"
          onSelect={(value) =>
            setValue((props.fieldNamePrefix + 'mode') as 'mode', value)
          }
          selected={mode}
          tabs={tabs}
        />
      ) : (
        <p className="title-text mb-2">{selectedTab?.label}</p>
      )} */}

      {mode === 'create' ? (
        <CreateEvent
          {...props}
          errors={props.errors?.create}
          fieldNamePrefix={props.fieldNamePrefix + 'create.'}
          options={{
            moduleData: moduleData,
            tokens: tokenBalances.loading ? [] : tokenBalances.data,
            // preV1VestingFactoryOwner,
            AddressInput,
            EntityDisplay,
            // createCw1WhitelistOwners,
            // creatingCw1WhitelistOwners,
          }}
        />
        // )
        // : mode === 'registerSlash' ? (
        //   <RegisterSlash
        //     {...props}
        //     errors={props.errors?.registerSlash}
        //     fieldNamePrefix={props.fieldNamePrefix + 'registerSlash.'}
        //     options={{
        //       vestingInfos,
        //       selectedVest: didSelectVest
        //         ? selectedVest
        //         : {
        //           loading: false,
        //           data: undefined,
        //         },
        //       EntityDisplay,
        //       Trans,
        //     }}
        //   />
        // ) : mode === 'cancel' ? (
        //   <CancelVesting
        //     {...props}
        //     errors={props.errors?.cancel}
        //     fieldNamePrefix={props.fieldNamePrefix + 'cancel.'}
        //     options={{
        //       vestingInfos,
        //       cancelledVestingContract: didSelectVest
        //         ? selectedVest
        //         : {
        //           loading: false,
        //           data: undefined,
        //         },
        //       EntityDisplay,
        //       VestingPaymentCard,
        //     }}
        //   />
      ) : null}
    </SuspenseLoader>
  )
}

// Only check if module exists in DAOs.
const DaoComponent: ActionComponent<undefined, ManageAvEventsData> = (props) => {
  const moduleData = useModule<AvEventModuleData>(
    ModuleId.AvEvents
  )?.daoModule.values

  return <Component {...props} moduleData={moduleData} />
}

const WalletComponent: ActionComponent<undefined, ManageAvEventsData> = (
  props
) => <Component {...props} />

export class ManageAvEventsAction extends ActionBase<ManageAvEventsData> {
  public readonly key = ActionKey.ManageAvEvents
  public readonly Component: ActionComponent<undefined, ManageAvEventsData>

  private eventInstancesOwnedByEntity: { chainId: string; contracts: ArrayOfAvEventContract; }[] = []
  private moduleData?: AvEventModuleData

  constructor(options: ActionOptions) {
    super(options, {
      Icon: PsychologyAltTwoTone, //   RedeemTwoTone, WatchOffTwoTone,GrassTwoTone
      label: options.t('title.avEvents'),
      description: options.t('info.avEventsDescription'),
      // Hide until ready. Update this in setup.
      hideFromPicker: true,
    })

    this.Component =
      options.context.type === ActionContextType.Dao
        ? DaoComponent
        : WalletComponent

    this.moduleData =
      options.context.type === ActionContextType.Dao
        ? options.context.dao.modules.find(
          ({ id }) => id === ModuleId.AvEvents
        )?.values
        : undefined

    // Fire async init immediately since we may hide this action.
    this.init().catch(() => { })
  }

  async setup() {
    this.eventInstancesOwnedByEntity = (
      await Promise.all(
        getAvEventInfoOwnedByEntityQueries(this.options).map((query) =>
          this.options.queryClient.fetchQuery(query)
        )
      )
    ).flat()

    // Don't show if vesting payment module is not enabled (for DAOs) and this
    // entity owns no vesting payments.
    this.metadata.hideFromPicker =
      (this.options.context.type !== ActionContextType.Dao ||
        !this.moduleData) &&
      this.eventInstancesOwnedByEntity.length === 0

    // Default start to 7 days from now.
    const start = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    const { codeIds } = mustGetSupportedChainConfig(this.options.chain.chainId)

    this.defaults = {
      // Cannot use begin if no module setup, so default to cancel if no data.
      mode: this.moduleData ? 'create' : 'create',
      create: {
        chainId: this.options.chain.chainId,
        cw420: codeIds.Cw4Group,
        description: '',
        event_curator: this.options.address,
        event_timeline: [{
          stage_description: '',
          start: `${start.toISOString().split('T')[0]} 12:00 AM`,
          end: '',
        }],
        guest_details: [{
          event_segment_access: {
            single_segment: {},
          },
          guest_type: '',
          guest_weight: 0,
          max_ticket_limit: 0,
          ticket_cost: [],
          total_ticket_limit: 0
        }],
        title: '',
        usher_admins: []
      },

    }
  }

  async encode({
    mode,
    create,

  }: ManageAvEventsData): Promise<UnifiedCosmosMsg[]> {
    let chainId: string
    let cosmosMsg: UnifiedCosmosMsg

    // Can only begin a vest if there is module data available.
    if (mode === 'create' && this.moduleData) {
      chainId = create.chainId

      const avEventSource = getAvEventSourcesFromModuleData(
        this.options,
        this.moduleData
      )[chainId]
      if (!avEventSource?.factory) {
        throw new Error(
          this.options.t('error.noChainEventFactoryContract', {
            chain: getDisplayNameForChainId(chainId),
          })
        )
      }


      // todo
      const instantiateMsg: CwAveInitMsg = {
        event_curator: create.event_curator,
        description: create.description,
        title: create.title,
        usher_admins: create.usher_admins.flatMap(tier =>
          tier.addr.map(address => ({
            addr: address.addr,
            weight: tier.weight
          }))
        ),
        guest_details: create.guest_details,
        cw420: create.cw420,
        event_timeline: create.event_timeline.map(tl => (
          {
            stage_description: tl.stage_description,
            start: Date.parse(tl.start).toString(),
            end: Date.parse(tl.end).toString(),
          }
        )),
      }

      const msg = {
        instantiate_msg: instantiateMsg,
        label: `av_event_curated_by_ ${create.event_curator}_${Date.now()}` //,
      }


      cosmosMsg = makeExecuteSmartContractMessage({
        chainId,
        contractAddress: avEventSource.factory,
        sender: avEventSource.owner,
        msg: {
          create_native_av_event_contract: msg,
        } as CwAveFactoryExecuteMsg,
        funds: [],
        // funds: total.toCoins(create.tokenToShit.denomOrAddress),
      })

    }
    // else if (mode === 'cancel' || mode === 'registerSlash') {
    //   chainId = mode === 'cancel' ? cancel.chainId : registerSlash.chainId

    //   const contractAddress =
    //     mode === 'cancel' ? cancel.address : registerSlash.address

    //   const vestingInfo = this.vestingInfosOwnedByEntity.find(
    //     ({ vestingContractAddress }) =>
    //       vestingContractAddress === contractAddress
    //   )
    //   if (!vestingInfo) {
    //     throw new Error(this.options.t('error.noVestingContractSelected'))
    //   }

    //   const from = getChainAddressForActionOptions(this.options, chainId)
    //   if (!from) {
    //     throw new Error(this.options.t('error.loadingData'))
    //   }

    //   const viaCw1Whitelist =
    //     !!vestingInfo.owner?.isCw1Whitelist &&
    //     vestingInfo.owner.cw1WhitelistAdmins.includes(from)

    //   const msg = makeExecuteSmartContractMessage({
    //     chainId,
    //     contractAddress,
    //     sender: viaCw1Whitelist ? vestingInfo.owner!.address : from,
    //     msg:
    //       mode === 'cancel'
    //         ? {
    //           cancel: {},
    //         }
    //         : {
    //           register_slash: {
    //             validator: registerSlash.validator,
    //             time: registerSlash.time,
    //             amount: registerSlash.amount,
    //             during_unbonding: registerSlash.duringUnbonding,
    //           },
    //         },
    //   })

    //   cosmosMsg = viaCw1Whitelist
    //     ? // Wrap in cw1-whitelist execute.
    //     makeExecuteSmartContractMessage({
    //       chainId,
    //       contractAddress: vestingInfo.owner!.address,
    //       sender: from,
    //       msg: {
    //         execute: {
    //           msgs: [msg],
    //         },
    //       },
    //     })
    //     : msg
    // } 
    else {
      throw new Error(this.options.t('error.unexpectedError'))
    }

    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chainId,
      chainId,
      cosmosMsg
    )
  }

  // helper to be used in match and decode
  breakDownMessage({ decodedMessage, account: { chainId } }: ProcessedMessage) {
    const isNativeCreateEvent =
      objectMatchesStructure(decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              create_native_av_event_contract: initEventStructure,
            },
          },
        },
      }) &&
      decodedMessage.wasm.execute.funds.length === 1 &&
      objectMatchesStructure(decodedMessage.wasm.execute.funds[0], {
        amount: {},
        denom: {},
      })

    console.log("isNativeCreateEvent", isNativeCreateEvent)

    // const isCw20Begin =
    //   objectMatchesStructure(decodedMessage, {
    //     wasm: {
    //       execute: {
    //         contract_addr: {},
    //         funds: {},
    //         msg: {
    //           send: {
    //             amount: {},
    //             contract: {},
    //             msg: {},
    //           },
    //         },
    //       },
    //     },
    //   }) &&
    //   objectMatchesStructure(
    //     decodeJsonFromBase64(decodedMessage.wasm.execute.msg.send.msg, true),
    //     {
    //       instantiate_payroll_contract: instantiateStructure,
    //     }
    //   )

    // const isRegisterSlash = objectMatchesStructure(decodedMessage, {
    //   wasm: {
    //     execute: {
    //       contract_addr: {},
    //       funds: {},
    //       msg: {
    //         register_slash: {
    //           validator: {},
    //           time: {},
    //           amount: {},
    //           during_unbonding: {},
    //         },
    //       },
    //     },
    //   },
    // })

    // const isCancel = objectMatchesStructure(decodedMessage, {
    //   wasm: {
    //     execute: {
    //       contract_addr: {},
    //       funds: {},
    //       msg: {
    //         cancel: {},
    //       },
    //     },
    //   },
    // })

    return {
      chainId,
      decodedMessage,
      isNativeCreateEvent,
      // isCw20Begin,
      // isRegisterSlash,
      // isCancel,
    }
  }

  match([message]: ProcessedMessage[]): ActionMatch {
    const { isNativeCreateEvent, } =
      this.breakDownMessage(message)

    return isNativeCreateEvent // || isCw20Begin || isRegisterSlash || isCancel
  }

  async decode([message]: ProcessedMessage[]): Promise<
    Partial<ManageAvEventsData>
  > {
    const {
      chainId,
      decodedMessage,
      isNativeCreateEvent,
      // isCw20Begin,
      // isRegisterSlash,
      // isCancel,
    } = this.breakDownMessage(message)

    if (isNativeCreateEvent) {
      const instantiateMsg: CwAveInitMsg = // isNativeCreateEvent?
        decodedMessage.wasm.execute.msg.create_native_av_event_contract
          .instantiate_msg
      //  : isCw20Begin
      // Extract instantiate message from cw20 send message.
      // (decodeJsonFromBase64(decodedMessage.wasm.execute.msg.send.msg, true)
      //   .instantiate_payroll_contract
      //   ?.instantiate_msg as CwAveInitMsg)

      const [token] = await Promise.all([
        this.options.queryClient.fetchQuery(
          tokenQueries.info(this.options.queryClient, {
            chainId,
            type: isNativeCreateEvent ? TokenType.Native : TokenType.Cw20,
            denomOrAddress: isNativeCreateEvent
              ? decodedMessage.wasm.execute.funds[0].denom
              : decodedMessage.wasm.execute.contract_addr,
          })
        ),
        // Attempt to load cw1-whitelist admins if the owner is set. Will only
        // succeed if the owner is a cw1-whitelist contract. Otherwise it
        // returns null.
        // instantiateMsg.owner
        //   ? this.options.queryClient.fetchQuery(
        //     cw1WhitelistExtraQueries.adminsIfCw1Whitelist(
        //       this.options.queryClient,
        //       {
        //         chainId,
        //         address: instantiateMsg.owner,
        //       }
        //     )
        //   )
        //   : null,
      ])

      // const ownerMode = !instantiateMsg.owner
      //   ? 'none'
      //   : instantiateMsg.owner ===
      //     getChainAddressForActionOptions(this.options, chainId)
      //     ? 'me'
      //     : cw1WhitelistAdmins
      //       ? 'many'
      //       : 'other'


      const usher_admins: AdminTierHelper[] = [];
      const tierMap = new Map<number, AdminTierHelper>();
      instantiateMsg.usher_admins.forEach(member => {
        if (!tierMap.has(member.weight)) {
          const newTier = { weight: member.weight, addr: [] };
          tierMap.set(member.weight, newTier);
          usher_admins.push(newTier);
        }
        tierMap.get(member.weight)!.addr.push(member);
      })

      return {
        mode: 'create',
        create: {
          chainId,
          cw420: instantiateMsg.cw420,
          description: instantiateMsg.description,
          event_curator: instantiateMsg.event_curator,
          event_timeline: instantiateMsg.event_timeline,
          guest_details: instantiateMsg.guest_details,
          title: instantiateMsg.title,
          usher_admins,
          // type: token.type,
          // denomOrAddress: token.denomOrAddress,
          // description: instantiateMsg.description || undefined,
          // recipient: instantiateMsg.recipient,
          // startDate: instantiateMsg.start_time
          //   ? new Date(
          //     // nanoseconds => milliseconds
          //     Number(instantiateMsg.start_time) / 1e6
          //   ).toISOString()
          //   : '',
          // title: instantiateMsg.title,
          // amount: HugeDecimal.from(instantiateMsg.total).toHumanReadableString(
          //   token.decimals
          // ),
          // ownerMode,
          // otherOwner: (ownerMode === 'other' && instantiateMsg.owner) || '',
          // manyOwners:
          //   ownerMode === 'many' && cw1WhitelistAdmins
          //     ? cw1WhitelistAdmins.map((address) => ({
          //       address,
          //     }))
          //     : [],
          // manyOwnersCw1WhitelistContract:
          //   (ownerMode === 'many' && instantiateMsg.owner) || '',
          // steps:
          //   instantiateMsg.schedule === 'saturating_linear'
          //     ? [
          //       {
          //         percent: 100,
          //         delay: convertSecondsToDurationWithUnits(
          //           instantiateMsg.vesting_duration_seconds
          //         ),
          //       },
          //     ]
          //     : instantiateMsg.schedule.piecewise_linear.reduce(
          //       (acc, [seconds, amount], index) => {
          //         // Ignore first step if hardcoded 0 amount at 1 second.
          //         if (index === 0 && seconds === 1 && amount === '0') {
          //           return acc
          //         }

          //         const pastTimestamp =
          //           index === 1 ||
          //             // Typecheck. Always false.
          //             instantiateMsg!.schedule === 'saturating_linear'
          //             ? // For first user-defined step, account for 1 second
          //             // delay since we ignore the first hardcoded step at
          //             // 1 second. When we created the msg, we subtracted
          //             // 1 second from the first user-defined step's
          //             // delay.
          //             0
          //             : instantiateMsg!.schedule.piecewise_linear[
          //             index - 1
          //             ][0]
          //         const pastAmount =
          //           index === 0 ||
          //             // Typecheck. Always false.
          //             instantiateMsg!.schedule === 'saturating_linear'
          //             ? '0'
          //             : instantiateMsg!.schedule.piecewise_linear[
          //             index - 1
          //             ][1]

          //         return [
          //           ...acc,
          //           {
          //             percent: HugeDecimal.from(amount)
          //               .minus(pastAmount)
          //               .div(instantiateMsg!.total)
          //               .times(100)
          //               .toNumber(2),
          //             delay: convertSecondsToDurationWithUnits(
          //               seconds - pastTimestamp
          //             ),
          //           },
          //         ]
          //       },
          //       [] as {
          //         percent: number
          //         delay: DurationWithUnits
          //       }[]
          //     ),
        },
      }
    }
    // else if (isRegisterSlash) {
    //   return {
    //     mode: 'registerSlash',
    //     registerSlash: {
    //       chainId,
    //       address: decodedMessage.wasm.execute.contract_addr,
    //       validator: decodedMessage.wasm.execute.msg.register_slash.validator,
    //       time: decodedMessage.wasm.execute.msg.register_slash.time,
    //       amount: decodedMessage.wasm.execute.msg.register_slash.amount,
    //       duringUnbonding:
    //         decodedMessage.wasm.execute.msg.register_slash.during_unbonding,
    //     },
    //   }
    // } else if (isCancel) {
    //   return {
    //     mode: 'cancel',
    //     cancel: {
    //       chainId,
    //       address: decodedMessage.wasm.execute.contract_addr,
    //     },
    //   }
    // }

    // Should never happen.
    throw new Error('Unexpected message')
  }
}
