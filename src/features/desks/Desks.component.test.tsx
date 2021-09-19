import React from 'react'
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { Desks } from './Desks.component'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useDeskController } from './desk.controller'

/**
 * TODO: Remove duplication once everything is settled.
 *
 * I did not go full TDD, the flow was:
 *  - Write some components logic
 *  - Write a few tests to make sure everything is testable and runs smoothly
 *  - Check what it is you want to refactor
 *      - Extracting a DeskEditErrorRow from DeskAddRow and DeskEditRow for example
 *  - Make sure everything is tested before refactoring
 *      - So make a test to check for the warning in both Create and Edit state
 *        which creates duplication in my test suite
 *  - Do the refacto
 *  - Enjoy green lines
 *
 * Duplication in test is less bad that in actual code (IMHO),
 * In scenario where time is short, I am okay to let it go.
 * */

function setup() {
  const queryClient = new QueryClient()

  const Wrapper = ({ children }: any) => {
    // We need to clear our controller from previous tests.
    // normally we would use before/afterEach for that, but
    // the controller is behind a hook, so we do that in our wrapper
    const deskController = useDeskController()
    React.useEffect(() => {
      deskController.getDesks().forEach(d => deskController.removeDesk(d.id))

      deskController.addDesk({ uniqueNumber: 42, name: 'The answer' })
      deskController.addDesk({ uniqueNumber: 47, name: 'The agent' })
      deskController.addDesk({ uniqueNumber: 404, name: 'The invisible' })
    }, [deskController])
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }
  return render(<Desks />, { wrapper: Wrapper })
}

async function setupWithLoadedDesks() {
  const result = setup()
  await waitForElementToBeRemoved(() => result.getByText(/loading/i))
  return result
}

test('Desks page shows a friendly title while loading desks', async () => {
  const result = setup()
  expect(
    result.getByText(/View, create and organize your desks here!/i),
  ).toBeInTheDocument()
  const loadingElement = result.getByText(/loading/i)
  expect(loadingElement).toBeInTheDocument()

  // At some point loading should finish
  await waitForElementToBeRemoved(loadingElement)
})

test('Desks page allows to create a new desk', async () => {
  const result = await setupWithLoadedDesks()

  // We expect a button to add a new desk
  const button = result.getByText(/add new desk/i)
  expect(button).toBeInTheDocument()
  fireEvent.click(button)

  // Once clicked, we expect 2 inputs to create our new desk:
  // name, and unique number
  const numberInput = result.getByLabelText(/unique number/i)
  const nameInput = result.getByLabelText(/name/i)
  const deskName = 'new desk'
  const deskNumber = 12

  fireEvent.change(nameInput, { target: { value: deskName } })
  fireEvent.change(numberInput, { target: { value: deskNumber } })

  // Once we filled the form, we click the validate button
  // and wait for our new desk to be shown to us
  fireEvent.click(result.getByTitle(/validate/i))

  const desk = await result.findByText(deskName)
  expect(desk).toBeInTheDocument()
})

test('Desks page allows to edit a desk', async () => {
  const result = await setupWithLoadedDesks()

  // We expect a button to edit "the answer" desk
  const button = result.getByTitle(/edit the answer/i)
  expect(button).toBeInTheDocument()
  fireEvent.click(button)

  // Once clicked, we will update the desk's name
  const nameInput = result.getByDisplayValue(/the answer/i)
  const deskName = 'the answer updated'
  fireEvent.change(nameInput, { target: { value: deskName } })

  // Once we filled the form, we click the validate button
  // and wait for our desk to be updated
  const validateButton = result.getByTitle(/validate/i)
  fireEvent.click(validateButton)
  await waitForElementToBeRemoved(validateButton)

  const desk = await result.findByText(deskName)
  expect(desk).toBeInTheDocument()
  expect(result.getByTitle(/edit the answer updated/i)).toBeInTheDocument()
})

test('Desks page disables editing a desk with an already used unique number', async () => {
  const result = await setupWithLoadedDesks()

  // We expect a button to edit "the answer" desk
  const button = result.getByTitle(/edit the answer/i)
  expect(button).toBeInTheDocument()
  fireEvent.click(button)

  // Once clicked, we change our desk to an already used number
  const numberInput = result.getByDisplayValue('42')
  const deskNumber = 47
  fireEvent.change(numberInput, { target: { value: deskNumber } })

  // We then validate it, and wait for the warning to show
  const validateButton = result.getByTitle(/validate/i)
  fireEvent.click(validateButton)
  const warning = await result.findByText(/Unique number 47 is already taken/i)

  expect(warning).toBeInTheDocument()
  // We should still be in the edit state, with input and validate button still present
  expect(validateButton).toBeInTheDocument()
  expect(numberInput).toBeInTheDocument()
})

test('Desks page disables creating a desk with an already used unique number', async () => {
  const result = await setupWithLoadedDesks()

  // We expect a button to add a new desk
  const button = result.getByText(/add new desk/i)
  expect(button).toBeInTheDocument()
  fireEvent.click(button)

  // Once clicked, we expect 2 inputs to create our new desk:
  // name, and unique number
  const numberInput = result.getByLabelText(/unique number/i)
  const nameInput = result.getByLabelText(/name/i)
  const deskName = 'new desk'
  // We use an already number to check for the warning
  const deskNumber = 42

  fireEvent.change(nameInput, { target: { value: deskName } })
  fireEvent.change(numberInput, { target: { value: deskNumber } })

  // We then validate it, and wait for the warning to show
  const validateButton = result.getByTitle(/validate/i)
  fireEvent.click(validateButton)
  const warning = await result.findByText(/Unique number 42 is already taken/i)

  expect(warning).toBeInTheDocument()
  // We should still be in the create state, with input and validate button still present
  expect(validateButton).toBeInTheDocument()
  expect(numberInput).toBeInTheDocument()
})

test('Desks page allows to delete a desk', async () => {
  const result = await setupWithLoadedDesks()

  // We know the have a desk named "the answer"
  // normally we would mock the api calls and have some
  // premade desks from our test suite.
  // But this is convenient so let's use that!
  const deleteButton = result.getByTitle(/delete the answer/i)
  expect(deleteButton).toBeInTheDocument()
  fireEvent.click(deleteButton)

  // After clicking the button, desk name and number should be hidden
  // and a delete prompt should be shown instead
  // NOTE : we use string instead of regex to match exactly that
  expect(result.queryByText('The answer')).toBeNull()
  expect(result.queryByText('42')).toBeNull()
  const prompt = result.getByText(
    /Are you sure you want to delete "the answer"\?/i,
  )
  expect(prompt).toBeInTheDocument()

  // Once the prompt shown, we want to validate it and make sure
  // the desk is removed from the list
  fireEvent.click(result.getByTitle(/validate/i))
  await waitForElementToBeRemoved(prompt)
  // once the prompt is removed, the desk should be removed as well
  expect(result.queryByText('The answer')).toBeNull()
  expect(result.queryByText('42')).toBeNull()
})
