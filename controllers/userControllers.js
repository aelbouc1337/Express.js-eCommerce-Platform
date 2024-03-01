const UserModel = require("../models/user.Schema")
const bcrypt = require('bcrypt');

exports.register =async (req,res) => {
    const User = new UserModel(req.body);
    bcrypt.hash(req.body.password , 10 , (err , hash) => {
        User.password = hash;
    })
    const result = await  User.save();
    res.json({
        result
    })
}

exports.login = async (req,res) => {
    const User =await UserModel.findOne({username : req.body.username , password : req.body.password});
    res.json(User)
}