import { ComponentType } from 'react'
import { PossibleShit, ShitstrapInfo } from '../contracts/ShitStrap'
import { StatefulEntityDisplayProps } from './EntityDisplay'
import { DOmit, LoadingData } from '../misc'
import { TokenInputOption, TokenInputProps } from './TokenInput'
import { GenericToken } from '../token'

export type StatefulShitStrapPaymentCardProps = {
  shitstrapInfo: ShitstrapInfo
  usingPersonalShit: boolean
  shitting?: boolean
}

export type ShitStrapPaymentLineProps = {
  shitstrapInfo: ShitstrapInfo
  onClick: () => void
  transparentBackground?: boolean
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export type StatefulShitStrapPaymentLineProps = Omit<
  ShitStrapPaymentLineProps,
  'EntityDisplay'
>


export enum ShitstrapPaymentMode {
  Create = 'create',
  Flush = 'flush',
  OverFlow = 'overflow',
  Payment = 'payment',
}


export interface ShitstrapModalProps {
  // The mode to open the staking modal in.
  initialMode: ShitstrapPaymentMode
  // The number of tokens in question.
  amount: number
  // Token that is being sent to shitstrap.
  shit: GenericToken
  // Called when the staking modal is closed.
  onClose?: () => void

  // Proposal deposit for the token that is being staked.
  proposalDeposit?: number
  // Is there an error?
  error?: string | undefined
  // Are we ready to stake? Ex: is wallet connected?
  loading: boolean
  // Triggered when the claiming.
  onShitstrapPayment?: () => void
  // Optional prefix added to the action button text.
  actionPrefix?: string
  // If present, will control the visibility of the staking modal. If absent,
  // the modal will be visible always.
  visible?: boolean
  // Enable restaking. Validator picker must be present as well.
  enableRestaking?: boolean
  // If present, a token picker will be shown in the header.
  tokenPicker?: DOmit<TokenInputProps<TokenInputOption>, 'amount'>
  // The number of tokens that are stakable.
  loadingEligibleAssets?: LoadingData<PossibleShit>
}
