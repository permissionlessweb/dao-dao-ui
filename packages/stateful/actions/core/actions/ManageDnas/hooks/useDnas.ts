import { toHex } from '@cosmjs/encoding'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DnasKeyUpdate,
  DnasKeyUpdateFunction,
  DnasObjectWithValues,
  LoadingData,
  PfpkProfileUpdate,
  PfpkProfileUpdateFunction,
  ProfileChain,
  UnifiedProfile,
  UnregisterKeysFromDaoFunction,
} from '@dao-dao/types'
import {
  DNAS_API_BASE,
  MAINNET,
  getDisplayNameForChainId,
  getPublicKeyTypeForChain,
  isSupportedChain,
  makeEmptyUnifiedProfile,
  makeManuallyResolvedPromise,
  maybeGetChainForChainId,
  signOffChainAuth,
} from '@dao-dao/utils'

import {
  useQueryLoadingData,
  useRefreshProfile,
  useWallet,
} from '../../../../../hooks'
import { dnasQueries } from '../queries'
import {
  AddDnasKeysToDaoFunction,
  AddDnasStatus,
  ConsumeDnasKeySignatureContent,
  DnasKeyWithValueWithoutId,
  UnregisterDnasStatus,
  UpdateDnasKeyStatus,
  UploadResultsProps,
  UseDnasKeysFunction,
  UsingDnasKeysStatus,
} from '../types'
import { useCfWorkerAuthPostRequest } from '../../../../../hooks/useCfWorkerAuthPostRequest'

export type DnasKeyMap =
  | Map<string, any>
  | Record<string, any>
  | null
  | undefined

export type UseDnasOptions = {
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
}

export type UseDnasProfileReturn = {
  /**
   * Whether or not the current wallet is connected. When an address is passed,
   * this will be false.
   */
  connected: boolean
  /**
   * Whether or not the current wallet is connecting. When an address is passed,
   * this will be false.
   */
  connecting: boolean
  /**
   * The profile for the currently connected wallet. If not connected and no
   * address was passed, this will be in the loading state. The unified profile
   * loads data from backup sources in case profile information is missing and
   * substitutes a default profile on error.
   */
  dnas?: DnasObjectWithValues[]
  // daoDnas?: LoadingData<FetchedDnasKeys>

  profile: LoadingData<UnifiedProfile>
  /**
   * Refresh the profile for the currently connected wallet.
   */
  refreshProfile: () => void
  getDnasKeysForChain: (chainId: string) => DnasKeyMap
  // getDnasKeysForDao: (daoAddr: string) => RecordOfDnasKeysByAddr;
  /**
   * Chain information for the profile. If not connected and no address was
   * passed, this will be in the loading state. If no profile has been created
   * for the current wallet, this will only contain the currently connected
   * wallet chain information.
   */
  chains: LoadingData<ProfileChain[]>

  updateDnasKey: {
    /**
     * Whether or not the profile is loaded and ready to be updated.
     */
    ready: boolean
    /**
     * Whether or not the profile is being updated.
     */
    updating: UpdateDnasKeyStatus
    /**
     * Update profile information.
     */
    go: DnasKeyUpdateFunction
  }
  unregisterDnasKey: {
    /**
     * Whether or not the profile is loaded and ready to be updated.
     */
    ready: boolean
    /**
     * Whether or not the keys are being unregistered.
     */
    unregistering: UnregisterDnasStatus
    /**
     * Unregister list of DNAS key information.
     */
    go: UnregisterKeysFromDaoFunction
  }
  addDnasToDao: {
    /**
     * Whether or not the add chains process is ready.
     */
    ready: boolean
    /**
     * Add chain process status.
     */
    status: AddDnasStatus
    /**
     * Add dnas keys to the profile.
     */
    go: AddDnasKeysToDaoFunction
  }
  useRegisteredDnasKeys: {
    /**
     * Whether or not the add chains process is ready.
     */
    ready: boolean
    /**
     * Add chain process status.
     */
    status: AddDnasStatus
    /**
     * Add dnas keys to the profile.
     */
    go: UseDnasKeysFunction
  }
  updateProfile: {
    /**
     * Whether or not the profile is loaded and ready to be updated.
     */
    ready: boolean
    /**
     * Whether or not the profile is being updated.
     */
    updating: boolean
    /**
     * Update profile information.
     */
    go: PfpkProfileUpdateFunction
  }
}

/**
 * A hook to get dnas key information for a wallet. If no wallet is passed,
 * defaults to the currently connected wallet. Used for managing keys owned and registered by a specific address.
 */
export const useDnas = ({
  chainId,
  address,
  daoAddress,
  onlySupported = false,
}: UseDnasOptions = {}): UseDnasProfileReturn => {
  const { t } = useTranslation()
  const {
    chain: { chainId: walletChainId },
    chainWallet: currentChainWallet,
    hexPublicKey: currentHexPublicKey,
    address: currentAddress = '',
    isWalletConnected,
    isWalletConnecting,
  } = useWallet({
    chainId,
    loadAccount: true,
  })

  const profileAddress = address || currentAddress
  const dnasProfile = useQueryLoadingData(
    dnasQueries.unified(useQueryClient(), {
      chainId: walletChainId,
      address: profileAddress,
    }),
    makeEmptyUnifiedProfile(walletChainId, profileAddress)
  )

  const refreshProfile = useRefreshProfile(profileAddress, dnasProfile)
  // cloudflare hook object formed for use with worker db
  const dnasApi = useCfWorkerAuthPostRequest(DNAS_API_BASE, '', walletChainId)

  const ready =
    !dnasProfile.loading &&
    !dnasProfile.updating &&
    !!currentChainWallet &&
    !currentHexPublicKey.loading &&
    dnasApi.ready

  const profileNonce = dnasProfile.loading ? -1 : dnasProfile.data.nonce
  const profileDnasKeys = !dnasProfile.loading
    ? getAllDnasKeys(dnasProfile.data)
    : []

  // Implementation of the function to safely retrieve DNAS keys
  const getDnasKeysForChain = (chainId: string): DnasKeyMap => {
    // Skip if profile is loading or data is not available
    if (dnasProfile?.loading || !dnasProfile?.data?.chains) {
      return null
    }

    // Safely retrieve DNAS keys with proper null checks
    return dnasProfile?.data?.chains?.[chainId]?.dnas || {}
  }

  const chains: LoadingData<ProfileChain[]> =
    (!address && !isWalletConnected) || dnasProfile.loading
      ? { loading: true }
      : {
        loading: false,
        data: Object.entries({
          ...dnasProfile.data.chains,
          // Add wallet-connected account if not already in the profile. This
          // should only be the case if no profile exists yet and an empty
          // profile with no chains is being returned.
          ...(!dnasProfile.data.chains[walletChainId] &&
            !currentHexPublicKey.loading &&
            profileAddress
            ? {
              [walletChainId]: {
                publicKey: {
                  type: getPublicKeyTypeForChain(walletChainId),
                  hex: currentHexPublicKey.data,
                },
                address: profileAddress,
              },
            }
            : {}),
        })
          .flatMap(([chainId, { address, publicKey }]): ProfileChain | [] => {
            const chain = maybeGetChainForChainId(chainId)
            const supported = chain ? isSupportedChain(chainId) : false

            return chain &&
              // Only include chains that are on the right network type.
              (chain.chainRegistry?.network_type === 'mainnet') === MAINNET &&
              // Filter by onlySupported filter.
              (!onlySupported || supported)
              ? {
                chainId,
                chain,
                supported,
                address,
                publicKey,
              }
              : []
          })
          .sort((a, b) =>
            getDisplayNameForChainId(a.chainId).localeCompare(
              getDisplayNameForChainId(b.chainId)
            )
          ),
      }

  const [addChainsStatus, setAddChainsStatus] = useState<AddDnasStatus>('idle')
  const [usingDnasKeysStatus, setUsingDnasKeysStatus] =
    useState<UsingDnasKeysStatus>('idle')
  const [unregisterDnasKeyStatus, setUnregisterDnasKeysStatus] =
    useState<UnregisterDnasStatus>('idle')
  const [updateDnasKeyStatus, setUpdateDnasKeysStatus] =
    useState<UpdateDnasKeyStatus>('idle')
  const [updating, setUpdating] = useState(false)
  const [updatingNonce, setUpdatingNonce] = useState<number>()
  const onUpdateRef = useRef<() => void>()

  // Listen for nonce to incremenent to clear updating state, since we want the
  // new dnasProfile to be ready on the same render that we stop loading.
  useEffect(() => {
    if (updatingNonce === undefined || dnasProfile.loading) {
      return
    }

    // If nonce incremented, clear updating state and call onUpdate handler if
    // exists.
    if (dnasProfile.data.nonce > updatingNonce) {
      onUpdateRef.current?.()
      onUpdateRef.current = undefined

      setUpdatingNonce(undefined)
    }
  }, [updatingNonce, dnasProfile])

  const useRegisteredDnasKeys: UseDnasKeysFunction = async (props) => {
    if (!currentChainWallet) {
      throw new Error(t('error.logInToContinue'))
    }
    setUsingDnasKeysStatus('dnas')

    let error: unknown
    const formFiles = props.files
    try {
      const mainWallet = currentChainWallet.mainWallet

      // Load nonce from API.
      const nonce = await dnasApi.getNonce()
      // Load nonce from API.

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
      const data: ConsumeDnasKeySignatureContent = {
        dao: props.daoAddr,
        keyOwner: props.dnasKeyOwner,
      }

      // sign key hash and owner to auth use
      const body = await signOffChainAuth({
        type: 'DAO DAO DNAS | authorize DNAS key use',
        nonce,
        chainId: currentChainWallet.chainId,
        address: currentChainWallet.address!,
        hexPublicKey,
        data,
        offlineSignerAmino,
      })

      // Format the files array for the FormData
      const formData = new FormData()
      formData.append('sign', JSON.stringify(body))
      formFiles.forEach((file, index) => {
        formData.append(`files`, file.file!)
      })

      try {
        const response: UploadResultsProps = await dnasApi.postDnasRequest(
          '/use-dnas',
          formData,
          'DAO DAO DNAS | USE DNAS Key'
        )
        setUsingDnasKeysStatus('idle')
        console.log('response:', response)

        // Send data to parent window
        window.parent.postMessage(
          {
            type: 'SDA_FILE_UPLOAD',
            data: JSON.stringify(response),
          },
          '*' // Replace '*' with the parent app's origin for security
        )

        return response
      } catch (apiError: any) {
        console.error('API Error:', apiError)
        if (apiError.message.includes('<!DOCTYPE')) {
          throw new Error(
            'Received HTML error page from API instead of JSON response. The API might be down or returning an error.'
          )
        }
        throw apiError
      }
    } catch (err) {
      setUsingDnasKeysStatus('idle')
      console.error('Error using DNAS key:', err)
      error = err
      throw err
    } finally {
    }
  }

  const addDnasToDao: AddDnasKeysToDaoFunction = async (props) => {
    if (!currentChainWallet) {
      throw new Error(t('error.logInToContinue'))
    }

    // Type-check.
    if (!ready || currentHexPublicKey.loading) {
      console.log('ready:', ready)
      console.log('dnasApi.ready:', dnasApi.ready)
      console.log('currentHexPublicKey:', currentHexPublicKey)
      console.log('dnasProfile:', dnasProfile)
      throw new Error(t('error.loadingData'))
    }

    setAddChainsStatus('dnas')

    let error: unknown
    try {
      const mainWallet = currentChainWallet.mainWallet

      // This will hold our properly formatted request bodies
      const dnasApiKeys: DnasKeyWithValueWithoutId[] = []

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

      // First create the proper structure for the dnasApiKeys
      const dnasApiKeysFormatted = await Promise.all(
        props.map(async (dnas) => {
          // Create the object matching the expected structure for RegisterDnasKeyRequest
          return {
            dao: dnas.daoAddr, // toHex(fromBech32(dnas.daoAddr).data),
            dnas: {
              type: 'jackalPin',
              keyMetadata: dnas.keyMetadata,
              uploadLimit: dnas.uploadLimit,
              apiKeyValue: dnas.apiKeyValue,
              daoAddr: dnas.daoAddr, //toHex(fromBech32(dnas.daoAddr).data),
              chainId: walletChainId,
              keyOwner: address,
            },
          }
        })
      )

      setAddChainsStatus('adding')
      console.log(dnasApiKeysFormatted)
      // Add error handling for the API request
      try {
        const response = await dnasApi.postRequest(
          '/register-dnas',
          { keys: dnasApiKeysFormatted },
          'DAO DAO Profile | Add DNAS Key'
        )
      } catch (apiError: any) {
        console.error('API Error:', apiError)
        if (apiError.message.includes('<!DOCTYPE')) {
          throw new Error(
            'Received HTML error page from API instead of JSON response. The API might be down or returning an error.'
          )
        }
        throw apiError
      }
    } catch (err) {
      // Set error to be thrown after finally block.
      error = err
    } finally {
      // Refresh profile.
      refreshProfile()

      // Reset status.
      setAddChainsStatus('idle')
    }

    // Throw error on failure. This allows the finally block above to run by
    // throwing the error after the entire try clause.
    if (error) {
      throw error
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateProfile = useCallback(
    // Delay resolving the profile update promise until the new profile is
    // loaded in state after a successful refresh.
    makeManuallyResolvedPromise(
      async (profileUpdates: Omit<PfpkProfileUpdate, 'nonce'>) => {
        if (!ready || profileNonce < 0) {
          return false
        }

        setUpdating(true)
        try {
          const profileUpdate: PfpkProfileUpdate = {
            ...profileUpdates,
            // nonce: profileNonce,
          }

          await dnasApi.postRequest(
            '/',
            { profile: profileUpdate },
            'DAO DAO Profile | Update'
          )

          refreshProfile()

          // On success, the updating state is cleared when the promise
          // resolves.
        } catch (err) {
          setUpdating(false)

          // Rethrow error.
          throw err
        }
      },
      (resolve) => {
        // Set onUpdate handler.
        onUpdateRef.current = () => {
          resolve()
          setUpdating(false)
        }
        setUpdatingNonce(profileNonce)
      }
    ),
    [dnasApi, profileNonce, ready, refreshProfile]
  )

  const unregisterDnasFromDAO: UnregisterKeysFromDaoFunction = async (
    props
  ) => {
    if (!currentChainWallet) {
      throw new Error(t('error.logInToContinue'))
    }

    // Type-check.
    if (!ready || currentHexPublicKey.loading) {
      console.log('ready:', ready)
      console.log('  dnasApi.ready:', dnasApi.ready)
      console.log('currentHexPublicKey:', currentHexPublicKey)
      console.log('profile:', dnasProfile)
      throw new Error(t('error.loadingData'))
    }

    setUnregisterDnasKeysStatus('dnas')

    let error: unknown
    try {
      const mainWallet = currentChainWallet.mainWallet

      // Load nonce from API.
      const nonce = await dnasApi.getNonce()
      const dnaskKeysToUnregister: { daos: string[] } = { daos: [] }

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
      // Use Promise.all to wait for all async operations to complete
      await Promise.all(
        props.daoAddrs.map(async (daoAddr) => {
          // Add the signed body to our request array
          dnaskKeysToUnregister.daos.push(daoAddr)
        })
      )

      setUnregisterDnasKeysStatus('unregistering')
      // Add error handling for the API request
      try {
        await dnasApi.postRequest(
          '/unregister-dnas',
          dnaskKeysToUnregister,
          'DAO DAO Profile | Unregister DNAS Key'
        )
      } catch (apiError: any) {
        console.error('API Error:', apiError)
        // Check if response is HTML instead of JSON
        if (apiError.messageas && apiError.message.includes('<!DOCTYPE')) {
          throw new Error(
            'Received HTML error page from API instead of JSON response. The API might be down or returning an error.'
          )
        }
        throw apiError
      }
    } catch (err) {
      // Set error to be thrown after finally block.
      error = err
    } finally {
      // Refresh profile.
      refreshProfile()

      // Reset status.
      setUnregisterDnasKeysStatus('idle')
    }

    // Throw error on failure. This allows the finally block above to run by
    // throwing the error after the entire try clause.
    if (error) {
      throw error
    }
  }

  const updateDnasKeys: DnasKeyUpdateFunction = async (props) => {
    if (!currentChainWallet) {
      throw new Error(t('error.logInToContinue'))
    }
    setUpdateDnasKeysStatus('dnas')

    let error: unknown
    try {
      const mainWallet = currentChainWallet.mainWallet

      // Load nonce from API.
      const nonce = await dnasApi.getNonce()

      // This will hold our properly formatted request bodies
      const dnasKeysToUpdate: Omit<DnasKeyUpdate, 'nonce'>[] = []

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

      // Use Promise.all to wait for all async operations to complete
      await Promise.all(
        props.map(async (dnas) => {
          // Add the signed body to our request array
          dnasKeysToUpdate.push(dnas)
        })
      )

      setUpdateDnasKeysStatus('updating')
      // Add error handling for the API request
      try {
        const response = await dnasApi.postRequest(
          '/update-dnas',
          {
            dnasKeysToUpdate,
          },
          'DAO DAO Profile | Unregister DNAS Key'
        )
      } catch (apiError: any) {
        console.error('API Error:', apiError)
        // Check if response is HTML instead of JSON
        if (apiError.messageas && apiError.message.includes('<!DOCTYPE')) {
          throw new Error(
            'Received HTML error page from API instead of JSON response. The API might be down or returning an error.'
          )
        }
        throw apiError
      }
    } catch (err) {
      // Set error to be thrown after finally block.
      error = err
    } finally {
      // Refresh profile.
      refreshProfile()

      // Reset status.
      setUnregisterDnasKeysStatus('idle')
    }

    // Throw error on failure. This allows the finally block above to run by
    // throwing the error after the entire try clause.
    if (error) {
      throw error
    }
  }

  return {
    // Connected and connecting are only relevant when using the currently
    // connected wallet. If an address is passed, set connected to false.
    connected: address ? false : isWalletConnected,
    connecting: address ? false : isWalletConnecting,
    // getDnasKeysForDao,
    refreshProfile,
    getDnasKeysForChain,
    updateDnasKey: {
      ready,
      updating: updateDnasKeyStatus,
      go: updateDnasKeys,
    },
    unregisterDnasKey: {
      ready,
      unregistering: unregisterDnasKeyStatus,
      go: unregisterDnasFromDAO,
    },
    useRegisteredDnasKeys: {
      ready: false,
      status: 'dnas',
      go: useRegisteredDnasKeys,
    },
    chains,
    // uniquePublicKeys,
    dnas: profileDnasKeys,
    profile: dnasProfile,
    addDnasToDao: {
      ready,
      status: addChainsStatus,
      go: addDnasToDao,
    },
    updateProfile: {
      ready,
      updating,
      go: updateProfile,
    },
  }
}

// returns just the dnas keys for a given profile
const getAllDnasKeys = (
  profileData: UnifiedProfile
): DnasObjectWithValues[] => {
  if (!profileData) {
    console.log('No profile data provided, returning an empty array.')
    return []
  }
  // console.log("profileData:", profileData);

  // Track all dnas entries we find
  const ddnas: DnasObjectWithValues[] = []

  // Process each chain in the profile data
  Object.entries(profileData.chains || {}).forEach(([chainId, chainData]) => {
    // Skip chains that don't have DNAS data
    if (!chainData.dnas || Object.values(chainData.dnas).length === 0) {
      return
    }

    console.log('chainData:', chainData)

    // Process each DNAS entry in this chain
    Object.entries(chainData.dnas).forEach(([daoAddr, dnaData]) => {
      // Log the actual structure of dnaData to debug
      ddnas.push({
        daoAddr,
        keyOwner: dnaData.keyOwner,
        chainId,
        keyHash: dnaData.keyHash, // Try both possible property names
        keyMetadata: dnaData.keyMetadata,
        uploadLimit: dnaData.uploadLimit,
        type: 'jackalPin',
      } as DnasObjectWithValues)
    })
  })

  // console.log("getAllDnasKeys() response:", ddnas);
  return ddnas
}
