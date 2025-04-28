import { ArrowOutwardRounded } from '@mui/icons-material'
import clsx from 'clsx'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  PopupTriggerCustomComponent,

} from '@dao-dao/types'
import { formatPercentOf100 } from '@dao-dao/utils'

import { Button } from '@dao-dao/stateless/components/buttons'
import { CopyToClipboard } from '@dao-dao/stateless/components/CopyToClipboard'
import { InputThemedText } from '@dao-dao/stateless/components/inputs'
import { FilterableItemPopup } from '@dao-dao/stateless/components/popup'
import { DnasPickerProps } from '@dao-dao/stateful/actions/core/actions/ManageDnas/types'

export const DnasKeyPicker = ({
  dnasKeyOwners,
  chainId,
  selectedAddress,
  readOnly = false,
  onSelect,
  displayClassName,
}: DnasPickerProps) => {
  const { t } = useTranslation()


  const TriggerRenderer: PopupTriggerCustomComponent = useCallback(
    ({ open, ...props }) => (
      <div className={clsx('flex', displayClassName)}>
        {selectedAddress ? (
          <InputThemedText className="min-w-0 grow">
            <CopyToClipboard
              label={selectedAddress}
              tooltip={t('button.clickToCopyAddress')}
              value={selectedAddress}
            />

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
            {t('button.selectValidator')}
          </Button>
        ) : null}
      </div>
    ),
    [displayClassName, readOnly, selectedAddress, t]
  )

  return (
    <FilterableItemPopup
      filterableItemKeys={FILTERABLE_KEYS}
      items={Object.values(dnasKeyOwners).map((dnas) => {
        return {
          dnas,
          key: dnas.keyOwner,
          label: dnas.keyOwner,
          description: (
            <div className="flex flex-col gap-1">

            </div>
          ),
          // searchableDescription: commission + details,
          // rightNode: website ? (
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
          selected: dnas.keyOwner === selectedAddress,
        }
      })}
      onSelect={({ dnas }) => onSelect({
        ...dnas,
        // type: 'jackalPin',
        // chainId,
        uploadLimit: !dnas.uploadLimit ? '1024' : dnas.uploadLimit

      })}
      searchPlaceholder={t('info.searchDnasKeyOwnerPlaceholder')}
      trigger={{
        type: 'custom',
        Renderer: TriggerRenderer,
      }}
    />
  )
}

const FILTERABLE_KEYS = ['label', 'searchableDescription']
