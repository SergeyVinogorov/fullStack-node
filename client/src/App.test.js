// import { render, screen } from '@testing-library/react';
// import App from './App';
//
// tests('renders initial react app', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
// import {NameContext, NameProvider, NameConsumer} from '../react-context'
import {AuthContext} from "./context/AuthContext";
import {MemoryRouter} from 'react-router-dom';
import {useRoutes} from "./routes";
import {PersonalPage} from "./pages/PersonalPage";
// import {useAuth} from "./hooks/auth.hook";

function setupRoutes(...args) {
  const returnVal = {}
  function TestComponent() {
    Object.assign(returnVal, useRoutes(...args))
    return null
  }
  render(<TestComponent />)
  return returnVal
}
test('show main route', ()=> {
  const routes = setupRoutes(true)

  const app = render(
    <MemoryRouter initialEntries={['/main']} initialIndex={0}>
      {routes}
    </MemoryRouter>
  );
  expect(app.getByText(/Welcome/i)).toBeInTheDocument();
})
test('show login route', ()=> {
  const routes = setupRoutes(false)

  const app = render(
    <MemoryRouter initialEntries={['/login']} initialIndex={0}>
      {routes}
    </MemoryRouter>
  );
  expect(app.getByText(/Authentication/i)).toBeInTheDocument();
})

/**
 * A custom render to setup providers. Extends regular
 * render options with `providerProps` to allow injecting
 * different scenarios to tests with.
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
const customRender = (ui, {providerProps, ...renderOptions}) => {
  return render(
    <AuthContext.Provider {...providerProps}>{ui}</AuthContext.Provider>,
    renderOptions,
  )
}

test('NameConsumer shows value from provider', () => {
  const providerProps = {
    token: 'token',
    userId: 'userId',
    login: () => {},
    logout: () => {},
    isAuthenticated: true,
    value: 'token',
  }
  customRender(<PersonalPage />, {providerProps})
  expect(screen.getByText(/To logout click here/))
})