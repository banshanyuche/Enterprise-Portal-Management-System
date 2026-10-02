const mongoose = require('mongoose')
const Schema = mongoose.Schema

// user模型===>users集合

const UserType = {
    username:String,
    password:String,
    // 性别，0、1、2
    gender:Number,
    // 简介
    introduction:String,
    avatar:String,
    // 管理员1，编辑2
    role:Number
}

const UserModel = mongoose.model('user',new Schema(UserType))

module.exports = UserModel