

const Router = require('koa-router');
let common = require('./lib/common');
let AccountModel = require('../models/accounts');

const account = new Router({
    prefix: '/v1/accounts'
});

account.get('/', async ctx => {
    await AccountModel.getAll().then(users => ctx.body = users);
});

account.post('/', async ctx => {
    let account = ctx.request.body;
    const { url, type, accountName, password } = account;

    if (!url || !type || !accountName || !password) {
        return common.returnError(ctx, 400, 01, "url, type, accountName, password 不可为空");
    }

    AccountModel.genUUID(account);
    AccountModel.save(account);

    return common.returnDone(ctx);
});


module.exports = account;