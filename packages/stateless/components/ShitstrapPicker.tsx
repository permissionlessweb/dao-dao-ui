import { ArrowOutwardRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  PopupTriggerCustomComponent,
  ShitstrapPickerProps,
} from '@dao-dao/types'
import { formatPercentOf100 } from '@dao-dao/utils'

import { Button } from './buttons'
import { CopyToClipboard } from './CopyToClipboard'
import { IconButtonLink } from './icon_buttons'
import { InputThemedText } from './inputs'
import { FilterableItemPopup } from './popup'
import { TokenAmountDisplay } from './token'
import { Tooltip } from './tooltip'

export const ShitstrapPicker = ({
  shitstraps,
  selectedAddress,
  readOnly = false,
  onSelect,
  displayClassName,
}: ShitstrapPickerProps) => {
  const { t } = useTranslation()


  const selectedShistrap = shitstraps.find((shit) => { shit.shitstrapContractAddr == selectedAddress })
  useEffect(() => {
    console.log(shitstraps)
  }, [onSelect])
  const TriggerRenderer: PopupTriggerCustomComponent = useCallback(
    ({ open, ...props }) => (
      <div className={clsx('flex', displayClassName)}>
        {selectedAddress ? (
          <InputThemedText className="min-w-0 grow">
            {/* <CopyToClipboard
              label={se?.shitstrapContractAddr}
              tooltip={t('button.clickToCopyAddress')}
              value={selectedAddress}
            /> */}

            {!readOnly && (
              <Button pressed={open} variant="ghost" {...props}>
                {t('button.change')}
              </Button>
            )}
          </InputThemedText>
        ) : !readOnly ? (
          <Button
            center
            className="grow"
            pressed={open}
            size="lg"
            variant="primary"
            {...props}
          >
            {t('button.selectShitstrap')}
          </Button>
        ) : null}
      </div>
    ),
    [displayClassName, readOnly, selectedAddress, t]
  )

  return (
    <FilterableItemPopup
      filterableItemKeys={FILTERABLE_KEYS}
      items={shitstraps.map((shitstrap) => {



        return {
          shitstrap,
          key: shitstrap.shitstrapContractAddr,
          label: shitstrap.title,
          description: (
            <div className="flex flex-col gap-1">
              {/* <p>
                <span className="font-semibold">{t('title.commission')}:</span>{' '}
                {formatPercentOf100(commission * 100)}
              </p>

              <TokenAmountDisplay
                amount={tokens}
                className="inline-block"
                decimals={token.decimals}
                prefix={t('title.totalStaked') + ': '}
                prefixClassName="font-semibold"
                symbol={token.symbol}
              /> */}

              {/* {details && <p>{details}</p>} */}

              {/* {existingStake && (
                <>
                  <div className="mt-1 flex flex-row items-center gap-3">
                    <p className="font-semibold text-text-interactive-valid">
                      {t('title.staked')}:
                    </p>

                    <TokenAmountDisplay
                      amount={existingStake.amount}
                      decimals={existingStake.token.decimals}
                      iconUrl={existingStake.token.imageUrl}
                      symbol={existingStake.token.symbol}
                    />
                  </div>

                  <div className="flex flex-row items-center gap-3">
                    <p className="font-semibold text-text-interactive-valid">
                      {t('info.pendingRewards')}:
                    </p>

                    </div>
                    </>
                    )} */}

              <TokenAmountDisplay
                amount={HugeDecimal.from(shitstrap.cutoff)}
                decimals={shitstrap.shit.decimals}
                iconUrl={shitstrap.shit.imageUrl}
                symbol={shitstrap.shit.symbol}
              />

            </div>
          ),
          searchableDescription: shitstrap.shit.symbol + shitstrap.possibleShit,
          rightNode: undefined,
          // website ? (
          //   <Tooltip title={website}>
          //     <IconButtonLink
          //       Icon={ArrowOutwardRounded}
          //       href={website}
          //       onClick={(event) => {
          //         // Don't click on item button.
          //         event.stopPropagation()
          //       }}
          //       variant="ghost"
          //     />
          //   </Tooltip>
          // ) : undefined,
          selected: shitstrap.shitstrapContractAddr === selectedAddress,
        }
      })}
      onSelect={(shit) => onSelect(shit.key)} // {onSelect(shitstrap)}
      searchPlaceholder={t('info.searchShitstrapPlaceholder')}
      trigger={{
        type: 'custom',
        Renderer: TriggerRenderer,
      }}
    />
  )
}

const FILTERABLE_KEYS = ['label', 'searchableDescription']
