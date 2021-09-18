import { Link, useRouteMatch } from 'react-router-dom'
import { buildClass } from '../common/build-class'

type CustomLinkProps = React.PropsWithChildren<{
  to: string
}>
function CustomLink({ to, children }: CustomLinkProps) {
  const match = useRouteMatch({
    path: to,
    exact: true,
  })
  const className = buildClass('hover:text-primary')
    .with('transition-colors')
    .with('text-primary', match != null)
    .build()
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  )
}

export interface MenuEntry {
  path: string
  label: string
  component: any
}

interface MenuProps extends React.ComponentProps<'nav'> {
  menuEntries: MenuEntry[]
}

export function Menu({ menuEntries, ...props }: MenuProps) {
  return (
    <nav {...props} className="flex-none">
      <ul className="flex flex-row items-center space-x-2 font-bold">
        {menuEntries.map(m => (
          <li key={m.path}>
            <CustomLink to={m.path}>{m.label}</CustomLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
