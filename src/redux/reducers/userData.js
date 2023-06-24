import { createSlice } from "@reduxjs/toolkit";
import { API_STATES } from "../../common/constants";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    user: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const selectUserData = (state) => state.userData.user;

export const { logout, setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;