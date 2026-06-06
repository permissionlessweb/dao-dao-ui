import { ImageOutlined, ImageRounded } from '@mui/icons-material'

import {
  Module,
  ModuleId,
  ModuleDisplayLocation,
  ModuleVisibilityContext,
} from '@dao-dao/types'

import { HeadstashRenderer as Renderer } from './HeadstashRenderer'
import { HeadstashEditors as Editor } from './HeadstashEditors'
import { HeadstashModuleData } from './types'

export const HeadstashModule: Module<HeadstashModuleData> = {
  id: ModuleId.Infusions,
  Icon: ImageOutlined,
  title: 'Headstash',
  description: 'Transparency Minimizing Token Distribution Protocol',
  IconFilled: ImageRounded,
  location: ModuleDisplayLocation.Home,
  visibilityContext: ModuleVisibilityContext.Always,
  defaultValues: {
    fieldNamePrefix: 'headstash.',
    headstashAddr: ''
  },
  Renderer,
  Editor,
}
