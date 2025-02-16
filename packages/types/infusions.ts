import { ComponentType } from 'react'

import { HugeDecimal } from '@dao-dao/math'
import { LoadingData } from './misc'
import { ButtonLinkProps } from './components'
import { GenericToken } from './token'
import { Coin } from './contracts'

export type EligibleCollectionCardProps = {
    address: string
    substituteLabel: string
    paymentSub: Coin | null | undefined
    // ButtonLink: ComponentType<ButtonLinkProps>
}

export type StatefulEligibleCollectionCardProps = Omit<
    EligibleCollectionCardProps,
    'ButtonLink'
>
