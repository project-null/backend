// const Koa = require('koa');
import Koa from 'koa';
import path from 'path';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';

const app = new Koa();

// 使用日志模块
app.use(logger())

// swagger
import serve from 'koa-static-server';
app.use(serve({ rootDir: 'swagger', rootPath: '/swagger' }))

app.use(bodyParser());

// 加载路由
import router from './src/routers/index.js';
router(app);

// 初始化mongodb数据库并增加到context中
import dbClient from './src/models/lib/mongodb.js';
app.context.dbClient = dbClient;
app.context.dbClient.connect();


// 读取配置文件
import util from './src/common/util.js';
app.context.config = util.getConfig();


import userModel from './src/models/users';
app.context.model = {
    user: userModel
}

console.info(`server port : ${util.getConfig().port}`);
app.listen(util.getConfig().port); 
