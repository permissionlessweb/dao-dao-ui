
import clsx from 'clsx'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  PopupTriggerCustomComponent,

} from '@dao-dao/types'

import { Button } from '@dao-dao/stateless/components/buttons'
import { CopyToClipboard } from '@dao-dao/stateless/components/CopyToClipboard'
import { InputThemedText } from '@dao-dao/stateless/components/inputs'
import { FilterableItemPopup } from '@dao-dao/stateless/components/popup'
import { DnasPickerProps } from '@dao-dao/stateful/actions/core/actions/ManageDnas/types'
import { getChainForChainId } from '@dao-dao/utils'
import { fromHex, toBech32 } from '@cosmjs/encoding'
export const DnasKeyPicker = ({
  dnasKeyOwners = {}, // Add default value
  chainId,
  selectedAddress,
  readOnly = false,
  onSelect,
  displayClassName,
  daoAddr,
}: DnasPickerProps) => {
  const { t } = useTranslation()

  console.log('DnasKeyPicker props:', {
    dnasKeyOwners,
    chainId,
    selectedAddress,
    readOnly,
    daoAddr,
  });

  const TriggerRenderer: PopupTriggerCustomComponent = useCallback(
    ({ open, ...props }) => {
      console.log('TriggerRenderer:', { selectedAddress, readOnly, open });
      return (
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
          ) : (
            <InputThemedText className="min-w-0 grow">
              {t('info.noKeySelected')}
            </InputThemedText>
          )}
        </div>
      )
    },
    [displayClassName, readOnly, selectedAddress, t]
  )

  const items = Object.entries(dnasKeyOwners).map(([id, dnas]) => {
    const [splitChainId, ownerAddr] = id.split("_")
    const bech32Prefix = getChainForChainId(splitChainId).bech32Prefix
    const ownerBechAddr = toBech32(bech32Prefix, fromHex(ownerAddr))
    return {
      dnas,
      key: ownerBechAddr,
      label: dnas.keyHash,
      description: (
        <div className="flex flex-col gap-1">
          <p>
            <span className="font-semibold">{t('title.keyOwner')}:</span>
            <span className="font-semibold">{ownerBechAddr}</span>
          </p>
          {dnas.uploadLimit && (
            <p>
              <span className="font-semibold">{t('title.uploadLimit')}:</span>
              <span className="font-semibold">{dnas.uploadLimit}</span>
            </p>

          )}

          {/* <p className="text-xs italic text-text-interactive-error">
            {t('error.keyLimitUseMet')}
          </p> */}
        </div>
      ),
      selected: dnas.keyOwner === selectedAddress,
    }
  });
  console.log('FilterableItemPopup items:', items);

  return (
    <FilterableItemPopup
      filterableItemKeys={FILTERABLE_KEYS}
      items={items}
      onSelect={({ dnas }) => {
        console.log(dnas.keyHash)
        onSelect({
          ...dnas,
          daoAddr,
          keyHash: dnas.keyHash,
          uploadLimit: !dnas.uploadLimit ? '1024' : dnas.uploadLimit
        })
      }}

      searchPlaceholder={t('info.searchDnasKeyOwnerPlaceholder')}
      trigger={{
        type: 'custom',
        Renderer: TriggerRenderer,
      }}
    />
  )
}
const FILTERABLE_KEYS = ['label', 'searchableDescription']
