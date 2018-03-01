
import Router from 'koa-router';
import common from './lib/common';
import AccountModel from '../models/accounts';
import loginInfo from '../models/loginInfo';

const account = new Router({
    prefix: '/v1/accounts'
});

account.get('/', async ctx => {
    let token = ctx.header.token;
    let userID = await common.getUserID(token);
    
    await AccountModel.getAll({userID}).then(users=>{
        ctx.body = users;
    });
});

account.delete('/:id', async ctx => {
    const uuid = ctx.params.id;

    await AccountModel.delete(uuid)
        .then(result => {
            common.returnDone(ctx)
        }, err => common.returnError(ctx, 500, 1, err))
        .catch(err => {
            common.returnError(ctx, 500, err);
        });
});

account.post('/', async ctx => {
    let account = ctx.request.body;

    let token = ctx.header.token;
    let userID = await common.getUserID(token);
    
    account.userID = userID;
    const { url, type, accountName, secretText } = account;

    if (!url || !type || !accountName || !secretText) {
        return common.returnError(ctx, 400, 1, "url, type, accountName, secretText 不可为空");
    }

    AccountModel.save(account);
    return common.returnDone(ctx);
});

account.put('/', async ctx => {
    let account = ctx.request.body;
    delete account.userID;
    
    const { _id, url, type, accountName, secretText } = account;

    if (!url || !type || !accountName || !secretText || !_id) {
        return common.returnError(ctx, 400, 1, "_id,url, type, accountName, secretText 不可为空");
    }

    let result = await AccountModel.get(_id);

    if (!!result) {
        await AccountModel.update(_id, account).then(r => {
            common.returnDone(ctx);
        }, err => {
            common.returnError(ctx, 500, err);
        });
    } else {
        common.returnError(ctx, 500, `${uuid}账号不存在`);
    }
});

export default account;