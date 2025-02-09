import { Widget } from '@dao-dao/types'

import {
  InfusionsWidget,
  PressWidget,
  RetroactiveCompensationWidget,
  ShitstrapWidget,
  VestingPaymentsWidget,
} from './widgets'

// Add widgets here.
export const getWidgets = (chainId: string): readonly Widget[] =>
  [
    // MintNftWidget,
    VestingPaymentsWidget,
    RetroactiveCompensationWidget,
    PressWidget,
    ShitstrapWidget,
    InfusionsWidget,
  ].filter(
    (widget) => !widget.isChainSupported || widget.isChainSupported(chainId)
  )

export const getWidgetById = (chainId: string, id: string) =>
  getWidgets(chainId).find((widget) => widget.id === id)
