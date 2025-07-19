import { ImageOutlined, ImageRounded } from '@mui/icons-material'

import {
  Module,
  ModuleId,
  ModuleDisplayLocation,
  ModuleVisibilityContext,
} from '@dao-dao/types'

import { InfusionsEditor as Editor } from './InfusionsEditor'
import { InfusionsRenderer as Renderer } from './InfusionsRenderer'
import { InfusionWidgetData } from './types'

export const InfusionsModule: Module<InfusionWidgetData> = {
  id: ModuleId.Infusions,
  Icon: ImageOutlined,
  title: 'Infuse NFTs',
  description: 'Blending NFTS in creative ways!',
  IconFilled: ImageRounded,
  location: ModuleDisplayLocation.Home,
  visibilityContext: ModuleVisibilityContext.Always,
  defaultValues: {
    chainId: 'stargaze-1',
    infusionId: '1',
    infusionMinter: 'stars1zkdqlly53sdafh6dhcpuapxxc3llxyqw4v9ekk9x553mc4mv0xlqkyvg3l',
    fieldNamePrefix: 'infusion.',
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
