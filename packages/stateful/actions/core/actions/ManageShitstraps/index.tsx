import { useQueries, useQueryClient } from '@tanstack/react-query'
import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  cwShitstrapExtraQueries,
  cwShitstrapFactoriesExtraQuery,
  tokenQueries,
} from '@dao-dao/state/query'
import {
  ActionBase,
  AddressInput,
  Loader,
  MoneyWingsEmoji,
  SegmentedControls,
  useActionOptions,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionComponentProps,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
  SegmentedControlsProps,

  TokenType,
  TypedOption,
  UnifiedCosmosMsg,
  ModuleId,
} from '@dao-dao/types'
import {
  ShitstrapInfoGeneric,
  InstantiateMsg as ShitstrapInstantiateMsg,
  UncheckedDenom,
} from '@dao-dao/types/contracts/ShitStrap'
import { ShitstrapPaymentMode, } from '@dao-dao/types/shit/ShitstrapPayment'
import {
  ExecuteMsg,
  InstantiateNativeShitstrapContractMsg,
} from '@dao-dao/types/contracts/ShitstrapFactory'
import {
  decodeJsonFromBase64,
  encodeJsonToBase64,
  getChainAddressForActionOptions,

  getDisplayNameForChainId,
  getNativeTokenForChainId,
  makeCombineQueryResultsIntoLoadingDataWithError,
  makeExecuteSmartContractMessage,
  maybeMakePolytoneExecuteMessages,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import { ShitstrapPaymentModuleData } from '../../../../modules/modules/Shitstrap/types'
import { useTokenBalances } from '../../../hooks'
import { CreateShitstrap, CreateShitstrapData } from './CreateShitstrap'
import { FlushShitstrap, FlushShitstrapData } from './FlushShitstrap'
import {
  MakeShitstrapPayment,
  MakeShitstrapPaymentData,
} from './MakeShitstrapPayment'
import {
  RedeemShitstrapOverflow,
  ShitstrapOverFlowData,
} from './ShitstrapOverFlow'
import { getDaoModules, useModule } from '../../../../modules'

// data coming from action tabs content
export type ManageShitStrapData = {
  mode: ShitstrapPaymentMode
  create: CreateShitstrapData
  payment: MakeShitstrapPaymentData
  flush: FlushShitstrapData
  overflow: ShitstrapOverFlowData
}

// poo
export type TokenToShit = {
  denomOrAddress: string
  type: TokenType
  chainId: string
  decimals: number
}

// init shitstrap json object
const instantiateStructure = {
  instantiate_msg: {
    cutoff: {},
    shitmos: {},
    accepted: {},
    owner: {},
  },
  label: {},
}

// making shitstrap payment json object
const shitStrapPaymentStrucutre = {
  shit_strap: {
    shit: {
      amount: {},
      denom: {},
    },
  },
}

/**
 * Get shitstrap sources from widget data.
 */
const getShitstrapSourcesFromModuleData = (
  options: ActionOptions,
  widgetData: ShitstrapPaymentModuleData
) =>
  widgetData.factories
    ? Object.fromEntries(
      Object.entries(widgetData.factories).map(
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
    // of the vesting widget which only allows a single factory on the
    // same chain as the DAO. If widget data is undefined, this is being
    // used by a wallet.
    {
      [options.chain.chainId]: {
        owner: options.address,
        factory: widgetData.factory,
        version: widgetData.version,
      },
    }

const getShitstrapContractsOwnedByEntityQueries = (
  options: ActionOptions,
  widgetData?: ShitstrapPaymentModuleData
) => {
  // retrieves shitstrap manager data from items saved in dao contract state.
  const sources =
    widgetData && getShitstrapSourcesFromModuleData(options, widgetData)

  const allShitstrapsForSelectedChain = options.context.accounts.flatMap(
    ({ chainId, address: accountAddr }) =>
      sources?.[chainId]?.factory
        ? cwShitstrapFactoriesExtraQuery.listAllShitstrapContractsByInstantiator(
          options.queryClient,
          {
            chainId,
            address: sources?.[chainId]?.factory!,
            instantiator: accountAddr,
          }
        )
        : []
  )
  return allShitstrapsForSelectedChain
}

/**
 * Get the shitstrap infos owned by the current
 * entity executing an action.
 */
const useShitstrapContractsOwnedByEntity = () => {
  const options = useActionOptions()
  return useQueries({
    queries: getShitstrapContractsOwnedByEntityQueries(options),
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      transform: (infos) => infos.flat(),
    }),
  })
}

const Component: ComponentType<
  ActionComponentProps<undefined, ManageShitStrapData> & {
    widgetData?: ShitstrapPaymentModuleData
  }
> = ({ widgetData, ...props }) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const {
    chain: { chainId: nativeChainId },
  } = useActionOptions()
  const { setValue, watch, register } = useFormContext<ManageShitStrapData>()

  const mode = watch((props.fieldNamePrefix + 'mode') as 'mode')

  const selectedChainId =
    mode === 'create'
      ? watch((props.fieldNamePrefix + 'create.chainId') as 'create.chainId')
      : mode === 'payment'
        ? watch(
          (props.fieldNamePrefix + 'payment.chainId') as 'payment.chainId'
        )
        : mode === 'flush'
          ? watch((props.fieldNamePrefix + 'flush.chainId') as 'flush.chainId')
          : mode === 'overflow'
            ? watch(
              (props.fieldNamePrefix +
                'overflow.chainId') as 'overflow.chainId'
            )
            : nativeChainId

  const selectedShitstrapContract =
    mode === 'payment'
      ? watch(
        (props.fieldNamePrefix +
          'payment.shitstrapAddress') as 'payment.shitstrapAddress'
      )
      : mode === 'flush'
        ? watch(
          (props.fieldNamePrefix +
            'flush.shitstrapAddress') as 'flush.shitstrapAddress'
        )
        : mode === 'overflow'
          ? watch(
            (props.fieldNamePrefix +
              'overflow.shitstrapAddress') as 'overflow.shitstrapAddress'
          )
          : undefined

  const tabs: SegmentedControlsProps<ManageShitStrapData['mode']>['tabs'] = [
    // Only allow beginning a vest if widget is setup.
    ...(widgetData
      ? ([
        {
          label: t('title.createShitstrap'),
          value: 'create',
        },
        {
          label: t('title.makeShitstrapPayment'),
          value: 'payment',
        },
        {
          label: t('title.flushShitstrap'),
          value: 'flush',
        },
        {
          label: t('title.refundShitstrapOverflow'),
          value: 'overflow',
        },
      ] as TypedOption<ManageShitStrapData['mode']>[])
      : []),
  ]
  const selectedTab = tabs.find((tab) => tab.value === mode)

  const tokenBalances = useTokenBalances()

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={
        // Manually trigger loader.
        tokenBalances.loading
      }
    >
      {props.isCreating ? (
        <SegmentedControls<ManageShitStrapData['mode']>
          className="mb-2"
          onSelect={(value) =>
            setValue((props.fieldNamePrefix + 'mode') as 'mode', value)
          }
          selected={mode}
          tabs={tabs}
        />
      ) : (
        <p className="title-text mb-2">{selectedTab?.label}</p>
      )}
      {mode === ShitstrapPaymentMode.Create ? (
        <>
          {console.log(widgetData)}
          <CreateShitstrap
            {...props}
            errors={props.errors?.create}
            fieldNamePrefix={props.fieldNamePrefix + 'create.'}
            options={{
              widgetData,
              tokens: tokenBalances.loading ? [] : tokenBalances.data,
              AddressInput,
            }}
          />
        </>
      ) : null}
      {mode === ShitstrapPaymentMode.Payment ? (
        // <></>
        <MakeShitstrapPayment
          {...props}
          errors={props.errors?.create}
          fieldNamePrefix={props.fieldNamePrefix + 'payment.'}
          options={{
            queryClient,
            factories: {},
            widgetData,
            tokens: tokenBalances.loading ? [] : tokenBalances.data,
          }}
        />
      ) : null}
      {mode === ShitstrapPaymentMode.Flush ? (
        <FlushShitstrap
          {...props}
          errors={props.errors?.create}
          fieldNamePrefix={props.fieldNamePrefix + 'flush.'}
          options={{
            widgetData,
            tokens: tokenBalances.loading ? [] : tokenBalances.data,
          }}
        />
      ) : null}
      {mode === ShitstrapPaymentMode.OverFlow ? (
        <RedeemShitstrapOverflow
          {...props}
          errors={props.errors?.create}
          fieldNamePrefix={props.fieldNamePrefix + 'overflow.'}
          options={{
            widgetData,
            tokens: tokenBalances.loading ? [] : tokenBalances.data,
          }}
        />
      ) : null}
    </SuspenseLoader>
  )
}

// Only check if widget exists in DAOs.
const DaoComponent: ActionComponent<undefined, ManageShitStrapData> = (
  props
) => {
  const widgetData = useModule<ShitstrapPaymentModuleData>(ModuleId.ShitStrap)
    ?.daoModule.values

  return <Component {...props} widgetData={widgetData} />
}

const WalletComponent: ActionComponent<undefined, ManageShitStrapData> = (
  props
) => <Component {...props} />

export class ManageShitstrapAction extends ActionBase<ManageShitStrapData> {
  public readonly key = ActionKey.ManageShitstrap
  public readonly Component: ActionComponent<undefined, ManageShitStrapData>

  private shitstrapInfosOwnedByEntity: ShitstrapInfoGeneric[] = []
  private widgetData?: ShitstrapPaymentModuleData

  constructor(options: ActionOptions) {
    super(options, {
      Icon: MoneyWingsEmoji,
      label: options.t('title.manageShitstrap'),
      description: options.t('info.manageShitstrapDescription'),
      // Hide until ready. Update this in setup.
      hideFromPicker: true,
    })

    this.Component =
      options.context.type === ActionContextType.Dao
        ? DaoComponent
        : WalletComponent

    // console.log('options.context.type:', options.context.type);
    // console.log('options.context.dao.info.items:', options.context.type === ActionContextType.Dao ? options.context.dao.info.items : "");

    this.widgetData =
      options.context.type === ActionContextType.Dao
        ? getDaoModules(options.context.dao).find(({ daoModule }) => {
          return daoModule.id === ModuleId.ShitStrap
        })?.daoModule.values
        : undefined

    // Fire async init immediately since we may hide this action.
    this.init().catch(() => { })
  }

  async setup() {
    const contractsResults = await Promise.all(
      getShitstrapContractsOwnedByEntityQueries(
        this.options,
        this.widgetData
      ).map((query) => this.options.queryClient.fetchQuery(query))
    )

    const infoQueries = contractsResults
      .flat()
      .map((result) =>
        result.contracts.map((contract) =>
          cwShitstrapExtraQueries.info(this.options.queryClient, {
            chainId: result.chainId,
            contractAddress: contract.contract,
          })
        )
      )
      .flat()

    this.shitstrapInfosOwnedByEntity = (
      await Promise.all(
        infoQueries.map((query) => this.options.queryClient.fetchQuery(query))
      )
    ).flat()

    // Don't show if shitstrap payment widget is not enabled (for DAOs)
    this.metadata.hideFromPicker =
      this.options.context.type !== ActionContextType.Dao || !this.widgetData

    // Default start to 7 days from now.
    const start = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    this.defaults = {
      // Cannot use begin if no widget setup, so default to cancel if no data.
      mode: this.widgetData
        ? ShitstrapPaymentMode.Create
        : ShitstrapPaymentMode.Payment,
      create: {
        chainId: this.options.chain.chainId,
        cutoff: '1',
        tokenToShit: getNativeTokenForChainId(this.options.chain.chainId),
        title: '',
        description: '',
        startDate: `${start.toISOString().split('T')[0]} 12:00 AM`,
        possibleShit: [],
      },
      flush: {
        chainId: this.options.chain.chainId,
        shitstrapAddress: '', // or some default value
        owner: '',
      },
      payment: {
        chainId: this.options.chain.chainId,
        shitstrapAddress: '',
        shitToken: undefined,
        amount: '0',
        possibleShit: [],
        contractChosen: false,
      },
      overflow: {
        chainId: this.options.chain.chainId,
        shitstrapAddress: '',
      },
    }
  }

  async encode({
    mode,
    create,
    payment,
    overflow,
    flush,
  }: ManageShitStrapData): Promise<UnifiedCosmosMsg[]> {
    let chainId: string
    let cosmosMsg: UnifiedCosmosMsg

    // Can only begin a vest if there is widget data available.
    if (mode === 'create' && this.widgetData) {
      chainId = create.chainId

      const shitstrapSource = getShitstrapSourcesFromModuleData(
        this.options,
        this.widgetData
      )[chainId]
      if (!shitstrapSource?.factory) {
        throw new Error(
          this.options.t('error.noChainShitstrapFactory', {
            chain: getDisplayNameForChainId(chainId),
          })
        )
      }

      const instantiateMsg: ShitstrapInstantiateMsg = {
        title: create.title,
        description: create.description,
        accepted: create.possibleShit.map((asset) => {
          if (!asset.token) {
            throw new Error(`Token is missing for asset: ${asset.token}`)
          } else if (!create.ownerEntity?.address) {
            throw new Error(`ownerEntity missing: ${asset.token}`)
          }
          let token: UncheckedDenom
          if (typeof asset.token === 'string') {
            token = { native: asset.token }
          } else if ('native' in asset.token) {
            token = { native: asset.token.native }
          } else if ('cw20' in asset.token) {
            token = { cw20: asset.token.cw20 }
          } else {
            throw new Error(`Invalid token type: ${asset.token}`)
          }
          return {
            token,
            shit_rate: HugeDecimal.from(asset.shit_rate)
              .times(HugeDecimal.from(10).pow(18))
              .toString(),
          }
        }),
        cutoff: HugeDecimal.from(create.cutoff)
          .times(HugeDecimal.from(10).pow(6))
          .toString(),

        owner: create.ownerEntity?.address!,
        shitmos:
          create.tokenToShit.type === TokenType.Native
            ? {
              native: create.tokenToShit.denomOrAddress,
            }
            : {
              cw20: create.tokenToShit.denomOrAddress,
            },
      }

      const msg: InstantiateNativeShitstrapContractMsg = {
        instantiate_msg: instantiateMsg,
        label: `shitstrap_owned_by${create.ownerEntity
          ?.address!}_${Date.now()}`,
      }

      if (create.tokenToShit.type === TokenType.Native) {
        cosmosMsg = makeExecuteSmartContractMessage({
          chainId,
          contractAddress: shitstrapSource.factory,
          sender: shitstrapSource.owner,
          msg: {
            create_native_shit_strap_contract: msg,
          } as ExecuteMsg,
          funds: [],
          // funds: total.toCoins(create.tokenToShit.denomOrAddress),
        })
      } else if (create.tokenToShit.type === TokenType.Cw20) {
        // Execute CW20 send message.
        cosmosMsg = makeExecuteSmartContractMessage({
          chainId,
          contractAddress: create.tokenToShit.denomOrAddress,
          sender: shitstrapSource.owner,
          msg: {
            send: {
              amount: create.tokenToShit.toString(),
              contract: shitstrapSource.factory,
              msg: encodeJsonToBase64({
                instantiate_shitstrap_factory_contract: msg,
              }),
            },
          },
        })
      } else {
        throw new Error(this.options.t('error.unexpectedError'))
      }
    } else if (mode === 'payment' || mode === 'overflow') {
      chainId = mode === 'payment' ? payment.chainId : overflow.chainId

      const contractAddress =
        mode === 'payment'
          ? payment.shitstrapAddress
          : overflow.shitstrapAddress

      const shitstrapInfo = this.shitstrapInfosOwnedByEntity.find(
        ({ shitstrapContractAddr }) => shitstrapContractAddr === contractAddress
      )
      if (!shitstrapInfo) {
        throw new Error(this.options.t('error.noShitstrapContractSelected'))
      }

      const from = getChainAddressForActionOptions(this.options, chainId)
      if (!from) {
        throw new Error(this.options.t('error.loadingData'))
      }

      const total = HugeDecimal.fromHumanReadable(payment.amount, 6)

      cosmosMsg = makeExecuteSmartContractMessage({
        chainId,
        contractAddress,
        sender: from,
        funds: payment.shitToken
          ? total.toCoins(payment.shitToken.denomOrAddress)
          : [],
        msg:
          mode === 'overflow'
            ? { overflow: {} }
            : {
              shit_strap: {
                shit: {
                  amount: total.toString(),
                  denom:
                    payment.shitToken &&
                      payment.shitToken.type === TokenType.Native
                      ? { native: payment.shitToken?.denomOrAddress }
                      : { native: payment.shitToken?.denomOrAddress },
                },
              },
            },
      })
    } else {
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
    const isNativeCreate =
      objectMatchesStructure(decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: { instantiate_native_payroll_contract: instantiateStructure },
          },
        },
      }) &&
      decodedMessage.wasm.execute.funds.length === 1 &&
      objectMatchesStructure(decodedMessage.wasm.execute.funds[0], {
        amount: {},
        denom: {},
      })

    const isCw20Create =
      objectMatchesStructure(decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              send: {
                amount: {},
                contract: {},
                msg: {},
              },
            },
          },
        },
      }) &&
      objectMatchesStructure(
        decodeJsonFromBase64(decodedMessage.wasm.execute.msg.send.msg, true),
        {
          instantiate_shitstrap_factory_contract: instantiateStructure,
        }
      )
    // const isCw20ShitStrapPayment =
    //     objectMatchesStructure(decodedMessage, {
    //         wasm: {
    //             execute: {
    //                 contract_addr: {},
    //                 funds: {},
    //                 msg: {
    //                     send: {
    //                         amount: {},
    //                         contract: {},
    //                         msg: {},
    //                     },
    //                 },
    //             },
    //         },
    //     }) &&
    //     objectMatchesStructure(
    //         decodeJsonFromBase64(decodedMessage.wasm.execute.msg.send.msg, true),
    //         {
    //             shit_strap: { shit: {} },
    //         }
    //     )

    const isShitStrapPayment = objectMatchesStructure(decodedMessage, {
      wasm: {
        execute: {
          contract_addr: {},
          funds: {},
          msg: shitStrapPaymentStrucutre,
        },
      },
    })

    const isOverflow = objectMatchesStructure(decodedMessage, {
      wasm: {
        execute: {
          contract_addr: {},
          funds: {},
          msg: {
            overflow: {},
          },
        },
      },
    })

    return {
      chainId,
      decodedMessage,
      isNativeCreate,
      isCw20Create,
      // isCw20ShitStrapPayment,
      isShitStrapPayment,
      isOverflow,
    }
  }

  match([message]: ProcessedMessage[]): ActionMatch {
    const { isNativeCreate, isCw20Create, isShitStrapPayment, isOverflow } =
      this.breakDownMessage(message)

    return isNativeCreate || isCw20Create || isShitStrapPayment || isOverflow
  }

  async decode([message]: ProcessedMessage[]): Promise<
    Partial<ManageShitStrapData>
  > {
    const {
      chainId,
      decodedMessage,
      isNativeCreate,
      isCw20Create,
      // isCw20ShitStrapPayment,
      isShitStrapPayment,
      isOverflow,
    } = this.breakDownMessage(message)

    if (isNativeCreate || isCw20Create) {
      const instantiateMsg: ShitstrapInstantiateMsg = isNativeCreate
        ? decodedMessage.wasm.execute.msg.instantiate_native_shitstrap_contract
          .instantiate_msg
        : // Extract instantiate message from cw20 send message.
        (decodeJsonFromBase64(decodedMessage.wasm.execute.msg.send.msg, true)
          .instantiate_payroll_contract
          ?.instantiate_msg as ShitstrapInstantiateMsg)

      const [token] = await Promise.all([
        this.options.queryClient.fetchQuery(
          tokenQueries.info({
            chainId,
            type: isNativeCreate ? TokenType.Native : TokenType.Cw20,
            denomOrAddress: isNativeCreate
              ? decodedMessage.wasm.execute.funds[0].denom
              : decodedMessage.wasm.execute.contract_addr,
          })
        ),
      ])

      const ownerMode = !instantiateMsg.owner
        ? 'none'
        : instantiateMsg.owner ===
          getChainAddressForActionOptions(this.options, chainId)
          ? 'me'
          : 'other'

      return {
        mode: ShitstrapPaymentMode.Create,
        create: {
          chainId,
          possibleShit: instantiateMsg.accepted,
          title: instantiateMsg.title,
          description:
            instantiateMsg.description ||
            'Shitstrap owned by' + instantiateMsg.owner,
          startDate: new Date().toISOString(),
          cutoff: HugeDecimal.from(instantiateMsg.cutoff).toString(),
          tokenToShit: {
            chainId,
            denomOrAddress:
              'cw20' in instantiateMsg.shitmos
                ? instantiateMsg.shitmos.cw20
                : 'native' in instantiateMsg.shitmos
                  ? instantiateMsg.shitmos.native
                  : '',
            type:
              'cw20' in instantiateMsg.shitmos
                ? TokenType.Cw20
                : 'native' in instantiateMsg.shitmos
                  ? TokenType.Native
                  : TokenType.Native,
          },
        },
      }
    } else if (isShitStrapPayment) {
      return {
        mode: ShitstrapPaymentMode.Payment,
        payment: {
          chainId,
          contractChosen: true,
          shitstrapAddress: decodedMessage.wasm.execute.contract_addr,
          amount: HugeDecimal.from(
            decodedMessage.wasm.execute.msg.shit_strap.shit.amount
          ).toHumanReadableString(6),
          possibleShit: [],
        },
      }
    } else if (isOverflow) {
      return {
        mode: ShitstrapPaymentMode.OverFlow,
        overflow: {
          chainId,
          shitstrapAddress: decodedMessage.wasm.execute.contract_addr,
        },
      }
    }

    // Should never happen.
    throw new Error('Unexpected message')
  }
}
