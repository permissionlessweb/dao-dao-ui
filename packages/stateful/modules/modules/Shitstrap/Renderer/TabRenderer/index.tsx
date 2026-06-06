import { useQueries, useQueryClient } from '@tanstack/react-query'
import uniqBy from 'lodash.uniqby'
import { Trans } from 'next-i18next'

import {
  cwShitstrapExtraQueries,
  cwShitstrapFactoriesExtraQuery,
} from '@dao-dao/state/query'
import {
  ButtonLink,
  useDao,
  useDaoNavHelpers,
  useInitializedActionForKey,
} from '@dao-dao/stateless'
import { ActionKey, ModuleRendererProps } from '@dao-dao/types'
import {
  getDaoProposalSinglePrefill,
  makeCombineQueryResultsIntoLoadingDataWithError,
} from '@dao-dao/utils'

import { ShitstrapPaymentLine } from '../../../../../components/shitstrap'
import { useMembership } from '../../../../../hooks'
import { ShitstrapPaymentCard } from '../../components/stateless/ShitstrapPaymentCard'
import { ShitstrapPaymentModuleData } from '../../types'
import { ShitstrapTabRenderer as StatelessTabRenderer } from './TabRenderer'

export const TabRenderer = ({
  variables: { factories, factory },
}: ModuleRendererProps<ShitstrapPaymentModuleData>) => {
  const shitAction = useInitializedActionForKey(ActionKey.ManageShitstrap)

  // if is member, lets allow to select to propose to use dao treasury as payment, or own wallet
  const { chainId: defaultChainId, coreAddress, accounts } = useDao()
  const { getDaoProposalPath } = useDaoNavHelpers()
  const { isMember = false } = useMembership()

  const queryClient = useQueryClient()

  // Grabs all shitstraps created from the factory saved in daos widget items
  const shitstrapsContractsLoading = useQueries({
    queries: [
      // Factory or factory list depending on version.
      ...(factories
        ? Object.entries(factories).map(([chainId, { address }]) => ({
            chainId,
            address,
          }))
        : factory
          ? [{ chainId: defaultChainId, address: factory }]
          : []
      ).map(({ chainId, address }) =>
        cwShitstrapFactoriesExtraQuery.listAllShitstrapContracts(queryClient, {
          chainId,
          address,
        })
      ),

      // TODO: implement with correct indexer query
      // // Contracts owned by any of this DAO's accounts. This detects contracts
      // // whose ownership was transferred to this DAO but that are still part of
      // // a different factory.
      // ...accounts.map(({ chainId, address }) =>
      //   cwShitstrapFactoriesExtraQuery.listAllShitstrapContractsByInstantiator(queryClient, {
      //     chainId,
      //     address,
      //   })
      // ),
    ],
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      firstLoad: 'one',
    }),
  })

  // Fetch infos individually so they refresh when data is updated elsewhere.
  const shitstrapInfosLoading = useQueries({
    queries:
      shitstrapsContractsLoading.loading || shitstrapsContractsLoading.errored
        ? []
        : shitstrapsContractsLoading.data.flatMap(({ chainId, contracts }) =>
            contracts.map(({ contract }) =>
              cwShitstrapExtraQueries.info(queryClient, {
                chainId,
                contractAddress: contract,
              })
            )
          ),
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      firstLoad: 'one',
      transform: (infos) =>
        uniqBy(
          infos,
          (info) => info.chainId + ':' + info.shitstrapContractAddr
        ),
    }),
  })

  // shitstrap payments that are not full.
  const shitstrapPaymentsNotFull =
    shitstrapInfosLoading.loading || shitstrapInfosLoading.errored
      ? []
      : shitstrapInfosLoading.data.filter((props) => props.full != true)

  // shitstrap payments that are  full.
  const shitstrapPaymentsFull =
    shitstrapInfosLoading.loading || shitstrapInfosLoading.errored
      ? []
      : shitstrapInfosLoading.data.filter((props) => props.full == true)

  return (
    <>
      <StatelessTabRenderer
        ButtonLink={ButtonLink}
        ShitStrapCard={ShitstrapPaymentCard}
        ShitStrapLine={ShitstrapPaymentLine}
        Trans={Trans}
        createShitStrapHref={
          !shitAction.loading && !shitAction.errored
            ? getDaoProposalPath(coreAddress, 'create', {
                prefill: getDaoProposalSinglePrefill({
                  actions: [
                    {
                      actionKey: shitAction.data.key, // defines the action key available
                      data: shitAction.data.defaults, // sets the defaults to it
                    },
                  ],
                }),
              })
            : undefined
        }
        isMember={isMember}
        queryClient={queryClient}
        shitStrapsLoading={{
          loading: false,
          errored: false,
          data: shitstrapPaymentsNotFull,
        }}
      />
    </>
  )
}
