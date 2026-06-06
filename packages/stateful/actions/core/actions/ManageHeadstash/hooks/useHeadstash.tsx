import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { fetchOrGenerateThrowawayWallet } from '../queries'
import {
  HeadstashAllocation,
  HeadstashInstance,
  SigDetails,
  initialAmountDetails,
  initialSigDetails,
} from '../types'

export type FetchAmountStatus =
  | 'loading'
  | 'no_allocation'
  | 'amounts_fetched'
  | 'not_fetched_yet'
export type FetchProofStatus =
  | 'loading'
  | 'no_proofs'
  | 'proofs_fetched'
  | 'not_fetched_yet'
export type ClaimHeadstashStatus = 'idle' | 'headstash' | 'claiming'
export type BloomActionStatus = 'idle' | 'bloom' | 'blooming'

export type BloomFunction = {
  destChainId: string
  bloomAddr?: string
  setBloomerAddr: (addr: string) => void
}
export type ClaimHeadstashFunction = {}
export type UseHeadstashOptions = {}

export type UseHeadstashReturn = {
  // function to update status of fetching the eligible data
  // fetchAmountStatus: FetchAmountStatus
  // setFetchEligibleStatus: (state: FetchAmountStatus) => void
  // function to set the recieved response to form
  // setAmountDetails: (amountDetails: HeadstashAllocation) => void
  // amountDetails?: HeadstashAllocation
  // setHeadstashItems: (headstashItems: HeadstashItem[]) => void
  // setThrowawayWallet: (throwaway: ThrowawayWallet) => void
  // throwawayWallet: ThrowawayWallet
  // query that returns config of a specific headstash instance
  fetchHeadstashDetails: (address: string) => void
  fetchThrowawayWallet: (walletAddr: string) => Promise<DirectSecp256k1HdWallet>
  headstash: HeadstashInstance
  // objects holding functions specific to claiming headstash
  claimHeadstash: {
    ready: boolean
    claiming: ClaimHeadstashStatus
    // handleSolanaConnect: () => void
    // handleEthConnect: () => void
    // signWithEthKeyFunction: (cosmosAddr: string) => void
    // signWithSolKeyFunctiom: (cosmosAddr: string) => void
    go: ClaimHeadstashFunction
  }
  // objects holding functions specific to blooming oncce headstash are claimed
  bloomAction: {
    ready: boolean
    blooming: BloomActionStatus
    go: BloomFunction
  }
}
export function useHeadstash(): UseHeadstashReturn {
  const [modalState, setModalState] = useState(false)
  const [amountState, setFetchAmountStatus] =
    useState<FetchAmountStatus>('not_fetched_yet')
  const [proofState, setProofsState] =
    useState<FetchProofStatus>('not_fetched_yet')

  // todo:  replace with react-hook-form
  const [ethPubkey, setEthPubkey] = useState<string | null>(null)
  const [solPubkey, setSolPubkey] = useState<string | null>(null)
  const [isEthConnected, setIsEthConnected] = useState(false)
  const [isSolConnected, setIsSolConnected] = useState(false)

  const [isFetchingHeadstash, setFetchingHeadstash] = useState(false)
  const [headstashProofs, setHeadstashProofs] = useState<string[] | null>(null)
  const [allocationDetails, setAllocationDetails] =
    useState<HeadstashAllocation | null>(null)
  const [headstashInstance, setHeadstashInstancce] =
    useState<HeadstashInstance | null>(null)
  const [headstashAmount, setHeadstashAmount] = useState<number | null>(null)
  const [sigDetails, setSigDetails] = useState<SigDetails>(initialSigDetails)

  const [loading, setLoading] = useState(true)
  const [isConnected, setIsConnected] = useState<boolean>(false)

  // get solana wallet provider from browser
  const getSolProvider = () => {
    if ('solana' in window) {
      const provider = window.solana as any
      if (provider.isPhantom) {
        return provider
      }
    }
    window.open('https://phantom.app/', '_blank')
  }

  // connect with solana phantom wallet
  const handleSolanaConnect = async () => {
    // connects, checks eligiblility, prompts signature
    try {
      const provider = getSolProvider()
      if (!provider) {
        console.error('Phantom wallet not found')
      } else {
        await provider.connect()
      }
      // setModalState(true)
      handleSolPubkey(Buffer.from(provider.publicKey).toString('base64'))
    } catch (error) {
      console.error(error)
    }
  }

  // handle solana wallet connect
  const handleSolPubkey = (solPubkey: string) => {
    // set pubkey
    setEthPubkey(null)
    setSolPubkey(solPubkey)
  }

  // handle solana wallet connect
  const handleEthPubkey = (ethPubkey: string) => {
    // set pubkey
    setEthPubkey(ethPubkey)
    setSolPubkey(null)
  }

  function getPubkey() {
    return ethPubkey !== null ? ethPubkey : solPubkey
  }

  const handleWalletDisconnect = () => {
    setEthPubkey('')
    setSolPubkey('')
    handleHsDetails(initialAmountDetails, 'not_fetched_yet')
    setSigDetails(initialSigDetails)
    // setThrowawayMap({})
    // setUnEncryptedOfflineSig('')
  }

  // triggers the throwaway wallet modal
  const handleSigModal = async () => {
    setModalState(true)
  }

  // fetch the throwaway keys when fetching headstash information, as we save ephemeral keys in relation to each headstash
  useEffect(() => {
    if (isFetchingHeadstash) {
      const handleFetchingThrowawayKeys = async () => {
        // await fetchThrowawayKeys()
      }
      handleFetchingThrowawayKeys()
    }
  }, [isFetchingHeadstash])

  useEffect(() => {
    // Check if window.ethereum is available
    if (ethPubkey != '') {
      // Listen for wallet disconnect events
      ;(window as any).ethereum.on('disconnect', handleWalletDisconnect)
    } else if (solPubkey != '') {
      // Listen for solana wallet disconnect events
      ;(window as any).solana.on('disconnect', handleWalletDisconnect)
    }

    return () => {
      if (isEthConnected) {
        ;(window as any).ethereum.off('disconnect', handleWalletDisconnect)
      } else if (isSolConnected) {
        ;(window as any).solana.off('disconnect', handleWalletDisconnect)
      }
    }
  }, [isEthConnected, isSolConnected])

  // headstash specific effects
  useEffect(() => {
    if (ethPubkey && ethPubkey !== '') {
      const fetchHeadstash = async (pubkey: string) => {
        try {
          setFetchingHeadstash(true)
          const headstashDetailsAPI = `http://localhost:3001/getHeadstash/${pubkey}`

          const amounts = await fetch(headstashDetailsAPI)
          if (amounts.ok) {
            const result = await amounts.json()
            handleHsDetails(result, 'amounts_fetched')
          } else {
            console.error('cannot get headstash amounts:', amounts.status)
          }
          setFetchingHeadstash(false)
        } catch (err) {
          toast.error(`${err}`)
          console.error(err)
          setFetchingHeadstash(false)
        }
      }
      ;``
      fetchHeadstash(ethPubkey).then(() => {
        handleSigModal().then(() => {
          setEthPubkey(ethPubkey)
        })
      })
    }
  }, [ethPubkey])

  useEffect(() => {
    if (solPubkey && solPubkey !== '' && amountState == 'not_fetched_yet') {
      const fetchHeadstash = async (pubkey: string) => {
        try {
          setFetchingHeadstash(true)
          const headstashDetailsAPI = `http://localhost:3001/getHeadstash/${pubkey}`

          const amounts = await fetch(headstashDetailsAPI)
          if (amounts.ok) {
            const result = await amounts.json()
            handleHsDetails(result, 'amounts_fetched')
          } else {
            console.error('cannot get headstash amounts:', amounts.status)
          }
          setFetchingHeadstash(false)
        } catch (err) {
          toast.error(`${err}`)
          console.error(err)
          setFetchingHeadstash(false)
        }
      }

      fetchHeadstash(solPubkey).then(() => {
        handleSigModal().then(() => {
          setSolPubkey(solPubkey)
        })
      })
    }
  }, [solPubkey, amountState])

  const handleHsDetails = (
    amountDetails: HeadstashAllocation,
    state: FetchAmountStatus
  ) => {
    setAllocationDetails(amountDetails)
    setFetchAmountStatus(state)
  }

  //fetch throwaway wallet keys, or  generate a new one
  const fetchThrowawayWallet = async (walletAddr: string) => {
    return await fetchOrGenerateThrowawayWallet(walletAddr)
  }

  const fetchHeadstashDetails = async () => {
    try {
      // Check if eth_pubkey exists
      if (!ethPubkey) {
        // toast.error('eth_pubkey is required')
        console.error('eth_pubkey is required')
        return
      }

      // Log the HEADSTASH_API_URL to verify it

      setLoading(true)

      const headstashAmountAPI = `http://localhost:3001/getAmount/${ethPubkey}`
      const headstashProofAPI = `http://localhost:3001/getProofs/${ethPubkey}`

      // GET request for amounts
      const amounts = await fetch(headstashAmountAPI)

      if (amounts.ok) {
        const result = await amounts.json()
        const { amount } = result
        // toast.success(`${result}`)
        setHeadstashAmount(amount)
        // setAmountState('amounts_fetch')
      } else {
        console.error('Faucet request failed with status:', amounts.status)
      }
      // console.log("Connected Accounts Allocation:", result);

      // GET request for proofs
      const proofsResponse = await fetch(headstashProofAPI)
      if (proofsResponse.ok) {
        const result = await proofsResponse.json()
        console.log('Headstash Proofs:', result)
        setHeadstashProofs(result)
        setProofsState('proofs_fetched')
      } else {
        console.error(
          'Proofs request failed with status:',
          proofsResponse.status
        )
      }

      // Reset loading state
      setLoading(false)
    } catch (err) {
      //   toast.error(`${err}`)
      console.error(err)
      setLoading(false)
    }
  }

  // create eth sig
  const signWithEthKeyFunction = async (throwawayAddress: string) => {
    try {
      if (!isConnected || !ethPubkey) {
        toast.error(
          'Unable to sign verification message. Please ensure both Metamask & the desired interchain wallet are connected.'
        )
        return
      }

      if (throwawayAddress !== undefined) {
        // await fetchThrowawayKeys()
        const from = ethPubkey

        // define the msg to sign
        const msg = `0x${Buffer.from(`HREAM ~ ${solPubkey} ~ ${throwawayAddress}`, 'utf8').toString('hex')}`

        // trigger metamask
        const sign = await (window as any).ethereum.request({
          method: 'personal_sign',
          params: [msg, from],
        })

        // define sig result type
        const sig = {
          message: throwawayAddress,
          signatureHash: sign,
          address: from,
          timestamp: new Date().toISOString(),
        }
        // let hash = await encrypt_sig(sig.signatureHash)
        // setEncryptedOfflineSig(hash)

        // set values to local-storage
        setSigDetails(sig)
      } else {
        toast.error('Error Updating ethSig.')
      }
    } catch (error) {
      console.error('Error during handleEthSig:', error)
      let errorMessage =
        error instanceof Error ? error.message : JSON.stringify(error)
      toast.error(errorMessage)
    }
  }

  // // sign msg to claim headstash with throwaway wallet, gas fees covered.
  const claimHeadstashMsg = async () => {
    try {
      // todo:  create signing cosmwasm client with secret network from throwaway wallet fetched
      if (headstashInstance?.loading && sigDetails.signatureHash != '') {
        // sets info about signature for msg
        const claim = { sig_addr: getPubkey(), sig: sigDetails.signatureHash }
        console.log(claim)

        // form msg to broadcast
        // const msgExecute = new MsgExecuteContract({
        //     sender: importedSecretjs.address,
        //     contract_address: headstashInstance.contract.addr,
        //     code_hash: headstashInstance.contract.hash,
        //     msg: toUtf8(JSON.stringify(claim)),
        //     sent_funds: []
        // })

        // // broadcast
        // const tx = await secretjs.tx.signTx([msgExecute], {
        //     gasLimit: Math.ceil(parseInt('000000') * 2),
        //     gasPriceInFeeDenom: parseInt('0.05'),
        //     feeDenom: 'uscrt',
        //     feeGranter: feegrantAddress
        // })

        // console.log(tx)
      }
    } catch (error) {
      let errorMessage: string
      if (error instanceof Error) {
        errorMessage = error.message
      } else {
        errorMessage = JSON.stringify(error)
        toast.error(errorMessage)
      }
    }
  }

  const signWithSolKeyFunctiom = async (cosmosAddress: string) => {
    // generate throwaway wallet
    // await fetchThrowawayKeys()

    // form msg to be signed by solana provider
    const throwawayPublicWalletAddr = cosmosAddress
    // todo: grab plaintext set from contract address
    const PLAINTXT_TO_ENCRYPT = Buffer.from(
      `HREAM ~ ${throwawayPublicWalletAddr}`,
      'utf8'
    )

    // sign the transaction using Phantom wallet (returns bytes)
    const payloadSignature = await (window as any).signMessage(
      PLAINTXT_TO_ENCRYPT
    )

    // return expected sig response type
    const sig: SigDetails = {
      message: PLAINTXT_TO_ENCRYPT.toString('base64'),
      signatureHash: Buffer.from(payloadSignature.signature).toString('base64'),
      address: Buffer.from(payloadSignature.publicKey).toString('base64'),
      timestamp: new Date().toISOString(),
    }

    setSolPubkey(sig.address)
    setSigDetails(sig)
    return sig
  }

  return {
    // fetchAmountStatus: 'no_allocation',
    // setAmountDetails(state) { },
    // setFetchEligibleStatus(state) { },
    // setThrowawayWallet(throwaway) { },
    fetchThrowawayWallet,
    fetchHeadstashDetails,
    headstash: {
      headstashProofs: [],
      loading: true,
      eligibleAddr: '',
      eligibleHeadstashAmounts: [],
    },
    claimHeadstash: {
      ready: false,
      claiming: 'idle',
      go: claimHeadstashMsg,
      // signWithEthKeyFunction,
      // signWithSolKeyFunctiom,
      // handleSolanaConnect,
      // handleEthConnect: function (): void {
      //     throw new Error('Function not implemented.')
      // }
    },
    bloomAction: {
      ready: false,
      blooming: 'idle',
      go: {
        setBloomerAddr: function (addr: string): void {
          throw new Error('Function not implemented.')
        },
        destChainId: '',
      },
    },
  }
}
