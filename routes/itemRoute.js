const express = require('express');
const router = express.Router();

router.get('/items',(req,res,next) => {
    res.status(200).json({
        message: 'get ads of item'
    });
});

router.post('/items',(req,res,next) => {
    
    res.status(201).json({
        message: 'post ads of item'
    });
});

router.get('/items/:itemId',(req,res,next) => {
    const itemId = req.params.itemId;
    res.status(200).json({
        message: `get item of id: ${itemId}`
    });
});

router.put('/items/:itemId',(req, res, next) => {
    const itemId = req.params.itemId;
    res.status(200).json({
        message: `put item of id: ${itemId}`
    });
});

router.delete('/items/:itemId',(req, res, next) => {
    const itemId = req.params.itemId;
    res.status(200).json({
        message: `delete item of id: ${itemId}`
    });
});

module.exports = router;