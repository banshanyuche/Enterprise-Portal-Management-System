const mongoose = require('mongoose')
const Schema = mongoose.Schema

// user模型===>users集合

const NewsType = {
    title:String,
    content:String,
    // 类别，0、1、2
    category:Number,
    // 封面
    cover:String,
    isPublish:Number,
    editTime:Date
}

const NewsModel = mongoose.model('news',new Schema(NewsType))

module.exports = NewsModel