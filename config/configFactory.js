const path = require("path");
const _ = require('lodash');
let userConfigPath = path.join(process.cwd(), 'yuzu.import.config.js');

const configDefaults = require('./configDefaults');
const _fs = require("fs");
const fs = require("./defaultModules/fs");

const cardSources = {
    trello: require("../modules/cardSources/trello/trello"),
    localFiles: require("../modules/cardSources/localFiles/localFiles")
};

const loggers = {
    winston: require("../modules/logger/winston/winston")
};

let modules = [];
const internalPlugins = ['hbs', 'vue', 'yuzu', 'scss', 'schema'];
internalPlugins.forEach((plugin) => {
    const pluginModules = require(`../plugins/${plugin}/index`)().modules;
    modules = [...modules, ...pluginModules];
});

const addModule = function(type, internalModules, userConfig, defaultConfig) {

    const moduleConfig = userConfig[type];
    let module = undefined;

    if(_.isObject(moduleConfig)) {
        const moduleName = moduleConfig.name;
        if(Object.keys(internalModules).includes(moduleName)) {
            module = internalModules[moduleName];
        }
        else {
            module = require(moduleName);
        }
        defaultConfig[type] = module.apply();
        defaultConfig[`${type}Settings`] = moduleConfig.settings;
    }

}

const initPlugins = (userConfig, defaultConfig) => {
    userConfig.modules.forEach((name) => {
        const module = modules.find((module) => { return module.name == name; });
        if(module) 
            module.init(defaultConfig);
        else 
            throw `${name} module not found in yuzu.config.js`;
    });
}

const create = () => {

    try {
        const defaultConfig = configDefaults();

        let userConfig;
        if(_fs.existsSync(userConfigPath)) {
            userConfig = require(userConfigPath);
        
            initPlugins(userConfig, defaultConfig);

            addModule('source', cardSources, userConfig, defaultConfig);
            addModule('logger', loggers, userConfig, defaultConfig);
    
            if(userConfig.overrides) {
                userConfig.overrides(defaultConfig);
            }
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

    initPlugins(userConfig, defaultConfig);

    addModule('source', cardSources, userConfig, defaultConfig);

    return _.defaultsDeep({}, defaultConfig);
}

module.exports = { create, createForTesting };