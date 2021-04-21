const mongoose = require('mongoose');
const {Schema} = mongoose;
const ImageSchema = new Schema({
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    dateUpdated: {
        type: Date,
        default: Date.now()
    },
    type: {
        type: String,
        enum: ['user', 'listing'],
        required: true
    },
    listing: {
        type: Schema.Types.ObjectId,
    },
    user: {
        type: Schema.Types.ObjectId
    },
    url: {
        type: String,
        required: true
    },
    public_id: {
        type: String
    }
})
module.exports = mongoose.model('Image', ImageSchema);