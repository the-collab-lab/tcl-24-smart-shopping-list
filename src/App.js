import React from 'react';
import './App.css';
import AddItem from './components/AddItem';
import List from './components/List';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/addItem">
            <AddItem />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
