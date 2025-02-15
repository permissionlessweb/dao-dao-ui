import { ComponentMeta, ComponentStory } from '@storybook/react'

import { EntityDisplay } from '@dao-dao/stateful'
import { CHAIN_ID } from '@dao-dao/storybook'
import {
  GenericToken,
  TokenCardProps,
  TokenStake,
  TokenType,
  UnstakingTaskStatus,
} from '@dao-dao/types'

import { ButtonLink } from '../buttons/ButtonLink'
import { TokenCard } from './TokenCard'
import { makeProps as makeUnstakingModalProps } from './UnstakingModal.stories'

export default {
  title: 'DAO DAO / packages / stateless / components / token / TokenCard',
  component: TokenCard,
  excludeStories: ['token', 'makeProps'],
} as ComponentMeta<typeof TokenCard>

const Template: ComponentStory<typeof TokenCard> = (args) => (
  <div className="max-w-xs">
    <TokenCard {...args} />
  </div>
)

export const token: GenericToken = {
  chainId: CHAIN_ID,
  type: TokenType.Native,
  denomOrAddress: 'ujuno',
  symbol: 'JUNO',
  decimals: 6,
  imageUrl: '/daodao.png',
}

export const makeProps = (isGovernanceToken = false): TokenCardProps => {
  // Random price between 0 and 10000 with up to 6 decimals.
  const unstakedBalance = Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6
  const stakes: TokenStake[] = [
    {
      token,
      // Random price between 0 and 10000 with up to 6 decimals.
      amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
      validator: {
        address: 'stakefish',
        moniker: 'Stakefish',
        website: '',
        details: '',
        commission: 0.05,
        status: 'BOND_STATUS_BONDED',
        tokens: 7,
      },
      rewards: 1.23,
    },
    {
      token,
      // Random price between 0 and 10000 with up to 6 decimals.
      amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
      validator: {
        address: '2x4ben',
        moniker: '2x4 Ben',
        website: '',
        details: '',
        commission: 0.05,
        status: 'BOND_STATUS_BONDED',
        tokens: 7,
      },
      rewards: 4.56,
    },
    {
      token,
      // Random price between 0 and 10000 with up to 6 decimals.
      amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
      validator: {
        address: 'cosmostation',
        moniker: 'Cosmostation',
        website: '',
        details: '',
        commission: 0.05,
        status: 'BOND_STATUS_BONDED',
        tokens: 7,
      },
      rewards: 7.89,
    },
    {
      token,
      // Random price between 0 and 10000 with up to 6 decimals.
      amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
      validator: {
        address: 'sg1',
        moniker: 'SG-1',
        website: '',
        details: '',
        commission: 0.05,
        status: 'BOND_STATUS_BONDED',
        tokens: 7,
      },
      rewards: 10.11,
    },
  ]

  const unstakingTasks = makeUnstakingModalProps('TOKEN').tasks
  const totalStaked = stakes.reduce((acc, stake) => acc + stake.amount, 0)
  const totalPendingRewards = stakes.reduce(
    (acc, stake) => acc + stake.rewards,
    0
  )
  const totalUnstaking =
    unstakingTasks.reduce(
      (acc, task) =>
        acc +
        // Only include balance of unstaking tasks.
        (task.status === UnstakingTaskStatus.Unstaking ? task.amount : 0),
      0
    ) ?? 0

  return {
    owner: 'owner',
    token: {
      ...token,
      imageUrl: `/placeholders/${Math.floor(Math.random() * 5) + 1}.svg`,
    },
    isGovernanceToken,
    subtitle: '',
    unstakedBalance,
    hasStakingInfo: true,
    lazyInfo: {
      loading: false,
      data: {
        usdUnitPrice: {
          amount: 5.38,
          timestamp: new Date(),
        },
        stakingInfo: {
          unstakingTasks,
          unstakingDurationSeconds: 28 * 24 * 3600,
          stakes,
          totalStaked,
          totalPendingRewards,
          totalUnstaking,
        },
        totalBalance: totalStaked + unstakedBalance + totalUnstaking,
      },
    },
    onClaim: () => alert('claim'),
    ButtonLink,
    EntityDisplay,
  }
}

export const Default = Template.bind({})
Default.args = makeProps()
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A15313',
  },
}

export const Loading = Template.bind({})
Loading.args = {
  ...makeProps(),
  lazyInfo: { loading: true },
}
