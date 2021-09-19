import { Employee } from './employee.model'
import { EmployeeDesks } from './EmployeeDesks.component'

interface EmployeeDetailsProps {
  employee: Employee
}

export function EmployeeDetails({ employee }: EmployeeDetailsProps) {
  return (
    <div
      className="flex-auto grid gap-4"
      style={{ gridTemplateColumns: 'max-content 1fr' }}
    >
      <span className="text-primary">Name:</span>
      <span>{employee.name}</span>

      <span className="text-primary">Email:</span>
      <span>{employee.email}</span>

      <span className="text-primary">Desks:</span>
      <EmployeeDesks desks={employee.preferredDesks} />
    </div>
  )
}
