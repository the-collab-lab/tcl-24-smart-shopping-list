import React from 'react';
import './App.css';
import AddItem from './components/AddItem';
import List from './components/List';

function App() {
  return (
    <div className="App">
      <List />
      <AddItem />
    </div>
  );
}

export default App;
