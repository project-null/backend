import Router from 'koa-router';
import favoritesFolderModel from '../models/favoritesFolder';
import common from './lib/common';

const favoritesFolder = new Router({
    prefix: '/v1/favorites/folder'
});

favoritesFolder.get('/', async ctx => {
    await favoritesFolderModel.getAll()
        .then(list => {
            ctx.body = list;
        }).catch(e => {
            common.returnError(ctx, 500, 1001, e)
        });
});

favoritesFolder.post('/', async ctx => {
    let object = ctx.request.body;
    const { name, desc, order } = object;    

    if (!!!name || !!!desc) {
        return common.returnError(ctx, 400, 1001, '参数错误');
    }

    let result = await favoritesFolderModel.getAll({ name: object.name })
    if (result.length > 0) {
        return common.returnError(ctx, 400, 1001, '收藏夹文件名已存在');
    }

    await favoritesFolderModel.save(object)
        .then(() =>
            common.returnDone(ctx)
        ).catch(e => {
            common.returnError(ctx, 500, 1001, e)
        });
});

favoritesFolder.put('/:id', async ctx => {
    let body = ctx.request.body;
    let _id = ctx.params.id;

    const { name, desc, order } = body;

    if (!!!_id || !!!name || !!!desc) {
        return common.returnError(ctx, 400, 1001, '参数错误');
    }

    let result = await favoritesFolderModel.getAll({ name: name })

    let ffList = result.filter(v => {
        return String(v._id) !== _id;
    });

    if (ffList.length > 0) {
        return common.returnError(ctx, 400, 1001, '收藏夹文件名已存在');
    }

    await favoritesFolderModel.update(_id, body)
        .then(list => {
            common.returnDone(ctx);
        }).catch(e => {
            common.returnError(ctx, 500, 1001, e)
        });
});

favoritesFolder.delete('/:id', async ctx => {
    let id = ctx.params.id;
    if (!!id) {

        await favoritesFolderModel.delete(id).then(r => {            
            return common.returnDone(ctx);
        }).catch(err => {
            return common.returnError(ctx, 500, 1001, err);
        });
    } else {
        return common.returnError(ctx, 500, 1001, 'id不能为空');
    }
});

export default favoritesFolder;