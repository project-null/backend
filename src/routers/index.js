import usersController from '../controllers/users';
import favoritesFolderController from '../controllers/favoritesFolder';
import favoritesController from '../controllers/favorites';
import accountController from '../controllers/accounts';


const checkToken = async (ctx, next) => {
    if (ctx.request.url === '/v1/users/login') {
        return next(ctx);
    }

    let token = ctx.request.header.token;

    if (!!token) {
        let loginInfo = token.split(':');
        let tokenMap = ctx.model.user.loginUserMap;

        if (tokenMap && tokenMap[token]) {
            return next(ctx);
        }
    }

    ctx.status = 401
    ctx.body = '当前token无效，请重新登陆';
}

export default (app) => {
    app.use(checkToken);
    app.use(usersController.routes());
    app.use(favoritesFolderController.routes());
    app.use(favoritesController.routes());
    app.use(accountController.routes());
};
