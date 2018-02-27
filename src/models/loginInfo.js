import DBController from './lib/common';
import uuid from 'node-uuid';


let config = { tableName: 'loginToken' };

class Index extends DBController {
    constructor() {
        super(config);
    }

    async checkTokens(tokenCheckCycleTime) {
        let now = new Date().getTime() / 1000;
        let tokens = await this.getAll();
        tokens.map(t => {
            if ((now - t.loginTime) > 60 * tokenCheckCycleTime) {
                console.log(`token${t.token}已经失效`);
                this.delete(t._id);
            }
        });
    }
    async check(tokenID, tokenSurvivalTime) {
        let tokenInfo = await this.getOneByKey({ token: tokenID });
        if (!!tokenInfo) {
            let now = new Date().getTime() / 1000;
            this.update(tokenInfo._id, {
                loginTime: new Date().getTime() / 1000,
            });
            return tokenInfo;
        }
        return null
    }

    async saveToken(user) {
        const { _id, loginName } = user;
        let tokenInfo = {
            token: uuid.v4(),
            loginTime: new Date().getTime() / 1000,
            userID: _id,
            loginName: loginName,
        }

        let userExist = await this.getOneByKey({ loginName });

        if (!!userExist) {
            let tokenUUID = this.genUUID(userExist._id);
            await this.deleteOneByKey({ token: tokenUUID });
        }
        await this.save(tokenInfo);
        return tokenInfo;
    }
}
let usersController = new Index(config);
export default usersController;