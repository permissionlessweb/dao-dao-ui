import { WidgetRendererProps } from "@dao-dao/types";
import { InfusionWidgetData } from "./types";

import { useWallet } from '../../../hooks/useWallet'
import { HorizontalScroller, NftCard, useCachedLoadable, useChain } from "@dao-dao/stateless";
import { useTranslation } from "react-i18next";
import { QueryClient, useQueries, useQueryClient } from "@tanstack/react-query";
import { CommonNftSelectors, cwInfuserExtraQueries, nftQueries } from "@dao-dao/state";
import { makeCombineQueryResultsIntoLoadingData, makeCombineQueryResultsIntoLoadingDataWithError } from "@dao-dao/utils";
import { useFormContext } from "react-hook-form";



const useInfusionContract = (queryClient: QueryClient, chainId: string, infusionMinter: string, infusionId: string) => {
    return useQueries({
        queries: [cwInfuserExtraQueries.infusionById(queryClient, {
            chainId: chainId,
            address: infusionMinter,
            id: parseInt(infusionId),
        })],
        combine: makeCombineQueryResultsIntoLoadingDataWithError({
            transform: (infos) => infos.flat(),
        }),
    })
}


export const InfusionsRenderer = ({
    variables: {
        fieldNamePrefix,
        infusionMinter,
        infusionId,
        selectedInfusionIndex,
        // description,
        // mint: { contract, msg, buttonLabel },
    },
}: WidgetRendererProps<InfusionWidgetData>) => {
    const { t } = useTranslation()
    const { chainId } = useChain()
    const {
        address: walletAddress = '',
        getSigningClient,
        isWalletConnected,
    } = useWallet()

    const { watch, control, } = useFormContext<InfusionWidgetData>()

    const watchInfusionMinter = watch((fieldNamePrefix + 'infusionMinter') as 'infusionMinter')
    const watchInfusionId = watch((fieldNamePrefix + 'infusionId') as 'infusionId')


    const queryClient = useQueryClient()

    const infusionInfoLDWE = useInfusionContract(queryClient, chainId, watchInfusionMinter, watchInfusionId)
    const infusionInfo = !infusionInfoLDWE.errored && !infusionInfoLDWE.loading ? infusionInfoLDWE.data : []
    const selectedInfusion = infusionInfo[selectedInfusionIndex].infused_collection.addr!

    // get nft collection from infusion minter
    const allTokensLoadable = useCachedLoadable(
        CommonNftSelectors.unpaginatedAllTokensSelector({
            contractAddress: selectedInfusion,
            chainId,
        })
    )

    const first100Cards = useQueries({
        queries:
            allTokensLoadable.state === 'hasValue'
                ? allTokensLoadable.contents.slice(0, 100).map((tokenId) =>
                    nftQueries.cardInfo(queryClient, {
                        collection: selectedInfusion,
                        chainId,
                        tokenId,
                    })
                )
                : [],
        combine: makeCombineQueryResultsIntoLoadingData(),
    })


    return (

        <div className="flex flex-col gap-4">
            {(first100Cards.loading || first100Cards.data.length > 0) && (
                <HorizontalScroller
                    Component={NftCard}
                    containerClassName="-mx-16 3xl:-mx-64 px-[1px]"
                    itemClassName="w-64"
                    items={first100Cards}
                    shadowClassName="w-16 3xl:w-64"
                />
            )}

        </div>
    )
}