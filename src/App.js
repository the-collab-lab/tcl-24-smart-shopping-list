import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import AddItem from './components/AddItem/AddItem.jsx';
import List from './components/List/List.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Home from './components/Home/Home';

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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <NavBar />
      </div>
    </Router>
  );
}

export default App;
