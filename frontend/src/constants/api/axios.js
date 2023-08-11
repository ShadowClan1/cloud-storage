import axios from 'axios'
const { default: CONFIG } = require("../config/configs");

const instance = axios.create({baseURL : CONFIG.BASE_URL})


export const upload = async (formData) =>{
 return  await instance.post("/upload",formData) 
}
export const login = async (credentials ={email : null, password :null }) =>{
 return  await instance.post("/user/login",credentials) 
}