import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Landing from '../components/landingPage/landing';
import AllStudents from '../components/getAllStudents/getAllStudents';
import UniqueStudent from '../components/uniqueStudent/uniqueStudent';
import Navigation from '../components/navbar/navbar';

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/all' component={AllStudents} />
        <Route path='/unique' component={UniqueStudent} />
      </Switch>
    </Router>
  );
}

export default App;
