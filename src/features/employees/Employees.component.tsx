import React from 'react'
import {
  MainSection,
  MainSectionTitle,
} from '../presentation/MainSection.component'
import { Employee } from './employee.model'
import { EmployeeList } from './EmployeeList.component'
import { EmployeeDetails } from './EmployeeDetails.component'

export function Employees() {
  const [selectedEmployee, setSelectedEmployee] = React.useState<
    Employee | undefined
  >(undefined)

  return (
    <MainSection>
      <MainSectionTitle>
        View, create and organize your employees here!
      </MainSectionTitle>

      <div className="flex flex-row space-x-4">
        <EmployeeList
          selectedEmployee={selectedEmployee}
          onSelect={e => setSelectedEmployee(e)}
        />

        {selectedEmployee && <EmployeeDetails employee={selectedEmployee} />}
      </div>
    </MainSection>
  )
}
