import { useState } from 'react';

export const useNotification = () => {
  const [listNotFound, setListNotFound] = useState('');
  const [error, setError] = useState('');
  const [load, setLoad] = useState('');

  return [listNotFound, error, load, setListNotFound, setError, setLoad];
};
