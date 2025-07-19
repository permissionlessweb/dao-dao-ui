// import { constSelector, selectorFamily, waitForAll } from 'recoil'

// import { nftQueries } from '@dao-dao/state/query'
// import { CommonNftSelectors, queryClientAtom } from '@dao-dao/state/recoil'
// import { LazyNftCardInfo, LoadingNfts, WithChainId } from '@dao-dao/types'


// import { Infusion } from '@dao-dao/types/contracts/CwInfuser'
// import { Post } from '../../../Press/types'

// export const infusionsSelecta = selectorFamily<
//     Infusion[],
//     WithChainId<{ contractAddress: string }>
// >({
//     key: 'infusions',
//     get:
//         ({ contractAddress, chainId }) =>
//             ({ get }) => {
//                 const tokenIds = get(
//                     CommonNftSelectors.unpaginatedAllTokensSelector({
//                         contractAddress,
//                         chainId,
//                     })
//                 )

//                 const tokenInfos = get(
//                     waitForAll(
//                         tokenIds.map((tokenId) =>
//                             CommonNftSelectors.nftInfoSelector({
//                                 contractAddress,
//                                 chainId,
//                                 params: [
//                                     {
//                                         tokenId,
//                                     },
//                                 ],
//                             })
//                         )
//                     )
//                 )

//                 const posts = get(
//                     waitForAll(
//                         tokenInfos.map((tokenInfo, index) =>
//                             tokenInfo.token_uri
//                                 ? infusionSelecta({
//                                     id: tokenIds[index],
//                                     metadataUri: tokenInfo.token_uri,
//                                 })
//                                 : constSelector(undefined)
//                         )
//                     )
//                 )

//                 return posts.filter((post): post is Infusion => !!post)
//             },
// })

// export const infusionSelecta = selectorFamily<
//     Post | undefined,
//     { id: string; metadataUri: string }
// >({
//     key: 'infusions',
//     get:
//         ({ id, metadataUri }) =>
//             async ({ get }) => {
//                 const queryClient = get(queryClientAtom)
//                 const data = await queryClient
//                     .fetchQuery(nftQueries.metadataFromUri({ tokenUri: metadataUri }))
//                     .catch(() => undefined)
//                 if (!data || !('properties' in data)) {
//                     return
//                 }

//                 const created = new Date(data.properties.created)
//                 //   const pastVersions: PostVersion[] = (
//                 //     data.properties.pastVersions || []
//                 //   ).map(
//                 //     ({
//                 //       created,
//                 //       ...version
//                 //     }: {
//                 //       id: string
//                 //       created: string
//                 //     }): PostVersion => ({
//                 //       ...version,
//                 //       created: new Date(created),
//                 //     })
//                 //   )

//                 return {
//                     id,
//                     title: data.name || id,
//                     description: data.description,
//                     content: data.properties.content,
//                     // Use `image` field directly since we want it to use IPFS protocol.
//                     // `data.imageUrl` is processed into `https`, so don't use it.
//                     image: data.image,
//                     created,
//                     // pastVersions,
//                     // initiallyCreated:
//                     //   pastVersions.length > 0 ? pastVersions[0].created : created,
//                 }
//             },
// })

// export const lazyNftCardInfosForDaoSelector = selectorFamily<
//     // Map chain ID to DAO-owned NFTs on that chain.
//     LoadingNfts<LazyNftCardInfo>,
//     WithChainId<{
//         infusionMinter: string
//         infusedCollection?: string,
//     }>
// >({
//     key: 'lazyNftCardInfosForDao',
//     get:
//         ({ chainId, infusionMinter, infusedCollection }) =>
//             async ({ get }) => {
//                 const queryClient = get(queryClientAtom)
//                 if (infusedCollection) {



//                 }
//                 const nfts = useCachedLoadingWithError(
//                     CommonNftSelectors.paginatedAllTokensSelector({
//                         chainId,
//                         contractAddress: collectionAddress,
//                         page,
//                         pageSize: NFTS_PER_PAGE,
//                     }),
//                     (data) =>
//                         data.map((tokenId) => ({
//                             key: getNftKey(chainId, collectionAddress, tokenId),
//                             chainId,
//                             collectionAddress,
//                             tokenId,
//                             stakingContractAddress,
//                             type: 'owner' as const,
//                         }))
//                 )

//                 const allOnfts =
//                     chainId === ChainId.OmniflixHubMainnet ||
//                         chainId === ChainId.OmniflixHubTestnet
//                         ? await queryClient.fetchQuery(
//                             omniflixQueries.allOnfts(queryClient, {
//                                 chainId,
//                                 owner: coreAddress,
//                             })
//                         )
//                         : []

//                 const startingAllNfts: LoadingNfts<LazyNftCardInfo> = allOnfts.length
//                     ? {
//                         [chainId]: {
//                             loading: false,
//                             errored: false,
//                             updating: false,
//                             data: allOnfts.flatMap(({ collection, onfts }) =>
//                                 onfts.map(
//                                     (onft): LazyNftCardInfo => ({
//                                         key: getNftKey(chainId, collection.id, onft.id),
//                                         chainId,
//                                         tokenId: onft.id,
//                                         collectionAddress: collection.id,
//                                     })
//                                 )
//                             ),
//                         },
//                     }
//                     : {}

//                 return Object.entries(allNfts).reduce(
//                     (acc, [chainId, { owners, collectionAddresses }]) => {
//                         collectionAddresses = Array.from(new Set(collectionAddresses))

//                         // Get all token IDs owned by the DAO for each collection.
//                         const nftCollectionTokenIds = get(
//                             waitForNone(
//                                 collectionAddresses.flatMap((collectionAddress) =>
//                                     owners.map((owner) =>
//                                         CommonNftSelectors.unpaginatedAllTokensForOwnerSelector({
//                                             contractAddress: collectionAddress,
//                                             chainId,
//                                             owner,
//                                         })
//                                     )
//                                 )
//                             )
//                         )

//                         // Get all lazy info for each collection.
//                         const lazyNftCardProps = collectionAddresses.flatMap(
//                             (collectionAddress, index) =>
//                                 nftCollectionTokenIds[index].state === 'hasValue'
//                                     ? (nftCollectionTokenIds[index].contents as string[]).map(
//                                         (tokenId): LazyNftCardInfo => ({
//                                             key: getNftKey(chainId, collectionAddress, tokenId),
//                                             chainId,
//                                             tokenId,
//                                             collectionAddress,
//                                             type: 'collection',
//                                         })
//                                     )
//                                     : []
//                         )

//                         const newChainLoadingNfts: LoadingDataWithError<LazyNftCardInfo[]> =
//                             nftCollectionTokenIds.length > 0 &&
//                                 nftCollectionTokenIds.every(
//                                     (loadable) => loadable.state === 'loading'
//                                 )
//                                 ? {
//                                     loading: true,
//                                     errored: false,
//                                 }
//                                 : {
//                                     loading: false,
//                                     errored: false,
//                                     updating: nftCollectionTokenIds.some(
//                                         (loadable) => loadable.state === 'loading'
//                                     ),
//                                     data: lazyNftCardProps,
//                                 }

//                         const existingChainLoadingNfts = acc[chainId] ? [acc[chainId]!] : []

//                         const loadingNfts = combineLoadingDataWithErrors(
//                             newChainLoadingNfts,
//                             ...existingChainLoadingNfts
//                         )

//                         return {
//                             ...acc,
//                             [chainId]: loadingNfts,
//                         }
//                     },
//                     startingAllNfts
//                 )
//             },
// })