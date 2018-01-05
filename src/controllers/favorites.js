

const Router = require('koa-router');

const users = new Router({
    prefix: '/favorites'
});

users.get('/', async function (ctx, next) {
});

users.post('/', async function (ctx, next) {
});

users.put('/', async function (ctx, next) {
    
});

module.exports = users;