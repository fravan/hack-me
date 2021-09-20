import { Desk } from '../desks/desk.model'
import { Zone } from '../zones/zone.model'
import { Employee } from './employee.model'
import { EmployeeDesks } from './EmployeeDesks.component'

interface EmployeeDetailsProps {
  employee: Employee
}

const isDesk = (deskOrZone: Desk | Zone): deskOrZone is Desk =>
  deskOrZone.type === 'desk'

export function EmployeeDetails({ employee }: EmployeeDetailsProps) {
  const desks = employee.preferredDesks.filter(isDesk)

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
      <EmployeeDesks desks={desks} />
    </div>
  )
}
