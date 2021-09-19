import { v4 as uuidv4 } from 'uuid'
import { Employee } from './employee.model'

export type EmployeeInput = Omit<Employee, 'id'>

export class EmployeeController {
  private employees: Employee[] = []

  getEmployees() {
    return this.employees
  }

  addEmployee(payload: EmployeeInput) {
    this.checkEmailUniqueness(payload.email)
    this.employees.push({ ...payload, id: uuidv4() })
  }

  editEmployee(id: string, payload: EmployeeInput) {
    this.checkEmailUniqueness(payload.email, id)

    const idx = this.employees.findIndex(d => d.id === id)
    if (idx === -1) {
      this.employees.push({ ...payload, id: uuidv4() })
    } else {
      const employee = this.employees[idx]
      employee.name = payload.name
      employee.email = payload.email
      employee.preferredDesks = payload.preferredDesks
    }
  }

  deleteEmployee(id: string) {
    this.employees = this.employees.filter(e => e.id !== id)
  }

  private checkEmailUniqueness(email: string, id?: string) {
    const employeeWithSameEmail = this.employees.find(d => d.email === email)
    if (employeeWithSameEmail != null && employeeWithSameEmail.id !== id) {
      throw new Error(
        `Email ${email} is already used by employee ${employeeWithSameEmail.name}`,
      )
    }
  }
}
