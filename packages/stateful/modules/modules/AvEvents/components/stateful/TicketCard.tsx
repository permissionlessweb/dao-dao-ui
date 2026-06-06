import { useRecoilValue } from 'recoil'
import { useQuery, useQueryClient } from '@tanstack/react-query'


import { StatefulTicketCardProps } from '@dao-dao/types/components/TicketCard'
import { cwAveQueries } from '@dao-dao/state/query/queries/contracts/CwAve'
import { LoadingDataWithError } from '@dao-dao/types'


import { TicketCard as StatelessTicketCard } from '../stateless/TicketCard'
import { LinkWrapper } from '@dao-dao/stateless'


export const TicketCard = (props: StatefulTicketCardProps) => {
  // const {
  //   address: userAddress = '',
  //   getSigningStargateClient,
  //   refreshBalances,
  // } = useWallet()

  const userAddress = props.userAddress = ''

  const queryClient = useQueryClient()

  // Query event config
  const configQuery = useQuery(
    cwAveQueries.eventInstance(queryClient, {
      chainId: props.chainId,
      contractAddress: props.eventContract,
      connectedAddr: userAddress,
    })
  )

  // Query user's attendance status if they have an address
  const attendanceQuery = useQuery(
    cwAveQueries.guestAttendanceStatusAll(queryClient, {
      chainId: props.chainId,
      contractAddress: props.eventContract,
      connectedAddr: userAddress,
      args: {
        guest: userAddress
      },
    }),

  )

  // Transform queries into the expected LoadingDataWithError format
  const lazyData: LoadingDataWithError<any> = {
    loading: configQuery.isLoading,
    errored: false,
    data: {
      availableTickets: props.ticketInfo.max_ticket_limit,
      isCheckedIn: userAddress ? attendanceQuery.data?.some(status => status === true) || false : false,
      userHasTicket: userAddress ? attendanceQuery.data?.some(status => status === true) || false : false,
      eventTitle: configQuery.data?.config.title || '',
    },
  }

  return (
    <StatelessTicketCard
      {...props}
      LinkWrapper={LinkWrapper}
      lazyData={lazyData}
      userAddress={userAddress}
      onPurchaseTicket={props.onPurchaseTicket}
      onCheckIn={props.onCheckIn}
    />
  )
}