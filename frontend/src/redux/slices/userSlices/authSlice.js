import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../../constants/api/axios";

const initialState = {isAuth :false, token : "" , email : ""}

export const loginR = async (thunk, credentials) =>{
const { data, status }  = login(credentials);
console.log(status, data)


}


const authSlice = createSlice({
    name : 'auth',
 initialState,
 reducers : {

 },
 extraReducers : (builder)=>{
    builder.addCase(loginR, (state, {payload})=>{
      state.isAuth = true
      state.email = payload.email
      state.token = token
    })
 }

})