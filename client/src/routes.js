import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { PersonalPage } from "./pages/PersonalPage";
import { AuthPage } from "./pages/AuthPage";
import { LoginPage } from "./pages/Login";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/main" exact>
          <PersonalPage />
        </Route>
        <Redirect to="/main" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
};
