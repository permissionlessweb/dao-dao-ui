import { HugeDecimal } from '@dao-dao/math'

import { Duration } from '../contracts/common'
import { DOmit, LoadingData } from '../misc'
import { GenericToken } from '../token'
import { AvEventPurchaseTicketsActionData } from './TicketInfoCard'


export enum EventCheckinMode {
  Guest = 'guest',
  Usher = 'usher',
}
export enum ScanDisplayQrCodeMode {
  Scan = 'scan',
  Display = 'display',
}

export interface EventCheckinModalProps {
  // The mode to open the staking modal in.
  initialMode: EventCheckinMode
  // // The number of tokens in question.
  // amount: HugeDecimal
  // Sets the number of tokens in question.
  setAmount: (newAmount: HugeDecimal) => void
  // Called when the staking modal is closed.
  onClose: () => void
  // The number of tokens that are currently claimable.
  claimableTokens: HugeDecimal
  // The number of tokens that are unstakable. If undefined, will not be shown.
  // If `validatorPicker` is present, unstakable tokens will depend on the
  // chosen validator.
  loadingUnstakableTokens?: LoadingData<HugeDecimal>
  // The number of tokens that are stakable.
  loadingStakableTokens: LoadingData<HugeDecimal>
  // The duration for unstaking.
  // unstakingDuration: Duration | null
  // // Token that is being staked.
  // token: GenericToken
  // // Proposal deposit for the token that is being staked.
  // proposalDeposit?: HugeDecimal
  // Is there an error?
  error?: string | undefined
  // Are we ready to stake? Ex: is wallet connected?
  loading: boolean
  // Triggered when the stake / unstake / claim button is pressed.
  onAction: (
    mode: EventCheckinMode,
  ) => void
  // Optional prefix added to the action button text.
  actionPrefix?: string
  // If present, will control the visibility of the staking modal. If absent,
  // the modal will be visible always.
  visible?: boolean
  // If present, a ticket picker will be shown in the header and the selected
  // ticket will be used in the `onAction` callback.
  ticketPicker?: Omit<
    TicketPickerProps,
    'selectedAddress' | 'onSelect' | 'readOnly' | 'token'
  >
}

export type TicketPickerProps = {
  tickets: AvEventPurchaseTicketsActionData[]
  selectedAddress?: string
  readOnly?: boolean
  onSelect: () => void
  displayClassName?: string
}
