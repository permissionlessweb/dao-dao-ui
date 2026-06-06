import { t } from 'i18next'

import { ModuleEditorProps } from '@dao-dao/types'

import { HeadstashModuleDataa } from './types'

export const HeadstashEditors = ({
    fieldNamePrefix,
    isCreating,
    errors,
}: ModuleEditorProps<HeadstashModuleDataa>) => {
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
