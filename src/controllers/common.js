module.exports = {
    // 统一错误返回格式
    returnError(ctx, httpStatus, errorCode, data) {
        ctx.status = httpStatus;
        ctx.body = {
            code: errorCode,
            message: data,
        };
    },
    returnDone(ctx, message = 'done') {
        ctx.body = {
            code: 0,
            message,
        };
    }
}
