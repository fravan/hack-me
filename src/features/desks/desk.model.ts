export interface Desk {
  type: 'desk'
  id: string
  uniqueNumber: number
  name: string
}

export const makeDesk = (input: Omit<Desk, 'type'>): Desk => ({
  ...input,
  type: 'desk',
})
