import { render } from '@testing-library/react';
import { fb } from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

import getMockCollection from '../../test-utils/mockFirebase';

import List from './List';
import { mockValues } from '../../test-utils/fixtures';

jest.mock('../../lib/firebase');
jest.mock('react-firebase-hooks/firestore', () => {
  return {
    useCollection: jest.fn(),
  };
});

describe('<List />', () => {
  beforeEach(() => {
    fb.firestore = () => {
      return {
        collection: getMockCollection(),
      };
    };
  });
  it('should show a list of items', () => {
    useCollection.mockImplementation(() => [mockValues, false]);

    const { getByText } = render(<List />);

    expect(getByText('Banana')).toBeDefined();
    expect(getByText('Beer')).toBeDefined();
    expect(getByText('Oranges')).toBeDefined();
  });

  it('shows an error message if there is an error returned from firebase', () => {
    const errorMessage = 'ERROR!!!!';
    useCollection.mockImplementation(() => [mockValues, false, errorMessage]);

    const { getByText } = render(<List />);
    expect(getByText(`Error: "${errorMessage}"`)).toBeDefined();
  });
  // it('shows a message if the list is empty');

  // it('if we get time we will work on checking stuff');
});
