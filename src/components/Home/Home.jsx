import { useHistory } from 'react-router-dom';
import getToken from '../../lib/tokens';
import { useForm } from '../../hooks/useForm';
import { useFirebase } from '../../hooks/useFirebase.js';
import useNotification from '../../hooks/useNotification';

import { Button } from '../Style/Button.Style';

const Home = () => {
  const [values, handleInputChange, setValues] = useForm({
    token: '',
  });

  const { load, setLoad, setError, error } = useNotification();

  const history = useHistory();
  const { getAll } = useFirebase();

  function searching() {
    setLoad('Searching...');

    const docRef = getAll().doc(values.token);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setLoad('');
          localStorage.setItem('token', values.token);
          history.push('/list');
        } else {
          setError('The list is not found');
          setLoad('');
        }
      })
      .catch((error) => {
        setError(`Error getting document: ${error}`);
      });
  }

  const handleClick = () => {
    const token = getToken();
    localStorage.setItem('token', token);
    history.push('/list');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searching();
    setValues({
      token: '',
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Type Your Token
          <input
            type="text"
            name="token"
            onChange={handleInputChange}
            value={values.token}
            required
          />
          <Button type="submit" primary>
            Search
          </Button>
        </label>
      </form>
      {error && <p>{error}</p>}
      {load && <p>{load}</p>}
      <Button onClick={handleClick}>New List</Button>
    </div>
  );
};

export default Home;
