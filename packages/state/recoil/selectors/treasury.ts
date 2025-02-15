import { parseCoins } from '@cosmjs/proto-signing'
import { IndexedTx } from '@cosmjs/stargate'
import { selectorFamily, waitForAll, waitForAllSettled } from 'recoil'

import { AmountWithTimestamp, WithChainId } from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  getTokenForChainIdAndDenom,
} from '@dao-dao/utils'

import {
  blockHeightTimestampSafeSelector,
  communityPoolBalancesSelector,
  cosmWasmClientForChainSelector,
} from './chain'
import { DaoCoreV2Selectors } from './contracts'
import {
  genericTokenBalancesSelector,
  genericTokenDelegatedBalanceSelector,
  usdPriceSelector,
} from './token'

type TreasuryTransactionsParams = WithChainId<{
  address: string
  minHeight?: number
  maxHeight?: number
}>

interface TreasuryTransaction {
  tx: IndexedTx
  timestamp: Date | undefined
  events: {
    type: string
    attributes: {
      key: string
      value: string
    }[]
  }[]
}

export const treasuryTransactionsSelector = selectorFamily<
  TreasuryTransaction[],
  TreasuryTransactionsParams
>({
  key: 'treasuryTransactions',
  get:
    ({ address, minHeight, maxHeight, chainId }) =>
    async ({ get }) => {
      const client = get(cosmWasmClientForChainSelector(chainId))

      const txs = await client.searchTx(
        [
          `message.module='bank' AND (transfer.sender='${address}' OR transfer.recipient='${address}')`,
          ...(minHeight !== undefined ? `tx.height>=${minHeight}` : []),
          ...(maxHeight !== undefined ? `tx.height<=${maxHeight}` : []),
        ].join('AND')
      )

      const txDates = get(
        waitForAll(
          txs.map(({ height }) =>
            blockHeightTimestampSafeSelector({
              blockHeight: height,
              chainId,
            })
          )
        )
      )

      return (
        txs
          .map((tx, index) => {
            let events
            try {
              events = JSON.parse(tx.rawLog)[0].events
            } catch {
              return
            }

            return {
              tx,
              timestamp: txDates[index],
              events,
            }
          })
          .filter(Boolean) as TreasuryTransaction[]
      ).sort((a, b) =>
        // Sort descending by timestamp, putting undefined timestamps last.
        b.timestamp && a.timestamp
          ? b.timestamp.getTime() - a.timestamp.getTime()
          : !a.timestamp
          ? 1
          : !b.timestamp
          ? -1
          : b.tx.height - a.tx.height
      )
    },
})

export interface TransformedTreasuryTransaction {
  hash: string
  height: number
  timestamp: Date | undefined
  sender: string
  recipient: string
  amount: number
  denomLabel: string
  outgoing: boolean
}

export const transformedTreasuryTransactionsSelector = selectorFamily<
  TransformedTreasuryTransaction[],
  TreasuryTransactionsParams
>({
  key: 'transformedTreasuryTransactions',
  get:
    (params) =>
    async ({ get }) => {
      const txs = get(treasuryTransactionsSelector(params))

      return txs
        .map(({ tx: { hash, height }, timestamp, events }) => {
          const transferEvent = events.find(({ type }) => type === 'transfer')
          if (!transferEvent) {
            return
          }

          let sender = transferEvent.attributes.find(
            ({ key }) => key === 'sender'
          )?.value
          let recipient = transferEvent.attributes.find(
            ({ key }) => key === 'recipient'
          )?.value
          const amount = transferEvent.attributes.find(
            ({ key }) => key === 'amount'
          )?.value

          if (!sender || !recipient || !amount) {
            return
          }

          const coin = parseCoins(amount)[0]
          if (!coin) {
            return
          }

          const token = getTokenForChainIdAndDenom(params.chainId, coin.denom)

          return {
            hash,
            height,
            timestamp,
            sender,
            recipient,
            amount: convertMicroDenomToDenomWithDecimals(
              coin.amount,
              token.decimals
            ),
            denomLabel: token.symbol,
            outgoing: sender === params.address,
          }
        })
        .filter(Boolean) as TransformedTreasuryTransaction[]
    },
})

export const daoTvlSelector = selectorFamily<
  AmountWithTimestamp,
  WithChainId<{
    coreAddress: string
    cw20GovernanceTokenAddress?: string
  }>
>({
  key: 'daoTvl',
  get:
    ({ coreAddress, cw20GovernanceTokenAddress, chainId }) =>
    async ({ get }) => {
      const timestamp = new Date()

      const polytoneProxies = Object.entries(
        get(
          DaoCoreV2Selectors.polytoneProxiesSelector({
            chainId,
            contractAddress: coreAddress,
          })
        )
      )

      // Neutron's modified DAOs do not support cw20s, so this may error. Ignore
      // if so.
      const cw20BalancesLoadable = get(
        waitForAllSettled([
          DaoCoreV2Selectors.allCw20TokensWithBalancesSelector({
            contractAddress: coreAddress,
            chainId,
            governanceTokenAddress: cw20GovernanceTokenAddress,
          }),
        ])
      )[0]

      const allBalances = [
        // Native balances.
        ...[
          // Current chain.
          {
            owner: coreAddress,
            chainId,
          },
          // Polytone.
          ...polytoneProxies.map(([chainId, proxy]) => ({
            owner: proxy,
            chainId,
          })),
        ]
          .map(({ owner, chainId }) => [
            // All unstaked
            ...get(
              genericTokenBalancesSelector({
                address: owner,
                chainId,
              })
            ),
            // Staked
            get(
              genericTokenDelegatedBalanceSelector({
                walletAddress: owner,
                chainId,
              })
            ),
          ])
          .flat(),
        // Cw20s on current chain.
        ...(cw20BalancesLoadable.state === 'hasValue'
          ? cw20BalancesLoadable.contents
          : []),
      ]

      const prices = allBalances.map(({ token, balance }) => {
        // Don't calculate price if could not load token decimals correctly.
        if (token.decimals === 0) {
          return 0
        }

        const price = get(
          usdPriceSelector({
            type: token.type,
            denomOrAddress: token.denomOrAddress,
            chainId: token.chainId,
          })
        )?.amount

        return price
          ? convertMicroDenomToDenomWithDecimals(balance, token.decimals) *
              price
          : 0
      })
      const amount = prices.reduce((price, total) => price + total, 0)

      return {
        amount,
        timestamp,
      }
    },
})

export const communityPoolTvlSelector = selectorFamily<
  AmountWithTimestamp,
  WithChainId<{}>
>({
  key: 'communityPoolTvl',
  get:
    ({ chainId }) =>
    async ({ get }) => {
      const timestamp = new Date()

      const tokenBalances = get(communityPoolBalancesSelector({ chainId }))

      const prices = tokenBalances.map(
        ({ token: { chainId, type, denomOrAddress, decimals }, balance }) => {
          // Don't calculate price if could not load token decimals correctly.
          if (decimals === 0) {
            return 0
          }

          const price = get(
            usdPriceSelector({
              type,
              denomOrAddress,
              chainId,
            })
          )?.amount

          return price
            ? convertMicroDenomToDenomWithDecimals(balance, decimals) * price
            : 0
        }
      )
      const amount = prices.reduce((price, total) => price + total, 0)

      return {
        amount,
        timestamp,
      }
    },
})
