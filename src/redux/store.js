import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import logger from 'redux-logger';
import { contactsApi } from '../services/contactsApi';
import { filterReducer } from './contacts/contacts-reducer';
export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
    logger,
  ],
  devTools: process.env.NODE_ENV === 'development',
});
setupListeners(store.dispatch);
