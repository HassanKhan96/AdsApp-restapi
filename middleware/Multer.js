const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        return {
            folder: 'myfolder',
            public_id: Date.now()+file.originalname
        }
    }
})

const upload = multer({
    storage: storage
});

module.exports = upload;