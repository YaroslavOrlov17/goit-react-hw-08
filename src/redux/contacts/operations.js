import { createAsyncThunk } from "@reduxjs/toolkit"
import { goitAPI, setAuthHeader } from "../auth/operations"

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
export const editContact = createAsyncThunk("contacts/editContact",
    async({ id, updatedContact },thunkAPI)=> {
        try{
            const savedToken = thunkAPI.getState().auth.token

            if(!savedToken){
              return thunkAPI.rejectWithValue("Token is not exist!")
            }
            setAuthHeader(savedToken)
            const {data} = await goitAPI.patch(`contacts/${id}`, updatedContact )
            return data
        } catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)





