const multer = require('multer');

module.exports = path => {
    const storage = multer.diskStorage({
        destination: (req, file,cb) => {
            cb(null, path);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now()+file.originalname);
        }
    })
    const upload = multer({
        storage: storage
    });
    return upload;
}

