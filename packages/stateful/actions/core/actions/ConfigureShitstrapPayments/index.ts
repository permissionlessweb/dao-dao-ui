import cloneDeep from 'lodash.clonedeep'

import { ActionBase, SuitAndTieEmoji } from '@dao-dao/stateless'
import {
  UnifiedCosmosMsg,
  VestingPaymentsWidgetData,
  WidgetId,
} from '@dao-dao/types'
import {
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import { getWidgetStorageItemKey } from '@dao-dao/utils'

import { ManageWidgetsAction } from '../ManageWidgets'
import { ConfigureShitstrapPaymentsComponent } from './Component'
import { ShitstrapPaymentWidgetData } from '../../../../widgets/widgets/Shitstrap/types'

export class ConfigureShitstrapPaymentsAction extends ActionBase<ShitstrapPaymentWidgetData> {
  public readonly key = ActionKey.ConfigureShitstrapPayments
  public readonly Component = ConfigureShitstrapPaymentsComponent

  private manageWidgetsAction: ManageWidgetsAction

  constructor(options: ActionOptions) {
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error('Not DAO context')
    }

    const enabled =
      !!options.context.dao.info.items[
      getWidgetStorageItemKey(WidgetId.ShitStrap)
      ]

    super(options, {
      Icon: SuitAndTieEmoji,
      label: enabled
        ? options.t('title.configureShitstrapPayments')
        : options.t('title.enableShitstrapPayments'),
      description: enabled
        ? options.t('info.configureShitstrapPaymentsDescription')
        : options.t('widgetDescription.shitstrap'),
      keywords: ['payroll', 'shitstrap'],
      notReusable: true,
    })

    this.manageWidgetsAction = new ManageWidgetsAction(options)
  }

  async setup() {
    await this.manageWidgetsAction.setup()

    // Attempt to load existing widget data.
    const widget = this.manageWidgetsAction.availableWidgets.find(
      ({ id }) => id === WidgetId.ShitStrap
    )

    this._defaults = widget
      ? cloneDeep(widget.values)
      : {
        factories: {},
      }
  }

  encode(data: ShitstrapPaymentWidgetData): UnifiedCosmosMsg {
    return this.manageWidgetsAction.encode({
      mode: 'set',
      id: WidgetId.ShitStrap,
      values: data,
    })
  }

  match(messages: ProcessedMessage[]): ActionMatch {
    const manageWidgetsMatch = this.manageWidgetsAction.match(messages)
    if (!manageWidgetsMatch) {
      return manageWidgetsMatch
    }

    // Ensure this is setting the vesting payments widget item.
    const { mode, id } = this.manageWidgetsAction.decode(messages)
    return mode === 'set' && id === WidgetId.ShitStrap
  }

  decode(messages: ProcessedMessage[]): ShitstrapPaymentWidgetData {
    return this.manageWidgetsAction.decode(messages).values
  }
}
