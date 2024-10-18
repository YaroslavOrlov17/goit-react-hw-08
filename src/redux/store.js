import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contacts/slice.js"
import filtersReducer from "./filters/slice.js"
import { authSlice } from "./auth/slice.js";



export const store = configureStore({
    reducer: {
      contacts: contactsReducer,
      filters: filtersReducer,
      auth: authSlice

    }
})




