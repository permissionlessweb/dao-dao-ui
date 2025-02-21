import { InfusedCollection, InfusionParams, NFTCollection } from "@dao-dao/types/contracts/CwInfuser"
import { Counterparty } from "../token_swap/types"
import { ComponentType } from "react"
import { ActionComponentProps, AddressInputProps, GenericTokenBalanceWithOwner } from "@dao-dao/types"


export type CreateInfusionData = {
    chainId: string
    collections: NFTCollection[]
    infusedCollection: InfusedCollection
    infusionParams: InfusionParams
    paymentRecipient: string
    owner?: string
    //   description: string
}

export type CreateInfusionOptions = {
    tokens: GenericTokenBalanceWithOwner[]
    AddressInput: ComponentType<AddressInputProps<CreateInfusionData>>
}


export const CreateInfusion: ComponentType<
    ActionComponentProps<CreateInfusionOptions>
> = ({
    options

}) => {
        return (
            <>

            </>)
    }