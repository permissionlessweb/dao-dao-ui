import { QueryClient, useQueries, useQueryClient } from '@tanstack/react-query'

import { cw4GroupQueries, cwAveQueries } from '@dao-dao/state/query'
import { AvEventInstanceLine as StatelessEventInstanceLine } from '../stateless/AvEventLine'
import { StatefulEntityDisplayProps, AvEventInstance } from '@dao-dao/types'

import { ComponentType } from 'react'
import { EntityDisplay } from '../../../../../components'
import { useQueryLoadingDataWithError, useWallet } from '../../../../../hooks'
import { MemberResponse } from '@dao-dao/types/contracts/Cw4Group'


export type AvEventLineProps = {
    eventInfo: AvEventInstance
    onClick: () => void
    transparentBackground?: boolean
    EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export type StatefulAvEventLineProps = Omit<
    AvEventLineProps,
    'EntityDisplay'
>

export const AvEventLine = ({
    eventInfo: fallbackInfo,
    ...props
}: StatefulAvEventLineProps) => {
    const queryClient = useQueryClient()
    const {
        address: walletAddress = '',
        isWalletConnected,
        refreshBalances,
    } = useWallet({
        attemptConnection: true,
    })

    // Use info passed into props as fallback, since it came from the list query;
    // the individual query updates more frequently.
    const freshInfo = useQueryLoadingDataWithError(
        cwAveQueries.eventInstance(queryClient, {
            chainId: fallbackInfo.eventChainId,
            contractAddress: fallbackInfo.eventContract,
            connectedAddr: walletAddress,
        })
    )


    const eventInfo =
        freshInfo.loading || freshInfo.errored ? fallbackInfo : freshInfo.data



    return (
        <StatelessEventInstanceLine
            {...props}
            EntityDisplay={EntityDisplay}
            eventInfo={eventInfo}
        />
    )
}
