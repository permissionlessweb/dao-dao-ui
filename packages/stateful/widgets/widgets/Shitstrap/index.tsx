import { PaidOutlined, PaidRounded } from '@mui/icons-material'

import {
  Widget,
  WidgetId,
  WidgetLocation,
  WidgetVisibilityContext,
} from '@dao-dao/types'

import { Renderer } from './Renderer'
import { ShitStrapEditor as Editor } from './ShitstrapEditor'
import { ShitstrapPaymentWidgetData } from './types'


export const ShitstrapWidget: Widget<ShitstrapPaymentWidgetData> = {
  id: WidgetId.ShitStrap,
  Icon: PaidOutlined,
  IconFilled: PaidRounded,
  location: WidgetLocation.Tab,
  visibilityContext: WidgetVisibilityContext.Always,
  defaultValues: {
    factories: {},
  },
  Renderer,
  Editor,
}
