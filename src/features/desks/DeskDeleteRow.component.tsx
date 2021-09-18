import React from 'react'
import { ButtonIcon } from '../presentation/ButtonIcon.component'
import {
  ValidateIcon,
  CancelIcon,
  LoadingIcon,
} from '../presentation/Icons.component'
import { TableCell } from '../presentation/TableCell.component'
import { useDeskDeleteMutation } from './desk.queries'
import { DeskRowProps, DeskRowState } from './DeskRow.props'

export function DeskDeleteRow({ desk, setState }: DeskRowProps) {
  const mutation = useDeskDeleteMutation()
  return (
    <tr>
      <TableCell colSpan={2} className="bg-primary bg-opacity-25 text-right">
        Are you sure you want to delete "{desk.name}"?
      </TableCell>
      <TableCell className="bg-primary bg-opacity-25" style={{ width: '80px' }}>
        <div className="flex flex-row items-center space-x-4">
          <ButtonIcon
            disabled={mutation.isLoading}
            onClick={() => mutation.mutate(desk.id)}
            title="Validate"
          >
            {mutation.isLoading ? <LoadingIcon /> : <ValidateIcon />}
          </ButtonIcon>

          <ButtonIcon
            title="Cancel"
            disabled={mutation.isLoading}
            onClick={() => setState(DeskRowState.Idle)}
          >
            <CancelIcon />
          </ButtonIcon>
        </div>
      </TableCell>
    </tr>
  )
}
