import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filters",
    initialState: {
        name: "",
    },
    reducers: {
        changeFilter: (state,actions) => {
            state.name = actions.payload
        }
    }
})


export const selectNameFilter = (state) => state.filters.name;
export const {changeFilter} = filterSlice.actions;
export default filterSlice.reducer;