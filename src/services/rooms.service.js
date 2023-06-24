/* eslint-disable max-len */
import {ref, push, get, update, onValue } from 'firebase/database';
import {db} from '../config/firebase-config';

export const fromRoomsDocument = (snapshot) => {
  const roomsDocument = snapshot.val();
  
  return Object.keys(roomsDocument).map((key) => {
    const addon = roomsDocument[key];
    return {
      ...addon,
      id: key,
      createdOn: new Date(addon.createdOn),
    };
  });
};

export const addRoom = async (name, difficulty, description, isAvailable, duration, minAge, maxPlayers, language) => {
  const result = await push(
    ref(db, 'rooms'),
    {
      name,
      difficulty,
      description,
      isAvailable,
      createdOn: Date.now(),
      duration,
      minAge,
      maxPlayers,
      language,
    });
  return await getRoomById(result.key);
};

export const getRoomById = async (id) => {
  const result = await get(ref(db, `rooms/${id}`));
  if (!result.exists()) {
    throw new Error(`Room with id ${id} does not exist!`);
  }
  const idea = result.val();
  idea.id = id;
  idea.createdOn = new Date(idea.createdOn);
  return idea;
};

export const getAllRooms = async () => {
  const snapshot = await get(ref(db, "rooms"));
  if (!snapshot.exists()) {
    return [];
  }
  return fromRoomsDocument(snapshot);
};