import usersController from '../controllers/users';
import favoritesFolderController from '../controllers/favoritesFolder';
import favoritesController from '../controllers/favorites';
import accountController from '../controllers/accounts';
import commonController from '../controllers/common';

import loginInfo from '../models/loginInfo';
const tokenSurvivalTime = 30;
const checkToken = async (ctx, next) => {

    const ignoreURL = [
        '/v1/users/login',
        '/v1/users/registry',
        '/graphql?',
        '/graphiql',
    ]

    if (ignoreURL.indexOf(ctx.request.url) !== -1) {
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
}

setInterval(() => {
    loginInfo.checkTokens(tokenSurvivalTime);
}, 1000 * 60)

export default (app) => {
    app.use(checkToken);
    app.use(usersController.routes());
    app.use(favoritesFolderController.routes());
    app.use(favoritesController.routes());
    app.use(accountController.routes());
    app.use(commonController.routes());
};
