const UserModel = require("../../models/UserModel")

const UserService = {
    login: async ({ username, password }) => {
        //查询语法，返回要么为空对象，要么为富有信息的对象
        return UserModel.find({
            username,
            password
        })
    },

    upload: async ({ _id, username, introduction, gender, avatar }) => {
        // 通过id对数据库信息进行修改
        // 由于service中的avatar是由file.filename拼接而来的，可能会出现file为unknown的情况
        // file为空，拼接而来的avatar为空字符串，不进行修改
        if (avatar) {
            return UserModel.updateOne({
                _id
            }, {
                username, introduction, gender, avatar
            })
        } else {
            return UserModel.updateOne({
                _id
            }, {
                username, introduction, gender
            })
        }
    },

    add: async({username,introduction,gender,avatar,password,role})=>{
        return UserModel.create({
            username,introduction,gender,avatar,password,role
        })
    },

    // 一个方法两个路由，通过是否有id值传入判断
    getList: async ({id})=>{
        return id?UserModel.find({_id:id},["username","role","avatar","introduction","password"])
                :UserModel.find({},["username","role","avatar","introduction","gender"])
    },

    delList: async ({_id})=>{
        return UserModel.deleteOne({_id})
    },

    putList: async (body)=>{
        return UserModel.updateOne({_id:body._id},body)
    }
}

module.exports = UserService