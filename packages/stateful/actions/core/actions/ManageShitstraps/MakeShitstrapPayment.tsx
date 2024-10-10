import { PossibleShit, ShitstrapInfo, UncheckedDenom } from "@dao-dao/types/contracts/ShitStrap"
import { Counterparty } from "../token_swap/types"
import { ActionComponent, GenericToken, GenericTokenBalanceWithOwner, LoadingDataWithError, TokenType } from "@dao-dao/types"
import { ShitstrapPaymentWidgetData } from "../../../../widgets/widgets/Shitstrap/types"
import { useTranslation } from "react-i18next"
import { AddressInput, Button, ChainProvider, InputErrorMessage, InputLabel, NumericInput, TextInput, TokenAmountDisplay, TokenInput, useActionOptions } from "@dao-dao/stateless"
import { useFormContext } from "react-hook-form"
import { getChainAddressForActionOptions, makeValidateAddress, processError, validateRequired } from "@dao-dao/utils"
import { EntityDisplay } from "../../../../components"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { cwShitstrapExtraQueries, shitStrapQueries } from "@dao-dao/state/query"
import { HugeDecimal } from "@dao-dao/math"
import { useRecoilCallback } from "recoil"
import { useEffect, useState } from "react"
import { TokenToShit } from "."
import { genericTokenSelector } from "@dao-dao/state/recoil"

import {Config as ShitstrapConfig} from '@dao-dao/types/ShitStrap'
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
    const watchShitstrapAddress: string | undefined = watch((fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress')
    const watchChainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
    const watchShitToken = watch((fieldNamePrefix + 'shitToken') as 'shitToken')
    const shitstrapOwner = watch((fieldNamePrefix + 'ownerEntity.address') as 'ownerEntity.address')

    // The only shistrap contracts that can have payments made:
    //   - have not been flushed by owner
    //   - are not full of shit
    // selected shitstrap info
    const queryClient = useQueryClient()


    // const estimatedToken = eligibleAsset ? (HugeDecimal.from(eligibleAsset.shit_rate ?? 1).div(HugeDecimal.from(10).pow(6)).toNumber()) * parseInt(watchAmountToSendToShit) : 1;
    const [contractChosen, setChoossetContractChosen] = useState(false)
    const [queryShitstrapInfo, setQueryShitstrapInfo] = useState(false)
    const [shitstrapInfo, setShitstrapInfo] = useState<ShitstrapConfig>()


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
                setChoossetContractChosen(true)
                setQueryShitstrapInfo(true)

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
            // clearErrors,
            // fieldNamePrefix,
            // trigger,
            // setError,
            setChooseLoading,
        ]
    )
    useEffect(() => {
        const verifyShitstrapContract = async () => {
          if (queryShitstrapInfo || shitstrapInfo) return;
            try {
                const info = await queryClient.fetchQuery(
                    shitStrapQueries.config(queryClient, {
                        chainId: watchChainId,
                        contractAddress: watchShitstrapAddress!,
                    })
                );
                if (typeof info.full_of_shit !== 'boolean') {
                    throw new Error(t('error.notAShitstrapAddress'));
                }
                console.log("all good!")

                setShitstrapInfo(info as (ShitstrapConfig | undefined));
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
        queryShitstrapInfo,
        watchShitstrapAddress,
        // ...
      ]);

    return (
        <ChainProvider chainId={watchChainId}>
            <p className="max-w-prose">{t('info.shitStrapExplanation')}</p>
            <div className="flex flex-col gap-3">
                <p className="max-w-prose">{t('form.tokenSwapExistingInstructions')}</p>
                <div className="flex flex-row flex-wrap items-center gap-2">
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
                            <Button
                                className="self-end"
                                loading={chooseLoading}
                                onClick={onChooseExistingContract}
                                size="lg"
                            >
                                {t('button.continue')}
                            </Button>
                            {shitstrapInfo && contractChosen ? (
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
                                        step: HugeDecimal.one.toNumber(),
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
                                                    shitstrapInfo.accepted.some((asset) => {
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
                                                            decimals: 6,
                                                        })
                                                    ,
                                                })),
                                        }
                                    }
                                />
                            ) : undefined}
                        </div>
                    </div>

                </div>
                <div className="flex flex-row items-center justify-between gap-8">
                    <p className="link-text mb-1">{t('info.previewShitstrapPayment')}</p>
                    <div className="flex flex-row items-center justify-between gap-8">
                    </div>
                </div>
                <p className="secondary-text">{t('title.estimatedToShit')}</p>
                {/* {activeShitstrap && estimatedToken !== HugeDecimal.zero.toNumber() && (
                                    <TokenAmountDisplay
                                        amount={estimatedToken}
                                        className="grow header-text text-sm"
                                        decimals={6}
                                        symbol={activeShitstrap.shit.denomOrAddress.startsWith(`factory/osmo1`)
                                            ? !activeShitstrap.shit.denomOrAddress.substring(51).startsWith('/')
                                                ? activeShitstrap.shit.denomOrAddress.substring(71)
                                                : activeShitstrap.shit.denomOrAddress.substring(52)
                                            : activeShitstrap.shit.denomOrAddress}
                                        hideSymbol={false}
                                    />
                )} */}
            </div>
        </ChainProvider>
    )
}