import { LoadingIcon } from './Icons.component'
import { TableCell } from './TableCell.component'

interface TableLoadingRowProps {
  colSpan: number
}

export function TableLoadingRow({ colSpan }: TableLoadingRowProps) {
  return (
    <tr>
      <TableCell colSpan={colSpan} className="italic text-gray-500">
        <div className="flex flex-row items-center space-x-4">
          <LoadingIcon />
          <span>Loading…</span>
        </div>
      </TableCell>
    </tr>
  )
}
