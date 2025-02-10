import { ImageOutlined, ImageRounded } from '@mui/icons-material'

import {
    Widget,
    WidgetId,
    WidgetLocation,
    WidgetVisibilityContext,
} from '@dao-dao/types'

import { InfusionsEditor as Editor } from './InfusionsEditor'
import { InfusionsRenderer as Renderer } from './InfusionsRenderer'
import { InfusionWidgetData } from './types'

export const InfusionsWidget: Widget<InfusionWidgetData> = {
    id: WidgetId.Infusions,
    Icon: ImageOutlined,
    IconFilled: ImageRounded,
    location: WidgetLocation.Tab,
    visibilityContext: WidgetVisibilityContext.Always,
    defaultValues: {
        infusionId: '',
        infusionMinter: '',
        fieldNamePrefix: 'infusion.'
        // selectedInfusionIndex: '0',
        // description: '',
        // mint: {
        //   contract: '',
        //   msg: '{"mint":{}}',
        //   buttonLabel: 'Mint NFT',
        // },
    },
    Renderer,
    Editor,
}
