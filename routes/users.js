const Joi = require('joi')
const JWT = require('jsonwebtoken')
const dotenv = require('dotenv')
const GROUP_NAME = 'users'

dotenv.config('.env')
 
module.exports = [
    {
        method: 'GET',
        path: `/${GROUP_NAME}`,
        options: {
            handler: async (request, h) => {
                return 'yong'
            },
            description: '获取用户列表',
            notes: '这是获取用户列表信息展示笔记',
            tags: ['api', GROUP_NAME]
        }
    },
    {
        method: 'GET',
        path: `/${GROUP_NAME}/{userId}/info`,
        options: {
            handler: async (request, h) => {
                return ''
            },
            description: '获取某个用户基本信息',
            notes: '注意事项笔记说明',
            tags: ['api', GROUP_NAME],
            validate: {
                params: {
                    userId: Joi.number()
                        .required()
                        .description('用户id'),
                }
            }
        },
    },
    {
        method: 'post',
        path: `/${GROUP_NAME}/createJWT`,
        options: {
            handler: async (request, h) => {
                const generateJWT = (jwtInfo) => {
                    const payload = {
                        userId: jwtInfo.userId,
                        exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
                    };
                    return JWT.sign(payload, process.env.JWT_SECRET);
                };
                return generateJWT({
                    userId: 1,
                })
            },
            auth: false, // 约定此接口不参与 JWT 的用户验证，会结合下面的 hapi-auth-jwt 来使用
            description: '用于测试的用户 JWT 签发',
            notes: '这是用于测试的用户 JWT 签发信息展示笔记',
            tags: ['api', 'test'],
        }
    }
]