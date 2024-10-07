import { PossibleShit, ShitstrapInfo, UncheckedDenom } from "@dao-dao/types/contracts/ShitStrap"
import { Counterparty } from "../token_swap/types"
import { ActionComponent, GenericToken, GenericTokenBalanceWithOwner, LoadingDataWithError, TokenType } from "@dao-dao/types"
import { ShitstrapPaymentWidgetData } from "../../../../widgets/widgets/Shitstrap/types"
import { useTranslation } from "react-i18next"
import { AddressInput, Button, ChainProvider, InputErrorMessage, InputLabel, TokenAmountDisplay, TokenInput, useActionOptions } from "@dao-dao/stateless"
import { useFormContext } from "react-hook-form"
import { getChainAddressForActionOptions, makeValidateAddress, processError, validateRequired } from "@dao-dao/utils"
import { EntityDisplay } from "../../../../components"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { cwShitstrapExtraQueries, shitStrapQueries } from "@dao-dao/state/query"
import { HugeDecimal } from "@dao-dao/math"
import { useRecoilCallback } from "recoil"
import { useEffect, useState } from "react"
import { TokenToShit } from "."


export type MakeShitstrapPaymentData = {
    chainId: string
    // Whether or not the contract has been chosen. When this is `false`, shows
    // form allowing user to create a new collection or enter an existing address.
    // When `true`, it shows the payment UI. `collectionAddress` should be defined
    // and valid when this is `true`.
    contractChosen: boolean
    // Set once shitstrap created or chosen.
    shitstrapAddress: string
    // Token being selected to use as payment for shitstrap
    shitToken?: GenericToken
    // Amount of shitToken being sent in payment for shitstrap
    amount: string
    eligibleAssets: PossibleShit[]
    selfParty?: Omit<Counterparty, 'address'>
    ownerEntity?: Counterparty
}


export type MakeShitstrapPaymentOptions = {
    widgetData: ShitstrapPaymentWidgetData | undefined
    tokens: GenericTokenBalanceWithOwner[]
    /**
  * A map of chain ID to current contract on that chain. This replaces the
  * single `shitstrap` and allows for multiple chains.
  */
    factories: Record<
        string,
        {
            address: string
            version: 1
        }
    >
}

export const MakeShitstrapPayment: ActionComponent<MakeShitstrapPaymentOptions> = ({
    fieldNamePrefix,
    errors,
    isCreating,
    addAction,
    remove,
    index: actionIndex,
    allActionsWithData,
    options: {
        widgetData,
        tokens,
        factories,
    },
}) => {
    const { t } = useTranslation()
    const {
        chain: { bech32_prefix: bech32Prefix },
    } = useActionOptions()


    const { control, register, watch, getValues, resetField, setValue, setError, clearErrors, trigger } =
        useFormContext()
    const watchChainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
    const watchContractIsChosen = watch((fieldNamePrefix + 'contractChosen') as 'contractChosen')
    const watchShitToken = watch((fieldNamePrefix + 'shitToken') as 'shitToken')
    const shitstrapOwner = watch((fieldNamePrefix + 'ownerEntity.address') as 'ownerEntity.address')
    const watchShitstrapAddress: string | undefined = watch((fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress')
    const watchAmountToSendToShit = watch((fieldNamePrefix + 'amount') as 'amount')

    // The only shistrap contracts that can have payments made:
    //   - have not been flushed by owner
    //   - are not full of shit
    // selected shitstrap info
    const queryClient = useQueryClient()
    const selectedShitstrapInfo = useQuery(
        cwShitstrapExtraQueries.info(queryClient, {
            chainId: watchChainId,
            address: watchShitstrapAddress!,
        })
    )
    const activeShitstrap = selectedShitstrapInfo.isLoading || selectedShitstrapInfo.isError ? false : selectedShitstrapInfo.data

    // selected token for payment info
    const selectedToken = watchShitToken ? tokens.find((token) =>
        token.token.denomOrAddress == watchShitToken
    )
        : undefined;
    const selectedDecimals = selectedToken?.token.decimals ?? 0
    const selectedMicroBalance = selectedToken?.balance ?? 0
    const selectedBalance = HugeDecimal.from(selectedMicroBalance)
    const eligibleAsset = activeShitstrap ?
        activeShitstrap.eligibleAssets.find((asset) => {
            if (typeof asset.token === 'object') {
                return ('native' in asset.token && asset.token.native === watchShitToken?.denomOrAddress)
                    || ('cw20' in asset.token && asset.token.cw20 === watchShitToken?.denomOrAddress);
            } else {
                return asset.token === watchShitToken?.denomOrAddress;
            }
        })
        : undefined;

    // estimate shitstrap rewards
    const estimatedToken = eligibleAsset ?
        HugeDecimal.from(1).div(HugeDecimal.fromHumanReadable(eligibleAsset.shit_rate, 6)).times(watchAmountToSendToShit)
        : HugeDecimal.from(0);


    // handle loading and affirm shitstrap contract
    const [chooseLoading, setChooseLoading] = useState(false)
    const onChooseExistingContract = useRecoilCallback(
        ({ snapshot }) => async () => {
            setChooseLoading(true)

            try {
                clearErrors(
                    (fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress'
                )
                // Manually validate the contract address.
                const valid = await trigger(
                    (fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress'
                )
                if (!valid) {
                    // Error will be set by trigger.
                    return
                }
                // Should never happen due to validation above; just typecheck.
                if (!watchShitstrapAddress) {
                    throw new Error(t('error.loadingData'))
                }
                setValue(
                    (fieldNamePrefix + 'contractChosen') as 'contractChosen',
                    true, { shouldValidate: true }
                )
            } catch (err) {
                console.error(err)
                setError(
                    (fieldNamePrefix +
                        'shitstrapAddress') as 'shitstrapAddress',
                    {
                        type: 'custom',
                        message: err instanceof Error ? err.message : `${processError(err)}`,
                    }
                )
                return
            } finally {
                setChooseLoading(false)
            }
        },
        [
            trigger,
            fieldNamePrefix,
            setValue,
            watchShitstrapAddress,
            setError,
            clearErrors,
            setChooseLoading,
        ]
    )
    useEffect(() => {
        const verifyShitstrapContract = async () => {
            if (!watchShitstrapAddress) return;
            try {
                const info = await queryClient.fetchQuery(
                    shitStrapQueries.fullOfShit(queryClient, {
                        chainId: watchChainId,
                        contractAddress: watchShitstrapAddress,
                    })
                );
                if (typeof info !== 'boolean') {
                    throw new Error(t('error.notAShitstrapAddress'));
                }
                console.log("all good!")
            } catch (err) {
                console.error(err);
                if (
                    err instanceof Error &&
                    err.message.includes('Query failed') &&
                    err.message.includes('unknown variant')
                ) {
                    setError(
                        (fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress',
                        {
                            type: 'custom',
                            message: t('error.notAShitstrapAddress'),
                        }
                    );
                } else {
                    setError(
                        (fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress',
                        {
                            type: 'custom',
                            message:
                                err instanceof Error
                                    ? err.message
                                    : `${processError(err)}`,
                        }
                    );
                }
            }
        };

        verifyShitstrapContract();
    }, [
        watchShitstrapAddress,
        fieldNamePrefix,
        setError,
        watchChainId,
        queryClient,
        t,
    ]);

    return (
        <ChainProvider chainId={watchChainId}>
            <p className="max-w-prose">{t('info.shitStrapExplanation')}</p>
            <div className="flex flex-col gap-3">
                <p className="max-w-prose">{t('form.tokenSwapExistingInstructions')}</p>
                <div
                    // key={id}
                    className="flex flex-row flex-wrap items-center gap-2"
                >
                    <div className="flex shrink-0 flex-col gap-1">

                        <div className="flex flex-row items-end justify-between gap-2">
                            <InputLabel name={t('form.inputShitstrap')} />
                        </div>

                        <div className="flex flex-row gap-1">
                            <AddressInput
                                error={errors?.collectionAddress}
                                fieldName={(fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress'}
                                register={register}
                                type="contract"
                                validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
                            />
                            <InputErrorMessage error={errors?.collectionAddress} />

                            {/* {activeShitstrap && (
                                <div className="!mt-4 space-y-2">
                                    <InputLabel name={t('title.suggestions')} />

                                    <div className="flex flex-row flex-wrap gap-1">
                                        {activeShitstrap.eligibleAssets.map((props) => (
                                            <Button
                                                key={props.token.cw20 ? props.token.cw20 : props.token.native}
                                                center
                                                onClick={() =>
                                                    setValue(fieldNamePrefix + 'shitstrapAddress' as 'shitstrapAddress', shitstrapContractAddr)
                                                }
                                                pressed={undefined}
                                                size="sm"
                                                type="button"
                                                variant="secondary"
                                            >
                                                {props.shit_rate}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )} */}

                            {activeShitstrap && (
                                // <></>
                                <TokenInput
                                    amount={{
                                        watch,
                                        setValue,
                                        register,
                                        getValues,
                                        fieldName: (fieldNamePrefix + `amount`) as `amount`,
                                        error: errors?.amount,
                                        min: 0,
                                        max: 999999999999,
                                        step: HugeDecimal.one.toHumanReadableNumber(0),
                                        validations: [],
                                    }}
                                    onSelectToken={(token) => {
                                        setValue(
                                            (fieldNamePrefix + `shitToken`) as `shitToken`,
                                            token
                                        )
                                    }}
                                    readOnly={!isCreating}
                                    selectedToken={watchShitToken}
                                    showChainImage
                                    tokens={
                                        {
                                            loading: false,
                                            data: tokens
                                                .filter(({ token }) =>
                                                    activeShitstrap.eligibleAssets.some((asset) => {
                                                        if (typeof asset.token === 'object') {
                                                            if ('native' in asset.token) {
                                                                return asset.token.native === token.denomOrAddress;
                                                            } else if ('cw20' in asset.token) {
                                                                return asset.token.cw20 === token.denomOrAddress;
                                                            } else {
                                                                return false;
                                                            }
                                                        } else {
                                                            return asset.token === token.denomOrAddress;
                                                        }
                                                    })
                                                )
                                                .map(({ owner, balance, token }) => ({
                                                    ...token,
                                                    owner,
                                                    description:
                                                        t('title.balance') +
                                                        ': ' + HugeDecimal.from(balance).toInternationalizedHumanReadableString({
                                                            decimals: token.decimals,
                                                        })
                                                    ,
                                                })),
                                        }
                                    }
                                />
                            )}
                        </div>
                    </div>
                    <p className="link-text mb-1">{t('info.previewShitstrapPayment')}</p>

                    <div className="flex flex-row items-center justify-between gap-8">
                        <p className="secondary-text">{t('title.estimatedToShit')}</p>
                        {estimatedToken !== HugeDecimal.zero && (
                            <TokenAmountDisplay
                                amount={estimatedToken.toNumber()}
                                className="caption-text text-right font-mono text-text-body"
                                decimals={6}
                                symbol={activeShitstrap ? activeShitstrap.shit.symbol : ''}
                                hideSymbol={false}
                            />
                        )}
                    </div>
                </div>
            </div>
        </ChainProvider>
    )
}