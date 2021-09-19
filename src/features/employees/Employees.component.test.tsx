import React from 'react'
import { render } from '@testing-library/react'
import { Employees } from './Employees.component'
import { EmployeeControllerProvider } from './EmployeeController.provider'
import { EmployeeController, EmployeeInput } from './employee.controller'

function setup(
  employees: EmployeeInput[] = [
    { name: 'Nicolas', email: 'nicolas@semana.com', preferredDesks: [] },
    { name: 'Pierre', email: 'pierre@semana.com', preferredDesks: [] },
    { name: 'François', email: 'francois@semana.com', preferredDesks: [] },
  ],
) {
  const controller = new EmployeeController()
  employees.forEach(e => controller.addEmployee(e))

  const wrapper = ({ children }: any) => (
    <EmployeeControllerProvider value={controller}>
      {children}
    </EmployeeControllerProvider>
  )
  const result = render(<Employees />, { wrapper })
  return { ...result, controller }
}

test('Employees page shows a friendly title and its amazing employees', async () => {
  const result = setup()

  expect(
    result.getByText(/View, create and organize your employees here!/i),
  ).toBeInTheDocument()

  const employees = result.controller.getEmployees()
  // We make sure all our employees are properly shown to us
  employees.forEach(employee => {
    expect(result.getByText(employee.name)).toBeInTheDocument()
  })
})
