import React from "react"
import {BrowserRouter as Router} from "react-router-dom"
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import 'materialize-css'
import {AuthContext} from "./context/AuthContext";
import {Preloader} from "./components/Preloader";

function App() {
  const { login, logout, token, userId, fullName, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  if (!ready) {
    return <Preloader />
  }
  return (
    <AuthContext.Provider value={{login, logout, token, userId, fullName}}>
      <Router>
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
)
}

export default App
