import { ActionBase } from '@dao-dao/stateless'
import { UnifiedCosmosMsg } from '@dao-dao/types'
import {
    ActionContextType,
    ActionKey,
    ActionMatch,
    ActionOptions,
    ProcessedMessage,
} from '@dao-dao/types/actions'
import {
    getChainAddressForActionOptions,
    makeExecuteSmartContractMessage,
    maybeMakePolytoneExecuteMessages,
    objectMatchesStructure,
} from '@dao-dao/utils'
import { PrivacyTipTwoTone, PsychologyAltTwoTone } from '@mui/icons-material'

export type CreateHeadstashActionData = {}
export type ClaimHeadstashActionData = {}
export type BloomHeadstashActionData = {}

enum HeadstashActionMode {
    Create = 'create',
    Claim = 'claim',
    Bloom = 'bloom'
}

// data coming from action tabs content
export type HeadstashActionData = {
    fieldNamePrefix: string
    mode: HeadstashActionMode
    create: CreateHeadstashActionData
    claim: ClaimHeadstashActionData
    bloom: BloomHeadstashActionData
}

export class ManageHeadstashAction extends ActionBase<HeadstashActionData> {
    public readonly key = ActionKey.Headstash
    public readonly Component = Component

    constructor(options: ActionOptions) {
        super(options, {
            Icon: PsychologyAltTwoTone, //   RedeemTwoTone, WatchOffTwoTone,GrassTwoTone
            label: options.t('title.headstash'),
            description: options.t('info.headstashDescription'),
        })

        this.defaults = {
            fieldNamePrefix: '',
            mode: HeadstashActionMode.Claim,
            create: {},
            claim: {},
            bloom: {},
        }
    }

    encode({ claim, create, bloom, mode }: HeadstashActionData): UnifiedCosmosMsg[] {
        return maybeMakePolytoneExecuteMessages(
            this.options.chain.chainId,
            chainId,
            makeExecuteSmartContractMessage({
                chainId,
                sender: getChainAddressForActionOptions(this.options, chainId) || '',
                contractAddress: address,
                msg: {
                    do_something: {
                        field,
                    },
                },
            })
        )
    }

    match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
        return objectMatchesStructure(decodedMessage, {
            wasm: {
                execute: {
                    contract_addr: {},
                    funds: {},
                    msg: {
                        do_something: {
                            field: {},
                        },
                    },
                },
            },
        })
    }

    decode([
        {
            decodedMessage,
            account: { chainId },
        },
    ]: ProcessedMessage[]): HeadstashActionData {
        return {
            chainId,
            address: decodedMessage.wasm.execute.contract_addr,
            field: decodedMessage.wasm.execute.msg.do_something.field,
        }
    }
}