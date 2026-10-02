var express = require('express');
const UserController = require('../../controllers/admin/UserController');
var UserRouter = express.Router();

// multer：用来处理文件上传的中间件，专门用来接收FormData
const multer = require('multer')
// dest：文件存储目标文件夹
const upload = multer({dest:'public/avataruploads/'})

UserRouter.post("/adminapi/user/login",UserController.login)
// upload.single()：表示接受一个文件
UserRouter.post("/adminapi/user/upload",upload.single('file'),UserController.upload)
UserRouter.post("/adminapi/user/add",upload.single('file'),UserController.add)
// 实现用户列表的增删改查
UserRouter.get("/adminapi/user/list",UserController.getList)
UserRouter.get("/adminapi/user/list/:id",UserController.getList)
UserRouter.put("/adminapi/user/list/:id",UserController.putList)
UserRouter.delete("/adminapi/user/list/:id",UserController.delList)


module.exports = UserRouter;
