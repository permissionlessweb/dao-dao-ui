// InfusionItem.tsx

import { nftQueries } from "@dao-dao/state/query";
import { CommonNftSelectors } from "@dao-dao/state/recoil";
import { HorizontalInfusionCard, HorizontalInfusionCardProps, HorizontalScroller, NftCard, useCachedLoadable } from "@dao-dao/stateless";
import { Infusion } from "@dao-dao/types/contracts/CwInfuser";
import { makeCombineQueryResultsIntoLoadingData } from "@dao-dao/utils";
import { QueryClient, useQueries } from "@tanstack/react-query";


interface InfusionItemProps {
    infusionInfo: Infusion;
    chainId: string;
    queryClient: QueryClient;
    index: string,
}

const InfusionItem: React.FC<InfusionItemProps> = ({ infusionInfo, chainId, queryClient, index }) => {
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

    const newIi: HorizontalInfusionCardProps = { ...infusionInfo, chainId: chainId };
    // Render your infusion item here
    return <div>
        <HorizontalInfusionCard key={index.toString()} {...newIi} />
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

    </div>;
};

export default InfusionItem;