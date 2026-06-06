import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import { EventCheckinModalProps, EventCheckinMode, LoadingData } from '@dao-dao/types'
import {
  StakingModalProps,
  StakingMode,
} from '@dao-dao/types/components/StakingModal'
import { Duration } from '@dao-dao/types/contracts/common'
import { convertDurationToHumanReadableString } from '@dao-dao/utils'
import { Modal, NumericInput, PercentButton, SegmentedControls, TokenAmountDisplay } from '@dao-dao/stateless'
import { QrCodeScannerProps } from './QRCodeScanner'



export const EventCheckinModal = ({
  initialMode,
  setAmount,
  onClose,
  claimableTokens,
  loadingStakableTokens,
  loadingUnstakableTokens,
  loading,
  error,
  onAction,
  actionPrefix,
  visible = true,
  // amount,
  // unstakingDuration,
  // token,
  // proposalDeposit,
  // validatorPicker,
  // enableRestaking,
  // tokenPicker,
}: EventCheckinModalProps) => {
  const { t } = useTranslation()

  const [mode, setMode] = useState(initialMode)

  const [validator, setEventSegment] = useState<string>()
  const [fromValidator, setFromValidator] = useState<string>()

  // // If choosing a ticket, unstakable amount depends on chosen validator.
  // if (validatorPicker) {
  //   // If restaking, fromValidator is source of funds.
  //   const targetValidator =
  //     mode === StakingMode.Restake ? fromValidator : validator

  //   loadingUnstakableTokens = {
  //     loading: false,
  //     data:
  //       validatorPicker.stakes?.find(
  //         (stake) => stake.validator.address === targetValidator
  //       )?.amount ?? HugeDecimal.zero,
  //   }
  // }
  // // If not choosing a validator and no unstakable amount passed, assume 0.
  // else if (!loadingUnstakableTokens) {
  //   loadingUnstakableTokens = {
  //     loading: false,
  //     data: HugeDecimal.zero,
  //   }
  // }

  // const maxTx =
  //   mode === StakingMode.Stake
  //     ? loadingStakableTokens.loading
  //       ? undefined
  //       : loadingStakableTokens.data
  //     : // Unstaking or restaking.
  //     !loadingUnstakableTokens || loadingUnstakableTokens.loading
  //       ? undefined
  //       : loadingUnstakableTokens.data

  // const invalidAmount = (): string | undefined => {
  //   if (mode === EventCheckinMode.Guest) {
  //     return claimableTokens.isPositive()
  //       ? undefined
  //       : t('error.cannotTxZeroTokens')
  //   }
  //   if (!amount.isPositive()) {
  //     return t('error.cannotTxZeroTokens')
  //   }
  //   if (maxTx === undefined) {
  //     return t('error.loadingData')
  //   }
  //   if (amount.gt(maxTx)) {
  //     return t('error.cannotStakeMoreThanYouHave')
  //   }
  // }

  return (
    <Modal
      footerContainerClassName="flex flex-row justify-end !p-4"
      footerContent={
        <>
          {/* <Tooltip title={error || invalidAmount()}>
            <Button
              disabled={!!error}
              loading={loading}
              onClick={() =>
                onAction(
                  mode,
                  mode === EventCheckinMode.Guest ? claimableTokens : amount,
                  validator,
                  fromValidator
                )
              }
            >
              {actionPrefix}
              {t(`button.stakingMode.${mode}`)}
            </Button>
          </Tooltip> */}
        </>
      }
      header={{
        title:
          mode === EventCheckinMode.Guest
            ? t('title.checkIntoEvent')
            : t('title.eventUsherTooling'),
      }}
      headerContent={
        mode !== EventCheckinMode.Guest ? (
          <div className="mt-5 flex w-full flex-col gap-4">
            {mode !== EventCheckinMode.Usher && (
              <SegmentedControls
                onSelect={setMode}
                selected={mode}
                tabs={[
                  {
                    label: t('button.stakingMode.guestCheckin'),
                    value: EventCheckinMode.Guest,
                  },
                  {
                    label: t('button.stakingMode.manageUshers'),
                    value: EventCheckinMode.Usher,
                  },
                  // ...(enableRestaking && validatorPicker
                  //   ? [
                  //     {
                  //       label: t('button.stakingMode.restake'),
                  //       value: StakingMode.Restake,
                  //     },
                  //   ]
                  //   : []),
                ]}
              />
            )}





          </div>
        ) : undefined
      }
      onClose={onClose}
      visible={visible}
    >
      {mode === EventCheckinMode.Guest ? (
        <></>
        // <ClaimModeBody
        //   amount={claimableTokens}
        //   tokenDecimals={token.decimals}
        //   tokenSymbol={token.symbol}
        // />
      ) : (
        <></>
        // <StakeUnstakeModesBody
        //   amount={amount}
        //   loadingMax={
        //     mode === StakingMode.Stake
        //       ? loadingStakableTokens
        //       : // Unstake and restake.
        //       loadingUnstakableTokens
        //   }
        //   mode={mode}
        //   proposalDeposit={proposalDeposit}
        //   setAmount={setAmount}
        //   tokenDecimals={token.decimals}
        //   tokenSymbol={token.symbol}
        //   unstakingDuration={unstakingDuration}
        // />
      )}
    </Modal >
  )
}

interface ScanDisplayBodyModeProps {
  amount: HugeDecimal
  mode: StakingMode
  loadingMax: LoadingData<HugeDecimal>
  setAmount: (newAmount: HugeDecimal) => void
  tokenSymbol: string
  tokenDecimals: number
  unstakingDuration: Duration | null
  proposalDeposit?: HugeDecimal
}

const QrCodeDisplayScan = ({
  isCreating,
  isEventUsher,
  guestVerification,
  currentEntity,
}: QrCodeScannerProps) => {
  const { t } = useTranslation()

  return (
    <>
      <h2 className="primary-text mb-6">{t('title.chooseTokenAmount')}</h2>
      {/* <NumericInput
        containerClassName="py-7 w-full h-20 pl-6 pr-8 bg-background-secondary rounded-md gap-4"
        ghost
        max={
          loadingMax.loading
            ? undefined
            : loadingMax.data.toHumanReadableNumber(tokenDecimals)
        }
        min={HugeDecimal.one.toHumanReadableNumber(tokenDecimals)}
        plusMinusButtonSize="lg"
        setValue={(_, value) =>
          setAmount(HugeDecimal.fromHumanReadable(value, tokenDecimals))
        }
        step={HugeDecimal.one.toHumanReadableNumber(tokenDecimals)}
        textClassName="font-mono leading-5 symbol-small-body-text"
        unit={'$' + tokenSymbol}
        value={amount.toHumanReadableString(tokenDecimals)}
      /> */}
      {/* {!loadingMax.loading && loadingMax.data.lt(amount) && (
        <span className="caption-text text-text-interactive-error mt-1 ml-1">
          {t('error.cannotStakeMoreThanYouHave')}
        </span>
      )}
      <TokenAmountDisplay
        amount={loadingMax}
        className="caption-text mt-4 font-mono"
        decimals={tokenDecimals}
        prefix={t('info.yourBalance') + ': '}
        showFullAmount
        symbol={tokenSymbol}
      /> */}
      {/* <div className="mt-6">
        <div className="grid grid-cols-5 gap-2">
          {[10, 25, 50, 75, 100].map((percent) => (
            <PercentButton
              key={percent}
              amount={amount}
              loadingMax={loadingMax}
              percent={percent}
              setAmount={setAmount}
            />
          ))}
        </div>
        {/* {mode === StakingMode.Stake &&
          !!proposalDeposit &&
          !loadingMax.loading &&
          loadingMax.data.gt(proposalDeposit) && (
            <PercentButton
              absoluteOffset={proposalDeposit.negated()}
              amount={amount}
              className="mt-2"
              label={t('button.stakeAllButProposalDeposit', {
                proposalDeposit: proposalDeposit.toFormattedString({
                  decimals: tokenDecimals,
                }),
                tokenSymbol,
              })}
              loadingMax={loadingMax}
              percent={100}
              setAmount={setAmount}
            />
          )} */}
      {/* </div> */}

      {/* {(mode === StakingMode.Stake ||
        mode === StakingMode.Unstake ||
        mode === StakingMode.Restake) &&
        unstakingDuration &&
        ('height' in unstakingDuration
          ? unstakingDuration.height
          : unstakingDuration.time) > 0 && (
          <div className="border-border-secondary mt-7 space-y-5 border-t pt-7">
            <p className="primary-text text-text-secondary">
              {t('title.unstakingPeriod') +
                `: ${convertDurationToHumanReadableString(
                  t,
                  unstakingDuration
                )}`}
            </p>
            <p className="body-text text-text-secondary">
              {t('info.unstakingMechanics', {
                humanReadableTime: convertDurationToHumanReadableString(
                  t,
                  unstakingDuration
                ),
              })}
            </p>
          </div>
        )} */}
    </>
  )
}

