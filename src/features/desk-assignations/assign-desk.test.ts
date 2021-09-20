import { Desk } from '../desks/desk.model'
import { Employee } from '../employees/employee.model'
import { assignDesk } from './assign-desk'

const createEmployee = (id: string): Employee => ({
  id,
  name: '',
  email: '',
  preferredDesks: [],
})
const createEmployees = (amount: number): Employee[] => {
  const ret: Employee[] = []
  for (let i = 0; i < amount; i++) {
    ret.push(createEmployee(i.toString()))
  }
  return ret
}
const createDesk = (id: string): Desk => ({ id, name: '', uniqueNumber: 0 })
const createDesks = (amount: number): Desk[] => {
  const ret: Desk[] = []
  for (let i = 0; i < amount; i++) {
    ret.push(createDesk(i.toString()))
  }
  return ret
}

describe('Basic functionalities', () => {
  test('It should assign a desk to an employee', () => {
    const employees = createEmployees(2)
    const desks = createDesks(2)

    const result = assignDesk(employees, desks)

    // Our 2 employees should be returned with a given desk.
    expect(result.length).toBe(2)
    expect(result.every(r => r.deskId != null)).toBe(true)
  })

  test('It should also return employees without a desk', () => {
    const employees = createEmployees(3)
    const desks = createDesks(2)

    const result = assignDesk(employees, desks)
    // We want as many results as we have employee
    expect(result.length).toBe(3)
    // And one of them should be deskless...
    expect(result.filter(r => r.deskId == null).length).toBe(1)
  })
})

describe('Preferred desks', () => {
  test('An employee with a preferred desk should have it if possible', () => {
    const employees = createEmployees(2)
    const desks = createDesks(10)
    employees[0].preferredDesks = [desks[2]]

    const result = assignDesk(employees, desks)

    expect(result.find(r => r.employeeId === employees[0].id)?.deskId).toBe(
      desks[2].id,
    )
  })
})
