import { atom } from 'recoil'

export const registerDnasKeyVisibleAtom = atom<boolean>({
  key: 'registerDnasKeyVisibleAtom',
  default: false,
})

export const consumeDnasKeyVisibleAtom = atom<boolean>({
    key: 'consumeDnasKeyVisible',
    default: false,
  })