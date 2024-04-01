import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import history from "./history";
import "./App.scss";

import { Home, NotFound } from "app/views";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/apply"
            component={() =>
              window.location.replace("https://tally.so/r/wvyaW0")
            }
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
