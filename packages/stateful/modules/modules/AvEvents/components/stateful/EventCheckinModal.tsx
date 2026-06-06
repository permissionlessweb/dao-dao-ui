import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  chainQueries,
  cwVestingExtraQueries,
  cwVestingQueryKeys,
} from '@dao-dao/state/query'
import {
  nativeUnstakingDurationSecondsSelector,
  validatorsSelector,
} from '@dao-dao/state/recoil'
import {
  // StakingModal,
  useCachedLoadable,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  ActionKey,
  EventCheckinModalProps,
  EventCheckinMode,
  ScanDisplayQrCodeMode,
  StakingModalProps,
  StakingMode,
  TokenStake,
  VestingInfo,
} from '@dao-dao/types'
import {
  getDaoProposalSinglePrefill,
  getNativeTokenForChainId,
  processError,
} from '@dao-dao/utils'
import { useAwaitNextBlock, useWallet } from '../../../../../hooks'
import { EventCheckinModal as StatelessEventCheckinModal } from '../stateless/EventCheckinModal'


// import {
//   useDelegate,
//   useRedelegate,
//   useUndelegate,
// } from '../../hooks/contracts/CwVesting'

export type EventCheckinModalModalProps = Pick<
  EventCheckinModalProps,
  'visible' | 'onClose'
> & {
  eve: VestingInfo
  stakes: TokenStake[] | undefined
  isEventUsher: boolean
}

export const EventCheckinModal = ({
  ticketPicker,
  // stakes,
  ...props
}: EventCheckinModalProps) => {
  const { t } = useTranslation()
  const { goToDaoProposal } = useDaoNavHelpers()
  const queryClient = useQueryClient()

  // const validatorsLoadable = useCachedLoadable(
  //   validatorsSelector({
  //     chainId,
  //   })
  // )

  // const unstakingDurationLoadable = useCachedLoadable(
  //   nativeUnstakingDurationSecondsSelector({
  //     chainId,
  //   })
  // )

  const awaitNextBlock = useAwaitNextBlock()

  const [amount, setAmount] = useState(HugeDecimal.zero)
  const [loading, setLoading] = useState(false)

  // const { address: walletAddress = '' } = useWallet({
  //   chainId,
  // })
  // const delegate = useDelegate({
  //   contractAddress: vestingContractAddress,
  //   sender: walletAddress,
  // })
  // const undelegate = useUndelegate({
  //   contractAddress: vestingContractAddress,
  //   sender: walletAddress,
  // })
  // const redelegate = useRedelegate({
  //   contractAddress: vestingContractAddress,
  //   sender: walletAddress,
  // })

  // if (validatorsLoadable.state !== 'hasValue') {
  //   return null
  // }

  // const nativeToken = getNativeTokenForChainId(chainId)

  const onAction = async (
    mode: EventCheckinMode,
    // validator?: string,
    // fromValidator?: string
  ) => {
    // Should never happen.
    // if (!validator) {
    //   toast.error(t('error.noValidatorSelected'))
    //   return
    // }

    setLoading(true)
    try {
      if (mode === EventCheckinMode.Usher) {
        // const data = {
        //   amount: amount.toFixed(0),
        //   validator,
        // }

        // if (recipientIsDao) {
        //   await goToDaoProposal(recipient, 'create', {
        //     prefill: getDaoProposalSinglePrefill({
        //       actions: [
        //         {
        //           actionKey: ActionKey.Execute,
        //           data: {
        //             chainId,
        //             address: cwAveEventAddr,
        //             message: JSON.stringify({}, null, 2),
        //             funds: [],
        //             cw20: false,
        //           },
        //         },
        //       ],
        //     }),
        //   })
        // } else {
        //   // await delegate(data)
        // }
      } else if (mode === EventCheckinMode.Guest) {
        // const data = {
        //   amount: amount.toFixed(0),
        //   validator,
        // }

        // if (recipientIsDao) {
        //   await goToDaoProposal(recipient, 'create', {
        //     prefill: getDaoProposalSinglePrefill({
        //       actions: [
        //         {
        //           actionKey: ActionKey.Execute,
        //           data: {
        //             chainId,
        //             address: cwAveEventAddr,
        //             message: JSON.stringify(
        //               {

        //               },
        //               null,
        //               2
        //             ),
        //             funds: [],
        //             cw20: false,
        //           },
        //         },
        //       ],
        //     }),
        //   })
        // } else {
        //   // await undelegate(data)
        // }
      }

      // else if (mode === StakingMode.Restake) {
      //   if (!fromValidator) {
      //     toast.error(t('error.noFromValidatorSelected'))
      //     return
      //   }

      //   if (recipientIsDao) {
      //     await goToDaoProposal(recipient, 'create', {
      //       prefill: getDaoProposalSinglePrefill({
      //         actions: [
      //           {
      //             actionKey: ActionKey.Execute,
      //             data: {
      //               chainId,
      //               address: vestingContractAddress,
      //               message: JSON.stringify(
      //                 {
      //                   redelegate: {
      //                     amount: amount.toFixed(0),
      //                     src_validator: fromValidator,
      //                     dst_validator: validator,
      //                   },
      //                 },
      //                 null,
      //                 2
      //               ),
      //               funds: [],
      //               cw20: false,
      //             },
      //           },
      //         ],
      //       }),
      //     })
      //   } else {
      //     // await redelegate({
      //     //   amount: amount.toFixed(0),
      //     //   srcValidator: fromValidator,
      //     //   dstValidator: validator,
      //     // })
      //   }
      // }

      // if (!recipientIsDao) {
      //   // Wait a block for balances to update.
      //   await awaitNextBlock()

      //   // Invalidate validators.
      //   queryClient.invalidateQueries({
      //     queryKey: ['chain', 'validator', { chainId }],
      //   })
      //   // Invalidate staking info.
      //   queryClient.invalidateQueries({
      //     queryKey: chainQueries.nativeDelegationInfo(queryClient, {
      //       chainId,
      //       address: cwAveEventAddr,
      //     }).queryKey,
      //   })
      //   // Invalidate vesting indexer queries.
      //   queryClient.invalidateQueries({
      //     queryKey: [
      //       'indexer',
      //       'query',
      //       {
      //         chainId,
      //         address: cwAveEventAddr,
      //       },
      //     ],
      //   })
      //   // Then invalidate contract queries that depend on indexer queries.
      //   queryClient.invalidateQueries({
      //     queryKey: cwVestingQueryKeys.address(chainId, cwAveEventAddr),
      //   })
      //   // Then info query.
      //   queryClient.invalidateQueries({
      //     queryKey: cwVestingExtraQueries.info(queryClient, {
      //       chainId,
      //       address: cwAveEventAddr,
      //     }).queryKey,
      //   })

      //   // toast.success(
      //   //   mode === ScanDisplayQrCodeMode.Scan
      //   //     ? t('success.display')
      //   //     : mode === StakingMode.Restake
      //   //       ? t('success.restaked')
      //   //       : mode === StakingMode.Unstake
      //   //         ? t('success.unstaked')
      //   //         : // Should never happen.
      //   //         t('error.loadingData')
      //   // )
      // }

      props.onClose()
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <StatelessEventCheckinModal

      // token={nativeToken}
      // unstakingDuration={
      //   unstakingDurationLoadable.state === 'hasValue'
      //     ? { time: unstakingDurationLoadable.contents }
      //     : null
      // }
      // validatorPicker={{
      //   validators: validatorsLoadable.contents,
      //   stakes,
      // }}
      {...props}
    />
  )
}
