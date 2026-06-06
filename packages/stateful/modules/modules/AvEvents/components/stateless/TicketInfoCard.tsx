import {
  AccountBalanceOutlined,
  CheckRounded,
  DescriptionOutlined,
  Diversity1,
  PersonRounded,
} from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import removeMarkdown from 'remove-markdown'

import { AvEventPurchaseTicketsActionData, TicketInfoCardProps } from '@dao-dao/types/components/TicketInfoCard'
import { formatDate, makeValidateAddress, NEW_DAO_TOKEN_DECIMALS, validateNonNegative, validateRequired } from '@dao-dao/utils'



// import { DaoImage } from './DaoImage'
import { AddressInput, DaoImage, IconButton, InputLabel, LinkWrapper, NumericInput, SwitchCard, TokenAmountDisplay, Tooltip, TooltipInfoIcon, useChain } from '@dao-dao/stateless'
import { RegisteringGuest } from '@dao-dao/types/contracts/CwAve'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useEffect, useMemo, useState } from 'react'
import { Coin } from '@cosmjs/amino'
import { HugeDecimal } from '@dao-dao/math'
import { ButtonPopupSection } from '@dao-dao/types'

export const TicketInfoCard = ({
  info: { event_segment_access, guest_type, guest_weight, max_ticket_limit, ticket_cost, total_ticket_limit },
  index: guestCardIndex,
  // lazyData,
  follow,
  // LinkWrapper,
  isAttending,
  showIsMember = true,
  showingEstimatedUsdValue = true,
  showParentDao = true,
  onMouseOver,
  onMouseLeave,
  // onSettingHomiesTicket,
  // settingHomiesTickets,
  className,

}: TicketInfoCardProps) => {
  const { t } = useTranslation()
  const { bech32Prefix } = useChain()
  // const { getDaoPath } = useDaoNavHelpers()

  const {
    register,
    setValue,
    getValues,
  } = useFormContext<AvEventPurchaseTicketsActionData>()

  // {
  //   Icon: Diversity1,
  //     label: t('button.setForHomies'),
  //       closeOnClick: false,
  //         onClick: onSettingHomiesTicket,
  //           loading: settingHomiesTickets,
  //             },

  const [settingHomiesTickets, setHomiesTickets] = useState(false)

  return (
    <div className={clsx(
      'relative flex h-flex w-full h-[328px] flex-col items-center justify-between rounded-md bg-background-secondary px-4 py-5 ring-1 ring-inset ring-transparent transition-all  hover:ring-border-interactive-hover active:bg-background-interactive-pressed active:ring-border-interactive-focus sm:py-7 sm:px-6',
      className
    )}>
      {/* <LinkWrapper
        className={clsx(
          'relative flex h-[328px] w-full flex-col items-center justify-between rounded-md bg-background-secondary px-4 py-5 ring-1 ring-inset ring-transparent transition-all hover:bg-background-interactive-hover hover:ring-border-interactive-hover active:bg-background-interactive-pressed active:ring-border-interactive-focus sm:py-7 sm:px-6',
          className
        )}
        href={getDaoPath(coreAddress)}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
        prefetch
      > */}
      <div className="absolute top-0 left-0 flex w-full flex-row items-center justify-between p-2 sm:p-3">
        {showIsMember && isAttending ? (
          <Tooltip title={t('info.youAreMember')}>
            <PersonRounded className="!h-4 !w-4 text-icon-secondary" />
          </Tooltip>
        ) : (
          <div></div>
        )}

        {!follow.hide && (
          <Tooltip
            title={
              follow.following
                ? t('button.clickToUnfollow')
                : t('button.clickToFollow')
            }
          >
            <IconButton
              Icon={CheckRounded}
              className={
                follow.following
                  ? 'text-icon-interactive-active'
                  : 'text-icon-secondary'
              }
              loading={follow.updatingFollowing}
              onClick={(event) => {
                // Don't click on DAO card.
                event.preventDefault()
                event.stopPropagation()
                follow.onFollow()
              }}
              size="sm"
              variant="ghost"
            />
          </Tooltip>
        )}
      </div>

      <div className="flex flex-col items-center">
        <DaoImage
          LinkWrapper={LinkWrapper}
          coreAddress={undefined}
          daoName={guest_type}
          imageUrl={null}
          parentDao={null}
          size="sm"
        />
        <p className="primary-text mt-2 text-center">{guest_type}</p>
        <p className="caption-text mt-1 text-center">
          {t('info.totalTickets')} {total_ticket_limit}
        </p>
        <p className="caption-text mt-1 text-center">
          {t('info.ticketsRemaining')}
        </p>
      </div>

      {/* list of forms to select which tickets to purchase */}
      <div className="self-stretch">
        {ticket_cost.map((tc, tokenIndex) => (
          <div key={tokenIndex} className="flex flex-col items-center">
            <InputLabel
              containerProps={{ className: 'mb-2' }}
              name={t('form.selectTicketQuantity')}
              tooltip={t('form.ticketCostTooltip')}
            />
            <TokenAmountDisplay
              amount={HugeDecimal.from(tc.balance)}

              className="caption-text mt-4 font-mono"
              decimals={NEW_DAO_TOKEN_DECIMALS}
              // ={t('info.ticketCost') + ': '}
              showFullAmount
              iconUrl={tc.token.imageUrl}
              symbol={tc.token.symbol}
            />


            <div className="flex flex-row items-center gap-2">
              <NumericInput
                fieldName={`tickets_to_purchase.${guestCardIndex}.tickets.${tokenIndex}.quantity`}
                getValues={getValues}
                min={0}
                numericValue
                register={register}
                setValue={setValue}
                step={1}
                validation={[validateNonNegative, validateRequired]}
              />
            </div>

            <SwitchCard
              enabled={settingHomiesTickets}
              onClick={() =>
                setHomiesTickets(a => !a)
              }
              sizing="sm"
            />

            {/* display `tickets_to_purchase.${guestCardIndex}.tickets.${tokenIndex}.quantity` # of  text input forms for each ticket,.
              */}
            {settingHomiesTickets && (
              <div className="mt-2 space-y-2">
                <InputLabel
                  containerProps={{ className: 'mb-2' }}
                  name={t('form.selectingHomiesTickets')}
                  tooltip={t('form.selectingHomiesTicketsTooltip')}
                />
                {Array.from(
                  { length: getValues(`tickets_to_purchase.${guestCardIndex}.tickets.${tokenIndex}.quantity`) || 0 },
                  (_, idx) => (
                    <>

                      <AddressInput
                        fieldName={`tickets_to_purchase.${guestCardIndex}.tickets.${tokenIndex}.addr.${idx}`}
                        register={register}
                        type="contract"
                        validation={[validateRequired, makeValidateAddress(bech32Prefix)]}
                      />
                    </>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="self-stretch">
        {/* <p className="secondary-text line-clamp-3 mb-5 w-full break-words">
          {removeMarkdown(description)}
        </p> */}

        {/* {(lazyData.loading ||
          (!lazyData.errored && lazyData.data.tokenWithBalance)) && (
            <div
              className={clsx(
                'caption-text mb-2 flex flex-row items-center gap-2 font-mono',
                lazyData.loading && 'animate-pulse'
              )}
            >
              <AccountBalanceOutlined className="mr-1 !h-4 !w-4" />

              <TokenAmountDisplay
                amount={
                  lazyData.loading || !lazyData.data.tokenWithBalance
                    ? { loading: true }
                    : lazyData.data.tokenWithBalance.balance
                }
                {...(showingEstimatedUsdValue
                  ? {
                    estimatedUsdValue: true,
                  }
                  : {
                    decimals:
                      lazyData.loading || !lazyData.data.tokenWithBalance
                        ? 0
                        : lazyData.data.tokenWithBalance.decimals,
                    symbol:
                      lazyData.loading || !lazyData.data.tokenWithBalance
                        ? ''
                        : lazyData.data.tokenWithBalance.symbol,
                  })}
              />

              {showingEstimatedUsdValue && (
                <TooltipInfoIcon
                  size="xs"
                  title={t('info.estimatedTreasuryUsdValueTooltip')}
                />
              )}
            </div>
          )}

        {(lazyData.loading || !lazyData.errored) && (
          <div
            className={clsx(
              'caption-text flex flex-row items-center gap-3 font-mono',
              lazyData.loading && 'animate-pulse'
            )}
          >
            <DescriptionOutlined className="!h-4 !w-4" />
            <p>
              {lazyData.loading
                ? '...'
                : t('info.numProposals', {
                  count: lazyData.data.proposalCount,
                })}
            </p>
          </div>
        )} */}
      </div>
      {/* </LinkWrapper> */}
    </div>
  )
}

export const GuestCardLoader = () => (
  <div className="h-[328px] w-full animate-pulse rounded-md bg-background-secondary"></div>
)
