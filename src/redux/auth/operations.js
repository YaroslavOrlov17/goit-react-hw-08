import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const goitAPI = axios.create({
    baseURL : "https://connections-api.goit.global/"

})

export const register = createAsyncThunk("auth/register",async(credentials,thunkAPI)=>{
    try {
      const {data} = goitAPI.post("/users/signup",credentials)   
      return data     
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)  
    }
})