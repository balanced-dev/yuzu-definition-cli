// Schema cleanup & generation of other files
const data = require('./generators/data/data'),
    creation = require('../creation/index'),
    schemaCleanup = require('./generators/schemaCleanup/schemaCleanup'),
    markup = require('./generators/markup/markup'),
    scss = require('./generators/scss/scss');

    const logger = require('./logger');

const addBlockPage = function(type, schema, config, fs) {

    let json = data.createCardJson(schema.schema, config);
    let blockTypeSettings = config.blockPaths[type];
    let interceptors = config.getInterceptors(json, config, data, schemaCleanup, markup, scss);

    logger.log({
        level: 'info',
        message: 'createCardJson =' + JSON.stringify(json, null, 4)
    });

    creation.addBlock(type, schema.name, '', blockTypeSettings, interceptors, config, fs);
};

module.exports = addBlockPage;