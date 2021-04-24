import { useHistory } from 'react-router-dom';
import getToken from '../../lib/tokens';
import { useForm } from '../../hooks/useForm';
import { useFirebase } from '../../hooks/useFirebase.js';
import { useNotification } from '../../hooks/useNotification.js';
import { useAlert } from '../../hooks/useAlert';

const Home = () => {
  const [values, handleInputChange, setValues] = useForm({
    token: '',
  });

  // const [
  //   listNotFound,
  //   error,
  //   load,
  //   setListNotFound,
  //   setError,
  //   setLoad,
  // ] = useNotification();

  const [
    load,
    setLoad,
    alertMessage,
    setTimeoutAlert,
    setAlertMessage,
  ] = useAlert();

  const history = useHistory();
  const { getAll } = useFirebase();

  function searching() {
    setLoad({
      type: 'form-load-msn',
      message: 'Searching',
    });

    const docRef = getAll().doc(values.token);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setLoad({
            type: '',
            message: '',
          });
          localStorage.setItem('token', values.token);
          history.push('/list');
        } else {
          setAlertMessage({
            type: 'form-error-msn',
            message: 'The list is not found',
          });
          setLoad({
            type: '',
            message: '',
          });
        }
      })
      .catch((error) => {
        setAlertMessage({
          type: 'form-error-msn',
          message: `Error getting document: ${error}`,
        });
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
      {/* {listNotFound && <p>{listNotFound}</p>}
      {error && <p>{error}</p>} */}
      {load && <p>{load.message}</p>}

      {alertMessage && (
        <p className={alertMessage.type}>{alertMessage.message}</p>
      )}
      <button onClick={handleClick}>New List</button>
    </div>
  );
};

export default Home;
