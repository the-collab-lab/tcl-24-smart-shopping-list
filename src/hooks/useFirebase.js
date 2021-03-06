import { fb } from './../lib/firebase';

export const useFirebase = () => {
  const db = fb.firestore().collection('lists');

  const getAll = () => db;

  const getById = (id) => db.doc(id).get();

  const create = (token, data) => {
    db.doc(token).set({ token });
    db.doc(token).collection('items').add(data);
  };

  const update = (token, id, value) =>
    db.doc(token).collection('items').doc(id).update(value);

  const remove = (token, id) =>
    db.doc(token).collection('items').doc(id).delete();

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
};
