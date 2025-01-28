import { useMemo } from 'react'

import { useActionOptions } from '@dao-dao/stateless'
import { ActionContextType, ActionEncodeContext } from '@dao-dao/types'

import { useProposalModuleAdapterCommonContextIfAvailable } from '../proposal-module-adapter/react/context'

/**
 * Get encode context.
 */
export const useActionEncodeContext = (): ActionEncodeContext => {
  const { context } = useActionOptions()
  const proposalModule =
    useProposalModuleAdapterCommonContextIfAvailable()?.options.proposalModule

  return useMemo(
    (): ActionEncodeContext =>
      context.type === ActionContextType.Dao
        ? {
            ...context,
            proposalModule,
          }
        : context,
    [context, proposalModule]
  )
}
