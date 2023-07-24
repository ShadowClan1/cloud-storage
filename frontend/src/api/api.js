import axios from "axios";

export const logIn = async (data, setError, seterror, setloading) => {
    try {
      
      const res =   await axios.post(`http://localhost:5000/api/user/login`, data);
if(res.status == 200) {
    return res.data
}


    } catch (error) {

    //   checkTokenExpiry(error.response.data.msg);
      setloading(false);
      let response = error?.response?.data?.msg;
      const msgError = response?.charAt(0)?.toUpperCase() + response?.slice(1);
      if (!msgError) {
        console.log(error)
        seterror(error.response.data.message);
      } else if (response.toLowerCase()?.includes("email")) {
        setError("email", { type: "custom", message: msgError });
      } else if (msgError?.includes("Password")) {
        setError("password", {
          type: "custom",
          message: msgError,
        });
      } else if (msgError?.includes("password")) {
        const msgError = response?.charAt(1).toUpperCase() + response?.slice(2);
        setError("password", {
          type: "custom",
          message: msgError,
        });
      }
    }
  };


  export const getDirContent = async (path) =>{
try{
const res = await  axios.post("http://localhost:5000/api/fs/getDirContent", {path})

if(res.status == 200){
  return res.data
}
}

catch (err) {
console.log(err)
}


  }