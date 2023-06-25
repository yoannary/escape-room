/* eslint-disable max-len */
import {ref, push, get, update, onValue } from 'firebase/database';
import {db} from '../config/firebase-config';

export const fromRoomsDocument = (snapshot) => {
  const roomsDocument = snapshot.val();
  
  return Object.keys(roomsDocument).map((key) => {
    const room = roomsDocument[key];
    return {
      ...room,
      id: key,
      bookedBy: room.bookedBy ? Object.keys(room.bookedBy) : [],
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
  const room = result.val();
  room.id = id;
  room.bookedBy = room.bookedBy ? Object.keys(room.bookedBy) : [];
  console.log('room', room);
  return room;
};

export const getAllRooms = async () => {
  const snapshot = await get(ref(db, "rooms"));
  if (!snapshot.exists()) {
    return [];
  }
  return fromRoomsDocument(snapshot);
};

export const updateRoomAvailability = (username, id, isAvailable) => {
  const updateLikes = {};
  updateLikes[`rooms/${id}/isAvailable`] = isAvailable;
  updateLikes[`rooms/${id}/bookedBy/${username}`] = !isAvailable;
  updateLikes[`/users/${username}/bookedRooms/${id}`] = !isAvailable;
  
  return update(ref(db), updateLikes);
};