import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Feed from './components/Feed';
import Login from './components/Login';
import Logout from './components/Login';
import NotFound from './components/NotFound';

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
            <Switch>
              <Route exact path='/' component={Feed} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/logout' component={Logout} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </div>
      </Router>
    </State>
  );
};

export default App;
