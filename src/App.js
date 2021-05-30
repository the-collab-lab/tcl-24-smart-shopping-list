import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AddItem from './components/AddItem/AddItem.jsx';
import List from './components/List/List.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Home from './components/Home/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import { GlobalStyle } from '../src/components/Style/Global.Style';
import { AppContainer } from './App.style';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
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
      </AppContainer>
    </Router>
  );
}

export default App;
