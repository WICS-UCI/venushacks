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
        <Nav history={history}></Nav>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/schedule' component={Schedule}/>
          <Route exact path='/resources' component={Resources} />
          <Route exact path='/workshops' component={Workshops}/>
          {/* <Route exact path='/report' component={()=>{window.location.replace("https://docs.google.com/forms/d/e/1FAIpQLSepDdiImhchD7eBsRwiQk9a9TG5nQwdtPumrDUKEeX3tZLaKw/viewform"); return null;}} /> */}
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
