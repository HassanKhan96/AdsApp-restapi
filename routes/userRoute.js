const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userdb = mongoose.model('users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup',async (req,res,next) => {
    
    const result = await userdb.findOne({email: req.body.email});
    if(result){
        return res.status(500).json({
            message: "email already exist"
        })
    }

    try{
        const hashPassword = await bcrypt.hash(req.body.password, 15,);

        const newUser = await new userdb({
            email: req.body.email,
            password: hashPassword,
            name: req.body.name,
            phone: req.body.phone
        }).save()
        
        res.status(201).json(newUser);
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            error: "Cannot create new user."
        });
    }
});

router.post('/login',async (req,res,next) => {
    try{
        const user = await userdb.findOne({email: req.body.email});
        
        if(!user){
            return res.status(404).json({
                message: "Incorrect email or password"
            });
        }

        const password = await bcrypt.compare(req.body.password, user.password);
        if(!password){
            return res.status(404).json({
                message: "Incorrect email or password"
            });
        }

    
        const token = await jwt.sign({
            id: user.id,
            email: req.body.email
        },
        process.env.JWTkey,
        {
            expiresIn: '20 days'
        });

        res.status(201).json({
            message: "Successfully signed in.",
            token
        });
        
    }
    catch(e){
        res.status(500).json({
            message: "Unexpected error server error.",
            error: e
        });
    }
});

router.get('/get_user/:id', async (req, res, next) => {
    try{
        const user = await userdb.findOne({_id: req.params.id})
        if(!user){
            return res.status(404).json({
                message: "Could not find the user."
            });
        }


        res.status(200).json({
            message: "User found.",
            user
        })
    }
    catch(e){
        if(e.kind==="ObjectId"){
            return res.status(404).json({
                message: 'Could not find the user.'
            });
        }
        res.status(500).json({
            message: "Unexpected error server error.",
            error: e
        });
    }
});

module.exports = router;