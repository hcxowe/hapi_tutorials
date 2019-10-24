const Hapi = require('hapi')
const inert = require('inert')
const vision = require('vision')
const hapiAuthJWT2 = require('hapi-auth-jwt2')

const route_login = require('./routes/login')

const plugin_swagger = require('./plugins/hapi-swagger')
const plugin_jwt2 = require('./plugins/hapi-auth-jwt2')

const config = require('./config')
 
const init = async () => {

    const server = Hapi.server({
        port: config.PORT,
        host: config.HOST
    })

    await server.register([
        inert,
        vision,
        plugin_swagger,
        hapiAuthJWT2
    ])

    plugin_jwt2(server)
 
    server.route([
        ...route_login
    ])
 
    await server.start()
    console.log('Server running on %s', server.info.uri)
};
 
process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})
 
init()