const Joi = require('joi')
const JWT = require('jsonwebtoken')
const config = require('../config')
 
module.exports = [
    {
        method: 'POST',
        path: '/login',
        handler: async (request, h) => {
            let username = request.payload.username
            let password = request.payload.password

            // 校验用户名称、用户密码


            // 生成 JWT
            const payload = {
                username: username,
                exp: Math.floor(new Date().getTime() / 1000) + 60,
            }

            let jwtstr = JWT.sign(payload, config.JWT_SECRET)

            return {
                jwt: jwtstr
            }
        },
        options: {  
            description: '用户登录',
            notes: '用户登录',
            tags: ['api', 'login'],
            validate: {
                payload: {
                    username: Joi.string().required().description('用户名称'),
                    password: Joi.string().required().description('用户密码')
                }
            },
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/logout',
        handler: async (request, h) => {
            // 请求时需要设置 header 的 Authorization 字段为登录返回的 JWT 字符串

            return request.auth.credentials
        },
        options: {
            description: '用户登出',
            notes: '用户登出',
            tags: ['api', 'logout']
        }
    }
]