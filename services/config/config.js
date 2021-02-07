const path = require("path");
let userConfigPath = path.resolve('./yuzu.config.js');
const overrideConfig = require('./logic/overrideDefaults');

let userConfig = {};
let config = {};

const run = function() {
    try {
        userConfig = require(userConfigPath);
        const defaultConfig = require(`./defaults/${userConfig.type}`);
        config = overrideConfig(defaultConfig, userConfig);
    }
    catch (e) {
        console.log(e);
    }
    return config;
}

const overrideConfigPath = function(stringPath) {
    userConfigPath = path.resolve(stringPath);
}

module.exports = {config, overrideConfigPath, run, userConfigPath};