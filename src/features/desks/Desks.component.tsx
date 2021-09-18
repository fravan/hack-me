import React from 'react'
import {
  MainSection,
  MainSectionTitle,
} from '../presentation/MainSection.component'
import { Button } from '../presentation/Button.component'
import { TableLoadingRow } from '../presentation/TableLoadingRow.component'
import { DeskRow } from './DeskRow.component'
import { useDesksQuery } from './desk.queries'
import { DeskAddRow } from './DeskAddRow.component'

export function Desks() {
  const [adding, setAdding] = React.useState(false)
  const query = useDesksQuery()

  return (
    <MainSection>
      <MainSectionTitle>
        View, create and organize your desks here!
      </MainSectionTitle>

      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>Unique number</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {query.isLoading && <TableLoadingRow colSpan={3} />}
          {query.data?.map(desk => (
            <DeskRow key={desk.id} desk={desk} />
          ))}
          {adding && <DeskAddRow onCancelled={() => setAdding(false)} />}
          {!adding && (
            <tr>
              <td colSpan={3} className="text-right">
                <Button onClick={() => setAdding(true)}>Add new desk</Button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </MainSection>
  )
}
