import { Check } from '@mui/icons-material'
import {
  MouseEventHandler,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { IconButtonProps } from '@dao-dao/types/components/IconButtonifier'

import { useUpdatingRef } from '../../hooks'
import {
  IconButtonifiedChildren,
  getIconButtonifiedClassNames,
  getPassthroughProps,
} from './IconButtonifier'

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ type = 'button', onClick, confirm, ...props }, ref) {
    const { t } = useTranslation()

    const onClickRef = useUpdatingRef(onClick)
    const [confirming, setConfirming] = useState(false)

    const onClickConfirm: MouseEventHandler<HTMLButtonElement> = useCallback(
      (event) => {
        if (confirming) {
          onClickRef.current?.(event)
          setConfirming(false)
        } else {
          setConfirming(true)
          toast.success(t('info.areYouSureConfirmButton'))
        }
      },
      [confirming, onClickRef, t]
    )

    // Reset confirming after 3 seconds.
    useEffect(() => {
      if (!confirming) {
        return
      }

      const timeout = setTimeout(() => setConfirming(false), 3000)
      return () => clearTimeout(timeout)
    }, [confirming])

    return (
      <button
        {...getPassthroughProps(props)}
        className={getIconButtonifiedClassNames(props)}
        onClick={onClick && (confirm ? onClickConfirm : onClick)}
        ref={ref}
        type={type}
      >
        <IconButtonifiedChildren
          {...props}
          Icon={confirming ? Check : props.Icon}
        />
      </button>
    )
  }
)
