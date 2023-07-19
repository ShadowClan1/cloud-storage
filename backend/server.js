const express = require("express");
const CONFIG = require("./config/config");
const app = express();

const fs = require("fs");
const fss = require("fs/promises");
const connectToDB = require("./db");
require("dotenv").config();
app.use(express.static("/public"));
app.use(require("cors")());
// app.use(express.json({limit : '50mb'}))
app.use(express.json({ limit: "50mb" }));
app.use(require("morgan")("dev"));
app.get("/", (req, res) => res.send("Hare krishna"));
app.use("/api", require("./routes/user"));
// app.get("/api", require('./routes/user'))

app.post("/api/upload", async (req, res) => {
  let { file, fileName, fileSize, userId, path } = req.body;
  userId = 23;
  const basePath = __dirname + "/public/";
  const userPath = userId + "/" + path;
  let pathArr = userPath.split("/");
  let dir = "";
  for (let i = 0; i < pathArr.length; i++) {
    if (pathArr[i] == "" || pathArr[i] == " ") continue;
    pathArr[i] = pathArr[i].trim();
    try {
      const fileP = await fss.access(basePath + dir + pathArr[i]);

      
    } catch (err) {
      await fss
        .mkdir(basePath + dir + pathArr[i])
    }
    dir += pathArr[i] + "/";


  }

  const regex = /^data:(?:[a-zA-Z]{0,})\/([a-zA-Z]+);base64,/; // Regular expression to match the data URL
  const match = file.match(regex);
  console.log(match);
  const extension = match[1];
  const base64Data = file.split(";base64")[1];

  fs.writeFileSync(
    basePath + userPath + "/" + `${Date.now() + "." + extension}`,
    base64Data,
    "base64"
  );

  // JSON.stringify(JSON.parse(req))
  res.status(200).json({ success: true });
});

connectToDB();
app.listen(CONFIG.PORT, () => {
  console.log(`-> ${CONFIG.PORT}`);
});
