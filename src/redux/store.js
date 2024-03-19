import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { contactsApi } from './contactsApi';
import { filterReducer } from './filterSlice';
import { userReducer } from './userSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['token'],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    auth: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(contactsApi.middleware),

  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);
