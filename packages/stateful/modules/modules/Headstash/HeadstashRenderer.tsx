import { toUtf8 } from '@cosmjs/encoding'
import { QueryClient, useQueries, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  cwInfuserExtraQueries,
  lazyNftCardInfosForDaoSelector,
  nftQueries,
  walletLazyNftCardInfosSelector,
} from '@dao-dao/state'
import {
  AddressInput,
  Button,
  ChainProvider,
  DaoSupportedChainPickerInput,

  InputLabel,

  NumericInput,
  RawActionsRenderer,
  RawActionsRendererMessages,
  SegmentedControls,
  useActionOptions,
  useCachedLoading,
  useCachedLoadingWithError,
  useChain,
  useDao,
} from '@dao-dao/stateless'
import {
  ActionContextType,
  ChainId,
  InfusionActionMode,
  LazyNftCardInfo,
  LoadingDataWithError,
  ModuleRendererProps,
  SegmentedControlsProps,
  TypedOption,
} from '@dao-dao/types'
import { MsgExecuteContract } from '@dao-dao/types/protobuf/codegen/cosmwasm/wasm/v1/tx'
import {
  CHAIN_GAS_MULTIPLIER,
  combineLoadingDataWithErrors,
  getChainForChainId,
  isValidBech32Address,
  makeCombineQueryResultsIntoLoadingDataWithError,
  makeValidateAddress,
  processError,
  validatePositive,
  validateRequired,
} from '@dao-dao/utils'

import { EntityDisplay, InfusionNFTSelectionModal } from '../../../components'
import { useAwaitNextBlock } from '../../../hooks'
import { useWallet } from '../../../hooks/useWallet'
import { HeadstashModuleData } from './types'
import { Bundle, InfusedCollection, InfusionParams, NFTCollection } from '@dao-dao/types/contracts/CwInfuser'
import { NewProposalPreview } from '../../../proposal-module-adapter/adapters/DaoProposalSingle/common/components/NewProposalPreview'
import { useActionEncodeContext } from '../../../actions'
import json5 from 'json5'
import { ArrowLeftOutlined, ArrowRightOutlined, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRightOutlined } from '@mui/icons-material'
import { WalletStatus } from '@cosmos-kit/core'

import { ManageHeadstashAction } from '../../../actions/core/actions'
import { HeadstashFaqModal } from './components/HeadstashFaqModal'
// import { infusionsSelecta } from './components/state/infusionSelecta'

export enum HeadstashActionMode {
  Create = 'create',
  Claim = 'claim',
  // Bloom = 'bloom',
}

export enum BloomMode {
  Registering,
  Preparing,
  Processing,
}

export type CreateHeadstashActionData = {
  headstashAdmin: string
  headstashCodeId: string
  homeChainId: string
}
// query and filter all shitstraps owned by entity that are full
//if none, display input for shitstrap contract address
export type CreateHeadstashOptions = {
  actionData: CreateHeadstashActionData | undefined
}

export type ClaimHeadstashActionData = {
  usingCustomHeadstash: boolean
  homeChainId: string
  eligibleAddr: string
  eligibleAddrSignature: string
  throwawayAddress: string
  headstashOwner?: string
  bloomActionData?: BloomHeadstashActionData
}
// query and filter all shitstraps owned by entity that are full
//if none, display input for shitstrap contract address
export type ClaimHeadstashOptions = {
  headstashAddr: String | undefined
}

export type BloomHeadstashActionData = {
  headstashChain: string
  destinationChain: string
  bloomMode: BloomMode
  thowawayAddress: string
}

// query and filter all shitstraps owned by entity that are full
//if none, display input for shitstrap contract address
export type BloomHeadstashOptions = {
  actionData: BloomHeadstashActionData | undefined
}
// data coming from action tabs content
export type HeadstashActionData = {
  headstashContractAddr: string
  mode: HeadstashActionMode
  create: CreateHeadstashActionData
  claim: ClaimHeadstashActionData

}


export const HeadstashRenderer =
  (props: ModuleRendererProps<HeadstashModuleData>) => {
    const { t } = useTranslation()
    const queryClient = useQueryClient()

    const awaitNextBlock = useAwaitNextBlock()
    const dao = useDao()

    // const {
    //   address,
    //   chain: { chainId: nativeChainId },
    // } = useActionOptions()
    // let encodeContext = useActionEncodeContext()

    const formMethods = useForm<HeadstashActionData>({
      defaultValues: {
        mode: HeadstashActionMode.Create,
        create: {},
        claim: {},
      },
    })

    const {
      watch,
      control,
      register,
      setValue,
      handleSubmit,
      formState: { errors },
    } = formMethods


    const [showFaqModal, setShowFaqModal] = useState<boolean>(false)

    const mode = watch('mode' as 'mode')
    const watchChainId = mode === 'create'
      ? watch('create.homeChainId' as 'create.homeChainId')
      : mode === 'claim' ? watch('claim.homeChainId' as 'claim.homeChainId') : ChainId.SecretMainnet
    const watchHeadstashAddr = watch('headstashContractAddr' as 'headstashContractAddr')

    // const infusionInfoLDWE = useInfusionContractFromForm(
    //   queryClient,
    //   watchChainId,
    //   watchInfusionMinter,
    //   watchInfusionId
    // )
    // const infusionConfigLDWE = useInfusionConfigFromForm(
    //   queryClient,
    //   watchChainId,
    //   watchInfusionMinter,
    // )
    // const infusionInfo =
    //   !infusionInfoLDWE.errored && !infusionInfoLDWE.loading
    //     ? infusionInfoLDWE.data
    //     : []
    // const infusionConfig =
    //   !infusionConfigLDWE.errored && !infusionConfigLDWE.loading
    //     ? infusionConfigLDWE.data
    //     : undefined



    const currentChain = getChainForChainId(watchChainId)

    const {
      address: walletAddress,
      getSigningClient,
      isWalletConnected,
      disconnect,
      connect,
      status,
    } = useWallet({ chainId: watchChainId })

    // Reset query when wallet disconnects
    useEffect(() => {
      if (status === WalletStatus.Disconnected || status === WalletStatus.Error) {
        // Optionally reset Recoil state or clear cache here if needed
        // resetRecoilState(walletLazyNftCardInfosSelector);
      }
    }, [status]);
    // useEffect(() => {
    //   console.log('DEBUG: watchChainId:', watchChainId)
    //   console.log('DEBUG: watchInfusionBundles:', watchInfusionBundles)
    // }, [selectedNftInfos])


    const tabs: SegmentedControlsProps<HeadstashActionData['mode']>['tabs'] = [
      ...(mode
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

    return (
      <FormProvider {...formMethods}>
        <ChainProvider chainId={watchChainId}>
          <div className="flex items-start justify-start space-x-2 mb-2">
            <Button
              variant="primary"
              size="lg"
              className="self-start mt-2"
              onClick={() => {
                setShowFaqModal(!showFaqModal)
              }}
            >
              {t('title.headstashFaq')}
            </Button>
          </div>

          <div className="flex flex-row items-start justify-start gap-8">
            <DaoSupportedChainPickerInput
              fieldName={'infuse.chainId'}
              onlyDaoChainIds={true}
              onChange={(chainId) => {

              }}
            />
          </div>

          <SegmentedControls<HeadstashActionData['mode']>
            className="mb-2"
            onSelect={(value) =>
              setValue(('mode') as 'mode', value)
            }
            selected={mode}
            tabs={tabs}
          // disabled={!dnasExists}
          />


          <div className="flex flex-col gap-1">
            <InputLabel name={t('form.selectInfusionMinter')} />
            <div className="flex min-w-0 flex-col flex-wrap gap-x-3 gap-y-2 sm:flex-row sm:items-stretch">
              <AddressInput
                defaultValue={watchHeadstashAddr}
                fieldName={'headstashContractAddr'}
                register={register}
                validation={[
                  validateRequired,
                  makeValidateAddress(currentChain.bech32Prefix),
                ]}
              />
            </div>
          </div>


          {mode === HeadstashActionMode.Create ? (
            <></>    // <CreateHeadstashComponent {...props} options={props.data.handle} />
          ) : null}

          {mode === HeadstashActionMode.Claim || isValidBech32Address(watchHeadstashAddr) ? (
            <></>   // <ClaimHeadstashComponent {...props.data.consume} />
          ) : null}

          <HeadstashFaqModal
            action={{
              loading: false,
              label: t('button.save'),
              onClick: () => {
                setShowFaqModal(false)
              },
            }}
            header={{ title: t('title.headstashFaq') }}
            onClose={() => setShowFaqModal(false)}
            visible={showFaqModal}
            containerClassName='no-scrollbar'
          />

        </ChainProvider>
      </FormProvider >
    )
  }
