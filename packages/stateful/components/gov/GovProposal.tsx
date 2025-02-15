import { useCallback } from 'react'
import { constSelector, useRecoilValue, useSetRecoilState } from 'recoil'

import { ProposalStatus } from '@dao-dao/protobuf/codegen/cosmos/gov/v1/gov'
import {
  govProposalSelector,
  refreshGovProposalsAtom,
} from '@dao-dao/state/recoil'
import {
  PageLoader,
  Proposal,
  ProposalNotFound,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import {
  GovProposalVersion,
  GovProposalWithDecodedContent,
} from '@dao-dao/types'
import { govProposalToDecodedContent } from '@dao-dao/utils'

import { useLoadingGovProposal, useWallet } from '../../hooks'
import { walletProfileDataSelector } from '../../recoil'
import { EntityDisplay } from '../EntityDisplay'
import { IconButtonLink } from '../IconButtonLink'
import { ProfileDisconnectedCard, ProfileHomeCard } from '../profile'
import { SuspenseLoader } from '../SuspenseLoader'
import { GovProposalPageWrapperProps } from './GovPageWrapper'
import { GovProposalActionDisplay } from './GovProposalActionDisplay'
import {
  GovProposalStatusAndInfo,
  GovProposalStatusAndInfoProps,
} from './GovProposalStatusAndInfo'
import { GovProposalVotes } from './GovProposalVotes'
import { GovProposalVoteTally } from './GovProposalVoteTally'

type InnerGovProposalProps = {
  proposal: GovProposalWithDecodedContent
}

const InnerGovProposal = ({ proposal }: InnerGovProposalProps) => {
  const { isWalletConnected } = useWallet()
  const { chain_id: chainId } = useChain()

  const loadingCreatorProfile = useRecoilValue(
    proposal.version === GovProposalVersion.V1 && proposal.proposal.proposer
      ? walletProfileDataSelector({
          address: proposal.proposal.proposer,
          chainId,
        })
      : constSelector(undefined)
  )

  const proposalId = proposal.id.toString()
  const ProposalStatusAndInfo = useCallback(
    (props: Omit<GovProposalStatusAndInfoProps, 'proposalId'>) => (
      <GovProposalStatusAndInfo {...props} proposalId={proposalId} />
    ),
    [proposalId]
  )

  const loadingProposal = useLoadingGovProposal(proposalId)
  const setRefreshProposal = useSetRecoilState(refreshGovProposalsAtom(chainId))

  return (
    <Proposal
      EntityDisplay={EntityDisplay}
      IconButtonLink={IconButtonLink}
      ProposalStatusAndInfo={ProposalStatusAndInfo}
      createdAt={proposal.proposal.submitTime}
      creator={
        loadingCreatorProfile && {
          name: loadingCreatorProfile.loading
            ? { loading: true }
            : {
                loading: false,
                data: loadingCreatorProfile.profile.name,
              },
          address: loadingCreatorProfile.address,
        }
      }
      description={proposal.description.replace(/\\n/g, '\n')}
      duplicateUrl={undefined}
      id={proposalId}
      onRefresh={() => setRefreshProposal((id) => id + 1)}
      proposalInnerContentDisplay={
        <GovProposalActionDisplay
          content={govProposalToDecodedContent(proposal)}
        />
      }
      refreshing={loadingProposal.loading || !!loadingProposal.updating}
      rightSidebarContent={
        isWalletConnected ? (
          <SuspenseLoader
            fallback={<ProfileDisconnectedCard className="animate-pulse" />}
          >
            <ProfileHomeCard />
          </SuspenseLoader>
        ) : (
          <ProfileDisconnectedCard />
        )
      }
      title={proposal.title}
      voteTally={<GovProposalVoteTally proposalId={proposalId} />}
      votesCast={
        (proposal.proposal.status ===
          ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD ||
          proposal.proposal.status ===
            ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD) && (
          <GovProposalVotes proposalId={proposalId} />
        )
      }
    />
  )
}

export const GovProposal = ({
  proposalId,
}: Pick<GovProposalPageWrapperProps, 'proposalId'>) => {
  const { chain_id: chainId } = useChain()
  const proposalLoading = useCachedLoading(
    govProposalSelector({
      chainId,
      proposalId: Number(proposalId),
    }),
    undefined
  )

  return proposalId ? (
    <SuspenseLoader
      fallback={<PageLoader />}
      forceFallback={proposalLoading.loading || !proposalLoading.data}
    >
      {!proposalLoading.loading && proposalLoading.data && (
        <InnerGovProposal proposal={proposalLoading.data} />
      )}
    </SuspenseLoader>
  ) : (
    <ProposalNotFound />
  )
}
