import { ArrowForwardIos } from '@mui/icons-material'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import { shitStrapQueries } from '@dao-dao/state/query'
import { genericTokenBalancesSelector } from '@dao-dao/state/recoil'
import {
  Button,
  ChainProvider,
  Dropdown,
  TokenAmountDisplay,
  Tooltip,
  useCachedLoading,
} from '@dao-dao/stateless'
import { TypedOption } from '@dao-dao/types'
import { ShitStrapPaymentLineProps } from '@dao-dao/types/shit'
import { PossibleShitWithGenericToken } from '@dao-dao/types/contracts/ShitStrap'
import { getChainForChainId } from '@dao-dao/utils'

import { useQueryLoadingDataWithError } from '../../../../../hooks'

export const ShitstrapPaymentLine = ({
  shitstrapInfo,
  onClick,
  transparentBackground,
  EntityDisplay,
  eligibleShit,
  queryClient,
}: ShitStrapPaymentLineProps) => {
  const { t } = useTranslation()

  const {
    chainId,
    possibleShit: somePossibleshit,
    shit,
    full,
    shitstrapContractAddr,
    owner,
  } = shitstrapInfo
  const { bech32Prefix } = getChainForChainId(chainId)

  // get the amount of shit that has been shit
  const currentShitProgressLoading = useQueryLoadingDataWithError(
    shitStrapQueries.hasShit(queryClient, {
      chainId,
      contractAddress: shitstrapContractAddr,
    })
  )
  const currentShitProgress =
    currentShitProgressLoading.errored || currentShitProgressLoading.loading
      ? '0'
      : currentShitProgressLoading.data

  // Load balances as loadables since they refresh automatically on a timer.
  const shitstrapContractBalanceLoading = useCachedLoading(
    shitstrapContractAddr
      ? genericTokenBalancesSelector({
        chainId: chainId,
        address: shitstrapContractAddr,
        filter: {
          account: {
            chainId,
            address: shitstrapContractAddr,
          },
        },
      })
      : undefined,
    []
  )

  const currentShitBalance = shitstrapContractBalanceLoading.loading
    ? undefined
    : shitstrapContractBalanceLoading.data.flatMap((t) => {
      t.token.denomOrAddress === shitstrapInfo.shit.denomOrAddress
      return t
    })

  const possibleShitOptions: TypedOption<PossibleShitWithGenericToken>[] =
    eligibleShit.errored || eligibleShit.loading
      ? []
      : shitstrapInfo.possibleShit.flatMap((asset, index) => {
        // console.log(index, asset, somePossibleshit)
        const displayToken =
          asset.source.chainId != asset.chainId ? asset.symbol : asset.symbol
        return {
          label: `${displayToken}: ${HugeDecimal.from(asset.shit_rate).toFormattedString({ decimals: 18, minDecimals: 3 })}`,
          value: { shit_rate: asset.shit_rate, token: asset },
        }
      })

  const options = possibleShitOptions.map((asset, index) => ({
    value: [asset],
    label: asset.label,
  }))

  //  subtract the cutoff from what has been shit to
  const leftToShit = HugeDecimal.from(shitstrapInfo.cutoff).minus(
    currentShitProgress
  )

  // if contract does not have atleast enought to shit, display a button to fund the shitstrap
  const [showingFundShitstrap, setShowFundShitstrap] = useState(false)
  const hasEnoughShit = !currentShitBalance
    ? undefined
    : currentShitBalance.find((a) => {
      if (
        a.token.denomOrAddress === shitstrapInfo.shit.denomOrAddress &&
        leftToShit.gt(a.balance)
      ) {
        return false
      }
      return true
    })

  const handleSelect = (option: typeof possibleShitOptions, index: number) => {
    console.log(option, index)
  }

  // useEffect(() => {
  //   console.log("leftToShit:", leftToShit)
  //   console.log("shit.decimals:", shit.decimals)
  // }, [leftToShit])

  return (
    <ChainProvider chainId={chainId}>
      <div
        className={clsx(
          'box-content grid h-8 cursor-pointer grid-cols-4 items-center gap-1 rounded-lg py-2 px-3 transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed md:gap-2 md:py-9 md:px-8',
          !transparentBackground && 'bg-background-tertiary'
        )}
        onClick={(event) => {
          if (event.target !== document.querySelector('.dropdown-container')) {
            onClick()
          }
        }}
      >
        {/* display owner of shitstrap */}
        <EntityDisplay address={owner} noUnderline />
        {/* display shistrap state */}
        {full ? (
          <div className="hidden md:block">
            <Tooltip title={'Full of shit!'}>
              <p className="inline-block"></p>
            </Tooltip>
          </div>
        ) : (
          <>
            {/* display map of eligible assets & their shit_rates */}
            <div onClick={(event) => event.stopPropagation()}>
              <Dropdown
                onSelect={handleSelect}
                options={options}
                placeholder={t('info.selectEligibleAsset', {
                  number: possibleShitOptions.length,
                })}
              />
            </div>
          </>
        )}
        <div className="hidden md:block">
          {/* Show Cutoff Token */}
          Shit Progress
          <TokenAmountDisplay
            amount={HugeDecimal.from(currentShitProgress).div(
              shitstrapInfo.cutoff
            )}
            className="body-text truncate font-mono"
            decimals={shit.decimals}
            hideSymbol
            showAllDecimals
            suffix=" %"
            symbol={''}
            wrapperClassName={
              shit.denomOrAddress.startsWith(`factory/'${bech32Prefix}'1`)
                ? 'color-warning'
                : shit.denomOrAddress.startsWith(`ibc/`)
                  ? ''
                  : ''
            }
          />
        </div>
        <div className="hidden md:block">
          {!showingFundShitstrap && !hasEnoughShit ? (
            <Button
              // disabled={!distribution.open_funding}
              onClick={() => setShowFundShitstrap(true)}
              size="lg"
              variant="secondary"
            >
              {t('button.addFunds')}
              <ArrowForwardIos className="!h-4 !w-4" />
            </Button>
          ) : (
            <>
              Left To Shit:
              <TokenAmountDisplay
                amount={leftToShit}
                className="body-text truncate font-mono"
                decimals={shit.decimals}
                symbol={shitstrapInfo.shit.symbol}
                wrapperClassName={
                  shit.denomOrAddress.startsWith(`factory/'${bech32Prefix}'1`)
                    ? 'color-warning'
                    : shit.denomOrAddress.startsWith(`ibc/`)
                      ? ''
                      : ''
                }
              />
            </>
          )}
        </div>
      </div>
    </ChainProvider>
  )
}
