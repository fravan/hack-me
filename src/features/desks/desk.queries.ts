import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Desk } from './desk.model'
import { delay } from '../common/delay'
import { DeskController, DeskInput } from './desk.controller'

const deskController = new DeskController()
deskController.addDesk({ uniqueNumber: 42, name: 'The answer' })
deskController.addDesk({ uniqueNumber: 47, name: 'The agent' })
deskController.addDesk({ uniqueNumber: 404, name: 'The invisible' })

async function getDesks(): Promise<Desk[]> {
  await delay(500)
  return deskController.getDesks()
}

async function deleteDesk(id: string): Promise<void> {
  await delay(1234)
  deskController.removeDesk(id)
}

async function addDesk(payload: DeskInput): Promise<Desk[]> {
  await delay(765)
  return deskController.addDesk(payload)
}

interface EditDeskVariables {
  id: string
  payload: DeskInput
}

async function editDesk({ id, payload }: EditDeskVariables): Promise<Desk[]> {
  await delay(1234)
  return deskController.editDesk(id, payload)
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
