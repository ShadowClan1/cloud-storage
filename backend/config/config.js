require('dotenv').config()

const CONFIG = {
PORT : process.env.PORT ,
MONGO_URI : process.env.MONGO_URI,
JWT_SECERET : process.env.JWT_SECERET
}


module.exports = CONFIG