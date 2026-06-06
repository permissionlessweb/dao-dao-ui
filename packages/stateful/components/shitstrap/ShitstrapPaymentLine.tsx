import { useQueryClient } from '@tanstack/react-query'

import { cwShitstrapExtraQueries } from '@dao-dao/state/query'

import { StatefulShitStrapPaymentLineProps } from '@dao-dao/types/shit'

import { ShitstrapPaymentLine as StatelessShitstrapPaymentLine } from '../../modules/modules/Shitstrap/components/stateless'
import { useQueryLoadingDataWithError } from '../../hooks'
import { EntityDisplay } from '../EntityDisplay'

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
      contractAddress: fallbackInfo.shitstrapContractAddr,
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
