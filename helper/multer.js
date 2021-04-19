const multer = require('multer'),
    path = require('path'),
    {v4: uuidv4} = require('uuid')


// const storage = multer.diskStorage({
//         destination: './public/images',
//         filename: function (req, file, cb) {
//             cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
//         }
//     });

const storage = multer.memoryStorage({
        // destination: './public/images',
        filename: function (req, file, cb) {
            cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
        }
    });

const upload = multer({storage: storage})

module.exports = upload