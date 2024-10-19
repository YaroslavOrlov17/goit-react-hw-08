import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {fetchContacts,addContact,deleteContact, editContact} from "./operations"
import { logout } from "../auth/operations";

const initialState =  {
    items: [],
    loading: false,
    error: null,
    isEdited: false,
    isModalOpen: false, // Для управления модальным окном
    selectedContact: null, // Для хранения редактируемого контакта
}

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        // Открытие модального окна и сохранение выбранного контакта
        openModal: (state, action) => {
            state.isModalOpen = true;
            state.selectedContact = action.payload; // контакт, который нужно редактировать
        },
        closeModal: (state) => {
            state.isModalOpen = false;
            state.selectedContact = null;
        },
    },
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
        .addCase(logout.fulfilled,()=> initialState)
        .addCase(editContact.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index >= 0) {
              state.items[index] = action.payload; // Обновляем контакт в состоянии
            }
          })
        .addMatcher(isAnyOf(fetchContacts.pending,addContact.pending,deleteContact.pending),(state)=>{
            state.loading = true
        })
    }
})

export const { openModal, closeModal } = contactsSlice.actions;

export default contactsSlice.reducer

