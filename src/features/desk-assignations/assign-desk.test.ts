import { Desk, makeDesk } from '../desks/desk.model'
import { Employee } from '../employees/employee.model'
import { makeZone } from '../zones/zone.model'
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
const createDesk = (id: string): Desk =>
  makeDesk({ id, name: '', uniqueNumber: 0 })
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

  test('Employees with a greater list of preferred desks should come after those with only one desk', () => {
    // I though "Hey, that might be better for everyone?"
    // Like, if you have 10 preferred desks maybe you can let your most favorite
    // for another one and have your second most favorite desk.
    // But then... Is it? Wouldn't that make employees mark only one desk as preferred
    // to be sure to get it?
    // Anyway, I will test it, because why not I'm already this late!
    const employees = createEmployees(3)
    const desks = createDesks(10)
    employees[0].preferredDesks = [desks[2]]
    employees[1].preferredDesks = [desks[2], desks[3], desks[1]]
    employees[2].preferredDesks = [desks[3]]

    const result = assignDesk(employees, desks)
    const getAssignedDesk = (employeeIdx: number) =>
      result.find(r => r.employeeId === employees[employeeIdx].id)!

    expect(getAssignedDesk(0).deskId).toBe(desks[2].id)
    expect(getAssignedDesk(1).deskId).toBe(desks[1].id)
    expect(getAssignedDesk(2).deskId).toBe(desks[3].id)
  })
})

describe('Zone', () => {
  test('Zone are just a bag of desks for the algorithm', () => {
    // This is the same test as : "Employees with a greater list of preferred desks should come after those with only one desk"
    // just that some of those desks have been wrapped into a zone
    const employees = createEmployees(3)
    const desks = createDesks(10)
    const zone = makeZone({
      id: 'zone-1',
      desks: [desks[2], desks[3]],
    })
    employees[0].preferredDesks = [desks[2]]
    employees[1].preferredDesks = [zone, desks[1]]
    employees[2].preferredDesks = [desks[3]]

    const result = assignDesk(employees, desks)
    const getAssignedDesk = (employeeIdx: number) =>
      result.find(r => r.employeeId === employees[employeeIdx].id)!

    expect(getAssignedDesk(0).deskId).toBe(desks[2].id)
    expect(getAssignedDesk(1).deskId).toBe(desks[1].id)
    expect(getAssignedDesk(2).deskId).toBe(desks[3].id)
  })
})
