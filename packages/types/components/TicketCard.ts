import { ComponentType } from 'react'
import { GuestDetails } from '../contracts/CwAve'
import { LoadingDataWithError } from '../misc'
import { LinkWrapperProps } from './LinkWrapper'

export type TicketCardLazyData = {
  availableTickets: number
  isCheckedIn: boolean
  userHasTicket: boolean
  eventTitle: string
  eventDescription: string
}

export type TicketCardProps = {
  ticketInfo: GuestDetails
  eventContract: string
  chainId: string
  lazyData: LoadingDataWithError<TicketCardLazyData>
  LinkWrapper: ComponentType<LinkWrapperProps>
  userAddress?: string
  onPurchaseTicket?: () => void
  onCheckIn?: () => void
  className?: string
}

export type StatefulTicketCardProps = Omit<
  TicketCardProps,
  'lazyData' | 'LinkWrapper'
>