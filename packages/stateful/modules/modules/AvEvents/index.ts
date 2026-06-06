import { PaidOutlined, PaidRounded } from '@mui/icons-material'

import {
  Module,
  ModuleDisplayLocation,
  ModuleId,
  ModuleVisibilityContext,
  AvEventModuleData, LATEST_CW_AVE_CONTRACT_VERSION
} from '@dao-dao/types'

import { Renderer } from './Renderer'
import { AvEventModuleEditor as Editor } from './AvEventModuleEditor'

export const AvEventsModule: Module<AvEventModuleData> = {
  id: ModuleId.AvEvents,
  title: 'Event Management & Tickets',
  description:
    'Create events, sell tickets, check-in guests.',
  Icon: PaidOutlined,
  IconFilled: PaidRounded,
  location: ModuleDisplayLocation.Tab,
  visibilityContext: ModuleVisibilityContext.Always,
  supportsDaoCreation: true,
  defaultValues: {
    deployers: {},
    version: LATEST_CW_AVE_CONTRACT_VERSION,
  },
  Renderer,
  Editor,
}
