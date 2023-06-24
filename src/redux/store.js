import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from './reducers/userData'
import roomsDataReducer from './reducers/rooms'

export const createStore = () => configureStore({
  reducer: {
    userData: userDataReducer,
    roomsData: roomsDataReducer
  }
});

export const store = createStore(); 
