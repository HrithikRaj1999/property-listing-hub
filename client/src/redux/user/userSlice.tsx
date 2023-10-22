import { createSlice } from "@reduxjs/toolkit";

interface userType {
  username: string;
  email: string;
  avatar: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
interface UserSliceType {
  currentUser: userType | null;
  error: any;
  loading: boolean;
}

const initialState: UserSliceType = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  //Reducers (read it return)  are functions that take the current state and an action as arguments, and return a new state result
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
