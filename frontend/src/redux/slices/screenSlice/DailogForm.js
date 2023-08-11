import { createSlice } from "@reduxjs/toolkit";


const initialState = {open :false, text : "" , email : ""}




const dialogFormSlice = createSlice({
    name : 'dialogFormSlice',
 initialState,
 reducers : {

 },
 extraReducers : (builder)=>{
    builder.addCase(loginR, (state, {payload})=>{
      state.isAuth = true
      state.email = payload.email
      state.token = payload.token
    })
 }

})