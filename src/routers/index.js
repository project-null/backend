import usersController from '../controllers/users';
import favoritesFolderController from '../controllers/favoritesFolder';
import favoritesController from '../controllers/favorites';
import accountController from '../controllers/accounts';
import commonController from '../controllers/common';

import loginInfo from '../models/loginInfo';

import fs from 'fs';
import path from 'path';


let indexStr = null;
const tokenSurvivalTime = 10;
setInterval(() => {
    loginInfo.checkTokens(tokenSurvivalTime);
}, 1000 * 60)

const checkToken = async (ctx, next) => {
    let url = ctx.request.url;

    if (/^\/v1\/.*/.test(url) === true) {
        const ignoreURL = [
            '/v1/users/login',
            '/v1/users/registry',
        ];
        
        
        if (ignoreURL.indexOf(url) !== -1) {
            return next(ctx);
        }
    
        let token = ctx.request.header.token;
        if (!!token) {
            let tokenInfo = await loginInfo.check(token, tokenSurvivalTime);
            ctx.userInfo = tokenInfo;
            if (!!tokenInfo) {
                return next(ctx);
            }
        }
        ctx.status = 401
        ctx.body = '当前token无效，请重新登陆';
    }else{
        return next(ctx);
    }
}

const staticFileServer = async (ctx, next) => {
    let url = ctx.request.url;

    if (/^\/v1\/.*/.test(url) === false) {
        if ((/.*(html|js|svg|css|png|woff2|woff|ttf|jpg|ico|json|yaml)$/).test(url)) {
            return next(ctx);
        } else {
            if (indexStr == null) {
                let indexPath = path.join(__dirname, '..', '..', 'static', 'ui', 'index.html');
                indexStr = await fs.readFileSync(indexPath).toString();
            }
            ctx.body = indexStr;
            ctx.status = 200
        }
    }else{
        return next(ctx);
    }
}

export default (app) => {
    app.use(checkToken);
    app.use(staticFileServer);
    app.use(usersController.routes());
    app.use(favoritesFolderController.routes());
    app.use(favoritesController.routes());
    app.use(accountController.routes());
    app.use(commonController.routes());
};
