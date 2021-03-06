import loginInfo from '../../models/loginInfo';
const common = {
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
    },

    async getUserID(ctx) {
        const token = ctx.header.token;
        let user = await loginInfo.getOneByKey({ token });
        return user.userID;
    },

    parameterCheck(object, parameter) {
        let keys = Object.keys(parameter);

        let result = keys.map(v => {
            // 检查字段是否有缺少
            if (!object.hasOwnProperty(v)) {
                return `字段${v}:缺失`;
            }

            let value = object[v];
            let check = parameter[v];

            // 检查类型
            if (!!check.type && typeof value !== check.type) {
                return `字段${v}:类型必须为${check.type}`
            }

            if (!!check.require) {
                if (check.type === 'string' && !!!value) {
                    return `字段${v}:必填`
                }
            }

            if (!!check.range) {
                if (check.type === 'string' && value.length > check.range[1]) {
                    return `字段${v}:字符串长度不符合指定范围${check.range}`
                } else if (check.type === 'number' && (value < check.range[0] || value > check.range[1])) {
                    return `字段${v}:数值不符合指定范围${check.range}`
                }
            }
        });
        return result.filter(v => {
            return v !== undefined;
        });
    }
}
export default common;