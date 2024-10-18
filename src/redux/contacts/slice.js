import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {fetchContacts,addContact,deleteContact} from "./operations"
import { logout } from "../auth/operations";

const initialState =  {
    items: [],
    loading: false,
    error: null
}

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    extraReducers: builder => {
        builder
        .addCase(fetchContacts.pending,(state)=>{
            state.error = null
        })
        .addCase(fetchContacts.fulfilled,(state,action)=>{
            state.error = null
            state.loading = false
            state.items = action.payload
        })
        .addCase(fetchContacts.rejected,(state)=>{
            state.error = true
        })
        .addCase(addContact.pending,(state)=>{
            state.error = null
        })
        .addCase(addContact.fulfilled,(state,action)=>{
            state.error = null
            state.loading = false
            state.items.push(action.payload)
        })
        .addCase(addContact.rejected,(state)=>{
            state.loading = false
            state.error = true
        })
        .addCase(deleteContact.pending,(state)=>{
            state.error = null
        })
        .addCase(deleteContact.fulfilled,(state,action)=>{
            state.error = null
            state.loading = false
            state.items = state.items.filter(item => item.id !== action.payload)
        })
        .addCase(deleteContact.rejected,(state)=>{
            state.loading = false
            state.error = true
        })
        .addCase(logout.fulfilled,()=> initialState)// ???????
        .addMatcher(isAnyOf(fetchContacts.pending,addContact.pending,deleteContact.pending),(state)=>{
            state.loading = true
        })
    }
})



export default contactsSlice.reducer

