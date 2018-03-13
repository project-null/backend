
import Router from 'koa-router';
import common from './lib/common';
import AccountModel from '../models/accounts';
import loginInfo from '../models/loginInfo';

const account = new Router({
    prefix: '/v1/accounts'
});

account.get('/', async ctx => {
    let userID = await common.getUserID(ctx);

    await AccountModel.getAll({ userID }).then(users => {
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

    let userID = await common.getUserID(ctx);

    account.userID = userID;
    const { url, type, accountName, secretText } = account;

    const paramterType = {
        url: { require: true, type: 'string' },
        type: { require: true, type: 'number' },
        accountName: { require: true, type: 'string' },
        secretText: { require: true, type: 'string' },
    };

    let result = common.parameterCheck(account, paramterType)
    if(!!result){
        AccountModel.save(account);
        return common.returnDone(ctx);
    }else{
        return common.returnError(ctx,1,result);
    }   
});

account.put('/', async ctx => {
    let account = ctx.request.body;
    delete account.userID;

    const { _id, url, type, accountName, secretText } = account;
    const paramterType = {
        url: { require: true, type: 'string' },
        type: { require: true, type: 'number' },
        accountName: { require: true, type: 'string' },
        secretText: { require: true, type: 'string' },
    };

    let result = common.parameterCheck(account, paramterType)
    if (!!result) {
        await AccountModel.update(_id, account).then(r => {
            common.returnDone(ctx);
        }, err => {
            common.returnError(ctx, 500, err);
        });
    } else {
        common.returnError(ctx, 500, result);
    }
});

export default account;