const {config, uploader} = require('cloudinary').v2;
const {CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY} = process.env;
const dotenv = require('dotenv')
dotenv.config()

config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

const uploads = (file, newImage) => {
    console.log("cloudinary running")

    uploader.upload(file, (err, image) => {
        if (err) {
            console.log(err)
        }
        console.log(image)
        newImage.url = image.url
        newImage.public_id = image.public_id
        newImage.save()
    })
}

const deleteImage = async (public_id)=>{
    console.log("deleting image");
    uploader.destroy(public_id, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
        return result
    })
}

module.exports = {uploads, deleteImage}