import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
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
import storage from 'redux-persist/lib/storage';
import contactsReducer from './contacts/contacts-reducer';
import { contactsApi } from '../services/contactsApi';
// import { filter } from './contacts/contacts-reducer';

const contactsPersistConfig = {
  key: 'contactsArr',
  storage,
  blacklist: ['filter'],
};

export const store = configureStore({
  reducer: {
    contacts: persistReducer(contactsPersistConfig, contactsReducer),
    [contactsApi.reducerPath]: contactsApi.reducer,
    // filter,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }),
    // logger,
    contactsApi.middleware,
  ],

  devTools: process.env.NODE_ENV === 'development',
});

// export const persistor = persistStore(store);
