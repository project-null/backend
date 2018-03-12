import Koa from 'koa';
import path from 'path';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';

import serve from 'koa-static-server';
import router from './src/routers/index.js';
import util from './src/common/util.js';
import dbClient from './src/models/lib/mongodb.js';

import etag from 'koa-etag';
import conditional from 'koa-conditional-get';

import fs from 'fs';


class StartUp {
    constructor() {
        this.app = new Koa();
    }
    init() {
        this.initFs();
        this.logger();
        this.bodyParser();

        this.swagger();
        this.initRouter();
        this.fileServer();
        this.frontEnd();

        this.getConfig();
        this.initDB();
        this.listen();
    }

    initFs() {
        let filesPath = path.join('static', 'files');
        try {
            fs.accessSync(filesPath)
        } catch (err) {
            fs.mkdir(filesPath, mkerr => {
                console.error(mkerr);
            });
        };
    }

    // 输出运行日志
    logger() {
        this.app.use(logger());
    }

    // 静态文件目录
    fileServer() {
        this.app.use(serve({ rootDir: 'static/files', rootPath: '/files' }));
    }

    // 前端目录
    frontEnd() {
        this.app.use(conditional());
        this.app.use(etag());
        this.app.use(serve({ rootDir: 'static/ui', rootPath: '/' }));
    }

    // swagger服务
    swagger() {
        this.app.use(serve({ rootDir: 'static/swagger', rootPath: '/swagger' }))
    }

    // 解析body内容
    bodyParser() {
        this.app.use(bodyParser());
    }

    // 初始化API
    initRouter() {
        router(this.app);
    }

    // 获取配置信息
    getConfig() {
        this.util = util;
        this.app.context.config = util.getConfig();
    }

    // 初始化数据库并连接数据库
    initDB() {
        dbClient.connect();
    }

    // 启动http服务
    listen() {
        console.info(`server port : ${this.util.getConfig().port}`);
        console.info(`defualt user admin:admin`);
        this.app.listen(this.util.getConfig().port);
    }
}

let startup = new StartUp();
startup.init();