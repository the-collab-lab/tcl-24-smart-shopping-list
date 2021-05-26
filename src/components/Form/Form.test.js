// import dependencies
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

//import react-testing methods
import { render, getByRole } from '@testing-library/react';

import { Form } from './Form';
import { useFirebase } from '../../hooks/useFirebase';
import { mockValues } from '../../test-utils/fixtures';

let mockStorage = {};

jest.mock('react-firebase-hooks/firestore', () => {
  return {
    useCollection: jest.fn(),
  };
});

beforeAll(() => {
  global.Storage.prototype.getItem = jest.fn((key) => mockStorage[key]);
});

describe('<Form/>', () => {
  it('should render a form with a button', () => {
    useCollection.mockImplementation(() => [mockValues, false]);
    const { getByText, getByLabelText, getByRole } = render(<Form />);
    expect(getByText('Name of item:')).toBeTruthy();
    expect(getByRole('textbox')).toBeTruthy();
    expect(getByText('Send')).toBeTruthy();
    // expect(getByRole('input')).toBeTruthy();
  });
});
