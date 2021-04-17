import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import AddItem from './components/AddItem/AddItem.jsx';
import List from './components/List/List.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Home from './components/Home/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <ProtectedRoute path="/list">
            <List />
          </ProtectedRoute>
          <ProtectedRoute path="/addItem">
            <AddItem />
          </ProtectedRoute>
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
