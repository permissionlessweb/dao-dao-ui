import { useEffect } from 'react'

import { useUpdatingRef } from './useUpdatingRef'

export type UseExecuteAtOptions = {
  /**
   * The function to execute.
   */
  fn: () => void
  /**
   * The date at which to execute the function. If undefined, the function will
   * not fire.
   */
  date: Date | undefined
}

/**
 * A hook to execute a function at a specific date in the future.
 */
export const useExecuteAt = ({ fn, date }: UseExecuteAtOptions) => {
  const fnRef = useUpdatingRef(fn)

  useEffect(() => {
    const dateTime = date?.getTime()
    // Check if date defined and valid.
    if (!dateTime || isNaN(dateTime)) {
      return
    }

    const msRemaining = dateTime - Date.now()
    // From `setTimeout` docs: When delay is larger than 2147483647 or less than
    // 1, the delay will be set to 1.
    //
    // Basically, make sure not to trigger if the date is in the past or too far
    // in the future.
    if (msRemaining < 0 || msRemaining > 2147483647) {
      return
    }

    const timeout = setTimeout(() => fnRef.current(), msRemaining)
    return () => clearTimeout(timeout)
  }, [date, fnRef])
}
