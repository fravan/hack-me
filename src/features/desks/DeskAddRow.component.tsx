import React from 'react'
import { ButtonIcon } from '../presentation/ButtonIcon.component'
import { Input } from '../presentation/Input.component'
import {
  ValidateIcon,
  CancelIcon,
  LoadingIcon,
} from '../presentation/Icons.component'
import { TableCell } from '../presentation/TableCell.component'
import { useDeskAddMutation } from './desk.queries'

interface DeskAddRowProps {
  onCancelled: () => void
}

export function DeskAddRow({ onCancelled }: DeskAddRowProps) {
  const [name, setName] = React.useState('')
  const [uniqueNumber, setUniqueNumber] = React.useState(0)
  const nameId = `name_desk`
  const numberId = `number_desk`
  const mutation = useDeskAddMutation()

  return (
    <>
      <tr>
        <TableCell>
          <label htmlFor={numberId}>Unique number: </label>
          <Input
            type="number"
            id={numberId}
            value={uniqueNumber}
            onChange={ev => setUniqueNumber(+ev.target.value)}
          />
        </TableCell>
        <TableCell>
          <label htmlFor={nameId}>Name: </label>
          <Input
            type="text"
            id={nameId}
            value={name}
            onChange={ev => setName(ev.target.value)}
          />
        </TableCell>
        <TableCell style={{ width: '80px' }}>
          <div className="flex flex-row items-center space-x-4">
            <ButtonIcon
              disabled={mutation.isLoading || name.length === 0}
              onClick={() =>
                mutation.mutate(
                  { name, uniqueNumber },
                  {
                    onSuccess: () => onCancelled(),
                  },
                )
              }
              title="Validate"
            >
              {mutation.isLoading ? <LoadingIcon /> : <ValidateIcon />}
            </ButtonIcon>

            <ButtonIcon
              title="Cancel"
              disabled={mutation.isLoading}
              onClick={onCancelled}
            >
              <CancelIcon />
            </ButtonIcon>
          </div>
        </TableCell>
      </tr>
      {mutation.isError && (
        <tr>
          <TableCell className="bg-warning/20 text-warning" colSpan={3}>
            {mutation.error.message}
          </TableCell>
        </tr>
      )}
    </>
  )
}
