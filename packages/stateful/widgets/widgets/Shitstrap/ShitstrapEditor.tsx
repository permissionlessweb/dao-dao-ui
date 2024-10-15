import { Check } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  Button,
  ChainLabel,
  ChainProvider,
  ConnectWallet,
  InputErrorMessage,
  Tooltip,
  useSupportedChainContext,
} from '@dao-dao/stateless'
import { AccountType, ActionKey, WidgetEditorProps } from '@dao-dao/types'
import { ShitstrapFactoryInstantiateMsg } from '@dao-dao/types/contracts/ShitstrapFactory'
import {
  getAccountAddress,
  getSupportedChainConfig,
  instantiateSmartContract,
  mustGetSupportedChainConfig,
  processError,
} from '@dao-dao/utils'

import { useWallet } from '../../../hooks'
import { ShitstrapPaymentWidgetData } from './types'

export const ShitStrapEditor = (
  props: WidgetEditorProps<ShitstrapPaymentWidgetData>
) => {
  const { t } = useTranslation()
  const {
    chainId: nativeChainId,
    config: { polytone = {} },
  } = useSupportedChainContext()

  // Create form
  const { setError, clearErrors, watch } =
    useFormContext<ShitstrapPaymentWidgetData>()
  // Multi-chain unified field of multiple factories.
  const factories = watch((props.fieldNamePrefix + 'factories') as 'factories')

  // A DAO can create a shitstrap on the current chain and any
  // polytone connection that is also a supported chain.
  // TODO: filter by chains with deployed instances
  const possibleChainIds = [
    nativeChainId,
    ...Object.keys(polytone).filter((chainId) =>
      getSupportedChainConfig(chainId)
    ),
  ]

  // Prevent action from being submitted if the shitstraps map does not
  // exist.
  const contractsExists = factories && Object.keys(factories).length > 0
  useEffect(() => {
    if (!contractsExists) {
      setError((props.fieldNamePrefix + 'factories') as 'factories', {
        type: 'manual',
        message: t('error.noShitstrapManagerCreated'),
      })
    } else {
      clearErrors((props.fieldNamePrefix + 'factories') as 'factories')
    }
  }, [setError, clearErrors, t, props.fieldNamePrefix, contractsExists])

  return (
    <div className="mt-2 flex flex-col items-start gap-4">
      <p className="body-text max-w-prose break-words">
        {t('info.shitstrapManagerExplanation', {
          context: props.type,
        })}
      </p>

      <InputErrorMessage error={props.errors?.factories} />

      {possibleChainIds.map((chainId) => (
        <ShitStrapChain key={chainId} {...props} chainId={chainId} />
      ))}
    </div>
  )
}

type ShitStrapChainProps = WidgetEditorProps<ShitstrapPaymentWidgetData> & {
  /**
   * Chain ID.
   */
  chainId: string
}

const ShitStrapChain = ({
  chainId,
  isCreating,
  fieldNamePrefix,
  ...props
}: ShitStrapChainProps) => {
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
  const { watch, setValue } = useFormContext<ShitstrapPaymentWidgetData>()
  const shitStrap = (watch((fieldNamePrefix + 'factories') as 'factories') ||
    {})[chainId]
  const nativeSingleChainVersion = watch(
    (fieldNamePrefix + 'version') as 'version'
  )

  const [instantiating, setInstantiating] = useState(false)
  const instantiateShitStrapFactory = async () => {
    if (!walletAddress) {
      toast.error(t('error.logInToContinue'))
      return
    }
    setInstantiating(true)
    try {
      const createdShitStrapAddress = await instantiateSmartContract(
        getSigningClient,
        walletAddress,
        codeIds.ShitStrapFactory!,
        `ShitStrapFactory-v1_${chainId}_${Date.now()}`,
        {
          shitstrap_id: codeIds.ShitStrap!,
        } as ShitstrapFactoryInstantiateMsg,
        undefined,
        daoChainAccountAddress
      )

      // Update chain factory.
      setValue(
        (fieldNamePrefix + `factories.${chainId}`) as `factories.${string}`,
        {
          address: createdShitStrapAddress,
          version: 1,
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
  if (!isCreating && !shitStrap && !isNative) {
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
      {!isCreating || shitStrap?.version === 1 ? (
        <Check className="!h-6 !w-6" />
      ) : // If DAO does not have cross-chain account, add button to create action.
      props.type === 'action' && !daoChainAccountAddress ? (
        <Tooltip title={t('info.shitstrapCrossChainAccountCreationTooltip')}>
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
          onClick={instantiateShitStrapFactory}
          variant="primary"
        >
          {t('button.create')}
        </Button>
      ) : (
        <ChainProvider chainId={chainId}>
          <ConnectWallet />
        </ChainProvider>
      )}
    </div>
  )
}
