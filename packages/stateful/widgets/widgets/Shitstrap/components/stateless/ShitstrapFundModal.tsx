import { ArrowForwardIos, Check } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  Button,
  InputErrorMessage,
  InputLabel,
  Modal,
  NumericInput,
  Tooltip,
} from '@dao-dao/stateless'
import { validatePositive, validateRequired } from '@dao-dao/utils'

import { ShitstrapFundModalProps } from '../../types'

export const ShitstrapFundModal = ({
  shitstrapInfo,
  onClose,
  onFund,
  funding,
  remaining,
  visible,
}: ShitstrapFundModalProps) => {
  const { t } = useTranslation()

  const [showingDistribute, setShowingDistribute] = useState(false)
  const [funded, setFunded] = useState(false)
  useEffect(() => {
    if (!funded) {
      return
    }

    const timeout = setTimeout(() => {
      setFunded(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [funded])

  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<{
    amount: string
  }>({
    defaultValues: {
      amount: '1',
    },
  })

  const amount = watch('amount')
  const hugeAmount = HugeDecimal.fromHumanReadable(
    amount,
    shitstrapInfo?.shit.decimals ?? 0
  )

  // const onFund = async (amount: HugeDecimal) => {
  //     // Should never happen if onFund is being called.
  //     if (!distribution) {
  //       toast.error(t('error.loadingData'))
  //       return false
  //     }

  //     if (!isWalletConnected || !address) {
  //       toast.error(t('error.logInToContinue'))
  //       return false
  //     }

  //     if (!amount.isPositive()) {
  //       toast.error(t('error.cannotDistributeZeroTokens'))
  //       return false
  //     }

  //     setFunding(true)
  //     try {
  //       await executeSmartContractWithToken({
  //         client: getSigningClient,
  //         sender: address,
  //         contractAddress: distribution.address,
  //         msg: {
  //           fund: {
  //             id: distribution.id,
  //           },
  //         },
  //         token: distribution.token,
  //         amount,
  //       })

  //       await Promise.all([
  //         // Refetch indexer query depended on by contract query.
  //         queryClient
  //           .refetchQueries({
  //             queryKey: indexerQueries.queryContract(queryClient, {
  //               chainId: dao.chainId,
  //               contractAddress: distribution.address,
  //               formula: 'daoRewardsDistributor/distribution',
  //               args: {
  //                 id: distribution.id,
  //               },
  //             }).queryKey,
  //           })
  //           .then(() =>
  //             // Refetch contract query.
  //             queryClient.refetchQueries({
  //               queryKey: daoRewardsDistributorQueryKeys.distribution(
  //                 dao.chainId,
  //                 distribution.address,
  //                 {
  //                   id: distribution.id,
  //                 }
  //               ),
  //             })
  //           )
  //           .then(() =>
  //             // Refetch distribution query that uses contract query.
  //             queryClient.refetchQueries({
  //               queryKey: daoRewardsDistributorExtraQueries.distribution(
  //                 queryClient,
  //                 {
  //                   chainId: dao.chainId,
  //                   address: distribution.address,
  //                   id: distribution.id,
  //                 }
  //               ).queryKey,
  //             })
  //           ),
  //         // Refetch contract query depended on by pending rewards query.
  //         queryClient
  //           .refetchQueries({
  //             queryKey: [
  //               {
  //                 ...daoRewardsDistributorQueryKeys.contract[0],
  //                 method: 'pending_rewards',
  //               },
  //             ],
  //           })
  //           .then(() =>
  //             // Refetch pending rewards query that uses contract query.
  //             queryClient.refetchQueries({
  //               queryKey: ['daoRewardsDistributorExtra', 'listAllPendingRewards'],
  //             })
  //           )
  //           .then(() =>
  //             // Refetch DAO pending rewards query that uses pending rewards
  //             // query.
  //             queryClient.refetchQueries({
  //               queryKey: daoRewardsDistributorExtraQueries.pendingDaoRewards(
  //                 queryClient,
  //                 {
  //                   chainId: dao.chainId,
  //                   daoAddress: dao.coreAddress,
  //                   recipient: address,
  //                 }
  //               ).queryKey,
  //             })
  //           ),
  //         // Refetch rewards remaining query.
  //         queryClient.refetchQueries({
  //           queryKey: daoRewardsDistributorQueries.undistributedRewards({
  //             chainId: dao.chainId,
  //             contractAddress: distribution.address,
  //             args: {
  //               id: distribution.id,
  //             },
  //           }).queryKey,
  //         }),
  //       ])

  //       toast.success(t('success.distributedRewards'))

  //       return true
  //     } catch (error) {
  //       console.error(error)
  //       toast.error(processError(error))

  //       return false
  //     } finally {
  //       setFunding(false)
  //     }
  //   }

  return (
    <Modal
      contentContainerClassName="gap-4 items-start"
      footerContent={
        !shitstrapInfo ? undefined : showingDistribute ? (
          <div className="flex flex-col gap-2">
            <p className="title-text">{t('title.addFunds')}</p>

            <p className="secondary-text -mt-1 mb-1">
              {t('info.distributeToDaoMembersFromWallet')}
            </p>

            <div className="flex flex-row gap-2">
              <NumericInput
                containerClassName="grow"
                error={errors?.amount}
                fieldName="amount"
                getValues={getValues}
                min={0}
                register={register}
                setValue={setValue}
                step={HugeDecimal.one.toHumanReadableNumber(
                  shitstrapInfo.shit.decimals
                )}
                unit={'$' + shitstrapInfo.shit.symbol}
                validation={[validateRequired, validatePositive]}
              />

              <Button
                disabled={hugeAmount.isNaN() || hugeAmount.isZero()}
                loading={funding}
                onClick={() =>
                  onFund(hugeAmount).then((success) => setFunded(success))
                }
                variant="secondary"
              >
                {funded ? t('button.distributed') : t('button.distribute')}
                {funded && <Check className="!h-5 !w-5" />}
              </Button>
            </div>

            <InputErrorMessage error={errors?.amount} />
          </div>
        ) : (
          <Tooltip title={t('info.distributeToDaoMembersFromWallet')}>
            <Button
              // disabled={!shitstrapInfo.open_funding}
              onClick={() => setShowingDistribute(true)}
              size="lg"
              variant="secondary"
            >
              {t('button.addFunds')}
              <ArrowForwardIos className="!h-4 !w-4" />
            </Button>
          </Tooltip>
        )
      }
      header={{
        supertitle: shitstrapInfo ? t('title.shitstrap') : undefined,
        title: shitstrapInfo
          ? shitstrapInfo.title
          : t('title.rewardDistribution'),
        // title: shitstrapInfo?.title
        //     ? getHumanReadableRewardDistributionLabel(t, shitstrapInfo.)
        //     : t('title.rewardDistribution'),
        imageUrl: shitstrapInfo?.shit.imageUrl || undefined,
      }}
      onClose={() => {
        onClose()
        // Wait for the modal to close before hiding this to prevent flickering.
        setTimeout(() => setShowingDistribute(false), 500)
      }}
      titleClassName="!title-text"
      visible={visible}
    >
      <div className="flex flex-col gap-1">
        <InputLabel name={t('title.status')} />
        {shitstrapInfo ? (
          <div className="flex flex-row gap-1 items-center">
            <p className="primary-text">
              {shitstrapInfo.full
                ? t('title.fullOfShit')
                : !remaining.loading &&
                    !remaining.errored &&
                    !remaining.updating &&
                    remaining.data.isZero()
                  ? t('title.completed')
                  : t('title.live')}
            </p>

            {/* {!('paused' in distribution.active_epoch.emission_rate) && (
                            <TooltipInfoIcon
                                size="sm"
                                title={t('info.addFundsToContinueDistributing')}
                            />
                        )} */}
          </div>
        ) : (
          <p>...</p>
        )}
      </div>

      {/* {shitstrapInfo &&
                ('linear' in shitstrapInfo.active_epoch.emission_rate ? (
                    <>
                        <div className="flex flex-col gap-1">
                            <InputLabel name={t('title.dateStarted')} />
                            {distribution ? (
                                <p className="primary-text">
                                    {formatExpiration(t, distribution.active_epoch.started_at)}
                                </p>
                            ) : (
                                <p>...</p>
                            )}
                        </div>

                        {!remaining.errored && (
                            <div className="flex flex-col gap-1">
                                <InputLabel
                                    name={t('title.rewardsRemaining')}
                                    tooltip={t('info.rewardsRemainingTooltip')}
                                />
                                <TokenAmountDisplay
                                    amount={
                                        !remaining.loading && remaining.updating
                                            ? { loading: true }
                                            : remaining
                                    }
                                    className="primary-text"
                                    decimals={distribution.token.decimals}
                                    symbol={distribution.token.symbol}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col gap-1">
                        <InputLabel
                            name={
                                'immediate' in distribution.active_epoch.emission_rate
                                    ? t('title.rewardsDistributed')
                                    : // Paused
                                    t('title.rewardsLocked')
                            }
                        />
                        <TokenAmountDisplay
                            amount={HugeDecimal.from(distribution.funded_amount)}
                            className="primary-text"
                            decimals={distribution.token.decimals}
                            symbol={distribution.token.symbol}
                        />
                    </div>
                ))} */}
    </Modal>
  )
}
