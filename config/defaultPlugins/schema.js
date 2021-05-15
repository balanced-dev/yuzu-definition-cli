
module.exports = (config) => {

    config.generators.schemaCleanup = require('../../generation/generators/schemaCleanup/schemaCleanup');

    config.interceptorsPipeline.push({
        type: 'schema',
        order: 5,
        apply: (json, config) => {
            return function(schema, cardSettings) {
                return config.generators.schemaCleanup.processProperties(schema, json);
            } 
        }
    });

};