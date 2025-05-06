import { ComponentType } from "react"
import { LoadingDataWithError } from "@dao-dao/types/misc"
import { ButtonLinkProps, SuspenseLoaderProps } from "@dao-dao/types/components"
import { ReactNode } from 'react'

import { LoadingData } from '@dao-dao/types/misc'
import { DnasKeyByDaoObjectWithDAO, DnasObjectWithValues, PfpkProfileUpdateFunction, RecordOfDnasKeysByAddr, UnifiedProfile } from '@dao-dao/types/profile'
import { Entity } from '@dao-dao/types/components'
import { SubmitHandler } from "react-hook-form"


export type AddDnasStatus = 'idle' | 'dnas' | 'adding'
export type UnregisterDnasStatus = 'idle' | 'dnas' | 'unregistering'
export type UpdateDnasKeyStatus = 'idle' | 'dnas' | 'updating'
export type UsingDnasKeysStatus = 'idle' | 'dnas' | 'using'
export type AddChainsDaoStatus = 'idle' | 'loading' | 'done'

export type UseDnasKeysFunction = (
  data: UseDnasKeyData,
  /**
   * Callbacks
   */
  callbacks?: {
    /**
     * Status updates handler
     */
    setDnasStatus?: (chainId: string, daoAddr: string, status: AddDnasStatus) => void
  }
) => Promise<UploadResultsProps>


export type AddDnasKeysToDaoFunction = (
  data: DnasKeyWithValueWithoutId[],
  /**
   * Callbacks
   */
  callbacks?: {
    /**
     * Status updates handler
     */
    setDnasStatus?: (chainId: string, daoAddr: string, status: AddDnasStatus) => void
  }
) => Promise<void>

export type UseDnasKeyData = {
  daoAddr: string,
  dnasKeyOwner: string,
  // dnasKeyHash: string,
  files: Partial<DnasFile>[]
}
export type ConsumeDnasActionData = {
  fieldNamePrefix: string
  isCreating: boolean
  // list of all keys avialable for this dao
  daoOwnedKeys: DnasKeyByDaoObjectWithDAO[]
  // key selected to make use of
  dnasKeyInUse: {
    chainId: string
    daoAddr: string
    dnasKeyOwner: string
    dnasKeyHash: string
  }
  // files to upload via dnas API
  files: DnasFile[]
  // form for smart contract data
  snailsForm: {
    title: string,
    description: string,
    category: string,
    creator: string,
    topic: string[],
    network: string,
    music: string,
    uri: string,  // 
  }
}

export type DnasProfileHeaderProps = {
  /**
   * Whether or not to show edit buttons for the profile name and NFT.
   */
  editable: boolean
  /**
   * The profile being displayed. If undefined, show logged in.
   */
  profile: LoadingData<UnifiedProfile> | undefined
  /**
   * The entity being displayed. If undefined, show logged in.
   */
  entity: LoadingData<Entity> | undefined
  /**
   * If set, show a tooltip that explains there are multiple profiles attached
   * to the current wallet and prompt to merge them. The type determines the
   * text to show based on the context.
   */
  manageDnasProfileType?: 'add' | 'merge'
  /**
   * Function to open merge profiles modal. This is only used if editable is
   * true and mergeProfileType is defined.
   */
  openManageDnasProfileModal?: () => void
  /**
   * Function to update the profile. This is only used if editable is true.
   */
  updateProfile?: PfpkProfileUpdateFunction
  /**
   * Function to open the profile NFT update modal. This is only used if
   * editable is true.
   */
  openProfileNftUpdate?: () => void
  /**
   * Optional container class name.
   */
  className?: string
  /**
   * Optionally add more components below the header.
   */
  children?: ReactNode
}

export type DnasKeyWithValueWithoutId = {
  daoAddr: string;
  chainId: string;
  keyOwner: string;
  type: string;
  keyMetadata: string;
  uploadLimit: string;
  apiKeyValue: string;
}

export type DnasKeysWithoutIdsAndValue = Omit<DnasKeyWithValueWithoutId, 'apiKeyValue'> & { keyHash: string };

export type ConsumeDnasKeySignatureContent = {
  dao: string
  keyOwner: string,
  // keyHash: string,
}

export type DnasPickerProps = {
  dnasKeyOwners: RecordOfDnasKeysByAddr
  daoAddr: string,
  chainId: string
  selectedAddress?: string
  readOnly?: boolean
  onSelect: (dnasKey: DnasKeyByDaoObjectWithDAO) => void
  displayClassName?: string
}

// dao member addr (what type) 
export type DnasFile = {
  name: string
  url?: string
  mimetype: string
  file: File;
}

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  cid: string;
}

export interface UploadResultsProps {
  files: UploadedFile[];
}

export type DnasPublicKey = {
  type: string
  hex: string
}


export type DnasAccountProps = {
  address: string
  hexPublicKey: LoadingDataWithError<string | undefined>
  // AccountDaos: ComponentType
  // AccountWallet: ComponentType
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
  ButtonLink: ComponentType<ButtonLinkProps>
} & Pick<DnasProfileHeaderProps, 'profile' | 'entity'>

export type PerformMergeProps = {
  dnas: DnasObjectWithValues[]
  updatingExistingDnasKey: boolean
  onClose: () => void
}


export type DnasProfileAddDnasKeyProps = {
  /**
   * Prompt text that opens the chain picker popup.
   */
  prompt: string
  /**
   * Optional tooltip next to prompt text.
   */
  promptTooltip?: string
  /**
   * Optional class name applied to the prompt text.
   */
  promptClassName?: string
  /**
   * Whether or not the prompt to add new chains is disabled. Defaults to
   * `false`.
   */
  disabled?: boolean
  /**
   * List of profile chains.
   */
  dnas: DnasKeysWithoutIdsAndValue[]
  /**
   * Add chains form submit handler. If undefined, it is not yet ready.
   */
  onAddDnas: SubmitHandler<ProfileAddDnasKeysForm> | undefined
  /**
   * Add chain process status.
   *
   * - `idle` - nothing loading
   * - `chains` - connecting and signing each chain's allowance
   * - `registering` - signing registration and firing request
   */
  status: AddDnasStatus
  /**
   * The size of the UI.
   */
  size?: 'sm' | 'default'
  /**
   * Whether or not to only show supported chains. Defaults to `false`.
   */
  onlySupported?: boolean
  /**
   * Whether or not to auto-add when a chain is selected instead of allowing
   * multiple and showing checkboxes. Defaults to `false`.
   */
  autoAdd?: boolean
  /**
   * Optionally use text button style for prompt. Defaults to `false`.
   */
  textPrompt?: boolean
  /**
   * Optional container class name.
   */
  className?: string
}

export type ProfileAddDnasKeysForm = {
  chains: {
    chainId: string
    /**
     * Status to display while submitting.
     */
    dnas: DnasKeyWithValueWithoutId[]
    status: AddChainsDaoStatus
  }[]
}

export type StatefulDnasProfileAddDnasKeyProps = Omit<
  DnasProfileAddDnasKeyProps,
  'chains' | 'onAddDnas' | 'status'
>
