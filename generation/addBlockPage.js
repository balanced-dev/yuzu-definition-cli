// Schema cleanup & generation of other files
const data = require('./generators/data/data'),
    creation = require('../creation/index');

    const logger = require('./logger');

const addBlockPage = function(type, schema, config, fs) {

    let json = data.createCardJson(schema.schema, config);
    let blockTypeSettings = config.blockPaths[type];

    let interceptors = {        
        data: function(jsonData) {
            return data.removeDataStructureRefs(json, config); 
        },
        dataForSchemaGeneration: json,
    }

    config.interceptorsPipeline.forEach(interceptor => {
        interceptor.apply(interceptors, json, config);
    });

    logger.log({
        level: 'info',
        message: 'createCardJson =' + JSON.stringify(json, null, 4)
    });

    creation.addBlock(type, schema.name, '', blockTypeSettings, interceptors, config, fs);
};

module.exports = addBlockPage;