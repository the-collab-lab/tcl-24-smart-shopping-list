import React, { createContext } from 'react';
import { useFirebase } from '../hooks/useFirebase';

const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const { getAll, getById, create, update, remove } = useFirebase('things');

  return (
    <DataContext.Provider value={{ getAll, getById, create, update, remove }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext };
export default DataContextProvider;
