import { createSlice } from "@reduxjs/toolkit"
import { login, logout, refreshUser, register } from "./operations"


const initialState = {
    user: {
        name: null,
        email: null,
      },
      loading: false,
      error: null,
      token: null,
      isLoggedIn: false,
      isRefreshing: false,
}

const slice = createSlice({
    name:"auth",
    initialState,
    extraReducers: builder => {
        builder
        .addCase(register.pending,(state)=>{
            state.error = false
            state.loading = true  
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.error = false
            state.loading = false
            state.user = action.payload.user
            state.token = action.payload.token
            state.isLoggedIn = true
        })
        .addCase(register.rejected,(state)=>{
            state.loading = false
            state.error = true
        })
        .addCase(login.pending,(state)=>{
            state.error = false
            state.loading = true  
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.error = false
            state.loading = false 
            state.user = action.payload.user
            state.token = action.payload.token
            state.isLoggedIn = true
        })
        .addCase(login.rejected,(state)=>{
            state.loading = false  
            state.error = true
        })
        .addCase(logout.pending,(state)=> {
            state.error = false
            state.loading = true  
        })
        .addCase(logout.fulfilled,(state)=>{ 
            state.error = false
            state.loading = true  
            return initialState})
        .addCase(logout.rejected,(state)=>{ 
            state.loading = false  
            state.error = true
           })
        .addCase(refreshUser.pending,(state)=>{
            state.error = false
            state.loading = true  
            state.isRefreshing = true
        })
        .addCase(refreshUser.fulfilled,(state,action)=>{
            state.error = false
            state.loading = false
            state.user.email = action.payload.email
            state.user.name = action.payload.name
            state.isLoggedIn = true
            state.isRefreshing = false
        })
        .addCase(refreshUser.rejected,(state)=>{
            state.error = false
            state.loading = false
            state.isRefreshing = false
        })
    }
})

export const authSlice = slice.reducer