const {uploads} = require('../helper/cloudinary'),
    dataUri = require("datauri"),
    DataURIParser = require('datauri/parser'),
    parseImage = new DataURIParser(),
    Image = require('../model/Image')

const createImage = (async (req, res, listing) => {
    req.files.forEach((file) => {
        const newImage = new Image({
            type: 'listing',
            listing: listing._id,
            // url: ""
        });
        let image = parseImage.format(file.mimetype, file.buffer)
        uploads(image.content, newImage, (err, result) => {
            console.log('result', result)
        })
        listing.images.push(newImage._id)
    })
})

module.exports = createImage;
