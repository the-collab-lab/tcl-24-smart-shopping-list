import React from 'react';
import './App.css';
import Data from './components/Data';
import DataContextProvider from './contexts/DataContext';

function App() {
  return (
    <DataContextProvider>
      <Data />
    </DataContextProvider>
  );
}

export default App;
