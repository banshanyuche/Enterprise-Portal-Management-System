var express = require('express');
const ProductController = require('../../controllers/admin/ProductController')
var ProductRouter = express.Router();

// multer：用来处理文件上传的中间件，专门用来接收FormData
const multer = require('multer')
// dest：文件存储目标文件夹
const upload = multer({dest:'public/productuploads/'})

ProductRouter.post("/adminapi/product/add",upload.single('file'),ProductController.add)
ProductRouter.get("/adminapi/product/list",ProductController.getList)
ProductRouter.get("/adminapi/product/list/:id",ProductController.getList)
ProductRouter.delete("/adminapi/product/list/:id",ProductController.delList)
ProductRouter.post("/adminapi/product/list",upload.single('file'),ProductController.updateList)

module.exports = ProductRouter;
