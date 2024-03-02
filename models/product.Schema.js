const { default: mongoose } = require("mongoose");

const product = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
    },
    price : {
        type : Number,
        required : [true , 'you must enter a price'],
    },
    category :  String,
    Images : Array,
    owner : {
        type : String,
        required :true
    },
    stock : {
        type : Number,
        required : true
    },
    published : {
        type : Boolean
    }
},{versionKey:false,timestamps: {
    createdAt : 'created_at'
}})


module.exports = mongoose.model('product' , product);
