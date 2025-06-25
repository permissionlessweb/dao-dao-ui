import { t } from 'i18next'

import { WidgetEditorProps } from '@dao-dao/types'

import { InfusionWidgetData } from './types'

export const InfusionsEditor = ({
  fieldNamePrefix,
  isCreating,
  errors,
}: WidgetEditorProps<InfusionWidgetData>) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between gap-8">
        <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-1">
          <p className="title-text text-text-body">{t('title.infusions')}</p>
        </div>
      </div>
    </div>
  )
}
