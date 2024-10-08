const jwt = require('jsonwebtoken');

const verifyUser = (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
            if(err){
                 return res.status(403).json({message : 'Invalid token'})
            }
            req.user = user; //making a user in req and storing the user
            next();
        })
    }
}

module.exports = verifyUser;