const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Orders = new Schema({
    id:{
        type: Number,
        required: true,
        index:true
    },
    orders:{
        type:Array,
        required: true
    },
    totalPrice:{
        type: Number,
        required:true
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // },
    createdDate:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Orders', Orders);