const jwt = require('jsonwebtoken');

module.exports = async (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]
        user = await jwt.verify(token, process.env.JWTkey)
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