import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Logo } from './features/presentation/Logo.component'
import { MenuEntry, Menu } from './features/presentation/Menu.component'
import { Desks } from './features/desks/Desks.component'
import {
  MainSection,
  MainSectionTitle,
} from './features/presentation/MainSection.component'
import { Employees } from './features/employees/Employees.component'

function Home() {
  return (
    <MainSection>
      <MainSectionTitle className="text-4xl">
        Flex office for hybrid organisations
      </MainSectionTitle>
      <p className="text-center max-w-lg mx-auto">
        Define your <strong>remote working policy</strong> and manage your
        workforce across <strong>multiple locations</strong>. Schedule remote
        and onsite presence, optimise space allocation and prepare your{' '}
        <strong>return to the office !</strong>
      </p>
    </MainSection>
  )
}

const menuEntries: MenuEntry[] = [
  { path: '/', label: 'Home', component: Home },
  { path: '/desks', label: 'Desks', component: Desks },
  { path: '/employees', label: 'Employees', component: Employees },
  // {
  //   path: '/assignations',
  //   label: 'Assignations',
  //   component: Assignations,
  // },
]

export function App() {
  return (
    <Router>
      <div className="h-screen">
        <header className="flex flex-row items-center p-4">
          <Logo className="w-16 h-16 flex-none" />
          <h1 className="font-bold text-3xl flex-auto">
            <Link to="/">Semana</Link>
          </h1>
          <Menu menuEntries={menuEntries} />
        </header>
        <Switch>
          {menuEntries.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              exact
              render={props => <route.component {...props} />}
            />
          ))}
        </Switch>
      </div>
    </Router>
  )
}
