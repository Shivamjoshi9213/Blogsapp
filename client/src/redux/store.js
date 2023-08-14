import { createSlice, configureStore } from "@reduxjs/toolkit";

const authslice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
  },
  reducers: {
    login(state) {
      state.isLogin = true;
    },

    logout(state) {
      state.isLogin = false;
    },
  },
});
export const authActions = authslice.actions;

export const store = configureStore({
  reducer: authslice.reducer,
});
