import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  Button,
  ChainProvider,
  Dropdown,
  TokenAmountDisplay,
  Tooltip,
  useCachedLoading,
} from '@dao-dao/stateless'
import { GenericToken, ShitStrapPaymentLineProps, StatefulEntityDisplayProps, TypedOption, Uint128 } from '@dao-dao/types'

import { getChainForChainId } from '@dao-dao/utils'

import { ComponentType, useEffect, useState } from 'react'
import { PossibleShitWithGenericToken } from '@dao-dao/types/ShitStrap'
import { QueryClient } from '@tanstack/react-query'


export type DnasLineProps = {
  chainId: string
  daoAddr: string
  onClick: () => void
  onUpdate: () => void
  onRemove: () => void
  transparentBackground?: boolean
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export const DnasLine = ({
  chainId,
  daoAddr,
  onClick,
  onRemove,
  onUpdate,
  transparentBackground,
  EntityDisplay,
}: DnasLineProps) => {
  const { t } = useTranslation()
  const { bech32Prefix } = getChainForChainId(chainId)

  // Add this to check if functions are defined
  console.log('DnasLine Props:', { onClick: !!onClick, onUpdate: !!onUpdate, onRemove: !!onRemove });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('DnasLine clicked');
    if (onClick) onClick();
  };


  return (
    <ChainProvider chainId={chainId}>
      <div
        className={clsx(
          'box-content grid h-8 cursor-pointer grid-cols-4 items-center gap-1 rounded-lg py-2 px-3 transition md:gap-2 md:py-9 md:px-8',
          !transparentBackground && 'bg-background-tertiary'
        )}
        onClick={handleClick}
      >
        {/* link to dao key is registered to / prompt to make use of key*/}
        <EntityDisplay address={daoAddr} noUnderline />
        {/* button to remove/update api key registered  */}
        <Button
          className="self-start"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Update button clicked');
            onUpdate();
          }}
          variant="secondary"
        >
          {t('button.updateApiKey')}
        </Button>
        <Button
          className="self-start"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Remove button clicked');
            onRemove();
          }}
          variant="secondary"
        >
          {t('button.removeApiKey')}
        </Button>
      </div>
    </ChainProvider>
  )
}


