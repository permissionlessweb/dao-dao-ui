import { Check } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  Button,
  ChainLabel,
  ChainProvider,
  InputErrorMessage,
  Tooltip,
  useActionOptions,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import {
  AccountType,
  ActionKey,
  ModuleEditorProps,
  AvEventModuleData, LATEST_CW_AVE_CONTRACT_VERSION
} from '@dao-dao/types'
import { FactoryInitMsg } from '@dao-dao/types/contracts/CwAveFactory'
import {
  getAccountAddress,
  getLicenseFee,
  getSupportedChainConfig,
  instantiateSmartContract,
  mustGetSupportedChainConfig,
  processError,
} from '@dao-dao/utils'

import { ConnectWallet } from '../../../components'
import { useWallet } from '../../../hooks/useWallet'

export const AvEventModuleEditor = (
  props: ModuleEditorProps<AvEventModuleData>
) => {
  const { t } = useTranslation()

  const {
    config: { polytone = {} },
  } = useSupportedChainContext()

  const {
    address,
    chain: { chainId: nativeChainId },
  } = useActionOptions()

  const { setError, clearErrors, watch } =
    useFormContext<AvEventModuleData>()
  // Multi-chain unified field of multiple deployers.
  const deployers = watch((props.fieldNamePrefix + 'deployers') as 'deployers')
  // Old single-chain field.
  const nativeSingleChainVersion = watch(
    (props.fieldNamePrefix + 'version') as 'version'
  )

  // A DAO can create a avEvent payment factory on the current chain and any
  // polytone connection that is also a supported chain (since the avEvent
  // factory+contract only exists on supported chains). When creating a DAO, no
  // cross-chain accounts exist or can be created, so only show the native
  // chain.
  const possibleChainIds =
    props.type === 'daoCreation'
      ? [nativeChainId]
      : [
        nativeChainId,
        ...Object.keys(polytone).filter((chainId) =>
          getSupportedChainConfig(chainId)
        ),
      ]

  // Prevent action from being submitted if the avEvent deployers map does not
  // exist.
  const factoriesExist = deployers && Object.keys(deployers).length > 0
  useEffect(() => {
    if (!factoriesExist) {
      setError((props.fieldNamePrefix + 'deployers') as 'deployers', {
        type: 'manual',
        message: t('error.noAvEventManagersCreated'),
      })
    } else {
      clearErrors((props.fieldNamePrefix + 'deployers') as 'deployers')
    }
  }, [setError, clearErrors, t, props.fieldNamePrefix, factoriesExist])

  // Whether or not any of the deployers are on an old version.
  const hasUpdate = deployers
    ? Object.values(deployers).some(
      ({ version }) => version < LATEST_CW_AVE_CONTRACT_VERSION
    )
    : // If no deployers, still using old single-chain version.
    !nativeSingleChainVersion ||
    nativeSingleChainVersion < LATEST_CW_AVE_CONTRACT_VERSION

  return (
    <div className="mt-2 flex flex-col items-start gap-4">
      <p className="body-text max-w-prose break-words">
        {t('info.avEventManagerExplanation', {
          context: props.type,
        })}
      </p>

      <InputErrorMessage error={props.errors?.deployers} />

      {possibleChainIds.map((chainId) => (
        <AvEventFactoryChain key={chainId} {...props} chainId={chainId} />
      ))}

      {props.isCreating && hasUpdate && (
        <p className="body-text max-w-prose">{t('info.updateAvEventModule')}</p>
      )}
    </div>
  )
}

type AvEventFactoryChainProps = ModuleEditorProps<AvEventModuleData> & {
  /**
   * Chain ID.
   */
  chainId: string
}

const AvEventFactoryChain = ({
  chainId,
  isCreating,
  fieldNamePrefix,
  ...props
}: AvEventFactoryChainProps) => {
  const { t } = useTranslation()
  const nativeChainId =
    props.accounts.find((a) => a.type === AccountType.Base)?.chainId ||
    props.accounts[0].chainId
  const daoChainAccountAddress = getAccountAddress({
    accounts: props.accounts,
    chainId,
  })
  const { codeIds } = mustGetSupportedChainConfig(chainId)
  const {
    address: walletAddress,
    isWalletConnected,
    getSigningClient,
  } = useWallet({
    chainId,
  })
  const isNative = chainId === nativeChainId

  const { watch, setValue } = useFormContext<AvEventModuleData>()
  const chainFactory = (watch((fieldNamePrefix + 'deployers') as 'deployers') ||
    {})[chainId]
  // const oldFactories = watch(
  //   (fieldNamePrefix + 'oldFactories') as 'oldFactories'
  // )
  // Old single-chain fields.
  // const nativeSingleChainFactory = watch(
  //   (fieldNamePrefix + 'deployer') as 'deployer'
  // )
  const nativeSingleChainVersion = watch(
    (fieldNamePrefix + 'version') as 'version'
  )

  // If using latest version of single-chain factory on native chain, move to
  // deployers map automatically.
  // useEffect(() => {
  //   if (
  //     isNative &&
  //     !chainFactory &&
  //     nativeSingleChainFactory &&
  //     nativeSingleChainVersion === LATEST_CW_AVE_CONTRACT_VERSION
  //   ) {
  //     setValue(
  //       (fieldNamePrefix + `deployers.${chainId}`) as `deployers.${string}`,
  //       {
  //         address: nativeSingleChainFactory,
  //         version: nativeSingleChainVersion,
  //       }
  //     )
  //     // Clear old single-chain fields.
  //     setValue((fieldNamePrefix + 'factory') as 'factory', undefined)
  //     setValue((fieldNamePrefix + 'version') as 'version', undefined)
  //   }
  // }, [
  //   chainFactory,
  //   chainId,
  //   fieldNamePrefix,
  //   isNative,
  //   nativeChainId,
  //   nativeSingleChainFactory,
  //   nativeSingleChainVersion,
  //   setValue,
  // ])

  const [instantiating, setInstantiating] = useState(false)
  const instantiateAvEventFactory = async () => {
    if (!walletAddress) {
      toast.error(t('error.logInToContinue'))
      return
    }

    setInstantiating(true)
    try {
      const createdFactoryAddress = await instantiateSmartContract(
        getSigningClient,
        walletAddress,
        codeIds.CwAveFactory,
        `CwAveFactory-v${LATEST_CW_AVE_CONTRACT_VERSION}_${chainId}_${Date.now()}`,
        {
          owner: daoChainAccountAddress,
          cw_ave_id: codeIds.CwAve,
        } as FactoryInitMsg,
        [getLicenseFee(chainId)],
        daoChainAccountAddress
      )

      // If factory already set, add to list of old deployers.
      // const existingFactory =
      //   chainFactory ||
      //   (isNative && nativeSingleChainFactory
      //     ? {
      //       address: nativeSingleChainFactory,
      //       version: nativeSingleChainVersion,
      //     }
      //     : undefined)
      // if (existingFactory) {
      //   // setValue((fieldNamePrefix + 'oldFactories') as 'oldFactories', [
      //   //   ...(oldFactories ?? []),
      //   //   {
      //   //     chainId,
      //   //     address: existingFactory.address,
      //   //     version: existingFactory.version,
      //   //   },
      //   // ])
      // }

      // If native chain, make sure we've cleared the old single-chain fields.
      if (isNative) {
        setValue((fieldNamePrefix + 'deployer') as 'deployer', undefined)
        setValue((fieldNamePrefix + 'version') as 'version', undefined)
      }

      // Update chain factory.
      setValue(
        (fieldNamePrefix + `deployers.${chainId}`) as `deployers.${string}`,
        {
          address: createdFactoryAddress,
          version: LATEST_CW_AVE_CONTRACT_VERSION,
        }
      )

      toast.success(t('success.created'))
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setInstantiating(false)
    }
  }

  // If not creating and no factory exists for this chain, show nothing.
  if (
    !isCreating &&
    !chainFactory &&
    (!isNative)
  ) {
    return null
  }

  const crossChainAccountActionExists =
    props.type === 'action' &&
    props.allActionsWithData.some(
      (action) =>
        action.actionKey === ActionKey.CreateCrossChainAccount &&
        action.data?.chainId === chainId
    )

  return (
    <div className="flex flex-col items-start gap-x-4 gap-y-2 xs:flex-row xs:items-center">
      <ChainLabel chainId={chainId} />

      {
        // If not creating, still show a check even if not on the latest
        // version, because a factory exists on this chain. If it didn't this
        // would not render based on the if statement above.
        !isCreating ||
          chainFactory?.version === LATEST_CW_AVE_CONTRACT_VERSION ? (
          <Check className="!h-6 !w-6" />
        ) : // If DAO does not have cross-chain account, add button to create action.
          props.type === 'action' && !daoChainAccountAddress ? (
            <Tooltip title={t('info.avEventCrossChainAccountCreationTooltip')}>
              <Button
                disabled={crossChainAccountActionExists}
                onClick={() =>
                  props.addAction?.({
                    actionKey: ActionKey.CreateCrossChainAccount,
                    data: {
                      chainId,
                    },
                  })
                }
                variant="primary"
              >
                {crossChainAccountActionExists
                  ? t('button.accountCreationActionAdded')
                  : t('button.addAccountCreationAction')}
              </Button>
            </Tooltip>
          ) : isWalletConnected ? (
            <Button
              loading={instantiating}
              onClick={instantiateAvEventFactory}
              variant="primary"
            >
              {
                // If not latest version, show button to update. The old
                // single-chain factory is automatically moved to the deployers
                // map (and thus `chainFactory`) when it's the latest version, so
                // if `chainFactory` is undefined and `nativeSingleChainFactory`
                // is defined, the old factory needs to be updated. The update
                // function automatically takes care of moving it to the new
                // deployers map and clearing the old state. Thus, show update if
                // the version is behind, OR if the native factory still exists.
                (chainFactory &&
                  chainFactory.version < LATEST_CW_AVE_CONTRACT_VERSION) ||
                  (isNative)
                  ? t('button.prepareUpdate')
                  : t('button.create')
              }
            </Button>
          ) : (
            <ChainProvider chainId={chainId}>
              <ConnectWallet />
            </ChainProvider>
          )
      }
    </div>
  )
}
