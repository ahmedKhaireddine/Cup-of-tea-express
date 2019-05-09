
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    id: {
        type:Number,
        required: true
    },
    title:{ 
        type: String,
        required: true
    },
    description:{ 
        type: String,
        required: true
    },
    image:{ 
        type: String,
        required: true
    },
    price:{ 
        type: Number,
        required: true
    },
    categorieId:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', Product);