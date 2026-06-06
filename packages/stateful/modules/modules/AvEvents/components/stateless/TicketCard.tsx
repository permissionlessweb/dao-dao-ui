import {
  ConfirmationNumberOutlined,
  CheckRounded,
  AccountBalanceWalletOutlined,
  EventSeatOutlined,
} from '@mui/icons-material'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { TicketCardProps } from '@dao-dao/types/components/TicketCard'

import { IconButton } from '@dao-dao/stateless/components/icon_buttons'
import { Button } from '@dao-dao/stateless/components/buttons'
import { TokenAmountDisplay } from '@dao-dao/stateless/components/token/TokenAmountDisplay'
import { Tooltip } from '@dao-dao/stateless/components/tooltip/Tooltip'

export const TicketCard = ({
  ticketInfo,
  eventContract,
  chainId,
  lazyData,
  LinkWrapper,
  userAddress,
  onPurchaseTicket,
  onCheckIn,
  className,
}: TicketCardProps) => {
  const { t } = useTranslation()

  const showPurchaseButton = userAddress && !lazyData.loading && !lazyData.errored && !lazyData.data.userHasTicket
  const showCheckInButton = userAddress && !lazyData.loading && !lazyData.errored && lazyData.data.userHasTicket && !lazyData.data.isCheckedIn

  return (
    <div
      className={clsx(
        'relative flex h-[328px] w-full flex-col items-center justify-between rounded-md bg-background-secondary px-4 py-5 ring-1 ring-inset ring-transparent transition-all hover:bg-background-interactive-hover hover:ring-border-interactive-hover',
        className
      )}
    >
      <div className="absolute top-0 left-0 flex w-full flex-row items-center justify-between p-2 sm:p-3">
        <div className="flex items-center gap-2">
          <ConfirmationNumberOutlined className="!h-4 !w-4 text-icon-secondary" />
          <span className="text-sm text-text-secondary">{ticketInfo.guest_type}</span>
        </div>

        {!lazyData.loading && !lazyData.errored && lazyData.data.userHasTicket && (
          <Tooltip title={lazyData.data.isCheckedIn ? t('info.checkedIn') : t('info.notCheckedIn')}>
            <CheckRounded 
              className={clsx(
                '!h-4 !w-4',
                lazyData.data.isCheckedIn ? 'text-icon-interactive-active' : 'text-icon-secondary'
              )}
            />
          </Tooltip>
        )}
      </div>

      <div className="flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background-primary mb-2">
          <EventSeatOutlined className="!h-8 !w-8 text-icon-primary" />
        </div>
        <p className="primary-text text-center">{ticketInfo.guest_type}</p>
        <p className="caption-text mt-1 text-center">
          Weight: {ticketInfo.guest_weight} | Limit: {ticketInfo.max_ticket_limit}
        </p>
      </div>

      <div className="self-stretch">
        {/* Ticket Cost */}
        <div className="mb-4">
          <div className="caption-text mb-2 flex flex-row items-center gap-2 font-mono">
            <AccountBalanceWalletOutlined className="!h-4 !w-4" />
            <span className="text-text-secondary">Cost:</span>
          </div>
          <div className="flex flex-col gap-1">
            {ticketInfo.ticket_cost.map((cost, index) => (
              <div key={index} className="flex items-center gap-2">
                <TokenAmountDisplay
                  amount={{ loading: false, data: Number(cost.amount) }}
                  decimals={6} // Assuming 6 decimals, adjust as needed
                  symbol={cost.denom}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Availability */}
        {(lazyData.loading || !lazyData.errored) && (
          <div className={clsx(
            'caption-text mb-4 flex flex-row items-center gap-2 font-mono',
            lazyData.loading && 'animate-pulse'
          )}>
            <ConfirmationNumberOutlined className="!h-4 !w-4" />
            <span>
              {lazyData.loading
                ? 'Loading...'
                : `${lazyData.data.availableTickets} tickets available`
              }
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          {showPurchaseButton && (
            <Button
              onClick={onPurchaseTicket}
              variant="primary"
              size="sm"
              className="w-full"
            >
              Purchase Ticket
            </Button>
          )}
          
          {showCheckInButton && (
            <Button
              onClick={onCheckIn}
              variant="secondary"
              size="sm"
              className="w-full"
            >
              Check In
            </Button>
          )}

          {!lazyData.loading && !lazyData.errored && lazyData.data.userHasTicket && lazyData.data.isCheckedIn && (
            <div className="text-center py-2">
              <span className="text-green-500 text-sm">✓ Checked In</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const TicketCardLoader = () => (
  <div className="h-[328px] w-full animate-pulse rounded-md bg-background-secondary"></div>
)