const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

// swagger
var serve = require('koa-static-server')
app.use(serve({ rootDir: 'swagger', rootPath: '/swagger' }))

app.use(bodyParser());

// router
const router = require('./src/routers/index.js');
router(app);

// 初始化mongodb数据库并增加到context中
const dbClient = require('./src/models/mongodb.js');
app.context.dbClient = dbClient;
app.context.dbClient.connect();


app.listen(3000); 