import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import AddItem from './components/AddItem/AddItem.js';
import List from './components/List/List.js';
import NavBar from './components/NavBar/NavBar.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/addItem">
            <AddItem />
          </Route>
        </Switch>
        <NavBar />
      </div>
    </Router>
  );
}

export default App;
