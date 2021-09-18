import { buildClass } from '../common/build-class'

export function TableCell(props: React.HTMLProps<HTMLTableDataCellElement>) {
  const className = buildClass('border border-gray-200 px-4 py-2')
    .with(props.className)
    .build()
  return (
    <td {...props} className={className}>
      {props.children}
    </td>
  )
}
