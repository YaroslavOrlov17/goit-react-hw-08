import { createSelector } from "@reduxjs/toolkit"
import { selectFilter } from "./../filters/selectors"

export const selectContacts = (state) => state.contacts.items
export const selectIsLoading = (state) => state.contacts.loading
export const selectError = (state) => state.contacts.error
export const selectEditedContact = (state) => state.contacts.selectedContact
export const selectOpenModal = (state) => state.contacts.isModalOpen

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (!filter) return contacts
    const toLowercasedFilter = filter.toLowerCase()
    return contacts.filter((contact) => {
      const sanitizedPhone = contact.number.replace(/[-\s]/g, "")
      return (
        contact.name.toLowerCase().includes(toLowercasedFilter) ||
        sanitizedPhone.includes(toLowercasedFilter)
      )
    })
  }
)
