export const getMockCollection = ({ docs = [] } = {}) => {
  const mockAdd = jest.fn();
  const mockUpdate = jest.fn();
  const mockDelete = jest.fn();
  const doc = jest.fn(() => ({
    get: jest.fn(),
    collection: () => ({
      add: mockAdd,
      doc: () => ({ update: mockUpdate, delete: mockDelete }),
    }),
  }));
  const collection = jest.fn(() => ({
    doc,
  }));
  return { collection, mockAdd, mockUpdate, mockDelete };
};

export default getMockCollection;
