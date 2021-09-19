import React from 'react'
import { EmployeeController } from './employee.controller'

const EmployeeControllerContext = React.createContext(new EmployeeController())

interface EmployeeControllerProviderProps {
  value?: EmployeeController
  children: React.ReactNode
}

export function EmployeeControllerProvider({
  children,
  value = new EmployeeController(),
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
