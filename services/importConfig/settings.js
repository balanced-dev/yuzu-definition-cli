const path = require("path"),
    workingRootDirectory = path.resolve("./"),
    workingConfigDirectory = path.join(workingRootDirectory, 'config'),
    settingsJson = 'default.json',
    jsonPath = path.resolve(workingConfigDirectory, settingsJson),
    override = require('./logic/overrideDefaults');

const getWorkingConfigFile = function(fileNameExtension, property) {
    try {
        let file = require(path.join(workingConfigDirectory, fileNameExtension));
        return file[property];        
    }
    catch (e) {
        // console.log('The setting file "' + fileNameExtension + '" could not be loaded.');
        return undefined;
    }    
};

const defaults = {
    markupSettings: require('./default/markup.json'),
    prefixes: require('./default/prefixes.json'),
    // propertyTypes: require('./default/propertyTypes'),
    dataSettings: require('./default/dataSettings.json'),
    localFiles: require('./default/localFiles.json'),
    markupFragments: require('./default/markupFragments.json'),
    generationSource: '',
    trello: require('./default/trello.json'),
    yuzuPro: require('./default/yuzuPro.json'),
};

const overrides = {
    markupSettings: getWorkingConfigFile(settingsJson, 'markupSettings'),
    prefixes: getWorkingConfigFile(settingsJson, 'prefixes'),
    // propertyTypes: getWorkingConfigFile('propertyTypes'),
    dataSettings: getWorkingConfigFile(settingsJson, 'dataSettings'),
    localFiles: getWorkingConfigFile(settingsJson, 'localFiles'),
    markupFragments: getWorkingConfigFile(settingsJson, 'markupFragments'),
    generationSource: getWorkingConfigFile(settingsJson, 'generationSource'),
    trello: getWorkingConfigFile(settingsJson, 'trello'),
    yuzuPro: getWorkingConfigFile(settingsJson, 'yuzuPro'),
};

const settings = override(defaults, overrides);

module.exports = {settings, jsonPath};