import { useQueries, useQueryClient } from '@tanstack/react-query'
import uniqBy from 'lodash.uniqby'

import {
  contractQueries,
  cwAveFactoryExtraQueries,
  cwAveFactoryQueries,
  cwAveQueries,
  cwPayrollFactoryExtraQueries,
  cwVestingExtraQueries,
  entityQueries,
} from '@dao-dao/state/query'
import {
  useDao,
  useDaoNavHelpers,
  useInitializedActionForKey,
} from '@dao-dao/stateless'
import {
  ActionKey,
  Entity,
  ModuleRendererProps,
  AvEventModuleData
} from '@dao-dao/types'
import {
  getAccount,
  getAccountAddress,
  getDaoProposalSinglePrefill,
  makeCombineQueryResultsIntoLoadingDataWithError,
  transformBech32Address,
} from '@dao-dao/utils'

import {
  ButtonLink,
  Trans,
  VestingPaymentCard,
  VestingPaymentLine,
} from '../../../../../components'
import { useMembership } from '../../../../../hooks/useMembership'
import { TabRenderer as StatelessTabRenderer } from './TabRenderer'
import { } from '@dao-dao/types/contracts/CwAve'

import { useEntity, useQueryLoadingDataWithError, useWallet } from '../../../../../hooks'
import { AvEventLine } from '../../components/stateful/AvEventLine'
import { AvEventCard } from '../../components/stateful/AvEventCard'
import { useEffect } from 'react'

export const TabRenderer = ({
  variables: { deployers, deployer },
}: ModuleRendererProps<AvEventModuleData>) => {
  const { chainId: defaultChainId, coreAddress, accounts } = useDao()
  const queryClient = useQueryClient()
  const { getDaoProposalPath } = useDaoNavHelpers()
  const { isMember = false } = useMembership()
  const { address: currentWalletAddress = '', isWalletConnecting, isWalletConnected, account } = useWallet({})


  const aveEventContractsLoading = useQueries({
    queries: [
      // Factory or deployer list depending on version.
      ...(deployers
        ? Object.entries(deployers).map(([chainId, { address }]) => ({
          chainId,
          address,
        }))
        : deployer
          ? [
            {
              chainId: defaultChainId,
              address: deployer,
            },
          ]
          : // Should never happen.
          []
      ).map(({ chainId, address }) =>
        cwAveFactoryExtraQueries.listAllAveContracts(queryClient, {
          chainId,
          address,
        })
      ),

      // Contracts owned by any of this DAO's accounts. This detects contracts
      // whose ownership was transferred to this DAO but that are still part of
      // a different deployer.
      // ...accounts.map(({ chainId, address }) =>
      //   contractQueries.listContractsOwnedByAccount(queryClient, {
      //     chainId,
      //     address,
      //   })
      // ),
    ],
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      firstLoad: 'one',
      // Ignore errors from any of the queries unless all of them error. This is
      // important in case the DAO has an account on a non-indexed chain, which
      // causes the last query to error.
      errorIf: 'all',
    }),
  })

  // Fetch infos individually so they refresh when data is updated elsewhere.
  // defaults to dao 
  const aveEventInfosLoading = useQueries({
    queries:
      aveEventContractsLoading.loading || aveEventContractsLoading.errored
        ? []
        : aveEventContractsLoading.data.flatMap(({ chainId, contracts }) =>
          contracts.map(({ contract }) =>
            cwAveQueries.eventInstance(queryClient, {
              chainId,
              contractAddress: contract,
              connectedAddr: transformBech32Address(isWalletConnected ? currentWalletAddress : coreAddress, chainId)
            })
          )
        ),
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      firstLoad: 'one',
      // Ignore errors from any of the queries unless all of them error. This is
      // a workaround since the indexer sometimes surfaces nonexistent
      // addresses based on failed transactions.
      errorIf: 'all',
      // De-dupe since the ownership queries will overlap with the deployer list
      // queries.
      transform: (infos) =>
        uniqBy(
          infos,
          (info) => info.eventChainId + ':' + info.eventContract
        ),
    }),
  })



  const avEventAction = useInitializedActionForKey(ActionKey.ManageAvEvents)

  // // Vesting payments that need a slash registered.
  // const vestingPaymentsNeedingSlashRegistration =
  //   aveEventInfosLoading.loading || aveEventInfosLoading.errored
  //     ? []
  //     : aveEventInfosLoading.data.filter(
  //       ({ hasUnregisteredSlashes }) => hasUnregisteredSlashes
  //     )


  useEffect(() => {
    console.log("avEventAction", avEventAction)
  }, [
    avEventAction,

  ])

  return (
    <StatelessTabRenderer
      avEventInstancesLoading={aveEventInfosLoading}
      AvEventLine={AvEventLine}
      AvEventCard={AvEventCard}
      ButtonLink={ButtonLink}
      Trans={Trans}
      createEventHref={!avEventAction.loading && !avEventAction.errored
        ? getDaoProposalPath(coreAddress, 'create', {
          prefill: getDaoProposalSinglePrefill({
            actions: [
              {
                actionKey: avEventAction.data.key,
                data: avEventAction.data.defaults,
              },
            ],
          }),
        })
        : undefined}
      isMember={isMember}
    // registerSlashesHref={
    //   !avEventAction.loading &&
    //     !avEventAction.errored &&
    //     vestingPaymentsNeedingSlashRegistration.length > 0
    //     ? getDaoProposalPath(coreAddress, 'create', {
    //       prefill: getDaoProposalSinglePrefill({
    //         actions: vestingPaymentsNeedingSlashRegistration.flatMap(
    //           ({
    //             chainId,
    //             vestingContractAddress,
    //             slashes: validatorsWithSlashes,
    //           }) =>
    //             validatorsWithSlashes.flatMap(
    //               ({ validatorOperatorAddress, slashes }) =>
    //                 slashes
    //                   .filter((slash) => slash.unregisteredAmount > 0)
    //                   .map((slash) => ({
    //                     actionKey: avEventAction.data.key,
    //                     data: {
    //                       ...avEventAction.data.defaults,
    //                       mode: 'registerSlash',
    //                       registerSlash: {
    //                         chainId,
    //                         address: vestingContractAddress,
    //                         validator: validatorOperatorAddress,
    //                         // Milliseconds to nanoseconds.
    //                         time: BigInt(slash.timeMs * 1e6).toString(),
    //                         amount: slash.unregisteredAmount.toString(),
    //                         duringUnbonding: slash.duringUnbonding,
    //                       },
    //                     },
    //                   }))
    //             )
    //         ),
    //       }),
    //     })
    //     : undefined
    // }
    />
  )
}
