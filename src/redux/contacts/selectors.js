import { createSelector } from "@reduxjs/toolkit";
import {selectNameFilter} from "./../filters/selectors"

export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = state => state.contacts.loading
export const selectError = state => state.contacts.error
export const selectEditedContact = state => state.contacts.selectedContact
export const selectOpenModal = state => state.contacts.isModalOpen


export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter],
    (contacts, filter) => {
      return contacts.filter(el =>
        el.name.toLowerCase().includes(filter.toLowerCase())
      )
    }
  )