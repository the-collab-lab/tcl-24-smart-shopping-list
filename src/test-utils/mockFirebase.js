import { fb } from '../lib/firebase';

jest.mock('../lib/firebase');

export const getMockCollection = ({ docs = [], get = jest.fn() } = {}) => {
  const mockAdd = jest.fn();
  const mockUpdate = jest.fn();
  const mockDelete = jest.fn();
  const doc = jest.fn(() => ({
    get,
    collection: () => ({
      add: mockAdd,
      doc: () => ({ update: mockUpdate, delete: mockDelete }),
    }),
  }));
  const collection = jest.fn(() => ({
    doc,
  }));
  return { collection, mockAdd, mockUpdate, mockDelete, doc };
};

const mockFirebase = ({ get } = {}) => {
  const mock = getMockCollection({ get });
  fb.firestore = () => ({ collection: mock.collection });
  return mock;
};

export default mockFirebase;
