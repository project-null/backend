import Router from 'koa-router';
import common from './lib/common';
import multer from 'koa-multer';//加载koa-multer模块  

const commonController = new Router({
    prefix: '/v1/common'
});

var storage = multer.diskStorage({
    //文件保存路径  
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    //修改文件名称  
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

const upload = multer({ storage });
commonController.post('/upload', upload.single('upfile'), async (ctx, next) => {
    ctx.body = {
        filename: ctx.req.file.filename//返回文件名  
    }
});

export default commonController;