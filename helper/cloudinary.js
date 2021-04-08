const {config, uploader} = require('cloudinary');
const {CLOUD_NAME, CLOUDINARY_URL, CLOUDINARY_SECRET, CLOUDINARY_KEY} = process.env;
const dotenv = require('dotenv')
dotenv.config()

config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET
})

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}