import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Desk } from './desk.model'
import { delay } from '../common/delay'
import {
  useDeskController,
  DeskInput,
  IDeskController,
} from './desk.controller'

const makeGetDesks = (deskController: IDeskController) => async () => {
  await delay(500)
  return deskController.getDesks()
}

const makeDeleteDesk =
  (deskController: IDeskController) => async (id: string) => {
    await delay(1234)
    deskController.deleteDesk(id)
  }

const makeAddDesk =
  (deskController: IDeskController) => async (payload: DeskInput) => {
    await delay(765)
    return deskController.addDesk(payload)
  }

interface EditDeskVariables {
  id: string
  payload: DeskInput
}

const makeEditDesk =
  (deskController: IDeskController) =>
  async ({ id, payload }: EditDeskVariables) => {
    await delay(1234)
    return deskController.editDesk(id, payload)
  }

/**
 * Note on DeskController and custom hook:
 * Because we are in the hook world, we might want to give
 * useQuery() a fixed function that would not be regenerated each call.
 * Thus the use of React.useMemo
 * Our controller is fixed and will not change. But even if it did, that's
 * good and that's what React.useMemo is for!
 *
 * All of this makes the code a little bit more complicated,
 * react-query is obviously overkill for a memory/local only thing.
 */

export function useDesksQuery() {
  const deskController = useDeskController()
  const getDesks = React.useMemo(
    () => makeGetDesks(deskController),
    [deskController],
  )
  return useQuery('desks', getDesks)
}

export function useDeskDeleteMutation() {
  const queryClient = useQueryClient()
  const deskController = useDeskController()
  const deleteDesk = React.useMemo(
    () => makeDeleteDesk(deskController),
    [deskController],
  )
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
  const deskController = useDeskController()
  const editDesk = React.useMemo(
    () => makeEditDesk(deskController),
    [deskController],
  )
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
  const deskController = useDeskController()
  const addDesk = React.useMemo(
    () => makeAddDesk(deskController),
    [deskController],
  )
  return useMutation<Desk[], Error, DeskInput, any>(addDesk, {
    onMutate: () => {
      queryClient.cancelQueries('desks')
    },
    onSuccess: result => {
      queryClient.setQueryData<Desk[]>('desks', () => result)
    },
  })
}
