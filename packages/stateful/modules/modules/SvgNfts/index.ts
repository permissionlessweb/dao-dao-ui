import { ImageOutlined, ImageRounded } from '@mui/icons-material'

import {
  Module,
  ModuleDisplayLocation,
  ModuleId,
  ModuleVisibilityContext,
} from '@dao-dao/types'

import { MintNftEditor as Editor } from './MintSvgEditor'
import { MintNftRenderer as Renderer } from './MintSvgRenderer'
import { MintNftData } from './types'

export const SvgNftModule: Module<MintNftData> = {
  id: ModuleId.MintNft,
  title: 'Mint, Create, Trade SVG NFTs',
  description: '',
  Icon: ImageOutlined,
  IconFilled: ImageRounded,
  location: ModuleDisplayLocation.Home,
  visibilityContext: ModuleVisibilityContext.Always,
  defaultValues: {
    nftCollection: '',
    description: '',
    create: {
      contract: '',
      msg: '{"create":{}}',
      buttonLabel: 'Create SVG Collection',
    },
    mint: {
      contract: '',
      msg: '{"mint":{}}',
      buttonLabel: 'Mint NFT',
    },
    market: {
      contract: '',
      buyer_action: '{}',
      vendor_action: '{}',
    }
  },
  Renderer,
  Editor,
}
