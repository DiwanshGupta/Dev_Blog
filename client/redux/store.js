// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import  userSlice  from './feature/user/slice';
const store = configureStore({
  reducer: {
    user: userSlice,  
  },
});

export default store;
