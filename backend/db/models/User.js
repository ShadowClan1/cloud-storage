const { Schema, Model, model } = require("mongoose");

const userSchema = new Schema({
    name : {
        type :String,
        required : true
    },
    email : {
        type :String,
        required : true
    },
    password : {
        type :String,
        required : true
    },
    storage : {
        type :String,
        default : 128.00
    },
})


const User =  model("User", userSchema)
module.exports = User;