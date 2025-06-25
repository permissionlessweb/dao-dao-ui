import { QueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useRecoilCallback } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import { shitStrapQueries } from '@dao-dao/state/query'
import {
  AddressInput,
  Button,
  ChainProvider,
  DaoSupportedChainPickerInput,
  FormSwitch,
  InputErrorMessage,
  InputLabel,
  TokenInput,
  useActionOptions,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  GenericToken,
  GenericTokenBalanceWithOwner,
} from '@dao-dao/types'
import { PossibleShit } from '@dao-dao/types/contracts/ShitStrap'
import { Config as ShitstrapConfig } from '@dao-dao/types/ShitStrap'
import {
  getChainForChainId,
  makeValidateAddress,
  processError,
  validateRequired,
} from '@dao-dao/utils'

import { ShitstrapPaymentWidgetData } from '../../../../widgets/widgets/Shitstrap/types'
import { Counterparty } from '../token_swap/types'
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
  possibleShit: PossibleShit[]
  selfParty?: Omit<Counterparty, 'address'>
  ownerEntity?: Counterparty
}

export type MakeShitstrapPaymentOptions = {
  queryClient: QueryClient
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

export const MakeShitstrapPayment: ActionComponent<
  MakeShitstrapPaymentOptions
> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  addAction,
  remove,
  index: actionIndex,
  allActionsWithData,
  options: { widgetData, queryClient, tokens, factories },
}) => {
  const { t } = useTranslation()
  const {
    chain: { bech32Prefix },
    address: chainAddressOwner,
    context,
  } = useActionOptions()

  const {
    control,
    register,
    watch,
    getValues,
    resetField,
    setValue,
    setError,
    clearErrors,
    trigger,
  } = useFormContext()
  const watchShitstrapAddress: string | undefined = watch(
    (fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress'
  )
  const watchChainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const watchShitToken = watch(('payment.' + 'shitToken') as 'shitToken')

  const shitstrapFactoryExists = !!widgetData?.factories?.[watchChainId]

  // Fetch infos individually so they refresh when data is updated elsewhere.
  // const shitstrapInfosLoading = useQueries({
  //   queries:
  //     shitstrapContracts.loading || shitstrapContracts.errored
  //       ? []
  //       : shitstrapContracts.data.flatMap(({ chainId, contracts }) =>
  //         contracts.map(({ contract }) =>
  //           cwShitstrapExtraQueries.info(queryClient, {
  //             chainId,
  //             contractAddress: contract,
  //           })
  //         )
  //       ),
  //   combine: makeCombineQueryResultsIntoLoadingDataWithError({
  //     firstLoad: 'one',
  //     transform: (infos) =>
  //       uniqBy(
  //         infos,
  //         (info) => info.chainId + ':' + info.shitstrapContractAddr
  //       ),
  //   }),
  // })

  // // shitstrap payments that are not full.
  // const shitstrapPaymentsNotFull = shitstrapInfosLoading.loading || shitstrapInfosLoading.errored ?
  //   [] : shitstrapInfosLoading.data.filter((props) => props.full != true)

  const [usingCustomShitstrap, useCustomShitstrap] = useState(true)
  const [contractChosen, setChoossetContractChosen] = useState(false)
  const [queryShitstrapInfo, setQueryShitstrapInfo] = useState(false)
  const [chooseLoading, setChooseLoading] = useState(false)
  const [shitstrapInfo, setShitstrapInfo] = useState<ShitstrapConfig>()

  // handle loading and affirm shitstrap contract
  const onChooseExistingContract = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        setChooseLoading(true)
        try {
          clearErrors(
            (fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress'
          )
          // Manually validate the contract address.
          const valid = await trigger(
            (fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress'
          )
          console.log('valid:', valid)
          if (!valid) {
            // Error will be set by trigger.
            return
          }
          // Should never happen due to validation above; just typecheck.
          if (!watchShitstrapAddress) {
            throw new Error(t('error.loadingData'))
          }
          setChoossetContractChosen(true)
          const info = await queryClient.fetchQuery(
            shitStrapQueries.config(queryClient, {
              chainId: watchChainId,
              contractAddress: watchShitstrapAddress!,
            })
          )
          if (typeof info.full_of_shit !== 'boolean') {
            throw new Error(t('error.notAShitstrapAddress'))
          }
          console.log('all good!')
          console.log('info:', info)

          setShitstrapInfo(info as ShitstrapConfig | undefined)
        } catch (err) {
          console.error(err)
          setError(
            (fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress',
            {
              type: 'custom',
              message:
                err instanceof Error ? err.message : `${processError(err)}`,
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

  const decimals = watchShitToken ? (watchShitToken?.decimals ?? 0) : 0

  return (
    <ChainProvider chainId={watchChainId}>
      <div className="flex flex-col gap-3">
        <p className="max-w-prose">{t('info.shitStrapExplanation')}</p>
        {context.type === ActionContextType.Dao && (
          <DaoSupportedChainPickerInput
            disabled={!isCreating}
            fieldName={fieldNamePrefix + 'chainId'}
            onChange={(chainId) => {
              // Reset when switching chain.
              setValue((fieldNamePrefix + 'cutoff') as 'cutoff', '')
              setValue((fieldNamePrefix + 'chainId') as 'chainId', chainId)
              setValue((fieldNamePrefix + 'possibleShit') as 'possibleShit', [])
              setValue(
                (fieldNamePrefix +
                  'ownerEntity.address') as 'ownerEntity.address',
                chainAddressOwner ? chainAddressOwner : ''
              )
            }}
          />
        )}
        <div className="flex flex-row flex-wrap items-center gap-2">
          <div className="flex shrink-0 flex-col gap-1">
            <div className="flex flex-row items-end justify-between gap-2">
              <InputLabel name={t('form.inputShitstrap')} />
            </div>

            <div className="flex flex-row gap-1">
              {shitstrapFactoryExists && (
                <div className="flex flex-row gap-3 items-center">
                  {!usingCustomShitstrap ? (
                    <>
                      {/* <ShitstrapPicker
                        onSelect={(shitstrapContractAddr) =>
                          setValue(
                            (fieldNamePrefix + 'shitstrapAddress') as 'shitstrapAddress',
                            shitstrapContractAddr
                          )
                        }
                        readOnly={!isCreating}
                        selectedAddress={watchShitstrapAddress}
                        shitstraps={shitstrapPaymentsNotFull}
                      /> */}
                    </>
                  ) : (
                    <>
                      <div className="flex flex-row gap-1">
                        <AddressInput
                          error={errors?.collectionAddress}
                          fieldName={
                            (fieldNamePrefix +
                              'shitstrapAddress') as 'shitstrapAddress'
                          }
                          register={register}
                          type="contract"
                          validation={[
                            validateRequired,
                            makeValidateAddress(
                              getChainForChainId(watchChainId).bech32Prefix
                            ),
                          ]}
                        />
                      </div>
                    </>
                  )}

                  <Button
                    className="self-end"
                    loading={chooseLoading}
                    onClick={onChooseExistingContract}
                    size="lg"
                  >
                    {t('button.continue')}
                  </Button>
                  <FormSwitch
                    fieldName={`none`}
                    onToggle={useCustomShitstrap}
                    setValue={setValue}
                    sizing="md"
                    value={usingCustomShitstrap}
                  />

                  <InputLabel name={t('title.customShitstrapAddress')} title />

                  <InputErrorMessage error={errors?.collectionAddress} />
                </div>
              )}
            </div>

            {shitstrapInfo && contractChosen ? (
              <TokenInput
                allowCustomToken={false}
                amount={{
                  watch,
                  setValue,
                  register,
                  getValues,
                  fieldName: ('payment.' + 'amount') as 'amount',
                  error: undefined,
                  min: 0,
                  max: 999999999999999999,
                  step: HugeDecimal.one.toHumanReadableNumber(decimals),
                }}
                onSelectToken={(token) => {
                  // Save the matched token to the form in shitToken field
                  setValue(('payment.' + 'shitToken') as 'shitToken', token)
                }}
                // readOnly={shitting}
                selectedToken={watchShitToken}
                showChainImage
                tokens={{
                  loading: false,
                  data:
                    tokens
                      .filter(({ token }) =>
                        shitstrapInfo.accepted.some((asset) => {
                          if (typeof asset.token === 'object') {
                            if ('native' in asset.token) {
                              return asset.token.native === token.denomOrAddress
                            } else if ('cw20' in asset.token) {
                              return asset.token.cw20 === token.denomOrAddress
                            } else {
                              return false
                            }
                          } else {
                            return asset.token === token.denomOrAddress
                          }
                        })
                      )
                      ?.map(({ balance, token }) => ({
                        ...token,
                        description:
                          t('title.balance') +
                          ': ' +
                          HugeDecimal.from(
                            balance
                          ).toInternationalizedHumanReadableString({
                            decimals: 6,
                          }),
                      })) ?? [],
                }}
              />
            ) : undefined}
          </div>
        </div>
      </div>
    </ChainProvider>
    // <></>
  )
}
