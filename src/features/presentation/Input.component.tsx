import { buildClass } from '../common/build-class'

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const className = buildClass()
    .with('outline-none cursor-text caret-primary')
    .with('border-b border-primary')
    .with(props.className)
    .build()
  return <input {...props} className={className} />
}
