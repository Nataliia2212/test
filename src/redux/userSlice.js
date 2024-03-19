import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.user.name = payload.user.name;
      state.user.email = payload.user.email;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    refreshUser(state, { payload }) {
      state.user.name = payload.name;
      state.user.email = payload.email;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
    refreshStart(state, { payload }) {
      state.isRefreshing = true;
    },
    refreshEnd(state, { payload }) {
      state.isRefreshing = false;
    },
    resetUser(state) {
      return initialState;
    },
    isLoading(state, { payload }) {
      state.isLoading = true;
    },
  },
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
    selectIsLoading: state => state.isLoading,
    selectToken: state => state.token,
    selectIsRefresh: state => state.isRefreshing,
    selectUser: state => state.user,
  },
});

export const userReducer = userSlice.reducer;
export const authUser = userSlice.actions.loggedIn;
export const {
  setUser,
  loggedIn,
  resetUser,
  isLoading,
  refreshUser,
  refreshStart,
  refreshEnd,
} = userSlice.actions;
export const {
  selectUser,
  selectIsLoggedIn,
  selectIsLoading,
  selectToken,
  selectIsRefresh,
} = userSlice.selectors;
