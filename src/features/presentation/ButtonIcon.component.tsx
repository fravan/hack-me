import { buildClass } from '../common/build-class'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export function ButtonIcon({ children, ...props }: ButtonProps) {
  const className = buildClass('text-black font-bold p-1')
    .with('rounded-full cursor-pointer outline-none')
    .with('hover:bg-primary/20')
    .with('focus:ring-2 focus:ring-primary')
    .with('disabled:text-gray-300 disabled:bg-transparent')
    .with(props.className)
    .build()
  return (
    <button type="button" {...props} className={className}>
      {children}
    </button>
  )
}
