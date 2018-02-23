

import Router from 'koa-router';
import common from './lib/common';
import favoritesModel from '../models/favorites';

import favoritesFolderModel from '../models/favoritesFolder';

const favorites = new Router({
    prefix: '/v1/favorites'
});

favorites.get('/website', async ctx => {    

    try {        
        await favoritesModel.getAll().then(r => common.returnDone(ctx,r));
    } catch (e) {
        await common.returnError(ctx, 400, 123, e)
    }
});

favorites.post('/website', async ctx => {
    const body = ctx.request.body;
    const { folderID } = body;

    try {
        let folder = await favoritesFolderModel.get(folderID);
        if (!!folder) {
            await favoritesModel.save(body).then(r => common.returnDone(ctx));
        } else {
            common.returnError(ctx, 400, 123, '收藏夹不存在')
        }
    } catch (e) {
        common.returnError(ctx, 400, 123, e)
    }
});

favorites.delete('/website/:wsid', async ctx => {
    const body = ctx.request.body;
    const { wsid } = ctx.params;
    const { folderID } = body;

    try {
        await favoritesModel.delete(wsid).then(r => common.returnDone(ctx));
    } catch (e) {
        common.returnError(ctx, 400, 123, e)
    }
});

favorites.put('/website/:wsid', async ctx => {
    const body = ctx.request.body;
    const { wsid } = ctx.params;
    const { folderID } = body;
        
    try {
        let folder = await favoritesFolderModel.get(folderID);
        if (!!folder) {
            await favoritesModel.update(wsid, body).then(r => common.returnDone(ctx));
        } else {
            common.returnError(ctx, 400, 123, '收藏夹不存在')
        }
    } catch (e) {
        common.returnError(ctx, 400, 123, e)
    }
});

export default favorites;