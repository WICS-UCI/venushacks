import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import history from './history';
import './App.scss';

import {
  Home,
  Schedule,
  Resources,
  Workshops,
  NotFound
} from 'app/views';

import {
  Nav
} from 'app/components';

function App() {
  return (
    <div className='App'>
      <Router history={history}>
        <Nav history={history} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/schedule' component={Schedule} />
          <Route exact path='/resources' component={Resources} />
          <Route exact path='/workshops' component={Workshops} />
          <Route exact path='/devpost' component={() => window.location.replace("https://venushacks-2023.devpost.com/")} />
          <Route exact path='/midway' component={() => window.location.replace("https://forms.gle/3imPJg2UWXGXjvGT7")} />
          <Route exact path='/report' component={() => window.location.replace("https://forms.gle/xzPqKT4YgSWWdRqv8")} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
