const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categorie = new Schema({
    id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Categorie', Categorie);