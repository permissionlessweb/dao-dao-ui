import { IbcClient } from '@confio/relayer/build/lib/ibcclient'
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import { IndexedTx, SigningStargateClient } from '@cosmjs/stargate'
import { ChainWalletBase } from '@cosmos-kit/core'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { tokenQueries } from '@dao-dao/state/query'
import { DynamicGasPrice } from '@dao-dao/state/utils'
import { Button, Modal, SteppedWalkthrough } from '@dao-dao/stateless'
import { AnyChain, GenericToken, TokenType } from '@dao-dao/types'
import {
  getChainForChainId,
  getFallbackImage,
  getImageUrlForChainId,
  getRpcForChainId,
  processError,
  retry,
} from '@dao-dao/utils'

import { useWallet } from '../../../../hooks'
import { useHeadstash } from '../../../../actions/core/actions/ManageHeadstash/hooks/useHeadstash'
import { ClaimHeadstashModalProps } from '../../../../actions/core/actions/ManageHeadstash/types'

enum HeadstashStatus {
  Uninitialized,
  Initializing, // 1. signing offline signature
  Funding,
  Executing,
  Relaying,
  Refunding,
  RefundingErrored,
  Success,
  RelayErrored,
  Canceled,
}

// const RELAYER_FUNDS_NEEDED: Partial<Record<ChainId | string, number>> = {
//   [ChainId.CosmosHubMainnet]: 0.06 * 10 ** 6,
//   [ChainId.JunoMainnet]: 1 * 10 ** 6,
//   [ChainId.OsmosisMainnet]: 0.1 * 10 ** 6,
//   [ChainId.StargazeMainnet]: 5 * 10 ** 6,
//   [ChainId.NeutronMainnet]: 2 * 10 ** 6,
//   [ChainId.TerraMainnet]: 0.1 * 10 ** 6,
//   [ChainId.MigalooMainnet]: 40 * 10 ** 6,
//   [ChainId.KujiraMainnet]: 0.1 * 10 ** 6,
//   [ChainId.OraichainMainnet]: 0.1 * 10 ** 6,
//   [ChainId.ChihuahuaMainnet]: 1000 * 10 ** 6,
//   [ChainId.ArchwayMainnet]: 1 * 10 ** 18,
//   [ChainId.InjectiveMainnet]: 0.03 * 10 ** 18,
//   [ChainId.TerraClassicMainnet]: 1000 * 10 ** 6,
//   [ChainId.OmniflixHubMainnet]: 1 * 10 ** 6,
//   [ChainId.BitsongMainnet]: 10 * 10 ** 6,
//   [ChainId.NobleMainnet]: 0.1 * 10 ** 6,
// }

type ThrowawayWallet = {
  wallet: {
    address: string
    signingStargateClient: SigningStargateClient
  }
}
type Relayer = {
  chain: AnyChain
  chainImageUrl: string
  feeToken: GenericToken
  wallet: {
    address: string
    signingStargateClient: SigningStargateClient
  }
  relayerAddress: string
  client: IbcClient
}

export const ClaimHeadstashModal = ({
  uniqueId,
  chainId,
  crossChainPackets,
  transaction,
  onSuccess,
  onClose,
  visible,
}: ClaimHeadstashModalProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const mnemonicKey = `relayer_mnemonic_${uniqueId}`

  // // Current chain.
  // const {
  //   chain: { chainId: currentChainId },
  // } = useSupportedChainContext()

  // All chains, including current.
  // const chainIds = [currentChainId, ..._chainIds]
  // const chains = uniq(chainIds).map(getChainForChainId)

  const {
    isWalletConnected,
    chainWallet,
    connect,
    address: currentWallet,
  } = useWallet()
  const chainWalletList = chainWallet?.mainWallet?.getChainWalletList(false)
  const currentChainWallet = chainWalletList?.find(
    (cw) => cw.chainId === chainId
  )

  const [status, setStatus] = useState<HeadstashStatus>(
    HeadstashStatus.Uninitialized
  )
  const [relayError, setRelayError] = useState<string>()
  const [relayers, setRelayers] = useState<Relayer[]>()

  // Relayer chain IDs currently being funded.
  // const [fundingRelayer, setFundingRelayer] = useState<Record<string, boolean>>({})

  // Amount funded once funding is complete.
  // const [fundedAmount, setFundedAmount] = useState<
  //   Record<string, HugeDecimal | undefined>
  // >({})

  const { fetchThrowawayWallet } = useHeadstash()

  const [executeTx, setExecuteTx] =
    useState<Pick<IndexedTx, 'events' | 'height'>>()

  // const [relaying, setRelaying] = useState<{
  //   type: 'packet' | 'ack'
  //   relayer: Relayer
  // }>()

  // Amount refunded once refunding is complete.
  // const [refundedAmount, setRefundedAmount] = useState<
  //   Record<string, HugeDecimal | undefined>
  // >({})

  // If relay fails and user decides to refund and cancel, this will be set to
  // true.
  // const [canceling, setCanceling] = useState(false)

  // If relay fails due to insufficient funds, this multiplier is applied to the
  // funds needed that is defined at the top.
  // const [fundsNeededRetryMultiplier, setFundsNeededRetryMultiplier] =
  //   useState(1)

  // When the modal is closed, reset state.
  useEffect(() => {
    if (visible) {
      return
    }

    // Reset state after a short delay to allow the modal to close.
    setTimeout(() => {
      setStatus(HeadstashStatus.Uninitialized)
      setRelayers(undefined)
      // setFundingRelayer({})
      // setFundedAmount({})
      setExecuteTx(undefined)
      // setRefundedAmount({})
      // setRelaying(undefined)
      // setCanceling(false)
    }, 500)
  }, [visible])

  // Prevent accidentally closing the tab/window in the middle of the process.
  useEffect(() => {
    if (
      !visible ||
      status === HeadstashStatus.Uninitialized ||
      status === HeadstashStatus.Success
    ) {
      return
    }

    const listener = (event: BeforeUnloadEvent) => {
      event.returnValue = t('info.completeRelayOrLoseFunds')
    }

    window.addEventListener('beforeunload', listener)
    return () => window.removeEventListener('beforeunload', listener)
  }, [visible, status, t])

  // Refresh balances for the wallet and relayer wallet.
  // const refreshBalances = useRecoilCallback(
  //   ({ set }) =>
  //     ({ wallet, relayerAddress }: Relayer) => {
  //       set(refreshWalletBalancesIdAtom(wallet.address), (id) => id + 1)
  //       set(refreshWalletBalancesIdAtom(relayerAddress), (id) => id + 1)
  //     },
  //   []
  // )

  // Refresh balances every 10 seconds.
  // useEffect(() => {
  //   if (!relayers) {
  //     return
  //   }
  //   const interval = setInterval(() => {
  //     relayers?.forEach(refreshBalances)
  //   }, 10000)
  //   return () => clearInterval(interval)
  // }, [relayers, refreshBalances])

  // Create memoized function that returns the relayer funds for a chain,
  // adjusting for number of packets.
  // const getRelayerFundsRef = useUpdatingRef(
  //   (chainId: string): number =>
  //     // Use relayer funds as base, increase by 5% per packet, and apply retry
  //     // multiplier.
  //     (RELAYER_FUNDS_NEEDED[chainId] ?? 0) *
  //     (1 + crossChainPackets.length * 0.05) *
  //     fundsNeededRetryMultiplier
  // )

  // const walletFunds = useCachedLoadingWithError(
  //   relayers
  //     ? waitForAll(
  //       relayers.map(({ chain: { chainId }, feeToken, wallet }) =>
  //         genericTokenBalanceSelector({
  //           chainId,
  //           type: feeToken.type,
  //           denomOrAddress: feeToken.denomOrAddress,
  //           address: wallet.address,
  //         })
  //       )
  //     )
  //     : undefined
  // )

  // const walletFundsSufficient =
  //   !walletFunds.loading && !walletFunds.errored && relayers
  //     ? walletFunds.data.map(
  //         ({ balance }, index) =>
  //           Number(balance) >=
  //           getRelayerFundsRef.current(relayers[index].chain.chainId)
  //       )
  //     : undefined

  // const relayerFunds = useCachedLoadingWithError(
  //   relayers
  //     ? waitForAll(
  //       relayers.map(({ chain: { chainId }, feeToken, relayerAddress }) =>
  //         nativeDenomBalanceSelector({
  //           chainId,
  //           walletAddress: relayerAddress,
  //           denom: feeToken.denomOrAddress,
  //         })
  //       )
  //     )
  //     : undefined
  // )
  // Whether or not all relayers have enough funds to pay fees, except current.
  // const allReceivingRelayersFunded =
  //   !relayerFunds.loading &&
  //   !relayerFunds.errored &&
  //   relayers &&
  //   relayerFunds.data
  //     .slice(1)
  //     .every(
  //       ({ amount }, index) =>
  //         Number(amount) >=
  //         getRelayerFundsRef.current(relayers[index + 1].chain.chainId)
  //     )

  const setupThrowawayWallet = async () => {
    if (status !== HeadstashStatus.Uninitialized) {
      toast.error(t('error.relayerAlreadySetUp'))
      return
    }

    // Should never happen...
    // const unsupportedChains = chains.filter((_, index) => !chainWallets[index])
    // if (unsupportedChains.length > 0) {
    //   toast.error(
    //     t('error.unsupportedChains', {
    //       count: unsupportedChains.length,
    //       chains: unsupportedChains
    //         .map(({ chainId }) => getDisplayNameForChainId(chainId))
    //         .join(', '),
    //     })
    //   )
    //   return
    // }

    // Connect to all disconnected chain wallets.
    const throwawayChainWallets = currentChainWallet as ChainWalletBase
    try {
      ; (await throwawayChainWallets.isWalletConnected) ||
        (await throwawayChainWallets.connect(false))
      // Make sure all wallets are connected. Should never happen...
      if (!throwawayChainWallets.isWalletConnected) {
        throw new Error('unexpected wallet not connected')
      }
      if (!currentWallet) {
        throw new Error('unexpected wallet not connected')
      }
    } catch (err) {
      console.error(err)
      toast.error(t('error.failedToConnect'))
      return
    }

    setStatus(HeadstashStatus.Initializing)
    try {
      // Find the throwaway mnemonic if it exists, or generate a new one.
      // With this:
      const throwawayWallet = await fetchThrowawayWallet(currentWallet)
      const mnemonic = throwawayWallet.mnemonic

      const relayer = await (async (): Promise<ThrowawayWallet> => {
        const chain = getChainForChainId(chainId)
        const chainImageUrl =
          getImageUrlForChainId(chainId) || getFallbackImage(chainId)

        const feeDenom = chain.chainRegistry?.fees?.fee_tokens[0]?.denom
        if (!feeDenom) {
          throw new Error(t('error.feeTokenNotFound'))
        }

        const feeToken = await queryClient.fetchQuery(
          tokenQueries.info(queryClient, {
            chainId: chain.chainId,
            type: TokenType.Native,
            denomOrAddress: feeDenom,
          })
        )

        // Connect wallet to chain so we can send tokens.
        const { address, getSigningStargateClient } = throwawayChainWallets
        if (!address) {
          throw new Error(t('error.chainNotConnected'))
        }

        const signingStargateClient = await getSigningStargateClient()

        // Create relayer signer.
        const signer = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
          prefix: chain.bech32Prefix,
        })
        const throwawayAddress = (await signer.getAccounts())[0].address

        // Create IBC client with newly created signer.
        const client = await retry(10, (attempt) =>
          IbcClient.connectWithSigner(
            getRpcForChainId(chain.chainId, attempt - 1),
            signer,
            throwawayAddress,
            {
              // How long it waits in between checking for a new block.
              estimatedBlockTime: 3000,
              // How long it waits until looking for acks.
              estimatedIndexerTime: 3000,
              gasPrice: new DynamicGasPrice(queryClient, chain) as any,
            }
          )
        )

        return {
          wallet: {
            signingStargateClient:
              signingStargateClient as unknown as SigningStargateClient,
            address: throwawayAddress,
          },
        }
      })()

      // Save mnemonic in case of an error. This gets cleared when the relayer
      // succeeds and all wallets are refunded successfully.
      localStorage.setItem(mnemonicKey, mnemonic)

      setRelayers(relayers)
      setStatus(HeadstashStatus.Funding)
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
      setStatus(HeadstashStatus.Uninitialized)
    }
  }

  // Send fee tokens to relayer wallet.
  // const fundRelayer = async (chainId: string, withExecuteRelay = false) => {
  //   const relayer = relayers?.find(({ chain }) => chainId === chain.chainId)
  //   if (!relayers || !relayer) {
  //     toast.error(t('error.relayerNotSetUp'))
  //     return
  //   }

  //   // Should never happen, but just to be safe.
  //   if (withExecuteRelay && relayer.chain.chainId !== currentChainId) {
  //     toast.error(
  //       t('error.unexpectedError') +
  //       ' Relay can only happen when funding the current chain.'
  //     )
  //     return
  //   }

  //   setFundingRelayer((prev) => ({
  //     ...prev,
  //     [chainId]: true,
  //   }))
  //   try {
  //     if (withExecuteRelay) {
  //       setStatus(HeadstashStatus.Executing)
  //     }

  //     // Get current balance of relayer wallet.
  //     const currentBalance = await relayer.client.query.bank.balance(
  //       relayer.relayerAddress,
  //       relayer.feeToken.denomOrAddress
  //     )

  //     // const fundsNeeded =
  //     //   // Give a little extra to cover the authz tx fee.
  //     //   HugeDecimal.from(getRelayerFundsRef.current(chainId) * 1.2).minus(
  //     //     currentBalance
  //     //   )

  //     // let msgs: EncodeObject[] = fundsNeeded.isPositive()
  //     //   ? // Send tokens to relayer wallet if needed.
  //     //     [
  //     //       cwMsgToEncodeObject(
  //     //         chainId,
  //     //         {
  //     //           bank: {
  //     //             send: {
  //     //               amount: fundsNeeded.toCoins(
  //     //                 relayer.feeToken.denomOrAddress
  //     //               ),
  //     //               to_address: relayer.relayerAddress,
  //     //             },
  //     //           },
  //     //         },
  //     //         relayer.wallet.address
  //     //       ),
  //     //     ]
  //     //   : []

  //     // Add execute message if executing and has not already executed.
  //     // if (withExecuteRelay && !executeTx && transaction.type === 'execute') {
  //     //   msgs.push(
  //     //     ...transaction.msgs.map((msg) =>
  //     //       cwMsgToEncodeObject(chainId, msg, relayer.wallet.address)
  //     //     )
  //     //   )
  //     // }

  //     // Execute fund and execute messages. Fund should only happen if the
  //     // relayer wallet needs funding, and execute should only happen if this is
  //     // the current chain. There will be none if this is not the current chain
  //     // and the relayer wallet is already funded.
  //     let newExecuteTxResult
  //     // if (msgs.length > 0) {
  //     //   newExecuteTxResult =
  //     //     await relayer.wallet.signingStargateClient.signAndBroadcast(
  //     //       relayer.wallet.address,
  //     //       msgs,
  //     //       CHAIN_GAS_MULTIPLIER
  //     //     )
  //     // }

  //     // Get new balance of relayer wallet.
  //     const newBalance = HugeDecimal.from(
  //       await relayer.client.query.bank.balance(
  //         relayer.relayerAddress,
  //         relayer.feeToken.denomOrAddress
  //       )
  //     )
  //     setFundedAmount((prev) => ({
  //       ...prev,
  //       [chainId]: newBalance,
  //     }))

  //     // Authorize the user's wallet to be able to send funds on behalf of the
  //     // relayer wallet, in case anything goes wrong, so they can recover the
  //     // funds.

  //     // Set expiration to 10 years.
  //     const expiration = new Date()
  //     expiration.setFullYear(expiration.getFullYear() + 10)
  //     // Encoder needs a whole number of seconds.
  //     expiration.setMilliseconds(0)

  //     await relayer.client.sign.signAndBroadcast(
  //       relayer.relayerAddress,
  //       [
  //         {
  //           typeUrl: MsgGrant.typeUrl,
  //           value: {
  //             granter: relayer.relayerAddress,
  //             grantee: relayer.wallet.address,
  //             grant: {
  //               authorization: SendAuthorization.toProtoMsg(
  //                 SendAuthorization.fromPartial({
  //                   spendLimit: coins(
  //                     newBalance.toString(),
  //                     relayer.feeToken.denomOrAddress
  //                   ),
  //                 })
  //               ),
  //               expiration: toTimestamp(expiration),
  //             },
  //           } as MsgGrantEncoder,
  //         },
  //       ],
  //       CHAIN_GAS_MULTIPLIER
  //     )

  //     // Begin relay.
  //     if (withExecuteRelay) {
  //       if (transaction.type === 'execute') {
  //         setExecuteTx(newExecuteTxResult)
  //         relay(newExecuteTxResult)
  //       } else {
  //         const tx = await relayer.client.sign.getTx(transaction.hash)
  //         if (!tx) {
  //           throw new Error(t('error.txNotFound'))
  //         }

  //         setExecuteTx(tx)
  //         relay(tx)
  //       }
  //     }
  //   } catch (err) {
  //     console.error(err)
  //     toast.error(processError(err))
  //   } finally {
  //     setFundingRelayer((prev) => ({
  //       ...prev,
  //       [chainId]: false,
  //     }))
  //     refreshBalances(relayer)
  //   }
  // }

  // const refreshPolytoneResults = useRecoilCallback(
  //   ({ set }) =>
  //     () => {
  //       set(refreshIbcDataAtom(chainId), (id) => id + 1)
  //       set(refreshPolytoneListenerResultsAtom, (id) => id + 1)
  //     },
  //   useDeepCompareMemoize([chainId])
  // )

  // const relay = async (_executeTx?: typeof executeTx) => {
  //   const currentExecuteTx = _executeTx || executeTx

  //   if (!relayers || !mnemonicKey) {
  //     toast.error(t('error.relayerNotSetUp'))
  //     return
  //   }

  //   if (!currentExecuteTx) {
  //     toast.error(t('error.txNotFound'))
  //     return
  //   }

  //   setStatus(HeadstashStatus.Relaying)
  //   setRelayError(undefined)
  //   setRelaying({
  //     type: 'packet',
  //     relayer: relayers[1],
  //   })

  //   try {
  //     // Parse the packets from the execution TX events.
  //     const txPackets = parsePacketsFromTendermintEvents(
  //       currentExecuteTx.events
  //     ).map((packet) => ({
  //       packet,
  //       height: currentExecuteTx.height,
  //     }))

  //     // Wait a few seconds for the TX to be indexed.
  //     await new Promise((resolve) => setTimeout(resolve, 5000))

  //     // First relayer is current chain that is sending packets. The rest of the
  //     // relayers are the chains that are receiving packets. Relay and ack
  //     // packets sequentially, one chain at a time, since a wallet can only
  //     // submit one TX at a time.
  //     await relayers.slice(1).reduce(async (prev, relayer) => {
  //       // Wait for previous chain to finish relaying packets.
  //       await prev

  //       const { chain, client } = relayer

  //       // Get packets for this chain that need relaying.
  //       const packets = crossChainPackets.filter(
  //         ({ data: { chainId } }) => chainId === chain.chainId
  //       )

  //       // Choose TX packets that match packets we want to relay.
  //       const chainPackets = txPackets.filter(({ packet }) =>
  //         packets.some(
  //           ({ srcPort, dstPort }) =>
  //             packet.sourcePort === srcPort &&
  //             packet.destinationPort === dstPort
  //         )
  //       )
  //       if (!chainPackets.length) {
  //         return
  //       }

  //       setRelaying({
  //         type: 'packet',
  //         relayer,
  //       })

  //       // Get unique source channels and connections.
  //       const srcConnections = (
  //         await Promise.all(
  //           uniq(chainPackets.map(({ packet }) => packet.sourceChannel)).map(
  //             async (channel) => ({
  //               channel,
  //               connection: (
  //                 await relayers[0].client.query.ibc.channel.channel(
  //                   chainPackets.find(
  //                     ({ packet }) => packet.sourceChannel === channel
  //                   )!.packet.sourcePort,
  //                   channel
  //                 )
  //               ).channel?.connectionHops[0],
  //             })
  //           )
  //         )
  //       ).flatMap(({ channel, connection }) =>
  //         connection ? { channel, connection } : []
  //       )

  //       // Get connections for channels.
  //       const connections = (
  //         await Promise.all(
  //           srcConnections
  //             .reduce(
  //               (acc, { channel, connection }) => {
  //                 let existing = acc.find((a) => a.src === connection)
  //                 if (!existing) {
  //                   existing = {
  //                     src: connection,
  //                     packets: [],
  //                   }
  //                   acc.push(existing)
  //                 }

  //                 // Find packets coming from the same channel.
  //                 existing.packets.push(
  //                   ...chainPackets.filter(
  //                     ({ packet }) => packet.sourceChannel === channel
  //                   )
  //                 )

  //                 return acc
  //               },
  //               [] as { src: string; packets: PacketWithMetadata[] }[]
  //             )
  //             .map(async (data) => ({
  //               ...data,
  //               dst: (
  //                 await relayers[0].client.query.ibc.connection.connection(
  //                   data.src
  //                 )
  //               ).connection?.counterparty.connectionId,
  //             }))
  //         )
  //       ).flatMap(({ src, dst, packets }) => (dst ? { src, dst, packets } : []))

  //       if (!connections.length) {
  //         throw new Error(t('error.failedToLoadIbcConnection'))
  //       }

  //       // Run relay process for each connection pair on this chain.
  //       for (const {
  //         src: srcConnection,
  //         dst: dstConnection,
  //         packets,
  //       } of connections) {
  //         const link = await Link.createWithExistingConnections(
  //           // First relayer is current chain sending packets.
  //           relayers[0].client,
  //           client,
  //           srcConnection,
  //           dstConnection
  //         )

  //         // Get packets with unique source channel/port and destination
  //         // channel/port combinations.
  //         const uniquePackets = uniq(
  //           packets.map((p) =>
  //             [
  //               p.packet.sourceChannel,
  //               p.packet.sourcePort,
  //               p.packet.destinationChannel,
  //               p.packet.destinationPort,
  //             ].join('/')
  //           )
  //         ).map((key) => {
  //           const [srcChannel, srcPort, dstChannel, dstPort] = key.split('/')
  //           return {
  //             srcChannel,
  //             srcPort,
  //             dstChannel,
  //             dstPort,
  //           }
  //         })

  //         setRelaying({
  //           type: 'packet',
  //           relayer,
  //         })

  //         const packetSequences = packets.map(({ packet }) =>
  //           Number(packet.sequence)
  //         )

  //         // Relay packets. Try 5 times.
  //         let tries = 5
  //         while (tries) {
  //           try {
  //             const unrelayedPackets = (
  //               await Promise.all(
  //                 uniquePackets.map(
  //                   async ({ dstChannel, dstPort }) =>
  //                     (
  //                       await client.query.ibc.channel.unreceivedPackets(
  //                         dstPort,
  //                         dstChannel,
  //                         packetSequences
  //                       )
  //                     ).sequences
  //                 )
  //               )
  //             ).flat()

  //             const packetsNeedingRelay = packets.filter(({ packet }) =>
  //               unrelayedPackets.includes(packet.sequence)
  //             )

  //             // Relay only the packets that need relaying.
  //             if (packetsNeedingRelay.length) {
  //               await link.relayPackets('A', packetsNeedingRelay)
  //             }

  //             break
  //           } catch (err) {
  //             // If relayer wallet out of funds, throw immediately since they
  //             // need to top up.
  //             if (
  //               err instanceof Error &&
  //               err.message.includes('insufficient funds')
  //             ) {
  //               // Refresh all balances.
  //               relayers.map(refreshBalances)
  //               console.error(err)
  //               // Increase multipler by 25% so we retry with more funds than
  //               // before.
  //               setFundsNeededRetryMultiplier((m) => m + 0.25)
  //               throw new Error(t('error.relayerWalletNeedsFunds'))
  //             }

  //             tries -= 1

  //             console.error(
  //               t('error.failedToRelayPackets', {
  //                 chain: getDisplayNameForChainId(chain.chainId),
  //               }) + (tries > 0 ? ' ' + t('info.tryingAgain') : ''),
  //               err
  //             )

  //             // If no more tries, rethrow error.
  //             if (tries === 0) {
  //               throw err
  //             }

  //             // Wait a few seconds before trying again.
  //             await new Promise((resolve) => setTimeout(resolve, 5000))
  //           }
  //         }

  //         // Wait a few seconds for the packets to be indexed.
  //         await new Promise((resolve) => setTimeout(resolve, 5000))

  //         setRelaying({
  //           type: 'ack',
  //           relayer,
  //         })

  //         // Relay acks. Try 5 times.
  //         tries = 5
  //         while (tries) {
  //           try {
  //             // Find acks that need relaying.
  //             const smallestSequenceNumber = Math.min(...packetSequences)
  //             const largestSequenceNumber = Math.max(...packetSequences)
  //             const txSearch = (
  //               await Promise.all(
  //                 uniquePackets.map(
  //                   async ({ srcChannel, srcPort }) =>
  //                     // Just search one page (instead of all pages via
  //                     // txSearchAll) because it incorrectly paginates sometimes
  //                     // and throws an error.
  //                     (
  //                       await link.endB.client.tm.txSearch({
  //                         query: `write_acknowledgement.packet_connection='${dstConnection}' AND write_acknowledgement.packet_src_port='${srcPort}' AND write_acknowledgement.packet_src_channel='${srcChannel}' AND write_acknowledgement.packet_sequence>=${smallestSequenceNumber} AND write_acknowledgement.packet_sequence<=${largestSequenceNumber}`,
  //                       })
  //                     ).txs
  //                 )
  //               )
  //             ).flat()

  //             const allAcks = txSearch.flatMap(({ height, result, hash }) => {
  //               const events = result.events.map(fromTendermintEvent)
  //               return parseAcksFromTxEvents(events).map(
  //                 (ack): AckWithMetadata => ({
  //                   height,
  //                   txHash: toHex(hash).toUpperCase(),
  //                   txEvents: events,
  //                   ...ack,
  //                 })
  //               )
  //             })

  //             const unrelayedAcks = (
  //               await Promise.all(
  //                 uniquePackets.map(
  //                   async ({ srcChannel, srcPort }) =>
  //                     // First relayer is current chain sending packets/getting
  //                     // acks.
  //                     (
  //                       await relayers[0].client.query.ibc.channel.unreceivedAcks(
  //                         srcPort,
  //                         srcChannel,
  //                         allAcks.map(({ originalPacket }) =>
  //                           Number(originalPacket.sequence)
  //                         )
  //                       )
  //                     ).sequences
  //                 )
  //               )
  //             ).flat()

  //             const acksNeedingRelay = allAcks.filter(({ originalPacket }) =>
  //               unrelayedAcks.includes(originalPacket.sequence)
  //             )

  //             // Acknowledge only the packets that need relaying.
  //             if (acksNeedingRelay.length) {
  //               await link.relayAcks('B', acksNeedingRelay)
  //             }

  //             break
  //           } catch (err) {
  //             // If relayer wallet out of funds, throw immediately since they
  //             // need to top up.
  //             if (
  //               err instanceof Error &&
  //               err.message.includes('insufficient funds')
  //             ) {
  //               // Refresh all balances.
  //               relayers.map(refreshBalances)
  //               console.error(err)
  //               // Increase multipler by 25% so we retry with more funds than
  //               // before.
  //               setFundsNeededRetryMultiplier((m) => m + 0.25)
  //               throw new Error(t('error.relayerWalletNeedsFunds'))
  //             }

  //             tries -= 1

  //             console.error(
  //               t('error.failedToRelayAcks', {
  //                 chain: getDisplayNameForChainId(chain.chainId),
  //               }) + (tries > 0 ? ' ' + t('info.tryingAgain') : ''),
  //               err
  //             )

  //             // If no more tries, rethrow error.
  //             if (tries === 0) {
  //               throw err
  //             }

  //             // Wait a few seconds before trying again.
  //             await new Promise((resolve) =>
  //               setTimeout(
  //                 resolve,
  //                 // If redundant packets detected, a relayer already relayed
  //                 // these acks. In that case, wait a bit longer to let it
  //                 // finish. The ack relayer above tries to check which acks
  //                 // have not yet been received, so if a relayer takes care of
  //                 // the acks, we will safely continue.
  //                 err instanceof Error && err.message.includes('redundant')
  //                   ? 10 * 1000
  //                   : 5 * 1000
  //               )
  //             )
  //           }
  //         }
  //       }
  //     }, Promise.resolve())

  //     // If packets and acks were relayed successfully, execute was successful.
  //     setExecuteTx(undefined)
  //     setRelaying(undefined)
  //   } catch (err) {
  //     console.error(err)
  //     setRelayError(processError(err))
  //     setStatus(HeadstashStatus.RelayErrored)
  //     return
  //   } finally {
  //     // Refresh all balances.
  //     relayers.map(refreshBalances)

  //     // Refresh all polytone results.
  //     refreshPolytoneResults()
  //   }

  //   await refundAllRelayers()
  // }

  // Refund all relayers that have remaining tokens.
  // const refundAllRelayers = async (cancel = false) => {
  //   if (!relayers || !mnemonicKey) {
  //     toast.error(t('error.relayerNotSetUp'))
  //     return
  //   }

  //   if (cancel) {
  //     setCanceling(true)
  //   }

  //   // If relay was successful, refund remaining tokens from relayer wallet back
  //   // to user on all chains.
  //   setStatus(HeadstashStatus.Refunding)
  //   try {
  //     await Promise.all(
  //       relayers.map(({ chain }) => refundRelayer(chain.chainId))
  //     )

  //     // Clear mnemonic from local storage since all wallets should be empty now
  //     // (if all refunds completed successfully).
  //     localStorage.removeItem(mnemonicKey)

  //     setStatus(
  //       cancel || canceling ? HeadstashStatus.Canceled : HeadstashStatus.Success
  //     )
  //   } catch (err) {
  //     setStatus(HeadstashStatus.RefundingErrored)

  //     console.error(err)
  //     toast.error(processError(err))
  //   }
  // }

  // Return remaining tokens from IBC client relayer wallet back to user.
  // const refundRelayer = async (chainId: string) => {
  //   const relayer = relayers?.find(({ chain }) => chain.chainId === chainId)
  //   if (!relayer) {
  //     throw new Error(t('error.relayerNotSetUp'))
  //   }

  //   const { chain, client, relayerAddress, wallet } = relayer

  //   const feeDenom = chain.chainRegistry?.fees?.fee_tokens[0]?.denom
  //   if (!feeDenom) {
  //     throw new Error(t('error.feeTokenNotFound'))
  //   }

  //   try {
  //     const remainingTokens = await client.query.bank.balance(
  //       relayerAddress,
  //       feeDenom
  //     )
  //     if (remainingTokens.amount === '0') {
  //       return
  //     }

  //     // Compute fees needed to send and subtract from remaining tokens.
  //     const gasUsed = await client.sign.simulate(
  //       relayerAddress,
  //       [
  //         cwMsgToEncodeObject(
  //           chain.chainId,
  //           {
  //             bank: makeBankMessage(
  //               remainingTokens.amount,
  //               wallet.address,
  //               feeDenom
  //             ),
  //           },
  //           relayerAddress
  //         ),
  //       ],
  //       undefined
  //     )
  //     const fee = calculateFee(
  //       Math.round(gasUsed * CHAIN_GAS_MULTIPLIER),
  //       // @ts-ignore
  //       client.gasPrice
  //     )
  //     const remainingTokensAfterFee = HugeDecimal.from(remainingTokens).minus(
  //       fee.amount[0]
  //     )

  //     // Send remaining tokens if there are more than enough to pay the fee.
  //     if (remainingTokensAfterFee.isPositive()) {
  //       await client.sign.sendTokens(
  //         relayerAddress,
  //         wallet.address,
  //         remainingTokensAfterFee.toCoins(feeDenom),
  //         fee
  //       )

  //       setRefundedAmount((prev) => ({
  //         ...prev,
  //         [chainId]: remainingTokensAfterFee,
  //       }))
  //     }
  //     // Don't catch error. Throw to caller.
  //   } finally {
  //     refreshBalances(relayer)
  //   }
  // }

  // const RelayIcon = !relaying || relaying.type === 'packet' ? Send : Verified

  return (
    <Modal
      containerClassName="w-full !max-w-lg"
      header={{
        title: t('title.relay'),
        subtitle: t('info.selfRelayDescription'),
      }}
      onClose={
        // Only allow closing if execution and relaying has not begun. This
        // prevents accidentally closing the modal in the middle of the process.
        status === HeadstashStatus.Uninitialized ||
          status === HeadstashStatus.Initializing ||
          status === HeadstashStatus.Funding
          ? onClose
          : undefined
      }
      visible={visible}
    >
      <SteppedWalkthrough
        className="w-full"
        stepIndex={
          status === HeadstashStatus.Uninitialized ||
            status === HeadstashStatus.Initializing
            ? 0
            : status === HeadstashStatus.Funding ||
              status === HeadstashStatus.Executing
              ? 1
              : status === HeadstashStatus.Relaying ||
                status === HeadstashStatus.RelayErrored
                ? 2
                : status === HeadstashStatus.Refunding ||
                  status === HeadstashStatus.RefundingErrored
                  ? 3
                  : 4
        }
        steps={[
          {
            label: t('title.start'),
            content: () => (
              <div className="flex flex-col gap-4">
                <p>
                  To claim your headstash, you must generate an offline
                  signature from the wallet eligible to claim. This signature
                  will include the bech32 address that you want to claim your
                  headstash.
                </p>

                <p>
                  This signature does not require any gas payments, does not
                  interact, grant authorization or involve funds held by your
                  acount, and verifies only you can claim your private
                  headstash.
                </p>

                <p>
                  Your throwaway wallet is generated and stored 100% on your
                  local device.
                </p>
                {/* TODO:  display eligible amount */}
                <Button
                  className="self-end"
                  loading={status === HeadstashStatus.Initializing}
                  onClick={isWalletConnected ? setupThrowawayWallet : connect}
                >
                  {isWalletConnected ? t('button.begin') : t('button.connect')}
                </Button>
              </div>
            ),
          },
          {
            label: t('title.generateOfflineSignature'),
            // Show when this step is current or past. This makes sure the
            // funded balances are visible once the relayer is funded.
            overrideShowStepContentStatuses: ['current', 'past'],
            content: (stepStatus) => (
              <div className="flex flex-col gap-4">
                <p>Lets generate the offline signature now!</p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                  {/* TODO:  display button based on eth or sol  being used to sign */}

                  {/* {[
                    // Receiving chains first.
                    ...(relayers?.slice(1) ?? []),
                    // Current chain last. This includes the execute.
                    ...(relayers ? [relayers[0]] : []),
                  ].map(({ chain: { chainId }, chainImageUrl }, index) => {
                    // Adjust the index to reflect the reordering above.
                    index = (index + 1) % relayers!.length

                    const fundTokenWithBalance =
                      walletFunds.loading || walletFunds.errored
                        ? undefined
                        : walletFunds.data[index]

                    const walletCannotAfford =
                      !walletFunds.loading &&
                      !(walletFundsSufficient?.[index] ?? false)

                    const funds =
                      !relayerFunds.loading && !relayerFunds.errored
                        ? HugeDecimal.from(relayerFunds.data[index])
                        : // Use the previously funded amount if the step is past.
                          (fundedAmount[chainId] ?? HugeDecimal.zero)
                    const empty = funds.isZero()

                    const funded = funds.gte(
                      getRelayerFundsRef.current(chainId)
                    )

                    const isExecute = index === 0
                    // If this is the execute, we need to make sure all
                    // receiving relayers are funded first.
                    const cannotExecuteUntilFunded =
                      isExecute && !allReceivingRelayersFunded

                    const showFundOrExecuteButton =
                      stepStatus === 'current' && (!funded || isExecute)

                    return (
                      <Fragment key={chainId}>
                        <div className="flex flex-row items-center gap-2">
                          <div
                            className="h-6 w-6 bg-contain bg-center bg-no-repeat"
                            style={{
                              backgroundImage: `url(${chainImageUrl})`,
                            }}
                          ></div>

                          <p className="primary-text shrink-0">
                            {getDisplayNameForChainId(chainId)}
                          </p>
                        </div>

                        {showFundOrExecuteButton ? (
                          <Tooltip
                            title={
                              walletCannotAfford && fundTokenWithBalance
                                ? t('error.insufficientWalletBalance', {
                                    amount: HugeDecimal.from(
                                      fundTokenWithBalance.balance
                                    ).toInternationalizedHumanReadableString({
                                      decimals:
                                        fundTokenWithBalance.token.decimals,
                                    }),
                                    tokenSymbol:
                                      fundTokenWithBalance.token.symbol,
                                  })
                                : cannotExecuteUntilFunded
                                  ? `Fund the other relayer${
                                      chains.length > 2 ? 's' : ''
                                    } before executing.`
                                  : undefined
                            }
                          >
                            <Button
                              center
                              className="w-36 justify-self-end"
                              disabled={
                                walletCannotAfford || cannotExecuteUntilFunded
                              }
                              loading={
                                !!fundingRelayer[chainId] ||
                                walletFunds.loading ||
                                walletFunds.errored
                              }
                              onClick={() => fundRelayer(chainId, isExecute)}
                            >
                              {isExecute
                                ? funded
                                  ? transaction.type === 'execute'
                                    ? t('button.execute')
                                    : t('button.relay')
                                  : transaction.type === 'execute'
                                    ? t('button.fundAndExecute')
                                    : t('button.fundAndRelay')
                                : empty
                                  ? t('button.fund')
                                  : t('button.topUp')}
                            </Button>
                          </Tooltip>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <TokenAmountDisplay
                              amount={funds}
                              decimals={
                                fundTokenWithBalance?.token.decimals ?? 0
                              }
                              symbol={
                                fundTokenWithBalance?.token.symbol ?? '...'
                              }
                            />

                            <Tooltip title={t('info.funded')}>
                              <Check className="text-icon-interactive-valid !h-4 !w-4" />
                            </Tooltip>
                          </div>
                        )}
                      </Fragment>
                    )
                  })} */}
                </div>
              </div>
            ),
          },
          // {
          //   OverrideIcon:
          //     status === HeadstashStatus.RelayErrored ? Close : undefined,
          //   iconContainerClassName:
          //     status === HeadstashStatus.RelayErrored
          //       ? '!bg-icon-interactive-error'
          //       : undefined,
          //   label: t('title.relay'),
          //   content: () =>
          //     status === HeadstashStatus.RelayErrored ? (
          //       <div className="flex flex-row flex-wrap items-center justify-between gap-x-8 gap-y-4">
          //         <p className="text-text-interactive-error break-all">
          //           {relayError}
          //         </p>

          //         <div className="flex grow flex-row items-stretch justify-end gap-2">
          //           <Button
          //             onClick={() => refundAllRelayers(true)}
          //             variant="secondary"
          //           >
          //             {t('button.refundAndCancel')}
          //           </Button>

          //           <Button onClick={() => setStatus(HeadstashStatus.Funding)}>
          //             {t('button.retry')}
          //           </Button>
          //         </div>
          //       </div>
          //     ) : (
          //       relayers &&
          //       relaying && (
          //         <FlyingAnimation
          //           destination={
          //             <Tooltip
          //               title={getDisplayNameForChainId(
          //                 relaying.relayer.chain.chainId
          //               )}
          //             >
          //               <div className="bg-background-base flex items-center justify-center rounded-l-full p-1">
          //                 <div
          //                   className="h-8 w-8 rounded-full bg-contain bg-center bg-no-repeat"
          //                   style={{
          //                     backgroundImage: `url(${relaying.relayer.chainImageUrl})`,
          //                   }}
          //                 ></div>
          //               </div>
          //             </Tooltip>
          //           }
          //           flyer={
          //             <RelayIcon className="text-icon-interactive-primary !h-5 !w-5" />
          //           }
          //           reversed={relaying.type === 'ack'}
          //           source={
          //             // First chain is current source chain.
          //             <Tooltip
          //               title={getDisplayNameForChainId(
          //                 relayers[0].chain.chainId
          //               )}
          //             >
          //               <div className="bg-background-base flex items-center justify-center rounded-r-full p-1">
          //                 <div
          //                   className="h-8 w-8 rounded-full bg-contain bg-center bg-no-repeat"
          //                   style={{
          //                     backgroundImage: `url(${relayers[0].chainImageUrl})`,
          //                   }}
          //                 ></div>
          //               </div>
          //             </Tooltip>
          //           }
          //         />
          //       )
          //     ),
          // },
          {
            label: t('title.claimHeadstash'),
            // Show when this step is current or past. This makes sure the
            // refund balances are visible once the success step is reached.
            overrideShowStepContentStatuses: ['current', 'past'],
            content: (stepStatus) => (
              <div className="flex flex-col gap-4">
                <p>
                  You are ready to claim your headstash! Select the amount you
                  wish to claim
                </p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                  {/* {[
                    // Match the order of the funding step above with the
                    // current chain execute last.

                    // Receiving chains first.
                    ...(relayers?.slice(1) ?? []),
                    // Current chain last.
                    ...(relayers ? [relayers[0]] : []),
                  ].map(
                    (
                      { chain: { chainId }, chainImageUrl, feeToken },
                      index
                    ) => {
                      // Adjust the index to reflect the reordering above.
                      index = (index + 1) % relayers!.length

                      const funds =
                        !relayerFunds.loading && !relayerFunds.errored
                          ? HugeDecimal.from(relayerFunds.data[index])
                          : HugeDecimal.zero
                      const empty = funds.isZero()

                      const refunded =
                        refundedAmount[chainId] ?? HugeDecimal.zero

                      return (
                        <Fragment key={chainId}>
                          <div className="flex flex-row items-center gap-2">
                            <div
                              className="h-6 w-6 bg-contain bg-center bg-no-repeat"
                              style={{
                                backgroundImage: `url(${chainImageUrl})`,
                              }}
                            ></div>

                            <p className="primary-text shrink-0">
                              {getDisplayNameForChainId(chainId)}
                            </p>
                          </div>

                          <div className="flex items-center justify-end gap-2">
                            <TokenAmountDisplay
                              amount={empty ? refunded : funds}
                              decimals={feeToken.decimals}
                              symbol={feeToken.symbol}
                            />

                            {empty ? (
                              <Tooltip title="Refunded">
                                <Check className="text-icon-interactive-valid !h-4 !w-4" />
                              </Tooltip>
                            ) : (
                              <Loader fill={false} size={20} />
                            )}
                          </div>
                        </Fragment>
                      )
                    }
                  )} */}
                </div>

                {stepStatus === 'current' && (
                  <Button
                    className="self-end"
                    loading={status === HeadstashStatus.Refunding}
                    onClick={() => { }}
                    // onClick={() => refundAllRelayers()}
                    size="sm"
                  >
                    {t('button.retry')}
                  </Button>
                )}
              </div>
            ),
          },
          {
            label: t('title.success'), // canceling ? t('title.canceled') : t('title.success'),
            content: () => (
              <div className="flex flex-row flex-wrap items-center justify-between gap-x-8 gap-y-4">
                <p>
                  The headstash claim succeeded
                  {/* {' '}
                  {canceling ? 'was canceled' : 'succeeded'}. */}
                </p>

                {/* todo: set link for navigating to bloom component */}

                <Button
                  onClick={() => {
                    status === HeadstashStatus.Success && onSuccess()
                    onClose?.()
                  }}
                >
                  {t('button.close')}
                </Button>
              </div>
            ),
          },
        ]}
        textClassName="!title-text"
      />
    </Modal>
  )
}
