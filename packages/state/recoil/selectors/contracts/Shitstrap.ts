import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'

import { ShitStrapClient } from '../../../contracts/ShitStrap'
import { signingCosmWasmClientAtom } from '../../atoms'

export type ExecuteClientParams = WithChainId<{
  contractAddress: string
  sender: string
}>

export const executeClient = selectorFamily<
  ShitStrapClient | undefined,
  ExecuteClientParams
>({
  key: 'cwShitstrapExecuteClient',
  get:
    ({ chainId, contractAddress, sender }) =>
    ({ get }) => {
      const client = get(signingCosmWasmClientAtom({ chainId }))
      if (!client) return
      return new ShitStrapClient(client, sender, contractAddress)
    },
  dangerouslyAllowMutability: true,
})
