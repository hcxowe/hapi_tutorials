const Hapi = require('hapi')
const dotenv = require('dotenv')
const route_hello = require('./routes/hello')
const route_users = require('./routes/users')
const hapiAuthJWT2 = require('hapi-auth-jwt2')

const inert = require('inert')
const vision = require('vision')
const plugin_swagger = require('./plugins/hapi-swagger')
const plugin_jwt2 = require('./plugins/hapi-auth-jwt2')

dotenv.config('.env')
 
const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST
    })

    await server.register([
        inert,
        vision,
        plugin_swagger,
        hapiAuthJWT2
    ])

    plugin_jwt2(server)
 
    server.route([
        ...route_hello,
        ...route_users
    ])
 
    await server.start()
    console.log('Server running on %s', server.info.uri)
};
 
process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})
 
init()