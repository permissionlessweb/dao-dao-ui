import { Validator } from '../chain'
import { ShitstrapInfoGeneric } from '../contracts/ShitStrap'
import { LoadingDataWithError } from '../misc'
import { ArrayOfShitstrapContract } from '../ShitstrapFactory'
import { GenericToken, TokenStake } from '../token'

export type ShitstrapPickerProps = {
  shitstraps: ShitstrapInfoGeneric[]
  selectedAddress?: string
  readOnly?: boolean
  onSelect: (shitstrap: string) => void
  // Token being staked.
  // token: GenericToken``
  displayClassName?: string
}
