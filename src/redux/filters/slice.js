import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    filter: "",
  },
  reducers: {
    changeFilter: (state, actions) => {
      state.filter = actions.payload
    },
  },
})

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer
