/* eslint-disable max-len */
import {get, set, ref, query, equalTo, orderByChild, update, onValue} from 'firebase/database';
import { db } from '../config/firebase-config';
import { userRole } from '../common/constants';

export const fromUsersDocument = (snapshot) => {
  const usersDocument = snapshot.val();

  if (usersDocument !== undefined && usersDocument !== null) {
    return Object.keys(usersDocument).map((key) => {
      const user = usersDocument[key];

      return {
        ...user,
        id: key,
      };
    });
  }
};

export const getUserByUsername = (username) => {
  return get(ref(db, `users/${username}`));
};

export const createUserUsername = (username, uid, email, password, firstName, lastName, phone) => {
  return set(ref(db, `users/${username}`), {username, uid, email, password, createdOn: Date.now(), role: userRole.BASIC, firstName, lastName, phone});
};

export const getUserData = (uid) => {
  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};

export const updateUserRole = (username, role) => {
  return update(ref(db), {
    [`users/${username}/role`]: role,
  });
};

export const getLiveUsers = (listen) => {
  return onValue(ref(db, 'users'), listen);
};


export const getAllUsers = () => {
  return get(ref(db, 'users'))
      .then((snapshot) => {
        if (!snapshot.exists()) return [];
        return fromUsersDocument(snapshot);
      });
};

export const updateUserProfilePicture = (handle, url) => {
  console.log('service img= ',update(ref(db), {
    [`users/${handle}/avatarUrl`]: url,
  }));
  return update(ref(db), {
    [`users/${handle}/avatarUrl`]: url,
  });
};
