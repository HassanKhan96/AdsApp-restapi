const express = require('express');
const router = express.Router();

router.post('/signup',(req,res,next) => {
    res.status(201).json({
        uid: 'dfllfj'
    })
});

router.post('/login',(req,res,next) => {
    res.status(201).json({
        uid: "lksjflfj"
    });
});

router.get('/get_user', (req, res, next) => {
    res.status(200).json({
        user: 'user data'
    })
});

module.exports = router;