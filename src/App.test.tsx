import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from './App'

test('Renders the main page', () => {
  render(<App />)
  const title = screen.getByText(/Flex office for hybrid organisations/i)
  expect(title).toBeInTheDocument()
})
