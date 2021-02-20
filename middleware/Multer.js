const multer = require('multer');
const Path = require('path');


module.exports = path => {
    const storage = multer.diskStorage({
        destination: (req, file,cb) => {
            cb(null, path);
        },
        filename: (req, file, cb) => {
            const uniqueName = Date.now()+'_'+Math.round(Math.random()*1E9);
            cb(null, file.fieldname+'_'+uniqueName+Path.extname(file.originalname));
        }
    })
    const upload = multer({
        storage: storage,
        fileFilter: (req,file,cb) => {
            const fileExt = Path.extname(file.originalname);
            if(fileExt !== '.jpg' && fileExt !== '.png' && fileExt !== '.gif' && fileExt !== '.jpeg'){
                return cb(new Error('Only images are allowed.'));
            }
            cb(null, true);
        }
    });
    return upload;
}

