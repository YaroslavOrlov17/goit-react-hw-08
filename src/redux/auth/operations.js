import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const goitAPI = axios.create({
    baseURL : "https://connections-api.goit.global/"
})

export const setAuthHeader = (token) =>{
  goitAPI.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const register = createAsyncThunk("auth/register",async(credentials,thunkAPI)=>{
    try {
      const {data} = await goitAPI.post("/users/signup",credentials)   
      setAuthHeader(data.token)
      return data     
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)  
    }
})
export const login  = createAsyncThunk("auth/login",async(credentials,thunkAPI)=>{
    try {
      const {data} = await goitAPI.post("/users/login",credentials)
      setAuthHeader(data.token)   
      return data     
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)  
    }
})

export const logout  = createAsyncThunk("auth/logout",async(_,thunkAPI)=>{
    try {
      await goitAPI.post("/users/logout")    
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)  
    }
})

export const refreshUser = createAsyncThunk("auth/refresh", async (_,thunkAPI)=> {
  try {
    const savedToken = thunkAPI.getState().auth.token

    if(!savedToken){
      return thunkAPI.rejectWithValue("Token is not exist!")
    }

    setAuthHeader(savedToken)

    const {data} = await goitAPI.get("/users/current")
    return data

  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)  
  }
})