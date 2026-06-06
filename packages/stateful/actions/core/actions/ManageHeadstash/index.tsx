import { PsychologyAltTwoTone } from '@mui/icons-material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  ActionBase,
  ChainProvider,
  SegmentedControls,
  useActionOptions,
} from '@dao-dao/stateless'
import {
  ChainId,
  SegmentedControlsProps,
  TypedOption,
  UnifiedCosmosMsg,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  makeExecuteSmartContractMessage,
  makeWasmMessage,
  maybeMakePolytoneExecuteMessages,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  BloomComponent,
} from './BloomHeadstash'
import {
  ClaimHeadstashComponent,
} from './ClaimHeadstash'
import {
  CreateHeadstashComponent,
} from './CreateHeadstash'
import { headstashQueries } from './queries'
import { BloomMode, HeadstashActionData, HeadstashActionMode } from '../../../../modules/modules/Headstash/HeadstashRenderer'


// const getThrowawayWallet = (
//     options: ActionOptions,
// ) => {
//     // retrieves shitstrap manager data from items saved in dao contract state.
//     // const sources = widgetData && getShitstrapSourcesFromModuleData(options, widgetData)
//     const allHeadstashesOwnedByDao = options.context.accounts.flatMap(({ chainId, address: accountAddr }) =>
//         options.chain.chainId == chainId ?
//             headstashQueries.headstashesByOwner(
//                 options.queryClient,
//                 {
//                     daoAddress: accountAddr,
//                 })
//             : []

//     )
//     return allHeadstashesOwnedByDao
// }

const getHeadstashContractsOwnedByEntity = (options: ActionOptions) => {
  // retrieves shitstrap manager data from items saved in dao contract state.
  // const sources = widgetData && getShitstrapSourcesFromModuleData(options, widgetData)
  const allHeadstashesOwnedByDao = options.context.accounts.flatMap(
    ({ chainId, address: accountAddr }) =>
      options.chain.chainId == chainId
        ? headstashQueries.headstashesByOwner(options.queryClient, {
          daoAddress: accountAddr,
        })
        : []
  )
  return allHeadstashesOwnedByDao
}

const Component: ActionComponent = (props) => {
  const { t } = useTranslation()
  const {
    context,
    chain: { chainId },
  } = useActionOptions()

  // Load DAO info for chosen DAO.
  const { register, watch, setValue } = useFormContext<HeadstashActionData>()

  const mode = watch((props.fieldNamePrefix + 'mode') as 'mode')

  const tabs: SegmentedControlsProps<HeadstashActionData['mode']>['tabs'] = [
    ...(props.data.mode
      ? ([
        {
          label: t('title.createHeadstash'),
          value: HeadstashActionMode.Create,
        },
        {
          label: t('title.claimHeadstaash'),
          value: HeadstashActionMode.Claim,
        },
      ] as TypedOption<HeadstashActionData['mode']>[])
      : []),
  ]
  const selectedTab = tabs.find((tab) => tab.value === mode)

  // const address = watch((props.fieldNamePrefix + 'address') as 'address') || ''
  // const msgsPerSender = watch((props.fieldNamePrefix + '_msgs') as '_msgs') ?? []

  // const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  // const { bech32Prefix } = getChainForChainId(chainId)

  // When creating, just show one form for the chosen address. When not
  // creating, render a form for each sender message group since the component
  // needs to be wrapped in the providers for that sender.
  return (
    <>
      {/* {context.type === ActionContextType.Dao && (
                <DaoSupportedChainPickerInput
                    disabled={!props.isCreating}
                    fieldName={props.fieldNamePrefix + 'chainId'}
                    onlyDaoChainIds
                />
            )} */}

      {/* Re-render when chain changes so hooks and state reset. */}
      <ChainProvider key={chainId} chainId={chainId}>
        {props.isCreating ? (
          <SegmentedControls<HeadstashActionData['mode']>
            className="mb-2"
            onSelect={(value) =>
              setValue((props.fieldNamePrefix + 'mode') as 'mode', value)
            }
            selected={mode}
            tabs={tabs}
          // disabled={!dnasExists}
          />
        ) : (
          <p className="title-text mb-2">{selectedTab?.label}</p>
        )}

        {mode === HeadstashActionMode.Create ? (
          <CreateHeadstashComponent {...props} options={props.data} />
        ) : null}
        {mode === HeadstashActionMode.Claim ? (
          <ClaimHeadstashComponent {...props.data.consume} />
        ) : null}

      </ChainProvider>
    </>
  )
}

export class ManageHeadstashAction extends ActionBase<HeadstashActionData> {
  public readonly key = ActionKey.ManageHeadstash
  public readonly Component = Component

  constructor(options: ActionOptions) {
    super(options, {
      Icon: PsychologyAltTwoTone, //   RedeemTwoTone, WatchOffTwoTone,GrassTwoTone
      label: options.t('title.headstash'),
      description: options.t('info.headstashDescription'),
    })

    this.defaults = {
      headstashContractAddr: '',
      mode: HeadstashActionMode.Claim,
      create: {
        homeChainId: '',
        headstashAdmin: '',
        headstashCodeId: '',
      },
      claim: {
        usingCustomHeadstash: false,
        eligibleAddr: '',
        eligibleAddrSignature: '',
        throwawayAddress: '',
        homeChainId: '',
        // bloom: {
        //   headstashChain: '',
        //   destinationChain: '',
        //   bloomMode: BloomMode.Registering,
        //   thowawayAddress: '',
        // },
      },

    }
  }

  // create chain id object based on mode

  encode({
    claim,
    create,

    mode,
    headstashContractAddr,
  }: HeadstashActionData): UnifiedCosmosMsg[] {
    let msg: UnifiedCosmosMsg
    let chainId: string = this.options.chain.chainId
    switch (mode) {
      case HeadstashActionMode.Claim:
        chainId = ChainId.SecretMainnet
        msg = makeExecuteSmartContractMessage({
          chainId,
          sender: claim.throwawayAddress,
          contractAddress: headstashContractAddr,
          msg: {
            claim: {
              sig_addr: claim.eligibleAddr,
              sig: claim.eligibleAddrSignature,
            },
          },
        })
        break
      case HeadstashActionMode.Create:
        // const convertedFunds = funds
        //     .map(({ denom, amount, decimals }) =>
        //         HugeDecimal.fromHumanReadable(amount, decimals).toCoin(denom)
        //     )

        let headstashInstantiateMsg = {}

        let instantiateWasmMsg = makeWasmMessage({
          wasm: {
            instantiate: {
              admin: create.headstashAdmin || '',
              code_id: create.headstashCodeId,
              funds: [], //convertedFunds,
              label: 'label goes here',
              msg: headstashInstantiateMsg,
            },
          },
        })

        msg = instantiateWasmMsg
        break
      // case HeadstashActionMode.Bloom:
      //   msg =
      //     bloom.bloomMode == BloomMode.Registering
      //       ? makeExecuteSmartContractMessage({
      //         chainId: bloom.headstashChain,
      //         sender: bloom.thowawayAddress,
      //         contractAddress: headstashContractAddr,
      //         msg: { register_bloom: { bloom_msg: {} } },
      //       })
      //       : bloom.bloomMode == BloomMode.Preparing
      //         ? makeExecuteSmartContractMessage({
      //           chainId: bloom.headstashChain,
      //           sender: bloom.thowawayAddress,
      //           contractAddress: headstashContractAddr,
      //           msg: { prepare_bloom: {} },
      //         })
      //         : makeExecuteSmartContractMessage({
      //           chainId: bloom.headstashChain,
      //           sender: bloom.thowawayAddress,
      //           contractAddress: headstashContractAddr,
      //           msg: { process_bloom: {} },
      //         })
      // break

    }
    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chainId,
      chainId,
      msg
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
      headstashContractAddr: '',
      mode: HeadstashActionMode.Create,
      create: {
        homeChainId: this.options.chain.chainId,
        headstashAdmin: '',
        headstashCodeId: '',
      },
      claim: {
        homeChainId: '',

        usingCustomHeadstash: false,
        eligibleAddr: '',
        eligibleAddrSignature: '',
        throwawayAddress: '',
      },
      // bloom: {
      //   headstashChain: ChainId.SecretMainnet,
      //   destinationChain: this.options.chain.chainId,

      //   bloomMode: BloomMode.Registering,
      //   thowawayAddress: '',
      // },
    }
  }
}
