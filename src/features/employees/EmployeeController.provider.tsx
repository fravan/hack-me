import React from 'react'
import { makeDesk } from '../desks/desk.model'
import { EmployeeController } from './employee.controller'

const EmployeeControllerContext = React.createContext(new EmployeeController())

interface EmployeeControllerProviderProps {
  value?: EmployeeController
  children: React.ReactNode
}

export function EmployeeControllerProvider({
  children,
  value = new EmployeeController([
    {
      id: '1',
      name: 'Charles',
      email: 'charles@semana.com',
      preferredDesks: [
        makeDesk({ id: '1', uniqueNumber: 42, name: 'The answer' }),
        makeDesk({ id: '2', uniqueNumber: 47, name: 'The agent' }),
      ],
    },
    { id: '2', name: 'Jean', email: 'jean@semana.com', preferredDesks: [] },
  ]),
}: EmployeeControllerProviderProps) {
  const [controller] = React.useState(value)

  return (
    <EmployeeControllerContext.Provider value={controller}>
      {children}
    </EmployeeControllerContext.Provider>
  )
}

export function useEmployeeController() {
  return React.useContext(EmployeeControllerContext)
}
