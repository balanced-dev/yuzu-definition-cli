const path = require("path");
const _ = require('lodash');
let userConfigPath = path.resolve('./yuzu.config.js');
const overrideConfig = require('./services/overrideDefaults');

const initialConfig = require('./defaults/intiial');

const cardSources = {
    trello: require("../generation/plugins/cardSources/trello"),
    localFiles: require("../generation/plugins/cardSources/localFiles")
};

const addSourceModule = function(userConfig, defaultConfig) {

    const sourceConfig = userConfig.source;
    let sourceModule = undefined;

    if(_.isObject(sourceConfig)) {
        const sourceName = sourceConfig.name;
        if(Object.keys(cardSources).includes(sourceName)) {
            sourceModule = cardSources[sourceName];
        }
        else {
            sourceModule = require(sourceName);
        }
        defaultConfig.source = sourceModule.apply();
        defaultConfig.sourceSettings = sourceConfig.settings;
    }

}

const create = () => {

    try {
        let userConfig = require(userConfigPath);
        const defaultConfig = initialConfig();

        userConfig.modules.forEach((module) => {
            require(`./defaults/${module}`)(defaultConfig);
        });

        addSourceModule(userConfig, defaultConfig);

        if(userConfig.overrides) {
            overrideConfig(defaultConfig, userConfig.overrides)
        }

        return defaultConfig;
    }
    catch (e) {
        console.log(e);
    }
    return {};

}


const createForTesting = (userConfig) => {

    try {
        const defaultConfig = initialConfig();

        userConfig.modules.forEach((module) => {
            require(`./defaults/${module}`)(defaultConfig);
        });

        addSourceModule(userConfig, defaultConfig);

        return _.defaultsDeep({}, defaultConfig);
    }
    catch (e) {
        console.log(e);
    }
    return {};

}

module.exports = { create, createForTesting };