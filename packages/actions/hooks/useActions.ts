import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Action, ActionContextType } from '@dao-dao/tstypes/actions'
import { useDaoInfoContext } from '@dao-dao/ui'

import { getActions } from '../actions'

export const useActions = (additionalActions?: Action[]): Action[] => {
  const { t } = useTranslation()
  const { coreAddress, coreVersion } = useDaoInfoContext()

  return useMemo(
    () =>
      getActions({
        t,
        address: coreAddress,
        context: {
          type: ActionContextType.Dao,
          coreVersion,
        },
      })
        .concat(additionalActions ?? [])
        // Sort alphabetically.
        .sort((a, b) =>
          a.label.toLowerCase().localeCompare(b.label.toLowerCase())
        ),
    [additionalActions, coreAddress, coreVersion, t]
  )
}
