const { default: mongoose, mongo } = require("mongoose");
const CONFIG = require("../config/config");



const connectToDB =  e =>{
 mongoose.connect(CONFIG.MONGO_URI).then(e=>console.log("connected to db")).catch(e=>console.log(e))
//  mongoose.connect(CONFIG.MONGO_URI).then(e=>console.log("connected to db")).catch(e=>console.log(e))

}

module.exports = connectToDB