import { useTranslation } from 'react-i18next'

import { useActionOptions } from '@dao-dao/stateless'
import { ActionComponent } from '@dao-dao/types/actions'

import { ShitstrapPaymentWidgetData } from '../../../../widgets/widgets/Shitstrap/types'
import { ShitStrapEditor } from '../../../../widgets/widgets/Shitstrap/ShitstrapEditor'

export const ConfigureShitstrapPaymentsComponent: ActionComponent<
  undefined,
  ShitstrapPaymentWidgetData
> = (props) => {
  const { t } = useTranslation()
  const options = useActionOptions()

  return (
    <>
      <p className="body-text max-w-prose">
        {t('info.configureShitstrapPaymentsDescription')}
      </p>

      <ShitStrapEditor
        {...props}
        accounts={options.context.accounts}
        options={options}
        type="action"
      />
    </>
  )
}
