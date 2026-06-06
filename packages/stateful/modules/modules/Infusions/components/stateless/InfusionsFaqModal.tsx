/* eslint-disable @next/next/no-img-element */
import { Image, WarningRounded } from '@mui/icons-material'
import clsx from 'clsx'
import Fuse from 'fuse.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { useDeepCompareMemoize } from 'use-deep-compare-effect'

import { nftCardInfosForKeyAtom } from '@dao-dao/state/recoil'
import {

  MarkdownRenderer,
  Modal,

} from '@dao-dao/stateless'
import { useButtonPopupFilter, useSearchFilter } from '@dao-dao/stateless/hooks'
import {
  FilterFn,

  ModalProps,

  TypedOption,
} from '@dao-dao/types'
import {
  convertDurationToHumanReadableString,
  getChainForChainId,
  getDisplayNameForChainId,
} from '@dao-dao/utils'

export type InfusionFAQModalProps = Omit<ModalProps, 'children' | 'header'> &
  Required<Pick<ModalProps, 'header'>> & {
    action: {
      loading?: boolean
      label: string
      onClick: () => void
    }
    secondaryAction?: {
      loading?: boolean
      label: string
      onClick: () => void
    }
  }

export const InfusionsFAQModal = (modalProps: InfusionFAQModalProps) => {
  const { t } = useTranslation()


  const { containerClassName } = modalProps
  return (
    <Modal
      {...modalProps}
      containerClassName={containerClassName}
      contentContainerClassName={
        'no-scrollbar'
      }
    // footerContent={footerContent}
    >
      <MarkdownRenderer markdown={t('faq.infusionsDescription')} />
    </Modal >
  )
}

