import React from 'react'
import { DeskDeleteRow } from './DeskDeleteRow.component'
import { DeskEditRow } from './DeskEditRow.component'
import { DeskIdleRow } from './DeskIdleRow.component'
import { DeskProps, DeskRowState } from './DeskRow.props'

export function DeskRow({ desk }: DeskProps) {
  const [state, setState] = React.useState(DeskRowState.Idle)

  switch (state) {
    case DeskRowState.Editing:
      return <DeskEditRow desk={desk} setState={setState} />
    case DeskRowState.Deleting:
      return <DeskDeleteRow desk={desk} setState={setState} />
    default:
      return <DeskIdleRow desk={desk} setState={setState} />
  }
}
