import { QueryObserverResult } from 'react-query'
import { TableCell } from '../presentation/TableCell.component'
import { Desk } from './desk.model'

interface DeskEditErrorRowProps {
  mutation: Pick<QueryObserverResult<Desk[], Error>, 'isError' | 'error'>
}

export function DeskEditErrorRow({ mutation }: DeskEditErrorRowProps) {
  if (!mutation.isError) return null
  return (
    <tr>
      <TableCell className="bg-warning/20 text-warning" colSpan={3}>
        {mutation.error!.message}
      </TableCell>
    </tr>
  )
}
