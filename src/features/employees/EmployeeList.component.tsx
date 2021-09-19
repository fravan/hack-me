import { buildClass } from '../common/build-class'
import { Employee } from './employee.model'
import { useEmployeeController } from './EmployeeController.provider'

interface EmployeeItemProps extends EmployeeListProps {
  employee: Employee
}

function EmployeeItem({
  employee,
  onSelect,
  selectedEmployee,
}: EmployeeItemProps) {
  const className = buildClass('py-1 px-4 cursor-pointer')
    .with('hover:bg-primary/10')
    .with('text-primary bg-primary/10', employee.id === selectedEmployee?.id)
    .build()
  return (
    <li
      className={className}
      onClick={() => onSelect(employee)}
      key={employee.id}
    >
      {employee.name}
    </li>
  )
}

interface EmployeeListProps {
  onSelect: (employee: Employee) => void
  selectedEmployee?: Employee
}

export function EmployeeList(props: EmployeeListProps) {
  const controller = useEmployeeController()
  const employees = controller.getEmployees()

  return (
    <ul className="flex-none max-w-max w-full">
      {employees.map(e => (
        <EmployeeItem {...props} employee={e} />
      ))}
    </ul>
  )
}
