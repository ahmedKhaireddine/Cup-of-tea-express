const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

Users = new Schema({
    id:{
        type: Number,
        required: true,
        index: true
    },
    username:{
        type: String,
        required: true,
        index: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        index: true
    },
    password:{
        type: String,
        
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
});
Users.plugin(passportLocalMongoose);

module.exports = mongoose.model('Usres', Users);