import { ArrowBackIosRounded, ArrowRightAltRounded, SubdirectoryArrowRightRounded } from '@mui/icons-material'
import { useCallback,  RefCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Trans, useTranslation } from 'react-i18next'

import {
  Button,
  ImageDropInput,
  InputErrorMessage,
  InputLabel,
  Loader,
  SwitchCard,
  TextAreaInput,
  TextInput,
  Dropdown,
  SegmentedControlsTitle,
  FormSwitchCard,
  AddressInput,
  TokenInput,
  TokenAmountDisplay,
} from '@dao-dao/stateless'
import { ActionComponent, ActionContextType, Coin, GenericTokenBalance, LoadingData, Uint128 } from '@dao-dao/types'
import { convertMicroDenomToDenomWithDecimals, processError, uploadNft, validateRequired } from '@dao-dao/utils'


import { LLCJurisdictionOptions, Wrappr } from '../../types'
// import { wrapprMainnetChains } from '../../constants'
import { useActionOptions } from '../../../../../actions'
import clsx from 'clsx'

export type CreateWrapprData = {
  chainId: string
  entity: 'llc' | 'una' | 'undefined',
  jurisdiction: 'deleware' | 'offshore' | 'undefined',
  mode: 'llc' | 'una'| 'undefined'
  amount: number,
  denom: string,
  tokenId: string
  tokenUri: string
  // Used while creating, uploaded to IPFS.
  // uploaded: boolean
  // data?: {
  //   title: string
  //   description: string
  //   content: string
  // }
  _error?: string
}


const initiallySelectedOption = undefined;

// const llcJurisdictionOptions: LLCJurisdictionOptions[] = [
//   { value: 'deleware', label: 'Deleware'},
//   { value: 'offshore', label: 'Offshore'},
// ]



type CreateWrapprOptions = {
  tokens: LoadingData<GenericTokenBalance[]>
  wrapprLoading: LoadingData<Wrappr | undefined>
}

export const CreateWrapprComponent: ActionComponent<
CreateWrapprOptions
> = ({
  fieldNamePrefix, errors, isCreating, options: { wrapprLoading, tokens, }, }) => {
  const { t } = useTranslation()
  const { context } = useActionOptions()
  const { register, watch, setValue, setError, clearErrors} =
  useFormContext<CreateWrapprData>()

  const spendChainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const spendAmount = watch((fieldNamePrefix + 'amount') as 'amount')
  const spendDenom = watch((fieldNamePrefix + 'denom') as 'denom')

// on jurisdiction option select, set the value to the selected jurisdiction
  const handleOptionSelect = (selectedOption: LLCJurisdictionOptions, index: number) => {
    console.log(`Selected: ${selectedOption.value} (index: ${index})`);
    const jurisdiction = watch((fieldNamePrefix + 'jurisdiction') as 'jurisdiction')
    setValue((fieldNamePrefix + 'jurisdiction') as 'jurisdiction', jurisdiction)
  };
  

  const validatePossibleSpend = useCallback(
    (chainId: string, denom: string, amount: number): string | boolean => {
      if (tokens.loading) {
        return true
      }

      const insufficientBalanceI18nKey =
        context.type === ActionContextType.Wallet
          ? 'error.insufficientWalletBalance'
          : 'error.cantSpendMoreThanTreasury'

      const tokenBalance = tokens.data.find(
        ({ token }) =>
          token.chainId === chainId && token.denomOrAddress === denom
      )
      if (tokenBalance) {
        return (
          amount <= Number(tokenBalance.balance) ||
          t(insufficientBalanceI18nKey, {
            amount: convertMicroDenomToDenomWithDecimals(
              tokenBalance.balance,
              tokenBalance.token.decimals
            ).toLocaleString(undefined, {
              maximumFractionDigits: tokenBalance.token.decimals,
            }),
            tokenSymbol: tokenBalance.token.symbol,
          })
        )
      }

      return t('error.unknownDenom', { denom })
    },
    [context.type, t, tokens]
  )


  // Update amount+denom combo error each time either field is updated
  // instead of setting errors individually on each field. Since we only
  // show one or the other and can't detect which error is newer, this
  // would lead to the error not updating if amount set an error and then
  // denom was changed.
  useEffect(() => {
    // Prevent infinite loops by not setting errors if already set, and only
    // clearing errors unless already set.
    const currentError = errors?._error

    if (!spendDenom || !spendAmount) {
      if (currentError) {
        clearErrors((fieldNamePrefix + '_error') as '_error')
      }
      return
    }

    const validation = validatePossibleSpend(
      spendChainId,
      spendDenom,
      spendAmount
    )
    if (validation === true) {
      if (currentError) {
        clearErrors((fieldNamePrefix + '_error') as '_error')
      }
    } else if (typeof validation === 'string') {
      if (!currentError || currentError.message !== validation) {
        setError((fieldNamePrefix + '_error') as '_error', {
          type: 'custom',
          message: validation,
        })
      }
    }
  }, [
    spendAmount,
    spendDenom,
    setError,
    clearErrors,
    validatePossibleSpend,
    fieldNamePrefix,
    errors?._error,
    spendChainId,
  ])

  const selectedToken = tokens.loading
  ? undefined
  : tokens.data.find(
      ({ token }) =>
        token.chainId === spendChainId && token.denomOrAddress === spendDenom
    )
const balance = convertMicroDenomToDenomWithDecimals(
  selectedToken?.balance ?? 0,
  selectedToken?.token.decimals ?? 0
)


  const mode = watch((fieldNamePrefix + 'mode') as 'mode')

  return isCreating ? (
    <>

<div className="flex flex-col items-stretch gap-1">
<p className="header-text truncate leading-[5rem]">{t('title.selectWrapprType')}</p>
        <SegmentedControlsTitle
          editable={isCreating}
          fieldName={fieldNamePrefix + 'mode'}
          tabs={[
            {
              label: t('info.createLLCWrappr'),
              value: 'llc',
            },
            {
              label: t('button.createNonProfitWrappr'),
              value: 'una',
            },
          ]}
        />
      </div>
      
{mode === 'llc' && (

<div className="flex flex-col gap-4 sm:flex-row sm:items-start">
  {/* <Dropdown
  options={entity}
  placeholder="Select Wrappr Jurisdiction"
  selected={initiallySelectedOption}
  onSelect={handleOptionSelect}
  keepOpenOnSelect={false}
// containerClassName="" labelContainerClassName=""labelClassName=""iconClassName="" 
/> */}
<div className="flex flex-col gap-1">
            <InputLabel name={t('title.name')} />
            <TextInput
              disabled={!isCreating}
              error={errors?.data?.title}
              // fieldName={(fieldNamePrefix + 'data.title') as 'data.title'}
              register={register}
              validation={[validateRequired]}
            />
            <InputErrorMessage error={errors?.data?.title} />
          </div>
</div>
)}


{mode === 'una' && (
   <div className="flex grow flex-col gap-4">
   {/* <div className="flex flex-col gap-1">
     <InputLabel name={t('title.name')} />
     <TextInput
       disabled={!isCreating}
       error={errors?.data?.title}
       fieldName={(fieldNamePrefix + 'data.title') as 'data.title'}
       register={register}
       validation={[validateRequired]}
     />
     <InputErrorMessage error={errors?.data?.title} />
   </div>
   <div className="flex flex-col gap-1">
        <InputLabel name={t('title.mission')} />
        <TextAreaInput
          disabled={!isCreating}
          error={errors?.data?.content}
          fieldName={(fieldNamePrefix + 'data.content') as 'data.content'}
          register={register}
          rows={20}
          validation={[validateRequired]}
        />
        <InputErrorMessage error={errors?.data?.content} />
      </div> */}
 </div>

)}


<p className="header-text truncate leading-[5rem]">{t('title.selectWrapprChain')}</p>
<div className="flex flex-col gap-4 sm:flex-row sm:items-start">
  {/* <Dropdown
  options={''}
  placeholder="Select Chain To Mint Wrappr Contract"
  selected={initiallySelectedOption}
  onSelect={handleOptionSelect}
  containerClassName="optional-container-class" 
  labelContainerClassName="optional-label-container-class" 
  labelClassName="optional-label-class" 
  iconClassName="optional-icon-class" 
  keepOpenOnSelect={false} 
/> */}

</div>
<div className="flex flex-col gap-1">
<p className="header-text truncate leading-[5rem]">{t('title.configureGasAndMint')}</p>
<div className="flex min-w-0 flex-row flex-wrap items-stretch justify-between gap-x-3 gap-y-">
        <TokenInput
          amountError={errors?.amount}
          amountFieldName={(fieldNamePrefix + 'amount') as 'amount'}
          amountMax={balance}
          amountMin={convertMicroDenomToDenomWithDecimals(
            1,
            selectedToken?.token.decimals ?? 0
          )}
          amountStep={convertMicroDenomToDenomWithDecimals(
            1,
            selectedToken?.token.decimals ?? 0
          )}
          onSelectToken={({ chainId, denomOrAddress }) => {
            setValue((fieldNamePrefix + 'chainId') as 'chainId', chainId)
            setValue((fieldNamePrefix + 'denom') as 'denom', denomOrAddress)
          }}
          readOnly={!isCreating}
          register={register}
          selectedToken={selectedToken?.token}
          setValue={setValue}
          tokens={
            tokens.loading
              ? { loading: true }
              : {
                  loading: false,
                  data: tokens.data.map(({ balance, token }) => ({
                    ...token,
                    description:
                      t('title.balance') +
                      ': ' +
                      convertMicroDenomToDenomWithDecimals(
                        balance,
                        token.decimals
                      ).toLocaleString(undefined, {
                        maximumFractionDigits: token.decimals,
                      }),
                  })),
                }
          }
          watch={watch}
        />
      </div>

      {(errors?.amount || errors?.denom || errors?._error) && (
        <div className="mt-1 flex flex-col gap-1">
          <InputErrorMessage error={errors?.amount} />
          <InputErrorMessage error={errors?.denom} />
          <InputErrorMessage error={errors?._error} />
        </div>
      )}

      {selectedToken && isCreating && (
        <div className="mt-2 flex flex-row items-center gap-2">
          <p className="secondary-text">{t('title.balance')}:</p>

          <TokenAmountDisplay
            amount={balance}
            decimals={selectedToken.token.decimals}
            iconUrl={selectedToken.token.imageUrl}
            showFullAmount
            symbol={selectedToken.token.symbol}
          />
        </div>
      )}
{/* TODO: Handle Fees.

A static mint fee of X will be set to the DAO-DAO DAO treasury. 

Users will be able to select between
  - DAO Treasury
  - Connected Wallet
  - Create FeeGrant

To handle fees.
*/}

</div> 
    </>
  ) : wrapprLoading.loading || !wrapprLoading.data ? (
    <Loader />
  ) : (
    <>
      {isCreating && (
        // <Button
        //   className="self-start"
        //   onClick={continueEditing}
        //   variant="secondary"
        // >
        //   <ArrowBackIosRounded className="!h-4 !w-4" />
        //   {t('button.continueEditing')}
        // </Button>
        <></>
      )}
    </>
  )
}