const dotenv = require('dotenv')
dotenv.config('.env')
 
const validate = (decoded, request, callback) => {
    let error;

    // decoded 为 JWT payload 被解码后的数据
    const { userId } = decoded;
 
    if (!userId) {
        return callback(error, false, userId);
    }

    const credentials = {
        userId,
    }

    // 验证数字是否有效
    if (!userId) {
        return {isValid: false};
    } else {
        return {isValid: true};
    }

    // 在路由接口的 handler 通过 request.auth.credentials 获取 jwt decoded 的值
    //return callback(error, true, credentials);
}
 
module.exports = (server) => {
    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_SECRET,
        validate: validate,
    })

    server.auth.default('jwt')
}