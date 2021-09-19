import { buildClass } from './build-class'

test('buildClass allows to chain class names fluently', () => {
  const className = buildClass('first-class').with('second-class').build()
  expect(className).toBe('first-class second-class')
})

test('buildClass allows to specify a check to include the class name or not', () => {
  const className = buildClass('first-class')
    .with('included-class', true)
    .with('ignored-class', false)
    .build()
  expect(className).toBe('first-class included-class')
})

test('buildClass can be used without fixed parameters', () => {
  const className = buildClass()
    .with('included-class', true)
    .with('ignored-class', false)
    .build()
  expect(className).toBe('included-class')
})

test('buildClass ignores null, undefined or empty values and trims the output', () => {
  const className = buildClass(' first-class ')
    .with(undefined)
    .with(null)
    .with('')
    .with(' second-class  ')
    .build()
  expect(className).toBe('first-class second-class')
})
