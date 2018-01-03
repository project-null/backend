

const Router = require('koa-router');

let userModel = require('../models/users.js');
let common = require('./common.js');

const users = new Router({
    prefix: '/users'
});

users.get('/', async function (ctx, next) {
    await userModel.getAll().then(users => {
        ctx.body = users;
    });
});

users.get('/loginname/:loginName', async function (ctx, next) {
    let loginname = ctx.params.loginName;
    if (!!loginname) {
        await userModel.getUserByLoginName(loginname).then(user => {
            ctx.body = user;
        }, () => {
            ctx.body = `user ${loginname} not found!!`;
        })
    } else {
        ctx.body = "error";
    }
});

users.post('/registry', async function (ctx, next) {
    let user = ctx.request.body;

    const { loginName, nikeName, email, password } = user;
    if (!!!loginName || !!!email || !!!password) {
        ctx.body = 'error';
        return;
    }

    let existUser = await userModel.getUserByLoginName(loginName).then(user => {
        return user;
    });


    if (existUser.length > 0) {
        return common.returnError(ctx, 500, 1001, '名称不能重复');
    }

    await userModel.save(user).then(result => {
        ctx.body = 'done';
    }, () => {

    });
});

module.exports = users;