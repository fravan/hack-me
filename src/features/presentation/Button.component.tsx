import { buildClass } from '../common/build-class'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export function Button({ children, ...props }: ButtonProps) {
  const className = buildClass('text-white font-bold px-2 py-1')
    .with('bg-primary border border-primary rounded-sm')
    .with('hover:bg-primary-darker')
    .with(props.className)
    .build()
  return (
    <button type="button" {...props} className={className}>
      {children}
    </button>
  )
}
