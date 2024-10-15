import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import {
  DaoDaoCoreSelectors,
  genericTokenBalancesSelector,
} from '@dao-dao/state'
import { cwShitstrapExtraQueries } from '@dao-dao/state/query'
import {
  Button,
  SegmentedControls,
  TokenAmountDisplay,
  TokenInput,
  Tooltip,
  useActionOptions,
  useCachedLoading,
  useChain,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  ActionContextType,
  ActionKey,
  EntityType,
  ShitstrapPaymentMode,
  StatefulShitStrapPaymentCardProps,
  TokenType,
} from '@dao-dao/types'
import {
  getChainForChainId,
  getDaoProposalSinglePrefill,
  isValidBech32Address,
  processError,
} from '@dao-dao/utils'

import {
  useAwaitNextBlock,
  useEntity,
  useQueryLoadingDataWithError,
  useWallet,
} from '../../hooks'
import { useMakeShitstrapPayment } from '../../hooks/contracts/CwShitstrap'

export const ShitstrapPaymentCard = ({
  shitstrapInfo: fallbackInfo,
  shitting,
}: StatefulShitStrapPaymentCardProps) => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const { bech32_prefix: bech32Prefix } = getChainForChainId(chainId)

  const { goToDaoProposal } = useDaoNavHelpers()
  const [mode, setMode] = useState(ShitstrapPaymentMode.Payment)
  const {
    context,
    address,
    chain: { chain_id: currentChainId },
  } = useActionOptions()

  // create form for selecting token and amount
  const {
    register,
    control,
    watch,
    setValue,
    setError,
    getValues,
    clearErrors,
  } = useForm()

  const watchShitToken = watch(('payment.' + 'shitToken') as 'shitToken')
  const watchAmount = watch(('payment.' + 'amount') as 'amount')

  const { address: walletAddress = '', getSigningClient } = useWallet()

  // Get entities
  const [usingOwnShit, setUsingOwnShit] = useState(true)
  const { entity } = useEntity(
    !usingOwnShit
      ? isValidBech32Address(address, bech32Prefix)
        ? address
        : ''
      : isValidBech32Address(walletAddress, bech32Prefix)
        ? walletAddress
        : ''
  )

  // DAO & balance of DAO
  // Try to retrieve governance token address, failing if not a cw20-based DAO.
  const currentEntityDAOTokenLoadable = useRecoilValueLoadable(
    !entity.loading &&
      entity.data.type === EntityType.Dao &&
      // Only care about loading the governance token if on the chain we're
      // creating the token swap on.
      entity.data.chainId === chainId
      ? DaoDaoCoreSelectors.tryFetchGovernanceTokenAddressSelector({
        chainId,
        contractAddress: entity.data.address,
      })
      : constSelector(undefined)
  )
  // Load balances as loadables since they refresh automatically on a timer.
  const currentEntityTokenBalances = useCachedLoading(
    entity &&
      !entity.loading &&
      entity.data &&
      currentEntityDAOTokenLoadable.state !== 'loading'
      ? genericTokenBalancesSelector({
        chainId: entity.data.chainId,
        address: entity.data.address,
        cw20GovernanceTokenAddress:
          currentEntityDAOTokenLoadable.state === 'hasValue'
            ? currentEntityDAOTokenLoadable.contents
            : undefined,
        filter: {
          account: {
            chainId,
            address: entity.data.address,
          },
        },
      })
      : undefined,
    []
  )

  // if wallet is selected to make payment, use wallet tokens in TokenInput, broacast payment via wallet
  useEffect(() => {
    if (context.type === ActionContextType.Wallet) {
      setUsingOwnShit(true)
    }
  }, [context.type])

  // helper for actions to occur once token is selected
  const [initialValueSet, setInitialValueSet] = useState(false)
  useEffect(() => {
    if (watchShitToken && !initialValueSet) {
      setInitialValueSet(true)
    }
  }, [watchShitToken])

  const queryClient = useQueryClient()
  // Use info passed into props as fallback, since it came from the list query;
  // the individual query updates more frequently.
  const freshInfo = useQueryLoadingDataWithError(
    cwShitstrapExtraQueries.info(queryClient, {
      chainId,
      address: fallbackInfo.shitstrapContractAddr,
    })
  )

  const shitstrapInfo =
    freshInfo.loading || freshInfo.errored ? fallbackInfo : freshInfo.data

  const {
    full,
    cutoff,
    chainId: shitChainId,
    shit,
    owner,
    title,
    description,
    eligibleAssets,
    shitstrapContractAddr,
  } = shitstrapInfo

  const eligibleAsset = watchShitToken
    ? shitstrapInfo.eligibleAssets.find((asset) => {
      if (typeof asset.token === 'object') {
        return (
          ('native' in asset.token &&
            asset.token.native === watchShitToken?.denomOrAddress) ||
          ('cw20' in asset.token &&
            asset.token.cw20 === watchShitToken?.denomOrAddress)
        )
      } else {
        return asset.token === watchShitToken?.denomOrAddress
      }
    })
    : undefined
  // microdenom helpers
  const decimals = watchShitToken ? watchShitToken?.decimals ?? 0 : 0
  const selectedMicroBalance = watchShitToken ? watchShitToken?.balance ?? 0 : 0
  const selectedBalance = watchShitToken
    ? HugeDecimal.from(selectedMicroBalance).toHumanReadableString(decimals)
    : 0
  const insufficientBalanceI18nKey = watchShitToken
    ? context.type === ActionContextType.Wallet
      ? 'error.insufficientWalletBalance'
      : 'error.cantSpendMoreThanTreasury'
    : ''

  const estimatedToken = eligibleAsset
    ? HugeDecimal.from(eligibleAsset.shit_rate ?? 1)
      .div(HugeDecimal.from(10).pow(6))
      .toNumber() * parseInt(watchAmount)
    : 1

  const displayShitToken = shit
    ? shit.denomOrAddress.startsWith(`factory/osmo1`)
      ? !shit.denomOrAddress.substring(51).startsWith('/')
        ? shit.denomOrAddress.substring(71)
        : shit.denomOrAddress.substring(52)
      : shit.denomOrAddress
    : 'hsh'
  useEffect(() => {
    console.log(eligibleAsset)
    console.log(watchAmount)
    console.log(watchShitToken)
    console.log(estimatedToken)
  }, [watchAmount]);

  // if user wants to make payment with fund from account,
  // we make use of the recoilHook here that takes the props currently set
  const makeShitstrapPayment = useMakeShitstrapPayment({
    contractAddress: shitstrapContractAddr,
    sender: walletAddress,
  })

  // const shitAction = useInitializedActionForKey(ActionKey.ManageShitstrap)
  const [makingPayment, setMakingPayment] = useState(false)
  const awaitNextBlock = useAwaitNextBlock()
  const onShitstrapPayment = async () => {
    setMakingPayment(true)
    try {
      if (!entity.loading && !usingOwnShit) {
        let debugActions = [
          {
            actionKey: ActionKey.Execute,
            data: {
              chainId,
              address: shitstrapInfo.shitstrapContractAddr,
              message: JSON.stringify(
                {
                  shit_strap: {
                    shit: {
                      amount: HugeDecimal.fromHumanReadable(
                        watchAmount,
                        6
                      ).toString(),
                      denom:
                        watchShitToken.type == TokenType.Native
                          ? { native: watchShitToken?.denomOrAddress }
                          : { native: watchShitToken?.denomOrAddress },
                    },
                  },
                },
                null,
                2
              ),
              funds: [
                {
                  amount: HugeDecimal.fromHumanReadable(watchAmount, 6).toString(),
                  denom: watchShitToken?.denomOrAddress,
                },
              ],
              cw20: false,
            },
          },
        ]
        console.log(debugActions)
        let debug = goToDaoProposal(entity.data.address, 'create', {
          prefill: getDaoProposalSinglePrefill({
            actions: debugActions
          }),
        })
        await debug
      } else if (
        watchShitToken &&
        watchShitToken.type == TokenType.Native &&
        usingOwnShit
      ) {
        // limit to only use native tokens for now lol

        let res = makeShitstrapPayment(
          {
            shit: {
              amount: HugeDecimal.fromHumanReadable(watchAmount, 6).toString(),
              denom:
                watchShitToken.type == TokenType.Native
                  ? { native: watchShitToken?.denomOrAddress }
                  : { native: watchShitToken?.denomOrAddress },
            },
          },
          'auto',
          'shitstrap payment',
          [
            {
              amount: HugeDecimal.fromHumanReadable(watchAmount, 6).toString(),
              denom: watchShitToken?.denomOrAddress,
            },
          ]
        )

        console.log(res)
        await res
        // refresh()
        toast.success(t('success.shitstrapPaymentMade'))
      }
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setMakingPayment(false)
    }
  }

  return (
    <>
      <div className="rounded-lg bg-background-tertiary">
        {/* Description */}
        <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-6">
          <div className="flex flex-row items-start justify-between gap-8">
            <p className="link-text">{t('info.shitstrapPaymentTitle')}</p>
          </div>
          <p className="link-text">{t('info.shitstrapPaymentDescription')}</p>
        </div>
        <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-0">
          <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-6">
            <h4 className="text-lg font-bold">{t('eligibleTokens')}</h4>
            {shitstrapInfo.eligibleAssets &&
              shitstrapInfo.eligibleAssets.length > 0 ? (
              shitstrapInfo.eligibleAssets.map((asset, index) => (
                <div
                  key={index}
                  className={clsx(
                    'flex flex-row items-center justify-between p-4 rounded-lg',
                    'bg-background-tertiary hover:bg-background-interactive-hover'
                  )}
                >
                  <TokenAmountDisplay
                    amount={1}
                    className="body-text truncate font-mono"
                    decimals={4}
                    // HugeDecimal.from(1).div(HugeDecimal.fromHumanReadable(eligibleAsset.shit_rate, 6)).times(watchAmount)
                    prefix="For every  "
                    suffix={`, recieve  ${HugeDecimal.from(asset.shit_rate ?? 1)
                      .div(HugeDecimal.from(10).pow(6))
                      .toNumber()}  ${displayShitToken} `}
                    symbol={
                      typeof asset.token === 'object'
                        ? 'native' in asset.token
                          ? asset.token.native.startsWith(`factory/osmo1`)
                            ? !asset.token.native.substring(51).startsWith('/')
                              ? asset.token.native.substring(71)
                              : asset.token.native.substring(52)
                            : asset.token.native
                          : asset.token.cw20.startsWith(`factory/osmo1`)
                            ? !asset.token.cw20.substring(51).startsWith('/')
                              ? asset.token.cw20.substring(71)
                              : asset.token.cw20.substring(52)
                            : asset.token.cw20
                        : asset.token.startsWith(`factory/osmo1`)
                          ? !asset.token.substring(51).startsWith('/')
                            ? asset.token.substring(71)
                            : asset.token.substring(52)
                          : asset.token
                    }
                  />
                </div>
              ))
            ) : (
              <p>{t('info.unknown')}</p>
            )}
          </div>
          <div className="flex flex-col gap-3 border-t border-border-secondary py-4 px-6">
            {t(`title.shitstrapAction`)}
            <Tooltip
              title={
                'Select the shit action you wish to perform. Only the owner of the shit may flush. You shit, you flush.'
              }
            >
              <div className="mt-5 flex w-full flex-col gap-4">
                <SegmentedControls
                  onSelect={setMode}
                  selected={mode}
                  tabs={[
                    {
                      label: t('button.shitstrapPaymentMode.payment'),
                      value: ShitstrapPaymentMode.Payment,
                    },
                    {
                      label: t('button.shitstrapPaymentMode.flush'),
                      value: ShitstrapPaymentMode.Flush,
                    },
                  ]}
                />
              </div>
            </Tooltip>

            {mode === ShitstrapPaymentMode.Payment ? (
              <>
                <div className="mt-5 flex w-full flex-col gap-4">
                  <SegmentedControls
                    onSelect={setUsingOwnShit}
                    selected={usingOwnShit}
                    tabs={[
                      {
                        label: t('button.shitstrapPaymentMode.useYourWallet'),
                        value: true,
                      },
                      {
                        label: t('button.shitstrapPaymentMode.useTheDao'),
                        value: false,
                      },
                    ]}
                  />
                </div>

                <TokenInput
                  allowCustomToken={false}
                  amount={{
                    watch,
                    setValue: (fieldName, value) => setValue(fieldName, value),
                    register,
                    getValues,
                    fieldName: ('payment.' + 'amount') as 'amount',
                    error: undefined,
                    min: 0,
                    max: 999999999999999999,
                    step: HugeDecimal.one.toHumanReadableNumber(decimals),
                    validations: [
                      (amount) =>
                        HugeDecimal.from(amount).toString() <=
                        selectedBalance.toString() ||
                        t(insufficientBalanceI18nKey, {
                          amount: selectedBalance.toLocaleString(undefined, {
                            maximumFractionDigits: decimals,
                          }),
                          tokenSymbol:
                            watchShitToken?.symbol ??
                            t('info.token').toLocaleUpperCase(),
                        }),
                    ],
                  }}
                  onSelectToken={(token) => {
                    // Save the matched token to the form in shitToken field
                    setValue(('payment.' + 'shitToken') as 'shitToken', token)
                  }}
                  // readOnly={shitting}
                  selectedToken={watchShitToken}
                  showChainImage
                  tokens={
                    // usingOwnShit ?
                    {
                      loading: false,
                      data: currentEntityTokenBalances.loading
                        ? []
                        : currentEntityTokenBalances.data
                          ?.filter(({ token }) =>
                            shitstrapInfo.eligibleAssets.some((asset) => {
                              if (typeof asset.token === 'object') {
                                if ('native' in asset.token) {
                                  return (
                                    asset.token.native ===
                                    token.denomOrAddress
                                  )
                                } else if ('cw20' in asset.token) {
                                  return (
                                    asset.token.cw20 === token.denomOrAddress
                                  )
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
                    }
                    //  :
                    //     {
                    //         loading: false,
                    //         data: currentDaoEntityTokenBalances.loading
                    //             ? []
                    //             : (currentDaoEntityTokenBalances.data
                    //                 ?.filter(({ token }) =>
                    //                     shitstrapInfo.eligibleAssets.some((asset) => {
                    //                         if (typeof asset.token === 'object') {
                    //                             if ('native' in asset.token) {
                    //                                 return asset.token.native === token.denomOrAddress;
                    //                             } else if ('cw20' in asset.token) {
                    //                                 return asset.token.cw20 === token.denomOrAddress;
                    //                             } else {
                    //                                 return false;
                    //                             }
                    //                         } else {
                    //                             return asset.token === token.denomOrAddress;
                    //                         }
                    //                     })
                    //                 )
                    //                 ?.map(({ balance, token }) => ({
                    //                     ...token,
                    //                     owner: owner,
                    //                     description:
                    //                         t('title.balance') +
                    //                         ': ' + HugeDecimal.from(balance).toInternationalizedHumanReadableString({ decimals })
                    //                     ,
                    //                 })) ?? []),
                    //     }
                  }
                />
              </>
            ) : null}
            {mode === ShitstrapPaymentMode.Flush ? <></> : null}
            {mode === ShitstrapPaymentMode.OverFlow ? <></> : null}
          </div>
          {!entity.loading && (
            <div className="flex flex-col gap-2 border-t border-border-secondary px-6 py-4">
              <p className="link-text mb-1">
                {t('info.previewShitstrapPayment')}
              </p>

              <div className="flex flex-row items-center justify-between gap-8">
                <p className="grow text-sm">{t('title.estimatedToShit')}</p>
                {estimatedToken !== HugeDecimal.zero.toNumber() && (
                  <TokenAmountDisplay
                    amount={estimatedToken}
                    className="grow text-sm"
                    decimals={6}
                    hideSymbol={false}
                    symbol={
                      shit.denomOrAddress.startsWith(`factory/osmo1`)
                        ? !shit.denomOrAddress.substring(51).startsWith('/')
                          ? shit.denomOrAddress.substring(71)
                          : shit.denomOrAddress.substring(52)
                        : shit.denomOrAddress
                    }
                  />
                )}
              </div>

              <div className="flex flex-row items-center justify-between gap-8"></div>

              {onShitstrapPayment && (
                <Button
                  center
                  className="mt-2"
                  loading={shitting}
                  onClick={onShitstrapPayment}
                  variant="brand"
                >
                  {t('button.makeShitStrapPayment')}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
