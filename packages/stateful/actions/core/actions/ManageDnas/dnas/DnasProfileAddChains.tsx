import { Add, Check, Close, InfoOutlined } from '@mui/icons-material'
import clsx from 'clsx'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  DnasProfileAddDnasKeyProps,
  ProfileAddDnasKeysForm,
} from '@dao-dao/stateful/actions/core/actions/ManageDnas/types'
import {
  Button,
  ChainLabel,
  ChainPickerPopup,
  IconButton,
  Loader,
} from '@dao-dao/stateless'

export const DnasProfileAddChains = ({
  prompt,
  promptTooltip,
  promptClassName,
  disabled,
  dnas,
  onAddDnas,
  status,
  size = 'default',
  onlySupported = false,
  autoAdd = false,
  textPrompt = false,
  className,
}: DnasProfileAddDnasKeyProps) => {
  const { t } = useTranslation()

  const { control, watch, handleSubmit } =
    useFormContext<ProfileAddDnasKeysForm>()

  const chainsBeingAdded = watch('chains')

  const { append: appendChain, remove: removeChain } = useFieldArray({
    control,
    name: 'chains',
  })

  const formActive = chainsBeingAdded.length > 0

  return (
    <form
      className={clsx(
        'flex flex-col transition-all bg-transparent rounded-none',
        {
          'gap-4': size === 'sm',
          'gap-6': size === 'default',
        },
        formActive && [
          '!bg-background-tertiary !rounded-md w-full max-w-[14rem]',
          {
            'p-4': size === 'sm',
            'p-6': size === 'default',
          },
        ],
        className
      )}
      onSubmit={onAddDnas && handleSubmit(onAddDnas)}
    >
      {formActive && (
        <div
          className={clsx('animate-fade-in', {
            'space-y-3': size === 'sm',
            'space-y-4': size === 'default',
          })}
        >
          {chainsBeingAdded.map(({ chainId, status }, index) => (
            <div
              key={chainId}
              className={clsx('flex flex-row items-center justify-between', {
                'gap-2': size === 'sm',
                'gap-3': size === 'default',
              })}
            >
              <ChainLabel chainId={chainId} />

              {status === 'idle' ? (
                <IconButton
                  Icon={Close}
                  onClick={() => removeChain(index)}
                  size="xs"
                  variant="ghost"
                />
              ) : status === 'loading' ? (
                <div className="p-0.5">
                  <Loader fill={false} size={16} />
                </div>
              ) : status === 'done' ? (
                <Check
                  className={clsx('!text-icon-brand', {
                    '!h-4 !w-4': size === 'sm',
                    '!h-5 !w-5': size === 'default',
                  })}
                />
              ) : null}
            </div>
          ))}
        </div>
      )}

      <ChainPickerPopup
        chains={{
          type: onlySupported ? 'supported' : 'configured',
          // excludeChainIds: [
          //   ...(dnas.loading
          //     ? []
          //     : dnas.data.map(( dna) =>dna)),
          //   ...chainsBeingAdded.map(({ chainId }) => chainId),
          // ],
        }}
        onSelect={(chainId) => {
          // Type-check. None option is disabled so should not be possible.
          if (!chainId || chainsBeingAdded.some((c) => c.chainId === chainId)) {
            return
          }

          appendChain({
            chainId,
            status: 'idle',
          })

          if (onAddDnas && autoAdd) {
            handleSubmit(onAddDnas)()
          }
        }}
        trigger={
          chainsBeingAdded.length === 0
            ? {
                type: 'button',
                tooltip: promptTooltip,
                props: {
                  className: 'self-end',
                  contentContainerClassName: clsx(
                    textPrompt && '!secondary-text',
                    promptClassName
                  ),
                  children: (
                    <>
                      {!!promptTooltip && (
                        // Show info icon to indicate tooltip is available.
                        <InfoOutlined
                          className={clsx(
                            '!h-4 !w-4',
                            textPrompt && '!text-icon-secondary'
                          )}
                        />
                      )}

                      {prompt}
                    </>
                  ),
                  variant: textPrompt ? 'none' : 'brand',
                  size: 'lg',
                  disabled,
                },
              }
            : {
                type: 'icon_button',
                props: {
                  // Round to match checkbox.
                  className: clsx('self-end !rounded', {
                    '-mt-1': size === 'sm',
                    '-mt-3': size === 'default',
                  }),
                  Icon: Add,
                  variant: 'primary',
                  size: 'xs',
                  disabled: status !== 'idle',
                },
              }
        }
      />

      {formActive && (
        <Button
          center
          className="animate-fade-in"
          disabled={status === 'dnas' || !onAddDnas}
          loading={status === 'adding'}
          type="submit"
          variant="brand"
        >
          {t('button.addChains')}
        </Button>
      )}
    </form>
  )
}
