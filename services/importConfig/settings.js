const path = require("path");
const workingRootDirectory = path.resolve("./");
const workingConfigDirectory = path.join(workingRootDirectory, 'config');
const settingsFilename = 'yuzu.config.js';
let settingsPath = path.resolve(workingConfigDirectory, settingsFilename);
const override = require('./logic/overrideDefaults');
const defaults = require('./defaults/hbs');
const _ = require('lodash');

const getConfigProperty = function(property) {
    try {
        let file = require(settingsPath);
        return file[property];        
    }
    catch (e) {
        console.log('The setting "' + property + '" could not be loaded.');
        return undefined;
    }    
};

const run = function() {
    try {
        overrides = require(settingsPath);
        settings = override(defaults, overrides);
    }
    catch (e) {
        console.log(e);
    }
    return settings;
}

const overrideSettingsPath = function(stringPath) {
    settingsPath = path.resolve(stringPath);
}


let overrides = {};
let settings = {};

module.exports = {settings, overrideSettingsPath, run, settingsPath};