import { ActionBase, Button, ChainProvider, ErrorPage, HorizontalNftCard, HorizontalNftCardLoader, InputErrorMessage, NativeCoinSelector, NumericInput } from "@dao-dao/stateless";
import { ActionComponent, ActionOptions, AddressInputProps, GenericTokenBalance, LazyNftCardInfo, LoadingData, LoadingDataWithError, NftCardInfo, NftSelectionModalProps } from "@dao-dao/types";
import { Bundle, Infusion, NFT } from "@dao-dao/types/contracts/CwInfuser";
import { TransferNftData } from "../TransferNft/Component";
import { ComponentType, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFieldArray, useFormContext } from "react-hook-form";
import { getChainForChainId, getNftKey, isValidBech32Address, makeValidateAddress, validatePositive, validateRequired } from "@dao-dao/utils";
import clsx from "clsx"
import { useQueryClient } from "@tanstack/react-query";
import { cw721BaseQueries, nftQueries } from "@dao-dao/state/query";
import { Approval } from "@dao-dao/types/contracts/Sg721Base";


export type InfuseNftsData = {
    chainId: string
    infusionMinter: string
    infusionId: string
    // the bundle of nfts being infused
    infusionBundles: Bundle[]
    collection: string
    tokenId: string
    funds: {
        denom: string
        amount: string
        // Will multiply `amount` by 10^decimals when generating the message.
        decimals: number
    }[]
}

export interface InfuseNftsOptions {
    // The set of NFTs that may be infused as part of this action.
    options: LoadingDataWithError<LazyNftCardInfo[]>
    // Information about the NFT currently selected.
    nftInfo: LoadingDataWithError<NftCardInfo | undefined>
    // Information from the Infusion currently selected.
    infusionInfo: LoadingDataWithError<Infusion[] | undefined>
    // // Information about the approval status of NFTs selected to be infused.
    // approvalInfo: LoadingDataWithError<Approval[] | undefined>

    tokens: LoadingData<GenericTokenBalance[]>
    AddressInput: ComponentType<AddressInputProps<InfuseNftsData>>
    NftSelectionModal: ComponentType<NftSelectionModalProps>
}

export const InfuseNftsComponent: ActionComponent<InfuseNftsOptions> = ({
    fieldNamePrefix,
    isCreating,
    errors,
    options: { options, nftInfo, tokens, infusionInfo, AddressInput, NftSelectionModal },
}) => {
    const { t } = useTranslation()
    const { control, watch, setValue, setError, register, clearErrors, } =
        useFormContext<InfuseNftsData>()

    const queryClient = useQueryClient();
    const watchChainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
    const chain = getChainForChainId(watchChainId)

    const watchInfusionMinter = watch((fieldNamePrefix + 'infusionMinter') as 'infusionMinter')
    const watchInfusionId = watch((fieldNamePrefix + 'infusionId') as 'infusionId')
    const watchCollection = watch((fieldNamePrefix + 'collection') as 'collection')
    const watchTokenId = watch((fieldNamePrefix + 'tokenId') as 'tokenId')

    const watchInfuionBundles = watch(
        (fieldNamePrefix + 'infusionBundles') as 'infusionBundles'
    )
    // bundles
    const {
        fields: infusionBundleFields,
        append: appendEligibleAsset,
        remove: removeEligibleAsset,
        update: updateEligibleAsset,
    } = useFieldArray({
        control,
        name: (fieldNamePrefix + 'infusionBundles') as 'infusionBundles',
    })
    // funds 
    const {
        fields: coins,
        append: appendCoin,
        remove: removeCoin,
    } = useFieldArray({
        control,
        name: fieldNamePrefix + 'funds' as 'funds',
    })


    const selectedKey = getNftKey(watchChainId, watchCollection, watchTokenId)

    const infusion = !infusionInfo.errored && !infusionInfo.loading ? infusionInfo.data : null

    // Filter through bundles
    // if we are removing a nft, filter through each bundle and search for the nfts with the exact collection and id as the nft, and remove it.
    // if there are no bundles that have the nft collection being added, we create a new one.
    // if there are more than one bundle that have the nft collection being added, we check the number of the current nft collection are in the bundle. 
    /// if there is a bundle we can add the nft to, we add it to that one, or else we create a new bundle.
    const updateInfusionBundles = (nft: LazyNftCardInfo, remove: boolean = false) => {
        const infusion = !infusionInfo.errored && !infusionInfo.loading ? infusionInfo.data : null
        const required = infusion?.[0]?.collections.find(
            (accNftColl) => accNftColl.addr === nft.collectionAddress
        )?.min_req

        if (remove) {
            // Remove NFT from bundles
            const bundleIndex = infusionBundleFields.findIndex((bundle) =>
                bundle.nfts.some(
                    (bnft) =>
                        bnft.addr === nft.collectionAddress &&
                        bnft.token_id === parseInt(nft.tokenId)
                )
            )

            if (bundleIndex !== -1) {
                // Find and remove the specific NFT from the bundle
                const updatedNfts = infusionBundleFields[bundleIndex].nfts.filter(
                    (bnft) =>
                        !(bnft.addr === nft.collectionAddress && bnft.token_id === parseInt(nft.tokenId))
                )

                if (updatedNfts.length === 0) {
                    // Remove entire bundle if empty
                    removeEligibleAsset(bundleIndex)
                    console.log("after-removed:", watchInfuionBundles)
                } else {
                    // Update bundle with remaining NFTs
                    updateEligibleAsset(bundleIndex, { nfts: updatedNfts })
                    console.log("after-removed-updated:", watchInfuionBundles)
                }
            }
        } else {
            // Add NFT to bundles
            let targetBundleIndex = -1
            let canAddToExisting = false

            // Check existing bundles for same collection
            infusionBundleFields.forEach((bundle, index) => {
                const sameCollectionCount = bundle.nfts.filter(
                    (bnft) => bnft.addr === nft.collectionAddress
                ).length

                if (sameCollectionCount > 0 && (required ? sameCollectionCount < required : true)) {
                    targetBundleIndex = index
                    canAddToExisting = true
                }
            })

            console.log("targetBundleIndex:", targetBundleIndex)
            console.log("canAddToExisting:", canAddToExisting)

            if (canAddToExisting && targetBundleIndex !== -1) {
                // Add to existing bundle
                const updatedNfts = [
                    ...infusionBundleFields[targetBundleIndex].nfts,
                    { addr: nft.collectionAddress, token_id: parseInt(nft.tokenId) }
                ]
                updateEligibleAsset(targetBundleIndex, { nfts: updatedNfts })
                console.log("after-updated-added:", watchInfuionBundles)
                console.log("after-updated-added:", infusion)
            } else {
                // Create new bundle
                appendEligibleAsset({
                    nfts: [{ addr: nft.collectionAddress, token_id: parseInt(nft.tokenId) }]
                })
                console.log("after-updated-appended:", watchInfuionBundles)
            }
        }
    }


    useEffect(() => {
        if (!selectedKey) {
            setError((fieldNamePrefix + 'infusionMinter') as 'infusionMinter', {
                type: 'required',
                message: t('error.noInfusionMinterSelected'),
            })
        } else {
            clearErrors((fieldNamePrefix + 'infusionMinter') as 'infusionMinter')
        }
    }, [selectedKey, setError, clearErrors, t, fieldNamePrefix])


    const [showModal, setShowModal] = useState<boolean>(false)


    return (
        <>
            <div className="flex flex-col gap-y-4 gap-x-12 lg:flex-row lg:flex-wrap">
                <div className="flex grow flex-col gap-4">
                    <div className="flex flex-col gap-1">

                        <p className="primary-text mb-3">{isCreating ? t('form.whichInfusionMinter') : t('form.infusionMinter')}</p>

                        <ChainProvider chainId={watchChainId}>
                            <AddressInput
                                disabled={!isCreating}
                                error={errors?.recipient}
                                fieldName={(fieldNamePrefix + 'infusionMinter') as 'infusionMinter'}
                                register={register}
                                validation={[
                                    validateRequired,
                                    // If executing smart contract, ensure recipient is smart
                                    // contract.
                                    // (executeSmartContract
                                    //     ? makeValidateAddress
                                    //     : makeValidateAddress)(chain.bech32_prefix),
                                    makeValidateAddress(chain.bech32_prefix)
                                ]}
                            />
                            <p className="primary-text mb-3">
                                {isCreating
                                    ? t('form.whichInfusionId')
                                    : t('form.infusionId')}
                            </p>

                            {isValidBech32Address(watchInfusionMinter) ? <NumericInput
                                disabled={!isCreating}
                                error={errors?.codeId}
                                fieldName={fieldNamePrefix + 'infusionId' as 'infusionId'}
                                min={0}
                                numericValue
                                register={register}
                                sizing="sm"
                                step={1}
                                validation={[validateRequired, validatePositive]}
                            /> : null}

                        </ChainProvider>
                        <InputErrorMessage error={errors?.recipient} />
                    </div>
                </div>

                <div className="flex grow flex-col gap-2">
                    {nftInfo.loading ? (
                        <HorizontalNftCardLoader />
                    ) : nftInfo.errored ? (
                        <ErrorPage error={nftInfo.error} />
                    ) : (
                        nftInfo.data && <HorizontalNftCard {...nftInfo.data} />
                    )}

                    {isCreating && (
                        <Button
                            className={clsx(
                                'text-text-tertiary',
                                nftInfo ? 'self-end' : 'self-start'
                            )}
                            onClick={() => setShowModal(true)}
                            variant="secondary"
                        >
                            {t('button.selectNft')}
                        </Button>
                    )}
                    <InputErrorMessage error={errors?.collection} />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                {infusion && (<>
                    <p className="primary-text mb-3">Infusion Info</p>
                    {infusion.map((ii, index) => {
                        ii.collections
                    })}


                </>)}
            </div>
            <div className="flex flex-col gap-1">
                {
                    infusion && infusion[0].infusion_params.mint_fee && (
                        <>
                            {coins.map(({ id }, index) => (
                                <NativeCoinSelector
                                    key={id + index}
                                    errors={errors?.funds?.[index]}
                                    fieldNamePrefix={fieldNamePrefix + `funds.${index}.`}
                                    isCreating={isCreating}
                                    onRemove={isCreating ? () => removeCoin(index) : undefined}
                                    tokens={tokens}
                                />
                            ))}

                        </>
                    )
                }

            </div>
            {isCreating && (
                <NftSelectionModal
                    action={{
                        loading: false,
                        label: t('button.save'),
                        onClick: () => {
                            setShowModal(false)
                        },
                    }}
                    header={{
                        title: t('title.selectNftsToInfuse'),
                    }}
                    nfts={options}
                    onClose={() => setShowModal(false)}
                    onNftClick={(nft) => {
                        if (nft.key === selectedKey) {
                            setValue((fieldNamePrefix + 'tokenId') as 'tokenId', '')
                            setValue((fieldNamePrefix + 'collection') as 'collection', '')
                            updateInfusionBundles(nft, true)
                        } else {
                            setValue((fieldNamePrefix + 'chainId') as 'chainId', nft.chainId)
                            setValue((fieldNamePrefix + 'tokenId') as 'tokenId', nft.tokenId)
                            setValue(
                                (fieldNamePrefix + 'collection') as 'collection',
                                nft.collectionAddress
                            )
                            !infusionInfo.errored && !infusionInfo.loading ? {

                            } : null
                            updateInfusionBundles(nft, false)
                        }
                    }}
                    selectedKeys={selectedKey ? [selectedKey] : []}
                    visible={showModal}
                />
            )}
        </>)
}