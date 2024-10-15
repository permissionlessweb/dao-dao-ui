import { useQueries, useQueryClient } from '@tanstack/react-query'
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
import { ActionKey, WidgetRendererProps } from '@dao-dao/types'
import {
  getDaoProposalSinglePrefill,
  makeCombineQueryResultsIntoLoadingDataWithError,
} from '@dao-dao/utils'

import {
  ShitstrapPaymentCard,
  ShitstrapPaymentLine,
} from '../../../../../components/shitstrap'
import { useMembership } from '../../../../../hooks'
import { ShitstrapPaymentWidgetData } from '../../types'
import { TabRenderer as StatelessTabRenderer } from './TabRenderer'

export const TabRenderer = ({
  variables: { factories },
}: WidgetRendererProps<ShitstrapPaymentWidgetData>) => {
  const { chainId: defaultChainId, coreAddress } = useDao()
  const { getDaoProposalPath } = useDaoNavHelpers()
  // if is member, lets allow to select to propose to use dao treasury as payment, or own wallet
  const { isMember = false } = useMembership()

  const queryClient = useQueryClient()

  const shitstrapsContractsLoading = useQueries({
    queries: [
      // Factory or factory list depending on version.
      ...(factories
        ? Object.entries(factories).map(([chainId, { address }]) => ({
            chainId,
            address,
          }))
        : []
      ).map(({ chainId, address }) =>
        cwShitstrapFactoriesExtraQuery.listAllShitstrapContracts(queryClient, {
          chainId,
          address,
        })
      ),
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
                address: contract,
              })
            )
          ),
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      firstLoad: 'one',
    }),
  })
  const shitAction = useInitializedActionForKey(ActionKey.ManageShitstrap)

  // shitstrap payments that are full.
  const vestingPaymentsNeedingSlashRegistration =
    shitstrapInfosLoading.loading || shitstrapInfosLoading.errored
      ? []
      : shitstrapInfosLoading.data.filter((props) => props.full == true)

  return (
    <>
      {!shitAction.loading && !shitAction.errored && (
        <StatelessTabRenderer
          ButtonLink={ButtonLink}
          ShitStrapCard={ShitstrapPaymentCard}
          ShitStrapLine={ShitstrapPaymentLine}
          Trans={Trans}
          createShitStrapHref={
            shitAction
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
          shitStrapsLoading={shitstrapInfosLoading}
        />
      )}
    </>
  )
}
