import { useTranslation } from "react-i18next";
import { ChainProvider, DropdownIconButton, ErrorPage, Loader, Modal, NoContent, Tooltip, useDao, useDaoNavHelpers } from "@dao-dao/stateless";
import { useWallet } from "../../../../../hooks";
import { ComponentType, useCallback, useEffect, useState } from "react";
import { ButtonLinkProps, LoadingDataWithError, StatefulShitStrapPaymentCardProps, StatefulShitStrapPaymentLineProps, TransProps, WidgetId } from "@dao-dao/types";
import { ShitstrapInfo } from "@dao-dao/types/contracts/ShitStrap";
import { Add, WarningRounded } from "@mui/icons-material";

export interface TabRendererProps {
    shitStrapsLoading: LoadingDataWithError<ShitstrapInfo[]>
    isMember: boolean
    createShitStrapHref: string | undefined
    ButtonLink: ComponentType<ButtonLinkProps>
    ShitStrapCard: ComponentType<StatefulShitStrapPaymentCardProps>
    ShitStrapLine: ComponentType<StatefulShitStrapPaymentLineProps>
    Trans: ComponentType<TransProps>
}

export const TabRenderer = ({
    shitStrapsLoading,
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
    const { address: walletAddress } = useWallet()

    const openShitstrapContract =
        daoSubpathComponents[0] === WidgetId.ShitStrap
            ? daoSubpathComponents[1]
            : undefined

    const setOpenShitStrapContract = useCallback(
        (contract?: string) =>
            goToDao(
                coreAddress,
                WidgetId.ShitStrap + (contract ? `/${contract}` : ''),
                undefined,
                {
                    shallow: true,
                }
            ),
        [coreAddress, goToDao]
    )

    // type gaurd function guarantees data property exists if true
    function isLoadingDataWithErrorLoaded<D>(data: LoadingDataWithError<D>): data is { loading: false; errored: false; data: D } {
        return !data.loading && !data.errored;
    }

    const activeShitstraps = isLoadingDataWithErrorLoaded(shitStrapsLoading) ? shitStrapsLoading.data : [];
    const completeShitstraps = isLoadingDataWithErrorLoaded(shitStrapsLoading)
        ? shitStrapsLoading.data.filter(({ full }) => full)
        : [];

    const [showingCompleted, setShowingCompleted] = useState(false)
    const [shitstrapPaymentModalOpen, setShitstrapPaymentModalOpen] = useState(
        !!openShitstrapContract
    )

    const openShitstrapPayment =
        shitStrapsLoading.loading ||
            shitStrapsLoading.errored ||
            !openShitstrapContract
            ? undefined
            : isLoadingDataWithErrorLoaded(shitStrapsLoading)
                ? shitStrapsLoading.data.find(
                    ({ shitstrapContractAddr }) =>
                        shitstrapContractAddr === openShitstrapContract
                )
                : undefined;

    // Wait for modal to close before clearing the open vesting payment to prevent
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
                        {t('title.shitStrap')}
                    </p>
                    <p className="secondary-text">
                        {t('info.shitstrapSecondaryText',)}
                    </p>
                </div>
                {createShitStrapHref && (
                    <Tooltip
                        title={
                            !isMember
                                ? t('error.mustBeMemberToCreateVestingPayment')
                                : undefined
                        }
                    >
                        <ButtonLink
                            className="shrink-0"
                            disabled={!isMember}
                            href={createShitStrapHref}
                            variant='primary'
                        >
                            <Add className="!h-4 !w-4" />
                            <span className="hidden md:inline">
                                {t('button.newShitstrap')}
                            </span>
                            <span className="md:hidden">{t('button.new')}</span>
                        </ButtonLink>
                    </Tooltip>
                )}
            </div>
            <div className="mb-9">

                {shitStrapsLoading.loading ? (
                    <div className="border-t border-border-secondary pt-6">

                    </div>
                ) : shitStrapsLoading.errored ? (
                    <ErrorPage error={shitStrapsLoading.error} />
                ) : shitStrapsLoading.data.length ? (
                    <div className="space-y-6 border-t border-border-secondary pt-6">

                        {activeShitstraps.length > 0 && (
                            <div className="space-y-1">
                                {/* <ActiveShitStrapLineHeader /> */}
                                {activeShitstraps.map((shitstrapInfo, index) => (
                                    <>
                                        <ShitStrapLine
                                            key={
                                                shitstrapInfo.chainId + shitstrapInfo.shitstrapContractAddr
                                            }
                                            onClick={() => {
                                                setShitstrapPaymentModalOpen(true)
                                                setOpenShitStrapContract(shitstrapInfo.shitstrapContractAddr)
                                            }}
                                            transparentBackground={index % 2 !== 0}
                                            shitstrapInfo={shitstrapInfo}
                                        />
                                    </>
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
                                                    onClick={() => {
                                                        setShitstrapPaymentModalOpen(true)
                                                        setOpenShitStrapContract(
                                                            shitstrapInfo.shitstrapContractAddr
                                                        )
                                                    }}
                                                    transparentBackground={index % 2 !== 0}
                                                    shitstrapInfo={shitstrapInfo}
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
                        <ShitStrapCard shitstrapInfo={openShitstrapPayment} usingPersonalShit={false} />
                    </ChainProvider>
                ) : (
                    <Loader />
                )}
            </Modal>
        </div>

    )
}