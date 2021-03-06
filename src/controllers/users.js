import Router from 'koa-router';
import userModel from '../models/users';
import common from './lib/common';

import loginInfo from '../models/loginInfo';

const users = new Router({
    prefix: '/v1/users'
});

users.delete('/logout', async ctx => {
    let token = ctx.header.token;    
    await loginInfo.deleteOneByKey({ token });
    return common.returnDone(ctx, token);
});

users.post('/login', async ctx => {
    let user = ctx.request.body;
    const { loginName, password } = user;

    const paramterType = {
        loginName: {
            require: true,
            type: 'string',
        },
        password: {
            require: true,
            type: 'string',
        }
    };

    let result = common.parameterCheck(user, paramterType)

    if (result.length > 0) {
        return common.returnError(ctx, 400, 1, result);
    }
    await userModel.login(user)
        .then(r => ctx.body = r)
        .catch(e => {
            common.returnError(ctx, 401, 2, e);
        });
});

users.get('/', async (ctx, next) => {
    await userModel.getAll().then(users => ctx.body = users);
});

users.delete('/:id', async (ctx, next) => {
    let userID = ctx.params.id;
    if (!!userID) {
        await userModel.delete(userID).then(r => {
            common.returnDone(ctx)
        }).catch(err => {
            return common.returnError(ctx, 500, 1001, err);
        });
        return;
    } else {
        return common.returnError(ctx, 500, 1001, 'id不能为空');
    }
});

users.get('/:id', async (ctx, next) => {
    let id = ctx.params.id;
    if (!!id) {
        let aa = await userModel.get(id).then(
            user => {
                delete user.password;
                ctx.body = user;
            },
            () => common.returnError(ctx, 500, 1001, '用户ID不存在'))
    } else {
        common.returnError(ctx, 500, 1001, '参数错误')
    }
});

users.get('/loginname/:loginName', async (ctx, next) => {
    let loginName = ctx.params.loginName;
    if (!!loginName) {
        await userModel.getOneByKey({ loginName }).then(user => {
            delete user.password;
            ctx.body = user;
        }, () => common.returnError(ctx, 500, 1001, '登录名不存在')
        )
    } else {
        common.returnError(ctx, 500, 1001, '参数错误')
    }
});

users.post('/registry', async (ctx, next) => {
    let user = ctx.request.body;

    const { loginName, nikeName, email, password } = user;
    if (!!!loginName || !!!email || !!!password) {
        common.returnError(ctx, 400, 1001, '参数错误')
        return;
    }

    let existUser = await userModel.getAll({ loginName }).then(user => {
        return user;
    });


    if (existUser.length > 0) {
        return common.returnError(ctx, 500, 1001, '名称不能重复');
    }

    await userModel.save(user).then(result => {
        common.returnDone(ctx)
    });
});

export default users;