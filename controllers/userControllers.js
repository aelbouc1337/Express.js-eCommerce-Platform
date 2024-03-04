const { mailjs } = require("../helpers/email");
const PasswordHasher = require("../helpers/hachPassword");
const { JWTGenerator } = require("../helpers/jwtGenerator");
const UserModel = require("../models/user.Schema")
const moment = require('moment')

exports.register =async (req,res) => {
    const cover = req.file.filename
    const {username,email,password,age,country,sex,phoneNumber} = req.body
    const hashedPassword = await PasswordHasher.hashPassword(password);
    const User = new UserModel({username,email, password :hashedPassword,age,country,sex,phoneNumber,profilePic : cover});
    const result = await  User.save();
    await mailjs(email,username);
    res.json({result})
}

exports.login = async (req,res) => {
    const User = await UserModel.findOne({username : req.body.username })
    const checkPassword = await PasswordHasher.comparePassword(req.body.password ,User.password)
    if(checkPassword) {
        const lastLogin = await UserModel.updateOne({username : req.body.username} , {lastLogin : Date.now()})
        res.send(JWTGenerator(User.username , User.password));
    }
}

exports.getUserInfos = async (req,res) => {
    const user = await UserModel.findOne({username : req.user.username})
    const date = moment(user.lastLogin).calendar();
    res.json({
        message : "hello" +user.username,
        lastLogin : date
    })
}

exports.updateProfil = async (req,res) => {
    try {
        await UserModel.updateOne({username : req.user.username} , { age : req.body.age})
        res.send('Age Updated');
    } catch (error) {
        res.send(error.message)
    }

}

exports.deleteProfil = async (req,res) => {
    try {
        await UserModel.deleteOne({username : req.user.username})
        res.send('User Deleted');
    } catch (error) {
        res.send(error.message)
    }

}
