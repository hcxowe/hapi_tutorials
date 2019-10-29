const Joi = require('joi')
const user = require('../models/user')
 
module.exports = [
    {
        method: 'POST',
        path: '/user/add',
        handler: async (request, h) => {
            let userName = request.payload.userName
            let password = request.payload.password
            let ret = await user.addUser(userName, password)

            return {
                ret: ret,
                msg: 'success'
            }
        },
        options: {  
            description: '添加用户',
            tags: ['api'],
            validate: {
                payload: {
                    userName: Joi.string().required().description('用户名称'),
                    password: Joi.string().required().description('用户密码')
                }
            },
            auth: false
        }
    },
    {
        method: 'GET',
        path: '/user/list',
        handler: async (request, h) => {
            return await user.getUsers()
        },
        options: {
            description: '获取所有用户',
            tags: ['api'],
            auth: false
        }
    }
]