

const usersController = require('../controllers/users');
const favoritesFolderController = require('../controllers/favoritesFolder');
const favoritesController = require('../controllers/favorites');
const accountController = require('../controllers/accounts');


const checkToken = async (ctx, next) => {
    // return next(ctx);
     console.log(ctx.request.url);
    if (ctx.request.url === '/v1/users/login') {
        return next(ctx);
    }

    let token = ctx.request.header.token;

    console.log('token:', token);
    if (!!token) {        
        let loginInfo = token.split(':');
        let tokenMap = ctx.model.user.loginUserMap;

        if (tokenMap && tokenMap[token]) {
            console.log(tokenMap[token]);
            return next(ctx);
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
    app.use(accountController.routes());
};
