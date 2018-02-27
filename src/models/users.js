import DBController from './lib/common';
import uuid from 'node-uuid';
import loginInfo from './loginInfo';
let config = { tableName: 'user' };

const _ = require('lodash');

class Index extends DBController {
    constructor() {
        super(config);
        this.loginUserMap = {};
        this.checkToken();
        this.tokenCheckCycleTime = 10;
    }

    checkToken() {
        setInterval(() => {
            let now = new Date().getTime() / 1000;
            _.forOwn(this.loginUserMap, item => {
                if ((now - item.loginTime) > 60 * this.tokenCheckCycleTime) {
                    delete this.loginUserMap[item.token];
                }
            });
        }, 1000 * 60)
    }

    // 用户登录
    async login(user) {
        const { loginName } = user;
        let userInfo = await this.getOneByKey({ loginName });
        if (userInfo && userInfo.password === user.password) {
            return await loginInfo.saveToken(userInfo);
        } else {
            throw '用户名或密码错误'
        }
    }

    async logout(user) {
        delete this.loginUserMap[item.token];
    }
}
let usersController = new Index(config);

export default usersController;