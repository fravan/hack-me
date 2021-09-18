import React from 'react'
import { ButtonIcon } from '../presentation/ButtonIcon.component'
import { Input } from '../presentation/Input.component'
import {
  ValidateIcon,
  CancelIcon,
  LoadingIcon,
} from '../presentation/Icons.component'
import { TableCell } from '../presentation/TableCell.component'
import { useDeskEditMutation } from './desk.queries'
import { DeskRowProps, DeskRowState } from './DeskRow.props'

export function DeskEditRow({ desk, setState }: DeskRowProps) {
  const [name, setName] = React.useState(desk.name)
  const [uniqueNumber, setUniqueNumber] = React.useState(desk.uniqueNumber)
  const nameId = `name_${desk.id}`
  const numberId = `number_${desk.id}`
  const mutation = useDeskEditMutation()

  React.useEffect(() => {
    if (mutation.isSuccess) {
      setState(DeskRowState.Idle)
    }
  }, [mutation.isSuccess, setState])

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
                mutation.mutate({
                  id: desk.id,
                  payload: { name, uniqueNumber },
                })
              }
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
