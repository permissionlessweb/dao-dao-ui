/** query file to add query functions to */
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import { UseQueryOptions, queryOptions } from '@tanstack/react-query'

import {
  HeadstashAllocation,
  HeadstashConfigResponse,
  HeadstashConfigWithContractAddr,
  HeadstashInstance,
} from '../types'

/**
 * Fetch headstash details for a given address.
 * This implements the queryHeadstashDetails function in the hook.
 */
export const fetchHeadstashDetails = async (
  address: string
): Promise<HeadstashInstance> => {
  if (!address) {
    throw new Error('Address is required')
  }

  try {
    // Fetch amount
    const headstashAmountAPI = `http://localhost:3001/getAmount/${address}`
    const amountResponse = await fetch(headstashAmountAPI)

    let headstashAmount = []
    if (amountResponse.ok) {
      const result = await amountResponse.json()
      headstashAmount = result.amount
    } else {
      console.error('Amount request failed with status:', amountResponse.status)
    }

    // Fetch proofs
    const headstashProofAPI = `http://localhost:3001/getProofs/${address}`
    const proofsResponse = await fetch(headstashProofAPI)

    let headstashProofs = []
    if (proofsResponse.ok) {
      const result = await proofsResponse.json()
      headstashProofs = result
    } else {
      console.error('Proofs request failed with status:', proofsResponse.status)
    }

    return {
      eligibleAddr: address,
      eligibleHeadstashAmounts: headstashAmount,
      headstashProofs,
      loading: false,
    }
  } catch (err) {
    console.error('Error fetching headstash details:', err)
    throw err
  }
}

/**
 * Fetch headstash config for a given contract.
 */
export const fetchHeadstashConfig = async (
  contractAddress: string
): Promise<HeadstashConfigResponse> => {
  try {
    const response = await fetch(
      `http://localhost:3001/config/${contractAddress}`
    )
    if (response.ok) {
      return (await response.json()) as HeadstashConfigResponse
    } else {
      console.error('Config fetch failed with status:', response.status)
      throw new Error('Failed to fetch headstash details from API ')
    }
  } catch (err) {
    console.error('Error fetching headstash config:', err)
    throw err
  }
}

/**
 * Fetch headstash allocation for a given addressand headstash contract.
 */
export const fetchHeadstashAllocation = async (
  address: string,
  headstshAddr: string
): Promise<HeadstashAllocation | null> => {
  try {
    const response = await fetch(`http://localhost:3001/allocation/${address}`)
    if (response.ok) {
      return await response.json()
    } else {
      console.error('Allocation fetch failed with status:', response.status)
      return null
    }
  } catch (err) {
    console.error('Error fetching headstash allocation:', err)
    return null
  }
}

/**
 * Fetch an existing throwaway wallet from localStorage if it exists, or generate a new one.
 * @param lsKeyPrefix Optional prefix for the localStorage key. If not provided, uses 'hstk-' + pubkey.
 * @returns A Promise resolving to a ThrowawayWallet.
 */
export const fetchOrGenerateThrowawayWallet = async (
  walletAddr: string,
  lsKeyPrefix?: string
): Promise<DirectSecp256k1HdWallet> => {
  try {
    // Construct localStorage key
    const now = new Date()
    const lsKey = lsKeyPrefix || `hstk-${walletAddr}`

    // Try to fetch from localStorage
    const item = localStorage.getItem(lsKey)

    let wallet
    if (item) {
      // Decode existing mnemonic and create wallet
      const mnemonic = atob(item)
      wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
        prefix: 'secret', // assuming we are using secret network for headstash
      })
    } else {
      // Generate new wallet
      wallet = await DirectSecp256k1HdWallet.generate(24)
      // Store in localStorage for future use
      localStorage.setItem(lsKey, btoa(wallet.mnemonic))
    }

    return wallet
  } catch (err) {
    console.error('Error fetching or generating throwaway wallet:', err)
    throw new Error('Failed to fetch or generate throwaway wallet')
  }
}

export const headstashQueries = {
  /**
   * Fetch headstash details for a given address.
   */
  headstashDetails: (options?: {
    contract: string
  }): UseQueryOptions<
    HeadstashInstance,
    Error,
    HeadstashInstance,
    [
      {
        category: 'headstash'
        name: 'headstashDetails'
        options: { contract: string } | undefined
      },
    ]
  > =>
    queryOptions({
      queryKey: [
        {
          category: 'headstash',
          name: 'headstashDetails',
          options,
        },
      ],
      queryFn: options
        ? () => fetchHeadstashDetails(options.contract)
        : () => Promise.reject('No address provided'),
    }),

  /**
   * Fetch headstash allocation for a given address.
   */
  headstashAllocation: (options?: {
    address: string
    headstashAddr: string
  }): UseQueryOptions<
    HeadstashAllocation | null,
    Error,
    HeadstashAllocation | null,
    [
      {
        category: 'headstash'
        name: 'headstashAllocation'
        options: { address: string; headstashAddr: string } | undefined
      },
    ]
  > =>
    queryOptions({
      queryKey: [
        {
          category: 'headstash',
          name: 'headstashAllocation',
          options,
        },
      ],
      queryFn: options
        ? () => fetchHeadstashAllocation(options.address, options.headstashAddr)
        : () => Promise.resolve(null),
    }),

  /**
   * Fetch headstash config for a given contract.
   */
  headstashConfig: (
    queryClient: unknown,
    options?: { contractAddress: string }
  ): UseQueryOptions<
    HeadstashConfigResponse | null,
    Error,
    HeadstashConfigResponse | null,
    [
      {
        category: 'headstash'
        name: 'headstashConfig'
        options: { contractAddress: string } | undefined
      },
    ]
  > =>
    queryOptions({
      queryKey: [
        {
          category: 'headstash',
          name: 'headstashConfig',
          options,
        },
      ],
      queryFn: options
        ? () => fetchHeadstashConfig(options.contractAddress)
        : () => Promise.resolve(null),
    }),

  /**
   * Fetch a throwaway wallet for a given public key. If none exists, generate one
   */
  fetchOrGenerateThrowawayWallet: (
    queryClient: unknown,
    options?: { walletAddr: string; lsKeyPrefix?: string }
  ): UseQueryOptions<
    DirectSecp256k1HdWallet | null,
    Error,
    DirectSecp256k1HdWallet | null,
    [
      {
        category: 'headstash'
        name: 'fetchOrGenerateThrowawayWallet'
        options: { walletAddr: string; lsKeyPrefix?: string } | undefined
      },
    ]
  > =>
    queryOptions({
      queryKey: [
        {
          category: 'headstash',
          name: 'fetchOrGenerateThrowawayWallet',
          options,
        },
      ],
      queryFn: () =>
        options
          ? fetchOrGenerateThrowawayWallet(
              options.walletAddr,
              options.lsKeyPrefix
            )
          : null,
    }),

  /**
   * Fetch all headstashes a wallet address is eligible for.
   */
  eligibleHeadstashes: (options?: {
    address: string
  }): UseQueryOptions<
    any[],
    Error,
    any[],
    [
      {
        category: 'headstash'
        name: 'eligibleHeadstashes'
        options: { address: string } | undefined
      },
    ]
  > =>
    queryOptions({
      queryKey: [
        {
          category: 'headstash',
          name: 'eligibleHeadstashes',
          options,
        },
      ],
      queryFn: options
        ? () =>
            fetch(`http://localhost:3001/eligible/${options.address}`).then(
              (res) => res.json()
            )
        : () => Promise.resolve([]),
    }),

  /**
   * Fetch all headstashes a DAO is admin of.
   */
  headstashesByOwner: (
    queryClient: unknown,
    options?: { daoAddress: string }
  ): UseQueryOptions<
    HeadstashConfigWithContractAddr,
    Error,
    HeadstashConfigWithContractAddr,
    [
      {
        category: 'headstash'
        name: 'headstashesByOwner'
        options: { daoAddress: string } | undefined
      },
    ]
  > =>
    queryOptions({
      queryKey: [
        {
          category: 'headstash',
          name: 'headstashesByOwner',
          options,
        },
      ],
      queryFn: options
        ? () =>
            fetch(
              `http://localhost:3001/dao/headstashes/${options.daoAddress}`
            ).then((res) => res.json())
        : () => Promise.resolve([]),
    }),
}
