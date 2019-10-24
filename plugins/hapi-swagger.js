const hapiSwagger = require('hapi-swagger')

module.exports = {
    plugin: hapiSwagger,
    options: {
        info: {
            title: 'API Documentation',
            version: '1.0',
        }
    }
}