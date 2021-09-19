import { Desk } from '../desks/desk.model'

interface EmployeeDesksProps {
  desks: Desk[]
}

export function EmployeeDesks({ desks }: EmployeeDesksProps) {
  return (
    <ul>
      {desks.map(d => (
        <li key={d.id}>{d.name}</li>
      ))}
    </ul>
  )
}
