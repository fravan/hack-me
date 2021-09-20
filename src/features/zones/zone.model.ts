import { Desk } from '../desks/desk.model'

export interface Zone {
  type: 'zone'
  id: string
  desks: Desk[]
}

export const makeZone = (input: Omit<Zone, 'type'>): Zone => ({
  ...input,
  type: 'zone',
})
