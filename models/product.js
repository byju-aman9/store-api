const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name must be provided']
    },
    price: {
        type: Number,
        required: [true, 'product price must be provided']
    },
    featured: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),

    },
    company: {
        type: String,
        // the values mentioned in the enum are the only values accepted for this key 
        // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supprted'
        }
    }
});

module.exports = mongoose.model('Product', productSchema);