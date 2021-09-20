import { Desk } from '../desks/desk.model'
import { Employee } from '../employees/employee.model'
import { Zone } from '../zones/zone.model'

export interface AssignationResult {
  employeeId: string
  deskId: string | null
}

function getDeskId(
  desks: Desk[],
  preferredDesks: Array<Desk | Zone> = [],
): string | null {
  if (desks.length === 0) {
    return null
  }
  if (preferredDesks.length > 0) {
    const realPreferredDesks = preferredDesks.reduce<Desk[]>(
      (acc: Desk[], curr: Desk | Zone) => {
        if (curr.type === 'desk') {
          return [...acc, curr]
        }
        return [...acc, ...curr.desks]
      },
      [],
    )
    for (let i = 0; i < realPreferredDesks.length; i++) {
      const preferredDesk = realPreferredDesks[i]
      const preferredDeskIdx = desks.findIndex(d => d.id === preferredDesk.id)
      if (preferredDeskIdx !== -1) {
        return desks.splice(preferredDeskIdx, 1)[0].id
      }
    }
  }

  return desks.pop()!.id
}

export function assignDesk(
  employees: Employee[],
  desks: Desk[],
): AssignationResult[] {
  const ret: AssignationResult[] = []
  const employeesToAssignADeskTo = [...employees].sort((a, b) => {
    // We check for empty desks list and force those guys at the
    // start of the array (processed last)
    if (a.preferredDesks.length === 0) {
      return -1
    }
    if (b.preferredDesks.length === 0) {
      return 1
    }
    // Otherwise, the one with the biggest list of preferred desk
    // goes after the other
    return b.preferredDesks.length - a.preferredDesks.length
  })
  const availableDesks = [...desks]

  while (employeesToAssignADeskTo.length > 0) {
    const employee = employeesToAssignADeskTo.pop()!
    const employeeId = employee.id
    const deskId = getDeskId(availableDesks, employee.preferredDesks)
    ret.push({ employeeId, deskId })
  }

  return ret
}
