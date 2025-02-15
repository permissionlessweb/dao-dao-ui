/* eslint-disable @next/next/no-img-element */
import { Image, WarningRounded } from '@mui/icons-material'
import clsx from 'clsx'
import Fuse from 'fuse.js'
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDeepCompareMemoize } from 'use-deep-compare-effect'

import {
  FilterFn,
  LoadingDataWithError,
  ModalProps,
  NftCardInfo,
  SortFn,
  TypedOption,
} from '@dao-dao/types'
import { getChainForChainId, getDisplayNameForChainId } from '@dao-dao/utils'

import {
  useButtonPopupFilter,
  useButtonPopupSorter,
  useSearchFilter,
} from '../../hooks'
import { Button } from '../buttons/Button'
import { SearchBar } from '../inputs'
import { Loader } from '../logo/Loader'
import { NftCard } from '../NftCard'
import { NoContent } from '../NoContent'
import { ButtonPopup } from '../popup'
import { Modal } from './Modal'

export interface NftSelectionModalProps<N extends NftCardInfo>
  extends Omit<ModalProps, 'children' | 'header'>,
    Required<Pick<ModalProps, 'header'>> {
  nfts: LoadingDataWithError<N[]>
  selectedIds: string[]
  getIdForNft: (nft: N) => string
  onNftClick: (nft: N) => void
  onSelectAll?: () => void
  onDeselectAll?: () => void
  action: {
    loading?: boolean
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    loading?: boolean
    label: string
    onClick: () => void
  }
  fallbackError?: string
  allowSelectingNone?: boolean
  selectedDisplay?: ReactNode
  headerDisplay?: ReactNode
  // What displays when there are no NFTs.
  noneDisplay?: ReactNode
}

export const NftSelectionModal = <N extends NftCardInfo>({
  nfts,
  selectedIds,
  getIdForNft,
  onNftClick,
  onSelectAll,
  onDeselectAll,
  action,
  secondaryAction,
  fallbackError,
  containerClassName,
  allowSelectingNone,
  selectedDisplay,
  headerDisplay,
  noneDisplay,
  ...modalProps
}: NftSelectionModalProps<N>) => {
  const { t } = useTranslation()
  const showSelectAll =
    (onSelectAll || onDeselectAll) &&
    !nfts.loading &&
    !nfts.errored &&
    nfts.data.length > 2

  // Scroll first selected into view as soon as possible.
  const firstSelectedRef = useRef<HTMLDivElement | null>(null)
  const [scrolledToFirst, setScrolledToFirst] = useState(false)
  useEffect(() => {
    if (
      nfts.loading ||
      scrolledToFirst ||
      !firstSelectedRef.current?.parentElement
    ) {
      return
    }

    setScrolledToFirst(true)

    firstSelectedRef.current.parentElement.scrollTo({
      behavior: 'smooth',
      top:
        // Calculate y position of selected card in scrollable container.
        firstSelectedRef.current.offsetTop -
        firstSelectedRef.current.parentElement.offsetTop -
        // Add some padding on top.
        24,
    })
  }, [nfts, firstSelectedRef, scrolledToFirst])

  const uniqueChainIds = Array.from(
    new Set(
      nfts.loading || nfts.errored
        ? []
        : nfts.data.map(({ chainId }) => chainId)
    )
  )
  const nftChains = uniqueChainIds.map(getChainForChainId)
  const filterOptions = useMemo(
    () => [
      {
        id: 'all',
        label: t('title.all'),
        value: () => true,
      },
      ...nftChains.map(
        (
          chain
        ): TypedOption<FilterFn<Pick<NftCardInfo, 'chainId'>>> & {
          id: string
        } => ({
          id: chain.chain_name,
          label: getDisplayNameForChainId(chain.chain_id),
          value: (nft) => nft.chainId === chain.chain_id,
        })
      ),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useDeepCompareMemoize([nftChains])
  )

  const {
    filteredData: filteredNfts,
    buttonPopupProps: filterNftButtonPopupProps,
  } = useButtonPopupFilter({
    data: nfts.loading || nfts.errored ? [] : nfts.data,
    options: filterOptions,
  })

  const {
    sortedData: filteredSortedNfts,
    buttonPopupProps: sortButtonPopupProps,
  } = useButtonPopupSorter({
    data: filteredNfts,
    options: sortOptions,
  })

  const { searchBarProps, filteredData: filteredSortedSearchedNfts } =
    useSearchFilter(filteredSortedNfts, FILTERABLE_KEYS)

  return (
    <Modal
      {...modalProps}
      containerClassName={clsx('h-full w-full !max-w-3xl', containerClassName)}
      contentContainerClassName={
        nfts.errored
          ? 'items-center justify-center gap-4'
          : !nfts.loading && nfts.data.length > 0
          ? 'no-scrollbar grid grid-flow-row auto-rows-max grid-cols-2 gap-4 overflow-y-auto sm:grid-cols-3'
          : undefined
      }
      footerContent={
        <div
          className={clsx(
            'flex flex-row items-center gap-6',
            // If selectedDisplay is null, it will be hidden, so align button at
            // the end.
            selectedDisplay === null ? 'justify-end' : 'justify-between'
          )}
        >
          {selectedDisplay !== undefined ? (
            selectedDisplay
          ) : (
            <p>{t('info.numNftsSelected', { count: selectedIds.length })}</p>
          )}

          <div className="flex flex-row items-stretch gap-2">
            {secondaryAction && (
              <Button
                loading={secondaryAction.loading}
                onClick={secondaryAction.onClick}
                variant="secondary"
              >
                {secondaryAction.label}
              </Button>
            )}

            <Button
              disabled={!allowSelectingNone && selectedIds.length === 0}
              loading={action.loading}
              onClick={action.onClick}
              variant="primary"
            >
              {action.label}
            </Button>
          </div>
        </div>
      }
      headerContent={
        headerDisplay ||
        nfts.loading ||
        nfts.errored ||
        nfts.data.length > 0 ? (
          <div className="mt-4 flex flex-col gap-4">
            {headerDisplay}

            <SearchBar
              autoFocus={modalProps.visible}
              placeholder={t('info.searchNftsPlaceholder')}
              {...searchBarProps}
            />

            <div
              className={clsx(
                'flex flex-row flex-wrap items-center gap-x-8 gap-y-4',
                // Push sort/filter to the right no matter what.
                showSelectAll ? 'justify-between' : 'justify-end'
              )}
            >
              {showSelectAll && (
                <Button
                  className="text-text-interactive-active"
                  disabled={nfts.loading}
                  onClick={
                    nfts.loading
                      ? undefined
                      : nfts.data.length === selectedIds.length
                      ? onDeselectAll
                      : onSelectAll
                  }
                  variant="underline"
                >
                  {!nfts.loading &&
                    (nfts.data.length === selectedIds.length
                      ? t('button.deselectAllNfts', { count: nfts.data.length })
                      : t('button.selectAllNfts', { count: nfts.data.length }))}
                </Button>
              )}

              <div className="flex grow flex-row items-center justify-end gap-4">
                <ButtonPopup position="left" {...filterNftButtonPopupProps} />
                <ButtonPopup position="left" {...sortButtonPopupProps} />
              </div>
            </div>
          </div>
        ) : undefined
      }
    >
      {nfts.loading ? (
        <Loader />
      ) : nfts.errored ? (
        <>
          <WarningRounded className="!h-14 !w-14" />
          <p className="body-text">
            {fallbackError ?? t('error.checkInternetOrTryAgain')}
          </p>
          <pre className="secondary-text max-w-prose whitespace-pre-wrap text-center text-xs text-text-interactive-error">
            {nfts.error instanceof Error ? nfts.error.message : `${nfts.error}`}
          </pre>
        </>
      ) : nfts.data.length > 0 ? (
        filteredSortedSearchedNfts.map(({ item }) => (
          <NftCard
            ref={
              selectedIds[0] === getIdForNft(item as N)
                ? firstSelectedRef
                : undefined
            }
            {...(item as N)}
            key={(item as N).key}
            checkbox={{
              checked: selectedIds.includes(getIdForNft(item as N)),
              // Disable toggling if currently staking.
              onClick: () => !action.loading && onNftClick(item as N),
            }}
          />
        ))
      ) : (
        noneDisplay || (
          <NoContent
            Icon={Image}
            body={t('info.noNftsYet')}
            className="grow justify-center"
          />
        )
      )}
    </Modal>
  )
}

const sortOptions: TypedOption<SortFn<Pick<NftCardInfo, 'name'>>>[] = [
  {
    label: 'A → Z',
    value: (a, b) =>
      a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()),
  },
  {
    label: 'Z → A',
    value: (a, b) =>
      b.name.toLocaleLowerCase().localeCompare(a.name.toLocaleLowerCase()),
  },
]

const FILTERABLE_KEYS: Fuse.FuseOptionKey<NftCardInfo>[] = [
  'name',
  'description',
  'collection.address',
]
