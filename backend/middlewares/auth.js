const { decodeToken } = require("../common/jwt");
const STATUS = require("../config/Constants");

const auth = (req, res, next) =>{
let {auth_token} = req.headers;
let {user_id} = req.body;
if(!user_id) user_id  = req.query.user_id
const {id} = decodeToken(auth_token);

if(id != user_id) return res.status(STATUS.FORBIDDEN).json({success : false, message : "authentication failed"})



    next();
}