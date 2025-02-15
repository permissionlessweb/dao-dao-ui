import { Add } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, Fragment, useRef, useState } from 'react'
import { CSVLink } from 'react-csv'
import { useTranslation } from 'react-i18next'

import {
  ButtonLinkProps,
  StatefulDaoMemberCardProps,
  StatefulEntityDisplayProps,
  TypedOption,
} from '@dao-dao/types'

import { Button } from '../../buttons'
import { GridCardContainer } from '../../GridCardContainer'
import { Dropdown } from '../../inputs/Dropdown'
import { PAGINATION_MIN_PAGE, Pagination } from '../../Pagination'
import { TooltipInfoIcon } from '../../tooltip/TooltipInfoIcon'
import { VotingPowerDistribution } from '../../VotingPowerDistribution'

export interface MembersTabProps {
  DaoMemberCard: ComponentType<StatefulDaoMemberCardProps>
  members: StatefulDaoMemberCardProps[]
  membersFailedToLoad: boolean
  isMember: boolean
  addMemberHref?: string
  ButtonLink: ComponentType<ButtonLinkProps>
  // If defined, will show the top voter distribution.
  topVoters:
    | {
        show: true
        EntityDisplay: ComponentType<StatefulEntityDisplayProps>
      }
    | {
        show: false
      }
}

// Store absolutes as negative numbers and percentages as positive numbers.
enum TopStakerState {
  TenAbsolute = -10,
  TenPercent = 10,
  TwentyPercent = 20,
  All = 100,
}

const MEMBERS_PER_PAGE = 100

export const MembersTab = ({
  DaoMemberCard,
  members,
  membersFailedToLoad,
  isMember,
  addMemberHref,
  ButtonLink,
  topVoters,
}: MembersTabProps) => {
  const { t } = useTranslation()

  const csvLinkRef = useRef<HTMLAnchorElement>()

  const [membersPage, setMembersPage] = useState(PAGINATION_MIN_PAGE)

  const [topStakerState, setTopStakerState] = useState(
    TopStakerState.TenAbsolute
  )
  const topStakerStateOptions: TypedOption<TopStakerState>[] = [
    {
      label: t('title.topAbsolute', { count: -TopStakerState.TenAbsolute }),
      value: TopStakerState.TenAbsolute,
    },
    {
      label: t('title.topPercent', { percent: TopStakerState.TenPercent }),
      value: TopStakerState.TenPercent,
    },
    {
      label: t('title.topPercent', { percent: TopStakerState.TwentyPercent }),
      value: TopStakerState.TwentyPercent,
    },
    {
      label: t('title.all'),
      value: TopStakerState.All,
    },
  ]
  const topStakerStateOption = topStakerStateOptions.find(
    (option) => option.value === topStakerState
  )

  // If anyone's voting power is still loading, can't yet show the top members.
  const sortedMembers = members.some(
    (member) => member.votingPowerPercent.loading
  )
    ? []
    : members.sort(
        (a, b) =>
          (b.votingPowerPercent.loading ? 0 : b.votingPowerPercent.data) -
          (a.votingPowerPercent.loading ? 0 : a.votingPowerPercent.data)
      )

  // Get members that hold the top voting power.
  const topMemberUpperIndex =
    topStakerState < 0
      ? -topStakerState
      : sortedMembers.reduce(
          (acc, member, index) => ({
            total:
              acc.total +
              (member.votingPowerPercent.loading
                ? 0
                : member.votingPowerPercent.data),
            // If the current total is past the top x%, keep the index the same. This
            // index is the index of the last member in the top x% of voting power.
            index: acc.total >= topStakerState ? acc.index : index,
          }),
          { total: 0, index: 0 }
        ).index + 1

  const topMembers = sortedMembers.slice(0, topMemberUpperIndex)
  const topMembersVotingPowerPercent = topMembers.reduce(
    (acc, member) =>
      acc +
      (member.votingPowerPercent.loading ? 0 : member.votingPowerPercent.data),
    0
  )
  const otherVotingPowerPercent = members
    .slice(topMemberUpperIndex)
    .reduce(
      (acc, member) =>
        acc +
        (member.votingPowerPercent.loading
          ? 0
          : member.votingPowerPercent.data),
      0
    )

  return (
    <>
      {/* header min-height of 3.5rem standardized across all tabs */}
      {addMemberHref && (
        <div className="mb-6 flex min-h-[3.5rem] flex-row items-center justify-between gap-8 border-b border-b-border-secondary pb-6">
          <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-1">
            <p className="title-text text-text-body">{t('title.newMember')}</p>
            <p className="secondary-text">{t('info.newMemberExplanation')}</p>
          </div>

          <ButtonLink
            className="shrink-0"
            disabled={!isMember}
            href={addMemberHref}
          >
            <Add className="!h-4 !w-4" />
            {t('button.addMembers')}
          </ButtonLink>
        </div>
      )}

      {topVoters.show && topMembers.length > 0 && (
        <div className="mb-6 flex flex-col items-stretch rounded-lg bg-background-tertiary">
          <div className="flex grow flex-col gap-2 overflow-hidden p-6">
            <div className="mb-4 flex flex-row items-stretch justify-between gap-4">
              <div className="flex flex-row items-center gap-2">
                <p className="primary-text text-text-body">
                  {t('title.whoControlsDaoQuestion')}
                </p>

                <TooltipInfoIcon
                  size="sm"
                  title={t('info.percentagesRepresentVotingPower')}
                />
              </div>

              <Dropdown
                onSelect={setTopStakerState}
                options={topStakerStateOptions}
                selected={topStakerState}
              />
            </div>

            <VotingPowerDistribution
              EntityDisplay={topVoters.EntityDisplay}
              data={[
                ...topMembers,
                ...(topMembersVotingPowerPercent > 0
                  ? [
                      {
                        label: topStakerStateOption?.label ?? t('title.total'),
                        votingPowerPercent: topMembersVotingPowerPercent,
                        section: 2,
                        color: 'var(--text-tertiary)',
                      },
                    ]
                  : []),
                ...(otherVotingPowerPercent > 0
                  ? [
                      {
                        label: t('title.otherMembers'),
                        votingPowerPercent: otherVotingPowerPercent,
                        section: 2,
                        color: 'var(--text-interactive-disabled)',
                      },
                    ]
                  : []),
              ]}
            />
          </div>
        </div>
      )}

      <div
        className={clsx(
          'pb-6',
          // header min-height of 3.5rem standardized across all tabs if add
          // members header is not showing at the top
          !addMemberHref && 'flex min-h-[3.5rem] flex-row items-center'
        )}
      >
        <p className="title-text text-text-body">
          {membersFailedToLoad
            ? t('error.failedToLoadMembersTitle')
            : t('title.numMembers', { count: members.length })}
        </p>
      </div>
      {membersFailedToLoad ? (
        <p className="secondary-text">
          {t('error.failedToLoadMembersDescription')}
        </p>
      ) : members.length ? (
        <>
          <GridCardContainer>
            {members
              .slice(
                (membersPage - 1) * MEMBERS_PER_PAGE,
                membersPage * MEMBERS_PER_PAGE
              )
              .map((props, index) => (
                <DaoMemberCard {...props} key={index} />
              ))}
          </GridCardContainer>

          <Pagination
            className="mx-auto mt-12"
            page={membersPage}
            pageSize={MEMBERS_PER_PAGE}
            setPage={setMembersPage}
            total={members.length}
          />
        </>
      ) : (
        <p className="secondary-text">{t('error.noMembers')}</p>
      )}
      <Button
        className="caption-text mt-6 italic"
        disabled={false}
        onClick={() => csvLinkRef.current?.click()}
        variant="none"
      >
        {t('button.downloadMembersCsv')}
      </Button>
      <CSVLink
        className="hidden"
        data={[
          [
            'Member',
            members.length
              ? members[0].balance.label +
                (members[0].balance.unit ? ` (${members[0].balance.unit})` : '')
              : 'Balance',
            'Voting power',
          ],
          ...members.map(({ address, balance, votingPowerPercent }) => [
            address,
            balance.value.loading ? '...' : balance.value.data,
            votingPowerPercent.loading ? '...' : votingPowerPercent.data,
          ]),
        ]}
        filename="members.csv"
        ref={(ref: any) => (csvLinkRef.current = ref?.link ?? undefined)}
      />
    </>
  )
}
