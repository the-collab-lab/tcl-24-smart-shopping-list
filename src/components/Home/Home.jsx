import { useHistory } from 'react-router-dom';
import getToken from '../../lib/tokens';
import { useForm } from '../../hooks/useForm';
import { useFirebase } from '../../hooks/useFirebase.js';
import { useNotification } from '../../hooks/useNotification.js';

const Home = () => {
  const [values, handleInputChange, setValues] = useForm({
    token: '',
  });

  const [
    listNotFound,
    error,
    load,
    setListNotFound,
    setError,
    setLoad,
  ] = useNotification();

  const history = useHistory();
  const { getAll } = useFirebase();

  function searching() {
    setLoad('Searching....');

    const docRef = getAll().doc(values.token);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setLoad('');
          localStorage.setItem('token', values.token);
          history.push('/list');
        } else {
          setListNotFound('The list is not found');
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
          Write Your Token
          <input
            type="text"
            name="token"
            onChange={handleInputChange}
            value={values.token}
          />
          <button type="submit">Search</button>
        </label>
      </form>
      {listNotFound && <p>{listNotFound}</p>}
      {error && <p>{error}</p>}
      {load && <p>{load}</p>}
      <button onClick={handleClick}>New List</button>
    </div>
  );
};

export default Home;
