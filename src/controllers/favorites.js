import Router from 'koa-router';
import common from './lib/common';
import favoritesModel from '../models/favorites';

import favoritesFolderModel from '../models/favoritesFolder';

const favorites = new Router({
    prefix: '/v1/favorites'
});

favorites.get('/website', async ctx => {

    try {
        await favoritesModel.getAll().then(r => common.returnDone(ctx, r));
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

favorites.post('/website/import', async ctx => {
    const body = ctx.request.body;
    const { filename } = body;

    var fs = require('fs');
    var path = require('path');

    try {
        let filePath = path.join(__dirname, '..', '..', 'public', filename);

        await fs.stat(filePath, function (err, stats) {
            if (err) {
                return common.returnError(ctx, 400, 1, err);
            } else {
                var buff = fs.readFileSync(filePath);
                var str = buff.toString();                
                let reg = /<A.*<\/A>/g;
                let arr = reg.exec(str);
                while (arr) {
                    let text = arr[0];

                    // 获取URL
                    let matchResult = text.match(/HREF=.*" ADD/);
                    let urlStr = matchResult[0];
                    let url = urlStr.substring(6, urlStr.length - 5);

                    // 获取名称
                    matchResult = text.match(/">.*<\/A>/);
                    urlStr = matchResult[0];
                    let name = urlStr.substring(2, urlStr.length - 4);

                    // console.log(`name ${name}`);
                    // console.log(`url: ${url}`);
                    // console.log(`\n`);

                    // favoritesModel.save({
                    //     name,
                    //     desc: '收藏夹文件导入',
                    //     url
                    // });                    
                    
                    arr = reg.exec(str);
                }
                return common.returnDone(ctx);
            }
        });
    } catch (e) {
        return common.returnError(ctx, 400, 1, "文件不存在");
    }
});

export default favorites;