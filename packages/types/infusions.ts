import { BundleType, InfusionsEligibleCollection } from './contracts/CwInfuser'
import {
  CollectionInfoResponse,
  ContractInfoResponse,
} from './contracts/Sg721Base'
import { GenericTokenBalance } from './token'

export enum InfusionActionMode {
  Create = 'create',
  Infuse = 'infuse',
}

export type EligibleCollectionCardProps = {
  fieldNamePrefix: string

  nftAddr: string
  index: number
  requiredParams: InfusionsEligibleCollection
  nftInfo: CollectionInfoResponse
  contractInfo: ContractInfoResponse
  bundleType: BundleType
  // payment subsitute
  paymentSub: GenericTokenBalance | null | undefined
  globalPaymentSub: boolean,
  // onUseSingleFeeSubstitute: (addr: string) => void
  // ButtonLink: ComponentType<ButtonLinkProps>
}

export type StatefulEligibleCollectionCardProps = Omit<
  EligibleCollectionCardProps,
  'ButtonLink'
>
