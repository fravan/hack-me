import { v4 as uuidv4 } from 'uuid'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Desk } from './desk.model'
import { delay } from '../common/delay'

let desks: Desk[] = [
  { id: uuidv4(), uniqueNumber: 42, name: 'The answer' },
  { id: uuidv4(), uniqueNumber: 47, name: 'The agent' },
  { id: uuidv4(), uniqueNumber: 404, name: 'The invisible' },
]

export type DeskInput = Omit<Desk, 'id'>

async function getDesks(): Promise<Desk[]> {
  await delay(500)
  return desks
}

async function deleteDesk(id: string): Promise<void> {
  await delay(1234)
  desks = desks.filter(d => d.id !== id)
}

function checkDeskNumberUniqueness(uniqueNumber: number, id?: string) {
  const deskWithSameUniqueNumber = desks.find(
    d => d.uniqueNumber === uniqueNumber,
  )
  if (deskWithSameUniqueNumber != null && deskWithSameUniqueNumber.id !== id) {
    throw new Error(
      `Unique number ${uniqueNumber} is already taken by desk ${deskWithSameUniqueNumber.name}`,
    )
  }
}

async function addDesk(payload: DeskInput): Promise<Desk[]> {
  await delay(765)
  checkDeskNumberUniqueness(payload.uniqueNumber)
  desks.push({ ...payload, id: uuidv4() })
  return desks
}

interface EditDeskVariables {
  id: string
  payload: DeskInput
}

async function editDesk({ id, payload }: EditDeskVariables): Promise<Desk[]> {
  await delay(1234)
  checkDeskNumberUniqueness(payload.uniqueNumber, id)

  const idx = desks.findIndex(d => d.id === id)
  if (idx === -1) {
    desks.push({ ...payload, id: uuidv4() })
  } else {
    const desk = desks[idx]
    desk.name = payload.name
    desk.uniqueNumber = payload.uniqueNumber
  }
  return desks
}

export function useDesksQuery() {
  return useQuery('desks', getDesks)
}

export function useDeskDeleteMutation() {
  const queryClient = useQueryClient()
  return useMutation<void, Error, string, any>(deleteDesk, {
    onMutate: () => {
      queryClient.cancelQueries('desks')
    },
    onSuccess: (_result, id) => {
      queryClient.setQueryData<Desk[]>(
        'desks',
        data => data?.filter(d => d.id !== id) ?? [],
      )
    },
  })
}

export function useDeskEditMutation() {
  const queryClient = useQueryClient()
  return useMutation<Desk[], Error, EditDeskVariables, any>(editDesk, {
    onMutate: () => {
      queryClient.cancelQueries('desks')
    },
    onSuccess: result => {
      queryClient.setQueryData<Desk[]>('desks', () => result)
    },
  })
}

export function useDeskAddMutation() {
  const queryClient = useQueryClient()
  return useMutation<Desk[], Error, DeskInput, any>(addDesk, {
    onMutate: () => {
      queryClient.cancelQueries('desks')
    },
    onSuccess: result => {
      queryClient.setQueryData<Desk[]>('desks', () => result)
    },
  })
}
