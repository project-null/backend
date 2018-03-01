// const Koa = require('koa');
import Koa from 'koa';
import path from 'path';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';

const app = new Koa();

app.use(logger())

// swagger start
import serve from 'koa-static-server';
app.use(serve({ rootDir: 'swagger', rootPath: '/swagger' }))
// swagger end

// 解析body
app.use(bodyParser());

// 加载业务逻辑路由路由 start 
import router from './src/routers/index.js';
router(app);
// 加载业务逻辑路由路由 end 


// 初始化mongodb数据库并增加到context中
import dbClient from './src/models/lib/mongodb.js';
dbClient.connect();

// 读取配置文件
import util from './src/common/util.js';
app.context.config = util.getConfig();


// import graphql from './src/routers/graphql';
// graphql(app);


console.info(`server port : ${util.getConfig().port}`);
app.listen(util.getConfig().port); 
