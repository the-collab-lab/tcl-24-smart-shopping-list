import { useHistory } from 'react-router-dom';
import getToken from '../../lib/tokens';
import { useForm } from '../../hooks/useForm';
import { useFirebase } from '../../hooks/useFirebase.js';
import useNotification from '../../hooks/useNotification';

import { Button } from '../Style/Button.Style';
import { Input } from '../Style/Input.Style';
import { HomeContainer, Form, Notification } from './Home.style.js';

import store from './Image/conifer-481.png';

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
          setTimeout(() => {
            setError('');
          }, 2000);
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
    <HomeContainer>
      <h1 className="HomeContainer-title">Smart Shooping App</h1>

      <img className="HomeContainer-image" src={store} alt="store" />

      <p className="HomeContainer-label">Get started by creating a new list.</p>

      <Button onClick={handleClick}>Create a new list</Button>

      <Form onSubmit={handleSubmit}>
        <label className="HomeContainer-Form-label">
          <p className="HomeContainer-Form-title">
            Join an existing shopping list.
          </p>
          {
            <Input
              type="text"
              name="token"
              onChange={handleInputChange}
              value={values.token}
              placeholder="Enter a token"
              required
            />
          }
        </label>

        <Button type="submit" primary>
          Search
        </Button>
      </Form>
      <Notification>
        {error && <p>{error}</p>}
        {load && <p>{load}</p>}
      </Notification>
    </HomeContainer>
  );
};

export default Home;
