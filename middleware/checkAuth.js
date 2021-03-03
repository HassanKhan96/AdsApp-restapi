const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userdb = mongoose.model('users');
module.exports = async (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]
        user = await jwt.verify(token, process.env.JWTkey)
        const dbuser = await userdb.findOne({_id: user.id});
        if(!dbuser){
            return res.status(500).json({
                error: {
                    message: "User does not exist."
                }
            })
        }
        req.currentUser = user;
    }
    catch(e){
        return res.status(500).json({
            error: {
                message: "Uauthorized access."
            }
        })
    }
        
    
    next()
}