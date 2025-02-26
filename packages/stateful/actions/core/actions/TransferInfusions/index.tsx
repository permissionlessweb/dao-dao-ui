import { ActionBase, AddressInput, BoxEmoji, Loader, SegmentedControls, useActionOptions, useCachedLoadingWithError } from "@dao-dao/stateless";
import { ActionComponent, ActionComponentProps, ActionContextType, ActionKey, ActionMatch, ActionOptions, Coin, LazyNftCardInfo, LoadingDataWithError, ProcessedMessage, SegmentedControlsProps, TokenType, TypedOption, UnifiedCosmosMsg } from "@dao-dao/types";
import { InfuseNftsComponent, InfuseNftsData } from "./InfuseNfts";
import { chainIsIndexed, combineLoadingDataWithErrors, encodeJsonToBase64, getChainAddressForActionOptions, makeCombineQueryResultsIntoLoadingDataWithError, makeExecuteSmartContractMessage, maybeMakePolytoneExecuteMessages, objectMatchesStructure } from "@dao-dao/utils";
import { useFieldArray, useFormContext } from "react-hook-form";
import { lazyNftCardInfosForDaoSelector, walletLazyNftCardInfosSelector } from "@dao-dao/state/recoil";
import { useCw721CommonGovernanceTokenInfoIfExists } from "../../../../voting-module-adapter";
import { constSelector } from "recoil";
import { NftSelectionModal, SuspenseLoader } from "../../../../components";
import { QueryClient, useQueries, useQueryClient } from "@tanstack/react-query";
import { cw721BaseQueries, cwInfuserExtraQueries, cwInfuserQueries, nftQueries } from "@dao-dao/state/query";
import { ExecuteMsg, NFT } from "@dao-dao/types/contracts/CwInfuser";
import { useTokenBalances } from "../../../hooks";
import { HugeDecimal } from "@dao-dao/math";
import { CreateInfusion, CreateInfusionData } from "./CreateInfusion";
import { useTranslation } from "react-i18next";
import { ComponentType } from "react";
import { InfusionWidgetData } from "../../../../widgets/widgets/Infusions/types";

enum InfusionActionMode {
    Create = 'create',
    Infuse = 'infuse'
}

// data coming from action tabs content
export type ManageInfusionsData = {
    mode: InfusionActionMode
    create: CreateInfusionData
    infuse: InfuseNftsData

}

// init shitstrap json object
const instantiateStructure = {
    instantiate_msg: {
        admin: {},
        admin_fee: {},
        min_creation_fee: {},
        min_infusion_fee: {},
        min_per_bundle: {},
        max_per_bundle: {},
        max_bundles: {},
        max_infusions: {},
        cw721_code_id: {},
        //   sg: {},
    },
    label: {},
}

// create new infusion structure
const createInfusionStructure = { create_infusion: { infusions: {} } }

// infuse bundles structure
const infuseBundlesStructure = { infuse: { infusion_id: {}, bundle: {} } }

/**  
 * Get infusion config
 */
const getInfusionConfig = (

    queryClient: QueryClient,
    chainId: string,
    infuserAddr: string,
) => {
    const infusionConfig = cwInfuserExtraQueries.config(queryClient, {
        chainId: chainId,
        address: infuserAddr,
    })
    return infusionConfig
}

/**  
 * Get infusion info by infusion id
 */
const getInfusionById = (
    options: ActionOptions,
    infuserAddr: string,
    infusionId: number
) => {
    const infusionInfo = cwInfuserExtraQueries.infusionById(options.queryClient, {
        chainId: options.chain.chainId,
        address: infuserAddr,
        id: infusionId,
    })
    return infusionInfo
}


// Check if infuser is approved for this token id 
const getIsInfuserApproved = (options: ActionOptions, nftAddr: string, spender: string, tokenId: string) => {
    const infusionInfo = cw721BaseQueries.approval({ chainId: options.chain.chainId, contractAddress: nftAddr, args: { spender, tokenId } })
    return infusionInfo
}

// grabs the infusion config from the infusion minter defined in form
const useInfusionConfigFromForm = (queryClient: QueryClient, chainId: string, infusionMinter: string,) => {
    return useQueries({
        queries: [getInfusionConfig(queryClient, chainId, infusionMinter)],
        combine: makeCombineQueryResultsIntoLoadingDataWithError({
            transform: (infos) => infos.flat(),
        }),
    })
}
const useInfusionContractFromForm = (options: ActionOptions, infusionMinter: string, infusionId: string) => {
    return useQueries({
        queries: [getInfusionById(options, infusionMinter, parseInt(infusionId))],
        combine: makeCombineQueryResultsIntoLoadingDataWithError({
            transform: (infos) => infos.flat(),
        }),
    })
}

const useAppendAnyBundleNftApproveMsgs = (options: ActionOptions, infusionMinter: string, nfts: NFT[]) => {
    const nftApprovalQueries = nfts.map((n) => getIsInfuserApproved(options, n.addr, infusionMinter, n.token_id.toString()))
    return useQueries({
        queries: nftApprovalQueries,
        combine: makeCombineQueryResultsIntoLoadingDataWithError({
            transform: (infos) => infos.flat(),
        }),
    })
}

const Component: ComponentType<ActionComponentProps<undefined, ManageInfusionsData>> = ({ ...props }) => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    const options = useActionOptions()
    const currentChainId = options.chain.chainId
    const { watch, setValue } = useFormContext<ManageInfusionsData>()

    const { denomOrAddress: governanceCollectionAddress } = useCw721CommonGovernanceTokenInfoIfExists() ?? {}

    const mode = watch((props.fieldNamePrefix + 'mode') as 'mode')
    const watchChainId = mode === 'create' ? watch((props.fieldNamePrefix + 'create.chainId') as 'create.chainId') : watch((props.fieldNamePrefix + 'infuse.chainId') as 'infuse.chainId')
    const watchInfusionMinter = mode === 'create' ?
        watch((props.fieldNamePrefix + 'create.infusionMinter') as 'create.infusionMinter') :
        watch((props.fieldNamePrefix + 'infuse.infusionMinter') as 'infuse.infusionMinter')
    const watchInfusionId = watch((props.fieldNamePrefix + 'infuse.infusionId') as 'infuse.infusionId')
    const watchInfusionBundles = watch((props.fieldNamePrefix + 'infuse.infusionBundles') as 'infuse.infusionBundles')
    const watchFunds = watch((props.fieldNamePrefix + 'infuse.funds') as 'infuse.funds')
    const watchTokenId = watch((props.fieldNamePrefix + 'infuse.tokenId') as 'infuse.tokenId')
    const watchCollection = watch((props.fieldNamePrefix + 'infuse.collection') as 'infuse.collection')
    const cw20 = false


    const tabs: SegmentedControlsProps<ManageInfusionsData['mode']>['tabs'] = [
        // Only allow beginning a vest if widget is setup. ([
        {
            label: t('title.createInfusion'),
            value: InfusionActionMode.Create,
        },
        {
            label: t('title.infuseNfts'),
            value: InfusionActionMode.Infuse,
        },
    ] as TypedOption<ManageInfusionsData['mode']>[]
    const selectedTab = tabs.find((tab) => tab.value === mode)


    const tokens = useTokenBalances({
        // Load selected tokens when not creating in case they are no longer
        // returned in the list of all tokens for the given DAO/wallet after the
        // proposal is made.
        additionalTokens: props.isCreating
            ? undefined
            : watchFunds.map(({ denom }) => ({
                chainId: watchChainId,
                type: cw20 ? TokenType.Cw20 : TokenType.Native,
                denomOrAddress: denom,
            })),
    })

    // gets the nfts owned by wallet or dao
    const nftOptions = useCachedLoadingWithError(
        props.isCreating
            ? options.context.type === ActionContextType.Wallet
                ? walletLazyNftCardInfosSelector({
                    walletAddress: options.address,
                    chainId: currentChainId,
                })
                : lazyNftCardInfosForDaoSelector({
                    chainId: currentChainId,
                    coreAddress: options.address,
                    governanceCollectionAddress,
                })
            : undefined
    )

    // gets the nfts info for the selected nft.
    const nftInfos = useQueries({
        queries:
            watchChainId && watchInfusionMinter && watchInfusionId && watchCollection && watchTokenId
                ? watchInfusionBundles.flatMap((infuse) =>
                    infuse.nfts.map((nft) => nftQueries.cardInfo(
                        queryClient,
                        { chainId: watchChainId, collection: nft.addr, tokenId: nft.token_id.toString() }
                    ))
                )
                : [],
        combine: makeCombineQueryResultsIntoLoadingDataWithError(),
    })

    const allChainOptions =
        nftOptions.loading || nftOptions.errored
            ? nftOptions : combineLoadingDataWithErrors(
                ...Object.values(nftOptions.data).filter(
                    (data): data is LoadingDataWithError<LazyNftCardInfo[]> => !!data
                )
            )

    const infusionConfig = useInfusionConfigFromForm(options.queryClient, watchChainId, watchInfusionMinter)
    const infusionInfoLDWE = useInfusionContractFromForm(options, watchInfusionMinter, watchInfusionId)
    const infusionInfo = !infusionInfoLDWE.errored && !infusionInfoLDWE.loading ? infusionInfoLDWE.data : []

    // filter nft info by accepted collection for current infusion 
    const availableToInfuse: LoadingDataWithError<LazyNftCardInfo[]> = !allChainOptions.errored && !allChainOptions.loading
        ? {
            loading: false,
            errored: false,
            data: allChainOptions.data.filter((nft) =>
                infusionInfo.some((infusion) =>
                    infusion.collections.some((collection) =>
                        collection.addr == nft.collectionAddress
                    )
                )
            ),
        }
        : allChainOptions;

    return (
        <SuspenseLoader fallback={<Loader />}>
            {props.isCreating ? (
                <SegmentedControls<ManageInfusionsData['mode']>
                    className="mb-2"
                    onSelect={(value) =>
                        setValue((props.fieldNamePrefix + 'mode') as 'mode', value)
                    }
                    selected={mode}
                    tabs={tabs}
                />
            ) : (<p className="title-text mb-2">{selectedTab?.label}</p>)}
            {mode === InfusionActionMode.Create ? (

                <CreateInfusion
                    {...props}
                    fieldNamePrefix={props.fieldNamePrefix + 'create.'}
                    options={{
                        infusion: infusionConfig,
                        tokens, AddressInput,
                    }}
                />) : null}
            {mode === InfusionActionMode.Infuse ? (
                <InfuseNftsComponent
                    {...props}
                    fieldNamePrefix={props.fieldNamePrefix + 'infuse.'}
                    options={{
                        infusionInfo: infusionInfoLDWE,
                        options: availableToInfuse,
                        selectedNfts: watchChainId && watchInfusionBundles ? nftInfos : undefined,
                        tokens,
                        AddressInput,
                        NftSelectionModal,
                    }}
                />) : null}

        </SuspenseLoader>)
}

// Only check if widget exists in DAOs.
const DaoComponent: ActionComponent<undefined, ManageInfusionsData> = (
    props
) => {
    return <Component {...props} />
}

const WalletComponent: ActionComponent<undefined, ManageInfusionsData> = (
    props
) => <Component {...props} />

export class ManageInfusionAction extends ActionBase<ManageInfusionsData> {
    public readonly key = ActionKey.InfuseNfts
    public readonly Component: ActionComponent<undefined, ManageInfusionsData>

    constructor(options: ActionOptions) {
        super(options, {
            Icon: BoxEmoji,
            label: options.t('title.infuseNfts'),
            description: options.t('info.infuseNftsDescription', {
                context: options.context.type,
            })
        })

        this.Component =
            options.context.type === ActionContextType.Dao
                ? DaoComponent
                : WalletComponent


        // Fire async init immediately since we may hide this action.
        this.init().catch(() => { })
    }

    async setup() {
        this.defaults = {
            mode: InfusionActionMode.Infuse,
            create: {
                infusionMinter: '',
                chainId: this.options.chain.chainId,
                collections: [],
                infusedCollection: { base_uri: '', name: '', num_tokens: 0, sg: true, symbol: '' },
                infusionParams: {},
                paymentRecipient: '',
                owner: '',
                deposit: []
            },
            infuse: {
                paymentSubstituteExists: false,
                chainId: this.options.chain.chainId,
                infusionMinter: '',
                infusionId: '0',
                infusionBundles: [],
                collection: '',
                tokenId: '',
                funds: []
            },
        }

    }

    async encode({
        mode, create, infuse
    }: ManageInfusionsData): Promise<UnifiedCosmosMsg[]> {
        let chainId: string
        let cosmosMsg: UnifiedCosmosMsg

        if (mode === 'create') {
            chainId = create.chainId
            const sender = getChainAddressForActionOptions(this.options, chainId)
            if (!sender) {
                throw new Error('No sender found for chain.')
            }

            const createInfusionMsg = makeExecuteSmartContractMessage({
                chainId,
                sender,
                contractAddress: create.infusionMinter,
                msg: {
                    create_infusion: {
                        infusions: [
                            {
                                owner: create.owner,
                                collections: create.collections.map((coll) => {
                                    return {
                                        addr: coll.addr,
                                        min_req: coll.min_req,
                                        max_req: coll.max_req ?
                                            HugeDecimal.from(coll.max_req).toNumber() : HugeDecimal.from(coll.min_req).toNumber(),
                                        payment_substitute: {
                                            denom: coll.payment_substitute?.denom,
                                            amount: coll.payment_substitute?.amount
                                        },
                                    }
                                }),
                                infused_collection: {
                                    sg: chainId == "stargaze-1" ? true : false,
                                    admin: create.infusedCollection.admin,
                                    name: create.infusedCollection.name,
                                    symbol: create.infusedCollection.symbol,
                                    base_uri: create.infusedCollection.base_uri,
                                    num_tokens: HugeDecimal.from(create.infusedCollection.num_tokens).toNumber(),
                                    royalty_info: {
                                        payment_address: create.infusedCollection.royalty_info?.payment_address,
                                        share: HugeDecimal.fromHumanReadable(create.infusedCollection.royalty_info?.share!, 0),
                                    },
                                    // explicit_content:  create.infusedCollection.explicit_content,
                                    // external_link: create.infusedCollection.external_link,
                                },
                                infusion_params: create.infusionParams,
                                payment_recipient: create.paymentRecipient,
                                // description: create.description
                            }
                        ]
                    }
                },
                funds: create.deposit
                    .map(({ denom, amount }) =>
                        HugeDecimal.from(amount).toCoin(denom)
                    )
                    // Neutron errors with `invalid coins` if the funds list is not
                    // alphabetized.
                    .sort((a, b) => a.denom.localeCompare(b.denom)),
            });

            return maybeMakePolytoneExecuteMessages(
                this.options.chain.chainId,
                chainId,
                createInfusionMsg,
            )
        } else if (mode === 'infuse') {
            chainId = infuse.chainId
            const sender = getChainAddressForActionOptions(this.options, chainId)
            if (!sender) {
                throw new Error('No sender found for chain.')
            }

            // for each nft in infusion Bundles, create the approve msgs
            const approveNftsMsgs = infuse.infusionBundles.flatMap((ib) => {
                return ib.nfts.map((bnfts) => {
                    return makeExecuteSmartContractMessage({
                        chainId,
                        sender,
                        contractAddress: bnfts.addr,
                        msg: {
                            approve: {
                                token_id: bnfts.token_id.toString(),
                                spender: sender,
                                //todo: add expiration
                            },
                        },
                    });
                })
            })
            const infusionMsg = makeExecuteSmartContractMessage({
                chainId,
                sender,
                contractAddress: infuse.infusionMinter,
                msg: {
                    infuse: {
                        infusion_id: infuse.infusionId,
                        bundle: infuse.infusionBundles,
                    },
                },
                funds: infuse.funds
                    .map(({ denom, amount, decimals }) =>
                        HugeDecimal.fromHumanReadable(amount, decimals).toCoin(denom)
                    )
                    // Neutron errors with `invalid coins` if the funds list is not
                    // alphabetized.
                    .sort((a, b) => a.denom.localeCompare(b.denom)),

            });
            return maybeMakePolytoneExecuteMessages(
                this.options.chain.chainId,
                chainId,
                approveNftsMsgs.concat([infusionMsg]),
            )
        } else {
            throw new Error(this.options.t('error.unexpectedError'))
        }
    }

    // helper to be used in match and decode
    breakDownMessage({ decodedMessage, account: { chainId } }: ProcessedMessage) {
        const isNativeCreate = objectMatchesStructure(decodedMessage, {
            wasm: {
                execute: {
                    contract_addr: {},
                    funds: {},
                    msg: createInfusionStructure,
                },
            },
        })
        const isNativeInfuse = objectMatchesStructure(decodedMessage, {
            wasm: {
                execute: {
                    contract_addr: {},
                    funds: {},
                    msg: infuseBundlesStructure,
                },
            },
        })

        return {
            chainId,
            decodedMessage,
            isNativeCreate,
            isNativeInfuse
        }
    }

    match([message]: ProcessedMessage[]): ActionMatch {
        const { isNativeCreate, isNativeInfuse, } =
            this.breakDownMessage(message)

        return isNativeCreate || isNativeInfuse
    }

    async decode([message]: ProcessedMessage[]): Promise<
        Partial<ManageInfusionsData>
    > {
        const {
            chainId,
            decodedMessage,
            isNativeCreate,
            isNativeInfuse,
        } = this.breakDownMessage(message)

        if (isNativeCreate) {
            return {
                mode: InfusionActionMode.Create,
                create: {
                    chainId,
                    infusionMinter: decodedMessage.wasm.execute.contract_addr,
                    collections: decodedMessage.wasm.execute.msg.create_infusion.collections,
                    infusedCollection: decodedMessage.wasm.execute.msg.create_infusion.infused_collection,
                    infusionParams: decodedMessage.wasm.execute.msg.create_infusion.infusion_params,
                    paymentRecipient: decodedMessage.wasm.execute.msg.create_infusion.payment_recipient,
                    deposit: decodedMessage.wasm.execute.funds,
                },
            }
        } else if (isNativeInfuse) {
            return {
                mode: InfusionActionMode.Infuse,
                infuse: {
                    paymentSubstituteExists: false,
                    chainId,
                    infusionMinter: decodedMessage.wasm.execute.contract_addr,
                    infusionId: decodedMessage.wasm.execute.msg.infuse.infusion_id,
                    infusionBundles: decodedMessage.wasm.execute.msg.infuse.bundle,
                    collection: '',
                    tokenId: '',
                    funds: decodedMessage.wasm.execute.funds,
                }
            }
        }
        // Should never happen.
        throw new Error('Unexpected message')
    }

}