const express = require('express');
const router = express.Router();

router.get('/:location', (req,res,next) => {
    res.status(200).json({
        message: 'location'+ req.params.location
    })
})

module.exports = router;