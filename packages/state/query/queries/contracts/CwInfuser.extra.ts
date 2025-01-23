import { QueryClient, queryOptions } from '@tanstack/react-query'
import { Infusion, Config } from "@dao-dao/types/contracts/CwInfuser"
import { cwInfuserQueries } from './CwInfuser'

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
): Promise<Config> => {
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

    return config[0]
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
): Promise<Infusion> => {

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

    return {
        collections: infusion[0].collections,
        infused_collection: infusion[0].infused_collection,
        infusion_params: infusion[0].infusion_params,
        payment_recipient: infusion[0].payment_recipient,
    }
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