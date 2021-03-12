import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import history from './history';
import './App.scss';

import {
  Home,
  Schedule
} from 'app/views';

import {
  Nav
} from 'app/components';

function App() {
  return (
    <div className='App'
    // style={{ backgroundImage: `url(${starsBackground})`, backgroundSize: 'cover'}}
    >
      <Router history={history}>
        <Nav history={history}></Nav>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/schedule' component={Schedule}/>
        </Switch>
      </Router>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
