import { PaidOutlined, PaidRounded } from '@mui/icons-material'

import {
  Module,
  ModuleId,
  ModuleDisplayLocation,
  ModuleVisibilityContext,
} from '@dao-dao/types'

import { Renderer } from './Renderer'
import { ShitStrapEditor as Editor } from './ShitstrapEditor'
import { ShitstrapPaymentModuleData } from './types'

export const ShitstrapModule: Module<ShitstrapPaymentModuleData> = {
  id: ModuleId.ShitStrap,
  Icon: PaidOutlined,
  IconFilled: PaidRounded,
  location: ModuleDisplayLocation.Home,
  visibilityContext: ModuleVisibilityContext.Always,
  defaultValues: {
    factories: {},
  },
  Renderer,
  Editor,
  title: 'Shitstraps',
  description: 'Shit, randy.'
}
