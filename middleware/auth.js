const jwt = require('jsonwebtoken');
require ('dotenv').config();
function authenticationtoken(req , res , next){
    const authHeader = req.header[authorization];
    const token = authHeader?.split('').[1];
    if(!token)
        return res.status(400).json({message:'invalid'});
    jwt.verify(token,process.env.JWT_SECRET,(err,userData)=>{
        if(err)
            return res.status(401).json({message:'invalid token'});
        req.user = userData;
    next();
    })
    module.exports={ authenticationtoken};
};
