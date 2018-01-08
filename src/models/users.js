
let DBController = require('./lib/common');
const uuid = require('node-uuid');
let config = { tableName: 'user' };

class Index extends DBController {
    constructor() {
        super(config);
        this.loginUserMap = {};
    }

    // 用户登录
    async login(user) {
        let userInfo = {};
        userInfo = await this.getOneByKey({ loginName: user.loginName });
        if (userInfo.password === user.password) {
            let token = user.loginName + ':' + uuid.v4();
            userInfo.token = token;
            this.loginUserMap[userInfo.loginName] = userInfo;
            return token;
        } else {
            return '用户名或密码错误'
        }
    }
    async logout(user) {

    }
}
let usersController = new Index(config);


module.exports = usersController; ``