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
     
    },
  });
export const { getuser } = userSlice.actions;
export default userSlice.reducer;