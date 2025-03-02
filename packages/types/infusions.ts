import { ComponentType } from 'react'

import { HugeDecimal } from '@dao-dao/math'
import { LoadingData } from './misc'
import { ButtonLinkProps } from './components'
import {  GenericTokenBalance } from './token'
import { Coin } from './contracts'
import { CollectionInfoResponse, ContractInfoResponse } from './contracts/Sg721Base'
import { InfusionsEligibleCollection } from './contracts/CwInfuser'

export type EligibleCollectionCardProps = {
    fieldNamePrefix: string,
    // todo:  add logic to trigger populate payment substitute for specific eligible collection
    address: string
    index: number
    requiredParams: InfusionsEligibleCollection
    paymentSub: GenericTokenBalance | null | undefined
    nftInfo: CollectionInfoResponse,
    contractInfo: ContractInfoResponse,
    // ButtonLink: ComponentType<ButtonLinkProps>
}

export type StatefulEligibleCollectionCardProps = Omit<
    EligibleCollectionCardProps,
    'ButtonLink'
>
