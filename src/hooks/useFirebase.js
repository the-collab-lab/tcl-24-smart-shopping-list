import { fb } from './../lib/firebase';

export const useFirebase = (collection) => {
  const db = fb.firestore().collection(collection);

  const getAll = () => db;

  const getById = (id) => {
    return db.doc(id).get();
  };

  const create = (data) => {
    return db.add(data);
  };

  const update = (id, value) => {
    return db.doc(id).update(value);
  };

  const remove = (id) => {
    return db.doc(id).delete();
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
};
