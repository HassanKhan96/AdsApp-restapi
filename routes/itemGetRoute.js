const express = require('express');
const router = express.Router();
const getItems = require('./routefuctions/getItems');

router.get('/:location', (req,res,next) => {
    const city = req.params.location;
    const query = { city }
    getItems(query, 'base')
    res.status(200).json({
        message: 'Location: '+ req.params.location
    })
});

router.get('/:city/:type', (req,res,next) => {
    const city = req.params.city;
    const type = req.params.type;
    const query = { city, type };
    getItems(query, type)
    res.status(200).json({
        message: `Location: ${req.params.location}, Type: ${req.params.type}`
    })
})

module.exports = router;