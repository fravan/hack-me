import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Employees } from './Employees.component'
import { EmployeeControllerProvider } from './EmployeeController.provider'
import { EmployeeController, EmployeeInput } from './employee.controller'
import { makeDesk } from '../desks/desk.model'

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

function setupToEmployeeDetails(
  employeeIndex: number,
  employees?: EmployeeInput[],
) {
  const result = setup(employees)
  const selectedEmployee = result.controller.getEmployees()[employeeIndex]
  fireEvent.click(result.getByText(selectedEmployee.name))
  return { ...result, selectedEmployee }
}

test('Employees page shows a friendly title and its amazing employees', () => {
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

test('Clicking an employee will show its details', () => {
  const result = setup()
  const firstEmployee = result.controller.getEmployees()[0]

  fireEvent.click(result.getByText(firstEmployee.name))

  expect(result.getByText(firstEmployee.email)).toBeInTheDocument()
})

// I don't know if I can test that easily…
test.skip('On an employee details, should allow to sort desk by drag and drop', async () => {
  const result = setupToEmployeeDetails(0, [
    {
      name: 'Charles',
      email: 'yes',
      preferredDesks: [
        makeDesk({ id: '1', name: 'The one', uniqueNumber: 1 }),
        makeDesk({ id: '2', name: 'The two', uniqueNumber: 2 }),
      ],
    },
  ])

  const desk1 = result.getByText('The one')
  const desk2 = result.getByText('The two')
})
