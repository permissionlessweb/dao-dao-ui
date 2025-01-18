import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  ChainProvider,
  Dropdown,
  TokenAmountDisplay,
  Tooltip,
} from '@dao-dao/stateless'
import { ShitStrapPaymentLineProps, TypedOption } from '@dao-dao/types'
import { PossibleShit } from '@dao-dao/types/contracts/ShitStrap'
import { getChainForChainId } from '@dao-dao/utils'

export const ShitstrapPaymentLine = ({
  shitstrapInfo,
  onClick,
  transparentBackground,
  EntityDisplay,
}: ShitStrapPaymentLineProps) => {
  const { t } = useTranslation()

  const { chainId, possibleShit, shit, full, shitstrapContractAddr, owner } =
    shitstrapInfo
  const { bech32_prefix: bech32Prefix } = getChainForChainId(chainId)

  const possibleShitOptions: TypedOption<PossibleShit>[] = possibleShit.map(
    (asset) => {
      const tokenString =
        typeof asset.token === 'object'
          ? 'native' in asset.token
            ? asset.token.native
            : asset.token.cw20
          : asset.token

      const displayToken = tokenString.startsWith(`factory/'${bech32Prefix}'1`)
        ? !tokenString.substring(51).startsWith('/')
          ? tokenString.substring(71)
          : tokenString.substring(52)
        : tokenString

      return {
        label: `${displayToken}: ${HugeDecimal.from(
          asset.shit_rate
        ).toInternationalizedHumanReadableString({
          decimals: 6,
          minDecimals: 2,
        })}`,
        value: asset,
      }
    }
  )

  const options = possibleShit.map((asset, index) => ({
    value: asset,
    label: (
      <div
        className={clsx(
          'b h-8 cursor-pointer grid-cols-2 items-center gap-2 rounded-lg py-2 px-3 transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed',
          !transparentBackground && 'bg-background-tertiary'
        )}
      >
        <TokenAmountDisplay
          amount={HugeDecimal.from(asset.shit_rate)}
          className="body-text truncate font-mono"
          decimals={6}
          symbol={
            typeof asset.token === 'object'
              ? 'native' in asset.token
                ? asset.token.native.substring(0, 15)
                : asset.token.cw20.substring(0, 15)
              : asset.token.substring(0, 9)
          }
        />
      </div>
    ),
  }))

  const handleSelect = (option: typeof possibleShit[0], index: number) => {
    // Handle the selection of an option
    console.log(option, index)
  }

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
        {/* display owner of shitstrao */}
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
            {/* todo: click to see map of all possible tokens, display verified or tokenfactory tokens */}
            <div onClick={(event) => event.stopPropagation()}>
              <Dropdown
                containerClassName=""
                iconClassName=""
                labelClassName=""
                labelContainerClassName=""
                onSelect={handleSelect}
                options={possibleShitOptions}
                placeholder={t('info.selectEligibleAsset', {
                  number: possibleShit.length,
                })}
              />
            </div>
          </>
        )}
        <div className="hidden md:block">
          {/* Show Cutoff Token */}
          Total Shit:
          <TokenAmountDisplay
            amount={HugeDecimal.from(shitstrapInfo.cutoff).times(
              HugeDecimal.from(10).pow(-6)
            )}
            className="body-text truncate font-mono"
            decimals={shit.decimals}
            wrapperClassName={
              shit.denomOrAddress.startsWith(`factory/'${bech32Prefix}'1`) ? 'color-warning' : shit.denomOrAddress.startsWith(`ibc/`) ? '' : ''
            }
            symbol={
              shit.denomOrAddress.startsWith(`factory/'${bech32Prefix}'1`)
                ? !shit.denomOrAddress.substring(51).startsWith('/')
                  ? shit.denomOrAddress.substring(71)
                  : shit.denomOrAddress.substring(52)
                : shit.denomOrAddress
            }
          />
        </div>
      </div>
    </ChainProvider>
  )
}
