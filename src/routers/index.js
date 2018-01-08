

const usersController = require('../controllers/users');
const favoritesFolderController = require('../controllers/favoritesFolder');
const favoritesController = require('../controllers/favorites');

const checkToken = async (ctx, next) => {
return next(ctx);
    if (ctx.request.url === '/users/login') {
        return next(ctx);
    }

    let token = ctx.request.header.token;
    if (!!token) {
        let loginInfo = token.split(':');
        if (loginInfo.length === 2) {
            let LUser = loginInfo[0]
            let LToken = loginInfo[1]
            let user = ctx.model.user.loginUserMap[LUser];
            if (!!user && user.token === token) {
                return next(ctx)
            }
        }
    }
    
    ctx.status = 401
    ctx.body = '当前token无效，请重新登陆';
}

module.exports = (app) => {
    app.use(checkToken);
    app.use(usersController.routes());
    app.use(favoritesFolderController.routes());
    app.use(favoritesController.routes());
};
