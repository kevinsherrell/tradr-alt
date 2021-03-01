const mongoose = require('mongoose');
const {Schema} = mongoose;
const ListingSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tradeFor: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    tradeOnly: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        default: 0
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: true
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    },
})
module.exports = mongoose.model('Listings', ListingSchema);