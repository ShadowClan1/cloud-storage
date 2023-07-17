const { default: mongoose, mongo } = require("mongoose");
const CONFIG = require("../config/config");



const connectToDB = async e =>{
mongoose.connect(CONFIG.MONGO_URI)
}

module.exports = connectToDB