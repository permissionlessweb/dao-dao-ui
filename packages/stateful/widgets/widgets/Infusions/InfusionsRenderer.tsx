import { WidgetRendererProps } from "@dao-dao/types";
import { InfusionWidgetData } from "./types";

import { useWallet } from '../../../hooks/useWallet'
import { AddressInput, ChainProvider, HorizontalInfusionCard, HorizontalInfusionCardProps, HorizontalScroller, NftCard, NumericInput, useCachedLoadable, useChain } from "@dao-dao/stateless";
import { useTranslation } from "react-i18next";
import { QueryClient, useQueries, useQueryClient } from "@tanstack/react-query";
import { CommonNftSelectors, cwInfuserExtraQueries, nftQueries } from "@dao-dao/state";
import { isValidBech32Address, makeCombineQueryResultsIntoLoadingData, makeCombineQueryResultsIntoLoadingDataWithError, makeValidateAddress, validatePositive, validateRequired } from "@dao-dao/utils";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import InfusionItem from "../../../components/nft/InfusionItem";



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
        // description,
        // mint: { contract, msg, buttonLabel },
    },
}: WidgetRendererProps<InfusionWidgetData>) => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()
    const { chainId, bech32Prefix } = useChain()
    const {
        address: walletAddress = '',
        getSigningClient,
        isWalletConnected,
    } = useWallet()

    const formMethods = useForm<InfusionWidgetData>({
        defaultValues: {
            fieldNamePrefix,
            infusionMinter,
            infusionId,
        },
    })

    const {
        watch,
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = formMethods

    const watchInfusionMinter = watch((fieldNamePrefix + 'infusionMinter') as 'infusionMinter')
    const watchInfusionId = watch((fieldNamePrefix + 'infusionId') as 'infusionId')

    const infusionInfoLDWE = useInfusionContract(queryClient, chainId, watchInfusionMinter, watchInfusionId)
    const infusionInfo = !infusionInfoLDWE.errored && !infusionInfoLDWE.loading ? infusionInfoLDWE.data : []

    // create  bundle form 

    return (
        <FormProvider {...formMethods}>
            <ChainProvider chainId={chainId}>
                <div className="flex grow flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <p className="primary-text mb-3">{t('form.selectInfusionMinter')}</p>
                        <div className="flex min-w-0 flex-col flex-wrap gap-x-3 gap-y-2 sm:flex-row sm:items-stretch">
                            <AddressInput
                                fieldName={(fieldNamePrefix + 'infusionMinter') as 'infusionMinter'}
                                register={register}
                                validation={[
                                    validateRequired,
                                    // If executing smart contract, ensure recipient is smart
                                    // contract.
                                    // (executeSmartContract
                                    //     ? makeValidateAddress
                                    //     : makeValidateAddress)(chain.bech32_prefix),
                                    makeValidateAddress(bech32Prefix)
                                ]}
                            />

                            {isValidBech32Address(watchInfusionMinter) ? <>
                                <NumericInput
                                    fieldName={fieldNamePrefix + 'infusionId' as 'infusionId'}
                                    min={0}
                                    numericValue
                                    register={register}
                                    sizing="sm"
                                    step={1}
                                    validation={[validateRequired, validatePositive]}
                                />
                                <p className="primary-text mb-3">{t('form.selectInfusionId')}</p>
                            </> : null}

                        </div>

                        {infusionInfo.length != 0 ?
                            <>
                                {infusionInfo.map((ii, index) => {
                                    return (
                                        <>
                                            <InfusionItem infusionInfo={ii}
                                                isProposalAction={false}
                                                wallet={walletAddress}
                                                chainId={chainId}
                                                queryClient={queryClient}
                                                index={index.toString()}
                                                fieldNamePrefix={fieldNamePrefix}
                                            />
                                            {/* display map of eligible infusion collections and the minimum needed */}
                                        </>
                                    )
                                })}

                            </> : null}
                        {/* <InputErrorMessage error={errors?.recipient} /> */}
                    </div>
                </div>
            </ChainProvider>
        </FormProvider>
    )
}