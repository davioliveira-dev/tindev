import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Main from "./pages/Main";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dev/:id" component={Main} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
