import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Landing from '../components/landingPage/landing';
import AllStudents from '../components/getAllStudents/getAllStudents';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path = '/' component = {Landing} />
        <Route exact path = '/all' component = {AllStudents} />
      </Switch>
    </Router>
  );
}

export default App;
