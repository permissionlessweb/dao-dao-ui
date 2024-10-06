import { StatefulShitStrapPaymentLineProps } from "@dao-dao/types";

import { EntityDisplay, useQueryLoadingDataWithError } from '@dao-dao/stateful'
import { ShitstrapPaymentLine as StatelessShitstrapPaymentLine } from '../../widgets/widgets/Shitstrap/components/stateless'
import { cwShitstrapExtraQueries, cwVestingExtraQueries } from "@dao-dao/state/query";
import { useQueryClient } from "@tanstack/react-query";



export const ShitstrapPaymentLine = ({
    shitstrapInfo: fallbackInfo,
    ...props
}: StatefulShitStrapPaymentLineProps) => {
    const queryClient = useQueryClient()
    // Use info passed into props as fallback, since it came from the list query;
    // the individual query updates more frequently.
    const freshInfo = useQueryLoadingDataWithError(
        cwShitstrapExtraQueries.info(queryClient, {
            chainId: fallbackInfo.chainId,
            address: fallbackInfo.shitstrapContractAddr,
        })
    )
    const shitstrapInfo =
        freshInfo.loading || freshInfo.errored ? fallbackInfo : freshInfo.data

    return (
        <>
            <StatelessShitstrapPaymentLine
                {...props}
                shitstrapInfo={fallbackInfo}
                EntityDisplay={EntityDisplay}
            />
        </>
    )
}