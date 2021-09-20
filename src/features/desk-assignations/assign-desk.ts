import { Desk } from '../desks/desk.model'
import { Employee } from '../employees/employee.model'

export interface AssignationResult {
  employeeId: string
  deskId: string | null
}

export function assignDesk(
  employees: Employee[],
  desks: Desk[],
): AssignationResult[] {
  const ret: AssignationResult[] = []
  const employeesToAssignADeskTo = [...employees]
  const availableDesks = [...desks]

  while (employeesToAssignADeskTo.length > 0) {
    if (availableDesks.length === 0) {
      break
    }
    const employee = employeesToAssignADeskTo.pop()!
    const desk = availableDesks.pop()!

    ret.push({ employeeId: employee.id, deskId: desk.id })
  }

  return ret
}
