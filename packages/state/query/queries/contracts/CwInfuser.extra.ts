import { QueryClient, queryOptions } from '@tanstack/react-query'
import { Infusion, Config, InfusionWithDetails, InfusionsEligibleCollection, InfusionConfig } from "@dao-dao/types/contracts/CwInfuser"
import { cwInfuserQueries } from './CwInfuser'
import { nftQueries } from '../nft'
import { cw721BaseQueries } from './Cw721Base'
import { tokenQueries } from '../token'
import { TokenType } from '@dao-dao/types'

/**
 * Fetch a infusion instance via id
 */
export const fetchInfusionConfig = async (
    queryClient: QueryClient,
    {
        chainId,
        address,
    }: {
        chainId: string
        address: string
    }
): Promise<InfusionConfig> => {
    const config = await Promise.all([
        queryClient.fetchQuery(
            cwInfuserQueries.config(
                queryClient, {
                chainId,
                contractAddress: address,
            }
            )
        )
    ])

    // Create an array of queries to fetch token info for both fees
    const creationFees = [
        // Always fetch min_creation_fee token info if it exists
        config[0].min_creation_fee?.denom
            ? queryClient.fetchQuery(
                tokenQueries.info(queryClient, {
                    chainId,
                    type: TokenType.Native,
                    denomOrAddress: config[0].min_creation_fee.denom
                })
            )
            : null,

        // Always fetch min_infusion_fee token info if it exists
        config[0].min_infusion_fee?.denom
            ? queryClient.fetchQuery(
                tokenQueries.info(queryClient, {
                    chainId,
                    type: TokenType.Native,
                    denomOrAddress: config[0].min_infusion_fee.denom
                })
            )
            : null
    ]

    // Use Promise.all to fetch token info in parallel
    const paymentSub = await Promise.all(creationFees)


    const creation_fee = paymentSub[0] ? {
        token: paymentSub[0],
        balance: config[0].min_creation_fee!.amount,
    } : null
    const infusion_fee = paymentSub[1] ? {
        token: paymentSub[1],
        balance: config[0].min_infusion_fee!.amount,
    } : null
    console.log(creation_fee)
    // Replace the fee objects in config with the token info
    const updatedConfig = {
        ...config[0],
        creation_fee,
        infusion_fee,
    }

    return updatedConfig
}
/**
 * Fetch a infusion instance via id
 */
export const fetchInfusionById = async (
    queryClient: QueryClient,
    {
        chainId,
        address,
        id,
    }: {
        chainId: string
        address: string
        id: number
    }
): Promise<InfusionWithDetails> => {

    // grab infusion
    const infusion = await Promise.all([
        queryClient.fetchQuery(
            cwInfuserQueries.infusionById(
                queryClient, {
                chainId,
                contractAddress: address,
                args: { id }
            }
            )
        )
    ])

    // grab infused collection base uri 
    const infusedCollectionInfo = infusion[0].infused_collection.addr ? await Promise.all([
        queryClient.fetchQuery(
            cw721BaseQueries.collectionInfo({ chainId, contractAddress: infusion[0].infused_collection.addr })
        ),
        queryClient.fetchQuery(cw721BaseQueries.contractInfo({ chainId, contractAddress: infusion[0].infused_collection.addr }))
    ]) : null

    // grab collection details for each eligible collection
    const eligibleCollections = infusion[0].collections.map(async (cols) => {
        // fetch collection info
        const colInfo = await Promise.all([
            queryClient.fetchQuery(
                cw721BaseQueries.collectionInfo({ chainId, contractAddress: cols.addr })
            ),
            queryClient.fetchQuery(cw721BaseQueries.contractInfo({ chainId, contractAddress: cols.addr }))
        ])

        // fetch token info for payment substitute if eligible. 
        const paymentSub = cols.payment_substitute ? await Promise.all([
            queryClient.fetchQuery(
                tokenQueries.info(queryClient, {
                    chainId, type: TokenType.Native,
                    denomOrAddress: cols.payment_substitute.denom
                })
            )
        ]) : null


        const payment_substitute = paymentSub ? {
            token: paymentSub[0],
            balance: cols.payment_substitute?.amount,
        } : null

        return {
            addr: cols.addr,
            collectionInfo: colInfo[0],
            contractInfo: colInfo[1],
            max_req: cols.max_req,
            min_req: cols.min_req,
            payment_substitute: paymentSub ? payment_substitute : cols.payment_substitute,
        } as InfusionsEligibleCollection
    })

    // grab generic token info for mint fee, if exist
    const mint_fee_generic = infusion[0].infusion_params.mint_fee ? await Promise.all([
        queryClient.fetchQuery(
            tokenQueries.info(queryClient, {
                chainId, type: TokenType.Native,
                denomOrAddress: infusion[0].infusion_params.mint_fee.denom
            })
        )
    ]) : null

    // update the infusion param types with generic info
    const infusion_fee = mint_fee_generic
        ? {
            token: mint_fee_generic[0],
            balance: infusion[0].infusion_params.mint_fee?.amount!,
        }
        : null;

    const infusionParamsGeneric = infusion_fee
        ? {
            ...infusion[0].infusion_params,
            mintFeeGeneric: infusion_fee,

        }
        : {
            ...infusion[0].infusion_params,
            mintFeeGeneric: null
        };

    const infusedCollection = infusion[0].infused_collection;
    const queryDataForInfusedCol = infusedCollectionInfo ? await Promise.all(infusedCollectionInfo) : null;
    infusedCollection.image = queryDataForInfusedCol ? queryDataForInfusedCol[0].image : infusedCollection.image;


    return {
        owner: infusion[0].owner,
        description: infusion[0].description,
        eligibleCollections: await Promise.all(eligibleCollections),
        infused_collection: infusedCollection,
        infusionParamsGeneric: infusionParamsGeneric,
        payment_recipient: infusion[0].payment_recipient,
    };
}


export const cwInfuserExtraQueries = {
    /**
     * Fetch a infusion via its infusion id .
     */

    infusionById: (
        queryClient: QueryClient,
        options: Parameters<typeof fetchInfusionById>[1]
    ) =>
        queryOptions({
            queryKey: ['cwInfusionExtra', 'infusionById', options],
            queryFn: () => fetchInfusionById(queryClient, options),
        }),

    config: (
        queryClient: QueryClient,
        options: Parameters<typeof fetchInfusionConfig>[1]
    ) =>
        queryOptions({
            queryKey: ['cwInfusionExtra', 'config', options],
            queryFn: () => fetchInfusionConfig(queryClient, options),
        }),
}