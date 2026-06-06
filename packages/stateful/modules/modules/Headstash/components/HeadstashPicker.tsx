import clsx from 'clsx'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Button,
  FilterableItemPopup,
  InputThemedText,
} from '@dao-dao/stateless'
import { PopupTriggerCustomComponent } from '@dao-dao/types'

import { HeadstashConfigWithContractAddr } from '../../../../actions/core/actions/ManageHeadstash/types'

export type HeadstashPickerProps = {
  headstashes: HeadstashConfigWithContractAddr[]
  selectedAddress?: string
  readOnly?: boolean
  onSelect: (shitstrap: string) => void
  // Token being staked.
  // token: GenericToken``
  displayClassName?: string
}

export const HeadstashPicker = ({
  headstashes,
  selectedAddress,
  readOnly = false,
  onSelect,
  displayClassName,
}: HeadstashPickerProps) => {
  const { t } = useTranslation()

  const selectedHeadstash = headstashes.find((s) => {
    s.contractAddr == selectedAddress
  })

  useEffect(() => {
    console.log(headstashes)
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
          <>
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
          </>
        ) : null}
      </div>
    ),
    [displayClassName, readOnly, selectedAddress, t]
  )

  return (
    <FilterableItemPopup
      filterableItemKeys={FILTERABLE_KEYS}
      items={headstashes.map((c) => {
        return {
          c,
          key: c.contractAddr,
          label: c.owner,
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

              {/* <TokenAmountDisplay
                amount={HugeDecimal.from(shitstrap.cutoff)}
                decimals={shitstrap.shit.decimals}
                iconUrl={shitstrap.shit.imageUrl}
                symbol={shitstrap.shit.symbol}
              /> */}
            </div>
          ),
          // searchableDescription: shitstrap.shit.symbol + shitstrap.possibleShit,
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
          selected: c.contractAddr === selectedAddress,
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
