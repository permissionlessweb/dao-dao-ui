import { ActionBase, Button, ChainProvider, Dropdown, ErrorPage, HorizontalNftCard, HorizontalInfusionCard, HorizontalNftCardLoader, InputErrorMessage, InputLabel, NativeCoinSelector, NumericInput, HorizontalInfusionCardProps, FormSwitch, useActionOptions, DaoSupportedChainPickerInput } from "@dao-dao/stateless";
import { ActionComponent, ActionContextType, ActionOptions, AddressInputProps, GenericToken, GenericTokenBalance, LazyNftCardInfo, LoadingData, LoadingDataWithError, NftCardInfo, NftSelectionModalProps, TypedOption } from "@dao-dao/types";
import { Bundle, Infusion, InfusionWithDetails, NFT, NFTCollection } from "@dao-dao/types/contracts/CwInfuser";
import { TransferNftData } from "../TransferNft/Component";
import { ComponentType, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFieldArray, useFormContext } from "react-hook-form";
import { getChainAddressForActionOptions, getChainForChainId, getNftKey, isValidBech32Address, makeValidateAddress, validatePositive, validateRequired } from "@dao-dao/utils";
import clsx from "clsx"
import { useQueryClient } from "@tanstack/react-query";
import { cw721BaseQueries, nftQueries } from "@dao-dao/state/query";
import { Approval } from "@dao-dao/types/contracts/Sg721Base";
import { EntityDisplay } from "../../../../components";


interface InfusionCollections {
    collection: String
    minRequired: number
    maxRequired: number | undefined
    paymentSubstitute: GenericTokenBalance | undefined
}

export type InfuseNftsData = {
    paymentSubstituteExists: boolean
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
    selectedNfts: LoadingDataWithError<NftCardInfo[]> | undefined
    // Information from the Infusion currently selected.
    infusionInfo: LoadingDataWithError<InfusionWithDetails[] | undefined>
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
    options: { options, selectedNfts, tokens, infusionInfo, AddressInput, NftSelectionModal },
}) => {
    const { t } = useTranslation()
    const actionOptions = useActionOptions()
    const {
        context,
        chainContext,
        chain: { chainId: nativeChainId },
        queryClient,
    } = actionOptions
    const { control, watch, setValue, setError, register, clearErrors, } =
        useFormContext<InfuseNftsData>()

    const watchChainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
    const currentChain = getChainForChainId(watchChainId)

    const chainAddressOwner = getChainAddressForActionOptions(
        actionOptions,
        currentChain.chainId
    )

    const watchInfusionMinter = watch((fieldNamePrefix + 'infusionMinter') as 'infusionMinter')
    const watchInfusionId = watch((fieldNamePrefix + 'infusionId') as 'infusionId')
    const watchCollection = watch((fieldNamePrefix + 'collection') as 'collection')
    const watchTokenId = watch((fieldNamePrefix + 'tokenId') as 'tokenId')
    const watchPaymentInfusionExists = watch((fieldNamePrefix + 'paymentSubstituteExists') as 'paymentSubstituteExists')
    const watchInfuionBundles = watch((fieldNamePrefix + 'infusionBundles') as 'infusionBundles')


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
        const required = infusion?.[0]?.eligibleCollections.find(
            (accNftColl) => accNftColl.addr === nft.collectionAddress
        )?.min_req

        if (remove) {
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

    // when infusion ID or infusion contract is changed, reset selected nfts & funds 
    useEffect(() => {
        infusionBundleFields.forEach((_, index) => {
            removeEligibleAsset(index);
        });
        coins.forEach((_, index) => {
            removeCoin(index);
        });

        setValue((fieldNamePrefix + 'collection') as 'collection', '')
        setValue((fieldNamePrefix + 'tokenId') as 'tokenId', '')
    }, [watchInfusionId, watchInfusionMinter]);


    const [showModal, setShowModal] = useState<boolean>(false)

    const possibleCollections: TypedOption<InfusionCollections[]>[] = !infusion ? [] :
        infusion.flatMap((infusion, index) => {
            const infsuions = infusion.eligibleCollections.flatMap((ii) => {
                return {
                    collection: ii.addr,
                    minRequired: ii.min_req,
                    maxRequired: ii.min_req,
                    paymentSubstitute: undefined
                }
            })
            return {
                label: '', // get the collection address name of    
                value: infsuions,
            }
        }
        )

    const nftOptions = possibleCollections.map((asset, index) => ({
        value: [asset],
        label: asset.label
    }))

    const handleSelect = (option: typeof possibleCollections, index: number) => {
        // Handle the selection of an option
        console.log(option, index)
    }


    return (
        <>
            <div className="flex flex-col gap-y-4 gap-x-12 lg:flex-row lg:flex-wrap">
                {context.type === ActionContextType.Dao && (
                    <DaoSupportedChainPickerInput
                        disabled={!isCreating}
                        fieldName={fieldNamePrefix + 'chainId'}
                        onChange={(chainId) => {
                            // Reset when switching chain.
                            setValue((fieldNamePrefix + 'chainId') as 'chainId', chainId)

                        }}
                    />
                )}
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
                                    makeValidateAddress(currentChain.bech32Prefix)
                                ]}
                            />

                            {isValidBech32Address(watchInfusionMinter) ?
                                <>
                                    <p className="primary-text mb-3">
                                        {isCreating ? t('form.whichInfusionId') : t('form.infusionId')}
                                    </p>
                                    <NumericInput
                                        disabled={!isCreating}
                                        error={errors?.codeId}
                                        fieldName={fieldNamePrefix + 'infusionId' as 'infusionId'}
                                        min={0}
                                        numericValue
                                        register={register}
                                        sizing="sm"
                                        step={1}
                                        validation={[validateRequired, validatePositive]}
                                    /></> : null}

                        </ChainProvider>
                        <InputErrorMessage error={errors?.recipient} />
                    </div>
                </div>

                <div className="flex grow flex-col gap-2">
                    {isCreating && infusion?.length != 0 && (
                        <></>    // <InputLabel name={t('title.numNfts', { count: watchInfuionBundles.length() })} />
                    )}

                    {selectedNfts &&
                        (selectedNfts.loading ? (
                            <HorizontalNftCardLoader />
                        ) : selectedNfts.errored ? (
                            <ErrorPage error={selectedNfts.error} />
                        ) : (
                            <div className="flex flex-col gap-1">
                                {selectedNfts.data.map(({ key, ...nftInfo }) => (
                                    <HorizontalNftCard key={key} {...nftInfo} />
                                ))}
                            </div>
                        ))}

                    {isCreating && infusion && (
                        <Button
                            className={clsx(
                                selectedNfts && !selectedNfts.loading && !selectedNfts.errored
                                    ? 'self-end'
                                    : 'self-start'
                            )}
                            onClick={() => setShowModal(true)}
                            variant={watchInfuionBundles.length ? 'secondary' : 'primary'}
                        >
                            {t('button.selectNfts')}
                        </Button>
                    )}

                    <InputErrorMessage error={errors?.collection} />
                </div>
            </div>
            {/* Create way to tab between infusions for a given */}
            <div className="flex flex-col gap-1">
                {infusion && selectedNfts && !selectedNfts.errored && !selectedNfts.loading && (<>
                    {infusion.map((ii, index) => {
                        const newIi: HorizontalInfusionCardProps = { ...ii, currentEntity: chainAddressOwner, chainId: watchChainId, EntityDisplay, fieldNamePrefix, entityEligibleNFTs: options, selectedNfts, isProposalAction: true };
                        return (<HorizontalInfusionCard key={index.toString()} {...newIi} />)
                    })}


                </>)
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