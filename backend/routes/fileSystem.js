const app = require("express").Router();
const fss = require("fs/promises");
const auth = require("../middlewares/auth");
const jwt = require('jsonwebtoken')
const secret_key = "Hare krishna"
const {
  dataRes,
  errorRes,
  badReqRes,
  okRes,
  notFoundRes,
  unAuthRes,
} = require("../common/res");
const STATUS = require("../config/Constants");

const BASE_PATH = BASE_DIR + "/public/";

// app.use(auth);

app.post("/getDirContent", async (req, res) => {
  try {
    let { path } = req.body;
    let userId = req?.USER?.id;
     userId = "64b6ae694fa46cd685e1d041"
    const BASE_PATH = BASE_DIR + "/public/";
    const userPath = userId + "/" + path;
    const fullPath = BASE_PATH + userPath;
    const data = await fss.readdir(fullPath);
    console.log(process.cwd());
    const dirContent = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      obj.name = data[i];
      const stat = await fss.stat(fullPath + "/" + data[i]);
      if (stat.isFile()) obj.type = "FILE";
      if (stat.isDirectory()) obj.type = "DIR";
      obj.size = stat.size;
      obj.birthtime = stat.birthtime;
      

      dirContent.push(obj);
    }

    okRes(res, dirContent);
  } catch (err) {
    console.log(err)
    notFoundRes(res, "not found");
  }
});
 
app.post("/createDir", async (req, res) => {
  try {
let {path} = req.body;
// let userId = req.USER.id
let userId = "64b6ae694fa46cd685e1d041"
const userPath = userId + "/" + path;
const fullPath = BASE_PATH + userPath;
const fs = await fss.mkdir(fullPath);

okRes(res, {success:true})


  } catch (err) {
    console.log(err)
    badReqRes(res,err)
  }
});


app.post("/deleteDir", async(req, res)=>{

try {
  
  let {path, type, recursive} = req.body;
  if(!recursive) recursive = false;
  // let userId = req.USER.id
  let userId = "64b6ae694fa46cd685e1d041"
  const userPath = userId + "/" + path;
  const fullPath = BASE_PATH + userPath;
  const fs = await fss.mkdir(fullPath);

  await fss.rm(fullPath,{recursive, force: recursive});

  okRes(res, {success:true})

  




} catch (err) {
  
badReqRes(res, err, "Cannot delete dir");
  
}


})

app.post("/upload", async (req, res) => {
  try {
    let { file, fileName, fileSize, path } = req.body;
    // let userId = req.USER.id;
    let userId = "64b6ae694fa46cd685e1d041"

    const userPath = userId + "/" + path;
    let pathArr = userPath.split("/");
    let dir = "";
    for (let i = 0; i < pathArr.length; i++) {
      if (pathArr[i] == "" || pathArr[i] == " ") continue;
      pathArr[i] = pathArr[i].trim();
      try {
        const fileP = await fss.access(BASE_PATH + dir + pathArr[i]);
      } catch (err) {
        await fss.mkdir(BASE_PATH + dir + pathArr[i]);
      }
      dir += pathArr[i] + "/";
    }
    const base64Data = file.split(";base64")[1];
    const fullPath = BASE_PATH + userPath;
     const data = fss.writeFile(
      fullPath + "/" + `${fileName}`,
      base64Data,
      "base64"
    );

    // JSON.stringify(JSON.parse(req))
    dataRes(res, { status: true }, STATUS.OK, "uploaded successfully");
  } catch (err) {
    console.log(err)
    badReqRes(res, err);
  }
});
app.get("/download", async (req, res) => {
  try {
    let {path } = req.query;
    let splitPath = path.split("/")
    let fileName = splitPath[splitPath.length - 1];

    // let userId = req.USER.id;
    let userId = "64b6ae694fa46cd685e1d041"

    const userPath = userId + "/" + path;
    
    const fullPath = BASE_PATH + userPath;


    
    res.download(fullPath, fileName, (err)=>{
    if(err){
      console.log(err)
      badReqRes(res,err,"failed");
    } 
    } );
    
    // dataRes(res, { status: true }, STATUS.OK, "uploaded successfully");
  } catch (err) {
    console.log(err)
    badReqRes(res, err);
  }
});



module.exports = app;
