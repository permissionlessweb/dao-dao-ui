import { useEffect, useState } from 'react'

/**
 * A hook that returns whether or not the given element is currently on screen.
 *
 * Inspired by https://stackoverflow.com/a/67826055
 */
export const useOnScreen = (element: HTMLElement | null) => {
  const [isOnScreen, setIsOnScreen] = useState(false)

  useEffect(() => {
    if (!element || typeof window === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting)
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [element])

  return isOnScreen
}
