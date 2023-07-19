import axios from 'axios'
const { default: CONFIG } = require("../config/configs");

const instance = axios.create({baseURL : CONFIG.BASE_URL})


export const upload = async (formData) =>{
 return  await instance.post("/upload",formData) 
}