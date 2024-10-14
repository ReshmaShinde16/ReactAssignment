import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../interface/userData';

interface UserState {
  users: UserData[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsersSuccess: (state, action: PayloadAction<UserData[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<UserData>) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<UserData>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
});

export const { fetchUsersSuccess, addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
