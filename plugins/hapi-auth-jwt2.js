const config = require('../config')
 
const validate = (decoded, request, callback) => {
    let error;

    // decoded 为 JWT payload 被解码后的数据
    const { username } = decoded;
 
    if (!username) {
        return callback(error, false, username);
    }

    // 验证数字是否有效
    if (!username) {
        return { isValid: false } 
    } else {
        return { isValid: true }
    }
}
 
module.exports = (server) => {
    server.auth.strategy('jwt', 'jwt', {
        key: config.JWT_SECRET,
        validate: validate
    })

    server.auth.default('jwt')
}