import { render } from '@testing-library/react';
import List from './List';
import { fb } from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import getMockCollection from '../../test-utils/mockFirebase';
import { mockValues } from '../../test-utils/fixtures';

jest.mock('../../lib/firebase');
jest.mock('react-firebase-hooks/firestore', () => {
  return {
    useCollection: jest.fn(),
  };
});

describe('<List />', () => {
  beforeEach(() => {
    const collection = getMockCollection();

    fb.firestore = () => ({
      collection,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('shows a loading spinner', () => {
    useCollection.mockImplementation(() => [null, true]);
    const { getByText } = render(<List />);
    expect(getByText('Collection: Loading...')).toBeTruthy();
  });

  it('shows a list of items', () => {
    useCollection.mockImplementation(() => [mockValues, false]);
    const { getByText } = render(<List />);
    expect(getByText('Banana')).toBeTruthy();
  });
});
