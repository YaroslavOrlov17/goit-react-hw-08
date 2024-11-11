import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contacts/slice.js"
import filtersReducer from "./filters/slice.js"
import { authSlice } from "./auth/slice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root-auth',
  version: 1,
  storage,
  whitelist: ['token']
}

const contactsPersistConfig = {
  key: 'contacts',
  version: 1,
  storage,
  whitelist: ['showFavorites'], 
};

const persistedContactsReducer = persistReducer(contactsPersistConfig, contactsReducer);

export const store = configureStore({
    reducer: {
      contacts: persistedContactsReducer,
      filters: filtersReducer,
      auth: persistReducer(persistConfig, authSlice) 

    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})

export const persistor = persistStore(store)




