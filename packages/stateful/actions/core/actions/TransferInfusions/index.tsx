import { ActionBase, AddressInput, BoxEmoji, useActionOptions, useCachedLoadingWithError } from "@dao-dao/stateless";
import { ActionComponent, ActionContextType, ActionKey, ActionMatch, ActionOptions, Coin, LazyNftCardInfo, LoadingDataWithError, ProcessedMessage, TokenType, UnifiedCosmosMsg } from "@dao-dao/types";
import { InfuseNftsComponent, InfuseNftsData } from "./Component";
import { chainIsIndexed, combineLoadingDataWithErrors, encodeJsonToBase64, getChainAddressForActionOptions, makeCombineQueryResultsIntoLoadingDataWithError, makeExecuteSmartContractMessage, maybeMakePolytoneExecuteMessages, objectMatchesStructure } from "@dao-dao/utils";
import { useFieldArray, useFormContext } from "react-hook-form";
import { lazyNftCardInfosForDaoSelector, walletLazyNftCardInfosSelector } from "@dao-dao/state/recoil";
import { useCw721CommonGovernanceTokenInfoIfExists } from "../../../../voting-module-adapter";
import { constSelector } from "recoil";
import { NftSelectionModal } from "../../../../components";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { cw721BaseQueries, cwInfuserExtraQueries, cwInfuserQueries, nftQueries } from "@dao-dao/state/query";
import { NFT } from "@dao-dao/types/contracts/CwInfuser";
import { useTokenBalances } from "../../../hooks";
import { HugeDecimal } from "@dao-dao/math";

/**  
 * Get infusion config
 */
const getInfusionConfig = (
    options: ActionOptions,
    infuserAddr: string,
) => {
    const infusionConfig = chainIsIndexed(options.chain.chainId) ? cwInfuserExtraQueries.config(options.queryClient, {
        chainId: options.chain.chainId,
        address: infuserAddr,
    }) : []
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

const Component: ActionComponent<undefined, InfuseNftsData> = (props) => {
    const queryClient = useQueryClient()
    const options = useActionOptions()
    const currentChainId = options.chain.chainId

    const { watch, control, } = useFormContext<InfuseNftsData>()
    const { denomOrAddress: governanceCollectionAddress } =
        useCw721CommonGovernanceTokenInfoIfExists() ?? {}

    const watchChainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
    const watchInfusionMinter = watch((props.fieldNamePrefix + 'infusionMinter') as 'infusionMinter')
    const watchInfusionId = watch((props.fieldNamePrefix + 'infusionId') as 'infusionId')
    const watchInfusionBundles = watch((props.fieldNamePrefix + 'infusionBundles') as 'infusionBundles')
    const watchFunds = watch((props.fieldNamePrefix + 'funds') as 'funds')
    const watchTokenId = watch((props.fieldNamePrefix + 'tokenId') as 'tokenId')
    const watchCollection = watch((props.fieldNamePrefix + 'collection') as 'collection')

    const cw20 = false

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
            ? nftOptions
            : combineLoadingDataWithErrors(
                ...Object.values(nftOptions.data).filter(
                    (data): data is LoadingDataWithError<LazyNftCardInfo[]> => !!data
                )
            )

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
        <InfuseNftsComponent
            {...props}
            options={{
                infusionInfo: infusionInfoLDWE,
                options: availableToInfuse,
                nftInfos: watchChainId && watchInfusionBundles ? nftInfos : undefined,
                tokens,
                AddressInput,
                NftSelectionModal,
            }}
        />)
}

export class InfusedNftAction extends ActionBase<InfuseNftsData> {
    public readonly key = ActionKey.InfuseNfts
    public readonly Component = Component

    constructor(options: ActionOptions) {
        super(options, {
            Icon: BoxEmoji,
            label: options.t('title.infuseNfts'),
            description: options.t('info.infuseNftsDescription', {
                context: options.context.type,
            }),
        })

        this.defaults = {
            chainId: options.chain.chainId,
            infusionMinter: '',
            infusionId: '0',
            infusionBundles: [],
            collection: '',
            tokenId: '',
            funds: []
        }


    }

    encode({
        chainId,
        infusionMinter,
        infusionId,
        infusionBundles,
        funds,
    }: InfuseNftsData): UnifiedCosmosMsg[] {
        const sender = getChainAddressForActionOptions(this.options, chainId)
        if (!sender) {
            throw new Error('No sender found for chain.')
        }

        // for each nft in infusion Bundles, create the approve msgs
        const approveNftsMsgs = infusionBundles.flatMap((ib) => {
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
            contractAddress: infusionMinter,
            msg: {
                infuse: {
                    infusion_id: infusionId,
                    bundle: infusionBundles,
                },
            },
            funds: funds
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
    }

    match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
        return (
            objectMatchesStructure(decodedMessage, {
                wasm: {
                    execute: {
                        contract_addr: {},
                        funds: {},
                        msg: {
                            infuse: {
                                infusion_id: {},
                                bundle: {},
                            },
                        },
                    },
                },
            })
        )
    }

    decode([
        {
            decodedMessage,
            account: { chainId },
        },
    ]: ProcessedMessage[]): InfuseNftsData {

        return {
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