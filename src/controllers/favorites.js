

const Router = require('koa-router');
let common = require('./lib/common');
let favoritesModel = require('../models/favorites');

let favoritesFolderModel = require('../models/favoritesFolder');


const favorites = new Router({
    prefix: '/v1/favorites/folder'
});

favorites.get('/:folderID', async ctx => {
    const folderID = ctx.params.folderID;
    await favoritesModel.getAll({ folderID }).then(r => ctx.body = r);
});

favorites.post('/:folderID/website', async ctx => {
    const body = ctx.request.body;
    const folderID = ctx.params.folderID;

    const paramterType = {
        name: {
            require: true,
            type: 'string',
            range: [1, 20],
        },
        url: {
            require: true,
            type: 'string',
        }
    };

    let result = common.parameterCheck(body, paramterType)
    if (result.length > 0) {
        return common.returnError(ctx, 400, 001, result);
    }
    try {
        let folder = await favoritesFolderModel.get(folderID);
        if (!!folder) {
            body.folderID = folderID;
            await favoritesModel.save(body).then(r => common.returnDone(ctx));
        } else {
            common.returnError(ctx, 400, 123, '收藏夹不存在')
        }
    } catch (e) {
        common.returnError(ctx, 400, 123, e)
    }
});

favorites.delete('/:folderID/website/:wsid', async ctx => {
    const { folderID, wsid } = ctx.params;

    try {
        let folder = await favoritesFolderModel.get(folderID);
        if (!!folder) {
            await favoritesModel.delete(wsid).then(r => common.returnDone(ctx));
        } else {
            common.returnError(ctx, 400, 123, '收藏夹不存在')
        }
    } catch (e) {
        common.returnError(ctx, 400, 123, e)
    }
});

favorites.put('/:folderID/website/:wsid', async ctx => {
    const body = ctx.request.body;
    const { folderID, wsid } = ctx.params;

    const paramterType = {
        name: {
            require: true,
            type: 'string',
            range: [1, 20],
        },
        url: {
            require: true,
            type: 'string',
        }
    };
    let result = common.parameterCheck(body, paramterType)
    if (result.length > 0) {
        return common.returnError(ctx, 400, 001, result);
    }

    try {
        let folder = await favoritesFolderModel.get(folderID);
        if (!!folder) {
            body.folderID = folderID;
            await favoritesModel.update(wsid, body).then(r => common.returnDone(ctx));
        } else {
            common.returnError(ctx, 400, 123, '收藏夹不存在')
        }
    } catch (e) {
        common.returnError(ctx, 400, 123, e)
    }
});

favorites.put('/', async function (ctx, next) {

});

module.exports = favorites;