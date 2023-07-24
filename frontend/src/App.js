import { useState } from "react";
import { upload } from "./constants/api/axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Router from "./routes";
function App() {
  const [file, setFile] = useState(null);
  const [path, setPath] = useState("");
  const handleChange = (e) => {
    setPath(e.target.value);
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
    console.log(e.target.files[0]);
  };
  const handleClick = async (e) => {
    e.preventDefault();

    if (file != null) {
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async function () {
        console.log(reader.result);

        const { data, status } = await upload({
          file: reader.result,
          fileName: file.name,
          path,
        });
        console.log(file);

        console.log(data);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  };

  return   (<>
<Router/>
  </>
      

        

 )
  
}

export default App;
