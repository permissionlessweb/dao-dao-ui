import { useQueryClient } from '@tanstack/react-query'

import { cwShitstrapExtraQueries } from '@dao-dao/state/query'
import { EntityDisplay, useQueryLoadingDataWithError } from '@dao-dao/stateful'
import { StatefulShitStrapPaymentLineProps } from '@dao-dao/types'

import { ShitstrapPaymentLine as StatelessShitstrapPaymentLine } from '../../widgets/widgets/Shitstrap/components/stateless'

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
        EntityDisplay={EntityDisplay}
        shitstrapInfo={fallbackInfo}
      />
    </>
  )
}
