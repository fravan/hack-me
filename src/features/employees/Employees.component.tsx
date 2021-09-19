import React from 'react'
import {
  MainSection,
  MainSectionTitle,
} from '../presentation/MainSection.component'
import { Button } from '../presentation/Button.component'
import { useEmployeeController } from './EmployeeController.provider'

function EmployeeList() {
  const controller = useEmployeeController()
  const employees = controller.getEmployees()

  return (
    <ul>
      {employees.map(e => (
        <li key={e.id}>{e.name}</li>
      ))}
    </ul>
  )
}

export function Employees() {
  return (
    <MainSection>
      <MainSectionTitle>
        View, create and organize your employees here!
      </MainSectionTitle>

      <div className="flex flex-col space-x-4">
        <EmployeeList />
      </div>
    </MainSection>
  )
}
