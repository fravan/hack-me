import { Desk } from '../desks/desk.model'

export interface Employee {
  id: string
  name: string
  email: string
  preferredDesks: Desk[]
}
