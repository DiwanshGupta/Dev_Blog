import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user :null // Example state
  };

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
      getuser: (state,actions) => {
        state.user=actions.payload;
      },
      logout: (state) => {
        state.user = null; // Clear the user state on logout
    }
    },
  });
export const { getuser,logout } = userSlice.actions;
export default userSlice.reducer;