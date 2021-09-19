import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { EmployeeControllerProvider } from './features/employees/EmployeeController.provider'

interface AppProviderProps {
  children: React.ReactNode
}

const queryClient = new QueryClient()

export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <EmployeeControllerProvider>{children}</EmployeeControllerProvider>
    </QueryClientProvider>
  )
}
