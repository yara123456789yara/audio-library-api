require('dotenv').config();
const jwt = require('jsonwebtoken');
function generatetoken(userId, email){
    const payloud ={userId ,email};
    const secretkey = process.env.JWT_SECRET;
     const token = jwt.sign(payloud,secretkey,{expiresIn :'1h'});
};
module.exports={generatetoken};