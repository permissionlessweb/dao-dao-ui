import { Add, WarningRounded } from '@mui/icons-material'
import { QueryClient, useQueries } from '@tanstack/react-query'
import { ComponentType, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { tokenQueries } from '@dao-dao/state/query'
import {
  ChainProvider,
  Dropdown,
  DropdownIconButton,
  ErrorPage,
  LineLoaders,
  Loader,
  Modal,
  NoContent,
  Tooltip,
  useDao,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import {
  ButtonLinkProps,
  LoadingDataWithError,

  TransProps,
  TypedOption,
  ModuleId,
} from '@dao-dao/types'
import {
  StatefulShitStrapPaymentCardProps,
  StatefulShitStrapPaymentLineProps,
} from '@dao-dao/types/shit'
import { ShitstrapInfoGeneric } from '@dao-dao/types/contracts/ShitStrap'
import { PossibleShitWithGenericToken } from '@dao-dao/types/contracts/ShitStrap'
import { makeCombineQueryResultsIntoLoadingDataWithError } from '@dao-dao/utils'

export interface TabRendererProps {
  shitStrapsLoading: LoadingDataWithError<ShitstrapInfoGeneric[]>
  queryClient: QueryClient
  isMember: boolean
  createShitStrapHref: string | undefined
  ButtonLink: ComponentType<ButtonLinkProps>
  ShitStrapCard: ComponentType<StatefulShitStrapPaymentCardProps>
  ShitStrapLine: ComponentType<StatefulShitStrapPaymentLineProps>
  Trans: ComponentType<TransProps>
}

export const ShitstrapTabRenderer = ({
  shitStrapsLoading,
  queryClient,
  isMember,
  createShitStrapHref,
  ButtonLink,
  ShitStrapCard,
  ShitStrapLine,
  Trans,
}: TabRendererProps) => {
  const { t } = useTranslation()

  // get dao details
  const { coreAddress } = useDao()
  const { daoSubpathComponents, goToDao } = useDaoNavHelpers()
  // get connected wallet details
  // const { address: walletAddress } = useWallet()
  const [usingFilters, setUseFilters] = useState(false)

  const openShitstrapContract =
    daoSubpathComponents[0] === ModuleId.ShitStrap
      ? daoSubpathComponents[1]
      : undefined

  const setOpenShitStrapContract = useCallback(
    (contract?: string) =>
      goToDao(
        coreAddress,
        ModuleId.ShitStrap + (contract ? `/${contract}` : ''),
        undefined,
        { shallow: true }
      ),
    [coreAddress, goToDao]
  )

  // type gaurd function guarantees data property exists if true
  function isLoadingDataWithErrorLoaded<D>(
    data: LoadingDataWithError<D>
  ): data is { loading: false; errored: false; data: D } {
    return !data.loading && !data.errored
  }

  const allShitstraps = isLoadingDataWithErrorLoaded(shitStrapsLoading)
    ? shitStrapsLoading.data
    : []
  const activeShitstraps = isLoadingDataWithErrorLoaded(shitStrapsLoading)
    ? shitStrapsLoading.data.filter(({ full }) => !full)
    : []
  const completeShitstraps = isLoadingDataWithErrorLoaded(shitStrapsLoading)
    ? shitStrapsLoading.data.filter(({ full }) => full)
    : []
  const [filteredShitstraps, setFilteredShitstraps] = useState(allShitstraps)
  const shitstrapsToDisplay =
    filteredShitstraps.length != 0 ? filteredShitstraps : activeShitstraps

  const shitstrapEligibleAssetsGenericTokenLoading = useQueries({
    queries: activeShitstraps.flatMap(({ chainId, possibleShit }) =>
      possibleShit.map((ps) => {
        const options = {
          chainId,
          type: ps.type,
          denomOrAddress: ps.denomOrAddress,
        }
        return tokenQueries.info(options)
      })
    ),
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      firstLoad: 'one',
    }),
  })

  const [showingCompleted, setShowingCompleted] = useState(false)
  const [shitstrapPaymentModalOpen, setShitstrapPaymentModalOpen] = useState(
    !!openShitstrapContract
  )
  const openShitstrapPayment = activeShitstraps.find(
    ({ shitstrapContractAddr }) =>
      shitstrapContractAddr === openShitstrapContract
  )

  // 1. create filterable options from all shitstrap contracts DAO owns
  // - accepted shit
  // - chain-id
  // - token
  const possibleShitOptions: TypedOption<PossibleShitWithGenericToken>[] =
    allShitstraps.flatMap((shitstrapInfo) => {
      return shitstrapInfo.possibleShit.map((asset, index) => {
        // console.log(index, asset, somePossibleshit)
        const displayToken =
          asset.source.chainId != asset.chainId ? asset.symbol : asset.symbol
        return {
          label: asset.symbol,
          value: { shit_rate: asset.shit_rate, token: asset },
        }
      })
    })
  const beingShitOptions: TypedOption<PossibleShitWithGenericToken>[] =
    allShitstraps.flatMap((shitstrapInfo) => {
      return {
        label: shitstrapInfo.shit.symbol,
        value: { shit_rate: shitstrapInfo.cutoff, token: shitstrapInfo.shit },
      }
    })

  const allPossibleShitOptions = possibleShitOptions.map((asset, index) => ({
    value: [asset],
    label: asset.label,
  }))

  const allBeingShitOptions = beingShitOptions.map((asset, index) => ({
    value: [asset],
    label: asset.label,
  }))

  const handleFilterByAcceptedShit = (
    option: typeof possibleShitOptions,
    index: number
  ) => {
    const filteredList = allShitstraps.filter((shitstrap) =>
      shitstrap.possibleShit.find((ac, index) => {
        return ac.symbol === option[index].value.token.symbol
      })
    )
    setFilteredShitstraps(filteredList)
  }

  const handleFilterByBeingShit = (
    option: typeof beingShitOptions,
    index: number
  ) => {
    console.log(index)
    const filteredList = allShitstraps.filter(
      (shitstrap) =>
        option[index].value.token.denomOrAddress ===
        shitstrap.shit.denomOrAddress
    )
    setFilteredShitstraps(filteredList)
  }

  // Wait for modal to close before clearing the open shitstrap payment modal to prevent
  // UI flicker.
  useEffect(() => {
    if (!shitstrapPaymentModalOpen && openShitstrapPayment) {
      const timeout = setTimeout(() => setOpenShitStrapContract(undefined), 200)
      return () => clearTimeout(timeout)
    }
  }, [
    openShitstrapContract,
    openShitstrapPayment,
    setOpenShitStrapContract,
    shitstrapPaymentModalOpen,
  ])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between gap-8">
        <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-1">
          <p className="title-text text-text-body">
            {t('title.availableShitstraps')}
          </p>
          <p className="secondary-text">{t('info.shitstrapSecondaryText')}</p>
        </div>
      </div>
      <div className=" items-center  mb-9">
        {createShitStrapHref && (
          <Tooltip
            title={
              !isMember
                ? t('error.mustBeMemberToCreateShitstrapPayment')
                : undefined
            }
          >
            <ButtonLink
              className="shrink-0"
              disabled={!isMember}
              href={createShitStrapHref}
              variant="primary"
            >
              <Add className="!h-4 !w-4" />
              <span className="hidden md:inline">
                {t('button.newShitstrap')}
              </span>
              <span className="md:hidden">{t('button.new')}</span>
            </ButtonLink>
          </Tooltip>
        )}
        {/* TODO: Add header for filter */}
        {shitStrapsLoading.loading ? (
          <div className="border-t border-border-secondary pt-6">
            {/* <ActiveVestingPaymentLineHeader /> */}
            <LineLoaders lines={20} type="shitstrap" />
          </div>
        ) : shitStrapsLoading.errored ? (
          <ErrorPage error={shitStrapsLoading.error} />
        ) : shitStrapsLoading.data.length ? (
          <div className="space-y-6 border-t border-border-secondary pt-6">
            <div className="flex flex-row items-stretch gap-2">
              {/* display map of eligible assets & their shit_rates */}
              <div onClick={(event) => event.stopPropagation()}>
                <Dropdown
                  onSelect={handleFilterByAcceptedShit}
                  options={allPossibleShitOptions}
                  placeholder={t('info.filterByAcceptedShit', {
                    number: possibleShitOptions.length,
                  })}
                />
              </div>

              {/* display map of tokens being shit */}
              <div onClick={(event) => event.stopPropagation()}>
                <Dropdown
                  onSelect={handleFilterByBeingShit}
                  options={allBeingShitOptions}
                  placeholder={t('info.filterByBeingShit', {
                    number: possibleShitOptions.length,
                  })}
                />
              </div>
            </div>
            {shitstrapsToDisplay.length > 0 && (
              <div className="space-y-1">
                {/* <ActiveShitStrapLineHeader /> */}
                {shitstrapsToDisplay.map((shitstrapInfo, index) => (
                  <ShitStrapLine
                    key={
                      shitstrapInfo.chainId +
                      shitstrapInfo.shitstrapContractAddr
                    }
                    eligibleShit={shitstrapEligibleAssetsGenericTokenLoading}
                    onClick={() => {
                      setShitstrapPaymentModalOpen(true)
                      setOpenShitStrapContract(
                        shitstrapInfo.shitstrapContractAddr
                      )
                    }}
                    queryClient={queryClient}
                    shitstrapInfo={shitstrapInfo}
                    transparentBackground={index % 2 !== 0}
                  />
                ))}
              </div>
            )}

            {completeShitstraps.length > 0 && (
              <div className="space-y-4">
                <div className="link-text ml-2 flex flex-row items-center gap-3 text-text-secondary">
                  <DropdownIconButton
                    className="text-icon-primary"
                    open={showingCompleted}
                    toggle={() => setShowingCompleted((s) => !s)}
                  />

                  <p
                    className="cursor-pointer"
                    onClick={() => setShowingCompleted((s) => !s)}
                  >
                    {t('title.completed')}
                    {/* eslint-disable-next-line i18next/no-literal-string */}
                    {' • '}
                    {t('info.numPayments', {
                      count: completeShitstraps.length,
                    })}
                  </p>
                </div>

                {showingCompleted && (
                  <div className="space-y-1">
                    <div className="secondary-text mb-4 !mt-6 grid grid-cols-2 items-center gap-4 px-4 md:grid-cols-[2fr_3fr_3fr_4fr]">
                      <p>{t('title.recipient')}</p>
                      <p className="hidden md:block">{t('title.finished')}</p>
                      <p className="hidden md:block">{t('title.available')}</p>

                      {completeShitstraps.map((shitstrapInfo, index) => (
                        <ShitStrapLine
                          key={
                            shitstrapInfo.chainId +
                            shitstrapInfo.shitstrapContractAddr
                          }
                          eligibleShit={
                            shitstrapEligibleAssetsGenericTokenLoading
                          }
                          onClick={() => {
                            setShitstrapPaymentModalOpen(true)
                            setOpenShitStrapContract(
                              shitstrapInfo.shitstrapContractAddr
                            )
                          }}
                          queryClient={queryClient}
                          shitstrapInfo={shitstrapInfo}
                          transparentBackground={index % 2 !== 0}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <NoContent
            Icon={WarningRounded}
            actionNudge={t('info.createFirstOneQuestion')}
            body={t('info.noShitstrapPaymentsFound')}
            buttonLabel={t('button.create')}
            href={createShitStrapHref}
          />
        )}
      </div>

      <Modal
        containerClassName="border-border-primary w-full"
        contentContainerClassName="!p-0"
        hideCloseButton
        onClose={() => setShitstrapPaymentModalOpen(false)}
        visible={shitstrapPaymentModalOpen && !!openShitstrapContract}
      >
        {openShitstrapPayment ? (
          <ChainProvider chainId={openShitstrapPayment.chainId}>
            <ShitStrapCard
              queryClient={queryClient}
              shitstrapInfo={openShitstrapPayment}
              usingPersonalShit={false}
            />
          </ChainProvider>
        ) : (
          <Loader />
        )}
      </Modal>
    </div>
  )
}
