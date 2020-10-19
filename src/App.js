import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Feed from './components/Feed';
import Login from './components/Login';
import Logout from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import Alerts from './components/Alerts';

import './App.css';
import Container from 'react-bootstrap/Container';
import State from './context/State';
const App = () => {
  return (
    <State>
      <Router>
        <div className='App'>
          <Header />
          <Container>
            <Alerts />
            <Switch>
              <Route exact path='/' component={Feed} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/logout' component={Logout} />
              <Route exact path='/register' component={Register} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </div>
      </Router>
    </State>
  );
};

export default App;
