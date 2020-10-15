import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Feed from './components/Feed';
import NotFound from './components/NotFound';

import './App.css';
import Container from 'react-bootstrap/Container';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Container>
          <Switch>
            <Route exact path='/' component={Feed} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
};

export default App;
