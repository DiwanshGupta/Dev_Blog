import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user :null ,
    loading:false
  };

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
      getuser: (state,actions) => {
        state.user=actions.payload;
        state.loading=false;
      },
      requestStart: (state) => {
        state.loading = true;
      },
      requestFail: (state) => {
        state.loading = false;
      },
      logout: (state) => {
        state.user = null; 
        state.loading=false
    }
    },
  });
export const { getuser,logout,requestFail,requestStart } = userSlice.actions;
export default userSlice.reducer;