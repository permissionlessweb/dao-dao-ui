/* eslint-disable @next/next/no-img-element */
import { useTranslation } from 'react-i18next'
import {
  MarkdownRenderer,
  Modal,

} from '@dao-dao/stateless'

import {
  ModalProps,

} from '@dao-dao/types'

export type HeadstashFaqModallProps = Omit<ModalProps, 'children' | 'header'> &
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

export const HeadstashFaqModal = (modalProps: HeadstashFaqModallProps) => {
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
      <MarkdownRenderer markdown={t('faq.headstash')} />
    </Modal >
  )
}

