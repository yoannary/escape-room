import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from './reducers/userData'
import roomsDataReducer from './reducers/rooms'
import logger from 'redux-logger'

export const createStore = () => configureStore({
  reducer: {
    userData: userDataReducer,
    roomsData: roomsDataReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const store = createStore(); 
