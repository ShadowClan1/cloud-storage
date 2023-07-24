const express = require("express");
const CONFIG = require("./config/config");
const app = express();
global.BASE_DIR = __dirname;
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
app.use("/api/user", require("./routes/user"));
app.use("/api/fs", require("./routes/fileSystem"));
app.use("/api/fs", require("./routes/fileSystem"));
// app.get("/api", require('./routes/user'))






connectToDB();
app.listen(CONFIG.PORT, () => {
  console.log(`-> ${CONFIG.PORT}`);
});
