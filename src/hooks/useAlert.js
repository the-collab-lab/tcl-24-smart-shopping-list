import { useEffect, useRef, useState } from 'react';

export const useAlert = (initialAlert = { type: '', message: '' }) => {
  // const [listNotFound, setListNotFound] = useState('');
  // const [error, setError] = useState('');
  const [load, setLoad] = useState(initialAlert);

  const [alertMessage, setAlertMessage] = useState(initialAlert);
  const timeoutIdRef = useRef();

  const setTimeoutAlert = () => {
    timeoutIdRef.current = setTimeout(() => {
      setAlertMessage(initialAlert);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, []);

  return [alertMessage, setTimeoutAlert, setAlertMessage, load, setLoad];
};
