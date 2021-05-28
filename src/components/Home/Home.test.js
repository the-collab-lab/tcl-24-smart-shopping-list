import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createBrowserHistory } from 'history';
import Home from './Home';
import renderInRouter from '../../test-utils/renderInRouter';
import mockFirebase from '../../test-utils/mockFirebase';

jest.mock('../../lib/firebase');
jest.mock('react-firebase-hooks/firestore', () => {
  return {
    useCollection: jest.fn(),
  };
});

describe('<Home />', () => {
  afterEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });
  it('updates the value of the input when the user types text into the input', () => {
    mockFirebase();
    const { getByLabelText } = render(<Home />);
    const input = getByLabelText('Type Your Token');

    expect(input).toBeDefined();
    expect(input.value).toEqual('');

    fireEvent.change(input, { target: { value: 'tree' } });
    expect(input.value).toEqual('tree');
  });

  it('sets the token to local storage and redirects the user to /lists when the user inputs a token that already exists in the database', async () => {
    /**
     * With mockFirebase are mocking fb.fireStore().collect('lists').doc().get()
     * We are returning the doc() mock function so that we can assert that it was called with the token (line 20 of Home.js).
     * We are passing in the mock get() function so that we can simulate different scenarios. In this test we are simulating a scenario in which get() returns a promse which resolves to an object with 'exists' being true.
     * */
    const { doc } = mockFirebase({
      get: jest.fn(() => Promise.resolve({ exists: true })),
    });

    const push = jest.fn();
    const token = 'deify mikey good';
    const { getByText, getByLabelText } = renderInRouter(<Home />, {
      history: { ...createBrowserHistory(), push },
    });
    const button = getByText('Search');
    const input = getByLabelText('Type Your Token');

    fireEvent.change(input, {
      target: { value: token },
    });
    fireEvent.click(button);

    expect(doc).toHaveBeenCalledWith(token);

    // We have to await these assertions because they happen after the promise returned by get() resolves
    await waitFor(() => {
      expect(localStorage.getItem('token')).toEqual(token);
      expect(push).toHaveBeenCalledWith('/list');
    });
  });

  it('displays "The list is not found" to the user when the user inputs a token that does not exist', () => {});

  it('sets a token in localStorage and redirects the user to /list when the user clicks "New List"', () => {});

  it('displays "Error getting document: XXXX" when firebase returns an error', () => {});
});
