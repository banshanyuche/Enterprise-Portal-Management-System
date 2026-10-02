var express = require('express');
const NewsController = require("../../controllers/admin/NewsController")
var NewsRouter = express.Router();

// multer：用来处理文件上传的中间件，专门用来接收FormData
const multer = require('multer')
// dest：文件存储目标文件夹
const upload = multer({dest:'public/newsuploads/'})

NewsRouter.post("/adminapi/news/add",upload.single('file'),NewsController.add)
NewsRouter.get("/adminapi/news/list",NewsController.getList)
NewsRouter.post("/adminapi/news/list",upload.single('file'),NewsController.updateList)
NewsRouter.get("/adminapi/news/list/:id",NewsController.getList)
NewsRouter.put("/adminapi/news/publish",NewsController.publish)
NewsRouter.delete("/adminapi/news/list/:id",NewsController.delList)

module.exports = NewsRouter;
