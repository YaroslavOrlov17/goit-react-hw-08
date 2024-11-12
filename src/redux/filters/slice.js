import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    filter: "",
    searchResults: [],
  },
  reducers: {
    changeFilter: (state, actions) => {
      state.filter = actions.payload
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload;
   }
  },
})

export const { changeFilter,setSearchResults } = filterSlice.actions
export default filterSlice.reducer
