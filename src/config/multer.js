const multer = require('multer');
const path = require('path');
const crypto = require('crypto')

const pathAbsolute = path.resolve(__dirname, '..', '..', 'tmp')

module.exports = {
    dest: pathAbsolute,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, pathAbsolute)
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err,hash) => {
                if(err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);

            })
        }
    })
};