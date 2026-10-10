const NewsModel = require("../../models/NewsModel")

const NewsService = {
    getList: async ({ _id }) => {
        // 按时间远近排序，越近越靠前
        return _id ? NewsModel.find({ _id,isPublish:1 }) : NewsModel.find({isPublish:1}).sort({editTime:-1})
    },

    getTopList: async ({ limit }) => {
        // 按时间远近排序，越近越靠前
        // limit限制数量
        return NewsModel.find({isPublish:1}).sort({editTime:-1}).limit(limit)
    },
}

module.exports = NewsService