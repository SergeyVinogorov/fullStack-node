import React from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import "materialize-css";
import { AuthContext } from "./context/AuthContext";
import { Preloader } from "./components/Preloader";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  const { login, logout, token, userId, fullName, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  if (!ready) {
    return <Preloader />;
  }
  return (
    <AuthContext.Provider value={{ login, logout, token, userId, fullName }}>
      <Router>
        <div className="container">
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              window.location.href = "/";
            }}
          >
            {routes}
          </ErrorBoundary>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
