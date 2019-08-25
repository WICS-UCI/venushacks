import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import history from './history';
import './App.scss';

import {
  Home
} from 'app/views';

function App() {
  return (
    <div className='App'>
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
