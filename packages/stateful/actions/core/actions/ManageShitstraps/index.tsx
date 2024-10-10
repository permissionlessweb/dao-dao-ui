import { ActionComponent, ActionComponentProps, ActionContextType, ActionKey, ActionMaker, ActionMatch, ActionOptions, DurationWithUnits, GenericToken, ProcessedMessage, SegmentedControlsProps, ShitstrapPaymentMode, TokenType, TypedOption, UnifiedCosmosMsg, WidgetId } from "@dao-dao/types"
import { CreateShitstrap, CreateShitstrapData } from "./CreateShitstrap"
import { MakeShitstrapPayment, MakeShitstrapPaymentData } from "./MakeShitstrapPayment"
import { FlushShitstrapData } from "./FlushShitstrap"
import { ShitstrapOverFlowData } from "./ShitstrapOverFlow"
import { ActionBase, AddressInput, Loader, MoneyWingsEmoji, SegmentedControls, useActionOptions } from "@dao-dao/stateless"
import { useQueries, useQueryClient } from "@tanstack/react-query"
import { chainQueries, cwShitstrapExtraQueries, cwShitstrapFactoriesExtraQuery, tokenQueries } from "@dao-dao/state/query"
import { chainIsIndexed, convertSecondsToDurationWithUnits, decodeJsonFromBase64, encodeJsonToBase64, getChainAddressForActionOptions, getDaoWidgets, getDisplayNameForChainId, getNativeTokenForChainId, makeCombineQueryResultsIntoLoadingDataWithError, makeExecuteSmartContractMessage, maybeMakePolytoneExecuteMessages, objectMatchesStructure } from "@dao-dao/utils"
import { ComponentType } from "react"
import { ShitstrapPaymentWidgetData } from "../../../../widgets/widgets/Shitstrap/types"
import { useTranslation } from "react-i18next"
import { useFormContext } from "react-hook-form"
import { useTokenBalances } from "../../../hooks"
import { SuspenseLoader } from "../../../../components"
import { useWidget } from "../../../../widgets"
import { ShitstrapInfo, UncheckedDenom } from "@dao-dao/types/contracts/ShitStrap"
import { HugeDecimal } from "@dao-dao/math"
import { InstantiateMsg as ShitstrapInstantiateMsg } from "@dao-dao/types/contracts/ShitStrap"
import { InstantiateNativeShitstrapContractMsg, ExecuteMsg, Uint128 } from "@dao-dao/types/contracts/ShitstrapFactory"
import { coins } from "@cosmjs/amino"

export type ManageShitStrapData = {
    mode: ShitstrapPaymentMode
    create: CreateShitstrapData
    payment: MakeShitstrapPaymentData
    flush: FlushShitstrapData
    overflow: ShitstrapOverFlowData
}

export type TokenToShit = {
    denomOrAddress: string,
    type: TokenType,
    chainId: string,
    decimals: number,
}

const instantiateStructure = {
    instantiate_msg: {
        cutoff: {},
        shitmos: {},
        accepted: {},
        owner: {},
    },
    label: {},
}
const shitStrapPaymentStrucutre = {
    shit_strap: {
        shit: {},
    }
}

/**
 * Get shitstrap sources from widget data.
 */
const getShitstrapSourcesFromWidgetData = (
    options: ActionOptions,
    widgetData: ShitstrapPaymentWidgetData
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
            [options.chain.chain_id]: {
                owner: options.address,
                factory: widgetData.factory,
                version: widgetData.version,
            },
        }


const getShitstrapContractsOwnedByEntityQueries = (
    options: ActionOptions,
    widgetData?: ShitstrapPaymentWidgetData
) => {
    const sources =
        widgetData && getShitstrapSourcesFromWidgetData(options, widgetData)
    return options.context.accounts.flatMap(({ chainId, address }) =>
        chainIsIndexed(chainId)
            ?
            options.context.type === ActionContextType.Dao
                ?
                options.context.dao.accounts.map(({ chainId, address }) =>
                    cwShitstrapFactoriesExtraQuery.listAllShitstrapContractsByInstantiator(options.queryClient, {
                        chainId,
                        address,
                        instantiator: address,
                    })
                )
                : options.context.accounts.map(({ chainId, address }) =>
                    cwShitstrapFactoriesExtraQuery.listAllShitstrapContractsByInstantiator(options.queryClient, {
                        chainId,
                        address,
                        instantiator: address,
                    })
                )

            : []
    )
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
        widgetData?: ShitstrapPaymentWidgetData
    }
> = ({ widgetData, ...props }) => {
    const { t } = useTranslation()
    const {
        chain: { chain_id: nativeChainId },
    } = useActionOptions()
    const { setValue, watch, register } =
        useFormContext<ManageShitStrapData>()

    const mode = watch((props.fieldNamePrefix + 'mode') as 'mode')

    const tokenBalances = useTokenBalances()
    const selectedChainId =
        mode === 'create'
            ? watch((props.fieldNamePrefix + 'create.chainId') as 'create.chainId')
            : mode === 'payment'
                ? watch((props.fieldNamePrefix + 'payment.chainId') as 'payment.chainId')
                : mode === 'flush'
                    ? watch((props.fieldNamePrefix + 'flush.chainId') as 'flush.chainId')
                    : mode === 'overflow'
                        ? watch((props.fieldNamePrefix + 'overflow.chainId') as 'overflow.chainId')
                        : nativeChainId


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
                    value: 'refund',
                },
            ] as TypedOption<ManageShitStrapData['mode']>[])
            : []),
    ]
    const selectedTab = tabs.find((tab) => tab.value === mode)
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
            )}˝


            {mode === ShitstrapPaymentMode.Create ? (
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
            ) : null}
            {mode === ShitstrapPaymentMode.Payment ? (
                <></>
                // <MakeShitstrapPayment
                //     {...props}
                //     errors={props.errors?.create}
                //     fieldNamePrefix={props.fieldNamePrefix + 'payment.'}
                //     options={{
                //         factories: {},
                //         widgetData,
                //         tokens: tokenBalances.loading ? [] : tokenBalances.data,
                //     }}
                // />
            ) : null}
            {mode === ShitstrapPaymentMode.Flush ? (
                <></>
            ) : null}
            {mode === ShitstrapPaymentMode.OverFlow ? (
                <></>
            ) : null}
        </SuspenseLoader>
    )
}


// Only check if widget exists in DAOs.
const DaoComponent: ActionComponent<undefined, ManageShitStrapData> = (props) => {
    const widgetData = useWidget<ShitstrapPaymentWidgetData>(
        WidgetId.ShitStrap
    )?.daoWidget.values

    return <Component {...props} widgetData={widgetData} />
}

const WalletComponent: ActionComponent<undefined, ManageShitStrapData> = (
    props
) => <Component {...props} />

export class ManageShitstrapAction extends ActionBase<ManageShitStrapData> {
    public readonly key = ActionKey.ManageShitstrap
    public readonly Component: ActionComponent<undefined, ManageShitStrapData>

    private shitstrapInfosOwnedByEntity: ShitstrapInfo[] = []
    private widgetData?: ShitstrapPaymentWidgetData

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

        this.widgetData =
            options.context.type === ActionContextType.Dao
                ? getDaoWidgets(options.context.dao.info.items).find(
                    ({ id }) => id === WidgetId.ShitStrap
                )?.values
                : undefined

        // Fire async init immediately since we may hide this action.
        this.init().catch(() => { })
    }

    async setup() {
        const contractsResults = await Promise.all(
            getShitstrapContractsOwnedByEntityQueries(this.options).map((query) =>
                this.options.queryClient.fetchQuery(query)
            )
        );

        const infoQueries = contractsResults.flat().map((result) =>
            result.contracts.map((contract) =>
                cwShitstrapExtraQueries.info(this.options.queryClient, {
                    chainId: result.chainId,
                    address: contract.contract,
                })
            )
        ).flat();

        this.shitstrapInfosOwnedByEntity = (await Promise.all(infoQueries.map((query) => this.options.queryClient.fetchQuery(query)))).flat();

        // Don't show if vesting payment widget is not enabled (for DAOs) and this
        // entity owns no vesting payments.
        this.metadata.hideFromPicker =
            (this.options.context.type !== ActionContextType.Dao ||
                !this.widgetData) &&
            this.shitstrapInfosOwnedByEntity.length === 0

        // Default start to 7 days from now.
        const start = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

        this.defaults = {
            // Cannot use begin if no widget setup, so default to cancel if no data.
            mode: this.widgetData ? ShitstrapPaymentMode.Create : ShitstrapPaymentMode.Payment,
            create: {
                chainId: this.options.chain.chain_id,
                cutoff: '1',
                tokenToShit: getNativeTokenForChainId(this.options.chain.chain_id),
                title: '',
                description: '',
                startDate: `${start.toISOString().split('T')[0]} 12:00 AM`,
                eligibleAssets: [],
            },
            flush: {
                chainId: this.options.chain.chain_id,
                shitstrap: '', // or some default value
                owner: '',
            },
            payment: {
                chainId: this.options.chain.chain_id,
                shitstrapAddress: '',
                shitToken: undefined,
                amount: '0',
                eligibleAssets: [],
                contractChosen: false,
            },
            overflow: {
                chainId: this.options.chain.chain_id,
                shitstrapAddress: '',

            },
        }
    }

    async encode({
        mode,
        create,
        payment,
        overflow,
        flush
    }: ManageShitStrapData): Promise<UnifiedCosmosMsg[]> {
        let chainId: string
        let cosmosMsg: UnifiedCosmosMsg

        // Can only begin a vest if there is widget data available.
        if (mode === 'create' && this.widgetData) {
            chainId = create.chainId

            const shitstrapSource = getShitstrapSourcesFromWidgetData(
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
                accepted: create.eligibleAssets.map((asset) => {
                    let token: UncheckedDenom;
                    if (typeof asset.token === 'string') {
                        token = { native: asset.token };
                    } else if ('native' in asset.token) {
                        token = { native: asset.token.native };
                    } else if ('cw20' in asset.token) {
                        token = { cw20: asset.token.cw20 };
                    } else {
                        throw new Error(`Invalid token type: ${asset.token}`);
                    }
                    return {
                        token,
                        shit_rate: HugeDecimal.from(asset.shit_rate).times(HugeDecimal.from(10).pow(6)).toString(),
                    };
                }),
                cutoff: HugeDecimal.from(create.cutoff).times(HugeDecimal.from(10).pow(6)).toString(),

                owner: create.ownerEntity?.address!,
                shitmos: create.tokenToShit.type === TokenType.Native ? {
                    native: create.tokenToShit.denomOrAddress,
                } : {
                    cw20: create.tokenToShit.denomOrAddress,
                }
            }

            const msg: InstantiateNativeShitstrapContractMsg = {
                instantiate_msg: instantiateMsg,
                label: `shitstrap_owned_by${create.ownerEntity?.address!}_${Date.now()}`,
            }

            if (create.tokenToShit.type === TokenType.Native) {
                cosmosMsg = makeExecuteSmartContractMessage({
                    chainId,
                    contractAddress: shitstrapSource.factory,
                    sender: shitstrapSource.owner,
                    msg: {
                        create_native_shit_strap_contract: msg,
                    } as ExecuteMsg,
                    funds: []
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

        }

        else if (mode === 'payment' || mode === 'overflow') {
            chainId = mode === 'payment' ? payment.chainId : overflow.chainId

            const contractAddress =
                mode === 'payment' ? payment.shitstrapAddress : overflow.shitstrapAddress

            const shitstrapInfo = this.shitstrapInfosOwnedByEntity.find(
                ({ shitstrapContractAddr }) =>
                    shitstrapContractAddr === contractAddress
            )
            if (!shitstrapInfo) {
                throw new Error(this.options.t('error.noShitstrapContractSelected'))
            }

            const from = getChainAddressForActionOptions(this.options, chainId)
            if (!from) {
                throw new Error(this.options.t('error.loadingData'))
            }

            const total = HugeDecimal.fromHumanReadable(payment.amount, 6)
             console.log("payment amount", payment.amount)

            cosmosMsg = makeExecuteSmartContractMessage({
                chainId,
                contractAddress,
                sender: from,
                funds: payment.shitToken ? total.toCoins(payment.shitToken.denomOrAddress) : [],
                msg:
                    mode === 'overflow'
                        ? {
                            overflow: {},
                        }
                        : {
                            shit_strap: {
                                shit: {
                                    amount: total.toHumanReadableString(6),
                                    denom: payment.shitToken && payment.shitToken.type === TokenType.Native ?
                                        { native: payment.shitToken?.denomOrAddress } : { native: payment.shitToken?.denomOrAddress }
                                }
                            },
                        },
            })

            // cosmosMsg = viaCw20
            //     ? // Wrap in cw1-whitelist execute.
            //     cosmosMsg = makeExecuteSmartContractMessage({
            //         chainId,
            //         contractAddress: payment.shitstrapAddress,
            //         sender: from,
            //         msg: {
            //             send: {
            //                 amount: payment.amount,
            //                 contract: payment.shitstrapAddress,
            //                 msg: encodeJsonToBase64(msg),
            //             },
            //         },
            //     }) : msg
        } else {
            throw new Error(this.options.t('error.unexpectedError'))
        }

        return maybeMakePolytoneExecuteMessages(
            this.options.chain.chain_id,
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
                        msg: {
                            instantiate_native_payroll_contract: instantiateStructure,
                        },
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
                : 
                // Extract instantiate message from cw20 send message.
                (decodeJsonFromBase64(decodedMessage.wasm.execute.msg.send.msg, true)
                    .instantiate_payroll_contract
                    ?.instantiate_msg as ShitstrapInstantiateMsg)

            const [token] = await Promise.all([
                this.options.queryClient.fetchQuery(
                    tokenQueries.info(this.options.queryClient, {
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
                    eligibleAssets: instantiateMsg.accepted,
                    title: instantiateMsg.title,
                    description: instantiateMsg.description || "Shitstrap owned by" + instantiateMsg.owner,
                    startDate: new Date().toISOString(),
                    cutoff: HugeDecimal.from(instantiateMsg.cutoff).toString(),
                    tokenToShit: {
                        chainId,
                        denomOrAddress: 'cw20' in instantiateMsg.shitmos ? instantiateMsg.shitmos.cw20 : 'native' in instantiateMsg.shitmos ? instantiateMsg.shitmos.native : '',
                        type: 'cw20' in instantiateMsg.shitmos ? TokenType.Cw20 : 'native' in instantiateMsg.shitmos ? TokenType.Native : TokenType.Native,
                    }

                },
            }
        } else if (isShitStrapPayment) {
            return {
                mode: ShitstrapPaymentMode.Payment,
                payment: {
                    chainId,
                    contractChosen: true,
                    shitstrapAddress: decodedMessage.wasm.execute.contract_addr,
                    amount: HugeDecimal.from(decodedMessage.wasm.execute.msg.shit_strap.shit.amount).toHumanReadableString(6),
                    eligibleAssets: [],
                }
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
