import { useState } from 'react';

const useNotification = () => {
  const [load, setLoad] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  return {
    load,
    setLoad,
    error,
    setError,
    success,
    setSuccess,
  };
};

export default useNotification;
