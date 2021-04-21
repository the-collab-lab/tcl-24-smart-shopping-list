import { fb } from './../lib/firebase';

export const useFirebase = () => {
  const db = fb.firestore().collection('lists');

  const getAll = () => db;

  const getById = (id) => {
    return db.doc(id).get();
  };

  const create = (userToken) => {
    return db.doc(userToken).set({ userToken });
  };

  const update = (id, value) => {
    return db.doc(id).update(value);
  };

  const remove = (id) => {
    return db.doc(id).delete();
  };

  const newCollection = (token, data) => {
    return db.doc(token).collection('data').add(data);
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
    newCollection,
  };
};
