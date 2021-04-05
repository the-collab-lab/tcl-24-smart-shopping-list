import React from 'react';
import './App.css';
import AddItem from './components/AddItem';
import List from './components/List';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/list">List</Link>

        <Link to="/addItem">Add Item</Link>

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
