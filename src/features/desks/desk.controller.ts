import { v4 as uuidv4 } from 'uuid'
import { Desk } from './desk.model'

export type DeskInput = Omit<Desk, 'id'>

export interface IDeskController {
  getDesks(): Desk[]
  deleteDesk(id: string): void
  addDesk(payload: DeskInput): Desk[]
  editDesk(id: string, payload: DeskInput): Desk[]
}

class DeskController implements IDeskController {
  private desks: Desk[] = []

  constructor() {
    this.addDesk({ uniqueNumber: 42, name: 'The answer' })
    this.addDesk({ uniqueNumber: 47, name: 'The agent' })
    this.addDesk({ uniqueNumber: 404, name: 'The invisible' })
  }

  getDesks() {
    return this.desks
  }

  deleteDesk(id: string) {
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

const deskController = new DeskController()

export function useDeskController(): IDeskController {
  return deskController
}
