const express = require('express');
const upload = require('../middleware/Multer')('./uploads');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const mongoose = require('mongoose');
const dbs = mongoose.models;
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'get ads of item'
    });
});

router.post('/', checkAuth, upload.array('images'), async (req, res, next) => {
    try {
        const imagesPath = req.files.map(item => "http://localhost:5000/" + item.path);
        const newItem = await new dbs[req.body.type]({
            ...req.body,
            _uid: req.currentUser.id,
            images: imagesPath,
            datePosted: Date.now(),
            location: JSON.parse(req.body.location)
        }).save()
        const user = await dbs['users'].findOne({_id: req.currentUser.id});
        user.postedAds.push(newItem.id);
        user.save()
        res.status(201).json({
            message: 'post ads of item',
            newItem
        });
    }
    catch (error) {
        if (error.name === 'TypeError') {
            console.log(error)
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

router.get('/:type/:itemId', async (req, res, next) => {
    try {
        const itemId = req.params.itemId;
        const type = req.params.type;
        const result = await dbs[type].findOne({ _id: itemId })
        if (!result) {
            return res.status(404).json({
                message: `No item found with id: ${itemId} and type: ${type}`,
            })
        }

        res.status(200).json({
            message: `Item found with id: ${itemId} and type: ${type}`,
            result
        });
    }
    catch (err) {
        res.status(500).json({
            error: {
                message: 'Error occured',
                err
            }
        })
    }
});

router.patch('/:type/:itemId', async (req, res, next) => {
    const itemId = req.params.itemId;
    const type = req.params.type;
    const result = await dbs[type];
    const newValue = await result.updateOne({_id: itemId}, {$set: req.body.values})
    res.status(200).json({
        message: `Item: ${itemId} is updated.`,
        product: {
            id: itemId,
            URL: `http://localhost:5000/${type}/${itemId}`
        }
    });
});

router.delete('/:type/:itemId', async (req, res, next) => {
    try {
        const itemId = req.params.itemId;
        const type = req.params.type;
        const result = await dbs[type].deleteOne({ _id: itemId });
        if (result.deletedCount < 1) {
            return res.status(404).json({
                message: `No item found with id: ${itemId} and type: ${type}`
            })
        }
        res.status(200).json({
            message: `Item deleted of id: ${itemId} and type: ${type}`,
            result
        });
    }
    catch (err) {
        res.status(500).json({
            error: {
                message: 'Error occured',
                err
            }
        })
    }
});

module.exports = router;