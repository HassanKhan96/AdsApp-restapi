const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const electronics = mongoose.model('electronics');
const vehicles = mongoose.model('vehicles');
const mobile = mongoose.model('mobile');
const dbs = mongoose.models;

router.get('/',(req,res,next) => {
    res.status(200).json({
        message: 'get ads of item'
    });
});

router.post('/',async (req,res,next) => {
    const newItem = await new dbs[req.body.type](req.body);
    newItem
    .populate('_uid, name')
    .save()
    res.status(201).json({
        message: 'post ads of item',
        newItem
    });
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