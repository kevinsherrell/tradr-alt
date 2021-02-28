const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    img: {
        type: String,
        default: null
    },
    listings: [{
        type: Schema.Types.ObjectId,
        ref: "Listing"
    }],
    dateCreated: {
        type: Date,
        default: Date.now(),
    },
    dateUpdated: {
        type: Date,
        default: Date.now(),
    }
})
module.exports = mongoose.model('User', UserSchema);