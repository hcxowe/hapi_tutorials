// 创建一个服务器
const Hapi = require('hapi')

const Path = require('path')
const inert = require('inert')
const pino = require('hapi-pino')

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    /* routes: {
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    } */
})

// 创建路由
server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        request.logger.info('In handler %s', request.path)

        return 'Hello, world!'
    }
})

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {
        request.logger.info('In handler %s', request.path)

        return 'Hello, ' + encodeURIComponent(request.params.name) + '!'
    }
})

server.route({
    method: 'GET',
    path: '/hello',
    handler: (request, h) => {
        request.logger.info('In handler %s', request.path)

        return h.file(Path.resolve(__dirname, 'public/hello.html')) // 返回静态文件
    }
})

const init = async () => {
    await server.register(inert)

    // 日志插件
    await server.register({
        plugin: pino,
        options: {
            prettyPrint: false,
            logEvents: ['response', 'onPostStart']
        }
    })

    await server.start()

    console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

init()