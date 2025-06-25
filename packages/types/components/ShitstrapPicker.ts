import { ShitstrapInfoGeneric } from '../contracts/ShitStrap'

export type ShitstrapPickerProps = {
  shitstraps: ShitstrapInfoGeneric[]
  selectedAddress?: string
  readOnly?: boolean
  onSelect: (shitstrap: string) => void
  // Token being staked.
  // token: GenericToken``
  displayClassName?: string
}
