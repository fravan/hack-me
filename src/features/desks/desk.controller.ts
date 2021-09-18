import { v4 as uuidv4 } from 'uuid'
import { Desk } from './desk.model'

export type DeskInput = Omit<Desk, 'id'>

export class DeskController {
  private desks: Desk[] = []

  getDesks() {
    return this.desks
  }

  removeDesk(id: string) {
    this.desks = this.desks.filter(d => d.id !== id)
  }

  addDesk(payload: DeskInput) {
    this.checkDeskNumberUniqueness(payload.uniqueNumber)
    this.desks.push({ ...payload, id: uuidv4() })
    return this.desks
  }

  editDesk(id: string, payload: DeskInput) {
    this.checkDeskNumberUniqueness(payload.uniqueNumber, id)

    const idx = this.desks.findIndex(d => d.id === id)
    if (idx === -1) {
      this.desks.push({ ...payload, id: uuidv4() })
    } else {
      const desk = this.desks[idx]
      desk.name = payload.name
      desk.uniqueNumber = payload.uniqueNumber
    }
    return this.desks
  }

  private checkDeskNumberUniqueness(uniqueNumber: number, id?: string) {
    const deskWithSameUniqueNumber = this.desks.find(
      d => d.uniqueNumber === uniqueNumber,
    )
    if (
      deskWithSameUniqueNumber != null &&
      deskWithSameUniqueNumber.id !== id
    ) {
      throw new Error(
        `Unique number ${uniqueNumber} is already taken by desk ${deskWithSameUniqueNumber.name}`,
      )
    }
  }
}
