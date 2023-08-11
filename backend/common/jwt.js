const jwt = require('jsonwebtoken')
const CONFIG = require('../config/config')

const  createToken = (data, time)=> jwt.sign(data, CONFIG.JWT_SECERET, {expiresIn : time} )
const decodeToken = token => jwt.verify(token, CONFIG.JWT_SECERET)

module.exports = {createToken, decodeToken}