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
    // const options = {
    //     resourceType: "auto",
    //     folder: folder
    // }
    uploader.upload(file, (err, image) => {
        if (err) {
            console.log(err)
        }
        console.log(image)
        newImage.url = image.url
        newImage.save()
    })
}
// exports.uploads = (file, folder) => {
//     return "success"
//     // return new Promise(resolve => {
//     //     uploader.upload(file, (result) => {
//     //         resolve({
//     //             url: result.url,
//     //             id: result.public_id
//     //         })
//     //     }, {
//     //         resource_type: "auto",
//     //         folder: folder
//     //     })
//     // })
// }
module.exports = uploads;