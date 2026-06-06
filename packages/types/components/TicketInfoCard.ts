import { ComponentType } from 'react'

import { LoadingDataWithError } from '../misc'
import { LinkWrapperProps } from './LinkWrapper'
import { GuestDetails, GuestDetailsWithTokenInfo } from '../contracts/CwAve'
import { UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { GenericTokenBalance } from '../token'

export type AvEventPurchaseTicketsActionData = {
  tickets_to_purchase: TicketPurchaseInfo[]
}

export interface TicketPurchaseInfo {
  weight: number;
  tickets: Ticket[];
}

export interface Ticket {
  payment: GenericTokenBalance;
  /// will not be empty if ticket is being purchased for address that is not currently connected
  addr: string[];
  quantity: number;
}


// Loaded by card once displaying.
export type GuestCardLazyData = {
  proposalCount: number
  /**
   * Show a token line, typically TVL.
   */
  tokenWithBalance?: {
    balance: number
    symbol: string
    decimals: number
  }
}

export type FollowEventState = {
  following: boolean
  updatingFollowing: boolean
  onFollow: () => void
}

export type TicketInfoCardProps = {
  info: GuestDetailsWithTokenInfo
  index: number,
  // register: UseFormRegister<AvEventPurchaseTicketsActionData>,
  // watch: UseFormWatch<AvEventPurchaseTicketsActionData>,
  // setValue: UseFormSetValue<AvEventPurchaseTicketsActionData>,
  // getValues: UseFormGetValues<AvEventPurchaseTicketsActionData>,
  // lazyData: LoadingDataWithError<GuestCardLazyData>
  follow: { hide: true } | ({ hide?: false } & FollowEventState)
  // LinkWrapper: ComponentType<LinkWrapperProps>
  isAttending?: boolean
  /**
   * Whether or not to show the member checkmark if they're a member. Defaults
   * to true.
   */
  showIsMember?: boolean
  /**
   * Whether or not the token loaded in lazy data is USD. Defaults to true.
   */
  showingEstimatedUsdValue?: boolean
  /**
   * Whether or not to show the parent DAO if it exists. This is used primarily
   * to hide the parent DAO until the app is mounted in the browser since
   * rendering it on the server causes a hydration error for some horrible
   * reason. I think it has something to do with the fact that you're not
   * supposed to nest an a tag inside of another a tag, and maybe the Next.js
   * server is sanitizing it or something. Anyways, rip. Defaults to true.
   */
  showParentDao?: boolean
  onMouseOver?: () => void
  onMouseLeave?: () => void
  // /** 
  // * Displays the modal to set an address to associate with each ticket used. 
  // * */
  // onSettingHomiesTicket?: () => void
  // settingHomiesTickets: boolean
  /**
   * Optional card class name.
   */
  className?: string
}

export type StatefulGuestCardProps = Omit<
  TicketInfoCardProps,
  'lazyData' | 'follow' | 'LinkWrapper'
>

export type LazyGuestCardProps = Omit<StatefulGuestCardProps, 'info'> & {
  /**
   * A smaller set of DAO info that doesn't need many queries.
   */
  info: Pick<
    GuestDetails,
    | 'total_ticket_limit'
  >
  /**
   * Whether or not this DAO is inactive.
   */
  isInactive?: boolean
  /**
   * Whether or not the current wallet is a member of this DAO.
   */
  isMember?: boolean
  /**
   * Whether or not this DAO is being followed by the current wallet.
   */
  isFollowed?: boolean
}
