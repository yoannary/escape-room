import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_STATES } from "../../common/constants";
import {
  getAllRooms,
  getRoomById,
  updateRoomAvailability,
} from "../../services/rooms.service";

const roomsDataSlice = createSlice({
  name: "roomsData",
  initialState: {
    allRoomsData: [],
    status: API_STATES.IDLE,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoomsAsync.fulfilled, (state, { payload }) => {
        state.status = API_STATES.FULFILLED;
        if (payload) {
          state.allRoomsData = payload;
        }
      })
      .addCase(getAllRoomsAsync.pending, (state) => {
        state.status = API_STATES.PENDING;
      })
      .addCase(getAllRoomsAsync.rejected, (state) => {
        state.status = API_STATES.REJECTED;
      })
      .addCase(updateRoomAvailableAsync.fulfilled, (state, { payload }) => {
        state.status = API_STATES.FULFILLED;
        console.log("payload", payload);
        if (payload) {
          const index = state.allRoomsData.findIndex((roomData) => roomData.id === payload.id)
          state.allRoomsData.splice(index, 1, payload);
        }
      })
      .addCase(updateRoomAvailableAsync.pending, (state) => {
        state.status = API_STATES.PENDING;
      })
      .addCase(updateRoomAvailableAsync.rejected, (state) => {
        state.status = API_STATES.REJECTED;
      });
  },
});

export const getAllRoomsAsync = createAsyncThunk(
  "fetchAllRooms",
  async (_, { rejectWithValue }) => {
    try {
      const result = await getAllRooms();
      console.log("result", result);

      if (result.error) {
        return rejectWithValue(result.error);
      } else {
        return result;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateRoomAvailableAsync = createAsyncThunk(
  "updateRoomAvailable",
  async ({ id, isAvailable, username }, { rejectWithValue }) => {
    try {
      console.log("id", id, isAvailable);

      const result = updateRoomAvailability(username, id, isAvailable).then((result) => {
        const updatedRoom = getRoomById(id).then((result) => {
          console.log("updatedRoom result", result);
          return result;
        });

        return updatedRoom;
      });
      console.log('rseult', result);
      if (result?.error) {
        return rejectWithValue(result.error);
      } else {
        return result;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const selectRoomsData = (state) => state.roomsData.allRoomsData;
export const selectRoomsDataStatus = (state) => state.roomsData.status;

export default roomsDataSlice.reducer;
