import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { registerDnasKeyVisibleAtom } from '@dao-dao/state/recoil'
import {
  ActionBase,
  Loader,
  LockWithKeyEmoji,
  SegmentedControls,
  useActionOptions,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionEncodeContext,
  ActionKey,
  ActionMatch,
  ActionOptions,
  EntityType,
  ProcessedMessage,
  SegmentedControlsProps,
  TypedOption,
  UnifiedCosmosMsg,
} from '@dao-dao/types'

import { SuspenseLoader } from '../../../../components'
import { useEntity } from '../../../../hooks'
import {
  ConsumeDnasKeysRenderer,
  HandleDnasKeysRenderer,
  ManageDnasActionData,
} from './dnas'
import { useDnas } from './hooks'
import { ConsumeDnasActionData } from './types'

enum DnasActionMode {
  Consume = 'consume',
  Handle = 'handle',
}

// data coming from action tabs content
export type ManageDnasData = {
  fieldNamePrefix: string
  mode: DnasActionMode
  consume: ConsumeDnasActionData
  handle: ManageDnasActionData
}

const Component: ActionComponent<undefined, ManageDnasData> = (props) => {
  const { t } = useTranslation()
  const options = useActionOptions()

  const { setValue, watch } = useForm<{
    mode: ManageDnasData['mode']
    handle: ManageDnasData['handle']
    consume: ManageDnasData['consume']
  }>()

  const mode = watch((props.fieldNamePrefix + 'mode') as 'mode')
  const handle = watch((props.fieldNamePrefix + 'handle') as 'handle')
  const consume = watch((props.fieldNamePrefix + 'consume') as 'consume')
  // trigger modal popup for registering dnas key
  const setManageDnasProfileVisible = useSetRecoilState(
    registerDnasKeyVisibleAtom
  )

  const { entity } = useEntity(options.address)
  const isDao = !entity.loading && entity.data.type == EntityType.Dao
  // check for current entity keys registered. set these as form values until changed manually or entity is changed
  const {
    profile,
    refreshProfile,
    connected,
    connecting,
    useRegisteredDnasKeys,
  } = useDnas({
    chainId: options.chain.chainId,
    daoAddress:
      options.context.type == ActionContextType.Dao
        ? options.address
        : undefined,
  })

  const tabs: SegmentedControlsProps<ManageDnasData['mode']>['tabs'] = [
    // Only allow beginning a vest if widget is setup.
    ...(props.data.mode
      ? ([
          {
            label: t('title.handleDnasKeys'),
            value: DnasActionMode.Handle,
          },
          {
            label: t('title.consumeDnasKeys'),
            value: DnasActionMode.Consume,
          },
        ] as TypedOption<ManageDnasData['mode']>[])
      : []),
  ]
  const selectedTab = tabs.find((tab) => tab.value === mode)
  // Set initial values when modal becomes visible or profile changes
  useEffect(() => {
    refreshProfile()
    console.log('profile:', profile)
  }, [mode])

  return (
    <SuspenseLoader fallback={<Loader />}>
      {props.isCreating ? (
        <SegmentedControls<ManageDnasData['mode']>
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

      {mode === DnasActionMode.Handle ? (
        <HandleDnasKeysRenderer {...props} options={{ ...props.data.handle }} />
      ) : null}
      {mode === DnasActionMode.Consume ? (
        <ConsumeDnasKeysRenderer {...{ ...props.data.consume }} />
      ) : null}
    </SuspenseLoader>
  )
}

// Only check if widget exists in DAOs.
const DaoComponent: ActionComponent<undefined, ManageDnasData> = (props) => {
  return <Component {...props} />
}

const WalletComponent: ActionComponent<undefined, ManageDnasData> = (props) => (
  <Component {...props} />
)

export class ManageDnasAction extends ActionBase<ManageDnasData> {
  public readonly key = ActionKey.ManageDnas
  public readonly Component = Component

  constructor(options: ActionOptions) {
    super(options, {
      Icon: LockWithKeyEmoji,
      label: options.t('title.manageDnas'),
      description: options.t('info.manageDnasDescription'),
    })

    this.Component =
      options.context.type === ActionContextType.Dao
        ? DaoComponent
        : WalletComponent

    this.defaults = {
      fieldNamePrefix: 'dnas',
      mode: DnasActionMode.Consume,
      consume: {
        fieldNamePrefix: 'dnas.consume',
        daoOwnedKeys: [],
        dnasKeyInUse: {
          daoAddr: '',
          dnasKeyOwner: '',
          dnasKeyHash: '',
          chainId: '',
        },
        files: [],
        isCreating: false,
        snailsForm: {
          title: '',
          description: '',
          category: '',
          creator: '',
          topic: [],
          network: '',
          music: '',
          uri: '',
        },
      },
      handle: {
        fieldNamePrefix: 'dnas.handle',
        dnas: {
          keyMetadata: '{}',
          keyOwner: '',
          chainId: '',
          apiKeyValue: '',
          keyHash: '',
          daoAddr: '',
          uploadLimit: '',
        },
        updating: false,
        newProfile: true,
      },
    }

    // Fire async init immediately since we may hide this action.
    this.init().catch(() => {})
  }

  async setup() {
    // immideately check if connected pubkey hex has registered profile with dnas api
  }

  encode(
    data: ManageDnasData,
    context: ActionEncodeContext
  ):
    | UnifiedCosmosMsg
    | UnifiedCosmosMsg[]
    | Promise<UnifiedCosmosMsg | UnifiedCosmosMsg[]> {
    throw new Error('Method not implemented.')
  }
  match(messages: ProcessedMessage[]): ActionMatch | Promise<ActionMatch> {
    throw new Error('Method not implemented.')
  }
  decode(
    messages: ProcessedMessage[]
  ): Partial<ManageDnasData> | Promise<Partial<ManageDnasData>> {
    throw new Error('Method not implemented.')
  }
}
