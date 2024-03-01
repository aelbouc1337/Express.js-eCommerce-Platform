const mongoose  = require("mongoose");

const user = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        immutable : true
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    country : {
        type : String,
    },
    sex :{
        type : String,
        required : true
    },
    phoneNumber : {
        type : Number ,
        required : true
    },
    lastLogin : {
        type : String,
        default :new Date().toLocaleDateString('en-GB')
    }
    
},{versionKey:false,timestamps: {
    createdAt : 'created_at',
    updatedAt : false
}})

const User = mongoose.model('User',user);

module.exports = User;