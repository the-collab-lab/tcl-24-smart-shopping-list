import { useHistory } from 'react-router-dom';
// import getToken from '../../lib/tokens';
import { useForm } from '../../hooks/useForm';
import { useFirebase } from '../../hooks/useFirebase.js';
import useNotification from '../../hooks/useNotification';
import { ArchivalNoticeModal } from '@the-collab-lab/shopping-list-utils';

import {
  HomeContainer,
  TopSection,
  BottonSection,
  ButtonHome,
  Form,
  InputHome,
  ButtonHomeSearch,
  Notification,
} from './Home.style.js';

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
    console.log('Creating new lists is disabled');
    // const token = getToken();
    // localStorage.setItem('token', token);
    // history.push('/list');
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
      <TopSection>
        <h1 className="TopSection-title">Smart Shopping App</h1>

        <img className="TopSection-image" src={store} alt="store" />

        <p className="TopSection-label">Get started by creating a new list.</p>

        <ButtonHome onClick={handleClick} data-testid="addList">
          New list
        </ButtonHome>
      </TopSection>

      <BottonSection>
        <Form onSubmit={handleSubmit}>
          <label className="BottonSection-Form-label">
            <p className="BottonSection-Form-title">
              Join an existing shopping list.
            </p>
            {
              <InputHome
                data-testid="input"
                type="text"
                name="token"
                onChange={handleInputChange}
                value={values.token}
                placeholder="Enter a token"
                required
              />
            }
          </label>

          <ButtonHomeSearch type="submit" aria-label="search list" primary>
            <i className="fas fa-search"></i>
          </ButtonHomeSearch>
        </Form>

        <Notification>
          {error && <p>{error}</p>}
          {load && <div className="progress-3"></div>}
        </Notification>
      </BottonSection>
      <ArchivalNoticeModal />
    </HomeContainer>
  );
};

export default Home;
