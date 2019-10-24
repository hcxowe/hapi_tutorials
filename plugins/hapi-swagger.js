const hapiSwagger = require('hapi-swagger')
const package = require('../package')

module.exports = {
    plugin: hapiSwagger,
    options: {
        info: {
            title: 'API Documentation',
            version: package.version,
        }
    }
}