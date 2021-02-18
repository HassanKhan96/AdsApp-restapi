const express = require('express');
const upload = require('../middleware/Multer')('./uploads');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const mongoose = require('mongoose');
const dbs = mongoose.models;

router.get('/',(req,res,next) => {
    res.status(200).json({
        message: 'get ads of item'
    });
});

router.post('/',checkAuth, upload.array('images'),async (req,res,next) => {
    try{
        console.log(req.files)
        // const newItem = await new dbs[req.body.type]({
        //     ...req.body,
        //     _uid: req.currentUser.id
        // })
        // newItem.save()
        // res.status(201).json({
        //     message: 'post ads of item',
        //     newItem
        // });
    }
    catch(error){
        if(error.name === 'TypeError'){
            return res.status(500).json({
                    error: {
                        message: "Type is not defined."
                    }
            })
        }
        console.log(error)
        res.status(500).json({
            error
        })
    }

});

router.get('/:itemId',(req,res,next) => {
    const itemId = req.params.itemId;
    res.status(200).json({
        message: `get item of id: ${itemId}`
    });
});

router.put('/:itemId',(req, res, next) => {
    const itemId = req.params.itemId;
    res.status(200).json({
        message: `put item of id: ${itemId}`
    });
});

router.delete('/:itemId',(req, res, next) => {
    const itemId = req.params.itemId;
    res.status(200).json({
        message: `delete item of id: ${itemId}`
    });
});

module.exports = router;