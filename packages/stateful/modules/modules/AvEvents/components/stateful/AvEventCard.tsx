import { AvEventInstance, AvEventPurchaseTicketsActionData, Coin, TicketInfoCardProps } from "@dao-dao/types"
import { QueryClient, useQueryClient } from "@tanstack/react-query"
import { ComponentType } from "react"
import { useQueryLoadingDataWithError, useWallet } from "../../../../../hooks"
import { cwAveQueries } from "@dao-dao/state/query"
import { useTranslation } from "react-i18next"
import { useChain, useDaoNavHelpers } from "@dao-dao/stateless"
import { AvEventCard as StatelessAvEventCard } from "../stateless/AvEventCard"
import { FormProvider, useForm, useFormContext } from "react-hook-form"



export type StatefulEventCardProps = {
    eventInfo: AvEventInstance
}



export const AvEventCard = ({
    eventInfo: fallbackInfo,
}: StatefulEventCardProps) => {
    const { chainId } = useChain()

    const {
        address: walletAddress = '',
        isWalletConnected,
        refreshBalances,
    } = useWallet()



    const queryClient = useQueryClient()

    const freshInfo = useQueryLoadingDataWithError(
        cwAveQueries.eventInstance(queryClient, {
            chainId,
            contractAddress: fallbackInfo.eventContract,
            connectedAddr: walletAddress
        })
    )
    const eventInfo =
        freshInfo.loading || freshInfo.errored ? fallbackInfo : freshInfo.data

    // todo: guest card prop
    const guestCardProps: TicketInfoCardProps[] = eventInfo.eventGuestDetails.map((egd, gcIndex) => ({

        info: egd,    // Include the event info
        index: gcIndex,
        follow: { hide: true }  // Include follow settings
    }));


    const methods = useForm<AvEventPurchaseTicketsActionData>({
        defaultValues: {
            tickets_to_purchase: eventInfo.eventGuestDetails.map(ticketType => ({
                weight: ticketType.guest_weight,
                tickets: ticketType.ticket_cost.map(tc => ({
                    payment: tc,
                    addr: [],
                    quantity: 0,
                }))

            }))
        }
    });

    return (
        <FormProvider {...methods}>
            <StatelessAvEventCard guestCards={guestCardProps} eventInfo={eventInfo} />
        </FormProvider>
    )
}