import { Desk } from '../desks/desk.model'
import { Zone } from '../zones/zone.model'

export interface Employee {
  id: string
  name: string
  email: string
  preferredDesks: Array<Desk | Zone>
}
