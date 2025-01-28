import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  ChainProvider,
  Dropdown,
  TokenAmountDisplay,
  Tooltip,
} from '@dao-dao/stateless'
import { GenericToken, ShitStrapPaymentLineProps, TypedOption, Uint128 } from '@dao-dao/types'
import { PossibleShit } from '@dao-dao/types/contracts/ShitStrap'
import { getChainForChainId } from '@dao-dao/utils'
import { useQueryLoadingDataWithError } from '../../../../../hooks'
import { tokenQueries } from '@dao-dao/state/query'
import { contractVersionSelector } from '@dao-dao/state/recoil'

export const ShitstrapPaymentLine = ({
  shitstrapInfo,
  onClick,
  transparentBackground,
  EntityDisplay,
  eligibleShit,
  queryClient,
}: ShitStrapPaymentLineProps) => {
  const { t } = useTranslation()

  const { chainId, possibleShit: somePossibleshit, shit, full, shitstrapContractAddr, owner } =
    shitstrapInfo
  const {  bech32Prefix } = getChainForChainId(chainId)

  // const freshShitTokenQuery = useQueryLoadingDataWithError(
  //   tokenQueries.info(queryClient, {
  //     chainId,
  //     type: shitstrapInfo.shit.type,
  //     denomOrAddress: shitstrapInfo.shit.denomOrAddress,

  //   })
  // )

  // const freshShit = freshShitTokenQuery.errored || freshShitTokenQuery.loading ? shit.denomOrAddress :
  //   freshShitTokenQuery.data.source.denomOrAddress != freshShitTokenQuery.data.denomOrAddress ?
  //     freshShitTokenQuery.data.source.denomOrAddress : freshShitTokenQuery.data.denomOrAddress

  interface PossibleShitWithGenericToken {
    shit_rate: Uint128
    token: GenericToken
  }



  // Create GenericToken with shitstrap ratio extended
  const possibleShitOptions: TypedOption<PossibleShitWithGenericToken>[] = eligibleShit.errored || eligibleShit.loading ? [] :
    shitstrapInfo.possibleShit.flatMap((asset, index) => {
      console.log(index, asset, somePossibleshit)
      const displayToken = asset.source.chainId != asset.chainId ? asset.symbol : asset.symbol


      return {
        label: `${displayToken}: ${HugeDecimal.from(asset.shit_rate).toInternationalizedHumanReadableString({ decimals: 18, minDecimals: 3, })}`,
        value: { shit_rate: asset.shit_rate, token: asset },
      }
    }
    )

  const options = possibleShitOptions.map((asset, index) => ({
    value: [asset],
    label: asset.label
  }))

  const handleSelect = (option: typeof possibleShitOptions, index: number) => {
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
            {/* todo: click to see map of all possible tokens, display verified or tokenfactory tokens */}
            <div onClick={(event) => event.stopPropagation()}>
              <Dropdown
                onSelect={handleSelect}
                options={options}
                placeholder={t('info.selectEligibleAsset', {
                  number: possibleShitOptions.length,
                })}
              // selected={}
              />
            </div>
          </>
        )}
        <div className="hidden md:block">
          {/* Show Cutoff Token */}
          Total Shit:
          <TokenAmountDisplay
            amount={HugeDecimal.from(shitstrapInfo.cutoff).times(
              HugeDecimal.from(10).pow(0)
            )}
            className="body-text truncate font-mono"
            decimals={shit.decimals}
            wrapperClassName={''// shit.denomOrAddress.startsWith(`factory/'${bech32Prefix}'1`) ? 'color-warning' : shit.denomOrAddress.startsWith(`ibc/`) ? '' : ''
            }
            symbol={shitstrapInfo.shit.symbol}
          />
        </div>
      </div>
    </ChainProvider>
  )
}
