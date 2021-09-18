import { Desk } from './desk.model'

export interface DeskProps {
  desk: Desk
}

export interface DeskRowProps extends DeskProps {
  setState: (state: DeskRowState) => void
}

export enum DeskRowState {
  Idle,
  Editing,
  Deleting,
}
