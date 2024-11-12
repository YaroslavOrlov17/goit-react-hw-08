import { createSelector } from "@reduxjs/toolkit"
import { selectFilter } from "./../filters/selectors"

export const selectContacts = (state) => state.contacts.items
export const selectIsLoading = (state) => state.contacts.loading
export const selectError = (state) => state.contacts.error
export const selectEditedContact = (state) => state.contacts.selectedContact

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (!filter) return contacts
    const toLowercasedFilter = filter.toLowerCase()
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(toLowercasedFilter) ||
        contact.number.includes(toLowercasedFilter)
    )
  }
)

export const selectShowFavorites  = (state) => state.contacts.showFavorites
