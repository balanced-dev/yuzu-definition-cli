module.exports = (list, config, addBlockPage, fs) => {

    config.propertyTypes = require('../config/propertyTypes');

    let generator = config.cardSources[config.cardSource];

    generator.buildList(list, config, addBlockPage, fs);

}