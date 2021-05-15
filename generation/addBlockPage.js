// Schema cleanup & generation of other files
const data = require('./generators/data/data'),
    creation = require('../creation/index');

const addBlockPage = function(card, config, fs) {

    let json = data.createCardJson(card, config);
    let blockTypeSettings = config.creation.blockPaths[card.type];

    let interceptors = {        
        data: function(jsonData) {
            return data.removeDataStructureRefs(json, config); 
        },
        dataForSchemaGeneration: json,
    }

    config.interceptorsPipeline.sort(i => i.order).forEach(i => {

        if(!interceptors[i.type]) interceptors[i.type] = [];

        interceptors[i.type].push(i.apply(json, config));

    });

    config.logger.info('createCardJson =' + JSON.stringify(json, null, 4));

    creation.addBlock(card.type, card.name, '', blockTypeSettings, interceptors, config, fs);
};

module.exports = addBlockPage;