const data = require('./generators/data/data'),
    creation = require('../creation/index'),
    camelCase = require('change-case').camelCase;

const run = function(card, config) {

    const isCardFormatValid = formatCardName(card, config);

    if(isCardFormatValid) {

        let json = data.createCardJson(card, config);

        let interceptors = {        
            data: function() {
                return data.removeDataStructureRefs(json, config); 
            },
            dataForSchemaGeneration: json,
        }

        config.interceptorsPipeline.sort(i => i.order).forEach(i => {

            if(!interceptors[i.type]) interceptors[i.type] = [];

            interceptors[i.type].push(i.apply(json, config));

        });

        config.logger.info('createCardJson =' + JSON.stringify(json, null, 4));

        creation.addBlock(config, card.type, '', card.name, interceptors);
    }
    else {
        config.logger.error(`Card title invalid ${card.name}`)
    }
};

const formatCardName = (card, config) => {

    card.type = getCardType(card.name, config);

    if(card.type && config.generation.card.titlePrefixes[card.type]) {
        card.name = card.name.replace(config.generation.card.titlePrefixes[card.type], '');
        card.name = camelCase(card.name);
        return true;
    }
    return false;

}

const getCardType = function(name, config) {
    let blockPrefix = config.generation.card.titlePrefixes.block,
        pagePrefix = config.generation.card.titlePrefixes.page;

    if(name.startsWith(blockPrefix)) {
        return 'block';
    }
    else if(name.startsWith(pagePrefix)) {
        return 'page';
    }
};

module.exports = { run, formatCardName };