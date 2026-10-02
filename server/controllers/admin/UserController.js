const UserService = require("../../services/admin/UserService")
const JWT = require("../../util/JWT")

//对于请求同时发来的数据，发给service校验并返回查询处理结果
const UserController = {
    // 声明为异步函数
    login: async (req, res) => {
        console.log(req.body)
        // req.body
        var result = await UserService.login(req.body)

        // 如果返回的查询结果对象长度为0，查询出问题
        if (result.length === 0) {
            res.send({
                Code: "-1",
                error: "用户名密码不匹配"
            })
        } else {
            //生成token并设置在header里
            const token = JWT.generate({
                //提取所查询到的第一条结果
                _id: result[0]._id,
                username: result[0].username
            }, '1d')
            res.header('Authorization', token)

            //返回前端用户信息
            res.send({
                ActionType: "OK",
                data: {
                    username: result[0].username,
                    gender: result[0].gender ? result[0].gender : 0,
                    introduction: result[0].introduction,
                    avatar: result[0].avatar,
                    role: result[0].role
                }
            })
        }
    },

    upload: async (req, res) => {
        console.log(req.body, req.file)

        const { username, introduction, gender } = req.body
        // 未上传头像进行修改其他内容的情况，file为空，则avatar为空字符串
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""

        // 从请求头中获取token，并从中得到用户id
        const token = req.headers["authorization"].split(" ")[1]
        var payload = JWT.verify(token)
        console.log(payload._id)

        await UserService.upload({ _id: payload._id, username, introduction, gender: Number(gender), avatar })
        if (avatar) {
            res.send({
                ActionType: "OK",
                data: {
                    username, introduction,
                    gender: Number(gender),
                    avatar
                }
            })
        } else {
            res.send({
                ActionType: "OK",
                data: {
                    username, introduction,
                    gender: Number(gender)
                }
            })
        }

    },

    add: async (req, res) => {
        // console.log(req.body, req.file)

        const { username, introduction, gender, role, password } = req.body
        // 未上传头像进行修改其他内容的情况，file为空，则avatar为空字符串
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""

        // 从请求头中获取token，并从中得到用户id
        const token = req.headers["authorization"].split(" ")[1]

        await UserService.add({ username, introduction, gender: Number(gender), avatar, password, role:Number(role) })
        if (avatar) {
            res.send({
                ActionType: "OK",
            })
        }
    },

    getList:async (req,res)=>{
        const result = await UserService.getList(req.params)
        res.send({
            ActionType:"OK",
            data:result
        })
    },

    delList:async (req,res)=>{
        // .params：获取URL路径中的动态部分
        console.log(req.params.id)

        const result = await UserService.delList({_id:req.params.id})
        res.send({
            ActionType:'OK'
        })
    },

    putList:async (req,res)=>{
        const result = await UserService.putList(req.body)
        res.send({
            ActionType:'OK'
        })
    }
}

module.exports = UserController