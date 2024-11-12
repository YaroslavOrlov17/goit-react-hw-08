export const selectContacts = (state) => state.contacts.items
export const selectIsLoading = (state) => state.contacts.loading
export const selectError = (state) => state.contacts.error
export const selectEditedContact = (state) => state.contacts.selectedContact



export const selectShowFavorites  = (state) => state.contacts.showFavorites
