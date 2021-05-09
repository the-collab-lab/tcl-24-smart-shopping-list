import { fireEvent, render } from '@testing-library/react';
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
  let collection;
  let mockUpdate;
  beforeEach(() => {
    ({ collection, mockUpdate } = getMockCollection());

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

  it('should show a list of items', () => {
    useCollection.mockImplementation(() => [mockValues, false]);

    const { getByText } = render(<List />);

    expect(getByText('Banana')).toBeTruthy();
    expect(getByText('Champagne')).toBeTruthy();
    expect(getByText('Oranges')).toBeTruthy();
  });

  it('shows an error message if there is an error returned from firebase', () => {
    const errorMessage = 'ERROR!!!!';
    useCollection.mockImplementation(() => [mockValues, false, errorMessage]);

    const { getByText } = render(<List />);
    expect(getByText(`Error: "${errorMessage}"`)).toBeTruthy();
  });

  it('unchecks items after 24 hours has passed since they were last purchased.', () => {
    useCollection.mockImplementation(() => [mockValues, false]);
    const { getByTestId } = render(<List />);
    expect(getByTestId('checkbox-1').checked).toBe(false);
    expect(getByTestId('checkbox-2').checked).toBe(true);
    expect(getByTestId('checkbox-3').checked).toBe(true);
  });

  it('updates the database with the item, time clicked, and estimates for when needed next if the item is ready to be clicked', () => {
    useCollection.mockImplementation(() => [mockValues, false]);

    const { getByTestId } = render(<List />);
    getByTestId('checkbox-1').click();
    expect(mockUpdate).toHaveBeenCalledWith({
      lastDate: new Date('2020-12-08T00:00:00.000Z'),
      lastEstimate: 11,
      times: 8,
    });
  });

  it('will not allow the user to click on an item that is not ready for purchase', () => {
    useCollection.mockImplementation(() => [mockValues, false]);

    const { getByTestId } = render(<List />);
    getByTestId('checkbox-2').click();
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('filters list items', () => {
    useCollection.mockImplementation(() => [mockValues, false]);
    const { getByTestId, queryByText } = render(<List />);

    fireEvent.change(getByTestId('filter-input'), { target: { value: 'Ba' } });
    expect(queryByText('Banana')).toBeTruthy();
    expect(queryByText('Champagne')).toBeFalsy();
    expect(queryByText('Oranges')).toBeFalsy();
  });
});
