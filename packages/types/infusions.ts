import { InfusionsEligibleCollection } from './contracts/CwInfuser'
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
  // todo:  add logic to trigger populate payment substitute for specific eligible collection
  address: string
  index: number
  requiredParams: InfusionsEligibleCollection
  paymentSub: GenericTokenBalance | null | undefined
  nftInfo: CollectionInfoResponse
  contractInfo: ContractInfoResponse
  // ButtonLink: ComponentType<ButtonLinkProps>
}

export type StatefulEligibleCollectionCardProps = Omit<
  EligibleCollectionCardProps,
  'ButtonLink'
>
