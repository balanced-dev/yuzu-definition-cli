const path = require("path");
const _ = require('lodash');
let userConfigPath = path.resolve('./yuzu.config.js');
const overrideConfig = require('./services/overrideDefaults');

const configDefaults = require('./configDefaults');

const cardSources = {
    trello: require("../generation/plugins/cardSources/trello"),
    localFiles: require("../generation/plugins/cardSources/localFiles")
};

let modules = [];
const internalPlugins = ['hbs', 'vue', 'yuzu', 'bem'];
internalPlugins.forEach((plugin) => {
    const pluginModules = require(`../plugins/${plugin}/index`)().modules;
    modules = [...modules, ...pluginModules];
});

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
        const defaultConfig = configDefaults();

        userConfig.modules.forEach((name) => {
            const module = modules.find((module) => { return module.name == name; });
            if(module) 
                module.init(defaultConfig);
            else 
                throw `${name} module not found`;
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

    const defaultConfig = configDefaults();

    userConfig.modules.forEach((name) => {
        const module = modules.find((module) => { return module.name == name; });
        if(module) 
            module.init(defaultConfig);
        else 
            throw `${name} module not found`;
    });

    addSourceModule(userConfig, defaultConfig);

    return _.defaultsDeep({}, defaultConfig);

}

module.exports = { create, createForTesting };