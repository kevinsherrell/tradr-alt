const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    location: {
        type: Object,
        // required: true
    },
    cityState: {
        type: String,

    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: "Image",
        default: null
    },
    listings: [{
        type: Schema.Types.ObjectId,
        ref: 'Listings',
    }],
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateUpdated: {
        type: Date,
        default: Date.now,
    }
})
module.exports = mongoose.model('Users', UserSchema);