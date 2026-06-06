import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import { AminoSignResponse, StdSignDoc, makeSignDoc } from '@cosmjs/amino'
import { CheckInSignatureData, GuestScannedData, GuestSignatureData } from '@dao-dao/types'
import { useEffect, useState, useMemo } from 'react'
import toast from 'react-hot-toast'
import { useRecoilValue } from 'recoil'

import { useTranslation } from 'react-i18next'
import { toHex, toUtf8 } from '@cosmjs/encoding'
import { Any } from '@dao-dao/types/protobuf/codegen/google/protobuf/any'
import { useAwaitNextBlock, useWallet } from '../../../../hooks'
import { CHAIN_GAS_MULTIPLIER, processError, signOffChainAuth } from '@dao-dao/utils'
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx'




export type CheckIntoEventStatus = 'idle' | 'checkIn' | 'checkingIn'


export type GuestCheckIntoEventFunction = (
  data: GuestScannedData,
  callbacks?: {
    /**
     * Status updates handler
     */
    setGuestCheckingInStatus?: (
      chainId: string,
      daoAddr: string,
      status: CheckIntoEventStatus
    ) => void
  }
) => Promise<AminoSignResponse>

export type UsherCheckGuestIntoEventFunction = (
  data: GuestSignatureData,
  callbacks?: {
    /**
     * Status updates handler
     */
    setUsherCheckingInGuestStatus?: (
      chainId: string,
      daoAddr: string,
      status: CheckIntoEventStatus
    ) => void
  }
) => Promise<void>


export type UseAveEventProps = {
  /**
   * Optionally specify the chain to attempt to load from. Defaults to the
   * current context.
   */
  chainId?: string
  /**
   * The wallet address to get dnas information for. Defaults to the
   * currently connected wallet.
   */
  address?: string
  /**
   * The dao address to get dnas information for.
   */
  daoAddress?: string
  /**
   * Whether or not to only load supported chains. Defaults to false.
   */
  onlySupported?: boolean
  /**
   * The CwAve contract address for event operations
   */
  contractAddress?: string
}



export type UseAvEventsReturn = {
  fetchAvEventDetails: (address: string) => void
  // fetchThrowawayWallet: (walletAddr: string) => Promise<DirectSecp256k1HdWallet>
  usherCheckGuestIntoEvent: {
    ready: boolean
    checkingIn: CheckIntoEventStatus
    go: UsherCheckGuestIntoEventFunction
  }
  guestCheckIntoEvent: {
    ready: boolean
    checkingIn: CheckIntoEventStatus
    go: GuestCheckIntoEventFunction
  }

}


export const useAvEvent = ({
  chainId,
  address,
  daoAddress,
  onlySupported = false,
}: UseAveEventProps = {}): UseAvEventsReturn => {
  const {
    chain: { chainId: walletChainId },
    chainWallet: currentChainWallet,
    hexPublicKey: currentHexPublicKey,
    address: walletAddress = '',
    isWalletConnected,
    isWalletConnecting,
    getSigningClient,
  } = useWallet({
    chainId,
    loadAccount: true,
  })

  const { t } = useTranslation()

  const [usherCheckinGuestToEventStatus, setUsherCheckinGuestToEventStatus] =
    useState<CheckIntoEventStatus>('idle')
  const [guestCheckIntoEventStatus, setGuestCheckintoEventStatus] =
    useState<CheckIntoEventStatus>('idle')

  const fetchAvEventDetails = async () => {
    try {
      // setLoading(true)
      // Reset loading state
      // setLoading(false)
    } catch (err) {
      console.error(err)
      // setLoading(false)
    }
  }

  /**
   * Guest function to generate offline signature for qr code
   */
  const guestCheckIntoEvent: GuestCheckIntoEventFunction = async (props) => {
    if (!currentChainWallet) {
      throw new Error(t('error.logInToContinue'))
    }
    setGuestCheckintoEventStatus('checkIn')

    let error: unknown
    try {
      const mainWallet = currentChainWallet.mainWallet


      // Make sure the chain is connected.
      if (!mainWallet.isWalletConnected) {
        await mainWallet.connect(false)
      }

      // If still not connected, error.
      if (!mainWallet.isWalletConnected) {
        throw new Error(t('error.failedToConnect'))
      }

      // Get the account public key.
      const { address, pubkey: pubkeyData } =
        (await mainWallet.client.getAccount?.(walletChainId)) ?? {}
      if (!address || !pubkeyData) {
        throw new Error(t('error.failedToGetAccountFromWallet'))
      }

      const offlineSignerAmino =
        (await mainWallet.client.getOfflineSignerAmino?.(walletChainId)) ||
        // Fallback to normal signer function in case amino signer getter is
        // undefined. This may still return an amino signer, so let's check.
        (await mainWallet.client.getOfflineSigner?.(walletChainId))
      if (!offlineSignerAmino || !('signAmino' in offlineSignerAmino)) {
        throw new Error(
          t('error.unsupportedAminoWallet', {
            name: mainWallet.walletPrettyName,
          })
        )
      }



      const hexPublicKey = toHex(pubkeyData)

      // Generate data to sign.
      const signDocAmino = makeSignDoc(
        [
          {
            type: 'sign/MsgSignData',
            value: {
              signer: address,
              data: JSON.stringify(props, undefined, 2),
            },
          },
        ],
        {
          gas: '0',
          amount: [],
        },
        '',
        '',
        0,
        0
      )
      const response = await offlineSignerAmino.signAmino(address, signDocAmino)
      setGuestCheckintoEventStatus('checkingIn')
      return response

      // Add error handling for the API request
      try {


      } catch (apiError: any) {

      }
    } catch (err) {
      // Set error to be thrown after finally block.
      error = err
    } finally {
      // Reset status.
      setGuestCheckintoEventStatus('idle')
    }

    // Throw error on failure. This allows the finally block above to run by
    // throwing the error after the entire try clause.
    if (error) {
      throw error
    }

    return {} as AminoSignResponse
  }
  /**
   * Usher function to checkin guest to an event
   */
  const usherCheckinGuestToEvent: UsherCheckGuestIntoEventFunction = async (props) => {
    if (!currentChainWallet) {
      throw new Error(t('error.logInToContinue'))
    }
    setUsherCheckinGuestToEventStatus('checkIn')

    const awaitNextBlock = useAwaitNextBlock()

    let error: unknown
    try {
      await (
        await getSigningClient()
      ).signAndBroadcast(
        walletAddress,
        [

          // Prepare
          {
            typeUrl: MsgExecuteContract.typeUrl,
            value: MsgExecuteContract.fromPartial({
              sender: walletAddress,
              contract: props.eventContractAddr,
              msg: toUtf8(
                JSON.stringify({
                  check_in_guest: {
                    checkin: {
                      signature: props.signature,
                      signed_data: toUtf8(JSON.stringify({
                        event_contract_addr: props.eventContractAddr,
                        usher_wallet_addr: walletAddress,
                        event_segment_id: props.eventSegmentId
                      })),
                      ticket_addr: props.guestWalletAddress,
                      pubkey: props.publicKeyJson,
                    }
                  },
                })
              ),
              funds: []
            }),
          },
        ],
        CHAIN_GAS_MULTIPLIER
      )

      // New balances will not appear until the next block.
      await awaitNextBlock()

      toast.success(
        t('success.checkedInGuest', {})
      )


    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
    }

    if (error) {
      throw error
    }
  }

  return {
    // fetchThrowawayWallet,
    fetchAvEventDetails,
    usherCheckGuestIntoEvent: {
      ready: false,
      checkingIn: 'idle',
      go: usherCheckinGuestToEvent,
    },
    guestCheckIntoEvent: {
      ready: false,
      checkingIn: 'idle',
      go: guestCheckIntoEvent,
    }

  }
}
