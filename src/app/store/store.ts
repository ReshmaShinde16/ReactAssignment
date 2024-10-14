import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/userSlices';

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
  
});
console.log("user",store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



