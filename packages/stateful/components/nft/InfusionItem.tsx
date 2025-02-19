// InfusionItem.tsx

import { nftQueries } from "@dao-dao/state/query";
import { CommonNftSelectors, walletLazyNftCardInfosSelector } from "@dao-dao/state/recoil";
import { HorizontalInfusionCard, HorizontalInfusionCardProps, HorizontalScroller, NftCard, useCachedLoadable, useCachedLoadingWithError, useDao } from "@dao-dao/stateless";
import { Infusion } from "@dao-dao/types/contracts/CwInfuser";
import { combineLoadingDataWithErrors, makeCombineQueryResultsIntoLoadingData, makeCombineQueryResultsIntoLoadingDataWithError, transformLoadingDataWithError } from "@dao-dao/utils";
import { QueryClient, useQueries } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { EntityDisplay } from "../EntityDisplay";
import { LazyNftCardInfo, LoadingDataWithError } from "@dao-dao/types";
import { useEntity, useWallet } from "../../hooks";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { InfuseNftsData } from "../../actions/core/actions/TransferInfusions/Component";

interface InfusionItemProps {
    isProposalAction: boolean;
    wallet: string;
    fieldNamePrefix: string;
    infusionInfo: Infusion;
    chainId: string;
    queryClient: QueryClient;
    index: string,
}

const InfusionItem: React.FC<InfusionItemProps> = ({ infusionInfo, chainId, queryClient, index, fieldNamePrefix, wallet, isProposalAction }) => {
    const { t } = useTranslation()

    const { watch, } = useFormContext<InfuseNftsData>()
    const watchChainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
    const watchInfusionMinter = watch((fieldNamePrefix + 'infusionMinter') as 'infusionMinter')
    const watchInfusionId = watch((fieldNamePrefix + 'infusionId') as 'infusionId')
    const watchInfusionBundles = watch((fieldNamePrefix + 'infusionBundles') as 'infusionBundles')
    const watchFunds = watch((fieldNamePrefix + 'funds') as 'funds')
    const watchTokenId = watch((fieldNamePrefix + 'tokenId') as 'tokenId')
    const watchCollection = watch((fieldNamePrefix + 'collection') as 'collection')

    // loads nfts from infused collection
    const allTokensLoadable = useCachedLoadable(
        CommonNftSelectors.unpaginatedAllTokensSelector({
            contractAddress: infusionInfo.infused_collection.addr!,
            chainId,
        })
    );

    const first100Cards = useQueries({
        queries:
            allTokensLoadable.state === 'hasValue'
                ? allTokensLoadable.contents.slice(0, 100).map((tokenId) =>
                    nftQueries.cardInfo(queryClient, {
                        collection: infusionInfo.infused_collection.addr!,
                        chainId,
                        tokenId,
                    })
                )
                : [],
        combine: makeCombineQueryResultsIntoLoadingData(),
    })

    // if using infusion widget, we dont use cached loading but lazily load wallets nft balances
    const nfts = !isProposalAction ? walletLazyNftCardInfosSelector({
        walletAddress: wallet,
        chainId: chainId,
    }) : undefined


    // gets the nfts owned by wallet or dao
    const nftOptions = useCachedLoadingWithError(
        walletLazyNftCardInfosSelector({
            walletAddress: wallet,
            chainId: chainId,
        })
    )
    const allChainOptions = nftOptions.loading || nftOptions.errored
        ? nftOptions : combineLoadingDataWithErrors(
            ...Object.values(nftOptions.data).filter(
                (data): data is LoadingDataWithError<LazyNftCardInfo[]> => !!data
            )
        )

    // filter nft info by accepted collection for current infusion 
    const entityEligibleNFTs: LoadingDataWithError<LazyNftCardInfo[]> = !allChainOptions.errored && !allChainOptions.loading
        ? {
            loading: false,
            errored: false,
            data: allChainOptions.data.filter((nft) =>
                infusionInfo.collections.some((collection) =>
                    collection.addr == nft.collectionAddress

                )
            ),
        }
        : allChainOptions;

    // gets the nfts info for the selected nft.
    const selectedNfts = useQueries({
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

    const newIi: HorizontalInfusionCardProps = { ...infusionInfo, selectedNfts, chainId, fieldNamePrefix, entityEligibleNFTs, isProposalAction, EntityDisplay };
    return <>
        <HorizontalInfusionCard key={index.toString()} {...newIi} />
    </ >;
};

export default InfusionItem;