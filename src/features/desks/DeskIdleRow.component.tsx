import React from 'react'
import { ButtonIcon } from '../presentation/ButtonIcon.component'
import { EditIcon, DeleteIcon } from '../presentation/Icons.component'
import { TableCell } from '../presentation/TableCell.component'
import { DeskRowProps, DeskRowState } from './DeskRow.props'

export function DeskIdleRow({ desk, setState }: DeskRowProps) {
  return (
    <tr>
      <TableCell className="text-primary">{desk.uniqueNumber}</TableCell>
      <TableCell>{desk.name}</TableCell>
      <TableCell style={{ width: '80px' }}>
        <div className="flex flex-row items-center space-x-4">
          <ButtonIcon
            title={`Edit ${desk.name}`}
            onClick={() => setState(DeskRowState.Editing)}
          >
            <EditIcon />
          </ButtonIcon>

          <ButtonIcon
            title={`Delete ${desk.name}`}
            onClick={() => setState(DeskRowState.Deleting)}
          >
            <DeleteIcon />
          </ButtonIcon>
        </div>
      </TableCell>
    </tr>
  )
}
