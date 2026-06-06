import { ImageOutlined, ImageRounded } from '@mui/icons-material'

import {
  Module,
  ModuleId,
  ModuleDisplayLocation,
  ModuleVisibilityContext,
} from '@dao-dao/types'

import { InfusionsEditor as Editor } from './InfusionsEditor'
import { InfusionsRenderer as Renderer } from './InfusionsRenderer'
import { InfusionModuleData } from './types'

export const InfusionsModule: Module<InfusionModuleData> = {
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
    infusionMinter: 'stars16k2ewvfapjdsnncdk2snv9wj3f8vg3j82sfq962906rdx3n67kns22fsvh',
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
