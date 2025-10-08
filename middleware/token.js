require('dotenv').config();
const jwt = require('jsonwebtoken');
function generateAccesstoken(userId, email){
    const payloud ={userId ,email};
    const secretkey = process.env.JWT_SECRET;
     const accessToken = jwt.sign(payloud,secretkey,{expiresIn :'1h'});
};
function  generaterefreshtoken(userId){
    const payloud ={userId};
    const secretkey = process.env.JWT_SECRET_REFRESH;
    const refreshToken = jwt.sign(payloud,secretkey,{expiresIn :'7d'});

}
module.exports={ generateAccesstoken, generaterefreshtoken };
