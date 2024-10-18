import { createAsyncThunk } from "@reduxjs/toolkit"
import { goitAPI } from "../auth/operations"

export const fetchContacts = createAsyncThunk("contacts/fetchAll",
    async(_,thunkAPI) => {
        try {
            const {data} = await goitAPI.get("contacts")
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const addContact = createAsyncThunk("contacts/addContact",
    async(body,thunkAPI)=> {
        try{
            const {data} = await goitAPI.post("contacts", body)
            return data
        } catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deleteContact = createAsyncThunk("contacts/deleteContact",
    async(id,thunkAPI)=> {
        try{
            const {data} = await goitAPI.delete(`contacts/${id}`)
            return data.id
        } catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)


