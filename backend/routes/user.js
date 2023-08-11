const app = require("express").Router();
const { createToken } = require("../common/jwt");
//
const STATUS = require("../config/Constants");
const User = require("../db/models/User");
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth");
const { dataRes, okRes } = require("../common/res");

app.post("/signUp", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user)
      return res
        .status(STATUS.FORBIDDEN)
        .json({ success: false, message: "User already exists" });
    const SALT = await bcrypt.genSalt(10);

    password = await bcrypt.hash(password, SALT);

    user = await User.create({ name, email, password });

    res
      .status(STATUS.OK)
      .json({ success: true, message: "User created successfully", email });
  } catch (error) {
    res.status(STATUS.FORBIDDEN).json({ message: error.message, error });
  }
});
app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user)
      return res
        .status(STATUS.FORBIDDEN)
        .json({ success: false, message: "User doesnot exists create account" });
 

    let  isMatched = await bcrypt.compare(password,user.password);
 if(!isMatched)return res
 .status(STATUS.FORBIDDEN)
 .json({ success: false, message: "Wrong credentials" });
 
const token = createToken({id : user._id, email}, '24h');
okRes(res,{ success: true, message: "User Logged in successfully", id : user._id, token }, "logged in successfully")
  } catch (error) {
    res.status(STATUS.FORBIDDEN).json({ message: error.message, error });
  }
});

app.use(auth)
app.post("/test",async (req, res)=>{
  try {
    
dataRes(res,{id : req.USER.id},200,"done")

  } catch (err) {
    
  }
})


module.exports = app;
