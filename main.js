const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

// swagger
var serve = require('koa-static-server')
app.use(serve({ rootDir: 'swagger', rootPath: '/swagger' }))

app.use(bodyParser());

// 加载路由
const router = require('./src/routers/index.js');
router(app);

// 初始化mongodb数据库并增加到context中
const dbClient = require('./src/models/lib/mongodb.js');
app.context.dbClient = dbClient;
app.context.dbClient.connect();


// 读取配置文件
const util = require('./src/common/util.js');
app.context.config = util.getConfig();

console.info(`server port : ${util.getConfig().port}`);
app.listen(util.getConfig().port); 
