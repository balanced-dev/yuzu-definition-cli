const propertyTypes= require('./default/propertyTypes');
const yuzu = require('yuzu-definition-cli');
const cliSettings = yuzu.importSettings;

let settings = {};

const set = function(settingsPath) {
    cliSettings.overrideConfigPath(settingsPath);
    settings = cliSettings.run();
    settings.propertyTypes = propertyTypes;
};

const setLocal = function(settings) {
    settings = settings;
    settings.propertyTypes = propertyTypes;
};

const get = function() {
    return settings;
}

module.exports = {set, setLocal, get};