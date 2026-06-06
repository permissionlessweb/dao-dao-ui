import { Add, WarningRounded } from '@mui/icons-material'
import { ComponentType, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ChainProvider,
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
  ModuleId,
  TransProps,
  AvEventInstance,
} from '@dao-dao/types'

import { useWallet } from '../../../../../hooks'
import { AvEventCardProps } from '../../components/stateless/AvEventCard'
import { AvEventLineProps, StatefulAvEventLineProps } from '../../components/stateful/AvEventLine'
import { StatefulEventCardProps } from '../../components/stateful/AvEventCard'


export interface TabRendererProps {
  avEventInstancesLoading: LoadingDataWithError<AvEventInstance[]>
  isMember: boolean
  createEventHref: string | undefined
  AvEventLine: ComponentType<StatefulAvEventLineProps>
  ButtonLink: ComponentType<ButtonLinkProps>
  AvEventCard: ComponentType<StatefulEventCardProps>
  Trans: ComponentType<TransProps>
}

export const TabRenderer = ({
  avEventInstancesLoading,
  isMember,
  createEventHref,
  ButtonLink,
  AvEventCard, AvEventLine,
  Trans,
}: TabRendererProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDao()
  const { daoSubpathComponents, goToDao } = useDaoNavHelpers()

  const openEventContract =
    daoSubpathComponents[0] === ModuleId.AvEvents
      ? daoSubpathComponents[1]
      : undefined
  const setOpenAvEventContract = useCallback(
    (contract?: string) =>
      goToDao(
        coreAddress,
        ModuleId.AvEvents + (contract ? `/${contract}` : ''),
        undefined,
        {
          shallow: true,
        }
      ),
    [coreAddress, goToDao]
  )

  // // Vesting payments that need a slash registered.
  // const vestingPaymentsNeedingSlashRegistration =
  //   avEventInstancesLoading.loading || avEventInstancesLoading.errored
  //     ? []
  //     : avEventInstancesLoading.data.filter(
  //       ({ hasUnregisteredSlashes }) => hasUnregisteredSlashes
  //     )

  // Vesting payments that have not yet been funded or fully claimed.
  const activeVestingPayments =
    avEventInstancesLoading.loading || avEventInstancesLoading.errored
      ? []
      : avEventInstancesLoading.data
  // .filter(({ completed }) => !completed)
  // .sort((a, b) => {
  //   // Sort the payments for the current wallet at the top.
  //   if (!walletAddress) {
  //     return 0
  //   }

  //   const aIsRecipient = a.vest.recipient === walletAddress
  //   const bIsRecipient = b.vest.recipient === walletAddress

  //   return aIsRecipient === bIsRecipient ? 0 : aIsRecipient ? -1 : 1
  // })

  // Vesting payments that have been funded or canceled and fully claimed.
  // const completedVestingPayments =
  //   avEventInstancesLoading.loading || avEventInstancesLoading.errored
  //     ? []
  //     : avEventInstancesLoading.data.filter(({ completed }) => completed)

  const [showingCompleted, setShowingCompleted] = useState(false)

  const [vestingPaymentModalOpen, SetAvEventModalOpen] =
    useState(!!openEventContract)

  const openEventInstance =
    avEventInstancesLoading.loading ||
      avEventInstancesLoading.errored ||
      !openEventContract
      ? undefined
      : avEventInstancesLoading.data.find(
        ({ eventContract }) =>
          eventContract === openEventContract
      )
  // Wait for modal to close before clearing the open vesting payment to prevent
  // UI flicker.
  useEffect(() => {

    if (!vestingPaymentModalOpen && openEventInstance) {
      const timeout = setTimeout(() => setOpenAvEventContract(undefined), 200)
      return () => clearTimeout(timeout)
    }
  }, [
    openEventContract,
    openEventInstance,
    setOpenAvEventContract,
    vestingPaymentModalOpen,
  ])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between gap-8">
        <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-1">
          <p className="title-text text-text-body">
            {t('title.avEvents')}
          </p>

          {/* <p className="secondary-text">
            {t('info.vestingPaymentsRefreshSeconds', { seconds: 30 })}
          </p> */}
        </div>

        {createEventHref && (
          <Tooltip
            title={
              !isMember
                ? t('error.mustBeMemberToCreateAvEvent')
                : undefined
            }
          >
            <ButtonLink
              className="shrink-0"
              disabled={!isMember}
              href={createEventHref}
              variant={'primary'
                // If slashes need to be registered, the button should be
                // secondary so it stands out less than the warning.
                // vestingPaymentsNeedingSlashRegistration.length > 0
                //   ? 'secondary'
                //   : 'primary'
              }
            >
              <Add className="!h-4 !w-4" />
              <span className="hidden md:inline">
                {t('button.newAvEvent')}
              </span>
              <span className="md:hidden">{t('button.new')}</span>
            </ButtonLink>
          </Tooltip>
        )}
      </div>

      <div className="mb-9">
        {avEventInstancesLoading.loading ? (
          <div className="border-t border-border-secondary pt-6">
            <ActiveAvEventLineHeader />

            <LineLoaders lines={20} type="avEvent" />
          </div>
        ) : avEventInstancesLoading.errored ? (
          <ErrorPage error={avEventInstancesLoading.error} />
        ) : avEventInstancesLoading.data.length ? (
          <div className="space-y-6 border-t border-border-secondary pt-6">


            {activeVestingPayments.length > 0 && (
              <div className="space-y-1">
                <ActiveAvEventLineHeader />

                {activeVestingPayments.map((eventInfo, index) => (
                  <AvEventLine
                    key={
                      eventInfo.eventChainId + eventInfo.eventContract
                    }
                    onClick={() => {
                      SetAvEventModalOpen(true)
                      setOpenAvEventContract(eventInfo.eventContract)
                      console.log("daoSubpathComponents", daoSubpathComponents)
                      console.log("openEventContract", openEventContract)
                      console.log("openEventInstance", openEventInstance)
                      console.log("setOpenAvEventContract", setOpenAvEventContract)
                      console.log("vestingPaymentModalOpen", vestingPaymentModalOpen)
                    }}
                    transparentBackground={index % 2 !== 0}
                    eventInfo={eventInfo}
                  />
                ))}
              </div>
            )}


            {/* {completedVestingPayments.length > 0 && (<></>)} */}
            {/* <div className="link-text ml-2 flex flex-row items-center gap-3 text-text-secondary">
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
                    {' • '}
                    {t('info.numPayments', {
                      count: completedVestingPayments.length,
                    })}
                  </p>
                </div> */}

            {/* {showingCompleted && (
                  <div className="space-y-1">
                    <div className="secondary-text mb-4 !mt-6 grid grid-cols-2 items-center gap-4 px-4 md:grid-cols-[2fr_3fr_3fr_4fr]">
                      <p>{t('title.recipient')}</p>
                      <p className="hidden md:block">{t('title.finished')}</p>
                      <p className="hidden md:block">{t('title.available')}</p>
                      <p className="text-right">{t('title.totalVested')}</p>
                    </div>

                    {completedVestingPayments.map((vestingInfo, index) => (
                      <VestingPaymentLine
                        key={
                          vestingInfo.chainId +
                          vestingInfo.vestingContractAddress
                        }
                        onClick={() => {
                          SetAvEventModalOpen(true)
                          setOpenAvEventContract(
                            vestingInfo.vestingContractAddress
                          )
                        }}
                        transparentBackground={index % 2 !== 0}
                        vestingInfo={vestingInfo}
                      />
                    ))}
                  </div>
                )} */}



          </div>
        ) : (
          <NoContent
            Icon={WarningRounded}
            actionNudge={t('info.createFirstOneQuestion')}
            body={t('info.noAvEventsForThisDAO')}
            buttonLabel={t('button.create')}
            href={createEventHref}
          />
        )}
      </div>

      <Modal
        containerClassName="border-border-primary w-full"
        contentContainerClassName="!p-0"
        hideCloseButton
        onClose={() => SetAvEventModalOpen(false)}
        visible={vestingPaymentModalOpen && !!openEventInstance}
      >
        {openEventInstance ? (
          <ChainProvider chainId={openEventInstance.eventChainId}>
            <AvEventCard eventInfo={openEventInstance} />
          </ChainProvider>
        ) : (
          <Loader />
        )}
      </Modal>
    </div>
  )
}

const ActiveAvEventLineHeader = () => {
  const { t } = useTranslation()

  return (
    <div className="secondary-text mb-4 mt-2 grid grid-cols-2 items-center gap-4 px-4 md:grid-cols-[2fr_3fr_3fr_4fr]">
      <p>{t('title.eventCurator')}</p>
      <p className="hidden md:block">{t('title.eventStartDate')}</p>
      <p className="hidden md:block">{t('title.eventTicketTypes')}</p>
      {/* <p className="text-right">{t('title.eventForum')}</p>
      <p className="text-right">{t('title.ticketResaleMarketplace')}</p> */}
    </div>
  )
}
